import { MOCK_AIRLINES } from "@/features/flights/data/airlines";
import { getAirport, HUB_CODES } from "@/features/flights/data/airports";
import { zonedTimeToUtc } from "@/features/flights/lib/dates";
import {
  createRandom,
  hashString,
  type Random,
} from "@/features/flights/lib/random";
import { type FlightSearchProvider } from "@/features/flights/server/provider";
import {
  type Airline,
  type Airport,
  type CabinClass,
  type FlightItinerary,
  type FlightOffer,
  type FlightSearch,
  type FlightSegment,
} from "@/features/flights/types";

const CRUISE_KMH = 820;
/** Taxi, climb and descent overhead per flight. */
const OVERHEAD_MINUTES = 35;
/** A connection must not add more than this share of extra distance. */
const MAX_DETOUR = 1.35;

const CABIN_PRICE_MULTIPLIER: Record<CabinClass, number> = {
  economy: 1,
  premium_economy: 1.6,
  business: 3.4,
  first: 5.5,
};

const roundTo5 = (minutes: number) => Math.max(5, Math.round(minutes / 5) * 5);

/** Great-circle distance in km (haversine). */
export function distanceKm(a: Airport, b: Airport): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

function flightMinutes(km: number): number {
  return roundTo5((km / CRUISE_KMH) * 60 + OVERHEAD_MINUTES);
}

/** Hubs that make sense for connecting between two airports. */
function viableHubs(origin: Airport, destination: Airport): Airport[] {
  const direct = distanceKm(origin, destination);
  return HUB_CODES.flatMap((code) => {
    const hub = getAirport(code);
    if (!hub || hub.code === origin.code || hub.code === destination.code)
      return [];
    const viaHub = distanceKm(origin, hub) + distanceKm(hub, destination);
    return viaHub <= direct * MAX_DETOUR + 300 ? [hub] : [];
  });
}

function buildSegment(
  rng: Random,
  airline: Airline,
  from: Airport,
  to: Airport,
  departAt: Date,
): FlightSegment {
  const durationMinutes = flightMinutes(distanceKm(from, to));
  return {
    flightNumber: `${airline.code} ${rng.int(100, 9899)}`,
    airline,
    origin: from.code,
    destination: to.code,
    originTimeZone: from.timeZone,
    destinationTimeZone: to.timeZone,
    departAt: departAt.toISOString(),
    arriveAt: new Date(
      departAt.getTime() + durationMinutes * 60_000,
    ).toISOString(),
    durationMinutes,
  };
}

function buildItinerary(
  rng: Random,
  airline: Airline,
  from: Airport,
  to: Airport,
  date: string,
  hub: Airport | undefined,
): FlightItinerary {
  // Local departure between 06:00 and 22:30, on a 5-minute grid.
  const departLocalMinutes = 6 * 60 + rng.int(0, 198) * 5;
  const departAt = zonedTimeToUtc(date, departLocalMinutes, from.timeZone);

  const segments: FlightSegment[] = [];
  if (hub) {
    const first = buildSegment(rng, airline, from, hub, departAt);
    const layoverMinutes = roundTo5(rng.int(55, 210));
    const connectAt = new Date(
      Date.parse(first.arriveAt) + layoverMinutes * 60_000,
    );
    segments.push(first, buildSegment(rng, airline, hub, to, connectAt));
  } else {
    segments.push(buildSegment(rng, airline, from, to, departAt));
  }

  const start = Date.parse(segments[0]!.departAt);
  const end = Date.parse(segments.at(-1)!.arriveAt);
  return {
    segments,
    durationMinutes: Math.round((end - start) / 60_000),
    stops: segments.length - 1,
  };
}

/** Deterministic fake offers: the same search always returns the same list. */
export function generateMockOffers(query: FlightSearch): FlightOffer[] {
  const origin = getAirport(query.origin);
  const destination = getAirport(query.destination);
  if (!origin || !destination) return [];

  const seed = hashString(
    [
      query.origin,
      query.destination,
      query.departDate,
      query.returnDate ?? "",
    ].join("|"),
  );
  const rng = createRandom(seed);
  const hubs = viableHubs(origin, destination);
  const directKm = distanceKm(origin, destination);
  const count = rng.int(9, 14);

  const offers: FlightOffer[] = [];
  for (let i = 0; i < count; i++) {
    const airline = rng.pick(MOCK_AIRLINES);
    // Short routes are mostly nonstop; long ones mostly connect.
    const nonstopChance = directKm < 2500 ? 0.75 : 0.4;
    const hub =
      hubs.length > 0 && rng.next() > nonstopChance
        ? rng.pick(hubs)
        : undefined;

    const outbound = buildItinerary(
      rng,
      airline,
      origin,
      destination,
      query.departDate,
      hub,
    );
    const inbound = query.returnDate
      ? buildItinerary(rng, airline, destination, origin, query.returnDate, hub)
      : undefined;

    const oneWayBaseUsd = 45 + directKm * 0.085;
    const nonstopPremium = hub ? 1 : 1.18;
    const noise = 0.8 + rng.next() * 0.5;
    const tripFactor = inbound ? 1.85 : 1;
    const perTravellerMinor =
      Math.round(
        oneWayBaseUsd *
          CABIN_PRICE_MULTIPLIER[query.cabin] *
          nonstopPremium *
          noise *
          tripFactor,
      ) * 100;

    offers.push({
      id: `mock-${seed.toString(36)}-${i}`,
      outbound,
      inbound,
      cabin: query.cabin,
      pricePerTraveller: { amountMinor: perTravellerMinor, currency: "USD" },
      totalPrice: {
        amountMinor: perTravellerMinor * query.adults,
        currency: "USD",
      },
    });
  }
  return offers;
}

export const mockFlightProvider: FlightSearchProvider = {
  source: { id: "mock", name: "Sample data", mode: "sample" },
  async search(query) {
    return generateMockOffers(query);
  },
};
