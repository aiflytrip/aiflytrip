import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";
import { signOut } from "@/features/auth/actions";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getCurrentUser } from "@/server/auth";

/** Header auth controls. Renders nothing until Supabase is configured. */
export async function AuthNav() {
  if (!isSupabaseConfigured) return null;
  const user = await getCurrentUser();

  if (!user) {
    return (
      <ButtonLink href="/login" size="sm" variant="secondary">
        Sign in
      </ButtonLink>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <Link
        href="/account"
        className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        Account
      </Link>
      <form action={signOut}>
        <button
          type="submit"
          className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          Sign out
        </button>
      </form>
    </div>
  );
}
