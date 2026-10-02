import type { Metadata } from "next";

import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { ProfileForm } from "@/features/account/components/profile-form";
import { FormMessage } from "@/features/auth";
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

  const [profileResult, savedResult] = supabase
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
      ])
    : [undefined, undefined];

  const loadFailed = Boolean(profileResult?.error || savedResult?.error);
  if (loadFailed) {
    console.error("[account] load failed", {
      profile: profileResult?.error?.code,
      saved: savedResult?.error?.code,
    });
  }
  const profile = profileResult?.data;
  const saved: SavedSearchItem[] = savedResult?.data ?? [];

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

      <section aria-labelledby="saved-heading" className="flex flex-col gap-4">
        <h2 id="saved-heading" className="text-lg font-semibold">
          Saved searches
        </h2>
        <SavedSearchList items={saved} />
      </section>
    </Container>
  );
}
