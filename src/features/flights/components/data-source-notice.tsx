import { type FlightDataSource } from "@/features/flights/types";
import { FLIGHT_MESSAGES, type FlightLocale } from "@/i18n/messages/flights";

/** Banner that makes it impossible to mistake test or sample results for real fares. */
export function DataSourceNotice({
  source,
  locale = "en",
}: {
  source: FlightDataSource;
  locale?: FlightLocale;
}) {
  if (source.mode === "live") return null;
  const t = FLIGHT_MESSAGES[locale].notice;
  const notice = t[source.mode];

  return (
    <div
      role="note"
      aria-label={t.ariaLabel(notice.title)}
      className="rounded-xl border border-border bg-accent px-4 py-3 text-sm text-accent-foreground"
    >
      <p>
        <span className="font-semibold">{notice.title}:</span> {notice.body}
      </p>
      <p className="mt-1 text-xs opacity-80">{t.source(source.name)}</p>
    </div>
  );
}
