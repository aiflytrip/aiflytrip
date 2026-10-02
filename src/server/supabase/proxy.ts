import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { supabasePublicConfig } from "@/lib/supabase/config";
import { type Database } from "@/lib/supabase/database.types";

/** Routes that require a signed-in user. Pages also re-check (defence in depth). */
const PROTECTED_PREFIXES = ["/account", "/plan", "/plans"];

function isProtected(pathname: string): boolean {
  return PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

/**
 * Refreshes the Supabase session on every request and writes updated auth
 * cookies, following Supabase's official Next.js guidance.
 */
function redirectToLogin(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = "/login";
  url.search = "";
  url.searchParams.set(
    "next",
    request.nextUrl.pathname + request.nextUrl.search,
  );
  return NextResponse.redirect(url);
}

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });
  // Without Supabase nobody can be signed in: still send protected routes
  // to /login with a real redirect instead of rendering their loading UI.
  if (!supabasePublicConfig) {
    return isProtected(request.nextUrl.pathname)
      ? redirectToLogin(request)
      : response;
  }

  // A new client per request: never reuse one across requests.
  const supabase = createServerClient<Database>(
    supabasePublicConfig.url,
    supabasePublicConfig.publishableKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          for (const { name, value } of cookiesToSet) {
            request.cookies.set(name, value);
          }
          response = NextResponse.next({ request });
          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
          // Responses that set auth cookies must never be cached, or a CDN
          // could serve one user's session to another.
          for (const [key, value] of Object.entries(headers)) {
            response.headers.set(key, value);
          }
        },
      },
    },
  );

  // Do not run code between createServerClient and getClaims(): getClaims
  // verifies the JWT and triggers the refresh that keeps users signed in.
  const { data } = await supabase.auth.getClaims();
  const signedIn = Boolean(data?.claims?.sub);

  if (!signedIn && isProtected(request.nextUrl.pathname)) {
    const redirect = redirectToLogin(request);
    // Carry over any cookies the refresh attempt changed (e.g. clearing a
    // stale session) so browser and server stay in sync.
    for (const cookie of response.cookies.getAll()) {
      redirect.cookies.set(cookie);
    }
    return redirect;
  }

  return response;
}
