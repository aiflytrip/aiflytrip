import { Button, ButtonLink, buttonVariants } from "@/components/ui/button";
import { startPremiumCheckout } from "@/features/premium/actions";
import { type PremiumPrice } from "@/features/premium/lib/price";
import { type PremiumStatus } from "@/features/premium/server/entitlement";
import { type Locale } from "@/i18n/config";
import { plannerMessages } from "@/i18n/messages/planner";
import { plannerHref } from "@/i18n/routes";
import { cn } from "@/lib/utils";

function DownloadIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4.5"
    >
      <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      className="size-4.5"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

/**
 * One-click plan actions: download the PDF (when unlocked) or start the
 * test-mode checkout, plus "Create another plan". Uses the same download
 * route and checkout action as the premium panel, so access rules are
 * unchanged: the PDF route itself checks ownership and purchase.
 */
export function PlanActions({
  planId,
  status,
  price,
  isGuest = false,
  className,
  locale = "en",
}: {
  locale?: Locale;
  planId: string;
  /** Guests create a free account first; their plan carries over. */
  isGuest?: boolean;
  /** Undefined when payments aren't configured. */
  status?: PremiumStatus;
  price?: PremiumPrice;
  className?: string;
}) {
  const t = plannerMessages(locale).premium;
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {status === "active" ? (
        // A plain link: the browser downloads the PDF from the route handler.
        <a
          href={`/plans/${planId}/pdf`}
          className={buttonVariants({ size: "lg" })}
        >
          <DownloadIcon />
          {t.downloadPdf}
        </a>
      ) : status === "pending" ? (
        <span
          role="status"
          className={cn(
            buttonVariants({ variant: "secondary", size: "lg" }),
            "cursor-default",
          )}
        >
          {t.processing}
        </span>
      ) : isGuest && price ? (
        <ButtonLink
          href={`/signup?reason=premium&next=${encodeURIComponent(`/plans/${planId}`)}`}
          size="lg"
        >
          <DownloadIcon />
          {t.createAccountForPdf}
        </ButtonLink>
      ) : status && price ? (
        <form action={startPremiumCheckout}>
          <input type="hidden" name="planId" value={planId} />
          <Button type="submit" size="lg">
            <DownloadIcon />
            {t.getPdf(price.display)}
          </Button>
        </form>
      ) : null}
      <ButtonLink href={plannerHref(locale)} variant="secondary" size="lg">
        <PlusIcon />
        {t.createAnother}
      </ButtonLink>
      {status && status !== "active" && price ? (
        <span className="text-xs text-muted-foreground">
          {isGuest ? t.thenUnlock(price.display) : t.testMode}
        </span>
      ) : null}
    </div>
  );
}
