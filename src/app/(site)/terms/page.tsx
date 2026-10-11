import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import {
  BulletList,
  ContentSection,
  Prose,
} from "@/features/content/components/blocks";
import {
  ContactEmailLink,
  LastUpdated,
  LegalParagraph,
} from "@/features/legal/components";
import { Breadcrumbs } from "@/features/seo/components";
import { pageMetadata } from "@/features/seo/metadata";

export const metadata = pageMetadata({
  title: "Terms of use",
  description:
    "The terms for using AIFlyTrip: what the trip planner and free tools do, the limits of AI-generated plans, accounts, acceptable use and our liability.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <Container className="flex max-w-3xl flex-col gap-10 py-10">
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          crumbs={[
            { name: "Home", path: "/" },
            { name: "Terms of use", path: "/terms" },
          ]}
        />
        <h1 className="text-4xl font-semibold tracking-tight">Terms of use</h1>
        <p className="text-lg leading-8 text-muted-foreground">
          These terms apply when you use AIFlyTrip. By using the site you agree
          to them, so please read them.
        </p>
        <LastUpdated />
      </div>

      <ContentSection id="service" title="What AIFlyTrip is">
        <LegalParagraph>
          AIFlyTrip (aiflytrip.com) is a travel planning website run by{" "}
          {siteConfig.operator}. It offers an AI trip planner, free planning
          tools and travel guides.
        </LegalParagraph>
        <Prose
          paragraphs={[
            "AIFlyTrip is a planning tool only. It doesn't sell or book flights, hotels or activities, and it isn't a travel agent. Flight options currently come from a test environment, so schedules and prices are examples for planning, not real fares you can buy.",
          ]}
        />
      </ContentSection>

      <ContentSection id="information" title="Check before you travel">
        <Prose
          paragraphs={[
            "Trip plans are written by AI and can contain mistakes. Our guides are written with care and link to official sources, but travel details change. Nothing on AIFlyTrip is professional, legal, immigration, medical or financial advice.",
            "Before you book or travel, confirm prices, timetables, opening days, visa and entry requirements and safety advice with the official sources. You are responsible for your own travel decisions and bookings. Our [editorial policy](/editorial-policy) explains how we write and review content.",
          ]}
        />
      </ContentSection>

      <ContentSection id="accounts" title="Accounts">
        <Prose
          paragraphs={[
            "You can use most of AIFlyTrip without an account. If you create one, give a real email address, keep your password private and tell us if you think someone else has used your account. You are responsible for what happens under it. We may limit how many plans can be created so the service stays available to everyone.",
          ]}
        />
      </ContentSection>

      <ContentSection id="acceptable-use" title="Acceptable use">
        <Prose paragraphs={["When you use AIFlyTrip, please don't:"]} />
        <BulletList
          items={[
            "break the law or anyone else's rights;",
            "try to access other people's accounts or plans, or get around security or usage limits;",
            "copy the site in bulk, or use automated tools that overload it;",
            "enter other people's personal information without their permission;",
            "use plans or guides to create fake travel documents or to mislead anyone, including visa officers.",
          ]}
        />
        <Prose
          paragraphs={[
            "We may suspend or close an account that breaks these rules.",
          ]}
        />
      </ContentSection>

      <ContentSection id="premium" title="Premium PDF">
        <Prose
          paragraphs={[
            "An optional premium upgrade unlocks a printable PDF of a plan. It is currently in test mode, which means no real payments are taken. If real payments are introduced, the price and refund terms will be shown clearly before you pay.",
          ]}
        />
      </ContentSection>

      <ContentSection id="content" title="Our content and yours">
        <Prose
          paragraphs={[
            "The text, design and software of AIFlyTrip belong to us or to those who license them to us; photographers are listed in the [photo credits](/photo-credits). You may read, share links to and print pages for your own personal use, but not republish or sell them without permission.",
            "The trip details you enter remain yours. You allow us to process them to create and show your plans, as described in our [privacy policy](/privacy). The plans created for you are yours to use for your own trips.",
          ]}
        />
      </ContentSection>

      <ContentSection id="third-parties" title="Links and advertising">
        <Prose
          paragraphs={[
            "AIFlyTrip links to other websites, such as official sources, and may show adverts supplied by third parties. We don't control those websites or adverts and aren't responsible for their content, products or services. An advert on AIFlyTrip is not a recommendation.",
          ]}
        />
      </ContentSection>

      <ContentSection id="liability" title="Our responsibility to you">
        <Prose
          paragraphs={[
            "AIFlyTrip is provided as it is, free of charge, without any promise that it will always be available, accurate or free of errors. As far as the law allows, we aren't liable for losses that result from relying on a plan, a guide or a tool result, including missed connections, refused entry, extra costs or bookings you make with other companies.",
            "Nothing in these terms limits any rights you have under consumer law that can't be excluded.",
          ]}
        />
      </ContentSection>

      <ContentSection id="changes" title="Changes and contact">
        <LegalParagraph>
          We may update these terms as the site changes, and we change the date
          at the top when we do. If you keep using AIFlyTrip after a change, the
          new terms apply. Questions about these terms can be sent to{" "}
          <ContactEmailLink />.
        </LegalParagraph>
      </ContentSection>
    </Container>
  );
}
