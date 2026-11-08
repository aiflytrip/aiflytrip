/**
 * Luggage weight calculator. Either checks a weighed bag against the
 * traveller's limit, or estimates the weight from typical item weights.
 * Item weights are rough averages, shown to the user as estimates; limits
 * always come from the traveller's booking.
 */

export type WeightUnit = "kg" | "lb";
export type WeightMode = "estimate" | "weighed";

export const LB_PER_KG = 2.20462;

/** Typical weights in kg. Rough averages for adult clothing and kit. */
export const ITEMS = [
  { id: "tshirt", label: "T-shirts or tops", kg: 0.15 },
  { id: "shirt", label: "Shirts or blouses", kg: 0.25 },
  { id: "jumper", label: "Jumpers or fleeces", kg: 0.45, wearable: "a jumper" },
  { id: "jeans", label: "Jeans", kg: 0.65 },
  { id: "trousers", label: "Light trousers or skirts", kg: 0.35 },
  { id: "shorts", label: "Shorts", kg: 0.25 },
  { id: "dress", label: "Dresses", kg: 0.3 },
  { id: "underwear", label: "Underwear", kg: 0.05 },
  { id: "socks", label: "Pairs of socks", kg: 0.05 },
  { id: "sleepwear", label: "Sleepwear", kg: 0.3 },
  { id: "swimwear", label: "Swimwear", kg: 0.1 },
  { id: "jacket", label: "Light jackets", kg: 0.6, wearable: "your jacket" },
  { id: "coat", label: "Winter coats", kg: 1.4, wearable: "your coat" },
  {
    id: "trainers",
    label: "Pairs of trainers",
    kg: 0.9,
    wearable: "your trainers",
  },
  {
    id: "shoes",
    label: "Pairs of smart shoes",
    kg: 0.8,
    wearable: "your smart shoes",
  },
  { id: "sandals", label: "Pairs of sandals", kg: 0.4 },
  { id: "toiletries", label: "Toiletry bags", kg: 1.0 },
  { id: "laptop", label: "Laptops", kg: 1.6 },
  { id: "tablet", label: "Tablets or e-readers", kg: 0.4 },
  { id: "camera", label: "Cameras", kg: 0.8 },
  { id: "chargers", label: "Sets of chargers and cables", kg: 0.3 },
  { id: "books", label: "Books", kg: 0.35 },
  { id: "hairdryer", label: "Hair dryers or straighteners", kg: 0.6 },
  { id: "towel", label: "Towels", kg: 0.5 },
] as const;

export type ItemId = (typeof ITEMS)[number]["id"];
/** Items worth wearing on the plane, with how to say so ("your coat"). */
type WearableItem = Extract<(typeof ITEMS)[number], { wearable: string }>;

export type WeightInput = {
  unit: WeightUnit;
  mode: WeightMode;
  /** The traveller's limit, in `unit`. 0 means not entered. */
  limit: number;
  /** A weighed bag, in `unit` (weighed mode). */
  weighed: number;
  /** Empty bag weight, in `unit` (estimate mode). */
  emptyBag: number;
  counts: Partial<Record<ItemId, number>>;
};

export const DEFAULT_WEIGHT: WeightInput = {
  unit: "kg",
  mode: "estimate",
  limit: 7,
  weighed: 0,
  emptyBag: 2.5,
  counts: {},
};

/** Common limits only, never attributed to an airline. */
export const LIMIT_PRESETS: Record<WeightUnit, number[]> = {
  kg: [7, 8, 10, 20, 23, 32],
  lb: [15, 18, 22, 44, 50, 70],
};

export type WeightVerdict = "under" | "close" | "over" | "incomplete";

export type WeightLine = { id: ItemId; label: string; weight: number };

export type WeightResult = {
  verdict: WeightVerdict;
  /** Total in `unit`. */
  total: number;
  /** limit - total: positive is spare, negative is over. */
  margin: number | null;
  /** Heaviest item groups first (estimate mode). */
  lines: WeightLine[];
  /** Weight saved by wearing one of each wearable item instead (estimate mode). */
  wearSaving: number;
  wearItems: string[];
  /** The same items by id, for other languages. */
  wearIds: ItemId[];
};

const round1 = (n: number) => Math.round(n * 10) / 10;
const fromKg = (kg: number, unit: WeightUnit) =>
  unit === "kg" ? kg : kg * LB_PER_KG;

/** Within this share of the limit counts as close. */
export const CLOSE_SHARE = 0.1;

