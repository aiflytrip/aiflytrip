import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: new URL("/", siteConfig.url).toString(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: new URL("/flights", siteConfig.url).toString(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
