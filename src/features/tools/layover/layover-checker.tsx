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
  type Verdict,
  type YesNoUnsure,
} from "@/features/tools/layover/layover";
import { cn } from "@/lib/utils";

const VERDICTS: Record<Verdict, { label: string; tone: string; dot: string }> =
  {
    comfortable: {
      label: "Comfortable",
      tone: "border-emerald-400/40 bg-emerald-400/10 text-emerald-200",
      dot: "bg-emerald-400",
    },
    workable: {
      label: "Workable",
      tone: "border-sky-400/40 bg-sky-400/10 text-sky-200",
      dot: "bg-sky-400",
    },
    tight: {
      label: "Tight",
      tone: "border-amber-400/40 bg-amber-400/10 text-amber-200",
      dot: "bg-amber-400",
    },
    risky: {
      label: "Risky",
      tone: "border-red-400/40 bg-red-400/10 text-red-200",
      dot: "bg-red-400",
    },
  };

const fmt = (mins: number) => {
  const m = Math.abs(Math.round(mins));
  const h = Math.floor(m / 60);
  const r = m % 60;
  return h ? `${h}h ${r}m` : `${r}m`;
};

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

const YNU_OPTIONS: { value: YesNoUnsure; label: string }[] = [
  { value: "no", label: "No" },
  { value: "yes", label: "Yes" },
  { value: "unsure", label: "Not sure" },
];

const noopSubscribe = () => () => {};

/** Reads a shared check from the URL after hydration (see BudgetCalculator). */
export function LayoverChecker() {
  const query = useSyncExternalStore(
    noopSubscribe,
    () => window.location.search,
    () => "",
  );
  return <CheckerForm key={query} initial={layoverFromQuery(query)} />;
}

function CheckerForm({ initial }: { initial: LayoverInput }) {
  const id = useId();
  const [input, setInput] = useState<LayoverInput>(initial);
  const [copied, setCopied] = useState(false);
  const result = useMemo(() => checkLayover(input), [input]);
  const verdict = VERDICTS[result.verdict];

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
      window.prompt("Copy this link to share your layover check:", url);
    }
    track("layover_checker_shared");
  }

  const extras: {
    key: "children" | "busySeason" | "longHaulFirst" | "firstVisit";
    label: string;
  }[] = [
    { key: "children", label: "Travelling with children or reduced mobility" },
    { key: "busySeason", label: "Busy travel period (holidays, peak season)" },
    { key: "longHaulFirst", label: "First flight is long-haul" },
    { key: "firstVisit", label: "First time at this airport" },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
      <form
        className="glass flex flex-col gap-6 rounded-3xl p-5 sm:p-6"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Layover details"
      >
        <fieldset className="flex flex-col gap-3">
          <legend className="mb-1 text-sm font-semibold text-white">
            Your layover
          </legend>
          <div className="grid grid-cols-2 gap-4 sm:max-w-sm">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`${id}-h`}>Hours</Label>
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
              <Label htmlFor={`${id}-m`}>Minutes</Label>
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
          label="Are both flights on one ticket?"
          value={input.separateTickets ? "separate" : "one"}
          onChange={(v) => set({ separateTickets: v === "separate" })}
          options={[
            { value: "one", label: "One ticket" },
            { value: "separate", label: "Separate tickets" },
          ]}
        />
        <Choice
          name={`${id}-airport`}
          label="Connecting airport size"
          value={input.largeAirport ? "large" : "small"}
          onChange={(v) => set({ largeAirport: v === "large" })}
          options={[
            { value: "small", label: "Small or regional" },
            { value: "large", label: "Large hub" },
          ]}
        />
        <Choice
          name={`${id}-terminal`}
          label="Do you change terminals?"
          value={input.terminalChange}
          onChange={(v) => set({ terminalChange: v })}
          options={YNU_OPTIONS}
        />
        <Choice
          name={`${id}-passport`}
          label="Passport or immigration control?"
          value={input.passportControl}
          onChange={(v) => set({ passportControl: v })}
          options={YNU_OPTIONS}
        />
        <Choice
          name={`${id}-security`}
          label="Security screening again?"
          value={input.securityAgain}
          onChange={(v) => set({ securityAgain: v })}
          options={YNU_OPTIONS}
        />
        <Choice
          name={`${id}-bags`}
          label="Collect and re-check bags?"
          value={input.recheckBags}
          onChange={(v) => set({ recheckBags: v })}
          options={YNU_OPTIONS}
        />

        <fieldset className="flex flex-col gap-2">
          <legend className="mb-1 text-sm font-medium text-foreground">
            Anything else that slows you down?
          </legend>
          {extras.map((x) => (
            <label
              key={x.key}
              className="flex cursor-pointer items-center gap-3 text-sm text-foreground/90"
            >
              <input
                type="checkbox"
                checked={input[x.key]}
                onChange={(e) => set({ [x.key]: e.target.checked })}
                className="size-4 accent-sky-400"
              />
              {x.label}
            </label>
          ))}
        </fieldset>

        <Button
          type="button"
          variant="ghost"
          className="self-start"
          onClick={() => setInput(DEFAULT_LAYOVER)}
        >
          Reset
        </Button>
      </form>

      <section
        aria-labelledby={`${id}-result`}
        className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start"
      >
        <div className="glass relative overflow-hidden rounded-3xl p-6">
          <h2 id={`${id}-result`} className="eyebrow">
            Your connection
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
              {verdict.label}
            </p>
            <p className="mt-3 font-display text-3xl font-bold text-white">
              {result.spareMinutes >= 0
                ? `${fmt(result.spareMinutes)} to spare`
                : `${fmt(result.spareMinutes)} short`}
            </p>
            <p className="text-sm text-muted-foreground">
              Layover {fmt(result.layoverMinutes)} · rough time needed{" "}
              {fmt(result.neededMinutes)}
            </p>
          </div>

          <ul className="mt-5 flex flex-col gap-2 text-sm">
            {result.steps.map((s) => (
              <li
                key={s.label}
                className="flex items-start justify-between gap-3"
              >
                <span className="text-foreground/90">{s.label}</span>
                <span className="font-mono whitespace-nowrap text-muted-foreground">
                  ~{s.minutes}m
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
                {a}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap gap-2 print:hidden">
            <Button type="button" onClick={share}>
              {copied ? "Link copied" : "Copy share link"}
            </Button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Step times are rough planning assumptions, not official minimum
            connection times. Airlines and airports set those per airport; check
            with your airline for your exact flights.
          </p>
        </div>
      </section>
    </div>
  );
}
