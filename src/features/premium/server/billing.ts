import "server-only";

import type Stripe from "stripe";

import {
  interpretCheckoutSession,
  refundStatus,
} from "@/features/premium/lib/checkout";
import {
  checkPremiumPrice,
  type PremiumPrice,
} from "@/features/premium/lib/price";
import { type PaymentStatus } from "@/lib/supabase/database.types";
import { getStripeConfig } from "@/server/stripe/client";
import { createAdminClient } from "@/server/supabase/admin";

const PRICE_TTL_MS = 10 * 60_000;
let cachedPrice: { value: PremiumPrice; expiresAt: number } | undefined;

/** The validated premium price, cached briefly. Undefined if Stripe isn't usable. */
export async function getPremiumPrice(): Promise<PremiumPrice | undefined> {
  if (cachedPrice && cachedPrice.expiresAt > Date.now())
    return cachedPrice.value;
  const config = getStripeConfig();
  if (!config) return undefined;
  try {
    const check = checkPremiumPrice(
      await config.stripe.prices.retrieve(config.priceId),
    );
    if (!check.ok) {
      console.error("[premium] configured price is not sellable", {
        problem: check.problem,
      });
      return undefined;
    }
    cachedPrice = { value: check.price, expiresAt: Date.now() + PRICE_TTL_MS };
    return check.price;
  } catch (error) {
    console.error("[premium] could not load price", {
      type: (error as Stripe.errors.StripeError).type,
    });
    return undefined;
  }
}

/** Returns the user's Stripe customer id, creating and linking one if needed. */
export async function getOrCreateCustomer(
  stripe: Stripe,
  user: { id: string; email?: string },
): Promise<string> {
  const admin = createAdminClient();
  const existing = await admin
    .from("billing_customers")
    .select("provider_customer_id")
    .eq("user_id", user.id)
    .maybeSingle();
  if (existing.error)
    throw new Error(`billing_customers lookup failed: ${existing.error.code}`);
  if (existing.data) return existing.data.provider_customer_id;

  // Idempotency key: concurrent first checkouts create one customer, not two.
  const customer = await stripe.customers.create(
    { email: user.email, metadata: { aiflytrip_user_id: user.id } },
    { idempotencyKey: `aiflytrip-customer-${user.id}` },
  );
  const insert = await admin.from("billing_customers").upsert(
    {
      user_id: user.id,
      provider_customer_id: customer.id,
      livemode: customer.livemode,
    },
    { onConflict: "user_id", ignoreDuplicates: true },
  );
  if (insert.error)
    throw new Error(`billing_customers insert failed: ${insert.error.code}`);

  const linked = await admin
    .from("billing_customers")
    .select("provider_customer_id")
    .eq("user_id", user.id)
    .single();
  if (linked.error)
    throw new Error(`billing_customers reload failed: ${linked.error.code}`);
  return linked.data.provider_customer_id;
}

export type FulfillResult =
  | {
      outcome: "recorded";
      status: PaymentStatus;
      planId: string;
      userId: string;
    }
  | { outcome: "ignored"; reason: string };

/**
 * Stripe's recommended fulfilment function, called from BOTH the webhook and
 * the success page. Safe to run repeatedly and concurrently: it always
 * re-reads the session from Stripe and upserts one row per PaymentIntent.
 */
export async function fulfillCheckout(
  sessionId: string,
): Promise<FulfillResult> {
  const config = getStripeConfig();
  if (!config) throw new Error("Stripe is not configured");

  const session = await config.stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "payment_intent", "payment_intent.latest_charge"],
  });
  const result = interpretCheckoutSession(session, { priceId: config.priceId });
  if (result.kind === "ignore")
    return { outcome: "ignored", reason: result.reason };

  const admin = createAdminClient();
  // The plan must still belong to the user named in the session.
  const plan = await admin
    .from("travel_plans")
    .select("id")
    .eq("id", result.planId)
    .eq("user_id", result.userId)
    .maybeSingle();
  if (plan.error) throw new Error(`plan lookup failed: ${plan.error.code}`);
  if (!plan.data)
    return { outcome: "ignored", reason: "plan_not_found_for_user" };

  const saved = await admin
    .from("payments")
    .upsert(result.row, { onConflict: "provider_payment_id" });
  if (saved.error)
    throw new Error(`payment upsert failed: ${saved.error.code}`);
  return {
    outcome: "recorded",
    status: result.row.status,
    planId: result.planId,
    userId: result.userId,
  };
}

/** Applies a refund using the charge's current state (events can arrive out of order). */
export async function recordRefund(chargeId: string): Promise<FulfillResult> {
  const config = getStripeConfig();
  if (!config) throw new Error("Stripe is not configured");
  const charge = await config.stripe.charges.retrieve(chargeId);
  if (charge.livemode) return { outcome: "ignored", reason: "live_mode" };
  const intentId =
    typeof charge.payment_intent === "string"
      ? charge.payment_intent
      : charge.payment_intent?.id;
  if (!intentId) return { outcome: "ignored", reason: "no_payment_intent" };

  const status = refundStatus(charge);
  const updated = await createAdminClient()
    .from("payments")
    .update({ status, amount_refunded_minor: charge.amount_refunded })
    .eq("provider_payment_id", intentId)
    .select("travel_plan_id, user_id");
  if (updated.error)
    throw new Error(`refund update failed: ${updated.error.code}`);
  const row = updated.data[0];
  if (!row?.travel_plan_id || !row.user_id)
    return { outcome: "ignored", reason: "unknown_payment" };
  return {
    outcome: "recorded",
    status,
    planId: row.travel_plan_id,
    userId: row.user_id,
  };
}
