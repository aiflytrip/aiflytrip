import type { Metadata } from "next";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import {
  getDestinationByPath,
  isIndexable,
  type Entry,
} from "@/content/registry";
import { type Itinerary } from "@/content/schema";
import {
  ContentSection,
  FaqList,
  PlannerCta,
  RelatedLinks,
  SourcesList,
} from "@/features/content/components/blocks";
import {
  guideLinks,
  itineraryLinks,
  plannerHref,
} from "@/features/content/links";
import { Breadcrumbs, JsonLd } from "@/features/seo/components";
import { faqLd, graph, itineraryLd, type Crumb } from "@/features/seo/json-ld";
import { pageMetadata } from "@/features/seo/metadata";
import { ogImagePath } from "@/features/seo/og-targets";
import { ITINERARY_COPY } from "@/i18n/pages/itineraries";
import { alternatesForPath, ROUTES } from "@/i18n/routes";

/** Metadata for an itinerary, with its other-language version. */
export function itineraryMetadata(page: Entry<Itinerary>): Metadata {
  return pageMetadata({
    title: page.title,
    description: page.description,
    path: page.path,
    type: "article",
    modifiedTime: page.lastReviewed,
    noindex: !isIndexable(page),
    image: ogImagePath(page.path),
    locale: page.locale,
    languages: alternatesForPath(page.path),
  });
}

export function itineraryCrumbs(page: Entry<Itinerary>): Crumb[] {
  const t = ITINERARY_COPY[page.locale];
  return [
    t.home,
    { name: t.hub.crumb, path: t.hub.path },
    { name: page.name, path: page.path },
  ];
}

export function ItineraryView({ page }: { page: Entry<Itinerary> }) {
  const t = ITINERARY_COPY[page.locale];
  const destination = getDestinationByPath(page.destination);

  return (
    <Container className="flex max-w-4xl flex-col gap-12 py-10">
      {isIndexable(page) ? (
        <JsonLd data={graph(itineraryLd(page), faqLd(page.faqs))} />
      ) : null}
      <div className="flex flex-col gap-4">
        <Breadcrumbs crumbs={itineraryCrumbs(page)} />
        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {page.headline}
        </h1>
        <p className="text-lg leading-8 text-muted-foreground">{page.intro}</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="accent">{t.days(page.days)}</Badge>
          {page.bestFor.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        {destination ? (
          <p className="text-sm text-muted-foreground">
            {t.page.newTo(destination.name)}{" "}
            <Link
              href={destination.path}
              className="text-primary hover:underline"
            >
              {t.page.guideLink(destination.name)}
            </Link>{" "}
            {t.page.newToEnd}
          </p>
        ) : null}
      </div>

      <ContentSection id="day-by-day" title={t.page.dayByDay}>
        <ol className="flex flex-col gap-4">
          {page.plan.map((day, index) => (
            <li key={day.title}>
              <Card className="p-5">
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  {t.page.day(index + 1)}
                </p>
                <h3 className="mt-1 text-lg font-semibold">{day.title}</h3>
                <dl className="mt-3 grid gap-3 text-sm leading-6 md:grid-cols-3">
                  {(
                    [
                      [t.page.morning, day.morning],
                      [t.page.afternoon, day.afternoon],
                      [t.page.evening, day.evening],
                    ] as const
                  ).map(([part, text]) => (
                    <div key={part}>
                      <dt className="font-medium">{part}</dt>
                      <dd className="mt-1 text-muted-foreground">{text}</dd>
                    </div>
                  ))}
                </dl>
                {day.tip ? (
                  <p className="mt-3 rounded-lg bg-muted px-3 py-2 text-sm">
                    {t.page.tip}: {day.tip}
                  </p>
                ) : null}
              </Card>
            </li>
          ))}
        </ol>
      </ContentSection>

      <ContentSection id="practical" title={t.page.practical}>
        <dl className="flex flex-col gap-4">
          {page.practicalNotes.map((note) => (
            <div key={note.title}>
              <dt className="font-semibold">{note.title}</dt>
              <dd className="mt-1 leading-7 text-foreground/90">
                {note.detail}
              </dd>
            </div>
          ))}
        </dl>
      </ContentSection>

      <PlannerCta
        heading={t.page.cta.heading}
        body={t.page.cta.body}
        href={
          destination
            ? plannerHref(destination, page.locale)
            : ROUTES.planner[page.locale]
        }
        placement="itinerary"
        buttonLabel={t.plannerButton}
      />

      <ContentSection id="adjustments" title={t.page.adjustments}>
        <dl className="flex flex-col gap-4">
          {page.adjustments.map((a) => (
            <div key={a.title}>
              <dt className="font-semibold">{a.title}</dt>
              <dd className="mt-1 leading-7 text-foreground/90">{a.detail}</dd>
            </div>
          ))}
        </dl>
      </ContentSection>

      <FaqList faqs={page.faqs} title={t.page.faqTitle} />

      <RelatedLinks
        title={t.page.more}
        links={itineraryLinks(page.related.itineraries, page.locale)}
      />
      <RelatedLinks
        title={t.page.guides}
        links={guideLinks(page.related.guides, page.locale)}
      />
      <SourcesList
        sources={page.sources}
        lastReviewed={page.lastReviewed}
        locale={page.locale}
      />
    </Container>
  );
}
