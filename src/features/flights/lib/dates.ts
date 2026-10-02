const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;
const DAY_MS = 24 * 60 * 60 * 1000;

/** True for a real calendar date in YYYY-MM-DD form (rejects 2026-02-30). */
export function isIsoDate(value: string): boolean {
  const match = ISO_DATE.exec(value);
  if (!match) return false;
  const [, y, m, d] = match.map(Number);
  const date = new Date(Date.UTC(y!, m! - 1, d!));
  return (
    date.getUTCFullYear() === y &&
    date.getUTCMonth() === m! - 1 &&
    date.getUTCDate() === d
  );
}

/** YYYY-MM-DD for the given instant in the given time zone (default UTC). */
export function toIsoDate(date: Date, timeZone = "UTC"): string {
  // en-CA formats dates as YYYY-MM-DD.
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function addDays(isoDate: string, days: number): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  return toIsoDate(new Date(Date.UTC(y!, m! - 1, d!) + days * DAY_MS));
}

/** Whole days from `from` to `to`; both YYYY-MM-DD. */
export function daysBetween(from: string, to: string): number {
  const [fy, fm, fd] = from.split("-").map(Number);
  const [ty, tm, td] = to.split("-").map(Number);
  return Math.round(
    (Date.UTC(ty!, tm! - 1, td!) - Date.UTC(fy!, fm! - 1, fd!)) / DAY_MS,
  );
}

/** Minutes the time zone is ahead of UTC at the given instant. */
function timeZoneOffsetMinutes(utcMs: number, timeZone: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(new Date(utcMs));
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value);
  const wallClockAsUtc = Date.UTC(
    get("year"),
    get("month") - 1,
    get("day"),
    get("hour"),
    get("minute"),
    get("second"),
  );
  return (wallClockAsUtc - utcMs) / 60_000;
}

/**
 * Converts a wall-clock time at a place ("09:30 on 2026-11-02 in
 * Europe/London") to the UTC instant it represents.
 */
export function zonedTimeToUtc(
  isoDate: string,
  minutesAfterMidnight: number,
  timeZone: string,
): Date {
  const [y, m, d] = isoDate.split("-").map(Number);
  const naive = Date.UTC(y!, m! - 1, d!, 0, minutesAfterMidnight);
  const firstGuess = naive - timeZoneOffsetMinutes(naive, timeZone) * 60_000;
  // Re-check once in case the guess landed on the other side of a DST change.
  const offset = timeZoneOffsetMinutes(firstGuess, timeZone);
  return new Date(naive - offset * 60_000);
}
