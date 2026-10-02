import type { Metadata } from "next";
import { redirect } from "next/navigation";

import {
  AuthCard,
  FormMessage,
  SignupForm,
  safeNextPath,
} from "@/features/auth";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getAccountUser, getCurrentUser } from "@/server/auth";

export const metadata: Metadata = {
  title: "Create an account",
  robots: { index: false, follow: false },
};

export default async function SignupPage({
  searchParams,
}: PageProps<"/signup">) {
  const params = await searchParams;
  const next = safeNextPath(params.next);

  if (!isSupabaseConfigured) {
    return (
      <AuthCard title="Create an account">
        <FormMessage>
          Accounts aren&apos;t available yet. Flight search still works without
          signing in.
        </FormMessage>
      </AuthCard>
    );
  }
  if (await getAccountUser()) redirect(next);

  const guest = Boolean((await getCurrentUser())?.isAnonymous);
  const forPremium = params.reason === "premium";

  return (
    <AuthCard
      title={
        forPremium ? "Create your account to get the PDF" : "Create an account"
      }
      description="Free. We'll email you a link to confirm your address."
    >
      {guest ? (
        <FormMessage tone="success">
          {forPremium
            ? "Your plan stays with you. Confirm your email, then you'll be able to unlock and download the PDF."
            : "The plans you made as a guest will be saved to your new account."}
        </FormMessage>
      ) : null}
      <SignupForm next={next} />
    </AuthCard>
  );
}
