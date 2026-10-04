/**
 * "How many days do I need?" planner. Follows the rules in our guide
 * "How many days do you need for a trip?" (/blog/how-many-days-for-a-trip):
 * big cities 3-4 days, smaller places 2-3 nights, 2 nights minimum per
 * stop, about one base per 3-4 days, extra time for day trips, slower
 * travel styles and long-haul travel days. Rules of thumb, shown as such.
 */

export type StopType = "big-city" | "town" | "countryside";
export type Pace = "relaxed" | "moderate" | "fast";

export type Stop = { name: string; type: StopType; dayTrips: number };

export type DaysInput = {
  stops: Stop[];
  pace: Pace;
  longHaul: boolean;
  slowerGroup: boolean;
  longJourneys: boolean;
  /** Optional: total days available, including travel days (0 = not set). */
  available: number;
};

export const MAX_STOPS = 6;

export const DEFAULT_DAYS_INPUT: DaysInput = {
  stops: [{ name: "", type: "big-city", dayTrips: 0 }],
  pace: "moderate",
  longHaul: false,
  slowerGroup: false,
  longJourneys: false,
  available: 0,
};

/** Base days on the ground per stop type at a moderate pace. */
export const BASE_DAYS: Record<StopType, number> = {
  "big-city": 4,
  town: 2,
  countryside: 3,
};
export const STOP_LABELS: Record<StopType, string> = {
  "big-city": "Big city",
  town: "Smaller city or town",
  countryside: "Countryside or beach base",
};
/** Two nights is the minimum for a stop to feel worthwhile. */
export const MIN_DAYS_PER_STOP = 2;

export type StopPlan = {
  name: string;
  type: StopType;
  days: number;
  notes: string[];
};
export type DaysResult = {
  stops: StopPlan[];
  groundDays: number;
  travelDays: number;
  totalDays: number;
  nights: number;
  fit?: { status: "fits" | "packed" | "spare"; difference: number };
  warnings: string[];
};

export function planDays(raw: DaysInput): DaysResult {
  const input = sanitiseDays(raw);
  const stops: StopPlan[] = input.stops.map((stop, index) => {
    const notes: string[] = [];
    let days = BASE_DAYS[stop.type];
    if (stop.dayTrips > 0) {
      days += stop.dayTrips;
      notes.push(
        `+${stop.dayTrips} for day trip${stop.dayTrips === 1 ? "" : "s"}`,
      );
    }
    if (input.pace === "relaxed") {
      days += 1;
      notes.push("+1 for a relaxed pace");
    }
    if (input.pace === "fast" && days > MIN_DAYS_PER_STOP) {
      days -= 1;
      notes.push("-1 for a fast pace");
    }
    if (input.slowerGroup) {
      days += 1;
      notes.push("+1 for children or older relatives");
    }
    days = Math.max(MIN_DAYS_PER_STOP, days);
    return {
      name: stop.name || `Stop ${index + 1}`,
      type: stop.type,
      days,
      notes,
    };
  });

  const groundDays = stops.reduce((sum, s) => sum + s.days, 0);
  const moves = Math.max(0, stops.length - 1);
  const moveDays = moves * (input.longJourneys ? 1 : 0.5);
  // Long-haul flights and time-zone changes take most of a day at each end.
  const endDays = input.longHaul ? 2 : 1;
  const travelDays = moveDays + endDays;
  const totalDays = Math.ceil(groundDays + travelDays);

  const warnings: string[] = [];
  if (stops.length > 1 && totalDays / stops.length < 3)
    warnings.push(
      "That's more than one base per three days, which can feel rushed. Consider dropping a stop or turning it into a day trip.",
    );
  if (input.longHaul && stops.length > 2 && totalDays < 10)
    warnings.push(
      "For a long-haul trip under ten days, focusing on one or two bases usually works better.",
    );

  let fit: DaysResult["fit"];
  if (input.available > 0) {
    const difference = input.available - totalDays;
    fit = {
      status: difference < 0 ? "packed" : difference >= 2 ? "spare" : "fits",
      difference,
    };
    if (difference < 0) {
      const shortest = [...stops].sort((a, b) => a.days - b.days)[0];
      warnings.push(
        stops.length > 1 && shortest
          ? `You'd need ${-difference} more day${difference === -1 ? "" : "s"}. Removing ${shortest.name} or making it a day trip would help.`
          : `You'd need ${-difference} more day${difference === -1 ? "" : "s"}. Try fewer day trips or a faster pace.`,
      );
    }
  }

  return {
    stops,
    groundDays,
    travelDays,
    totalDays,
    nights: Math.max(1, totalDays - 1),
    fit,
    warnings,
  };
}

const TYPES: StopType[] = ["big-city", "town", "countryside"];
const PACES: Pace[] = ["relaxed", "moderate", "fast"];
const bool = (v: unknown) => v === true || v === "1" || v === "true";
const int = (v: unknown, min: number, max: number, fallback: number) => {
  const n =
    typeof v === "number"
      ? v
      : typeof v === "string" && v.trim() !== ""
        ? Number(v)
        : NaN;
  return Number.isFinite(n)
    ? Math.min(max, Math.max(min, Math.round(n)))
    : fallback;
};
const cleanName = (v: unknown) =>
  typeof v === "string"
    ? v
        .replace(/[^\p{L}\p{N} .,'()&-]/gu, "")
        .trim()
        .slice(0, 40)
    : "";

export function sanitiseDays(
  raw: Partial<Record<keyof DaysInput, unknown>>,
): DaysInput {
  const stopsRaw = Array.isArray(raw.stops)
    ? raw.stops.slice(0, MAX_STOPS)
    : [];
  const stops: Stop[] = stopsRaw.map((s) => {
    const o = (s ?? {}) as Record<string, unknown>;
    return {
      name: cleanName(o.name),
      type: TYPES.includes(o.type as StopType)
        ? (o.type as StopType)
        : "big-city",
      dayTrips: int(o.dayTrips, 0, 5, 0),
    };
  });
  return {
    stops: stops.length > 0 ? stops : DEFAULT_DAYS_INPUT.stops,
    pace: PACES.includes(raw.pace as Pace) ? (raw.pace as Pace) : "moderate",
    longHaul: bool(raw.longHaul),
    slowerGroup: bool(raw.slowerGroup),
    longJourneys: bool(raw.longJourneys),
    available: int(raw.available, 0, 120, 0),
  };
}

/** Shareable query: stops as name~type~dayTrips joined by "|". */
export function daysToQuery(input: DaysInput): string {
  const params = new URLSearchParams();
  params.set(
    "stops",
    input.stops.map((s) => [s.name, s.type, s.dayTrips].join("~")).join("|"),
  );
  if (input.pace !== "moderate") params.set("pace", input.pace);
  if (input.longHaul) params.set("longHaul", "1");
  if (input.slowerGroup) params.set("slowerGroup", "1");
  if (input.longJourneys) params.set("longJourneys", "1");
  if (input.available) params.set("available", String(input.available));
  return params.toString();
}

export function daysFromQuery(query: string): DaysInput {
  const params = new URLSearchParams(query);
  const stops = (params.get("stops") ?? "")
    .split("|")
    .filter(Boolean)
    .map((part) => {
      const [name, type, dayTrips] = part.split("~");
      return { name, type, dayTrips };
    });
  return sanitiseDays({
    stops,
    pace: params.get("pace") ?? undefined,
    longHaul: params.get("longHaul"),
    slowerGroup: params.get("slowerGroup"),
    longJourneys: params.get("longJourneys"),
    available: params.get("available"),
  });
}
