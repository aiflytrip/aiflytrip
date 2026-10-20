/**
 * Baggage fee calculator: compares the real cost of up to three fares once
 * bags, seats and other extras are added. Every amount comes from the
 * traveller; nothing here is an airline's price.
 */

import { CURRENCIES, type Currency } from "@/features/tools/budget/budget";

export type FareOption = {
  name: string;
  /** Ticket price per person for the whole trip, as shown when booking. */
  fare: number;
  /** Per person, per flight. */
  cabinBag: number;
  /** Checked bags per person, and the fee per bag per flight. */
  checkedBags: number;
  checkedBagFee: number;
  /** Seat selection per person, per flight. */
  seat: number;
  /** Per person, per booking: check-in, priority, payment fees. */
  other: number;
  /** Whole group, to and from the airports. */
  transport: number;
};

export type FeeInput = {
  currency: Currency;
  travellers: number;
  returnTrip: boolean;
  options: FareOption[];
};

export const MAX_OPTIONS = 3;

export const emptyOption = (name: string): FareOption => ({
  name,
  fare: 0,
  cabinBag: 0,
  checkedBags: 0,
  checkedBagFee: 0,
  seat: 0,
  other: 0,
  transport: 0,
});

export const OPTION_NAMES = ["Fare A", "Fare B", "Fare C"] as const;

export const DEFAULT_FEES: FeeInput = {
  currency: "GBP",
  travellers: 1,
  returnTrip: true,
  options: [emptyOption("Fare A"), emptyOption("Fare B")],
};

export type FeeLineKey = "fares" | "bags" | "seats" | "other" | "transport";

export type OptionResult = {
  name: string;
  /** False until a fare is entered. */
  complete: boolean;
  lines: { key: FeeLineKey; amount: number }[];
  extras: number;
  total: number;
  perPerson: number;
};

export type FeeResult = {
  flights: number;
  options: OptionResult[];
  /** Index of the cheapest complete option by total, or null. */
  cheapest: number | null;
  /** Index of the lowest ticket price, or null. */
  lowestFare: number | null;
  /** The lowest ticket price is not the cheapest trip. */
  headlineMisleading: boolean;
  /** Total of the dearest complete option minus the cheapest. */
  spread: number;
};

export function compareFares(raw: FeeInput): FeeResult {
  const i = sanitiseFees(raw);
  const t = i.travellers;
  const flights = i.returnTrip ? 2 : 1;
  const options: OptionResult[] = i.options.map((o, k) => {
    const lines: OptionResult["lines"] = [
      { key: "fares", amount: o.fare * t },
      {
        key: "bags",
        amount: (o.cabinBag + o.checkedBags * o.checkedBagFee) * t * flights,
      },
      { key: "seats", amount: o.seat * t * flights },
      { key: "other", amount: o.other * t },
      { key: "transport", amount: o.transport },
    ];
    const total = lines.reduce((s, l) => s + l.amount, 0);
    return {
      name: o.name.trim() || OPTION_NAMES[k]!,
      complete: o.fare > 0,
      lines,
      extras: total - o.fare * t,
      total,
      perPerson: total / t,
    };
  });

  const complete = options
    .map((o, index) => ({ o, index }))
    .filter(({ o }) => o.complete);
  const by = (pick: (o: OptionResult) => number) =>
    complete.length === 0
      ? null
      : complete.reduce((best, cur) =>
          pick(cur.o) < pick(best.o) ? cur : best,
        ).index;
  const cheapest = by((o) => o.total);
  const lowestFare = by((o) => o.lines[0]!.amount);
  const totals = complete.map(({ o }) => o.total);
  return {
    flights,
    options,
    cheapest,
    lowestFare,
    headlineMisleading:
      complete.length > 1 &&
      cheapest !== null &&
      lowestFare !== null &&
      cheapest !== lowestFare &&
      options[cheapest]!.total < options[lowestFare]!.total,
    spread: totals.length > 1 ? Math.max(...totals) - Math.min(...totals) : 0,
  };
}

