import { type ItinerarySchema } from "@/content/schema";
import { SOURCES } from "@/content/data/sources";
import { type z } from "zod";

type ItineraryInput = z.input<typeof ItinerarySchema>;

/**
 * Hand-written itineraries. Programmatic "destination + duration" pages are
 * only ever added here, one by one, with real day plans; there is no
 * template that generates them, and unknown slugs return 404.
 */
export const itineraries: ItineraryInput[] = [
  {
    slug: "paris-3-days",
    destination: "/destinations/france/paris",
    name: "Paris in 3 days",
    status: "published",
    lastReviewed: "2026-10-02",
    title: "Paris in 3 days: a first-timer's itinerary",
    description:
      "A realistic three-day Paris itinerary for first-time visitors, grouped by neighbourhood, with museum timing tips and ideas to adapt it to your pace.",
    headline: "Paris in 3 days: an itinerary for first-time visitors",
    intro:
      "This plan covers the essential sights over three days while keeping travel time down by grouping each day around neighbourhoods. It assumes a moderate pace with time for long meals; swap or drop items to suit your interests, and book timed tickets for the big museums before you go.",
    days: 3,
    bestFor: ["First visits", "Art and history", "Walking-focused trips"],
    plan: [
      {
        title: "The Seine and the historic heart",
        morning:
          "Start on the Île de la Cité with Notre-Dame and the stained glass of Sainte-Chapelle, then walk along the river through the oldest part of the city.",
        afternoon:
          "Cross to the Right Bank for the Louvre. Choose two or three collections in advance rather than trying to see everything, then rest in the Tuileries Garden.",
        evening:
          "Walk west along the river or through the Palais-Royal gardens, and have dinner around the Louvre or in Saint-Germain on the Left Bank.",
        tip: "Book a timed Louvre entry for early afternoon so the morning around the islands isn't rushed.",
      },
      {
        title: "Left Bank art and the Eiffel Tower",
        morning:
          "Visit the Musée d'Orsay for Impressionist and Post-Impressionist art, ideally right at opening when the galleries are calmer.",
        afternoon:
          "Wander Saint-Germain-des-Prés and the Luxembourg Gardens, stopping at a café, then head towards the Eiffel Tower area along the river.",
        evening:
          "See the Eiffel Tower around sunset from the Champ de Mars or the Trocadéro across the river, and go up if you've booked a slot.",
        tip: "If you want to go up the Eiffel Tower, book a time slot in advance and allow for security checks.",
      },
      {
        title: "Montmartre and Le Marais",
        morning:
          "Climb to Montmartre for the Sacré-Cœur and views over the city, then explore the quieter lanes away from the busiest square.",
        afternoon:
          "Take the metro to Le Marais. Visit the Place des Vosges, browse the boutiques and choose a smaller museum such as the Musée Carnavalet, dedicated to the history of Paris.",
        evening:
          "Stay in Le Marais for dinner, or finish with an evening river walk to see the bridges lit up.",
      },
    ],
    adjustments: [
      {
        title: "Add Versailles",
        detail:
          "With a fourth day, take the RER to the Palace of Versailles and spend the day in the palace and gardens. It is a long but rewarding visit.",
      },
      {
        title: "Travelling with children",
        detail:
          "Swap a museum for the Jardin d'Acclimatation or a river cruise, and plan picnic breaks in the parks to keep the days relaxed.",
      },
      {
        title: "A slower pace",
        detail:
          "Drop one major museum and spend the time in neighbourhood cafés and markets; Paris rewards unhurried days as much as busy ones.",
      },
    ],
    practicalNotes: [
      {
        title: "Where to stay for this itinerary",
        detail:
          "A central base keeps each day's start simple. Le Marais, the Latin Quarter and Saint-Germain-des-Prés are all within walking distance or a short metro ride of the places in this plan. If you prefer quieter evenings, look for streets slightly away from the busiest squares rather than further out of the centre.",
      },
      {
        title: "What to book before you go",
        detail:
          "Book timed entry for the Louvre and, if you plan to go up, the Eiffel Tower, as these are the visits most likely to sell out. The Musée d'Orsay and Sainte-Chapelle also sell timed tickets. Booking these first lets you arrange the rest of each day around fixed times, then keep everything else flexible.",
      },
      {
        title: "Getting between stops",
        detail:
          "Most of this itinerary is walkable within each day, using the metro only to jump between areas, such as from the Eiffel Tower back to the centre or from Montmartre to Le Marais. Check the RATP website for current ticket options before you arrive, and keep a little time in hand for station changes.",
      },
      {
        title: "Pacing the days",
        detail:
          "Each day has one big museum or landmark and plenty of walking. If you start to feel tired, drop the afternoon item rather than the morning one: mornings are when the major sights are calmest and your energy is highest.",
      },
    ],
    faqs: [
      {
        question: "Is three days enough for Paris?",
        answer:
          "Three days is enough to see the main landmarks and get a feel for a few neighbourhoods at a steady pace. You won't see everything, so prioritise the museums and areas you care about most and save the rest for a future trip.",
      },
      {
        question: "Should I buy a museum pass for three days in Paris?",
        answer:
          "It depends on how many paid sites you plan to visit. Compare the current price of any pass with the individual tickets for the places on your list, and check whether you still need to reserve time slots with a pass.",
      },
      {
        question: "Which day of this itinerary is best for a rainy day?",
        answer:
          "Day one and day two are built around the Louvre and the Musée d'Orsay, so they adapt well to rain. Swap the outdoor parts of a day, such as the Luxembourg Gardens, with a covered passage walk or an extra museum.",
      },
    ],
    related: {
      itineraries: ["tokyo-5-days", "lisbon-3-days"],
      guides: ["how-many-days-for-a-trip", "how-to-plan-a-trip"],
    },
    sources: [SOURCES.paris, SOURCES.ratp],
  },
  {
    slug: "tokyo-5-days",
    destination: "/destinations/japan/tokyo",
    name: "Tokyo in 5 days",
    status: "published",
    lastReviewed: "2026-10-02",
    title: "Tokyo in 5 days: neighbourhoods and a day trip",
    description:
      "A five-day Tokyo itinerary that groups the city by neighbourhood, mixes busy districts with quiet ones and includes a day trip to Kamakura or Hakone.",
    headline: "Tokyo in 5 days: an itinerary by neighbourhood",
    intro:
      "Five days gives you time to see Tokyo's best-known districts, slow down in quieter areas and take a day trip out of the city. Each day focuses on one or two neighbourhoods connected by train, so you spend more time exploring and less time in transit.",
    days: 5,
    bestFor: ["First visits", "Food lovers", "Mixing city and day trips"],
    plan: [
      {
        title: "Historic Asakusa and Ueno",
        morning:
          "Begin early at Senso-ji in Asakusa before the crowds, then walk the shopping street leading to the temple and the quieter lanes around it.",
        afternoon:
          "Head to Ueno for the park and a museum such as the Tokyo National Museum, or browse the Ameyoko market street nearby.",
        evening:
          "Take a river walk or a short boat ride, or go up a tower for city views, then have dinner back in Asakusa.",
        tip: "Arrive at Senso-ji early in the morning for a calmer visit and softer light for photos.",
      },
      {
        title: "Harajuku, Omotesando and Shibuya",
        morning:
          "Visit Meiji Jingu, a forested shrine that feels far from the city, then walk into Harajuku.",
        afternoon:
          "Stroll Omotesando's tree-lined avenue and its side streets of cafés and design shops, then continue to Shibuya.",
        evening:
          "Cross the Shibuya scramble at dusk and see the city lights from an observation deck, then try a casual izakaya for dinner.",
      },
      {
        title: "Day trip to Kamakura or Hakone",
        morning:
          "Take the train to Kamakura for its Great Buddha and temples, or to Hakone for hot springs and lakes.",
        afternoon:
          "In Kamakura, walk between temples and visit the coast; in Hakone, follow the loop of trains, cable cars and boats and look for views of Mount Fuji on clear days.",
        evening:
          "Return to Tokyo for dinner, or stay overnight at a traditional inn in Hakone if your schedule allows.",
        tip: "Check the weather before choosing: Mount Fuji views from Hakone depend on clear skies.",
      },
      {
        title: "Food markets, Ginza and Tokyo Station",
        morning:
          "Graze through the food stalls of Tsukiji Outer Market for breakfast and snacks.",
        afternoon:
          "Walk to Ginza for department-store food halls and galleries, then on to the Imperial Palace East Gardens near Tokyo Station.",
        evening:
          "Explore the restaurant floors of a department store or station complex for dinner; they are a great way to sample many cuisines.",
      },
      {
        title: "Shinjuku and a neighbourhood of your choice",
        morning:
          "Relax in Shinjuku Gyoen, one of the city's most beautiful gardens.",
        afternoon:
          "Choose a neighbourhood that matches your interests: Akihabara for electronics and anime, Shimokitazawa for vintage shops, or Yanaka for an older, quieter Tokyo.",
        evening:
          "End in Shinjuku, where tiny bars and restaurants fill the alleys around the station.",
      },
    ],
    adjustments: [
      {
        title: "Continuing to Kyoto",
        detail:
          "If Tokyo is the start of a longer trip, swap the day trip for an extra Tokyo day and take the shinkansen to Kyoto on day six.",
      },
      {
        title: "Travelling with children",
        detail:
          "Add a science museum or a theme park, keep days to one neighbourhood each and plan regular breaks; Tokyo is very family-friendly.",
      },
      {
        title: "Seasonal swaps",
        detail:
          "In cherry blossom season, add a park such as Ueno or Shinjuku Gyoen early in the morning. In summer, plan indoor stops for the hottest part of the day.",
      },
    ],
    practicalNotes: [
      {
        title: "Where to stay for this itinerary",
        detail:
          "A base near Shinjuku, Shibuya, Tokyo Station or Ueno works well, as each is on or near the JR Yamanote Line and has direct services to the areas in this plan. Shinjuku and Shibuya suit travellers who want nightlife close by, while Tokyo Station and Ueno are convenient for day trips and airport transfers.",
      },
      {
        title: "What to book before you go",
        detail:
          "Book any observation decks or popular restaurants you have your heart set on, as some sell out. For the day trip, check train options and, for Hakone, consider a regional pass that covers local transport; compare the current price with individual tickets for your route.",
      },
      {
        title: "Getting between stops",
        detail:
          "Load an IC card such as Suica or Pasmo when you arrive and use it on trains, subways and buses throughout this itinerary. Big stations like Shinjuku and Shibuya have many exits, so look up the exit closest to your destination before you leave the platform.",
      },
      {
        title: "Pacing the days",
        detail:
          "Tokyo involves a lot of walking inside stations as well as on the streets. Plan a café or garden break in the middle of each day, and don't be afraid to drop an evening activity if you are still adjusting to the time difference.",
      },
    ],
    faqs: [
      {
        question: "Is five days enough for Tokyo?",
        answer:
          "Five days is a good amount for a first visit. It covers the best-known neighbourhoods, leaves time for food and quieter areas, and allows one day trip. If Tokyo is part of a wider Japan trip, four days plus your onward travel also works well.",
      },
      {
        question: "Should I choose Kamakura or Hakone for the day trip?",
        answer:
          "Choose Kamakura for temples, the Great Buddha and the coast, with a short train journey. Choose Hakone for hot springs, lakes and possible Mount Fuji views, which takes longer to reach and is best on a clear day or with an overnight stay.",
      },
      {
        question: "Do I need a Japan Rail Pass for this itinerary?",
        answer:
          "Usually not, because this itinerary stays in and around Tokyo. A rechargeable IC card covers most local trains and subways. A rail pass may only make sense if you are also making long shinkansen journeys elsewhere in Japan.",
      },
    ],
    related: {
      itineraries: ["paris-3-days", "lisbon-3-days"],
      guides: ["how-many-days-for-a-trip", "how-to-plan-a-trip"],
    },
    sources: [SOURCES.tokyo, SOURCES.japan],
  },
  {
    slug: "lisbon-3-days",
    destination: "/destinations/portugal/lisbon",
    name: "Lisbon in 3 days",
    status: "published",
    lastReviewed: "2026-10-02",
    title: "Lisbon in 3 days: neighbourhoods and a Sintra day",
    description:
      "A three-day Lisbon itinerary covering Alfama, Baixa, Chiado and Belém, plus a day trip to Sintra, with tips for the hills, trams and timing.",
    headline: "Lisbon in 3 days: an itinerary with a Sintra day trip",
    intro:
      "This three-day plan covers Lisbon's historic neighbourhoods, the riverside monuments of Belém and a full day in Sintra. It is designed around Lisbon's hills: mornings start high and routes generally head downhill, with trams and funiculars for the steepest climbs.",
    days: 3,
    bestFor: ["First visits", "Walkers", "City plus day trip"],
    plan: [
      {
        title: "Alfama, the castle and downtown",
        morning:
          "Take a taxi or tram up to São Jorge Castle for views over the city, then wander down through the lanes of Alfama.",
        afternoon:
          "Continue downhill to Baixa and the riverside Praça do Comércio, then walk up to Chiado for its cafés and bookshops.",
        evening:
          "Watch the sunset from a miradouro and have dinner in Alfama, where some restaurants host fado performances.",
        tip: "Starting at the top of the hill and walking down saves a lot of energy.",
      },
      {
        title: "Belém and the riverside",
        morning:
          "Head west to Belém to visit the Jerónimos Monastery, then try the custard tarts the district is famous for.",
        afternoon:
          "Walk along the river to the Belém Tower and the Monument to the Discoveries, or visit one of the area's museums.",
        evening:
          "Stop at LX Factory on the way back for shops and dinner, or finish in Bairro Alto, which comes alive at night.",
      },
      {
        title: "Day trip to Sintra",
        morning:
          "Take an early train to Sintra and start with the palace you most want to see, before the busiest hours.",
        afternoon:
          "Visit a second site, such as the Moorish Castle or a garden estate, and explore the historic village centre.",
        evening:
          "Return to Lisbon by train and have a relaxed dinner near your accommodation.",
        tip: "Sintra's sites are spread across steep hills; book the palaces you care about in advance and plan transport between them.",
      },
    ],
    adjustments: [
      {
        title: "Add a beach day",
        detail:
          "With a fourth day, take the train along the coast to Cascais for its old town, seafront and beaches.",
      },
      {
        title: "Less walking",
        detail:
          "Use trams, funiculars and taxis for the climbs, and spend more time in flatter areas such as Baixa, the riverside and Belém.",
      },
      {
        title: "Travelling with children",
        detail:
          "Add the Oceanário in Parque das Nações, and keep Sintra to one or two sites with plenty of breaks.",
      },
    ],
    practicalNotes: [
      {
        title: "Where to stay for this itinerary",
        detail:
          "Baixa and Chiado are the most convenient bases: central, close to the river and near the stations for Sintra and Cascais trains. Alfama is atmospheric but very hilly, which matters if you are carrying luggage. Príncipe Real offers a quieter, residential feel within walking distance of Chiado.",
      },
      {
        title: "What to book before you go",
        detail:
          "For Sintra, book entry to the palaces you most want to see ahead of time, especially in spring and summer, and plan how you will get between sites. In Lisbon itself, very little needs booking, though popular restaurants and fado houses can fill up at weekends.",
      },
      {
        title: "Getting between stops",
        detail:
          "Use a rechargeable transport card such as Viva Viagem for the metro, trams, buses and the train to Sintra, and check current fares with the operators. Taxis and ride-hailing are a sensible way to reach hilltop viewpoints and the castle without a steep climb.",
      },
      {
        title: "Pacing the days",
        detail:
          "Lisbon's hills are tiring, so this plan saves energy by starting high and walking down. Build in a long lunch or a café stop each afternoon, and save the sunset viewpoint for when you have time to sit and enjoy it.",
      },
    ],
    faqs: [
      {
        question: "Is three days enough for Lisbon?",
        answer:
          "Three days is enough to see the main neighbourhoods and spend a full day in Sintra. You'll get a good feel for the city at a comfortable pace. With an extra day, add Cascais or slower time exploring cafés and viewpoints.",
      },
      {
        question: "Can you visit Sintra in half a day?",
        answer:
          "You can see one palace and the village in half a day, but Sintra rewards a full day because the main sites are spread out across steep hills and can be busy. Starting early makes the biggest difference.",
      },
      {
        question: "Do I need to ride Tram 28?",
        answer:
          "It is a classic experience, but it gets very crowded. Ride it early in the morning, or simply walk parts of its route through Alfama and Graça, which are just as atmospheric on foot.",
      },
    ],
    related: {
      itineraries: ["paris-3-days", "tokyo-5-days"],
      guides: ["how-many-days-for-a-trip", "how-to-plan-a-trip"],
    },
    sources: [SOURCES.lisbon, SOURCES.cp],
  },
  {
    slug: "rome-3-days",
    publishAt: "2026-10-21",
    destination: "/destinations/italy/rome",
    name: "Rome in 3 days",
    status: "published",
    lastReviewed: "2026-10-11",
    title: "Rome in 3 days: ancient sites, the Vatican and more",
    description:
      "A realistic three-day Rome itinerary for first-time visitors: ancient Rome, the Vatican and the historic centre, grouped by area, with booking and pacing tips.",
    headline: "Rome in 3 days: an itinerary for first-time visitors",
    intro:
      "Rome has more to see than any three days can hold, so this plan gives each day one clear focus: ancient Rome, the Vatican, then the squares and fountains of the historic centre. Each day has one big visit that needs booking and leaves the rest loose, because much of the pleasure of Rome is in walking between things. Check opening days on the official websites before you fix the order.",
    days: 3,
    bestFor: ["First visits", "History and art", "Walking-focused trips"],
    plan: [
      {
        title: "Ancient Rome and Monti",
        morning:
          "Start with the Colosseum on a timed ticket, then continue into the Roman Forum and up the Palatine Hill, which are next door and usually covered by the same ticket. Allow most of the morning; the Forum is larger than it looks.",
        afternoon:
          "Walk up to the Capitoline Hill for the view back over the Forum, and visit the Capitoline Museums if you want more ancient sculpture. Otherwise head into the Monti neighbourhood for a late lunch and its small shops.",
        evening:
          "Stay in Monti for dinner, then walk back past the Colosseum once it is lit up and the crowds have thinned.",
        tip: "There is very little shade in the Forum. In warm months take the earliest entry you can, and carry water and a hat.",
      },
      {
        title: "The Vatican and Trastevere",
        morning:
          "Visit the Vatican Museums with a pre-booked entry time. The route ends in the Sistine Chapel, so pace yourself through the earlier galleries rather than arriving tired.",
        afternoon:
          "Go on to St Peter's Basilica and its square. Entry involves a security queue, and there is a dress code, so cover shoulders and knees. Afterwards, walk along the river past Castel Sant'Angelo.",
        evening:
          "Cross to Trastevere, a short walk or bus ride south, for an evening among its lanes and trattorias. It is at its liveliest after dark.",
        tip: "Book the Vatican Museums well ahead for busy seasons, and check which days they are open before planning the rest of your trip around this day.",
      },
      {
        title: "The historic centre and Villa Borghese",
        morning:
          "See the Trevi Fountain early, before the crowds build, then walk to the Pantheon and on to Piazza Navona. These are close together, and the streets between them are part of the visit.",
        afternoon:
          "Continue to the Spanish Steps and up into the Villa Borghese park. If you have reserved a slot, visit the Borghese Gallery; if not, enjoy the gardens and the view over the city from the Pincio terrace.",
        evening:
          "Come back down for a last evening stroll through the centre, with dinner around Campo de' Fiori or the old Jewish quarter.",
        tip: "The Borghese Gallery admits visitors by reservation for a fixed time slot, so book it first and build the day around it.",
      },
    ],
    adjustments: [
      {
        title: "With a fourth day",
        detail:
          "Take a day trip. Ostia Antica, the remains of Rome's ancient port, is reached by local train and is far quieter than the Forum. Tivoli, with its villas and gardens, is another classic choice.",
      },
      {
        title: "A slower pace",
        detail:
          "Drop the Capitoline Museums and the Borghese Gallery and keep one major visit a day. Spend the time on long lunches, churches you pass along the way and an unhurried evening walk.",
      },
      {
        title: "Travelling with children",
        detail:
          "Shorten the Vatican Museums visit by choosing a few rooms, add time in the Villa Borghese park, where you can hire bikes and rowing boats, and plan a daily gelato stop as a reward for the walking.",
      },
      {
        title: "In the summer heat",
        detail:
          "Do the outdoor sites first thing, retreat indoors to a museum or back to your room in the early afternoon, and go out again in the evening, as Romans do.",
      },
    ],
    practicalNotes: [
      {
        title: "Where to stay for this itinerary",
        detail:
          "The historic centre around the Pantheon and Piazza Navona puts day three on your doorstep and the other days within a walk or short ride. Monti is close to the ancient sites and has a neighbourhood feel. Trastevere is atmospheric in the evening but a little further from the metro. Prati, next to the Vatican, is calmer and well connected.",
      },
      {
        title: "What to book before you go",
        detail:
          "Three visits in this plan work on timed or reserved entry: the Colosseum, the Vatican Museums and the Borghese Gallery. Book them on the official websites as early as your dates are fixed, then arrange each day around its time slot. Check whether the Pantheon needs a ticket for your visit, as arrangements have changed in recent years.",
      },
      {
        title: "Getting between stops",
        detail:
          "Much of central Rome is best covered on foot, and each day of this plan stays within one area. Use the metro, buses or trams for the longer hops, such as from the centre to the Vatican, and check current tickets and passes with the city's transport operator. Taxis are a sensible option late in the evening.",
      },
      {
        title: "Pacing the days",
        detail:
          "Rome involves a lot of standing and cobbled streets, so wear comfortable shoes and plan a proper sit-down lunch each day. Carry a refillable bottle, since the city has many public drinking fountains. If you run out of energy, drop the afternoon museum rather than the morning visit you booked.",
      },
    ],
    faqs: [
      {
        question: "Is three days enough for Rome?",
        answer:
          "Three days is enough to see ancient Rome, the Vatican and the main squares and fountains at a steady pace. You will not see everything, so choose the museums you care about most and leave the rest for another visit.",
      },
      {
        question: "Can I see the Colosseum and the Vatican on the same day?",
        answer:
          "You can, but it makes for a long and tiring day, because both involve hours on your feet and they are on opposite sides of the centre. Giving each its own morning, as this itinerary does, is far more enjoyable.",
      },
      {
        question: "What should I book in advance for Rome?",
        answer:
          "Book the Colosseum, the Vatican Museums and the Borghese Gallery ahead, as each uses timed or reserved entry and popular slots sell out. Most churches, squares and fountains need no booking at all.",
      },
      {
        question: "What is the best area to stay in Rome for three days?",
        answer:
          "For a short first visit, the historic centre or Monti keeps walking distances short. Prati suits travellers who want quieter evenings near the Vatican, and Trastevere suits those who want restaurants and nightlife on the doorstep.",
      },
    ],
    related: {
      itineraries: ["paris-3-days", "lisbon-3-days"],
      guides: [
        "how-many-days-for-a-trip",
        "how-to-build-a-travel-itinerary",
        "airport-to-city-paris-rome-tokyo-lisbon",
      ],
    },
    sources: [SOURCES.rome, SOURCES.italy, SOURCES.trenitalia],
  },
];
