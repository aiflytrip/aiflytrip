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
import {
  PACKING_TEXT,
  type PackingLocale,
  type PackingText,
} from "@/features/tools/packing/packing-text";

const OPTION_KEYS = [
  "international",
  "laundry",
  "beach",
  "hiking",
  "business",
  "smart",
  "child",
] as const;

/** In English or Spanish. Reads a shared list from the URL after hydration. */
export function PackingListGenerator({
  locale = "en",
}: {
  locale?: PackingLocale;
}) {
  const query = useQueryString();
  return (
    <GeneratorForm
      key={query}
      initial={packingFromQuery(query)}
      locale={locale}
      t={PACKING_TEXT[locale]}
    />
  );
}

function GeneratorForm({
  initial,
  locale,
  t,
}: {
  initial: PackingInput;
  locale: PackingLocale;
  t: PackingText;
}) {
  const id = useId();
  const [input, setInput] = useState<PackingInput>(initial);
  const [packed, setPacked] = useState<Set<string>>(new Set());
  const list = useMemo(
    () => generatePackingList(input, locale),
    [input, locale],
  );
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
        aria-label={t.formLabel}
      >
        <div className="flex flex-col gap-1.5 sm:max-w-[12rem]">
          <Label htmlFor={`${id}-days`}>{t.days}</Label>
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
          label={t.weather}
          value={input.climate}
          onChange={(climate) => set({ climate })}
          options={[
            { value: "warm", label: t.warm },
            { value: "mild", label: t.mild },
            { value: "cold", label: t.cold },
          ]}
        />
        <Choice<Luggage>
          name={`${id}-luggage`}
          label={t.luggage}
          value={input.luggage}
          onChange={(luggage) => set({ luggage })}
          options={[
            { value: "carry-on", label: t.carryOn },
            { value: "checked", label: t.checked },
          ]}
        />
        <fieldset className="flex flex-col gap-2.5">
          <legend className="mb-1 text-sm font-medium text-foreground">
            {t.yourTrip}
          </legend>
          {OPTION_KEYS.map((key) => (
            <CheckboxRow
              key={key}
              checked={input[key]}
              onChange={(checked) => set({ [key]: checked })}
            >
              {t.options[key]}
            </CheckboxRow>
          ))}
        </fieldset>
        <Button
          type="button"
          variant="ghost"
          className="self-start"
          onClick={() => setInput(DEFAULT_PACKING)}
        >
          {t.reset}
        </Button>
      </form>

      <section
        aria-labelledby={`${id}-result`}
        className="glass flex flex-col gap-5 rounded-3xl p-5 sm:p-6"
      >
        <div>
          <h2 id={`${id}-result`} className="eyebrow">
            {t.resultTitle}
          </h2>
          <p className="mt-2 font-display text-3xl font-bold text-white">
            {t.items(list.itemCount)}
          </p>
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {t.summary(input.days, list.outfitDays, packedCount, ids.length)}
          </p>
        </div>

        <PackingListView list={list} packed={packed} onToggle={toggle} />

        <div className="flex flex-wrap gap-2 print:hidden">
          <ShareButton event="packing_list_shared" labels={t.share} />
          <Button
            type="button"
            variant="secondary"
            onClick={() => window.print()}
          >
            {t.print}
          </Button>
          {packedCount > 0 ? (
            <Button
              type="button"
              variant="ghost"
              onClick={() => setPacked(new Set())}
            >
              {t.untick}
            </Button>
          ) : null}
        </div>
        <p className="text-xs text-muted-foreground">{t.disclaimer}</p>
      </section>
    </div>
  );
}
