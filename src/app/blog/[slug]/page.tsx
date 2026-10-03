import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getGuide, isIndexable, publishedGuides } from "@/content/registry";
import { GuideView } from "@/features/content/components/guide-view";
import { pageMetadata } from "@/features/seo/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const page = getGuide((await params).slug);
  if (!page) return {};
  return pageMetadata({
    title: page.title,
    description: page.description,
    path: page.path,
    type: "article",
    modifiedTime: page.lastReviewed,
    noindex: !isIndexable(page),
    image: `${page.path}/opengraph-image`,
  });
}

export default async function GuidePage({ params }: PageProps<"/blog/[slug]">) {
  const page = getGuide((await params).slug);
  if (!page) notFound();
  return <GuideView page={page} />;
}
