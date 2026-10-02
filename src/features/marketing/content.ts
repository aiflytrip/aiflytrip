import { type Faq } from "@/content/schema";

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
    title: "Personalized, day-by-day plans",
    description:
      "Share your dates, budget, pace and interests, and get a morning, afternoon and evening plan for every day of your trip.",
  },
  {
    title: "Flight options in context",
    description:
      "The planner compares flight options for your dates and explains which one fits your plan, weighing price, duration and stops.",
  },
  {
    title: "A budget you can plan around",
    description:
      "See an estimate by category, from flights and accommodation to food and activities, in the currency you choose.",
  },
];

export const steps: Step[] = [
  {
    title: "Tell us about your trip",
    description:
      "Where you're flying from and to, your dates, budget, pace and what you enjoy.",
  },
  {
    title: "Get your AI-drafted plan",
    description:
      "A day-by-day itinerary, a suggested flight and a budget estimate, saved privately to your account.",
  },
  {
    title: "Refine and check the details",
    description:
      "Adjust the plan to suit you, then confirm prices, opening days and entry rules with official sources.",
  },
];

/** Homepage FAQ: rendered visibly and mirrored in FAQPage structured data. */
export const homeFaqs: Faq[] = [
  {
    question: "What is AIFlyTrip?",
    answer:
      "AIFlyTrip is an AI trip planner. You enter your trip details and preferences, and it creates a personalized, day-by-day travel itinerary with a suggested flight and an estimated budget. It also offers destination guides, ready-made itineraries and travel planning advice.",
  },
  {
    question: "How is an AI trip planner different from a travel guide?",
    answer:
      "A travel guide gives the same advice to everyone. An AI trip planner builds a plan around your own dates, budget, pace and interests, so a relaxed food-focused weekend and a packed sightseeing trip to the same city end up looking quite different.",
  },
  {
    question: "Does AIFlyTrip book flights or hotels?",
    answer:
      "No. AIFlyTrip helps you plan and compare options but doesn't make bookings. Flight options are currently shown from a test environment, so they are examples for planning rather than live, bookable fares.",
  },
  {
    question: "Which destinations can I plan a trip to?",
    answer:
      "The planner works with the airports supported by our flight search, and our guides currently cover destinations including France, Italy, Japan and Portugal. We add new destination guides only when they meet our quality standards.",
  },
];
