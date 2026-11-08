import { FRENCH_TOOLS } from "@/features/tools/french-tools";
import { SPANISH_TOOLS } from "@/features/tools/spanish-tools";
import { type ToolPageCopy } from "@/i18n/pages/tools";

/**
 * The packing and baggage tools in Spanish and French. Their English pages
 * live in english-tools.ts, and the URL in each language is in ROUTES
 * (i18n/routes.ts), which drives hreflang, the sitemap and the language
 * switcher.
 */

export const LOCALIZED_TOOL_KEYS = [
  "packing",
  "bagSize",
  "luggageWeight",
  "baggageFees",
] as const;

export type LocalizedToolKey = (typeof LOCALIZED_TOOL_KEYS)[number];
export type ToolLocale = "es" | "fr";

export type LocalizedTool = {
  path: string;
  /** Analytics placement for the planner call to action. */
  placement: string;
  /** Card on the tools hub. */
  card: { title: string; body: string };
  copy: ToolPageCopy;
};

export const LOCALIZED_TOOLS: Record<
  ToolLocale,
  Record<LocalizedToolKey, LocalizedTool>
> = { es: SPANISH_TOOLS, fr: FRENCH_TOOLS };

/** Heading of the packing and baggage section on each tools hub. */
export const BAG_TOOLS_HEADING: Record<ToolLocale, string> = {
  es: "Herramientas de equipaje",
  fr: "Outils bagages",
};
