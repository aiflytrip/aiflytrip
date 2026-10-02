import "server-only";

import { getAirport } from "@/features/flights/data/airports";
import { DEFAULT_RESULT_OPTIONS } from "@/features/flights/lib/result-options";
import { FlightSearchError } from "@/features/flights/server/errors";
import { searchFlights } from "@/features/flights/server/search-flights";
import { type FlightDataSource } from "@/features/flights/types";
import {
  selectFlightOptions,
  snapshotOffer,
  type FlightOptionSnapshot,
} from "@/features/trip-planner/lib/flight-options";
import { type PlanRequest } from "@/features/trip-planner/lib/request";
import { type StoredItinerary } from "@/features/trip-planner/lib/stored-plan";
import { generatePlan } from "@/features/trip-planner/server/generate-plan";
import { type Json } from "@/lib/supabase/database.types";
import { getAnthropicClient } from "@/server/anthropic/client";
import { createClient } from "@/server/supabase/server";

type SupabaseClient = NonNullable<Awaited<ReturnType<typeof createClient>>>;

function placeLabel(code: string): string {
  const airport = getAirport(code);
  return airport
    ? `${airport.city} (${airport.code}), ${airport.country}`
    : code;
}

async function markFailed(
  supabase: SupabaseClient,
  planId: string,
  code: string,
) {
  const { error } = await supabase
    .from("travel_plans")
    .update({ status: "failed", error_message: code })
    .eq("id", planId);
  if (error)
    console.error("[planner] could not mark plan failed", {
      planId,
      code: error.code,
    });
}

/**
 * Generates a plan for an existing `pending` travel_plans row. Runs after the
 * response is sent (Next.js `after()` from a Server Action), using the
 * signed-in user's session, so RLS still applies to every write.
 */
export async function runPlan(
  planId: string,
  tripId: string,
  request: PlanRequest,
): Promise<void> {
  const supabase = await createClient();
  if (!supabase) return;

  try {
    await supabase
      .from("travel_plans")
      .update({ status: "generating" })
      .eq("id", planId);

    const client = getAnthropicClient();
    if (!client) return markFailed(supabase, planId, "configuration");

    // Real flight options (Duffel test mode or sample data), cached server-side.
    let flightOptions: FlightOptionSnapshot[] = [];
    let flightSource: FlightDataSource | null = null;
    try {
      const result = await searchFlights(
        request.search,
        DEFAULT_RESULT_OPTIONS,
      );
      flightOptions = selectFlightOptions(result.offers).map(snapshotOffer);
      flightSource = result.source;
    } catch (error) {
      // A plan without flight suggestions is still useful; say so in the prompt.
      if (!(error instanceof FlightSearchError)) throw error;
      console.warn("[planner] flight search failed; planning without flights", {
        planId,
        kind: error.kind,
      });
    }

    const result = await generatePlan(client, request, {
      origin: placeLabel(request.search.origin),
      destination: placeLabel(request.search.destination),
      flightOptions,
    });

    if (!result.ok) {
      console.error("[planner] generation failed", {
        planId,
        reason: result.reason,
        detail: result.detail,
      });
      return markFailed(supabase, planId, result.reason);
    }

    // Token usage per plan is the main cost signal, so log it on success.
    // eslint-disable-next-line no-console
    console.info("[planner] plan ready", {
      planId,
      model: result.model,
      tokens: result.usage,
    });
    const itinerary: StoredItinerary = {
      version: 1,
      plan: result.plan,
      flightOptions,
      flightSource,
      usage: result.usage,
    };
    const { error: saveError } = await supabase
      .from("travel_plans")
      .update({
        status: "ready",
        summary: result.plan.summary,
        itinerary: itinerary as unknown as Json,
        model: result.model,
        error_message: null,
      })
      .eq("id", planId);
    if (saveError) {
      console.error("[planner] could not save plan", {
        planId,
        code: saveError.code,
      });
      return markFailed(supabase, planId, "internal");
    }
    await supabase
      .from("trips")
      .update({ status: "planned", title: result.plan.title })
      .eq("id", tripId);
  } catch (error) {
    console.error("[planner] unexpected error", {
      planId,
      error: error instanceof Error ? error.name : "unknown",
    });
    await markFailed(supabase, planId, "internal");
  }
}
