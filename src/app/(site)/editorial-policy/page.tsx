import { Container } from "@/components/ui/container";
import {
  BulletList,
  ContentSection,
  Prose,
} from "@/features/content/components/blocks";
import { Breadcrumbs } from "@/features/seo/components";
import { pageMetadata } from "@/features/seo/metadata";

export const metadata = pageMetadata({
  title: "Editorial policy: how we write travel guides",
  description:
    "How AIFlyTrip researches, writes, reviews and updates its destination guides, itineraries and travel planning articles, and how we handle facts that change.",
  path: "/editorial-policy",
});

export default function EditorialPolicyPage() {
  return (
    <Container className="flex max-w-3xl flex-col gap-10 py-10">
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          crumbs={[
            { name: "Home", path: "/" },
            { name: "Editorial policy", path: "/editorial-policy" },
          ]}
        />
        <h1 className="text-4xl font-semibold tracking-tight">
          Editorial policy
        </h1>
        <p className="text-lg leading-8 text-muted-foreground">
          Our guides exist to help you plan better trips. This page explains how
          we create and maintain them.
        </p>
      </div>
      <ContentSection id="standards" title="Our content standards">
        <BulletList
          items={[
            "Every guide answers real planning questions: when to go, how long to stay, what to see, how to get around and what to check.",
            "We don't state visa rules, entry requirements, prices, timetables or opening hours as facts. These change, so we link to official sources instead.",
            "Each page lists its official sources and the date it was last reviewed.",
            "We don't publish pages that don't meet our quality bar. Thin or incomplete pages are kept out of search results until they are improved.",
            "We never publish fake reviews, ratings or testimonials.",
          ]}
        />
      </ContentSection>
      <ContentSection id="ai" title="How we use AI">
        <Prose
          paragraphs={[
            "The AIFlyTrip trip planner uses AI to generate personalized itineraries for signed-in users. Those plans are private and are clearly labelled as AI-generated.",
            "Our public destination guides, itineraries and articles are created by the AIFlyTrip team, which may use tools, including AI, to help draft them. Every page must meet the standards above before it is published, including links to official sources and an automated quality check that keeps incomplete pages out of search results.",
          ]}
        />
      </ContentSection>
      <ContentSection id="updates" title="Reviews, updates and corrections">
        <Prose
          paragraphs={[
            "We review every page at least once a year, and sooner when we learn that something important has changed. Pages that haven't been reviewed within a year are removed from search results until they are updated.",
            "If you spot something that looks wrong or out of date, please [contact us](/contact) so we can check and correct it.",
          ]}
        />
      </ContentSection>
    </Container>
  );
}
