import { type GuideSchema } from "@/content/schema";
import { SOURCES } from "@/content/data/sources";
import { type z } from "zod";

type PostInput = z.input<typeof GuideSchema>;

/**
 * Cabin bag cluster, written for "will my bag fit under the seat" searches.
 * The bag size checker page targets the calculator intent; these posts take
 * the questions around it and link back to the tool. No airline's size
 * limit is stated as fact: sizes are given as common examples only.
 */
export const bagPosts: PostInput[] = [
  {
    slug: "what-fits-under-the-seat",
    category: "practical",
    status: "published",
    publishAt: "2026-11-08",
    lastReviewed: "2026-11-08",
    photo: "flying-with-kids",
    title: "What fits under the seat? A personal item guide",
    description:
      "Will your bag fit under the seat in front of you? How under-seat limits work, which bags fit best, how to measure yours and what to do if it's close.",
    headline: "Will my bag fit under the seat? A guide to personal items",
    intro:
      "More fares now include only a small bag that goes under the seat in front of you, so the question of whether a bag will fit there matters more than it used to. The answer depends on two things: the size limit in your booking and the bag itself, measured the way the airline measures it. This guide explains both, and what to do when it's close.",
    sections: [
      {
        heading: "Start with the limit in your booking",
        paragraphs: [
          "There is no single under-seat size that every airline uses. Each airline publishes its own limit for the personal item, and some set different limits for different fares or routes. The only number that counts is the one for your booking, which you'll find in the baggage section of your confirmation, the airline's website or its app.",
          "Under-seat limits are usually given as three measurements, such as length, width and height. Common examples are around 40 × 30 × 20 cm or 45 × 36 × 20 cm, but treat these as illustrations, not rules: always copy the figures from your own airline. A few airlines also set a weight limit for the personal item, so check for one.",
          "Once you have the figures, our free [bag size checker](/tools/bag-size-checker) answers the 'will my bag fit' question directly. Enter the limit and your bag's measurements, and it shows whether the bag fits, which side is too big and by how much.",
        ],
        bullets: [],
      },
      {
        heading: "How to measure your bag properly",
        paragraphs: [
          "Most bags that are refused at the gate were measured empty, or measured from the shop label. A soft bag gets noticeably bigger once it's full, so pack it exactly as you'll travel and then measure it.",
          "Measure the longest point on each side, including anything that sticks out: wheels, feet, handles, zips and outside pockets. Stand the bag on the floor and measure to the top of the handle with the handle pushed down. If an outside pocket is stuffed, it counts.",
        ],
        bullets: [
          "Pack the bag first, then measure it",
          "Measure at the widest point of each side, not the middle",
          "Include wheels, handles, feet and full outside pockets",
          "Write the three numbers down so you can compare them with the limit",
        ],
      },
      {
        heading: "Turning the bag can make it fit",
        paragraphs: [
          "Airlines usually care whether the bag fits within the box, not which way round it goes. A bag that is too tall standing up may fit lying on its side. The simple test is to sort your bag's sides from longest to shortest and do the same for the limit: if each of the bag's sides is no bigger than the matching side of the limit, it can be turned to fit.",
          "The bag size checker does this sorting for you and tells you when a bag only fits once it's turned, so you know how to present it at a sizer.",
        ],
        bullets: [],
      },
      {
        heading: "Which bags fit under a seat best",
        paragraphs: [
          "Soft bags fit best because they squash slightly into the space. A soft backpack, tote or holdall with no rigid frame is easier to slide under a seat than a small hard-shell case, even when the measurements are the same.",
          "Look for a bag that's designed to the size you need rather than a larger bag you plan to underfill: an underfilled bag still has a frame, handles and pockets that take up room. Bags with a luggage sleeve are handy, but the sleeve shouldn't add to the depth.",
        ],
        bullets: [
          "Soft backpacks with compression straps",
          "Totes and shoulder bags without a rigid base",
          "Small holdalls or duffels that can be squeezed",
          "Laptop bags, if your laptop and essentials are all you need",
        ],
      },
      {
        heading: "The space under the seat isn't always the same",
        paragraphs: [
          "Even if your bag meets the airline's limit, the space under a particular seat varies with the aircraft. On some aircraft, equipment boxes for the seats take up part of the space under certain seats, so the room you get depends on where you sit.",
          "Some seats have no under-seat storage at all during take-off and landing. Bulkhead rows have no seat in front, and in exit rows the floor has to be kept clear, so bags in those rows usually go in the overhead locker. If you want your bag at your feet for the whole flight, avoid those rows when you choose a seat.",
          "Bags must also leave your feet room and not block the aisle, so a bag that technically fits but forces your legs into the aisle may still be moved by the crew.",
        ],
        bullets: [],
      },
      {
        heading: "What to pack in the bag that stays at your feet",
        paragraphs: [
          "The personal item is the bag that stays with you whatever happens. If a larger cabin bag has to go in the hold at the gate, the under-seat bag is still with you, so keep your essentials in it.",
          "Put your passport and travel documents, phone, wallet, keys, medication and any valuables in the personal item. Power banks and spare lithium batteries generally have to travel in the cabin, so keep them in the under-seat bag too. Our [carry-on packing list](/blog/carry-on-packing-list) has a full list for travelling light, and the [packing list generator](/tools/packing-list-generator) builds one for your trip length and weather.",
        ],
        bullets: [],
      },
      {
        heading: "If your bag is close to the limit",
        paragraphs: [
          "If the checker says your bag is a tight fit or slightly too big, you have a few options. You can repack into a softer or smaller bag, move a bulky item such as a jacket to wear on board, or take out a few things so the bag compresses. If the bag still won't fit, adding a cabin bag or checked bag when you book is usually cheaper than paying at the gate.",
          "To compare the cost of a fare with bags against a fare without, use our [baggage fee calculator](/tools/baggage-fee-calculator), and our guide to [budget airline fees](/blog/budget-airline-fees-explained) explains where the extra charges come from. If weight might be an issue, the [luggage weight calculator](/tools/luggage-weight-calculator) estimates what your packed bag will weigh.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "Will a backpack fit under an airplane seat?",
        answer:
          "Many small backpacks do, as long as they are within the personal item limit for your booking once packed. Soft backpacks without a rigid frame fit most easily. Measure it full and compare it with the limit in our bag size checker.",
      },
      {
        question: "Do wheels and handles count in the size of my bag?",
        answer:
          "Usually yes. Airlines generally measure the whole bag, including wheels, handles, feet and outside pockets. Measure to the outermost point on each side so that the numbers match what a sizer at the gate will show.",
      },
      {
        question: "Is the space under every seat the same size?",
        answer:
          "No. It depends on the aircraft and the seat. Equipment can take up some of the space under certain seats, and bulkhead and exit rows usually have no under-seat storage during take-off and landing, so bags go overhead.",
      },
      {
        question: "What happens if my personal item is too big?",
        answer:
          "Policies differ, but an oversized personal item may have to be paid for as a cabin bag or checked into the hold, often for a higher fee at the gate than at booking. Check your bag before you travel to avoid surprises.",
      },
    ],
    related: {
      destinations: [],
      itineraries: [],
      guides: [
        "personal-item-vs-carry-on",
        "carry-on-too-big-at-the-gate",
        "carry-on-packing-list",
        "budget-airline-fees-explained",
      ],
    },
    sources: [
      SOURCES.ukCaaBaggage,
      SOURCES.iataTravelers,
      SOURCES.tsaWhatCanIBring,
    ],
  },
  {
    slug: "personal-item-vs-carry-on",
    category: "practical",
    status: "published",
    publishAt: "2026-11-12",
    lastReviewed: "2026-11-08",
    photo: "airline-fees",
    title: "Personal item vs carry-on: what's the difference?",
    description:
      "Personal item or carry-on bag? What each one means, where each goes on the plane, what your fare includes and how to choose the right bag for your trip.",
    headline: "Personal item vs carry-on: what's the difference?",
    intro:
      "Airline baggage rules often mention two kinds of hand luggage: a personal item and a carry-on, also called a cabin bag. They sound similar, but they are different allowances with different sizes, and many fares include only one of them. Knowing which is which helps you pick the right fare and avoid a fee at the gate.",
    sections: [
      {
        heading: "The personal item: the bag under the seat",
        paragraphs: [
          "A personal item is a small bag that fits under the seat in front of you. Typical examples are a handbag, a laptop bag or a small backpack. Because it goes under the seat, its size limit is smaller than a cabin bag's, and the exact limit varies by airline and sometimes by fare.",
          "Most fares include a personal item, including many basic fares on low-cost airlines. It's the bag that stays with you for the whole flight, so it's the right place for documents, medication, valuables and electronics. Our guide to [what fits under the seat](/blog/what-fits-under-the-seat) explains how to check whether your bag qualifies.",
        ],
        bullets: [],
      },
      {
        heading: "The carry-on or cabin bag: the bag in the overhead locker",
        paragraphs: [
          "A carry-on, cabin bag or hand luggage bag is the larger bag that goes in the overhead locker. It's usually a small wheeled case or a large backpack. Common cabin bag sizes are around 55 × 40 × 20 cm, but limits vary, so take the figures from your own booking.",
          "Whether a cabin bag is included depends on the airline and the fare. Some fares include both a personal item and a cabin bag, while others include only the personal item and charge for the cabin bag as an extra. Some airlines also set a weight limit for cabin bags.",
          "Space in the overhead lockers is shared and limited. On busy flights, the last passengers to board may find the lockers full, and their cabin bags may be moved to the hold at the gate. That's one more reason to keep anything you can't be without in the personal item.",
        ],
        bullets: [],
      },
      {
        heading: "The key differences at a glance",
        paragraphs: [
          "The two allowances differ in size, where the bag goes and how often they are included. These are the general patterns; your booking has the details.",
        ],
        bullets: [
          "Size: the personal item limit is smaller than the cabin bag limit",
          "Where it goes: the personal item under the seat, the cabin bag in the overhead locker",
          "Included: a personal item is included on most fares; a cabin bag is not always included",
          "Gate checks: on full flights, cabin bags may be moved to the hold at the gate; the personal item stays with you",
          "Weight: some airlines set a weight limit for either bag, so check for one",
        ],
      },
      {
        heading: "How to tell what your fare includes",
        paragraphs: [
          "Look at the baggage section of your booking confirmation, or the fare details on the airline's website before you pay. Fares are often described in tiers, and the difference between the cheapest tier and the next one up is frequently the cabin bag.",
          "Wording varies, so read carefully: 'hand luggage', 'cabin baggage', 'carry-on' and 'personal item' can mean different things on different airlines. If the fare says 'one small bag', check its size; it is often the personal item only. Our guide to [budget airline fees](/blog/budget-airline-fees-explained) explains how these fares are structured.",
        ],
        bullets: [],
      },
      {
        heading: "Choosing between them",
        paragraphs: [
          "A personal item alone works well for short trips, warm destinations and travellers who pack light. With a small, mix-and-match wardrobe and solid toiletries, a weekend or even a few days can fit in an under-seat bag.",
          "A cabin bag makes sense for longer trips, colder weather, work trips with a change of clothes, or anyone who wants room for things picked up along the way. Families often need one, and our guide to [flying with kids](/blog/flying-with-kids) covers the extra items children need.",
          "Before deciding, add up the cost. A fare that includes a cabin bag can be better value than a cheaper fare plus a cabin bag added later. Our [baggage fee calculator](/tools/baggage-fee-calculator) compares the total cost of fares with and without bags.",
        ],
        bullets: [],
      },
      {
        heading: "Making one bag do the job",
        paragraphs: [
          "If you want to travel with only a personal item, choose a soft bag that uses the full size allowed, pack it as you'll travel and measure it. Our [bag size checker](/tools/bag-size-checker) tells you whether it fits, and whether turning it would help.",
          "Wear your bulkiest clothes and shoes on the plane, keep liquids to what your airport's security rules allow, and leave space for anything you need to take out at security. Our [carry-on packing list](/blog/carry-on-packing-list) and [packing list generator](/tools/packing-list-generator) help you decide what to leave behind.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "Is a backpack a personal item or a carry-on?",
        answer:
          "It can be either. A small backpack that fits within the personal item limit counts as a personal item and goes under the seat. A larger backpack that only fits the cabin bag limit counts as a carry-on and goes in the overhead locker.",
      },
      {
        question: "Can I bring both a personal item and a carry-on?",
        answer:
          "Only if your fare includes both. Some fares include a personal item and a cabin bag, while basic fares on many airlines include only the personal item. Check the baggage section of your booking before you travel.",
      },
      {
        question: "Does a coat or a duty-free bag count as my personal item?",
        answer:
          "Policies vary. Some airlines allow a coat, a small duty-free bag or certain assistive items in addition to your allowance, while others count every bag. Check your airline's baggage rules before you assume an extra item is allowed.",
      },
    ],
    related: {
      destinations: [],
      itineraries: [],
      guides: [
        "what-fits-under-the-seat",
        "carry-on-too-big-at-the-gate",
        "carry-on-packing-list",
        "budget-airline-fees-explained",
      ],
    },
    sources: [
      SOURCES.ukCaaBaggage,
      SOURCES.ukHandLuggage,
      SOURCES.tsaWhatCanIBring,
    ],
  },
  {
    slug: "carry-on-too-big-at-the-gate",
    category: "practical",
    status: "published",
    publishAt: "2026-11-19",
    lastReviewed: "2026-11-08",
    photo: "carry-on",
    title: "Carry-on too big at the gate? What happens next",
    description:
      "What happens if your carry-on or personal item is too big at the gate, what to take out if your bag goes in the hold, and how to avoid it next time.",
    headline: "Carry-on too big at the gate? What happens and what to do",
    intro:
      "Bag checks at the gate catch out plenty of travellers, especially on low-cost airlines. If your bag doesn't fit the sizer, you usually have to pay for it or check it into the hold, and gate fees are often higher than fees paid when booking. Here's what typically happens, what to do in the moment, and how to make sure it doesn't happen next time.",
    sections: [
      {
        heading: "How bag checks at the gate work",
        paragraphs: [
          "Many airlines check hand luggage at the gate, at check-in or at boarding, using a metal frame called a sizer that matches their limit. If the bag goes into the sizer without being forced, it's accepted. If it doesn't, the staff decide what happens next under the airline's rules.",
          "Checks are often stricter for the personal item on fares that include only a small under-seat bag, and on busy flights where overhead locker space is limited. Being waved through on one trip doesn't mean the same bag will pass next time.",
          "Some airlines also weigh cabin bags, either at check-in or at the gate. A bag that meets the size limit can still be refused if it's over a weight limit, so if your airline sets one, weigh the bag packed before you leave home.",
        ],
        bullets: [],
      },
      {
        heading: "What usually happens if your bag is too big",
        paragraphs: [
          "Policies vary by airline, but the common outcomes are that you pay to take the bag on board as a cabin bag, or pay to put it in the hold. A personal item that's too big may be charged as a cabin bag; a cabin bag that's too big or too heavy may have to be checked.",
          "Fees charged at the gate are often higher than adding the same bag when booking or online before the flight, because they are designed to discourage last-minute oversized bags. Our guide to [budget airline fees](/blog/budget-airline-fees-explained) explains why.",
          "Separately, on full flights, airlines sometimes ask passengers to put cabin bags in the hold even when the bag meets the limit. That's a space issue rather than a size problem, and is often free, but you still need to take out anything that must stay in the cabin.",
        ],
        bullets: [],
      },
      {
        heading: "What to do in the moment",
        paragraphs: [
          "First, try the bag in the sizer the other way round: a bag that's too tall standing up might fit on its side. If a pocket is overfilled, move items into your coat pockets or wear a layer, and compress soft bags with their straps. Be quick and polite; staff are boarding a whole flight.",
          "If the bag still doesn't fit, ask exactly what the options and costs are before you pay. In some cases, moving a bulky item into a travel companion's bag that has space is allowed; in others, every bag is checked individually.",
        ],
        bullets: [],
      },
      {
        heading: "What to take out before a bag goes in the hold",
        paragraphs: [
          "If your bag is going in the hold, take out anything you need on the flight or can't risk losing. Power banks and spare lithium batteries generally must travel in the cabin rather than in checked bags, so remove them before you hand the bag over. Keep a small foldable tote in your bag for exactly this situation.",
        ],
        bullets: [
          "Passport, visas and travel documents",
          "Medication and anything you need during the flight",
          "Power banks, spare batteries and e-cigarettes",
          "Laptop, tablet, cameras and other valuables",
          "Keys, cards and cash",
        ],
      },
      {
        heading: "If your connection is tight",
        paragraphs: [
          "A bag checked at the gate is usually returned either at the aircraft door or at baggage reclaim, depending on the airline and airport. Ask which it will be. If it goes to baggage reclaim on a self-transfer, you'll need time to collect it and check it in again, which can make a connection much tighter. Our [layover time checker](/tools/layover-time-checker) helps you judge whether a connection still works.",
        ],
        bullets: [],
      },
      {
        heading: "How to avoid it next time",
        paragraphs: [
          "The fix is simple: measure your bag packed, against the limit in your booking, before you leave home. Our [bag size checker](/tools/bag-size-checker) shows whether it fits, by how much, and whether turning it helps. Our guide to [what fits under the seat](/blog/what-fits-under-the-seat) covers how to measure properly, including wheels and pockets.",
          "Make sure you know which allowance you have. If your fare includes only an under-seat bag, a small wheeled case won't qualify, however lightly you pack it. Our guide to [personal items and carry-ons](/blog/personal-item-vs-carry-on) explains the difference.",
          "If you need the extra space, add a bag when you book. Our [baggage fee calculator](/tools/baggage-fee-calculator) compares the total cost of fares with bags, and the [luggage weight calculator](/tools/luggage-weight-calculator) checks the weight before you set off.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "Do airlines really measure carry-on bags?",
        answer:
          "Many do, especially low-cost airlines and fares that include only a personal item. Checks can happen at check-in, at the gate or during boarding, so it's safest to assume your bag might be measured and to check it at home.",
      },
      {
        question: "Is it cheaper to pay for a bag at booking or at the gate?",
        answer:
          "Adding a bag when you book or online before the flight is usually cheaper than paying at the gate. Airline policies and prices vary, so compare the costs on your airline's website when you book rather than waiting.",
      },
      {
        question:
          "Can I take my power bank out if my bag is checked at the gate?",
        answer:
          "Yes, and you generally must. Power banks and spare lithium batteries usually have to travel in the cabin rather than in the hold, so take them out of any bag that is being checked and keep them with you.",
      },
    ],
    related: {
      destinations: [],
      itineraries: [],
      guides: [
        "what-fits-under-the-seat",
        "personal-item-vs-carry-on",
        "budget-airline-fees-explained",
        "self-transfer-flights",
      ],
    },
    sources: [
      SOURCES.ukCaaBaggage,
      SOURCES.ukHandLuggage,
      SOURCES.tsaWhatCanIBring,
      SOURCES.iataTravelers,
    ],
  },
];
