import { type GuideSchema } from "@/content/schema";
import { SOURCES } from "@/content/data/sources";
import { type z } from "zod";

type GuideInput = z.input<typeof GuideSchema>;

export const guides: GuideInput[] = [
  {
    slug: "how-to-plan-a-trip",
    category: "planning",
    status: "published",
    lastReviewed: "2026-10-02",
    title: "How to plan a trip: a step-by-step travel planning guide",
    description:
      "A practical, step-by-step guide to planning a trip: choosing dates and a destination, setting a budget, building an itinerary and preparing documents.",
    headline: "How to plan a trip, step by step",
    intro:
      "Good trip planning is mostly about making a few big decisions in the right order. This guide walks through the steps most travellers follow, from deciding what kind of trip you want to preparing for departure, with practical advice for each stage.",
    sections: [
      {
        heading: "1. Decide what kind of trip you want",
        paragraphs: [
          "Before looking at destinations, think about what would make the trip feel successful: rest, food, culture, nature, time with family, or adventure. Writing down two or three priorities makes every later decision easier, because you can check options against them.",
          "Be honest about your preferred pace. Some travellers love full days; others enjoy a slower trip with one main activity per day. Planning to your real pace is the single best way to avoid an exhausting holiday.",
        ],
      },
      {
        heading: "2. Choose dates and trip length",
        paragraphs: [
          "Your dates affect weather, crowds and prices. Shoulder seasons, the months just before and after peak season, often balance good weather with fewer crowds. Check local holidays and festivals at your destination, which can be wonderful or make travel more expensive and busy.",
          "Then decide how long to go for. Remember to count travel days: long flights and time-zone changes often use up most of the first day.",
        ],
        bullets: [
          "Count the nights you'll actually spend at your destination, not just the dates.",
          "Allow at least two or three nights per base to make moving worthwhile.",
          "Leave a buffer day before you return to work if you're crossing time zones.",
        ],
      },
      {
        heading: "3. Set a realistic budget",
        paragraphs: [
          "Break your budget into main categories: transport to and from the destination, accommodation, local transport, food, activities and a contingency for unexpected costs. Accommodation and flights are usually the largest items, so research those first.",
          "Prices change with season and demand, so treat early estimates as ranges and refine them as you book. Setting aside a contingency, often around ten percent, helps absorb surprises.",
        ],
      },
      {
        heading: "4. Shape a rough itinerary",
        paragraphs: [
          "Start with a simple outline: which places you'll stay in, and for how many nights. Group sights by area, so each day focuses on one or two neighbourhoods or towns, which reduces time spent in transit.",
          "Keep the outline flexible. Book the few things that require advance reservations, such as popular museums or restaurants, and leave the rest open. An AI trip planner can help you draft a day-by-day structure quickly, which you can then refine.",
        ],
      },
      {
        heading: "5. Book transport and accommodation",
        paragraphs: [
          "Book long-distance transport and accommodation once your outline is clear. Choose accommodation in a convenient area for your plans, close to public transport, rather than simply the cheapest option, as it saves time and money each day.",
          "Read cancellation policies carefully, especially if your plans might change, and keep confirmations in one place, both online and offline.",
        ],
      },
      {
        heading: "6. Prepare documents, money and health",
        paragraphs: [
          "Check passport validity, visa or travel-authorisation requirements and any health recommendations well before departure, using official government sources. Requirements depend on your nationality and destination and can change.",
          "Consider travel insurance, let your bank know about travel if needed, and plan how you'll pay: cards, cash, or both. Our travel documents checklist covers this stage in more detail.",
        ],
      },
      {
        heading: "7. Final preparations",
        paragraphs: [
          "In the last week, download offline maps and key apps, save copies of important documents, check the weather forecast and confirm any reservations. Packing light makes moving between bases far easier.",
        ],
        bullets: [
          "Save digital copies of your passport, bookings and insurance.",
          "Download offline maps for each place you'll visit.",
          "Check opening days for the sights you've planned around.",
        ],
      },
      {
        heading: "Using an AI trip planner well",
        paragraphs: [
          "An AI trip planner is most useful at the drafting stage. Give it the details that matter: where you're going, your dates, who is travelling, your budget, your pace and what you enjoy. The more specific your input, the more useful the draft itinerary and budget will be.",
          "Treat the result as a starting point rather than a final plan. Check that the order of days makes geographic sense, confirm opening days and booking requirements with official websites, and adjust the pace to suit you. Practical facts such as prices, timetables and entry rules change, so always verify them with official sources before you rely on them.",
        ],
        bullets: [
          "Be specific about pace, interests and must-sees.",
          "Check the route on a map: are nearby sights grouped together?",
          "Verify opening days, prices and entry rules with official sources.",
        ],
      },
      {
        heading: "Common planning mistakes to avoid",
        paragraphs: [
          "The most common mistake is trying to fit too much in. A plan that looks exciting on paper can feel exhausting in practice, especially with jet lag. Another is underestimating travel time between places, including getting to and from airports and stations.",
        ],
        bullets: [
          "Too many hotel changes in a short trip.",
          "No free time for rest or spontaneous discoveries.",
          "Assuming opening days and prices without checking.",
          "Leaving document and visa checks until the last minute.",
        ],
      },
    ],
    faqs: [
      {
        question: "How far in advance should you plan a trip?",
        answer:
          "For international trips, starting to plan a few months ahead gives you more choice of flights and accommodation, especially in peak season. Shorter trips can be planned later. Check visa or travel-authorisation requirements early, because some take time to process.",
      },
      {
        question: "What should I book first when planning a trip?",
        answer:
          "Usually your main transport and accommodation, once you've settled your dates and the places you'll stay. After that, book activities that sell out or need timed entry, and leave the rest of your itinerary flexible.",
      },
      {
        question: "Can an AI travel planner plan my whole trip?",
        answer:
          "An AI travel planner is useful for drafting a day-by-day itinerary and budget quickly based on your preferences. You should still check practical details, such as opening days, prices and entry requirements, with official sources before you travel.",
      },
    ],
    related: {
      destinations: [
        "/destinations/france",
        "/destinations/japan",
        "/destinations/portugal",
      ],
      guides: [
        "how-many-days-for-a-trip",
        "travel-documents-checklist",
        "how-to-build-a-travel-itinerary",
        "how-to-find-cheap-flights",
      ],
    },
    sources: [SOURCES.ukAdviceIndex, SOURCES.usTravel, SOURCES.auAdvice],
  },
  {
    slug: "how-many-days-for-a-trip",
    category: "planning",
    status: "published",
    lastReviewed: "2026-10-02",
    title: "How many days do you need? Choosing your trip length",
    description:
      "How to decide how long a trip should be: a simple way to count days, how many nights to spend per base and example trip lengths for city and multi-stop trips.",
    headline: "How many days do you need for a trip?",
    intro:
      "Deciding how long to spend somewhere is one of the trickiest parts of planning. Too short and you spend most of your time in transit; too long in one place and you may run out of things you want to do. This guide offers a simple way to work it out.",
    sections: [
      {
        heading: "Start with your available time, not the destination",
        paragraphs: [
          "Begin with the total number of days you can travel, including weekends and public holidays. Then subtract travel days: long-haul flights, airport transfers and adjusting to time zones often take most of a day at each end of a trip.",
          "What remains is your real time on the ground. Planning around that number, rather than your departure and return dates, gives you a much more realistic picture of what is possible.",
        ],
      },
      {
        heading: "How many nights to spend in each place",
        paragraphs: [
          "Every time you change accommodation you lose time to packing, checking out, travelling and settling in. As a rough rule, two nights is the minimum for a stop to feel worthwhile, and three or more lets you relax and take day trips.",
          "Big cities with many neighbourhoods and museums, such as Paris, Rome or Tokyo, usually deserve at least three or four days. Smaller towns or countryside bases can work with two or three nights, especially if you're mainly using them for day trips.",
        ],
        bullets: [
          "Major city: three to five days.",
          "Smaller city or town: two to three days.",
          "Countryside or beach base: three nights or more, for genuine rest.",
        ],
      },
      {
        heading: "Choosing the number of stops",
        paragraphs: [
          "A useful guideline is to plan roughly one base per three to four days of your trip. A one-week trip works well with one or two bases, while a two-week trip can comfortably include three or four.",
          "Fewer stops usually means a better trip. You see more of each place, spend less time travelling and have space for unplanned discoveries, which are often the highlights.",
        ],
      },
      {
        heading: "Example trip lengths",
        paragraphs: [
          "A long weekend of three or four days suits a single city. A week suits a city plus one contrasting region, for example Paris and Normandy, or Lisbon and the Algarve. Ten days to two weeks suits a multi-city route, such as Rome, Florence and Venice, or Tokyo, Kyoto and Osaka.",
          "If you have only a short time in a far-away destination, consider focusing on one region and saving others for a future trip rather than trying to cover the whole country.",
        ],
      },
      {
        heading: "Signs your plan is too packed",
        paragraphs: [
          "If most days involve checking out of a hotel, or your plan has no free afternoons, it is probably too ambitious. Try removing one stop or one major activity per day and see whether the trip feels more enjoyable.",
        ],
        bullets: [
          "More than one hotel change every two days.",
          "Every day has more than two timed bookings.",
          "No time set aside for meals, rest or wandering.",
        ],
      },
      {
        heading: "Adjust for your travel style",
        paragraphs: [
          "The guidelines above assume a moderate pace. If you like to see as much as possible, you can shorten stays slightly; if you prefer long lunches, slow mornings and time to wander, add a day to each base instead.",
          "Who you travel with matters too. Trips with young children or older relatives usually work best with fewer stops and longer stays, because every move between hotels takes more effort. Groups also tend to move more slowly than solo travellers, so build in extra time.",
        ],
      },
      {
        heading: "Factor in jet lag and travel fatigue",
        paragraphs: [
          "Crossing several time zones can affect your energy for the first day or two. Plan a gentle first day without important bookings, and put your most demanding sightseeing a little later in the trip.",
          "Long overland journeys are tiring as well. If a travel day takes more than a few hours, treat it as mostly a travel day and plan only a short walk or a relaxed dinner on arrival.",
        ],
        bullets: [
          "Keep the first day after a long-haul flight light.",
          "Avoid fixed bookings on the morning after you arrive.",
          "Treat long transfers as travel days, not sightseeing days.",
        ],
      },
      {
        heading: "Day trips versus moving on",
        paragraphs: [
          "If a place is within an hour or two of your base, a day trip is often easier than moving hotels: you travel light, keep the same room and come back to familiar surroundings in the evening.",
          "Moving on makes more sense when the next place is far away, when you want to experience it in the evening or early morning, or when you're heading in one direction anyway and won't need to return.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is a week long enough for an international trip?",
        answer:
          "A week is long enough for one city plus a nearby region, or two cities linked by a short train or flight. For long-haul destinations, remember that the journey and time-zone changes can take up a day at each end, so focus on fewer places.",
      },
      {
        question: "How many cities should I visit in two weeks?",
        answer:
          "Three or four bases is usually comfortable for a two-week trip, giving each place three to five days. Visiting more cities is possible, but frequent travel days can make the trip tiring and leave less time to enjoy each stop.",
      },
      {
        question: "Should I plan rest days during a trip?",
        answer:
          "Yes, especially on trips longer than a week. A lighter day with no fixed bookings every few days helps you recover from travel and gives you time for the spontaneous experiences that often become the best memories.",
      },
    ],
    related: {
      destinations: [
        "/destinations/italy",
        "/destinations/japan",
        "/destinations/france/paris",
      ],
      guides: [
        "how-to-plan-a-trip",
        "travel-documents-checklist",
        "how-to-build-a-travel-itinerary",
      ],
    },
    sources: [SOURCES.france, SOURCES.japan, SOURCES.portugal],
  },
  {
    slug: "travel-documents-checklist",
    category: "practical",
    status: "published",
    lastReviewed: "2026-10-02",
    title: "Travel documents checklist: what to check before you go",
    description:
      "A practical checklist of travel documents and entry requirements to check before an international trip, with links to official sources for the current rules.",
    headline: "Travel documents checklist: what to check before you go",
    intro:
      "Entry requirements vary by nationality and destination and can change, so the safest approach is to know what to check and where to check it. This checklist covers the main documents and preparations, and points you to official sources for the current rules. It doesn't replace official advice.",
    sections: [
      {
        heading: "Passport",
        paragraphs: [
          "Check your passport's expiry date as soon as you start planning. Some countries require a passport to be valid for a minimum period beyond your planned departure date, and some require blank pages for entry stamps. Renewals can take weeks, so check early.",
          "Make sure the name on your bookings matches your passport exactly, as mismatches can cause problems at check-in.",
        ],
        bullets: [
          "Expiry date and any minimum-validity rule for your destination.",
          "Enough blank pages, if your destination requires them.",
          "Names on tickets and bookings match the passport.",
        ],
      },
      {
        heading: "Visas and travel authorisations",
        paragraphs: [
          "Depending on your nationality, you may need a visa, an electronic travel authorisation or nothing at all. Some regions are introducing new digital border systems, so rules that applied on a previous trip may have changed.",
          "Always check requirements on official government websites or your destination's embassy, rather than relying on third-party summaries, and apply well in advance if you need permission to enter.",
        ],
      },
      {
        heading: "Health and insurance",
        paragraphs: [
          "Check whether your destination has any vaccination requirements or health recommendations, and speak to a healthcare professional if needed. Carry any regular medication in its original packaging with a copy of your prescription.",
          "Travel insurance can cover medical costs, cancellations and lost belongings. Read the policy to understand what is and isn't included, especially for medical care abroad and any activities you plan.",
        ],
      },
      {
        heading: "Money and payments",
        paragraphs: [
          "Check which cards work abroad, any foreign transaction fees and whether your bank needs to know about your travel. Carry a backup payment method, and some local currency for places that don't take cards.",
        ],
        bullets: [
          "At least two payment methods, stored separately.",
          "Some local cash for small purchases.",
          "Your bank's emergency contact number.",
        ],
      },
      {
        heading: "Driving abroad",
        paragraphs: [
          "If you plan to drive, check whether your licence is accepted at your destination or whether you need an International Driving Permit, and what insurance is required. Rules vary by country.",
        ],
      },
      {
        heading: "Copies and emergency information",
        paragraphs: [
          "Keep digital copies of your passport, visas, insurance and bookings somewhere you can access offline, and share your itinerary with someone at home. Note the contact details of your country's embassy or consulate at your destination.",
          "Many governments offer travel advice pages and alert services for their citizens abroad. Checking your government's advice for your destination shortly before you leave is a good final step.",
        ],
      },
      {
        heading: "Travelling with children",
        paragraphs: [
          "Children usually need their own passports, and some countries have additional rules for minors, for example when a child travels with only one parent or with other adults. These rules vary, so check the official requirements for both your destination and any countries you pass through.",
          "Carrying supporting documents, such as a consent letter from a parent who is not travelling, can be required or helpful in some situations. Official government advice pages explain what is needed for your route.",
        ],
      },
      {
        heading: "Transit and connecting flights",
        paragraphs: [
          "If your journey connects through another country, check whether you need a transit visa or authorisation, even if you never leave the airport. Rules depend on your nationality, the transit country and whether you change terminals or collect bags.",
          "Airlines can refuse boarding if you don't have the right documents for every country on your route, so check the requirements for each stop, not just your final destination.",
        ],
      },
      {
        heading: "A simple timeline",
        paragraphs: [
          "Working through this checklist in stages keeps it manageable and leaves time to fix any problems, such as renewing a passport or applying for a visa.",
        ],
        bullets: [
          "As soon as you start planning: check passport validity and entry requirements.",
          "Several weeks before: apply for any visas or travel authorisations, and arrange insurance.",
          "A week before: check health advice, payment cards and your government's latest travel advice.",
          "The day before: confirm documents are packed and copies are saved offline.",
        ],
      },
      {
        heading: "If documents are lost or stolen",
        paragraphs: [
          "If your passport is lost or stolen abroad, contact your country's embassy or consulate, which can usually help with an emergency travel document. Reporting the loss to local police may also be required, for example for insurance claims.",
          "Having digital copies of your passport and other documents, stored securely and accessible offline, makes replacing them much quicker.",
        ],
      },
    ],
    faqs: [
      {
        question:
          "Where can I check the entry requirements for my destination?",
        answer:
          "Use official sources: your own government's travel advice service, the destination country's embassy or foreign ministry, and for European Schengen countries the EU's official travel website. Requirements depend on your nationality, so check them for your own passport.",
      },
      {
        question: "How long should my passport be valid for travel?",
        answer:
          "It depends on your destination. Some countries require your passport to be valid for several months beyond your stay, while others only require it to be valid for the length of your trip. Check the specific rule for your destination on an official government website.",
      },
      {
        question: "Do I need travel insurance?",
        answer:
          "It isn't always required, but it is strongly recommended, because medical treatment, cancellations and lost belongings abroad can be very expensive. Some destinations or visas do require proof of insurance, so check the entry rules for your trip.",
      },
    ],
    related: {
      destinations: [
        "/destinations/japan",
        "/destinations/portugal",
        "/destinations/italy",
      ],
      guides: [
        "how-to-plan-a-trip",
        "how-many-days-for-a-trip",
        "budget-airline-fees-explained",
      ],
    },
    sources: [
      SOURCES.euEntry,
      SOURCES.usTravel,
      SOURCES.auAdvice,
      SOURCES.iata,
      SOURCES.who,
    ],
  },
];
