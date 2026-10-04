import type { Metadata } from "next";
import Link from "next/link";

import { fontClasses } from "@/components/layout/root-shell";

import "./globals.css";

/**
 * 404 for URLs that match no route. The site has a root layout per
 * language, so this page renders its own document (see next.config.ts).
 */
export const metadata: Metadata = {
  title: "Page not found | AIFlyTrip",
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${fontClasses} h-full antialiased`}>
      <body className="flex min-h-full flex-col items-center justify-center px-6 py-24 text-center">
        <p className="text-sm font-semibold text-primary">404</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          This page took a different flight
        </h1>
        <p className="mt-4 max-w-md text-muted-foreground">
          We couldn&apos;t find the page you were looking for. It may have moved
          or never existed.
        </p>
        <nav
          aria-label="Home pages"
          className="mt-8 flex flex-wrap justify-center gap-3 text-sm"
        >
          <Link
            href="/"
            className="rounded-full bg-primary px-5 py-2.5 font-semibold text-primary-foreground hover:bg-primary-hover"
          >
            Back to home
          </Link>
          <Link
            href="/es"
            hrefLang="es"
            lang="es"
            className="rounded-full border border-white/10 px-5 py-2.5 font-medium hover:border-white/25"
          >
            Inicio en español
          </Link>
          <Link
            href="/fr"
            hrefLang="fr"
            lang="fr"
            className="rounded-full border border-white/10 px-5 py-2.5 font-medium hover:border-white/25"
          >
            Accueil en français
          </Link>
        </nav>
      </body>
    </html>
  );
}
