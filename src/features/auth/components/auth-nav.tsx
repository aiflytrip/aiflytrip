"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { signOut } from "@/features/auth/actions";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { cn } from "@/lib/utils";

type Status = "unknown" | "signed-in" | "signed-out";

const linkClass =
  "rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground";

/**
 * Header auth controls. Runs in the browser so the shared layout doesn't
 * read cookies, which keeps public pages statically renderable. Space is
 * reserved while loading to avoid layout shift.
 */
export function AuthNav() {
  const [status, setStatus] = useState<Status>("unknown");
  const pathname = usePathname();

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    const controller = new AbortController();
    fetch("/api/auth/status", { cache: "no-store", signal: controller.signal })
      .then((response) => (response.ok ? response.json() : { signedIn: false }))
      .then((body: { signedIn?: boolean }) =>
        setStatus(body.signedIn ? "signed-in" : "signed-out"),
      )
      .catch(() => {
        if (!controller.signal.aborted) setStatus("signed-out");
      });
    return () => controller.abort();
    // Re-check after navigation (e.g. right after signing in or out).
  }, [pathname]);

  if (!isSupabaseConfigured) return null;

  if (status === "signed-in") {
    return (
      <div className="flex items-center gap-1">
        <Link href="/account" className={linkClass}>
          Account
        </Link>
        <form action={signOut}>
          <button type="submit" className={linkClass}>
            Sign out
          </button>
        </form>
      </div>
    );
  }

  return (
    <Link
      href="/login"
      aria-hidden={status === "unknown" ? true : undefined}
      tabIndex={status === "unknown" ? -1 : undefined}
      className={cn(
        buttonVariants({ variant: "secondary", size: "sm" }),
        status === "unknown" && "invisible",
      )}
    >
      Sign in
    </Link>
  );
}
