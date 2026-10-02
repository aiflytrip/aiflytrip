import { zonedTimeToUtc } from "@/features/flights/lib/dates";
import { divideMoney, parseMoney } from "@/features/flights/lib/money";
import {
  type Airline,
  type CabinClass,
  type FlightItinerary,
  type FlightOffer,
  type FlightSearch,
  type FlightSegment,
} from "@/features/flights/types";
import {
  type DuffelAirline,
  type DuffelOffer,
  type DuffelOfferRequestInput,
  type DuffelSegment,
  type DuffelSlice,
} from "@/server/duffel/types";

/** Builds the Duffel offer request body for a validated search. */
export function toDuffelOfferRequest(
  search: FlightSearch,
): DuffelOfferRequestInput {
  const slices = [
    {
      origin: search.origin,
      destination: search.destination,
      departure_date: search.departDate,
    },
  ];
  if (search.returnDate) {
    slices.push({
      origin: search.destination,
      destination: search.origin,
      departure_date: search.returnDate,
    });
  }
  return {
    slices,
    passengers: Array.from({ length: search.adults }, () => ({
      type: "adult" as const,
    })),
    cabin_class: search.cabin,
    // Duffel recommends 0 or 1; the "Nonstop only" filter is applied to these results.
    max_connections: 1,
  };
}

/** "PT7H20M" / "P1DT2H5M" → minutes. Returns undefined when unparseable. */
export function parseIsoDuration(
  value: string | null | undefined,
): number | undefined {
  const match =
    /^P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/.exec(
      value ?? "",
    );
  if (!match || value === "P" || value === "PT") return undefined;
  const [, days = "0", hours = "0", minutes = "0", seconds = "0"] = match;
  return (
    Number(days) * 1440 +
    Number(hours) * 60 +
    Number(minutes) +
    Math.round(Number(seconds) / 60)
  );
}

/** Duffel local time ("2026-11-10T09:30:00") at a time zone → UTC ISO string. */
export function localTimeToUtc(
  local: string | null | undefined,
  timeZone: string,
): string | undefined {
  const match = /^(\d{4}-\d{2}-\d{2})T(\d{2}):(\d{2})/.exec(local ?? "");
  if (!match) return undefined;
  const [, date, hours, minutes] = match;
  try {
    return zonedTimeToUtc(
      date!,
      Number(hours) * 60 + Number(minutes),
      timeZone,
    ).toISOString();
  } catch {
    return undefined; // Unknown time zone identifier.
  }
}

function toAirline(
  airline: DuffelAirline | null | undefined,
): Airline | undefined {
  const code = airline?.iata_code?.trim();
  const name = airline?.name?.trim();
  if (!code && !name) return undefined;
  return { code: code ?? "", name: name || code || "Unknown airline" };
}

function mapSegment(segment: DuffelSegment): FlightSegment | undefined {
  const origin = segment.origin?.iata_code;
  const destination = segment.destination?.iata_code;
  const originTimeZone = segment.origin?.time_zone;
  const destinationTimeZone = segment.destination?.time_zone;
  const airline =
    toAirline(segment.marketing_carrier) ??
    toAirline(segment.operating_carrier);
  if (
    !origin ||
    !destination ||
    !originTimeZone ||
    !destinationTimeZone ||
    !airline
  ) {
    return undefined;
  }

  const departAt = localTimeToUtc(segment.departing_at, originTimeZone);
  const arriveAt = localTimeToUtc(segment.arriving_at, destinationTimeZone);
  if (!departAt || !arriveAt) return undefined;

  const durationMinutes =
    parseIsoDuration(segment.duration) ??
    Math.round((Date.parse(arriveAt) - Date.parse(departAt)) / 60_000);

  const operating = toAirline(segment.operating_carrier);
  const flightNumber = segment.marketing_carrier_flight_number?.trim();

  return {
    flightNumber: [airline.code, flightNumber].filter(Boolean).join(" "),
    airline,
    operatingCarrier:
      operating &&
      (operating.code !== airline.code || operating.name !== airline.name)
        ? operating
        : undefined,
    origin,
    destination,
    originTimeZone,
    destinationTimeZone,
    departAt,
    arriveAt,
    durationMinutes,
  };
}

function mapSlice(slice: DuffelSlice | undefined): FlightItinerary | undefined {
  const rawSegments = slice?.segments ?? [];
  if (rawSegments.length === 0) return undefined;

  const segments: FlightSegment[] = [];
  for (const raw of rawSegments) {
    const segment = mapSegment(raw);
    if (!segment) return undefined; // A partial itinerary would be misleading.
    segments.push(segment);
  }

  const elapsed = Math.round(
    (Date.parse(segments.at(-1)!.arriveAt) -
      Date.parse(segments[0]!.departAt)) /
      60_000,
  );
  return {
    segments,
    durationMinutes: parseIsoDuration(slice?.duration) ?? elapsed,
    stops: segments.length - 1,
  };
}

/**
 * Maps a Duffel offer to AIFlyTrip's model. Returns undefined for offers that
 * are malformed or don't match the requested shape, so they're skipped
 * rather than shown incorrectly.
 */
export function mapDuffelOffer(
  offer: DuffelOffer,
  search: Pick<FlightSearch, "adults" | "cabin" | "returnDate">,
): FlightOffer | undefined {
  const expectedSlices = search.returnDate ? 2 : 1;
  if (offer.slices?.length !== expectedSlices) return undefined;

  const outbound = mapSlice(offer.slices[0]);
  const inbound = search.returnDate ? mapSlice(offer.slices[1]) : undefined;
  if (!outbound || (search.returnDate && !inbound)) return undefined;

  const totalPrice = parseMoney(offer.total_amount, offer.total_currency);
  if (!totalPrice) return undefined;

  const cabin: CabinClass = search.cabin;
  return {
    id: offer.id,
    outbound,
    inbound,
    totalPrice,
    pricePerTraveller: divideMoney(totalPrice, search.adults),
    cabin,
    expiresAt: offer.expires_at ?? undefined,
  };
}
