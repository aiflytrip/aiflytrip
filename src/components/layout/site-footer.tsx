import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import {
  countries,
  publishedGuides,
  publishedItineraries,
} from "@/content/registry";

/** Site-wide links: keeps every public section reachable (no orphan pages). */
export function SiteFooter() {
  const columns = [
    {
      title: "Plan",
      links: [
        { href: "/travel-planner", label: "AI trip planner" },
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
      title: "Itineraries & guides",
      links: [
        ...publishedItineraries().map((it) => ({
          href: it.path,
          label: it.name,
        })),
        ...publishedGuides().map((g) => ({
          href: g.path,
          label: g.headline.split(":")[0]!.replace(/\?$/, ""),
        })),
      ],
    },
    {
      title: "Company",
      links: [
        { href: "/about", label: "About AIFlyTrip" },
        { href: "/editorial-policy", label: "Editorial policy" },
      ],
    },
  ];

  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-10 py-10">
        <nav
          aria-label="Footer"
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {columns.map((column) => (
            <div key={column.title}>
              <p className="text-sm font-semibold">{column.title}</p>
              <ul className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="hover:text-foreground hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <div className="flex flex-col gap-2 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Planning tool only:
            AIFlyTrip doesn&apos;t book flights or hotels.
          </p>
          <p>{siteConfig.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
