import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FormMessage } from "@/features/auth";
import {
  PlanList,
  type PlanListItem,
  type PlanStatus,
} from "@/features/trip-planner";
import { requireUser } from "@/server/auth";
import { createClient } from "@/server/supabase/server";

export const metadata: Metadata = {
  title: "My plans",
  robots: { index: false, follow: false },
};

export default async function PlansPage() {
  const user = await requireUser("/plans");
  const supabase = await createClient();

  // RLS limits both queries to the signed-in user's rows.
  const plans = supabase
    ? await supabase
        .from("travel_plans")
        .select("id, trip_id, status, created_at, updated_at")
        .order("created_at", { ascending: false })
        .limit(50)
    : undefined;
  const tripIds = [...new Set((plans?.data ?? []).map((p) => p.trip_id))];
  const trips =
    supabase && tripIds.length > 0
      ? await supabase.from("trips").select("id, title").in("id", tripIds)
      : undefined;
  const titles = new Map((trips?.data ?? []).map((t) => [t.id, t.title]));

  const items: PlanListItem[] = (plans?.data ?? []).map((p) => ({
    id: p.id,
    status: p.status as PlanStatus,
    created_at: p.created_at,
    updated_at: p.updated_at,
    tripTitle: titles.get(p.trip_id) ?? "Trip plan",
  }));
  const failed = Boolean(plans?.error || trips?.error);
  if (failed)
    console.error("[plans] load failed", {
      plans: plans?.error?.code,
      trips: trips?.error?.code,
    });

  return (
    <Container className="flex max-w-3xl flex-col gap-6 py-10">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold tracking-tight">My plans</h1>
        <ButtonLink href="/plan" size="sm">
          New plan
        </ButtonLink>
      </div>
      {user.isAnonymous ? (
        <div className="glass flex flex-col gap-3 rounded-2xl p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            You&apos;re planning as a guest. These plans live in this browser
            only: create a free account to keep them and get PDFs.
          </p>
          <ButtonLink href="/signup?next=%2Fplans" size="sm">
            Create free account
          </ButtonLink>
        </div>
      ) : null}
      {failed ? (
        <FormMessage>
          Your plans couldn&apos;t be loaded. Please refresh to try again.
        </FormMessage>
      ) : null}
      <PlanList items={items} />
    </Container>
  );
}
