import { type Faq } from "@/content/schema";
import { features, homeFaqs, steps } from "@/features/marketing/content";
import { type Locale } from "@/i18n/config";

/** Homepage copy per language. English mirrors features/marketing/content. */

type Slide = {
  label: string;
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  cta: string;
};

export type HomeCopy = {
  meta: { title: string; description: string };
  hero: {
    pill: string;
    titleStart: string;
    titleHighlight: string;
    lead: string;
    primary: string;
    secondary: string;
    toolsLabel: string;
    tools: { budget: string; layover: string; days: string };
    note: string;
  };
  heroCard: {
    destination: string;
    badge: string;
    origin: string;
    city: string;
    tags: string[];
    days: { label: string; title: string; detail: string }[];
    refining: string;
    ready: string;
    readyDetail: string;
  };
  tools: {
    eyebrow: string;
    title: string;
    description: string;
    seeAll: string;
    slides: { budget: Slide; layover: Slide; days: Slide };
    layoverExample: (duration: string) => string;
    daysExample: string;
    daysExampleStops: [string, string];
    openExample: string;
  };
  howItWorks: {
    eyebrow: string;
    title: string;
    steps: { title: string; description: string }[];
  };
  features: {
    eyebrow: string;
    title: string;
    description: string;
    items: { title: string; description: string }[];
  };
  faqs: Faq[];
  englishGuides?: {
    title: string;
    body: string;
    links: { href: string; label: string }[];
  };
  cta: { title: string; body: string; button: string };
};

const en: HomeCopy = {
  meta: {
    title: "AIFlyTrip: free AI trip planner and itinerary generator",
    description:
      "AIFlyTrip is a free AI trip planner: turn your dates, budget and interests into a personalized day-by-day itinerary, with flight options. No sign-up needed.",
  },
  hero: {
    pill: "Free AI trip planner · no sign-up needed",
    titleStart: "Plan your trip with a",
    titleHighlight: "free AI travel planner",
    lead: "Turn your dates, budget, pace and interests into a personalized, day-by-day travel itinerary, with flight options and a budget estimate you can refine.",
    primary: "Create your free trip plan",
    secondary: "See how it works",
    toolsLabel: "Free tools:",
    tools: {
      budget: "Budget calculator",
      layover: "Layover checker",
      days: "How many days?",
    },
    note: "Free to use, no account needed. AIFlyTrip is a planning tool and doesn't book flights or hotels.",
  },
  heroCard: {
    destination: "Lisbon · 3 days",
    badge: "Example plan",
    origin: "London",
    city: "Lisbon",
    tags: ["Nonstop", "Morning departure", "Economy"],
    days: [
      {
        label: "DAY 1",
        title: "Arrive · Baixa & Chiado",
        detail: "Drop bags, flat-street wander, sunset at a miradouro",
      },
      {
        label: "DAY 2",
        title: "Alfama & São Jorge Castle",
        detail: "Tram up early, castle views, fado evening",
      },
      {
        label: "DAY 3",
        title: "Belém & the riverfront",
        detail: "Monastery, riverside walk, pastries before your flight",
      },
    ],
    refining: "Refining your budget…",
    ready: "Plan ready",
    readyDetail: "Day-by-day · flights · budget",
  },
  tools: {
    eyebrow: "Free travel tools",
    title: "Answer the big trip questions in seconds",
    description:
      "How much it will cost, whether your connection is long enough and how many days you need. Free, no sign-up.",
    seeAll: "See all free tools →",
    slides: {
      budget: {
        label: "Budget calculator",
        eyebrow: "Trip budget calculator",
        title: "How much will your trip cost?",
        body: "Add your flights, a nightly rate and daily spending to see your total in seconds. The full calculator breaks it down by food, transport, activities and extras.",
        points: [
          "Total, per person and per day",
          "15 currencies and a safety buffer",
          "Share your budget with a link",
        ],
        cta: "Open the budget calculator",
      },
      layover: {
        label: "Layover checker",
        eyebrow: "Layover time checker",
        title: "Is your connection long enough?",
        body: "Tell us what happens between your flights, from changing terminals to passport control, and see whether your layover is comfortable, tight or risky.",
        points: [
          "Step-by-step time estimate",
          "Warnings for separate tickets",
          "Practical advice for tight connections",
        ],
        cta: "Check your layover",
      },
      days: {
        label: "How many days?",
        eyebrow: "Trip length planner",
        title: "How many days do you need?",
        body: "Add the places you want to visit and how you like to travel. See how many days to spend in each, including the travel days people often forget.",
        points: [
          "Days per stop, with day trips",
          "Checks the plan against your time off",
          "Advice from our destination guides",
        ],
        cta: "Plan your trip length",
      },
    },
    layoverExample: (d) => `Example · ${d} layover`,
    daysExample: "Example · Lisbon and Porto",
    daysExampleStops: ["Lisbon", "Porto"],
    openExample: "Open this example →",
  },
  howItWorks: {
    eyebrow: "How it works",
    title: "From idea to itinerary in three steps",
    steps,
  },
  features: {
    eyebrow: "Features",
    title: "Travel planning without the tab overload",
    description: "Built around how people actually plan trips.",
    items: features,
  },
  faqs: homeFaqs,
  cta: {
    title: "Your next trip, planned in minutes",
    body: "Tell us where and when. We'll draft the days, compare flight options and estimate the budget.",
    button: "Create your free trip plan",
  },
};

