import { Container } from "@/components/ui/container";
import { citiesOf, countries } from "@/content/registry";
import { PlannerCta } from "@/features/content/components/blocks";
import { DestinationCard } from "@/features/content/components/destination-card";
import { Breadcrumbs } from "@/features/seo/components";
import { pageMetadata } from "@/features/seo/metadata";

export const metadata = pageMetadata({
  title: "Destination travel guides: plan your next trip",
  description:
    "Travel planning guides for popular destinations: when to visit, how many days to spend, what to see, how to get around and practical tips.",
  path: "/destinations",
});

export default function DestinationsPage() {
  const list = countries();
  return (
    <Container className="flex max-w-6xl flex-col gap-10 py-10">
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          crumbs={[
            { name: "Home", path: "/" },
            { name: "Destinations", path: "/destinations" },
          ]}
        />
        <h1 className="text-4xl font-bold text-white sm:text-5xl">
          Destination travel guides
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
          Practical planning guides for each destination: the best time to
          visit, how long to stay, the highlights worth your time, getting
          around and tips from experienced travellers. Every guide links to
          official sources for details that change, such as entry requirements
          and timetables.
        </p>
      </div>
      <ul className="flex flex-col gap-6">
        {list.map((country) => (
          <li
            key={country.path}
            className="reveal grid gap-5 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]"
          >
            <DestinationCard
              href={country.path}
              slug={country.slug}
              name={country.name}
              summary={country.description}
              badge={country.airports[0]}
              heading="h2"
              sizes="(min-width: 768px) 640px, 100vw"
            />
            {citiesOf(country.slug).map((city) => (
              <DestinationCard
                key={city.path}
                href={city.path}
                slug={city.slug}
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
        heading="Know where you're going?"
        body="Create a personalized day-by-day itinerary for any of these destinations, with flight options and a budget estimate."
      />
    </Container>
  );
}
