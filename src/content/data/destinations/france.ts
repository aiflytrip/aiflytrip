import { type DestinationSchema } from "@/content/schema";
import { SOURCES } from "@/content/data/sources";
import { type z } from "zod";

type DestinationInput = z.input<typeof DestinationSchema>;

export const france: DestinationInput = {
  kind: "country",
  slug: "france",
  name: "France",
  status: "published",
  lastReviewed: "2026-10-02",
  title: "France travel planning guide: when to go and how long",
  description:
    "Plan a trip to France: the best time to visit, how many days you need, regions worth your time, getting around by train, and practical tips.",
  headline: "Planning a trip to France",
  intro:
    "France rewards travellers who plan around a few regions rather than trying to see everything. This guide covers when to go, how long to stay, how the regions differ and how to move between them, so you can shape a trip that matches your pace and interests.",
  overview: [
    "Most first trips start in Paris, then add one or two regions with a very different character: the castles and vineyards of the Loire Valley, the lavender fields and hill towns of Provence, the beaches and old towns of the Côte d'Azur, the coast and history of Normandy, or the mountains of the French Alps. Each region works best as a base for several nights rather than a one-night stop.",
    "France is large, but its high-speed rail network links Paris with many regional cities in a few hours, which makes a city-plus-region trip practical without a car. Rural areas such as the Loire Valley, the Dordogne or inland Provence are much easier to explore with a rental car or an organised day tour.",
    "Food is a central part of travel in France. Planning meals around local markets, regional specialities and a few restaurant reservations tends to shape a trip as much as sightseeing does, so it is worth leaving unhurried time for it.",
  ],
  bestTime: {
    summary:
      "Late spring and early autumn usually offer the best balance of mild weather and manageable crowds. July and August are the busiest months for travel, while winter suits city breaks and ski trips.",
    seasons: [
      {
        name: "Spring",
        months: "April to June",
        notes:
          "Mild weather, gardens in bloom and generally fewer visitors than midsummer. A good time for Paris, the Loire Valley and Provence.",
      },
      {
        name: "Summer",
        months: "July and August",
        notes:
          "Peak season on the coasts and in the Alps. Many French residents take holidays in August, so some small, family-run businesses in cities may close for part of the month.",
      },
      {
        name: "Autumn",
        months: "September to October",
        notes:
          "Warm early autumn days, harvest season in wine regions and thinner crowds after the summer holidays.",
      },
      {
        name: "Winter",
        months: "November to March",
        notes:
          "Cooler and quieter in cities, with festive markets in December. The Alps become the focus for skiing from roughly December.",
      },
    ],
  },
  tripLength: {
    summary:
      "A week lets you combine Paris with one region at a comfortable pace. With two weeks you can add a second region without spending most of your time in transit.",
    options: [
      {
        days: "3–4 days",
        description:
          "Enough for Paris on its own, or Paris plus a day trip such as the Palace of Versailles.",
      },
      {
        days: "7 days",
        description:
          "Paris for three or four days, then one region such as the Loire Valley, Normandy or Provence for the rest of the week.",
      },
      {
        days: "10–14 days",
        description:
          "Paris plus two contrasting regions, for example Provence and the Côte d'Azur, linked by high-speed train.",
      },
    ],
  },
  highlights: [
    {
      name: "Paris",
      description:
        "World-class museums, distinctive neighbourhoods and a walkable centre along the Seine.",
    },
    {
      name: "Loire Valley",
      description:
        "A river valley known for its châteaux, gardens and wine, best explored by car or bike over several days.",
    },
    {
      name: "Provence",
      description:
        "Hill villages, markets and summer lavender fields, with cities such as Avignon and Aix-en-Provence as bases.",
    },
    {
      name: "Côte d'Azur",
      description:
        "The Mediterranean coast around Nice, with beaches, old towns and easy rail links between coastal towns.",
    },
    {
      name: "Normandy",
      description:
        "Coastal scenery, the abbey of Mont-Saint-Michel and the D-Day landing beaches and memorials.",
    },
    {
      name: "French Alps",
      description:
        "Mountain towns, summer hiking and winter skiing, with Chamonix and Annecy among popular bases.",
    },
  ],
  gettingAround: [
    "High-speed TGV trains connect Paris with cities such as Lyon, Marseille, Bordeaux and Lille. Booking in advance usually gives a wider choice of fares and seats; check current timetables and prices with SNCF.",
    "Regional trains and buses cover many smaller towns, but services can be infrequent in rural areas, so check timetables before relying on them for day trips.",
    "A rental car is the most flexible option for the countryside and small villages. In big cities it is usually easier to leave the car and use public transport.",
  ],
  planning: [
    {
      topic: "Entry requirements",
      detail:
        "France is part of the Schengen Area. Entry rules, visa requirements and the EU's newer border systems depend on your nationality, so check the official EU and government sources listed below before you book.",
    },
    {
      topic: "Money",
      detail:
        "France uses the euro. Cards are widely accepted, but it is useful to carry a small amount of cash for markets, small cafés and rural areas.",
    },
    {
      topic: "Language",
      detail:
        'French is the main language. Learning a few polite phrases, such as greeting staff with "bonjour" when entering a shop, goes a long way.',
    },
    {
      topic: "Reservations",
      detail:
        "Popular museums and attractions often use timed-entry tickets, and well-known restaurants can fill up. Booking key visits ahead helps you plan each day realistically.",
    },
  ],
  tips: [
    "Base yourself in two or three places rather than changing hotels every night; it saves time and makes day trips easier.",
    "Plan at least one slow day per week with no fixed bookings, for markets, cafés and wandering.",
    "Check whether the attractions you care about close on a particular weekday, as many museums close one day a week.",
    "If you visit in August, confirm that small restaurants or shops you want to visit are open, as some close for summer holidays.",
  ],
  faqs: [
    {
      question: "How many days do you need in France?",
      answer:
        "For a first trip, about a week works well: three or four days in Paris and three or four days in one region. With ten to fourteen days you can add a second region without rushing, especially if you use high-speed trains between them.",
    },
    {
      question: "What is the best month to visit France?",
      answer:
        "May, June and September are often recommended because the weather is usually pleasant and crowds are smaller than in July and August. The best month for you depends on whether you want beaches, cities, wine regions or skiing.",
    },
    {
      question: "Do you need a car to travel around France?",
      answer:
        "Not for cities: Paris and other major cities are well served by trains and public transport. A car is very helpful for rural regions such as the Loire Valley, the Dordogne or inland Provence, where villages are spread out and public transport is limited.",
    },
    {
      question: "Do I need a visa to visit France?",
      answer:
        "It depends on your nationality and the length and purpose of your stay. France follows Schengen Area rules, and the EU is introducing new border systems, so always check the official EU entry website and your government's travel advice before booking.",
    },
  ],
  airports: ["CDG"],
  related: {
    destinations: [
      "/destinations/france/paris",
      "/destinations/italy",
      "/destinations/portugal",
    ],
    itineraries: ["paris-3-days"],
    guides: [
      "how-to-plan-a-trip",
      "how-many-days-for-a-trip",
      "travel-documents-checklist",
    ],
  },
  sources: [
    SOURCES.france,
    SOURCES.sncf,
    SOURCES.euEntry,
    SOURCES.ukAdvice("france", "France"),
    SOURCES.usTravel,
  ],
};

