import { describe, expect, it } from "vitest";

import {
  applyResultOptions,
  parseResultOptions,
  withResultOptions,
} from "@/features/flights/lib/result-options";
import {
  type FlightOffer,
  type FlightItinerary,
} from "@/features/flights/types";

function itinerary(
  durationMinutes: number,
  stops: number,
  departAt: string,
): FlightItinerary {
  return {
    durationMinutes,
    stops,
    segments: [
      {
        flightNumber: "SB 100",
        airline: { code: "SB", name: "SkyBridge Air" },
        origin: "JFK",
        destination: "LHR",
        originTimeZone: "America/New_York",
        destinationTimeZone: "Europe/London",
        departAt,
        arriveAt: departAt,
        durationMinutes,
      },
    ],
  };
}

function offer(
  id: string,
  price: number,
  duration: number,
  stops: number,
  departAt: string,
): FlightOffer {
  return {
    id,
    cabin: "economy",
    outbound: itinerary(duration, stops, departAt),
    totalPrice: { amountMinor: price, currency: "USD" },
    pricePerTraveller: { amountMinor: price, currency: "USD" },
  };
}

const offers = [
  offer("a", 500, 600, 1, "2026-11-10T10:00:00.000Z"),
  offer("b", 300, 900, 1, "2026-11-10T06:00:00.000Z"),
  offer("c", 700, 420, 0, "2026-11-10T08:00:00.000Z"),
];

const ids = (list: FlightOffer[]) => list.map((o) => o.id);

describe("result options", () => {
  it("falls back to defaults for unknown values", () => {
    expect(parseResultOptions({ sort: "random", stops: ["nonstop"] })).toEqual({
      sort: "price",
      stops: "any",
    });
    expect(parseResultOptions({ sort: "duration", stops: "nonstop" })).toEqual({
      sort: "duration",
      stops: "nonstop",
    });
  });

  it("sorts by price, duration and departure", () => {
    expect(
      ids(applyResultOptions(offers, { sort: "price", stops: "any" })),
    ).toEqual(["b", "a", "c"]);
    expect(
      ids(applyResultOptions(offers, { sort: "duration", stops: "any" })),
    ).toEqual(["c", "a", "b"]);
    expect(
      ids(applyResultOptions(offers, { sort: "departure", stops: "any" })),
    ).toEqual(["b", "c", "a"]);
  });

  it("filters to nonstop flights without mutating the input", () => {
    expect(
      ids(applyResultOptions(offers, { sort: "price", stops: "nonstop" })),
    ).toEqual(["c"]);
    expect(ids(offers)).toEqual(["a", "b", "c"]);
  });

  it("only writes non-default options to the URL", () => {
    const base = new URLSearchParams({ from: "JFK", sort: "duration" });
    expect(
      withResultOptions(base, { sort: "price", stops: "any" }).toString(),
    ).toBe("from=JFK");
    expect(
      withResultOptions(base, {
        sort: "duration",
        stops: "nonstop",
      }).toString(),
    ).toBe("from=JFK&sort=duration&stops=nonstop");
  });
});
