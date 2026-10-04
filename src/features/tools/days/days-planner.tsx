"use client";

import Link from "next/link";
import {
  useEffect,
  useId,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { track } from "@/features/analytics/track";
import {
  DEFAULT_DAYS_INPUT,
  daysFromQuery,
  daysToQuery,
  MAX_STOPS,
  planDays,
  sanitiseDays,
  type DaysInput,
  type DaysWarning,
  type Pace,
  type StopNote,
  type StopPlan,
  type StopType,
} from "@/features/tools/days/days";
import { stopDisplayName } from "@/features/tools/format";
import { type Locale } from "@/i18n/config";
import { toolsMessages, type ToolsMessages } from "@/i18n/messages/tools";
import { cn } from "@/lib/utils";

/** A destination guide to suggest; `aliases` are its names in other languages. */
export type DestinationHint = {
  name: string;
  path: string;
  summary: string;
  aliases?: string[];
};

const FIT_TONES = {
  fits: "border-emerald-400/40 bg-emerald-400/10 text-emerald-200",
  spare: "border-sky-400/40 bg-sky-400/10 text-sky-200",
  packed: "border-amber-400/40 bg-amber-400/10 text-amber-200",
} as const;

const STOP_TYPES: StopType[] = ["big-city", "town", "countryside"];
const PACE_OPTIONS: Pace[] = ["relaxed", "moderate", "fast"];

type DaysText = ToolsMessages["days"];

function noteText(note: StopNote, t: DaysText): string {
  return note.kind === "dayTrips"
    ? t.notes.dayTrips(note.count)
    : t.notes[note.kind];
}

function warningText(w: DaysWarning, stops: StopPlan[], t: DaysText): string {
  if (w.kind !== "needMore") return t.warnings[w.kind];
  const drop = w.dropStop === undefined ? undefined : stops[w.dropStop];
  return drop
    ? t.warnings.needMoreDrop(w.days, stopDisplayName(drop, t))
    : t.warnings.needMore(w.days);
}

const noopSubscribe = () => () => {};

/** Reads a shared plan from the URL after hydration (see BudgetCalculator). */
export function DaysPlanner({
  destinations,
  locale = "en",
}: {
  destinations: DestinationHint[];
  locale?: Locale;
}) {
  const query = useSyncExternalStore(
    noopSubscribe,
    () => window.location.search,
    () => "",
  );
  return (
    <PlannerForm
      key={query}
      initial={query ? daysFromQuery(query) : DEFAULT_DAYS_INPUT}
      destinations={destinations}
      m={toolsMessages(locale)}
    />
  );
}

function PlannerForm({
  initial,
  destinations,
  m,
}: {
  initial: DaysInput;
  destinations: DestinationHint[];
  m: ToolsMessages;
}) {
  const id = useId();
  const t = m.days;
  const [input, setInput] = useState<DaysInput>(initial);
  const [copied, setCopied] = useState(false);
  const result = useMemo(() => planDays(input), [input]);

  useEffect(() => {
    if (input === initial) return;
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}?${daysToQuery(input)}`,
    );
  }, [input, initial]);

  const update = (patch: Partial<DaysInput>) =>
    setInput((prev) => sanitiseDays({ ...prev, ...patch }));
  const updateStop = (
    index: number,
    patch: Partial<DaysInput["stops"][number]>,
  ) =>
    update({
      stops: input.stops.map((s, i) => (i === index ? { ...s, ...patch } : s)),
    });

  const hints = input.stops
    .map((s) => {
      const typed = s.name.trim().toLowerCase();
      return destinations.find((d) =>
        [d.name, ...(d.aliases ?? [])].some((n) => n.toLowerCase() === typed),
      );
    })
    .filter(
      (d, i, all): d is DestinationHint => Boolean(d) && all.indexOf(d) === i,
    );

  async function share() {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt(t.sharePrompt, url);
    }
    track("days_planner_shared");
  }

  const aboutTrip = [
    ["longHaul", t.longHaul],
    ["longJourneys", t.longJourneys],
    ["slowerGroup", t.slowerGroup],
  ] as const;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
      <form
        className="glass flex flex-col gap-6 rounded-3xl p-5 sm:p-6"
        onSubmit={(e) => e.preventDefault()}
        aria-label={t.formLabel}
      >
        <datalist id={`${id}-places`}>
          {destinations.map((d) => (
            <option key={d.path} value={d.name} />
          ))}
        </datalist>

        <fieldset className="flex flex-col gap-3">
          <legend className="mb-1 text-sm font-semibold text-white">
            {t.yourStops}
          </legend>
          {input.stops.map((stop, index) => (
            <div
              key={index}
              className="grid gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-3 sm:grid-cols-[minmax(0,1fr)_minmax(9.5rem,1fr)_5rem_auto] sm:items-end"
            >
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={`${id}-name-${index}`}>
                  {t.place(index + 1)}
                </Label>
                <Input
                  id={`${id}-name-${index}`}
                  list={`${id}-places`}
                  placeholder={t.placePlaceholder}
                  value={stop.name}
                  maxLength={40}
                  onChange={(e) => updateStop(index, { name: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={`${id}-type-${index}`}>{t.type}</Label>
                <Select
                  id={`${id}-type-${index}`}
                  value={stop.type}
                  onChange={(e) =>
                    updateStop(index, { type: e.target.value as StopType })
                  }
                >
                  {STOP_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {t.typeOptions[type]}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={`${id}-trips-${index}`}>{t.dayTrips}</Label>
                <Select
                  id={`${id}-trips-${index}`}
                  value={stop.dayTrips}
                  onChange={(e) =>
                    updateStop(index, { dayTrips: Number(e.target.value) })
                  }
                >
                  {[0, 1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </Select>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={input.stops.length === 1}
                onClick={() =>
                  update({ stops: input.stops.filter((_, i) => i !== index) })
                }
                aria-label={t.removeLabel(index + 1)}
              >
                {t.remove}
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="secondary"
            className="self-start"
            disabled={input.stops.length >= MAX_STOPS}
            onClick={() =>
              update({
                stops: [
                  ...input.stops,
                  { name: "", type: "town", dayTrips: 0 },
                ],
              })
            }
          >
            {t.addStop}
          </Button>
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <legend className="mb-1 text-sm font-medium text-foreground">
            {t.pace}
          </legend>
          <div className="flex flex-wrap gap-2">
            {PACE_OPTIONS.map((p) => (
              <label
                key={p}
                className={cn(
                  "cursor-pointer rounded-full border px-3.5 py-2 text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring",
                  input.pace === p
                    ? "border-primary/60 bg-primary/15 text-white"
                    : "border-white/10 bg-white/[0.04] text-muted-foreground hover:border-white/25",
                )}
              >
                <input
                  type="radio"
                  name={`${id}-pace`}
                  value={p}
                  checked={input.pace === p}
                  onChange={() => update({ pace: p })}
                  className="sr-only"
                />
                {t.paces[p]}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <legend className="mb-1 text-sm font-medium text-foreground">
            {t.aboutTrip}
          </legend>
          {aboutTrip.map(([key, label]) => (
            <label
              key={key}
              className="flex cursor-pointer items-center gap-3 text-sm text-foreground/90"
            >
              <input
                type="checkbox"
                checked={input[key]}
                onChange={(e) => update({ [key]: e.target.checked })}
                className="size-4 accent-sky-400"
              />
              {label}
            </label>
          ))}
        </fieldset>

        <div className="flex flex-col gap-1.5 sm:max-w-xs">
          <Label htmlFor={`${id}-available`}>{t.available}</Label>
          <Input
            id={`${id}-available`}
            type="number"
            inputMode="numeric"
            min={0}
            max={120}
            placeholder={t.availablePlaceholder}
            value={input.available || ""}
            onChange={(e) =>
              update({
                available: e.target.value === "" ? 0 : Number(e.target.value),
              })
            }
          />
          <p className="text-xs text-muted-foreground">{t.availableHint}</p>
        </div>

        <Button
          type="button"
          variant="ghost"
          className="self-start"
          onClick={() => setInput(DEFAULT_DAYS_INPUT)}
        >
          {m.common.reset}
        </Button>
      </form>

      <section
        aria-labelledby={`${id}-result`}
        className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start"
      >
        <div className="glass rounded-3xl p-6">
          <h2 id={`${id}-result`} className="eyebrow">
            {t.recommended}
          </h2>
          <div aria-live="polite">
            <p className="mt-2 font-display text-5xl font-bold text-white">
              {t.totalDays(result.totalDays)}
            </p>
            <p className="text-sm text-muted-foreground">
              {t.summary(result.nights, result.groundDays, result.travelDays)}
            </p>
            {result.fit ? (
              <p
                className={cn(
                  "mt-3 inline-flex rounded-full border px-3.5 py-1.5 text-sm font-semibold",
                  FIT_TONES[result.fit.status],
                )}
              >
                {t.fit[result.fit.status]}
                {result.fit.status === "spare"
                  ? t.extraDays(result.fit.difference)
                  : ""}
              </p>
            ) : null}
          </div>

          <ul className="mt-5 flex flex-col gap-3 text-sm">
            {result.stops.map((s) => (
              <li key={s.index} className="rounded-2xl bg-white/[0.04] p-3">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-semibold text-white">
                    {stopDisplayName(s, t)}
                  </span>
                  <span className="font-mono text-primary">
                    {t.stopDays(s.days)}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {t.typeLabels[s.type]}
                  {s.notes.length
                    ? ` · ${s.notes.map((n) => noteText(n, t)).join(", ")}`
                    : ""}
                </p>
              </li>
            ))}
          </ul>

          {result.warnings.length ? (
            <ul className="mt-4 flex flex-col gap-2 text-sm">
              {result.warnings.map((w) => (
                <li
                  key={w.kind}
                  className="rounded-xl border border-amber-400/30 bg-amber-400/[0.07] px-3 py-2 text-amber-100"
                >
                  {warningText(w, result.stops, t)}
                </li>
              ))}
            </ul>
          ) : null}

          {hints.length ? (
            <div className="mt-5 flex flex-col gap-2 border-t border-white/[0.07] pt-4 text-sm">
              <p className="font-semibold text-white">{t.fromGuides}</p>
              {hints.map((h) => (
                <p key={h.path} className="text-muted-foreground">
                  <Link
                    href={h.path}
                    hrefLang="en"
                    className="font-semibold text-primary hover:underline"
                  >
                    {h.name}
                  </Link>
                  : <span lang="en">{h.summary}</span>
                </p>
              ))}
            </div>
          ) : null}

          <div className="mt-5 flex flex-wrap gap-2 print:hidden">
            <Button type="button" onClick={share}>
              {copied ? m.common.copied : m.common.copyLink}
            </Button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">{t.footnote}</p>
        </div>
      </section>
    </div>
  );
}
