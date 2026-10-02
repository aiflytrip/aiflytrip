import { getCurrentUser } from "@/server/auth";

export const dynamic = "force-dynamic";

/**
 * Minimal session status for client-side UI (the site header), so public
 * pages can be statically rendered. Returns only booleans: no email, user
 * id or any other personal data. Authorization never relies on this; every
 * protected page and action re-checks the session on the server.
 */
export async function GET() {
  const user = await getCurrentUser();
  return Response.json(
    {
      signedIn: Boolean(user && !user.isAnonymous),
      guest: Boolean(user?.isAnonymous),
    },
    {
      headers: {
        "Cache-Control": "private, no-store",
        "X-Robots-Tag": "noindex",
      },
    },
  );
}
