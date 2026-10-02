"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const POLL_MS = 4000;
const STEPS = [
  { after: 0, text: "Finding flight options…" },
  { after: 8, text: "Planning your days…" },
  { after: 35, text: "Estimating your budget…" },
  {
    after: 70,
    text: "Almost there. Detailed plans can take a couple of minutes.",
  },
];

/** Shown while a plan generates; re-renders the server page until it's done. */
export function PlanPending({ startedAt }: { startedAt: string }) {
  const router = useRouter();
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const start = Date.parse(startedAt);
    const tick = setInterval(
      () => setElapsed(Math.max(0, Math.round((Date.now() - start) / 1000))),
      1000,
    );
    const poll = setInterval(() => router.refresh(), POLL_MS);
    return () => {
      clearInterval(tick);
      clearInterval(poll);
    };
  }, [router, startedAt]);

  const step =
    [...STEPS].reverse().find((s) => elapsed >= s.after) ?? STEPS[0]!;

  return (
    <Card className="flex flex-col gap-5 p-6" role="status" aria-live="polite">
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="size-3 animate-pulse rounded-full bg-primary motion-reduce:animate-none"
        />
        <p className="font-medium">{step.text}</p>
        <span className="ml-auto text-xs text-muted-foreground tabular-nums">
          {elapsed}s
        </span>
      </div>
      <p className="text-sm text-muted-foreground">
        You can leave this page. Your plan will keep generating and appear under
        My plans.
      </p>
      <div aria-hidden="true" className="flex flex-col gap-3">
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    </Card>
  );
}
