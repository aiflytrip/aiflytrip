/**
 * Bag size checker. The limits always come from the traveller (copied from
 * their booking), helped by generic presets with no airline names, so the
 * tool never states an airline's rule as fact.
 *
 * A bag fits when its sides, sorted longest to shortest, are each no larger
 * than the limit's sides sorted the same way: that is the same as turning
 * the bag to its best orientation.
 */

export type UnitSystem = "metric" | "imperial";
export type LimitMode = "dimensions" | "total";

export type BagSizeInput = {
  unit: UnitSystem;
  mode: LimitMode;
  bagL: number;
  bagW: number;
  bagH: number;
  limL: number;
  limW: number;
  limH: number;
  /** Total of length + width + height, for "linear" limits. */
  limTotal: number;
  /** Optional weight check; 0 means not entered. */
  weight: number;
  weightLimit: number;
};

export const DEFAULT_BAG_SIZE: BagSizeInput = {
  unit: "metric",
  mode: "dimensions",
  bagL: 0,
  bagW: 0,
  bagH: 0,
  limL: 40,
  limW: 30,
  limH: 20,
  limTotal: 0,
  weight: 0,
  weightLimit: 0,
};

export type SizePreset = { label: string; dims: [number, number, number] };

/** Common sizes only, never attributed to an airline. */
export const SIZE_PRESETS: Record<UnitSystem, SizePreset[]> = {
  metric: [
    { label: "Small under-seat bag", dims: [40, 30, 20] },
    { label: "Larger personal item", dims: [45, 36, 20] },
    { label: "Cabin bag", dims: [55, 40, 20] },
    { label: "Larger cabin bag", dims: [56, 45, 25] },
  ],
  imperial: [
    { label: "Small under-seat bag", dims: [16, 12, 8] },
    { label: "Larger personal item", dims: [18, 14, 8] },
    { label: "Cabin bag", dims: [22, 14, 9] },
  ],
};

export const CM_PER_INCH = 2.54;
export const LB_PER_KG = 2.20462;
/** Within this much of a limit counts as a tight fit (cm or in). */
export const TIGHT_MARGIN = { metric: 1, imperial: 0.5 } as const;

export type SizeVerdict = "fits" | "tight" | "too-big" | "incomplete";

export type SideCheck = {
  /** "longest", "middle" or "shortest" side. */
  side: "longest" | "middle" | "shortest";
  bag: number;
  limit: number;
  /** Positive: room to spare; negative: too big by this much. */
  margin: number;
};

export type BagSizeResult = {
  verdict: SizeVerdict;
  sides: SideCheck[];
  /** Fits only when turned, compared with the order the sizes were typed. */
  needsTurning: boolean;
  bagTotal: number;
  totalMargin: number | null;
  weightVerdict: "under" | "over" | null;
  weightMargin: number | null;
};

const round1 = (n: number) => Math.round(n * 10) / 10;
const desc = (a: number[]) => [...a].sort((x, y) => y - x);

