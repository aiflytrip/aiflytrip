import { ButtonLink } from "@/components/ui/button";
import { SaveSearchButton } from "@/features/saved-trips/components/save-search-button";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getCurrentUser } from "@/server/auth";

/**
 * "Save search" for signed-in users, "Sign in to save" otherwise. Hidden
 * entirely until accounts are configured.
 */
export async function SaveSearch({ search }: { search: string }) {
  if (!isSupabaseConfigured) return null;
  const user = await getCurrentUser();

  if (!user) {
    return (
      <ButtonLink
        href={`/login?next=${encodeURIComponent(`/flights?${search}`)}`}
        variant="secondary"
        size="sm"
      >
        Sign in to save
      </ButtonLink>
    );
  }
  return <SaveSearchButton search={search} />;
}
