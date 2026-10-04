import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { FormMessage } from "@/features/auth";
import { getAirport } from "@/features/flights/data/airports";
import {
  effectiveStatus,
  failureMessage,
  isStoredItinerary,
  PlanPending,
  PlanView,
  retryPlan,
  type PlanStatus,
} from "@/features/trip-planner";
import { CHECKOUT_NOTICES, PremiumPanel } from "@/features/premium";
import { PlanActions } from "@/features/premium/components/plan-actions";
import { getPremiumPrice } from "@/features/premium/server/billing";
import { getPremiumStatus } from "@/features/premium/server/entitlement";
import { requireUser } from "@/server/auth";
import { isStripeConfigured } from "@/server/stripe/client";
import { createClient } from "@/server/supabase/server";

export const metadata: Metadata = {
  title: "Trip plan",
  robots: { index: false, follow: false },
};

const RETRY_NOTICES: Record<string, string> = {
  limited: "You've reached the plan limit for now. Please try again later.",
  expired:
    "This trip's dates have passed, so it can't be re-planned. Start a new plan instead.",
};

export default async function PlanDetailPage({
  params,
  searchParams,
}: PageProps<"/plans/[id]">) {
  const { id } = await params;
  const { retry, checkout } = await searchParams;
  const user = await requireUser(`/plans/${id}`);
  if (!z.uuid().safeParse(id).success) notFound();

  const supabase = await createClient();
  if (!supabase) notFound();

  // RLS: another user's plan id returns no row, i.e. a 404.
  const { data: plan, error } = await supabase
    .from("travel_plans")
    .select(
      "id, trip_id, status, itinerary, error_message, created_at, updated_at",
    )
    .eq("id", id)
    .maybeSingle();
  if (error) console.error("[plans] load failed", { code: error.code });
  if (!plan) notFound();

  const status = effectiveStatus(plan.status as PlanStatus, plan.updated_at);
  const notice = typeof retry === "string" ? RETRY_NOTICES[retry] : undefined;
  const checkoutNotice =
    typeof checkout === "string" ? CHECKOUT_NOTICES[checkout] : undefined;
  const isReady = status === "ready" && isStoredItinerary(plan.itinerary);
  const isGenerating = status === "pending" || status === "generating";
  // Trip details for the progress screen and itinerary (RLS: owner only).
  const { data: trip } =
    isGenerating || isReady
      ? await supabase
          .from("trips")
          .select("origin, destination, cabin, adults")
          .eq("id", plan.trip_id)
          .maybeSingle()
      : { data: null };
  const [premiumStatus, premiumPrice] =
    isReady && isStripeConfigured()
      ? await Promise.all([
          getPremiumStatus(supabase, plan.id),
          getPremiumPrice(),
        ])
      : [undefined, undefined];

  return (
    <Container className="flex max-w-4xl flex-col gap-6 py-10">
      <Link
        href="/plans"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ← My plans
      </Link>
      {notice ? <FormMessage>{notice}</FormMessage> : null}
      {checkoutNotice ? (
        <FormMessage tone={checkoutNotice.tone}>
          {checkoutNotice.text}
        </FormMessage>
      ) : null}

      {isGenerating ? (
        <PlanPending
          startedAt={plan.created_at}
          origin={trip?.origin ?? undefined}
          destination={trip?.destination ?? undefined}
          originCity={trip?.origin ? getAirport(trip.origin)?.city : undefined}
          destinationCity={
            trip?.destination ? getAirport(trip.destination)?.city : undefined
          }
        />
      ) : isReady && isStoredItinerary(plan.itinerary) ? (
        <>
          <PlanView
            itinerary={plan.itinerary}
            trip={{ cabin: trip?.cabin, travellers: trip?.adults }}
            actions={
              <PlanActions
                planId={plan.id}
                status={premiumStatus}
                price={premiumPrice}
                isGuest={user.isAnonymous}
              />
            }
          />
          {premiumStatus && !user.isAnonymous ? (
            <PremiumPanel
              planId={plan.id}
              status={premiumStatus}
              price={premiumPrice}
            />
          ) : null}
        </>
      ) : (
        <Card role="alert" className="flex flex-col items-start gap-4 p-6">
          <h1 className="text-xl font-semibold">
            We couldn&apos;t create this plan
          </h1>
          <p className="text-sm text-muted-foreground">
            {failureMessage(
              plan.status === "failed" ? plan.error_message : "timed_out",
            )}
          </p>
          <form action={retryPlan}>
            <input type="hidden" name="planId" value={plan.id} />
            <Button type="submit">Try again</Button>
          </form>
        </Card>
      )}
    </Container>
  );
}
