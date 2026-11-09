import { describe, expect, it } from "vitest";

import { GET as llmsTxt } from "@/app/llms.txt/route";
import robots, { PRIVATE_PATHS } from "@/app/robots";
import sitemap from "@/app/sitemap";
import {
  allContent,
  destinations,
  guides,
  isIndexable,
  itineraries,
} from "@/content/registry";
import {
  breadcrumbLd,
  destinationLd,
  faqLd,
  graph,
  guideLd,
  itineraryLd,
  organizationLd,
  serializeJsonLd,
  webApplicationLd,
  websiteLd,
} from "@/features/seo/json-ld";
import { absoluteUrl, pageMetadata } from "@/features/seo/metadata";

const PRIVATE_PREFIXES = [
  "/account",
  "/plan",
  "/plans",
  "/login",
  "/signup",
  "/auth",
  "/api",
  "/flights",
  "/es/vuelos",
];

describe("pageMetadata", () => {
  it("sets a path canonical, index robots and matching social tags", () => {
    const meta = pageMetadata({
      title: "Japan travel guide",
      description: "d".repeat(80),
      path: "/destinations/japan",
    });
    expect(meta.alternates?.canonical).toBe("/destinations/japan");
    expect(meta.robots).toEqual({ index: true, follow: true });
    expect(meta.openGraph?.url).toBe("/destinations/japan");
    expect(meta.openGraph?.title).toBe("Japan travel guide | AIFlyTrip");
    expect(meta.twitter).toMatchObject({ card: "summary_large_image" });
  });

  it("rejects canonical paths with a trailing slash or query string", () => {
    expect(() =>
      pageMetadata({ title: "x", description: "y", path: "/guides/" }),
    ).toThrow();
    expect(() =>
      pageMetadata({ title: "x", description: "y", path: "/guides?a=1" }),
    ).toThrow();
  });

  it("supports noindex", () => {
    expect(
      pageMetadata({ title: "x", description: "y", path: "/x", noindex: true })
        .robots,
    ).toEqual({
      index: false,
      follow: true,
    });
  });
});

describe("JSON-LD", () => {
  const roundTrip = (data: Record<string, unknown>) =>
    JSON.parse(serializeJsonLd(data)) as Record<string, unknown>;

  it("escapes characters that could close the script tag", () => {
    const out = serializeJsonLd({
      name: "</script><script>alert(1)</script>&",
    });
    expect(out).not.toContain("<");
    expect(out).not.toContain(">");
    expect(roundTrip({ name: "</script>" })).toEqual({ name: "</script>" });
  });

  it("builds valid graphs for every content type", () => {
    const docs = [
      graph(websiteLd(), organizationLd(), webApplicationLd()),
      ...destinations.map((d) => graph(destinationLd(d), faqLd(d.faqs))),
      ...itineraries.map((i) => graph(itineraryLd(i), faqLd(i.faqs))),
      ...guides.map((g) => graph(guideLd(g), faqLd(g.faqs))),
    ];
    for (const doc of docs) {
      const parsed = roundTrip(doc);
      expect(parsed["@context"]).toBe("https://schema.org");
      const nodes = parsed["@graph"] as Record<string, unknown>[];
      expect(nodes.length).toBeGreaterThan(0);
      for (const node of nodes) expect(node["@type"]).toBeTruthy();
    }
  });

  it("never claims ratings, reviews, offers or prices", () => {
    const all = JSON.stringify([
      websiteLd(),
      organizationLd(),
      webApplicationLd(),
      ...destinations.flatMap((d) => destinationLd(d)),
      ...itineraries.flatMap((i) => itineraryLd(i)),
      ...guides.flatMap((g) => guideLd(g)),
    ]);
    for (const banned of [
      "aggregateRating",
      "Review",
      "review",
      "Offer",
      "offers",
      "price",
    ]) {
      expect(all).not.toContain(`"${banned}"`);
      expect(all).not.toContain(`"@type":"${banned}"`);
    }
  });

  it("mirrors the visible FAQ exactly and omits FAQPage when there are none", () => {
    const d = destinations[0]!;
    const ld = faqLd(d.faqs) as {
      mainEntity: { name: string; acceptedAnswer: { text: string } }[];
    };
    expect(ld.mainEntity.map((q) => q.name)).toEqual(
      d.faqs.map((f) => f.question),
    );
    expect(ld.mainEntity.map((q) => q.acceptedAnswer.text)).toEqual(
      d.faqs.map((f) => f.answer),
    );
    expect(faqLd([])).toBeUndefined();
  });

  it("numbers breadcrumbs from 1 with absolute URLs", () => {
    const ld = breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "Guides", path: "/guides" },
    ]) as { itemListElement: { position: number; item: string }[] };
    expect(ld.itemListElement.map((i) => i.position)).toEqual([1, 2]);
    expect(ld.itemListElement[1]!.item).toBe(absoluteUrl("/guides"));
  });
});

