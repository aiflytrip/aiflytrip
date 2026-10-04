import { type Faq } from "@/content/schema";
import { ASSUMPTIONS as A } from "@/features/tools/layover/layover";
import { type Locale } from "@/i18n/config";

/**
 * Page copy for the free tools and the tools hub, per language. Inline
 * links use [label](/path); links to English-only pages say so in the
 * Spanish and French text. English mirrors the original pages word for word.
 */

export type ToolSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  cards?: { title: string; body: string }[];
};

export type ToolPageCopy = {
  meta: { title: string; description: string };
  crumb: string;
  h1: string;
  intro: string;
  sections: ToolSection[];
  cta: { heading: string; body: string };
  faqs: Faq[];
  related: string;
  ld: { name: string; description: string };
};

export type ToolsHubCopy = {
  meta: { title: string; description: string };
  h1: string;
  intro: string;
  cards: {
    key: "budget" | "layover" | "days" | "planner";
    title: string;
    body: string;
  }[];
  open: string;
  cta: { heading: string; body: string };
};

type ToolsCopy = {
  hub: ToolsHubCopy;
  budget: ToolPageCopy;
  layover: ToolPageCopy;
  days: ToolPageCopy;
};

const en: ToolsCopy = {
  hub: {
    meta: {
      title: "Free travel planning tools",
      description:
        "Free travel tools from AIFlyTrip: a trip budget calculator, layover time checker, trip length planner and AI trip planner. No sign-up needed.",
    },
    h1: "Free travel planning tools",
    intro:
      "Simple, free tools for the questions every trip raises: how long to go for, how much it will cost, whether a connection is long enough, and what to do each day. No sign-up needed.",
    cards: [
      {
        key: "budget",
        title: "Trip budget calculator",
        body: "Add flights, accommodation and daily spending to see your total trip cost, cost per person and per day. Share it with your travel companions.",
      },
      {
        key: "layover",
        title: "Layover time checker",
        body: "Find out whether your connection is comfortable, tight or risky, based on terminals, passport control, bags and whether you're on one ticket.",
      },
      {
        key: "days",
        title: "How many days do I need?",
        body: "Add your stops, pace and day trips to see how many days and nights your trip needs, with days per place and a check against your time off.",
      },
      {
        key: "planner",
        title: "AI trip planner",
        body: "Turn your dates, budget, pace and interests into a personalized day-by-day itinerary with flight options and a budget estimate.",
      },
    ],
    open: "Open the tool →",
    cta: {
      heading: "Planning a whole trip?",
      body: "Our free AI trip planner drafts a day-by-day itinerary with flights and a budget, in minutes.",
    },
  },
  budget: {
    meta: {
      title: "Free trip budget calculator: estimate your travel costs",
      description:
        "Free travel budget calculator: add flights, accommodation, food, transport and activities to see your total trip cost, cost per person and per day.",
    },
    crumb: "Trip budget calculator",
    h1: "Trip budget calculator",
    intro:
      "Work out what your trip will really cost. Add your flights, accommodation and daily spending to see the total, the cost per person and per day, and where your money goes. Free, no sign-up, and you can share the result with your travel companions.",
    sections: [
      {
        id: "how-to-estimate",
        title: "How to estimate each cost",
        cards: [
          {
            title: "Flights",
            body: "Search your real dates and include the bags you'll need, not just the base fare. Our guide on [how to find cheap flights](/blog/how-to-find-cheap-flights) explains how to compare options, and [budget airline fees](/blog/budget-airline-fees-explained) covers the extras.",
          },
          {
            title: "Accommodation",
            body: "Use the total per night for your whole group, including taxes and fees. Many cities charge a tourist tax that may be paid at the property, so check the booking details.",
          },
          {
            title: "Food and drink",
            body: "Think about a typical day: breakfast, lunch, dinner, snacks and drinks. Our [destination guides](/destinations) describe the food scene, and markets and lunch menus are often good value.",
          },
          {
            title: "Local transport",
            body: "Add up a typical day of metro, tram or bus rides. Day passes and rechargeable travel cards can be cheaper if you make several journeys, and walking is free.",
          },
          {
            title: "Activities",
            body: "List the paid sights, tours and experiences you plan, check prices on official websites, and divide by the number of days for a daily average.",
          },
          {
            title: "Extras and buffer",
            body: "Add one-off costs such as travel insurance, visas, airport transfers and gifts. A buffer of 10 to 15 percent covers the small surprises that add up on most trips.",
          },
        ],
      },
      {
        id: "save",
        title: "Ways to bring your budget down",
        paragraphs: [
          "The biggest savings usually come from timing: travelling outside school holidays and peak season lowers flights and accommodation at the same time. After that, where you stay matters most; a well-connected neighbourhood can save on both the room and transport. Our [cheap flight tips](/blog/cheap-flight-tips) and guide to [budget airline fees](/blog/budget-airline-fees-explained) cover many more ways to save.",
          "Packing light avoids checked-bag fees, and choosing the local currency when paying by card abroad is usually better value than paying in your home currency.",
        ],
      },
    ],
    cta: {
      heading: "Want an automatic budget estimate?",
      body: "Our free AI trip planner drafts a day-by-day itinerary with a budget broken down by category, in your currency. No sign-up needed.",
    },
    faqs: [
      {
        question: "How does the trip budget calculator work?",
        answer:
          "Enter your own estimates for flights, accommodation, daily spending and extras. The calculator multiplies daily costs by the number of travellers and days, adds a safety buffer, and shows your total, cost per person and cost per day.",
      },
      {
        question: "Why does it count one more day than the number of nights?",
        answer:
          "You usually spend money on food and transport on both your arrival and departure days, so a four-night trip has five days of daily spending. Accommodation is counted per night.",
      },
      {
        question: "Does the calculator include real prices for destinations?",
        answer:
          "No. Prices change constantly and vary by season, so the calculator uses your own estimates rather than built-in figures. For an automatic estimate, our AI trip planner creates a budget in your currency.",
      },
      {
        question: "Can I share or save my budget?",
        answer:
          "Yes. Your inputs are saved in the page link, so you can copy the share link to send it to travel companions, or use the print button to save it as a PDF.",
      },
    ],
    related:
      "Planning the days too? Read [how to build a travel itinerary](/blog/how-to-build-a-travel-itinerary) or browse our [ready-made itineraries](/itineraries).",
    ld: {
      name: "AIFlyTrip trip budget calculator",
      description:
        "Free calculator that totals flights, accommodation, food, transport, activities and extras into a trip budget per person and per day.",
    },
  },
  layover: {
    meta: {
      title: "Layover time checker: is your connection long enough?",
      description:
        "Free layover time checker: see if your connection is comfortable, tight or risky based on terminals, passport control, bags and whether you're on one ticket.",
    },
    crumb: "Layover time checker",
    h1: "Layover time checker",
    intro:
      "Is your connection long enough? Tell us what happens between your flights, from changing terminals to passport control, and see whether your layover is comfortable, tight or risky, with practical advice. Free, no sign-up.",
    sections: [
      {
        id: "how-it-estimates",
        title: "How the estimate works",
        paragraphs: [
          `The checker adds a rough time for each step of your connection: about ${A.deplaneSmall} minutes to leave the plane and walk at a smaller airport or ${A.deplaneLarge} at a large hub, ${A.terminalChange} for a terminal change, ${A.passportControl} for passport control, ${A.securityAgain} for security again and ${A.recheckBags} to collect and re-check bags. It allows ${A.boardingCloses} minutes because boarding usually closes before departure, and ${A.perExtraFactor} more for each extra factor such as travelling with children.`,
          `With separate tickets it adds a ${A.separateTicketsBuffer}-minute buffer, because a late first flight is your risk rather than the airline's. These are planning assumptions, not official figures: real times vary by airport, time of day and queue lengths.`,
        ],
      },
      {
        id: "single-or-separate",
        title: "One ticket or separate tickets?",
        paragraphs: [
          "This matters more than the number of minutes. When both flights are on one ticket, the airline is responsible for getting you to your final destination and should only sell connections that meet its minimum connection time. If a delay makes you miss the second flight, it will normally rebook you.",
          "With separate tickets, the second airline usually has no obligation to wait or rebook you. Combining tickets can save money, as our guide on [how to find cheap flights](/blog/how-to-find-cheap-flights) explains, but leave a much longer gap.",
        ],
      },
      {
        id: "if-you-miss",
        title: "If you miss your connection",
        paragraphs: [
          "On a single ticket, go to the airline's transfer desk or use its app to be rebooked, and keep receipts for any food or accommodation. Depending on where you're flying and why you were delayed, you may have rights to care and, in some cases, compensation; check official sources such as the EU's air passenger rights pages or the UK Civil Aviation Authority.",
        ],
      },
    ],
    cta: {
      heading: "Plan the rest of the trip",
      body: "Our free AI trip planner builds a day-by-day itinerary around your flight times, with a budget estimate. No sign-up needed.",
    },
    faqs: [
      {
        question: "How does the layover time checker work?",
        answer:
          "You enter your layover length and what the connection involves, such as changing terminals, passport control or re-checking bags. The checker adds a rough time for each step and compares the total with your layover to show how much margin you have.",
      },
      {
        question: "Is this the airline's minimum connection time?",
        answer:
          "No. Airlines and airports set official minimum connection times for each airport. On a single ticket, the airline should only sell connections that meet them. This tool uses transparent planning assumptions to judge how comfortable a connection feels.",
      },
      {
        question: "Why does 'not sure' count as yes?",
        answer:
          "If you don't know whether you'll change terminals or go through passport control, it's safer to plan as if you will. The checker then suggests how to find out, for example by asking at check-in.",
      },
      {
        question: "What if my flights are on separate tickets?",
        answer:
          "The checker adds a large buffer and a warning. With separate tickets, the second airline usually isn't responsible if a delay on the first flight makes you miss it, so you may need to buy a new ticket.",
      },
    ],
    related:
      "Working out costs too? Try our free [trip budget calculator](/tools/trip-budget-calculator).",
    ld: {
      name: "AIFlyTrip layover time checker",
      description:
        "Free tool that estimates whether a flight connection is comfortable, tight or risky from the steps it involves.",
    },
  },
  days: {
    meta: {
      title: "How many days do I need? Free trip length planner",
      description:
        "Free trip length planner: add your stops, pace and day trips to see how many days and nights you need, with days per place and a check against your time off.",
    },
    crumb: "How many days do I need?",
    h1: "How many days do I need?",
    intro:
      "Add the places you want to visit and how you like to travel. The planner suggests how many days to spend in each, adds the travel days people often forget and checks the plan against the time you have. Free, no sign-up.",
    sections: [
      {
        id: "how-it-works",
        title: "How the planner works",
        paragraphs: [
          "It uses the same rules of thumb as our guide on [how many days you need for a trip](/blog/how-many-days-for-a-trip). At a moderate pace, a big city with many neighbourhoods and museums gets four days, a smaller city or town two, and a countryside or beach base three. Each day trip adds a day, and no stop gets fewer than two days, because changing hotels more often eats into your time.",
          "A relaxed pace adds a day per stop and a fast pace removes one. Travelling with children or older relatives adds a day per stop, because every move takes more effort.",
        ],
      },
      {
        id: "travel-days",
        title: "Don't forget travel days",
        paragraphs: [
          "Your real time on the ground is shorter than your dates. The planner adds half a day for each move between stops, or a full day when journeys take more than a few hours, and time at each end of the trip. A long-haul flight across several time zones adds a full day at each end, so plan a gentle first day.",
          "If a place is within an hour or two of your base, a day trip is often easier than moving hotels. Add it as a day trip from the nearest base instead of a separate stop.",
        ],
      },
      {
        id: "how-many-stops",
        title: "How many stops is too many?",
        paragraphs: [
          "A useful guideline is about one base per three to four days. A week works well with one or two bases; two weeks can comfortably include three or four. The planner warns you when your plan has more stops than that, because frequent travel days make a trip tiring.",
          "Our guide on [how to plan a trip](/blog/how-to-plan-a-trip) covers the next steps once you know your trip length.",
        ],
      },
    ],
    cta: {
      heading: "Turn your days into a plan",
      body: "Our free AI trip planner builds a day-by-day itinerary for the days you have, with flight options and a budget estimate. No sign-up needed.",
    },
    faqs: [
      {
        question: "How does the trip length planner work?",
        answer:
          "Add each place you want to visit, choose whether it's a big city, a smaller town or a countryside base, and add any day trips. The planner suggests days for each stop, adds travel days between stops and at each end, and adjusts for your pace and who you travel with.",
      },
      {
        question: "Why does it suggest at least two days per stop?",
        answer:
          "Every hotel change costs time for packing, checking out, travelling and settling in. Two nights is the minimum for a stop to feel worthwhile; three or more lets you relax and take day trips.",
      },
      {
        question: "Does it count travel days?",
        answer:
          "Yes. It adds half a day for each move between stops, or a full day if journeys take more than a few hours, plus time at the start and end of the trip. Long-haul flights add more, because the journey and time-zone change can take most of a day at each end.",
      },
      {
        question: "What if I don't have enough days?",
        answer:
          "Enter the days you have and the planner shows whether your plan fits. If it's too packed, it suggests which stop to drop or turn into a day trip. Fewer stops usually make a better trip.",
      },
    ],
    related:
      "More free tools: [trip budget calculator](/tools/trip-budget-calculator) and [layover time checker](/tools/layover-time-checker).",
    ld: {
      name: "AIFlyTrip trip length planner",
      description:
        "Free tool that suggests how many days a trip needs, with days per stop and travel days.",
    },
  },
};

