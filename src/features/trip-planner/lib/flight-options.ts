import { toIsoDate } from "@/features/flights/lib/dates";
import {
  formatDuration,
  formatMoney,
  formatTime,
} from "@/features/flights/lib/format";
import {
  type FlightItinerary,
  type FlightOffer,
} from "@/features/flights/types";

export const MAX_FLIGHT_OPTIONS = 8;

/** Compact, display-ready snapshot of an offer, stored with the plan. */
export type FlightOptionSnapshot = {
  id: string;
  airlines: string[];
  price: string;
  pricePerTraveller: string;
  outbound: LegSnapshot;
  inbound: LegSnapshot | null;
};

type LegSnapshot = {
  from: string;
  to: string;
  departs: string;
  arrives: string;
  duration: string;
  stops: number;
  via: string[];
};

const totalMinutes = (offer: FlightOffer) =>
  offer.outbound.durationMinutes + (offer.inbound?.durationMinutes ?? 0);

/**
 * Picks a small, varied set of options for the model: the cheapest and the
 * fastest, interleaved and de-duplicated. Keeps the prompt short and gives
 * the model real trade-offs to reason about.
 */
export function selectFlightOptions(
  offers: readonly FlightOffer[],
  limit = MAX_FLIGHT_OPTIONS,
): FlightOffer[] {
  const cheapest = [...offers].sort(
    (a, b) => a.totalPrice.amountMinor - b.totalPrice.amountMinor,
  );
  const fastest = [...offers].sort((a, b) => totalMinutes(a) - totalMinutes(b));
  const picked = new Map<string, FlightOffer>();
  for (
    let i = 0;
    picked.size < limit && (i < cheapest.length || i < fastest.length);
    i++
  ) {
    for (const offer of [cheapest[i], fastest[i]]) {
      if (offer && picked.size < limit) picked.set(offer.id, offer);
    }
  }
  return [...picked.values()];
}

function legSnapshot(leg: FlightItinerary): LegSnapshot {
  const first = leg.segments[0]!;
  const last = leg.segments.at(-1)!;
  return {
    from: first.origin,
    to: last.destination,
    departs: `${toIsoDate(new Date(first.departAt), first.originTimeZone)} ${formatTime(first.departAt, first.originTimeZone)} local`,
    arrives: `${toIsoDate(new Date(last.arriveAt), last.destinationTimeZone)} ${formatTime(last.arriveAt, last.destinationTimeZone)} local`,
    duration: formatDuration(leg.durationMinutes),
    stops: leg.stops,
    via: leg.segments.slice(0, -1).map((segment) => segment.destination),
  };
}

export function snapshotOffer(offer: FlightOffer): FlightOptionSnapshot {
  const segments = [
    ...offer.outbound.segments,
    ...(offer.inbound?.segments ?? []),
  ];
  return {
    id: offer.id,
    airlines: [...new Set(segments.map((segment) => segment.airline.name))],
    price: formatMoney(offer.totalPrice),
    pricePerTraveller: formatMoney(offer.pricePerTraveller),
    outbound: legSnapshot(offer.outbound),
    inbound: offer.inbound ? legSnapshot(offer.inbound) : null,
  };
}
