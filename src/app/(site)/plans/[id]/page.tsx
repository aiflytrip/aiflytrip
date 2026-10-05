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
import { isPlanLanguage } from "@/features/trip-planner/lib/request";
import { plannerMessages } from "@/i18n/messages/planner";

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

  // The page speaks the language the plan was written in.
  const { data: prefs } = await supabase
    .from("trip_preferences")
    .select("language")
    .eq("trip_id", plan.trip_id)
    .maybeSingle();
  const locale = isPlanLanguage(prefs?.language) ? prefs.language : "en";
  const t = plannerMessages(locale).detail;
  const english = locale === "en";

  const status = effectiveStatus(plan.status as PlanStatus, plan.updated_at);
  const notice =
    typeof retry === "string"
      ? english
        ? RETRY_NOTICES[retry]
        : t.retry[retry]
      : undefined;
  const checkoutNotice =
    typeof checkout === "string" && CHECKOUT_NOTICES[checkout]
      ? {
          tone: CHECKOUT_NOTICES[checkout].tone,
          text: english
            ? CHECKOUT_NOTICES[checkout].text
            : (t.checkout[checkout] ?? CHECKOUT_NOTICES[checkout].text),
        }
      : undefined;
  const failureCode =
    plan.status === "failed" ? plan.error_message : "timed_out";
  const failureText = english
    ? failureMessage(failureCode)
    : (t.failures[failureCode ?? ""] ?? t.failures.internal);
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
    <Container lang={locale} className="flex max-w-4xl flex-col gap-6 py-10">
      <Link
        href="/plans"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        {t.back}
      </Link>
      {notice ? <FormMessage>{notice}</FormMessage> : null}
      {checkoutNotice ? (
        <FormMessage tone={checkoutNotice.tone}>
          {checkoutNotice.text}
        </FormMessage>
      ) : null}

      {isGenerating ? (
        <PlanPending
          locale={locale}
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
            locale={locale}
            itinerary={plan.itinerary}
            trip={{ cabin: trip?.cabin, travellers: trip?.adults }}
            actions={
              <PlanActions
                locale={locale}
                planId={plan.id}
                status={premiumStatus}
                price={premiumPrice}
                isGuest={user.isAnonymous}
              />
            }
          />
          {premiumStatus && !user.isAnonymous ? (
            <PremiumPanel
              locale={locale}
              planId={plan.id}
              status={premiumStatus}
              price={premiumPrice}
            />
          ) : null}
        </>
      ) : (
        <Card role="alert" className="flex flex-col items-start gap-4 p-6">
          <h1 className="text-xl font-semibold">{t.failedTitle}</h1>
          <p className="text-sm text-muted-foreground">{failureText}</p>
          <form action={retryPlan}>
            <input type="hidden" name="planId" value={plan.id} />
            <Button type="submit">{t.tryAgain}</Button>
          </form>
        </Card>
      )}
    </Container>
  );
}