const es: ToolsCopy = {
  hub: {
    meta: {
      title: "Herramientas gratis para planificar viajes",
      description:
        "Herramientas de viaje gratis: calculadora de presupuesto, comprobador de escalas, planificador de la duración del viaje y planificador con IA. Sin registro.",
    },
    h1: "Herramientas gratis para planificar tu viaje",
    intro:
      "Herramientas sencillas y gratuitas para las preguntas que surgen en todo viaje: cuántos días ir, cuánto costará, si una escala es suficiente y qué hacer cada día. Sin registro.",
    cards: [
      {
        key: "budget",
        title: "Calculadora de presupuesto de viaje",
        body: "Añade vuelos, alojamiento y gasto diario para ver el coste total del viaje, por persona y por día. Compártelo con quienes viajan contigo.",
      },
      {
        key: "layover",
        title: "Comprobador de tiempo de escala",
        body: "Descubre si tu conexión es holgada, justa o arriesgada según la terminal, el control de pasaportes, el equipaje y si viajas con un solo billete.",
      },
      {
        key: "days",
        title: "¿Cuántos días necesito?",
        body: "Añade tus paradas, tu ritmo y tus excursiones para ver cuántos días y noches necesita tu viaje, con los días por lugar y una comparación con tus días libres.",
      },
      {
        key: "planner",
        title: "Planificador de viajes con IA",
        body: "Convierte tus fechas, presupuesto, ritmo e intereses en un itinerario personalizado día a día, con opciones de vuelo y un presupuesto estimado, en español.",
      },
    ],
    open: "Abrir la herramienta →",
    cta: {
      heading: "¿Planificas un viaje completo?",
      body: "Nuestro planificador de viajes con IA gratuito prepara en minutos un itinerario día a día con vuelos y presupuesto, en español.",
    },
  },
  budget: {
    meta: {
      title: "Calculadora de presupuesto de viaje gratis",
      description:
        "Calculadora de presupuesto de viaje gratis: suma vuelos, alojamiento, comida, transporte y actividades para ver el coste total, por persona y por día.",
    },
    crumb: "Calculadora de presupuesto de viaje",
    h1: "Calculadora de presupuesto de viaje",
    intro:
      "Calcula lo que te costará de verdad tu viaje. Añade vuelos, alojamiento y gasto diario para ver el total, el coste por persona y por día, y en qué se va tu dinero. Gratis, sin registro, y puedes compartir el resultado con quienes viajan contigo.",
    sections: [
      {
        id: "como-estimar",
        title: "Cómo estimar cada gasto",
        cards: [
          {
            title: "Vuelos",
            body: "Busca tus fechas reales e incluye el equipaje que vas a necesitar, no solo la tarifa básica. Nuestras guías (en inglés) sobre [cómo encontrar vuelos baratos](/blog/how-to-find-cheap-flights) y los [cargos de las aerolíneas de bajo coste](/blog/budget-airline-fees-explained) explican cómo comparar y qué extras tener en cuenta.",
          },
          {
            title: "Alojamiento",
            body: "Usa el total por noche para todo el grupo, con impuestos y tasas. Muchas ciudades cobran una tasa turística que se paga en el alojamiento, así que revisa los detalles de la reserva.",
          },
          {
            title: "Comida y bebida",
            body: "Piensa en un día normal: desayuno, comida, cena, algo de picar y bebidas. Los mercados y los menús del día suelen salir a buen precio.",
          },
          {
            title: "Transporte local",
            body: "Suma un día normal de metro, tranvía o autobús. Los abonos diarios y las tarjetas recargables pueden salir más baratos si haces varios trayectos, y caminar es gratis.",
          },
          {
            title: "Actividades",
            body: "Haz una lista de las visitas, excursiones y experiencias de pago que planeas, consulta los precios en las webs oficiales y divide entre el número de días para obtener una media diaria.",
          },
          {
            title: "Extras y margen",
            body: "Añade gastos únicos como el seguro de viaje, los visados, los traslados al aeropuerto y los regalos. Un margen del 10 al 15 % cubre los pequeños imprevistos que se acumulan en casi todos los viajes.",
          },
        ],
      },
      {
        id: "ahorrar",
        title: "Cómo reducir tu presupuesto",
        paragraphs: [
          "El mayor ahorro suele venir de las fechas: viajar fuera de las vacaciones escolares y de la temporada alta abarata a la vez los vuelos y el alojamiento. Después, lo que más influye es dónde te alojas; un barrio bien comunicado puede ahorrarte tanto en la habitación como en transporte. Nuestros [consejos para encontrar vuelos baratos](/blog/cheap-flight-tips) (en inglés) incluyen muchas más ideas.",
          "Viajar con poco equipaje evita los cargos por maleta facturada y, al pagar con tarjeta en el extranjero, elegir la moneda local suele salir más barato que pagar en tu propia moneda.",
        ],
      },
    ],
    cta: {
      heading: "¿Quieres un presupuesto automático?",
      body: "Nuestro planificador de viajes con IA gratuito prepara un itinerario día a día con un presupuesto por categorías, en tu moneda y en español. Sin registro.",
    },
    faqs: [
      {
        question: "¿Cómo funciona la calculadora de presupuesto de viaje?",
        answer:
          "Introduce tus propias estimaciones de vuelos, alojamiento, gasto diario y extras. La calculadora multiplica los gastos diarios por el número de viajeros y de días, añade un margen de seguridad y muestra el total, el coste por persona y el coste por día.",
      },
      {
        question: "¿Por qué cuenta un día más que el número de noches?",
        answer:
          "Normalmente gastas en comida y transporte tanto el día de llegada como el de salida, así que un viaje de cuatro noches tiene cinco días de gastos diarios. El alojamiento se cuenta por noche.",
      },
      {
        question: "¿La calculadora incluye precios reales de los destinos?",
        answer:
          "No. Los precios cambian constantemente y varían según la temporada, así que la calculadora usa tus propias estimaciones en lugar de cifras incluidas. Si quieres una estimación automática, nuestro planificador de viajes con IA crea un presupuesto en tu moneda.",
      },
      {
        question: "¿Puedo compartir o guardar mi presupuesto?",
        answer:
          "Sí. Tus datos se guardan en el enlace de la página, así que puedes copiar el enlace para enviarlo a quienes viajan contigo o usar el botón de imprimir para guardarlo como PDF.",
      },
    ],
    related:
      "¿Cuántos días vas? Prueba nuestro planificador [¿Cuántos días necesito?](/es/herramientas/cuantos-dias) o el [comprobador de tiempo de escala](/es/herramientas/tiempo-de-escala).",
    ld: {
      name: "Calculadora de presupuesto de viaje de AIFlyTrip",
      description:
        "Calculadora gratuita que suma vuelos, alojamiento, comida, transporte, actividades y extras en un presupuesto de viaje por persona y por día.",
    },
  },
  layover: {
    meta: {
      title: "Tiempo de escala: ¿tienes tiempo para tu conexión?",
      description:
        "Comprobador de escalas gratis: descubre si tu conexión es holgada, justa o arriesgada según la terminal, el control de pasaportes, el equipaje y tu billete.",
    },
    crumb: "Comprobador de tiempo de escala",
    h1: "Comprobador de tiempo de escala",
    intro:
      "¿Te da tiempo a hacer la conexión? Cuéntanos qué pasa entre tus vuelos, desde cambiar de terminal hasta el control de pasaportes, y descubre si tu escala es holgada, justa o arriesgada, con consejos prácticos. Gratis y sin registro.",
    sections: [
      {
        id: "como-se-calcula",
        title: "Cómo se calcula",
        paragraphs: [
          `El comprobador suma un tiempo aproximado para cada paso de tu conexión: unos ${A.deplaneSmall} minutos para bajar del avión y caminar en un aeropuerto pequeño o ${A.deplaneLarge} en uno grande, ${A.terminalChange} para cambiar de terminal, ${A.passportControl} para el control de pasaportes, ${A.securityAgain} para volver a pasar el control de seguridad y ${A.recheckBags} para recoger y volver a facturar el equipaje. Reserva ${A.boardingCloses} minutos porque el embarque suele cerrar antes de la salida, y ${A.perExtraFactor} más por cada factor adicional, como viajar con niños.`,
          `Con billetes separados añade un margen de ${A.separateTicketsBuffer} minutos, porque si el primer vuelo se retrasa el riesgo es tuyo y no de la aerolínea. Son estimaciones para planificar, no cifras oficiales: los tiempos reales varían según el aeropuerto, la hora del día y las colas.`,
        ],
      },
      {
        id: "billete-unico-o-separado",
        title: "¿Un solo billete o billetes separados?",
        paragraphs: [
          "Esto importa más que los minutos. Cuando los dos vuelos están en el mismo billete, la aerolínea es responsable de llevarte a tu destino final y solo debería vender conexiones que cumplan su tiempo mínimo de conexión. Si un retraso te hace perder el segundo vuelo, normalmente te reubicará.",
          "Con billetes separados, la segunda aerolínea no suele tener obligación de esperarte ni de reubicarte. Combinar billetes puede ahorrar dinero, como explica nuestra guía (en inglés) sobre [cómo encontrar vuelos baratos](/blog/how-to-find-cheap-flights), pero deja mucho más margen.",
        ],
      },
      {
        id: "si-pierdes-la-conexion",
        title: "Si pierdes la conexión",
        paragraphs: [
          "Con un solo billete, ve al mostrador de tránsito de la aerolínea o usa su app para que te reubique, y guarda los recibos de comida o alojamiento. Según dónde vueles y el motivo del retraso, puedes tener derecho a asistencia y, en algunos casos, a una compensación; consulta fuentes oficiales como las páginas de la UE sobre los derechos de los pasajeros aéreos o la Agencia Estatal de Seguridad Aérea (AESA).",
        ],
      },
    ],
    cta: {
      heading: "Planifica el resto del viaje",
      body: "Nuestro planificador de viajes con IA gratuito crea un itinerario día a día según tus horarios de vuelo, con un presupuesto estimado y en español. Sin registro.",
    },
    faqs: [
      {
        question: "¿Cómo funciona el comprobador de tiempo de escala?",
        answer:
          "Introduces la duración de tu escala y lo que implica la conexión, como cambiar de terminal, pasar el control de pasaportes o volver a facturar el equipaje. El comprobador suma un tiempo aproximado para cada paso y lo compara con tu escala para mostrarte el margen que tienes.",
      },
      {
        question: "¿Es el tiempo mínimo de conexión de la aerolínea?",
        answer:
          "No. Las aerolíneas y los aeropuertos fijan tiempos mínimos de conexión oficiales para cada aeropuerto. Con un solo billete, la aerolínea solo debería vender conexiones que los cumplan. Esta herramienta usa estimaciones transparentes para valorar lo cómoda que resulta una conexión.",
      },
      {
        question: "¿Por qué «No estoy seguro» cuenta como sí?",
        answer:
          "Si no sabes si cambiarás de terminal o pasarás el control de pasaportes, es más seguro planificar como si fuera a ocurrir. El comprobador te sugiere entonces cómo averiguarlo, por ejemplo preguntando al facturar.",
      },
      {
        question: "¿Y si mis vuelos están en billetes separados?",
        answer:
          "El comprobador añade un margen amplio y un aviso. Con billetes separados, la segunda aerolínea normalmente no es responsable si un retraso del primer vuelo te hace perderlo, así que podrías tener que comprar un billete nuevo.",
      },
    ],
    related:
      "¿Calculas también los gastos? Prueba nuestra [calculadora de presupuesto de viaje](/es/herramientas/calculadora-presupuesto-viaje) gratis.",
    ld: {
      name: "Comprobador de tiempo de escala de AIFlyTrip",
      description:
        "Herramienta gratuita que estima si una conexión de vuelos es holgada, justa o arriesgada según los pasos que implica.",
    },
  },
  days: {
    meta: {
      title: "¿Cuántos días necesito? Planificador de viaje gratis",
      description:
        "Planificador gratis de la duración del viaje: añade paradas, ritmo y excursiones para ver cuántos días y noches necesitas, con los días por lugar.",
    },
    crumb: "¿Cuántos días necesito?",
    h1: "¿Cuántos días necesito para mi viaje?",
    intro:
      "Añade los lugares que quieres visitar y cómo te gusta viajar. El planificador sugiere cuántos días pasar en cada uno, suma los días de viaje que se suelen olvidar y compara el plan con el tiempo que tienes. Gratis y sin registro.",
    sections: [
      {
        id: "como-funciona",
        title: "Cómo funciona el planificador",
        paragraphs: [
          "Usa las mismas reglas prácticas que nuestra guía (en inglés) sobre [cuántos días necesitas para un viaje](/blog/how-many-days-for-a-trip). A un ritmo moderado, una gran ciudad con muchos barrios y museos recibe cuatro días, una ciudad pequeña o un pueblo dos, y una base en el campo o la playa tres. Cada excursión suma un día, y ninguna parada baja de dos días, porque cambiar de hotel más a menudo te quita tiempo.",
          "Un ritmo tranquilo suma un día por parada y uno rápido resta uno. Viajar con niños o con personas mayores suma un día por parada, porque cada traslado cuesta más esfuerzo.",
        ],
      },
      {
        id: "dias-de-viaje",
        title: "No olvides los días de viaje",
        paragraphs: [
          "El tiempo real en destino es menor que tus fechas. El planificador suma medio día por cada traslado entre paradas, o un día entero si los trayectos duran más de unas horas, y tiempo al principio y al final del viaje. Un vuelo de largo recorrido con varios husos horarios suma un día entero en cada extremo, así que planea un primer día tranquilo.",
          "Si un lugar está a una o dos horas de tu base, una excursión de un día suele ser más cómoda que cambiar de hotel. Añádelo como excursión desde la base más cercana en lugar de como una parada aparte.",
        ],
      },
      {
        id: "cuantas-paradas",
        title: "¿Cuántas paradas son demasiadas?",
        paragraphs: [
          "Una buena referencia es una base por cada tres o cuatro días. Una semana funciona bien con una o dos bases; dos semanas pueden incluir cómodamente tres o cuatro. El planificador te avisa cuando tu plan tiene más paradas, porque los traslados frecuentes hacen que el viaje canse.",
          "Cuando sepas cuántos días vas, nuestro [planificador de viajes con IA](/plan?lang=es) puede preparar el itinerario día a día en español.",
        ],
      },
    ],
    cta: {
      heading: "Convierte tus días en un plan",
      body: "Nuestro planificador de viajes con IA gratuito crea un itinerario día a día para los días que tienes, con opciones de vuelo y un presupuesto estimado, en español. Sin registro.",
    },
    faqs: [
      {
        question: "¿Cómo funciona el planificador de duración del viaje?",
        answer:
          "Añade cada lugar que quieres visitar, elige si es una gran ciudad, un pueblo o una base en el campo, y añade las excursiones. El planificador sugiere los días de cada parada, suma los días de viaje entre paradas y al principio y al final, y se ajusta a tu ritmo y a con quién viajas.",
      },
      {
        question: "¿Por qué sugiere al menos dos días por parada?",
        answer:
          "Cada cambio de hotel cuesta tiempo: hacer la maleta, dejar la habitación, viajar e instalarte. Dos noches es el mínimo para que una parada merezca la pena; tres o más te permiten relajarte y hacer excursiones.",
      },
      {
        question: "¿Cuenta los días de viaje?",
        answer:
          "Sí. Suma medio día por cada traslado entre paradas, o un día entero si los trayectos duran más de unas horas, además de tiempo al principio y al final del viaje. Los vuelos de largo recorrido suman más, porque el trayecto y el cambio de huso horario pueden ocupar casi un día en cada extremo.",
      },
      {
        question: "¿Y si no tengo días suficientes?",
        answer:
          "Introduce los días que tienes y el planificador te muestra si tu plan encaja. Si está demasiado apretado, te sugiere qué parada quitar o convertir en excursión. Menos paradas suelen dar un viaje mejor.",
      },
    ],
    related:
      "Más herramientas gratis: [calculadora de presupuesto de viaje](/es/herramientas/calculadora-presupuesto-viaje) y [comprobador de tiempo de escala](/es/herramientas/tiempo-de-escala).",
    ld: {
      name: "Planificador de duración del viaje de AIFlyTrip",
      description:
        "Herramienta gratuita que sugiere cuántos días necesita un viaje, con los días por parada y los días de viaje.",
    },
  },
};

