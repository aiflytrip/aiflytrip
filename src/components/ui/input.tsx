import { type ComponentProps } from "react";

import { cn } from "@/lib/utils";

export const controlClasses =
  "h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground hover:border-white/20 focus:border-primary/60 focus:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger [&>option]:bg-card";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(controlClasses, className)} {...props} />;
}
