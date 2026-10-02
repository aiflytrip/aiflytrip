import "server-only";

import { z } from "zod";

/**
 * Server-only configuration. Importing this module from a Client Component
 * fails the build ("server-only"), which is what keeps secrets out of the
 * browser bundle. Never prefix these variables with NEXT_PUBLIC_.
 */

export const FLIGHT_PROVIDERS = ["mock", "duffel"] as const;
export type FlightProviderId = (typeof FLIGHT_PROVIDERS)[number];

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
  })
  .superRefine((env, ctx) => {
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
