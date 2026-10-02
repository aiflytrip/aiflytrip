import { z } from "zod";

import {
  isKnownAirportCode,
  normalizeAirportInput,
} from "@/features/flights/data/airports";
import { addDays, isIsoDate } from "@/features/flights/lib/dates";
import {
  CABIN_CLASSES,
  MAX_TRAVELLERS,
  TRIP_TYPES,
  type FlightSearch,
} from "@/features/flights/types";

/** How far ahead flights can be searched. */
export const MAX_DAYS_AHEAD = 360;

/**
 * URL query keys. The search form uses the same names for its fields, so a
 * submitted form produces exactly these params.
 */
export const SEARCH_KEYS = {
  tripType: "trip",
  origin: "from",
  destination: "to",
  departDate: "depart",
  returnDate: "return",
  adults: "adults",
  cabin: "cabin",
} as const;

type SearchField = keyof typeof SEARCH_KEYS;

/** Raw form values as strings, used to re-fill the form after validation. */
export type SearchFormValues = Record<SearchField, string>;
export type SearchFieldErrors = Partial<Record<SearchField, string>>;

export type RawSearchParams = Record<string, string | string[] | undefined>;

export type ParsedSearch =
  | { status: "empty"; values: SearchFormValues }
  | { status: "invalid"; values: SearchFormValues; errors: SearchFieldErrors }
  | { status: "valid"; values: SearchFormValues; search: FlightSearch };

export const DEFAULT_FORM_VALUES: SearchFormValues = {
  tripType: "round_trip",
  origin: "",
  destination: "",
  departDate: "",
  returnDate: "",
  adults: "1",
  cabin: "economy",
};

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function airportField(label: string) {
  return z
    .string()
    .trim()
    .min(1, `Enter ${label}`)
    .transform(normalizeAirportInput)
    .refine(isKnownAirportCode, "Choose an airport from the list");
}

const dateField = (label: string) =>
  z
    .string()
    .trim()
    .min(1, `Choose ${label}`)
    .refine(isIsoDate, "Enter a valid date");

function buildSchema(today: string) {
  // Accept "yesterday" in UTC: for travellers west of UTC it may still be today.
  const earliest = addDays(today, -1);
  const latest = addDays(today, MAX_DAYS_AHEAD);

  return z
    .object({
      tripType: z.enum(TRIP_TYPES, "Choose a trip type"),
      origin: airportField("where you're flying from"),
      destination: airportField("where you're flying to"),
      departDate: dateField("a departure date"),
      returnDate: z.string().trim(),
      adults: z.coerce
        .number("Choose the number of travellers")
        .int()
        .min(1, "At least 1 traveller is required")
        .max(MAX_TRAVELLERS, `Up to ${MAX_TRAVELLERS} travellers per booking`),
      cabin: z.enum(CABIN_CLASSES, "Choose a cabin class"),
    })
    .superRefine((value, ctx) => {
      if (value.origin === value.destination) {
        ctx.addIssue({
          code: "custom",
          path: ["destination"],
          message: "Destination must be different from origin",
        });
      }
      if (value.departDate < earliest) {
        ctx.addIssue({
          code: "custom",
          path: ["departDate"],
          message: "Departure date can't be in the past",
        });
      } else if (value.departDate > latest) {
        ctx.addIssue({
          code: "custom",
          path: ["departDate"],
          message: "Flights can be searched up to about a year ahead",
        });
      }
      if (value.tripType !== "round_trip") return;
      if (!value.returnDate) {
        ctx.addIssue({
          code: "custom",
          path: ["returnDate"],
          message: "Choose a return date",
        });
      } else if (!isIsoDate(value.returnDate)) {
        ctx.addIssue({
          code: "custom",
          path: ["returnDate"],
          message: "Enter a valid date",
        });
      } else if (value.returnDate < value.departDate) {
        ctx.addIssue({
          code: "custom",
          path: ["returnDate"],
          message: "Return date must be on or after departure",
        });
      } else if (value.returnDate > latest) {
        ctx.addIssue({
          code: "custom",
          path: ["returnDate"],
          message: "Flights can be searched up to about a year ahead",
        });
      }
    });
}

/**
 * Validates URL search params into a `FlightSearch`.
 * `today` (YYYY-MM-DD, UTC) is injectable for deterministic tests.
 */
export function parseFlightSearch(
  params: RawSearchParams,
  today: string,
): ParsedSearch {
  const values = { ...DEFAULT_FORM_VALUES };
  for (const field of Object.keys(SEARCH_KEYS) as SearchField[]) {
    const raw = first(params[SEARCH_KEYS[field]]);
    if (raw !== undefined) values[field] = raw;
  }

  const hasInput = [values.origin, values.destination, values.departDate].some(
    (value) => value.trim() !== "",
  );
  if (!hasInput) return { status: "empty", values };

  const result = buildSchema(today).safeParse(values);
  if (!result.success) {
    const errors: SearchFieldErrors = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as SearchField | undefined;
      if (field && !errors[field]) errors[field] = issue.message;
    }
    return { status: "invalid", values, errors };
  }

  const data = result.data;
  return {
    status: "valid",
    values,
    search: {
      tripType: data.tripType,
      origin: data.origin,
      destination: data.destination,
      departDate: data.departDate,
      returnDate: data.tripType === "round_trip" ? data.returnDate : undefined,
      adults: data.adults,
      cabin: data.cabin,
    },
  };
}

/** Serializes a validated search back to URL params (canonical form). */
export function searchToParams(search: FlightSearch): URLSearchParams {
  const params = new URLSearchParams({
    [SEARCH_KEYS.tripType]: search.tripType,
    [SEARCH_KEYS.origin]: search.origin,
    [SEARCH_KEYS.destination]: search.destination,
    [SEARCH_KEYS.departDate]: search.departDate,
  });
  if (search.returnDate) params.set(SEARCH_KEYS.returnDate, search.returnDate);
  params.set(SEARCH_KEYS.adults, String(search.adults));
  params.set(SEARCH_KEYS.cabin, search.cabin);
  return params;
}
