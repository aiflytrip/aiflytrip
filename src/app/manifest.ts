import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

/** Web app manifest: name, colours and home-screen icons. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name}: free AI trip planner`,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#070b16",
    theme_color: "#070b16",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
