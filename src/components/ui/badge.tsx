import { type ComponentProps } from "react";

import { cn } from "@/lib/utils";

type BadgeVariant = "neutral" | "accent" | "success";

const variantClasses: Record<BadgeVariant, string> = {
  neutral: "border border-border bg-card text-muted-foreground",
  accent: "bg-accent text-accent-foreground",
  success: "bg-success-soft text-success",
};

export function Badge({
  className,
  variant = "neutral",
  ...props
}: ComponentProps<"span"> & { variant?: BadgeVariant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
