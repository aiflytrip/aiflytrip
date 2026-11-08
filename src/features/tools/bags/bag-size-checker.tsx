"use client";

import { useId, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  bagSizeFromQuery,
  bagSizeToQuery,
  checkBagSize,
  convertBagSize,
  DEFAULT_BAG_SIZE,
  sanitiseBagSize,
  SIZE_PRESETS,
  type BagSizeInput,
  type LimitMode,
  type SizeVerdict,
  type UnitSystem,
} from "@/features/tools/bags/bag-size";
import {
  BAG_SIZE_TEXT,
  type BagSizeLocale,
  type BagSizeText,
} from "@/features/tools/bags/bag-size-text";
import {
  Choice,
  ShareButton,
  useQueryString,
  useSyncQuery,
} from "@/features/tools/controls";
import { VERDICT_STYLES } from "@/features/tools/format";
import { cn } from "@/lib/utils";

const VERDICT_STYLE: Record<SizeVerdict, keyof typeof VERDICT_STYLES> = {
  fits: "comfortable",
  tight: "tight",
  "too-big": "risky",
  incomplete: "workable",
};

/** In English or Spanish. Reads a shared check from the URL after hydration. */
export function BagSizeChecker({ locale = "en" }: { locale?: BagSizeLocale }) {
  const query = useQueryString();
  return (
    <CheckerForm
      key={query}
      initial={bagSizeFromQuery(query)}
      t={BAG_SIZE_TEXT[locale]}
    />
  );
}

