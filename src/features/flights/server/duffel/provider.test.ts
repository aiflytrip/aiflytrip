import { afterEach, describe, expect, it, vi } from "vitest";

import { roundTripOffer } from "@/features/flights/server/duffel/fixtures";
import { createDuffelProvider } from "@/features/flights/server/duffel/provider";
import { FlightSearchError } from "@/features/flights/server/errors";
import { type FlightSearch } from "@/features/flights/types";
import { createDuffelClient } from "@/server/duffel/client";

const TOKEN = "duffel_test_not_a_real_token";

const search: FlightSearch = {
  tripType: "round_trip",
  origin: "JFK",
  destination: "LHR",
  departDate: "2026-11-10",
  returnDate: "2026-11-20",
  adults: 1,
  cabin: "economy",
};

function jsonResponse(
  status: number,
  body: unknown,
  headers: Record<string, string> = {},
) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", ...headers },
  });
}

function providerWith(fetchImpl: typeof fetch) {
  return createDuffelProvider(createDuffelClient(TOKEN, fetchImpl));
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Duffel provider", () => {
  it("sends a v2 offer request and maps valid offers", async () => {
    const fetchImpl = vi.fn<typeof fetch>(async () =>
      jsonResponse(201, {
        data: {
          id: "orq_123",
          live_mode: false,
          offers: [
            roundTripOffer(),
            roundTripOffer({ id: "off_bad", total_amount: "oops" }),
          ],
        },
      }),
    );
    vi.spyOn(console, "warn").mockImplementation(() => {});

    const offers = await providerWith(fetchImpl).search(search);

    expect(offers.map((o) => o.id)).toEqual(["off_0000AbCdEf"]);
    expect(fetchImpl).toHaveBeenCalledOnce();

    const [url, init] = fetchImpl.mock.calls[0]!;
    const requestUrl = new URL(String(url));
    expect(requestUrl.origin + requestUrl.pathname).toBe(
      "https://api.duffel.com/air/offer_requests",
    );
    expect(requestUrl.searchParams.get("return_offers")).toBe("true");
    expect(requestUrl.searchParams.get("supplier_timeout")).toBe("15000");

    const headers = new Headers(init?.headers);
    expect(headers.get("Duffel-Version")).toBe("v2");
    expect(headers.get("Authorization")).toBe(`Bearer ${TOKEN}`);
    expect(JSON.parse(String(init?.body))).toMatchObject({
      data: {
        slices: [{ origin: "JFK" }, { origin: "LHR" }],
        passengers: [{ type: "adult" }],
      },
    });
  });

  it.each([
    [401, "authentication_error", "configuration"],
    [403, "authentication_error", "configuration"],
    [429, "rate_limit_error", "rate_limited"],
    [422, "validation_error", "invalid_search"],
    [400, "invalid_request_error", "invalid_search"],
    [500, "api_error", "unavailable"],
    [502, "airline_error", "unavailable"],
  ])("maps HTTP %i (%s) to a %s error", async (status, type, kind) => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const fetchImpl = vi.fn<typeof fetch>(async () =>
      jsonResponse(status, {
        errors: [{ type, code: "some_code", title: "Nope", message: "Nope" }],
        meta: { request_id: "req_abc", status },
      }),
    );

    const error = await providerWith(fetchImpl)
      .search(search)
      .catch((e: unknown) => e);
    expect(error).toBeInstanceOf(FlightSearchError);
    expect((error as FlightSearchError).kind).toBe(kind);
  });

  it("treats network failures as unavailable", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const fetchImpl = vi.fn<typeof fetch>(async () => {
      throw new TypeError("fetch failed");
    });
    const error = await providerWith(fetchImpl)
      .search(search)
      .catch((e: unknown) => e);
    expect((error as FlightSearchError).kind).toBe("unavailable");
  });

  it("refuses live-mode responses", async () => {
    const fetchImpl = vi.fn<typeof fetch>(async () =>
      jsonResponse(201, {
        data: { id: "orq_live", live_mode: true, offers: [] },
      }),
    );
    const error = await providerWith(fetchImpl)
      .search(search)
      .catch((e: unknown) => e);
    expect((error as FlightSearchError).kind).toBe("configuration");
  });

  it("never logs the access token", async () => {
    const logged: unknown[] = [];
    vi.spyOn(console, "error").mockImplementation((...args) =>
      logged.push(...args),
    );
    const fetchImpl = vi.fn<typeof fetch>(async () =>
      jsonResponse(401, {
        errors: [{ type: "authentication_error", message: "bad token" }],
      }),
    );
    await providerWith(fetchImpl)
      .search(search)
      .catch(() => {});
    expect(JSON.stringify(logged)).not.toContain(TOKEN);
  });

  it("labels its results as test mode", () => {
    expect(providerWith(fetch).source).toEqual({
      id: "duffel",
      name: "Duffel test mode",
      mode: "test",
    });
  });
});
