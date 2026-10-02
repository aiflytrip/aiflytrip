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

export function itineraryCrumbs(page: Entry<Itinerary>): Crumb[] {
  return [
    { name: "Home", path: "/" },
    { name: "Itineraries", path: "/itineraries" },
    { name: page.name, path: page.path },
  ];
}

export function ItineraryView({ page }: { page: Entry<Itinerary> }) {
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
          <Badge variant="accent">{page.days} days</Badge>
          {page.bestFor.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        {destination ? (
          <p className="text-sm text-muted-foreground">
            New to {destination.name}? Start with our{" "}
            <Link
              href={destination.path}
              className="text-primary hover:underline"
            >
              {destination.name} travel planning guide
            </Link>{" "}
            for when to go and how to get around.
          </p>
        ) : null}
      </div>

      <ContentSection id="day-by-day" title="Day-by-day plan">
        <ol className="flex flex-col gap-4">
          {page.plan.map((day, index) => (
            <li key={day.title}>
              <Card className="p-5">
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Day {index + 1}
                </p>
                <h3 className="mt-1 text-lg font-semibold">{day.title}</h3>
                <dl className="mt-3 grid gap-3 text-sm leading-6 md:grid-cols-3">
                  {(
                    [
                      ["Morning", day.morning],
                      ["Afternoon", day.afternoon],
                      ["Evening", day.evening],
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
                    Tip: {day.tip}
                  </p>
                ) : null}
              </Card>
            </li>
          ))}
        </ol>
      </ContentSection>

      <ContentSection id="practical" title="Practical notes">
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
        heading="Want this itinerary tailored to you?"
        body="Our AI trip planner adapts the days to your dates, budget, pace and interests, and suggests flight options and a budget breakdown."
        href={destination ? plannerHref(destination) : "/plan"}
        placement="itinerary"
      />

      <ContentSection id="adjustments" title="Ways to adapt this itinerary">
        <dl className="flex flex-col gap-4">
          {page.adjustments.map((a) => (
            <div key={a.title}>
              <dt className="font-semibold">{a.title}</dt>
              <dd className="mt-1 leading-7 text-foreground/90">{a.detail}</dd>
            </div>
          ))}
        </dl>
      </ContentSection>

      <FaqList faqs={page.faqs} />

      <RelatedLinks
        title="More itineraries"
        links={itineraryLinks(page.related.itineraries)}
      />
      <RelatedLinks
        title="Travel planning guides"
        links={guideLinks(page.related.guides)}
      />
      <SourcesList sources={page.sources} lastReviewed={page.lastReviewed} />
    </Container>
  );
}
