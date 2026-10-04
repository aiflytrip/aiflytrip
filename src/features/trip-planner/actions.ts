"use server";

import { after } from "next/server";
import { redirect } from "next/navigation";
import { z } from "zod";

import { getAirport } from "@/features/flights/data/airports";
import { toIsoDate } from "@/features/flights/lib/dates";
import { currencyDecimals } from "@/features/flights/lib/money";
import { parseFlightSearch } from "@/features/flights/lib/search-params";
import {
  GUEST_PLAN_LIMITS,
  PLAN_LIMITS,
} from "@/features/trip-planner/lib/limits";
import { PROMPT_VERSION } from "@/features/trip-planner/lib/prompt";
import {
  isPlanLanguage,
  parsePlanForm,
  type PlanFieldErrors,
  type PlanFormValues,
  type PlanRequest,
  type Interest,
  type Pace,
} from "@/features/trip-planner/lib/request";
import { PLANNER_MODEL } from "@/features/trip-planner/server/generate-plan";
import { runPlan } from "@/features/trip-planner/server/run-plan";
import { isAnthropicConfigured } from "@/server/anthropic/client";
import { getCurrentUser, type SessionUser } from "@/server/auth";
import { createAdminClient } from "@/server/supabase/admin";
import { createClient } from "@/server/supabase/server";

export type PlanFormState =
  | { status: "idle" }
  | {
      status: "error";
      message?: string;
      fieldErrors?: PlanFieldErrors;
      values?: PlanFormValues;
    };

type SupabaseClient = NonNullable<Awaited<ReturnType<typeof createClient>>>;

const SIGN_UP_TO_CONTINUE =
  "Create a free account to keep planning: it only takes a minute, and your plans stay with you.";

async function overLimit(
  supabase: SupabaseClient,
  guest: boolean,
): Promise<string | null> {
  const limits = guest ? GUEST_PLAN_LIMITS : PLAN_LIMITS;
  const since = (ms: number) => new Date(Date.now() - ms).toISOString();
  const [hour, day] = await Promise.all([
    supabase
      .from("travel_plans")
      .select("id", { count: "exact", head: true })
      .gte("created_at", since(3_600_000)),
    supabase
      .from("travel_plans")
      .select("id", { count: "exact", head: true })
      .gte("created_at", since(86_400_000)),
  ]);
  if (hour.error || day.error)
    return "Couldn't check your plan allowance. Please try again.";
  if (
    guest &&
    ((hour.count ?? 0) >= limits.perHour || (day.count ?? 0) >= limits.perDay)
  )
    return `You've used the free guest plans for now. ${SIGN_UP_TO_CONTINUE}`;
  if ((hour.count ?? 0) >= limits.perHour)
    return `You can create up to ${limits.perHour} plans per hour. Please try again later.`;
  if ((day.count ?? 0) >= limits.perDay)
    return `You've reached today's limit of ${limits.perDay} plans.`;
  if (guest) {
    // Site-wide ceiling on free guest plans (all plans today, via the
    // server-only admin client; counts only, no user data is read).
    const admin = createAdminClient();
    if (admin) {
      const { count, error } = await admin
        .from("travel_plans")
        .select("id", { count: "exact", head: true })
        .gte("created_at", since(86_400_000));
      if (!error && (count ?? 0) >= GUEST_PLAN_LIMITS.siteWidePerDay)
        return `The planner is very busy today. ${SIGN_UP_TO_CONTINUE}`;
    }
  }
  return null;
}

/**
 * The visitor's session, creating a guest (anonymous) session for a
 * signed-out visitor so they can plan without an account. Returns null when
 * guest sessions aren't enabled in Supabase.
 */
async function currentOrGuestUser(
  supabase: SupabaseClient,
): Promise<SessionUser | null> {
  const user = await getCurrentUser();
  if (user) return user;
  const { data, error } = await supabase.auth.signInAnonymously();
  if (error || !data.user) {
    if (error?.code !== "anonymous_provider_disabled")
      console.error("[planner] guest session failed", {
        code: error?.code,
        status: error?.status,
      });
    return null;
  }
  return { id: data.user.id, isAnonymous: true };
}

/** Inserts a pending plan and schedules generation after the response. */
async function startPlan(
  supabase: SupabaseClient,
  tripId: string,
  request: PlanRequest,
): Promise<string | null> {
  const { data, error } = await supabase
    .from("travel_plans")
    .insert({
      trip_id: tripId,
      status: "pending",
      prompt_version: PROMPT_VERSION,
      model: PLANNER_MODEL,
    })
    .select("id")
    .single();
  if (error || !data) {
    console.error("[planner] could not create plan", { code: error?.code });
    return null;
  }
  // after() keeps the request context, so runPlan writes with the user's session.
  after(() => runPlan(data.id, tripId, request));
  return data.id;
}

