import { describe, expect, it } from "vitest";

import { getAirport } from "@/features/flights/data/airports";
import {
  distanceKm,
  generateMockOffers,
} from "@/features/flights/server/mock-provider";
import { type FlightSearch } from "@/features/flights/types";

const search: FlightSearch = {
  tripType: "round_trip",
  origin: "JFK",
  destination: "LHR",
  departDate: "2026-11-10",
  returnDate: "2026-11-20",
  adults: 2,
  cabin: "economy",
};

describe("generateMockOffers", () => {
  it("is deterministic for the same search", () => {
    expect(generateMockOffers(search)).toEqual(generateMockOffers(search));
  });

  it("varies with the route and dates", () => {
    const other = generateMockOffers({ ...search, departDate: "2026-11-11" });
    expect(other.map((o) => o.id)).not.toEqual(
      generateMockOffers(search).map((o) => o.id),
    );
  });

  it("produces coherent itineraries", () => {
    const offers = generateMockOffers(search);
    expect(offers.length).toBeGreaterThanOrEqual(9);

    for (const offer of offers) {
      expect(offer.inbound).toBeDefined();
      for (const [leg, from, to] of [
        [offer.outbound, "JFK", "LHR"],
        [offer.inbound!, "LHR", "JFK"],
      ] as const) {
        expect(leg.segments[0]?.origin).toBe(from);
        expect(leg.segments.at(-1)?.destination).toBe(to);
        expect(leg.stops).toBe(leg.segments.length - 1);
        // Each segment departs after the previous one lands.
        for (let i = 1; i < leg.segments.length; i++) {
          expect(Date.parse(leg.segments[i]!.departAt)).toBeGreaterThan(
            Date.parse(leg.segments[i - 1]!.arriveAt),
          );
        }
      }
      expect(offer.totalPrice.amountMinor).toBe(
        offer.pricePerTraveller.amountMinor * 2,
      );
    }
  });

  it("departs on the requested local date", () => {
    for (const offer of generateMockOffers(search)) {
      const departAt = new Date(offer.outbound.segments[0]!.departAt);
      const localDate = new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/New_York",
      }).format(departAt);
      expect(localDate).toBe("2026-11-10");
    }
  });

  it("prices premium cabins higher", () => {
    const economy = generateMockOffers(search);
    const business = generateMockOffers({ ...search, cabin: "business" });
    economy.forEach((offer, i) => {
      expect(business[i]!.totalPrice.amountMinor).toBeGreaterThan(
        offer.totalPrice.amountMinor,
      );
    });
  });

  it("omits the return leg for one-way trips", () => {
    const offers = generateMockOffers({
      ...search,
      tripType: "one_way",
      returnDate: undefined,
    });
    expect(offers.every((o) => o.inbound === undefined)).toBe(true);
  });

  it("returns nothing for unknown airports", () => {
    expect(generateMockOffers({ ...search, origin: "ZZZ" })).toEqual([]);
  });

  it("computes realistic distances", () => {
    const km = distanceKm(getAirport("JFK")!, getAirport("LHR")!);
    expect(km).toBeGreaterThan(5500);
    expect(km).toBeLessThan(5600);
  });
});
