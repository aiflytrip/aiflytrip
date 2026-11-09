/**
 * Failure categories the results UI knows how to explain. Provider-specific
 * details (status codes, request ids) are logged server-side, never shown.
 */
export type FlightSearchErrorKind =
  /** Missing or invalid server configuration, e.g. no API token. */
  | "configuration"
  /** The provider asked us to slow down. */
  | "rate_limited"
  /** The provider rejected the search parameters. */
  | "invalid_search"
  /** Network failure, timeout or provider outage. */
  | "unavailable";

export class FlightSearchError extends Error {
  readonly kind: FlightSearchErrorKind;

  constructor(
    kind: FlightSearchErrorKind,
    message: string,
    options?: { cause?: unknown },
  ) {
    super(message, options);
    this.name = "FlightSearchError";
    this.kind = kind;
  }
}

/** Whether trying the same search again can help. Text is in FLIGHT_MESSAGES. */
export const FLIGHT_SEARCH_ERROR_RETRY: Record<FlightSearchErrorKind, boolean> =
  {
    configuration: false,
    rate_limited: true,
    invalid_search: false,
    unavailable: true,
  };
