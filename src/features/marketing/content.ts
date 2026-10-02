export type Feature = {
  title: string;
  description: string;
};

export type Step = {
  title: string;
  description: string;
};

export const features: Feature[] = [
  {
    title: "Ask in plain language",
    description:
      "Describe your trip the way you'd tell a friend: dates, budget, who's coming and what matters to you.",
  },
  {
    title: "Flights that fit the plan",
    description:
      "Compare options on what you care about, such as total travel time, layovers and price, not just the cheapest fare.",
  },
  {
    title: "One place for the whole trip",
    description:
      "Keep searches, shortlists and itineraries together so planning picks up where you left off.",
  },
];

export const steps: Step[] = [
  {
    title: "Tell us where you want to go",
    description: "Share your destination, dates and preferences.",
  },
  {
    title: "Review AI-curated options",
    description: "See a short list of flights and plans with clear trade-offs.",
  },
  {
    title: "Book with confidence",
    description: "Pick the option that works and finish your booking.",
  },
];
