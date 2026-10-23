"use client";

import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";

import { LOCALES, type Locale } from "@/i18n/config";
import { SITE_MESSAGES } from "@/i18n/messages/site";
import { hasTranslation, localeForPath, switchPath } from "@/i18n/routes";

const STORAGE_KEY = "aiflytrip-language-banner-dismissed";
const noopSubscribe = () => () => {};

/** The visitor's preferred supported language, from browser settings. */
function preferredLocale(): Locale | null {
  for (const tag of navigator.languages ?? [navigator.language]) {
    const base = tag.toLowerCase().split("-")[0];
    if (LOCALES.includes(base as Locale)) return base as Locale;
  }
  return null;
}

function wasDismissed(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * Suggests this page in the visitor's browser language when a translation
 * exists. It never redirects: travellers abroad and search engines always
 * get the page they asked for. Dismissal is remembered on this device.
 */
export function LanguageBanner() {
  const pathname = usePathname() ?? "/";
  const [closed, setClosed] = useState(false);
  // Browser-only signals; the server render (and first paint) shows nothing.
  const suggestion = useSyncExternalStore(
    noopSubscribe,
    () => {
      if (wasDismissed()) return null;
      const preferred = preferredLocale();
      return preferred &&
        preferred !== localeForPath(pathname) &&
        hasTranslation(pathname, preferred)
        ? preferred
        : null;
    },
    () => null,
  );

  if (!suggestion || closed) return null;
  const t = SITE_MESSAGES[suggestion].banner;

  function dismiss() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Storage may be blocked; hiding for this page view is enough.
    }
    setClosed(true);
  }

  return (
    <div
      lang={suggestion}
      role="region"
      aria-label={t.prompt}
      className="border-b border-primary/20 bg-primary/10 text-sm print:hidden"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-2 px-4 py-2">
        <span className="text-foreground/90">{t.prompt}</span>
        <a
          href={switchPath(pathname, suggestion)}
          hrefLang={suggestion}
          className="font-semibold text-primary hover:text-primary-hover"
        >
          {t.view} →
        </a>
        <button
          type="button"
          onClick={dismiss}
          className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          {t.dismiss}
        </button>
      </div>
    </div>
  );
}
