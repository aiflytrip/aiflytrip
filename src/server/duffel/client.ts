import "server-only";

import { type DuffelErrorBody } from "@/server/duffel/types";

const BASE_URL = "https://api.duffel.com";
const API_VERSION = "v2";

/** A non-2xx response from Duffel, or a network/timeout failure (status 0). */
export class DuffelApiError extends Error {
  readonly status: number;
  readonly type?: string;
  readonly code?: string;
  readonly requestId?: string;

  constructor(
    message: string,
    details: {
      status: number;
      type?: string;
      code?: string;
      requestId?: string;
      cause?: unknown;
    },
  ) {
    super(message, { cause: details.cause });
    this.name = "DuffelApiError";
    this.status = details.status;
    this.type = details.type;
    this.code = details.code;
    this.requestId = details.requestId;
  }
}

export type DuffelClient = {
  post<T>(
    path: string,
    body: unknown,
    options?: {
      query?: Record<string, string>;
      signal?: AbortSignal;
      timeoutMs?: number;
    },
  ): Promise<T>;
};

/**
 * Minimal Duffel v2 HTTP client. The token is held in this closure and only
 * ever sent in the Authorization header; it's never logged or returned.
 */
export function createDuffelClient(
  accessToken: string,
  fetchImpl: typeof fetch = fetch,
): DuffelClient {
  return {
    async post<T>(
      path: string,
      body: unknown,
      options: {
        query?: Record<string, string>;
        signal?: AbortSignal;
        timeoutMs?: number;
      } = {},
    ): Promise<T> {
      const url = new URL(path, BASE_URL);
      for (const [key, value] of Object.entries(options.query ?? {})) {
        url.searchParams.set(key, value);
      }

      const timeout = AbortSignal.timeout(options.timeoutMs ?? 30_000);
      const signal = options.signal
        ? AbortSignal.any([options.signal, timeout])
        : timeout;

      let response: Response;
      try {
        response = await fetchImpl(url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Duffel-Version": API_VERSION,
            Accept: "application/json",
            "Accept-Encoding": "gzip",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: body }),
          signal,
          cache: "no-store",
        });
      } catch (cause) {
        const timedOut =
          cause instanceof DOMException && cause.name === "TimeoutError";
        throw new DuffelApiError(
          timedOut ? "Duffel request timed out" : "Duffel request failed",
          {
            status: 0,
            code: timedOut ? "timeout" : "network_error",
            cause,
          },
        );
      }

      const requestId = response.headers.get("x-request-id") ?? undefined;
      const json: unknown = await response.json().catch(() => undefined);

      if (!response.ok) {
        const error = (json as DuffelErrorBody | undefined)?.errors?.[0];
        throw new DuffelApiError(
          error?.message ?? `Duffel responded with ${response.status}`,
          {
            status: response.status,
            type: error?.type,
            code: error?.code,
            requestId:
              (json as DuffelErrorBody | undefined)?.meta?.request_id ??
              requestId,
          },
        );
      }

      const data = (json as { data?: T } | undefined)?.data;
      if (data === undefined) {
        throw new DuffelApiError("Duffel response had no data", {
          status: response.status,
          code: "malformed_response",
          requestId,
        });
      }
      return data;
    },
  };
}
