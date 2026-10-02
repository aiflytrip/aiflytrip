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
  CABIN_LABELS,
  MAX_TRAVELLERS,
  type TripType,
} from "@/features/flights/types";
import { cn } from "@/lib/utils";

const TRIP_OPTIONS: { value: TripType; label: string }[] = [
  { value: "round_trip", label: "Round trip" },
  { value: "one_way", label: "One way" },
];

export function FlightSearchForm({
  defaultValues = DEFAULT_FORM_VALUES,
  errors = {},
  className,
}: {
  defaultValues?: SearchFormValues;
  errors?: SearchFieldErrors;
  className?: string;
}) {
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
      action="/flights"
      className={cn("flex flex-col gap-4", className)}
      aria-label="Search flights"
    >
      <fieldset className="flex flex-wrap gap-2">
        <legend className="sr-only">Trip type</legend>
        {TRIP_OPTIONS.map((option) => (
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
        <Field id={`${id}-from`} label="From" error={errors.origin}>
          {(props) => (
            <Input
              {...props}
              name={SEARCH_KEYS.origin}
              list={airportListId}
              placeholder="City or airport code"
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
          aria-label="Swap origin and destination"
          className="grid size-11 place-items-center self-end justify-self-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <SwapIcon className="size-4 rotate-90 md:rotate-0" />
        </button>
        <Field id={`${id}-to`} label="To" error={errors.destination}>
          {(props) => (
            <Input
              {...props}
              name={SEARCH_KEYS.destination}
              list={airportListId}
              placeholder="City or airport code"
              autoComplete="off"
              required
              value={values.destination}
              onChange={(event) => set("destination")(event.target.value)}
            />
          )}
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_0.8fr_1fr_auto] lg:items-start">
        <Field id={`${id}-depart`} label="Departure" error={errors.departDate}>
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
          label="Return"
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
        <Field id={`${id}-adults`} label="Travellers" error={errors.adults}>
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
                    {n} {n === 1 ? "adult" : "adults"}
                  </option>
                ),
              )}
            </Select>
          )}
        </Field>
        <Field id={`${id}-cabin`} label="Cabin" error={errors.cabin}>
          {(props) => (
            <Select
              {...props}
              name={SEARCH_KEYS.cabin}
              value={values.cabin}
              onChange={(event) => set("cabin")(event.target.value)}
            >
              {CABIN_CLASSES.map((cabin) => (
                <option key={cabin} value={cabin}>
                  {CABIN_LABELS[cabin]}
                </option>
              ))}
            </Select>
          )}
        </Field>
        <SubmitButton className="w-full sm:col-span-2 lg:col-span-1 lg:mt-6.5" />
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
