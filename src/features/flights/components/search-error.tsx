import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  FLIGHT_SEARCH_ERROR_RETRY,
  type FlightSearchErrorKind,
} from "@/features/flights/server/errors";
import { FLIGHT_MESSAGES, type FlightLocale } from "@/i18n/messages/flights";

/** Explains a failed search without exposing provider details. */
export function SearchError({
  kind,
  retryHref,
  locale = "en",
}: {
  kind: FlightSearchErrorKind;
  retryHref: string;
  locale?: FlightLocale;
}) {
  const t = FLIGHT_MESSAGES[locale];
  const message = t.errors[kind];

  return (
    <Card
      role="alert"
      className="flex flex-col items-center gap-3 p-10 text-center"
    >
      <p className="font-semibold">{message.title}</p>
      <p className="max-w-md text-sm text-muted-foreground">
        {message.description}
      </p>
      {FLIGHT_SEARCH_ERROR_RETRY[kind] ? (
        <ButtonLink
          href={retryHref}
          variant="secondary"
          scroll={false}
          prefetch={false}
        >
          {t.tryAgain}
        </ButtonLink>
      ) : null}
    </Card>
  );
}
