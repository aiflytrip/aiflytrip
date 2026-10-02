"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { siteConfig } from "@/config/site";
import { authErrorMessage } from "@/features/auth/lib/errors";
import {
  fieldErrorsFrom,
  safeNextPath,
  signInSchema,
  signUpSchema,
  type FieldErrors,
} from "@/features/auth/lib/validation";
import { createClient } from "@/server/supabase/server";

export type AuthFormState =
  | { status: "idle" }
  | {
      status: "error";
      message?: string;
      fieldErrors?: FieldErrors;
      /** Echoed back so the form keeps what the user typed (never the password). */
      values: { email: string; fullName?: string };
    };

const NOT_CONFIGURED = "Accounts aren't available yet. Please try again later.";

function text(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export async function signIn(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const values = { email: text(formData, "email") };
  const parsed = signInSchema.safeParse({
    email: values.email,
    password: text(formData, "password"),
  });
  if (!parsed.success) {
    return {
      status: "error",
      fieldErrors: fieldErrorsFrom(parsed.error),
      values,
    };
  }

  const supabase = await createClient();
  if (!supabase) return { status: "error", message: NOT_CONFIGURED, values };

  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) {
    if (error.code !== "invalid_credentials") {
      console.error("[auth] sign-in failed", {
        code: error.code,
        status: error.status,
      });
    }
    return { status: "error", message: authErrorMessage(error), values };
  }

  revalidatePath("/", "layout");
  redirect(safeNextPath(formData.get("next")));
}

export async function signUp(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const values = {
    email: text(formData, "email"),
    fullName: text(formData, "fullName"),
  };
  const parsed = signUpSchema.safeParse({
    ...values,
    password: text(formData, "password"),
  });
  if (!parsed.success) {
    return {
      status: "error",
      fieldErrors: fieldErrorsFrom(parsed.error),
      values,
    };
  }

  const supabase = await createClient();
  if (!supabase) return { status: "error", message: NOT_CONFIGURED, values };

  const next = safeNextPath(formData.get("next"));
  const confirmUrl = new URL("/auth/confirm", siteConfig.url);
  confirmUrl.searchParams.set("next", next);

  // A guest (anonymous session) converts in place: same user id, so their
  // plans carry over. Supabase emails a confirmation link for the address.
  const { data: claims } = await supabase.auth.getClaims();
  if (claims?.claims?.is_anonymous === true) {
    const { error } = await supabase.auth.updateUser(
      {
        email: parsed.data.email,
        password: parsed.data.password,
        data: parsed.data.fullName
          ? { full_name: parsed.data.fullName }
          : undefined,
      },
      { emailRedirectTo: confirmUrl.toString() },
    );
    if (error) {
      console.error("[auth] guest upgrade failed", {
        code: error.code,
        status: error.status,
      });
      return { status: "error", message: authErrorMessage(error), values };
    }
    if (parsed.data.fullName) {
      // The profile row was created for the guest; keep its name in sync.
      await supabase
        .from("profiles")
        .update({ full_name: parsed.data.fullName })
        .eq("id", claims.claims.sub);
    }
    redirect("/signup/check-email");
  }

  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      emailRedirectTo: confirmUrl.toString(),
      // Display-only metadata; copied into public.profiles by a DB trigger.
      data: parsed.data.fullName
        ? { full_name: parsed.data.fullName }
        : undefined,
    },
  });
  if (error) {
    console.error("[auth] sign-up failed", {
      code: error.code,
      status: error.status,
    });
    return { status: "error", message: authErrorMessage(error), values };
  }

  // With email confirmation off, Supabase signs the user in immediately.
  if (data.session) {
    revalidatePath("/", "layout");
    redirect(next);
  }
  redirect("/signup/check-email");
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  if (supabase) {
    const { error } = await supabase.auth.signOut();
    if (error)
      console.error("[auth] sign-out failed", {
        code: error.code,
        status: error.status,
      });
  }
  revalidatePath("/", "layout");
  redirect("/");
}
