import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { startPremiumCheckout } from "@/features/premium/actions";
import { PREMIUM_PLAN } from "@/features/premium/config";
import { type PremiumPrice } from "@/features/premium/lib/price";
import { type PremiumStatus } from "@/features/premium/server/entitlement";

/** Unlock / download card shown on a ready plan. */
export function PremiumPanel({
  planId,
  status,
  price,
}: {
  planId: string;
  status: PremiumStatus;
  price: PremiumPrice | undefined;
}) {
  if (status === "active") {
    return (
      <Card className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <p className="font-semibold">Premium plan</p>
            <Badge variant="success">Unlocked</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Download a printable PDF of this plan any time.
          </p>
        </div>
        {/* A plain link: the browser downloads the PDF from the route handler. */}
        <a
          href={`/plans/${planId}/pdf`}
          className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
        >
          Download PDF
        </a>
      </Card>
    );
  }

  if (status === "pending") {
    return (
      <Card className="p-5" role="status">
        <p className="font-semibold">Payment processing</p>
        <p className="text-sm text-muted-foreground">
          We&apos;re waiting for your payment to be confirmed. This page will
          show the download once it clears.
        </p>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-2">
          <p className="font-semibold">Get the premium PDF</p>
          <Badge>Test mode</Badge>
        </div>
        <ul className="mt-2 flex list-disc flex-col gap-1 pl-4 text-sm text-muted-foreground">
          {PREMIUM_PLAN.benefits.map((benefit) => (
            <li key={benefit}>{benefit}</li>
          ))}
        </ul>
        {status === "refunded" ? (
          <p className="mt-2 text-xs text-muted-foreground">
            Your earlier purchase of this plan was refunded.
          </p>
        ) : null}
      </div>
      {price ? (
        <form
          action={startPremiumCheckout}
          className="flex flex-col items-start gap-1 sm:items-end"
        >
          <input type="hidden" name="planId" value={planId} />
          <Button type="submit">Unlock for {price.display}</Button>
          <p className="text-xs text-muted-foreground">
            Secure checkout by Stripe. Test cards only.
          </p>
        </form>
      ) : (
        <p className="text-sm text-muted-foreground">
          Premium isn&apos;t available right now.
        </p>
      )}
    </Card>
  );
}
