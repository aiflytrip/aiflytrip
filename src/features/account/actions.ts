"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getAccountUser } from "@/server/auth";
import { createClient } from "@/server/supabase/server";

export type ProfileFormState =
  | { status: "idle" }
  | { status: "saved" }
  | {
      status: "error";
      message?: string;
      fieldErrors?: Partial<Record<"fullName" | "homeAirport", string>>;
    };

const profileSchema = z.object({
  fullName: z.string().trim().max(120, "Name must be at most 120 characters"),
  homeAirport: z
    .string()
    .trim()
    .toUpperCase()
    .refine(
      (value) => value === "" || /^[A-Z]{3}$/.test(value),
      "Use a 3-letter airport code, e.g. JFK",
    ),
});

export async function updateProfile(
  _prev: ProfileFormState,
  formData: FormData,
): Promise<ProfileFormState> {
  const parsed = profileSchema.safeParse({
    fullName: formData.get("fullName") ?? "",
    homeAirport: formData.get("homeAirport") ?? "",
  });
  if (!parsed.success) {
    const fieldErrors: Partial<Record<"fullName" | "homeAirport", string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as "fullName" | "homeAirport";
      fieldErrors[field] ??= issue.message;
    }
    return { status: "error", fieldErrors };
  }

  const user = await getAccountUser();
  const supabase = await createClient();
  if (!user || !supabase)
    return {
      status: "error",
      message: "Your session has expired. Please sign in again.",
    };

  // Only the columns the DB grants to `authenticated` can be written; RLS
  // limits the update to the user's own row.
  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: parsed.data.fullName || null,
      home_airport: parsed.data.homeAirport || null,
    })
    .eq("id", user.id);

  if (error) {
    console.error("[account] profile update failed", { code: error.code });
    return {
      status: "error",
      message: "Couldn't save your profile. Please try again.",
    };
  }
  revalidatePath("/account");
  return { status: "saved" };
}
