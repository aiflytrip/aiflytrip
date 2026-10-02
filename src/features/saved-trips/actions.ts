"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { searchTitle } from "@/features/flights/components/search-summary";
import { toIsoDate } from "@/features/flights/lib/dates";
import { formatDate } from "@/features/flights/lib/format";
import {
  parseFlightSearch,
  searchToParams,
} from "@/features/flights/lib/search-params";
import { type Json } from "@/lib/supabase/database.types";
import { getAccountUser } from "@/server/auth";
import { createClient } from "@/server/supabase/server";

export type SaveSearchState =
  | { status: "idle" }
  | { status: "saved" }
  | { status: "exists" }
  | { status: "error"; message: string };

const UNIQUE_VIOLATION = "23505";

function text(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

/** Saves the current /flights search for the signed-in user. Idempotent. */
export async function saveSearch(
  _prev: SaveSearchState,
  formData: FormData,
): Promise<SaveSearchState> {
  const user = await getAccountUser();
  const supabase = await createClient();
  if (!user || !supabase)
    return { status: "error", message: "Please sign in to save searches." };

  // Re-validate on the server: the hidden field is user-controlled.
  const raw = Object.fromEntries(
    new URLSearchParams(text(formData, "search").slice(0, 500)),
  );
  const parsed = parseFlightSearch(raw, toIsoDate(new Date()));
  if (parsed.status !== "valid")
    return { status: "error", message: "This search can't be saved." };

  const { search } = parsed;
  const dates = search.returnDate
    ? `${formatDate(search.departDate)} – ${formatDate(search.returnDate)}`
    : formatDate(search.departDate);

  const { error } = await supabase.from("saved_trips").insert({
    label: `${searchTitle(search)} · ${dates}`.slice(0, 120),
    search_key: searchToParams(search).toString(),
    search: search as unknown as Json,
  });

  if (error?.code === UNIQUE_VIOLATION) return { status: "exists" };
  if (error) {
    console.error("[saved-trips] save failed", { code: error.code });
    return {
      status: "error",
      message: "Couldn't save this search. Please try again.",
    };
  }
  revalidatePath("/account");
  return { status: "saved" };
}

const idSchema = z.uuid();

/** Deletes one of the user's saved searches. RLS blocks other users' rows. */
export async function deleteSavedSearch(formData: FormData): Promise<void> {
  const id = idSchema.safeParse(formData.get("id"));
  const supabase = await createClient();
  if (!id.success || !supabase || !(await getAccountUser())) return;

  const { error } = await supabase
    .from("saved_trips")
    .delete()
    .eq("id", id.data);
  if (error) console.error("[saved-trips] delete failed", { code: error.code });
  revalidatePath("/account");
}
