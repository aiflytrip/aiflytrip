import { Button, ButtonLink, buttonVariants } from "@/components/ui/button";
import { startPremiumCheckout } from "@/features/premium/actions";
import { type PremiumPrice } from "@/features/premium/lib/price";
import { type PremiumStatus } from "@/features/premium/server/entitlement";
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
  className,
}: {
  planId: string;
  /** Undefined when payments aren't configured. */
  status?: PremiumStatus;
  price?: PremiumPrice;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {status === "active" ? (
        // A plain link: the browser downloads the PDF from the route handler.
        <a
          href={`/plans/${planId}/pdf`}
          className={buttonVariants({ size: "lg" })}
        >
          <DownloadIcon />
          Download PDF
        </a>
      ) : status === "pending" ? (
        <span
          role="status"
          className={cn(
            buttonVariants({ variant: "secondary", size: "lg" }),
            "cursor-default",
          )}
        >
          Payment processing…
        </span>
      ) : status && price ? (
        <form action={startPremiumCheckout}>
          <input type="hidden" name="planId" value={planId} />
          <Button type="submit" size="lg">
            <DownloadIcon />
            Get the PDF · {price.display}
          </Button>
        </form>
      ) : null}
      <ButtonLink href="/plan" variant="secondary" size="lg">
        <PlusIcon />
        Create another plan
      </ButtonLink>
      {status && status !== "active" && price ? (
        <span className="text-xs text-muted-foreground">
          Test mode: no real payment is taken.
        </span>
      ) : null}
    </div>
  );
}
