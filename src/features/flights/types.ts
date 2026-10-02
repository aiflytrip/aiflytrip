export const TRIP_TYPES = ["round_trip", "one_way"] as const;
export type TripType = (typeof TRIP_TYPES)[number];

export const CABIN_CLASSES = [
  "economy",
  "premium_economy",
  "business",
  "first",
] as const;
export type CabinClass = (typeof CABIN_CLASSES)[number];

export const CABIN_LABELS: Record<CabinClass, string> = {
  economy: "Economy",
  premium_economy: "Premium economy",
  business: "Business",
  first: "First",
};

export const MAX_TRAVELLERS = 9;

export type Airport = {
  /** IATA code, e.g. "JFK". */
  code: string;
  name: string;
  city: string;
  country: string;
  /** IANA time zone used to display local times. */
  timeZone: string;
  lat: number;
  lon: number;
};

export type Airline = {
  code: string;
  name: string;
};

/** A validated search, as accepted by flight providers. */
export type FlightSearch = {
  tripType: TripType;
  origin: string;
  destination: string;
  /** ISO calendar date, YYYY-MM-DD. */
  departDate: string;
  /** ISO calendar date; only present for round trips. */
  returnDate?: string;
  adults: number;
  cabin: CabinClass;
};

export type FlightSegment = {
  flightNumber: string;
  airline: Airline;
  origin: string;
  destination: string;
  /** ISO 8601 UTC timestamp. */
  departAt: string;
  /** ISO 8601 UTC timestamp. */
  arriveAt: string;
  durationMinutes: number;
};

/** One direction of travel: a list of segments with connections between them. */
export type FlightItinerary = {
  segments: FlightSegment[];
  durationMinutes: number;
  stops: number;
};

export type Money = {
  /** Amount in minor units (cents) to avoid floating-point rounding. */
  amountMinor: number;
  currency: string;
};

export type FlightOffer = {
  id: string;
  outbound: FlightItinerary;
  inbound?: FlightItinerary;
  /** Total for all travellers. */
  totalPrice: Money;
  pricePerTraveller: Money;
  cabin: CabinClass;
};
