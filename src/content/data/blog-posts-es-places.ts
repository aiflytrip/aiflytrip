import { type GuideSchema } from "@/content/schema";
import { SOURCES } from "@/content/data/sources";
import { type z } from "zod";

type PostInput = z.input<typeof GuideSchema>;

/**
 * Spanish editions of the destination and seasonal posts, written for
 * Spanish-speaking readers rather than translated line by line. Links to
 * destination and itinerary pages say they are in English, since those pages
 * exist only in English for now.
 */
export const spanishPlacePosts: PostInput[] = [
  {
    slug: "del-aeropuerto-al-centro-paris-roma-tokio-lisboa",
    locale: "es",
    translationOf: "airport-to-city-paris-rome-tokyo-lisbon",
    photo: "airport-to-city",
    category: "practical",
    status: "published",
    publishAt: "2026-11-08",
    lastReviewed: "2026-11-08",
    title: "Del aeropuerto al centro: París, Roma, Tokio y Lisboa",
    description:
      "Cómo ir del aeropuerto al centro en París, Roma, Tokio y Lisboa: trenes, autobuses y taxis, y qué comprobar antes de aterrizar.",
    headline: "Cómo ir del aeropuerto al centro en París, Roma, Tokio y Lisboa",
    intro:
      "La primera hora después de aterrizar marca el tono del viaje. Saber cómo vas a llegar a la ciudad antes de volar significa no improvisar en llegadas, no pagar trayectos abusivos y empezar con calma. Así funcionan las principales opciones en cuatro ciudades que cubrimos, y qué comprobar antes de ir.",
    sections: [
      {
        heading: "Antes de aterrizar: tres cosas que comprobar",
        paragraphs: [
          "Vueles adonde vueles, las mismas tres preguntas deciden la mejor forma de llegar al centro: a qué hora aterrizas, cuánto equipaje llevas y dónde te alojas exactamente. Un tren perfecto a mediodía puede haber dejado de funcionar cuando aterriza un vuelo tardío, y un autobús directo vale más que un metro más barato si cargas con una maleta grande por las escaleras.",
          "Consulta el horario y la tarifa vigentes en la web oficial del aeropuerto o del operador unos días antes del viaje, y guarda la ruta sin conexión. Las tarifas y los horarios cambian, por eso no los incluimos aquí.",
        ],
        bullets: [
          "Tu hora de llegada, y cuándo sale el último tren o autobús",
          "Cuántos bultos llevarás, y si las estaciones tienen ascensor",
          "La estación o parada más cercana a tu alojamiento",
        ],
      },
      {
        heading: "París: Charles de Gaulle y Orly",
        paragraphs: [
          "Desde Charles de Gaulle, el tren de cercanías RER B llega al centro de París, con paradas como Gare du Nord y Châtelet–Les Halles, donde puedes cambiar al metro. Suele ser la opción más práctica si viajas ligero. El Roissybus va a la zona de la Ópera, y los taxis entre el aeropuerto y el centro tienen tarifa fija, lo que quita la preocupación por el tráfico.",
          "Orly está más cerca de la ciudad y ahora tiene la línea 14 del metro, que cruza el centro de París hacia el norte. También hay autobuses y taxis. Uses el aeropuerto que uses, consulta las rutas vigentes en la web de la RATP antes de ir. Ya en la ciudad, nuestra [guía de París](/destinations/france/paris) y el [itinerario de 3 días en París](/itineraries/paris-3-days), ambos en inglés, te ayudan a seguir.",
        ],
        bullets: [],
      },
      {
        heading: "Roma: Fiumicino y Ciampino",
        paragraphs: [
          "La mayoría de los vuelos internacionales aterrizan en Fiumicino. El tren Leonardo Express va sin paradas a Roma Termini, la estación principal, que encaja con la mayoría de los hoteles céntricos. Los trenes regionales de la línea FL1 son una alternativa si te alojas cerca de Trastevere u Ostiense, y suelen ser más baratos. Los taxis de Fiumicino al centro histórico tienen tarifa fija.",
          "Ciampino, que usan sobre todo las aerolíneas de bajo coste, no tiene tren en la terminal; hay autobuses a Termini y a la estación de la localidad de Ciampino para seguir en tren. Consulta las opciones vigentes en la web de Aeroporti di Roma. Nuestra [guía de Roma](/destinations/italy/rome) (en inglés) explica cómo moverte al llegar.",
        ],
        bullets: [],
      },
      {
        heading: "Tokio: Haneda y Narita",
        paragraphs: [
          "Haneda es el más cercano de los dos aeropuertos de Tokio. La línea Keikyu y el monorraíl de Tokio lo conectan con la red de trenes del centro, y los autobuses limusina del aeropuerto van directos a muchos hoteles y grandes estaciones, algo práctico con equipaje pesado.",
          "Narita está más lejos. El JR Narita Express y el Keisei Skyliner son los trenes más rápidos hasta la ciudad, y también hay autobuses más baratos y trenes más lentos. Si llegas cansado tras un vuelo largo, un autobús directo a tu hotel puede compensar. Nuestra [guía de Tokio](/destinations/japan/tokyo) (en inglés) explica las tarjetas IC, que sirven en casi todos los trenes y autobuses de la ciudad.",
        ],
        bullets: [],
      },
      {
        heading: "Lisboa: aeropuerto Humberto Delgado",
        paragraphs: [
          "El aeropuerto de Lisboa está especialmente cerca de la ciudad. La línea roja del metro empieza en el aeropuerto, y puedes cambiar a otras líneas para el centro; es sencillo y económico si tu equipaje es manejable. El Aerobus va a zonas céntricas como la Baixa y Cais do Sodré, y hay taxis y coches con conductor de sobra para el trayecto corto.",
          "Si tu hotel está en lo alto de una de las muchas colinas de Lisboa, un taxi hasta la puerta te ahorra una cuesta con maletas. Nuestra [guía de Lisboa](/destinations/portugal/lisbon) y el [itinerario de 3 días en Lisboa](/itineraries/lisbon-3-days), ambos en inglés, te ayudan a planear los días siguientes.",
        ],
        bullets: [],
      },
      {
        heading: "Taxis, VTC y cómo evitar las trampas habituales",
        paragraphs: [
          "En la mayoría de los grandes aeropuertos, las paradas oficiales de taxi están bien señalizadas a la salida de llegadas. Usa esas, o una aplicación de confianza, en lugar de aceptar ofertas de gente que se te acerca dentro de la terminal. Donde hay tarifa fija, como en París y Roma, confirma el precio antes de salir.",
          "Si llegas de noche, compensa reservar un traslado con antelación o al menos conocer la opción oficial de taxi, para no tener que resolverlo cuando ya ha salido el último tren.",
        ],
        bullets: [],
      },
      {
        heading: "Planea el primer día según tu llegada",
        paragraphs: [
          "Llegues como llegues al centro, que el día de llegada sea ligero. Deja las maletas, da un paseo por la zona y guarda las grandes visitas para la mañana siguiente. Nuestro [ejemplo de itinerario de viaje](/es/blog/ejemplo-de-itinerario-de-viaje) explica cómo planificar alrededor de los horarios de vuelo, y nuestro [planificador de viajes con IA](/es/planificar) prepara un primer día que encaja con tu hora de llegada.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "¿Es mejor el tren o el taxi desde el aeropuerto?",
        answer:
          "El tren suele ser más barato y evita el tráfico, así que es buena opción si viajas ligero. El taxi tiene más sentido de noche, con equipaje pesado o cuando varias personas comparten el precio del trayecto hasta el centro.",
      },
      {
        question: "¿Puedo usar el transporte público del aeropuerto de noche?",
        answer:
          "Depende de la ciudad y de la línea. Muchos trenes del aeropuerto dejan de funcionar a última hora de la tarde, así que consulta la última salida en la web oficial y ten un plan B, como un taxi oficial.",
      },
      {
        question: "¿Conviene reservar el traslado desde el aeropuerto?",
        answer:
          "Merece la pena plantearlo si llegas tarde, viajas con niños pequeños o mucho equipaje, o prefieres no lidiar con el transporte tras un vuelo largo. Si llegas de día, el tren y el autobús suelen ser sencillos.",
      },
    ],
    related: {
      destinations: [],
      itineraries: [],
      guides: [
        "ejemplo-de-itinerario-de-viaje",
        "como-encontrar-vuelos-baratos",
        "donde-alojarse-en-una-ciudad-nueva",
      ],
    },
    sources: [
      SOURCES.parisAirports,
      SOURCES.ratp,
      SOURCES.romeAirports,
      SOURCES.hanedaAirport,
      SOURCES.naritaAirport,
      SOURCES.lisbonAirport,
    ],
  },
  {
    slug: "japan-rail-pass-merece-la-pena",
    locale: "es",
    translationOf: "japan-rail-pass-is-it-worth-it",
    photo: "jr-pass",
    category: "practical",
    status: "published",
    publishAt: "2026-12-01",
    lastReviewed: "2026-11-08",
    title: "Japan Rail Pass: ¿merece la pena para tu viaje?",
    description:
      "Cómo saber si te compensa el Japan Rail Pass: qué cubre, cómo compararlo con billetes sueltos y cuándo salen mejor un pase regional o los billetes individuales.",
    headline: "Japan Rail Pass: ¿merece la pena para tu viaje?",
    intro:
      "El Japan Rail Pass era una compra automática para muchos viajeros en su primera visita. Tras las subidas de precio de los últimos años, ahora conviene hacer cuentas. El pase todavía puede ahorrar dinero y complicaciones con el itinerario adecuado, y costar más de lo que ahorra con el equivocado. Así se decide.",
    sections: [
      {
        heading: "Qué es el pase",
        paragraphs: [
          "El Japan Rail Pass es un abono de tren para visitantes de Japón que permite viajar sin límite en la mayoría de los trenes de Japan Railways (JR) durante un número fijo de días seguidos. Cubre muchos trenes bala Shinkansen además de los servicios JR locales y expresos, y algunos autobuses y ferris de JR.",
          "No vale para todo. Los ferrocarriles privados, los metros y muchos autobuses urbanos no son de JR, y los trenes más rápidos de algunas líneas Shinkansen tienen sus propias normas para quien lleva el pase. Los requisitos, la cobertura y los precios los fijan las compañías JR y pueden cambiar, así que consulta siempre la web oficial del Japan Rail Pass antes de comprarlo.",
        ],
        bullets: [],
      },
      {
        heading: "La prueba sencilla: suma tus trayectos",
        paragraphs: [
          "La mejor forma de decidir es comparar el pase con lo que pagarías en billetes sueltos. Haz una lista de los trayectos largos que piensas hacer durante la validez del pase, como Tokio–Kioto ida y vuelta, y busca la tarifa de cada uno en las webs oficiales de los ferrocarriles o en un buscador de rutas fiable.",
          "Si el total de esos trayectos se acerca o supera el precio del pase, probablemente te compensa, sobre todo si sumas la comodidad y alguna excursión improvisada. Si vas a quedarte casi todo el tiempo en una ciudad con uno o dos trayectos largos, los billetes sueltos suelen salir más baratos.",
        ],
        bullets: [
          "Apunta cada trayecto largo dentro del periodo de validez del pase",
          "Busca la tarifa individual de cada trayecto",
          "Compara el total con el precio actual del pase",
          "Suma un poco de valor por la flexibilidad y las excursiones improvisadas",
        ],
      },
      {
        heading: "Cuándo suele compensar el pase",
        paragraphs: [
          "El pase es más útil cuando recorres mucho territorio en poco tiempo: por ejemplo, un viaje que combina Tokio, Kioto, Osaka e Hiroshima con excursiones de un día, todo dentro de la validez del pase. Varios trayectos largos en Shinkansen suman rápido.",
          "Es menos útil en viajes tranquilos que se quedan en uno o dos sitios. Nuestro [itinerario de 5 días en Tokio](/itineraries/tokyo-5-days) (en inglés), por ejemplo, se centra en la ciudad y en excursiones cercanas, donde el transporte local y las tarjetas IC suelen tener más sentido que un pase para todo el país.",
        ],
        bullets: [],
      },
      {
        heading: "Los pases regionales: un término medio",
        paragraphs: [
          "Varias compañías JR venden pases regionales que cubren una zona concreta, como partes del este o del oeste de Japón. Si tu viaje se centra en una región, un pase regional puede salir mucho mejor que el pase nacional y cubrir igualmente los trayectos que necesitas.",
          "Mira en un mapa adónde vas y comprueba qué pases regionales lo cubren. Igual que con el pase nacional, compara su precio con tus trayectos previstos en lugar de dar por hecho que ahorra dinero.",
        ],
        bullets: [],
      },
      {
        heading: "Moverse por las ciudades sin pase",
        paragraphs: [
          "Dentro de las grandes ciudades, buena parte de tus trayectos serán en metro y líneas privadas que el pase no cubre. Una tarjeta IC recargable, que se pasa al entrar y al salir, suele ser la forma más fácil de pagar trenes y autobuses urbanos. Nuestra [guía de Tokio](/destinations/japan/tokyo) (en inglés) explica cómo funcionan.",
          "Aunque tengas el pase, probablemente usarás también una tarjeta IC, así que compensa conseguirla al principio del viaje.",
        ],
        bullets: [],
      },
      {
        heading: "Consejos prácticos si lo compras",
        paragraphs: [
          "Elige bien la fecha de inicio, porque el pase cuenta días seguidos. Muchos viajeros lo empiezan el día de su primer trayecto largo y no el día que llegan, para no gastar días en una sola ciudad.",
          "Reserva asiento en las rutas más populares, sobre todo en los festivos japoneses, cuando los trenes se llenan. Lleva siempre el pase y el pasaporte, porque el personal puede pedirte ambos. Consulta en la web oficial cómo comprar y activar el pase, porque el proceso ha cambiado con el tiempo.",
        ],
        bullets: [],
      },
      {
        heading: "Planificar la ruta",
        paragraphs: [
          "Compres o no el pase, el orden de las paradas importa. Agrupar los lugares en una ruta lógica ahorra tiempo y dinero. Nuestra [guía de Japón](/destinations/japan) (en inglés) cubre la ruta clásica Tokio, Kioto y Osaka, y nuestro [ejemplo de itinerario de viaje](/es/blog/ejemplo-de-itinerario-de-viaje) explica cómo planear días realistas.",
          "Si llegas en avión, nuestra guía para ir [del aeropuerto al centro](/es/blog/del-aeropuerto-al-centro-paris-roma-tokio-lisboa) cubre los aeropuertos de Haneda y Narita, y la de [cómo combatir el jet lag](/es/blog/como-combatir-el-jet-lag) te ayuda con el cambio de hora. Nuestro [planificador de viajes con IA](/es/planificar) prepara un plan día a día al que puedes poner precio.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "¿Sigue mereciendo la pena el Japan Rail Pass?",
        answer:
          "Puede merecerla, pero depende de tu ruta. Suma las tarifas individuales de tus trayectos largos dentro de la validez del pase y compáralas con el precio actual. Encaja con viajes de ritmo rápido con varios trayectos largos en Shinkansen.",
      },
      {
        question: "¿El Japan Rail Pass cubre el metro de Tokio?",
        answer:
          "No. Las líneas de metro de Tokio no son de JR, así que el pase no las cubre, aunque sí las líneas JR de la ciudad. La mayoría de los visitantes usan una tarjeta IC recargable para el metro y los autobuses.",
      },
      {
        question: "¿Me conviene más un pase regional?",
        answer:
          "Si tu viaje se centra en una parte de Japón, un pase regional de JR puede cubrir tus trayectos por menos que el pase nacional. Comprueba qué pases regionales cubren tu ruta y compara precios antes de comprar ninguno.",
      },
    ],
    related: {
      destinations: [],
      itineraries: [],
      guides: [
        "ejemplo-de-itinerario-de-viaje",
        "como-combatir-el-jet-lag",
        "del-aeropuerto-al-centro-paris-roma-tokio-lisboa",
      ],
    },
    sources: [SOURCES.jrPass, SOURCES.jnto, SOURCES.jrCentral],
  },
  {
    slug: "escapadas-de-invierno-paris-roma-lisboa",
    locale: "es",
    translationOf: "winter-city-breaks-paris-rome-lisbon",
    photo: "winter-city",
    category: "planning",
    status: "published",
    publishAt: "2026-12-08",
    lastReviewed: "2026-11-08",
    title: "Escapadas de invierno: París, Roma y Lisboa",
    description:
      "Cómo son París, Roma y Lisboa en invierno: el tiempo, la Navidad, menos colas, días más cortos y cómo planear una escapada urbana de invierno que funcione.",
    headline: "Escapadas de invierno: París, Roma y Lisboa en los meses fríos",
    intro:
      "El invierno es una de las épocas más infravaloradas para una escapada urbana. Pasadas las fiestas hay menos gente, los museos y los cafés resultan acogedores y a menudo se encuentran mejores precios. Cada ciudad tiene su propio carácter invernal, eso sí. Esto es lo que puedes esperar en París, Roma y Lisboa, y cómo planificar con días más cortos.",
    sections: [
      {
        heading: "Por qué ir en invierno",
        paragraphs: [
          "Fuera de Navidad y Año Nuevo, el invierno suele ser más tranquilo en las tres ciudades, lo que significa colas más cortas en los grandes monumentos y un ambiente más relajado en las zonas populares. El alojamiento y los vuelos pueden salir mejor de precio, aunque en las fiestas suelen subir.",
          "A cambio, los días son más cortos, hace más frío y hay más probabilidad de lluvia. Con un poco de planificación es fácil adaptarse, y combinar visitas al aire libre y bajo techo hace que cualquier día merezca la pena.",
        ],
        bullets: [],
      },
      {
        heading: "París en invierno",
        paragraphs: [
          "París en invierno suele estar gris y fresco, con algún día frío y luminoso. Diciembre trae luces de Navidad y mercadillos, mientras que enero y febrero suelen ser mucho más tranquilos. Es una gran temporada para sus museos, sus pasajes cubiertos, sus cafés y sus mercados.",
          "Lleva ropa de abrigo por capas y un impermeable, y deja los museos para las tardes de lluvia. Nuestra [guía de París](/destinations/france/paris) explica las mejores zonas para alojarse, y el [itinerario de 3 días en París](/itineraries/paris-3-days) agrupa la ciudad por barrios, algo que importa más cuando los días son cortos; ambos están en inglés.",
        ],
        bullets: [],
      },
      {
        heading: "Roma en invierno",
        paragraphs: [
          "Los inviernos de Roma son más suaves que los del norte de Europa, con días frescos y algo de lluvia. Los grandes monumentos, de las ruinas antiguas a las grandes iglesias y museos, tienen mucha menos gente que en primavera y verano, lo que hace del invierno una época muy agradecida para visitarla.",
          "La Navidad se vive mucho en Roma y se alarga hasta principios de enero, cuando la Epifanía es festivo en Italia, igual que el día de Reyes en España. Comprueba los días de apertura en las fiestas, porque algunos lugares cambian el horario. Nuestra [guía de Roma](/destinations/italy/rome) (en inglés) explica cómo agrupar el Coliseo, el Vaticano y el centro histórico en días asequibles.",
        ],
        bullets: [],
      },
      {
        heading: "Lisboa en invierno",
        paragraphs: [
          "Lisboa tiene uno de los inviernos más suaves de las capitales europeas, con muchos días soleados entre rachas de lluvia. Es una época agradable para subir y bajar sus colinas, montar en tranvía y disfrutar de los miradores sin el calor ni la gente del verano.",
          "Lleva un impermeable ligero y calzado que agarre, porque el empedrado resbala con la lluvia. Nuestra [guía de Lisboa](/destinations/portugal/lisbon) y el [itinerario de 3 días en Lisboa](/itineraries/lisbon-3-days), ambos en inglés, te ayudan a planificar, incluida una excursión a Sintra, que puede estar más fresca y con más niebla que la ciudad.",
        ],
        bullets: [],
      },
      {
        heading: "Planificar con días más cortos",
        paragraphs: [
          "Con menos horas de luz, empieza el día un poco antes y deja para primera hora las visitas al aire libre, los miradores y los paseos. Guarda los museos, las galerías, los mercados y las comidas largas para la tarde, cuando oscurece.",
          "Agrupa cada día por zonas para no perder luz en desplazamientos. Nuestro [ejemplo de itinerario de viaje](/es/blog/ejemplo-de-itinerario-de-viaje) explica cómo organizar los días alrededor de unos pocos imprescindibles y de los barrios.",
        ],
        bullets: [
          "Visitas al aire libre y miradores por la mañana",
          "Museos, mercados y cafés por la tarde",
          "Una zona por día para ahorrar desplazamientos",
          "Un plan alternativo bajo techo para los días de lluvia",
        ],
      },
      {
        heading: "En Navidad y Año Nuevo",
        paragraphs: [
          "Las fiestas tienen magia pero mucha gente, y los vuelos y los hoteles suben. Reserva pronto si piensas viajar entonces y revisa bien los horarios, porque algunas atracciones cierran o cambian el horario en los festivos. El transporte público puede funcionar con servicios reducidos el día de Navidad y el de Año Nuevo.",
          "Si vuelas en esas fechas, llega con más tiempo al aeropuerto y piensa cómo llevar los regalos, porque los paquetes envueltos pueden tener que abrirse en el control de seguridad.",
        ],
        bullets: [],
      },
      {
        heading: "Qué llevar en la maleta",
        paragraphs: [
          "Las capas son tus aliadas: un jersey de abrigo, una chaqueta impermeable, calzado cómodo que no cale, y gorro, bufanda y guantes para París. En Roma y Lisboa hace falta menos, pero las noches pueden ser frescas. Un paraguas plegable se gana su sitio en las tres ciudades. Nuestro [generador de lista de equipaje](/es/herramientas/lista-de-equipaje) prepara una lista para frío o tiempo templado.",
          "Cuando elijas ciudad, nuestro [planificador de viajes con IA](/es/planificar) prepara un plan día a día pensado para el invierno, que combina visitas al aire libre y bajo techo.",
        ],
        bullets: [],
      },
      {
        heading: "Cómo aprovechar las noches de invierno",
        paragraphs: [
          "Las noches largas son una oportunidad para disfrutar de la vida bajo techo de cada ciudad. Las temporadas de conciertos, ópera y teatro están en pleno apogeo, y una cena larga en un restaurante tradicional forma parte de la experiencia. Conviene reservar con antelación los espectáculos y restaurantes más solicitados, sobre todo en diciembre.",
          "Muchos museos abren hasta tarde algunas noches, una forma agradable de verlos con menos visitantes. Consulta en las webs oficiales las aperturas nocturnas vigentes, porque cambian según el museo y la temporada.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "¿Cuál es la más cálida en invierno: París, Roma o Lisboa?",
        answer:
          "Lisboa suele tener el invierno más suave de las tres, seguida de Roma. París suele ser la más fría y gris, aunque tiene su propio encanto invernal con luces de Navidad y museos y cafés acogedores.",
      },
      {
        question: "¿Es el invierno buena época para una escapada urbana?",
        answer:
          "A menudo sí. Fuera de las fiestas, las ciudades están más tranquilas y pueden salir mejor de precio. Planifica teniendo en cuenta los días más cortos y la posibilidad de lluvia, combinando visitas al aire libre y bajo techo.",
      },
      {
        question: "¿Abren las atracciones en Navidad?",
        answer:
          "Muchas sí, pero algunas cierran o cambian el horario en los festivos, y el transporte puede funcionar con servicios reducidos. Consulta en las webs oficiales los días exactos que piensas visitar antes de cerrar el plan.",
      },
    ],
    related: {
      destinations: [],
      itineraries: [],
      guides: [
        "ejemplo-de-itinerario-de-viaje",
        "consejos-para-viajar-en-navidad",
        "como-planificar-un-viaje-barato",
      ],
    },
    sources: [SOURCES.paris, SOURCES.rome, SOURCES.visitLisboa],
  },
  {
    slug: "donde-alojarse-en-una-ciudad-nueva",
    locale: "es",
    translationOf: "where-to-stay-in-a-new-city",
    photo: "where-to-stay",
    category: "planning",
    status: "published",
    publishAt: "2026-12-15",
    lastReviewed: "2026-11-08",
    title: "Dónde alojarse en una ciudad nueva: cómo elegir",
    description:
      "Cómo elegir dónde alojarte en una ciudad que no conoces: escoger barrio, transporte, leer opiniones, hotel o apartamento y las tasas turísticas.",
    headline: "Cómo elegir dónde alojarte en una ciudad nueva",
    intro:
      "Dónde te alojas marca todo el viaje. La base adecuada te ahorra horas de desplazamiento y hace fáciles las noches; la equivocada te obliga a cruzar la ciudad cada día. Aquí tienes una forma práctica de elegir barrio y alojamiento en una ciudad que nunca has visitado.",
    sections: [
      {
        heading: "Empieza por lo que vas a hacer",
        paragraphs: [
          "Antes de mirar alojamientos, esboza lo que quieres ver y hacer. Si la mayoría de tus imprescindibles se concentran en una zona, alojarte allí o cerca tiene sentido. Si están repartidos, busca una base con transporte público rápido a todos ellos.",
          "Nuestro [ejemplo de itinerario de viaje](/es/blog/ejemplo-de-itinerario-de-viaje) explica cómo agrupar los planes por zonas, lo que también te indica el mejor sitio para alojarte.",
        ],
        bullets: [],
      },
      {
        heading: "Elige primero el barrio",
        paragraphs: [
          "Es más fácil elegir un barrio y luego un alojamiento que al revés. Las zonas céntricas son cómodas pero más bulliciosas y a menudo más caras; las zonas residenciales tranquilas con buen transporte pueden salir mejor de precio y tener un ambiente más local.",
          "Nuestras guías de destino proponen zonas. Por ejemplo, la [guía de Lisboa](/destinations/portugal/lisbon) compara la Baixa y el Chiado con el tranquilo Príncipe Real y la empinada Alfama, y la [guía de París](/destinations/france/paris) repasa las zonas que encajan en una primera visita; ambas están en inglés.",
        ],
        bullets: [],
      },
      {
        heading: "Mira el transporte, no solo la distancia",
        paragraphs: [
          "Un sitio que parece cerca en el mapa puede suponer un trayecto lento si está en lo alto de una cuesta o lejos de una estación. Comprueba cuánto se tarda a pie hasta la parada de metro, tranvía o tren más cercana, y con qué frecuencia pasan por la noche.",
          "Si llegas con equipaje, piensa cómo vas a llegar desde el aeropuerto o la estación. Nuestra guía para ir [del aeropuerto al centro](/es/blog/del-aeropuerto-al-centro-paris-roma-tokio-lisboa) cubre las principales opciones en cuatro ciudades populares.",
        ],
        bullets: [],
      },
      {
        heading: "Lee bien las opiniones",
        paragraphs: [
          "Las opiniones recientes son más útiles que la nota global. Busca patrones en lo que dicen los huéspedes sobre la limpieza, el ruido, el barrio de noche y si las fotos se corresponden con la realidad. Una mala opinión aislada importa menos que la misma queja repetida.",
          "Comprueba la ubicación exacta en un mapa, porque los anuncios a veces describen una zona más amplia que la que ocupa el alojamiento.",
        ],
        bullets: [
          "Opiniones recientes de los últimos meses",
          "Comentarios repetidos sobre ruido, limpieza o seguridad",
          "La ubicación exacta en un mapa",
          "Si las fotos parecen actuales",
        ],
      },
      {
        heading: "¿Hotel, apartamento o pensión?",
        paragraphs: [
          "Los hoteles son sencillos y ofrecen servicios como recepción, consigna y limpieza diaria, algo que ayuda en viajes cortos y llegadas tardías. Los apartamentos dan más espacio y cocina, ideales para familias y estancias largas. Las pensiones y los hoteles pequeños pueden ofrecer un trato más personal y consejos locales.",
          "Elijas lo que elijas, revisa la política de cancelación, cómo funciona la entrada y si hay dónde dejar el equipaje antes de la entrada o después de la salida.",
        ],
        bullets: [],
      },
      {
        heading: "Ojo con las tasas turísticas y otros extras",
        paragraphs: [
          "Muchas ciudades, como París, Roma y Lisboa, cobran una tasa turística por persona y noche, que a menudo se paga en el alojamiento. Puede que no esté incluida en el precio que ves en internet, así que lee los detalles antes de reservar.",
          "Revisa también los gastos de limpieza de los apartamentos, los recargos por entrada tardía y si el desayuno está incluido. Comparar el coste total, no solo el precio por noche, evita sorpresas. Nuestra guía sobre [cómo planificar un viaje barato](/es/blog/como-planificar-un-viaje-barato) tiene más formas de contener el gasto.",
        ],
        bullets: [],
      },
      {
        heading: "Ponerlo todo junto",
        paragraphs: [
          "Haz una lista corta de dos o tres barrios y compara unos cuantos alojamientos en cada uno por ubicación, opiniones y coste total. Reserva pronto para las épocas de mucha demanda y guarda las confirmaciones donde puedas verlas sin conexión.",
          "Con la base decidida, nuestro [planificador de viajes con IA](/es/planificar) prepara un itinerario día a día que empieza y termina cerca de donde te alojas.",
        ],
        bullets: [],
      },
      {
        heading: "Seguridad y comodidad",
        paragraphs: [
          "Fíjate en lo que dicen las opiniones sobre la vuelta de noche, la iluminación y el movimiento de la calle. Una zona animada es genial para salir, pero puede ser ruidosa de madrugada, así que si tienes el sueño ligero quizá prefieras una calle más tranquila a pocos minutos.",
          "Comprueba los detalles prácticos que hacen cómoda una estancia: calefacción o aire acondicionado según la temporada, ascensor si llevas equipaje pesado o tienes movilidad reducida, y un wifi fiable si vas a trabajar o planificar sobre la marcha.",
        ],
        bullets: [],
      },
      {
        heading: "Viajar en familia o en grupo",
        paragraphs: [
          "Las familias y los grupos suelen conseguir mejor precio y más espacio en un apartamento o un hotel con habitaciones familiares. Mira la distribución de las camas, no solo el número de huéspedes, y pregunta si hay cunas o camas supletorias y si se cobran.",
          "Estar cerca de un parque, un supermercado y sitios sencillos para comer marca una gran diferencia con niños. Nuestra guía para [viajar en avión con niños](/es/blog/viajar-en-avion-con-ninos) cubre el propio viaje.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "¿Es mejor alojarse en el centro de la ciudad?",
        answer:
          "Es cómodo, sobre todo en viajes cortos, pero suele ser más bullicioso y caro. Una zona más tranquila cerca de buen transporte público puede salir mejor de precio y dejarte igualmente los principales lugares a mano.",
      },
      {
        question: "¿Qué es la tasa turística?",
        answer:
          "Muchas ciudades cobran a los visitantes una pequeña tasa por persona y noche, que a menudo se paga directamente en el alojamiento. Puede que no esté incluida en el precio de internet, así que revisa los detalles de la reserva antes de pagar.",
      },
      {
        question: "¿Hotel o apartamento para una escapada urbana?",
        answer:
          "Los hoteles encajan con viajes cortos y llegadas tardías gracias a servicios como la recepción y la consigna. Los apartamentos encajan con familias y estancias largas, con más espacio y una cocina para preparar alguna comida.",
      },
    ],
    related: {
      destinations: [],
      itineraries: [],
      guides: [
        "ejemplo-de-itinerario-de-viaje",
        "como-planificar-un-viaje-barato",
        "del-aeropuerto-al-centro-paris-roma-tokio-lisboa",
      ],
    },
    sources: [SOURCES.paris, SOURCES.rome, SOURCES.visitLisboa],
  },
  {
    slug: "consejos-para-viajar-en-navidad",
    locale: "es",
    translationOf: "christmas-new-year-travel-tips",
    photo: "holiday-travel",
    category: "flights",
    status: "published",
    publishAt: "2026-12-22",
    lastReviewed: "2026-11-08",
    title: "Viajar en Navidad y Año Nuevo: consejos prácticos",
    description:
      "Consejos para viajar en Navidad, Año Nuevo y Reyes: reservar pronto, aeropuertos llenos, retrasos por el tiempo, regalos en el control y horarios festivos.",
    headline:
      "Viajar en Navidad y Año Nuevo: consejos para unas fechas de mucho movimiento",
    intro:
      "Las fiestas de Navidad son de las épocas con más movimiento para viajar. Los aeropuertos van llenos, los precios suben y el tiempo invernal puede trastocar los planes. Un poco de preparación extra marca la diferencia. Así puedes hacer más fácil el viaje, desde la reserva hasta la vuelta a casa.",
    sections: [
      {
        heading: "Reserva pronto y sé flexible",
        paragraphs: [
          "Los vuelos y el alojamiento en Navidad, Año Nuevo y Reyes se venden rápido, y los precios tienden a subir a medida que se llenan los vuelos. Si sabes que vas a viajar, empieza a mirar precios con tiempo y reserva cuando veas una tarifa que te encaje.",
          "La flexibilidad ayuda: volar uno o dos días antes o después de las fechas más concurridas, o a horas menos populares, puede salir más barato y tranquilo. Nuestra guía sobre [cómo encontrar vuelos baratos](/es/blog/como-encontrar-vuelos-baratos) explica cómo comparar fechas y aeropuertos.",
        ],
        bullets: [],
      },
      {
        heading: "Cuenta con aeropuertos llenos",
        paragraphs: [
          "Deja más tiempo del habitual para la facturación, la entrega de equipaje y el control, sobre todo los días justo antes de Navidad y alrededor de Año Nuevo. Factura online, viaja ligero si puedes y lleva la tarjeta de embarque en el móvil.",
          "Si tienes escala, elige una conexión cómoda en lugar de la más corta. Nuestra guía sobre [cuánto tiempo de escala necesitas](/es/blog/cuanto-tiempo-de-escala-necesito) explica cómo valorarla.",
        ],
        bullets: [],
      },
      {
        heading: "Regalos y control de seguridad",
        paragraphs: [
          "Los regalos envueltos pueden dar problemas en el control de seguridad, porque los agentes pueden tener que desenvolverlos para ver qué hay dentro. Plantéate envolverlos al llegar o usar bolsas de regalo fáciles de abrir.",
          "Las normas de líquidos siguen aplicándose a regalos como perfumes, bebidas y comida. Algunos objetos navideños, como las bolas de nieve grandes, pueden no permitirse en el equipaje de mano. Consulta la información oficial de tu aeropuerto de salida antes de hacer la maleta; nuestra guía de [qué llevar en el equipaje de mano](/es/blog/que-llevar-en-el-equipaje-de-mano) cubre las normas generales.",
        ],
        bullets: [
          "Envuelve los regalos al llegar, o usa bolsas fáciles de abrir",
          "Lleva los regalos líquidos facturados o según las normas de líquidos",
          "Revisa las normas para objetos poco habituales como las bolas de nieve",
        ],
      },
      {
        heading: "Tiempo invernal e incidencias",
        paragraphs: [
          "La nieve, el hielo, la niebla y los temporales pueden retrasar o cancelar vuelos en invierno, y en temporada alta queda menos margen para recolocar pasajeros. Comprueba el estado de tu vuelo antes de salir hacia el aeropuerto y activa los avisos de la aerolínea.",
          "Si tu vuelo se retrasa o se cancela, puedes tener derecho a asistencia y a transporte alternativo, y en algunos casos al reembolso, según dónde vueles y el motivo. Según las normas europeas, normalmente no se debe compensación por circunstancias realmente extraordinarias como un temporal, pero la asistencia y el transporte alternativo a menudo sí. Nuestra guía sobre [qué hacer si pierdes un vuelo de conexión](/es/blog/perder-un-vuelo-de-conexion) explica tus derechos.",
        ],
        bullets: [],
      },
      {
        heading: "Horarios festivos y transporte",
        paragraphs: [
          "Muchas atracciones, tiendas y restaurantes cierran o cambian el horario el día de Navidad, el de Año Nuevo, el de Reyes y otros festivos, y el transporte público a menudo funciona con servicios reducidos. Consulta las webs oficiales antes de planificar esos días y reserva con mucha antelación los restaurantes para las comidas especiales.",
          "En Nochevieja puede haber cortes de calles, transporte abarrotado y mucha gente en los centros urbanos. Planea cómo volverás al alojamiento después de las uvas.",
        ],
        bullets: [],
      },
      {
        heading: "Si visitas una ciudad en estas fechas",
        paragraphs: [
          "Las escapadas urbanas en Navidad pueden ser maravillosas, con luces, mercadillos y comida de temporada. Nuestra guía de [escapadas de invierno a París, Roma y Lisboa](/es/blog/escapadas-de-invierno-paris-roma-lisboa) explica cómo es cada ciudad en los meses fríos.",
          "Mantén un plan flexible y deja margen para el tiempo, los cierres y, simplemente, disfrutar del ambiente.",
        ],
        bullets: [],
      },
      {
        heading: "Protege tus planes",
        paragraphs: [
          "Un seguro de viaje contratado poco después de reservar puede protegerte si una enfermedad u otro motivo cubierto te impide viajar, algo que importa más cuando los precios están altos. Nuestra guía sobre el [seguro de viaje](/es/blog/seguro-de-viaje-que-cubre) explica qué revisar.",
          "Lleva en el equipaje de mano los documentos importantes, la medicación y los cargadores, y ten copias digitales de las reservas sin conexión. Nuestro [planificador de viajes con IA](/es/planificar) te ayuda a organizar los días alrededor de tus vuelos.",
        ],
        bullets: [],
      },
      {
        heading: "La maleta para viajar en invierno",
        paragraphs: [
          "Ponte para volar el abrigo y las botas más voluminosos para ahorrar espacio, y lleva una prenda de abrigo en el equipaje de mano por si hay esperas largas o traslados con frío. Guarda en cabina un pequeño kit con lo imprescindible, como medicación, cargadores y una muda, por si la maleta facturada se retrasa.",
          "Si vas a traer regalos de vuelta, deja espacio en la maleta o planea comprar una bolsa blanda extra en el destino.",
        ],
        bullets: [],
      },
      {
        heading: "Si cambian tus planes",
        paragraphs: [
          "Si un retraso o una cancelación afecta a tu viaje, contacta enseguida con la aerolínea o usa su aplicación, porque en temporada alta las opciones de recolocación se agotan rápido. Guarda los recibos de comidas y alojamiento y capturas de los mensajes de la aerolínea.",
          "Si reservaste el alojamiento por separado, avisa cuanto antes si vas a llegar tarde, para que te guarden la habitación.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "¿Conviene envolver los regalos antes de volar?",
        answer:
          "A menudo es mejor no hacerlo. Los agentes de seguridad pueden tener que desenvolverlos para revisarlos. Envuélvelos al llegar, o usa bolsas de regalo fáciles de abrir y volver a cerrar en el control.",
      },
      {
        question: "¿Tengo derecho a compensación si la nieve cancela mi vuelo?",
        answer:
          "Según las normas europeas, normalmente no se debe compensación por circunstancias extraordinarias como un temporal, pero puedes seguir teniendo derecho a asistencia y a transporte alternativo. Consulta la información oficial para tu vuelo concreto.",
      },
      {
        question: "¿Con cuánta antelación ir al aeropuerto en Navidad?",
        answer:
          "Antes de lo habitual. Los aeropuertos van más llenos los días alrededor de Navidad, Año Nuevo y Reyes, así que deja tiempo extra para la entrega de equipaje y el control, y factura online antes de salir de casa.",
      },
    ],
    related: {
      destinations: [],
      itineraries: [],
      guides: [
        "como-encontrar-vuelos-baratos",
        "cuanto-tiempo-de-escala-necesito",
        "escapadas-de-invierno-paris-roma-lisboa",
      ],
    },
    sources: [SOURCES.euAirRightsEs, SOURCES.eu261Es, SOURCES.aesaPassengers],
  },
];
