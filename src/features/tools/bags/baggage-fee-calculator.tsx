"use client";

import { useId, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import {
  compareFares,
  DEFAULT_FEES,
  emptyOption,
  feesFromQuery,
  feesToQuery,
  MAX_OPTIONS,
  OPTION_NAMES,
  sanitiseFees,
  type FareOption,
  type FeeInput,
  type FeeLineKey,
} from "@/features/tools/bags/baggage-fees";
import {
  FEES_TEXT,
  type FeesLocale,
  type FeesText,
} from "@/features/tools/bags/baggage-fees-text";
import { CURRENCIES, type Currency } from "@/features/tools/budget/budget";
import {
  Choice,
  ShareButton,
  useQueryString,
  useSyncQuery,
} from "@/features/tools/controls";
import { formatMoney } from "@/features/tools/format";
import { cn } from "@/lib/utils";

const LINE_KEYS: FeeLineKey[] = [
  "fares",
  "bags",
  "seats",
  "other",
  "transport",
];

const FIELD_KEYS: Exclude<keyof FareOption, "name">[] = [
  "fare",
  "cabinBag",
  "checkedBags",
  "checkedBagFee",
  "seat",
  "other",
  "transport",
];

/** In English or Spanish. Reads a shared comparison from the URL after hydration. */
export function BaggageFeeCalculator({
  locale = "en",
  defaultCurrency = DEFAULT_FEES.currency,
}: {
  locale?: FeesLocale;
  /** Used when the link doesn't set a currency (EUR on /es). */
  defaultCurrency?: Currency;
}) {
  const query = useQueryString();
  const shared = feesFromQuery(query);
  const initial = new URLSearchParams(query).has("currency")
    ? shared
    : { ...shared, currency: defaultCurrency };
  return (
    <FeeForm
      key={query}
      initial={initial}
      locale={locale}
      t={FEES_TEXT[locale]}
    />
  );
}

function FeeForm({
  initial,
  locale,
  t,
}: {
  initial: FeeInput;
  locale: FeesLocale;
  t: FeesText;
}) {
  const id = useId();
  const [input, setInput] = useState<FeeInput>(initial);
  const result = useMemo(() => compareFares(input), [input]);
  useSyncQuery(feesToQuery(input), input !== initial);

  const set = (patch: Partial<Record<keyof FeeInput, unknown>>) =>
    setInput((prev) => sanitiseFees({ ...prev, ...patch }));
  const setOption = (
    k: number,
    patch: Partial<Record<keyof FareOption, unknown>>,
  ) =>
    setInput((prev) =>
      sanitiseFees({
        ...prev,
        options: prev.options.map((o, j) => (j === k ? { ...o, ...patch } : o)),
      }),
    );
  const money = (n: number) => formatMoney(n, input.currency, locale);
  // Default names are stored in English ("Fare A") and shown translated.
  const optionName = (name: string, k: number) =>
    name === OPTION_NAMES[k] ? t.optionNames[k]! : name;
  const resultName = (k: number) => optionName(result.options[k]!.name, k);
  const cheapest = result.cheapest;
  const lowest = result.lowestFare;

  return (
    <div className="flex flex-col gap-6">
      <form
        className="glass flex flex-col gap-6 rounded-3xl p-5 sm:p-6"
        onSubmit={(e) => e.preventDefault()}
        aria-label={t.formLabel}
      >
        <div className="grid gap-5 sm:grid-cols-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`${id}-currency`}>{t.currency}</Label>
            <Select
              id={`${id}-currency`}
              value={input.currency}
              onChange={(e) => set({ currency: e.target.value })}
            >
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`${id}-travellers`}>{t.travellers}</Label>
            <Input
              id={`${id}-travellers`}
              type="number"
              inputMode="numeric"
              min={1}
              max={9}
              value={input.travellers}
              onChange={(e) => set({ travellers: e.target.value })}
            />
          </div>
          <Choice<"return" | "one-way">
            name={`${id}-trip`}
            label={t.trip}
            value={input.returnTrip ? "return" : "one-way"}
            onChange={(v) => set({ returnTrip: v === "return" })}
            options={[
              { value: "return", label: t.returnTrip },
              { value: "one-way", label: t.oneWay },
            ]}
          />
        </div>

        <div
          className={cn(
            "grid gap-4",
            input.options.length === 3 ? "lg:grid-cols-3" : "md:grid-cols-2",
          )}
        >
          {input.options.map((o, k) => (
            <fieldset
              key={k}
              className={cn(
                "flex flex-col gap-3 rounded-2xl border p-4",
                cheapest === k
                  ? "border-emerald-400/40 bg-emerald-400/[0.04]"
                  : "border-white/[0.08] bg-black/20",
              )}
            >
              <legend className="sr-only">{resultName(k)}</legend>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={`${id}-${k}-name`}>{t.name}</Label>
                <Input
                  id={`${id}-${k}-name`}
                  value={optionName(o.name, k)}
                  maxLength={30}
                  placeholder={t.optionNames[k]}
                  onChange={(e) => setOption(k, { name: e.target.value })}
                />
              </div>
              {FIELD_KEYS.map((key) => ({ key, ...t.fields[key] })).map((f) => (
                <div key={f.key} className="flex flex-col gap-1">
                  <Label htmlFor={`${id}-${k}-${f.key}`}>{f.label}</Label>
                  <Input
                    id={`${id}-${k}-${f.key}`}
                    type="number"
                    inputMode="decimal"
                    min={0}
                    max={f.key === "checkedBags" ? 3 : undefined}
                    step={f.key === "checkedBags" ? 1 : "any"}
                    value={o[f.key] || ""}
                    placeholder="0"
                    onChange={(e) => setOption(k, { [f.key]: e.target.value })}
                  />
                  <span className="text-xs text-muted-foreground">
                    {f.hint}
                  </span>
                </div>
              ))}
              {input.options.length > 2 ? (
                <Button
                  type="button"
                  variant="ghost"
                  className="self-start"
                  onClick={() =>
                    set({ options: input.options.filter((_, j) => j !== k) })
                  }
                >
                  {t.remove}
                </Button>
              ) : null}
            </fieldset>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {input.options.length < MAX_OPTIONS ? (
            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                set({
                  options: [
                    ...input.options,
                    emptyOption(OPTION_NAMES[input.options.length]!),
                  ],
                })
              }
            >
              {t.addFare}
            </Button>
          ) : null}
          <Button
            type="button"
            variant="ghost"
            onClick={() => setInput(DEFAULT_FEES)}
          >
            {t.reset}
          </Button>
        </div>
      </form>

      <section
        aria-labelledby={`${id}-result`}
        className="glass flex flex-col gap-5 rounded-3xl p-5 sm:p-6"
      >
        <h2 id={`${id}-result`} className="eyebrow">
          {t.resultTitle}
        </h2>
        {cheapest === null ? (
          <p className="text-sm text-muted-foreground">{t.enterFare}</p>
        ) : (
          <>
            <p className="text-lg text-white" aria-live="polite">
              {result.headlineMisleading && lowest !== null
                ? t.misleading(
                    resultName(lowest),
                    resultName(cheapest),
                    money(
                      result.options[lowest]!.total -
                        result.options[cheapest]!.total,
                    ),
                  )
                : t.cheapest(
                    resultName(cheapest),
                    result.spread > 0 ? money(result.spread) : null,
                  )}
            </p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[28rem] text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground">
                    <th scope="col" className="py-2 pr-3 font-medium">
                      {t.tableHeading(input.travellers, result.flights === 2)}
                    </th>
                    {result.options.map((o, k) => (
                      <th
                        key={k}
                        scope="col"
                        className={cn(
                          "py-2 pl-3 text-right font-semibold",
                          cheapest === k ? "text-emerald-200" : "text-white",
                        )}
                      >
                        {resultName(k)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {LINE_KEYS.map((key, row) => (
                    <tr key={key} className="border-t border-white/[0.06]">
                      <th
                        scope="row"
                        className="py-2 pr-3 text-left font-normal text-foreground/90"
                      >
                        {t.lines[key]}
                      </th>
                      {result.options.map((o, k) => (
                        <td
                          key={k}
                          className="py-2 pl-3 text-right font-mono text-muted-foreground"
                        >
                          {o.complete ? money(o.lines[row]!.amount) : "–"}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr className="border-t border-white/[0.12]">
                    <th
                      scope="row"
                      className="py-2 pr-3 text-left font-semibold text-white"
                    >
                      {t.total}
                    </th>
                    {result.options.map((o, k) => (
                      <td
                        key={k}
                        className={cn(
                          "py-2 pl-3 text-right font-mono font-semibold",
                          cheapest === k ? "text-emerald-200" : "text-white",
                        )}
                      >
                        {o.complete ? money(o.total) : "–"}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="py-1 pr-3 text-left font-normal text-muted-foreground"
                    >
                      {t.perPerson}
                    </th>
                    {result.options.map((o, k) => (
                      <td
                        key={k}
                        className="py-1 pl-3 text-right font-mono text-muted-foreground"
                      >
                        {o.complete ? money(o.perPerson) : "–"}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
        <div className="flex flex-wrap gap-2">
          <ShareButton event="baggage_fees_shared" labels={t.share} />
        </div>
        <p className="text-xs text-muted-foreground">{t.disclaimer}</p>
      </section>
    </div>
  );
}
