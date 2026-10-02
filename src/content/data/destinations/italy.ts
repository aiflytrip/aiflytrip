import { type DestinationSchema } from "@/content/schema";
import { SOURCES } from "@/content/data/sources";
import { type z } from "zod";

type DestinationInput = z.input<typeof DestinationSchema>;

export const italy: DestinationInput = {
  kind: "country",
  slug: "italy",
  name: "Italy",
  status: "published",
  lastReviewed: "2026-10-02",
  title: "Italy travel planning guide: regions, timing and routes",
  description:
    "Plan a trip to Italy: the best time to visit, how many days you need, classic routes between Rome, Florence and Venice, train travel and practical tips.",
  headline: "Planning a trip to Italy",
  intro:
    "Italy is easy to fall in love with and easy to over-plan. This guide helps you choose a realistic route, decide how long to spend in each place and travel efficiently between cities, so you have time to enjoy the food, art and slower rhythms that make Italy special.",
  overview: [
    "A classic first trip links Rome, Florence and Venice, which are connected by fast trains. Beyond that triangle, Italy offers very different experiences: the hill towns and countryside of Tuscany and Umbria, the dramatic coastline of the Amalfi Coast and Cinque Terre, the lakes of the north, the Dolomites for mountain scenery, and the islands of Sicily and Sardinia.",
    "Each region has its own food traditions, so moving between them also changes what you eat. Building your route around two or three bases, with day trips from each, usually works better than moving every night.",
    "Many of the best experiences in Italy are unplanned: an evening passeggiata, a long lunch or a small church you happen to walk past. Leaving gaps in your plan is part of planning well here.",
  ],
  bestTime: {
    summary:
      "April to June and September to October are usually the most comfortable months for sightseeing. Summer is hot and busy in cities and on the coast, while winter is quieter with shorter days.",
    seasons: [
      {
        name: "Spring",
        months: "April to June",
        notes:
          "Pleasant temperatures for walking and exploring cities, with countryside in bloom. Easter can be very busy, especially in Rome.",
      },
      {
        name: "Summer",
        months: "July and August",
        notes:
          "Hot in cities and peak season on the coasts and islands. Around the mid-August holiday many Italians travel and some city businesses close.",
      },
      {
        name: "Autumn",
        months: "September to October",
        notes:
          "Warm early autumn days, harvest season in wine regions and fewer crowds than midsummer.",
      },
      {
        name: "Winter",
        months: "November to March",
        notes:
          "Quieter cities and lower demand outside the holidays, plus skiing in the Alps and Dolomites.",
      },
    ],
  },
  tripLength: {
    summary:
      "Ten days is a comfortable length for a first trip covering Rome, Florence and Venice; a week works if you focus on two cities.",
    options: [
      {
        days: "5–7 days",
        description:
          "Two bases, such as Rome and Florence, with one day trip from each.",
      },
      {
        days: "10 days",
        description:
          "Rome, Florence and Venice at a steady pace, linked by high-speed train.",
      },
      {
        days: "14 days",
        description:
          "The classic triangle plus a coastal or rural region such as the Amalfi Coast, Cinque Terre or Tuscany's countryside.",
      },
    ],
  },
  highlights: [
    {
      name: "Rome",
      description:
        "Ancient ruins, the Vatican, Baroque squares and some of Italy's best-loved food.",
    },
    {
      name: "Florence",
      description:
        "The heart of the Renaissance, with world-famous galleries and a compact, walkable centre.",
    },
    {
      name: "Venice",
      description:
        "A city of canals and islands, best enjoyed with at least one night to see it beyond the day-visitor peak.",
    },
    {
      name: "Tuscany and Umbria",
      description:
        "Hill towns, vineyards and countryside, ideal for slower travel with a car.",
    },
    {
      name: "Amalfi Coast and Cinque Terre",
      description:
        "Two famous stretches of coastline with colourful villages and walking paths.",
    },
    {
      name: "The Italian Lakes",
      description:
        "Lake Como, Lake Garda and Lake Maggiore, with villas, gardens and mountain views.",
    },
    {
      name: "Sicily",
      description:
        "An island with Greek temples, Baroque towns, Mount Etna and its own distinctive cuisine.",
    },
  ],
  gettingAround: [
    "High-speed trains link major cities such as Rome, Florence, Bologna, Venice, Milan and Naples, making a multi-city trip practical without a car. Check current timetables and fares with the rail operators.",
    "Regional trains reach smaller towns. Paper regional tickets typically need to be validated before boarding, so check the instructions on your ticket.",
    "A car is useful in rural areas such as Tuscany, but many historic city centres have restricted traffic zones (ZTL) where driving without a permit can lead to fines.",
  ],
  planning: [
    {
      topic: "Entry requirements",
      detail:
        "Italy is part of the Schengen Area. Visa requirements and the EU's newer border systems depend on your nationality, so check the official EU and government sources below before booking.",
    },
    {
      topic: "Money",
      detail:
        "Italy uses the euro. Cards are widely accepted in cities, though carrying some cash is useful for small purchases and in rural areas.",
    },
    {
      topic: "Dress codes",
      detail:
        "Many churches, including major basilicas, ask visitors to cover shoulders and knees. Carrying a light layer makes spontaneous visits easier.",
    },
    {
      topic: "Booking ahead",
      detail:
        "Popular museums and sites, such as major galleries and archaeological sites, often use timed tickets. Booking the visits that matter most to you avoids long waits.",
    },
  ],
  tips: [
    "Pick two or three bases and use trains for day trips rather than moving every night.",
    "Plan headline visits in the morning and keep afternoons flexible, especially in summer heat.",
    "Eat where locals eat: menus written only in Italian, and away from the busiest squares, are often a good sign.",
    "Allow buffer time on travel days; city centres can be slow to cross with luggage.",
  ],
  faqs: [
    {
      question: "How many days do you need in Italy?",
      answer:
        "About ten days is ideal for a first trip covering Rome, Florence and Venice without rushing. With a week, focus on two cities. With two weeks, add a coastal or countryside region such as the Amalfi Coast or Tuscany.",
    },
    {
      question: "What is the best time of year to visit Italy?",
      answer:
        "Late spring (April to June) and early autumn (September to October) usually offer warm weather with fewer crowds than summer. July and August are hot and busy, especially on the coast, while winter is quieter and good for cities.",
    },
    {
      question: "Is it better to travel around Italy by train or car?",
      answer:
        "Trains are usually best between major cities, as high-speed services are frequent and arrive in city centres. A car is better for exploring rural areas and small hill towns, but avoid driving into restricted traffic zones in historic centres.",
    },
    {
      question: "Do I need a visa to visit Italy?",
      answer:
        "It depends on your nationality and the purpose and length of your stay. Italy follows Schengen Area rules and the EU is introducing new border systems, so check the official EU entry website and your government's travel advice before booking.",
    },
  ],
  airports: [],
  related: {
    destinations: [
      "/destinations/italy/rome",
      "/destinations/france",
      "/destinations/portugal",
    ],
    itineraries: [],
    guides: [
      "how-to-plan-a-trip",
      "how-many-days-for-a-trip",
      "travel-documents-checklist",
    ],
  },
  sources: [
    SOURCES.italy,
    SOURCES.trenitalia,
    SOURCES.euEntry,
    SOURCES.ukAdvice("italy", "Italy"),
    SOURCES.usTravel,
  ],
};

