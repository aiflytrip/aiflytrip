import { type ComponentProps } from "react";

import { controlClasses } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/** Native select: accessible and mobile-friendly without extra JavaScript. */
export function Select({ className, ...props }: ComponentProps<"select">) {
  return (
    <select
      className={cn(controlClasses, "cursor-pointer pr-8", className)}
      {...props}
    />
  );
}
