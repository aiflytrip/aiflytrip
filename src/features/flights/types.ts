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
  /** Marketing carrier: the airline selling the flight under its code. */
  airline: Airline;
  /** Airline flying the aircraft, when it differs from the marketing carrier. */
  operatingCarrier?: Airline;
  /** IATA airport code. */
  origin: string;
  destination: string;
  /** IANA time zones of the airports, used to display local times. */
  originTimeZone: string;
  destinationTimeZone: string;
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
  /**
   * Amount in the currency's minor units (cents for USD, whole yen for JPY)
   * to avoid floating-point rounding.
   */
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
  /** ISO 8601 timestamp after which the provider no longer honours the price. */
  expiresAt?: string;
};

/** Where results came from, so the UI can label test and sample data. */
export type FlightDataSource = {
  /** Stable identifier, e.g. "mock" or "duffel". */
  id: string;
  /** Human-readable provider name. */
  name: string;
  /** "sample": generated locally. "test": provider sandbox. "live": real fares. */
  mode: "sample" | "test" | "live";
};
