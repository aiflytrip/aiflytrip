import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/button";
import { AuthCard } from "@/features/auth";

export const metadata: Metadata = {
  title: "Sign-in problem",
  robots: { index: false, follow: false },
};

// Fixed messages keyed by reason: never render error text from the URL,
// which anyone can craft.
const REASONS: Record<string, string> = {
  expired:
    "This link has expired. Sign in again, or sign up again to get a new confirmation email.",
  invalid_link:
    "This link is invalid or has already been used. If you just confirmed your email, try signing in.",
  not_configured: "Accounts aren't available yet.",
};

export default async function AuthErrorPage({
  searchParams,
}: PageProps<"/auth/error">) {
  const { reason } = await searchParams;
  const message =
    (typeof reason === "string" && REASONS[reason]) || REASONS.invalid_link;

  return (
    <AuthCard title="We couldn't complete that" description={message}>
      <ButtonLink href="/login" variant="secondary">
        Go to sign in
      </ButtonLink>
    </AuthCard>
  );
}
