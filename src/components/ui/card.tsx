import { type ComponentProps } from "react";

import { cn } from "@/lib/utils";

export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "glass rounded-2xl shadow-[0_20px_60px_-30px_rgb(0_0_0/0.8)]",
        className,
      )}
      {...props}
    />
  );
}
