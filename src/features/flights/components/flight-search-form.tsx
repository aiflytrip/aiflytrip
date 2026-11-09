"use client";

import Form from "next/form";
import { useId, useState } from "react";

import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { SubmitButton } from "@/features/flights/components/submit-button";
import { useToday } from "@/features/flights/components/use-today";
import { AIRPORTS, formatAirportLabel } from "@/features/flights/data/airports";
import {
  DEFAULT_FORM_VALUES,
  SEARCH_KEYS,
  type SearchFieldErrors,
  type SearchFormValues,
} from "@/features/flights/lib/search-params";
import {
  CABIN_CLASSES,
  MAX_TRAVELLERS,
  TRIP_TYPES,
} from "@/features/flights/types";
import { FLIGHT_MESSAGES, type FlightLocale } from "@/i18n/messages/flights";
import { cn } from "@/lib/utils";

export function FlightSearchForm({
  defaultValues = DEFAULT_FORM_VALUES,
  errors = {},
  className,
  locale = "en",
}: {
  defaultValues?: SearchFormValues;
  /** Validation messages, already in the form's language. */
  errors?: SearchFieldErrors;
  className?: string;
  locale?: FlightLocale;
}) {
  const t = FLIGHT_MESSAGES[locale];
  const id = useId();
  const today = useToday();
  const [values, setValues] = useState(defaultValues);
  const isRoundTrip = values.tripType !== "one_way";

  const set = (field: keyof SearchFormValues) => (value: string) =>
    setValues((current) => ({ ...current, [field]: value }));

  const swapAirports = () =>
    setValues((current) => ({
      ...current,
      origin: current.destination,
      destination: current.origin,
    }));

  const airportListId = `${id}-airports`;

  return (
    <Form
      action={t.path}
      className={cn("flex flex-col gap-4", className)}
      aria-label={t.form.label}
    >
      <fieldset className="flex flex-wrap gap-2">
        <legend className="sr-only">{t.form.tripType}</legend>
        {TRIP_TYPES.map((value) => ({
          value,
          label: t.form.trips[value],
        })).map((option) => (
          <label
            key={option.value}
            className={cn(
              "cursor-pointer rounded-full border px-4 py-1.5 text-sm font-medium transition-colors has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring",
              values.tripType === option.value
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:text-foreground",
            )}
          >
            <input
              type="radio"
              name={SEARCH_KEYS.tripType}
              value={option.value}
              checked={values.tripType === option.value}
              onChange={(event) => set("tripType")(event.target.value)}
              className="sr-only"
            />
            {option.label}
          </label>
        ))}
      </fieldset>

      <datalist id={airportListId}>
        {AIRPORTS.map((airport) => (
          <option key={airport.code} value={airport.code}>
            {`${formatAirportLabel(airport)}, ${airport.name}`}
          </option>
        ))}
      </datalist>

      <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr]">
        <Field id={`${id}-from`} label={t.form.from} error={errors.origin}>
          {(props) => (
            <Input
              {...props}
              name={SEARCH_KEYS.origin}
              list={airportListId}
              placeholder={t.form.airportPlaceholder}
              autoComplete="off"
              required
              value={values.origin}
              onChange={(event) => set("origin")(event.target.value)}
            />
          )}
        </Field>
        <button
          type="button"
          onClick={swapAirports}
          aria-label={t.form.swap}
          className="grid size-11 place-items-center self-end justify-self-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <SwapIcon className="size-4 rotate-90 md:rotate-0" />
        </button>
        <Field id={`${id}-to`} label={t.form.to} error={errors.destination}>
          {(props) => (
            <Input
              {...props}
              name={SEARCH_KEYS.destination}
              list={airportListId}
              placeholder={t.form.airportPlaceholder}
              autoComplete="off"
              required
              value={values.destination}
              onChange={(event) => set("destination")(event.target.value)}
            />
          )}
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_0.8fr_1fr_auto] lg:items-start">
        <Field
          id={`${id}-depart`}
          label={t.form.departure}
          error={errors.departDate}
        >
          {(props) => (
            <Input
              {...props}
              type="date"
              name={SEARCH_KEYS.departDate}
              min={today}
              required
              value={values.departDate}
              onChange={(event) => set("departDate")(event.target.value)}
            />
          )}
        </Field>
        <Field
          id={`${id}-return`}
          label={t.form.returnLabel}
          error={isRoundTrip ? errors.returnDate : undefined}
        >
          {(props) => (
            <Input
              {...props}
              type="date"
              name={SEARCH_KEYS.returnDate}
              min={values.departDate || today}
              // Disabled inputs are left out of the submitted URL.
              disabled={!isRoundTrip}
              required={isRoundTrip}
              value={isRoundTrip ? values.returnDate : ""}
              onChange={(event) => set("returnDate")(event.target.value)}
            />
          )}
        </Field>
        <Field
          id={`${id}-adults`}
          label={t.form.travellers}
          error={errors.adults}
        >
          {(props) => (
            <Select
              {...props}
              name={SEARCH_KEYS.adults}
              value={values.adults}
              onChange={(event) => set("adults")(event.target.value)}
            >
              {Array.from({ length: MAX_TRAVELLERS }, (_, i) => i + 1).map(
                (n) => (
                  <option key={n} value={n}>
                    {t.form.adults(n)}
                  </option>
                ),
              )}
            </Select>
          )}
        </Field>
        <Field id={`${id}-cabin`} label={t.form.cabin} error={errors.cabin}>
          {(props) => (
            <Select
              {...props}
              name={SEARCH_KEYS.cabin}
              value={values.cabin}
              onChange={(event) => set("cabin")(event.target.value)}
            >
              {CABIN_CLASSES.map((cabin) => (
                <option key={cabin} value={cabin}>
                  {t.cabins[cabin]}
                </option>
              ))}
            </Select>
          )}
        </Field>
        <SubmitButton
          className="w-full sm:col-span-2 lg:col-span-1 lg:mt-6.5"
          label={t.form.submit}
          pendingLabel={t.form.pending}
        />
      </div>
    </Form>
  );
}

function SwapIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="m16 3 4 4-4 4" />
      <path d="M20 7H4" />
      <path d="m8 21-4-4 4-4" />
      <path d="M4 17h16" />
    </svg>
  );
}
