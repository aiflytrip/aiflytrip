import { type GuideSchema } from "@/content/schema";
import { SOURCES } from "@/content/data/sources";
import { type z } from "zod";

type PostInput = z.input<typeof GuideSchema>;

/**
 * Blog posts (same schema and quality gate as the planning guides).
 * Inline links use [label](/path) and are validated by the content tests.
 * No prices, statistics or "best day to book" figures are stated as facts.
 */
export const blogPosts: PostInput[] = [
  {
    slug: "how-to-find-cheap-flights",
    photo: "cheap-flights",
    category: "flights",
    status: "published",
    lastReviewed: "2026-10-03",
    title: "How to find cheap flights: a step-by-step guide",
    description:
      "A practical method for finding cheaper flights: flexible dates, nearby airports, fare types, the true total cost, price alerts and when to book direct.",
    headline: "How to find cheap flights: a step-by-step method",
    intro:
      "Cheap flights are rarely about a secret trick. They come from a repeatable method: being flexible where you can, comparing the right options, and judging fares by what you will actually pay rather than the headline price. This guide walks through that method step by step.",
    sections: [
      {
        heading: "1. Start with flexibility, not a booking site",
        paragraphs: [
          "The single biggest lever on price is flexibility. Before you search, decide which parts of the trip can move: the exact dates, the length of the trip, the departure airport or even the destination. Each extra option you allow gives you more fares to compare.",
          "Most flight search tools have a flexible-date or calendar view that shows prices across a week or a month. Use it to spot cheaper days around your preferred dates. Moving a trip by a day or two, or flying out midweek instead of on a Friday, often changes the price noticeably because demand is lower.",
          "If your dates are fixed, flexibility can still come from airports, routes and fare types, which the next steps cover. If you are still deciding how long to go for, our guide on [how many days you need for a trip](/blog/how-many-days-for-a-trip) can help you choose a length that leaves room to compare dates.",
        ],
        bullets: [],
      },
      {
        heading: "2. Compare nearby airports and different routes",
        paragraphs: [
          "Many cities are served by more than one airport, and smaller airports are sometimes cheaper to fly from or into. Check every airport you could reasonably reach, then add the cost and time of getting there. A cheaper fare from an airport two hours away is only a saving if the journey to it costs less than the difference.",
          "Look beyond nonstop flights, too. A route with one connection can cost less than flying direct, especially on long-haul trips. Weigh the saving against the extra travel time and the risk of a tight connection, and prefer connections on a single ticket so the airline is responsible for rebooking you if the first flight is late.",
          "You can compare routes and airports for your own dates with our [flight search](/flights), which currently shows example fares from a test environment for planning.",
        ],
        bullets: [],
      },
      {
        heading: "3. Search returns and one-ways",
        paragraphs: [
          "Return tickets are not always cheaper than two one-ways. On many short-haul routes, especially with low-cost airlines, fares are priced per direction, so combining two one-way tickets, even on different airlines, can work out cheaper or give you better times.",
          "The trade-off is protection. With two separate tickets, a delay on the outbound flight is not the return airline's problem, and a missed connection between separate tickets is usually your responsibility. Separate tickets work best for simple point-to-point trips with plenty of time either side.",
        ],
        bullets: [],
      },
      {
        heading: "4. Understand what the fare includes",
        paragraphs: [
          "Two fares with the same headline price can be very different products. Before comparing, check what each includes: cabin baggage, checked baggage, seat selection, changes and refunds. Basic fares are cheap partly because they leave these out.",
          "Read the fare conditions for changes and cancellations. If your plans might change, a slightly more expensive fare that allows changes can be cheaper overall than a basic fare you have to abandon. Our guide to [budget airline fees](/blog/budget-airline-fees-explained) explains the common extras in detail.",
        ],
        bullets: [],
      },
      {
        heading: "5. Compare the total cost, not the headline price",
        paragraphs: [
          "The fare is only one part of the cost of flying. Add the extras you will actually need, the cost of getting to and from each airport, and the value of your time. A late-night arrival that needs a taxi instead of a train, or an extra hotel night because of an early departure, can wipe out a saving.",
          "In the European Union, airlines and agents must show the final price including all unavoidable taxes and charges, and optional extras must be offered on an opt-in basis. That makes like-for-like comparisons easier, but optional extras such as bags and seats still need adding yourself. Our free [trip budget calculator](/tools/trip-budget-calculator) adds up flights, accommodation and daily costs for you.",
        ],
        bullets: [
          "Bags you will really take, both cabin and checked",
          "Seat selection, if you need to sit together",
          "Airport transport at both ends, including at the times you land and leave",
          "Extra accommodation caused by very early or very late flights",
        ],
      },
      {
        heading: "6. Track prices instead of guessing the best day",
        paragraphs: [
          "You will often hear that one weekday or a fixed number of weeks before departure is always cheapest. Fares are set by demand and seat availability on each flight, so no single rule holds for every route. A more reliable approach is to start watching prices early and act when a fare looks good for your trip.",
          "Set price alerts for your route and dates in one or two search tools. Watching the same flights for a while shows you what a normal price looks like, so you can recognise a genuinely good fare. For busy periods such as school holidays and major events, popular flights can sell out, so it rarely pays to wait until the last minute.",
        ],
        bullets: [],
      },
      {
        heading: "7. Check the airline's own website before you book",
        paragraphs: [
          "Comparison sites are excellent for finding options, but it is worth checking the same flight on the airline's own website before booking. The price is often the same or close, and booking direct can make changes, refunds and disruption easier to handle, because you deal with the airline rather than an intermediary.",
          "If you do book through a third party, use a well-known company, read its change and cancellation terms, and make sure the final price includes everything you need.",
        ],
        bullets: [],
      },
      {
        heading: "8. Know your rights if things change",
        paragraphs: [
          "Cheap tickets still come with passenger rights. Under EU and UK rules, passengers on many flights can be entitled to care, such as meals and accommodation, during long delays, and to a refund or rerouting, and in some cases fixed compensation, if a flight is cancelled at short notice or arrives very late, unless extraordinary circumstances apply.",
          "In the United States, you are generally entitled to a refund if an airline cancels or significantly changes your flight and you choose not to travel. Rules differ by country and by airline, so check the official sources linked below for your trip. Once your flights are sorted, our [AI trip planner](/travel-planner) can turn your dates into a day-by-day plan.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question:
          "Is it cheaper to book flights on a particular day of the week?",
        answer:
          "There is no reliable rule that one booking day is always cheapest. Fares depend on demand and the seats left on each flight. Comparing prices across dates and setting alerts is a more dependable way to find a good fare.",
      },
      {
        question:
          "Do flight prices go up if I search the same route repeatedly?",
        answer:
          "Prices change frequently because seats sell and demand shifts, which can look like prices rising as you search. Searching in a private window does no harm, but comparing several sources and the airline's own site matters far more.",
      },
      {
        question: "Are budget airlines always the cheapest option?",
        answer:
          "Not always. Once you add bags, seat selection and the cost of reaching secondary airports, a full-service airline can cost the same or less. Compare the total price for the journey you will actually take, not just the base fare.",
      },
    ],
    related: {
      destinations: ["/destinations/portugal", "/destinations/japan"],
      itineraries: ["lisbon-3-days"],
      guides: [
        "cheap-flight-tips",
        "budget-airline-fees-explained",
        "how-much-layover-time-do-you-need",
      ],
    },
    sources: [
      SOURCES.euAirRights,
      SOURCES.eu1008,
      SOURCES.ukCaaDelays,
      SOURCES.usDotAirConsumer,
    ],
  },
  {
    slug: "cheap-flight-tips",
    photo: "flight-tips",
    category: "flights",
    status: "published",
    lastReviewed: "2026-10-03",
    title: "Cheap flight tips: 12 practical ways to save on airfare",
    description:
      "Twelve practical ways to pay less for flights, from travelling off-peak and packing light to open-jaw routes, price alerts and the risky tricks to avoid.",
    headline: "Cheap flight tips: 12 practical ways to save",
    intro:
      "Saving money on flights usually comes from many small decisions rather than one big hack. These twelve tips cover timing, routes, luggage and booking, plus a few popular tricks that are best avoided. Use them alongside our step-by-step guide on [how to find cheap flights](/blog/how-to-find-cheap-flights).",
    sections: [
      {
        heading: "Timing tips",
        paragraphs: [
          "When you travel shapes the price more than almost anything else. Demand rises and falls with seasons, school holidays and events, and fares follow it.",
        ],
        bullets: [
          "1. Travel in shoulder season. The weeks just before and after a destination's peak season often bring lower fares, fewer crowds and still-pleasant weather. Our destination guides cover the best time to visit places such as [Japan](/destinations/japan) and [Italy](/destinations/italy).",
          "2. Avoid school holidays and big events where you can. Flights around holidays, major festivals and sporting events fill up quickly. If your dates are flexible, shifting a week can make a real difference.",
          "3. Consider less popular flight times. Early-morning, late-evening and midweek flights are often less in demand than Friday and Sunday afternoons. Check that the timing works with public transport at both ends before you commit.",
        ],
      },
      {
        heading: "Route tips",
        paragraphs: [
          "Changing how you get somewhere can matter as much as when. These tips widen the set of fares you can choose from.",
        ],
        bullets: [
          "4. Check every nearby airport. Smaller or secondary airports can have cheaper fares, but add the cost and time of getting to them before deciding.",
          "5. Be open to one connection. On longer routes, a connecting flight is often cheaper than nonstop. Keep connections on one ticket and leave sensible time between flights.",
          "6. Try an open-jaw trip. Flying into one city and home from another, for example into Rome and out of Venice, can save backtracking and sometimes money. Our [Italy guide](/destinations/italy) explains classic routes between cities.",
          "7. Use positioning flights with care. Sometimes it is cheaper to take a short flight or train to a bigger hub and start a long-haul trip from there. Book generous gaps, because separate tickets do not protect you if the first leg is late.",
        ],
      },
      {
        heading: "Luggage and extras tips",
        paragraphs: [
          "Extras are where a cheap fare can quietly become an expensive one. Planning them in advance keeps the total under control.",
        ],
        bullets: [
          "8. Pack light. If you can travel with only the free personal item or a cabin bag, you avoid checked bag fees altogether. Check your airline's size and weight limits and measure your bag at home.",
          "9. Skip paid seat selection when you can. If you are happy to sit anywhere, the free seat assigned at check-in is fine. If sitting together matters, compare the cost of seats against a fare that includes them.",
          "10. Check in online and keep your boarding pass ready. Some airlines charge for airport check-in or printing boarding passes. Read the rules for your fare in our guide to [budget airline fees](/blog/budget-airline-fees-explained).",
        ],
      },
      {
        heading: "Booking tips",
        paragraphs: [
          "A little preparation before you pay helps you recognise a good deal and keep it.",
        ],
        bullets: [
          "11. Set price alerts early. Watching the same route for a while shows you the normal price range, so you can book confidently when a fare drops instead of guessing.",
          "12. Use points and loyalty schemes sensibly. Airline and credit card points can cut the cost of a ticket, but compare the taxes and fees on reward bookings with a paid fare, and avoid spending more just to earn points.",
        ],
      },
      {
        heading: "Tricks to avoid",
        paragraphs: [
          "Some widely shared tricks can backfire. Hidden-city ticketing means booking a flight with a connection in the city you actually want to reach and skipping the last leg. Most airlines' conditions of carriage prohibit it, checked bags go to the final destination, and airlines may cancel the rest of your booking, including the return.",
          "Be wary, too, of very cheap fares on unfamiliar booking sites with unclear terms. If something goes wrong, recovering your money can be difficult. Booking with the airline or a well-known agent, and keeping your confirmation emails, gives you a much stronger position.",
          "Finally, a cheap flight is only a good deal if the trip works. Once you have fares, our [AI trip planner](/travel-planner) can draft a day-by-day plan around your flight times.",
        ],
        bullets: [],
      },
      {
        heading: "Tools that make these tips easier",
        paragraphs: [
          "You do not need special software to save on flights, but a few habits help. Use a search tool with a flexible-date or month view to see prices across many days at once, and set alerts for the routes you care about so you hear about drops without checking every day.",
          "Keep a simple note of the prices you see for a route over a couple of weeks. It takes a minute, and it turns a vague feeling about whether a fare is good into something you can actually judge.",
          "Finally, plan the trip around the flights you find. Our [AI trip planner](/travel-planner) compares flight options for your dates and drafts a day-by-day plan around the times you choose, so a cheap but awkward flight does not quietly cost you a day.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "How far in advance should I book a flight?",
        answer:
          "There is no single right answer for every route. Start watching prices early, especially for holidays and popular events, and book when you see a fare that is good compared with what you have been tracking.",
      },
      {
        question: "Is hidden-city ticketing allowed?",
        answer:
          "Most airlines prohibit it in their conditions of carriage. It can lead to checked bags going to the wrong city and the airline cancelling the rest of your booking, so it is not worth the risk.",
      },
      {
        question: "Are connecting flights worth the saving?",
        answer:
          "Often, on longer trips, as long as the connection is on a single ticket and leaves enough time between flights. Weigh the saving against the extra journey time and how you would cope with a delay.",
      },
    ],
    related: {
      destinations: [
        "/destinations/italy",
        "/destinations/japan",
        "/destinations/france",
      ],
      itineraries: ["paris-3-days"],
      guides: [
        "how-to-find-cheap-flights",
        "budget-airline-fees-explained",
        "how-to-plan-a-trip-on-a-budget",
      ],
    },
    sources: [
      SOURCES.euAirRights,
      SOURCES.ukCaaBaggage,
      SOURCES.usDotAirConsumer,
    ],
  },
  {
    slug: "budget-airline-fees-explained",
    photo: "airline-fees",
    category: "flights",
    status: "published",
    lastReviewed: "2026-10-11",
    title: "Budget airline fees explained: what to check before you book",
    description:
      "A clear guide to budget airline fees: cabin bags, checked luggage, seats, check-in, payment and change fees, and how to compare the real price of a fare.",
    headline: "Budget airline fees explained",
    intro:
      "Low-cost airlines keep base fares low by charging separately for things that used to be included. That can save you money, but only if you know which extras you need before you book. This guide explains the common fees and how to compare the real price of a fare.",
    sections: [
      {
        heading: "How low-cost fares work",
        paragraphs: [
          "A budget fare usually covers a seat on the flight and a small personal item, such as a handbag or small backpack that fits under the seat in front. Almost everything else, from a larger cabin bag to choosing a seat, may be an optional extra with its own price.",
          "Fee names, prices and allowances vary between airlines and even between fare types on the same airline, and they change over time. Treat this guide as a checklist of what to look for, and always confirm the current rules on the airline's website for your specific booking.",
        ],
        bullets: [],
      },
      {
        heading: "Bags: personal item, cabin bag and checked luggage",
        paragraphs: [
          "Baggage is the most common surprise. Check three things for your fare: what counts as the free personal item, whether a larger cabin bag for the overhead locker is included, and what checked bags cost. Each has its own size and often weight limits.",
          "Measure and weigh your bags at home. Airlines can charge extra at the gate for bags that are too large, and those charges are usually higher than adding the bag when you book. Adding a bag during booking is generally cheaper than adding it later.",
          "Remember the security rules as well as the airline's. Liquids and certain items have their own restrictions at airport security, which differ by country; the official UK and US guidance is linked below.",
        ],
        bullets: [],
      },
      {
        heading: "Seats and boarding",
        paragraphs: [
          "On many low-cost airlines, seats are assigned for free at check-in, and choosing your own seat costs extra. If you are travelling alone and do not mind where you sit, the free option is usually fine.",
          "Families and groups who want to sit together should check the airline's policy. Some airlines seat young children with an adult automatically; others expect you to pay. Priority boarding, sometimes bundled with a cabin bag, is another optional extra worth comparing against what you actually need.",
        ],
        bullets: [],
      },
      {
        heading: "Check-in and boarding passes",
        paragraphs: [
          "Most low-cost airlines expect you to check in online within a set window before departure. Some charge for checking in at the airport or for printing a boarding pass there. Set a reminder for when online check-in opens and save your boarding pass on your phone or print it at home.",
          "If you are travelling internationally, the airline may need passport details before check-in. Have your documents ready, and see our [travel documents checklist](/blog/travel-documents-checklist) for what to sort before you go.",
        ],
        bullets: [],
      },
      {
        heading: "Payment, changes and name corrections",
        paragraphs: [
          "Look at the final payment screen carefully. Some airlines or agents add fees for certain payment methods, and optional extras such as insurance may be offered along the way; only add what you want.",
          "Basic fares often have strict rules on changes, with fees plus any difference in fare. Name corrections can also cost money, so check the spelling against your passport before paying. If your plans are uncertain, compare the cost of a flexible fare with the risk of paying change fees later.",
        ],
        bullets: [],
      },
      {
        heading: "How to compare the real price",
        paragraphs: [
          "To compare fares fairly, build the trip you will actually take on each airline: the same bags, seats if you need them, and any fees for check-in or payment. In the EU, the price shown must include all unavoidable taxes and charges, which helps, but optional extras still need adding to each option.",
          "Then add the cost of getting to and from the airport. Our guide on [how to find cheap flights](/blog/how-to-find-cheap-flights) explains this total-cost approach in more detail, and our list of [cheap flight tips](/blog/cheap-flight-tips) covers ways to avoid many of these fees altogether.",
          "To see how the full fare fits into the rest of your trip, put it into our free [trip budget calculator](/tools/trip-budget-calculator) with your accommodation and daily spending. It shows the total, the cost per person and the cost per day.",
        ],
        bullets: [
          "Personal item size, and whether a cabin bag is included",
          "Checked bag price when added at booking versus later",
          "Seat selection rules if you need to sit together",
          "Online check-in window and any airport check-in fee",
          "Payment method fees on the final screen",
          "Change, cancellation and name-correction rules for your fare",
        ],
      },
      {
        heading: "On the day: avoiding fees at the airport",
        paragraphs: [
          "Most unexpected charges happen at the airport, when it is too late to compare prices. Before you leave home, check that your bags meet the size and weight limits for your fare, that you have checked in online if the airline requires it, and that your boarding pass is saved on your phone or printed.",
          "Arrive with enough time to queue for bag drop and security, especially at busy times. If a bag is close to the limit, wear your heaviest items or move them to your personal item rather than risk a gate fee. If you are unsure about a rule, the airline's website is the final word, not a comparison site.",
          "Keep your booking confirmation and any receipts for extras. If you are charged something you believe you already paid for, it is much easier to resolve with the paperwork to hand.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question:
          "What will a cheap flight really cost after bag and seat fees?",
        answer:
          "Add the base fare, the bags you will actually take, a seat if you need to choose one, and any check-in or payment fees shown before you pay. Then add the cost of getting to and from the airport. Compare that total, not the headline fare, across airlines.",
      },
      {
        question: "Is it cheaper to add bags when booking or later?",
        answer:
          "Adding a bag during booking or well before the flight is usually cheaper than adding it close to departure, and much cheaper than paying for an oversized bag at the gate. Check your airline's prices for each stage.",
      },
      {
        question: "Do I have to pay to sit next to my travel companion?",
        answer:
          "On many low-cost airlines, choosing seats together costs extra, while free seats are assigned randomly at check-in. Policies for families with young children differ, so check the airline's rules before you book.",
      },
      {
        question: "Must the advertised fare include taxes?",
        answer:
          "In the European Union, the price shown must include all unavoidable taxes, charges and fees, with optional extras offered on an opt-in basis. Rules in other countries differ, so check the final price before paying.",
      },
    ],
    related: {
      destinations: ["/destinations/portugal", "/destinations/france"],
      itineraries: ["lisbon-3-days"],
      guides: [
        "how-to-find-cheap-flights",
        "cheap-flight-tips",
        "travel-documents-checklist",
        "carry-on-packing-list",
      ],
    },
    sources: [
      SOURCES.eu1008,
      SOURCES.ukCaaBaggage,
      SOURCES.ukHandLuggage,
      SOURCES.tsaWhatCanIBring,
    ],
  },
  {
    slug: "how-to-build-a-travel-itinerary",
    photo: "itinerary",
    category: "itineraries",
    status: "published",
    lastReviewed: "2026-10-11",
    title: "How to make a travel itinerary: free template and example",
    description:
      "How to make a travel itinerary step by step: pick a few anchors, group days by area and count travel time, then copy our free template and filled-in example.",
    headline: "How to make a travel itinerary that actually works",
    intro:
      "A good itinerary is less about fitting everything in and more about making each day work: realistic travel times, a sensible order and room to breathe. This guide shows how to make an itinerary step by step, turning a list of places into a day-by-day plan you will actually enjoy following, with a simple template you can copy and an example day already filled in.",
    sections: [
      {
        heading: "Start with a few anchors",
        paragraphs: [
          "Begin by choosing the handful of things that would make the trip feel worthwhile: a museum you have always wanted to see, a particular neighbourhood, a day trip, a special meal. These are your anchors. Everything else fits around them.",
          "Keep the list short. Two or three anchors for a short city break, and perhaps one a day on a longer trip, is plenty. If you are still deciding where to go and for how long, our guides on [how to plan a trip](/blog/how-to-plan-a-trip) and [how many days you need](/blog/how-many-days-for-a-trip) cover those decisions first.",
        ],
        bullets: [],
      },
      {
        heading: "Group each day by area",
        paragraphs: [
          "The most common itinerary mistake is zig-zagging across a city. Instead, put places that are close to each other on the same day, and give each day one or two neighbourhoods. You will spend more time seeing things and less time in transit.",
          "Plot your anchors and must-sees on a map, then draw rough circles around clusters. Each circle becomes a day or half-day. Our ready-made itineraries use exactly this approach; see [Paris in 3 days](/itineraries/paris-3-days) or [Tokyo in 5 days](/itineraries/tokyo-5-days) for examples.",
        ],
        bullets: [],
      },
      {
        heading: "Count travel time honestly",
        paragraphs: [
          "Journeys almost always take longer than the map suggests once you add walking to stations, waiting, finding entrances and the occasional wrong turn. Add a margin to every move, especially in a city you do not know.",
          "For day trips and moves between cities, check real timetables and allow time to get to and from stations. A two-hour train ride can easily become a half-day door to door. Plan bigger moves for the morning so a delay does not ruin an evening booking.",
        ],
        bullets: [],
      },
      {
        heading: "Build in buffers and free time",
        paragraphs: [
          "Leave gaps on purpose. A free afternoon gives you somewhere to put the things you discover along the way, absorbs delays, and stops the trip feeling like a checklist. A good rule is one main activity per morning and afternoon, with the evening kept light.",
          "Plan a slower day after long journeys or early starts. Jet lag and travel days take more energy than you expect, so avoid scheduling your most important anchor on the first day.",
        ],
        bullets: [],
      },
      {
        heading: "Check opening days and booking rules",
        paragraphs: [
          "Before fixing the order of your days, check the opening days and hours of your anchors on their official websites. Many museums close one day a week, and some attractions require timed tickets that sell out in busy seasons.",
          "Book the things that need booking first, then arrange the flexible parts of the day around them. Note which bookings are non-refundable, and keep confirmations somewhere you can reach offline.",
        ],
        bullets: [],
      },
      {
        heading: "Plan arrival and departure days around your flights",
        paragraphs: [
          "Your flight times shape the first and last days. An early arrival means a long day ahead, so plan something easy close to where you are staying. A late departure gives you a final morning, but leave enough time to collect bags and reach the airport.",
          "If you have not booked flights yet, our guide on [how to find cheap flights](/blog/how-to-find-cheap-flights) explains how to weigh flight times against price, since a cheap flight at an awkward hour can cost you a day.",
        ],
        bullets: [],
      },
      {
        heading: "Turn it into a plan you can follow",
        paragraphs: [
          "Write each day as morning, afternoon and evening, with the area you will be in and one or two options for meals nearby. Keep a short list of backup ideas for bad weather or closures. This structure is easy to follow on the move and easy to adjust.",
          "If you would rather start from a draft, our [AI trip planner](/travel-planner) builds a day-by-day itinerary in this format from your dates, budget, pace and interests, which you can then refine. Always double-check opening days, prices and entry requirements with official sources before you travel.",
        ],
        bullets: [
          "Two or three anchors, not a long list",
          "One or two areas per day",
          "Realistic travel times with a margin",
          "A free block every day or two",
          "Bookings made first, flexible plans around them",
        ],
      },
      {
        heading: "A simple itinerary template",
        paragraphs: [
          "You don't need special software to make an itinerary. A notes app, a spreadsheet or a sheet of paper works, as long as every day follows the same simple layout. Copy the outline below once for each day of your trip, then fill it in using the steps above.",
          "Fill in the fixed things first, such as flights, check-in times and timed tickets, and then add the flexible plans around them. Keep it short: a line or two for each part of the day is enough to follow on the move.",
        ],
        bullets: [
          "Day and date, plus where you are staying that night",
          "Area of the day: the one or two neighbourhoods you will be in",
          "Morning: main activity, with opening time and any booking reference",
          "Afternoon: second activity or a free block",
          "Evening: dinner area and anything booked",
          "Getting around: how you will travel between places and roughly how long it takes",
          "Backup idea for bad weather or a closure",
          "Notes: tickets to show, opening days, things to check",
        ],
      },
      {
        heading: "Itinerary example: one day filled in",
        paragraphs: [
          "Here is the template filled in for one day of a short trip to Lisbon, so you can see how much detail is enough. It is a sample to copy the shape of, not a schedule to follow: the times are placeholders, and you should check opening days and ticket rules on official websites before fixing yours.",
        ],
        bullets: [
          "Day 2, Saturday: staying in Baixa, same hotel as last night",
          "Area of the day: the castle hill and Alfama",
          "Morning: the castle, arriving early before it gets busy; ticket saved on my phone",
          "Afternoon: Alfama's lanes and viewpoints, with a late lunch nearby; nothing booked",
          "Evening: dinner in Alfama, table booked for 8pm; walk back downhill",
          "Getting around: on foot from the hotel, allowing about half an hour for the climb, or a tram or bus up the hill",
          "Backup idea: swap the viewpoints for an indoor museum if it rains",
          "Notes: check the castle's opening days; wear shoes for steep, cobbled streets",
        ],
      },
      {
        heading: "Itinerary example: arranging three days",
        paragraphs: [
          "Imagine three days in Lisbon with two anchors: the castle and a day trip to Sintra. The castle sits above Alfama, so day two becomes an Alfama day: castle in the morning, lanes and viewpoints in the afternoon, and a relaxed evening nearby. Sintra needs most of a day, so it gets day three on its own.",
          "Day one depends on the flight. With a morning arrival, the flat streets of Baixa and Chiado make an easy first afternoon close to most hotels. That leaves Belém, which sits west along the river, for the morning of departure if the flight is late enough. The full version of this plan is in our [Lisbon in 3 days itinerary](/itineraries/lisbon-3-days).",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "How many things should I plan per day?",
        answer:
          "For most travellers, one main activity in the morning and one in the afternoon, with a relaxed evening, is a comfortable pace. Fast-paced travellers can add more, but leave some free time every day or two.",
      },
      {
        question: "Should I book everything in advance?",
        answer:
          "Book the things that sell out or need timed tickets, plus accommodation and key transport. Leaving the rest flexible lets you adjust for weather, energy levels and the places you discover along the way.",
      },
      {
        question: "What should a travel itinerary include?",
        answer:
          "At minimum: the dates, where you are staying each night, the main plan for each morning, afternoon and evening, how you will get between places, and any bookings with their times. A backup idea for bad weather and a short list of things to check make it easier to adjust on the day.",
      },
      {
        question: "What is the best format for a travel itinerary?",
        answer:
          "A day-by-day list is the easiest format to follow. Give each day the same short layout: the area you will be in, a plan for the morning, afternoon and evening, how you will get around, and any bookings with their times. A notes app or a spreadsheet works well.",
      },
      {
        question:
          "What is the difference between a travel itinerary and a flight itinerary?",
        answer:
          "A travel itinerary is your own day-by-day plan for the whole trip. A flight itinerary is the document an airline or travel agent issues for a booking, listing your flights, dates, times and booking reference. Visa applications sometimes ask for the second kind.",
      },
      {
        question: "Can an AI planner build my itinerary?",
        answer:
          "An AI planner can give you a strong first draft grouped by day and area, which saves a lot of time. Treat it as a starting point and confirm opening days, prices and transport details with official sources.",
      },
    ],
    related: {
      destinations: [
        "/destinations/france/paris",
        "/destinations/japan/tokyo",
        "/destinations/portugal/lisbon",
      ],
      itineraries: ["paris-3-days", "tokyo-5-days", "lisbon-3-days"],
      guides: [
        "how-to-plan-a-trip",
        "how-many-days-for-a-trip",
        "airport-to-city-paris-rome-tokyo-lisbon",
      ],
    },
    sources: [
      SOURCES.ukAdviceIndex,
      SOURCES.euAirRights,
      SOURCES.iataTravelers,
    ],
  },
  {
    slug: "dummy-ticket-for-visa",
    photo: "documents",
    category: "practical",
    status: "published",
    lastReviewed: "2026-10-06",
    title: "Dummy ticket for visa: what embassies really accept",
    description:
      "What a dummy ticket is, what visa applications usually ask for, the safe and legal options, why fake tickets are risky and how to check a booking is real.",
    headline: "Dummy ticket for visa: what embassies really accept",
    intro:
      'If you are applying for a visa, you may be asked to show your travel plans, and many people search for a "dummy ticket" to get past this step without paying for a flight. This guide explains in plain words what a dummy ticket usually means, what visa applications tend to ask for, the safe and legal options, and why a fake or edited ticket can cost you far more than a real one.',
    sections: [
      {
        heading: "What people mean by a dummy ticket",
        paragraphs: [
          '"Dummy ticket" is an informal name, and it covers very different things. Sometimes it means a genuine flight reservation that an airline or travel agent holds for a short time without full payment. Sometimes it means a simple flight itinerary that lists the flights you plan to take. And sometimes it means a document made to look like a paid ticket or a confirmed booking when no booking exists.',
          "The first two can be perfectly legitimate, as long as you describe them honestly. The third is a false document. The difference matters, because visa authorities judge your application on whether your documents are genuine.",
        ],
        bullets: [
          "A held reservation: a real booking in the airline's system, often with a time limit.",
          "A flight itinerary: a plan of flights you intend to take, with no booking behind it.",
          "A fake ticket: a document that claims a booking or payment that doesn't exist.",
        ],
      },
      {
        heading: "What visa applications usually ask for",
        paragraphs: [
          "Every country sets its own rules, and so does each consulate. For a Schengen visa, the European Commission says you need supporting documents about the purpose of your stay, your accommodation, your financial means and your intention to return home, and that consulates may ask for additional documents. Many consulates ask for travel bookings or an itinerary as part of this, so always read the checklist of the consulate you apply to.",
          "Some countries actively advise against paying for travel too early. The UK government, for example, says you should not book your travel until you get a decision on your visa application, and that it won't reimburse travel costs if an application is refused or delayed.",
          "So before you look for any kind of ticket, find the official document list for your visa and check exactly what it asks for: a paid ticket, a reservation, an itinerary or nothing at all. Our [travel documents checklist](/blog/travel-documents-checklist) explains where to find official entry requirements.",
        ],
        bullets: [],
      },
      {
        heading: "Safe and legal options",
        paragraphs: [
          "If you need to show flight plans without risking a lot of money, there are honest ways to do it. Which one suits you depends on what your consulate asks for and how certain your dates are.",
        ],
        bullets: [
          "Book a flexible or refundable fare, and read the change and refund rules before you pay.",
          "Ask whether the airline offers a fare hold or pay-later option; some airlines let you hold a fare for a few days, sometimes for a small fee.",
          "Ask a travel agent for a genuine reservation and ask how long it will stay active.",
          "If an itinerary is enough, prepare a clear plan of your intended flights and present it as an itinerary, not as a booking.",
        ],
      },
      {
        heading: "Why fake or edited tickets are risky",
        paragraphs: [
          "A ticket or booking confirmation with no real booking behind it can often be checked, for example by looking up the reservation code with the airline. If it doesn't match, the application can be refused, and you lose the visa fee and the time you spent.",
          "The consequences can last well beyond one application. UK Home Office guidance, for instance, says applications can be refused for false documents or false representations, and that where deception is found, future applications can be refused for up to 10 years. Other countries have their own penalties.",
          "Be careful with websites that sell \"tickets\" with no watermark or no warning label for a fee. If the document claims a booking that doesn't exist, the risk is yours, not the seller's.",
        ],
        bullets: [],
      },
      {
        heading: "How to check a reservation is real",
        paragraphs: [
          "If someone gives you a reservation, check it yourself before you use it. A genuine reservation exists in the airline's own system, so you should be able to find it with the airline, not only on the seller's website.",
        ],
        bullets: [
          'Look up the reservation code on the airline\'s "manage booking" page with your surname.',
          "Check that your name is spelled exactly as in your passport.",
          "Check the dates, flight numbers and route match your application.",
          "Ask how long the reservation stays active, and what happens after that.",
        ],
      },
      {
        heading: "Our free flight itinerary for planning",
        paragraphs: [
          "AIFlyTrip's free [AI trip planner](/plan) creates a day-by-day plan with a suggested flight and a free flight itinerary for planning. It helps you work out dates, routes and a rough budget before you book anything.",
          "It is clearly marked as not a ticket or reservation: no seat is booked or held and there is no booking reference. Use it to plan your trip, and use one of the legitimate options above if your visa application asks for a booking. If you are comparing fares, our guide on [how to find cheap flights](/blog/how-to-find-cheap-flights) explains how to compare flexible fares, and the [layover time checker](/tools/layover-time-checker) helps you judge connections.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "Is a dummy ticket legal?",
        answer:
          "It depends on what it is. A genuine reservation held by an airline or travel agent is legitimate. A document that claims a booking or payment that doesn't exist is a false document, and using it in a visa application can lead to refusal and longer bans.",
      },
      {
        question: "Can I use AIFlyTrip's free flight itinerary for my visa?",
        answer:
          "It is a planning document, clearly marked as not a ticket or reservation, with no booking reference. If your consulate accepts an itinerary, you can describe it honestly as your intended flights. If it asks for a booking, use a genuine reservation or a flexible fare instead.",
      },
      {
        question: "Do I need to buy a flight before I get my visa?",
        answer:
          "Not always. Requirements differ by country and consulate, and some governments, such as the UK, advise you not to book travel until you have a visa decision. Check the official document list for your application.",
      },
    ],
    related: {
      destinations: ["/destinations/france", "/destinations/italy"],
      itineraries: [],
      guides: [
        "travel-documents-checklist",
        "how-to-find-cheap-flights",
        "how-to-plan-a-trip",
      ],
    },
    sources: [
      SOURCES.euSchengenVisa,
      SOURCES.govUkVisaProcessing,
      SOURCES.govUkFalseDocuments,
      SOURCES.euEntry,
    ],
  },
];
