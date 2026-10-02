import { type DestinationSchema } from "@/content/schema";
import { SOURCES } from "@/content/data/sources";
import { type z } from "zod";

type DestinationInput = z.input<typeof DestinationSchema>;

export const japan: DestinationInput = {
  kind: "country",
  slug: "japan",
  name: "Japan",
  status: "published",
  lastReviewed: "2026-10-02",
  title: "Japan travel planning guide: seasons, routes and rail",
  description:
    "Plan a trip to Japan: the best season to visit, how many days you need, a classic Tokyo–Kyoto–Osaka route, rail travel and practical first-timer tips.",
  headline: "Planning a trip to Japan",
  intro:
    "Japan combines huge, efficient cities with quiet temples, mountain towns and distinctive regional food. Its rail network makes it easy to cover a lot of ground, but the best trips still pick a focused route and leave room to slow down.",
  overview: [
    "Many first trips follow a route from Tokyo to Kyoto and Osaka, often adding a stop such as Hakone for views of Mount Fuji, Nara for its temples and deer park, or Hiroshima and nearby Miyajima. These places are linked by the shinkansen (bullet train), so you can travel between them in a few hours.",
    "Each stop has a different feel. Tokyo is a collection of neighbourhoods, from historic Asakusa to the energy of Shinjuku and Shibuya. Kyoto is known for temples, shrines and traditional streets. Osaka is famous for street food and nightlife. Further afield, Hokkaido offers nature and winter snow, while Okinawa has a subtropical climate and beaches.",
    "Seasons shape a trip to Japan more than most destinations: cherry blossom in spring and autumn colours draw large crowds, while early summer brings a rainy season and late summer can be hot and humid.",
  ],
  bestTime: {
    summary:
      "Spring and autumn are the most popular seasons for comfortable weather and seasonal scenery, so they are also the busiest. Winter is cold but clear in many regions, and summer is hot and humid.",
    seasons: [
      {
        name: "Spring",
        months: "March to May",
        notes:
          "Cherry blossom season usually peaks in Tokyo and Kyoto around late March to early April, varying by year. Japan's Golden Week holidays (late April to early May) are very busy.",
      },
      {
        name: "Early summer",
        months: "June to July",
        notes:
          "The rainy season affects much of the country, bringing frequent showers and humidity, though gardens are lush.",
      },
      {
        name: "Late summer",
        months: "August to September",
        notes:
          "Hot and humid with summer festivals and fireworks; typhoons can disrupt travel in this period.",
      },
      {
        name: "Autumn",
        months: "October to November",
        notes:
          "Comfortable temperatures and autumn leaves, often at their best around November in Kyoto and Tokyo.",
      },
      {
        name: "Winter",
        months: "December to February",
        notes:
          "Cold, often dry and clear in Tokyo and Kyoto, with heavy snow and skiing in Hokkaido and the Japanese Alps.",
      },
    ],
  },
  tripLength: {
    summary:
      "Ten days to two weeks suits a first trip on the Tokyo–Kyoto–Osaka route. With a week, focus on two bases.",
    options: [
      {
        days: "5–7 days",
        description:
          "Tokyo and Kyoto, or Tokyo with day trips to places like Hakone, Kamakura or Nikko.",
      },
      {
        days: "10 days",
        description:
          "Tokyo, Kyoto and Osaka, with day trips to Nara and possibly Hakone.",
      },
      {
        days: "14 days",
        description:
          "The classic route plus Hiroshima and Miyajima, or a slower stop such as Kanazawa or the Japanese Alps.",
      },
    ],
  },
  highlights: [
    {
      name: "Tokyo",
      description:
        "A vast, safe and easy-to-navigate city of distinct neighbourhoods, food and culture.",
    },
    {
      name: "Kyoto",
      description:
        "Temples, shrines, gardens and traditional districts; staying a few nights helps you see it beyond the peak crowds.",
    },
    {
      name: "Osaka",
      description:
        "A food-focused city with lively nightlife and easy day trips to Nara.",
    },
    {
      name: "Nara",
      description:
        "Ancient temples, including a giant Buddha, and a park known for its free-roaming deer.",
    },
    {
      name: "Hakone",
      description:
        "Hot springs, lakes and, on clear days, views of Mount Fuji, within reach of Tokyo.",
    },
    {
      name: "Hiroshima and Miyajima",
      description:
        "The Peace Memorial Park and Museum, and the island shrine with its famous gate in the water.",
    },
  ],
  gettingAround: [
    "The shinkansen links major cities quickly and reliably. Whether a Japan Rail Pass is worth it depends on your route, so compare the current pass price on the official site with the cost of individual tickets for your planned journeys.",
    "In cities, rechargeable IC cards such as Suica, Pasmo or ICOCA can be used on most trains, subways and buses, and in many shops.",
    "Local trains and buses reach most towns, but in rural areas services can be less frequent, so check timetables before day trips.",
  ],
  planning: [
    {
      topic: "Entry requirements",
      detail:
        "Visa rules depend on your nationality and the purpose of your trip. Check the Ministry of Foreign Affairs of Japan and your government's travel advice before you book.",
    },
    {
      topic: "Money",
      detail:
        "Japan uses the yen. Card acceptance has grown, but cash is still useful at smaller restaurants, shrines and rural businesses; many convenience stores have ATMs that accept foreign cards.",
    },
    {
      topic: "Etiquette",
      detail:
        "Tipping isn't customary in Japan. Quiet behaviour on public transport and following local guidance at temples and shrines are appreciated.",
    },
    {
      topic: "Peak seasons",
      detail:
        "Cherry blossom season, Golden Week and autumn-leaf season are very busy. Book accommodation early if you plan to travel then.",
    },
  ],
  tips: [
    "Use luggage-forwarding services between hotels on travel days so you can ride trains with just a day bag.",
    "Plan temples and popular viewpoints for early morning to avoid crowds.",
    "Carry a small amount of cash and a coin purse, as some places are cash only.",
    "Download offline maps and a translation app; signs in major stations are usually in English, but smaller places may not be.",
  ],
  faqs: [
    {
      question: "How many days do you need in Japan?",
      answer:
        "For a first trip, ten days to two weeks works well for Tokyo, Kyoto and Osaka with a few day trips. With a week, choose two bases, such as Tokyo and Kyoto. Japan's trains make it easy to move around, but frequent hotel changes eat into your time.",
    },
    {
      question: "When is the best time to visit Japan?",
      answer:
        "Spring and autumn are the most popular seasons, with mild weather, cherry blossom in spring and colourful leaves in autumn. They are also the busiest times. Winter is cold but often clear, while early summer is rainy and late summer is hot and humid.",
    },
    {
      question: "Is the Japan Rail Pass worth it?",
      answer:
        "It depends on how much long-distance train travel you plan. Add up the cost of individual tickets for your route and compare it with the current pass price on the official Japan Rail Pass website. For a simple Tokyo–Kyoto–Osaka trip, individual tickets can sometimes be cheaper.",
    },
    {
      question: "Do I need cash in Japan?",
      answer:
        "Cards are increasingly accepted, especially in cities and larger businesses, but cash is still needed at some small restaurants, temples and rural shops. Keeping some yen on hand and using convenience-store ATMs is a practical approach.",
    },
  ],
  airports: ["HND"],
  related: {
    destinations: [
      "/destinations/japan/tokyo",
      "/destinations/france",
      "/destinations/italy",
    ],
    itineraries: ["tokyo-5-days"],
    guides: [
      "how-to-plan-a-trip",
      "how-many-days-for-a-trip",
      "travel-documents-checklist",
    ],
  },
  sources: [
    SOURCES.japan,
    SOURCES.japanVisa,
    SOURCES.jrPass,
    SOURCES.ukAdvice("japan", "Japan"),
    SOURCES.usTravel,
  ],
};

