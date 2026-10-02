"use client";

import Link from "next/link";
import { useActionState, useId } from "react";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signIn, type AuthFormState } from "@/features/auth/actions";
import { FormMessage } from "@/features/auth/components/form-message";

const INITIAL: AuthFormState = { status: "idle" };

export function LoginForm({ next }: { next: string }) {
  const id = useId();
  const [state, formAction, pending] = useActionState(signIn, INITIAL);
  const error = state.status === "error" ? state : undefined;

  return (
    <form action={formAction} className="flex flex-col gap-4" noValidate>
      <input type="hidden" name="next" value={next} />
      {error?.message ? <FormMessage>{error.message}</FormMessage> : null}

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
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        )}
      </Field>

      <Button
        type="submit"
        size="lg"
        className="mt-2 rounded-xl"
        disabled={pending}
      >
        {pending ? "Signing in…" : "Sign in"}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        New to AIFlyTrip?{" "}
        <Link
          href={`/signup?next=${encodeURIComponent(next)}`}
          className="font-medium text-primary hover:underline"
        >
          Create an account
        </Link>
      </p>
    </form>
  );
}