export const paris: DestinationInput = {
  kind: "city",
  slug: "paris",
  country: "france",
  name: "Paris",
  status: "published",
  lastReviewed: "2026-10-02",
  title: "Paris travel planning guide: neighbourhoods, timing, tips",
  description:
    "Plan your Paris trip: which neighbourhoods to explore, how many days to spend, when to visit, getting around by metro and practical tips for first-timers.",
  headline: "Planning a trip to Paris",
  intro:
    "Paris is compact enough to explore on foot, with an efficient metro for longer hops. The key to a good trip is grouping sights by neighbourhood, booking a few headline visits ahead and leaving time to simply walk, eat and people-watch.",
  overview: [
    "The city is divided into twenty numbered districts, the arrondissements, which spiral out from the centre along the Seine. Many of the best-known sights sit close to the river: the Louvre and Tuileries Garden on the Right Bank, Notre-Dame and the Île de la Cité in the middle, and the Musée d'Orsay and Saint-Germain-des-Prés on the Left Bank.",
    "Beyond the centre, neighbourhoods have distinct personalities. Le Marais mixes historic mansions, small museums and busy streets of shops and cafés; Montmartre climbs up to the Sacré-Cœur basilica with views across the city; the Latin Quarter has a student feel and old bookshops. Planning each day around one or two neighbourhoods keeps travel time down.",
    "Paris also works well as a base for day trips. The Palace of Versailles is the classic choice, and towns such as Giverny (for Monet's gardens) or Reims (for Champagne houses) can be reached by train for a change of pace.",
  ],
  bestTime: {
    summary:
      "Spring and early autumn are popular for mild weather and long walks. Summer is lively but busy, and winter is cooler and quieter, with festive lights in December.",
    seasons: [
      {
        name: "Spring",
        months: "April to June",
        notes:
          "Blossom in the parks and pleasant temperatures for walking, though a popular time with visitors.",
      },
      {
        name: "Summer",
        months: "July and August",
        notes:
          "Long evenings and outdoor events, but more crowds at major sights; some small local businesses close for part of August.",
      },
      {
        name: "Autumn",
        months: "September to November",
        notes:
          "Comfortable early autumn weather and a busy cultural calendar after the summer break.",
      },
      {
        name: "Winter",
        months: "December to March",
        notes:
          "Shorter days and cooler weather, good for museums, cafés and seasonal markets.",
      },
    ],
  },
  tripLength: {
    summary:
      "Three days covers the essentials at a steady pace; four or five days allows a day trip and more time in neighbourhoods.",
    options: [
      {
        days: "2 days",
        description:
          "A taste of the centre: the river, one major museum and one or two neighbourhoods.",
      },
      {
        days: "3–4 days",
        description:
          "The main sights plus Montmartre and Le Marais, with time for long meals.",
      },
      {
        days: "5+ days",
        description:
          "Add Versailles or another day trip, smaller museums and slower days in less-visited districts.",
      },
    ],
  },
  highlights: [
    {
      name: "The Louvre",
      description:
        "One of the world's largest art museums; choosing a few galleries in advance is more rewarding than trying to see it all.",
    },
    {
      name: "Musée d'Orsay",
      description:
        "A former railway station holding a celebrated collection of Impressionist and Post-Impressionist art.",
    },
    {
      name: "Eiffel Tower and the Champ de Mars",
      description:
        "The city's best-known landmark, with views from the top and picnic space in the park below.",
    },
    {
      name: "Notre-Dame and Île de la Cité",
      description:
        "The historic heart of Paris, with the cathedral and nearby Sainte-Chapelle and its stained glass.",
    },
    {
      name: "Montmartre",
      description:
        "A hilltop neighbourhood with the Sacré-Cœur, artists' squares and some of the city's best views.",
    },
    {
      name: "Le Marais",
      description:
        "Historic streets, the Place des Vosges, small museums and a lively café and shopping scene.",
    },
    {
      name: "Palace of Versailles",
      description:
        "The former royal palace and gardens on the edge of the city, a popular half- or full-day trip.",
    },
  ],
  gettingAround: [
    "The metro is the quickest way to cross the city, complemented by the RER suburban trains that also serve the airports and Versailles. Check current fares and ticket options on the RATP website.",
    "Walking is often the best way to link nearby sights, especially along the Seine and through central neighbourhoods.",
    "Buses are useful for shorter trips and for seeing the city as you travel, and the city has an extensive network of bike lanes.",
  ],
  planning: [
    {
      topic: "Timed tickets",
      detail:
        "Major museums and monuments often require or recommend booking a timed entry slot. Booking the one or two visits that matter most to you helps you plan the rest of each day.",
    },
    {
      topic: "Weekly closures",
      detail:
        "Many museums close on one day of the week, and the day differs between museums. Check the official website for each visit before fixing your plan.",
    },
    {
      topic: "Where to stay",
      detail:
        "Staying centrally, near a metro line you will use often, saves time. Le Marais, Saint-Germain-des-Prés and the Latin Quarter are popular, walkable bases.",
    },
    {
      topic: "Safety",
      detail:
        "Paris is generally safe for visitors, but pickpocketing is common in crowded places and on public transport, so keep valuables secure. Check your government's travel advice for current information.",
    },
  ],
  tips: [
    "Group sights by area: for example, the Louvre with the Tuileries and Palais-Royal, or Montmartre with a slow evening in nearby Pigalle.",
    "Plan your biggest museum visit for the morning, when you have the most energy, and leave afternoons flexible.",
    "Picnics on the riverbanks or in the parks are a cheap and very Parisian way to take a break.",
    'Greet staff with "bonjour" when you walk into a shop or café; it is expected and appreciated.',
  ],
  faqs: [
    {
      question: "How many days do you need in Paris?",
      answer:
        "Three to four days is a good amount for a first visit. It lets you see the main museums and landmarks, explore a few neighbourhoods such as Le Marais and Montmartre, and still have time for unhurried meals. Add a day if you want to visit Versailles.",
    },
    {
      question: "Is it better to stay on the Left Bank or the Right Bank?",
      answer:
        "Both work well. The Right Bank includes Le Marais and the Louvre area and has a lively feel, while the Left Bank around Saint-Germain and the Latin Quarter is often seen as calmer and classic. Choose somewhere near a convenient metro line.",
    },
    {
      question: "Should I book Paris museums in advance?",
      answer:
        "For the most popular museums and monuments, booking a timed slot ahead is strongly recommended, especially in peak season. Check each attraction's official website for current ticketing rules and opening days before you travel.",
    },
    {
      question: "How do you get from the airport to central Paris?",
      answer:
        "Paris has two main airports, Charles de Gaulle and Orly, both linked to the city by public transport as well as taxis and shuttles. Check the RATP website for current routes, journey times and fares before you arrive.",
    },
  ],
  airports: ["CDG"],
  related: {
    destinations: [
      "/destinations/france",
      "/destinations/italy/rome",
      "/destinations/portugal/lisbon",
    ],
    itineraries: ["paris-3-days"],
    guides: ["how-to-plan-a-trip", "how-many-days-for-a-trip"],
  },
  sources: [
    SOURCES.paris,
    SOURCES.ratp,
    SOURCES.france,
    SOURCES.ukAdvice("france", "France"),
  ],
};
