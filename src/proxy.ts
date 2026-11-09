import { type NextRequest } from "next/server";

import { updateSession } from "@/server/supabase/proxy";

export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  // Only routes that read or refresh the session. Public marketing and
  // content pages skip the proxy entirely, so they stay fast and static.
  matcher: [
    "/account/:path*",
    "/plan",
    "/plans/:path*",
    "/flights",
    "/es/vuelos",
    "/login",
    "/signup/:path*",
    "/auth/:path*",
    "/api/auth/:path*",
  ],
};
