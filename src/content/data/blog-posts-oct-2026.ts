import { type GuideSchema } from "@/content/schema";
import { SOURCES } from "@/content/data/sources";
import { type z } from "zod";

type PostInput = z.input<typeof GuideSchema>;

/**
 * October 2026 batch, one post a week. Each stays hidden until its
 * publishAt date. Review and add first-hand tips before each date.
 */
export const octoberPosts: PostInput[] = [
  {
    slug: "airport-to-city-paris-rome-tokyo-lisbon",
    category: "practical",
    status: "published",
    publishAt: "2026-10-06",
    lastReviewed: "2026-10-03",
    photo: "airport-to-city",
    title: "Airport to city: Paris, Rome, Tokyo and Lisbon",
    description:
      "How to get from the airport to the city centre in Paris, Rome, Tokyo and Lisbon: trains, buses and taxis, plus what to check before you land.",
    headline:
      "Getting from the airport to the city in Paris, Rome, Tokyo and Lisbon",
    intro:
      "The first hour after landing sets the tone for a trip. Knowing how you'll get into town before you fly means no guesswork at arrivals, no overpriced rides and a calmer start. Here's how the main options work in four cities we cover, and what to check before you go.",
    sections: [
      {
        heading: "Before you land: three things to check",
        paragraphs: [
          "Wherever you're flying, the same three questions decide the best route into town: what time you land, how much luggage you have, and where exactly you're staying. A train that's perfect at midday might have stopped running by the time a late flight lands, and a direct bus is worth more than a cheaper metro ride if you're carrying a big suitcase up and down stairs.",
          "Look up the current timetable and fare on the airport's or operator's official website a few days before you travel, and save the route offline. Fares and timings change, so we haven't listed them here.",
        ],
        bullets: [
          "Your arrival time, and when the last train or bus runs",
          "How many bags you'll be carrying, and whether stations have lifts",
          "The nearest station or stop to your accommodation",
        ],
      },
      {
        heading: "Paris: Charles de Gaulle and Orly",
        paragraphs: [
          "From Charles de Gaulle, the RER B suburban train runs into central Paris, stopping at stations including Gare du Nord and Châtelet–Les Halles, where you can change to the metro. It's usually the most practical option if you're travelling light. Roissybus runs to the Opéra area, and taxis between the airport and central Paris use fixed fares, which removes the worry about traffic.",
          "Orly is closer to the city and is now served by metro line 14, which runs north through central Paris. There are also bus options and taxis. Whichever airport you use, check the RATP website for current routes before you go. Once you're in town, our [Paris travel guide](/destinations/france/paris) and [Paris in 3 days itinerary](/itineraries/paris-3-days) take it from there.",
        ],
        bullets: [],
      },
      {
        heading: "Rome: Fiumicino and Ciampino",
        paragraphs: [
          "Most international flights land at Fiumicino. The Leonardo Express train runs nonstop to Roma Termini, the main station, which suits most central hotels. Regional trains on the FL1 line are an alternative if you're staying near Trastevere or Ostiense, and they're often cheaper. Taxis from Fiumicino to the historic centre charge a fixed fare.",
          "Ciampino, used mainly by low-cost airlines, has no direct rail link at the terminal; buses run to Termini and to Ciampino town station for onward trains. Check Aeroporti di Roma's website for the current options. Our [Rome travel guide](/destinations/italy/rome) covers getting around once you arrive.",
        ],
        bullets: [],
      },
      {
        heading: "Tokyo: Haneda and Narita",
        paragraphs: [
          "Haneda is the closer of Tokyo's two airports. The Keikyu line and the Tokyo Monorail both connect it to the rail network in central Tokyo, and airport limousine buses go direct to many hotels and major stations, which is handy with heavy bags.",
          "Narita is further out. The JR Narita Express and the Keisei Skyliner are the fastest rail links into the city, and there are cheaper buses and slower trains too. If you're arriving tired after a long flight, a direct bus to your hotel can be worth it. Our [Tokyo travel guide](/destinations/japan/tokyo) explains IC cards, which work on most trains and buses once you're in the city.",
        ],
        bullets: [],
      },
      {
        heading: "Lisbon: Humberto Delgado Airport",
        paragraphs: [
          "Lisbon's airport is unusually close to the city. The metro's red line starts at the airport, and you can change to other lines for the centre; it's simple and good value if your bags are manageable. The Aerobus runs to central areas such as Baixa and Cais do Sodré, and taxis and ride-hailing cars are widely available for the short trip.",
          "If your hotel is up one of Lisbon's many hills, a taxi straight to the door can save a steep walk with luggage. Our [Lisbon travel guide](/destinations/portugal/lisbon) and [Lisbon in 3 days itinerary](/itineraries/lisbon-3-days) help you plan the days that follow.",
        ],
        bullets: [],
      },
      {
        heading: "Taxis, ride-hailing and avoiding the common traps",
        paragraphs: [
          "At most big airports, official taxi ranks are clearly signed outside arrivals. Use those, or an app you trust, rather than accepting offers from people approaching you inside the terminal. Where fixed fares exist, as in Paris and Rome, confirm the fare before you set off.",
          "If you're arriving late at night, it's worth booking a transfer in advance or at least knowing the official taxi option, so you're not left working it out after the last train has gone.",
        ],
        bullets: [],
      },
      {
        heading: "Plan the first day around your arrival",
        paragraphs: [
          "However you get into town, keep the arrival day light. Drop your bags, take a walk nearby and save the big sights for the next morning. Our guide on [how to build a travel itinerary](/blog/how-to-build-a-travel-itinerary) explains how to plan around flight times, and our [AI trip planner](/travel-planner) drafts a first day that fits when you land.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "Is the train or a taxi better from the airport?",
        answer:
          "Trains are usually cheaper and avoid traffic, which makes them a good choice if you're travelling light. Taxis make more sense late at night, with heavy luggage, or when several people share the fare.",
      },
      {
        question: "Can I use public transport from the airport at night?",
        answer:
          "It depends on the city and the line. Many airport trains stop running late in the evening, so check the last departure on the official website and have a backup plan, such as an official taxi.",
      },
      {
        question: "Should I book an airport transfer in advance?",
        answer:
          "It's worth considering for late arrivals, travel with young children or lots of luggage, or if you'd rather not navigate transport after a long flight. For daytime arrivals, trains and buses are usually straightforward.",
      },
    ],
    related: {
      destinations: [
        "/destinations/france/paris",
        "/destinations/italy/rome",
        "/destinations/japan/tokyo",
        "/destinations/portugal/lisbon",
      ],
      itineraries: ["paris-3-days", "tokyo-5-days", "lisbon-3-days"],
      guides: ["how-to-build-a-travel-itinerary", "how-to-find-cheap-flights"],
    },
    sources: [
      SOURCES.parisAirports,
      SOURCES.ratp,
      SOURCES.romeAirports,
      SOURCES.hanedaAirport,
      SOURCES.naritaAirport,
      SOURCES.lisbonAirport,
    ],
  },
  {
    slug: "how-much-layover-time-do-you-need",
    category: "flights",
    status: "published",
    publishAt: "2026-10-13",
    lastReviewed: "2026-10-03",
    photo: "layover",
    title: "How much layover time do you need between flights?",
    description:
      "How to judge a safe connection time between flights: passport control, terminal changes, checked bags, separate tickets and what happens if you miss it.",
    headline: "How much layover time do you need?",
    intro:
      "A short connection looks great when you book and feels very different when your first flight lands twenty minutes late. There's no single right number, but there is a reliable way to judge whether a layover is comfortable, tight or a gamble. This guide walks through it.",
    sections: [
      {
        heading: "Start with what the airline allows",
        paragraphs: [
          "Airports and airlines set a minimum connection time for each airport, based on how long it normally takes to get from one flight to the next. When you book connecting flights on a single ticket, the itinerary you're offered should already meet that minimum.",
          "The minimum is exactly that: the shortest time that usually works when everything runs smoothly. It doesn't account for a late arrival, a long queue at passport control or a gate at the far end of a large terminal. Think of it as the floor, not the target.",
        ],
        bullets: [],
      },
      {
        heading: "What eats into your connection time",
        paragraphs: [
          "Work through what you actually have to do between flights. Each step adds time, and some airports make you do several of them.",
        ],
        bullets: [
          "Changing terminals, especially if it means a train or bus between them",
          "Passport control, for example when moving between international and domestic flights, or entering the Schengen area",
          "Security screening again, which many airports require for transfers",
          "Collecting and re-checking bags, which happens at your first point of entry in some countries, including the United States",
          "Walking distances at very large airports, and boarding closing well before departure",
        ],
      },
      {
        heading: "One ticket or separate tickets?",
        paragraphs: [
          "This matters more than the number of minutes. On a single ticket, the airline is responsible for getting you to your final destination. If your first flight is late and you miss the connection, it will normally rebook you on the next available flight at no extra cost.",
          "With separate tickets, the second airline has no obligation to wait or rebook you, and you may have to buy a new ticket. If you combine separate tickets to save money, as our guide on [how to find cheap flights](/blog/how-to-find-cheap-flights) discusses, leave a much longer gap, and consider whether a missed flight would cost more than you saved.",
        ],
        bullets: [],
      },
      {
        heading: "When to add extra time",
        paragraphs: [
          "Give yourself more breathing room if any of these apply: it's your first time at that airport, you'll go through passport control or re-check bags, you're travelling with children or need assistance, the first flight often runs late, or you're flying at a busy time of year.",
          "Long-haul flights also land with less predictability than short hops, and a long queue at immigration can take a big bite out of a connection. If the next flight of the day is many hours later, a missed connection becomes a long wait, which is another reason to choose a more relaxed layover.",
        ],
        bullets: [],
      },
      {
        heading: "Making a short connection work",
        paragraphs: [
          "If you're on a tight connection, a little preparation helps. Choose a seat near the front of the plane if you can, keep your bag small enough to carry on, and check the arrivals and departures terminals for both flights before you leave home.",
          "When you land, check the departures screen straight away rather than relying on the gate printed on your boarding pass, as gates change. Follow the airport's transfer signs, which are usually faster than going out through arrivals.",
        ],
        bullets: [],
      },
      {
        heading: "If you miss your connection",
        paragraphs: [
          "On a single ticket, go straight to the airline's transfer or customer service desk, or use its app, to be rebooked. Keep your boarding passes and any receipts for food or accommodation.",
          "Depending on where you're flying and the cause of the delay, you may have rights to care, such as meals and a hotel, and in some cases compensation. Under EU and UK rules this is judged on how late you reach your final destination. The official sources below explain when these rights apply.",
        ],
        bullets: [],
      },
      {
        heading: "Choosing a layover you'll actually enjoy",
        paragraphs: [
          "A longer layover isn't always wasted time. A few hours gives you time for a proper meal and a walk, and some travellers deliberately choose a long stop to break up a long-haul trip. If you're weighing options, compare the total journey time, the price and how stressful the connection would be if things ran late.",
          "Once your flights are set, our [AI trip planner](/travel-planner) builds the rest of the trip around your arrival time, and our guide to [budget airline fees](/blog/budget-airline-fees-explained) helps if your connection involves a low-cost carrier.",
        ],
        bullets: [],
      },
      {
        heading: "A quick way to judge any layover",
        paragraphs: [
          "When you're comparing options, ask four questions about each connection. Is it on one ticket? Will you change terminals or go through passport control? Do you need to collect and re-check bags? And how often does the next flight to your destination leave if you miss this one?",
          "If the answers are one ticket, same terminal, no passport control, no bags and frequent onward flights, a short connection is usually fine. Each answer that goes the other way is a reason to add time.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "Is a one-hour layover enough?",
        answer:
          "It can be at a small airport on a single ticket with no passport control or bag re-check. For international connections, terminal changes or separate tickets, an hour is often tight, so allow more time.",
      },
      {
        question: "Do I need to collect my bags during a layover?",
        answer:
          "On a single ticket your bags are usually checked through to your final destination. Some countries, including the United States, require you to collect and re-check them at your first point of entry.",
      },
      {
        question: "What happens if I miss a connection on separate tickets?",
        answer:
          "The second airline normally has no obligation to rebook you, so you may need to buy a new ticket. That's why separate-ticket connections need a much longer gap than flights booked together.",
      },
    ],
    related: {
      destinations: ["/destinations/japan", "/destinations/portugal"],
      itineraries: ["tokyo-5-days"],
      guides: [
        "how-to-find-cheap-flights",
        "budget-airline-fees-explained",
        "cheap-flight-tips",
        "how-to-beat-jet-lag",
      ],
    },
    sources: [
      SOURCES.euAirRights,
      SOURCES.eu261,
      SOURCES.ukCaaDelays,
      SOURCES.usDotAirConsumer,
    ],
  },
  {
    slug: "carry-on-packing-list",
    category: "practical",
    status: "published",
    publishAt: "2026-10-20",
    lastReviewed: "2026-10-03",
    photo: "carry-on",
    title: "Carry-on packing list: travel with just a cabin bag",
    description:
      "A practical carry-on packing list: what to bring, how to fit it in a cabin bag, liquids and battery rules, and tips for travelling light for a week or more.",
    headline: "Carry-on packing list: how to travel with just a cabin bag",
    intro:
      "Travelling with only a cabin bag saves money on low-cost airlines, skips the wait at baggage reclaim and makes it easier to move between places. It does take a little planning. Here's a practical packing list and the rules worth checking before you zip up.",
    sections: [
      {
        heading: "Check your allowance first",
        paragraphs: [
          "Before packing anything, check exactly what your fare includes. Many airlines distinguish between a small personal item that fits under the seat and a larger cabin bag for the overhead locker, and some basic fares only include the personal item. Each has its own size and, sometimes, weight limit.",
          "Measure your bag with everything packed, including outside pockets. A bag that fitted when it was empty can end up too big once it's full. Our guide to [budget airline fees](/blog/budget-airline-fees-explained) explains why it pays to get this right before you reach the gate.",
        ],
        bullets: [],
      },
      {
        heading: "Clothes: pack a small, mix-and-match wardrobe",
        paragraphs: [
          "The secret to packing light is choosing clothes that all go together, so a few items make many outfits. Stick to two or three colours, favour fabrics that dry quickly and resist creasing, and plan to wash a few things during the trip rather than packing for every day.",
          "Wear your bulkiest items, such as a jacket and walking shoes, on the plane. Roll soft clothes or use packing cubes to keep things compact and easy to find.",
        ],
        bullets: [
          "Three or four tops that work together",
          "Two pairs of trousers, shorts or skirts",
          "One warm layer and a light waterproof",
          "Underwear and socks for about half the trip, plus travel wash",
          "One pair of comfortable shoes worn on the plane, plus light sandals or flats if needed",
          "Sleepwear and swimwear if your trip needs them",
        ],
      },
      {
        heading: "Toiletries and the liquids rules",
        paragraphs: [
          "Liquids, gels and creams in hand luggage are restricted at airport security, and the rules depend on the country and, increasingly, on the airport, as some have newer scanners. In the United States, the TSA allows small containers in a single quart-sized bag. In the UK, the limits vary between airports, so check the official guidance and your departure airport before you pack.",
          "Solid toiletries, such as bar soap, solid shampoo and stick deodorant, sidestep the liquids rules entirely and save space. Buy sunscreen and anything bulky at your destination if you can.",
        ],
        bullets: [],
      },
      {
        heading: "Tech, batteries and chargers",
        paragraphs: [
          "Power banks and spare lithium batteries generally have to travel in the cabin rather than in checked bags, and airlines set limits on their size. Check your airline's rules if you carry a large power bank or camera batteries.",
          "Bring one multi-port charger and the cables you need rather than a separate plug for every device, plus a plug adapter for your destination. Download maps, boarding passes and entertainment before you leave so you're not relying on airport Wi-Fi.",
        ],
        bullets: [],
      },
      {
        heading: "Documents and essentials",
        paragraphs: [
          "Keep your passport, any visas or travel authorisations, bank cards and medication in your personal item, not the overhead locker, so they stay with you if the cabin bag has to go in the hold. Our [travel documents checklist](/blog/travel-documents-checklist) covers what to sort before an international trip.",
          "If you take medication, bring enough for the trip plus a little extra in its original packaging, and check the rules for your destination with official sources.",
        ],
        bullets: [],
      },
      {
        heading: "Packing tips that make it all fit",
        paragraphs: [
          "Lay everything out before you pack and remove a third of it; most people overpack. Fill shoes with socks or chargers, keep a small tote folded flat for day trips or shopping, and leave a little space for things you'll pick up along the way.",
          "On busy flights, cabin bags are sometimes moved to the hold at the gate, so keep your essentials in the personal item. If you're travelling for longer than a week, plan a laundry stop; most accommodation and many neighbourhoods have options.",
        ],
        bullets: [],
      },
      {
        heading: "Is carry-on only right for your trip?",
        paragraphs: [
          "Carry-on only works brilliantly for city breaks and multi-stop trips where you're moving often. It's harder for cold-weather trips, trips with specialist gear, or when you plan to bring lots back. If you need a checked bag, add it when you book; it's usually cheaper than adding it later.",
          "Once you've packed, our [AI trip planner](/travel-planner) can build a day-by-day itinerary for your destination, and our [cheap flight tips](/blog/cheap-flight-tips) cover other ways to keep the cost down.",
        ],
        bullets: [],
      },
      {
        heading: "A quick checklist before you leave",
        paragraphs: [
          "Run through this the night before you fly. It takes two minutes and catches most of the problems that cause stress at the airport.",
        ],
        bullets: [
          "Bag measured with everything packed, against your airline's limits",
          "Liquids packed according to your departure airport's rules",
          "Power bank and spare batteries in the cabin bag, not checked",
          "Passport, cards, medication and chargers in the personal item",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I take a power bank in my cabin bag?",
        answer:
          "Generally yes, and in fact power banks and spare lithium batteries usually must go in the cabin rather than checked luggage. Airlines limit their capacity, so check your airline's rules for large power banks.",
      },
      {
        question: "How much liquid can I take in hand luggage?",
        answer:
          "It depends on the country and the airport. Some airports with newer scanners allow more than others. Check the official security guidance for your departure airport, such as GOV.UK or the TSA, before you pack.",
      },
      {
        question: "Can I travel for two weeks with only a cabin bag?",
        answer:
          "Yes, if you pack a small wardrobe that mixes and matches and plan to do laundry once or twice. It's easiest in warm weather and on trips without specialist gear.",
      },
    ],
    related: {
      destinations: [
        "/destinations/portugal/lisbon",
        "/destinations/france/paris",
      ],
      itineraries: ["lisbon-3-days", "paris-3-days"],
      guides: [
        "budget-airline-fees-explained",
        "travel-documents-checklist",
        "cheap-flight-tips",
        "flying-with-kids",
      ],
    },
    sources: [
      SOURCES.ukHandLuggage,
      SOURCES.tsaWhatCanIBring,
      SOURCES.ukCaaBaggage,
      SOURCES.iataTravelers,
    ],
  },
  {
    slug: "travel-insurance-basics",
    category: "practical",
    status: "published",
    publishAt: "2026-10-27",
    lastReviewed: "2026-10-03",
    photo: "insurance",
    title: "Travel insurance basics: what to check before you buy",
    description:
      "A plain-English guide to travel insurance: medical cover, cancellation, pre-existing conditions, excesses and exclusions, and when to buy a policy.",
    headline: "Travel insurance basics: what to check before you buy",
    intro:
      "Travel insurance is one of those things you hope never to use. When you do need it, though, the details of the policy matter enormously. This guide explains what travel insurance usually covers, the questions to ask before you buy, and the small print that catches people out. It's general information, not advice on any particular policy.",
    sections: [
      {
        heading: "Why it's worth thinking about",
        paragraphs: [
          "The biggest reason most people buy travel insurance is medical cover. Healthcare abroad can be very expensive, and getting someone home after a serious illness or injury can cost far more than the trip itself. Governments generally advise travellers to have appropriate insurance in place before they go.",
          "Policies also commonly cover cancelling or cutting short a trip for reasons such as illness, as well as delays, missed departures and lost or stolen belongings. What's included, and how much is paid, varies a lot between policies.",
        ],
        bullets: [],
      },
      {
        heading: "Medical cover and repatriation",
        paragraphs: [
          "Check the amount of medical cover and whether it includes emergency repatriation, meaning bringing you home for treatment. Look for a 24-hour emergency assistance number and keep it with your documents.",
          "Health cards and agreements between countries can help but rarely replace insurance. For example, UK residents can use a Global Health Insurance Card (GHIC) for state healthcare in some countries, but the UK government is clear that it isn't an alternative to travel insurance and doesn't cover things like repatriation.",
        ],
        bullets: [],
      },
      {
        heading: "Pre-existing medical conditions",
        paragraphs: [
          "If you have a medical condition, you'll usually need to declare it when you buy a policy, and insurers may ask detailed questions. Answer them fully and honestly. A claim connected to a condition you didn't declare can be turned down.",
          "Some insurers specialise in cover for people with medical conditions. Comparing a few options is worthwhile, as prices and terms vary widely.",
        ],
        bullets: [],
      },
      {
        heading: "Cancellation and when to buy",
        paragraphs: [
          "Cancellation cover protects the money you've already spent if you can't travel for a covered reason. Because of that, it makes sense to buy a policy soon after booking, so you're covered from the start rather than only from the week you leave.",
          "Read the list of covered reasons carefully. Policies typically cover things like serious illness, but many exclude simply changing your mind, and cover for disruption such as strikes varies.",
        ],
        bullets: [],
      },
      {
        heading: "The small print: excesses, limits and exclusions",
        paragraphs: [
          "Every policy has limits and exclusions, and these are where most disappointments come from. Before buying, look for the key facts or summary document and check the points below.",
        ],
        bullets: [
          "The excess: the amount you pay towards each claim",
          "Single-item limits for valuables such as phones, cameras and laptops",
          "Activities that need extra cover, such as winter sports or diving",
          "Exclusions around alcohol, unattended belongings and travel against government advice",
          "Whether the policy covers all the countries you're visiting",
        ],
      },
      {
        heading: "Single-trip or annual policy?",
        paragraphs: [
          "A single-trip policy covers one journey. An annual multi-trip policy covers several trips in a year, usually with a maximum length for each trip. If you travel more than a couple of times a year, an annual policy can be better value, but check the trip-length limit and the regions it covers.",
          "Some bank accounts and credit cards include travel insurance. If yours does, read the terms carefully, as the cover may be more limited than a standalone policy or require you to have paid for the trip with that card.",
        ],
        bullets: [],
      },
      {
        heading: "Making a claim",
        paragraphs: [
          "If something goes wrong, contact the insurer's emergency line as soon as you can, especially for medical problems. Keep receipts, medical reports, police reports for theft, and written confirmation from airlines about delays. Claims go much more smoothly with documentation.",
          "Finally, check official travel advice for your destination before you go, as insurance can be affected if you travel against it. Our [travel documents checklist](/blog/travel-documents-checklist) and [carry-on packing list](/blog/carry-on-packing-list) help with the rest of your preparation, and our [AI trip planner](/travel-planner) can build the itinerary.",
        ],
        bullets: [],
      },
      {
        heading: "Comparing policies sensibly",
        paragraphs: [
          "Price matters, but the cheapest policy isn't always good value. Compare the medical cover, the excess, the cancellation limit and the exclusions side by side for the trip you're actually taking. A slightly more expensive policy with a lower excess or better cover for your activities can work out cheaper if you ever need to claim.",
          "Comparison websites are a useful starting point, but always read the policy's own summary document before you buy. If something is unclear, ask the insurer and get the answer in writing.",
        ],
        bullets: [],
      },
      {
        heading: "Travelling with family or for longer",
        paragraphs: [
          "Family policies can cover several people at once, but check the definition of family and any age limits for children. For longer trips, such as a gap year or extended travel, look for policies designed for long stays, as standard single-trip and annual policies often limit how long you can be away.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "When should I buy travel insurance?",
        answer:
          "Ideally soon after you book, so cancellation cover protects you from the start. If you buy just before leaving, you won't be covered for reasons that stop you travelling before then.",
      },
      {
        question: "Does a GHIC or EHIC replace travel insurance?",
        answer:
          "No. The UK government says a GHIC or EHIC gives access to state healthcare in some countries but isn't an alternative to travel insurance and won't cover things like repatriation or private treatment.",
      },
      {
        question: "Do I need to declare medical conditions?",
        answer:
          "Usually, yes. Insurers ask about pre-existing conditions, and a claim linked to something you didn't declare can be refused. Answer the questions fully, and compare insurers if cover is expensive.",
      },
    ],
    related: {
      destinations: ["/destinations/japan", "/destinations/italy"],
      itineraries: ["tokyo-5-days"],
      guides: [
        "travel-documents-checklist",
        "carry-on-packing-list",
        "how-to-plan-a-trip",
        "solo-travel-tips",
      ],
    },
    sources: [
      SOURCES.govUkTravelInsurance,
      SOURCES.govUkGhic,
      SOURCES.ukAdviceIndex,
    ],
  },
];
