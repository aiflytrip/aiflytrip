"use server";

import { redirect } from "next/navigation";
import type Stripe from "stripe";
import { z } from "zod";

import { siteConfig } from "@/config/site";
import {
  buildCheckoutParams,
  checkoutIdempotencyKey,
  currentMinuteBucket,
} from "@/features/premium/lib/checkout";
import {
  getOrCreateCustomer,
  getPremiumPrice,
} from "@/features/premium/server/billing";
import { getPremiumStatus } from "@/features/premium/server/entitlement";
import { getCurrentUser } from "@/server/auth";
import { getStripeConfig } from "@/server/stripe/client";
import { createClient } from "@/server/supabase/server";

const idSchema = z.uuid();

/**
 * Starts a Stripe Checkout (test mode) to unlock one plan's PDF. Everything
 * is checked server-side: sign-in, plan ownership (RLS), plan readiness, not
 * already purchased, and a valid configured price.
 */
export async function startPremiumCheckout(formData: FormData): Promise<void> {
  const parsedId = idSchema.safeParse(formData.get("planId"));
  if (!parsedId.success) redirect("/plans");
  const planId = parsedId.data;
  const back = (reason: string): never =>
    redirect(`/plans/${planId}?checkout=${reason}`);

  const user = await getCurrentUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(`/plans/${planId}`)}`);
  // Guests must create an account before paying; their plan carries over.
  if (user.isAnonymous)
    redirect(
      `/signup?reason=premium&next=${encodeURIComponent(`/plans/${planId}`)}`,
    );
  const config = getStripeConfig();
  const supabase = await createClient();
  if (!config || !supabase) back("unavailable");

  // RLS: returns nothing for someone else's plan.
  const { data: plan } = await supabase!
    .from("travel_plans")
    .select("id, trip_id, status")
    .eq("id", planId)
    .maybeSingle();
  if (!plan) redirect("/plans");
  if (plan.status !== "ready") back("not_ready");

  const status = await getPremiumStatus(supabase!, planId);
  if (status === "active") back("owned");
  if (status === "pending") back("pending");

  const price = await getPremiumPrice();
  if (!price) back("unavailable");

  let url: string | null = null;
  try {
    const customerId = await getOrCreateCustomer(config!.stripe, user);
    const minuteBucket = currentMinuteBucket();
    const session = await config!.stripe.checkout.sessions.create(
      buildCheckoutParams({
        priceId: price!.id,
        customerId,
        userId: user.id,
        planId,
        tripId: plan.trip_id,
        siteUrl: siteConfig.url,
        minuteBucket,
      }),
      { idempotencyKey: checkoutIdempotencyKey(user.id, planId, minuteBucket) },
    );
    url = session.url;
  } catch (error) {
    const stripeError = error as Partial<Stripe.errors.StripeError>;
    console.error("[premium] checkout creation failed", {
      planId,
      type:
        stripeError.type ?? (error instanceof Error ? error.name : "unknown"),
      code: stripeError.code,
      requestId: stripeError.requestId,
    });
  }
  if (!url) back("error");
  redirect(url!);
}
