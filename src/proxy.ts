import { type NextRequest } from "next/server";

import { updateSession } from "@/server/supabase/proxy";

export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    // Everything except static assets, image optimization, the health check
    // and metadata files, which never need a session.
    "/((?!_next/static|_next/image|api/health|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