describe("robots.txt", () => {
  const rules = robots().rules as {
    userAgent: string;
    allow: string;
    disallow: string[];
  };

  it("disallows private and API routes and points to the sitemap", () => {
    for (const path of ["/api/", "/account", "/plan", "/plans", "/auth/"])
      expect(rules.disallow).toContain(path);
    expect(robots().sitemap).toBe(absoluteUrl("/sitemap.xml"));
  });

  it("does not block any indexable page", () => {
    const blocked = (path: string) =>
      PRIVATE_PATHS.some((p) => path.startsWith(p));
    for (const entry of sitemap())
      expect(blocked(new URL(entry.url).pathname), entry.url).toBe(false);
  });
});

describe("sitemap.xml", () => {
  const urls = sitemap().map((e) => e.url);

  it("lists every indexable content page and the public hubs", () => {
    for (const entry of allContent().filter(isIndexable))
      expect(urls).toContain(absoluteUrl(entry.path));
    for (const path of [
      "/",
      "/travel-planner",
      "/destinations",
      "/itineraries",
      "/blog",
      "/about",
      "/editorial-policy",
    ]) {
      expect(urls).toContain(absoluteUrl(path));
    }
  });

  it("excludes private, query-string and duplicate URLs", () => {
    expect(new Set(urls).size).toBe(urls.length);
    for (const url of urls) {
      const { pathname, search } = new URL(url);
      expect(search, url).toBe("");
      expect(pathname === "/" || !pathname.endsWith("/"), url).toBe(true);
      for (const prefix of PRIVATE_PREFIXES) {
        expect(
          pathname === prefix || pathname.startsWith(`${prefix}/`),
          url,
        ).toBe(false);
      }
    }
  });

  it("gives every entry a lastModified date", () => {
    for (const entry of sitemap())
      expect(String(entry.lastModified)).toMatch(/^\d{4}-\d{2}-\d{2}/);
  });
});

describe("llms.txt", () => {
  it("lists only sitemap URLs", async () => {
    const text = await llmsTxt().text();
    const linked = [...text.matchAll(/\]\((https?:\/\/[^)]+)\)/g)].map(
      (m) => m[1]!,
    );
    const inSitemap = new Set(sitemap().map((e) => e.url));
    expect(linked.length).toBeGreaterThan(5);
    for (const url of linked) expect(inSitemap.has(url), url).toBe(true);
  });
});

describe("image sitemap", () => {
  it("lists an existing photo for every content page", async () => {
    const { existsSync } = await import("node:fs");
    const { join } = await import("node:path");
    const contentEntries = sitemap().filter((e) =>
      /\/(destinations|itineraries|blog)\/./.test(new URL(e.url).pathname),
    );
    expect(contentEntries.length).toBeGreaterThan(10);
    for (const entry of contentEntries) {
      expect(entry.images?.length, entry.url).toBeGreaterThan(0);
      for (const img of entry.images ?? []) {
        expect(
          existsSync(join(process.cwd(), "public", new URL(img).pathname)),
          img,
        ).toBe(true);
      }
    }
  });
});
