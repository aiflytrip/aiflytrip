/**
 * Trip budget maths. Pure functions, no built-in prices: every amount comes
 * from the user, so the tool never presents invented costs as facts.
 */

export const CURRENCIES = [
  "GBP",
  "EUR",
  "USD",
  "AUD",
  "CAD",
  "NZD",
  "JPY",
  "INR",
  "AED",
  "SGD",
  "CHF",
  "SEK",
  "NOK",
  "DKK",
  "ZAR",
] as const;
export type Currency = (typeof CURRENCIES)[number];

export const BUFFERS = [0, 10, 15, 20] as const;

export type BudgetInput = {
  travellers: number;
  nights: number;
  currency: Currency;
  /** Return flights (or main transport) per person. */
  flightsPerPerson: number;
  /** Accommodation per night for the whole group. */
  accommodationPerNight: number;
  /** Per person per day. */
  foodPerDay: number;
  transportPerDay: number;
  activitiesPerDay: number;
  /** One-off extras for the whole group: insurance, visas, gifts. */
  extras: number;
  /** Safety buffer as a percentage of the subtotal. */
  bufferPercent: number;
};

export const DEFAULT_INPUT: BudgetInput = {
  travellers: 2,
  nights: 4,
  currency: "GBP",
  flightsPerPerson: 0,
  accommodationPerNight: 0,
  foodPerDay: 0,
  transportPerDay: 0,
  activitiesPerDay: 0,
  extras: 0,
  bufferPercent: 10,
};

export type BudgetLine = {
  key:
    | "flights"
    | "accommodation"
    | "food"
    | "transport"
    | "activities"
    | "extras"
    | "buffer";
  label: string;
  amount: number;
};

export type BudgetResult = {
  days: number;
  lines: BudgetLine[];
  subtotal: number;
  total: number;
  perPerson: number;
  perDay: number;
};

const LIMITS = {
  travellers: [1, 20],
  nights: [1, 90],
  amount: [0, 10_000_000],
} as const;

const clamp = (value: number, [min, max]: readonly [number, number]) =>
  Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : min;

/** Normalises any input (e.g. from a shared URL) into safe, bounded values. */
export function sanitise(
  input: Partial<Record<keyof BudgetInput, unknown>>,
): BudgetInput {
  const num = (v: unknown, fallback: number) => {
    const n =
      typeof v === "number"
        ? v
        : typeof v === "string" && v.trim() !== ""
          ? Number(v)
          : NaN;
    return Number.isFinite(n) ? n : fallback;
  };
  const currency = CURRENCIES.includes(input.currency as Currency)
    ? (input.currency as Currency)
    : DEFAULT_INPUT.currency;
  const buffer = num(input.bufferPercent, DEFAULT_INPUT.bufferPercent);
  return {
    travellers: Math.round(
      clamp(num(input.travellers, DEFAULT_INPUT.travellers), LIMITS.travellers),
    ),
    nights: Math.round(
      clamp(num(input.nights, DEFAULT_INPUT.nights), LIMITS.nights),
    ),
    currency,
    flightsPerPerson: clamp(num(input.flightsPerPerson, 0), LIMITS.amount),
    accommodationPerNight: clamp(
      num(input.accommodationPerNight, 0),
      LIMITS.amount,
    ),
    foodPerDay: clamp(num(input.foodPerDay, 0), LIMITS.amount),
    transportPerDay: clamp(num(input.transportPerDay, 0), LIMITS.amount),
    activitiesPerDay: clamp(num(input.activitiesPerDay, 0), LIMITS.amount),
    extras: clamp(num(input.extras, 0), LIMITS.amount),
    bufferPercent: (BUFFERS as readonly number[]).includes(buffer)
      ? buffer
      : DEFAULT_INPUT.bufferPercent,
  };
}

/** Days of daily spending: one more than the nights (arrival and departure days). */
export function tripDays(nights: number): number {
  return nights + 1;
}

export function calculateBudget(raw: BudgetInput): BudgetResult {
  const i = sanitise(raw);
  const days = tripDays(i.nights);
  const base: BudgetLine[] = [
    {
      key: "flights",
      label: "Flights",
      amount: i.flightsPerPerson * i.travellers,
    },
    {
      key: "accommodation",
      label: "Accommodation",
      amount: i.accommodationPerNight * i.nights,
    },
    {
      key: "food",
      label: "Food and drink",
      amount: i.foodPerDay * days * i.travellers,
    },
    {
      key: "transport",
      label: "Local transport",
      amount: i.transportPerDay * days * i.travellers,
    },
    {
      key: "activities",
      label: "Activities",
      amount: i.activitiesPerDay * days * i.travellers,
    },
    { key: "extras", label: "Extras", amount: i.extras },
  ];
  const subtotal = base.reduce((sum, l) => sum + l.amount, 0);
  const buffer = (subtotal * i.bufferPercent) / 100;
  const lines =
    i.bufferPercent > 0
      ? [
          ...base,
          {
            key: "buffer" as const,
            label: `Buffer (${i.bufferPercent}%)`,
            amount: buffer,
          },
        ]
      : base;
  const total = subtotal + buffer;
  return {
    days,
    lines,
    subtotal,
    total,
    perPerson: total / i.travellers,
    perDay: total / days,
  };
}

/** Shareable URL query (only non-default values). */
export function toQuery(input: BudgetInput): string {
  const params = new URLSearchParams();
  for (const key of Object.keys(DEFAULT_INPUT) as (keyof BudgetInput)[]) {
    if (input[key] !== DEFAULT_INPUT[key]) params.set(key, String(input[key]));
  }
  return params.toString();
}

export function fromQuery(query: string): BudgetInput {
  const params = new URLSearchParams(query);
  const raw: Partial<Record<keyof BudgetInput, unknown>> = {};
  for (const key of Object.keys(DEFAULT_INPUT) as (keyof BudgetInput)[]) {
    const v = params.get(key);
    if (v !== null) raw[key] = v;
  }
  return sanitise(raw);
}
