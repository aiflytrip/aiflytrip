import Anthropic from "@anthropic-ai/sdk";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";

import { type FlightOptionSnapshot } from "@/features/trip-planner/lib/flight-options";
import {
  PlanOutputSchema,
  sanitizePlan,
  type PlanOutput,
} from "@/features/trip-planner/lib/plan-schema";
import {
  buildUserMessage,
  SYSTEM_PROMPT,
  tripDates,
} from "@/features/trip-planner/lib/prompt";
import { type PlanRequest } from "@/features/trip-planner/lib/request";

export const PLANNER_MODEL = "claude-opus-5-5";
/**
 * Effort is set explicitly: Opus 5.5 defaults to "medium" (not "high").
 * "medium" keeps latency and cost reasonable for an interactive feature.
 */
export const PLANNER_EFFORT = "medium" as const;
const MAX_TOKENS = 32_000;

export type PlanFailureReason =
  | "refused" // safety classifiers declined, even after fallback
  | "truncated" // hit max_tokens before finishing
  | "invalid_output" // response didn't match the schema
  | "rate_limited"
  | "unavailable" // network, timeout, overload, 5xx
  | "configuration"; // bad API key or request

export type GeneratePlanResult =
  | {
      ok: true;
      plan: PlanOutput;
      model: string;
      usage: { input: number; output: number };
    }
  | { ok: false; reason: PlanFailureReason; detail?: string };

/**
 * One Claude call that turns a validated trip request plus real (test-mode)
 * flight options into a structured plan. The client is injected so tests can
 * run without network access or an API key.
 */
export async function generatePlan(
  client: Anthropic,
  request: PlanRequest,
  context: {
    origin: string;
    destination: string;
    flightOptions: FlightOptionSnapshot[];
  },
): Promise<GeneratePlanResult> {
  let message;
  try {
    // Streaming avoids HTTP timeouts on long outputs; finalMessage() returns
    // the complete, parsed message.
    const stream = client.beta.messages.stream({
      model: PLANNER_MODEL,
      max_tokens: MAX_TOKENS,
      // Opus 5.5 always thinks; adaptive lets it decide how much.
      thinking: { type: "adaptive" },
      output_config: {
        effort: PLANNER_EFFORT,
        format: betaZodOutputFormat(PlanOutputSchema),
      },
      // If a safety classifier declines, the API retries server-side on the
      // model Anthropic recommends for that refusal category.
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: buildUserMessage(request, context) }],
    });
    message = await stream.finalMessage();
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError)
      return { ok: false, reason: "rate_limited" };
    if (
      error instanceof Anthropic.AuthenticationError ||
      error instanceof Anthropic.PermissionDeniedError
    ) {
      return { ok: false, reason: "configuration", detail: "authentication" };
    }
    if (error instanceof Anthropic.BadRequestError) {
      return { ok: false, reason: "configuration", detail: "bad_request" };
    }
    if (error instanceof Anthropic.APIError) {
      return {
        ok: false,
        reason: "unavailable",
        detail: `status_${error.status ?? "unknown"}`,
      };
    }
    // Non-HTTP SDK errors (e.g. output that fails JSON/schema parsing) and
    // raw JSON syntax errors mean the model's output was unusable.
    if (
      error instanceof Anthropic.AnthropicError ||
      error instanceof SyntaxError
    ) {
      return { ok: false, reason: "invalid_output" };
    }
    throw error;
  }

  // Always check stop_reason before reading content.
  if (message.stop_reason === "refusal") {
    return {
      ok: false,
      reason: "refused",
      detail: message.stop_details?.category ?? undefined,
    };
  }
  if (message.stop_reason === "max_tokens")
    return { ok: false, reason: "truncated" };

  // parsed_output is null if parsing failed; re-validate defensively.
  const parsed = PlanOutputSchema.safeParse(message.parsed_output);
  if (!parsed.success) return { ok: false, reason: "invalid_output" };

  const plan = sanitizePlan(parsed.data, {
    dates: tripDates(request),
    offerIds: context.flightOptions.map((option) => option.id),
    currency: request.preferences.budgetCurrency,
  });
  if (plan.days.length === 0)
    return { ok: false, reason: "invalid_output", detail: "no_days" };

  return {
    ok: true,
    plan,
    model: message.model,
    usage: {
      input: message.usage.input_tokens,
      output: message.usage.output_tokens,
    },
  };
}
