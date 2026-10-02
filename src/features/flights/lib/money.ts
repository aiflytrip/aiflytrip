import { type Money } from "@/features/flights/types";

/** Number of decimal places a currency uses (USD 2, JPY 0, KWD 3). */
export function currencyDecimals(currency: string): number {
  return (
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).resolvedOptions().maximumFractionDigits ?? 2
  );
}

/**
 * Parses a provider decimal string ("123.45") into minor units without
 * floating-point drift. Returns undefined for malformed input.
 */
export function parseMoney(
  amount: string,
  currency: string,
): Money | undefined {
  const match = /^(\d+)(?:\.(\d+))?$/.exec(amount.trim());
  if (!match || !/^[A-Z]{3}$/.test(currency)) return undefined;

  const decimals = currencyDecimals(currency);
  const whole = match[1]!;
  const fraction = (match[2] ?? "").padEnd(decimals, "0");
  // Round any extra precision half-up at the currency's minor unit.
  const kept = fraction.slice(0, decimals);
  const roundUp = Number(fraction[decimals] ?? "0") >= 5 ? 1 : 0;
  const amountMinor = Number(whole + kept) + roundUp;
  return Number.isSafeInteger(amountMinor)
    ? { amountMinor, currency }
    : undefined;
}

/** Splits a total evenly, rounding to the nearest minor unit. */
export function divideMoney(total: Money, parts: number): Money {
  return {
    amountMinor: Math.round(total.amountMinor / Math.max(1, parts)),
    currency: total.currency,
  };
}
