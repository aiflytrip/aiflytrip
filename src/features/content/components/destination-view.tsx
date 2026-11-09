import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import {
  citiesOf,
  getCountry,
  isIndexable,
  type Entry,
} from "@/content/registry";
import { destinationPhoto, photoKey } from "@/content/data/photos";
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
import { PhotoCredit } from "@/features/content/components/photo-credit";
import { destinationArt } from "@/features/content/destination-art";
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
import { pageMetadata } from "@/features/seo/metadata";
import { ogImagePath } from "@/features/seo/og-targets";
import { DESTINATION_COPY } from "@/i18n/pages/destinations";
import { alternatesForPath } from "@/i18n/routes";

/** Metadata for a destination guide, with its other-language version. */
export function destinationMetadata(page: Entry<Destination>): Metadata {
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

export function destinationCrumbs(page: Entry<Destination>): Crumb[] {
  const t = DESTINATION_COPY[page.locale];
  const crumbs: Crumb[] = [t.home, { name: t.hub.crumb, path: t.hub.path }];
  if (page.kind === "city" && page.country) {
    const country = getCountry(page.country, page.locale);
    if (country) crumbs.push({ name: country.name, path: country.path });
  }
  crumbs.push({ name: page.name, path: page.path });
  return crumbs;
}

export function DestinationView({ page }: { page: Entry<Destination> }) {
  const t = DESTINATION_COPY[page.locale];
  const cities =
    page.kind === "country" ? citiesOf(page.slug, page.locale) : [];
  const parent =
    page.kind === "city" && page.country
      ? getCountry(page.country, page.locale)
      : undefined;
  const key = photoKey(page);
  const photo = destinationPhoto(key, page.locale);

  return (
    <Container className="flex max-w-5xl flex-col gap-12 py-10">
      {/* Only indexable pages advertise structured data. */}
      {isIndexable(page) ? (
        <JsonLd data={graph(destinationLd(page), faqLd(page.faqs))} />
      ) : null}
      <div className="flex flex-col gap-2">
        <div
          className="relative flex min-h-[360px] flex-col justify-end gap-4 overflow-hidden rounded-[28px] border border-white/10 p-6 sm:min-h-[440px] sm:p-10"
          style={
            photo ? undefined : { background: destinationArt(key).background }
          }
        >
          {photo ? (
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              preload
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-cover"
            />
          ) : (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-4 -bottom-8 font-display text-[160px] leading-none font-bold text-white/[0.08] sm:text-[220px]"
            >
              {destinationArt(key).mark}
            </span>
          )}
          <div
            className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-background/20"
            aria-hidden="true"
          />
          <div className="relative flex flex-col gap-4">
            <Breadcrumbs crumbs={destinationCrumbs(page)} />
            <h1 className="text-4xl font-bold text-balance text-white sm:text-5xl">
              {page.headline}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-white/85">
              {page.intro}
            </p>
            {parent ? (
              <p className="text-sm text-white/85">
                {t.page.partOfLead}{" "}
                <Link
                  href={parent.path}
                  className="font-semibold text-white underline underline-offset-4"
                >
                  {t.page.partOf(parent.name)}
                </Link>
                .
              </p>
            ) : null}
          </div>
        </div>
        {photo ? (
          <PhotoCredit photo={photo} className="px-2" locale={page.locale} />
        ) : null}
      </div>

      <ContentSection id="overview" title={t.page.overview(page.name)}>
        <Prose paragraphs={page.overview} />
      </ContentSection>

      {cities.length > 0 ? (
        <ContentSection id="cities" title={t.page.cities(page.name)}>
          <ul className="grid gap-3 sm:grid-cols-2">
            {cities.map((city) => (
              <li key={city.path}>
                <Link
                  href={city.path}
                  className="block rounded-2xl border border-border bg-card p-4 hover:border-primary"
                >
                  <span className="font-medium">
                    {t.page.cityLink(city.name)}
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

      <ContentSection id="best-time" title={t.page.bestTime(page.name)}>
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

      <ContentSection id="trip-length" title={t.page.tripLength(page.name)}>
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

      <ContentSection id="highlights" title={t.page.highlights(page.name)}>
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
        heading={t.page.cta.heading(page.name)}
        body={t.page.cta.body}
        href={plannerHref(page, page.locale)}
        buttonLabel={t.plannerButton}
        placement="destination"
      />

      <ContentSection
        id="getting-around"
        title={t.page.gettingAround(page.name)}
      >
        <BulletList items={page.gettingAround} />
      </ContentSection>

      <ContentSection id="planning" title={t.page.planning}>
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

      <ContentSection id="tips" title={t.page.tips(page.name)}>
        <BulletList items={page.tips} />
      </ContentSection>

      <FaqList faqs={page.faqs} title={t.page.faqTitle} />

      <RelatedLinks
        title={t.page.itineraries}
        links={itineraryLinks(page.related.itineraries, page.locale)}
      />
      <RelatedLinks
        title={t.page.destinations}
        links={destinationLinks(page.related.destinations)}
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
