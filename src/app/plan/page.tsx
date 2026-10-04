import type { Metadata } from "next";

import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { FormMessage } from "@/features/auth";
import { PLAN_LIMITS, PlanForm } from "@/features/trip-planner";
import { isPlanLanguage } from "@/features/trip-planner/lib/request";
import { isAnthropicConfigured } from "@/server/anthropic/client";
import { AIRPORTS } from "@/features/flights/data/airports";

// The planner's Server Action keeps working after the response via after()
// (Duffel search + Claude generation, typically ~1-2 minutes). Vercel uses
// this as the function's time limit.
export const maxDuration = 300;

export const metadata: Metadata = {
  title: "Plan a trip",
  robots: { index: false, follow: false },
};

export default async function PlanPage({ searchParams }: PageProps<"/plan">) {
  const { to, lang } = await searchParams;
  // Only known airport codes are accepted, so the prefill can't inject text.
  const initialDestination =
    typeof to === "string" && AIRPORTS.some((airport) => airport.code === to)
      ? to
      : undefined;

  const initialLanguage = isPlanLanguage(lang) ? lang : undefined;

  return (
    <Container className="flex max-w-3xl flex-col gap-6 py-10">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Plan a trip</h1>
        <p className="mt-2 text-muted-foreground">
          Tell us the basics and what you enjoy. We&apos;ll compare flight
          options and draft a day-by-day plan with a budget estimate. Free, and
          no account needed: create one later if you want the PDF. Up to{" "}
          {PLAN_LIMITS.perHour} plans per hour with an account.
        </p>
      </div>
      {isAnthropicConfigured() ? (
        <Card className="p-5 sm:p-6">
          <PlanForm
            initialDestination={initialDestination}
            initialLanguage={initialLanguage}
          />
        </Card>
      ) : (
        <FormMessage>
          The AI planner isn&apos;t available yet. Flight search still works.
        </FormMessage>
      )}
    </Container>
  );
}