const money = (v: unknown) => {
  const n =
    typeof v === "number"
      ? v
      : typeof v === "string" && v.trim() !== ""
        ? Number(v)
        : NaN;
  return Number.isFinite(n)
    ? Math.round(Math.min(10_000_000, Math.max(0, n)) * 100) / 100
    : 0;
};
const count = (v: unknown, min: number, max: number, fallback: number) => {
  const n = Math.round(money(v));
  return v === undefined || v === ""
    ? fallback
    : Math.min(max, Math.max(min, n));
};
/** Not trimmed, so spaces can be typed; results fall back to "Fare A". */
const cleanName = (v: unknown, fallback: string) =>
  typeof v === "string"
    ? v.replace(/[\u0000-\u001f]/g, "").slice(0, 30)
    : fallback;

export function sanitiseFees(input: {
  currency?: unknown;
  travellers?: unknown;
  returnTrip?: unknown;
  options?: unknown;
}): FeeInput {
  const d = DEFAULT_FEES;
  const rawOptions = Array.isArray(input.options) ? input.options : d.options;
  const options = rawOptions
    .slice(0, MAX_OPTIONS)
    .map((raw: Partial<Record<keyof FareOption, unknown>>, k) => ({
      name: cleanName(raw?.name, OPTION_NAMES[k]!),
      fare: money(raw?.fare),
      cabinBag: money(raw?.cabinBag),
      checkedBags: count(raw?.checkedBags, 0, 3, 0),
      checkedBagFee: money(raw?.checkedBagFee),
      seat: money(raw?.seat),
      other: money(raw?.other),
      transport: money(raw?.transport),
    }));
  while (options.length < 2)
    options.push(emptyOption(OPTION_NAMES[options.length]!));
  return {
    currency: CURRENCIES.includes(input.currency as Currency)
      ? (input.currency as Currency)
      : d.currency,
    travellers: count(input.travellers, 1, 9, d.travellers),
    returnTrip:
      input.returnTrip === false || input.returnTrip === "0"
        ? false
        : input.returnTrip === true || input.returnTrip === "1"
          ? true
          : d.returnTrip,
    options,
  };
}

const OPTION_KEYS = Object.keys(emptyOption("")) as (keyof FareOption)[];

/** Options are stored as o0.fare=79, o1.name=Easy, ... */
export function feesToQuery(input: FeeInput): string {
  const params = new URLSearchParams();
  if (input.currency !== DEFAULT_FEES.currency)
    params.set("currency", input.currency);
  if (input.travellers !== DEFAULT_FEES.travellers)
    params.set("travellers", String(input.travellers));
  if (input.returnTrip !== DEFAULT_FEES.returnTrip)
    params.set("returnTrip", input.returnTrip ? "1" : "0");
  if (input.options.length !== DEFAULT_FEES.options.length)
    params.set("n", String(input.options.length));
  input.options.forEach((o, k) => {
    const blank = emptyOption(OPTION_NAMES[k]!);
    for (const key of OPTION_KEYS)
      if (o[key] !== blank[key]) params.set(`o${k}.${key}`, String(o[key]));
  });
  return params.toString();
}

export function feesFromQuery(query: string): FeeInput {
  const params = new URLSearchParams(query);
  const n = count(params.get("n") ?? undefined, 2, MAX_OPTIONS, 2);
  const options = Array.from({ length: n }, (_, k) => {
    const raw: Partial<Record<keyof FareOption, unknown>> = {};
    for (const key of OPTION_KEYS) {
      const v = params.get(`o${k}.${key}`);
      if (v !== null) raw[key] = v;
    }
    return raw;
  });
  return sanitiseFees({
    currency: params.get("currency") ?? undefined,
    travellers: params.get("travellers") ?? undefined,
    returnTrip: params.get("returnTrip") ?? undefined,
    options,
  });
}
