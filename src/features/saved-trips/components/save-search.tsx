import { ButtonLink } from "@/components/ui/button";
import { SaveSearchButton } from "@/features/saved-trips/components/save-search-button";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { FLIGHT_MESSAGES, type FlightLocale } from "@/i18n/messages/flights";
import { getAccountUser } from "@/server/auth";

/**
 * "Save search" for signed-in users, "Sign in to save" otherwise. Hidden
 * entirely until accounts are configured.
 */
export async function SaveSearch({
  search,
  locale = "en",
}: {
  search: string;
  locale?: FlightLocale;
}) {
  if (!isSupabaseConfigured) return null;
  const t = FLIGHT_MESSAGES[locale];
  const user = await getAccountUser();

  if (!user) {
    return (
      <ButtonLink
        href={`/login?next=${encodeURIComponent(`${t.path}?${search}`)}`}
        variant="secondary"
        size="sm"
      >
        {t.save.signIn}
      </ButtonLink>
    );
  }
  return <SaveSearchButton search={search} labels={t.save} />;
}
