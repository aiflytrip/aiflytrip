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
import { Select } from "@/components/ui/select";
import { track } from "@/features/analytics/track";
import {
  BUFFERS,
  calculateBudget,
  CURRENCIES,
  DEFAULT_INPUT,
  fromQuery,
  sanitise,
  toQuery,
  type BudgetInput,
  type BudgetLine,
} from "@/features/tools/budget/budget";
import { formatMoney } from "@/features/tools/format";
import { type Locale } from "@/i18n/config";
import { toolsMessages, type ToolsMessages } from "@/i18n/messages/tools";
import { cn } from "@/lib/utils";

const COLORS: Record<BudgetLine["key"], string> = {
  flights: "bg-sky-400",
  accommodation: "bg-violet-400",
  food: "bg-amber-300",
  transport: "bg-pink-400",
  activities: "bg-emerald-400",
  extras: "bg-slate-400",
  buffer: "bg-slate-600",
};

type NumberKey = Exclude<keyof BudgetInput, "currency">;

function NumberField({
  id,
  label,
  hint,
  value,
  onChange,
  step = 1,
  min = 0,
  max,
  prefix,
}: {
  id: string;
  label: string;
  hint?: string;
  value: number;
  onChange: (value: string) => void;
  step?: number;
  min?: number;
  max?: number;
  prefix?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        {prefix ? (
          <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 font-mono text-xs text-muted-foreground">
            {prefix}
          </span>
        ) : null}
        <Input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={value === 0 ? "" : value}
          placeholder="0"
          onChange={(e) => onChange(e.target.value)}
          className={prefix ? "pl-12" : undefined}
          aria-describedby={hint ? `${id}-hint` : undefined}
        />
      </div>
      {hint ? (
        <p id={`${id}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Interactive trip budget calculator. All amounts are the user's own
 * estimates; inputs are mirrored into the URL so a budget can be shared.
 */
const noopSubscribe = () => () => {};

export function BudgetCalculator({
  locale = "en",
  defaultCurrency = DEFAULT_INPUT.currency,
}: {
  locale?: Locale;
  /** Used when the link doesn't set a currency (e.g. EUR on /es and /fr). */
  defaultCurrency?: BudgetInput["currency"];
}) {
  // The page is statically rendered, so the shared query is only known in
  // the browser. Keying the form on it remounts once after hydration with
  // the shared values, without setting state inside an effect.
  const query = useSyncExternalStore(
    noopSubscribe,
    () => window.location.search,
    () => "",
  );
  const shared = fromQuery(query);
  const initial = new URLSearchParams(query).has("currency")
    ? shared
    : { ...shared, currency: defaultCurrency };
  return (
    <CalculatorForm
      key={query}
      initial={initial}
      locale={locale}
      m={toolsMessages(locale)}
    />
  );
}

function CalculatorForm({
  initial,
  locale,
  m,
}: {
  initial: BudgetInput;
  locale: Locale;
  m: ToolsMessages;
}) {
  const id = useId();
  const t = m.budget;
  const money = (amount: number, currency: string) =>
    formatMoney(amount, currency, locale);
  const [input, setInput] = useState<BudgetInput>(initial);
  const [copied, setCopied] = useState(false);

  // Keep the URL in sync so the current budget can be shared or bookmarked.
  // Skipped until the user changes something, so a shared link isn't
  // overwritten before it has been read.
  useEffect(() => {
    if (input === initial) return;
    const query = toQuery(input);
    const url = `${window.location.pathname}${query ? `?${query}` : ""}`;
    window.history.replaceState(null, "", url);
  }, [input, initial]);

  const result = useMemo(() => calculateBudget(input), [input]);
  const setNumber = (key: NumberKey) => (value: string) =>
    setInput((prev) => sanitise({ ...prev, [key]: value === "" ? 0 : value }));
  const cur = input.currency;

  async function share() {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt(t.sharePrompt, url);
    }
    track("budget_calculator_shared");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
      <form
        className="glass flex flex-col gap-6 rounded-3xl p-5 sm:p-6"
        onSubmit={(e) => e.preventDefault()}
        aria-label={t.formLabel}
      >
        <fieldset className="grid gap-4 sm:grid-cols-3">
          <legend className="mb-3 text-sm font-semibold text-white">
            {t.yourTrip}
          </legend>
          <NumberField
            id={`${id}-travellers`}
            label={t.travellers}
            value={input.travellers}
            onChange={setNumber("travellers")}
            min={1}
            max={20}
          />
          <NumberField
            id={`${id}-nights`}
            label={t.nights}
            value={input.nights}
            onChange={setNumber("nights")}
            min={1}
            max={90}
          />
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`${id}-currency`}>{t.currency}</Label>
            <Select
              id={`${id}-currency`}
              value={input.currency}
              onChange={(e) =>
                setInput((prev) =>
                  sanitise({ ...prev, currency: e.target.value }),
                )
              }
            >
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </div>
        </fieldset>

        <fieldset className="grid gap-4 sm:grid-cols-2">
          <legend className="mb-3 text-sm font-semibold text-white">
            {t.gettingThere}
          </legend>
          <NumberField
            id={`${id}-flights`}
            label={t.flightsPerPerson}
            hint={t.flightsHint}
            value={input.flightsPerPerson}
            onChange={setNumber("flightsPerPerson")}
            prefix={cur}
            step={10}
          />
          <NumberField
            id={`${id}-accommodation`}
            label={t.accommodation}
            hint={t.accommodationHint}
            value={input.accommodationPerNight}
            onChange={setNumber("accommodationPerNight")}
            prefix={cur}
            step={5}
          />
        </fieldset>

        <fieldset className="grid gap-4 sm:grid-cols-3">
          <legend className="mb-3 text-sm font-semibold text-white">
            {t.dailySpending}
          </legend>
          <NumberField
            id={`${id}-food`}
            label={t.food}
            value={input.foodPerDay}
            onChange={setNumber("foodPerDay")}
            prefix={cur}
          />
          <NumberField
            id={`${id}-transport`}
            label={t.transport}
            value={input.transportPerDay}
            onChange={setNumber("transportPerDay")}
            prefix={cur}
          />
          <NumberField
            id={`${id}-activities`}
            label={t.activities}
            value={input.activitiesPerDay}
            onChange={setNumber("activitiesPerDay")}
            prefix={cur}
          />
        </fieldset>

        <fieldset className="grid gap-4 sm:grid-cols-2">
          <legend className="mb-3 text-sm font-semibold text-white">
            {t.extrasAndBuffer}
          </legend>
          <NumberField
            id={`${id}-extras`}
            label={t.extras}
            hint={t.extrasHint}
            value={input.extras}
            onChange={setNumber("extras")}
            prefix={cur}
            step={10}
          />
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`${id}-buffer`}>{t.buffer}</Label>
            <Select
              id={`${id}-buffer`}
              value={input.bufferPercent}
              onChange={(e) =>
                setInput((prev) =>
                  sanitise({ ...prev, bufferPercent: e.target.value }),
                )
              }
            >
              {BUFFERS.map((b) => (
                <option key={b} value={b}>
                  {b === 0 ? t.noBuffer : t.bufferOption(b)}
                </option>
              ))}
            </Select>
          </div>
        </fieldset>

        <Button
          type="button"
          variant="ghost"
          className="self-start"
          onClick={() => setInput(DEFAULT_INPUT)}
        >
          {m.common.reset}
        </Button>
      </form>

      <section
        aria-labelledby={`${id}-results`}
        className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start"
      >
        <div className="glass relative overflow-hidden rounded-3xl p-6">
          <div
            aria-hidden="true"
            className="orb -top-24 -right-24 size-[320px] bg-[radial-gradient(circle,rgb(56_189_248/0.22),transparent_65%)]"
          />
          <h2 id={`${id}-results`} className="eyebrow relative">
            {t.estimated}
          </h2>
          <p
            className="relative mt-2 font-display text-5xl font-bold text-white tabular-nums"
            aria-live="polite"
          >
            {money(result.total, cur)}
          </p>
          <dl className="relative mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl bg-white/[0.04] p-3">
              <dt className="text-muted-foreground">{t.perPerson}</dt>
              <dd className="font-semibold text-white tabular-nums">
                {money(result.perPerson, cur)}
              </dd>
            </div>
            <div className="rounded-2xl bg-white/[0.04] p-3">
              <dt className="text-muted-foreground">{t.perDay(result.days)}</dt>
              <dd className="font-semibold text-white tabular-nums">
                {money(result.perDay, cur)}
              </dd>
            </div>
          </dl>

          {result.total > 0 ? (
            <div
              aria-hidden="true"
              className="relative mt-5 flex h-3 overflow-hidden rounded-full bg-white/[0.06]"
            >
              {result.lines.map((line) => (
                <span
                  key={line.key}
                  className={COLORS[line.key]}
                  style={{ width: `${(line.amount / result.total) * 100}%` }}
                />
              ))}
            </div>
          ) : null}

          <ul className="relative mt-4 flex flex-col gap-2 text-sm">
            {result.lines.map((line) => (
              <li
                key={line.key}
                className="flex items-center justify-between gap-3"
              >
                <span className="flex items-center gap-2 text-foreground/90">
                  <span
                    aria-hidden="true"
                    className={cn("size-2.5 rounded-full", COLORS[line.key])}
                  />
                  {line.key === "buffer"
                    ? t.bufferLine(input.bufferPercent)
                    : t.lines[line.key]}
                </span>
                <span className="font-semibold text-white tabular-nums">
                  {money(line.amount, cur)}
                </span>
              </li>
            ))}
          </ul>

          <div className="relative mt-5 flex flex-wrap gap-2 print:hidden">
            <Button type="button" onClick={share}>
              {copied ? m.common.copied : m.common.copyLink}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => window.print()}
            >
              {t.print}
            </Button>
          </div>
          <p className="relative mt-3 text-xs text-muted-foreground">
            {t.footnote(result.days, input.nights)}
          </p>
        </div>
      </section>
    </div>
  );
}
