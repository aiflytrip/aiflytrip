"use client";

import Link from "next/link";
import { useActionState, useId } from "react";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signUp, type AuthFormState } from "@/features/auth/actions";
import { FormMessage } from "@/features/auth/components/form-message";
import { PASSWORD_RULES } from "@/features/auth/lib/validation";

const INITIAL: AuthFormState = { status: "idle" };

export function SignupForm({ next }: { next: string }) {
  const id = useId();
  const [state, formAction, pending] = useActionState(signUp, INITIAL);
  const error = state.status === "error" ? state : undefined;
  const passwordHintId = `${id}-password-hint`;

  return (
    <form action={formAction} className="flex flex-col gap-4" noValidate>
      <input type="hidden" name="next" value={next} />
      {error?.message ? <FormMessage>{error.message}</FormMessage> : null}

      <Field
        id={`${id}-name`}
        label="Name (optional)"
        error={error?.fieldErrors?.fullName}
      >
        {(props) => (
          <Input
            {...props}
            name="fullName"
            autoComplete="name"
            maxLength={120}
            defaultValue={error?.values.fullName}
          />
        )}
      </Field>
      <Field id={`${id}-email`} label="Email" error={error?.fieldErrors?.email}>
        {(props) => (
          <Input
            {...props}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            defaultValue={error?.values.email}
          />
        )}
      </Field>
      <Field
        id={`${id}-password`}
        label="Password"
        error={error?.fieldErrors?.password}
      >
        {(props) => (
          <Input
            {...props}
            aria-describedby={[props["aria-describedby"], passwordHintId]
              .filter(Boolean)
              .join(" ")}
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={8}
            maxLength={72}
            required
          />
        )}
      </Field>
      <p id={passwordHintId} className="-mt-2 text-xs text-muted-foreground">
        {PASSWORD_RULES}
      </p>

      <Button
        type="submit"
        size="lg"
        className="mt-2 rounded-xl"
        disabled={pending}
      >
        {pending ? "Creating account…" : "Create account"}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href={`/login?next=${encodeURIComponent(next)}`}
          className="font-medium text-primary hover:underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
