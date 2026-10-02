"use client";

import { useActionState, useId } from "react";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  updateProfile,
  type ProfileFormState,
} from "@/features/account/actions";
import { FormMessage } from "@/features/auth/components/form-message";

const INITIAL: ProfileFormState = { status: "idle" };

export function ProfileForm({
  fullName,
  homeAirport,
}: {
  fullName: string;
  homeAirport: string;
}) {
  const id = useId();
  const [state, formAction, pending] = useActionState(updateProfile, INITIAL);
  const error = state.status === "error" ? state : undefined;

  return (
    <form action={formAction} className="flex flex-col gap-4" noValidate>
      {error?.message ? <FormMessage>{error.message}</FormMessage> : null}
      {state.status === "saved" ? (
        <FormMessage tone="success">Profile saved.</FormMessage>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-[2fr_1fr]">
        <Field
          id={`${id}-name`}
          label="Name"
          error={error?.fieldErrors?.fullName}
        >
          {(props) => (
            <Input
              {...props}
              name="fullName"
              autoComplete="name"
              maxLength={120}
              defaultValue={fullName}
            />
          )}
        </Field>
        <Field
          id={`${id}-airport`}
          label="Home airport"
          error={error?.fieldErrors?.homeAirport}
        >
          {(props) => (
            <Input
              {...props}
              name="homeAirport"
              placeholder="e.g. JFK"
              maxLength={3}
              autoCapitalize="characters"
              className="uppercase"
              defaultValue={homeAirport}
            />
          )}
        </Field>
      </div>
      <Button type="submit" className="self-start" disabled={pending}>
        {pending ? "Saving…" : "Save profile"}
      </Button>
    </form>
  );
}
