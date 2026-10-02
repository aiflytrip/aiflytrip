"use client";

import { useActionState, useId } from "react";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { FormMessage } from "@/features/auth/components/form-message";
import { useToday } from "@/features/flights/components/use-today";
import { AIRPORTS, formatAirportLabel } from "@/features/flights/data/airports";
import {
  CABIN_CLASSES,
  CABIN_LABELS,
  MAX_TRAVELLERS,
} from "@/features/flights/types";
import {
  createPlan,
  type PlanFormState,
} from "@/features/trip-planner/actions";
import {
  BUDGET_CURRENCIES,
  INTERESTS,
  MAX_NOTES_LENGTH,
  MAX_TRIP_DAYS,
  PACE_LABELS,
  PACES,
} from "@/features/trip-planner/lib/request";
import { cn } from "@/lib/utils";

const INITIAL: PlanFormState = { status: "idle" };

const label = (interest: string) =>
  interest.charAt(0).toUpperCase() + interest.slice(1);

/** `initialDestination` prefills "To" (e.g. from a destination guide CTA). */
export function PlanForm({
  initialDestination,
}: { initialDestination?: string } = {}) {
  const id = useId();
  const today = useToday();
  const [state, formAction, pending] = useActionState(createPlan, INITIAL);
  const error = state.status === "error" ? state : undefined;
  const values = error?.values;
  const errors = error?.fieldErrors ?? {};
  const airportListId = `${id}-airports`;

  return (
    <form action={formAction} className="flex flex-col gap-6" noValidate>
      {error?.message ? <FormMessage>{error.message}</FormMessage> : null}

      <datalist id={airportListId}>
        {AIRPORTS.map((airport) => (
          <option key={airport.code} value={airport.code}>
            {`${formatAirportLabel(airport)}, ${airport.name}`}
          </option>
        ))}
      </datalist>

      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="mb-2 text-sm font-semibold">Where and when</legend>
        <Field id={`${id}-from`} label="From" error={errors.origin}>
          {(props) => (
            <Input
              {...props}
              name="from"
              list={airportListId}
              placeholder="City or airport code"
              autoComplete="off"
              required
              defaultValue={values?.origin}
            />
          )}
        </Field>
        <Field id={`${id}-to`} label="To" error={errors.destination}>
          {(props) => (
            <Input
              {...props}
              name="to"
              list={airportListId}
              placeholder="City or airport code"
              autoComplete="off"
              required
              defaultValue={values?.destination ?? initialDestination}
            />
          )}
        </Field>
        <Field id={`${id}-depart`} label="Departure" error={errors.departDate}>
          {(props) => (
            <Input
              {...props}
              type="date"
              name="depart"
              min={today}
              required
              defaultValue={values?.departDate}
            />
          )}
        </Field>
        <Field
          id={`${id}-return`}
          label={`Return (up to ${MAX_TRIP_DAYS} days)`}
          error={errors.returnDate}
        >
          {(props) => (
            <Input
              {...props}
              type="date"
              name="return"
              min={today}
              required
              defaultValue={values?.returnDate}
            />
          )}
        </Field>
        <Field id={`${id}-adults`} label="Travellers" error={errors.adults}>
          {(props) => (
            <Select
              {...props}
              name="adults"
              defaultValue={values?.adults ?? "1"}
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
              name="cabin"
              defaultValue={values?.cabin ?? "economy"}
            >
              {CABIN_CLASSES.map((cabin) => (
                <option key={cabin} value={cabin}>
                  {CABIN_LABELS[cabin]}
                </option>
              ))}
            </Select>
          )}
        </Field>
      </fieldset>

      <fieldset className="grid gap-4 sm:grid-cols-[1fr_auto_1fr]">
        <legend className="mb-2 text-sm font-semibold">Budget and pace</legend>
        <Field
          id={`${id}-budget`}
          label="Total budget (optional)"
          error={errors.budgetAmount}
        >
          {(props) => (
            <Input
              {...props}
              name="budgetAmount"
              inputMode="numeric"
              placeholder="e.g. 2500"
              defaultValue={values?.budgetAmount}
            />
          )}
        </Field>
        <Field
          id={`${id}-currency`}
          label="Currency"
          error={errors.budgetCurrency}
        >
          {(props) => (
            <Select
              {...props}
              name="budgetCurrency"
              defaultValue={values?.budgetCurrency ?? "USD"}
            >
              {BUDGET_CURRENCIES.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </Select>
          )}
        </Field>
        <Field id={`${id}-pace`} label="Pace" error={errors.pace}>
          {(props) => (
            <Select
              {...props}
              name="pace"
              defaultValue={values?.pace ?? "balanced"}
            >
              {PACES.map((pace) => (
                <option key={pace} value={pace}>
                  {PACE_LABELS[pace]}
                </option>
              ))}
            </Select>
          )}
        </Field>
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-sm font-semibold">Interests</legend>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map((interest) => (
            <label
              key={interest}
              className={cn(
                "cursor-pointer rounded-full border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground",
                "has-checked:border-primary has-checked:bg-accent has-checked:text-accent-foreground",
                "has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring",
              )}
            >
              <input
                type="checkbox"
                name="interests"
                value={interest}
                defaultChecked={values?.interests.includes(interest)}
                className="sr-only"
              />
              {label(interest)}
            </label>
          ))}
        </div>
        {errors.interests ? (
          <p className="mt-1.5 text-xs text-danger">{errors.interests}</p>
        ) : null}
      </fieldset>

      <Field
        id={`${id}-notes`}
        label="Anything else? (optional)"
        error={errors.notes}
      >
        {(props) => (
          <textarea
            {...props}
            name="notes"
            rows={4}
            maxLength={MAX_NOTES_LENGTH}
            placeholder="e.g. Vegetarian, travelling with my parents, want one day trip out of the city"
            defaultValue={values?.notes}
            className="w-full rounded-xl border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 aria-invalid:border-danger"
          />
        )}
      </Field>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Button
          type="submit"
          size="lg"
          className="rounded-xl"
          disabled={pending}
        >
          {pending ? "Starting your plan…" : "Create my plan"}
        </Button>
        <p className="text-xs text-muted-foreground">
          Uses AI and takes about a minute. Flight options come from test data.
        </p>
      </div>
    </form>
  );
}
