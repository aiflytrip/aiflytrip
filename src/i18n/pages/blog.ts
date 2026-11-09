import { type Guide } from "@/content/schema";

type BlogLocale = Guide["locale"];

export type BlogCopy = {
  /** BCP 47 tag for dates and numbers. */
  intl: string;
  home: { name: string; path: string };
  hub: {
    path: string;
    crumb: string;
    meta: { title: string; description: string };
    heading: string;
    intro: string;
    categoriesLabel: string;
    featured: string;
    readMore: string;
    words: string;
    cta: { heading: string; body: string };
    /** For a small blog: a pointer to the full English blog. */
    moreInEnglish?: { text: string; label: string };
  };
  categories: Record<Guide["category"], { label: string; description: string }>;
  article: {
    minRead: string;
    reviewed: string;
    onThisPage: string;
    cta: { heading: string; body: string };
    faqTitle: string;
    related: string;
    itineraries: string;
    destinations: string;
  };
  planner: { href: string; button: string };
  sources: {
    heading: string;
    notice: string;
    reviewedBy: string;
    team: string;
    on: string;
  };
};

const FR: BlogCopy = {
  intl: "fr-FR",
  home: { name: "Accueil", path: "/fr" },
  hub: {
    path: "/fr/blog",
    crumb: "Blog",
    meta: {
      title: "Blog voyage : astuces et droits des passagers",
      description:
        "Des conseils de voyage pratiques : astuces qui marchent, retards et annulations de vol, bagages perdus, contrôle de sécurité et quand réserver un vol.",
    },
    heading: "Blog voyage",
    intro:
      "Des conseils pratiques et sans détour pour mieux voyager : réserver au bon moment, connaître vos droits en cas de retard et passer l'aéroport sans stress. Chaque article renvoie vers des sources officielles pour les règles qui changent.",
    categoriesLabel: "Catégories du blog",
    featured: "À la une",
    readMore: "Lire l'article →",
    words: "mots",
    cta: {
      heading: "Prêt à planifier votre voyage ?",
      body: "Notre planificateur de voyage IA transforme vos dates, votre budget et vos envies en un itinéraire jour par jour avec des options de vol. Gratuit, sans inscription.",
    },
    moreInEnglish: {
      text: "Le blog français vient d'ouvrir. Nos autres articles, sur les vols pas chers, les itinéraires et les bagages, sont en anglais :",
      label: "voir tous les articles (en anglais)",
    },
  },
  categories: {
    flights: {
      label: "Vols",
      description:
        "Trouver des tarifs moins chers, comparer les options et connaître vos droits.",
    },
    itineraries: {
      label: "Itinéraires",
      description: "Des programmes jour par jour réalistes et agréables.",
    },
    planning: {
      label: "Préparer son voyage",
      description: "Les grandes décisions : où, quand et combien de temps.",
    },
    practical: {
      label: "Pratique",
      description: "Bagages, aéroport et ce qu'il faut régler avant de partir.",
    },
  },
  article: {
    minRead: "min de lecture",
    reviewed: "Relu le",
    onThisPage: "Sur cette page",
    cta: {
      heading: "Préparez votre itinéraire en quelques minutes",
      body: "Notre planificateur de voyage IA transforme vos dates, votre budget et vos envies en un programme jour par jour à ajuster. Vérifiez les détails pratiques auprès des sources officielles avant de partir.",
    },
    faqTitle: "Questions fréquentes",
    related: "Articles liés",
    itineraries: "Itinéraires prêts à l'emploi",
    destinations: "Guides de destination",
  },
  planner: {
    href: "/fr/planifier",
    button: "Créez votre plan de voyage gratuit",
  },
  sources: {
    heading: "Sources officielles et pour aller plus loin",
    notice:
      "Les informations pratiques, comme les conditions d'entrée, les prix, les horaires et les jours d'ouverture, changent. Vérifiez-les toujours auprès des sources officielles ci-dessous avant de partir.",
    reviewedBy: "Relu par",
    team: "l'équipe éditoriale d'AIFlyTrip",
    on: "le",
  },
};

