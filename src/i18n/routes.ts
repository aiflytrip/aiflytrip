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
  // The planner form is private (noindex), so it isn't in the sitemap.
  planner: { en: "/plan", es: "/es/planificar", fr: "/fr/planifier" },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof ROUTES;
export const ROUTE_KEYS = Object.keys(ROUTES) as RouteKey[];

export const route = (key: RouteKey, locale: Locale): string =>
  ROUTES[key][locale];

const cleanPath = (path: string) =>
  path.length > 1 ? path.replace(/\/+$/, "") : path;

/** The translated page a path belongs to, if any. */
export function routeKeyForPath(path: string): RouteKey | undefined {
  const clean = cleanPath(path);
  return ROUTE_KEYS.find((key) =>
    LOCALES.some((locale) => ROUTES[key][locale] === clean),
  );
}

/**
 * The blog exists in English and Spanish only. English post slug -> Spanish
 * post slug, for posts that have a Spanish version; the content tests check
 * it against each Spanish post's translationOf. Plain data so the language
 * switcher can use it in the browser.
 */
export const BLOG_TRANSLATIONS: Record<string, string> = {
  "how-airline-pricing-works":
    "como-fijan-las-aerolineas-el-precio-de-los-vuelos",
  "how-to-build-a-travel-itinerary": "ejemplo-de-itinerario-de-viaje",
  "what-is-a-flight-itinerary": "ejemplo-de-itinerario-de-vuelo",
  "what-fits-under-the-seat": "que-cabe-debajo-del-asiento-del-avion",
  "personal-item-vs-carry-on": "articulo-personal-o-equipaje-de-mano",
  "carry-on-too-big-at-the-gate": "equipaje-de-mano-demasiado-grande",
};

export const BLOG_HUB = { en: "/blog", es: "/es/blog" } as const;

export type BlogPair = { en: string; es: string };

/**
 * Other pages that exist in English and Spanish only, such as tools not yet
 * translated into French. They pair the same way blog posts do.
 */
export const EN_ES_PAGES = {
  bagSize: {
    en: "/tools/bag-size-checker",
    es: "/es/herramientas/medidas-equipaje-de-mano",
  },
  luggageWeight: {
    en: "/tools/luggage-weight-calculator",
    es: "/es/herramientas/peso-de-la-maleta",
  },
  baggageFees: {
    en: "/tools/baggage-fee-calculator",
    es: "/es/herramientas/coste-del-equipaje",
  },
} as const satisfies Record<string, BlogPair>;

/** The English and Spanish URLs of a page that exists in both, but not French. */
export function blogPair(path: string): BlogPair | undefined {
  const clean = cleanPath(path);
  if (clean === BLOG_HUB.en || clean === BLOG_HUB.es) return { ...BLOG_HUB };
  for (const [en, es] of Object.entries(BLOG_TRANSLATIONS)) {
    const pair = { en: `${BLOG_HUB.en}/${en}`, es: `${BLOG_HUB.es}/${es}` };
    if (clean === pair.en || clean === pair.es) return pair;
  }
  return Object.values(EN_ES_PAGES).find(
    (pair) => clean === pair.en || clean === pair.es,
  );
}

/** Whether a path has a version in the target language. */
export function hasTranslation(path: string, target: Locale): boolean {
  if (routeKeyForPath(path)) return true;
  return blogPair(path) !== undefined && target !== "fr";
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
  if (key) return ROUTES[key][target];
  const pair = blogPair(path);
  if (pair && target !== "fr") return pair[target];
  return ROUTES.home[target];
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

/** hreflang alternates for any path with translations, or undefined. */
export function alternatesForPath(
  path: string,
): Record<string, string> | undefined {
  const key = routeKeyForPath(path);
  if (key) return languageAlternates(key);
  const pair = blogPair(path);
  return pair ? { en: pair.en, es: pair.es, "x-default": pair.en } : undefined;
}

/** Translated pages that are indexable (listed in the sitemap). */
export const INDEXABLE_ROUTE_KEYS = ROUTE_KEYS.filter((k) => k !== "planner");

/** The planner form in a language; it preselects that plan language. */
export const plannerHref = (locale: Locale): string => ROUTES.planner[locale];
