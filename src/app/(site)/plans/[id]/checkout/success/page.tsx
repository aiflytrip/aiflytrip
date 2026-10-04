import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type Stripe from "stripe";
import { z } from "zod";

import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { CHECKOUT_METADATA } from "@/features/premium/config";
import { fulfillCheckout } from "@/features/premium/server/billing";
import { getPremiumStatus } from "@/features/premium/server/entitlement";
import { requireUser } from "@/server/auth";
import { getStripeConfig } from "@/server/stripe/client";
import { createClient } from "@/server/supabase/server";

export const metadata: Metadata = {
  title: "Payment",
  robots: { index: false, follow: false },
};

type View = "paid" | "processing" | "incomplete" | "error";

const VIEWS: Record<View, { title: string; body: string }> = {
  paid: {
    title: "Payment successful",
    body: "Your premium plan is unlocked. You can download the PDF now and any time later.",
  },
  processing: {
    title: "Payment processing",
    body: "Your payment is being confirmed. We'll unlock the PDF as soon as it clears; refresh this page in a moment.",
  },
  incomplete: {
    title: "Payment not completed",
    body: "This checkout wasn't completed, so you haven't been charged.",
  },
  error: {
    title: "We couldn't confirm your payment yet",
    body: "If you were charged, your purchase will appear shortly. Please refresh this page in a minute.",
  },
};

/**
 * Stripe redirects here after Checkout. Fulfilment runs here as well as in
 * the webhook (Stripe's recommended pattern), so access is immediate even if
 * the webhook is delayed. The session must belong to the signed-in user and
 * to this plan.
 */
export default async function CheckoutSuccessPage({
  params,
  searchParams,
}: PageProps<"/plans/[id]/checkout/success">) {
  const { id } = await params;
  const { session_id: rawSessionId } = await searchParams;
  const user = await requireUser(`/plans/${id}`);
  const sessionId = z
    .string()
    .regex(/^cs_test_[A-Za-z0-9]+$/)
    .safeParse(rawSessionId);
  const config = getStripeConfig();
  if (!z.uuid().safeParse(id).success || !sessionId.success || !config)
    notFound();

  const logFailure = (error: unknown) =>
    console.error("[premium] success page could not confirm", {
      planId: id,
      type:
        (error as Partial<Stripe.errors.StripeError>).type ??
        (error instanceof Error ? error.name : "unknown"),
    });

  let session: Stripe.Checkout.Session | undefined;
  try {
    session = await config.stripe.checkout.sessions.retrieve(sessionId.data);
  } catch (error) {
    logFailure(error);
  }
  // Don't let users view (or fulfil) someone else's checkout.
  if (
    session &&
    (session.metadata?.[CHECKOUT_METADATA.userId] !== user.id ||
      session.metadata?.[CHECKOUT_METADATA.planId] !== id)
  ) {
    notFound();
  }

  let view: View = "error";
  if (session && session.status !== "complete") {
    view = "incomplete";
  } else if (session) {
    try {
      const result = await fulfillCheckout(session.id);
      if (result.outcome === "recorded") {
        view =
          result.status === "succeeded"
            ? "paid"
            : result.status === "pending"
              ? "processing"
              : "incomplete";
      }
    } catch (error) {
      logFailure(error);
    }
  }

  // Cross-check what this user can actually access (RLS).
  const supabase = await createClient();
  if (
    view === "paid" &&
    supabase &&
    (await getPremiumStatus(supabase, id)) !== "active"
  )
    view = "processing";
  const content = VIEWS[view];

  return (
    <Container className="flex max-w-2xl flex-col gap-6 py-12">
      <Card
        className="flex flex-col items-start gap-4 p-6"
        role={view === "paid" ? "status" : "alert"}
      >
        <h1 className="text-2xl font-semibold tracking-tight">
          {content.title}
        </h1>
        <p className="text-muted-foreground">{content.body}</p>
        <p className="text-xs text-muted-foreground">
          Stripe test mode: no real money was charged.
        </p>
        <div className="flex flex-wrap gap-3">
          {view === "paid" ? (
            <a
              href={`/plans/${id}/pdf`}
              className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary-hover"
            >
              Download PDF
            </a>
          ) : null}
          <ButtonLink href={`/plans/${id}`} variant="secondary">
            Back to your plan
          </ButtonLink>
        </div>
      </Card>
      <Link
        href="/account"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        View your purchases
      </Link>
    </Container>
  );
}
