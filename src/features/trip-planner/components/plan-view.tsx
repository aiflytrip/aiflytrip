import Image from "next/image";
import { type ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { photoForAirport } from "@/content/data/photos";
import { PhotoCredit } from "@/features/content/components/photo-credit";
import { formatDate } from "@/features/flights/lib/format";
import {
  type FlightOptionSnapshot,
  type LegSnapshot,
} from "@/features/trip-planner/lib/flight-options";
import { type BUDGET_CATEGORIES } from "@/features/trip-planner/lib/plan-schema";
import { type StoredItinerary } from "@/features/trip-planner/lib/stored-plan";
import { cn } from "@/lib/utils";

type Category = (typeof BUDGET_CATEGORIES)[number];

const CATEGORY_LABELS: Record<Category, string> = {
  flights: "Flights",
  lodging: "Accommodation",
  food: "Food and drink",
  activities: "Activities",
  local_transport: "Local transport",
  other: "Other",
};

/** Bar colours; also differ in lightness so they're distinguishable without hue. */
const CATEGORY_COLORS: Record<Category, string> = {
  flights: "bg-sky-400",
  lodging: "bg-violet-400",
  food: "bg-amber-300",
  activities: "bg-emerald-400",
  local_transport: "bg-pink-400",
  other: "bg-slate-400",
};

const ICONS = {
  plane:
    "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z",
  morning:
    "M12 2v2M4.9 4.9l1.4 1.4M2 12h2M20 12h2M17.7 6.3l1.4-1.4M17 16a5 5 0 0 0-10 0M2 20h20M8 20l4-4 4 4",
  afternoon:
    "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4",
  evening: "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z",
  info: "M12 16v-4M12 8h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z",
  bag: "M6 7h12l1 14H5L6 7ZM9 7V5a3 3 0 0 1 6 0v2",
  bulb: "M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2Z",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10ZM9 12l2 2 4-4",
  calendar:
    "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z",
  wallet:
    "M3 7a2 2 0 0 1 2-2h13v4M3 7v10a2 2 0 0 0 2 2h15V9H5a2 2 0 0 1-2-2ZM16 14h.01",
  clock: "M12 6v6l4 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z",
} as const;

function Icon({
  name,
  className,
}: {
  name: keyof typeof ICONS;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-4.5 flex-none", className)}
    >
      <path d={ICONS[name]} />
    </svg>
  );
}

function money(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${amount.toLocaleString("en-US")} ${currency}`;
  }
}

/** "2026-11-16 7:05 AM local" -> time part only. */
const timeOf = (value: string) => value.replace(/^\d{4}-\d{2}-\d{2}\s+/, "");

function SectionTitle({
  id,
  icon,
  children,
}: {
  id: string;
  icon: keyof typeof ICONS;
  children: ReactNode;
}) {
  return (
    <h2
      id={id}
      className="flex items-center gap-2.5 text-xl font-bold text-white"
    >
      <span className="grid size-8 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
        <Icon name={icon} className="size-4" />
      </span>
      {children}
    </h2>
  );
}

/** One leg as a route graphic: codes, dashed arc, times and stops. */
function RouteLeg({ label, leg }: { label: string; leg: LegSnapshot }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-white/[0.07] bg-background/50 p-4">
      <p className="eyebrow text-[11px]">{label}</p>
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
        <div>
          <div className="font-mono text-2xl text-white">{leg.from}</div>
          <div className="text-xs text-muted-foreground">
            {timeOf(leg.departs)}
          </div>
        </div>
        <div className="relative flex flex-col items-center">
          <svg viewBox="0 0 200 40" className="h-10 w-full" aria-hidden="true">
            <path
              d="M6 34 Q100 -10 194 34"
              fill="none"
              stroke="rgb(255 255 255 / 0.15)"
              strokeWidth="2"
            />
            <path
              className="animate-route"
              d="M6 34 Q100 -10 194 34"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="2"
              strokeDasharray="5 12"
              strokeLinecap="round"
            />
          </svg>
          <span className="-mt-1 text-[11px] text-muted-foreground">
            {leg.duration} ·{" "}
            {leg.stops === 0
              ? "nonstop"
              : `${leg.stops} stop${leg.stops === 1 ? "" : "s"} via ${leg.via.join(", ")}`}
          </span>
        </div>
        <div className="text-right">
          <div className="font-mono text-2xl text-white">{leg.to}</div>
          <div className="text-xs text-muted-foreground">
            {timeOf(leg.arrives)}
          </div>
        </div>
      </div>
      {leg.segments && leg.segments.length > 0 ? (
        <ul className="flex flex-wrap gap-2 text-xs">
          {leg.segments.map((segment) => (
            <li
              key={`${segment.flightNumber}-${segment.departs}`}
              className="rounded-lg bg-white/[0.06] px-2.5 py-1 font-mono text-muted-foreground"
            >
              {segment.flightNumber} · {segment.from}→{segment.to}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function FlightCard({
  option,
  sourceMode,
}: {
  option: FlightOptionSnapshot;
  sourceMode?: string;
}) {
  return (
    <div className="glass flex flex-col gap-4 rounded-3xl p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-semibold text-white">
          {option.airlines.join(" · ")}
        </span>
        {sourceMode && sourceMode !== "live" ? (
          <Badge>{sourceMode === "test" ? "Test data" : "Sample data"}</Badge>
        ) : null}
        <span className="ml-auto font-display text-xl font-bold text-white">
          {option.price}
        </span>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <RouteLeg label="Outbound" leg={option.outbound} />
        {option.inbound ? (
          <RouteLeg label="Return" leg={option.inbound} />
        ) : null}
      </div>
    </div>
  );
}

/** A flight marker on the timeline (outbound at the top, return at the bottom). */
function FlightMarker({ label, leg }: { label: string; leg: LegSnapshot }) {
  return (
    <li className="relative pl-12">
      <span className="absolute top-1 left-0 grid size-9 place-items-center rounded-full bg-linear-to-br from-primary to-violet text-primary-foreground shadow-[0_0_0_6px_var(--background)]">
        <Icon name="plane" className="size-4" />
      </span>
      <p className="text-sm font-semibold text-white">
        {label}: {leg.from} → {leg.to}
      </p>
      <p className="text-xs text-muted-foreground">
        Departs {leg.departs} · arrives {leg.arrives}
      </p>
    </li>
  );
}

const SLOTS = [
  { key: "morning", label: "Morning", icon: "morning", tint: "text-amber-300" },
  {
    key: "afternoon",
    label: "Afternoon",
    icon: "afternoon",
    tint: "text-sky-300",
  },
  {
    key: "evening",
    label: "Evening",
    icon: "evening",
    tint: "text-violet-300",
  },
] as const;

export function PlanView({ itinerary }: { itinerary: StoredItinerary }) {
  const { plan, flightOptions, flightSource } = itinerary;
  const recommended = flightOptions.find(
    (option) => option.id === plan.flight.recommended_offer_id,
  );
  const total = plan.budget.items.reduce((sum, item) => sum + item.amount, 0);
  const largest = Math.max(1, ...plan.budget.items.map((item) => item.amount));
  const photo = photoForAirport(recommended?.outbound.to);

  const stats: { icon: keyof typeof ICONS; label: string; value: string }[] = [
    {
      icon: "calendar",
      label: "Trip length",
      value: `${plan.days.length} day${plan.days.length === 1 ? "" : "s"}`,
    },
    {
      icon: "wallet",
      label: "Estimated budget",
      value: money(total, plan.budget.currency),
    },
    ...(recommended
      ? [
          {
            icon: "clock" as const,
            label: "Outbound flight",
            value: `${recommended.outbound.duration}, ${recommended.outbound.stops === 0 ? "nonstop" : `${recommended.outbound.stops} stop`}`,
          },
        ]
      : []),
  ];

  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col gap-2">
        <div className="relative flex min-h-72 flex-col justify-end gap-3 overflow-hidden rounded-[28px] border border-white/10 bg-linear-to-br from-primary/25 via-background to-violet/25 p-6 sm:min-h-80 sm:p-9">
          {photo ? (
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              preload
              sizes="(min-width: 1024px) 900px, 100vw"
              className="object-cover"
            />
          ) : (
            <div aria-hidden="true" className="bg-grid absolute inset-0" />
          )}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-background via-background/70 to-background/10"
          />
          <div className="relative flex flex-wrap gap-2">
            <Badge variant="accent">AI-generated plan</Badge>
            {flightSource && flightSource.mode !== "live" ? (
              <Badge>Flights: {flightSource.name}</Badge>
            ) : null}
          </div>
          <h1 className="relative text-3xl font-bold text-balance text-white sm:text-4xl">
            {plan.title}
          </h1>
          <p className="relative max-w-3xl text-pretty text-white/85">
            {plan.summary}
          </p>
        </div>
        {photo ? <PhotoCredit photo={photo} className="px-2" /> : null}
      </header>

      <dl className="grid gap-3 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="glass flex items-center gap-3.5 rounded-2xl p-4"
          >
            <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
              <Icon name={stat.icon} />
            </span>
            <div className="min-w-0">
              <dt className="text-xs text-muted-foreground">{stat.label}</dt>
              <dd className="truncate font-semibold text-white">
                {stat.value}
              </dd>
            </div>
          </div>
        ))}
      </dl>

      <section aria-labelledby="flight-heading" className="flex flex-col gap-4">
        <SectionTitle id="flight-heading" icon="plane">
          Suggested flight
        </SectionTitle>
        {recommended ? (
          <FlightCard option={recommended} sourceMode={flightSource?.mode} />
        ) : (
          <p className="text-sm text-muted-foreground">
            No flight was recommended.
          </p>
        )}
        <p className="text-sm leading-relaxed text-foreground/90">
          {plan.flight.rationale}
        </p>
        <p className="text-xs text-muted-foreground">
          Flight options are from a test environment: schedules and prices
          aren&apos;t real and can&apos;t be booked.
        </p>
      </section>

      <section aria-labelledby="days-heading" className="flex flex-col gap-5">
        <SectionTitle id="days-heading" icon="calendar">
          Day by day
        </SectionTitle>
        <ol className="relative flex flex-col gap-6 before:absolute before:top-2 before:bottom-2 before:left-[17px] before:w-px before:bg-linear-to-b before:from-primary/60 before:via-violet/40 before:to-primary/10">
          {recommended ? (
            <FlightMarker label="Outbound flight" leg={recommended.outbound} />
          ) : null}
          {plan.days.map((day, index) => (
            <li key={day.date} className="reveal relative pl-12">
              <span className="absolute top-4 left-0 grid size-9 place-items-center rounded-full border border-primary/40 bg-card font-mono text-xs text-primary shadow-[0_0_0_6px_var(--background)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="glass lift rounded-3xl p-5 sm:p-6">
                <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
                  Day {index + 1} · {formatDate(day.date)}
                </p>
                <h3 className="mt-1.5 text-lg font-semibold text-white">
                  {day.title}
                </h3>
                <dl className="mt-4 grid gap-3 md:grid-cols-3">
                  {SLOTS.map((slot) => (
                    <div
                      key={slot.key}
                      className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3.5"
                    >
                      <dt
                        className={cn(
                          "flex items-center gap-2 text-sm font-semibold",
                          slot.tint,
                        )}
                      >
                        <Icon name={slot.icon} className="size-4" />
                        {slot.label}
                      </dt>
                      <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {day[slot.key]}
                      </dd>
                    </div>
                  ))}
                </dl>
                {day.note ? (
                  <p className="mt-3 flex items-start gap-2 rounded-xl border border-primary/20 bg-primary/[0.07] px-3 py-2.5 text-sm text-accent-foreground">
                    <Icon name="info" className="mt-0.5 size-4" />
                    {day.note}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
          {recommended?.inbound ? (
            <FlightMarker label="Return flight" leg={recommended.inbound} />
          ) : null}
        </ol>
      </section>

      <section aria-labelledby="budget-heading" className="flex flex-col gap-4">
        <SectionTitle id="budget-heading" icon="wallet">
          Estimated budget
        </SectionTitle>
        <div className="glass rounded-3xl p-5 sm:p-6">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <p className="text-sm text-muted-foreground">Estimated total</p>
            <p className="font-display text-3xl font-bold text-white tabular-nums">
              {money(total, plan.budget.currency)}
            </p>
          </div>
          {total > 0 ? (
            <div
              aria-hidden="true"
              className="mt-4 flex h-3 overflow-hidden rounded-full bg-white/[0.06]"
            >
              {plan.budget.items.map((item, i) => (
                <span
                  key={`${item.category}-${i}`}
                  className={CATEGORY_COLORS[item.category]}
                  style={{ width: `${(item.amount / total) * 100}%` }}
                />
              ))}
            </div>
          ) : null}
          <ul className="mt-5 flex flex-col gap-4">
            {plan.budget.items.map((item, i) => (
              <li key={`${item.category}-${i}`}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="flex items-center gap-2 text-sm font-semibold text-white">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "size-2.5 rounded-full",
                        CATEGORY_COLORS[item.category],
                      )}
                    />
                    {CATEGORY_LABELS[item.category]}
                  </span>
                  <span className="text-sm font-semibold whitespace-nowrap text-white tabular-nums">
                    {money(item.amount, plan.budget.currency)}
                  </span>
                </div>
                <div
                  aria-hidden="true"
                  className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]"
                >
                  <div
                    className={cn(
                      "h-full rounded-full",
                      CATEGORY_COLORS[item.category],
                    )}
                    style={{
                      width: `${Math.max(2, (item.amount / largest) * 100)}%`,
                    }}
                  />
                </div>
                {item.note ? (
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    {item.note}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs text-muted-foreground">
            {plan.budget.notes} All amounts are rough estimates.
          </p>
        </div>
      </section>

      <div className="grid gap-5 md:grid-cols-3">
        {(
          [
            ["Packing list", plan.packing_list, "bag"],
            ["Tips", plan.tips, "bulb"],
            ["Check before you go", plan.caveats, "shield"],
          ] as const
        ).map(([heading, items, icon]) =>
          items.length > 0 ? (
            <section
              key={heading}
              className="glass reveal flex flex-col gap-4 rounded-3xl p-5"
            >
              <h2 className="flex items-center gap-2.5 text-lg font-bold text-white">
                <span className="grid size-8 place-items-center rounded-xl bg-violet/10 text-violet">
                  <Icon name={icon} className="size-4" />
                </span>
                {heading}
              </h2>
              <ul className="flex flex-col gap-2.5 text-sm">
                {items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-foreground/90"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 size-1.5 flex-none rounded-full bg-primary"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ) : null,
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Created with AI. It can make mistakes: check opening hours, prices and
        entry requirements with official sources before you travel.
      </p>
    </article>
  );
}
