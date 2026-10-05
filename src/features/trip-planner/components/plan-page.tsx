import type { Metadata } from "next";

import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { FormMessage } from "@/features/auth";
import { AIRPORTS } from "@/features/flights/data/airports";
import { PlanForm } from "@/features/trip-planner/components/plan-form";
import { PLAN_LIMITS } from "@/features/trip-planner/lib/limits";
import { type Locale } from "@/i18n/config";
import { plannerMessages } from "@/i18n/messages/planner";
import { languageAlternates } from "@/i18n/routes";
import { isAnthropicConfigured } from "@/server/anthropic/client";

/** Private page: never indexed, but language versions point at each other. */
export function planPageMetadata(locale: Locale): Metadata {
  return {
    title: plannerMessages(locale).page.title,
    robots: { index: false, follow: false },
    alternates: { languages: languageAlternates("planner") },
  };
}

/** The planner form page in any language (the plan language defaults to it). */
export function PlanPage({
  locale,
  to,
}: {
  locale: Locale;
  to?: string | string[];
}) {
  const t = plannerMessages(locale).page;
  // Only known airport codes are accepted, so the prefill can't inject text.
  const initialDestination =
    typeof to === "string" && AIRPORTS.some((airport) => airport.code === to)
      ? to
      : undefined;

  return (
    <Container className="flex max-w-3xl flex-col gap-6 py-10">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">{t.title}</h1>
        <p className="mt-2 text-muted-foreground">
          {t.intro(PLAN_LIMITS.perHour)}
        </p>
      </div>
      {isAnthropicConfigured() ? (
        <Card className="p-5 sm:p-6">
          <PlanForm initialDestination={initialDestination} locale={locale} />
        </Card>
      ) : (
        <FormMessage>{t.unavailable}</FormMessage>
      )}
    </Container>
  );
}
