import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/button";
import { AuthCard } from "@/features/auth";

export const metadata: Metadata = {
  title: "Check your email",
  robots: { index: false, follow: false },
};

export default function CheckEmailPage() {
  return (
    <AuthCard
      title="Check your email"
      description="If that address can be used for a new account, we've sent it a confirmation link."
    >
      <div className="flex flex-col gap-4 text-sm text-muted-foreground">
        <p>
          Open the link in this browser to finish creating your account. It may
          take a minute to arrive; check your spam folder too.
        </p>
        <ButtonLink href="/login" variant="secondary">
          Back to sign in
        </ButtonLink>
      </div>
    </AuthCard>
  );
}
