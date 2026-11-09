import { type GuideSchema } from "@/content/schema";
import { SOURCES } from "@/content/data/sources";
import { type z } from "zod";

type PostInput = z.input<typeof GuideSchema>;

/**
 * Travel hacks batch (November 2026): practical, evergreen posts that
 * answer common searches and link into the existing guides and tools.
 * Passenger rights are described in general terms only; amounts, deadlines
 * and eligibility come from the official sources listed on each post.
 */
export const hackPosts: PostInput[] = [
  {
    slug: "travel-hacks-that-work",
    category: "planning",
    status: "published",
    publishAt: "2026-11-09",
    lastReviewed: "2026-11-09",
    photo: "flight-tips",
    title: "Travel hacks that actually work (and a few that don't)",
    description:
      "Practical travel hacks for cheaper flights, lighter bags, smoother airports and better trips, plus the popular tricks that rarely work.",
    headline: "Travel hacks that actually work",
    intro:
      "The internet is full of travel hacks, and many of them are recycled myths. The tricks below are the ones that hold up: simple habits that save money, time or stress on almost any trip. None of them needs a points strategy or a special credit card, and at the end we list a few popular hacks that usually aren't worth the effort.",
    sections: [
      {
        heading: "Booking flights",
        paragraphs: [
          "The biggest savings come from flexibility, not secret websites. If you can move your trip by a day or two, or fly into a different airport in the same region, you'll see far more options than a search for one fixed date and airport. Our guide on [how to find cheap flights](/blog/how-to-find-cheap-flights) explains the method step by step.",
          "Always compare the total price, not the headline fare. A cheap ticket that charges for a cabin bag and a seat can cost more than a fuller fare on another airline. Our [baggage fee calculator](/tools/baggage-fee-calculator) helps you compare like with like before you pay.",
        ],
        bullets: [
          "Search a range of dates rather than one fixed day",
          "Check nearby airports at both ends of the trip",
          "Price the bags and seats you actually need before comparing airlines",
          "Book directly with the airline when the price is the same, so changes are easier",
          "Keep a screenshot of the fare rules and the price you paid",
        ],
      },
      {
        heading: "Packing",
        paragraphs: [
          "Travelling with only a cabin bag saves time at both airports and removes the risk of lost luggage. The trick is to plan outfits rather than pack 'just in case' items: pick a colour scheme so everything goes together, wear your bulkiest shoes and jacket on the plane, and plan to do one small wash on longer trips.",
          "Check your airline's size and weight limits before you pack, not at the gate. Our [bag size checker](/tools/bag-size-checker) and [carry-on packing list](/blog/carry-on-packing-list) make this quick, and the [packing list generator](/tools/packing-list-generator) builds a list for your destination and trip length.",
        ],
        bullets: [
          "Pack medicines, chargers, documents and one change of clothes in your cabin bag",
          "Put a luggage tracker or a contact card inside checked bags",
          "Photograph your checked bag and its contents before you hand it over",
        ],
      },
      {
        heading: "At the airport",
        paragraphs: [
          "Most airport stress comes from queues you didn't expect. Check in online, download your boarding pass to your phone and keep a screenshot in case the app won't load. Pack your liquids and electronics so they're easy to take out if the airport asks, because rules vary between airports and countries.",
          "Give yourself enough time for connections. A layover that looks efficient on a booking site can be unrealistic at a big airport or when you have to change terminals. Our [layover time checker](/tools/layover-time-checker) gives you a sensible minimum for your route.",
        ],
        bullets: [
          "Save your airline's app and turn on flight notifications",
          "Carry an empty water bottle to fill after security",
          "Note your gate and boarding time, not just the departure time",
        ],
      },
      {
        heading: "Money abroad",
        paragraphs: [
          "When a card machine or cash machine abroad offers to charge you in your home currency, it's usually better to choose the local currency. That offer, called dynamic currency conversion, often comes with a less favourable exchange rate. The EU's guidance on money and charges when travelling explains how card charges work.",
          "Carry two payment cards and keep them in different places, and let your bank know if it asks you to report travel. A small amount of local cash still helps for taxis, markets and tips in many places.",
        ],
        bullets: [],
      },
      {
        heading: "Planning the trip itself",
        paragraphs: [
          "The most underrated hack is planning fewer things per day. Group sights by neighbourhood, book only the attractions that genuinely sell out, and leave gaps for rest and surprises. Our guide on [how to build a travel itinerary](/blog/how-to-build-a-travel-itinerary) shows how, and our [AI trip planner](/travel-planner) drafts a day-by-day plan you can edit.",
          "Decide how long you need before you book. Too short a trip means spending most of it in transit; our [how many days tool](/tools/how-many-days) suggests a realistic length for each destination.",
        ],
        bullets: [],
      },
      {
        heading: "Hacks that usually don't work",
        paragraphs: [
          "Some popular tips are out of date or simply myths. Searching in a private browser window to see lower prices is a common example: fares change constantly because seats sell, not because a site remembers you. Booking on a particular day of the week is another; there's no reliable cheapest day to buy.",
          "Skipping the last leg of a ticket (sometimes called hidden-city ticketing) can break the airline's terms, cancel your return flight and is impossible with checked bags. Fake flight reservations for visa applications are a serious risk too; our guide to [flight reservations for visas](/blog/dummy-ticket-for-visa) covers the legal alternatives.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "What is the best travel hack for cheaper flights?",
        answer:
          "Flexibility. Searching a range of dates and nearby airports, and comparing the total price including bags and seats, saves more than any single trick or website.",
      },
      {
        question: "Does searching in incognito mode make flights cheaper?",
        answer:
          "There's no good evidence that it does. Prices change because seats sell and fares are adjusted, so seeing a different price later is usually normal fare movement, not tracking.",
      },
      {
        question: "Should I pay in local currency or my home currency abroad?",
        answer:
          "Usually local currency. When a card machine offers to convert to your home currency, the exchange rate it uses is often worse than the one your own bank would apply.",
      },
      {
        question: "Is it worth travelling with only a cabin bag?",
        answer:
          "For short trips it often is: you save checked bag fees, skip the baggage hall and can't lose a checked suitcase. Check your airline's size and weight limits before you pack.",
      },
    ],
    related: {
      guides: [
        "how-to-find-cheap-flights",
        "carry-on-packing-list",
        "how-to-build-a-travel-itinerary",
      ],
    },
    sources: [
      SOURCES.euCardCharges,
      SOURCES.usDotAirConsumer,
      SOURCES.tsaWhatCanIBring,
    ],
  },
  {
    slug: "flight-delay-compensation",
    category: "flights",
    status: "published",
    publishAt: "2026-11-09",
    lastReviewed: "2026-11-09",
    photo: "layover",
    title: "Flight delayed or cancelled? Your rights and how to claim",
    description:
      "What to do when your flight is delayed or cancelled: care at the airport, refunds and rebooking, EU and UK compensation rules, and how to make a claim.",
    headline: "Flight delayed or cancelled: your rights and how to claim",
    intro:
      "A long delay or a cancellation can feel like something you just have to put up with, but in many cases you have clear rights: to be looked after at the airport, to choose between a refund and a new flight, and sometimes to fixed compensation. What you're entitled to depends mainly on where you're flying from, which airline you're flying with and why the flight was disrupted.",
    sections: [
      {
        heading: "First steps at the airport",
        paragraphs: [
          "Your priorities at the airport are getting to your destination and keeping evidence. Ask the airline what's happening and what it will offer, and use its app or phone line at the same time as queuing, because rebooking options go quickly.",
        ],
        bullets: [
          "Keep your boarding pass and booking confirmation",
          "Photograph the departures board showing the delay or cancellation",
          "Write down the reason the airline gives, and when it gives it",
          "Keep receipts for meals, transport and hotels",
          "Note the time you actually arrive at your final destination",
        ],
      },
      {
        heading: "Which rules apply to your flight",
        paragraphs: [
          "In the European Union, Regulation (EC) No 261/2004 covers flights departing from an EU airport on any airline, and flights arriving in the EU on an EU airline. The UK kept an equivalent set of rules after leaving the EU, explained by the UK Civil Aviation Authority. These are the rules people usually mean when they talk about flight delay compensation.",
          "In the United States, there's no fixed compensation for delays, but the U.S. Department of Transportation sets rules on refunds when an airline cancels or significantly changes a flight. Other countries have their own rules. Always check the official page for the country you're flying from.",
        ],
        bullets: [],
      },
      {
        heading: "Care, refunds and rebooking",
        paragraphs: [
          "Under the EU and UK rules, when a flight is delayed long enough, the airline must offer care while you wait: meals and refreshments, a way to communicate, and a hotel with transport if you have to stay overnight. If it doesn't provide this, keep reasonable receipts and claim the costs back.",
          "If your flight is cancelled, you can usually choose between a refund and being rerouted to your destination. Under the US rules, you're entitled to a refund if the airline cancels or significantly changes your flight and you decide not to travel. Don't accept a voucher unless you actually want one.",
        ],
        bullets: [],
      },
      {
        heading: "When you can claim compensation",
        paragraphs: [
          "Under the EU and UK rules, you may be entitled to a fixed amount of compensation if you arrive at your final destination several hours late or your flight is cancelled at short notice. The amount depends on the flight distance and how late you arrive, and the official EU and UK pages list the current thresholds.",
          "Compensation isn't due when the disruption was caused by extraordinary circumstances outside the airline's control, such as severe weather, air traffic control restrictions or security risks. Technical problems with the aircraft are usually the airline's responsibility, though, so don't take a vague explanation at face value.",
        ],
        bullets: [],
      },
      {
        heading: "How to make a claim",
        paragraphs: [
          "Claim directly with the airline first. Most airlines have an online claim form; include your booking reference, flight number, date, what happened and the receipts for any costs. Keep your claim factual and short.",
          "If the airline refuses or doesn't reply, you can escalate to the national enforcement body or an approved dispute resolution scheme, depending on the country. Claims companies can do this for you, but they take a share of any compensation, and you can often get the same result yourself.",
        ],
        bullets: [
          "Claim with the airline that operated the flight",
          "Include evidence of the delay and your arrival time",
          "Ask for the reason for the disruption in writing",
          "Escalate to the official body if the airline refuses",
        ],
      },
      {
        heading: "Package holidays and other transport",
        paragraphs: [
          "If your flight was part of a package holiday, you may have extra protection through the package organiser as well as the airline. Delays and cancellations on trains, buses and ferries are covered by separate passenger rights in the EU and UK, so check the rules for that mode of transport if your journey continues by land or sea.",
        ],
        bullets: [],
      },
      {
        heading: "Missed connections and separate tickets",
        paragraphs: [
          "If a delay makes you miss a connection on the same booking, your rights are usually based on your arrival time at your final destination. If you booked separate tickets, the second airline has no duty to help. Our guides to [missed connecting flights](/blog/missed-connecting-flight) and [self-transfer flights](/blog/self-transfer-flights) explain the difference, and our [travel insurance guide](/blog/travel-insurance-basics) covers what a policy can add.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "How late does a flight have to be for compensation?",
        answer:
          "Under the EU and UK rules, compensation depends on how late you arrive at your final destination and the flight distance. The official EU and UK Civil Aviation Authority pages list the current thresholds and amounts.",
      },
      {
        question: "Can I get compensation for a delay caused by bad weather?",
        answer:
          "Usually not. Severe weather counts as an extraordinary circumstance under the EU and UK rules. The airline must still look after you while you wait, and offer a refund or rerouting if the flight is cancelled.",
      },
      {
        question: "Do US airlines pay compensation for delays?",
        answer:
          "There's no general legal compensation for delays in the US. The Department of Transportation does require refunds when an airline cancels or significantly changes a flight and you choose not to travel.",
      },
      {
        question: "Should I use a flight compensation company?",
        answer:
          "You can, but they keep part of the money. Claiming directly with the airline and then escalating to the official body is free and often works just as well for straightforward cases.",
      },
    ],
    related: {
      guides: [
        "missed-connecting-flight",
        "self-transfer-flights",
        "travel-insurance-basics",
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
    slug: "lost-luggage-what-to-do",
    category: "practical",
    status: "published",
    publishAt: "2026-11-14",
    lastReviewed: "2026-11-09",
    photo: "airline-fees",
    title: "Lost luggage: what to do when your bag doesn't arrive",
    description:
      "Your checked bag didn't arrive? What to do before you leave the airport, how to claim for essentials, and what to do if a bag is damaged or lost for good.",
    headline: "Lost luggage: what to do when your bag doesn't arrive",
    intro:
      "Watching the baggage belt stop without your suitcase is one of the worst moments of a trip. The good news is that most delayed bags turn up within a few days, and airlines have a process for tracking them and covering what you need meanwhile. What you do in the next hour makes the rest much easier.",
    sections: [
      {
        heading: "Before you leave the baggage hall",
        paragraphs: [
          "Don't leave the airport without reporting the missing bag. Go to the airline's baggage service desk in the arrivals hall, which may be run by a handling agent, and file a report. You'll get a reference number that you'll need for tracking and any claim.",
        ],
        bullets: [
          "Have your bag tag receipt ready (usually stuck to your boarding pass)",
          "Describe the bag: colour, brand, size and anything distinctive",
          "Give an address and phone number where the bag can be delivered",
          "Ask what the airline covers while you wait, and get it in writing",
          "Keep a copy or photo of the report",
        ],
      },
      {
        heading: "Delayed, damaged or lost",
        paragraphs: [
          "Airlines treat three situations differently. A delayed bag is one that arrives later; most are found and delivered. A damaged bag arrived but was broken or its contents harmed. A lost bag is one the airline hasn't found after a set period, after which it's treated as lost and you can claim for the contents.",
          "For international flights, the airline's liability is mostly governed by the Montreal Convention, which sets maximum amounts and strict time limits for written claims. Deadlines for damaged and delayed bags are short, so report problems at the airport and check the exact limits on the official pages for your flight.",
        ],
        bullets: [],
      },
      {
        heading: "Buying essentials while you wait",
        paragraphs: [
          "If your bag is delayed, you can usually claim reasonable costs for essentials such as toiletries, a change of clothes and a phone charger. 'Reasonable' is the key word: buy what you need for the next day or two, not a new wardrobe, and keep every receipt.",
          "Check your travel insurance and the card you paid with as well. Many policies cover delayed baggage, sometimes after a minimum delay. Our [travel insurance guide](/blog/travel-insurance-basics) explains what to look for.",
        ],
        bullets: [],
      },
      {
        heading: "If your bag arrives damaged",
        paragraphs: [
          "Check your bag before you leave the baggage hall. If a wheel, handle or zip is broken, or the bag is wet or crushed, report it at the baggage desk straight away and ask for a damage report. Take photos of the bag and any damaged contents before you move anything.",
          "Airlines often exclude normal wear and tear, such as scuffs and small marks, and may not pay for fragile or valuable items packed in checked luggage. They usually offer a repair, a replacement or a payment based on the bag's age and value, so keep proof of what it cost if you can.",
        ],
        bullets: [
          "Report damage before you leave the airport if possible",
          "Photograph the bag, the tag and the damage",
          "Keep the damaged bag until the claim is settled",
        ],
      },
      {
        heading: "Separate tickets and connecting flights",
        paragraphs: [
          "When all your flights are on one booking, the last airline you flew with usually handles the report, even if another airline lost the bag. On separate tickets, report the problem to the airline you checked the bag in with for that leg, and keep the booking details for each flight.",
        ],
        bullets: [],
      },
      {
        heading: "Making a claim",
        paragraphs: [
          "Send your claim to the airline in writing, using its online form if it has one, and include the report reference, your booking details, receipts and a list of what's missing or damaged. For valuable items, proof of purchase helps.",
          "If the airline rejects your claim or doesn't reply, follow its complaints process and then escalate to the official complaints body or dispute resolution scheme for the country. The UK Civil Aviation Authority and the U.S. Department of Transportation both explain how to do this for flights they cover.",
        ],
        bullets: [],
      },
      {
        heading: "How to make lost luggage less likely",
        paragraphs: [
          "Most mishandled bags go wrong at connections, especially short ones. Allow enough transfer time, and remember that on separate tickets you'll often have to collect and recheck your bag yourself. Our [layover time checker](/tools/layover-time-checker) helps you judge a safe connection.",
          "Remove old bag tags, put your name and contact details inside and outside the bag, and consider a tracker so you can tell the airline where the bag is. Keep anything you can't do without in your cabin bag; our [carry-on packing list](/blog/carry-on-packing-list) covers the essentials.",
        ],
        bullets: [
          "Take a photo of your bag and its contents before check-in",
          "Keep medicines, valuables and documents in your cabin bag",
          "Check the bag tag shows the right destination airport code",
        ],
      },
    ],
    faqs: [
      {
        question: "How long does an airline take to find a lost bag?",
        answer:
          "Most delayed bags are found and delivered within a few days. If the airline can't find a bag after a set period, it's treated as lost and you can claim for the contents. Ask the airline for its timeline.",
      },
      {
        question: "Can I claim for clothes I buy while my bag is delayed?",
        answer:
          "Usually yes, for reasonable essentials. Keep receipts and buy only what you need until the bag arrives. Your travel insurance may also cover delayed baggage, so check your policy.",
      },
      {
        question: "Is there a deadline for a damaged or delayed bag claim?",
        answer:
          "Yes, and it can be short. For international flights, the Montreal Convention sets time limits for written claims. Report the problem at the airport and check the limits on official pages straight away.",
      },
    ],
    related: {
      guides: [
        "carry-on-packing-list",
        "travel-insurance-basics",
        "flight-delay-compensation",
      ],
    },
    sources: [
      SOURCES.ukCaaBaggage,
      SOURCES.usDotAirConsumer,
      SOURCES.euAirRights,
    ],
  },
  {
    slug: "best-time-to-book-flights",
    category: "flights",
    status: "published",
    publishAt: "2026-11-21",
    lastReviewed: "2026-11-09",
    photo: "cheap-flights",
    title: "When is the best time to book flights?",
    description:
      "How far ahead to book flights, why the cheapest day to book is a myth, and how to time your booking for holidays, long-haul and short-haul trips.",
    headline: "When is the best time to book flights?",
    intro:
      "There's no magic day or hour when flights become cheap. Airline prices move with demand: as seats sell, cheaper fare levels close and the price goes up, and occasionally an airline releases a sale. What you can control is how early you start looking, how flexible you are, and when you stop waiting and book.",
    sections: [
      {
        heading: "Why fares change",
        paragraphs: [
          "Airlines sell the same seat at different prices, in fare levels with different rules. When the cheapest level sells out, the next one becomes the lowest price you can buy. This is why prices often rise as the departure date approaches, and why popular dates rise fastest. Our guide to [how airline pricing works](/blog/how-airline-pricing-works) explains this in more detail.",
          "Fares can also drop when demand is weaker than the airline expected, or when it runs a promotion. That's why it's worth watching prices for a while before you book, rather than buying the first fare you see.",
        ],
        bullets: [],
      },
      {
        heading: "How far ahead to book",
        paragraphs: [
          "As a rule of thumb, start looking a few months before short-haul trips and earlier for long-haul and peak-season travel. Booking very late is a gamble: last-minute bargains exist, but on busy routes the cheaper seats are usually gone.",
          "The busier your dates, the earlier you should book. School holidays, Christmas and New Year, big local festivals and long weekends fill up early. If your dates are fixed, our guide to [planning a trip on a budget](/blog/how-to-plan-a-trip-on-a-budget) shows where else you can save.",
        ],
        bullets: [
          "Short-haul, off-peak: watch prices a couple of months ahead",
          "Long-haul: start looking several months ahead",
          "Peak holidays and festivals: book as early as your plans allow",
          "Flexible last-minute trips: compare several dates and destinations",
        ],
      },
      {
        heading: "The cheapest day to book is a myth",
        paragraphs: [
          "You'll often read that a particular weekday is the cheapest day to buy a ticket. Airlines change prices constantly with automated systems, so any such pattern is weak and inconsistent. Which day you fly matters much more than which day you buy: midweek flights are often cheaper than Fridays and Sundays on leisure routes.",
          "Clearing your cookies or searching in a private window won't reliably lower prices either. If the price goes up between two searches, it's most likely because seats sold.",
        ],
        bullets: [],
      },
      {
        heading: "Flexibility beats timing",
        paragraphs: [
          "Being flexible about when and where you fly usually saves more than timing your purchase. A flight a day earlier or later, a different departure time, or a nearby airport can be much cheaper than your first choice. Use a flight search's calendar or flexible dates view to see a whole week or month at once.",
          "Be flexible about the length of the trip too. Changing a seven-night trip to six or eight nights can move you onto cheaper outbound and return days. Our [how many days tool](/tools/how-many-days) helps you decide how much time a destination really needs, and our guide on [how to find cheap flights](/blog/how-to-find-cheap-flights) covers the full search method.",
        ],
        bullets: [
          "Compare midweek and weekend departures",
          "Try early-morning and late-evening flights",
          "Check nearby airports at both ends",
          "Compare one return ticket with two one-way tickets",
        ],
      },
      {
        heading: "When to stop waiting",
        paragraphs: [
          "Waiting for a perfect price can cost money. If you've watched a route for a while and the fare is close to the lowest you've seen, book it, especially for peak dates. The chance of saving a little more rarely outweighs the risk of the cheaper seats selling out.",
        ],
        bullets: [],
      },
      {
        heading: "Using price alerts",
        paragraphs: [
          "Price alerts on flight search sites are the easiest way to watch a route without checking every day. Set alerts for your preferred dates and a few alternatives, and decide in advance what price you'd be happy to pay. When the fare reaches it, book rather than waiting for a further drop.",
          "Compare the full cost when the alert fires: bags, seat selection and airport transfers can turn a cheap fare into an expensive one. Our [baggage fee calculator](/tools/baggage-fee-calculator) and [trip budget calculator](/tools/trip-budget-calculator) help you see the whole cost.",
        ],
        bullets: [],
      },
      {
        heading: "Book with a safety net",
        paragraphs: [
          "If you're not sure about your dates, look at fares that allow changes, or use a free hold if your airline offers one. For flights to and from the United States, US rules require airlines to let you either hold a reservation without payment or cancel without penalty within 24 hours of booking, as long as you book at least a week before departure.",
          "Read the fare rules before paying, and check that the price shown includes all compulsory taxes and charges. In the EU, airlines must show the final price including these from the start of the booking.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "How many months in advance should I book a flight?",
        answer:
          "Start looking a few months ahead for short-haul trips and several months ahead for long-haul or peak-season travel. Set price alerts and book when the fare reaches a price you're happy with.",
      },
      {
        question: "Is Tuesday the cheapest day to book flights?",
        answer:
          "Not reliably. Airlines change prices constantly, so there's no consistent cheapest day to buy. The day you fly makes a bigger difference, and midweek flights are often cheaper on leisure routes.",
      },
      {
        question: "Do flights get cheaper closer to the date?",
        answer:
          "Sometimes, but usually not on busy routes. As cheaper seats sell out, the lowest available price tends to rise. Last-minute deals are more likely on quieter routes and dates.",
      },
    ],
    related: {
      guides: [
        "how-to-find-cheap-flights",
        "how-airline-pricing-works",
        "cheap-flight-tips",
      ],
    },
    sources: [SOURCES.usDot24Hour, SOURCES.eu1008, SOURCES.usDotAirConsumer],
  },
  {
    slug: "airport-security-tips",
    category: "practical",
    status: "published",
    publishAt: "2026-11-28",
    lastReviewed: "2026-11-09",
    photo: "carry-on",
    title: "Airport security tips: get through faster, stress-free",
    description:
      "How to get through airport security faster: packing liquids and electronics, what to wear, common mistakes and how rules differ between airports.",
    headline: "Airport security tips: get through faster",
    intro:
      "Security is the part of the airport you have least control over, but most delays there are avoidable. Bags get pulled aside for the same few reasons again and again. Pack with screening in mind, check your departure airport's rules before you go, and you'll spend far less time in the queue.",
    sections: [
      {
        heading: "Check the rules for your airport",
        paragraphs: [
          "Security rules aren't the same everywhere. Some airports have new scanners that let you leave liquids and laptops in your bag, while others still ask you to take them out. Limits on liquids can differ between airports in the same country, and they change as equipment is upgraded.",
          "Check your departure airport's website before you pack, as well as official guidance such as the TSA's 'What can I bring?' tool for US airports and GOV.UK's hand luggage page for the UK. For your return flight, check the rules at that airport too, because they may be stricter.",
        ],
        bullets: [],
      },
      {
        heading: "Pack your cabin bag for screening",
        paragraphs: [
          "Pack so that anything you might need to take out is on top. Put liquids in a clear resealable bag and keep it in an outside pocket. Keep laptops and large electronics where you can slide them out without unpacking.",
        ],
        bullets: [
          "Liquids, gels and aerosols in a clear bag, in containers within the allowed size",
          "Laptops and tablets easy to reach",
          "Cables and chargers in one pouch, not loose",
          "No sharp items or tools in your cabin bag",
          "Spare batteries and power banks in your cabin bag, as airlines require",
        ],
      },
      {
        heading: "Dress for the scanner",
        paragraphs: [
          "Wear shoes that are easy to slip off and avoid belts with big buckles, heavy jewellery and clothes with lots of metal. Put your phone, keys, wallet and coins in your jacket or bag before you reach the tray rather than emptying pockets at the belt.",
          "Keep your boarding pass and passport in your hand or an easy pocket. You'll often need them right before the scanners, and again at the gate. Once your tray comes out of the scanner, move it to the bench after the belt before you put your shoes, belt and laptop back, so the people behind you aren't held up and you don't leave anything behind. Check the trays one last time for your phone, passport and liquids bag before you walk away.",
        ],
        bullets: [],
      },
      {
        heading: "Common reasons bags get searched",
        paragraphs: [
          "A bag search isn't an accusation, but it does take time. The most frequent causes are liquids forgotten in a pocket, oversized containers, food that looks dense on the scanner, and cluttered bags where the screener can't see what's inside.",
          "Medicines, baby food and special dietary items are usually allowed in larger quantities, but you may need to declare them. Carry prescriptions in their original packaging. Our guide to [flying with kids](/blog/flying-with-kids) covers baby milk and food.",
        ],
        bullets: [],
      },
      {
        heading: "Food, gifts and duty-free",
        paragraphs: [
          "Solid food is usually fine in your cabin bag, but soft and spreadable foods such as jam, yoghurt, cheese spreads and sauces often count as liquids. Gifts are best left unwrapped, because screeners may need to look inside.",
          "Duty-free liquids bought after security are normally sealed in a special bag with the receipt. If you have a connection, keep the bag sealed until your final destination, because you may go through security again and the rules at the next airport can be different.",
        ],
        bullets: [
          "Pack soft cheeses, honey and sauces in checked luggage",
          "Leave gifts unwrapped until you arrive",
          "Keep duty-free sealed with the receipt visible",
        ],
      },
      {
        heading: "Travelling with children or extra needs",
        paragraphs: [
          "Families can often use a dedicated lane, and children's food, milk and medicines are usually allowed in larger quantities. If you or someone you're travelling with has a disability or medical condition, contact the airline or airport before you fly: many airports offer special assistance that can help you through security more easily.",
        ],
        bullets: [],
      },
      {
        heading: "Timing and fast-track options",
        paragraphs: [
          "Arrive with enough time for check-in, bag drop and security, especially early mornings and holiday weekends when queues are longest. Many airports publish typical waiting times or advise how early to arrive.",
          "Some airports sell fast-track security, and some countries have trusted traveller programmes that speed up screening for approved passengers. They can be worth it for frequent travellers or tight schedules, but they're rarely needed if you arrive in good time.",
        ],
        bullets: [],
      },
      {
        heading: "After security",
        paragraphs: [
          "Fill your empty water bottle, check your gate and find out how long it takes to walk there, as gates at big airports can be a long walk away. If you have a connection, our [layover time checker](/tools/layover-time-checker) shows whether you're likely to need to go through security again. For what to pack in the first place, see our [carry-on packing list](/blog/carry-on-packing-list).",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "Do I still need to take liquids out at airport security?",
        answer:
          "It depends on the airport. Some airports with newer scanners let you leave liquids in your bag, while others still require a separate clear bag. Check your departure airport's website before you travel.",
      },
      {
        question: "Can I take a power bank through airport security?",
        answer:
          "Usually yes, in your cabin bag but not in checked luggage. Airlines set limits on battery size and number, so check your airline's rules and official guidance before you fly.",
      },
      {
        question: "How early should I get to the airport for security?",
        answer:
          "Follow your airline and airport's advice, and allow more time at busy times like early mornings and holidays. International flights usually need more time than domestic ones.",
      },
    ],
    related: {
      guides: [
        "carry-on-packing-list",
        "flying-with-kids",
        "travel-hacks-that-work",
      ],
    },
    sources: [
      SOURCES.tsaWhatCanIBring,
      SOURCES.ukHandLuggage,
      SOURCES.iataTravelers,
    ],
  },
];
