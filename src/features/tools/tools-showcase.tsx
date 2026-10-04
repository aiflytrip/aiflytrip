import Link from "next/link";
import type { ReactNode } from "react";

import { QuickBudget } from "@/features/tools/budget/quick-budget";
import {
  DEFAULT_DAYS_INPUT,
  daysToQuery,
  planDays,
  STOP_LABELS,
  type DaysInput,
} from "@/features/tools/days/days";
import {
  checkLayover,
  DEFAULT_LAYOVER,
  layoverToQuery,
  type LayoverInput,
} from "@/features/tools/layover/layover";
import { ToolsSlider } from "@/features/tools/tools-slider";

/** Worked examples, calculated with the tools' own logic. */
const LAYOVER_EXAMPLE: LayoverInput = {
  ...DEFAULT_LAYOVER,
  hours: 1,
  minutes: 45,
  terminalChange: "yes",
  passportControl: "yes",
  securityAgain: "no",
};
const DAYS_EXAMPLE: DaysInput = {
  ...DEFAULT_DAYS_INPUT,
  stops: [
    { name: "Lisbon", type: "big-city", dayTrips: 1 },
    { name: "Porto", type: "big-city", dayTrips: 0 },
  ],
  available: 10,
};

const VERDICT_STYLE = {
  comfortable: "border-emerald-400/40 bg-emerald-400/10 text-emerald-200",
  workable: "border-sky-400/40 bg-sky-400/10 text-sky-200",
  tight: "border-amber-400/40 bg-amber-400/10 text-amber-200",
  risky: "border-red-400/40 bg-red-400/10 text-red-200",
} as const;

const mins = (m: number) => {
  const a = Math.abs(m);
  return a >= 60 ? `${Math.floor(a / 60)}h ${a % 60}m` : `${a}m`;
};

function Slide({
  eyebrow,
  title,
  body,
  points,
  href,
  cta,
  preview,
}: {
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  href: string;
  cta: string;
  preview: ReactNode;
}) {
  return (
    <article className="glass grid h-full gap-8 rounded-3xl p-6 sm:p-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center">
      <div className="flex flex-col gap-4">
        <p className="eyebrow">{eyebrow}</p>
        <h3 className="text-2xl leading-tight font-bold text-white sm:text-3xl">
          {title}
        </h3>
        <p className="leading-relaxed text-muted-foreground">{body}</p>
        <ul className="flex flex-col gap-2 text-sm text-foreground/90">
          {points.map((p) => (
            <li key={p} className="flex items-start gap-2.5">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-0.5 size-4 flex-none text-primary"
              >
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
              {p}
            </li>
          ))}
        </ul>
        <Link
          href={href}
          className="mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
        >
          {cta}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
      <div className="min-w-0">{preview}</div>
    </article>
  );
}

function LayoverPreview() {
  const r = checkLayover(LAYOVER_EXAMPLE);
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-black/20 p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          Example · {mins(r.layoverMinutes)} layover
        </p>
        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize ${VERDICT_STYLE[r.verdict]}`}
        >
          {r.verdict}
        </span>
      </div>
      <p className="mt-3 font-display text-3xl font-bold text-white">
        {r.spareMinutes >= 0
          ? `${mins(r.spareMinutes)} to spare`
          : `${mins(r.spareMinutes)} short`}
      </p>
      <ul className="mt-4 flex flex-col gap-1.5 text-sm">
        {r.steps.map((s) => (
          <li key={s.label} className="flex justify-between gap-3">
            <span className="text-foreground/85">{s.label}</span>
            <span className="font-mono text-muted-foreground">
              ~{s.minutes}m
            </span>
          </li>
        ))}
      </ul>
      <Link
        href={`/tools/layover-time-checker?${layoverToQuery(LAYOVER_EXAMPLE)}`}
        className="mt-4 inline-block text-sm font-semibold text-primary hover:text-primary-hover"
      >
        Open this example →
      </Link>
    </div>
  );
}

function DaysPreview() {
  const r = planDays(DAYS_EXAMPLE);
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-black/20 p-5">
      <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
        Example · Lisbon and Porto
      </p>
      <p className="mt-2 font-display text-4xl font-bold text-white">
        {r.totalDays} days
      </p>
      <p className="text-sm text-muted-foreground">
        {r.nights} nights · {r.groundDays} exploring + {r.travelDays} travel
      </p>
      <ul className="mt-4 flex flex-col gap-2 text-sm">
        {r.stops.map((s) => (
          <li
            key={s.name}
            className="flex items-baseline justify-between gap-3 rounded-xl bg-white/[0.04] px-3 py-2"
          >
            <span>
              <span className="font-semibold text-white">{s.name}</span>
              <span className="text-xs text-muted-foreground">
                {" "}
                · {STOP_LABELS[s.type]}
              </span>
            </span>
            <span className="font-mono text-primary">{s.days} days</span>
          </li>
        ))}
      </ul>
      <Link
        href={`/tools/how-many-days?${daysToQuery(DAYS_EXAMPLE)}`}
        className="mt-4 inline-block text-sm font-semibold text-primary hover:text-primary-hover"
      >
        Open this example →
      </Link>
    </div>
  );
}

export function ToolsShowcase() {
  return (
    <ToolsSlider
      slides={[
        {
          id: "budget",
          label: "Budget calculator",
          content: (
            <Slide
              eyebrow="Trip budget calculator"
              title="How much will your trip cost?"
              body="Add your flights, a nightly rate and daily spending to see your total in seconds. The full calculator breaks it down by food, transport, activities and extras."
              points={[
                "Total, per person and per day",
                "15 currencies and a safety buffer",
                "Share your budget with a link",
              ]}
              href="/tools/trip-budget-calculator"
              cta="Open the budget calculator"
              preview={<QuickBudget />}
            />
          ),
        },
        {
          id: "layover",
          label: "Layover checker",
          content: (
            <Slide
              eyebrow="Layover time checker"
              title="Is your connection long enough?"
              body="Tell us what happens between your flights, from changing terminals to passport control, and see whether your layover is comfortable, tight or risky."
              points={[
                "Step-by-step time estimate",
                "Warnings for separate tickets",
                "Practical advice for tight connections",
              ]}
              href="/tools/layover-time-checker"
              cta="Check your layover"
              preview={<LayoverPreview />}
            />
          ),
        },
        {
          id: "days",
          label: "How many days?",
          content: (
            <Slide
              eyebrow="Trip length planner"
              title="How many days do you need?"
              body="Add the places you want to visit and how you like to travel. See how many days to spend in each, including the travel days people often forget."
              points={[
                "Days per stop, with day trips",
                "Checks the plan against your time off",
                "Advice from our destination guides",
              ]}
              href="/tools/how-many-days"
              cta="Plan your trip length"
              preview={<DaysPreview />}
            />
          ),
        },
      ]}
    />
  );
}
