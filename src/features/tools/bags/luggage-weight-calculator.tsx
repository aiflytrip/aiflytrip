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
  Choice,
  ShareButton,
  useQueryString,
  useSyncQuery,
} from "@/features/tools/controls";
import { VERDICT_STYLES } from "@/features/tools/format";
import { cn } from "@/lib/utils";

const VERDICTS: Record<
  WeightVerdict,
  { label: string; style: keyof typeof VERDICT_STYLES }
> = {
  under: { label: "Within your limit", style: "comfortable" },
  close: { label: "Close to your limit", style: "tight" },
  over: { label: "Over your limit", style: "risky" },
  incomplete: { label: "Add your items", style: "workable" },
};

/** "your coat, a jumper and your trainers" */
const listJoin = (items: string[]) =>
  items.length > 1
    ? `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`
    : (items[0] ?? "");

/** English only for now. Reads a shared check from the URL after hydration. */
export function LuggageWeightCalculator() {
  const query = useQueryString();
  return <WeightForm key={query} initial={weightFromQuery(query)} />;
}

function WeightForm({ initial }: { initial: WeightInput }) {
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
  const verdict = VERDICTS[result.verdict];
  const style = VERDICT_STYLES[verdict.style];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
      <form
        className="glass flex flex-col gap-6 rounded-3xl p-5 sm:p-6"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Luggage weight inputs"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <Choice<WeightUnit>
            name={`${id}-unit`}
            label="Units"
            value={u}
            onChange={(unit) => setInput((prev) => convertWeight(prev, unit))}
            options={[
              { value: "kg", label: "kg" },
              { value: "lb", label: "lb" },
            ]}
          />
          <Choice<WeightMode>
            name={`${id}-mode`}
            label="How do you want to check?"
            value={input.mode}
            onChange={(mode) => set({ mode })}
            options={[
              { value: "estimate", label: "Estimate what I pack" },
              { value: "weighed", label: "I've weighed my bag" },
            ]}
          />
        </div>

        <fieldset className="flex flex-col gap-3">
          <legend className="mb-1 text-sm font-semibold text-white">
            Your weight limit, from your booking
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
            <Label htmlFor={`${id}-limit`}>Limit ({u})</Label>
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
          <p className="text-xs text-muted-foreground">
            The buttons are common limits, not any airline&apos;s rule. Use the
            limit for your fare.
          </p>
        </fieldset>

        {input.mode === "weighed" ? (
          <div className="flex flex-col gap-1.5 sm:max-w-[12rem]">
            <Label htmlFor={`${id}-weighed`}>Your packed bag ({u})</Label>
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
              <Label htmlFor={`${id}-empty`}>Empty bag ({u})</Label>
              <Input
                id={`${id}-empty`}
                type="number"
                inputMode="decimal"
                min={0}
                step={0.1}
                value={input.emptyBag}
                onChange={(e) => set({ emptyBag: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                Wheeled bags often weigh a few kilos before you pack anything.
              </p>
            </div>
            <fieldset className="flex flex-col gap-2">
              <legend className="mb-1 text-sm font-semibold text-white">
                What you&apos;re packing
              </legend>
              <ul className="grid gap-2 sm:grid-cols-2">
                {ITEMS.map((item) => {
                  const n = input.counts[item.id] ?? 0;
                  return (
                    <li
                      key={item.id}
                      className="flex items-center justify-between gap-2 rounded-xl bg-white/[0.04] px-3 py-1.5 text-sm"
                    >
                      <span className={n ? "text-white" : "text-foreground/80"}>
                        {item.label}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <button
                          type="button"
                          aria-label={`Fewer ${item.label.toLowerCase()}`}
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
                          aria-label={`More ${item.label.toLowerCase()}`}
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
          Reset
        </Button>
      </form>

      <section
        aria-labelledby={`${id}-result`}
        className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start"
      >
        <div className="glass rounded-3xl p-6">
          <h2 id={`${id}-result`} className="eyebrow">
            Your bag
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
              {verdict.label}
            </p>
            <p className="mt-3 font-display text-3xl font-bold text-white">
              {input.mode === "estimate" ? "About " : ""}
              {result.total} {u}
            </p>
            {result.margin !== null ? (
              <p className="text-sm text-muted-foreground">
                {result.margin >= 0
                  ? `${result.margin} ${u} under your ${input.limit} ${u} limit`
                  : `${Math.abs(result.margin)} ${u} over your ${input.limit} ${u} limit`}
              </p>
            ) : null}
          </div>

          {input.mode === "estimate" && result.lines.length > 0 ? (
            <ul className="mt-5 flex flex-col gap-1.5 text-sm">
              <li className="flex justify-between gap-3 text-muted-foreground">
                <span>Empty bag</span>
                <span className="font-mono">
                  {input.emptyBag} {u}
                </span>
              </li>
              {result.lines.slice(0, 6).map((line) => (
                <li key={line.id} className="flex justify-between gap-3">
                  <span className="text-foreground/90">
                    {input.counts[line.id]} × {line.label.toLowerCase()}
                  </span>
                  <span className="font-mono text-muted-foreground">
                    {line.weight} {u}
                  </span>
                </li>
              ))}
              {result.lines.length > 6 ? (
                <li className="text-xs text-muted-foreground">
                  and {result.lines.length - 6} lighter groups
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
                Wearing {listJoin(result.wearItems)} on the plane would take
                about {result.wearSaving} {u} out of the bag.
              </li>
            ) : null}
            {result.verdict === "over" ? (
              <li className="flex items-start gap-2.5 text-foreground/90">
                <span
                  aria-hidden="true"
                  className="mt-1.5 size-1.5 flex-none rounded-full bg-primary"
                />
                Move heavy items to a bag that is included in your fare, or add
                more allowance when you book: it is usually cheaper than paying
                at the airport.
              </li>
            ) : null}
            <li className="flex items-start gap-2.5 text-foreground/90">
              <span
                aria-hidden="true"
                className="mt-1.5 size-1.5 flex-none rounded-full bg-primary"
              />
              {input.mode === "estimate"
                ? "Item weights are typical averages, so the real weight can differ. Weigh the packed bag before you leave."
                : "Weigh the bag fully packed, with anything you will clip to it, and leave a little room for things you buy on the trip."}
            </li>
          </ul>

          <div className="mt-5 flex flex-wrap gap-2">
            <ShareButton event="luggage_weight_shared" />
          </div>
        </div>
      </section>
    </div>
  );
}
