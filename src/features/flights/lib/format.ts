import { daysBetween, toIsoDate } from "@/features/flights/lib/dates";
import { currencyDecimals } from "@/features/flights/lib/money";
import { type Money } from "@/features/flights/types";

const LOCALE = "en-US";

/** "7h 05m", or "45m" under an hour. */
export function formatDuration(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0) return `${minutes}m`;
  return `${hours}h ${String(minutes).padStart(2, "0")}m`;
}

/** Local wall-clock time at the airport, e.g. "7:05 PM". */
export function formatTime(isoInstant: string, timeZone: string): string {
  return new Intl.DateTimeFormat(LOCALE, {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(isoInstant));
}

/** "Mon, Nov 2" for a YYYY-MM-DD date. */
export function formatDate(isoDate: string): string {
  return new Intl.DateTimeFormat(LOCALE, {
    timeZone: "UTC",
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}

/** Formats minor units as currency, rounded to whole units for display. */
export function formatMoney({ amountMinor, currency }: Money): string {
  return new Intl.NumberFormat(LOCALE, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amountMinor / 10 ** currencyDecimals(currency));
}

/**
 * Calendar days between departure and arrival in their local time zones,
 * shown as "+1" next to overnight arrivals.
 */
export function arrivalDayOffset(
  departAt: string,
  departTimeZone: string,
  arriveAt: string,
  arriveTimeZone: string,
): number {
  return daysBetween(
    toIsoDate(new Date(departAt), departTimeZone),
    toIsoDate(new Date(arriveAt), arriveTimeZone),
  );
}

export function pluralize(
  count: number,
  singular: string,
  plural = `${singular}s`,
) {
  return `${count} ${count === 1 ? singular : plural}`;
}
