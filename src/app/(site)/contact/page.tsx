import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import {
  BulletList,
  ContentSection,
} from "@/features/content/components/blocks";
import { ContactEmailLink, LegalParagraph } from "@/features/legal/components";
import { Breadcrumbs } from "@/features/seo/components";
import { pageMetadata } from "@/features/seo/metadata";

export const metadata = pageMetadata({
  title: "Contact AIFlyTrip",
  description:
    "Get in touch with AIFlyTrip: report a correction, ask a privacy question or send feedback about the AI trip planner, the free tools and our travel guides.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Container className="flex max-w-3xl flex-col gap-10 py-10">
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          crumbs={[
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]}
        />
        <h1 className="text-4xl font-semibold tracking-tight">Contact us</h1>
        <p className="text-lg leading-8 text-muted-foreground">
          Questions, corrections and feedback are welcome. Email is the best way
          to reach us.
        </p>
      </div>
      <ContentSection id="email" title="Email">
        <LegalParagraph>
          Write to <ContactEmailLink />. AIFlyTrip is run by{" "}
          {siteConfig.operator}, and we read every message.
        </LegalParagraph>
      </ContentSection>
      <ContentSection id="topics" title="What you can contact us about">
        <BulletList
          items={[
            "Corrections: tell us which page and what looks wrong or out of date, with a link to an official source if you have one.",
            "Privacy requests: ask for a copy of your information, or ask us to correct or delete it. Please write from the email address on your account.",
            "Help with your account or a trip plan.",
            "Feedback and ideas for the planner, the free tools or new guides.",
            "Photo credits and licensing questions.",
          ]}
        />
      </ContentSection>
      <ContentSection id="cannot-help" title="What we can't help with">
        <LegalParagraph>
          AIFlyTrip is a planning tool. It doesn&apos;t sell or book flights,
          hotels or activities, so we can&apos;t change, cancel or refund a
          booking. For that, contact the airline, hotel or travel agent you
          booked with.
        </LegalParagraph>
      </ContentSection>
      <p className="text-sm text-muted-foreground">
        See also{" "}
        <Link href="/about" className="text-primary hover:underline">
          about AIFlyTrip
        </Link>
        , our{" "}
        <Link href="/privacy" className="text-primary hover:underline">
          privacy policy
        </Link>
        ,{" "}
        <Link href="/terms" className="text-primary hover:underline">
          terms of use
        </Link>{" "}
        and{" "}
        <Link href="/editorial-policy" className="text-primary hover:underline">
          editorial policy
        </Link>
        .
      </p>
    </Container>
  );
}
