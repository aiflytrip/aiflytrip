import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  arrivalDayOffset,
  formatDuration,
  formatMoney,
  formatTime,
} from "@/features/flights/lib/format";
import {
  type FlightDataSource,
  type FlightItinerary,
  type FlightOffer,
} from "@/features/flights/types";
import {
  FLIGHT_MESSAGES,
  type FlightLocale,
  type FlightMessages,
} from "@/i18n/messages/flights";

export function FlightOfferCard({
  offer,
  travellers,
  highlight,
  sourceMode,
  locale = "en",
}: {
  offer: FlightOffer;
  travellers: number;
  highlight?: string;
  sourceMode: FlightDataSource["mode"];
  locale?: FlightLocale;
}) {
  const t = FLIGHT_MESSAGES[locale];
  const money = (m: FlightOffer["totalPrice"]) => formatMoney(m, t.intl);
  const segments = [
    ...offer.outbound.segments,
    ...(offer.inbound?.segments ?? []),
  ];
  const airlines = [
    ...new Set(segments.map((segment) => segment.airline.name)),
  ];
  // Operating carriers must be shown prominently (US DOT rule, per Duffel docs).
  const operatedBy = [
    ...new Set(
      segments.flatMap((segment) =>
        segment.operatingCarrier ? [segment.operatingCarrier.name] : [],
      ),
    ),
  ];
  const sourceBadge =
    sourceMode === "live" ? undefined : t.card.badges[sourceMode];
  const bookingNoteId = `${offer.id}-booking-note`;

  return (
    <Card className="flex flex-col md:flex-row">
      <div className="flex flex-1 flex-col gap-5 p-5">
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold">
              {airlines.join(" · ")}
            </span>
            {highlight ? <Badge variant="success">{highlight}</Badge> : null}
            {sourceBadge ? <Badge>{sourceBadge}</Badge> : null}
          </div>
          {operatedBy.length > 0 ? (
            <p className="text-xs text-muted-foreground">
              {t.card.operatedBy(operatedBy.join(", "))}
            </p>
          ) : null}
        </div>
        <ItineraryRow
          label={t.card.outbound}
          itinerary={offer.outbound}
          t={t}
        />
        {offer.inbound ? (
          <ItineraryRow
            label={t.card.inbound}
            itinerary={offer.inbound}
            t={t}
          />
        ) : null}
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-border p-5 md:w-56 md:flex-col md:items-end md:justify-center md:border-t-0 md:border-l md:text-right">
        <div>
          <p className="text-2xl font-semibold">{money(offer.totalPrice)}</p>
          <p className="text-xs text-muted-foreground">
            {travellers > 1
              ? t.card.perTraveller(money(offer.pricePerTraveller))
              : t.card.totalPrice}
            {" · "}
            {t.cabins[offer.cabin]}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Button disabled aria-describedby={bookingNoteId}>
            {t.card.select}
          </Button>
          <p id={bookingNoteId} className="text-xs text-muted-foreground">
            {t.card.bookingUnavailable}
          </p>
        </div>
      </div>
    </Card>
  );
}

function ItineraryRow({
  label,
  itinerary,
  t,
}: {
  label: string;
  itinerary: FlightItinerary;
  t: FlightMessages;
}) {
  const first = itinerary.segments[0];
  const last = itinerary.segments.at(-1);
  if (!first || !last) return null;

  const dayOffset = arrivalDayOffset(
    first.departAt,
    first.originTimeZone,
    last.arriveAt,
    last.destinationTimeZone,
  );
  const connections = itinerary.segments
    .slice(0, -1)
    .map((segment) => segment.destination);

  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-1">
      <p className="col-span-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </p>
      <div>
        <p className="text-lg font-semibold">
          {formatTime(first.departAt, first.originTimeZone, t.intl)}
        </p>
        <p className="text-sm text-muted-foreground">{first.origin}</p>
      </div>

      <div className="flex flex-col items-center gap-1 text-center">
        <p className="text-xs text-muted-foreground">
          {formatDuration(itinerary.durationMinutes)}
        </p>
        <div aria-hidden="true" className="relative h-px w-full bg-border">
          {connections.map((code, index) => (
            <span
              key={`${code}-${index}`}
              style={{
                left: `${((index + 1) / (connections.length + 1)) * 100}%`,
              }}
              className="absolute top-1/2 size-2 -translate-1/2 rounded-full border border-muted-foreground bg-card"
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          {itinerary.stops === 0
            ? t.card.nonstop
            : `${t.card.stops(itinerary.stops)} · ${connections.join(", ")}`}
        </p>
      </div>

      <div className="text-right">
        <p className="text-lg font-semibold">
          {formatTime(last.arriveAt, last.destinationTimeZone, t.intl)}
          {dayOffset > 0 ? (
            <sup className="ml-0.5 text-xs font-medium text-primary">
              <span className="sr-only">{t.card.arrives}</span>+{dayOffset}
              <span className="sr-only">{t.card.daysLater(dayOffset)}</span>
            </sup>
          ) : null}
        </p>
        <p className="text-sm text-muted-foreground">{last.destination}</p>
      </div>
    </div>
  );
}
