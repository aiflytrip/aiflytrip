import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import {
  countries,
  publishedGuides,
  publishedItineraries,
} from "@/content/registry";
import { type Locale } from "@/i18n/config";
import { siteMessages, type ChromeLink } from "@/i18n/messages/site";

/** Site-wide links: keeps every public section reachable (no orphan pages). */
export function SiteFooter({ locale = "en" }: { locale?: Locale }) {
  const t = siteMessages(locale);
  const english: { title: string; links: ChromeLink[] }[] = [
    {
      title: "Plan",
      links: [
        { href: "/travel-planner", label: "AI trip planner" },
        {
          href: "/tools/trip-budget-calculator",
          label: "Trip budget calculator",
        },
        { href: "/tools/layover-time-checker", label: "Layover time checker" },
        { href: "/tools/how-many-days", label: "How many days do I need?" },
        { href: "/plan", label: "Create a trip plan" },
        { href: "/flights", label: "Compare flights" },
      ],
    },
    {
      title: "Destinations",
      links: [
        ...countries().map((c) => ({ href: c.path, label: c.name })),
        { href: "/destinations", label: "All destinations" },
      ],
    },
    {
      title: "Itineraries & blog",
      links: [
        ...publishedItineraries().map((it) => ({
          href: it.path,
          label: it.name,
        })),
        ...publishedGuides()
          .slice(0, 4)
          .map((g) => ({
            href: g.path,
            label: g.headline.split(":")[0]!.replace(/\?$/, ""),
          })),
        { href: "/blog", label: "All blog articles" },
      ],
    },
    {
      title: "Company",
      links: [
        { href: "/about", label: "About AIFlyTrip" },
        { href: "/editorial-policy", label: "Editorial policy" },
        { href: "/photo-credits", label: "Photo credits" },
        { href: "/contact", label: "Contact" },
        { href: "/privacy", label: "Privacy policy" },
        { href: "/terms", label: "Terms of use" },
      ],
    },
  ];

  const columns = locale === "en" ? english : t.footer.columns;

  return (
    <footer className="border-t border-white/[0.07] bg-background/60">
      <Container className="flex flex-col gap-10 py-10">
        <nav
          aria-label={t.footerNavLabel}
          className={
            columns.length === 4
              ? "grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
              : "grid gap-8 sm:grid-cols-3"
          }
        >
          {columns.map((column) => (
            <div key={column.title}>
              <p className="eyebrow">{column.title}</p>
              <ul className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      hrefLang={link.englishOnly ? "en" : undefined}
                      className="hover:text-foreground hover:underline"
                    >
                      {link.label}
                      {link.englishOnly ? (
                        <span className="sr-only"> ({t.englishOnlyNote})</span>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <div className="flex flex-col gap-2 border-t border-white/[0.07] pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}.{" "}
            {t.footer.disclaimer}
          </p>
          <p>{locale === "en" ? siteConfig.tagline : t.footer.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
