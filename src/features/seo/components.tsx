import Link from "next/link";
import { Fragment } from "react";

import {
  breadcrumbLd,
  serializeJsonLd,
  type Crumb,
} from "@/features/seo/json-ld";

/** Inline JSON-LD. Escapes <, > and & so content can't break out of the script tag. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}

/** Visible breadcrumb trail plus matching BreadcrumbList structured data. */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1.5">
          {crumbs.map((crumb, index) => {
            const last = index === crumbs.length - 1;
            return (
              <Fragment key={crumb.path}>
                <li>
                  {last ? (
                    <span aria-current="page" className="text-foreground">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link
                      href={crumb.path}
                      className="hover:text-foreground hover:underline"
                    >
                      {crumb.name}
                    </Link>
                  )}
                </li>
                {last ? null : (
                  <li aria-hidden="true" className="text-border">
                    /
                  </li>
                )}
              </Fragment>
            );
          })}
        </ol>
      </nav>
      <JsonLd
        data={{ "@context": "https://schema.org", ...breadcrumbLd(crumbs) }}
      />
    </>
  );
}
