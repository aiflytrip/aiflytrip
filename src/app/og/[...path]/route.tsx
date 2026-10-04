import { renderOgImage } from "@/features/seo/og-image";
import { ogTargets } from "@/features/seo/og-targets";

/**
 * Social cards for content pages, at /og/<page path>. A route handler
 * outside the route groups keeps these URLs stable (metadata image files
 * inside a group get a hashed URL). Pages published later render on demand.
 */
export const revalidate = 3600;

export function generateStaticParams() {
  return ogTargets().map((t) => ({ path: t.path.split("/").filter(Boolean) }));
}

export async function GET(
  _request: Request,
  ctx: RouteContext<"/og/[...path]">,
) {
  const path = `/${(await ctx.params).path.join("/")}`;
  const target = ogTargets().find((t) => t.path === path);
  if (!target) return new Response("Not found", { status: 404 });
  return renderOgImage({ eyebrow: target.eyebrow, title: target.title });
}
