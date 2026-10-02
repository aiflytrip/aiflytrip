import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

import {
  AuthCard,
  FormMessage,
  LoginForm,
  safeNextPath,
} from "@/features/auth";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getAccountUser, getCurrentUser } from "@/server/auth";

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
  if (await getAccountUser()) redirect(next);

  return (
    <AuthCard
      title="Sign in"
      description="Save searches and pick up your trip plans on any device."
    >
      {(await getCurrentUser())?.isAnonymous ? (
        <FormMessage>
          You have plans saved as a guest. Signing in to an existing account
          won&apos;t move them; to keep them,{" "}
          <Link
            href={`/signup?next=${encodeURIComponent(next)}`}
            className="font-semibold underline"
          >
            create an account
          </Link>{" "}
          instead.
        </FormMessage>
      ) : null}
      <LoginForm next={next} />
    </AuthCard>
  );
}
