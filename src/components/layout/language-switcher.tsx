"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { LOCALE_NAMES, LOCALES, type Locale } from "@/i18n/config";
import { localeForPath, routeKeyForPath, switchPath } from "@/i18n/routes";
import { cn } from "@/lib/utils";

/**
 * Header language menu. Each option links to the same page in that
 * language when it exists, otherwise to that language's homepage. Tool
 * settings in the query string carry over, since every language uses the
 * same format.
 */
export function LanguageSwitcher({ label }: { label: string }) {
  const pathname = usePathname() ?? "/";
  const current = localeForPath(pathname);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClick);
    };
  }, [open]);

  const translated = routeKeyForPath(pathname) !== undefined;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4.5"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z" />
        </svg>
        <span className="sr-only">{label}: </span>
        <span className="uppercase">{current}</span>
      </button>
      {open ? (
        <ul
          aria-label={label}
          className="absolute right-0 z-50 mt-2 w-44 rounded-2xl border border-white/10 bg-background/95 p-1.5 shadow-2xl backdrop-blur-xl"
        >
          {LOCALES.map((locale: Locale) => {
            const href = switchPath(pathname, locale);
            return (
              <li key={locale}>
                <a
                  href={href}
                  hrefLang={locale}
                  lang={locale}
                  aria-current={locale === current ? "true" : undefined}
                  onClick={(e) => {
                    if (!translated || !window.location.search) return;
                    e.preventDefault();
                    window.location.assign(href + window.location.search);
                  }}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-3 py-2 text-sm hover:bg-white/5",
                    locale === current
                      ? "font-semibold text-white"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {LOCALE_NAMES[locale]}
                  <span className="font-mono text-xs uppercase opacity-60">
                    {locale}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
