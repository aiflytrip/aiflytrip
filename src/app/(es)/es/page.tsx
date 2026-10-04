import {
  LocalizedHome,
  localizedHomeMetadata,
} from "@/features/marketing/localized-home";

export const metadata = localizedHomeMetadata("es");

export default function HomePage() {
  return <LocalizedHome locale="es" />;
}
