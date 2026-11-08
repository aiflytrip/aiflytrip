"use client";

import { useId, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  checkWeight,
  convertWeight,
  DEFAULT_WEIGHT,
  ITEMS,
  LIMIT_PRESETS,
  sanitiseWeight,
  weightFromQuery,
  weightToQuery,
  type ItemId,
  type WeightInput,
  type WeightMode,
  type WeightUnit,
  type WeightVerdict,
} from "@/features/tools/bags/luggage-weight";
import {
  WEIGHT_TEXT,
  type WeightLocale,
  type WeightText,
} from "@/features/tools/bags/luggage-weight-text";
import {
  Choice,
  ShareButton,
  useQueryString,
  useSyncQuery,
} from "@/features/tools/controls";
import { VERDICT_STYLES } from "@/features/tools/format";
import { cn } from "@/lib/utils";

const VERDICT_STYLE: Record<WeightVerdict, keyof typeof VERDICT_STYLES> = {
  under: "comfortable",
  close: "tight",
  over: "risky",
  incomplete: "workable",
};

/** "your coat, a jumper and your trainers" */
const listJoin = (items: string[], and: string) =>
  items.length > 1
    ? `${items.slice(0, -1).join(", ")} ${and} ${items.at(-1)}`
    : (items[0] ?? "");

/** In English or Spanish. Reads a shared check from the URL after hydration. */
export function LuggageWeightCalculator({
  locale = "en",
}: {
  locale?: WeightLocale;
}) {
  const query = useQueryString();
  return (
    <WeightForm
      key={query}
      initial={weightFromQuery(query)}
      t={WEIGHT_TEXT[locale]}
    />
  );
}

