import Link from "next/link";

import {
  SORT_OPTIONS,
  STOPS_OPTIONS,
  withResultOptions,
  type ResultOptions,
} from "@/features/flights/lib/result-options";
import { FLIGHT_MESSAGES, type FlightLocale } from "@/i18n/messages/flights";
import { cn } from "@/lib/utils";

/**
 * Sorting and filtering as plain links: each option is a URL, so it works
 * without JavaScript and results stay shareable.
 */
export function ResultsToolbar({
  searchParams,
  options,
  locale = "en",
}: {
  searchParams: URLSearchParams;
  options: ResultOptions;
  locale?: FlightLocale;
}) {
  const t = FLIGHT_MESSAGES[locale];
  const href = (next: Partial<ResultOptions>) =>
    `${t.path}?${withResultOptions(searchParams, { ...options, ...next }).toString()}`;

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <OptionGroup
        label={t.toolbar.sortBy}
        items={SORT_OPTIONS.map((sort) => ({
          key: sort,
          label: t.toolbar.sorts[sort],
          href: href({ sort }),
          active: options.sort === sort,
        }))}
      />
      <OptionGroup
        label={t.toolbar.stops}
        items={STOPS_OPTIONS.map((stops) => ({
          key: stops,
          label: t.toolbar.stopOptions[stops],
          href: href({ stops }),
          active: options.stops === stops,
        }))}
      />
    </div>
  );
}

function OptionGroup({
  label,
  items,
}: {
  label: string;
  items: { key: string; label: string; href: string; active: boolean }[];
}) {
  return (
    <nav aria-label={label} className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      {items.map((item) => (
        <Link
          key={item.key}
          href={item.href}
          scroll={false}
          aria-current={item.active ? "true" : undefined}
          className={cn(
            "rounded-full border px-3 py-1 text-sm transition-colors",
            item.active
              ? "border-primary bg-accent font-medium text-accent-foreground"
              : "border-border bg-card text-muted-foreground hover:text-foreground",
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