export async function createPlan(
  _prev: PlanFormState,
  formData: FormData,
): Promise<PlanFormState> {
  const supabase = await createClient();
  if (!supabase)
    return { status: "error", message: "The AI planner isn't available yet." };
  if (!isAnthropicConfigured())
    return { status: "error", message: "The AI planner isn't available yet." };

  const parsed = parsePlanForm(formData, toIsoDate(new Date()));
  if (!parsed.ok)
    return {
      status: "error",
      fieldErrors: parsed.errors,
      values: parsed.values,
    };

  const user = await currentOrGuestUser(supabase);
  if (!user)
    return {
      status: "error",
      message: `Please sign in to create a plan. ${SIGN_UP_TO_CONTINUE}`,
      values: parsed.values,
    };

  const limited = await overLimit(supabase, user.isAnonymous);
  if (limited)
    return { status: "error", message: limited, values: parsed.values };

  const { search, preferences } = parsed.request;
  const from = getAirport(search.origin);
  const to = getAirport(search.destination);

  const trip = await supabase
    .from("trips")
    .insert({
      title: `${from?.city ?? search.origin} to ${to?.city ?? search.destination}`,
      origin: search.origin,
      destination: search.destination,
      trip_type: "round_trip",
      depart_date: search.departDate,
      return_date: search.returnDate,
      adults: search.adults,
      cabin: search.cabin,
      status: "draft",
    })
    .select("id")
    .single();
  if (trip.error || !trip.data) {
    console.error("[planner] could not create trip", {
      code: trip.error?.code,
    });
    return {
      status: "error",
      message: "Couldn't save your trip. Please try again.",
      values: parsed.values,
    };
  }

  const prefs = await supabase.from("trip_preferences").insert({
    trip_id: trip.data.id,
    budget_minor:
      preferences.budgetAmount === null
        ? null
        : preferences.budgetAmount *
          10 ** currencyDecimals(preferences.budgetCurrency),
    budget_currency: preferences.budgetCurrency,
    interests: preferences.interests,
    pace: preferences.pace,
    notes: preferences.notes || null,
    language: preferences.language,
  });
  if (prefs.error)
    console.error("[planner] could not save preferences", {
      code: prefs.error.code,
    });

  const planId = await startPlan(supabase, trip.data.id, parsed.request);
  if (!planId)
    return {
      status: "error",
      message: "Couldn't start your plan. Please try again.",
      values: parsed.values,
    };
  redirect(`/plans/${planId}`);
}

const idSchema = z.uuid();

/** Starts a fresh plan for the same trip and preferences. */
export async function retryPlan(formData: FormData): Promise<void> {
  const planId = idSchema.safeParse(formData.get("planId"));
  const user = await getCurrentUser();
  const supabase = await createClient();
  if (!planId.success || !user || !supabase) redirect("/plans");
  if (
    !isAnthropicConfigured() ||
    (await overLimit(supabase, user!.isAnonymous))
  )
    redirect(`/plans/${planId.data}?retry=limited`);

  // RLS: these reads only return the user's own rows.
  const plan = await supabase
    .from("travel_plans")
    .select("trip_id")
    .eq("id", planId.data)
    .maybeSingle();
  if (!plan.data) redirect("/plans");
  const [trip, prefs] = await Promise.all([
    supabase
      .from("trips")
      .select("*")
      .eq("id", plan.data.trip_id)
      .maybeSingle(),
    supabase
      .from("trip_preferences")
      .select("*")
      .eq("trip_id", plan.data.trip_id)
      .maybeSingle(),
  ]);
  const t = trip.data;
  if (!t?.origin || !t.destination || !t.depart_date || !t.return_date)
    redirect(`/plans/${planId.data}`);

  // Re-validate: the dates may now be in the past.
  const search = parseFlightSearch(
    {
      trip: "round_trip",
      from: t.origin,
      to: t.destination,
      depart: t.depart_date,
      return: t.return_date,
      adults: String(t.adults),
      cabin: t.cabin,
    },
    toIsoDate(new Date()),
  );
  if (search.status !== "valid" || !search.search.returnDate)
    redirect(`/plans/${planId.data}?retry=expired`);

  const p = prefs.data;
  const currency = p?.budget_currency ?? "USD";
  const request: PlanRequest = {
    search: { ...search.search, returnDate: search.search.returnDate },
    preferences: {
      budgetAmount:
        p?.budget_minor == null
          ? null
          : Math.round(p.budget_minor / 10 ** currencyDecimals(currency)),
      budgetCurrency: currency,
      pace: (p?.pace ?? "balanced") as Pace,
      interests: (p?.interests ?? []) as Interest[],
      notes: p?.notes ?? "",
      language: isPlanLanguage(p?.language) ? p.language : "en",
    },
    tripDays:
      Math.round(
        (Date.parse(t.return_date) - Date.parse(t.depart_date)) / 86_400_000,
      ) + 1,
  };

  const newId = await startPlan(supabase, t.id, request);
  redirect(newId ? `/plans/${newId}` : `/plans/${planId.data}`);
}
