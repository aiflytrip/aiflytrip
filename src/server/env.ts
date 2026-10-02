import "server-only";

import { z } from "zod";

/**
 * Server-only configuration. Importing this module from a Client Component
 * fails the build ("server-only"), which is what keeps secrets out of the
 * browser bundle. Never prefix these variables with NEXT_PUBLIC_.
 */

export const FLIGHT_PROVIDERS = ["mock", "duffel"] as const;
export type FlightProviderId = (typeof FLIGHT_PROVIDERS)[number];

/** Legacy JWT-style service_role key, decoded without verification. */
function isLegacyServiceRoleKey(key: string): boolean {
  const payload = key.split(".")[1];
  if (!payload) return false;
  try {
    const json = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as {
      role?: unknown;
    };
    return json.role === "service_role";
  } catch {
    return false;
  }
}

/** Phase 3 is restricted to Duffel's sandbox; live tokens are refused. */
export const DUFFEL_TEST_TOKEN_PREFIX = "duffel_test_";

const serverEnvSchema = z
  .object({
    FLIGHTS_PROVIDER: z
      .enum(
        FLIGHT_PROVIDERS,
        `FLIGHTS_PROVIDER must be one of: ${FLIGHT_PROVIDERS.join(", ")}`,
      )
      .default("mock"),
    DUFFEL_ACCESS_TOKEN: z
      .string()
      .trim()
      .optional()
      .transform((value) => value || undefined),
    // Supabase secret key (bypasses Row Level Security). Optional: only
    // trusted server jobs such as payment webhooks need it.
    SUPABASE_SECRET_KEY: z
      .string()
      .trim()
      .optional()
      .transform((value) => value || undefined),
    // Claude API key for the AI trip planner. Optional: the planner shows
    // "not available" without it. Never prefix with NEXT_PUBLIC_.
    ANTHROPIC_API_KEY: z
      .string()
      .trim()
      .optional()
      .transform((value) => value || undefined)
      .refine(
        (value) => value === undefined || value.startsWith("sk-ant-"),
        "ANTHROPIC_API_KEY must be an Anthropic API key (sk-ant-…)",
      ),
  })
  .superRefine((env, ctx) => {
    const secret = env.SUPABASE_SECRET_KEY;
    if (
      secret &&
      !secret.startsWith("sb_secret_") &&
      !isLegacyServiceRoleKey(secret)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["SUPABASE_SECRET_KEY"],
        message:
          "SUPABASE_SECRET_KEY must be a Supabase secret key (sb_secret_…)",
      });
    }
    if (env.FLIGHTS_PROVIDER !== "duffel") return;
    if (!env.DUFFEL_ACCESS_TOKEN) {
      ctx.addIssue({
        code: "custom",
        path: ["DUFFEL_ACCESS_TOKEN"],
        message: "DUFFEL_ACCESS_TOKEN is required when FLIGHTS_PROVIDER=duffel",
      });
    } else if (!env.DUFFEL_ACCESS_TOKEN.startsWith(DUFFEL_TEST_TOKEN_PREFIX)) {
      ctx.addIssue({
        code: "custom",
        path: ["DUFFEL_ACCESS_TOKEN"],
        message: `Only Duffel test tokens (${DUFFEL_TEST_TOKEN_PREFIX}…) are allowed in this phase`,
      });
    }
  });

export type ServerEnv = z.infer<typeof serverEnvSchema>;

export type ServerEnvResult =
  { ok: true; env: ServerEnv } | { ok: false; problems: string[] };

/** Pure parser, exported for tests. Never includes secret values in messages. */
export function parseServerEnv(
  source: Record<string, string | undefined>,
): ServerEnvResult {
  const result = serverEnvSchema.safeParse({
    FLIGHTS_PROVIDER: source.FLIGHTS_PROVIDER?.trim() || undefined,
    DUFFEL_ACCESS_TOKEN: source.DUFFEL_ACCESS_TOKEN,
    SUPABASE_SECRET_KEY: source.SUPABASE_SECRET_KEY,
    ANTHROPIC_API_KEY: source.ANTHROPIC_API_KEY,
  });
  return result.success
    ? { ok: true, env: result.data }
    : {
        ok: false,
        problems: result.error.issues.map((issue) => issue.message),
      };
}

let cached: ServerEnvResult | undefined;

/**
 * Reads and validates server env once per process. Validation is lazy (on
 * first use, not at import) so `next build` works without secrets present.
 */
export function getServerEnv(): ServerEnvResult {
  cached ??= parseServerEnv(process.env);
  return cached;
}
