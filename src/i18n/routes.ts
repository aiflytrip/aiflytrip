import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/i18n/config";

/**
 * Pages that exist in every language, with their URL in each. Spanish and
 * French URLs use translated slugs. hreflang alternates, the sitemap and the
 * language switcher all read from this table.
 */
export const ROUTES = {
  home: { en: "/", es: "/es", fr: "/fr" },
  tools: { en: "/tools", es: "/es/herramientas", fr: "/fr/outils" },
  budget: {
    en: "/tools/trip-budget-calculator",
    es: "/es/herramientas/calculadora-presupuesto-viaje",
    fr: "/fr/outils/calculateur-budget-voyage",
  },
  layover: {
    en: "/tools/layover-time-checker",
    es: "/es/herramientas/tiempo-de-escala",
    fr: "/fr/outils/temps-de-correspondance",
  },
  days: {
    en: "/tools/how-many-days",
    es: "/es/herramientas/cuantos-dias",
    fr: "/fr/outils/combien-de-jours",
  },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof ROUTES;
export const ROUTE_KEYS = Object.keys(ROUTES) as RouteKey[];

export const route = (key: RouteKey, locale: Locale): string =>
  ROUTES[key][locale];

/** The translated page a path belongs to, if any. */
export function routeKeyForPath(path: string): RouteKey | undefined {
  const clean = path.length > 1 ? path.replace(/\/+$/, "") : path;
  return ROUTE_KEYS.find((key) =>
    LOCALES.some((locale) => ROUTES[key][locale] === clean),
  );
}

/** Language of a path, from its /es or /fr prefix. */
export function localeForPath(path: string): Locale {
  const first = path.split("/")[1];
  return LOCALES.find((l) => l !== DEFAULT_LOCALE && l === first) ?? "en";
}

/**
 * Where the language switcher sends someone: the same page in that
 * language when it exists, otherwise that language's homepage.
 */
export function switchPath(path: string, target: Locale): string {
  const key = routeKeyForPath(path);
  return key ? ROUTES[key][target] : ROUTES.home[target];
}

/** hreflang alternates for metadata, with English as x-default. */
export function languageAlternates(key: RouteKey): Record<string, string> {
  return {
    en: ROUTES[key].en,
    es: ROUTES[key].es,
    fr: ROUTES[key].fr,
    "x-default": ROUTES[key][DEFAULT_LOCALE],
  };
}

/** Planner link that preselects the plan language. */
export const plannerHref = (locale: Locale): string =>
  locale === DEFAULT_LOCALE ? "/plan" : `/plan?lang=${locale}`;
