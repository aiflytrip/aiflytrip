import "server-only";

import {
  mapDuffelOffer,
  toDuffelOfferRequest,
} from "@/features/flights/server/duffel/mapper";
import {
  FlightSearchError,
  type FlightSearchErrorKind,
} from "@/features/flights/server/errors";
import { type FlightSearchProvider } from "@/features/flights/server/provider";
import { type FlightOffer } from "@/features/flights/types";
import { DuffelApiError, type DuffelClient } from "@/server/duffel/client";
import { type DuffelOfferRequest } from "@/server/duffel/types";

/** How long Duffel waits on airlines. Their default is 20s; lower is snappier. */
const SUPPLIER_TIMEOUT_MS = 15_000;
/** Overall HTTP timeout; must exceed the supplier timeout. */
const REQUEST_TIMEOUT_MS = 25_000;

function classify(error: DuffelApiError): FlightSearchErrorKind {
  if (error.status === 401 || error.status === 403) return "configuration";
  if (error.status === 429) return "rate_limited";
  if (
    error.type === "validation_error" ||
    (error.type === "invalid_request_error" && error.status !== 404)
  ) {
    return "invalid_search";
  }
  return "unavailable";
}

export function createDuffelProvider(
  client: DuffelClient,
): FlightSearchProvider {
  return {
    source: { id: "duffel", name: "Duffel test mode", mode: "test" },

    async search(query, { signal } = {}) {
      let response: DuffelOfferRequest;
      try {
        response = await client.post<DuffelOfferRequest>(
          "/air/offer_requests",
          toDuffelOfferRequest(query),
          {
            query: {
              return_offers: "true",
              supplier_timeout: String(SUPPLIER_TIMEOUT_MS),
            },
            signal,
            timeoutMs: REQUEST_TIMEOUT_MS,
          },
        );
      } catch (error) {
        if (!(error instanceof DuffelApiError)) throw error;
        const kind = classify(error);
        // Log enough to debug with Duffel support; never the token or request body.
        console.error("[flights] Duffel search failed", {
          kind,
          status: error.status,
          type: error.type,
          code: error.code,
          requestId: error.requestId,
        });
        throw new FlightSearchError(kind, error.message, { cause: error });
      }

      if (response.live_mode) {
        // Defence in depth: env validation already rejects live tokens.
        throw new FlightSearchError(
          "configuration",
          "Duffel returned live-mode data, but only test mode is allowed",
        );
      }

      const offers: FlightOffer[] = [];
      let skipped = 0;
      for (const raw of response.offers ?? []) {
        const offer = mapDuffelOffer(raw, query);
        if (offer) offers.push(offer);
        else skipped++;
      }
      if (skipped > 0) {
        console.warn(`[flights] Skipped ${skipped} malformed Duffel offer(s)`, {
          offerRequestId: response.id,
        });
      }
      return offers;
    },
  };
}
