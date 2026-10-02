import { type DuffelOffer, type DuffelSegment } from "@/server/duffel/types";

/** Test fixtures shaped like Duffel API v2 offer request responses. */

const JFK = {
  iata_code: "JFK",
  name: "John F. Kennedy International Airport",
  time_zone: "America/New_York",
};
const LHR = {
  iata_code: "LHR",
  name: "Heathrow Airport",
  time_zone: "Europe/London",
};
const BOS = {
  iata_code: "BOS",
  name: "Logan International Airport",
  time_zone: "America/New_York",
};
const DUFFEL_AIRWAYS = { iata_code: "ZZ", name: "Duffel Airways" };

export function segment(overrides: Partial<DuffelSegment> = {}): DuffelSegment {
  return {
    id: "seg_1",
    origin: JFK,
    destination: LHR,
    departing_at: "2026-11-10T18:30:00",
    arriving_at: "2026-11-11T06:45:00",
    duration: "PT7H15M",
    marketing_carrier: DUFFEL_AIRWAYS,
    operating_carrier: DUFFEL_AIRWAYS,
    marketing_carrier_flight_number: "1234",
    ...overrides,
  };
}

/** Round trip JFK→LHR nonstop, LHR→BOS→JFK with a connection. */
export function roundTripOffer(
  overrides: Partial<DuffelOffer> = {},
): DuffelOffer {
  return {
    id: "off_0000AbCdEf",
    total_amount: "1234.56",
    total_currency: "USD",
    expires_at: "2026-10-02T12:30:00Z",
    owner: DUFFEL_AIRWAYS,
    slices: [
      {
        origin: JFK,
        destination: LHR,
        duration: "PT7H15M",
        segments: [segment()],
      },
      {
        origin: LHR,
        destination: JFK,
        duration: "PT10H",
        segments: [
          segment({
            id: "seg_2",
            origin: LHR,
            destination: BOS,
            departing_at: "2026-11-20T10:00:00",
            arriving_at: "2026-11-20T12:30:00",
            duration: "PT7H30M",
            marketing_carrier_flight_number: "88",
          }),
          segment({
            id: "seg_3",
            origin: BOS,
            destination: JFK,
            departing_at: "2026-11-20T14:15:00",
            arriving_at: "2026-11-20T15:00:00",
            duration: "PT1H15M",
            operating_carrier: { iata_code: "NW", name: "Northwind Regional" },
            marketing_carrier_flight_number: "4021",
          }),
        ],
      },
    ],
    ...overrides,
  };
}
