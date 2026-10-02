import "server-only";

import Anthropic from "@anthropic-ai/sdk";

import { getServerEnv } from "@/server/env";

let client: Anthropic | undefined;

/**
 * Server-only Claude API client, or undefined when ANTHROPIC_API_KEY isn't
 * set. The key never leaves the server: this module imports "server-only".
 */
export function getAnthropicClient(): Anthropic | undefined {
  if (client) return client;
  const env = getServerEnv();
  if (!env.ok || !env.env.ANTHROPIC_API_KEY) return undefined;

  client = new Anthropic({
    apiKey: env.env.ANTHROPIC_API_KEY,
    // SDK retries 408/409/429/5xx and connection errors with backoff.
    maxRetries: 2,
    // Milliseconds. A plan is one streamed request; this bounds a stuck call.
    timeout: 180_000,
  });
  return client;
}

export function isAnthropicConfigured(): boolean {
  const env = getServerEnv();
  return env.ok && Boolean(env.env.ANTHROPIC_API_KEY);
}
