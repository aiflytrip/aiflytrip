import { type ToolPageCopy } from "@/i18n/pages/tools";

/**
 * Free tools that exist only in English for now. Translated tools live in
 * i18n/routes.ts and i18n/pages/tools.ts; move a tool there when it is
 * translated. Inline links use [label](/path) and are checked by tests.
 */

export type EnglishToolKey =
  "packing" | "bagSize" | "luggageWeight" | "baggageFees";

export type EnglishTool = {
  path: string;
  /** Analytics placement for the planner call to action. */
  placement: string;
  /** Card on the tools hub and link label in the footer. */
  card: { title: string; body: string };
  copy: ToolPageCopy;
};

export const ENGLISH_TOOLS: Record<EnglishToolKey, EnglishTool> = {
  packing: {
    path: "/tools/packing-list-generator",
    placement: "packing_list_generator",
    card: {
      title: "Packing list generator",
      body: "A checklist for your trip length, weather, luggage and activities, with clothes worked out for you. Tick items off, print it or share it.",
    },
    copy: {
      meta: {
        title: "Packing list generator: free checklist for any trip",
        description:
          "Free packing list generator: get a checklist for your trip length, weather, luggage and activities, plus a ready-made 7-day packing list to print.",
      },
      crumb: "Packing list generator",
      h1: "Packing list generator",
      intro:
        "Tell us how long you're going for, what the weather will be like and what you plan to do, and get a packing list you can tick off, print or share. Clothes are worked out for you, so a two-week trip doesn't mean two weeks of outfits.",
      sections: [
        {
          id: "how-it-works",
          title: "How the list is worked out",
          cards: [
            {
              title: "Clothes for the days you need",
              body: "You get a day's worth of clothes per day, up to a sensible limit. With carry-on only, that limit is a week, or four days if you can do laundry; with a checked bag it is two weeks. Longer trips get a reminder to plan a wash.",
            },
            {
              title: "Weather",
              body: "Warm trips swap jeans for shorts and add a sun hat and sunscreen. Cold trips add layers, a warm coat and a hat, gloves and scarf. Mild trips get a jumper and a light jacket for changeable days.",
            },
            {
              title: "Carry-on or checked bag",
              body: "Carry-on lists keep toiletries to travel sizes and remind you to check the liquid rules at your airport. Pair the list with our [bag size checker](/tools/bag-size-checker) to make sure your bag fits.",
            },
            {
              title: "Activities and who's travelling",
              body: "Beach, hiking, business and smart evenings each add their own short section, and travelling with a young child adds the things that make the journey easier.",
            },
            {
              title: "Documents first",
              body: "Every list starts with documents and money, because they are the things you can't replace at your destination. Our [travel documents checklist](/blog/travel-documents-checklist) explains what to check before you go.",
            },
            {
              title: "Hand luggage essentials",
              body: "Medicines, power banks and valuables are marked to go in your hand luggage. Power banks and spare batteries are usually not allowed in checked bags.",
            },
          ],
        },
        {
          id: "packing-light",
          title: "How to pack lighter",
          paragraphs: [
            "Choose clothes in two or three colours that all go together, so every top works with every pair of trousers. Pack for about a week and wash, rather than packing for every day of a long trip, and wear your bulkiest shoes and jacket on the plane.",
            "Weigh your packed bag before you leave. Our [luggage weight calculator](/tools/luggage-weight-calculator) estimates the weight of what you plan to pack, and shows which items to move to your hand luggage or leave at home.",
          ],
        },
      ],
      cta: {
        heading: "Planning the whole trip?",
        body: "Our free AI trip planner drafts a day-by-day itinerary with a packing list, a suggested flight and a budget estimate for your dates.",
      },
      faqs: [
        {
          question: "What should I pack for 7 days?",
          answer:
            "For a week, pack about seven tops, eight sets of underwear and socks, two or three pairs of trousers or skirts, a jumper, a light jacket, sleepwear and comfortable shoes, plus documents, toiletries, medicines and chargers. The example list on this page shows a full 7-day packing list.",
        },
        {
          question: "Can I pack for a week in a carry-on bag?",
          answer:
            "Yes, if you choose clothes that mix and match, keep toiletries to travel sizes and wear your heaviest shoes and jacket on the plane. Check your airline's cabin bag size and weight limits for your fare before you pack.",
        },
        {
          question: "How many outfits do I need for a two-week trip?",
          answer:
            "Usually about a week's worth. Plan one wash halfway through, at your accommodation, a launderette or with travel detergent in a sink, and you can travel with half the clothes and a much lighter bag.",
        },
        {
          question: "Can I put a power bank in my checked luggage?",
          answer:
            "Usually not. Most airlines require power banks and spare lithium batteries to travel in your hand luggage, and some limit their size or ask you not to use them on board. Check your airline's rules before you fly.",
        },
      ],
      related:
        "Check your bag fits with the [bag size checker](/tools/bag-size-checker), weigh it with the [luggage weight calculator](/tools/luggage-weight-calculator) and add up bag fees with the [baggage fee calculator](/tools/baggage-fee-calculator).",
      ld: {
        name: "AIFlyTrip packing list generator",
        description:
          "Free packing list generator that builds a checklist from trip length, weather, luggage and activities.",
      },
    },
  },
  bagSize: {
    path: "/tools/bag-size-checker",
    placement: "bag_size_checker",
    card: {
      title: "Bag size checker",
      body: "Check whether your bag fits as a personal item under the seat or as a cabin bag, using the limits from your booking.",
    },
    copy: {
      meta: {
        title: "Bag size checker: will my bag fit under the seat?",
        description:
          "Free bag size checker: see if your bag fits as a personal item under the seat or as a cabin bag, by how much, and whether turning it helps.",
      },
      crumb: "Bag size checker",
      h1: "Bag size checker: personal item and cabin bag",
      intro:
        "Will your bag fit under the seat, or in the overhead locker? Enter your bag's size and the limit from your booking to see whether it fits, which side is too big and by how much. It works in centimetres or inches, checks weight too, and works out whether turning the bag would help.",
      sections: [
        {
          id: "how-to-measure",
          title: "How to measure your bag",
          cards: [
            {
              title: "Measure it packed",
              body: "A soft bag grows when it's full. Pack it as you will travel, then measure the longest point on each side.",
            },
            {
              title: "Include everything that sticks out",
              body: "Wheels, handles, feet and outside pockets all count. Measure from the floor to the top of the handle when it's pushed down.",
            },
            {
              title: "Use a tape measure, not the label",
              body: "The size on the shop label is often for the main body only. A quick measurement at home is more reliable.",
            },
          ],
        },
        {
          id: "personal-item-or-cabin-bag",
          title: "Personal item or cabin bag?",
          paragraphs: [
            "A personal item is a small bag, such as a backpack or handbag, that fits under the seat in front of you. A cabin bag is a larger bag for the overhead locker. Many fares include a personal item, while a cabin bag is often included only on some fares or for a fee, so check what your ticket includes. Our guide to [what fits under the seat](/blog/what-fits-under-the-seat) covers which bags fit best and why the space varies between seats.",
            "Some airlines give the limit as length, width and depth; others as a total of all three sides added together, which is common for checked bags. Choose the type that matches your booking. Our guide to [budget airline fees](/blog/budget-airline-fees-explained) explains how bag rules affect the real price of a fare.",
          ],
        },
        {
          id: "why-not-airline-sizes",
          title: "Why you type in your airline's limit",
          paragraphs: [
            "Bag allowances differ between airlines, between fares on the same airline and sometimes between routes, and airlines change them. Rather than show sizes that could be out of date, the checker uses the limit from your own booking, so the answer is about your ticket. The quick-fill buttons are common sizes only, not any airline's rule.",
          ],
        },
      ],
      cta: {
        heading: "Packing for a trip?",
        body: "Our free AI trip planner drafts a day-by-day itinerary with a packing list, a suggested flight and a budget estimate.",
      },
      faqs: [
        {
          question: "How do I know if my bag fits under the seat?",
          answer:
            "Find the personal item size in your booking, measure your bag packed, including wheels and pockets, and enter both into the checker. If each side of the bag is no bigger than the limit, with the bag turned to its best position, it should fit.",
        },
        {
          question: "Do wheels and handles count in bag measurements?",
          answer:
            "Yes. Airlines measure the whole bag, so wheels, handles and outside pockets are included. A sizer at the gate measures the bag as it is, which is why it pays to measure it packed.",
        },
        {
          question: "What happens if my cabin bag is too big?",
          answer:
            "The airline may ask you to pay to check it into the hold, often at a higher price than adding a bag when you book. Some airlines also refuse bags that are far too large, so check the size before you travel.",
        },
        {
          question: "Can a soft bag be squeezed into the sizer?",
          answer:
            "A soft bag that is not overpacked can flex a little, which is one reason travellers prefer them for personal items. Don't rely on it, though: if the bag doesn't go into the sizer, the airline can still charge.",
        },
      ],
      related:
        "Weigh your bag with the [luggage weight calculator](/tools/luggage-weight-calculator), plan what to take with the [packing list generator](/tools/packing-list-generator) and compare fares with bags included in the [baggage fee calculator](/tools/baggage-fee-calculator).",
      ld: {
        name: "AIFlyTrip bag size checker",
        description:
          "Free checker that tests whether a bag fits a personal item or cabin bag limit, with rotation and weight.",
      },
    },
  },
  luggageWeight: {
    path: "/tools/luggage-weight-calculator",
    placement: "luggage_weight_calculator",
    card: {
      title: "Luggage weight calculator",
      body: "Estimate what your packed bag weighs, or check a weighed bag against your limit, and see what to move.",
    },
    copy: {
      meta: {
        title: "Luggage weight calculator: is my bag too heavy?",
        description:
          "Free luggage weight calculator: estimate what your carry-on or suitcase weighs from what you pack, check it against your limit and see what to move.",
      },
      crumb: "Luggage weight calculator",
      h1: "Luggage weight calculator",
      intro:
        "Cabin bag limits are often only a few kilos, and it's easy to go over without noticing. Add up what you plan to pack to estimate the weight before you pack, or enter the weight of your packed bag, and see how it compares with your limit and what to move if it's too heavy.",
      sections: [
        {
          id: "how-the-estimate-works",
          title: "How the estimate works",
          cards: [
            {
              title: "Typical item weights",
              body: "Each item uses a typical weight for adult clothing and travel kit, such as about 150 g for a T-shirt or 650 g for a pair of jeans. Your own things may be lighter or heavier, so treat the result as a guide.",
            },
            {
              title: "The bag itself counts",
              body: "A wheeled cabin bag can use up a large part of a small allowance before you pack anything. Weigh the empty bag on bathroom scales and enter it for a better estimate.",
            },
            {
              title: "Wear the heavy things",
              body: "Coats, jumpers and shoes are among the heaviest items. When your bag is over or close to the limit, the calculator shows how much wearing them on the plane would save.",
            },
          ],
        },
        {
          id: "weighing-at-home",
          title: "How to weigh your bag at home",
          paragraphs: [
            "A luggage scale is the easiest way: hook it to the handle and lift. Without one, stand on bathroom scales holding the bag, then without it, and take the difference. Weigh the bag fully packed, and leave a little room for things you buy on the trip.",
            "Weight limits are set per fare and can be lower for cabin bags than many travellers expect, and some airlines also limit the total of everything you carry on. Check your booking, and our guide to [budget airline fees](/blog/budget-airline-fees-explained) explains what to compare before you book.",
          ],
        },
      ],
      cta: {
        heading: "Planning what to take?",
        body: "Our free AI trip planner drafts a day-by-day itinerary with a packing list and a budget estimate for your trip.",
      },
      faqs: [
        {
          question: "How much does a packed carry-on bag weigh?",
          answer:
            "It depends on the bag and what you pack. An empty wheeled cabin bag can weigh a few kilos on its own, and a week of clothes, shoes, toiletries and a laptop can easily add several more. Estimate yours with the calculator, then weigh it before you leave.",
        },
        {
          question: "Do airlines weigh cabin bags?",
          answer:
            "Some do, especially when a flight is full or a bag looks heavy, and others rarely do. If your fare has a cabin bag weight limit, it is safest to stay within it, because a bag that is too heavy may have to go in the hold for a fee.",
        },
        {
          question: "How can I make my bag lighter?",
          answer:
            "Wear your heaviest shoes, jacket and jumper on the plane, pack for about a week and plan a wash, choose travel-size toiletries and leave the hair dryer if your accommodation has one. A lighter bag, such as a soft holdall, also saves weight.",
        },
      ],
      related:
        "Check your bag's size with the [bag size checker](/tools/bag-size-checker), plan what to take with the [packing list generator](/tools/packing-list-generator) and compare the real cost of fares with bags in the [baggage fee calculator](/tools/baggage-fee-calculator).",
      ld: {
        name: "AIFlyTrip luggage weight calculator",
        description:
          "Free calculator that estimates a bag's weight from what you pack and checks it against your limit.",
      },
    },
  },
  baggageFees: {
    path: "/tools/baggage-fee-calculator",
    placement: "baggage_fee_calculator",
    card: {
      title: "Baggage fee calculator",
      body: "Add bag, seat and other fees to each fare you're comparing to see the real price per person and for the trip.",
    },
    copy: {
      meta: {
        title: "Baggage fee calculator: the real cost of a cheap flight",
        description:
          "Free baggage fee calculator: add bag, seat and other fees to the fares you're comparing and see which flight is really cheapest, per person and in total.",
      },
      crumb: "Baggage fee calculator",
      h1: "Baggage fee calculator",
      intro:
        "A cheap ticket can turn into an expensive trip once you add a cabin bag, a checked bag and a seat. Enter up to three fares with the extras each one charges and see what each trip really costs, in total and per person, and which one is actually cheapest.",
      sections: [
        {
          id: "how-to-use",
          title: "How to use the calculator",
          cards: [
            {
              title: "Build the trip you'll actually take",
              body: "For each fare, add only the extras you need: the bags you'll really bring and a seat if you must sit together. Find the prices on each airline's booking page.",
            },
            {
              title: "Per person, per flight",
              body: "Bag and seat fees are usually charged for each passenger on each flight, so a return trip for two pays them four times. The calculator does that maths for you.",
            },
            {
              title: "Don't forget the airport",
              body: "A cheaper flight from an airport further away can cost more once you add the train, bus or parking. Enter the transport for the whole group to compare fairly.",
            },
          ],
        },
        {
          id: "why-fees-matter",
          title: "Why the cheapest fare isn't always the cheapest trip",
          paragraphs: [
            "Low-cost fares often include only a small personal item, with cabin bags, checked bags and seats sold as extras. A fare from a full-service airline may cost more up front but include some of those things. Comparing the total is the only fair way to choose, as our guide to [budget airline fees](/blog/budget-airline-fees-explained) explains.",
            "Fees are usually lower when added at booking than later, and much lower than paying at the gate, so decide what you need before you pay. Our article on [how airline pricing works](/blog/how-airline-pricing-works) explains why ticket prices change, and the [bag size checker](/tools/bag-size-checker) helps you avoid a fee for a bag that's too big.",
          ],
        },
      ],
      cta: {
        heading: "Comparing flights for a trip?",
        body: "Our free AI trip planner drafts a day-by-day itinerary with flight options and a budget estimate for your dates.",
      },
      faqs: [
        {
          question: "How much are baggage fees?",
          answer:
            "It varies a great deal between airlines, fares, routes and dates, and fees often depend on when you add the bag. Check the price on each airline's booking page for your exact flight, then enter it in the calculator to compare fares fairly.",
        },
        {
          question: "Are bag fees charged per flight or per trip?",
          answer:
            "Usually per passenger and per flight, so a return trip means paying for a bag twice for each traveller. Some fares and bundles include bags, so check what is included before adding extras.",
        },
        {
          question:
            "Is it cheaper to pay for bags when booking or at the airport?",
          answer:
            "Adding bags when you book, or well before you fly, is usually cheaper than adding them close to departure and much cheaper than paying at the check-in desk or gate. Check your airline's prices at each stage.",
        },
      ],
      related:
        "Check your bag with the [bag size checker](/tools/bag-size-checker) and the [luggage weight calculator](/tools/luggage-weight-calculator), and total the whole trip with the [trip budget calculator](/tools/trip-budget-calculator).",
      ld: {
        name: "AIFlyTrip baggage fee calculator",
        description:
          "Free calculator that compares the real cost of fares once bag, seat and other fees are added.",
      },
    },
  },
};

export const ENGLISH_TOOL_KEYS = Object.keys(ENGLISH_TOOLS) as EnglishToolKey[];
export const ENGLISH_TOOL_PATHS = ENGLISH_TOOL_KEYS.map(
  (key) => ENGLISH_TOOLS[key].path,
);
