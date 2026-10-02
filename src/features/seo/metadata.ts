import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

/**
 * One way to build page metadata, so every public page gets a unique title,
 * a description, exactly one canonical URL (path-only, resolved against
 * NEXT_PUBLIC_SITE_URL via metadataBase) and matching Open Graph / X tags.
 */
export function pageMetadata(input: {
  title: string;
  description: string;
  /** Canonical path, e.g. "/destinations/japan". No query string, no trailing slash. */
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  /** Set for pages that must never be indexed. */
  noindex?: boolean;
  /** Use the title as-is instead of applying the "| AIFlyTrip" template. */
  absoluteTitle?: boolean;
  /** Social image path; defaults to the site-wide card. */
  image?: string;
}): Metadata {
  const image = input.image ?? "/opengraph-image";
  if (
    input.path !== "/" &&
    (input.path.endsWith("/") || input.path.includes("?"))
  ) {
    throw new Error(
      `Canonical path must have no trailing slash or query: ${input.path}`,
    );
  }
  const fullTitle = input.absoluteTitle
    ? input.title
    : `${input.title} | ${siteConfig.name}`;
  return {
    title: input.absoluteTitle ? { absolute: input.title } : input.title,
    description: input.description,
    alternates: { canonical: input.path },
    robots: input.noindex
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      type: input.type ?? "website",
      siteName: siteConfig.name,
      locale: "en_GB",
      title: fullTitle,
      description: input.description,
      url: input.path,
      images: [{ url: image, width: 1200, height: 630, alt: input.title }],
      ...(input.type === "article"
        ? {
            publishedTime: input.publishedTime,
            modifiedTime: input.modifiedTime,
            authors: [`${siteConfig.name} editorial team`],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      images: [image],
      title: fullTitle,
      description: input.description,
    },
  };
}

/** Absolute URL for structured data and feeds. */
export function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.url).toString();
}
