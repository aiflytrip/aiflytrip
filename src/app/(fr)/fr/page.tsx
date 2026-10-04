import {
  LocalizedHome,
  localizedHomeMetadata,
} from "@/features/marketing/localized-home";

export const metadata = localizedHomeMetadata("fr");

export default function HomePage() {
  return <LocalizedHome locale="fr" />;
}