function NumberField({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type="number"
        inputMode="decimal"
        min={0}
        step={0.5}
        value={value || ""}
        placeholder="0"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function CheckerForm({
  initial,
  t,
}: {
  initial: BagSizeInput;
  t: BagSizeText;
}) {
  const id = useId();
  const [input, setInput] = useState<BagSizeInput>(initial);
  const result = useMemo(() => checkBagSize(input), [input]);
  useSyncQuery(bagSizeToQuery(input), input !== initial);

  const set = (patch: Partial<Record<keyof BagSizeInput, unknown>>) =>
    setInput((prev) => sanitiseBagSize({ ...prev, ...patch }));
  const len = input.unit === "metric" ? "cm" : "in";
  const wt = input.unit === "metric" ? "kg" : "lb";
  const fmt = (n: number, unit: string) => `${Math.abs(n)} ${unit}`;
  const style = VERDICT_STYLES[VERDICT_STYLE[result.verdict]];

  const advice: string[] = [];
  if (result.needsTurning) advice.push(t.advice.turn);
  if (result.verdict === "too-big") advice.push(t.advice.tooBig);
  if (result.verdict === "tight") advice.push(t.advice.tight);
  if (result.weightVerdict === "over") advice.push(t.advice.overWeight);
  advice.push(t.advice.exactFare);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
      <form
        className="glass flex flex-col gap-6 rounded-3xl p-5 sm:p-6"
        onSubmit={(e) => e.preventDefault()}
        aria-label={t.formLabel}
      >
        <Choice<UnitSystem>
          name={`${id}-unit`}
          label={t.units}
          value={input.unit}
          onChange={(unit) => setInput((prev) => convertBagSize(prev, unit))}
          options={[
            { value: "metric", label: t.unitMetric },
            { value: "imperial", label: t.unitImperial },
          ]}
        />

        <fieldset className="flex flex-col gap-3">
          <legend className="mb-1 text-sm font-semibold text-white">
            {t.yourBag(len)}
          </legend>
          <div className="grid grid-cols-3 gap-3">
            <NumberField
              id={`${id}-bl`}
              label={t.length}
              value={input.bagL}
              onChange={(v) => set({ bagL: v })}
            />
            <NumberField
              id={`${id}-bw`}
              label={t.width}
              value={input.bagW}
              onChange={(v) => set({ bagW: v })}
            />
            <NumberField
              id={`${id}-bh`}
              label={t.depth}
              value={input.bagH}
              onChange={(v) => set({ bagH: v })}
            />
          </div>
          <p className="text-xs text-muted-foreground">{t.includeExtras}</p>
        </fieldset>

        <fieldset className="flex flex-col gap-3">
          <legend className="mb-1 text-sm font-semibold text-white">
            {t.allowance}
          </legend>
          <Choice<LimitMode>
            name={`${id}-mode`}
            label={t.limitGivenAs}
            value={input.mode}
            onChange={(mode) => set({ mode })}
            options={[
              { value: "dimensions", label: t.modeDimensions },
              { value: "total", label: t.modeTotal },
            ]}
          />
          {input.mode === "dimensions" ? (
            <>
              <div className="flex flex-wrap gap-2">
                {SIZE_PRESETS[input.unit].map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() =>
                      set({ limL: p.dims[0], limW: p.dims[1], limH: p.dims[2] })
                    }
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs transition-colors",
                      input.limL === p.dims[0] &&
                        input.limW === p.dims[1] &&
                        input.limH === p.dims[2]
                        ? "border-primary/60 bg-primary/15 text-white"
                        : "border-white/10 bg-white/[0.04] text-muted-foreground hover:border-white/25",
                    )}
                  >
                    {t.presets[p.label] ?? p.label} · {p.dims.join(" × ")} {len}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3">
                <NumberField
                  id={`${id}-ll`}
                  label={t.length}
                  value={input.limL}
                  onChange={(v) => set({ limL: v })}
                />
                <NumberField
                  id={`${id}-lw`}
                  label={t.width}
                  value={input.limW}
                  onChange={(v) => set({ limW: v })}
                />
                <NumberField
                  id={`${id}-lh`}
                  label={t.depth}
                  value={input.limH}
                  onChange={(v) => set({ limH: v })}
                />
              </div>
              <p className="text-xs text-muted-foreground">{t.presetsNote}</p>
            </>
          ) : (
            <div className="sm:max-w-[12rem]">
              <NumberField
                id={`${id}-lt`}
                label={t.totalLimit(len)}
                value={input.limTotal}
                onChange={(v) => set({ limTotal: v })}
              />
            </div>
          )}
        </fieldset>

        <fieldset className="flex flex-col gap-3">
          <legend className="mb-1 text-sm font-semibold text-white">
            {t.weightTitle}
          </legend>
          <div className="grid grid-cols-2 gap-3 sm:max-w-sm">
            <NumberField
              id={`${id}-w`}
              label={t.bagWeight(wt)}
              value={input.weight}
              onChange={(v) => set({ weight: v })}
            />
            <NumberField
              id={`${id}-wl`}
              label={t.weightLimit(wt)}
              value={input.weightLimit}
              onChange={(v) => set({ weightLimit: v })}
            />
          </div>
        </fieldset>

        <Button
          type="button"
          variant="ghost"
          className="self-start"
          onClick={() => setInput(DEFAULT_BAG_SIZE)}
        >
          {t.reset}
        </Button>
      </form>

      <section
        aria-labelledby={`${id}-result`}
        className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start"
      >
        <div className="glass rounded-3xl p-6">
          <h2 id={`${id}-result`} className="eyebrow">
            {t.resultTitle}
          </h2>
          <div aria-live="polite">
            <p
              className={cn(
                "mt-3 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-semibold",
                style.tone,
              )}
            >
              <span
                aria-hidden="true"
                className={cn("size-2.5 rounded-full", style.dot)}
              />
              {t.verdicts[result.verdict]}
            </p>
            {result.totalMargin !== null ? (
              <p className="mt-3 text-sm text-foreground/90">
                {t.total(`${result.bagTotal} ${len}`)}:{" "}
                {result.totalMargin >= 0
                  ? t.under(fmt(result.totalMargin, len))
                  : t.over(fmt(result.totalMargin, len))}
              </p>
            ) : null}
          </div>

          {result.sides.length > 0 ? (
            <ul className="mt-5 flex flex-col gap-2 text-sm">
              {result.sides.map((s) => (
                <li key={s.side} className="flex justify-between gap-3">
                  <span className="text-foreground/90">
                    {t.sides[s.side]}: {t.sideOf(s.bag, s.limit, len)}
                  </span>
                  <span
                    className={cn(
                      "font-mono whitespace-nowrap",
                      s.margin < 0 ? "text-red-300" : "text-muted-foreground",
                    )}
                  >
                    {s.margin < 0
                      ? t.tooBig(fmt(s.margin, len))
                      : t.spare(fmt(s.margin, len))}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}

          {result.weightVerdict ? (
            <p className="mt-4 text-sm text-foreground/90">
              {t.weight}:{" "}
              {result.weightVerdict === "under"
                ? t.under(fmt(result.weightMargin ?? 0, wt))
                : t.over(fmt(result.weightMargin ?? 0, wt))}
            </p>
          ) : null}

          {result.verdict !== "incomplete" ? (
            <ul className="mt-5 flex flex-col gap-2 border-t border-white/[0.07] pt-4 text-sm">
              {advice.map((a) => (
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
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">{t.enterSizes}</p>
          )}

          <div className="mt-5 flex flex-wrap gap-2">
            <ShareButton event="bag_size_checker_shared" labels={t.share} />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">{t.disclaimer}</p>
        </div>
      </section>
    </div>
  );
}
