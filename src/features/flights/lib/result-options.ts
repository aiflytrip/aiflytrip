import { type RawSearchParams } from "@/features/flights/lib/search-params";
import { type FlightOffer } from "@/features/flights/types";

export const SORT_OPTIONS = ["price", "duration", "departure"] as const;
export type SortOption = (typeof SORT_OPTIONS)[number];

export const STOPS_OPTIONS = ["any", "nonstop"] as const;
export type StopsOption = (typeof STOPS_OPTIONS)[number];

export type ResultOptions = {
  sort: SortOption;
  stops: StopsOption;
};

export const DEFAULT_RESULT_OPTIONS: ResultOptions = {
  sort: "price",
  stops: "any",
};

function oneOf<T extends string>(
  allowed: readonly T[],
  value: unknown,
  fallback: T,
): T {
  return typeof value === "string" &&
    (allowed as readonly string[]).includes(value)
    ? (value as T)
    : fallback;
}

/** Unknown or malformed values fall back to defaults rather than erroring. */
export function parseResultOptions(params: RawSearchParams): ResultOptions {
  return {
    sort: oneOf(SORT_OPTIONS, params.sort, DEFAULT_RESULT_OPTIONS.sort),
    stops: oneOf(STOPS_OPTIONS, params.stops, DEFAULT_RESULT_OPTIONS.stops),
  };
}

function totalDuration(offer: FlightOffer): number {
  return offer.outbound.durationMinutes + (offer.inbound?.durationMinutes ?? 0);
}

function isNonstop(offer: FlightOffer): boolean {
  return offer.outbound.stops === 0 && (offer.inbound?.stops ?? 0) === 0;
}

const comparators: Record<
  SortOption,
  (a: FlightOffer, b: FlightOffer) => number
> = {
  price: (a, b) => a.totalPrice.amountMinor - b.totalPrice.amountMinor,
  duration: (a, b) => totalDuration(a) - totalDuration(b),
  departure: (a, b) =>
    (a.outbound.segments[0]?.departAt ?? "").localeCompare(
      b.outbound.segments[0]?.departAt ?? "",
    ),
};

/** Filters and sorts offers. Ties keep a stable order by price. */
export function applyResultOptions(
  offers: readonly FlightOffer[],
  options: ResultOptions,
): FlightOffer[] {
  const filtered =
    options.stops === "nonstop" ? offers.filter(isNonstop) : [...offers];
  const compare = comparators[options.sort];
  return filtered.sort((a, b) => compare(a, b) || comparators.price(a, b));
}

/** Writes non-default options onto existing search params. */
export function withResultOptions(
  params: URLSearchParams,
  options: ResultOptions,
): URLSearchParams {
  const next = new URLSearchParams(params);
  next.delete("sort");
  next.delete("stops");
  if (options.sort !== DEFAULT_RESULT_OPTIONS.sort)
    next.set("sort", options.sort);
  if (options.stops !== DEFAULT_RESULT_OPTIONS.stops)
    next.set("stops", options.stops);
  return next;
}
