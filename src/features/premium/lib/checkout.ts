import type Stripe from "stripe";

import { CHECKOUT_METADATA, PREMIUM_PLAN } from "@/features/premium/config";
import {
  type Database,
  type PaymentStatus,
} from "@/lib/supabase/database.types";

type PaymentInsert = Database["public"]["Tables"]["payments"]["Insert"];

/** Current time in whole minutes, used for checkout idempotency. */
export function currentMinuteBucket(now = Date.now()): number {
  return Math.floor(now / 60_000);
}

/** Idempotency key: repeated clicks within a minute reuse one session. */
export function checkoutIdempotencyKey(
  userId: string,
  planId: string,
  minuteBucket: number,
): string {
  return `aiflytrip-checkout-${userId}-${planId}-${minuteBucket}`;
}

/** Builds the Checkout Session for unlocking one plan (pure, unit-tested). */
export function buildCheckoutParams(input: {
  priceId: string;
  customerId: string;
  userId: string;
  planId: string;
  tripId: string;
  siteUrl: URL;
  /**
   * Request time rounded to the minute. Stripe idempotency keys require
   * identical parameters, so the expiry must not change within the window.
   */
  minuteBucket: number;
}): Stripe.Checkout.SessionCreateParams {
  const metadata = {
    [CHECKOUT_METADATA.product]: PREMIUM_PLAN.product,
    [CHECKOUT_METADATA.userId]: input.userId,
    [CHECKOUT_METADATA.planId]: input.planId,
    [CHECKOUT_METADATA.tripId]: input.tripId,
  };
  const planUrl = new URL(`/plans/${input.planId}`, input.siteUrl);
  return {
    mode: "payment",
    customer: input.customerId,
    client_reference_id: input.userId,
    line_items: [{ price: input.priceId, quantity: 1 }],
    metadata,
    payment_intent_data: {
      metadata,
      description: `${PREMIUM_PLAN.name} (${input.planId})`,
    },
    // {CHECKOUT_SESSION_ID} is substituted by Stripe on redirect.
    success_url: `${planUrl.toString()}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${planUrl.toString()}?checkout=cancelled`,
    // Sessions expire after 30 minutes (Stripe's minimum) to limit stale links.
    expires_at: input.minuteBucket * 60 + 31 * 60,
  };
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** PaymentIntent status → our payments.status. */
export function paymentStatusFromIntent(
  status: Stripe.PaymentIntent.Status,
): PaymentStatus {
  switch (status) {
    case "succeeded":
      return "succeeded";
    case "canceled":
      return "canceled";
    case "requires_payment_method":
      // After an attempt, this means the payment failed (e.g. async debit failed).
      return "failed";
    default:
      return "pending";
  }
}

export type SessionInterpretation =
  | { kind: "ignore"; reason: string }
  | {
      kind: "record";
      userId: string;
      planId: string;
      row: PaymentInsert & { provider_payment_id: string };
    };

/**
 * Decides what a retrieved Checkout Session means for our records. Every
 * field we trust was set by our own server when creating the session, and
 * the line item must be our configured premium price.
 */
export function interpretCheckoutSession(
  session: Stripe.Checkout.Session,
  expected: { priceId: string },
): SessionInterpretation {
  if (session.livemode) return { kind: "ignore", reason: "live_mode" };
  if (session.mode !== "payment")
    return { kind: "ignore", reason: "not_payment_mode" };

  const meta = session.metadata ?? {};
  if (meta[CHECKOUT_METADATA.product] !== PREMIUM_PLAN.product)
    return { kind: "ignore", reason: "other_product" };
  const userId = meta[CHECKOUT_METADATA.userId];
  const planId = meta[CHECKOUT_METADATA.planId];
  const tripId = meta[CHECKOUT_METADATA.tripId];
  if (
    !userId ||
    !planId ||
    !tripId ||
    ![userId, planId, tripId].every((id) => UUID.test(id))
  ) {
    return { kind: "ignore", reason: "bad_metadata" };
  }
  if (session.client_reference_id !== userId)
    return { kind: "ignore", reason: "reference_mismatch" };

  const items = session.line_items?.data ?? [];
  if (
    items.length !== 1 ||
    items[0]?.price?.id !== expected.priceId ||
    items[0]?.quantity !== 1
  ) {
    return { kind: "ignore", reason: "unexpected_line_items" };
  }

  // No PaymentIntent yet means the customer hasn't attempted payment.
  const intent = session.payment_intent;
  if (!intent) return { kind: "ignore", reason: "no_payment_attempt" };
  const intentId = typeof intent === "string" ? intent : intent.id;

  let status: PaymentStatus;
  let amountRefunded = 0;
  if (typeof intent !== "string") {
    status = paymentStatusFromIntent(intent.status);
    // A refunded PaymentIntent still reports "succeeded"; the charge knows.
    const charge = intent.latest_charge;
    if (
      status === "succeeded" &&
      charge &&
      typeof charge !== "string" &&
      charge.amount_refunded > 0
    ) {
      status = refundStatus(charge);
      amountRefunded = charge.amount_refunded;
    }
  } else {
    status = session.payment_status === "paid" ? "succeeded" : "pending";
  }
  if (session.status === "expired" && status === "pending") status = "canceled";

  if (session.amount_total === null || !session.currency)
    return { kind: "ignore", reason: "missing_amount" };

  return {
    kind: "record",
    userId,
    planId,
    row: {
      user_id: userId,
      trip_id: tripId,
      travel_plan_id: planId,
      product: PREMIUM_PLAN.product,
      provider: "stripe",
      provider_payment_id: intentId,
      checkout_session_id: session.id,
      amount_minor: session.amount_total,
      currency: session.currency.toUpperCase(),
      status,
      amount_refunded_minor: amountRefunded,
      livemode: false,
      description: PREMIUM_PLAN.name,
    },
  };
}

/** Charge refund state → our payments.status. */
export function refundStatus(
  charge: Pick<Stripe.Charge, "amount" | "amount_refunded" | "refunded">,
): PaymentStatus {
  if (charge.refunded || charge.amount_refunded >= charge.amount)
    return "refunded";
  return charge.amount_refunded > 0 ? "partially_refunded" : "succeeded";
}
