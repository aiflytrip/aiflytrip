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
        "how-airline-pricing-works",
        "how-much-layover-time-do-you-need",
        "self-transfer-flights",
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
        "how-airline-pricing-works",
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
          "Measure and weigh your bags at home. Airlines can charge extra at the gate for bags that are too large, and those charges are usually higher than adding the bag when you book. Adding a bag during booking is generally cheaper than adding it later. Our free [bag size checker](/tools/bag-size-checker) and [luggage weight calculator](/tools/luggage-weight-calculator) check a bag against the limits in your booking.",
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
          "Our free [baggage fee calculator](/tools/baggage-fee-calculator) does this sum for up to three fares side by side, per person and for the whole trip. To see how the winning fare fits into the rest of your trip, put it into the [trip budget calculator](/tools/trip-budget-calculator) with your accommodation and daily spending.",
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
        "how-airline-pricing-works",
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
          "Keep the list short. Two or three anchors for a short city break, and perhaps one a day on a longer trip, is plenty. If you are still deciding where to go and for how long, our guides on [how to plan a trip](/blog/how-to-plan-a-trip) and [how many days you need](/blog/how-many-days-for-a-trip) cover those decisions first, and the free [trip length planner](/tools/how-many-days) suggests how many days to give each stop.",
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
          "A travel itinerary is your own day-by-day plan for the whole trip. A flight itinerary lists only your flights, with their dates and times. It can be a plan you wrote before booking, or the document an airline sends after you book, which adds a booking reference and ticket number.",
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
        "what-is-a-flight-itinerary",
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
    lastReviewed: "2026-10-16",
    title: "Dummy ticket or flight itinerary for visa: what's accepted",
    description:
      "What a dummy ticket or flight itinerary for a visa really is, what to submit with your application, the safe and legal options and how to check a booking.",
    headline: "Dummy ticket and flight itinerary for a visa: what is accepted",
    intro:
      'If you are applying for a visa, you may be asked to show your travel plans, and many people search for a "dummy ticket" to get past this step without paying for a flight. This guide explains in plain words what a dummy ticket usually means, what visa applications tend to ask for, the safe and legal options, and why a fake or edited ticket can cost you far more than a real one.',
    sections: [
      {
        heading: "What people mean by a dummy ticket",
        paragraphs: [
          '"Dummy ticket" is an informal name, and it covers very different things. Sometimes it means a genuine flight reservation that an airline or travel agent holds for a short time without full payment. Sometimes it means a simple flight itinerary that lists the flights you plan to take. And sometimes it means a document made to look like a paid ticket or a confirmed booking when no booking exists.',
          "The first two can be perfectly legitimate, as long as you describe them honestly. The third is a false document. The difference matters, because visa authorities judge your application on whether your documents are genuine. Our guide to [what a flight itinerary is](/blog/what-is-a-flight-itinerary) shows the difference with an example.",
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
        heading: "Flight itinerary for a visa application: what to submit",
        paragraphs: [
          'Consulates use different words for the flight part of an application, and the words tell you what they want. "Travel itinerary" or "itinerary of intended flights" usually means a plan showing how you will arrive and leave. "Flight reservation" or "proof of travel booking" means a real booking that can be checked. "Return ticket" or "paid ticket" means you must have bought it. If the wording is unclear, ask the consulate or its visa centre before you spend money.',
          "Whichever kind you submit, make it match the rest of your application. The names should be spelled exactly as in each passport, the dates should be the same as those on the application form, your accommodation and your travel insurance, and the route should show how you enter and leave the country or area the visa covers.",
          "Label it honestly. A plan of intended flights should say that it is a plan and not a booking. Our guide to [what a flight itinerary is](/blog/what-is-a-flight-itinerary) shows what a booked itinerary looks like, so you can see the difference.",
        ],
        bullets: [
          "Every traveller's name, as in their passport",
          "Outbound and return dates matching the application form",
          "Airports and flight numbers for each leg",
          "A booking reference only if a real booking exists",
          "Dates consistent with your accommodation and insurance",
        ],
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
        question: "Can I submit a flight itinerary instead of a ticket?",
        answer:
          "Often, yes. Many consulates accept an itinerary or a reservation rather than a paid ticket, and some advise against buying before a decision. Check the wording of your consulate's document list, and if it asks for a booking, do not submit a plan as if it were one.",
      },
      {
        question: "What is a flight reservation for a visa?",
        answer:
          "It is a genuine booking held in an airline's system, often for a limited time and sometimes without full payment. It has a booking reference that the consulate can check with the airline. It differs from a plan of intended flights, which has no booking behind it.",
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
        "what-is-a-flight-itinerary",
        "proof-of-onward-travel",
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
  {
    slug: "what-is-a-flight-itinerary",
    photo: "itinerary",
    category: "flights",
    status: "published",
    lastReviewed: "2026-10-11",
    title: "Flight itinerary: what it is, with an example",
    description:
      "What a flight itinerary is, how it differs from an e-ticket and a boarding pass, how to read one line by line, a sample to compare with and how to get yours.",
    headline: "What is a flight itinerary? A plain guide with an example",
    intro:
      "A flight itinerary is the list of flights that make up your journey: where you fly from and to, on which dates and at what times. The word is used for two different things, a plan you have made and a document an airline sends after you book, and mixing them up causes real problems at check-in desks and in visa applications. This guide explains both, shows an example and walks through each line.",
    sections: [
      {
        heading: "Two meanings: a plan and a booking",
        paragraphs: [
          "Before you book, a flight itinerary is simply a plan. It lists the flights you intend to take, perhaps copied from a search result, and nothing is reserved. Anyone can write one, and it has no booking reference because there is no booking behind it.",
          "After you book, the airline or travel agent sends an itinerary for that booking, often called an itinerary receipt or e-ticket receipt. This one is a record of something real: seats held in your name, a booking reference and usually a ticket number. When a check-in agent or an official asks for your itinerary, this is normally the kind they mean.",
          "Both are useful. The first helps you compare routes and work out dates. The second proves what you have bought. The important thing is never to present the first as if it were the second.",
        ],
        bullets: [],
      },
      {
        heading: "Itinerary, e-ticket and boarding pass",
        paragraphs: [
          "These three documents are easy to confuse because they repeat much of the same information. They do different jobs, and you receive them at different times.",
        ],
        bullets: [
          "Flight itinerary: the list of your flights with dates and times. As a plan, it can exist before you book anything.",
          "E-ticket or itinerary receipt: sent after you pay. It adds a booking reference and a ticket number, and shows that the fare has been paid.",
          "Boarding pass: issued when you check in, usually within a day or two of departure. It shows your seat and boarding time and is what lets you through the gate.",
        ],
      },
      {
        heading: "A sample flight itinerary",
        paragraphs: [
          "Here is what the main lines of a booked return itinerary look like. Every detail below is invented for illustration, including the airline code, the flight numbers and the times, so use it only to recognise the layout of your own.",
        ],
        bullets: [
          "Passenger: TRAVELLER / SAMPLE MS",
          "Booking reference: ABC123. Ticket number: thirteen digits",
          "Outbound, 14 May: flight XX 101, London Heathrow (LHR) Terminal 2 to Lisbon (LIS) Terminal 1",
          "Departs 09:40, arrives 12:25, local times. Economy, fare class K, status confirmed",
          "Return, 18 May: flight XX 102, Lisbon (LIS) Terminal 1 to London Heathrow (LHR) Terminal 2",
          "Departs 18:10, arrives 20:50, local times. Economy, fare class K, status confirmed",
          "Baggage: one cabin bag and one checked bag per passenger",
          "Fare paid, taxes and charges, and the date of issue",
        ],
      },
      {
        heading: "How to read each line",
        paragraphs: [
          "The booking reference is a short code, usually six letters and numbers, that finds your reservation in the airline's system. You may also see it called a reservation code, confirmation number, record locator or PNR. The ticket number is separate and longer, normally thirteen digits, and shows that a ticket has actually been issued. A reservation without a ticket number may not be paid for yet.",
          "Airports are shown with three-letter codes. Check them carefully, because large cities often have more than one airport, and note the terminal if one is given. Departure and arrival times are local to each airport, so a flight across time zones can look shorter or longer than it really is.",
          'Look for the words "operated by". If you booked with one airline and another one flies the plane, you usually check in with the airline operating the flight. The fare class letter and fare name tell you the rules that apply to changes, refunds and baggage. Finally, check that your name matches your passport exactly; our [travel documents checklist](/blog/travel-documents-checklist) covers what else to confirm before you go.',
        ],
        bullets: [],
      },
      {
        heading: "How to get your flight itinerary",
        paragraphs: [
          "If you have already booked, the itinerary was sent to the email address you gave, so search your inbox and spam folder for the airline's or agent's name. You can also open the \"manage booking\" page on the airline's website with your booking reference and surname and download or print it from there. If you booked through a travel agent or a booking site, ask them to send it again.",
          "If you have not booked yet and only want to plan, write the flights down from a search result, or let a planning tool do it. Our free [AI trip planner](/travel-planner) drafts a day-by-day plan with a suggested flight and a flight itinerary for planning. It is clearly marked as not a ticket or reservation: no seat is held and there is no booking reference.",
        ],
        bullets: [],
      },
      {
        heading: "Flight itinerary for a visa application",
        paragraphs: [
          "Airlines, border officers and visa offices sometimes ask to see your itinerary to understand when you arrive and when you leave. What each one accepts differs. Some want a paid ticket, some accept a reservation, and some are satisfied with your intended flights. Always read the official instructions for your own case.",
          "Our guide to the [flight itinerary for a visa application](/blog/dummy-ticket-for-visa) explains what to submit and the honest options when a consulate asks for flight details, and [proof of onward travel](/blog/proof-of-onward-travel) covers what airlines look for at check-in. Never edit an itinerary to show a booking that does not exist. Reservations can be checked with the airline, and a false document can do lasting damage to an application.",
        ],
        bullets: [],
      },
      {
        heading: "Checks to make as soon as it arrives",
        paragraphs: [
          "Mistakes are easiest and cheapest to fix straight after booking, so read the itinerary the day you receive it rather than the night before you fly.",
        ],
        bullets: [
          "Your name is spelled exactly as in your passport",
          "The dates are right, including the arrival date on overnight flights",
          "The airports and terminals are the ones you expected",
          "Connections leave enough time; our [layover time checker](/tools/layover-time-checker) helps you judge",
          "The baggage allowance matches what you plan to bring",
          "A ticket number is shown, not only a booking reference",
        ],
      },
    ],
    faqs: [
      {
        question: "Is a flight itinerary the same as a ticket?",
        answer:
          "Not always. An itinerary written before you book is only a plan. The itinerary receipt an airline sends after you pay includes a booking reference and a ticket number, and that version does serve as proof of your ticket.",
      },
      {
        question: "Can I get a flight itinerary without paying for a flight?",
        answer:
          "Yes, as a plan. You can list your intended flights yourself or use a planning tool, as long as you describe it honestly as a plan and not a booking. Some airlines and travel agents also offer to hold a genuine reservation for a short time.",
      },
      {
        question: "Where do I find my booking reference?",
        answer:
          "It is in the confirmation email and on the itinerary receipt, usually near the top, as a code of about six letters and numbers. It may be labelled booking reference, reservation code, confirmation number or PNR.",
      },
      {
        question: "Do I need to print my flight itinerary?",
        answer:
          "Usually a copy on your phone is enough, but saving it offline or carrying a printout is sensible in case you have no signal or battery. Some border officers and check-in agents ask to see it, especially if you are travelling on a one-way ticket.",
      },
    ],
    related: {
      destinations: ["/destinations/portugal/lisbon"],
      itineraries: [],
      guides: [
        "dummy-ticket-for-visa",
        "proof-of-onward-travel",
        "travel-documents-checklist",
        "how-to-build-a-travel-itinerary",
      ],
    },
    sources: [
      SOURCES.iataTravelers,
      SOURCES.usDotAirConsumer,
      SOURCES.ukCaaHolidayBooking,
    ],
  },
  {
    slug: "proof-of-onward-travel",
    photo: "documents",
    category: "practical",
    status: "published",
    lastReviewed: "2026-10-11",
    title: "Proof of onward travel: what airlines ask for",
    description:
      "Why airlines and border officers ask for proof of onward travel, who gets asked, what usually counts, and the honest options if you have a one-way ticket.",
    headline: "Proof of onward travel: what it is and how to show it",
    intro:
      "Proof of onward travel is evidence that you plan to leave the country you are flying to, such as a return flight or a ticket on to somewhere else. Most travellers with a return ticket never think about it. Those on a one-way ticket can be asked for it at the check-in desk, and may be refused boarding without it. This guide explains why it happens and the honest ways to be ready.",
    sections: [
      {
        heading: "Why airlines ask before you board",
        paragraphs: [
          "Many countries let visitors in only if they can show they intend to leave again within the time they are allowed to stay. The rule belongs to the destination country, but it is usually the airline that checks it first, at check-in or at the gate.",
          "Airlines check because they carry the risk. In many countries, an airline that brings in a passenger who is then refused entry has to fly that passenger back, and it can be fined as well. So airline staff look up the entry rules for your passport and destination and apply them before you board. If the rules say onward travel is required and you cannot show it, the airline can refuse to carry you.",
          "This is why being asked is not a judgement about you. The agent is following a checklist, and the simplest way through is to have the right document ready.",
        ],
        bullets: [],
      },
      {
        heading: "Who is most likely to be asked",
        paragraphs: [
          "You are far more likely to be asked in some situations than in others. None of these means you will be refused. They are simply the cases where it is worth preparing in advance.",
        ],
        bullets: [
          "You are flying on a one-way ticket",
          "You are entering as a visitor without a visa arranged in advance",
          "Your return flight is later than the stay you would normally be allowed",
          "You plan to leave by land or sea rather than by air",
          "You are on a long trip through several countries with no fixed plan",
        ],
      },
      {
        heading: "What usually counts as proof",
        paragraphs: [
          "What is accepted depends on the country, and sometimes on the person checking. The most widely accepted proof is a confirmed flight out of the country, either back home or on to another country that will admit you, dated within your permitted stay.",
          "Some countries also accept a ticket out by bus, train or ferry, while others expect a flight. A booking that a member of staff can verify, with your name, the date and a booking reference, is much stronger than a screenshot of a search result. A plan of flights you intend to take is not a booking; our guide to [what a flight itinerary is](/blog/what-is-a-flight-itinerary) explains the difference.",
        ],
        bullets: [],
      },
      {
        heading: "How to check the rule for your trip",
        paragraphs: [
          "Start with the official travel advice for your destination. Government travel advice pages usually have an entry requirements section that says whether proof of onward or return travel may be asked for, and the destination's own embassy or immigration website is the final authority.",
          "Airline staff generally rely on a shared database of entry rules. The IATA Travel Centre, linked below, offers a public way to look up requirements by passport and destination. If anything is unclear, contact the airline before you travel and ask what its staff will want to see. Our [travel documents checklist](/blog/travel-documents-checklist) lists the other documents to confirm at the same time.",
        ],
        bullets: [],
      },
      {
        heading: "Honest options if you have a one-way ticket",
        paragraphs: [
          "You do not need to invent anything. There are several genuine ways to hold proof of onward travel, and the right one depends on how fixed your plans are and how much flexibility you are willing to pay for.",
          "Whichever you choose, read the fare rules before you pay, so you know exactly what you can change or get back. Our guide on [how to find cheap flights](/blog/how-to-find-cheap-flights) explains how to compare flexible fares with basic ones.",
        ],
        bullets: [
          "Book the return or onward flight you actually expect to take, on a fare that allows date changes",
          "Book a refundable fare and cancel it if your plans change, within the fare's rules",
          "Ask the airline or a travel agent whether a genuine reservation can be held for a short time",
          "If the country accepts it, buy a bus, train or ferry ticket out",
          "Use airline miles for the onward flight if the award ticket can be changed or cancelled",
        ],
      },
      {
        heading: "What not to do",
        paragraphs: [
          "Do not edit a confirmation, reuse an old one or buy a document that claims a booking which does not exist. Reservations can be checked with the airline in seconds, and showing a false document to an airline or a border officer can lead to refused boarding, refused entry and trouble with later visa applications.",
          "Be cautious with websites that sell onward tickets for a small fee. Some make a real, short-lived reservation, and some sell only a convincing-looking page. If you use one, look the booking up yourself on the airline's own website before you rely on it, and understand when it will be cancelled. Our guide to the [dummy ticket or flight itinerary for a visa application](/blog/dummy-ticket-for-visa) explains how to check that a reservation is real.",
        ],
        bullets: [],
      },
      {
        heading: "At the airport",
        paragraphs: [
          "Keep the proof where you can reach it without an internet connection: a saved file on your phone and, ideally, a printout. Have the booking reference ready, since staff may look it up. Arrive with time to spare, because sorting out a missing document at the desk is slow.",
          "If you are refused boarding for lack of onward travel, the quickest fix is usually to buy a suitable ticket there and then, which is another reason to know the fare rules in advance. Stay calm and ask the agent exactly which requirement applies, so you buy the right thing.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question:
          "Can an airline refuse to let me board without a return ticket?",
        answer:
          "Yes. If the destination's entry rules call for proof of onward or return travel and you cannot show it, the airline can refuse to carry you, because it may be responsible for flying you back if you are refused entry.",
      },
      {
        question: "Does a bus or train ticket count as proof of onward travel?",
        answer:
          "In some countries it does and in others it does not, and individual staff can be stricter than the written rule. Check the destination's official entry requirements and ask your airline before relying on anything other than a flight.",
      },
      {
        question: "Is a flight itinerary enough as proof of onward travel?",
        answer:
          "Only if it is the itinerary for a real booking, with a booking reference that can be verified. A plan of flights you intend to take shows your intentions but is not a booking, and airline staff will usually not accept it.",
      },
      {
        question: "Do I need proof of onward travel if I already have a visa?",
        answer:
          "It depends on the country and the type of visa. Some visas are issued on the basis of your travel plans and some long-stay visas remove the need altogether. Check the conditions printed on or sent with your visa, and the destination's official guidance.",
      },
    ],
    related: {
      destinations: ["/destinations/japan", "/destinations/portugal"],
      itineraries: [],
      guides: [
        "what-is-a-flight-itinerary",
        "dummy-ticket-for-visa",
        "travel-documents-checklist",
        "how-to-find-cheap-flights",
      ],
    },
    sources: [
      SOURCES.iata,
      SOURCES.ukAdviceIndex,
      SOURCES.usTravel,
      SOURCES.auAdvice,
    ],
  },
  {
    slug: "how-airline-pricing-works",
    photo: "cheap-flights",
    category: "flights",
    status: "published",
    lastReviewed: "2026-10-11",
    title: "How airline pricing works: why flight prices change",
    description:
      "How airlines set fares: fare classes, demand, competition, timing, taxes and extras, why a price changes between searches, and what this means when you book.",
    headline: "How airline pricing works, and why flight prices keep changing",
    intro:
      "Two people on the same flight have often paid very different amounts, and a fare you saw this morning can be gone by the afternoon. It can feel random, but it follows a system. This guide explains in plain terms how airlines price seats, why the number moves, and how to use that knowledge when you book.",
    sections: [
      {
        heading: "One cabin, many prices",
        paragraphs: [
          "An airline does not set a single price for economy on a flight. It divides the seats into groups, often called fare classes or fare buckets, each with its own price and its own rules. The cheapest group might allow no changes and no checked bag, while a more expensive one in the same cabin can be changed or refunded.",
          "Each group has a limited number of seats on sale. When the cheapest group sells out, the next one becomes the lowest price available, so the fare steps up even though nothing about the flight has changed. This is the main reason prices jump rather than drift.",
        ],
        bullets: [],
      },
      {
        heading: "Demand decides how many cheap seats exist",
        paragraphs: [
          "Airlines forecast how full each flight will be, using how past flights on that route sold and how bookings are going this time. If a flight is filling faster than expected, fewer seats are offered at the lower prices. If it is selling slowly, cheaper seats can be opened up again, which is why fares sometimes fall as well as rise.",
          "Demand follows patterns you can predict. School holidays, public holidays, big events and popular days of the week all push fares up. Early morning, late night and midweek flights are often less popular, and therefore often cheaper. Our [cheap flight tips](/blog/cheap-flight-tips) list practical ways to use this.",
        ],
        bullets: [],
      },
      {
        heading: "Competition and the route itself",
        paragraphs: [
          "The same distance can cost very different amounts on different routes. Where several airlines compete, especially if a low-cost airline is one of them, fares tend to be lower. Where one airline has the route to itself, it has less reason to discount.",
          "This is also why a journey with a connection is sometimes cheaper than the direct flight, even though it uses two planes. The airline with the connection is competing for your booking against the direct flight, and price is how it wins. Comparing nearby airports works for the same reason, as our guide on [how to find cheap flights](/blog/how-to-find-cheap-flights) explains.",
        ],
        bullets: [],
      },
      {
        heading: "Timing: booking early and booking late",
        paragraphs: [
          "As a general pattern, the cheapest groups of seats sell first, and people who book close to departure are more often travelling for work or in an emergency and will pay more. So fares usually climb in the final weeks before a flight.",
          "Booking very early is not always cheapest either, because airlines may not release their lowest prices until they can see how a flight is selling. There is no single best day or number of weeks that holds for every route, and any figure you read is an average at best. A more reliable habit is to start watching prices early, set a price alert, and book when the fare is good for your dates rather than waiting for a perfect one.",
        ],
        bullets: [],
      },
      {
        heading: "What the price is made of",
        paragraphs: [
          "The amount you pay is the airline's fare plus taxes, airport charges and any surcharges the airline adds. The taxes and airport charges depend on the airports and countries involved, so two fares that look similar can be built very differently.",
          "Rules in several places are designed to stop the headline price from misleading you. In the European Union, the price shown must include all unavoidable taxes, charges and fees from the start, and optional extras have to be something you choose to add. In the United States, advertised fares must likewise include taxes and mandatory fees. Extras such as bags and seats still sit on top: our guide to [budget airline fees](/blog/budget-airline-fees-explained) explains them, and the [baggage fee calculator](/tools/baggage-fee-calculator) adds them up for each fare you compare.",
        ],
        bullets: [],
      },
      {
        heading: "Why a price changes while you are searching",
        paragraphs: [
          "A fare that changes between two searches, or between the results page and the payment page, usually has an ordinary explanation.",
          "Many people believe that airlines raise the price because you searched before. There is little evidence for this, and the reasons below explain most cases. If you want to rule it out, compare in a private browser window, which costs nothing.",
        ],
        bullets: [
          "The last seat in a cheap group was sold to someone else",
          "A comparison site showed a stored price that was already out of date",
          "You searched for several passengers: if only one cheap seat is left, everyone is quoted the higher price, so try searching for one traveller to see the difference",
          "The price was shown in another currency and the exchange rate moved",
          "A booking site added its own fee at the payment step",
        ],
      },
      {
        heading: "What this means when you book",
        paragraphs: [
          "Because price follows demand and fare rules, the most useful things you can change are your dates, your airports and the fare type you choose. Check a few days either side of your preferred dates, compare the total with the bags you need, and read the change and refund rules before you pay for the cheapest option.",
          "When you have a fare in mind, put it into our free [trip budget calculator](/tools/trip-budget-calculator) with accommodation and daily spending to see the whole trip, or let the [AI trip planner](/travel-planner) draft a plan with flight options and a budget estimate for your dates.",
        ],
        bullets: [
          "Be flexible on dates and times before anything else",
          "Compare the full price, including bags and seats",
          "Check the fare rules, not only the fare",
          "Set a price alert instead of checking repeatedly",
          "Book when the price is good for your dates",
        ],
      },
    ],
    faqs: [
      {
        question: "Why did my flight price go up overnight?",
        answer:
          "Most often the cheapest group of seats sold out, so the next, more expensive group became the lowest price on sale. Demand forecasts are also updated regularly, which can reduce the number of seats offered at lower prices.",
      },
      {
        question: "Do flight prices go up the more you search?",
        answer:
          "There is little evidence that airlines raise fares because you searched before. Price changes are usually explained by cheap seats selling out or by a comparison site showing an out-of-date price. Comparing in a private window is a simple way to check.",
      },
      {
        question: "Is there a best day to book flights?",
        answer:
          "No single day is reliably cheapest for every route. The day you fly matters more than the day you book, with midweek and off-peak flights often costing less. Watching prices with an alert is more dependable than waiting for a particular weekday.",
      },
      {
        question: "Why is a return flight sometimes cheaper than a one-way?",
        answer:
          "Some airlines, especially on long-haul routes, price return fares to attract leisure travellers and charge more for one-way tickets, which are more often bought by people with less flexibility. Low-cost airlines usually price each direction separately instead.",
      },
    ],
    related: {
      destinations: ["/destinations/italy", "/destinations/japan"],
      itineraries: [],
      guides: [
        "how-to-find-cheap-flights",
        "cheap-flight-tips",
        "budget-airline-fees-explained",
      ],
    },
    sources: [
      SOURCES.eu1008,
      SOURCES.usDotAirConsumer,
      SOURCES.ukCaaHolidayBooking,
    ],
  },
];
