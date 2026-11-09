import {
  DestinationsHub,
  destinationsHubMetadata,
} from "@/features/content/components/destinations-hub";

export const metadata = destinationsHubMetadata("en");

export default function DestinationsPage() {
  return <DestinationsHub locale="en" />;
}
