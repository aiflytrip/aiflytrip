import Link from "next/link";

import { Container } from "@/components/ui/container";
import { citiesOf, countries } from "@/content/registry";
import { PlannerCta } from "@/features/content/components/blocks";
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
    <Container className="flex max-w-5xl flex-col gap-10 py-10">
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          crumbs={[
            { name: "Home", path: "/" },
            { name: "Destinations", path: "/destinations" },
          ]}
        />
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
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
      <ul className="grid gap-6 md:grid-cols-2">
        {list.map((country) => (
          <li
            key={country.path}
            className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5"
          >
            <h2 className="text-xl font-semibold">
              <Link
                href={country.path}
                className="hover:text-primary hover:underline"
              >
                {country.name}
              </Link>
            </h2>
            <p className="text-sm leading-6 text-muted-foreground">
              {country.description}
            </p>
            {citiesOf(country.slug).length > 0 ? (
              <p className="text-sm">
                <span className="text-muted-foreground">City guides: </span>
                {citiesOf(country.slug).map((city, i) => (
                  <span key={city.path}>
                    {i > 0 ? ", " : null}
                    <Link
                      href={city.path}
                      className="text-primary hover:underline"
                    >
                      {city.name}
                    </Link>
                  </span>
                ))}
              </p>
            ) : null}
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
