import { type ComponentProps } from "react";

import { cn } from "@/lib/utils";

export const controlClasses =
  "h-11 w-full rounded-xl border border-border bg-card px-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground hover:border-muted-foreground/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(controlClasses, className)} {...props} />;
}