export function checkBagSize(raw: BagSizeInput): BagSizeResult {
  const i = sanitiseBagSize(raw);
  const bag = [i.bagL, i.bagW, i.bagH];
  const bagTotal = round1(bag.reduce((s, n) => s + n, 0));
  const tight = TIGHT_MARGIN[i.unit];

  const weightVerdict =
    i.weight > 0 && i.weightLimit > 0
      ? i.weight <= i.weightLimit
        ? "under"
        : "over"
      : null;
  const weightMargin =
    weightVerdict === null ? null : round1(i.weightLimit - i.weight);

  const base = { bagTotal, weightVerdict, weightMargin } as const;

  if (bag.some((n) => n <= 0))
    return {
      ...base,
      verdict: "incomplete",
      sides: [],
      needsTurning: false,
      totalMargin: null,
    };

  if (i.mode === "total") {
    if (i.limTotal <= 0)
      return {
        ...base,
        verdict: "incomplete",
        sides: [],
        needsTurning: false,
        totalMargin: null,
      };
    const totalMargin = round1(i.limTotal - bagTotal);
    return {
      ...base,
      verdict:
        totalMargin < 0 ? "too-big" : totalMargin < tight ? "tight" : "fits",
      sides: [],
      needsTurning: false,
      totalMargin,
    };
  }

  const limit = [i.limL, i.limW, i.limH];
  if (limit.some((n) => n <= 0))
    return {
      ...base,
      verdict: "incomplete",
      sides: [],
      needsTurning: false,
      totalMargin: null,
    };

  const b = desc(bag);
  const l = desc(limit);
  const names = ["longest", "middle", "shortest"] as const;
  const sides: SideCheck[] = names.map((side, k) => ({
    side,
    bag: b[k]!,
    limit: l[k]!,
    margin: round1(l[k]! - b[k]!),
  }));
  const fitsTurned = sides.every((s) => s.margin >= 0);
  const fitsAsTyped = bag.every((n, k) => n <= limit[k]!);
  const minMargin = Math.min(...sides.map((s) => s.margin));
  return {
    ...base,
    verdict: !fitsTurned ? "too-big" : minMargin < tight ? "tight" : "fits",
    sides,
    needsTurning: fitsTurned && !fitsAsTyped,
    totalMargin: null,
  };
}

/** Switches units, converting every entered value. */
export function convertBagSize(
  input: BagSizeInput,
  unit: UnitSystem,
): BagSizeInput {
  if (unit === input.unit) return input;
  const len = (n: number) =>
    round1(unit === "imperial" ? n / CM_PER_INCH : n * CM_PER_INCH);
  const wt = (n: number) =>
    round1(unit === "imperial" ? n * LB_PER_KG : n / LB_PER_KG);
  return {
    ...input,
    unit,
    bagL: len(input.bagL),
    bagW: len(input.bagW),
    bagH: len(input.bagH),
    limL: len(input.limL),
    limW: len(input.limW),
    limH: len(input.limH),
    limTotal: len(input.limTotal),
    weight: wt(input.weight),
    weightLimit: wt(input.weightLimit),
  };
}

const NUM_KEYS = [
  "bagL",
  "bagW",
  "bagH",
  "limL",
  "limW",
  "limH",
  "limTotal",
  "weight",
  "weightLimit",
] as const;

const num = (v: unknown, fallback: number) => {
  const n =
    typeof v === "number"
      ? v
      : typeof v === "string" && v.trim() !== ""
        ? Number(v)
        : NaN;
  return Number.isFinite(n) ? round1(Math.min(500, Math.max(0, n))) : fallback;
};

export function sanitiseBagSize(
  input: Partial<Record<keyof BagSizeInput, unknown>>,
): BagSizeInput {
  const d = DEFAULT_BAG_SIZE;
  const out: BagSizeInput = {
    ...d,
    unit: input.unit === "imperial" ? "imperial" : "metric",
    mode: input.mode === "total" ? "total" : "dimensions",
  };
  for (const key of NUM_KEYS) out[key] = num(input[key], d[key]);
  return out;
}

export function bagSizeToQuery(input: BagSizeInput): string {
  const params = new URLSearchParams();
  for (const key of Object.keys(DEFAULT_BAG_SIZE) as (keyof BagSizeInput)[])
    if (input[key] !== DEFAULT_BAG_SIZE[key])
      params.set(key, String(input[key]));
  return params.toString();
}

export function bagSizeFromQuery(query: string): BagSizeInput {
  const params = new URLSearchParams(query);
  const raw: Partial<Record<keyof BagSizeInput, unknown>> = {};
  for (const key of Object.keys(DEFAULT_BAG_SIZE) as (keyof BagSizeInput)[]) {
    const v = params.get(key);
    if (v !== null) raw[key] = v;
  }
  return sanitiseBagSize(raw);
}
