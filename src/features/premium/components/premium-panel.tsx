import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { startPremiumCheckout } from "@/features/premium/actions";
import { type Locale } from "@/i18n/config";
import { plannerMessages } from "@/i18n/messages/planner";
import { type PremiumPrice } from "@/features/premium/lib/price";
import { type PremiumStatus } from "@/features/premium/server/entitlement";

/** Unlock / download card shown on a ready plan. */
export function PremiumPanel({
  planId,
  status,
  price,
  locale = "en",
}: {
  locale?: Locale;
  planId: string;
  status: PremiumStatus;
  price: PremiumPrice | undefined;
}) {
  const t = plannerMessages(locale).premium;
  if (status === "active") {
    return (
      <Card className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <p className="font-semibold">{t.premiumPlan}</p>
            <Badge variant="success">{t.unlocked}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">{t.downloadAnyTime}</p>
        </div>
        {/* A plain link: the browser downloads the PDF from the route handler. */}
        <a
          href={`/plans/${planId}/pdf`}
          className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
        >
          {t.downloadPdf}
        </a>
      </Card>
    );
  }

  if (status === "pending") {
    return (
      <Card className="p-5" role="status">
        <p className="font-semibold">{t.paymentProcessing}</p>
        <p className="text-sm text-muted-foreground">{t.waiting}</p>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-2">
          <p className="font-semibold">{t.getPremiumPdf}</p>
          <Badge>{t.testModeBadge}</Badge>
        </div>
        <ul className="mt-2 flex list-disc flex-col gap-1 pl-4 text-sm text-muted-foreground">
          {t.benefits.map((benefit) => (
            <li key={benefit}>{benefit}</li>
          ))}
        </ul>
        {status === "refunded" ? (
          <p className="mt-2 text-xs text-muted-foreground">{t.refunded}</p>
        ) : null}
      </div>
      {price ? (
        <form
          action={startPremiumCheckout}
          className="flex flex-col items-start gap-1 sm:items-end"
        >
          <input type="hidden" name="planId" value={planId} />
          <Button type="submit">{t.unlockFor(price.display)}</Button>
          <p className="text-xs text-muted-foreground">{t.secureCheckout}</p>
        </form>
      ) : (
        <p className="text-sm text-muted-foreground">{t.unavailable}</p>
      )}
    </Card>
  );
}