export const BLOG_COPY: Record<BlogLocale, BlogCopy> = {
  en: {
    intl: "en-GB",
    home: { name: "Home", path: "/" },
    hub: {
      path: "/blog",
      crumb: "Blog",
      meta: {
        title: "Travel blog: cheap flight tips and trip planning",
        description:
          "Practical travel advice: how to find cheap flights, avoid budget airline fees, build a day-by-day itinerary and plan a trip with confidence.",
      },
      heading: "Travel blog",
      intro:
        "Practical, no-nonsense advice for planning better trips: finding cheaper flights, understanding airline fees and building itineraries that actually work. Every article links to official sources for rules that change.",
      categoriesLabel: "Blog categories",
      featured: "Featured",
      readMore: "Read the article →",
      words: "words",
      cta: {
        heading: "Ready to plan your own trip?",
        body: "Our AI trip planner turns your dates, budget and interests into a day-by-day itinerary with flight options. Free, no account needed.",
      },
    },
    categories: {
      flights: {
        label: "Flights",
        description:
          "Finding cheaper fares, comparing options and avoiding extra fees.",
      },
      itineraries: {
        label: "Itineraries",
        description:
          "Building day-by-day plans that are realistic and enjoyable.",
      },
      planning: {
        label: "Trip planning",
        description: "The big decisions: where, when and how long to go.",
      },
      practical: {
        label: "Practical",
        description:
          "Documents, checklists and things to sort before you leave.",
      },
    },
    article: {
      minRead: "min read",
      reviewed: "Reviewed",
      onThisPage: "On this page",
      cta: {
        heading: "Draft your itinerary in minutes",
        body: "Our AI trip planner turns your dates, budget and interests into a day-by-day plan you can refine. Check practical details with official sources before you travel.",
      },
      faqTitle: "Frequently asked questions",
      related: "Related articles",
      itineraries: "Ready-made itineraries",
      destinations: "Destination guides",
    },
    planner: { href: "/plan", button: "Create your free trip plan" },
    sources: {
      heading: "Official sources and further reading",
      notice:
        "Practical details such as entry requirements, prices, timetables and opening days change. Always confirm them with the official sources below before you travel.",
      reviewedBy: "Last reviewed by the",
      team: "AIFlyTrip editorial team",
      on: "on",
    },
  },
  es: {
    intl: "es-ES",
    home: { name: "Inicio", path: "/es" },
    hub: {
      path: "/es/blog",
      crumb: "Blog",
      meta: {
        title: "Blog de viajes: vuelos baratos e itinerarios",
        description:
          "Consejos prácticos de viaje: cómo funcionan los precios de los vuelos, ejemplos de itinerario de viaje y de vuelo, y cómo planificar mejor.",
      },
      heading: "Blog de viajes",
      intro:
        "Consejos prácticos y sin rodeos para planificar mejores viajes: entender los precios de los vuelos, leer un itinerario y organizar días que funcionen de verdad. Cada artículo enlaza a fuentes oficiales para las normas que cambian.",
      categoriesLabel: "Categorías del blog",
      featured: "Destacado",
      readMore: "Leer el artículo →",
      words: "palabras",
      cta: {
        heading: "¿Listo para planificar tu viaje?",
        body: "Nuestro planificador de viajes con IA convierte tus fechas, presupuesto e intereses en un itinerario día a día con opciones de vuelo. Gratis y sin registro.",
      },
    },
    categories: {
      flights: {
        label: "Vuelos",
        description:
          "Encontrar tarifas más baratas, comparar opciones y evitar cargos extra.",
      },
      itineraries: {
        label: "Itinerarios",
        description: "Planes día a día realistas y agradables de seguir.",
      },
      planning: {
        label: "Planificación",
        description:
          "Las grandes decisiones: adónde, cuándo y por cuánto tiempo.",
      },
      practical: {
        label: "Práctico",
        description:
          "Documentos, listas y lo que conviene resolver antes de salir.",
      },
    },
    article: {
      minRead: "min de lectura",
      reviewed: "Revisado el",
      onThisPage: "En esta página",
      cta: {
        heading: "Crea un borrador de tu itinerario en minutos",
        body: "Nuestro planificador de viajes con IA convierte tus fechas, presupuesto e intereses en un plan día a día que puedes ajustar. Comprueba los detalles prácticos en fuentes oficiales antes de viajar.",
      },
      faqTitle: "Preguntas frecuentes",
      related: "Artículos relacionados",
      itineraries: "Itinerarios listos",
      destinations: "Guías de destino",
    },
    planner: { href: "/es/planificar", button: "Crea tu plan de viaje gratis" },
    sources: {
      heading: "Fuentes oficiales y lecturas recomendadas",
      notice:
        "Los detalles prácticos, como los requisitos de entrada, los precios, los horarios y los días de apertura, cambian. Confírmalos siempre en las fuentes oficiales de abajo antes de viajar.",
      reviewedBy: "Última revisión del",
      team: "equipo editorial de AIFlyTrip",
      on: "el",
    },
  },
  fr: FR,
};
