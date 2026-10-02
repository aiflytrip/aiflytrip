import "server-only";

import { redirect } from "next/navigation";
import { cache } from "react";

import { createClient } from "@/server/supabase/server";

export type SessionUser = {
  id: string;
  email?: string;
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
  };
});

/** Redirects to /login (then back to `returnTo`) when nobody is signed in. */
export async function requireUser(returnTo: string): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(returnTo)}`);
  return user;
}
