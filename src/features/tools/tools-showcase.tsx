import Link from "next/link";
import type { ReactNode } from "react";

import { QuickBudget } from "@/features/tools/budget/quick-budget";
import {
  DEFAULT_DAYS_INPUT,
  daysToQuery,
  planDays,
  type DaysInput,
} from "@/features/tools/days/days";
import {
  checkLayover,
  DEFAULT_LAYOVER,
  layoverToQuery,
  type LayoverInput,
} from "@/features/tools/layover/layover";
import {
  formatMinutes,
  stopDisplayName,
  VERDICT_STYLES,
} from "@/features/tools/format";
import { ToolsSlider } from "@/features/tools/tools-slider";
import { type Locale } from "@/i18n/config";
import { toolsMessages } from "@/i18n/messages/tools";
import { HOME_COPY, type HomeCopy } from "@/i18n/pages/home";
import { route } from "@/i18n/routes";

/** Worked examples, calculated with the tools' own logic. */
const LAYOVER_EXAMPLE: LayoverInput = {
  ...DEFAULT_LAYOVER,
  hours: 1,
  minutes: 45,
  terminalChange: "yes",
  passportControl: "yes",
  securityAgain: "no",
};

function daysExample(stops: [string, string]): DaysInput {
  return {
    ...DEFAULT_DAYS_INPUT,
    stops: [
      { name: stops[0], type: "big-city", dayTrips: 1 },
      { name: stops[1], type: "big-city", dayTrips: 0 },
    ],
    available: 10,
  };
}

type SlideCopy = HomeCopy["tools"]["slides"]["budget"];

function Slide({
  copy,
  href,
  preview,
}: {
  copy: SlideCopy;
  href: string;
  preview: ReactNode;
}) {
  return (
    <article className="glass grid h-full gap-8 rounded-3xl p-6 sm:p-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center">
      <div className="flex flex-col gap-4">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h3 className="text-2xl leading-tight font-bold text-white sm:text-3xl">
          {copy.title}
        </h3>
        <p className="leading-relaxed text-muted-foreground">{copy.body}</p>
        <ul className="flex flex-col gap-2 text-sm text-foreground/90">
          {copy.points.map((p) => (
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
          {copy.cta}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
      <div className="min-w-0">{preview}</div>
    </article>
  );
}

function LayoverPreview({ locale }: { locale: Locale }) {
  const m = toolsMessages(locale);
  const copy = HOME_COPY[locale].tools;
  const r = checkLayover(LAYOVER_EXAMPLE);
  const fmt = (mins: number) => formatMinutes(mins, m);
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-black/20 p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          {copy.layoverExample(fmt(r.layoverMinutes))}
        </p>
        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold ${VERDICT_STYLES[r.verdict].tone}`}
        >
          {m.layover.verdicts[r.verdict]}
        </span>
      </div>
      <p className="mt-3 font-display text-3xl font-bold text-white">
        {r.spareMinutes >= 0
          ? m.layover.toSpare(fmt(r.spareMinutes))
          : m.layover.short(fmt(r.spareMinutes))}
      </p>
      <ul className="mt-4 flex flex-col gap-1.5 text-sm">
        {r.steps.map((s) => (
          <li key={s.key} className="flex justify-between gap-3">
            <span className="text-foreground/85">{m.layover.steps[s.key]}</span>
            <span className="font-mono whitespace-nowrap text-muted-foreground">
              ~{fmt(s.minutes)}
            </span>
          </li>
        ))}
      </ul>
      <Link
        href={`${route("layover", locale)}?${layoverToQuery(LAYOVER_EXAMPLE)}`}
        className="mt-4 inline-block text-sm font-semibold text-primary hover:text-primary-hover"
      >
        {copy.openExample}
      </Link>
    </div>
  );
}

function DaysPreview({ locale }: { locale: Locale }) {
  const t = toolsMessages(locale).days;
  const copy = HOME_COPY[locale].tools;
  const example = daysExample(copy.daysExampleStops);
  const r = planDays(example);
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-black/20 p-5">
      <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
        {copy.daysExample}
      </p>
      <p className="mt-2 font-display text-4xl font-bold text-white">
        {t.totalDays(r.totalDays)}
      </p>
      <p className="text-sm text-muted-foreground">
        {t.summary(r.nights, r.groundDays, r.travelDays)}
      </p>
      <ul className="mt-4 flex flex-col gap-2 text-sm">
        {r.stops.map((s) => (
          <li
            key={s.index}
            className="flex items-baseline justify-between gap-3 rounded-xl bg-white/[0.04] px-3 py-2"
          >
            <span>
              <span className="font-semibold text-white">
                {stopDisplayName(s, t)}
              </span>
              <span className="text-xs text-muted-foreground">
                {" "}
                · {t.typeLabels[s.type]}
              </span>
            </span>
            <span className="font-mono text-primary">{t.stopDays(s.days)}</span>
          </li>
        ))}
      </ul>
      <Link
        href={`${route("days", locale)}?${daysToQuery(example)}`}
        className="mt-4 inline-block text-sm font-semibold text-primary hover:text-primary-hover"
      >
        {copy.openExample}
      </Link>
    </div>
  );
}

export function ToolsShowcase({ locale = "en" }: { locale?: Locale }) {
  const slides = HOME_COPY[locale].tools.slides;
  return (
    <ToolsSlider
      locale={locale}
      slides={[
        {
          id: "budget",
          label: slides.budget.label,
          content: (
            <Slide
              copy={slides.budget}
              href={route("budget", locale)}
              preview={
                <QuickBudget
                  locale={locale}
                  defaultCurrency={locale === "en" ? "GBP" : "EUR"}
                />
              }
            />
          ),
        },
        {
          id: "layover",
          label: slides.layover.label,
          content: (
            <Slide
              copy={slides.layover}
              href={route("layover", locale)}
              preview={<LayoverPreview locale={locale} />}
            />
          ),
        },
        {
          id: "days",
          label: slides.days.label,
          content: (
            <Slide
              copy={slides.days}
              href={route("days", locale)}
              preview={<DaysPreview locale={locale} />}
            />
          ),
        },
      ]}
    />
  );
}
