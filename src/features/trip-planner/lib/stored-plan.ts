import { type FlightDataSource } from "@/features/flights/types";
import { type FlightOptionSnapshot } from "@/features/trip-planner/lib/flight-options";
import { type PlanOutput } from "@/features/trip-planner/lib/plan-schema";

/** What's stored in travel_plans.itinerary (jsonb). */
export type StoredItinerary = {
  version: 1;
  plan: PlanOutput;
  /** Snapshot of the options the model saw, so the plan renders after offers expire. */
  flightOptions: FlightOptionSnapshot[];
  flightSource: FlightDataSource | null;
  usage?: { input: number; output: number };
};

export type PlanStatus = "pending" | "generating" | "ready" | "failed";

/** A plan stuck in progress this long is shown as failed (e.g. server restarted). */
export const STALE_AFTER_MS = 6 * 60_000;

export function effectiveStatus(
  status: PlanStatus,
  updatedAt: string,
  now = Date.now(),
): PlanStatus {
  if (
    (status === "pending" || status === "generating") &&
    now - Date.parse(updatedAt) > STALE_AFTER_MS
  ) {
    return "failed";
  }
  return status;
}

export const FAILURE_MESSAGES: Record<string, string> = {
  refused:
    "We couldn't create a plan for this request. Try rephrasing your notes.",
  truncated:
    "The plan came out too long to finish. Try a shorter trip or fewer notes.",
  invalid_output: "The planner returned an incomplete plan. Please try again.",
  rate_limited:
    "The AI planner is busy right now. Please try again in a minute.",
  unavailable:
    "The AI planner is temporarily unavailable. Please try again shortly.",
  configuration: "The AI planner isn't set up correctly on the server.",
  timed_out: "This plan took too long and was stopped. Please try again.",
  internal: "Something went wrong while creating your plan. Please try again.",
};

export function failureMessage(code: string | null | undefined): string {
  return (code && FAILURE_MESSAGES[code]) || FAILURE_MESSAGES.internal!;
}

export function isStoredItinerary(value: unknown): value is StoredItinerary {
  if (!value || typeof value !== "object") return false;
  const v = value as Partial<StoredItinerary>;
  return (
    v.version === 1 &&
    typeof v.plan === "object" &&
    Array.isArray(v.flightOptions)
  );
}
