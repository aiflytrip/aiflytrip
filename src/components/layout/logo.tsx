import Link from "next/link";

import { LogoMark } from "@/components/layout/logo-mark";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} home`}
      className={cn(
        "flex items-center gap-2.5 font-display text-xl font-bold tracking-tight",
        className,
      )}
    >
      <LogoMark className="size-9 drop-shadow-[0_8px_18px_rgb(99_102_241/0.45)]" />
      <span>
        <span className="text-gradient">AI</span>
        FlyTrip
      </span>
    </Link>
  );
}