export const tokyo: DestinationInput = {
  kind: "city",
  slug: "tokyo",
  country: "japan",
  name: "Tokyo",
  status: "published",
  lastReviewed: "2026-10-02",
  title: "Tokyo travel planning guide: neighbourhoods and timing",
  description:
    "Plan your Tokyo trip: which neighbourhoods to explore, how many days to spend, when to visit, getting around by train and IC card, and easy day trips.",
  headline: "Planning a trip to Tokyo",
  intro:
    "Tokyo is enormous but surprisingly easy to explore, because it works like a set of neighbourhoods connected by an excellent train network. Planning each day around one or two areas, and mixing busy districts with quieter ones, makes the city feel manageable.",
  overview: [
    "The JR Yamanote Line loops around central Tokyo and links many of the districts visitors use most. Shinjuku and Shibuya are busy hubs with shopping, nightlife and famous crossings; Harajuku and Omotesando mix youth fashion with tree-lined avenues and the Meiji Jingu shrine; Asakusa centres on the historic Senso-ji temple; Ueno has a large park and several major museums.",
    "Other areas show different sides of the city: Ginza for upscale shopping, Akihabara for electronics and anime culture, Shimokitazawa for vintage shops and small bars, and Tsukiji's outer market for food stalls. Tokyo's food scene ranges from convenience stores and standing noodle bars to some of the world's most celebrated restaurants.",
    "Several rewarding day trips are within easy reach, including Kamakura for temples and the coast, Nikko for ornate shrines in the mountains, Hakone for hot springs and Mount Fuji views, and Yokohama for its waterfront and Chinatown.",
  ],
  bestTime: {
    summary:
      "Spring and autumn are the most comfortable and popular times to visit. Winter is cool and often clear, while summer is hot and humid, with a rainy season in early summer.",
    seasons: [
      {
        name: "Spring",
        months: "March to May",
        notes:
          "Cherry blossom usually peaks around late March to early April, varying by year; parks get very busy.",
      },
      {
        name: "Summer",
        months: "June to August",
        notes:
          "Rainy season in early summer, then heat and humidity; summer festivals and fireworks are highlights.",
      },
      {
        name: "Autumn",
        months: "September to November",
        notes:
          "Pleasant temperatures and autumn colours later in the season; early autumn can still bring typhoons.",
      },
      {
        name: "Winter",
        months: "December to February",
        notes:
          "Cold but frequently dry and clear, sometimes with views of Mount Fuji from high viewpoints.",
      },
    ],
  },
  tripLength: {
    summary:
      "Four to five days lets you explore several neighbourhoods and take a day trip; three days covers the highlights.",
    options: [
      {
        days: "3 days",
        description:
          "Historic Asakusa and Ueno, the Shinjuku and Shibuya hubs, and Harajuku with Meiji Jingu.",
      },
      {
        days: "4–5 days",
        description:
          "Add quieter neighbourhoods, a food-focused day and one day trip such as Kamakura or Hakone.",
      },
      {
        days: "6+ days",
        description:
          "Add a second day trip or use Tokyo as the start of a wider route to Kyoto and Osaka.",
      },
    ],
  },
  highlights: [
    {
      name: "Senso-ji and Asakusa",
      description:
        "Tokyo's oldest temple area, with a market street leading to the main hall.",
    },
    {
      name: "Meiji Jingu and Harajuku",
      description:
        "A forested shrine beside one of the city's best-known fashion districts.",
    },
    {
      name: "Shibuya",
      description:
        "The famous scramble crossing, shopping and nightlife, with views from nearby observation decks.",
    },
    {
      name: "Shinjuku",
      description:
        "A huge transport hub with skyscrapers, Shinjuku Gyoen garden and lively small-bar alleys.",
    },
    {
      name: "Ueno Park and museums",
      description:
        "A large park with major museums, including the Tokyo National Museum.",
    },
    {
      name: "Tsukiji Outer Market",
      description:
        "Food stalls and shops around the site of the former wholesale market.",
    },
    {
      name: "Day trips",
      description:
        "Kamakura, Nikko, Hakone and Yokohama each offer a change of pace from the city.",
    },
  ],
  gettingAround: [
    "Trains and subways reach almost everywhere visitors go. A rechargeable IC card such as Suica or Pasmo is the simplest way to pay fares and can also be used in many shops.",
    "Stations can be large and busy at rush hour; allow extra time for transfers and use exit numbers shown on maps to find your way out.",
    "Tokyo has two main airports, Haneda and Narita, both connected to the city by rail and bus. Haneda is closer to central Tokyo.",
  ],
  planning: [
    {
      topic: "Where to stay",
      detail:
        "Staying near a station on or close to the Yamanote Line makes getting around easy. Shinjuku, Shibuya, Tokyo Station and Ueno are popular, well-connected bases.",
    },
    {
      topic: "Reservations",
      detail:
        "Some popular attractions, restaurants and observation decks sell timed tickets in advance. Book the ones that matter most to you before you arrive.",
    },
    {
      topic: "Money and payments",
      detail:
        "Cards are widely accepted in Tokyo, but some small restaurants and shops are cash only. Convenience-store ATMs generally accept foreign cards.",
    },
    {
      topic: "Etiquette",
      detail:
        "Quiet behaviour on trains, queuing in line and not tipping are the norm. Follow local guidance when visiting temples and shrines.",
    },
  ],
  tips: [
    "Plan each day around one or two neighbourhoods to avoid spending hours on trains.",
    "Visit popular temples, shrines and viewpoints early in the morning for a calmer experience.",
    "Convenience stores are excellent for quick breakfasts, snacks, ATMs and essentials.",
    "Carry a small bag for rubbish; public bins can be hard to find.",
  ],
  faqs: [
    {
      question: "How many days do you need in Tokyo?",
      answer:
        "Four to five days is ideal for a first visit. It gives you time for the main neighbourhoods, some quieter areas and a day trip to somewhere like Kamakura or Hakone. With three days, focus on Asakusa, Shibuya, Shinjuku and Harajuku.",
    },
    {
      question: "Where is the best area to stay in Tokyo?",
      answer:
        "Areas along or near the JR Yamanote Line, such as Shinjuku, Shibuya, Tokyo Station and Ueno, are convenient because they connect easily to the rest of the city. Choose based on whether you prefer nightlife, quieter streets or easy airport and rail access.",
    },
    {
      question: "Is Tokyo easy to get around for first-time visitors?",
      answer:
        "Yes. Trains and subways are frequent and reliable, major stations have signs in English, and IC cards make paying fares simple. Large stations can be confusing at first, so allow extra time and follow exit numbers to your destination.",
    },
    {
      question: "What are the best day trips from Tokyo?",
      answer:
        "Popular choices include Kamakura for temples and the coast, Hakone for hot springs and Mount Fuji views, Nikko for its ornate shrines and Yokohama for its waterfront. Each can be reached by train, so check current routes and journey times when you plan.",
    },
  ],
  airports: ["HND"],
  related: {
    destinations: [
      "/destinations/japan",
      "/destinations/france/paris",
      "/destinations/portugal/lisbon",
    ],
    itineraries: ["tokyo-5-days"],
    guides: ["how-to-plan-a-trip", "how-many-days-for-a-trip"],
  },
  sources: [SOURCES.tokyo, SOURCES.japan, SOURCES.ukAdvice("japan", "Japan")],
};
