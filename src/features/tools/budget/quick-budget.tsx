"use client";

import Link from "next/link";
import { useId, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { formatMoney } from "@/features/tools/format";
import {
  CURRENCIES,
  DEFAULT_INPUT,
  sanitise,
  toQuery,
  tripDays,
  type Currency,
} from "@/features/tools/budget/budget";
import { type Locale } from "@/i18n/config";
import { toolsMessages } from "@/i18n/messages/tools";
import { route } from "@/i18n/routes";

const toNumber = (value: string) => {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : 0;
};

/**
 * Homepage quick estimate: a few inputs and an instant total, with a link
 * that carries the values into the full calculator. Uses only the user's
 * own numbers (no built-in prices).
 */
export function QuickBudget({
  locale = "en",
  defaultCurrency = "GBP",
}: {
  locale?: Locale;
  defaultCurrency?: Currency;
}) {
  const id = useId();
  const m = toolsMessages(locale).budget;
  const money = (amount: number, cur: string) =>
    formatMoney(amount, cur, locale);
  const [travellers, setTravellers] = useState("2");
  const [nights, setNights] = useState("4");
  const [currency, setCurrency] = useState<Currency>(defaultCurrency);
  const [flights, setFlights] = useState("");
  const [stay, setStay] = useState("");
  const [daily, setDaily] = useState("");

  const t = Math.max(1, Math.min(20, Math.round(toNumber(travellers) || 1)));
  const n = Math.max(1, Math.min(90, Math.round(toNumber(nights) || 1)));
  const days = tripDays(n);
  const total =
    toNumber(flights) * t + toNumber(stay) * n + toNumber(daily) * days * t;

  const fullHref = `${route("budget", locale)}?${toQuery(
    sanitise({
      ...DEFAULT_INPUT,
      travellers: t,
      nights: n,
      currency,
      flightsPerPerson: toNumber(flights),
      accommodationPerNight: toNumber(stay),
    }),
  )}`;

  const field = "flex flex-col gap-1.5";
  return (
    <div className="glass relative overflow-hidden rounded-3xl p-5 sm:p-6">
      <div
        aria-hidden="true"
        className="orb -right-20 -bottom-24 size-[300px] bg-[radial-gradient(circle,rgb(167_139_250/0.22),transparent_65%)]"
      />
      <form
        className="relative grid grid-cols-2 gap-3 sm:grid-cols-3"
        onSubmit={(e) => e.preventDefault()}
        aria-label={m.quickFormLabel}
      >
        <div className={field}>
          <Label htmlFor={`${id}-t`}>{m.travellers}</Label>
          <Input
            id={`${id}-t`}
            type="number"
            inputMode="numeric"
            min={1}
            max={20}
            value={travellers}
            onChange={(e) => setTravellers(e.target.value)}
          />
        </div>
        <div className={field}>
          <Label htmlFor={`${id}-n`}>{m.nights}</Label>
          <Input
            id={`${id}-n`}
            type="number"
            inputMode="numeric"
            min={1}
            max={90}
            value={nights}
            onChange={(e) => setNights(e.target.value)}
          />
        </div>
        <div className={`${field} col-span-2 sm:col-span-1`}>
          <Label htmlFor={`${id}-c`}>{m.currency}</Label>
          <Select
            id={`${id}-c`}
            value={currency}
            onChange={(e) => setCurrency(e.target.value as Currency)}
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </div>
        <div className={field}>
          <Label htmlFor={`${id}-f`}>{m.flightsPerPerson}</Label>
          <Input
            id={`${id}-f`}
            type="number"
            inputMode="decimal"
            min={0}
            placeholder="0"
            value={flights}
            onChange={(e) => setFlights(e.target.value)}
          />
        </div>
        <div className={field}>
          <Label htmlFor={`${id}-s`}>{m.stayPerNight}</Label>
          <Input
            id={`${id}-s`}
            type="number"
            inputMode="decimal"
            min={0}
            placeholder="0"
            value={stay}
            onChange={(e) => setStay(e.target.value)}
          />
        </div>
        <div className={`${field} col-span-2 sm:col-span-1`}>
          <Label htmlFor={`${id}-d`}>{m.dailySpend}</Label>
          <Input
            id={`${id}-d`}
            type="number"
            inputMode="decimal"
            min={0}
            placeholder="0"
            value={daily}
            onChange={(e) => setDaily(e.target.value)}
          />
        </div>
      </form>

      <div className="relative mt-5 flex flex-col gap-4 border-t border-white/[0.07] pt-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow text-[11px]">{m.estimated}</p>
          <p
            className="mt-1 font-display text-4xl font-bold text-white tabular-nums"
            aria-live="polite"
          >
            {money(total, currency)}
          </p>
          <p className="text-xs text-muted-foreground">
            {m.quickSummary(money(total / t, currency), days)}
          </p>
        </div>
        <Link
          href={fullHref}
          className={buttonVariants({ variant: "secondary" })}
        >
          {m.openFull}
        </Link>
      </div>
    </div>
  );
}
