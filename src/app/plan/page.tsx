import type { Metadata } from "next";

import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { FormMessage } from "@/features/auth";
import { PLAN_LIMITS, PlanForm } from "@/features/trip-planner";
import { isAnthropicConfigured } from "@/server/anthropic/client";
import { requireUser } from "@/server/auth";
import { AIRPORTS } from "@/features/flights/data/airports";

export const metadata: Metadata = {
  title: "Plan a trip",
  robots: { index: false, follow: false },
};

export default async function PlanPage({ searchParams }: PageProps<"/plan">) {
  const { to } = await searchParams;
  // Only known airport codes are accepted, so the prefill can't inject text.
  const initialDestination =
    typeof to === "string" && AIRPORTS.some((airport) => airport.code === to)
      ? to
      : undefined;
  await requireUser(
    initialDestination ? `/plan?to=${initialDestination}` : "/plan",
  );

  return (
    <Container className="flex max-w-3xl flex-col gap-6 py-10">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Plan a trip</h1>
        <p className="mt-2 text-muted-foreground">
          Tell us the basics and what you enjoy. We&apos;ll compare flight
          options and draft a day-by-day plan with a budget estimate. Up to{" "}
          {PLAN_LIMITS.perHour} plans per hour.
        </p>
      </div>
      {isAnthropicConfigured() ? (
        <Card className="p-5 sm:p-6">
          <PlanForm initialDestination={initialDestination} />
        </Card>
      ) : (
        <FormMessage>
          The AI planner isn&apos;t available yet. Flight search still works.
        </FormMessage>
      )}
    </Container>
  );
}
