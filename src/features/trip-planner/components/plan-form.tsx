"use client";

import { useActionState, useId } from "react";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { FormMessage } from "@/features/auth/components/form-message";
import { useToday } from "@/features/flights/components/use-today";
import { AIRPORTS, formatAirportLabel } from "@/features/flights/data/airports";
import { CABIN_CLASSES, MAX_TRAVELLERS } from "@/features/flights/types";
import {
  createPlan,
  type PlanFormState,
} from "@/features/trip-planner/actions";
import {
  BUDGET_CURRENCIES,
  INTERESTS,
  MAX_NOTES_LENGTH,
  MAX_TRIP_DAYS,
  PACES,
  PLAN_LANGUAGE_LABELS,
  PLAN_LANGUAGES,
  type PlanLanguage,
} from "@/features/trip-planner/lib/request";
import { type Locale } from "@/i18n/config";
import {
  plannerMessages,
  translatePlannerError,
} from "@/i18n/messages/planner";
import { cn } from "@/lib/utils";

const INITIAL: PlanFormState = { status: "idle" };

/**
 * `initialDestination` prefills "To" (e.g. from a destination guide CTA);
 * `initialLanguage` preselects the plan language (e.g. from /es pages).
 */
export function PlanForm({
  initialDestination,
  initialLanguage,
  locale = "en",
}: {
  initialDestination?: string;
  initialLanguage?: PlanLanguage;
  /** Interface language; also the default plan language. */
  locale?: Locale;
} = {}) {
  const t = plannerMessages(locale).form;
  const tr = (message: string | undefined) =>
    message === undefined ? undefined : translatePlannerError(message, locale);
  const id = useId();
  const today = useToday();
  const [state, formAction, pending] = useActionState(createPlan, INITIAL);
  const error = state.status === "error" ? state : undefined;
  const values = error?.values;
  const errors = Object.fromEntries(
    Object.entries(error?.fieldErrors ?? {}).map(([k, v]) => [k, tr(v)]),
  ) as NonNullable<typeof error>["fieldErrors"] & object;
  const airportListId = `${id}-airports`;

  return (
    <form action={formAction} className="flex flex-col gap-6" noValidate>
      {error?.message ? <FormMessage>{tr(error.message)}</FormMessage> : null}

      <datalist id={airportListId}>
        {AIRPORTS.map((airport) => (
          <option key={airport.code} value={airport.code}>
            {`${formatAirportLabel(airport)}, ${airport.name}`}
          </option>
        ))}
      </datalist>

      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="mb-2 text-sm font-semibold">{t.whereWhen}</legend>
        <Field id={`${id}-from`} label={t.from} error={errors.origin}>
          {(props) => (
            <Input
              {...props}
              name="from"
              list={airportListId}
              placeholder={t.airportPlaceholder}
              autoComplete="off"
              required
              defaultValue={values?.origin}
            />
          )}
        </Field>
        <Field id={`${id}-to`} label={t.to} error={errors.destination}>
          {(props) => (
            <Input
              {...props}
              name="to"
              list={airportListId}
              placeholder={t.airportPlaceholder}
              autoComplete="off"
              required
              defaultValue={values?.destination ?? initialDestination}
            />
          )}
        </Field>
        <Field
          id={`${id}-depart`}
          label={t.departure}
          error={errors.departDate}
        >
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
          label={t.returnLabel(MAX_TRIP_DAYS)}
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
        <Field id={`${id}-adults`} label={t.travellers} error={errors.adults}>
          {(props) => (
            <Select
              {...props}
              name="adults"
              defaultValue={values?.adults ?? "1"}
            >
              {Array.from({ length: MAX_TRAVELLERS }, (_, i) => i + 1).map(
                (n) => (
                  <option key={n} value={n}>
                    {t.adults(n)}
                  </option>
                ),
              )}
            </Select>
          )}
        </Field>
        <Field id={`${id}-cabin`} label={t.cabin} error={errors.cabin}>
          {(props) => (
            <Select
              {...props}
              name="cabin"
              defaultValue={values?.cabin ?? "economy"}
            >
              {CABIN_CLASSES.map((cabin) => (
                <option key={cabin} value={cabin}>
                  {t.cabins[cabin]}
                </option>
              ))}
            </Select>
          )}
        </Field>
      </fieldset>

      <fieldset className="grid gap-4 sm:grid-cols-[1fr_auto_1fr]">
        <legend className="mb-2 text-sm font-semibold">{t.budgetPace}</legend>
        <Field id={`${id}-budget`} label={t.budget} error={errors.budgetAmount}>
          {(props) => (
            <Input
              {...props}
              name="budgetAmount"
              inputMode="numeric"
              placeholder={t.budgetPlaceholder}
              defaultValue={values?.budgetAmount}
            />
          )}
        </Field>
        <Field
          id={`${id}-currency`}
          label={t.currency}
          error={errors.budgetCurrency}
        >
          {(props) => (
            <Select
              {...props}
              name="budgetCurrency"
              defaultValue={
                values?.budgetCurrency ?? (locale === "en" ? "USD" : "EUR")
              }
            >
              {BUDGET_CURRENCIES.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </Select>
          )}
        </Field>
        <Field id={`${id}-pace`} label={t.pace} error={errors.pace}>
          {(props) => (
            <Select
              {...props}
              name="pace"
              defaultValue={values?.pace ?? "balanced"}
            >
              {PACES.map((pace) => (
                <option key={pace} value={pace}>
                  {t.paces[pace]}
                </option>
              ))}
            </Select>
          )}
        </Field>
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-sm font-semibold">{t.interests}</legend>
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
              {t.interestLabels[interest]}
            </label>
          ))}
        </div>
        {errors.interests ? (
          <p className="mt-1.5 text-xs text-danger">{errors.interests}</p>
        ) : null}
      </fieldset>

      <Field id={`${id}-language`} label={t.language} error={errors.language}>
        {(props) => (
          <Select
            {...props}
            name="language"
            defaultValue={values?.language ?? initialLanguage ?? locale}
            className="sm:max-w-xs"
          >
            {PLAN_LANGUAGES.map((language) => (
              <option key={language} value={language} lang={language}>
                {PLAN_LANGUAGE_LABELS[language]}
              </option>
            ))}
          </Select>
        )}
      </Field>

      <Field id={`${id}-notes`} label={t.notes} error={errors.notes}>
        {(props) => (
          <textarea
            {...props}
            name="notes"
            rows={4}
            maxLength={MAX_NOTES_LENGTH}
            placeholder={t.notesPlaceholder}
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
          {pending ? t.starting : t.submit}
        </Button>
        <p className="text-xs text-muted-foreground">{t.footnote}</p>
      </div>
    </form>
  );
}
