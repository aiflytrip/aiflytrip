import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getGuide, isIndexable, publishedGuides } from "@/content/registry";
import { GuideView } from "@/features/content/components/guide-view";
import { pageMetadata } from "@/features/seo/metadata";
import { ogImagePath } from "@/features/seo/og-targets";
import { alternatesForPath } from "@/i18n/routes";

// Scheduled posts go live on their publish date without a redeploy:
// pages regenerate at most hourly (ISR).
export const revalidate = 3600;
// Unknown slugs render on demand and 404 unless the post is live.
export const dynamicParams = true;

export function generateStaticParams() {
  return publishedGuides("fr").map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/fr/blog/[slug]">): Promise<Metadata> {
  const page = getGuide((await params).slug, "fr");
  if (!page) return {};
  return pageMetadata({
    title: page.title,
    description: page.description,
    path: page.path,
    type: "article",
    modifiedTime: page.lastReviewed,
    noindex: !isIndexable(page),
    image: ogImagePath(page.path),
    locale: "fr",
    languages: alternatesForPath(page.path),
  });
}

export default async function FrenchGuidePage({
  params,
}: PageProps<"/fr/blog/[slug]">) {
  const page = getGuide((await params).slug, "fr");
  if (!page) notFound();
  return <GuideView page={page} />;
}
