import { type StopPlan } from "@/features/tools/days/days";
import { type Verdict } from "@/features/tools/layover/layover";
import { INTL_LOCALES, type Locale } from "@/i18n/config";
import { type ToolsMessages } from "@/i18n/messages/tools";

/**
 * Display helpers shared by the tool components (client) and the homepage
 * showcase (server), so they live outside any "use client" module.
 */

/** Whole-unit currency amount, formatted for the page's language. */
export function formatMoney(
  amount: number,
  currency: string,
  locale: Locale = "en",
): string {
  const tag = INTL_LOCALES[locale];
  try {
    return new Intl.NumberFormat(tag, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${Math.round(amount).toLocaleString(tag)} ${currency}`;
  }
}

/** A number of minutes in the page's language, e.g. "1h 45m" or "1 h 45 min". */
export function formatMinutes(mins: number, m: ToolsMessages): string {
  const total = Math.abs(Math.round(mins));
  return m.common.duration(Math.floor(total / 60), total % 60);
}

export const VERDICT_STYLES: Record<Verdict, { tone: string; dot: string }> = {
  comfortable: {
    tone: "border-emerald-400/40 bg-emerald-400/10 text-emerald-200",
    dot: "bg-emerald-400",
  },
  workable: {
    tone: "border-sky-400/40 bg-sky-400/10 text-sky-200",
    dot: "bg-sky-400",
  },
  tight: {
    tone: "border-amber-400/40 bg-amber-400/10 text-amber-200",
    dot: "bg-amber-400",
  },
  risky: {
    tone: "border-red-400/40 bg-red-400/10 text-red-200",
    dot: "bg-red-400",
  },
};

/** "Lisbon", or "Stop 2" when no name was entered. */
export const stopDisplayName = (stop: StopPlan, t: ToolsMessages["days"]) =>
  stop.name || t.stopName(stop.index + 1);
