import "server-only";

import { redirect } from "next/navigation";
import { cache } from "react";

import { createClient } from "@/server/supabase/server";

export type SessionUser = {
  id: string;
  email?: string;
  /**
   * A guest: a Supabase anonymous session created when a signed-out visitor
   * generates a plan. Guests can plan and view their own plans; paying,
   * the account page and saved searches require a real account. Signing up
   * converts the same user id, so plans carry over.
   */
  isAnonymous: boolean;
};

/**
 * The signed-in user for this request, or null. Uses getClaims(), which
 * verifies the session JWT; never trust getSession() on the server.
 * Cached per request so layouts and pages can both call it.
 */
export const getCurrentUser = cache(async (): Promise<SessionUser | null> => {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data, error } = await supabase.auth.getClaims();
  const claims = data?.claims;
  if (error || !claims?.sub) return null;

  return {
    id: claims.sub,
    email: typeof claims.email === "string" ? claims.email : undefined,
    isAnonymous: claims.is_anonymous === true,
  };
});

/** Signed in with a real account (not a guest session). */
export async function getAccountUser(): Promise<SessionUser | null> {
  const user = await getCurrentUser();
  return user && !user.isAnonymous ? user : null;
}

/** Like requireUser, but guests are sent to sign-up to create an account. */
export async function requireAccount(returnTo: string): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(returnTo)}`);
  if (user.isAnonymous)
    redirect(`/signup?next=${encodeURIComponent(returnTo)}`);
  return user;
}

/** Redirects to /login (then back to `returnTo`) when nobody is signed in. Guests pass. */
export async function requireUser(returnTo: string): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(returnTo)}`);
  return user;
}
