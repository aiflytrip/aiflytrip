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
import { CURRENCIES } from "@/features/tools/budget/budget";
import {
  Choice,
  ShareButton,
  useQueryString,
  useSyncQuery,
} from "@/features/tools/controls";
import { formatMoney } from "@/features/tools/format";
import { cn } from "@/lib/utils";

const LINE_LABELS: Record<FeeLineKey, string> = {
  fares: "Tickets",
  bags: "Bags",
  seats: "Seats",
  other: "Other fees",
  transport: "To and from the airport",
};

const FIELDS: {
  key: Exclude<keyof FareOption, "name">;
  label: string;
  hint: string;
}[] = [
  { key: "fare", label: "Ticket price", hint: "Per person, whole trip" },
  { key: "cabinBag", label: "Cabin bag", hint: "Per person, per flight" },
  { key: "checkedBags", label: "Checked bags", hint: "Number per person" },
  {
    key: "checkedBagFee",
    label: "Checked bag fee",
    hint: "Per bag, per flight",
  },
  { key: "seat", label: "Seat selection", hint: "Per person, per flight" },
  {
    key: "other",
    label: "Other fees",
    hint: "Per person: check-in, priority, payment",
  },
  {
    key: "transport",
    label: "Airport transport",
    hint: "Whole group, there and back",
  },
];

/** English only for now. Reads a shared comparison from the URL after hydration. */
export function BaggageFeeCalculator() {
  const query = useQueryString();
  return <FeeForm key={query} initial={feesFromQuery(query)} />;
}

function FeeForm({ initial }: { initial: FeeInput }) {
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
  const money = (n: number) => formatMoney(n, input.currency);
  const cheapest = result.cheapest;
  const lowest = result.lowestFare;

  return (
    <div className="flex flex-col gap-6">
      <form
        className="glass flex flex-col gap-6 rounded-3xl p-5 sm:p-6"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Fares to compare"
      >
        <div className="grid gap-5 sm:grid-cols-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`${id}-currency`}>Currency</Label>
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
            <Label htmlFor={`${id}-travellers`}>Travellers</Label>
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
            label="Trip"
            value={input.returnTrip ? "return" : "one-way"}
            onChange={(v) => set({ returnTrip: v === "return" })}
            options={[
              { value: "return", label: "Return" },
              { value: "one-way", label: "One way" },
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
              <legend className="sr-only">{result.options[k]!.name}</legend>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={`${id}-${k}-name`}>Name</Label>
                <Input
                  id={`${id}-${k}-name`}
                  value={o.name}
                  maxLength={30}
                  placeholder={OPTION_NAMES[k]}
                  onChange={(e) => setOption(k, { name: e.target.value })}
                />
              </div>
              {FIELDS.map((f) => (
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
                  Remove
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
              Add another fare
            </Button>
          ) : null}
          <Button
            type="button"
            variant="ghost"
            onClick={() => setInput(DEFAULT_FEES)}
          >
            Reset
          </Button>
        </div>
      </form>

      <section
        aria-labelledby={`${id}-result`}
        className="glass flex flex-col gap-5 rounded-3xl p-5 sm:p-6"
      >
        <h2 id={`${id}-result`} className="eyebrow">
          Real cost of each fare
        </h2>
        {cheapest === null ? (
          <p className="text-sm text-muted-foreground">
            Enter a ticket price for at least one fare to see its real cost.
          </p>
        ) : (
          <>
            <p className="text-lg text-white" aria-live="polite">
              {result.headlineMisleading && lowest !== null
                ? `${result.options[lowest]!.name} has the lowest ticket price, but ${result.options[cheapest]!.name} is cheaper once extras are added, by ${money(result.options[lowest]!.total - result.options[cheapest]!.total)}.`
                : `${result.options[cheapest]!.name} is the cheapest overall${result.spread > 0 ? `, by ${money(result.spread)} against the dearest option` : ""}.`}
            </p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[28rem] text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground">
                    <th scope="col" className="py-2 pr-3 font-medium">
                      {input.travellers}{" "}
                      {input.travellers === 1 ? "traveller" : "travellers"},{" "}
                      {result.flights === 2 ? "return" : "one way"}
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
                        {o.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(Object.keys(LINE_LABELS) as FeeLineKey[]).map(
                    (key, row) => (
                      <tr key={key} className="border-t border-white/[0.06]">
                        <th
                          scope="row"
                          className="py-2 pr-3 text-left font-normal text-foreground/90"
                        >
                          {LINE_LABELS[key]}
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
                    ),
                  )}
                  <tr className="border-t border-white/[0.12]">
                    <th
                      scope="row"
                      className="py-2 pr-3 text-left font-semibold text-white"
                    >
                      Total
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
                      Per person
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
          <ShareButton event="baggage_fees_shared" />
        </div>
        <p className="text-xs text-muted-foreground">
          Uses the prices you enter. Fees differ by airline, fare, route and
          date, and are often cheaper when added at booking than at the airport.
        </p>
      </section>
    </div>
  );
}
