/**
 * Layover time checker. A transparent rule-of-thumb estimate built from the
 * steps a connection involves. These are planning assumptions, NOT official
 * minimum connection times (which airlines and airports set per airport);
 * the UI shows every assumption and says so.
 */

export type YesNoUnsure = "no" | "yes" | "unsure";

export type LayoverInput = {
  hours: number;
  minutes: number;
  separateTickets: boolean;
  largeAirport: boolean;
  terminalChange: YesNoUnsure;
  passportControl: YesNoUnsure;
  securityAgain: YesNoUnsure;
  recheckBags: YesNoUnsure;
  children: boolean;
  busySeason: boolean;
  longHaulFirst: boolean;
  firstVisit: boolean;
};

export const DEFAULT_LAYOVER: LayoverInput = {
  hours: 1,
  minutes: 30,
  separateTickets: false,
  largeAirport: true,
  terminalChange: "unsure",
  passportControl: "unsure",
  securityAgain: "unsure",
  recheckBags: "no",
  children: false,
  busySeason: false,
  longHaulFirst: false,
  firstVisit: false,
};

/** Planning assumptions in minutes, shown to the user as such. */
export const ASSUMPTIONS = {
  deplaneSmall: 15,
  deplaneLarge: 25,
  terminalChange: 20,
  passportControl: 30,
  securityAgain: 20,
  recheckBags: 30,
  boardingCloses: 20,
  perExtraFactor: 10,
  separateTicketsBuffer: 90,
} as const;

export type StepKey =
  | "deplaneLarge"
  | "deplaneSmall"
  | "terminalChange"
  | "passportControl"
  | "securityAgain"
  | "recheckBags"
  | "children"
  | "busySeason"
  | "longHaulFirst"
  | "firstVisit"
  | "boardingCloses"
  | "separateTickets";
export type AdviceKey =
  | "separateTickets"
  | "singleTicket"
  | "risky"
  | "tight"
  | "workable"
  | "comfortable"
  | "passportUnsure"
  | "bagsUnsure";

/** Steps and advice are codes; the UI shows them in the page's language. */
export type Step = { key: StepKey; minutes: number };
export type Verdict = "comfortable" | "workable" | "tight" | "risky";

export type LayoverResult = {
  layoverMinutes: number;
  steps: Step[];
  neededMinutes: number;
  spareMinutes: number;
  verdict: Verdict;
  advice: AdviceKey[];
};

/** "Not sure" counts as yes, to stay on the safe side. */
const counts = (v: YesNoUnsure) => v !== "no";

export function checkLayover(input: LayoverInput): LayoverResult {
  const i = sanitiseLayover(input);
  const a = ASSUMPTIONS;
  const steps: Step[] = [
    i.largeAirport
      ? { key: "deplaneLarge", minutes: a.deplaneLarge }
      : { key: "deplaneSmall", minutes: a.deplaneSmall },
  ];
  if (counts(i.terminalChange))
    steps.push({ key: "terminalChange", minutes: a.terminalChange });
  if (counts(i.passportControl))
    steps.push({ key: "passportControl", minutes: a.passportControl });
  if (counts(i.securityAgain))
    steps.push({ key: "securityAgain", minutes: a.securityAgain });
  if (counts(i.recheckBags))
    steps.push({ key: "recheckBags", minutes: a.recheckBags });
  for (const key of [
    "children",
    "busySeason",
    "longHaulFirst",
    "firstVisit",
  ] as const)
    if (i[key]) steps.push({ key, minutes: a.perExtraFactor });
  steps.push({ key: "boardingCloses", minutes: a.boardingCloses });
  if (i.separateTickets)
    steps.push({ key: "separateTickets", minutes: a.separateTicketsBuffer });

  const neededMinutes = steps.reduce((sum, s) => sum + s.minutes, 0);
  const layoverMinutes = i.hours * 60 + i.minutes;
  const spareMinutes = layoverMinutes - neededMinutes;
  const verdict: Verdict =
    spareMinutes >= 60
      ? "comfortable"
      : spareMinutes >= 30
        ? "workable"
        : spareMinutes >= 0
          ? "tight"
          : "risky";

  const advice: AdviceKey[] = [
    i.separateTickets ? "separateTickets" : "singleTicket",
    verdict,
  ];
  if (i.passportControl === "unsure") advice.push("passportUnsure");
  if (i.recheckBags === "unsure") advice.push("bagsUnsure");

  return {
    layoverMinutes,
    steps,
    neededMinutes,
    spareMinutes,
    verdict,
    advice,
  };
}

const YNU: YesNoUnsure[] = ["no", "yes", "unsure"];
const bool = (v: unknown, fallback: boolean) =>
  v === true || v === "1" || v === "true"
    ? true
    : v === false || v === "0" || v === "false"
      ? false
      : fallback;
const ynu = (v: unknown, fallback: YesNoUnsure) =>
  YNU.includes(v as YesNoUnsure) ? (v as YesNoUnsure) : fallback;
const int = (v: unknown, fallback: number, min: number, max: number) => {
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

export function sanitiseLayover(
  input: Partial<Record<keyof LayoverInput, unknown>>,
): LayoverInput {
  const d = DEFAULT_LAYOVER;
  return {
    hours: int(input.hours, d.hours, 0, 48),
    minutes: int(input.minutes, d.minutes, 0, 59),
    separateTickets: bool(input.separateTickets, d.separateTickets),
    largeAirport: bool(input.largeAirport, d.largeAirport),
    terminalChange: ynu(input.terminalChange, d.terminalChange),
    passportControl: ynu(input.passportControl, d.passportControl),
    securityAgain: ynu(input.securityAgain, d.securityAgain),
    recheckBags: ynu(input.recheckBags, d.recheckBags),
    children: bool(input.children, d.children),
    busySeason: bool(input.busySeason, d.busySeason),
    longHaulFirst: bool(input.longHaulFirst, d.longHaulFirst),
    firstVisit: bool(input.firstVisit, d.firstVisit),
  };
}

export function layoverToQuery(input: LayoverInput): string {
  const params = new URLSearchParams();
  for (const key of Object.keys(DEFAULT_LAYOVER) as (keyof LayoverInput)[]) {
    const value = input[key];
    if (value !== DEFAULT_LAYOVER[key])
      params.set(
        key,
        typeof value === "boolean" ? (value ? "1" : "0") : String(value),
      );
  }
  return params.toString();
}

export function layoverFromQuery(query: string): LayoverInput {
  const params = new URLSearchParams(query);
  const raw: Partial<Record<keyof LayoverInput, unknown>> = {};
  for (const key of Object.keys(DEFAULT_LAYOVER) as (keyof LayoverInput)[]) {
    const v = params.get(key);
    if (v !== null) raw[key] = v;
  }
  return sanitiseLayover(raw);
}
