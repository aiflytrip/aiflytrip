import { describe, expect, it } from "vitest";

import {
  roundTripOffer,
  segment,
} from "@/features/flights/server/duffel/fixtures";
import {
  localTimeToUtc,
  mapDuffelOffer,
  parseIsoDuration,
  toDuffelOfferRequest,
} from "@/features/flights/server/duffel/mapper";
import { type FlightSearch } from "@/features/flights/types";

const search: FlightSearch = {
  tripType: "round_trip",
  origin: "JFK",
  destination: "LHR",
  departDate: "2026-11-10",
  returnDate: "2026-11-20",
  adults: 2,
  cabin: "business",
};

describe("toDuffelOfferRequest", () => {
  it("builds a round-trip request with one passenger entry per adult", () => {
    expect(toDuffelOfferRequest(search)).toEqual({
      slices: [
        { origin: "JFK", destination: "LHR", departure_date: "2026-11-10" },
        { origin: "LHR", destination: "JFK", departure_date: "2026-11-20" },
      ],
      passengers: [{ type: "adult" }, { type: "adult" }],
      cabin_class: "business",
      max_connections: 1,
    });
  });

  it("sends a single slice for one-way trips", () => {
    const request = toDuffelOfferRequest({
      ...search,
      tripType: "one_way",
      returnDate: undefined,
    });
    expect(request.slices).toHaveLength(1);
  });
});

describe("parseIsoDuration", () => {
  it.each([
    ["PT7H15M", 435],
    ["PT45M", 45],
    ["PT2H", 120],
    ["P1DT2H5M", 1565],
    ["PT1H0M30S", 61],
  ])("parses %s", (input, minutes) => {
    expect(parseIsoDuration(input)).toBe(minutes);
  });

  it.each(["", "P", "PT", "7h15m", null, undefined])("rejects %j", (input) => {
    expect(parseIsoDuration(input)).toBeUndefined();
  });
});

describe("localTimeToUtc", () => {
  it("interprets Duffel local times in the airport's time zone", () => {
    expect(localTimeToUtc("2026-11-10T18:30:00", "America/New_York")).toBe(
      "2026-11-10T23:30:00.000Z",
    );
    expect(localTimeToUtc("2026-07-01T09:00:00", "Europe/London")).toBe(
      "2026-07-01T08:00:00.000Z",
    );
  });

  it("returns undefined for bad input", () => {
    expect(localTimeToUtc("not a date", "Europe/London")).toBeUndefined();
    expect(
      localTimeToUtc("2026-07-01T09:00:00", "Mars/Olympus_Mons"),
    ).toBeUndefined();
  });
});

describe("mapDuffelOffer", () => {
  it("maps a round-trip offer", () => {
    const offer = mapDuffelOffer(roundTripOffer(), search);
    expect(offer).toBeDefined();
    expect(offer!.id).toBe("off_0000AbCdEf");
    expect(offer!.totalPrice).toEqual({ amountMinor: 123456, currency: "USD" });
    expect(offer!.pricePerTraveller).toEqual({
      amountMinor: 61728,
      currency: "USD",
    });
    expect(offer!.cabin).toBe("business");
    expect(offer!.expiresAt).toBe("2026-10-02T12:30:00Z");

    expect(offer!.outbound).toMatchObject({ stops: 0, durationMinutes: 435 });
    expect(offer!.outbound.segments[0]).toEqual({
      flightNumber: "ZZ 1234",
      airline: { code: "ZZ", name: "Duffel Airways" },
      operatingCarrier: undefined,
      origin: "JFK",
      destination: "LHR",
      originTimeZone: "America/New_York",
      destinationTimeZone: "Europe/London",
      departAt: "2026-11-10T23:30:00.000Z",
      arriveAt: "2026-11-11T06:45:00.000Z",
      durationMinutes: 435,
    });

    expect(offer!.inbound).toMatchObject({ stops: 1, durationMinutes: 600 });
    expect(offer!.inbound!.segments.map((s) => s.destination)).toEqual([
      "BOS",
      "JFK",
    ]);
  });

  it("records a different operating carrier", () => {
    const offer = mapDuffelOffer(roundTripOffer(), search);
    expect(offer!.inbound!.segments[1]!.operatingCarrier).toEqual({
      code: "NW",
      name: "Northwind Regional",
    });
  });

  it("handles zero-decimal currencies", () => {
    const offer = mapDuffelOffer(
      roundTripOffer({ total_amount: "150000", total_currency: "JPY" }),
      search,
    );
    expect(offer!.totalPrice).toEqual({ amountMinor: 150000, currency: "JPY" });
  });

  it("computes durations from timestamps when Duffel omits them", () => {
    const offer = mapDuffelOffer(
      roundTripOffer({
        slices: [
          { segments: [segment({ duration: null })] },
          roundTripOffer().slices![1]!,
        ],
      }),
      search,
    );
    expect(offer!.outbound.durationMinutes).toBe(435);
  });

  it.each([
    [
      "the wrong number of slices",
      roundTripOffer({ slices: [roundTripOffer().slices![0]!] }),
    ],
    ["a malformed price", roundTripOffer({ total_amount: "abc" })],
    ["an invalid currency", roundTripOffer({ total_currency: "usd" })],
    [
      "a segment without a time zone",
      roundTripOffer({
        slices: [
          {
            segments: [
              segment({ origin: { iata_code: "JFK", time_zone: null } }),
            ],
          },
          roundTripOffer().slices![1]!,
        ],
      }),
    ],
    [
      "a segment with an unparseable time",
      roundTripOffer({
        slices: [
          { segments: [segment({ departing_at: "soon" })] },
          roundTripOffer().slices![1]!,
        ],
      }),
    ],
    [
      "a slice with no segments",
      roundTripOffer({ slices: [{ segments: [] }, { segments: [] }] }),
    ],
  ])("skips offers with %s", (_label, raw) => {
    expect(mapDuffelOffer(raw, search)).toBeUndefined();
  });

  it("maps one-way offers", () => {
    const oneWay = {
      ...search,
      tripType: "one_way" as const,
      returnDate: undefined,
    };
    const offer = mapDuffelOffer(
      roundTripOffer({ slices: [roundTripOffer().slices![0]!] }),
      oneWay,
    );
    expect(offer!.inbound).toBeUndefined();
  });
});