export const rome: DestinationInput = {
  kind: "city",
  slug: "rome",
  country: "italy",
  name: "Rome",
  status: "published",
  lastReviewed: "2026-10-02",
  title: "Rome travel planning guide: sights, areas and timing",
  description:
    "Plan your Rome trip: how many days to spend, when to visit, how to group the Colosseum, Vatican and historic centre, getting around and practical tips.",
  headline: "Planning a trip to Rome",
  intro:
    "Rome layers ancient ruins, Renaissance art and Baroque piazzas within a walkable historic centre. A good plan groups sights by area, books the busiest visits ahead and leaves time for the long lunches and evening walks that are part of Roman life.",
  overview: [
    "Most visitors divide Rome into a few zones. Ancient Rome covers the Colosseum, the Roman Forum and the Palatine Hill. The historic centre includes the Pantheon, Piazza Navona and the Trevi Fountain, all within walking distance of each other. Across the river, Vatican City holds St Peter's Basilica and the Vatican Museums, while Trastevere is a neighbourhood of narrow streets known for its restaurants and evening atmosphere.",
    "Vatican City is an independent state within Rome. Visiting St Peter's Basilica and the Vatican Museums is a big part of many itineraries and usually takes most of a day if you want to do both properly.",
    "Rome is also a good base for day trips, such as the ancient port of Ostia Antica, the villas of Tivoli or the hill town of Orvieto, which can make a longer stay feel varied.",
  ],
  bestTime: {
    summary:
      "Spring and autumn are the most comfortable seasons for walking between sights. Summer can be very hot, and Easter and major religious events bring large crowds.",
    seasons: [
      {
        name: "Spring",
        months: "March to May",
        notes:
          "Mild weather and blooming gardens, though Easter week is one of the busiest times of year.",
      },
      {
        name: "Summer",
        months: "June to August",
        notes:
          "Hot days and peak crowds; plan outdoor sights early in the morning or in the evening.",
      },
      {
        name: "Autumn",
        months: "September to November",
        notes:
          "Warm early autumn days with crowds easing as the season goes on.",
      },
      {
        name: "Winter",
        months: "December to February",
        notes:
          "Cooler and quieter outside the holidays, a good time for museums and churches.",
      },
    ],
  },
  tripLength: {
    summary:
      "Three days covers the main areas at a reasonable pace; four or more lets you add a day trip and slower neighbourhood time.",
    options: [
      {
        days: "2 days",
        description:
          "One day for ancient Rome and the historic centre, one day for the Vatican.",
      },
      {
        days: "3 days",
        description:
          "The main areas plus time for Trastevere, a museum such as the Borghese Gallery and long meals.",
      },
      {
        days: "4–5 days",
        description:
          "Add a day trip such as Tivoli or Ostia Antica and explore quieter neighbourhoods.",
      },
    ],
  },
  highlights: [
    {
      name: "Colosseum, Roman Forum and Palatine Hill",
      description:
        "The centre of ancient Rome; plan these together and allow most of a morning.",
    },
    {
      name: "Vatican Museums and Sistine Chapel",
      description:
        "Vast papal collections ending in the Sistine Chapel; booking ahead is strongly recommended.",
    },
    {
      name: "St Peter's Basilica",
      description:
        "One of the largest churches in the world, with a dress code requiring covered shoulders and knees.",
    },
    {
      name: "Pantheon",
      description:
        "A remarkably preserved ancient temple, later a church, in the middle of the historic centre.",
    },
    {
      name: "Piazza Navona and the Trevi Fountain",
      description:
        "Baroque squares and fountains that are lovely to see early in the morning or at night.",
    },
    {
      name: "Borghese Gallery",
      description:
        "A celebrated collection of sculpture and painting in a villa park; visits are by reservation.",
    },
    {
      name: "Trastevere",
      description:
        "A characterful neighbourhood across the Tiber, especially lively in the evening.",
    },
  ],
  gettingAround: [
    "The historic centre is best explored on foot; many of the main sights are a short walk apart.",
    "Rome's metro has a limited number of lines and doesn't reach every central area, so buses and trams fill the gaps. Check current routes and tickets on official transport information before travelling.",
    "Taxis should be taken from official ranks or booked through recognised services. Allow extra time for traffic, especially at rush hour.",
  ],
  planning: [
    {
      topic: "Timed tickets",
      detail:
        "The Colosseum area, the Vatican Museums and the Borghese Gallery use timed or reserved tickets. Booking these first lets you build the rest of each day around them.",
    },
    {
      topic: "Dress codes",
      detail:
        "St Peter's Basilica and many churches require covered shoulders and knees. Carry a light scarf or layer so you aren't turned away.",
    },
    {
      topic: "Heat",
      detail:
        "In summer, plan outdoor sights for early morning, rest in the afternoon and head out again in the evening when the city comes alive.",
    },
    {
      topic: "Safety",
      detail:
        "Rome is generally safe for visitors, but pickpocketing is common around major sights and on crowded transport. Check your government's travel advice for current information.",
    },
  ],
  tips: [
    "Visit the Trevi Fountain early in the morning or late at night to avoid the heaviest crowds.",
    "Refill water bottles at the public drinking fountains found around the city.",
    "Keep one evening free for Trastevere or Monti, where many Romans go out to eat.",
    "Check the official websites for each site's current opening days before you finalise your plan.",
  ],
  faqs: [
    {
      question: "How many days do you need in Rome?",
      answer:
        "Three days is a good amount for a first visit. It allows a day for ancient Rome and the historic centre, a day for the Vatican, and a third day for neighbourhoods like Trastevere and a museum such as the Borghese Gallery. Add a day for a trip to Tivoli or Ostia Antica.",
    },
    {
      question: "Can you see the Colosseum and the Vatican in one day?",
      answer:
        "It is possible but rushed, because both are large sites with timed entry and the Vatican Museums alone can take several hours. Most travellers enjoy them much more on separate days, pairing the Colosseum with the Forum and the Palatine Hill.",
    },
    {
      question: "What should I wear to visit the Vatican?",
      answer:
        "St Peter's Basilica and the Vatican Museums expect modest dress, which generally means covering shoulders and knees. Bringing a light scarf or layer makes it easy to meet the dress code even on hot days.",
    },
    {
      question: "Is Rome walkable?",
      answer:
        "Yes. The historic centre is very walkable, and many major sights are within a short walk of each other. Comfortable shoes are essential because of the cobbled streets, and buses, trams or the metro help for longer distances.",
    },
  ],
  airports: [],
  related: {
    destinations: [
      "/destinations/italy",
      "/destinations/france/paris",
      "/destinations/portugal/lisbon",
    ],
    itineraries: [],
    guides: ["how-to-plan-a-trip", "how-many-days-for-a-trip"],
  },
  sources: [SOURCES.rome, SOURCES.italy, SOURCES.ukAdvice("italy", "Italy")],
};
