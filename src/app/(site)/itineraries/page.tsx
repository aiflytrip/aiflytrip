import {
  ItinerariesHub,
  itinerariesHubMetadata,
} from "@/features/content/components/itineraries-hub";

// Scheduled itineraries appear on their publish date without a redeploy.
export const revalidate = 3600;

export const metadata = itinerariesHubMetadata("en");

export default function ItinerariesPage() {
  return <ItinerariesHub locale="en" />;
}