const fr: ToolsCopy = {
  hub: {
    meta: {
      title: "Outils gratuits pour planifier un voyage",
      description:
        "Outils de voyage gratuits : calculateur de budget, vérificateur de correspondance, planificateur de durée de voyage et planificateur IA. Sans inscription.",
    },
    h1: "Outils gratuits pour planifier votre voyage",
    intro:
      "Des outils simples et gratuits pour les questions que pose chaque voyage : combien de temps partir, combien cela coûtera, si une correspondance est assez longue et que faire chaque jour. Sans inscription.",
    cards: [
      {
        key: "budget",
        title: "Calculateur de budget de voyage",
        body: "Ajoutez vols, hébergement et dépenses quotidiennes pour voir le coût total du voyage, par personne et par jour. Partagez-le avec vos compagnons de voyage.",
      },
      {
        key: "layover",
        title: "Vérificateur de temps de correspondance",
        body: "Découvrez si votre correspondance est confortable, serrée ou risquée selon le terminal, le contrôle des passeports, les bagages et le type de billet.",
      },
      {
        key: "days",
        title: "Combien de jours faut-il ?",
        body: "Ajoutez vos étapes, votre rythme et vos excursions pour voir combien de jours et de nuits il vous faut, avec les jours par lieu et une comparaison avec vos congés.",
      },
      {
        key: "planner",
        title: "Planificateur de voyage IA",
        body: "Transformez vos dates, votre budget, votre rythme et vos envies en itinéraire personnalisé jour par jour, avec des options de vol et un budget estimé, en français.",
      },
    ],
    open: "Ouvrir l'outil →",
    cta: {
      heading: "Vous préparez tout un voyage ?",
      body: "Notre planificateur de voyage IA gratuit rédige en quelques minutes un itinéraire jour par jour avec vols et budget, en français.",
    },
  },
  budget: {
    meta: {
      title: "Calculateur de budget de voyage gratuit",
      description:
        "Calculateur de budget de voyage gratuit : additionnez vols, hébergement, repas, transports et activités pour voir le coût total, par personne et par jour.",
    },
    crumb: "Calculateur de budget de voyage",
    h1: "Calculateur de budget de voyage",
    intro:
      "Découvrez ce que votre voyage va vraiment coûter. Ajoutez vos vols, votre hébergement et vos dépenses quotidiennes pour voir le total, le coût par personne et par jour, et où part votre argent. Gratuit, sans inscription, et vous pouvez partager le résultat avec vos compagnons de voyage.",
    sections: [
      {
        id: "estimer-chaque-poste",
        title: "Comment estimer chaque dépense",
        cards: [
          {
            title: "Vols",
            body: "Cherchez vos vraies dates et incluez les bagages dont vous aurez besoin, pas seulement le tarif de base. Nos guides (en anglais) pour [trouver des vols pas chers](/blog/how-to-find-cheap-flights) et sur [les frais des compagnies low cost](/blog/budget-airline-fees-explained) expliquent comment comparer et quels suppléments prévoir.",
          },
          {
            title: "Hébergement",
            body: "Utilisez le total par nuit pour tout le groupe, taxes et frais compris. Beaucoup de villes prélèvent une taxe de séjour payable sur place : vérifiez les détails de la réservation.",
          },
          {
            title: "Repas et boissons",
            body: "Pensez à une journée type : petit-déjeuner, déjeuner, dîner, en-cas et boissons. Les marchés et les formules du midi sont souvent avantageux.",
          },
          {
            title: "Transports locaux",
            body: "Additionnez une journée type de métro, tram ou bus. Les pass journée et les cartes rechargeables peuvent revenir moins cher si vous faites plusieurs trajets, et la marche est gratuite.",
          },
          {
            title: "Activités",
            body: "Listez les visites, excursions et expériences payantes prévues, vérifiez les prix sur les sites officiels et divisez par le nombre de jours pour obtenir une moyenne quotidienne.",
          },
          {
            title: "Extras et marge",
            body: "Ajoutez les dépenses ponctuelles comme l'assurance voyage, les visas, les transferts aéroport et les cadeaux. Une marge de 10 à 15 % couvre les petits imprévus qui s'accumulent lors de la plupart des voyages.",
          },
        ],
      },
      {
        id: "economiser",
        title: "Comment réduire votre budget",
        paragraphs: [
          "Les plus grosses économies viennent généralement des dates : voyager en dehors des vacances scolaires et de la haute saison fait baisser à la fois le prix des vols et de l'hébergement. Ensuite, c'est le quartier qui compte le plus ; un quartier bien desservi permet d'économiser sur la chambre comme sur les transports. Nos [astuces pour des vols pas chers](/blog/cheap-flight-tips) (en anglais) donnent bien d'autres idées.",
          "Voyager léger évite les frais de bagage en soute et, en payant par carte à l'étranger, choisir la devise locale revient généralement moins cher que payer dans votre propre devise.",
        ],
      },
    ],
    cta: {
      heading: "Envie d'un budget automatique ?",
      body: "Notre planificateur de voyage IA gratuit rédige un itinéraire jour par jour avec un budget détaillé par catégorie, dans votre devise et en français. Sans inscription.",
    },
    faqs: [
      {
        question: "Comment fonctionne le calculateur de budget de voyage ?",
        answer:
          "Saisissez vos propres estimations pour les vols, l'hébergement, les dépenses quotidiennes et les extras. Le calculateur multiplie les dépenses quotidiennes par le nombre de voyageurs et de jours, ajoute une marge de sécurité et affiche le total, le coût par personne et le coût par jour.",
      },
      {
        question:
          "Pourquoi compte-t-il un jour de plus que le nombre de nuits ?",
        answer:
          "On dépense généralement pour les repas et les transports le jour de l'arrivée comme celui du départ : un voyage de quatre nuits compte donc cinq jours de dépenses. L'hébergement est compté par nuit.",
      },
      {
        question:
          "Le calculateur contient-il les vrais prix des destinations ?",
        answer:
          "Non. Les prix changent sans cesse et varient selon la saison : le calculateur utilise donc vos propres estimations plutôt que des chiffres intégrés. Pour une estimation automatique, notre planificateur de voyage IA crée un budget dans votre devise.",
      },
      {
        question: "Puis-je partager ou enregistrer mon budget ?",
        answer:
          "Oui. Vos données sont enregistrées dans le lien de la page : copiez le lien de partage pour l'envoyer à vos compagnons de voyage, ou utilisez le bouton d'impression pour l'enregistrer en PDF.",
      },
    ],
    related:
      "Combien de temps partez-vous ? Essayez notre outil [Combien de jours faut-il ?](/fr/outils/combien-de-jours) ou le [vérificateur de temps de correspondance](/fr/outils/temps-de-correspondance).",
    ld: {
      name: "Calculateur de budget de voyage d'AIFlyTrip",
      description:
        "Calculateur gratuit qui additionne vols, hébergement, repas, transports, activités et extras en un budget de voyage par personne et par jour.",
    },
  },
  layover: {
    meta: {
      title: "Temps de correspondance : est-ce assez long ?",
      description:
        "Vérificateur gratuit : votre correspondance est-elle confortable, serrée ou risquée ? Selon le terminal, les passeports, les bagages et le type de billet.",
    },
    crumb: "Vérificateur de temps de correspondance",
    h1: "Vérificateur de temps de correspondance",
    intro:
      "Votre correspondance est-elle assez longue ? Dites-nous ce qui se passe entre vos vols, du changement de terminal au contrôle des passeports, et découvrez si elle est confortable, serrée ou risquée, avec des conseils pratiques. Gratuit et sans inscription.",
    sections: [
      {
        id: "comment-ca-marche",
        title: "Comment l'estimation est calculée",
        paragraphs: [
          `Le vérificateur additionne une durée approximative pour chaque étape de votre correspondance : environ ${A.deplaneSmall} minutes pour descendre de l'avion et marcher dans un petit aéroport ou ${A.deplaneLarge} dans un grand, ${A.terminalChange} pour changer de terminal, ${A.passportControl} pour le contrôle des passeports, ${A.securityAgain} pour repasser le contrôle de sûreté et ${A.recheckBags} pour récupérer et réenregistrer vos bagages. Il prévoit ${A.boardingCloses} minutes car l'embarquement ferme généralement avant le départ, et ${A.perExtraFactor} de plus pour chaque facteur supplémentaire, comme voyager avec des enfants.`,
          `Avec des billets séparés, il ajoute une marge de ${A.separateTicketsBuffer} minutes, car un premier vol en retard est alors votre risque et non celui de la compagnie. Ce sont des hypothèses de planification, pas des chiffres officiels : les durées réelles varient selon l'aéroport, l'heure et les files d'attente.`,
        ],
      },
      {
        id: "billet-unique-ou-separe",
        title: "Billet unique ou billets séparés ?",
        paragraphs: [
          "C'est plus important que le nombre de minutes. Quand les deux vols sont sur le même billet, la compagnie est responsable de vous amener à votre destination finale et ne devrait vendre que des correspondances qui respectent son temps minimal de correspondance. Si un retard vous fait manquer le second vol, elle vous replacera normalement.",
          "Avec des billets séparés, la seconde compagnie n'a généralement aucune obligation de vous attendre ni de vous replacer. Combiner des billets peut faire économiser, comme l'explique notre guide (en anglais) pour [trouver des vols pas chers](/blog/how-to-find-cheap-flights), mais prévoyez une marge bien plus longue.",
        ],
      },
      {
        id: "si-vous-manquez",
        title: "Si vous manquez votre correspondance",
        paragraphs: [
          "Avec un billet unique, rendez-vous au comptoir de transit de la compagnie ou utilisez son application pour être replacé, et gardez les reçus de repas ou d'hébergement. Selon votre trajet et la cause du retard, vous pouvez avoir droit à une prise en charge et, dans certains cas, à une indemnisation ; consultez des sources officielles comme les pages de l'UE sur les droits des passagers aériens ou la Direction générale de l'aviation civile (DGAC).",
        ],
      },
    ],
    cta: {
      heading: "Planifiez le reste du voyage",
      body: "Notre planificateur de voyage IA gratuit construit un itinéraire jour par jour autour de vos horaires de vol, avec un budget estimé et en français. Sans inscription.",
    },
    faqs: [
      {
        question:
          "Comment fonctionne le vérificateur de temps de correspondance ?",
        answer:
          "Vous saisissez la durée de votre correspondance et ce qu'elle implique, comme changer de terminal, passer le contrôle des passeports ou réenregistrer vos bagages. Le vérificateur additionne une durée approximative pour chaque étape et la compare à votre correspondance pour montrer la marge dont vous disposez.",
      },
      {
        question: "Est-ce le temps minimal de correspondance de la compagnie ?",
        answer:
          "Non. Les compagnies et les aéroports fixent des temps minimaux de correspondance officiels pour chaque aéroport. Avec un billet unique, la compagnie ne devrait vendre que des correspondances qui les respectent. Cet outil utilise des hypothèses transparentes pour juger du confort d'une correspondance.",
      },
      {
        question: "Pourquoi « Je ne sais pas » compte-t-il comme oui ?",
        answer:
          "Si vous ne savez pas si vous changerez de terminal ou passerez le contrôle des passeports, il est plus sûr de prévoir que ce sera le cas. Le vérificateur vous suggère alors comment le savoir, par exemple en demandant à l'enregistrement.",
      },
      {
        question: "Et si mes vols sont sur des billets séparés ?",
        answer:
          "Le vérificateur ajoute une large marge et un avertissement. Avec des billets séparés, la seconde compagnie n'est généralement pas responsable si un retard du premier vol vous le fait manquer : vous pourriez devoir acheter un nouveau billet.",
      },
    ],
    related:
      "Vous calculez aussi les dépenses ? Essayez notre [calculateur de budget de voyage](/fr/outils/calculateur-budget-voyage) gratuit.",
    ld: {
      name: "Vérificateur de temps de correspondance d'AIFlyTrip",
      description:
        "Outil gratuit qui estime si une correspondance aérienne est confortable, serrée ou risquée selon les étapes qu'elle implique.",
    },
  },
  days: {
    meta: {
      title: "Combien de jours faut-il ? Planificateur gratuit",
      description:
        "Planificateur de durée de voyage gratuit : ajoutez étapes, rythme et excursions pour voir combien de jours et de nuits il vous faut, avec les jours par lieu.",
    },
    crumb: "Combien de jours faut-il ?",
    h1: "Combien de jours faut-il pour votre voyage ?",
    intro:
      "Ajoutez les lieux que vous voulez visiter et votre façon de voyager. Le planificateur suggère combien de jours passer dans chacun, ajoute les jours de trajet souvent oubliés et compare le plan au temps dont vous disposez. Gratuit et sans inscription.",
    sections: [
      {
        id: "fonctionnement",
        title: "Comment fonctionne le planificateur",
        paragraphs: [
          "Il applique les mêmes règles pratiques que notre guide (en anglais) sur [le nombre de jours nécessaires pour un voyage](/blog/how-many-days-for-a-trip). À un rythme modéré, une grande ville avec de nombreux quartiers et musées reçoit quatre jours, une petite ville ou un village deux, et une étape à la campagne ou au bord de la mer trois. Chaque excursion ajoute un jour, et aucune étape ne descend sous deux jours, car changer d'hôtel plus souvent fait perdre du temps.",
          "Un rythme détendu ajoute un jour par étape et un rythme rapide en retire un. Voyager avec des enfants ou des personnes âgées ajoute un jour par étape, car chaque déplacement demande plus d'efforts.",
        ],
      },
      {
        id: "jours-de-trajet",
        title: "N'oubliez pas les jours de trajet",
        paragraphs: [
          "Le temps réellement passé sur place est plus court que vos dates. Le planificateur ajoute une demi-journée pour chaque déplacement entre étapes, ou une journée entière quand les trajets durent plus de quelques heures, ainsi que du temps au début et à la fin du voyage. Un vol long-courrier avec plusieurs fuseaux horaires ajoute une journée entière à chaque extrémité : prévoyez un premier jour tranquille.",
          "Si un lieu se trouve à une ou deux heures de votre étape, une excursion à la journée est souvent plus simple que de changer d'hôtel. Ajoutez-le comme excursion depuis l'étape la plus proche plutôt que comme étape à part.",
        ],
      },
      {
        id: "combien-d-etapes",
        title: "Combien d'étapes, c'est trop ?",
        paragraphs: [
          "Un bon repère est une étape pour trois à quatre jours. Une semaine fonctionne bien avec une ou deux étapes ; deux semaines peuvent en inclure trois ou quatre sans difficulté. Le planificateur vous prévient quand votre plan en compte davantage, car des déplacements fréquents rendent le voyage fatigant.",
          "Une fois la durée fixée, notre [planificateur de voyage IA](/plan?lang=fr) peut préparer l'itinéraire jour par jour en français.",
        ],
      },
    ],
    cta: {
      heading: "Transformez vos jours en plan",
      body: "Notre planificateur de voyage IA gratuit construit un itinéraire jour par jour pour les jours dont vous disposez, avec des options de vol et un budget estimé, en français. Sans inscription.",
    },
    faqs: [
      {
        question: "Comment fonctionne le planificateur de durée de voyage ?",
        answer:
          "Ajoutez chaque lieu à visiter, indiquez s'il s'agit d'une grande ville, d'une petite ville ou d'une étape à la campagne, et ajoutez vos excursions. Le planificateur suggère les jours pour chaque étape, ajoute les jours de trajet entre les étapes et aux extrémités, et s'adapte à votre rythme et à vos compagnons de voyage.",
      },
      {
        question: "Pourquoi suggère-t-il au moins deux jours par étape ?",
        answer:
          "Chaque changement d'hôtel prend du temps : faire ses bagages, libérer la chambre, voyager et s'installer. Deux nuits sont un minimum pour qu'une étape en vaille la peine ; trois ou plus permettent de se détendre et de faire des excursions.",
      },
      {
        question: "Compte-t-il les jours de trajet ?",
        answer:
          "Oui. Il ajoute une demi-journée pour chaque déplacement entre étapes, ou une journée entière si les trajets durent plus de quelques heures, ainsi que du temps au début et à la fin du voyage. Les vols long-courriers ajoutent davantage, car le trajet et le décalage horaire peuvent occuper presque une journée à chaque extrémité.",
      },
      {
        question: "Et si je n'ai pas assez de jours ?",
        answer:
          "Indiquez vos jours disponibles et le planificateur vous montre si votre plan tient. S'il est trop chargé, il suggère quelle étape retirer ou transformer en excursion. Moins d'étapes donnent généralement un meilleur voyage.",
      },
    ],
    related:
      "Autres outils gratuits : [calculateur de budget de voyage](/fr/outils/calculateur-budget-voyage) et [vérificateur de temps de correspondance](/fr/outils/temps-de-correspondance).",
    ld: {
      name: "Planificateur de durée de voyage d'AIFlyTrip",
      description:
        "Outil gratuit qui suggère combien de jours il faut pour un voyage, avec les jours par étape et les jours de trajet.",
    },
  },
};

export const TOOLS_COPY: Record<Locale, ToolsCopy> = { en, es, fr };
