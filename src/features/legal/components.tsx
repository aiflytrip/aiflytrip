import { type ReactNode } from "react";

import { siteConfig } from "@/config/site";

/** When the privacy policy and terms were last changed. */
export const LEGAL_LAST_UPDATED = "2026-10-12";

const linkClass =
  "font-medium text-primary underline-offset-4 hover:text-primary-hover hover:underline";

/** A paragraph styled like Prose, for text that needs email or external links. */
export function LegalParagraph({ children }: { children: ReactNode }) {
  return <p className="max-w-3xl leading-7 text-foreground/90">{children}</p>;
}

export function ContactEmailLink() {
  return (
    <a href={`mailto:${siteConfig.contactEmail}`} className={linkClass}>
      {siteConfig.contactEmail}
    </a>
  );
}

export function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a href={href} rel="noopener" target="_blank" className={linkClass}>
      {children}
    </a>
  );
}

export function LastUpdated() {
  const date = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${LEGAL_LAST_UPDATED}T00:00:00Z`));
  return (
    <p className="text-sm text-muted-foreground">
      Last updated on <time dateTime={LEGAL_LAST_UPDATED}>{date}</time>.
    </p>
  );
}
