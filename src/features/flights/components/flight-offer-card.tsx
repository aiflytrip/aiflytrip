import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getAirport } from "@/features/flights/data/airports";
import {
  arrivalDayOffset,
  formatDuration,
  formatMoney,
  formatTime,
  pluralize,
} from "@/features/flights/lib/format";
import {
  CABIN_LABELS,
  type FlightItinerary,
  type FlightOffer,
} from "@/features/flights/types";

export function FlightOfferCard({
  offer,
  travellers,
  highlight,
}: {
  offer: FlightOffer;
  travellers: number;
  highlight?: string;
}) {
  const airlines = [
    ...new Set(
      [...offer.outbound.segments, ...(offer.inbound?.segments ?? [])].map(
        (segment) => segment.airline.name,
      ),
    ),
  ];

  return (
    <Card className="flex flex-col md:flex-row">
      <div className="flex flex-1 flex-col gap-5 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold">{airlines.join(" · ")}</span>
          {highlight ? <Badge variant="success">{highlight}</Badge> : null}
        </div>
        <ItineraryRow label="Outbound" itinerary={offer.outbound} />
        {offer.inbound ? (
          <ItineraryRow label="Return" itinerary={offer.inbound} />
        ) : null}
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-border p-5 md:w-56 md:flex-col md:items-end md:justify-center md:border-t-0 md:border-l md:text-right">
        <div>
          <p className="text-2xl font-semibold">
            {formatMoney(offer.totalPrice)}
          </p>
          <p className="text-xs text-muted-foreground">
            {travellers > 1
              ? `${formatMoney(offer.pricePerTraveller)} per traveller`
              : "Total price"}
            {" · "}
            {CABIN_LABELS[offer.cabin]}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Button disabled aria-describedby={`${offer.id}-booking-note`}>
            Select
          </Button>
          <p
            id={`${offer.id}-booking-note`}
            className="text-xs text-muted-foreground"
          >
            Booking coming soon
          </p>
        </div>
      </div>
    </Card>
  );
}

function ItineraryRow({
  label,
  itinerary,
}: {
  label: string;
  itinerary: FlightItinerary;
}) {
  const first = itinerary.segments[0];
  const last = itinerary.segments.at(-1);
  if (!first || !last) return null;

  const from = getAirport(first.origin);
  const to = getAirport(last.destination);
  const fromZone = from?.timeZone ?? "UTC";
  const toZone = to?.timeZone ?? "UTC";
  const dayOffset = arrivalDayOffset(
    first.departAt,
    fromZone,
    last.arriveAt,
    toZone,
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
          {formatTime(first.departAt, fromZone)}
        </p>
        <p className="text-sm text-muted-foreground">{first.origin}</p>
      </div>

      <div className="flex flex-col items-center gap-1 text-center">
        <p className="text-xs text-muted-foreground">
          {formatDuration(itinerary.durationMinutes)}
        </p>
        <div aria-hidden="true" className="relative h-px w-full bg-border">
          {connections.map((code) => (
            <span
              key={code}
              className="absolute top-1/2 left-1/2 size-2 -translate-1/2 rounded-full border border-muted-foreground bg-card"
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          {itinerary.stops === 0
            ? "Nonstop"
            : `${pluralize(itinerary.stops, "stop")} · ${connections.join(", ")}`}
        </p>
      </div>

      <div className="text-right">
        <p className="text-lg font-semibold">
          {formatTime(last.arriveAt, toZone)}
          {dayOffset > 0 ? (
            <sup className="ml-0.5 text-xs font-medium text-primary">
              <span className="sr-only">arrives </span>+{dayOffset}
              <span className="sr-only"> day</span>
            </sup>
          ) : null}
        </p>
        <p className="text-sm text-muted-foreground">{last.destination}</p>
      </div>
    </div>
  );
}
