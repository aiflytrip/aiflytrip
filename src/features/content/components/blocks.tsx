import Link from "next/link";
import { type ReactNode } from "react";

import { Card } from "@/components/ui/card";
import { type Faq, type Source } from "@/content/schema";
import { PlannerCtaLink } from "@/features/analytics/planner-cta-link";
import { cn } from "@/lib/utils";

export function ContentSection({
  id,
  title,
  children,
  className,
}: {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      aria-labelledby={id}
      className={cn("flex flex-col gap-4", className)}
    >
      <h2 id={id} className="text-2xl font-semibold tracking-tight">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="flex max-w-3xl flex-col gap-4 leading-7 text-foreground/90">
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex max-w-3xl list-disc flex-col gap-2 pl-5 leading-7 text-foreground/90">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

/** Visible FAQ; pages pair this with FAQPage JSON-LD built from the same data. */
export function FaqList({
  faqs,
  headingId = "faq-heading",
}: {
  faqs: Faq[];
  headingId?: string;
}) {
  return (
    <ContentSection id={headingId} title="Frequently asked questions">
      <div className="flex flex-col gap-3">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-2xl border border-border bg-card p-5 open:shadow-sm"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 marker:hidden">
              <h3 className="text-base font-medium">{faq.question}</h3>
              <span
                aria-hidden="true"
                className="text-muted-foreground transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 leading-7 text-muted-foreground">{faq.answer}</p>
          </details>
        ))}
      </div>
    </ContentSection>
  );
}

export function SourcesList({
  sources,
  lastReviewed,
}: {
  sources: Source[];
  lastReviewed: string;
}) {
  const reviewed = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${lastReviewed}T00:00:00Z`));
  return (
    <section
      aria-labelledby="sources-heading"
      className="flex flex-col gap-3 rounded-2xl bg-muted p-5 text-sm"
    >
      <h2 id="sources-heading" className="font-semibold">
        Official sources and further reading
      </h2>
      <p className="text-muted-foreground">
        Practical details such as entry requirements, prices, timetables and
        opening days change. Always confirm them with the official sources below
        before you travel. Last reviewed by the{" "}
        <Link
          href="/editorial-policy"
          className="underline hover:text-foreground"
        >
          AIFlyTrip editorial team
        </Link>{" "}
        on <time dateTime={lastReviewed}>{reviewed}</time>.
      </p>
      <ul className="flex flex-col gap-1.5">
        {sources.map((source) => (
          <li key={source.url}>
            <a
              href={source.url}
              rel="noopener"
              target="_blank"
              className="text-primary hover:underline"
            >
              {source.label}
            </a>{" "}
            <span className="text-muted-foreground">({source.publisher})</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export type RelatedLink = { href: string; title: string; description?: string };

export function RelatedLinks({
  title,
  links,
}: {
  title: string;
  links: RelatedLink[];
}) {
  if (links.length === 0) return null;
  return (
    <section aria-label={title} className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold">{title}</h2>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="block h-full rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary"
            >
              <span className="font-medium">{link.title}</span>
              {link.description ? (
                <span className="mt-1 block text-sm text-muted-foreground">
                  {link.description}
                </span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Conversion block linking organic visitors to the planner. Honest about what it does. */
export function PlannerCta({
  heading,
  body,
  href = "/plan",
  placement = "content",
}: {
  heading: string;
  body: string;
  href?: string;
  placement?: string;
}) {
  return (
    <Card className="flex flex-col gap-4 bg-accent p-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="max-w-2xl">
        <p className="text-lg font-semibold text-accent-foreground">
          {heading}
        </p>
        <p className="mt-1 text-sm text-accent-foreground/90">{body}</p>
      </div>
      <PlannerCtaLink
        href={href}
        placement={placement}
        size="lg"
        className="shrink-0"
      >
        Create your personalized trip plan
      </PlannerCtaLink>
    </Card>
  );
}
