import { type GuideSchema } from "@/content/schema";
import { SOURCES } from "@/content/data/sources";
import { type z } from "zod";

type PostInput = z.input<typeof GuideSchema>;

/**
 * Second travel hacks batch (November-December 2026): phones abroad,
 * passport validity, scams, medicines and long-haul comfort. Entry rules,
 * medicine rules and health advice are described in general terms only;
 * the specifics come from the official sources listed on each post.
 * Health posts point readers to a doctor or pharmacist for personal advice.
 */
export const hackPostsTwo: PostInput[] = [
  {
    slug: "using-your-phone-abroad",
    category: "practical",
    status: "published",
    publishAt: "2026-11-09",
    lastReviewed: "2026-11-09",
    photo: "airport-to-city",
    title: "Using your phone abroad: eSIM, roaming or local SIM?",
    description:
      "How to use your phone abroad without a surprise bill: roaming plans, travel eSIMs and local SIM cards compared, plus simple settings that save data.",
    headline: "Using your phone abroad: eSIM, roaming or local SIM?",
    intro:
      "Your phone is your map, translator, boarding pass and lifeline when you travel, so arriving without data is no fun. Coming home to a huge bill is worse. There are three main ways to stay connected abroad, and the best one depends on where you're going, how long you're staying and how much data you use. Here's how to choose, and how to avoid the classic roaming mistakes.",
    sections: [
      {
        heading: "Option 1: your normal plan with roaming",
        paragraphs: [
          "The simplest option is to keep using your own SIM. Some plans include roaming in certain countries, while others charge a daily fee or a price per megabyte. Within the European Union, 'roam like at home' rules mean many EU customers can use their domestic allowance in other EU countries, subject to fair-use limits set out on the EU's official roaming page.",
          "Outside those arrangements, roaming can be expensive. Before you go, check exactly what your provider charges in your destination, whether there's a daily pass, and whether roaming is switched on for your line. The U.S. Federal Communications Commission advises asking your carrier about international rates and how to track your usage.",
        ],
        bullets: [],
      },
      {
        heading: "Option 2: a travel eSIM",
        paragraphs: [
          "An eSIM is a digital SIM you install by scanning a QR code or through an app, without swapping a physical card. Travel eSIMs sell data packages for one country or a whole region, and you can buy and install one before you leave, so you have data the moment you land.",
          "Your phone needs to support eSIM and be unlocked, meaning it isn't tied to one network. Most travel eSIMs are data only, so you keep your normal number on your physical SIM for texts such as bank codes, while using the eSIM for maps, messaging apps and browsing.",
        ],
        bullets: [
          "Check that your phone supports eSIM and is unlocked",
          "Install the eSIM at home on Wi-Fi, but activate it on arrival if the plan says so",
          "Choose a package with a little more data than you think you need",
          "Keep your main SIM on for texts, with data roaming switched off",
        ],
      },
      {
        heading: "Option 3: a local SIM card",
        paragraphs: [
          "Buying a SIM card from a local network after you arrive often gives the most data for the money, especially on longer trips. You'll usually find them at airport kiosks, phone shops and some convenience stores. Many countries require you to show your passport to register a SIM.",
          "The downsides are the time it takes to buy one, a new phone number, and the risk of losing your home SIM card. Keep it somewhere safe, such as taped inside your passport cover or in the SIM tray holder some phone cases include.",
        ],
        bullets: [],
      },
      {
        heading: "Which option suits your trip",
        paragraphs: [
          "For a short trip where your plan includes roaming, staying on your own plan is usually easiest. For a week or two in one country or region without included roaming, a travel eSIM is often the best balance of cost and convenience. For long stays, heavy data use or a trip where you need a local number, a local SIM tends to win.",
          "Whatever you choose, download offline maps, translation packs and your boarding passes before you leave home, so you're not stuck if your connection takes a while to start working.",
        ],
        bullets: [],
      },
      {
        heading: "Settings that prevent bill shock",
        paragraphs: [
          "Most roaming horror stories come from apps quietly using data in the background. Before you board, check your phone's mobile data settings so that only the SIM or eSIM you want is used for data.",
        ],
        bullets: [
          "Turn off data roaming on any SIM you don't want to use for data",
          "Stop automatic app updates and photo backups over mobile data",
          "Use Wi-Fi for video calls and large downloads",
          "Set a data usage warning in your phone's settings",
          "Check whether your voicemail charges for calls you don't answer",
        ],
      },
      {
        heading: "Staying safe on public Wi-Fi",
        paragraphs: [
          "Free Wi-Fi in airports, hotels and cafés is useful, but treat it as public. Avoid logging in to banking or entering card details on an open network, and make sure the network name is the venue's real one rather than a lookalike. Keep your phone's software up to date before you travel.",
          "For more ways to make the trip easier, see our [travel hacks that actually work](/blog/travel-hacks-that-work), and plan your days with our [AI trip planner](/travel-planner) so you know where you'll need data most.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "Is an eSIM cheaper than roaming?",
        answer:
          "Often, but not always. If your plan already includes roaming in your destination, it may cost nothing extra. Where roaming isn't included, a travel eSIM data package is usually much cheaper than paying per day or per megabyte.",
      },
      {
        question: "Will I keep my phone number with a travel eSIM?",
        answer:
          "Yes, if you keep your normal SIM active. Most travel eSIMs are data only, so your own SIM still receives calls and texts, such as bank security codes. Switch off data roaming on it so it doesn't use data.",
      },
      {
        question: "Can I use my phone for free in other EU countries?",
        answer:
          "Many EU customers can use their domestic allowance when travelling in other EU countries under the 'roam like at home' rules, with fair-use limits. Check the EU's official roaming page and your provider's terms before you go.",
      },
    ],
    related: {
      guides: ["travel-hacks-that-work", "carry-on-packing-list"],
    },
    sources: [SOURCES.euRoaming, SOURCES.fccRoaming, SOURCES.fccCyberTravel],
  },
  {
    slug: "passport-validity-rules",
    category: "practical",
    status: "published",
    publishAt: "2026-11-16",
    lastReviewed: "2026-11-09",
    photo: "documents",
    title: "How long must your passport be valid to travel?",
    description:
      "Why airlines turn away travellers with passports that haven't expired yet: validity rules, blank pages and damage, and how to check before you book.",
    headline: "How long must your passport be valid to travel?",
    intro:
      "Every year, travellers are refused boarding with a passport that hasn't expired. The reason is that many countries want your passport to stay valid for some time after you arrive or leave, and some care about when it was issued as well. The rules vary by destination and by the passport you hold, so the only safe approach is to check the official entry requirements for your trip before you book.",
    sections: [
      {
        heading: "Why 'not expired' isn't enough",
        paragraphs: [
          "Many countries set a minimum period of validity: your passport must remain valid for a certain number of months beyond your arrival date or your planned departure date. A passport that expires a few weeks after your trip can therefore be refused, even though it's technically valid on the day you fly.",
          "Airlines check this at check-in because they can be fined and made to fly you home if you're refused entry. That means the decision often happens at your departure airport, not at the border.",
        ],
        bullets: [],
      },
      {
        heading: "The rules you might need to meet",
        paragraphs: [
          "Entry rules differ, but they usually involve one or more of the conditions below. Some destinations, such as the Schengen area in Europe, have separate conditions about how long the passport remains valid after you leave and how long ago it was issued. The UK government's entry requirements pages, for example, set out what UK passport holders need for each country.",
        ],
        bullets: [
          "A minimum number of months' validity after arrival or departure",
          "A maximum age for the passport, counted from its date of issue",
          "One or more blank pages for entry and exit stamps",
          "A passport in good condition, without damage to the photo page",
          "A visa, eVisa or travel authorisation, depending on your nationality",
        ],
      },
      {
        heading: "How to check your passport",
        paragraphs: [
          "Look up the entry requirements for your destination on your own government's official travel advice pages, or the destination's official immigration website. Check them for every country you'll enter, including transit countries if you'll pass through immigration on a connection.",
          "Then compare the dates in your passport with your actual trip dates. Note the date of issue as well as the expiry date, count your blank pages, and check whether any part of the passport is damaged, such as water marks, tears or a loose photo page. Our [travel documents checklist](/blog/travel-documents-checklist) covers everything else to take.",
        ],
        bullets: [
          "Check the rules for every country you'll enter, including transit stops",
          "Compare the issue and expiry dates with your trip dates",
          "Count the blank pages",
          "Look for damage on the photo page and cover",
        ],
      },
      {
        heading: "When to renew",
        paragraphs: [
          "If your passport is close to the limit for any trip you're planning, renew it before you book flights. Processing times vary through the year and are often longest before the summer holidays, so leave plenty of time. Most governments publish current processing times and offer faster services at extra cost.",
          "Remember that your flight booking normally needs to match the name on your passport exactly. If you renew and your name changes, update your bookings, and check our guide to [proof of onward travel](/blog/proof-of-onward-travel) if your destination asks for a return or onward ticket.",
        ],
        bullets: [],
      },
      {
        heading: "Lost, stolen or damaged passports",
        paragraphs: [
          "If your passport is lost or stolen before a trip, report it straight away; a reported passport is cancelled and can't be used for travel even if you find it later. Apply for a replacement as early as you can and check whether an urgent service is available.",
          "If it's lost abroad, contact your country's embassy or consulate, which can usually issue an emergency travel document to get you home. Keep a photo or copy of your passport's photo page somewhere separate from the passport itself, as it speeds up the process.",
        ],
        bullets: [
          "Keep a copy of the photo page in your email or cloud storage",
          "Report a lost or stolen passport immediately",
          "Allow extra time if you need a replacement before travelling",
        ],
      },
      {
        heading: "Children's passports",
        paragraphs: [
          "Children's passports are often valid for a shorter period than adults', so they reach the limit sooner. Check every family member's passport, not just your own, before you book. Our guide to [flying with kids](/blog/flying-with-kids) covers other documents families may need, such as consent letters when a child travels with one parent.",
        ],
        bullets: [],
      },
      {
        heading: "Visas and travel authorisations",
        paragraphs: [
          "A valid passport is only part of the picture. Many destinations also need a visa or an electronic travel authorisation, applied for before you travel, and some apply passport validity rules to those applications too. Europe is introducing new digital border systems, which the EU explains on its official travel website.",
          "If you need a visa, our guide to [flight reservations for visa applications](/blog/dummy-ticket-for-visa) explains how to show a flight booking safely.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "Can I travel if my passport expires in three months?",
        answer:
          "It depends on your destination and your nationality. Many countries require several months of validity beyond your arrival or departure date. Check the official entry requirements for every country on your route before you book.",
      },
      {
        question: "Why does the date my passport was issued matter?",
        answer:
          "Some destinations, including the Schengen area for some passport holders, set a limit on how long ago the passport was issued, as well as on its expiry date. Older renewed passports can fall foul of this rule.",
      },
      {
        question:
          "Can an airline refuse to let me board with a valid passport?",
        answer:
          "Yes. Airlines check entry requirements at check-in and can refuse boarding if your passport doesn't meet the destination's rules on validity, blank pages or condition, even if it hasn't expired.",
      },
    ],
    related: {
      guides: [
        "travel-documents-checklist",
        "proof-of-onward-travel",
        "dummy-ticket-for-visa",
      ],
    },
    sources: [
      SOURCES.govUkFranceEntry,
      SOURCES.govUkRenewPassport,
      SOURCES.euEntry,
      SOURCES.usTravel,
    ],
  },
  {
    slug: "travel-scams-to-avoid",
    category: "practical",
    status: "published",
    publishAt: "2026-11-23",
    lastReviewed: "2026-11-09",
    photo: "solo-travel",
    title: "Common travel scams and how to avoid them",
    description:
      "The travel scams to watch for, from fake booking sites and rental listings to taxi tricks and card skimming, with simple habits that keep you safe.",
    headline: "Common travel scams and how to avoid them",
    intro:
      "Most trips go without a hitch, but travellers are an easy target: you're in an unfamiliar place, often tired, and keen not to make a fuss. Scams start long before you leave, too, with fake websites and too-good-to-be-true deals. The good news is that most of them follow a few familiar patterns, and a handful of habits will protect you from nearly all of them.",
    sections: [
      {
        heading: "Scams before you travel",
        paragraphs: [
          "The costliest scams happen at the booking stage. Fake travel agencies and lookalike airline websites take payment for tickets that don't exist. Copied holiday rental listings take a deposit for a flat the 'owner' doesn't own. Prize calls and messages offer a free holiday that turns out to need fees up front.",
          "Unofficial visa and travel authorisation websites are another trap: they look official, charge large fees and sometimes never submit your application. Always apply through the official government site, which our [travel documents checklist](/blog/travel-documents-checklist) links to.",
        ],
        bullets: [
          "Book flights directly with the airline or a well-known agency",
          "Type website addresses yourself rather than following ads or messages",
          "Never pay for a rental by bank transfer, gift card or crypto",
          "Search the company name with words like 'scam' or 'reviews'",
          "Pay by credit card where possible for extra protection",
        ],
      },
      {
        heading: "At the airport and on arrival",
        paragraphs: [
          "Unlicensed taxi drivers in arrivals halls often charge far more than the official rate. Use the official taxi rank, a ride-hailing app or public transport, and agree the price or check the meter before you set off. Our guide to [getting from the airport to the city](/blog/airport-to-city-paris-rome-tokyo-lisbon) covers official options for several big cities.",
          "Be wary of strangers who offer to help with ticket machines or luggage and then demand payment, and of people claiming your hotel is closed or full and offering to take you somewhere else.",
        ],
        bullets: [],
      },
      {
        heading: "Money and card tricks",
        paragraphs: [
          "Use cash machines inside banks where you can, cover your PIN, and look for anything attached to the card slot. If a card machine or cash machine offers to charge you in your home currency, choose the local currency instead; the conversion is often expensive.",
          "Count your change, especially with unfamiliar notes, and be careful with anyone who wants to 'check' your money or swap notes. Keep a backup card separate from your main one so a lost wallet doesn't end your trip.",
        ],
        bullets: [],
      },
      {
        heading: "Street scams and distractions",
        paragraphs: [
          "Many street scams are about distraction: someone spills something on you, asks you to sign a petition, or ties a 'free' bracelet on your wrist, while an accomplice goes for your bag. Others sell fake tickets to attractions or lead you to an overpriced bar or shop.",
          "A firm 'no, thank you' and keeping walking is enough in almost every case. Keep your phone and wallet in front pockets or a zipped bag, especially on crowded public transport and in busy tourist spots.",
        ],
        bullets: [
          "Buy attraction tickets from the official website or ticket office",
          "Be wary of unsolicited help, gifts or petitions",
          "Keep valuables zipped away in crowds",
          "Check a restaurant's prices before you sit down",
        ],
      },
      {
        heading: "Staying safe online while you travel",
        paragraphs: [
          "Public Wi-Fi networks can be copied by fake hotspots with similar names. Avoid banking on open networks, and use your mobile data or a trusted connection for anything sensitive. The U.S. Federal Communications Commission publishes simple cybersecurity tips for travellers.",
          "Be careful with messages claiming to be from your airline or hotel, especially ones that ask you to pay again or confirm card details. Contact the company using the details on its official website or app instead. Our guide to [using your phone abroad](/blog/using-your-phone-abroad) covers safe connections.",
        ],
        bullets: [],
      },
      {
        heading: "Scams aimed at people who are renting",
        paragraphs: [
          "Holiday rental scams often use real photos copied from genuine listings. Book through a reputable platform and keep all messages and payments on it; a host who asks you to pay outside the platform, or who offers a discount for a bank transfer, is a warning sign. Check the address on a map and street view, and be cautious of listings with very few reviews and an unusually low price.",
        ],
        bullets: [],
      },
      {
        heading: "If you're scammed",
        paragraphs: [
          "Contact your bank or card provider straight away to stop further payments; card payments may be recoverable. Report the theft or fraud to the local police and keep the report, which your insurer will usually ask for. Our guide to [travel insurance](/blog/travel-insurance-basics) explains what a policy may cover.",
          "If your passport is stolen, contact your country's embassy or consulate. Official travel advice from your government, such as the UK's foreign travel advice pages, also lists common scams in each country.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "How can I tell if a travel website is a scam?",
        answer:
          "Check the web address carefully, look for independent reviews and complaints, and be suspicious of prices far below other sites. Avoid sites that only accept bank transfers, gift cards or cryptocurrency, and book with the airline directly when unsure.",
      },
      {
        question: "What are the most common tourist scams?",
        answer:
          "Unlicensed taxis, fake attraction tickets, distraction thefts in crowds, unwanted 'help' followed by a demand for money, and card machine tricks are among the most common. Official travel advice pages list the scams reported in each country.",
      },
      {
        question: "What should I do if I'm scammed abroad?",
        answer:
          "Call your bank to block your cards and dispute payments, report the crime to local police and keep the report for your insurer. If your passport was taken, contact your embassy or consulate for help.",
      },
    ],
    related: {
      guides: [
        "travel-documents-checklist",
        "travel-insurance-basics",
        "using-your-phone-abroad",
      ],
    },
    sources: [SOURCES.ukAdviceIndex, SOURCES.usTravel, SOURCES.fccCyberTravel],
  },
  {
    slug: "travelling-with-medication",
    category: "practical",
    status: "published",
    publishAt: "2026-11-30",
    lastReviewed: "2026-11-09",
    photo: "insurance",
    title: "Travelling with medication: what to know before you fly",
    description:
      "How to travel with prescription medicines: packing them in your cabin bag, documents to carry, airport security, controlled drugs and rules abroad.",
    headline: "Travelling with medication: what to know before you fly",
    intro:
      "If you take regular medicine, a little planning makes sure you have what you need for the whole trip and don't run into trouble at airport security or at the border. The main points are simple: carry enough, keep it in your cabin bag, bring the right paperwork, and check whether your destination restricts any of your medicines. This guide gives general information only, so ask your doctor or pharmacist about your own medicines.",
    sections: [
      {
        heading: "Plan ahead with your doctor or pharmacist",
        paragraphs: [
          "Speak to your doctor or pharmacist well before you travel, especially for long trips, travel across many time zones or if you need injections or refrigerated medicines. They can help you plan enough supply and how to adjust timings when the clock changes. The NHS travel health guidance recommends allowing plenty of time to prepare.",
          "Take enough medicine for the whole trip plus a few extra days in case of delays. If you need a large supply, ask how much can be prescribed at once, as there may be limits.",
        ],
        bullets: [],
      },
      {
        heading: "Pack it in your cabin bag",
        paragraphs: [
          "Keep your medicines in your hand luggage so they're with you if your checked bag is delayed or lost. Many travellers also pack a small spare supply in their checked bag in case the cabin bag goes missing. Our guide to [lost luggage](/blog/lost-luggage-what-to-do) explains why this matters.",
          "Leave tablets in their original pharmacy packaging with the label showing your name, so security and border officers can see what they are and who they belong to.",
        ],
        bullets: [
          "Medicines in original, labelled packaging",
          "A copy of your prescription",
          "A letter from your doctor for injections, devices or large quantities",
          "A list of your medicines with their generic names",
          "A cool bag for medicines that must be kept cold, if needed",
        ],
      },
      {
        heading: "Airport security",
        paragraphs: [
          "Liquid medicines are usually allowed through security in larger amounts than the normal liquid limit, but you'll often need to show them separately and may be asked for proof that you need them. In the US, the TSA asks travellers to tell the officer at the start of screening about medically necessary liquids.",
          "Rules differ between countries and airports, so check your departure airport's guidance before you go. Our [airport security tips](/blog/airport-security-tips) cover what else to expect.",
        ],
        bullets: [],
      },
      {
        heading: "Medicines that are restricted abroad",
        paragraphs: [
          "Some medicines that are available normally at home, including some over-the-counter products, are controlled or banned in other countries. You may need a licence or permission to bring them in, or only be allowed a limited quantity. Check with the embassy of each country you'll visit, and your government's travel advice, before you travel.",
          "Some medicines are also controlled when you leave your own country. In the UK, for example, travellers may need a personal licence to carry larger quantities of certain controlled drugs, as GOV.UK explains.",
        ],
        bullets: [],
      },
      {
        heading: "Time zones, heat and storage",
        paragraphs: [
          "Crossing time zones can make it confusing to take medicines on schedule. Ask your doctor or pharmacist how to adjust, especially for time-sensitive medicines. Our guide to [beating jet lag](/blog/how-to-beat-jet-lag) covers adapting to the new time zone.",
          "Some medicines need to be kept below a certain temperature. Don't leave them in a hot car or in direct sun, and check whether your accommodation has a fridge if you need one. Insulated travel cases can help on the journey.",
        ],
        bullets: [],
      },
      {
        heading: "Medical devices and equipment",
        paragraphs: [
          "If you use medical devices such as insulin pumps, glucose monitors, inhalers, CPAP machines or EpiPens, carry them in your cabin bag along with a doctor's letter explaining what they are. Ask the airline in advance about using any powered device on board, and check whether you need a specific battery type or a spare.",
          "Tell security staff about devices that shouldn't go through the X-ray machine or body scanner; many airports offer an alternative check. Many airports also offer special assistance if you need extra help getting through the airport.",
        ],
        bullets: [
          "Carry a doctor's letter for devices and sharps",
          "Contact the airline before flying with powered medical equipment",
          "Bring spare batteries and supplies in your cabin bag",
        ],
      },
      {
        heading: "If you run out or lose your medicines",
        paragraphs: [
          "Medicines may have a different brand name abroad, so carrying a list with generic names makes it easier for a local pharmacist or doctor to help. Your travel insurance may cover emergency medical costs and replacement prescriptions; our [travel insurance guide](/blog/travel-insurance-basics) explains what to check.",
          "Avoid buying medicines from unofficial sellers, which may be fake or unsafe. A local pharmacy, doctor or your insurer's assistance line is the safest route.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "Can I take my prescription medicine on a plane?",
        answer:
          "Usually yes. Keep it in your cabin bag in its original labelled packaging with a copy of the prescription. Liquid medicines are often allowed above the normal liquid limit, but you may need to declare them at security.",
      },
      {
        question: "Do I need a doctor's letter to travel with medication?",
        answer:
          "It's not always required, but it helps, especially for injections, medical devices, large quantities or controlled medicines. Some countries require permission or a licence for certain medicines, so check before you travel.",
      },
      {
        question: "Are some medicines illegal in other countries?",
        answer:
          "Yes. Some medicines that are legal at home, including some over-the-counter ones, are restricted or banned elsewhere. Check with the embassy of each country you'll visit and your government's official travel advice.",
      },
    ],
    related: {
      guides: [
        "airport-security-tips",
        "travel-insurance-basics",
        "how-to-beat-jet-lag",
      ],
    },
    sources: [
      SOURCES.nhsMedicinesAbroad,
      SOURCES.govUkControlledDrugs,
      SOURCES.tsaMedication,
    ],
  },
  {
    slug: "long-haul-flight-tips",
    category: "practical",
    status: "published",
    publishAt: "2026-12-05",
    lastReviewed: "2026-11-09",
    photo: "jet-lag",
    title: "Long-haul flight tips: arrive rested, not wrecked",
    description:
      "How to survive a long-haul flight: choosing seats, what to pack, sleeping on the plane, staying comfortable and healthy, and arriving ready to go.",
    headline: "Long-haul flight tips: arrive rested, not wrecked",
    intro:
      "Ten or more hours in a plane seat is a challenge, but most of what makes a long-haul flight miserable can be planned for. The right seat, a small comfort kit, a sleep plan that fits your destination and some movement during the flight make a big difference. Here's how to arrive feeling as close to normal as possible.",
    sections: [
      {
        heading: "Before you book",
        paragraphs: [
          "Flight times matter on long routes. An overnight flight that lands in the morning can help you adjust to the new time zone, while a daytime flight can be easier if you struggle to sleep on planes. A direct flight is less tiring, but a well-timed stop can break up a very long journey; our guide to [layover time](/blog/how-much-layover-time-do-you-need) helps you judge a safe connection.",
          "Check what's included in your fare. Seat selection, meals and checked bags aren't always included, even on long flights. Our guide to [budget airline fees](/blog/budget-airline-fees-explained) explains what to look for.",
        ],
        bullets: [],
      },
      {
        heading: "Choosing a seat",
        paragraphs: [
          "Window seats are best for sleeping, because you can lean against the wall and no one climbs over you. Aisle seats are better if you like to get up often. Seats near the toilets and galleys are noisier and busier, and some seats in exit rows or at the front of a section have more legroom but fixed armrests or no floor storage.",
          "Choose your seat as early as your fare allows, and check the seat map on the airline's app; many airlines open more seats at online check-in.",
        ],
        bullets: [],
      },
      {
        heading: "What to pack in your cabin bag",
        paragraphs: [
          "A small, well-chosen kit in the seat pocket or under the seat makes long flights much more comfortable. Our [carry-on packing list](/blog/carry-on-packing-list) covers the essentials.",
        ],
        bullets: [
          "Layers, including a warm top and socks, as cabins can be cold",
          "An eye mask, earplugs or noise-cancelling headphones",
          "A refillable water bottle (filled after security)",
          "Lip balm, moisturiser and any medicines you need",
          "A charger or power bank, and downloaded films and books",
          "A pen for any arrival forms",
        ],
      },
      {
        heading: "Sleeping on the plane",
        paragraphs: [
          "Plan your sleep around your destination's time rather than your home time. If it'll be night when you're flying towards the morning there, try to sleep; if you'll land in the evening, stay awake for more of the flight so you're tired at bedtime. Set your watch to the destination's time zone when you board.",
          "Go easy on alcohol and caffeine, which both disturb sleep. Our guide to [beating jet lag](/blog/how-to-beat-jet-lag) explains how to adjust in the days before and after the flight.",
        ],
        bullets: [],
      },
      {
        heading: "Staying comfortable and healthy",
        paragraphs: [
          "Sitting still for a long time increases the risk of blood clots in the legs, known as deep vein thrombosis (DVT). Health bodies such as the NHS and the U.S. Centers for Disease Control and Prevention advise moving your legs regularly, walking around when you can and drinking enough water. If you have risk factors, such as a previous clot, recent surgery or pregnancy, talk to your doctor before you fly.",
          "Cabin air is dry, so drink water regularly and use moisturiser and eye drops if you need them. Stretch your neck, shoulders and ankles every hour or so, and get up to walk the aisle when the seatbelt sign is off.",
        ],
        bullets: [
          "Flex your ankles and calves while seated",
          "Walk the aisle every couple of hours when it's safe",
          "Drink water regularly and limit alcohol",
          "Wear loose, comfortable clothes",
        ],
      },
      {
        heading: "Eating and drinking on board",
        paragraphs: [
          "Airline meals are served on the airline's schedule, not yours, so bring a few snacks you like, such as nuts, fruit bars or crackers. Check your destination's rules on bringing food into the country, as fresh fruit, meat and dairy are often banned and must be eaten or thrown away before arrival.",
          "If you need a special meal, such as vegetarian, gluten-free or a child's meal, request it when you book or at least a couple of days before departure through the airline's website or app. Lighter meals and plenty of water tend to make long flights more comfortable than heavy food and alcohol.",
        ],
        bullets: [
          "Request special meals well before departure",
          "Pack dry snacks rather than fresh food",
          "Check the food rules at your destination",
        ],
      },
      {
        heading: "After you land",
        paragraphs: [
          "Get outside in daylight on your first day and try to stay awake until a normal local bedtime. Plan a gentle first day rather than a packed schedule; our [AI trip planner](/travel-planner) can build a lighter first day into your itinerary.",
          "Have your onward transport sorted before you land, so you're not making decisions while tired. Our guide to [getting from the airport to the city](/blog/airport-to-city-paris-rome-tokyo-lisbon) covers several big destinations.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "What is the best seat on a long-haul flight?",
        answer:
          "For sleeping, a window seat away from the toilets and galleys is usually best. If you like to stretch your legs often, an aisle seat is easier. Exit rows can offer more legroom but may have fixed armrests.",
      },
      {
        question: "How can I sleep better on a long flight?",
        answer:
          "Time your sleep to the destination's night, bring an eye mask and earplugs or headphones, wear warm layers and avoid alcohol and too much caffeine. A window seat helps you rest without being disturbed.",
      },
      {
        question: "How do I avoid blood clots on a long flight?",
        answer:
          "Move your legs regularly, walk around when you can and drink enough water. If you have risk factors such as a previous clot, recent surgery or pregnancy, ask your doctor for advice before you fly.",
      },
    ],
    related: {
      guides: [
        "how-to-beat-jet-lag",
        "carry-on-packing-list",
        "travelling-with-medication",
      ],
    },
    sources: [SOURCES.nhsDvt, SOURCES.cdcTravelClots, SOURCES.nhsJetLag],
  },
];
