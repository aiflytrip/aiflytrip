import type { Metadata } from "next";

import { FlightSearchForm } from "@/features/flights";
import { FeatureGrid, Hero, HowItWorks } from "@/features/marketing";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero search={<FlightSearchForm />} />
      <FeatureGrid />
      <HowItWorks />
    </>
  );
}
