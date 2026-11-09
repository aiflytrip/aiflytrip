import {
  DestinationsHub,
  destinationsHubMetadata,
} from "@/features/content/components/destinations-hub";

export const metadata = destinationsHubMetadata("es");

export default function SpanishDestinationsPage() {
  return <DestinationsHub locale="es" />;
}
