import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { type PaymentStatus } from "@/lib/supabase/database.types";

export type PurchaseItem = {
  id: string;
  travel_plan_id: string | null;
  amount_minor: number;
  amount_refunded_minor: number;
  currency: string;
  status: PaymentStatus;
  created_at: string;
};

const STATUS: Record<
  PaymentStatus,
  { label: string; variant: "neutral" | "accent" | "success" }
> = {
  succeeded: { label: "Paid", variant: "success" },
  pending: { label: "Processing", variant: "accent" },
  failed: { label: "Failed", variant: "neutral" },
  canceled: { label: "Cancelled", variant: "neutral" },
  refunded: { label: "Refunded", variant: "neutral" },
  partially_refunded: { label: "Partly refunded", variant: "accent" },
};

const on = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" });
const money = (minor: number, currency: string) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(
    minor / 100,
  );

export function PurchaseList({ items }: { items: PurchaseItem[] }) {
  if (items.length === 0) {
    return (
      <Card className="p-5 text-sm text-muted-foreground">
        No purchases yet. Premium PDFs can be unlocked from any ready trip plan.
      </Card>
    );
  }
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => {
        const status = STATUS[item.status];
        return (
          <li key={item.id}>
            <Card className="flex items-center justify-between gap-3 p-4">
              <div>
                <p className="font-medium">
                  Premium trip plan · {money(item.amount_minor, item.currency)}
                  {item.amount_refunded_minor > 0 ? (
                    <span className="text-muted-foreground">
                      {" "}
                      ({money(item.amount_refunded_minor, item.currency)}{" "}
                      refunded)
                    </span>
                  ) : null}
                </p>
                <p className="text-xs text-muted-foreground">
                  {on.format(new Date(item.created_at))} · Stripe test mode
                  {item.travel_plan_id ? (
                    <>
                      {" · "}
                      <Link
                        href={`/plans/${item.travel_plan_id}`}
                        className="hover:text-foreground hover:underline"
                      >
                        View plan
                      </Link>
                    </>
                  ) : null}
                </p>
              </div>
              <Badge variant={status.variant}>{status.label}</Badge>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}