function WeightForm({ initial, t }: { initial: WeightInput; t: WeightText }) {
  const id = useId();
  const [input, setInput] = useState<WeightInput>(initial);
  const result = useMemo(() => checkWeight(input), [input]);
  useSyncQuery(weightToQuery(input), input !== initial);

  const set = (patch: Partial<Record<keyof WeightInput, unknown>>) =>
    setInput((prev) => sanitiseWeight({ ...prev, ...patch }));
  const setCount = (itemId: ItemId, n: number) =>
    setInput((prev) =>
      sanitiseWeight({
        ...prev,
        counts: { ...prev.counts, [itemId]: Math.max(0, n) },
      }),
    );
  const u = input.unit;
  const style = VERDICT_STYLES[VERDICT_STYLE[result.verdict]];
  const itemLabel = (itemId: ItemId) =>
    t.items[itemId] ?? ITEMS.find((item) => item.id === itemId)!.label;
  const wearItems = result.wearIds.map(
    (itemId, k) => t.wear[itemId] ?? result.wearItems[k]!,
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
      <form
        className="glass flex flex-col gap-6 rounded-3xl p-5 sm:p-6"
        onSubmit={(e) => e.preventDefault()}
        aria-label={t.formLabel}
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <Choice<WeightUnit>
            name={`${id}-unit`}
            label={t.units}
            value={u}
            onChange={(unit) => setInput((prev) => convertWeight(prev, unit))}
            options={[
              { value: "kg", label: "kg" },
              { value: "lb", label: "lb" },
            ]}
          />
          <Choice<WeightMode>
            name={`${id}-mode`}
            label={t.howToCheck}
            value={input.mode}
            onChange={(mode) => set({ mode })}
            options={[
              { value: "estimate", label: t.modeEstimate },
              { value: "weighed", label: t.modeWeighed },
            ]}
          />
        </div>

        <fieldset className="flex flex-col gap-3">
          <legend className="mb-1 text-sm font-semibold text-white">
            {t.limitTitle}
          </legend>
          <div className="flex flex-wrap gap-2">
            {LIMIT_PRESETS[u].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => set({ limit: n })}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs transition-colors",
                  input.limit === n
                    ? "border-primary/60 bg-primary/15 text-white"
                    : "border-white/10 bg-white/[0.04] text-muted-foreground hover:border-white/25",
                )}
              >
                {n} {u}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-1.5 sm:max-w-[12rem]">
            <Label htmlFor={`${id}-limit`}>{t.limit(u)}</Label>
            <Input
              id={`${id}-limit`}
              type="number"
              inputMode="decimal"
              min={0}
              step={0.5}
              value={input.limit || ""}
              placeholder="0"
              onChange={(e) => set({ limit: e.target.value })}
            />
          </div>
          <p className="text-xs text-muted-foreground">{t.presetsNote}</p>
        </fieldset>

        {input.mode === "weighed" ? (
          <div className="flex flex-col gap-1.5 sm:max-w-[12rem]">
            <Label htmlFor={`${id}-weighed`}>{t.packedBag(u)}</Label>
            <Input
              id={`${id}-weighed`}
              type="number"
              inputMode="decimal"
              min={0}
              step={0.1}
              value={input.weighed || ""}
              placeholder="0"
              onChange={(e) => set({ weighed: e.target.value })}
            />
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-1.5 sm:max-w-[12rem]">
              <Label htmlFor={`${id}-empty`}>{t.emptyBag(u)}</Label>
              <Input
                id={`${id}-empty`}
                type="number"
                inputMode="decimal"
                min={0}
                step={0.1}
                value={input.emptyBag}
                onChange={(e) => set({ emptyBag: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">{t.emptyBagNote}</p>
            </div>
            <fieldset className="flex flex-col gap-2">
              <legend className="mb-1 text-sm font-semibold text-white">
                {t.packingTitle}
              </legend>
              <ul className="grid gap-2 sm:grid-cols-2">
                {ITEMS.map((item) => {
                  const n = input.counts[item.id] ?? 0;
                  const label = itemLabel(item.id);
                  return (
                    <li
                      key={item.id}
                      className="flex items-center justify-between gap-2 rounded-xl bg-white/[0.04] px-3 py-1.5 text-sm"
                    >
                      <span className={n ? "text-white" : "text-foreground/80"}>
                        {label}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <button
                          type="button"
                          aria-label={t.fewer(label.toLowerCase())}
                          onClick={() => setCount(item.id, n - 1)}
                          disabled={n === 0}
                          className="grid size-7 place-items-center rounded-full border border-white/10 text-muted-foreground hover:border-white/25 disabled:opacity-40"
                        >
                          −
                        </button>
                        <span
                          className="w-5 text-center font-mono"
                          aria-live="polite"
                        >
                          {n}
                        </span>
                        <button
                          type="button"
                          aria-label={t.more(label.toLowerCase())}
                          onClick={() => setCount(item.id, n + 1)}
                          className="grid size-7 place-items-center rounded-full border border-white/10 text-muted-foreground hover:border-white/25"
                        >
                          +
                        </button>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </fieldset>
          </>
        )}

        <Button
          type="button"
          variant="ghost"
          className="self-start"
          onClick={() => setInput(DEFAULT_WEIGHT)}
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
            <p className="mt-3 font-display text-3xl font-bold text-white">
              {input.mode === "estimate" ? t.about : ""}
              {result.total} {u}
            </p>
            {result.margin !== null ? (
              <p className="text-sm text-muted-foreground">
                {result.margin >= 0
                  ? t.under(`${result.margin} ${u}`, `${input.limit} ${u}`)
                  : t.over(
                      `${Math.abs(result.margin)} ${u}`,
                      `${input.limit} ${u}`,
                    )}
              </p>
            ) : null}
          </div>

          {input.mode === "estimate" && result.lines.length > 0 ? (
            <ul className="mt-5 flex flex-col gap-1.5 text-sm">
              <li className="flex justify-between gap-3 text-muted-foreground">
                <span>{t.emptyBagLine}</span>
                <span className="font-mono">
                  {input.emptyBag} {u}
                </span>
              </li>
              {result.lines.slice(0, 6).map((line) => (
                <li key={line.id} className="flex justify-between gap-3">
                  <span className="text-foreground/90">
                    {input.counts[line.id]} × {itemLabel(line.id).toLowerCase()}
                  </span>
                  <span className="font-mono text-muted-foreground">
                    {line.weight} {u}
                  </span>
                </li>
              ))}
              {result.lines.length > 6 ? (
                <li className="text-xs text-muted-foreground">
                  {t.lighterGroups(result.lines.length - 6)}
                </li>
              ) : null}
            </ul>
          ) : null}

          <ul className="mt-5 flex flex-col gap-2 border-t border-white/[0.07] pt-4 text-sm">
            {result.wearSaving > 0 &&
            (result.verdict === "over" || result.verdict === "close") ? (
              <li className="flex items-start gap-2.5 text-foreground/90">
                <span
                  aria-hidden="true"
                  className="mt-1.5 size-1.5 flex-none rounded-full bg-primary"
                />
                {t.wearAdvice(
                  listJoin(wearItems, t.and),
                  `${result.wearSaving} ${u}`,
                )}
              </li>
            ) : null}
            {result.verdict === "over" ? (
              <li className="flex items-start gap-2.5 text-foreground/90">
                <span
                  aria-hidden="true"
                  className="mt-1.5 size-1.5 flex-none rounded-full bg-primary"
                />
                {t.overAdvice}
              </li>
            ) : null}
            <li className="flex items-start gap-2.5 text-foreground/90">
              <span
                aria-hidden="true"
                className="mt-1.5 size-1.5 flex-none rounded-full bg-primary"
              />
              {input.mode === "estimate" ? t.estimateNote : t.weighedNote}
            </li>
          </ul>

          <div className="mt-5 flex flex-wrap gap-2">
            <ShareButton event="luggage_weight_shared" labels={t.share} />
          </div>
        </div>
      </section>
    </div>
  );
}
