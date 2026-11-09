import {
  ItinerariesHub,
  itinerariesHubMetadata,
} from "@/features/content/components/itineraries-hub";

// Scheduled itineraries appear on their publish date without a redeploy.
export const revalidate = 3600;

export const metadata = itinerariesHubMetadata("es");

export default function SpanishItinerariesPage() {
  return <ItinerariesHub locale="es" />;
}
