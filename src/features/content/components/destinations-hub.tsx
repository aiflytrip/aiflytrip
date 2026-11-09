import { type Metadata } from "next";

import { Container } from "@/components/ui/container";
import { citiesOf, countries } from "@/content/registry";
import { photoKey } from "@/content/data/photos";
import { type Destination } from "@/content/schema";
import { PlannerCta } from "@/features/content/components/blocks";
import { DestinationCard } from "@/features/content/components/destination-card";
import { Breadcrumbs } from "@/features/seo/components";
import { pageMetadata } from "@/features/seo/metadata";
import { DESTINATION_COPY } from "@/i18n/pages/destinations";
import { alternatesForPath, ROUTES } from "@/i18n/routes";

type Locale = Destination["locale"];

export function destinationsHubMetadata(locale: Locale): Metadata {
  const { hub } = DESTINATION_COPY[locale];
  return pageMetadata({
    ...hub.meta,
    path: hub.path,
    locale,
    languages: alternatesForPath(hub.path),
  });
}

/** /destinations and /es/destinos: every country guide with its cities. */
export function DestinationsHub({ locale }: { locale: Locale }) {
  const t = DESTINATION_COPY[locale];
  return (
    <Container className="flex max-w-6xl flex-col gap-10 py-10">
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          crumbs={[t.home, { name: t.hub.crumb, path: t.hub.path }]}
        />
        <h1 className="text-4xl font-bold text-white sm:text-5xl">
          {t.hub.heading}
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
          {t.hub.intro}
        </p>
      </div>
      <ul className="flex flex-col gap-6">
        {countries(locale).map((country) => (
          <li
            key={country.path}
            className="reveal grid gap-5 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]"
          >
            <DestinationCard
              href={country.path}
              slug={photoKey(country)}
              locale={locale}
              name={country.name}
              summary={country.description}
              badge={country.airports[0]}
              heading="h2"
              sizes="(min-width: 768px) 640px, 100vw"
            />
            {citiesOf(country.slug, locale).map((city) => (
              <DestinationCard
                key={city.path}
                href={city.path}
                slug={photoKey(city)}
                locale={locale}
                name={city.name}
                summary={city.description}
                badge={city.airports[0]}
                heading="h3"
                sizes="(min-width: 768px) 420px, 100vw"
              />
            ))}
          </li>
        ))}
      </ul>
      <PlannerCta
        heading={t.hub.cta.heading}
        body={t.hub.cta.body}
        href={ROUTES.planner[locale]}
        buttonLabel={t.plannerButton}
      />
    </Container>
  );
}
