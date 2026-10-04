"use client";

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
import { track } from "@/features/analytics/track";
import {
  checkLayover,
  DEFAULT_LAYOVER,
  layoverFromQuery,
  layoverToQuery,
  sanitiseLayover,
  type LayoverInput,
  type YesNoUnsure,
} from "@/features/tools/layover/layover";
import { formatMinutes, VERDICT_STYLES } from "@/features/tools/format";
import { type Locale } from "@/i18n/config";
import { toolsMessages, type ToolsMessages } from "@/i18n/messages/tools";
import { cn } from "@/lib/utils";

function Choice({
  name,
  label,
  value,
  onChange,
  options,
}: {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-1 text-sm font-medium text-foreground">
        {label}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label
            key={o.value}
            className={cn(
              "cursor-pointer rounded-full border px-3.5 py-2 text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring",
              value === o.value
                ? "border-primary/60 bg-primary/15 text-white"
                : "border-white/10 bg-white/[0.04] text-muted-foreground hover:border-white/25",
            )}
          >
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
              className="sr-only"
            />
            {o.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

const noopSubscribe = () => () => {};

/** Reads a shared check from the URL after hydration (see BudgetCalculator). */
export function LayoverChecker({ locale = "en" }: { locale?: Locale }) {
  const query = useSyncExternalStore(
    noopSubscribe,
    () => window.location.search,
    () => "",
  );
  return (
    <CheckerForm
      key={query}
      initial={layoverFromQuery(query)}
      m={toolsMessages(locale)}
    />
  );
}

function CheckerForm({
  initial,
  m,
}: {
  initial: LayoverInput;
  m: ToolsMessages;
}) {
  const id = useId();
  const t = m.layover;
  const [input, setInput] = useState<LayoverInput>(initial);
  const [copied, setCopied] = useState(false);
  const result = useMemo(() => checkLayover(input), [input]);
  const verdict = VERDICT_STYLES[result.verdict];
  const fmt = (mins: number) => formatMinutes(mins, m);
  const ynu: { value: YesNoUnsure; label: string }[] = [
    { value: "no", label: m.common.no },
    { value: "yes", label: m.common.yes },
    { value: "unsure", label: m.common.unsure },
  ];

  useEffect(() => {
    if (input === initial) return;
    const q = layoverToQuery(input);
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${q ? `?${q}` : ""}`,
    );
  }, [input, initial]);

  const set = (patch: Partial<Record<keyof LayoverInput, unknown>>) =>
    setInput((prev) => sanitiseLayover({ ...prev, ...patch }));

  async function share() {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt(t.sharePrompt, url);
    }
    track("layover_checker_shared");
  }

  const extras = [
    "children",
    "busySeason",
    "longHaulFirst",
    "firstVisit",
  ] as const;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
      <form
        className="glass flex flex-col gap-6 rounded-3xl p-5 sm:p-6"
        onSubmit={(e) => e.preventDefault()}
        aria-label={t.formLabel}
      >
        <fieldset className="flex flex-col gap-3">
          <legend className="mb-1 text-sm font-semibold text-white">
            {t.yourLayover}
          </legend>
          <div className="grid grid-cols-2 gap-4 sm:max-w-sm">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`${id}-h`}>{t.hours}</Label>
              <Input
                id={`${id}-h`}
                type="number"
                inputMode="numeric"
                min={0}
                max={48}
                value={input.hours}
                onChange={(e) => set({ hours: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`${id}-m`}>{t.minutes}</Label>
              <Input
                id={`${id}-m`}
                type="number"
                inputMode="numeric"
                min={0}
                max={59}
                step={5}
                value={input.minutes}
                onChange={(e) => set({ minutes: e.target.value })}
              />
            </div>
          </div>
        </fieldset>

        <Choice
          name={`${id}-tickets`}
          label={t.ticketQuestion}
          value={input.separateTickets ? "separate" : "one"}
          onChange={(v) => set({ separateTickets: v === "separate" })}
          options={[
            { value: "one", label: t.oneTicket },
            { value: "separate", label: t.separateTickets },
          ]}
        />
        <Choice
          name={`${id}-airport`}
          label={t.airportSize}
          value={input.largeAirport ? "large" : "small"}
          onChange={(v) => set({ largeAirport: v === "large" })}
          options={[
            { value: "small", label: t.smallAirport },
            { value: "large", label: t.largeAirport },
          ]}
        />
        <Choice
          name={`${id}-terminal`}
          label={t.terminalQuestion}
          value={input.terminalChange}
          onChange={(v) => set({ terminalChange: v })}
          options={ynu}
        />
        <Choice
          name={`${id}-passport`}
          label={t.passportQuestion}
          value={input.passportControl}
          onChange={(v) => set({ passportControl: v })}
          options={ynu}
        />
        <Choice
          name={`${id}-security`}
          label={t.securityQuestion}
          value={input.securityAgain}
          onChange={(v) => set({ securityAgain: v })}
          options={ynu}
        />
        <Choice
          name={`${id}-bags`}
          label={t.bagsQuestion}
          value={input.recheckBags}
          onChange={(v) => set({ recheckBags: v })}
          options={ynu}
        />

        <fieldset className="flex flex-col gap-2">
          <legend className="mb-1 text-sm font-medium text-foreground">
            {t.extrasQuestion}
          </legend>
          {extras.map((key) => (
            <label
              key={key}
              className="flex cursor-pointer items-center gap-3 text-sm text-foreground/90"
            >
              <input
                type="checkbox"
                checked={input[key]}
                onChange={(e) => set({ [key]: e.target.checked })}
                className="size-4 accent-sky-400"
              />
              {t.extras[key]}
            </label>
          ))}
        </fieldset>

        <Button
          type="button"
          variant="ghost"
          className="self-start"
          onClick={() => setInput(DEFAULT_LAYOVER)}
        >
          {m.common.reset}
        </Button>
      </form>

      <section
        aria-labelledby={`${id}-result`}
        className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start"
      >
        <div className="glass relative overflow-hidden rounded-3xl p-6">
          <h2 id={`${id}-result`} className="eyebrow">
            {t.yourConnection}
          </h2>
          <div aria-live="polite">
            <p
              className={cn(
                "mt-3 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-semibold",
                verdict.tone,
              )}
            >
              <span
                aria-hidden="true"
                className={cn("size-2.5 rounded-full", verdict.dot)}
              />
              {t.verdicts[result.verdict]}
            </p>
            <p className="mt-3 font-display text-3xl font-bold text-white">
              {result.spareMinutes >= 0
                ? t.toSpare(fmt(result.spareMinutes))
                : t.short(fmt(result.spareMinutes))}
            </p>
            <p className="text-sm text-muted-foreground">
              {t.summary(fmt(result.layoverMinutes), fmt(result.neededMinutes))}
            </p>
          </div>

          <ul className="mt-5 flex flex-col gap-2 text-sm">
            {result.steps.map((s) => (
              <li
                key={s.key}
                className="flex items-start justify-between gap-3"
              >
                <span className="text-foreground/90">{t.steps[s.key]}</span>
                <span className="font-mono whitespace-nowrap text-muted-foreground">
                  ~{fmt(s.minutes)}
                </span>
              </li>
            ))}
          </ul>

          <ul className="mt-5 flex flex-col gap-2 border-t border-white/[0.07] pt-4 text-sm">
            {result.advice.map((a) => (
              <li
                key={a}
                className="flex items-start gap-2.5 text-foreground/90"
              >
                <span
                  aria-hidden="true"
                  className="mt-1.5 size-1.5 flex-none rounded-full bg-primary"
                />
                {t.advice[a]}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap gap-2 print:hidden">
            <Button type="button" onClick={share}>
              {copied ? m.common.copied : m.common.copyLink}
            </Button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">{t.disclaimer}</p>
        </div>
      </section>
    </div>
  );
}
