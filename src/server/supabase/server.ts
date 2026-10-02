import "server-only";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { supabasePublicConfig } from "@/lib/supabase/config";
import { type Database } from "@/lib/supabase/database.types";

/**
 * Supabase client for Server Components, Server Actions and Route Handlers.
 * Acts as the signed-in user (publishable key + session cookie), so Row
 * Level Security applies to every query.
 *
 * Create a new client per request; never store it in a module variable.
 * Returns undefined when Supabase isn't configured.
 */
export async function createClient() {
  if (!supabasePublicConfig) return undefined;
  const cookieStore = await cookies();

  return createServerClient<Database>(
    supabasePublicConfig.url,
    supabasePublicConfig.publishableKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch {
            // Server Components can't write cookies. That's fine: the proxy
            // refreshes the session and writes cookies on every request.
          }
        },
      },
    },
  );
}