const es: HomeCopy = {
  meta: {
    title: "AIFlyTrip: planificador de viajes con IA gratis",
    description:
      "AIFlyTrip es un planificador de viajes con IA gratis: convierte tus fechas, presupuesto e intereses en un itinerario día a día con vuelos. Sin registro.",
  },
  hero: {
    pill: "Planificador de viajes con IA gratis · sin registro",
    titleStart: "Planifica tu viaje con un",
    titleHighlight: "planificador con IA gratis",
    lead: "Convierte tus fechas, presupuesto, ritmo e intereses en un itinerario personalizado día a día, con opciones de vuelo y un presupuesto estimado que puedes ajustar.",
    primary: "Crea tu plan de viaje gratis",
    secondary: "Herramientas gratis",
    toolsLabel: "Herramientas gratis:",
    tools: {
      budget: "Calculadora de presupuesto",
      layover: "Tiempo de escala",
      days: "¿Cuántos días?",
    },
    note: "Gratis y sin cuenta. AIFlyTrip es una herramienta de planificación y no reserva vuelos ni hoteles.",
  },
  heroCard: {
    destination: "Lisboa · 3 días",
    badge: "Plan de ejemplo",
    origin: "Londres",
    city: "Lisboa",
    tags: ["Directo", "Salida por la mañana", "Turista"],
    days: [
      {
        label: "DÍA 1",
        title: "Llegada · Baixa y Chiado",
        detail:
          "Deja las maletas, paseo por calles llanas, atardecer en un mirador",
      },
      {
        label: "DÍA 2",
        title: "Alfama y Castillo de San Jorge",
        detail: "Tranvía temprano, vistas desde el castillo, noche de fado",
      },
      {
        label: "DÍA 3",
        title: "Belém y la ribera",
        detail: "Monasterio, paseo junto al río, pasteles antes del vuelo",
      },
    ],
    refining: "Ajustando tu presupuesto…",
    ready: "Plan listo",
    readyDetail: "Día a día · vuelos · presupuesto",
  },
  tools: {
    eyebrow: "Herramientas de viaje gratis",
    title: "Resuelve las grandes dudas del viaje en segundos",
    description:
      "Cuánto costará, si tu escala es suficiente y cuántos días necesitas. Gratis y sin registro.",
    seeAll: "Ver todas las herramientas →",
    slides: {
      budget: {
        label: "Presupuesto",
        eyebrow: "Calculadora de presupuesto de viaje",
        title: "¿Cuánto costará tu viaje?",
        body: "Añade tus vuelos, el precio por noche y el gasto diario para ver el total al instante. La calculadora completa lo desglosa en comida, transporte, actividades y extras.",
        points: [
          "Total, por persona y por día",
          "15 monedas y un margen de seguridad",
          "Comparte tu presupuesto con un enlace",
        ],
        cta: "Abrir la calculadora",
      },
      layover: {
        label: "Tiempo de escala",
        eyebrow: "Comprobador de tiempo de escala",
        title: "¿Tienes tiempo suficiente para tu conexión?",
        body: "Cuéntanos qué pasa entre tus vuelos, desde cambiar de terminal hasta el control de pasaportes, y descubre si tu escala es holgada, justa o arriesgada.",
        points: [
          "Estimación de tiempo paso a paso",
          "Avisos para billetes separados",
          "Consejos prácticos para conexiones justas",
        ],
        cta: "Comprobar tu escala",
      },
      days: {
        label: "¿Cuántos días?",
        eyebrow: "Planificador de duración del viaje",
        title: "¿Cuántos días necesitas?",
        body: "Añade los lugares que quieres visitar y cómo te gusta viajar. Descubre cuántos días pasar en cada uno, incluidos los días de viaje que se suelen olvidar.",
        points: [
          "Días por parada, con excursiones",
          "Compara el plan con tus días libres",
          "Consejos de nuestras guías de destino",
        ],
        cta: "Calcular la duración",
      },
    },
    layoverExample: (d) => `Ejemplo · escala de ${d}`,
    daysExample: "Ejemplo · Lisboa y Oporto",
    daysExampleStops: ["Lisboa", "Oporto"],
    openExample: "Abrir este ejemplo →",
  },
  howItWorks: {
    eyebrow: "Cómo funciona",
    title: "De la idea al itinerario en tres pasos",
    steps: [
      {
        title: "Cuéntanos tu viaje",
        description:
          "Desde dónde y hacia dónde vuelas, tus fechas, presupuesto, ritmo y lo que te gusta.",
      },
      {
        title: "Recibe tu plan creado con IA",
        description:
          "Un itinerario día a día, un vuelo sugerido y un presupuesto estimado, en el idioma que elijas.",
      },
      {
        title: "Ajusta y comprueba los detalles",
        description:
          "Adapta el plan a tu gusto y confirma precios, horarios y requisitos de entrada en fuentes oficiales.",
      },
    ],
  },
  features: {
    eyebrow: "Funciones",
    title: "Planifica tu viaje sin abrir decenas de pestañas",
    description: "Pensado para cómo se planifican los viajes de verdad.",
    items: [
      {
        title: "Planes personalizados día a día",
        description:
          "Indica tus fechas, presupuesto, ritmo e intereses y recibe un plan de mañana, tarde y noche para cada día del viaje.",
      },
      {
        title: "Opciones de vuelo en contexto",
        description:
          "El planificador compara opciones de vuelo para tus fechas y explica cuál encaja mejor, según precio, duración y escalas.",
      },
      {
        title: "Un presupuesto con el que planificar",
        description:
          "Consulta una estimación por categorías, desde vuelos y alojamiento hasta comida y actividades, en la moneda que elijas.",
      },
    ],
  },
  faqs: [
    {
      question: "¿Qué es AIFlyTrip?",
      answer:
        "AIFlyTrip es un planificador de viajes con IA gratuito. Introduces los datos y preferencias de tu viaje y crea un itinerario personalizado día a día, con un vuelo sugerido y un presupuesto estimado. También ofrece herramientas gratuitas, como una calculadora de presupuesto, un comprobador de escalas y un planificador de la duración del viaje.",
    },
    {
      question: "¿AIFlyTrip es gratis?",
      answer:
        "Sí. Crear planes de viaje, usar las herramientas y comparar opciones de vuelo es gratis, y no necesitas una cuenta para crear un plan. El único extra de pago es un PDF imprimible opcional del plan, que actualmente está en modo de prueba.",
    },
    {
      question: "¿Puedo recibir mi plan de viaje en español?",
      answer:
        "Sí. El planificador en español elige automáticamente «Español» como idioma del plan, y la IA escribe todo el itinerario en español. Los nombres de lugares se mantienen en su forma local.",
    },
    {
      question: "¿AIFlyTrip reserva vuelos u hoteles?",
      answer:
        "No. AIFlyTrip te ayuda a planificar y comparar opciones, pero no hace reservas. Las opciones de vuelo proceden ahora de un entorno de prueba, así que son ejemplos para planificar y no tarifas reales que se puedan reservar.",
    },
    {
      question: "¿Las guías de destino y el blog están en español?",
      answer:
        "El blog ya tiene una edición en español con nuestros artículos más leídos, y vamos añadiendo más. Las guías de destino y los itinerarios están por ahora en inglés. Solo publicamos traducciones revisadas.",
    },
  ],
  englishGuides: {
    title: "Blog en español y guías de destino",
    body: "Lee nuestro blog de viajes en español. Las guías sobre cuándo ir, cuánto tiempo quedarse y qué ver, con fuentes oficiales, están por ahora en inglés.",
    links: [
      { href: "/es/blog", label: "Blog de viajes" },
      { href: "/destinations", label: "Guías de destino (en inglés)" },
      { href: "/itineraries", label: "Itinerarios (en inglés)" },
    ],
  },
  cta: {
    title: "Tu próximo viaje, planificado en minutos",
    body: "Dinos adónde y cuándo. Prepararemos los días, compararemos opciones de vuelo y estimaremos el presupuesto.",
    button: "Crea tu plan de viaje gratis",
  },
};

