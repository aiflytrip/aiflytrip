import { z } from "zod";

import { formatDate } from "@/features/flights/lib/format";
import { renderPlanPdf } from "@/features/premium/lib/pdf";
import { getPremiumStatus } from "@/features/premium/server/entitlement";
import { isStoredItinerary } from "@/features/trip-planner/lib/stored-plan";
import { getCurrentUser } from "@/server/auth";
import { createClient } from "@/server/supabase/server";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "private, no-store" };

/**
 * Premium PDF download. Requires: signed in, the plan is visible to this
 * user (RLS), and THIS user has a successful premium purchase for it.
 */
export async function GET(
  request: Request,
  { params }: RouteContext<"/plans/[id]/pdf">,
) {
  const { id } = await params;
  if (!z.uuid().safeParse(id).success)
    return new Response("Not found", { status: 404, headers: NO_STORE });

  const user = await getCurrentUser();
  if (!user) {
    const login = new URL(
      `/login?next=${encodeURIComponent(`/plans/${id}`)}`,
      request.url,
    );
    return Response.redirect(login, 303);
  }
  const supabase = await createClient();
  if (!supabase)
    return new Response("Not available", { status: 503, headers: NO_STORE });

  const { data: plan } = await supabase
    .from("travel_plans")
    .select("id, trip_id, status, itinerary, created_at")
    .eq("id", id)
    .maybeSingle();
  // Same 404 for "doesn't exist" and "not yours".
  if (!plan || plan.status !== "ready" || !isStoredItinerary(plan.itinerary)) {
    return new Response("Not found", { status: 404, headers: NO_STORE });
  }

  if ((await getPremiumStatus(supabase, id)) !== "active") {
    return new Response("Premium purchase required", {
      status: 402,
      headers: NO_STORE,
    });
  }

  const { data: trip } = await supabase
    .from("trips")
    .select("origin, destination, depart_date, return_date, adults")
    .eq("id", plan.trip_id)
    .maybeSingle();
  const tripLabel = trip
    ? `${trip.origin} to ${trip.destination}, ${trip.depart_date ? formatDate(trip.depart_date) : ""}${
        trip.return_date ? ` - ${formatDate(trip.return_date)}` : ""
      }, ${trip.adults} traveller${trip.adults === 1 ? "" : "s"}`
    : "Trip plan";

  const pdf = await renderPlanPdf(plan.itinerary, {
    tripLabel,
    generatedOn: new Date(),
  });
  const slug =
    plan.itinerary.plan.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 60) || "trip-plan";

  return new Response(Buffer.from(pdf), {
    status: 200,
    headers: {
      ...NO_STORE,
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="aiflytrip-${slug}.pdf"`,
      "X-Content-Type-Options": "nosniff",
    },
  });
}
