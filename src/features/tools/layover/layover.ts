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

export type Step = { label: string; minutes: number };
export type Verdict = "comfortable" | "workable" | "tight" | "risky";

export type LayoverResult = {
  layoverMinutes: number;
  steps: Step[];
  neededMinutes: number;
  spareMinutes: number;
  verdict: Verdict;
  advice: string[];
};

/** "Not sure" counts as yes, to stay on the safe side. */
const counts = (v: YesNoUnsure) => v !== "no";

export function checkLayover(input: LayoverInput): LayoverResult {
  const i = sanitiseLayover(input);
  const a = ASSUMPTIONS;
  const steps: Step[] = [
    i.largeAirport
      ? {
          label: "Leave the plane and walk (large airport)",
          minutes: a.deplaneLarge,
        }
      : {
          label: "Leave the plane and walk (smaller airport)",
          minutes: a.deplaneSmall,
        },
  ];
  if (counts(i.terminalChange))
    steps.push({ label: "Change terminals", minutes: a.terminalChange });
  if (counts(i.passportControl))
    steps.push({
      label: "Passport or immigration control",
      minutes: a.passportControl,
    });
  if (counts(i.securityAgain))
    steps.push({ label: "Security screening again", minutes: a.securityAgain });
  if (counts(i.recheckBags))
    steps.push({ label: "Collect and re-check bags", minutes: a.recheckBags });
  const extras = [
    i.children && "Travelling with children or reduced mobility",
    i.busySeason && "Busy travel period",
    i.longHaulFirst && "Long-haul first flight (less predictable arrival)",
    i.firstVisit && "First time at this airport",
  ].filter((x): x is string => Boolean(x));
  for (const label of extras) steps.push({ label, minutes: a.perExtraFactor });
  steps.push({
    label: "Boarding usually closes before departure",
    minutes: a.boardingCloses,
  });
  if (i.separateTickets)
    steps.push({
      label: "Separate tickets: buffer for a late first flight",
      minutes: a.separateTicketsBuffer,
    });

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

  const advice: string[] = [];
  if (i.separateTickets) {
    advice.push(
      "On separate tickets, the second airline usually won't rebook you if you miss the flight. Leave a generous gap, or book a single ticket.",
    );
  } else {
    advice.push(
      "On a single ticket, the airline should only sell connections that meet its minimum connection time, and will normally rebook you if a delay on the first flight makes you miss the second.",
    );
  }
  if (verdict === "risky")
    advice.push(
      "This connection is shorter than the steps it involves. Consider a later onward flight, or confirm with the airline that the connection is protected.",
    );
  if (verdict === "tight")
    advice.push(
      "It could work if everything runs on time. Sit near the front, travel with cabin bags only and check your departure gate as soon as you land.",
    );
  if (verdict === "workable")
    advice.push(
      "A reasonable margin. Head straight to your next gate and avoid long stops on the way.",
    );
  if (verdict === "comfortable")
    advice.push(
      "Plenty of time. You should have room for a meal or a rest before boarding.",
    );
  if (i.passportControl === "unsure")
    advice.push(
      "Not sure about passport control? Check whether you enter a new country or area, such as the Schengen area, at the connecting airport.",
    );
  if (i.recheckBags === "unsure")
    advice.push(
      "Not sure about bags? Ask at check-in whether they're checked through to your final destination.",
    );

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
