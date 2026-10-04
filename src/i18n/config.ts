/**
 * Supported languages. English is the default and keeps its unprefixed
 * URLs; Spanish and French pages live under /es and /fr. Only pages listed
 * in ROUTES (src/i18n/routes.ts) are translated; everything else is English.
 */
export const LOCALES = ["en", "es", "fr"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
};

/** Open Graph locale for each language. */
export const OG_LOCALES: Record<Locale, string> = {
  en: "en_GB",
  es: "es_ES",
  fr: "fr_FR",
};

/** BCP 47 tag for number and date formatting. */
export const INTL_LOCALES: Record<Locale, string> = {
  en: "en-GB",
  es: "es-ES",
  fr: "fr-FR",
};

export const isLocale = (value: unknown): value is Locale =>
  LOCALES.includes(value as Locale);
