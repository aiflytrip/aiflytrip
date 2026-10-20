"use client";

import { useId, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CheckboxRow,
  Choice,
  ShareButton,
  useQueryString,
  useSyncQuery,
} from "@/features/tools/controls";
import {
  DEFAULT_PACKING,
  generatePackingList,
  packingFromQuery,
  packingToQuery,
  sanitisePacking,
  type Climate,
  type Luggage,
  type PackingInput,
} from "@/features/tools/packing/packing";
import { PackingListView } from "@/features/tools/packing/packing-list-view";

const OPTIONS = [
  ["international", "International trip"],
  ["laundry", "I can do laundry while away"],
  ["beach", "Beach or pool"],
  ["hiking", "Hiking or outdoor activities"],
  ["business", "Business or work"],
  ["smart", "Smart evenings out"],
  ["child", "Travelling with a baby or young child"],
] as const;

/** English only for now. Reads a shared list from the URL after hydration. */
export function PackingListGenerator() {
  const query = useQueryString();
  return <GeneratorForm key={query} initial={packingFromQuery(query)} />;
}

function GeneratorForm({ initial }: { initial: PackingInput }) {
  const id = useId();
  const [input, setInput] = useState<PackingInput>(initial);
  const [packed, setPacked] = useState<Set<string>>(new Set());
  const list = useMemo(() => generatePackingList(input), [input]);
  useSyncQuery(packingToQuery(input), input !== initial);

  const set = (patch: Partial<Record<keyof PackingInput, unknown>>) =>
    setInput((prev) => sanitisePacking({ ...prev, ...patch }));
  const toggle = (itemId: string) =>
    setPacked((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) next.delete(itemId);
      else next.add(itemId);
      return next;
    });
  const ids = list.categories.flatMap((c) => c.items.map((i) => i.id));
  const packedCount = ids.filter((i) => packed.has(i)).length;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <form
        className="glass flex flex-col gap-6 rounded-3xl p-5 sm:p-6 print:hidden"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Packing list options"
      >
        <div className="flex flex-col gap-1.5 sm:max-w-[12rem]">
          <Label htmlFor={`${id}-days`}>Trip length (days)</Label>
          <Input
            id={`${id}-days`}
            type="number"
            inputMode="numeric"
            min={1}
            max={60}
            value={input.days}
            onChange={(e) => set({ days: e.target.value })}
          />
        </div>
        <Choice<Climate>
          name={`${id}-climate`}
          label="Weather at your destination"
          value={input.climate}
          onChange={(climate) => set({ climate })}
          options={[
            { value: "warm", label: "Warm or hot" },
            { value: "mild", label: "Mild" },
            { value: "cold", label: "Cold" },
          ]}
        />
        <Choice<Luggage>
          name={`${id}-luggage`}
          label="Luggage"
          value={input.luggage}
          onChange={(luggage) => set({ luggage })}
          options={[
            { value: "carry-on", label: "Carry-on only" },
            { value: "checked", label: "Checked bag" },
          ]}
        />
        <fieldset className="flex flex-col gap-2.5">
          <legend className="mb-1 text-sm font-medium text-foreground">
            Your trip
          </legend>
          {OPTIONS.map(([key, label]) => (
            <CheckboxRow
              key={key}
              checked={input[key]}
              onChange={(checked) => set({ [key]: checked })}
            >
              {label}
            </CheckboxRow>
          ))}
        </fieldset>
        <Button
          type="button"
          variant="ghost"
          className="self-start"
          onClick={() => setInput(DEFAULT_PACKING)}
        >
          Reset
        </Button>
      </form>

      <section
        aria-labelledby={`${id}-result`}
        className="glass flex flex-col gap-5 rounded-3xl p-5 sm:p-6"
      >
        <div>
          <h2 id={`${id}-result`} className="eyebrow">
            Your packing list
          </h2>
          <p className="mt-2 font-display text-3xl font-bold text-white">
            {list.itemCount} items
          </p>
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {input.days} {input.days === 1 ? "day" : "days"}, clothes for{" "}
            {list.outfitDays} · {packedCount} of {ids.length} packed
          </p>
        </div>

        <PackingListView list={list} packed={packed} onToggle={toggle} />

        <div className="flex flex-wrap gap-2 print:hidden">
          <ShareButton event="packing_list_shared" />
          <Button
            type="button"
            variant="secondary"
            onClick={() => window.print()}
          >
            Print list
          </Button>
          {packedCount > 0 ? (
            <Button
              type="button"
              variant="ghost"
              onClick={() => setPacked(new Set())}
            >
              Untick all
            </Button>
          ) : null}
        </div>
        <p className="text-xs text-muted-foreground">
          A starting point, not a rule book. Ticks are kept on this page only;
          the share link saves your trip settings, not your ticks.
        </p>
      </section>
    </div>
  );
}
