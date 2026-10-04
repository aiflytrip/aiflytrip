import { destinations, isLive } from "@/content/registry";
import { type DestinationHint } from "@/features/tools/days/days-planner";

/** Spanish and French names, so "Lisboa" or "Lisbonne" finds the Lisbon guide. */
const ALIASES: Record<string, string[]> = {
  France: ["Francia"],
  Paris: ["París"],
  Italy: ["Italia", "Italie"],
  Rome: ["Roma"],
  Japan: ["Japón", "Japon"],
  Tokyo: ["Tokio"],
  Portugal: [],
  Lisbon: ["Lisboa", "Lisbonne"],
};

/** Live destination guides the trip length planner can suggest. */
export function destinationHints(): DestinationHint[] {
  return destinations.filter(isLive).map((d) => ({
    name: d.name,
    path: d.path,
    summary: d.tripLength.summary,
    aliases: ALIASES[d.name] ?? [],
  }));
}
