import { type GuideSchema } from "@/content/schema";
import { SOURCES } from "@/content/data/sources";
import { type z } from "zod";

type PostInput = z.input<typeof GuideSchema>;

/**
 * December 2026 batch, one post a week. Each stays hidden until its
 * publishAt date. Review and add first-hand tips before each date.
 * No prices, dates of events or rail rules beyond what official sources
 * state in general terms.
 */
export const decemberPosts: PostInput[] = [
  {
    slug: "japan-rail-pass-is-it-worth-it",
    category: "practical",
    status: "published",
    publishAt: "2026-12-01",
    lastReviewed: "2026-10-03",
    photo: "jr-pass",
    title: "Japan Rail Pass: is it worth it for your trip?",
    description:
      "How to decide if a Japan Rail Pass is worth it: what it covers, how to compare it with individual tickets, and when a regional pass or single tickets win.",
    headline: "Japan Rail Pass: is it worth it for your trip?",
    intro:
      "The Japan Rail Pass used to be an automatic purchase for many first-time visitors. After price changes in recent years, it's now worth doing the sums. The pass can still save money and hassle on the right itinerary, and cost more than it saves on the wrong one. Here's how to decide.",
    sections: [
      {
        heading: "What the pass is",
        paragraphs: [
          "The Japan Rail Pass is a rail pass for visitors to Japan that gives unlimited travel on most Japan Railways (JR) trains for a fixed number of consecutive days. It covers many Shinkansen bullet trains as well as local and limited express JR services, and some JR buses and ferries.",
          "It isn't valid on everything. Private railways, subways and many city buses aren't JR, and the fastest trains on some Shinkansen lines have their own rules for pass holders. Eligibility, coverage and prices are set by the JR companies and can change, so always check the official Japan Rail Pass website before you buy.",
        ],
        bullets: [],
      },
      {
        heading: "The simple test: add up your journeys",
        paragraphs: [
          "The best way to decide is to compare the pass with what you'd pay for individual tickets. List the long journeys you plan to make within the pass's validity, such as Tokyo to Kyoto and back, and look up the fare for each on official railway websites or a reliable route planner.",
          "If the total for those journeys comes close to or above the price of the pass, the pass is likely worth it, especially once you add the convenience and the occasional extra trip. If you're mostly staying in one city with a single long journey or two, individual tickets usually work out cheaper.",
        ],
        bullets: [
          "List every long-distance journey within the pass's validity period",
          "Look up the individual fare for each journey",
          "Compare the total with the current price of the pass",
          "Add a little value for flexibility and spontaneous day trips",
        ],
      },
      {
        heading: "When the pass tends to make sense",
        paragraphs: [
          "The pass is most useful when you're covering a lot of ground in a short time: for example, a trip that combines Tokyo, Kyoto, Osaka and Hiroshima with day trips in between, all within the pass's validity. Multiple long Shinkansen journeys add up quickly.",
          "It's less useful for slower trips that stay in one or two places. Our [Tokyo in 5 days itinerary](/itineraries/tokyo-5-days), for example, focuses on the city and its easy day trips, where local transport and IC cards often make more sense than a nationwide pass.",
        ],
        bullets: [],
      },
      {
        heading: "Regional passes: a middle ground",
        paragraphs: [
          "Several JR companies sell regional passes that cover a specific area, such as parts of eastern or western Japan. If your trip centres on one region, a regional pass can be much better value than the nationwide pass, while still covering the journeys you need.",
          "Look at a map of where you're going and check which regional passes cover it. As with the nationwide pass, compare the price against your planned journeys rather than assuming it saves money.",
        ],
        bullets: [],
      },
      {
        heading: "Getting around cities without a pass",
        paragraphs: [
          "Inside big cities, much of your travel will be on subways and private lines that the pass doesn't cover. A rechargeable IC card, which you tap on and off, is usually the easiest way to pay for city trains and buses. Our [Tokyo travel guide](/destinations/japan/tokyo) explains how they work.",
          "Even with a pass, you'll probably use an IC card too, so it's worth getting one early in your trip.",
        ],
        bullets: [],
      },
      {
        heading: "Practical tips if you buy one",
        paragraphs: [
          "Choose your start date carefully, because the pass runs on consecutive days. Many travellers start it on the day of their first long journey rather than the day they arrive, so they're not wasting days in one city.",
          "Reserve seats on popular routes, especially around Japanese holidays, when trains get busy. Keep your pass and passport with you, as staff may ask to see both. Check the official site for how to buy and activate the pass, as the process has changed over time.",
        ],
        bullets: [],
      },
      {
        heading: "Planning your route",
        paragraphs: [
          "Whether or not you buy a pass, the order of your stops matters. Grouping places along a sensible route saves time and money. Our [Japan travel guide](/destinations/japan) covers the classic Tokyo, Kyoto and Osaka route, and our guide on [how to build a travel itinerary](/blog/how-to-build-a-travel-itinerary) explains how to plan realistic days.",
          "If you're flying in, our guide to [getting from the airport to the city](/blog/airport-to-city-paris-rome-tokyo-lisbon) covers Tokyo's Haneda and Narita airports, and our [AI trip planner](/travel-planner) can draft a day-by-day plan you can price up.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "Is the Japan Rail Pass still worth it?",
        answer:
          "It can be, but it depends on your route. Add up the individual fares for your long journeys within the pass's validity and compare them with the current pass price. It suits fast-paced trips with several long Shinkansen rides.",
      },
      {
        question: "Does the Japan Rail Pass cover the Tokyo subway?",
        answer:
          "No. The Tokyo subway lines aren't run by JR, so the pass doesn't cover them. It does cover JR lines in the city. Most visitors use a rechargeable IC card for subways and buses.",
      },
      {
        question: "Should I buy a regional pass instead?",
        answer:
          "If your trip focuses on one part of Japan, a regional JR pass may cover your journeys for less than the nationwide pass. Check which regional passes cover your route and compare prices.",
      },
    ],
    related: {
      destinations: ["/destinations/japan", "/destinations/japan/tokyo"],
      itineraries: ["tokyo-5-days"],
      guides: [
        "how-to-build-a-travel-itinerary",
        "how-to-beat-jet-lag",
        "airport-to-city-paris-rome-tokyo-lisbon",
      ],
    },
    sources: [SOURCES.jrPass, SOURCES.jnto, SOURCES.jrCentral],
  },
  {
    slug: "winter-city-breaks-paris-rome-lisbon",
    category: "planning",
    status: "published",
    publishAt: "2026-12-08",
    lastReviewed: "2026-10-03",
    photo: "winter-city",
    title: "Winter city breaks: Paris, Rome and Lisbon",
    description:
      "What Paris, Rome and Lisbon are like in winter: weather, festive season, quieter sights, shorter days, and how to plan a winter city break that works.",
    headline: "Winter city breaks: Paris, Rome and Lisbon in the colder months",
    intro:
      "Winter is one of the most underrated times for a city break. Crowds thin out after the festive season, museums and cafés feel cosy, and you can often find better value. Each city has its own winter character, though. Here's what to expect in Paris, Rome and Lisbon, and how to plan around shorter days.",
    sections: [
      {
        heading: "Why go in winter",
        paragraphs: [
          "Outside the Christmas and New Year holidays, winter is generally quieter in all three cities, which means shorter queues at major sights and a more relaxed feel in popular areas. Accommodation and flights can be better value too, though prices around the holidays are often high.",
          "The trade-offs are shorter days, cooler weather and a higher chance of rain. With a little planning, those are easy to work around, and a mix of indoor and outdoor sights keeps any day enjoyable.",
        ],
        bullets: [],
      },
      {
        heading: "Paris in winter",
        paragraphs: [
          "Paris in winter is often grey and chilly, with the occasional crisp, bright day. December brings festive lights and Christmas markets, while January and February are usually much quieter. It's a great season for the city's museums, covered passages, cafés and food markets.",
          "Pack warm layers and a waterproof, and plan museum visits for rainy afternoons. Our [Paris travel guide](/destinations/france/paris) explains the best areas to base yourself, and our [Paris in 3 days itinerary](/itineraries/paris-3-days) groups the city by neighbourhood, which matters more when days are short.",
        ],
        bullets: [],
      },
      {
        heading: "Rome in winter",
        paragraphs: [
          "Rome's winters are milder than those of northern Europe, with cool days and some rain. The big sights, from ancient ruins to great churches and museums, are far less crowded than in spring and summer, which makes winter a rewarding time to visit.",
          "The festive season is a big moment in Rome, running into early January, when Epiphany is a public holiday in Italy. Check opening days around the holidays, as some sites change their hours. Our [Rome travel guide](/destinations/italy/rome) covers how to group the Colosseum, the Vatican and the historic centre into manageable days.",
        ],
        bullets: [],
      },
      {
        heading: "Lisbon in winter",
        paragraphs: [
          "Lisbon has some of the mildest winters of any European capital, with plenty of bright days between rainy spells. It's a pleasant time for walking the hills, riding the trams and enjoying the viewpoints without the summer heat or crowds.",
          "Bring a light waterproof and shoes with grip, as cobbled streets can be slippery in the rain. Our [Lisbon travel guide](/destinations/portugal/lisbon) and [Lisbon in 3 days itinerary](/itineraries/lisbon-3-days) help you plan, including a day trip to Sintra, which can be cooler and mistier than the city.",
        ],
        bullets: [],
      },
      {
        heading: "Planning around shorter days",
        paragraphs: [
          "With fewer hours of daylight, start your days a little earlier and put outdoor sights, viewpoints and walks first. Save museums, galleries, markets and long lunches for the afternoon, when the light fades.",
          "Group each day by area so you're not losing precious daylight to travel. Our guide on [how to build a travel itinerary](/blog/how-to-build-a-travel-itinerary) explains how to plan days around anchors and neighbourhoods.",
        ],
        bullets: [
          "Outdoor sights and viewpoints in the morning",
          "Museums, markets and cafés in the afternoon",
          "One area per day to save travel time",
          "A backup indoor plan for rainy days",
        ],
      },
      {
        heading: "Around Christmas and New Year",
        paragraphs: [
          "The festive season is magical but busy, and prices for flights and hotels rise. Book early if you plan to travel then, and check opening hours carefully, as some attractions close or change their hours on public holidays. Public transport may run a reduced service on Christmas Day and New Year's Day.",
          "If you're flying over the holidays, allow extra time at the airport and think about how you'll pack gifts, as wrapped presents may need to be opened at security.",
        ],
        bullets: [],
      },
      {
        heading: "What to pack",
        paragraphs: [
          "Layers are your friend: a warm jumper, a waterproof jacket, comfortable waterproof shoes, and a hat, scarf and gloves for Paris. Rome and Lisbon need less, but evenings can still be cool. A compact umbrella earns its place in all three cities.",
          "Once you've picked your city, our [AI trip planner](/travel-planner) can draft a winter-friendly day-by-day plan that mixes indoor and outdoor sights.",
        ],
        bullets: [],
      },
      {
        heading: "Making the most of winter evenings",
        paragraphs: [
          "Long evenings are a chance to enjoy each city's indoor life. Concerts, opera and theatre seasons are in full swing, and a long dinner in a traditional restaurant is part of the experience. Booking ahead for popular performances and restaurants is wise, especially in December.",
          "Many museums open late on certain evenings, which is a pleasant way to see them with fewer visitors. Check official websites for current late openings, as they vary by museum and season.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "Which is warmest in winter: Paris, Rome or Lisbon?",
        answer:
          "Lisbon generally has the mildest winters of the three, followed by Rome. Paris is usually the coldest and greyest, though it has its own winter charm with festive lights and cosy museums and cafés.",
      },
      {
        question: "Is winter a good time for a city break?",
        answer:
          "Often, yes. Outside the holidays, cities are quieter and can be better value. Plan around shorter days and the chance of rain by mixing outdoor and indoor sights.",
      },
      {
        question: "Are attractions open over Christmas?",
        answer:
          "Many are, but some close or change their hours on public holidays, and transport may run a reduced service. Check official websites for the exact days you plan to visit.",
      },
    ],
    related: {
      destinations: [
        "/destinations/france/paris",
        "/destinations/italy/rome",
        "/destinations/portugal/lisbon",
      ],
      itineraries: ["paris-3-days", "lisbon-3-days"],
      guides: [
        "how-to-build-a-travel-itinerary",
        "christmas-new-year-travel-tips",
        "how-to-plan-a-trip-on-a-budget",
      ],
    },
    sources: [SOURCES.paris, SOURCES.rome, SOURCES.visitLisboa],
  },
  {
    slug: "where-to-stay-in-a-new-city",
    category: "planning",
    status: "published",
    publishAt: "2026-12-15",
    lastReviewed: "2026-10-03",
    photo: "where-to-stay",
    title: "Where to stay in a new city: how to choose",
    description:
      "How to choose where to stay in a city you don't know: picking a neighbourhood, transport links, reading reviews, hotels versus apartments and local taxes.",
    headline: "How to choose where to stay in a new city",
    intro:
      "Where you stay shapes your whole trip. The right base saves hours of travel and makes evenings easy; the wrong one leaves you commuting across town every day. Here's a practical way to choose a neighbourhood and a place to stay in a city you've never visited.",
    sections: [
      {
        heading: "Start with what you'll actually do",
        paragraphs: [
          "Before looking at listings, sketch out what you want to see and do. If most of your must-sees cluster in one area, staying there or nearby makes sense. If they're spread out, look for a base with fast public transport to all of them.",
          "Our guide on [how to build a travel itinerary](/blog/how-to-build-a-travel-itinerary) explains how to group plans by area, which also points you towards the best place to stay.",
        ],
        bullets: [],
      },
      {
        heading: "Choose the neighbourhood first",
        paragraphs: [
          "It's easier to pick a neighbourhood and then a place to stay than the other way round. Central areas are convenient but busier and often pricier; quieter residential areas close to good transport can offer better value and a more local feel.",
          "Our destination guides suggest areas to consider. For example, the [Lisbon guide](/destinations/portugal/lisbon) compares Baixa and Chiado with the quieter Príncipe Real and hilly Alfama, and the [Paris guide](/destinations/france/paris) covers the areas that suit first-time visitors.",
        ],
        bullets: [],
      },
      {
        heading: "Check transport, not just distance",
        paragraphs: [
          "A place that looks close on a map can still be a slow journey if it's up a steep hill or far from a station. Check the walk to the nearest metro, tram or train stop, and how often services run in the evening.",
          "If you're arriving with luggage, consider how you'll get there from the airport or station. Our guide to [getting from the airport to the city](/blog/airport-to-city-paris-rome-tokyo-lisbon) covers the main options in four popular cities.",
        ],
        bullets: [],
      },
      {
        heading: "Read reviews the right way",
        paragraphs: [
          "Recent reviews are more useful than the overall score. Look for patterns in what guests say about cleanliness, noise, the neighbourhood after dark, and whether the photos match reality. A single bad review matters less than the same complaint repeated.",
          "Check the exact location on a map, as listings sometimes describe a wider area than where the property actually is.",
        ],
        bullets: [
          "Recent reviews from the last few months",
          "Repeated comments about noise, cleanliness or safety",
          "The exact location on a map",
          "Whether the photos look current",
        ],
      },
      {
        heading: "Hotel, apartment or guesthouse?",
        paragraphs: [
          "Hotels are simple and offer services such as a front desk, luggage storage and daily cleaning, which helps on short trips and late arrivals. Apartments give you more space and a kitchen, which suits families and longer stays. Guesthouses and small hotels can offer a personal touch and local advice.",
          "Whatever you choose, check the cancellation policy, the check-in arrangements, and whether there's somewhere to leave bags before check-in or after check-out.",
        ],
        bullets: [],
      },
      {
        heading: "Watch for local taxes and extra costs",
        paragraphs: [
          "Many cities, including Paris, Rome and Lisbon, charge a tourist tax per person per night, often paid at the property. It may not be included in the price you see online, so read the details before booking.",
          "Also check for cleaning fees on apartments, charges for late check-in, and whether breakfast is included. Comparing the total cost, not just the nightly rate, avoids surprises. Our guide on [how to plan a trip on a budget](/blog/how-to-plan-a-trip-on-a-budget) has more ways to keep costs down.",
        ],
        bullets: [],
      },
      {
        heading: "Putting it together",
        paragraphs: [
          "Shortlist two or three neighbourhoods, then compare a few places in each on location, reviews and total cost. Book early for busy periods, and keep confirmations somewhere you can reach offline.",
          "Once your base is set, our [AI trip planner](/travel-planner) can build a day-by-day itinerary that starts and ends near where you're staying.",
        ],
        bullets: [],
      },
      {
        heading: "Safety and comfort checks",
        paragraphs: [
          "Look at what reviewers say about the walk back at night, lighting and how busy the street is. A lively area is great for evenings out but can be noisy late at night, so light sleepers may prefer a quieter street a few minutes away.",
          "Check practical details that make a stay comfortable: heating or air conditioning for the season, a lift if you have heavy luggage or mobility needs, and reliable Wi-Fi if you'll need to work or plan on the go.",
        ],
        bullets: [],
      },
      {
        heading: "Travelling with family or as a group",
        paragraphs: [
          "Families and groups often get better value and more space from an apartment or a hotel with family rooms. Look at the bed layout, not just the number of guests, and check whether cots or extra beds are available and charged.",
          "Being close to a park, a supermarket and simple places to eat makes a big difference with children. Our guide to [flying with kids](/blog/flying-with-kids) covers the journey itself.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "Is it better to stay in the city centre?",
        answer:
          "It's convenient, especially for short trips, but often busier and pricier. A quieter area close to good public transport can be better value and still put the main sights within easy reach.",
      },
      {
        question: "What is a tourist tax?",
        answer:
          "Many cities charge visitors a small tax per person per night, often paid directly at the property. It may not be included in the online price, so check the booking details before you pay.",
      },
      {
        question: "Hotel or apartment for a city break?",
        answer:
          "Hotels suit short trips and late arrivals thanks to services like a front desk and luggage storage. Apartments suit families and longer stays, with more space and a kitchen.",
      },
    ],
    related: {
      destinations: [
        "/destinations/portugal/lisbon",
        "/destinations/france/paris",
        "/destinations/italy/rome",
      ],
      itineraries: ["lisbon-3-days", "paris-3-days"],
      guides: [
        "how-to-build-a-travel-itinerary",
        "how-to-plan-a-trip-on-a-budget",
        "airport-to-city-paris-rome-tokyo-lisbon",
      ],
    },
    sources: [SOURCES.paris, SOURCES.rome, SOURCES.visitLisboa],
  },
  {
    slug: "christmas-new-year-travel-tips",
    category: "flights",
    status: "published",
    publishAt: "2026-12-22",
    lastReviewed: "2026-10-03",
    photo: "holiday-travel",
    title: "Christmas and New Year travel: tips for busy trips",
    description:
      "Practical tips for travelling over Christmas and New Year: booking early, busy airports, winter weather delays, gifts at security and holiday opening hours.",
    headline:
      "Travelling over Christmas and New Year: tips for busy holiday trips",
    intro:
      "The festive season is one of the busiest times to travel. Airports are full, prices are high and winter weather can disrupt plans. A little extra preparation goes a long way. Here's how to make holiday trips smoother, from booking to getting home.",
    sections: [
      {
        heading: "Book early and be flexible",
        paragraphs: [
          "Flights and accommodation around Christmas and New Year sell quickly, and prices tend to rise as seats fill up. If you know you'll travel, start watching prices early and book when you see a fare that works for you.",
          "Flexibility helps: flying a day or two either side of the busiest dates, or at less popular times of day, can be cheaper and calmer. Our guide on [how to find cheap flights](/blog/how-to-find-cheap-flights) explains how to compare dates and airports.",
        ],
        bullets: [],
      },
      {
        heading: "Expect busy airports",
        paragraphs: [
          "Leave more time than usual for check-in, bag drop and security, especially on the days just before Christmas and around New Year. Check in online, travel light if you can, and keep your boarding pass on your phone.",
          "If you have a connection, choose a comfortable layover rather than the shortest one. Our guide on [how much layover time you need](/blog/how-much-layover-time-do-you-need) explains how to judge it.",
        ],
        bullets: [],
      },
      {
        heading: "Gifts and security",
        paragraphs: [
          "Wrapped presents can be a problem at airport security, because officers may need to unwrap them to check what's inside. Consider wrapping gifts after you arrive, or using gift bags that are easy to open.",
          "Liquids rules still apply to gifts such as perfume, drinks and food. Some festive items, like larger snow globes, may not be allowed in hand luggage at all. Check the official security guidance for your departure airport before you pack; our [carry-on packing list](/blog/carry-on-packing-list) covers the general rules.",
        ],
        bullets: [
          "Wrap gifts after arrival, or use easy-open gift bags",
          "Put liquid gifts in checked luggage or follow the liquids rules",
          "Check rules for unusual items such as snow globes",
        ],
      },
      {
        heading: "Winter weather and disruption",
        paragraphs: [
          "Snow, ice, fog and storms can delay or cancel flights in winter, and the busy season leaves less spare capacity for rebooking. Check your flight status before leaving for the airport, and sign up for airline alerts.",
          "If your flight is delayed or cancelled, you may have rights to care and rebooking, and in some cases a refund, depending on where you're flying and why. Under EU and UK rules, compensation usually isn't due for genuinely extraordinary circumstances such as severe weather, but care and rerouting often still are. The official sources below explain the details.",
        ],
        bullets: [],
      },
      {
        heading: "Holiday opening hours and transport",
        paragraphs: [
          "Many attractions, shops and restaurants close or change their hours on Christmas Day, New Year's Day and other public holidays, and public transport often runs a reduced service. Check official websites before you plan those days, and book restaurants for special meals well in advance.",
          "New Year's Eve can bring road closures, busy transport and crowds in city centres. Plan how you'll get back to your accommodation after midnight.",
        ],
        bullets: [],
      },
      {
        heading: "If you're visiting a city for the holidays",
        paragraphs: [
          "Festive city breaks can be wonderful, with lights, markets and seasonal food. Our guide to [winter city breaks in Paris, Rome and Lisbon](/blog/winter-city-breaks-paris-rome-lisbon) covers what each city is like in the colder months.",
          "Keep the plan flexible and leave room for weather, closures and simply enjoying the atmosphere.",
        ],
        bullets: [],
      },
      {
        heading: "Protect your plans",
        paragraphs: [
          "Travel insurance bought soon after booking can protect you if illness or other covered events stop you travelling, which matters more when prices are high. Our guide to [travel insurance basics](/blog/travel-insurance-basics) explains what to check.",
          "Keep important documents, medication and chargers in your hand luggage, and have digital copies of bookings available offline. Our [AI trip planner](/travel-planner) can help you plan the days around your holiday flights.",
        ],
        bullets: [],
      },
      {
        heading: "Packing for winter travel",
        paragraphs: [
          "Wear your bulkiest coat and boots on the plane to save space, and keep a warm layer in your hand luggage in case of long waits or cold transfers. Pack a small kit of essentials, such as medication, chargers and a change of clothes, in your hand luggage in case checked bags are delayed.",
          "If you're bringing gifts back home, leave some space in your bag or plan to buy a soft extra bag at your destination.",
        ],
        bullets: [],
      },
      {
        heading: "If your plans change",
        paragraphs: [
          "If a delay or cancellation affects your trip, contact the airline or use its app straight away, as rebooking options fill quickly in the busy season. Keep receipts for meals and accommodation, and screenshots of any messages from the airline.",
          "If you booked accommodation separately, let the property know as soon as possible if you'll arrive late, so they can hold your room.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "Should I wrap gifts before flying?",
        answer:
          "It's often better not to. Security officers may need to unwrap presents to check them. Wrap gifts after you arrive, or use gift bags that are easy to open and close again.",
      },
      {
        question: "Am I entitled to compensation if snow cancels my flight?",
        answer:
          "Under EU and UK rules, compensation usually isn't due for extraordinary circumstances such as severe weather, but you may still be entitled to care and rerouting. Check the official guidance for your flight.",
      },
      {
        question: "How early should I get to the airport at Christmas?",
        answer:
          "Earlier than usual. Airports are busiest on the days around Christmas and New Year, so allow extra time for bag drop and security, and check in online before you leave home.",
      },
    ],
    related: {
      destinations: ["/destinations/france/paris", "/destinations/italy/rome"],
      itineraries: ["paris-3-days"],
      guides: [
        "how-to-find-cheap-flights",
        "how-much-layover-time-do-you-need",
        "winter-city-breaks-paris-rome-lisbon",
      ],
    },
    sources: [
      SOURCES.euAirRights,
      SOURCES.ukCaaDelays,
      SOURCES.usDotAirConsumer,
      SOURCES.tsaWhatCanIBring,
    ],
  },
];