const fr: HomeCopy = {
  meta: {
    title: "AIFlyTrip : planificateur de voyage IA gratuit",
    description:
      "Planificateur de voyage IA gratuit : transformez vos dates, votre budget et vos envies en itinéraire jour par jour, avec des options de vol. Sans inscription.",
  },
  hero: {
    pill: "Planificateur de voyage IA gratuit · sans inscription",
    titleStart: "Planifiez votre voyage avec un",
    titleHighlight: "planificateur IA gratuit",
    lead: "Transformez vos dates, votre budget, votre rythme et vos envies en itinéraire personnalisé jour par jour, avec des options de vol et une estimation du budget que vous pouvez ajuster.",
    primary: "Créez votre plan de voyage gratuit",
    secondary: "Outils gratuits",
    toolsLabel: "Outils gratuits :",
    tools: {
      budget: "Calculateur de budget",
      layover: "Correspondance",
      days: "Combien de jours ?",
    },
    note: "Gratuit et sans compte. AIFlyTrip est un outil de planification et ne réserve ni vols ni hôtels.",
  },
  heroCard: {
    destination: "Lisbonne · 3 jours",
    badge: "Exemple de plan",
    origin: "Londres",
    city: "Lisbonne",
    tags: ["Direct", "Départ le matin", "Économie"],
    days: [
      {
        label: "JOUR 1",
        title: "Arrivée · Baixa et Chiado",
        detail:
          "Dépôt des bagages, balade à plat, coucher de soleil depuis un miradouro",
      },
      {
        label: "JOUR 2",
        title: "Alfama et château Saint-Georges",
        detail: "Tram tôt le matin, vue depuis le château, soirée fado",
      },
      {
        label: "JOUR 3",
        title: "Belém et les quais",
        detail:
          "Monastère, promenade au bord du fleuve, pâtisseries avant le vol",
      },
    ],
    refining: "Ajustement de votre budget…",
    ready: "Plan prêt",
    readyDetail: "Jour par jour · vols · budget",
  },
  tools: {
    eyebrow: "Outils de voyage gratuits",
    title: "Répondez aux grandes questions du voyage en quelques secondes",
    description:
      "Combien il coûtera, si votre correspondance est assez longue et combien de jours il vous faut. Gratuit et sans inscription.",
    seeAll: "Voir tous les outils →",
    slides: {
      budget: {
        label: "Budget",
        eyebrow: "Calculateur de budget de voyage",
        title: "Combien coûtera votre voyage ?",
        body: "Ajoutez vos vols, le prix par nuit et vos dépenses quotidiennes pour voir le total en quelques secondes. Le calculateur complet détaille repas, transports, activités et extras.",
        points: [
          "Total, par personne et par jour",
          "15 devises et une marge de sécurité",
          "Partagez votre budget avec un lien",
        ],
        cta: "Ouvrir le calculateur",
      },
      layover: {
        label: "Correspondance",
        eyebrow: "Vérificateur de temps de correspondance",
        title: "Votre correspondance est-elle assez longue ?",
        body: "Dites-nous ce qui se passe entre vos vols, du changement de terminal au contrôle des passeports, et découvrez si votre correspondance est confortable, serrée ou risquée.",
        points: [
          "Estimation du temps étape par étape",
          "Alertes pour les billets séparés",
          "Conseils pratiques pour les correspondances serrées",
        ],
        cta: "Vérifier votre correspondance",
      },
      days: {
        label: "Combien de jours ?",
        eyebrow: "Planificateur de durée de voyage",
        title: "Combien de jours vous faut-il ?",
        body: "Ajoutez les lieux à visiter et votre façon de voyager. Découvrez combien de jours passer dans chacun, y compris les jours de trajet souvent oubliés.",
        points: [
          "Jours par étape, excursions comprises",
          "Compare le plan à vos jours de congé",
          "Conseils tirés de nos guides de destination",
        ],
        cta: "Calculer la durée",
      },
    },
    layoverExample: (d) => `Exemple · correspondance de ${d}`,
    daysExample: "Exemple · Lisbonne et Porto",
    daysExampleStops: ["Lisbonne", "Porto"],
    openExample: "Ouvrir cet exemple →",
  },
  howItWorks: {
    eyebrow: "Comment ça marche",
    title: "De l'idée à l'itinéraire en trois étapes",
    steps: [
      {
        title: "Décrivez votre voyage",
        description:
          "D'où et vers où vous partez, vos dates, votre budget, votre rythme et ce que vous aimez.",
      },
      {
        title: "Recevez votre plan créé par l'IA",
        description:
          "Un itinéraire jour par jour, un vol suggéré et une estimation du budget, dans la langue de votre choix.",
      },
      {
        title: "Ajustez et vérifiez les détails",
        description:
          "Adaptez le plan à vos envies, puis vérifiez prix, horaires et conditions d'entrée auprès de sources officielles.",
      },
    ],
  },
  features: {
    eyebrow: "Fonctionnalités",
    title: "Planifiez votre voyage sans multiplier les onglets",
    description: "Pensé pour la façon dont on prépare vraiment un voyage.",
    items: [
      {
        title: "Des plans personnalisés jour par jour",
        description:
          "Indiquez vos dates, votre budget, votre rythme et vos envies, et recevez un programme matin, après-midi et soir pour chaque jour.",
      },
      {
        title: "Des options de vol en contexte",
        description:
          "Le planificateur compare les options de vol pour vos dates et explique laquelle convient le mieux, selon le prix, la durée et les escales.",
      },
      {
        title: "Un budget sur lequel vous appuyer",
        description:
          "Consultez une estimation par catégorie, des vols et de l'hébergement aux repas et activités, dans la devise de votre choix.",
      },
    ],
  },
  faqs: [
    {
      question: "Qu'est-ce qu'AIFlyTrip ?",
      answer:
        "AIFlyTrip est un planificateur de voyage IA gratuit. Vous saisissez les détails et préférences de votre voyage, et il crée un itinéraire personnalisé jour par jour, avec un vol suggéré et une estimation du budget. Il propose aussi des outils gratuits : un calculateur de budget, un vérificateur de correspondance et un planificateur de durée de voyage.",
    },
    {
      question: "AIFlyTrip est-il gratuit ?",
      answer:
        "Oui. Créer des plans de voyage, utiliser les outils et comparer les options de vol est gratuit, et vous n'avez pas besoin de compte pour créer un plan. Le seul extra payant est un PDF imprimable facultatif du plan, actuellement en mode test.",
    },
    {
      question: "Puis-je recevoir mon plan de voyage en français ?",
      answer:
        "Oui. Le planificateur en français sélectionne automatiquement le français comme langue du plan, et l'IA rédige tout l'itinéraire en français. Les noms de lieux restent dans leur forme locale.",
    },
    {
      question: "AIFlyTrip réserve-t-il des vols ou des hôtels ?",
      answer:
        "Non. AIFlyTrip vous aide à planifier et à comparer des options, mais n'effectue aucune réservation. Les options de vol proviennent actuellement d'un environnement de test : ce sont des exemples pour planifier, pas des tarifs réels réservables.",
    },
    {
      question: "Les guides de destination et le blog sont-ils en français ?",
      answer:
        "Pour l'instant, nos guides de destination, itinéraires et articles de blog sont en anglais. Nous traduisons le contenu progressivement et ne publions que des traductions relues.",
    },
  ],
  englishGuides: {
    title: "Guides de destination et blog (en anglais)",
    body: "Nos guides sur la meilleure période, la durée du séjour et les incontournables, avec des sources officielles, sont pour l'instant en anglais.",
    links: [
      { href: "/destinations", label: "Guides de destination" },
      { href: "/itineraries", label: "Itinéraires" },
      { href: "/blog", label: "Blog voyage" },
    ],
  },
  cta: {
    title: "Votre prochain voyage, planifié en quelques minutes",
    body: "Dites-nous où et quand. Nous préparerons les journées, comparerons les options de vol et estimerons le budget.",
    button: "Créez votre plan de voyage gratuit",
  },
};

export const HOME_COPY: Record<Locale, HomeCopy> = { en, es, fr };
