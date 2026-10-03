import { type DestinationSchema } from "@/content/schema";
import { SOURCES } from "@/content/data/sources";
import { type z } from "zod";

type DestinationInput = z.input<typeof DestinationSchema>;

export const portugal: DestinationInput = {
  kind: "country",
  slug: "portugal",
  name: "Portugal",
  status: "published",
  lastReviewed: "2026-10-02",
  title: "Portugal travel planning guide: regions, timing, routes",
  description:
    "Plan a trip to Portugal: when to visit, how many days you need, a Lisbon–Porto route, the Algarve coast, getting around by train and practical tips.",
  headline: "Planning a trip to Portugal",
  intro:
    "Portugal packs historic cities, wine regions and a long Atlantic coastline into a compact country, which makes it one of the easier places in Europe to plan a varied trip. This guide covers when to go, how long to stay and how to link the main regions.",
  overview: [
    "Most first trips focus on Lisbon and Porto, the two largest cities, which are connected by train in a few hours. Lisbon is a hilly capital of tiled façades, viewpoints and riverside districts, with Sintra and the Cascais coast nearby. Porto sits on the Douro River and is the gateway to the Douro Valley's terraced vineyards.",
    "Beyond the two cities, the Algarve in the south is known for cliffs, coves and beaches, while the Alentejo region offers rolling countryside, whitewashed towns such as Évora and a slower pace. University city Coimbra sits between Lisbon and Porto, and the Atlantic islands of Madeira and the Azores are distinct destinations in their own right.",
    "Because distances are relatively short, Portugal suits travellers who want to combine city time with coast or countryside without long transfer days.",
  ],
  bestTime: {
    summary:
      "Spring and early autumn are usually ideal for cities and sightseeing. Summer is the peak season for the Algarve's beaches, and winter is mild but wetter, especially in the north.",
    seasons: [
      {
        name: "Spring",
        months: "March to May",
        notes:
          "Mild temperatures and green countryside, a good time for city breaks and walking.",
      },
      {
        name: "Summer",
        months: "June to August",
        notes:
          "Hot inland and busy on the coast, especially in the Algarve. Lisbon celebrates its popular saints' festivals in June.",
      },
      {
        name: "Autumn",
        months: "September to October",
        notes:
          "Warm days, the grape harvest in wine regions and calmer beaches after the summer peak.",
      },
      {
        name: "Winter",
        months: "November to February",
        notes:
          "Mild compared with much of Europe but rainier, particularly in Porto and the north.",
      },
    ],
  },
  tripLength: {
    summary:
      "A week covers Lisbon and Porto comfortably; ten days lets you add the Algarve or the Douro Valley.",
    options: [
      {
        days: "3–4 days",
        description:
          "Lisbon with a day trip to Sintra, or Porto with a day in the Douro Valley.",
      },
      {
        days: "7 days",
        description:
          "Lisbon and Porto at a relaxed pace, with a stop in Coimbra or a day trip from each city.",
      },
      {
        days: "10–14 days",
        description:
          "Lisbon, Porto and the Douro Valley, plus several days on the Algarve coast or in the Alentejo.",
      },
    ],
  },
  highlights: [
    {
      name: "Lisbon",
      description:
        "A hilly, walkable capital with historic neighbourhoods, viewpoints and the riverside Belém district.",
    },
    {
      name: "Porto",
      description:
        "A riverside city known for its old town, bridges and the port wine cellars across the Douro.",
    },
    {
      name: "Sintra",
      description:
        "Palaces and gardens in wooded hills, an easy day trip from Lisbon.",
    },
    {
      name: "Douro Valley",
      description:
        "Terraced vineyards along the river, explored by car, train, boat or tour from Porto.",
    },
    {
      name: "The Algarve",
      description:
        "Cliffs, coves and beaches along the southern coast, with towns such as Lagos and Tavira.",
    },
    {
      name: "Évora and the Alentejo",
      description:
        "A walled historic city and rolling countryside with a slower rhythm.",
    },
  ],
  gettingAround: [
    "Trains link Lisbon, Coimbra and Porto, and also reach the Algarve. Check current timetables and fares with CP, Portugal's national rail operator.",
    "Long-distance buses fill gaps in the rail network and can be convenient for some routes.",
    "A car is useful for the Douro Valley, the Alentejo and the quieter parts of the Algarve, but not needed in Lisbon or Porto, where parking is difficult and public transport is good.",
  ],
  planning: [
    {
      topic: "Entry requirements",
      detail:
        "Portugal is part of the Schengen Area. Visa requirements and the EU's newer border systems depend on your nationality, so check the official EU and government sources listed below before booking.",
    },
    {
      topic: "Money",
      detail:
        "Portugal uses the euro. Cards are widely accepted, though some small cafés and shops prefer cash.",
    },
    {
      topic: "Terrain",
      detail:
        "Lisbon and Porto are built on steep hills with cobbled streets, so comfortable, grippy shoes make a real difference.",
    },
    {
      topic: "Peak season",
      detail:
        "July and August are busy in the Algarve and popular coastal towns, so book accommodation early for summer beach trips.",
    },
  ],
  tips: [
    "Combine Lisbon and Porto by train rather than flying; it's simple and you arrive in the city centre.",
    "Plan the hilliest walks downhill where you can, using trams, funiculars or taxis for the climbs.",
    "Expect dinner to start later than in some other countries; many restaurants get busy from around 8pm.",
    "The Atlantic stays cool even in summer, so check sea conditions and swim at supervised beaches.",
  ],
  faqs: [
    {
      question: "How many days do you need in Portugal?",
      answer:
        "A week is a good length for a first trip covering Lisbon and Porto with a day trip from each. With ten days to two weeks you can add the Algarve coast, the Douro Valley or the Alentejo without feeling rushed.",
    },
    {
      question: "What is the best time to visit Portugal?",
      answer:
        "Spring (March to May) and early autumn (September to October) are often ideal, with pleasant weather and fewer crowds. Summer is best for beach holidays in the Algarve but is the busiest season, while winter is mild but wetter.",
    },
    {
      question: "Is it better to start in Lisbon or Porto?",
      answer:
        "Either works, and the two cities are linked by a direct train. Many travellers choose based on flight availability and prices, starting in one city and finishing in the other to avoid backtracking.",
    },
    {
      question: "Do I need a visa to visit Portugal?",
      answer:
        "It depends on your nationality and the length and purpose of your stay. Portugal follows Schengen Area rules and the EU is introducing new border systems, so check the official EU entry website and your government's travel advice before booking.",
    },
  ],
  airports: ["LIS"],
  related: {
    destinations: [
      "/destinations/portugal/lisbon",
      "/destinations/france",
      "/destinations/italy",
    ],
    itineraries: ["lisbon-3-days"],
    guides: [
      "how-to-plan-a-trip",
      "how-many-days-for-a-trip",
      "travel-documents-checklist",
      "how-to-find-cheap-flights",
      "cheap-flight-tips",
    ],
  },
  sources: [
    SOURCES.portugal,
    SOURCES.cp,
    SOURCES.euEntry,
    SOURCES.ukAdvice("portugal", "Portugal"),
    SOURCES.usTravel,
  ],
};

