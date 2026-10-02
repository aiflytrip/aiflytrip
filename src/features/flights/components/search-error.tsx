import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  FLIGHT_SEARCH_ERROR_MESSAGES,
  type FlightSearchErrorKind,
} from "@/features/flights/server/errors";

/** Explains a failed search without exposing provider details. */
export function SearchError({
  kind,
  retryHref,
}: {
  kind: FlightSearchErrorKind;
  retryHref: string;
}) {
  const message = FLIGHT_SEARCH_ERROR_MESSAGES[kind];

  return (
    <Card
      role="alert"
      className="flex flex-col items-center gap-3 p-10 text-center"
    >
      <p className="font-semibold">{message.title}</p>
      <p className="max-w-md text-sm text-muted-foreground">
        {message.description}
      </p>
      {message.canRetry ? (
        <ButtonLink
          href={retryHref}
          variant="secondary"
          scroll={false}
          prefetch={false}
        >
          Try again
        </ButtonLink>
      ) : null}
    </Card>
  );
}
