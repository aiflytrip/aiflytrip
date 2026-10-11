"use client";

import { usePathname } from "next/navigation";

import { ADSENSE_CLIENT, isAdFreePath } from "@/config/ads";

/**
 * Google's AdSense loader, exactly as AdSense supplies it. A plain async
 * script tag (React moves it into <head>) so it is present in the page HTML,
 * which is where AdSense's site verification looks for it.
 */
export function AdSenseScript() {
  const pathname = usePathname();
  if (!ADSENSE_CLIENT || isAdFreePath(pathname)) return null;
  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      crossOrigin="anonymous"
    />
  );
}
