import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { ProfileForm } from "@/features/account/components/profile-form";
import { FormMessage } from "@/features/auth";
import {
  PurchaseList,
  type PurchaseItem,
} from "@/features/premium/components/purchase-list";
import { SavedSearchList, type SavedSearchItem } from "@/features/saved-trips";
import { requireUser } from "@/server/auth";
import { createClient } from "@/server/supabase/server";

export const metadata: Metadata = {
  title: "Your account",
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  // The proxy already redirects signed-out visitors; this re-checks so the
  // page is safe even if the proxy matcher changes.
  const user = await requireUser("/account");
  const supabase = await createClient();

  const [profileResult, savedResult, purchasesResult] = supabase
    ? await Promise.all([
        supabase
          .from("profiles")
          .select("full_name, home_airport")
          .eq("id", user.id)
          .maybeSingle(),
        supabase
          .from("saved_trips")
          .select("id, label, search_key, created_at")
          .order("created_at", { ascending: false })
          .limit(50),
        supabase
          .from("payments")
          .select(
            "id, travel_plan_id, amount_minor, amount_refunded_minor, currency, status, created_at",
          )
          .eq("product", "premium_plan")
          .order("created_at", { ascending: false })
          .limit(50),
      ])
    : [undefined, undefined, undefined];

  const loadFailed = Boolean(
    profileResult?.error || savedResult?.error || purchasesResult?.error,
  );
  if (loadFailed) {
    console.error("[account] load failed", {
      profile: profileResult?.error?.code,
      saved: savedResult?.error?.code,
    });
  }
  const profile = profileResult?.data;
  const saved: SavedSearchItem[] = savedResult?.data ?? [];
  const purchases: PurchaseItem[] = purchasesResult?.data ?? [];

  return (
    <Container className="flex flex-col gap-10 py-10">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Your account</h1>
        {user.email ? (
          <p className="mt-1 text-sm text-muted-foreground">
            Signed in as {user.email}
          </p>
        ) : null}
      </div>

      {loadFailed ? (
        <FormMessage>
          Some of your account data couldn&apos;t be loaded. Please refresh to
          try again.
        </FormMessage>
      ) : null}

      <section
        aria-labelledby="profile-heading"
        className="flex flex-col gap-4"
      >
        <h2 id="profile-heading" className="text-lg font-semibold">
          Profile
        </h2>
        <Card className="p-5">
          <ProfileForm
            fullName={profile?.full_name ?? ""}
            homeAirport={profile?.home_airport ?? ""}
          />
        </Card>
      </section>

      <section aria-labelledby="plans-heading" className="flex flex-col gap-4">
        <h2 id="plans-heading" className="text-lg font-semibold">
          Trip plans
        </h2>
        <Card className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            AI-drafted, day-by-day plans for your trips.
          </p>
          <div className="flex gap-2">
            <ButtonLink href="/plans" variant="secondary" size="sm">
              My plans
            </ButtonLink>
            <ButtonLink href="/plan" size="sm">
              Plan a trip
            </ButtonLink>
          </div>
        </Card>
      </section>

      <section
        aria-labelledby="purchases-heading"
        className="flex flex-col gap-4"
      >
        <h2 id="purchases-heading" className="text-lg font-semibold">
          Purchases
        </h2>
        <PurchaseList items={purchases} />
      </section>

      <section aria-labelledby="saved-heading" className="flex flex-col gap-4">
        <h2 id="saved-heading" className="text-lg font-semibold">
          Saved searches
        </h2>
        <SavedSearchList items={saved} />
      </section>
    </Container>
  );
}
