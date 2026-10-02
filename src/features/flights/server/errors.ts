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

export const FLIGHT_SEARCH_ERROR_MESSAGES: Record<
  FlightSearchErrorKind,
  { title: string; description: string; canRetry: boolean }
> = {
  configuration: {
    title: "Flight search isn't set up yet",
    description:
      "The flight data provider is not configured on the server. If you run this site, check the flight provider settings in your environment variables.",
    canRetry: false,
  },
  rate_limited: {
    title: "Too many searches right now",
    description: "Please wait a minute and try again.",
    canRetry: true,
  },
  invalid_search: {
    title: "We couldn't search this route",
    description:
      "The flight provider couldn't process this search. Try different airports or dates.",
    canRetry: false,
  },
  unavailable: {
    title: "Flight search is temporarily unavailable",
    description:
      "We couldn't reach the flight provider. Please try again in a moment.",
    canRetry: true,
  },
};
