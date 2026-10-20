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
  Choice,
  ShareButton,
  useQueryString,
  useSyncQuery,
} from "@/features/tools/controls";
import { VERDICT_STYLES } from "@/features/tools/format";
import { cn } from "@/lib/utils";

const VERDICTS: Record<
  SizeVerdict,
  { label: string; style: keyof typeof VERDICT_STYLES }
> = {
  fits: { label: "Fits", style: "comfortable" },
  tight: { label: "Fits, but only just", style: "tight" },
  "too-big": { label: "Too big", style: "risky" },
  incomplete: { label: "Enter your sizes", style: "workable" },
};

const SIDE_LABEL = {
  longest: "Longest side",
  middle: "Middle side",
  shortest: "Shortest side",
} as const;

/** English only for now. Reads a shared check from the URL after hydration. */
export function BagSizeChecker() {
  const query = useQueryString();
  return <CheckerForm key={query} initial={bagSizeFromQuery(query)} />;
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

function CheckerForm({ initial }: { initial: BagSizeInput }) {
  const id = useId();
  const [input, setInput] = useState<BagSizeInput>(initial);
  const result = useMemo(() => checkBagSize(input), [input]);
  useSyncQuery(bagSizeToQuery(input), input !== initial);

  const set = (patch: Partial<Record<keyof BagSizeInput, unknown>>) =>
    setInput((prev) => sanitiseBagSize({ ...prev, ...patch }));
  const len = input.unit === "metric" ? "cm" : "in";
  const wt = input.unit === "metric" ? "kg" : "lb";
  const fmt = (n: number, unit: string) => `${Math.abs(n)} ${unit}`;
  const verdict = VERDICTS[result.verdict];
  const style = VERDICT_STYLES[verdict.style];

  const advice: string[] = [];
  if (result.needsTurning)
    advice.push(
      "It fits if you turn it: put the longest side of the bag along the longest side of the limit.",
    );
  if (result.verdict === "too-big")
    advice.push(
      "If it doesn't fit, the airline may ask you to pay at the gate or check the bag in. A smaller or softer bag, or moving items to a bag that is included, avoids that.",
    );
  if (result.verdict === "tight")
    advice.push(
      "There is very little room. Measure again with the bag packed, including wheels, handles and outside pockets.",
    );
  if (result.weightVerdict === "over")
    advice.push(
      "The bag is over the weight limit. Our luggage weight calculator shows which items make the biggest difference.",
    );
  advice.push(
    "Use the limit for your exact fare, as shown in your booking: allowances differ between airlines, fares and routes, and they change.",
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
      <form
        className="glass flex flex-col gap-6 rounded-3xl p-5 sm:p-6"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Bag size inputs"
      >
        <Choice<UnitSystem>
          name={`${id}-unit`}
          label="Units"
          value={input.unit}
          onChange={(unit) => setInput((prev) => convertBagSize(prev, unit))}
          options={[
            { value: "metric", label: "cm and kg" },
            { value: "imperial", label: "inches and lb" },
          ]}
        />

        <fieldset className="flex flex-col gap-3">
          <legend className="mb-1 text-sm font-semibold text-white">
            Your bag, packed ({len})
          </legend>
          <div className="grid grid-cols-3 gap-3">
            <NumberField
              id={`${id}-bl`}
              label="Length"
              value={input.bagL}
              onChange={(v) => set({ bagL: v })}
            />
            <NumberField
              id={`${id}-bw`}
              label="Width"
              value={input.bagW}
              onChange={(v) => set({ bagW: v })}
            />
            <NumberField
              id={`${id}-bh`}
              label="Depth"
              value={input.bagH}
              onChange={(v) => set({ bagH: v })}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Include wheels, handles and outside pockets.
          </p>
        </fieldset>

        <fieldset className="flex flex-col gap-3">
          <legend className="mb-1 text-sm font-semibold text-white">
            Your allowance, from your booking
          </legend>
          <Choice<LimitMode>
            name={`${id}-mode`}
            label="The limit is given as"
            value={input.mode}
            onChange={(mode) => set({ mode })}
            options={[
              { value: "dimensions", label: "Length × width × depth" },
              { value: "total", label: "Total of all three sides" },
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
                    {p.label} · {p.dims.join(" × ")} {len}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3">
                <NumberField
                  id={`${id}-ll`}
                  label="Length"
                  value={input.limL}
                  onChange={(v) => set({ limL: v })}
                />
                <NumberField
                  id={`${id}-lw`}
                  label="Width"
                  value={input.limW}
                  onChange={(v) => set({ limW: v })}
                />
                <NumberField
                  id={`${id}-lh`}
                  label="Depth"
                  value={input.limH}
                  onChange={(v) => set({ limH: v })}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                The buttons are common sizes, not any airline&apos;s rule. Type
                the size from your booking.
              </p>
            </>
          ) : (
            <div className="sm:max-w-[12rem]">
              <NumberField
                id={`${id}-lt`}
                label={`Total limit (${len})`}
                value={input.limTotal}
                onChange={(v) => set({ limTotal: v })}
              />
            </div>
          )}
        </fieldset>

        <fieldset className="flex flex-col gap-3">
          <legend className="mb-1 text-sm font-semibold text-white">
            Weight (optional)
          </legend>
          <div className="grid grid-cols-2 gap-3 sm:max-w-sm">
            <NumberField
              id={`${id}-w`}
              label={`Bag weight (${wt})`}
              value={input.weight}
              onChange={(v) => set({ weight: v })}
            />
            <NumberField
              id={`${id}-wl`}
              label={`Weight limit (${wt})`}
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
            {result.totalMargin !== null ? (
              <p className="mt-3 text-sm text-foreground/90">
                Total {result.bagTotal} {len}:{" "}
                {result.totalMargin >= 0
                  ? `${fmt(result.totalMargin, len)} under the limit`
                  : `${fmt(result.totalMargin, len)} over the limit`}
              </p>
            ) : null}
          </div>

          {result.sides.length > 0 ? (
            <ul className="mt-5 flex flex-col gap-2 text-sm">
              {result.sides.map((s) => (
                <li key={s.side} className="flex justify-between gap-3">
                  <span className="text-foreground/90">
                    {SIDE_LABEL[s.side]}: {s.bag} of {s.limit} {len}
                  </span>
                  <span
                    className={cn(
                      "font-mono whitespace-nowrap",
                      s.margin < 0 ? "text-red-300" : "text-muted-foreground",
                    )}
                  >
                    {s.margin < 0
                      ? `${fmt(s.margin, len)} too big`
                      : `${fmt(s.margin, len)} spare`}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}

          {result.weightVerdict ? (
            <p className="mt-4 text-sm text-foreground/90">
              Weight:{" "}
              {result.weightVerdict === "under"
                ? `${fmt(result.weightMargin ?? 0, wt)} under the limit`
                : `${fmt(result.weightMargin ?? 0, wt)} over the limit`}
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
            <p className="mt-3 text-sm text-muted-foreground">
              Enter all three sides of your bag and your allowance to check it.
            </p>
          )}

          <div className="mt-5 flex flex-wrap gap-2">
            <ShareButton event="bag_size_checker_shared" />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            A guide only. The airline&apos;s sizer at the airport is the final
            word.
          </p>
        </div>
      </section>
    </div>
  );
}
