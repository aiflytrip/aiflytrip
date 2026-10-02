import { z } from "zod";

import { daysBetween } from "@/features/flights/lib/dates";
import {
  parseFlightSearch,
  type RawSearchParams,
  type SearchFieldErrors,
  type SearchFormValues,
} from "@/features/flights/lib/search-params";
import { type FlightSearch } from "@/features/flights/types";

export const MAX_TRIP_DAYS = 14;
export const MAX_NOTES_LENGTH = 1000;

export const PACES = ["relaxed", "balanced", "packed"] as const;
export type Pace = (typeof PACES)[number];
export const PACE_LABELS: Record<Pace, string> = {
  relaxed: "Relaxed",
  balanced: "Balanced",
  packed: "Packed",
};

export const INTERESTS = [
  "food",
  "culture",
  "history",
  "nature",
  "beaches",
  "nightlife",
  "shopping",
  "art",
  "adventure",
  "family",
] as const;
export type Interest = (typeof INTERESTS)[number];

export const BUDGET_CURRENCIES = [
  "USD",
  "EUR",
  "GBP",
  "AUD",
  "CAD",
  "INR",
  "PKR",
  "AED",
  "SGD",
  "JPY",
] as const;

export type PlanPreferences = {
  budgetAmount: number | null;
  budgetCurrency: string;
  pace: Pace;
  interests: Interest[];
  notes: string;
};

export type PlanRequest = {
  search: FlightSearch & { returnDate: string };
  preferences: PlanPreferences;
  tripDays: number;
};

export type PlanFormValues = SearchFormValues & {
  budgetAmount: string;
  budgetCurrency: string;
  pace: string;
  interests: string[];
  notes: string;
};

export type PlanFieldErrors = SearchFieldErrors &
  Partial<
    Record<
      "budgetAmount" | "budgetCurrency" | "pace" | "interests" | "notes",
      string
    >
  >;

export type ParsedPlanRequest =
  | { ok: true; request: PlanRequest; values: PlanFormValues }
  | { ok: false; errors: PlanFieldErrors; values: PlanFormValues };

const preferencesSchema = z.object({
  budgetAmount: z
    .string()
    .trim()
    .transform((value) => value.replace(/[,\s]/g, ""))
    .refine(
      (value) => value === "" || /^\d{1,9}$/.test(value),
      "Enter a whole number, e.g. 2500",
    )
    .transform((value) => (value === "" ? null : Number(value))),
  budgetCurrency: z.enum(BUDGET_CURRENCIES, "Choose a currency"),
  pace: z.enum(PACES, "Choose a pace"),
  interests: z.array(z.enum(INTERESTS)).max(INTERESTS.length),
  notes: z
    .string()
    .trim()
    .max(MAX_NOTES_LENGTH, `Keep notes under ${MAX_NOTES_LENGTH} characters`),
});

function text(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

/** Validates the planner form. `today` (YYYY-MM-DD, UTC) is injectable for tests. */
export function parsePlanForm(
  formData: FormData,
  today: string,
): ParsedPlanRequest {
  const raw: RawSearchParams = {
    trip: "round_trip",
    from: text(formData, "from"),
    to: text(formData, "to"),
    depart: text(formData, "depart"),
    return: text(formData, "return"),
    adults: text(formData, "adults") || "1",
    cabin: text(formData, "cabin") || "economy",
  };
  const flight = parseFlightSearch(raw, today);
  const prefsInput = {
    budgetAmount: text(formData, "budgetAmount"),
    budgetCurrency: text(formData, "budgetCurrency") || "USD",
    pace: text(formData, "pace") || "balanced",
    interests: formData
      .getAll("interests")
      .filter((v): v is string => typeof v === "string"),
    notes: text(formData, "notes"),
  };
  const values: PlanFormValues = { ...flight.values, ...prefsInput };

  const errors: PlanFieldErrors = {};
  if (flight.status === "empty") {
    errors.origin = "Enter where you're flying from";
    errors.destination = "Enter where you're flying to";
    errors.departDate = "Choose a departure date";
  } else if (flight.status === "invalid") {
    Object.assign(errors, flight.errors);
  }

  const prefs = preferencesSchema.safeParse(prefsInput);
  if (!prefs.success) {
    for (const issue of prefs.error.issues) {
      const field = issue.path[0] as keyof PlanFieldErrors;
      errors[field] ??=
        field === "interests"
          ? "Choose interests from the list"
          : issue.message;
    }
  }

  if (flight.status === "valid" && flight.search.returnDate) {
    const days =
      daysBetween(flight.search.departDate, flight.search.returnDate) + 1;
    if (days > MAX_TRIP_DAYS)
      errors.returnDate = `Plans can cover up to ${MAX_TRIP_DAYS} days`;
  }

  if (
    Object.keys(errors).length > 0 ||
    flight.status !== "valid" ||
    !prefs.success ||
    !flight.search.returnDate
  ) {
    return { ok: false, errors, values };
  }

  const search = { ...flight.search, returnDate: flight.search.returnDate };
  return {
    ok: true,
    values,
    request: {
      search,
      preferences: {
        ...prefs.data,
        interests: [...new Set(prefs.data.interests)],
      },
      tripDays: daysBetween(search.departDate, search.returnDate) + 1,
    },
  };
}
