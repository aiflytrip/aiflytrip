import type { Metadata } from "next";
import { redirect } from "next/navigation";

import {
  AuthCard,
  FormMessage,
  SignupForm,
  safeNextPath,
} from "@/features/auth";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getCurrentUser } from "@/server/auth";

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
  if (await getCurrentUser()) redirect(next);

  return (
    <AuthCard
      title="Create an account"
      description="Free. We'll email you a link to confirm your address."
    >
      <SignupForm next={next} />
    </AuthCard>
  );
}
