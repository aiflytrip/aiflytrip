import { type GuideSchema } from "@/content/schema";
import { SOURCES } from "@/content/data/sources";
import { type z } from "zod";

type PostInput = z.input<typeof GuideSchema>;

/**
 * November 2026 batch, one post a week. Each stays hidden until its
 * publishAt date. Review and add first-hand tips before each date.
 * Health and safety points stay general and point to official sources.
 */
export const novemberPosts: PostInput[] = [
  {
    slug: "how-to-beat-jet-lag",
    category: "practical",
    status: "published",
    publishAt: "2026-11-03",
    lastReviewed: "2026-10-03",
    photo: "jet-lag",
    title: "How to beat jet lag: tips before, during and after you fly",
    description:
      "Practical ways to reduce jet lag: adjusting your sleep before you fly, what to do on the plane, and how daylight and timing help you adapt after you land.",
    headline: "How to beat jet lag: before, during and after your flight",
    intro:
      "Jet lag happens when your body clock is still running on home time while the clock on the wall says something else. You can't avoid it entirely on a long trip across time zones, but a few simple habits make a real difference to how quickly you feel normal. Here's what helps, step by step.",
    sections: [
      {
        heading: "Why jet lag happens",
        paragraphs: [
          "Your body runs on an internal clock that controls when you feel sleepy, hungry and alert. When you cross several time zones quickly, that clock falls out of step with local time. The result is the familiar mix of tiredness during the day, waking at night, poor concentration and an unsettled stomach.",
          "The more time zones you cross, the stronger it tends to be. Many people find travelling east harder than travelling west, because it means going to sleep earlier than your body wants to. The good news is that symptoms usually ease within a few days as your body adjusts.",
        ],
        bullets: [],
      },
      {
        heading: "Before you fly",
        paragraphs: [
          "If you can, start shifting your routine a few days before departure. Going to bed and getting up a little earlier each day before an eastbound trip, or a little later before a westbound one, gives your body a head start.",
          "Arrive at the airport rested rather than exhausted. It's tempting to stay up late packing, but starting a long journey already short of sleep makes jet lag worse. Pack the day before, and plan a calm first day at your destination; our guide on [how to build a travel itinerary](/blog/how-to-build-a-travel-itinerary) explains why the first day should stay light.",
        ],
        bullets: [],
      },
      {
        heading: "On the plane",
        paragraphs: [
          "Set your watch or phone to destination time as soon as you board, and start living on that schedule. If it's night where you're going, try to sleep; if it's daytime, try to stay awake, even if that means a book and a lot of coffee-free willpower.",
          "Drink plenty of water. Cabin air is dry, and dehydration adds to that drained, foggy feeling. Go easy on alcohol and caffeine, especially in the hours when you'd like to sleep. An eye mask, earplugs or noise-cancelling headphones and a neck pillow make sleeping in a seat much easier.",
        ],
        bullets: [
          "Switch to destination time when you board",
          "Sleep or stay awake according to that time",
          "Drink water regularly; limit alcohol and caffeine",
          "Bring an eye mask, earplugs and a travel pillow",
        ],
      },
      {
        heading: "When you land",
        paragraphs: [
          "The single most helpful thing after arrival is to adopt local time straight away. Eat meals at local times and resist going to bed in the middle of the afternoon, however tempting it is.",
          "Daylight is a powerful signal to your body clock. Get outside during the day, ideally in the morning after an eastbound flight, and take a walk rather than sitting indoors. If you really need to rest, keep naps short so you can still sleep at night.",
        ],
        bullets: [],
      },
      {
        heading: "Sleep on the first few nights",
        paragraphs: [
          "Expect the first night or two to be imperfect. Keep your room dark and cool, avoid heavy meals and caffeine late in the day, and put screens away before bed. If you wake in the small hours, stay in bed and rest quietly rather than starting your day.",
          "Some people consider sleep aids or melatonin. Whether these are suitable, and whether they're available where you live, varies, so speak to a pharmacist or doctor before using them, particularly if you take other medication.",
        ],
        bullets: [],
      },
      {
        heading: "Plan your trip around it",
        paragraphs: [
          "If you're crossing many time zones, build jet lag into the plan. Schedule your most important activities for a few days in, and keep the first day or two flexible. On short trips of only a couple of days, some travellers prefer to stay roughly on home time instead.",
          "Flight times matter too. When you're choosing between options, an arrival in the late afternoon or evening can make it easier to stay awake until a normal bedtime. Our guide on [how to find cheap flights](/blog/how-to-find-cheap-flights) explains how to weigh timing against price.",
        ],
        bullets: [],
      },
      {
        heading: "When to get advice",
        paragraphs: [
          "Jet lag is common and usually settles by itself. If you have a medical condition that depends on timing, such as one where you take medication at set times, ask a doctor or pharmacist how to adjust your doses across time zones before you travel.",
          "Once your flights are booked, our [AI trip planner](/travel-planner) can plan a gentle first day around your arrival time, so you're not fighting jet lag with a packed schedule.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "How long does jet lag last?",
        answer:
          "For most people the symptoms ease within a few days as the body adjusts to local time. It tends to be stronger the more time zones you cross, and many people find eastbound trips harder.",
      },
      {
        question: "Is it better to sleep on the plane?",
        answer:
          "It depends on the time at your destination. If it's night there, try to sleep; if it's daytime, try to stay awake. Switching to destination time when you board helps you decide.",
      },
      {
        question: "Should I nap when I arrive?",
        answer:
          "If you must, keep it short so you can still sleep at night. Getting outside in daylight and eating meals at local times will help your body clock adjust faster than a long afternoon sleep.",
      },
    ],
    related: {
      destinations: ["/destinations/japan", "/destinations/japan/tokyo"],
      itineraries: ["tokyo-5-days"],
      guides: [
        "how-to-build-a-travel-itinerary",
        "how-much-layover-time-do-you-need",
        "how-many-days-for-a-trip",
      ],
    },
    sources: [SOURCES.nhsJetLag, SOURCES.cdcJetLag],
  },
  {
    slug: "flying-with-kids",
    category: "practical",
    status: "published",
    publishAt: "2026-11-10",
    lastReviewed: "2026-10-03",
    photo: "flying-with-kids",
    title: "Flying with kids: a practical guide for families",
    description:
      "A practical guide to flying with children: booking seats together, baby food and security, pushchairs and car seats, documents, and keeping kids happy on board.",
    headline: "Flying with kids: a practical guide for families",
    intro:
      "Flying with children takes more planning than flying alone, but most of the stress comes from a handful of predictable things: seats, bags, security and keeping everyone fed and occupied. Sort those out in advance and the journey becomes far more manageable. Here's how.",
    sections: [
      {
        heading: "Booking: seats, bassinets and timing",
        paragraphs: [
          "When you book, check how the airline seats families. Some seat young children next to an adult automatically; on others, choosing seats together costs extra. If sitting together matters, it's worth comparing a fare that includes seat selection; our guide to [budget airline fees](/blog/budget-airline-fees-explained) explains what to look for.",
          "Babies under two often travel on a parent's lap, usually at a reduced fare. On long-haul flights, many airlines offer bassinets that attach to the wall in front of certain seats. They're limited and have size and weight limits, so request one early and confirm it before you fly.",
          "Think about timing too. Flights that line up with nap time or bedtime can be easier with young children, while very early starts can make a long day longer.",
        ],
        bullets: [],
      },
      {
        heading: "Bags, pushchairs and car seats",
        paragraphs: [
          "Check your airline's baggage rules for children. Many allow a pushchair and a car seat free of charge, and pushchairs can often be used up to the aircraft door and returned at the gate or at baggage reclaim. Rules vary, so confirm them before you pack.",
          "If you want your child to sit in their own car seat on board, you'll usually need to buy them a seat and use an approved model. Check with the airline before you travel, as policies on which seats are accepted differ.",
        ],
        bullets: [],
      },
      {
        heading: "Security with children",
        paragraphs: [
          "Airport security has special allowances for families. In many countries, baby food, formula and milk for a child are allowed in hand luggage in reasonable quantities beyond the usual liquids limit, though they may be checked separately. The official guidance for the US and the UK is linked below.",
          "Pack these items so they're easy to take out, and allow extra time at security. Children usually walk through the scanner, and you may need to fold pushchairs and send them through the X-ray machine.",
        ],
        bullets: [],
      },
      {
        heading: "Documents for children",
        paragraphs: [
          "Children generally need their own passport for international travel, and some destinations require visas or travel authorisations for children too. Check entry requirements for every traveller with official sources well before you go; our [travel documents checklist](/blog/travel-documents-checklist) covers the basics.",
          "If you're travelling with a child without the other parent, or if you have a different surname from your child, you may be asked for evidence of permission or your relationship. GOV.UK has guidance for UK travellers, and other countries publish similar advice.",
        ],
        bullets: [],
      },
      {
        heading: "On board: food, comfort and entertainment",
        paragraphs: [
          "Bring more snacks and drinks than you think you'll need, plus a change of clothes for each child and a spare top for yourself. Pack a small bag with essentials that stays at your feet, so you're not getting up to reach the overhead locker.",
          "Changes in cabin pressure during take-off and landing can be uncomfortable for small ears. Feeding a baby or giving older children a drink or something to chew during these moments can help. New, small toys, downloaded films and headphones that fit children's ears are worth their weight in gold on longer flights.",
        ],
        bullets: [
          "Snacks, drinks and any baby food or milk",
          "A change of clothes for each child, and a spare top for you",
          "Wipes, nappies or pull-ups, and a few plastic bags",
          "Downloaded entertainment and child-sized headphones",
          "A favourite comforter for sleep",
        ],
      },
      {
        heading: "At the airport",
        paragraphs: [
          "Give yourself plenty of time. Everything takes longer with children, from check-in to bathroom stops. Many airports have family security lanes, play areas and baby-changing rooms; check the airport's website so you know where they are.",
          "If you have a connection, choose a comfortable layover rather than the shortest possible one. Our guide on [how much layover time you need](/blog/how-much-layover-time-do-you-need) explains how to judge it.",
        ],
        bullets: [],
      },
      {
        heading: "Planning the trip around the flight",
        paragraphs: [
          "Keep the first day after a long flight gentle, and plan days around naps and meal times rather than a packed list of sights. Choosing accommodation close to the places you'll visit cuts travel time with tired children.",
          "Our [AI trip planner](/travel-planner) can build a relaxed, family-paced itinerary if you set the pace to relaxed and mention children in your notes, and our [itineraries](/itineraries) give you a starting point for popular cities.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "Can I take baby milk and food through airport security?",
        answer:
          "In many countries, yes: baby food, formula and milk for a child are allowed in reasonable quantities beyond the normal liquids limit, though they may be checked. Confirm the current rules for your departure airport.",
      },
      {
        question: "Does my baby need their own seat?",
        answer:
          "Usually not. Babies under two can typically travel on a parent's lap. If you want them in their own car seat, you'll normally need to buy a seat and use an airline-approved car seat.",
      },
      {
        question: "Can I take a pushchair to the plane?",
        answer:
          "Many airlines let you use a pushchair up to the aircraft door and return it at the gate or baggage reclaim, often free of charge. Policies and size limits vary, so check with your airline.",
      },
    ],
    related: {
      destinations: [
        "/destinations/portugal/lisbon",
        "/destinations/france/paris",
      ],
      itineraries: ["lisbon-3-days", "paris-3-days"],
      guides: [
        "travel-documents-checklist",
        "budget-airline-fees-explained",
        "carry-on-packing-list",
      ],
    },
    sources: [
      SOURCES.tsaChildren,
      SOURCES.ukHandLuggage,
      SOURCES.govUkChildAbroad,
      SOURCES.ukCaaBaggage,
    ],
  },
  {
    slug: "how-to-plan-a-trip-on-a-budget",
    category: "planning",
    status: "published",
    publishAt: "2026-11-17",
    lastReviewed: "2026-10-03",
    photo: "budget-trip",
    title: "How to plan a trip on a budget: a practical guide",
    description:
      "How to plan an affordable trip: set a realistic budget, save on flights and places to stay, eat well for less, get around cheaply and avoid card fees.",
    headline: "How to plan a trip on a budget",
    intro:
      "A budget trip doesn't have to feel like a compromise. The biggest savings come from a few decisions made early: when you go, where you stay and how you get around. Get those right and you can spend money on the things that matter to you. Here's a practical way to plan it.",
    sections: [
      {
        heading: "Start with a realistic budget",
        paragraphs: [
          "Before you choose anything, decide roughly how much you want to spend in total, then split it into the main categories: getting there, accommodation, food, local transport and activities, plus a buffer for surprises. Seeing the split makes it obvious where the big costs are and where small savings won't matter much.",
          "Prices vary enormously between destinations and seasons, so use your budget to guide where and when you go, not just how you travel. The same money stretches much further in some places, and outside peak season, than in others.",
        ],
        bullets: [],
      },
      {
        heading: "Pick your timing carefully",
        paragraphs: [
          "When you travel affects almost every cost at once. Flights, accommodation and even some attractions are cheaper outside school holidays and peak season, and the weeks just before and after the busy period often bring good weather with fewer crowds.",
          "Our destination guides cover the best time to visit places such as [Portugal](/destinations/portugal) and [Japan](/destinations/japan), and our [cheap flight tips](/blog/cheap-flight-tips) explain how flexible dates can lower your fare.",
        ],
        bullets: [],
      },
      {
        heading: "Save on getting there",
        paragraphs: [
          "Flights are often the biggest single cost. Compare dates and nearby airports, judge fares on the total price including bags, and travel light if you can. Our step-by-step guide on [how to find cheap flights](/blog/how-to-find-cheap-flights) covers the method in detail.",
          "Overland options are worth a look for shorter distances. Trains and long-distance buses can be cheaper once you add airport transfers to a flight, and they take you from city centre to city centre.",
        ],
        bullets: [],
      },
      {
        heading: "Choose accommodation wisely",
        paragraphs: [
          "Accommodation is the other big cost, and location matters as much as the nightly price. A slightly more expensive room within walking distance of the places you want to see can save money and time on transport.",
          "Apartments or rooms with a kitchen let you make breakfast and the occasional meal yourself. Hostels with private rooms, guesthouses and smaller hotels can all be good value; read recent reviews carefully, especially comments about cleanliness, noise and the exact location.",
        ],
        bullets: [],
      },
      {
        heading: "Eat well for less",
        paragraphs: [
          "You don't have to skip good food to save money. Markets, bakeries and simple local restaurants away from the main tourist streets are often both cheaper and better. In many countries, lunch menus offer a set meal at a lower price than the same restaurant charges in the evening.",
          "Carry a refillable water bottle where tap water is safe to drink, and keep a few snacks for days out so you're not buying whatever is nearest when hunger strikes.",
        ],
        bullets: [],
      },
      {
        heading: "Get around cheaply",
        paragraphs: [
          "Public transport is usually the best-value way to get around a city, and walking is free. Many cities offer day passes or rechargeable travel cards that work out cheaper than single tickets if you make several journeys. Grouping each day by area, as our [itinerary guide](/blog/how-to-build-a-travel-itinerary) explains, cuts transport costs too.",
          "Look for free things to do: parks, viewpoints, markets, neighbourhood walks and, in some places, free museum days. Check official websites for current opening days and any booking requirements.",
        ],
        bullets: [],
      },
      {
        heading: "Avoid card and currency fees",
        paragraphs: [
          "Card fees can quietly add up. Check whether your bank charges for spending or withdrawing cash abroad, and consider a card designed for travel if it does. When a card machine or cash machine offers to charge you in your home currency, choosing the local currency is usually the better deal.",
          "Within the EU, payments in euros to another EU country generally cost the same as domestic euro payments, and the EU publishes guidance on charges. If you're booking a package holiday, check what financial protection applies; the UK Civil Aviation Authority has advice for UK travellers.",
        ],
        bullets: [
          "Ask your bank about fees for spending and withdrawals abroad",
          "Pay in the local currency when offered a choice",
          "Withdraw cash less often to reduce per-transaction fees",
          "Keep a small emergency fund on a separate card",
        ],
      },
      {
        heading: "Keep track as you go",
        paragraphs: [
          "A simple note on your phone with what you've spent each day keeps you honest without spoiling the trip. If you overspend one day, you can balance it with a cheaper one later. Our [AI trip planner](/travel-planner) can also draft an itinerary with a budget estimate in your currency to help you plan before you go.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "What's the biggest way to save on a trip?",
        answer:
          "Timing usually has the biggest effect, because travelling outside peak season lowers flights and accommodation at the same time. After that, where you stay and how you get there make the most difference.",
      },
      {
        question: "Should I pay in local currency or my home currency abroad?",
        answer:
          "Choosing the local currency is usually better value. If you pick your home currency, the conversion is often done at a less favourable rate. Check your own bank's fees for foreign transactions too.",
      },
      {
        question: "Is it cheaper to stay in an apartment or a hotel?",
        answer:
          "It depends on the destination and trip length. Apartments with a kitchen can save money on meals, especially for families and longer stays, while hotels may be better value for short city breaks.",
      },
    ],
    related: {
      destinations: ["/destinations/portugal", "/destinations/japan"],
      itineraries: ["lisbon-3-days", "tokyo-5-days"],
      guides: [
        "cheap-flight-tips",
        "how-to-find-cheap-flights",
        "how-many-days-for-a-trip",
      ],
    },
    sources: [
      SOURCES.euCardCharges,
      SOURCES.ukCaaHolidayBooking,
      SOURCES.euAirRights,
    ],
  },
  {
    slug: "solo-travel-tips",
    category: "planning",
    status: "published",
    publishAt: "2026-11-24",
    lastReviewed: "2026-10-03",
    photo: "solo-travel",
    title: "Solo travel tips: planning your first trip alone",
    description:
      "Practical solo travel tips: choosing a first destination, where to stay, staying safe, meeting people, eating alone and planning days that suit you.",
    headline: "Solo travel tips: how to plan your first trip alone",
    intro:
      "Travelling alone gives you complete freedom: your pace, your plans, your choices. It can also feel daunting the first time. With a bit of planning, most of the worries fade quickly. Here are practical tips for choosing where to go, staying safe and enjoying your own company.",
    sections: [
      {
        heading: "Choose an easy first destination",
        paragraphs: [
          "For a first solo trip, pick somewhere that's straightforward to navigate: good public transport, plenty of visitors, and a language you can manage or where English is widely used. Big, walkable cities are often a good start, because there's always something to do and help is easy to find.",
          "A shorter trip is a sensible first step. A long weekend or a week lets you find your feet without committing to months on the road. Our guide on [how many days you need for a trip](/blog/how-many-days-for-a-trip) can help you pick a length.",
        ],
        bullets: [],
      },
      {
        heading: "Where to stay",
        paragraphs: [
          "Location matters even more when you're alone. Choose somewhere central and well connected, so you're not walking long distances late at night. Read recent reviews for comments about the neighbourhood, security and staff.",
          "Hostels with private rooms, small guesthouses and hotels with social spaces make it easy to meet people if you want to, while still giving you your own space. Arriving in daylight on your first day makes finding your accommodation much easier.",
        ],
        bullets: [],
      },
      {
        heading: "Staying safe",
        paragraphs: [
          "Most solo trips pass without problems, and a few habits help keep it that way. Check official travel advice for your destination before you go, share your itinerary with someone at home, and keep in touch regularly.",
          "Keep digital copies of your passport and important documents, carry a backup card separately from your main one, and know how to contact local emergency services. Trust your instincts: if somewhere doesn't feel right, leave. The UK government publishes specific advice for women travelling abroad, and other governments offer similar guidance.",
        ],
        bullets: [
          "Check official travel advice for your destination",
          "Share your plans and check in with someone at home",
          "Keep digital copies of documents and a backup card",
          "Know the local emergency number",
          "Have travel insurance in place before you leave",
        ],
      },
      {
        heading: "Insurance and documents",
        paragraphs: [
          "When you're alone, there's no one to sort things out if something goes wrong, so preparation matters. Make sure your travel insurance covers medical care and the activities you plan, and keep the emergency number to hand. Our guide to [travel insurance basics](/blog/travel-insurance-basics) explains what to check.",
          "Check passport validity and entry requirements well in advance; our [travel documents checklist](/blog/travel-documents-checklist) walks through it.",
        ],
        bullets: [],
      },
      {
        heading: "Meeting people (if you want to)",
        paragraphs: [
          "Solo doesn't have to mean lonely. Walking tours, cooking classes, day trips and group activities are easy ways to meet other travellers without any pressure. Hostels and guesthouses often have common areas or events where conversations start naturally.",
          "Equally, there's no obligation to socialise. Many solo travellers enjoy the quiet: reading in a café, wandering without a plan, or taking their time in a museum.",
        ],
        bullets: [],
      },
      {
        heading: "Eating alone",
        paragraphs: [
          "Eating alone feels strange to some people at first, but it quickly becomes normal. Lunch is often the easiest meal to enjoy alone, and counter seating, markets and casual places make solo dining relaxed. Bring a book, or simply watch the world go by.",
          "Food tours and cooking classes combine a good meal with company, if you'd like some of both.",
        ],
        bullets: [],
      },
      {
        heading: "Plan days that suit you",
        paragraphs: [
          "One of the joys of solo travel is planning exactly what you want. Group each day by area, keep a backup idea for bad weather, and leave free time so you can follow your curiosity. Our guide on [how to build a travel itinerary](/blog/how-to-build-a-travel-itinerary) shows how.",
          "Our [AI trip planner](/travel-planner) can draft a day-by-day plan around your own interests and pace, which is a useful starting point when there's no one else to bounce ideas off.",
        ],
        bullets: [],
      },
      {
        heading: "Handling the harder moments",
        paragraphs: [
          "Almost every solo traveller has a moment of homesickness or a day when things go wrong: a missed train, bad weather, a lonely evening. It helps to expect it. Plan an easy, comforting activity for those days, such as a favourite kind of food, a film, or a call home.",
          "Practical problems feel bigger alone, so keep a few things ready: the address of your accommodation saved offline, a charged phone and power bank, and enough local currency or a working card for a taxi back if you need one.",
        ],
        bullets: [],
      },
      {
        heading: "Money and logistics",
        paragraphs: [
          "Solo travel can cost more per person, because you don't split rooms or taxis. Single rooms in guesthouses, hostel private rooms and apartments booked for longer stays can help, as can choosing destinations where your budget stretches further. Our guide on [how to plan a trip on a budget](/blog/how-to-plan-a-trip-on-a-budget) has more ideas.",
          "Spread your money across more than one card and keep a little cash separately. Note your bank's emergency number in case a card is lost, and check in advance whether your bank charges fees abroad.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "Is solo travel safe?",
        answer:
          "Most solo trips go smoothly. Check official travel advice, choose central accommodation, share your plans with someone at home and trust your instincts. These habits reduce risk wherever you go.",
      },
      {
        question: "How do I meet people when travelling alone?",
        answer:
          "Walking tours, classes, day trips and the common areas of hostels or guesthouses are easy ways to meet other travellers. There's no pressure to join in, so you can choose how social you want to be.",
      },
      {
        question: "Where should I go for my first solo trip?",
        answer:
          "Somewhere easy to navigate, with good public transport, plenty of visitors and a language you can manage. A short city break is a comfortable first step before longer trips.",
      },
    ],
    related: {
      destinations: [
        "/destinations/japan/tokyo",
        "/destinations/portugal/lisbon",
        "/destinations/italy/rome",
      ],
      itineraries: ["tokyo-5-days", "lisbon-3-days"],
      guides: [
        "travel-insurance-basics",
        "travel-documents-checklist",
        "how-to-build-a-travel-itinerary",
      ],
    },
    sources: [
      SOURCES.govUkWomenAbroad,
      SOURCES.ukAdviceIndex,
      SOURCES.govUkTravelInsurance,
    ],
  },
];
