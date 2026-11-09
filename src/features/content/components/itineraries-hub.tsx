import { type Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { getDestinationByPath, publishedItineraries } from "@/content/registry";
import { photoKey } from "@/content/data/photos";
import { type Itinerary } from "@/content/schema";
import {
  ContentSection,
  FaqList,
  PlannerCta,
  Prose,
} from "@/features/content/components/blocks";
import { DestinationCard } from "@/features/content/components/destination-card";
import { Breadcrumbs, JsonLd } from "@/features/seo/components";
import { faqLd, graph } from "@/features/seo/json-ld";
import { pageMetadata } from "@/features/seo/metadata";
import { ITINERARY_COPY } from "@/i18n/pages/itineraries";
import { alternatesForPath, ROUTES } from "@/i18n/routes";

type Locale = Itinerary["locale"];

export function itinerariesHubMetadata(locale: Locale): Metadata {
  const { hub } = ITINERARY_COPY[locale];
  return pageMetadata({
    ...hub.meta,
    path: hub.path,
    locale,
    languages: alternatesForPath(hub.path),
  });
}

/** /itineraries and /es/itinerarios: every itinerary in that language. */
export function ItinerariesHub({ locale }: { locale: Locale }) {
  const t = ITINERARY_COPY[locale];
  const itineraries = publishedItineraries(locale);

  return (
    <Container className="flex max-w-5xl flex-col gap-12 py-10">
      <JsonLd data={graph(faqLd(t.hub.faqs))} />
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          crumbs={[t.home, { name: t.hub.crumb, path: t.hub.path }]}
        />
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {t.hub.heading}
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
          {t.hub.intro}
        </p>
      </div>

      <ul className="grid gap-5 md:grid-cols-3">
        {itineraries.map((it) => {
          const destination = getDestinationByPath(it.destination);
          return (
            <li key={it.path}>
              <DestinationCard
                href={it.path}
                slug={destination ? photoKey(destination) : ""}
                locale={locale}
                name={it.name}
                summary={it.description}
                badge={t.days(it.days)}
                heading="h2"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            </li>
          );
        })}
      </ul>

      <ContentSection id="how-to-use" title={t.hub.howToUse.title}>
        <Prose paragraphs={t.hub.howToUse.paragraphs} />
      </ContentSection>

      <ContentSection id="which-one" title={t.hub.whichOne}>
        <ul className="grid gap-4 md:grid-cols-3">
          {itineraries.map((it) => {
            const destination = getDestinationByPath(it.destination);
            return (
              <li
                key={it.path}
                className="glass flex flex-col gap-2 rounded-3xl p-5"
              >
                <h3 className="font-semibold text-white">
                  <Link
                    href={it.path}
                    className="hover:text-primary hover:underline"
                  >
                    {it.name}
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t.days(it.days)} · {t.hub.bestFor}:{" "}
                  {it.bestFor.join(", ").toLowerCase()}
                </p>
                {destination ? (
                  <Link
                    href={destination.path}
                    className="mt-auto text-sm text-primary hover:underline"
                  >
                    {t.hub.guideLink(destination.name)}
                  </Link>
                ) : null}
              </li>
            );
          })}
        </ul>
      </ContentSection>

      <PlannerCta
        heading={t.hub.cta.heading}
        body={t.hub.cta.body}
        href={ROUTES.planner[locale]}
        placement="itineraries_hub"
        buttonLabel={t.plannerButton}
      />

      <FaqList faqs={t.hub.faqs} title={t.page.faqTitle} />
    </Container>
  );
}
