import Anthropic from "@anthropic-ai/sdk";
import { describe, expect, it, vi } from "vitest";

import { type FlightOptionSnapshot } from "@/features/trip-planner/lib/flight-options";
import { type PlanOutput } from "@/features/trip-planner/lib/plan-schema";
import { SYSTEM_PROMPT } from "@/features/trip-planner/lib/prompt";
import { type PlanRequest } from "@/features/trip-planner/lib/request";
import {
  generatePlan,
  PLANNER_EFFORT,
  PLANNER_MODEL,
} from "@/features/trip-planner/server/generate-plan";

const request: PlanRequest = {
  search: {
    tripType: "round_trip",
    origin: "JFK",
    destination: "LHR",
    departDate: "2026-11-10",
    returnDate: "2026-11-12",
    adults: 2,
    cabin: "economy",
  },
  preferences: {
    budgetAmount: 3000,
    budgetCurrency: "USD",
    pace: "balanced",
    interests: ["food"],
    notes: "Vegetarian",
    language: "en",
  },
  tripDays: 3,
};

const option: FlightOptionSnapshot = {
  id: "off_1",
  airlines: ["Duffel Airways"],
  price: "$900",
  pricePerTraveller: "$450",
  outbound: {
    from: "JFK",
    to: "LHR",
    departs: "2026-11-10 6:00 PM local",
    arrives: "2026-11-11 6:15 AM local",
    duration: "7h 15m",
    stops: 0,
    via: [],
  },
  inbound: null,
};
const context = {
  origin: "New York (JFK)",
  destination: "London (LHR)",
  flightOptions: [option],
};

const day = (date: string) => ({
  date,
  title: "Day",
  morning: "a",
  afternoon: "b",
  evening: "c",
  note: null,
});
const goodPlan: PlanOutput = {
  title: "London long weekend",
  summary: "Food and markets.",
  flight: { recommended_offer_id: "off_1", rationale: "Nonstop overnight." },
  days: [day("2026-11-10"), day("2026-11-11"), day("2026-11-12")],
  budget: {
    currency: "USD",
    items: [{ category: "food", amount: 300, note: "Markets" }],
    notes: "Under budget",
  },
  packing_list: ["Umbrella"],
  tips: ["Get an Oyster card"],
  caveats: ["Check entry rules"],
};

function message(overrides: Record<string, unknown> = {}) {
  return {
    model: PLANNER_MODEL,
    stop_reason: "end_turn",
    stop_details: null,
    parsed_output: goodPlan,
    usage: { input_tokens: 1500, output_tokens: 3000 },
    ...overrides,
  };
}

function fakeClient(result: unknown | (() => never)) {
  const stream = vi.fn(() => ({
    finalMessage: async () =>
      typeof result === "function" ? (result as () => never)() : result,
  }));
  return {
    client: { beta: { messages: { stream } } } as unknown as Anthropic,
    stream,
  };
}

const apiError = (status: number) =>
  Anthropic.APIError.generate(
    status,
    { type: "error", error: { type: "x", message: "x" } },
    "x",
    new Headers(),
  );

describe("generatePlan", () => {
  it("sends one structured-output request with the expected settings", async () => {
    const { client, stream } = fakeClient(message());
    const result = await generatePlan(client, request, context);

    expect(result.ok).toBe(true);
    expect(stream).toHaveBeenCalledOnce();
    const params = (
      stream.mock.calls[0] as unknown as [Record<string, unknown>]
    )[0];
    expect(params).toMatchObject({
      model: "claude-opus-5-5",
      thinking: { type: "adaptive" },
      output_config: { effort: PLANNER_EFFORT },
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system: SYSTEM_PROMPT,
    });
    expect(
      (params.output_config as { format: { type: string } }).format.type,
    ).toBe("json_schema");
    const content = (params.messages as { content: string }[])[0]!.content;
    expect(content).toContain('"2026-11-12"');
    expect(content).toContain("Vegetarian");
    expect(content).toContain('"off_1"');
  });

  it("returns a sanitized plan and usage", async () => {
    const { client } = fakeClient(message());
    const result = await generatePlan(client, request, context);
    expect(result).toMatchObject({
      ok: true,
      model: PLANNER_MODEL,
      usage: { input: 1500, output: 3000 },
      plan: { flight: { recommended_offer_id: "off_1" } },
    });
  });

  it("drops a recommended flight id that wasn't offered", async () => {
    const plan = {
      ...goodPlan,
      flight: { recommended_offer_id: "off_made_up", rationale: "x" },
    };
    const { client } = fakeClient(message({ parsed_output: plan }));
    const result = await generatePlan(client, request, context);
    expect(result.ok && result.plan.flight.recommended_offer_id).toBeNull();
  });

  it.each([
    [
      "a refusal",
      message({ stop_reason: "refusal", stop_details: { category: "cyber" } }),
      "refused",
    ],
    ["truncated output", message({ stop_reason: "max_tokens" }), "truncated"],
    ["unparseable output", message({ parsed_output: null }), "invalid_output"],
    [
      "a plan with no usable days",
      message({ parsed_output: { ...goodPlan, days: [day("2030-01-01")] } }),
      "invalid_output",
    ],
  ])("reports %s", async (_label, response, reason) => {
    const { client } = fakeClient(response);
    expect(await generatePlan(client, request, context)).toMatchObject({
      ok: false,
      reason,
    });
  });

  it.each([
    [429, "rate_limited"],
    [401, "configuration"],
    [400, "configuration"],
    [529, "unavailable"],
    [500, "unavailable"],
  ])("maps HTTP %i to %s", async (status, reason) => {
    const { client } = fakeClient(() => {
      throw apiError(status);
    });
    expect(await generatePlan(client, request, context)).toMatchObject({
      ok: false,
      reason,
    });
  });

  it("treats JSON syntax errors as invalid output", async () => {
    const { client } = fakeClient(() => {
      throw new SyntaxError("Unexpected token");
    });
    expect(await generatePlan(client, request, context)).toMatchObject({
      ok: false,
      reason: "invalid_output",
    });
  });

  it("rethrows unexpected errors", async () => {
    const { client } = fakeClient(() => {
      throw new TypeError("bug");
    });
    await expect(generatePlan(client, request, context)).rejects.toThrow("bug");
  });
});
