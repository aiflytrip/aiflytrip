import { createBrowserClient } from "@supabase/ssr";

import { supabasePublicConfig } from "@/lib/supabase/config";
import { type Database } from "@/lib/supabase/database.types";

/**
 * Supabase client for Client Components. Uses only the public publishable
 * key; every query is subject to Row Level Security as the signed-in user.
 * Prefer Server Components / Server Actions for data access, and use this
 * only for browser-only needs (e.g. realtime).
 */
export function createClient() {
  if (!supabasePublicConfig) {
    throw new Error("Supabase is not configured");
  }
  return createBrowserClient<Database>(
    supabasePublicConfig.url,
    supabasePublicConfig.publishableKey,
  );
}
