import Link from "next/link";

import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import {
  citiesOf,
  getCountry,
  isIndexable,
  type Entry,
} from "@/content/registry";
import { type Destination } from "@/content/schema";
import {
  BulletList,
  ContentSection,
  FaqList,
  PlannerCta,
  Prose,
  RelatedLinks,
  SourcesList,
} from "@/features/content/components/blocks";
import {
  destinationLinks,
  guideLinks,
  itineraryLinks,
  plannerHref,
} from "@/features/content/links";
import { Breadcrumbs, JsonLd } from "@/features/seo/components";
import {
  destinationLd,
  faqLd,
  graph,
  type Crumb,
} from "@/features/seo/json-ld";

export function destinationCrumbs(page: Entry<Destination>): Crumb[] {
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Destinations", path: "/destinations" },
  ];
  if (page.kind === "city" && page.country) {
    const country = getCountry(page.country);
    if (country) crumbs.push({ name: country.name, path: country.path });
  }
  crumbs.push({ name: page.name, path: page.path });
  return crumbs;
}

export function DestinationView({ page }: { page: Entry<Destination> }) {
  const cities = page.kind === "country" ? citiesOf(page.slug) : [];
  const parent =
    page.kind === "city" && page.country ? getCountry(page.country) : undefined;

  return (
    <Container className="flex max-w-5xl flex-col gap-12 py-10">
      {/* Only indexable pages advertise structured data. */}
      {isIndexable(page) ? (
        <JsonLd data={graph(destinationLd(page), faqLd(page.faqs))} />
      ) : null}
      <div className="flex flex-col gap-4">
        <Breadcrumbs crumbs={destinationCrumbs(page)} />
        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {page.headline}
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
          {page.intro}
        </p>
        {parent ? (
          <p className="text-sm text-muted-foreground">
            Part of our{" "}
            <Link href={parent.path} className="text-primary hover:underline">
              {parent.name} travel planning guide
            </Link>
            .
          </p>
        ) : null}
      </div>

      <ContentSection id="overview" title={`${page.name} at a glance`}>
        <Prose paragraphs={page.overview} />
      </ContentSection>

      {cities.length > 0 ? (
        <ContentSection id="cities" title={`City guides for ${page.name}`}>
          <ul className="grid gap-3 sm:grid-cols-2">
            {cities.map((city) => (
              <li key={city.path}>
                <Link
                  href={city.path}
                  className="block rounded-2xl border border-border bg-card p-4 hover:border-primary"
                >
                  <span className="font-medium">
                    Planning a trip to {city.name}
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {city.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </ContentSection>
      ) : null}

      <ContentSection id="best-time" title={`Best time to visit ${page.name}`}>
        <Prose paragraphs={[page.bestTime.summary]} />
        <div className="grid gap-3 sm:grid-cols-2">
          {page.bestTime.seasons.map((season) => (
            <Card key={season.name} className="p-4">
              <h3 className="font-semibold">
                {season.name}{" "}
                <span className="font-normal text-muted-foreground">
                  · {season.months}
                </span>
              </h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {season.notes}
              </p>
            </Card>
          ))}
        </div>
      </ContentSection>

      <ContentSection id="trip-length" title={`How many days in ${page.name}?`}>
        <Prose paragraphs={[page.tripLength.summary]} />
        <dl className="grid gap-3 sm:grid-cols-3">
          {page.tripLength.options.map((option) => (
            <Card key={option.days} className="p-4">
              <dt className="font-semibold">{option.days}</dt>
              <dd className="mt-1 text-sm leading-6 text-muted-foreground">
                {option.description}
              </dd>
            </Card>
          ))}
        </dl>
      </ContentSection>

      <ContentSection
        id="highlights"
        title={`Top things to see in ${page.name}`}
      >
        <ul className="grid gap-3 sm:grid-cols-2">
          {page.highlights.map((highlight) => (
            <li
              key={highlight.name}
              className="rounded-2xl border border-border bg-card p-4"
            >
              <h3 className="font-semibold">{highlight.name}</h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {highlight.description}
              </p>
            </li>
          ))}
        </ul>
      </ContentSection>

      <PlannerCta
        heading={`Turn this into your own ${page.name} itinerary`}
        body="Tell us your dates, budget, pace and interests, and our AI trip planner drafts a day-by-day plan with a flight suggestion and budget estimate."
        href={plannerHref(page)}
        placement="destination"
      />

      <ContentSection id="getting-around" title={`Getting around ${page.name}`}>
        <BulletList items={page.gettingAround} />
      </ContentSection>

      <ContentSection id="planning" title="Planning considerations">
        <dl className="flex max-w-3xl flex-col gap-4">
          {page.planning.map((item) => (
            <div key={item.topic}>
              <dt className="font-semibold">{item.topic}</dt>
              <dd className="mt-1 leading-7 text-foreground/90">
                {item.detail}
              </dd>
            </div>
          ))}
        </dl>
      </ContentSection>

      <ContentSection id="tips" title={`Tips for visiting ${page.name}`}>
        <BulletList items={page.tips} />
      </ContentSection>

      <FaqList faqs={page.faqs} />

      <RelatedLinks
        title="Ready-made itineraries"
        links={itineraryLinks(page.related.itineraries)}
      />
      <RelatedLinks
        title="Related destinations"
        links={destinationLinks(page.related.destinations)}
      />
      <RelatedLinks
        title="Travel planning guides"
        links={guideLinks(page.related.guides)}
      />

      <SourcesList sources={page.sources} lastReviewed={page.lastReviewed} />
    </Container>
  );
}
