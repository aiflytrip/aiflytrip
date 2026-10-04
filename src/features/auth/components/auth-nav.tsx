"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { signOut } from "@/features/auth/actions";
import { type Locale } from "@/i18n/config";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { cn } from "@/lib/utils";

type Status = "unknown" | "signed-in" | "guest" | "signed-out";

const LABELS: Record<
  Locale,
  {
    account: string;
    signOut: string;
    myPlans: string;
    createAccount: string;
    signIn: string;
  }
> = {
  en: {
    account: "Account",
    signOut: "Sign out",
    myPlans: "My plans",
    createAccount: "Create account",
    signIn: "Sign in",
  },
  es: {
    account: "Cuenta",
    signOut: "Cerrar sesión",
    myPlans: "Mis planes",
    createAccount: "Crear cuenta",
    signIn: "Iniciar sesión",
  },
  fr: {
    account: "Compte",
    signOut: "Se déconnecter",
    myPlans: "Mes plans",
    createAccount: "Créer un compte",
    signIn: "Se connecter",
  },
};

const linkClass =
  "rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground";

/**
 * Header auth controls. Runs in the browser so the shared layout doesn't
 * read cookies, which keeps public pages statically renderable. Space is
 * reserved while loading to avoid layout shift.
 */
export function AuthNav({ locale = "en" }: { locale?: Locale }) {
  const t = LABELS[locale];
  const [status, setStatus] = useState<Status>("unknown");
  const pathname = usePathname();

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    const controller = new AbortController();
    fetch("/api/auth/status", { cache: "no-store", signal: controller.signal })
      .then((response) => (response.ok ? response.json() : { signedIn: false }))
      .then((body: { signedIn?: boolean; guest?: boolean }) =>
        setStatus(
          body.signedIn ? "signed-in" : body.guest ? "guest" : "signed-out",
        ),
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
          {t.account}
        </Link>
        <form action={signOut}>
          <button type="submit" className={linkClass}>
            {t.signOut}
          </button>
        </form>
      </div>
    );
  }

  if (status === "guest") {
    return (
      <div className="flex items-center gap-1">
        <Link href="/plans" className={linkClass}>
          {t.myPlans}
        </Link>
        <Link
          href="/signup?next=%2Fplans"
          className={buttonVariants({ variant: "secondary", size: "sm" })}
        >
          {t.createAccount}
        </Link>
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
      {t.signIn}
    </Link>
  );
}
