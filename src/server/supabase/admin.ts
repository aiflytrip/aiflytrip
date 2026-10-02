import "server-only";

import { createClient } from "@supabase/supabase-js";

import { supabasePublicConfig } from "@/lib/supabase/config";
import { type Database } from "@/lib/supabase/database.types";
import { getServerEnv } from "@/server/env";

/**
 * Supabase client using the SECRET key: it bypasses Row Level Security.
 *
 * Only for trusted server-side jobs that act on behalf of the system rather
 * than a user (e.g. payment provider webhooks writing `subscriptions` and
 * `payments`). Never call it with user-supplied ids without verifying them,
 * and never import it from Client Components (`server-only` enforces this).
 */
export function createAdminClient() {
  const env = getServerEnv();
  if (!env.ok)
    throw new Error(`Invalid server configuration: ${env.problems.join("; ")}`);
  const secretKey = env.env.SUPABASE_SECRET_KEY;
  if (!supabasePublicConfig || !secretKey) {
    throw new Error(
      "Supabase admin client requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY",
    );
  }

  return createClient<Database>(supabasePublicConfig.url, secretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}