export const lisbon: DestinationInput = {
  kind: "city",
  slug: "lisbon",
  country: "portugal",
  name: "Lisbon",
  status: "published",
  lastReviewed: "2026-10-02",
  title: "Lisbon travel planning guide: areas, timing and day trips",
  description:
    "Plan your Lisbon trip: which neighbourhoods to explore, how many days to spend, when to visit, trams and transport cards, and day trips to Sintra and Cascais.",
  headline: "Planning a trip to Lisbon",
  intro:
    "Lisbon spreads across hills above the Tagus River, rewarding visitors with viewpoints, tiled streets and a relaxed pace. Grouping each day by neighbourhood and saving energy for the climbs makes it a very enjoyable city to explore on foot.",
  overview: [
    "The historic centre includes Baixa, the flat, grid-planned downtown rebuilt after the 1755 earthquake, and Chiado, with its cafés and theatres. Above them rise Alfama, the oldest district with winding lanes beneath São Jorge Castle, and Bairro Alto, quiet by day and lively at night. Viewpoints called miradouros are scattered across the hills.",
    "To the west along the river, Belém is home to the Jerónimos Monastery, the Belém Tower and the city's famous custard tarts. Newer areas such as the riverside LX Factory and the Parque das Nações district show a more modern side of the city.",
    "Lisbon is also an excellent base for day trips. Sintra's palaces and gardens and the coastal towns of Cascais and Estoril are reachable by train, and the Setúbal Peninsula offers beaches and nature to the south.",
  ],
  bestTime: {
    summary:
      "Spring and early autumn are ideal for walking the hills in comfortable weather. Summer is warm and lively, and winter is mild but rainier.",
    seasons: [
      {
        name: "Spring",
        months: "March to May",
        notes:
          "Mild weather and blooming jacarandas later in the season, a great time for walking.",
      },
      {
        name: "Summer",
        months: "June to August",
        notes:
          "Warm, sunny and busy; June brings the city's popular saints' festivals with street parties.",
      },
      {
        name: "Autumn",
        months: "September to October",
        notes: "Warm days, softer light and fewer visitors than midsummer.",
      },
      {
        name: "Winter",
        months: "November to February",
        notes:
          "Mild temperatures with more rain; quieter streets and a good time for museums.",
      },
    ],
  },
  tripLength: {
    summary:
      "Three days covers the main neighbourhoods and a day trip to Sintra; four or five days allows a beach day and a slower pace.",
    options: [
      {
        days: "2 days",
        description:
          "Baixa, Chiado and Alfama on day one, Belém and a viewpoint sunset on day two.",
      },
      {
        days: "3 days",
        description: "The main districts plus a full-day trip to Sintra.",
      },
      {
        days: "4–5 days",
        description:
          "Add Cascais or a beach day, LX Factory and slower time in neighbourhood cafés.",
      },
    ],
  },
  highlights: [
    {
      name: "Alfama and São Jorge Castle",
      description:
        "The oldest neighbourhood's lanes and the castle on the hill above, with sweeping views.",
    },
    {
      name: "Belém",
      description:
        "The Jerónimos Monastery, Belém Tower and riverside monuments to Portugal's seafaring history.",
    },
    {
      name: "Baixa and Chiado",
      description:
        "The elegant downtown grid, the riverside Praça do Comércio and Chiado's cafés.",
    },
    {
      name: "Miradouros",
      description:
        "Hilltop viewpoints such as Senhora do Monte and Santa Luzia, especially beautiful at sunset.",
    },
    {
      name: "Tram 28",
      description:
        "A historic tram route through several hilly neighbourhoods; it gets very busy, so ride early.",
    },
    {
      name: "Sintra",
      description:
        "Palaces and gardens in the hills outside the city, best as a full-day trip.",
    },
  ],
  gettingAround: [
    "Lisbon's metro, buses, trams and funiculars cover the city. A rechargeable transport card such as Viva Viagem can be used across many services; check current fares and options with the operators.",
    "Walking is the best way to explore neighbourhoods, but expect steep hills and slippery cobbles. Trams, funiculars and elevators help with the climbs.",
    "Trains to Sintra and to Cascais leave from central stations, making both easy day trips without a car.",
  ],
  planning: [
    {
      topic: "Where to stay",
      detail:
        "Baixa, Chiado and nearby Príncipe Real are central and well connected. Alfama is atmospheric but hilly, which matters if you are carrying luggage.",
    },
    {
      topic: "Sintra planning",
      detail:
        "Sintra's palaces are spread across steep hills and can be very busy. Book the palaces you most want to see ahead and start early.",
    },
    {
      topic: "Terrain",
      detail:
        "The hills and polished cobblestones can be slippery, especially after rain, so wear comfortable shoes with good grip.",
    },
    {
      topic: "Safety",
      detail:
        "Lisbon is generally safe, but pickpocketing happens on crowded trams and in busy areas. Check your government's travel advice for current information.",
    },
  ],
  tips: [
    "Ride Tram 28 early in the morning before the queues build, or walk sections of its route instead.",
    "Plan routes downhill where possible and use trams or taxis for the steepest climbs.",
    "Try the custard tarts in Belém and at local bakeries across the city.",
    "Save a sunset for one of the miradouros; they are free and among the city's best experiences.",
  ],
  faqs: [
    {
      question: "How many days do you need in Lisbon?",
      answer:
        "Three days is a good amount for a first visit, allowing two days for neighbourhoods like Alfama, Baixa, Chiado and Belém, and a third for a day trip to Sintra. With four or five days you can add Cascais, the beaches or slower time in cafés and viewpoints.",
    },
    {
      question: "Is Lisbon walkable?",
      answer:
        "Yes, but it is very hilly. The central districts are close together and best explored on foot, while trams, funiculars and the metro help with steep climbs. Comfortable shoes with good grip are important on the cobbled streets.",
    },
    {
      question: "Is Sintra worth a day trip from Lisbon?",
      answer:
        "For most visitors, yes. Sintra's palaces, castle and gardens are unlike anything in the city. Because sites are spread over steep hills and get busy, plan a full day, start early and book the palaces you most want to see in advance.",
    },
    {
      question: "What is the best area to stay in Lisbon?",
      answer:
        "Baixa and Chiado are central and flat by Lisbon standards, with good transport links. Príncipe Real is quieter and stylish, while Alfama is charming but hilly. Pick an area close to a metro station if you plan day trips.",
    },
  ],
  airports: ["LIS"],
  related: {
    destinations: [
      "/destinations/portugal",
      "/destinations/france/paris",
      "/destinations/italy/rome",
    ],
    itineraries: ["lisbon-3-days"],
    guides: [
      "how-to-plan-a-trip",
      "how-many-days-for-a-trip",
      "how-to-find-cheap-flights",
      "how-to-build-a-travel-itinerary",
    ],
  },
  sources: [
    SOURCES.lisbon,
    SOURCES.portugal,
    SOURCES.cp,
    SOURCES.ukAdvice("portugal", "Portugal"),
  ],
};
