import { type Airline } from "@/features/flights/types";

/** Fictional carriers so mock results are never mistaken for real fares. */
export const MOCK_AIRLINES: readonly Airline[] = [
  { code: "SB", name: "SkyBridge Air" },
  { code: "NW", name: "Northwind Airways" },
  { code: "CP", name: "Coral Pacific" },
  { code: "MR", name: "Meridian Air" },
  { code: "AZ", name: "Azure Atlantic" },
  { code: "HL", name: "Horizon Line" },
];
