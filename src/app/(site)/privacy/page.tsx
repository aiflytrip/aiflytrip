import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import {
  BulletList,
  ContentSection,
  Prose,
} from "@/features/content/components/blocks";
import {
  ContactEmailLink,
  ExternalLink,
  LastUpdated,
  LegalParagraph,
} from "@/features/legal/components";
import { Breadcrumbs } from "@/features/seo/components";
import { pageMetadata } from "@/features/seo/metadata";

export const metadata = pageMetadata({
  title: "Privacy policy",
  description:
    "How AIFlyTrip collects, uses and protects your information, which cookies and service providers it uses, how advertising works and how to contact us.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <Container className="flex max-w-3xl flex-col gap-10 py-10">
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          crumbs={[
            { name: "Home", path: "/" },
            { name: "Privacy policy", path: "/privacy" },
          ]}
        />
        <h1 className="text-4xl font-semibold tracking-tight">
          Privacy policy
        </h1>
        <p className="text-lg leading-8 text-muted-foreground">
          This page explains what information AIFlyTrip collects, why, who it is
          shared with and the choices you have.
        </p>
        <LastUpdated />
      </div>

      <ContentSection id="who" title="Who we are">
        <LegalParagraph>
          AIFlyTrip (aiflytrip.com) is run by {siteConfig.operator}, who is
          responsible for the information described here. For any privacy
          question or request, write to <ContactEmailLink />.
        </LegalParagraph>
      </ContentSection>

      <ContentSection id="collect" title="Information we collect">
        <Prose
          paragraphs={[
            "You can read the guides and use the free tools without giving us any personal details. We collect information only when you use the features below.",
          ]}
        />
        <BulletList
          items={[
            "Account details: your email address, your password (stored only in protected, hashed form by our sign-in provider) and, if you add them, your name, home airport and preferred currency.",
            "Trip plans: the trip details you enter in the planner, such as airports, dates, number of travellers, cabin, budget, pace, interests and notes, together with the plan created for you.",
            "Guest use: if you create a plan without an account, we create an anonymous session so the plan stays private to your browser. It contains no name or email address.",
            "Saved flight searches, if you choose to save one.",
            "Payments: the premium PDF is in test mode, so no real payments are taken. Checkout pages are hosted by our payment provider; we never see or store card numbers, only a payment reference and its status.",
            "Technical information: like most websites, our hosting provider records your IP address, browser type and the pages requested in its server logs, to keep the site secure and working.",
            "Free tools: the budget calculator, layover checker and trip length planner run in your browser. Your inputs are kept in the page link so you can share it, and are not saved to an account.",
          ]}
        />
      </ContentSection>

      <ContentSection id="use" title="How we use your information">
        <BulletList
          items={[
            "To provide the service: create and show your trip plans, keep them private to you and let you sign in.",
            "To send essential account emails, such as the link that confirms your email address.",
            "To protect the service, for example by limiting how many plans can be created in a day.",
            "To fix problems and improve the planner, tools and guides.",
            "To show advertising, as described below.",
          ]}
        />
        <Prose
          paragraphs={[
            "We don't sell your personal information, and we don't show your trips, email address or payment details to other users. Private pages such as your account and plans are never indexed by search engines.",
          ]}
        />
      </ContentSection>

      <ContentSection id="cookies" title="Cookies and similar storage">
        <BulletList
          items={[
            "Essential cookies keep you signed in, or keep a guest plan linked to your browser. The site can't provide accounts or plans without them.",
            "A preference saved in your browser remembers that you closed the language suggestion, so it isn't shown again.",
            "Advertising cookies may be set by Google and its partners on pages where adverts are shown, as described in the next section.",
          ]}
        />
        <Prose
          paragraphs={[
            "You can block or delete cookies in your browser settings. If you block essential cookies, signing in and saving plans won't work.",
          ]}
        />
      </ContentSection>

      <ContentSection id="advertising" title="Advertising">
        <Prose
          paragraphs={[
            "AIFlyTrip is free to use and may show adverts supplied by Google AdSense to help cover its costs. On pages where adverts are shown:",
          ]}
        />
        <BulletList
          items={[
            "Third-party vendors, including Google, use cookies to serve ads based on your previous visits to this website or other websites.",
            "Google's use of advertising cookies enables it and its partners to serve ads to you based on your visits to this site and other sites on the internet.",
            "Visitors in the European Economic Area, the United Kingdom and Switzerland are asked for their choice before advertising cookies are used.",
          ]}
        />
        <LegalParagraph>
          You can opt out of personalised advertising in{" "}
          <ExternalLink href="https://adssettings.google.com">
            Google&apos;s Ads Settings
          </ExternalLink>
          , or opt out of some other vendors&apos; use of cookies at{" "}
          <ExternalLink href="https://www.aboutads.info/choices">
            aboutads.info
          </ExternalLink>
          . Google explains{" "}
          <ExternalLink href="https://policies.google.com/technologies/partner-sites">
            how it uses information from sites that use its services
          </ExternalLink>
          .
        </LegalParagraph>
      </ContentSection>

      <ContentSection id="providers" title="Who we share information with">
        <Prose
          paragraphs={[
            "We share information only with the companies that help us run AIFlyTrip, and only what each one needs:",
          ]}
        />
        <BulletList
          items={[
            "Vercel hosts the website and keeps the server logs.",
            "Supabase stores accounts and trip plans and handles sign-in.",
            "Anthropic provides the AI model that writes trip plans. The trip details and notes you enter are sent to it to create your plan; your email address and password are not.",
            "Duffel provides flight search. It receives the airports, dates, number of travellers and cabin you search for.",
            "Stripe hosts the checkout for the premium PDF, which is currently in test mode.",
            "Google supplies adverts on pages where they are shown.",
          ]}
        />
        <Prose
          paragraphs={[
            "Because the planner sends your notes to an AI provider, please don't put sensitive details such as passport numbers, health information or payment details in them. These companies may process information in countries other than your own, including the United States. We may also disclose information if the law requires it.",
          ]}
        />
      </ContentSection>

      <ContentSection id="retention" title="How long we keep it">
        <Prose
          paragraphs={[
            "We keep your account and trip plans until you ask us to delete them. Server logs are kept by our hosting provider for a limited time. Records we need for legal or security reasons may be kept for longer.",
          ]}
        />
      </ContentSection>

      <ContentSection id="rights" title="Your choices and rights">
        <LegalParagraph>
          You can ask us for a copy of the information we hold about you, ask us
          to correct it, or ask us to delete your account and plans. Depending
          on where you live, you may also have the right to object to or
          restrict how we use your information, and to complain to your local
          data protection authority. To make a request, write to{" "}
          <ContactEmailLink /> from the email address on your account. We reply
          within one month.
        </LegalParagraph>
      </ContentSection>

      <ContentSection id="children" title="Children">
        <Prose
          paragraphs={[
            "AIFlyTrip is not intended for children under 16, and we don't knowingly collect their information. If you believe a child has given us personal information, please contact us and we will delete it.",
          ]}
        />
      </ContentSection>

      <ContentSection id="changes" title="Changes to this policy">
        <Prose
          paragraphs={[
            "We update this page when the site or the way we handle information changes, and we change the date at the top when we do. See also our [terms of use](/terms) and [contact page](/contact).",
          ]}
        />
      </ContentSection>
    </Container>
  );
}
