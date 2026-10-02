import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  effectiveStatus,
  type PlanStatus,
} from "@/features/trip-planner/lib/stored-plan";

export type PlanListItem = {
  id: string;
  status: PlanStatus;
  created_at: string;
  updated_at: string;
  tripTitle: string;
};

const STATUS: Record<
  PlanStatus,
  { label: string; variant: "neutral" | "accent" | "success" }
> = {
  pending: { label: "Generating", variant: "accent" },
  generating: { label: "Generating", variant: "accent" },
  ready: { label: "Ready", variant: "success" },
  failed: { label: "Failed", variant: "neutral" },
};

const createdOn = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});

export function PlanList({ items }: { items: PlanListItem[] }) {
  if (items.length === 0) {
    return (
      <Card className="flex flex-col items-center gap-3 p-8 text-center">
        <p className="font-semibold">No plans yet</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          Tell us where you&apos;re going and what you enjoy, and we&apos;ll
          draft a day-by-day plan.
        </p>
        <ButtonLink href="/plan">Plan a trip</ButtonLink>
      </Card>
    );
  }
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => {
        const status = STATUS[effectiveStatus(item.status, item.updated_at)];
        return (
          <li key={item.id}>
            <Card className="flex items-center justify-between gap-3 p-4">
              <div>
                <Link
                  href={`/plans/${item.id}`}
                  className="font-medium hover:text-primary hover:underline"
                >
                  {item.tripTitle}
                </Link>
                <p className="text-xs text-muted-foreground">
                  {createdOn.format(new Date(item.created_at))}
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
