/**
 * Public Supabase configuration, safe for the browser. The publishable key
 * is designed to be public: Row Level Security, not secrecy, protects data.
 *
 * Read `process.env.NEXT_PUBLIC_*` with literal names only, so Next.js can
 * inline them into the client bundle at build time.
 */

export type SupabasePublicConfig = {
  url: string;
  publishableKey: string;
};

export type SupabaseConfigResult =
  | { status: "ok"; config: SupabasePublicConfig }
  | { status: "missing" }
  | { status: "invalid"; problem: string };

/** Decodes a legacy JWT-style key's role without verifying it. */
function legacyKeyRole(key: string): string | undefined {
  const payload = key.split(".")[1];
  if (!payload) return undefined;
  try {
    const json = JSON.parse(
      atob(payload.replace(/-/g, "+").replace(/_/g, "/")),
    ) as { role?: unknown };
    return typeof json.role === "string" ? json.role : undefined;
  } catch {
    return undefined;
  }
}

/** Pure validator, exported for tests. Never echoes key values. */
export function parseSupabasePublicConfig(
  url: string | undefined,
  key: string | undefined,
): SupabaseConfigResult {
  const trimmedUrl = url?.trim();
  const trimmedKey = key?.trim();
  if (!trimmedUrl && !trimmedKey) return { status: "missing" };
  if (!trimmedUrl || !trimmedKey) {
    return {
      status: "invalid",
      problem:
        "Set both NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
    };
  }

  let parsed: URL;
  try {
    parsed = new URL(trimmedUrl);
  } catch {
    return {
      status: "invalid",
      problem: "NEXT_PUBLIC_SUPABASE_URL must be an absolute URL",
    };
  }
  const isLocal = ["localhost", "127.0.0.1"].includes(parsed.hostname);
  if (parsed.protocol !== "https:" && !isLocal) {
    return {
      status: "invalid",
      problem: "NEXT_PUBLIC_SUPABASE_URL must use https",
    };
  }

  // Guard against the most damaging misconfiguration: a secret key in a
  // variable that is shipped to every browser.
  if (
    trimmedKey.startsWith("sb_secret_") ||
    legacyKeyRole(trimmedKey) === "service_role"
  ) {
    return {
      status: "invalid",
      problem:
        "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY contains a SECRET key. Use the publishable key, and rotate the secret key now",
    };
  }
  if (
    !trimmedKey.startsWith("sb_publishable_") &&
    legacyKeyRole(trimmedKey) !== "anon"
  ) {
    return {
      status: "invalid",
      problem:
        "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY must be a publishable key (sb_publishable_…)",
    };
  }

  return {
    status: "ok",
    config: { url: parsed.origin, publishableKey: trimmedKey },
  };
}

const result = parseSupabasePublicConfig(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
);

if (result.status === "invalid") {
  // Fail loudly: a half-configured auth system is worse than none.
  throw new Error(`Supabase configuration error: ${result.problem}`);
}

/** `undefined` when Supabase isn't configured; auth features then disable themselves. */
export const supabasePublicConfig: SupabasePublicConfig | undefined =
  result.status === "ok" ? result.config : undefined;

export const isSupabaseConfigured = supabasePublicConfig !== undefined;
