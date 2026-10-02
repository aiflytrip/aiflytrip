import "server-only";

import type Stripe from "stripe";

import {
  fulfillCheckout,
  recordRefund,
  type FulfillResult,
} from "@/features/premium/server/billing";
import { getStripeConfig } from "@/server/stripe/client";
import { createAdminClient } from "@/server/supabase/admin";

/** Event types this endpoint acts on. Subscribe the Stripe endpoint to exactly these. */
export const HANDLED_EVENTS = [
  "checkout.session.completed",
  "checkout.session.async_payment_succeeded",
  "checkout.session.async_payment_failed",
  "checkout.session.expired",
  "charge.refunded",
] as const;

export type WebhookDeps = {
  verify: (rawBody: string, signature: string) => Stripe.Event;
  claim: (event: Stripe.Event) => Promise<boolean>;
  finish: (
    eventId: string,
    status: "processed" | "ignored" | "failed",
    error?: string,
  ) => Promise<void>;
  fulfill: (sessionId: string) => Promise<FulfillResult>;
  refund: (chargeId: string) => Promise<FulfillResult>;
};

export type WebhookResponse = {
  status: number;
  body: { received: boolean; detail?: string };
};

/**
 * Verifies, de-duplicates and dispatches one Stripe webhook delivery.
 * Dependencies are injected so the logic is unit-tested with real Stripe
 * signatures but without network or database access.
 */
export async function handleStripeWebhook(
  rawBody: string,
  signature: string | null,
  deps: WebhookDeps,
): Promise<WebhookResponse> {
  if (!signature)
    return {
      status: 400,
      body: { received: false, detail: "missing_signature" },
    };

  let event: Stripe.Event;
  try {
    event = deps.verify(rawBody, signature);
  } catch {
    // Never log the payload or signature of an unverified request.
    return {
      status: 400,
      body: { received: false, detail: "invalid_signature" },
    };
  }

  if (event.livemode) {
    console.error(
      "[stripe-webhook] live-mode event rejected (test mode only)",
      { id: event.id, type: event.type },
    );
    return {
      status: 400,
      body: { received: false, detail: "live_mode_not_enabled" },
    };
  }
  if (!(HANDLED_EVENTS as readonly string[]).includes(event.type)) {
    return { status: 200, body: { received: true, detail: "ignored_type" } };
  }
  if (!(await deps.claim(event))) {
    return { status: 200, body: { received: true, detail: "duplicate" } };
  }

  try {
    let result: FulfillResult;
    if (event.type === "charge.refunded") {
      result = await deps.refund((event.data.object as Stripe.Charge).id);
    } else {
      result = await deps.fulfill(
        (event.data.object as Stripe.Checkout.Session).id,
      );
    }
    await deps.finish(
      event.id,
      result.outcome === "recorded" ? "processed" : "ignored",
      result.outcome === "ignored" ? result.reason : undefined,
    );
    return { status: 200, body: { received: true, detail: result.outcome } };
  } catch (error) {
    const message =
      error instanceof Error ? error.message.slice(0, 300) : "unknown";
    console.error("[stripe-webhook] processing failed", {
      id: event.id,
      type: event.type,
      message,
    });
    await deps.finish(event.id, "failed", message).catch(() => {});
    // Non-2xx makes Stripe retry; the failed claim can be re-claimed.
    return {
      status: 500,
      body: { received: false, detail: "processing_failed" },
    };
  }
}

/** Production dependencies: real signature check, Supabase ledger, fulfilment. */
export function defaultWebhookDeps(): WebhookDeps | undefined {
  const config = getStripeConfig();
  if (!config?.webhookSecret) return undefined;
  const { stripe, webhookSecret } = config;
  const admin = createAdminClient();
  return {
    verify: (rawBody, signature) =>
      stripe.webhooks.constructEvent(rawBody, signature, webhookSecret),
    claim: async (event) => {
      const { data, error } = await admin.rpc("claim_stripe_webhook_event", {
        p_event_id: event.id,
        p_type: event.type,
        p_livemode: event.livemode,
      });
      if (error) throw new Error(`claim failed: ${error.code}`);
      return data === true;
    },
    finish: async (eventId, status, error) => {
      const { error: dbError } = await admin
        .from("stripe_webhook_events")
        .update({
          status,
          error: error ?? null,
          processed_at: new Date().toISOString(),
        })
        .eq("id", eventId);
      if (dbError)
        console.error("[stripe-webhook] could not record outcome", {
          eventId,
          code: dbError.code,
        });
    },
    fulfill: fulfillCheckout,
    refund: recordRefund,
  };
}
