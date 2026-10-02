/**
 * The subset of Duffel API v2 types AIFlyTrip reads. Fields are typed as
 * optional/nullable where the API allows it so the mapper stays defensive.
 * Reference: https://duffel.com/docs/api/v2/offer-requests
 */

export type DuffelCabinClass =
  "economy" | "premium_economy" | "business" | "first";

export type DuffelOfferRequestInput = {
  slices: { origin: string; destination: string; departure_date: string }[];
  passengers: { type: "adult" }[];
  cabin_class?: DuffelCabinClass;
  max_connections?: 0 | 1 | 2;
};

export type DuffelAirline = {
  iata_code?: string | null;
  name?: string | null;
};

export type DuffelPlace = {
  iata_code?: string | null;
  name?: string | null;
  time_zone?: string | null;
  city_name?: string | null;
};

export type DuffelSegment = {
  id?: string;
  origin?: DuffelPlace | null;
  destination?: DuffelPlace | null;
  /** Local time at the origin airport, without offset: "2026-11-10T09:30:00". */
  departing_at?: string | null;
  /** Local time at the destination airport, without offset. */
  arriving_at?: string | null;
  /** ISO 8601 duration, e.g. "PT7H20M". */
  duration?: string | null;
  marketing_carrier?: DuffelAirline | null;
  operating_carrier?: DuffelAirline | null;
  marketing_carrier_flight_number?: string | null;
};

export type DuffelSlice = {
  origin?: DuffelPlace | null;
  destination?: DuffelPlace | null;
  duration?: string | null;
  segments?: DuffelSegment[] | null;
};

export type DuffelOffer = {
  id: string;
  total_amount: string;
  total_currency: string;
  expires_at?: string | null;
  owner?: DuffelAirline | null;
  slices?: DuffelSlice[] | null;
};

export type DuffelOfferRequest = {
  id: string;
  live_mode?: boolean;
  offers?: DuffelOffer[] | null;
};

export type DuffelErrorBody = {
  errors?: {
    type?: string;
    code?: string;
    title?: string;
    message?: string;
  }[];
  meta?: { request_id?: string; status?: number };
};
