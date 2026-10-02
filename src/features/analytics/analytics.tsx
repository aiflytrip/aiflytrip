import Script from "next/script";

import { env } from "@/lib/env";

/**
 * Loads the configured analytics provider after the page is interactive, so
 * it never blocks rendering. Privacy rules (see SEO.md):
 * - No user ids, emails, plan ids or query strings are sent.
 * - GA4 runs with IP anonymisation, no Google signals and no ad
 *   personalisation; a consent banner is still required for EU/UK visitors
 *   before enabling GA4 (MANUAL ACTION).
 */
export function Analytics() {
  const config = env.analytics;
  if (config.provider === "plausible") {
    return (
      <Script
        defer
        data-domain={config.domain}
        src={config.scriptSrc}
        strategy="afterInteractive"
      />
    );
  }
  if (config.provider === "ga4") {
    const id = config.measurementId;
    return (
      <>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}',{anonymize_ip:true,allow_google_signals:false,allow_ad_personalization_signals:false,page_location:location.origin+location.pathname});`}
        </Script>
      </>
    );
  }
  return null;
}
