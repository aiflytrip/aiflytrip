import type { Metadata } from "next";
import { redirect } from "next/navigation";

import {
  AuthCard,
  FormMessage,
  LoginForm,
  safeNextPath,
} from "@/features/auth";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getCurrentUser } from "@/server/auth";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const params = await searchParams;
  const next = safeNextPath(params.next);

  if (!isSupabaseConfigured) {
    return (
      <AuthCard title="Sign in">
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
      title="Sign in"
      description="Save searches and pick up your trip plans on any device."
    >
      <LoginForm next={next} />
    </AuthCard>
  );
}