export function checkWeight(raw: WeightInput): WeightResult {
  const i = sanitiseWeight(raw);
  const lines: WeightLine[] = ITEMS.flatMap((item) => {
    const count = i.counts[item.id] ?? 0;
    return count > 0
      ? [
          {
            id: item.id,
            label: item.label,
            weight: round1(fromKg(item.kg * count, i.unit)),
          },
        ]
      : [];
  }).sort((a, b) => b.weight - a.weight);

  const total =
    i.mode === "weighed"
      ? i.weighed
      : round1(
          i.emptyBag +
            ITEMS.reduce(
              (sum, item) =>
                sum + fromKg(item.kg * (i.counts[item.id] ?? 0), i.unit),
              0,
            ),
        );

  const wearable = ITEMS.filter(
    (item): item is WearableItem =>
      "wearable" in item && (i.counts[item.id] ?? 0) > 0,
  );
  // Wear the heaviest layers: one coat or jacket, one jumper, one pair of shoes.
  const pick = (ids: ItemId[]) =>
    wearable.filter((w) => ids.includes(w.id)).sort((a, b) => b.kg - a.kg)[0];
  const worn = [
    pick(["coat", "jacket"]),
    pick(["jumper"]),
    pick(["trainers", "shoes"]),
  ].filter((w): w is WearableItem => w !== undefined);
  const wearSaving =
    i.mode === "estimate"
      ? round1(worn.reduce((s, w) => s + fromKg(w.kg, i.unit), 0))
      : 0;

  const empty = i.mode === "weighed" ? i.weighed <= 0 : lines.length === 0;
  if (empty || i.limit <= 0)
    return {
      verdict: "incomplete",
      total,
      margin: null,
      lines,
      wearSaving,
      wearItems: worn.map((w) => w.wearable),
      wearIds: worn.map((w) => w.id),
    };

  const margin = round1(i.limit - total);
  return {
    verdict:
      margin < 0 ? "over" : margin < i.limit * CLOSE_SHARE ? "close" : "under",
    total,
    margin,
    lines,
    wearSaving,
    wearItems: worn.map((w) => w.wearable),
    wearIds: worn.map((w) => w.id),
  };
}

/** Switches units, converting the entered weights. */
export function convertWeight(
  input: WeightInput,
  unit: WeightUnit,
): WeightInput {
  if (unit === input.unit) return input;
  const c = (n: number) =>
    round1(unit === "lb" ? n * LB_PER_KG : n / LB_PER_KG);
  return {
    ...input,
    unit,
    limit: c(input.limit),
    weighed: c(input.weighed),
    emptyBag: c(input.emptyBag),
  };
}

const ITEM_IDS = ITEMS.map((i) => i.id) as ItemId[];

const num = (v: unknown, fallback: number, max: number) => {
  const n =
    typeof v === "number"
      ? v
      : typeof v === "string" && v.trim() !== ""
        ? Number(v)
        : NaN;
  return Number.isFinite(n) ? round1(Math.min(max, Math.max(0, n))) : fallback;
};

export function sanitiseWeight(
  input: Partial<Record<keyof WeightInput, unknown>>,
): WeightInput {
  const d = DEFAULT_WEIGHT;
  const rawCounts =
    input.counts && typeof input.counts === "object"
      ? (input.counts as Record<string, unknown>)
      : {};
  const counts: Partial<Record<ItemId, number>> = {};
  for (const id of ITEM_IDS) {
    const n = Math.round(num(rawCounts[id], 0, 50));
    if (n > 0) counts[id] = n;
  }
  return {
    unit: input.unit === "lb" ? "lb" : "kg",
    mode: input.mode === "weighed" ? "weighed" : "estimate",
    limit: num(input.limit, d.limit, 200),
    weighed: num(input.weighed, d.weighed, 200),
    emptyBag: num(input.emptyBag, d.emptyBag, 50),
    counts,
  };
}

/** Item counts are stored as e.g. items=tshirt.5,jeans.2 */
export function weightToQuery(input: WeightInput): string {
  const params = new URLSearchParams();
  for (const key of ["unit", "mode", "limit", "weighed", "emptyBag"] as const)
    if (input[key] !== DEFAULT_WEIGHT[key]) params.set(key, String(input[key]));
  const items = ITEM_IDS.filter((id) => (input.counts[id] ?? 0) > 0)
    .map((id) => `${id}.${input.counts[id]}`)
    .join(",");
  if (items) params.set("items", items);
  return params.toString();
}

export function weightFromQuery(query: string): WeightInput {
  const params = new URLSearchParams(query);
  const counts: Record<string, string> = {};
  for (const pair of (params.get("items") ?? "").split(",")) {
    const [id, n] = pair.split(".");
    if (id && n) counts[id] = n;
  }
  return sanitiseWeight({
    unit: params.get("unit") ?? undefined,
    mode: params.get("mode") ?? undefined,
    limit: params.get("limit") ?? undefined,
    weighed: params.get("weighed") ?? undefined,
    emptyBag: params.get("emptyBag") ?? undefined,
    counts,
  });
}
