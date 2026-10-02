import {
  defaultWebhookDeps,
  handleStripeWebhook,
} from "@/features/premium/server/webhook";

// Webhooks need the Node runtime (Stripe SDK crypto) and must never be cached.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Stripe webhook endpoint. Signature verification needs the exact raw body,
 * so read it with request.text() and never parse/re-serialize it first.
 */
export async function POST(request: Request) {
  const deps = defaultWebhookDeps();
  if (!deps) {
    console.error(
      "[stripe-webhook] not configured (STRIPE_SECRET_KEY / STRIPE_PREMIUM_PRICE_ID / STRIPE_WEBHOOK_SECRET)",
    );
    return Response.json(
      { received: false, detail: "not_configured" },
      { status: 503 },
    );
  }
  const rawBody = await request.text();
  const result = await handleStripeWebhook(
    rawBody,
    request.headers.get("stripe-signature"),
    deps,
  );
  return Response.json(result.body, {
    status: result.status,
    headers: { "Cache-Control": "no-store" },
  });
}
