"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Shows instant feedback before the results route has started rendering. */
export function SubmitButton({
  className,
  label = "Search flights",
  pendingLabel = "Searching…",
}: {
  className?: string;
  label?: string;
  pendingLabel?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size="lg"
      className={cn("rounded-xl", className)}
      aria-disabled={pending}
    >
      {pending ? pendingLabel : label}
    </Button>
  );
}
