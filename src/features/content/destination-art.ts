/**
 * Gradient "art" for destination cards and headers until licensed
 * photography is added. Purely decorative; keyed by destination slug.
 */
const ART: Record<string, { background: string; mark: string }> = {
  japan: {
    mark: "JP",
    background:
      "linear-gradient(160deg, #1e1b4b 0%, #831843 55%, #f472b6 120%)",
  },
  tokyo: {
    mark: "TYO",
    background:
      "linear-gradient(160deg, #1e1b4b 0%, #9d174d 60%, #fda4af 130%)",
  },
  portugal: {
    mark: "PT",
    background:
      "linear-gradient(160deg, #0c4a6e 0%, #0e7490 55%, #fbbf24 130%)",
  },
  lisbon: {
    mark: "LIS",
    background:
      "linear-gradient(160deg, #0c4a6e 0%, #0369a1 60%, #fcd34d 135%)",
  },
  italy: {
    mark: "IT",
    background:
      "linear-gradient(160deg, #3b0764 0%, #9a3412 60%, #fdba74 125%)",
  },
  rome: {
    mark: "ROM",
    background:
      "linear-gradient(160deg, #431407 0%, #b45309 60%, #fde68a 130%)",
  },
  france: {
    mark: "FR",
    background:
      "linear-gradient(160deg, #172554 0%, #1d4ed8 60%, #93c5fd 130%)",
  },
  paris: {
    mark: "PAR",
    background:
      "linear-gradient(160deg, #1e1b4b 0%, #4338ca 60%, #c4b5fd 130%)",
  },
};

const FALLBACK = {
  mark: "",
  background: "linear-gradient(160deg, #0f172a 0%, #0369a1 60%, #a78bfa 130%)",
};

export function destinationArt(slug: string) {
  return ART[slug] ?? FALLBACK;
}
