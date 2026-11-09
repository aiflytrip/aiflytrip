import { type ItinerarySchema } from "@/content/schema";
import { SOURCES } from "@/content/data/sources";
import { type z } from "zod";

type ItineraryInput = z.input<typeof ItinerarySchema>;

/**
 * Spanish editions of the hand-written itineraries, under /es/itinerarios.
 * Each one translates the English itinerary named in translationOf, with the
 * same days, and links only to Spanish pages.
 */
export const spanishItineraries: ItineraryInput[] = [
  {
    slug: "paris-en-3-dias",
    locale: "es",
    translationOf: "paris-3-days",
    destination: "/es/destinos/francia/paris",
    name: "París en 3 días",
    status: "published",
    lastReviewed: "2026-11-09",
    title: "París en 3 días: itinerario para una primera visita",
    description:
      "Un itinerario realista de tres días por París para una primera visita, agrupado por barrios, con consejos sobre los museos e ideas para adaptarlo a tu ritmo.",
    headline: "París en 3 días: un itinerario para tu primera visita",
    intro:
      "Este plan cubre los lugares imprescindibles en tres días y reduce los desplazamientos agrupando cada día por barrios. Supone un ritmo moderado, con tiempo para comer sin prisas; cambia o quita lo que quieras según tus intereses, y reserva entradas con hora para los grandes museos antes de ir.",
    days: 3,
    bestFor: ["Primeras visitas", "Arte e historia", "Viajes a pie"],
    plan: [
      {
        title: "El Sena y el corazón histórico",
        morning:
          "Empieza en la Île de la Cité con Notre-Dame y las vidrieras de la Sainte-Chapelle, y luego pasea junto al río por la parte más antigua de la ciudad.",
        afternoon:
          "Cruza a la orilla derecha para visitar el Louvre. Elige de antemano dos o tres colecciones en lugar de intentar verlo todo, y después descansa en el jardín de las Tullerías.",
        evening:
          "Camina hacia el oeste junto al río o por los jardines del Palais-Royal, y cena cerca del Louvre o en Saint-Germain, en la orilla izquierda.",
        tip: "Reserva la entrada al Louvre para primera hora de la tarde, así la mañana por las islas no irá con prisas.",
      },
      {
        title: "Arte en la orilla izquierda y la Torre Eiffel",
        morning:
          "Visita el Museo de Orsay para ver arte impresionista y postimpresionista, mejor justo a la hora de apertura, cuando las salas están más tranquilas.",
        afternoon:
          "Pasea por Saint-Germain-des-Prés y los jardines de Luxemburgo, con una parada en un café, y luego ve hacia la zona de la Torre Eiffel junto al río.",
        evening:
          "Contempla la Torre Eiffel al atardecer desde el Campo de Marte o desde el Trocadéro, al otro lado del río, y sube si has reservado hora.",
        tip: "Si quieres subir a la Torre Eiffel, reserva una franja horaria con antelación y cuenta con el tiempo de los controles de seguridad.",
      },
      {
        title: "Montmartre y Le Marais",
        morning:
          "Sube a Montmartre para ver el Sacré-Cœur y las vistas de la ciudad, y luego recorre las calles más tranquilas, lejos de la plaza más concurrida.",
        afternoon:
          "Toma el metro hasta Le Marais. Visita la Place des Vosges, curiosea en las tiendas y elige un museo más pequeño, como el Museo Carnavalet, dedicado a la historia de París.",
        evening:
          "Quédate a cenar en Le Marais, o termina con un paseo nocturno junto al río para ver los puentes iluminados.",
      },
    ],
    adjustments: [
      {
        title: "Añade Versalles",
        detail:
          "Si tienes un cuarto día, toma el RER hasta el Palacio de Versalles y dedica el día al palacio y los jardines. Es una visita larga, pero merece la pena.",
      },
      {
        title: "Si viajas con niños",
        detail:
          "Cambia un museo por el Jardin d'Acclimatation o un crucero por el río, y planea pícnics en los parques para que los días sean tranquilos.",
      },
      {
        title: "Un ritmo más lento",
        detail:
          "Quita uno de los grandes museos y dedica ese tiempo a los cafés y mercados de los barrios; París se disfruta tanto en días sin prisas como en días intensos.",
      },
    ],
    practicalNotes: [
      {
        title: "Dónde alojarse para este itinerario",
        detail:
          "Alojarte en el centro hace que empezar cada día sea sencillo. Le Marais, el Barrio Latino y Saint-Germain-des-Prés están a poca distancia a pie o en metro de los lugares de este plan. Si prefieres noches más tranquilas, busca calles algo apartadas de las plazas más concurridas en lugar de irte más lejos del centro.",
      },
      {
        title: "Qué reservar antes de ir",
        detail:
          "Reserva la entrada con hora al Louvre y, si piensas subir, a la Torre Eiffel, porque son las visitas que antes se agotan. El Museo de Orsay y la Sainte-Chapelle también venden entradas con hora. Reservar esto primero te permite organizar el resto de cada día en torno a horas fijas y dejar todo lo demás flexible.",
      },
      {
        title: "Cómo moverse entre paradas",
        detail:
          "Cada día de este itinerario se puede hacer casi todo a pie, usando el metro solo para saltar de una zona a otra, por ejemplo de la Torre Eiffel al centro o de Montmartre a Le Marais. Consulta en la web de la RATP los billetes vigentes antes de llegar, y deja algo de margen para los transbordos.",
      },
      {
        title: "El ritmo de los días",
        detail:
          "Cada día tiene un gran museo o monumento y mucho paseo. Si empiezas a cansarte, quita la visita de la tarde y no la de la mañana: por la mañana los grandes lugares están más tranquilos y tú tienes más energía.",
      },
    ],
    faqs: [
      {
        question: "¿Son suficientes tres días para ver París?",
        answer:
          "Tres días bastan para ver los monumentos principales y conocer algunos barrios a un ritmo constante. No lo verás todo, así que da prioridad a los museos y las zonas que más te interesen y deja el resto para otro viaje.",
      },
      {
        question: "¿Merece la pena un pase de museos para tres días en París?",
        answer:
          "Depende de cuántos lugares de pago quieras visitar. Compara el precio actual del pase con las entradas sueltas de los sitios de tu lista, y comprueba si con el pase sigues necesitando reservar franja horaria.",
      },
      {
        question: "¿Qué día de este itinerario es mejor si llueve?",
        answer:
          "Los días uno y dos giran en torno al Louvre y el Museo de Orsay, así que se adaptan bien a la lluvia. Cambia las partes al aire libre, como los jardines de Luxemburgo, por un paseo por los pasajes cubiertos o por otro museo.",
      },
    ],
    related: {
      itineraries: ["tokio-en-5-dias", "lisboa-en-3-dias"],
      guides: ["cuantos-dias-de-viaje", "como-planificar-un-viaje"],
    },
    sources: [SOURCES.paris, SOURCES.ratp, SOURCES.franceEs],
  },
  {
    slug: "tokio-en-5-dias",
    locale: "es",
    translationOf: "tokyo-5-days",
    destination: "/es/destinos/japon/tokio",
    name: "Tokio en 5 días",
    status: "published",
    lastReviewed: "2026-11-09",
    title: "Tokio en 5 días: barrios y una excursión",
    description:
      "Un itinerario de cinco días por Tokio que agrupa la ciudad por barrios, combina zonas animadas con otras tranquilas e incluye una excursión a Kamakura o Hakone.",
    headline: "Tokio en 5 días: un itinerario por barrios",
    intro:
      "Cinco días te dan tiempo para ver los barrios más conocidos de Tokio, bajar el ritmo en zonas más tranquilas y hacer una excursión fuera de la ciudad. Cada día se centra en uno o dos barrios conectados por tren, para que pases más tiempo explorando y menos en el transporte.",
    days: 5,
    bestFor: [
      "Primeras visitas",
      "Amantes de la comida",
      "Ciudad y excursiones",
    ],
    plan: [
      {
        title: "Asakusa histórico y Ueno",
        morning:
          "Empieza temprano en el templo Senso-ji de Asakusa, antes de que lleguen las multitudes, y luego recorre la calle comercial que lleva al templo y las callejuelas más tranquilas de alrededor.",
        afternoon:
          "Ve a Ueno para pasear por el parque y visitar un museo, como el Museo Nacional de Tokio, o curiosea por la cercana calle comercial de Ameyoko.",
        evening:
          "Da un paseo junto al río o un breve trayecto en barco, o sube a una torre para ver la ciudad, y vuelve a Asakusa para cenar.",
        tip: "Llega a Senso-ji a primera hora de la mañana para una visita más tranquila y una luz más suave para las fotos.",
      },
      {
        title: "Harajuku, Omotesando y Shibuya",
        morning:
          "Visita Meiji Jingu, un santuario rodeado de bosque que parece lejos de la ciudad, y luego entra a pie en Harajuku.",
        afternoon:
          "Pasea por la avenida arbolada de Omotesando y sus calles laterales llenas de cafés y tiendas de diseño, y continúa hasta Shibuya.",
        evening:
          "Cruza el famoso paso de Shibuya al anochecer y contempla las luces de la ciudad desde un mirador; después prueba un izakaya informal para cenar.",
      },
      {
        title: "Excursión a Kamakura o Hakone",
        morning:
          "Toma el tren a Kamakura para ver su Gran Buda y sus templos, o a Hakone para disfrutar de aguas termales y lagos.",
        afternoon:
          "En Kamakura, camina entre templos y acércate a la costa; en Hakone, haz el circuito de trenes, teleféricos y barcos y busca vistas del monte Fuji si el día está despejado.",
        evening:
          "Vuelve a Tokio para cenar, o quédate a dormir en una posada tradicional en Hakone si tu calendario lo permite.",
        tip: "Mira el tiempo antes de elegir: las vistas del monte Fuji desde Hakone dependen de que el cielo esté despejado.",
      },
      {
        title: "Mercados de comida, Ginza y la estación de Tokio",
        morning:
          "Desayuna picoteando en los puestos del mercado exterior de Tsukiji.",
        afternoon:
          "Camina hasta Ginza para ver las plantas de alimentación de los grandes almacenes y sus galerías, y sigue hasta los jardines orientales del Palacio Imperial, junto a la estación de Tokio.",
        evening:
          "Cena en las plantas de restaurantes de unos grandes almacenes o de un complejo de estación; son una forma estupenda de probar muchas cocinas.",
      },
      {
        title: "Shinjuku y un barrio a tu elección",
        morning:
          "Relájate en Shinjuku Gyoen, uno de los jardines más bonitos de la ciudad.",
        afternoon:
          "Elige un barrio según tus intereses: Akihabara para electrónica y anime, Shimokitazawa para tiendas vintage o Yanaka para ver un Tokio más antiguo y tranquilo.",
        evening:
          "Termina en Shinjuku, donde diminutos bares y restaurantes llenan los callejones alrededor de la estación.",
      },
    ],
    adjustments: [
      {
        title: "Si sigues hacia Kioto",
        detail:
          "Si Tokio es el comienzo de un viaje más largo, cambia la excursión por otro día en Tokio y toma el shinkansen a Kioto el sexto día.",
      },
      {
        title: "Si viajas con niños",
        detail:
          "Añade un museo de ciencia o un parque temático, dedica cada día a un solo barrio y planea descansos frecuentes; Tokio es una ciudad muy adecuada para familias.",
      },
      {
        title: "Cambios según la estación",
        detail:
          "En temporada de cerezos en flor, añade un parque como Ueno o Shinjuku Gyoen a primera hora de la mañana. En verano, planea paradas bajo techo para las horas de más calor.",
      },
    ],
    practicalNotes: [
      {
        title: "Dónde alojarse para este itinerario",
        detail:
          "Alojarte cerca de Shinjuku, Shibuya, la estación de Tokio o Ueno funciona bien, porque todas están en la línea JR Yamanote o cerca de ella y tienen servicios directos a las zonas de este plan. Shinjuku y Shibuya convienen a quien quiere vida nocturna cerca, mientras que la estación de Tokio y Ueno son prácticas para las excursiones y los traslados al aeropuerto.",
      },
      {
        title: "Qué reservar antes de ir",
        detail:
          "Reserva los miradores o los restaurantes populares que no te quieras perder, porque algunos se agotan. Para la excursión, revisa las opciones de tren y, para Hakone, valora un pase regional que cubra el transporte local; compara su precio actual con los billetes sueltos de tu ruta.",
      },
      {
        title: "Cómo moverse entre paradas",
        detail:
          "Carga una tarjeta IC, como Suica o Pasmo, al llegar y úsala en trenes, metro y autobuses durante todo el itinerario. Las grandes estaciones, como Shinjuku y Shibuya, tienen muchas salidas, así que busca la más cercana a tu destino antes de salir del andén.",
      },
      {
        title: "El ritmo de los días",
        detail:
          "En Tokio se camina mucho, tanto dentro de las estaciones como por la calle. Planea una pausa en un café o un jardín a mitad de cada día, y no dudes en quitar una actividad nocturna si todavía te estás adaptando a la diferencia horaria.",
      },
    ],
    faqs: [
      {
        question: "¿Son suficientes cinco días para ver Tokio?",
        answer:
          "Cinco días están bien para una primera visita. Cubren los barrios más conocidos, dejan tiempo para la comida y para zonas más tranquilas, y permiten una excursión. Si Tokio forma parte de un viaje más amplio por Japón, cuatro días más el trayecto siguiente también funcionan bien.",
      },
      {
        question: "¿Kamakura o Hakone para la excursión?",
        answer:
          "Elige Kamakura si te atraen los templos, el Gran Buda y la costa, con un trayecto corto en tren. Elige Hakone si prefieres aguas termales, lagos y la posibilidad de ver el monte Fuji; se tarda más en llegar y es mejor en un día despejado o con una noche allí.",
      },
      {
        question: "¿Necesito el Japan Rail Pass para este itinerario?",
        answer:
          "Normalmente no, porque este itinerario se queda en Tokio y sus alrededores. Una tarjeta IC recargable cubre la mayoría de los trenes locales y el metro. El pase solo puede compensar si además haces trayectos largos en shinkansen por otras partes de Japón.",
      },
    ],
    related: {
      itineraries: ["paris-en-3-dias", "lisboa-en-3-dias"],
      guides: ["cuantos-dias-de-viaje", "como-planificar-un-viaje"],
    },
    sources: [SOURCES.tokyoEs, SOURCES.japan],
  },
  {
    slug: "lisboa-en-3-dias",
    locale: "es",
    translationOf: "lisbon-3-days",
    destination: "/es/destinos/portugal/lisboa",
    name: "Lisboa en 3 días",
    status: "published",
    lastReviewed: "2026-11-09",
    title: "Lisboa en 3 días: barrios y un día en Sintra",
    description:
      "Un itinerario de tres días por Lisboa que recorre Alfama, la Baixa, el Chiado y Belém, con una excursión a Sintra y consejos sobre cuestas, tranvías y horarios.",
    headline: "Lisboa en 3 días: un itinerario con excursión a Sintra",
    intro:
      "Este plan de tres días recorre los barrios históricos de Lisboa, los monumentos junto al río en Belém y un día completo en Sintra. Está pensado para las cuestas de Lisboa: las mañanas empiezan arriba y las rutas suelen ir cuesta abajo, con tranvías y funiculares para las subidas más empinadas.",
    days: 3,
    bestFor: ["Primeras visitas", "Caminantes", "Ciudad y excursión"],
    plan: [
      {
        title: "Alfama, el castillo y el centro",
        morning:
          "Sube en taxi o en tranvía al Castillo de San Jorge para ver la ciudad desde arriba, y luego baja paseando por las callejuelas de Alfama.",
        afternoon:
          "Sigue cuesta abajo hasta la Baixa y la Praça do Comércio, junto al río, y después sube al Chiado por sus cafés y librerías.",
        evening:
          "Contempla la puesta de sol desde un mirador y cena en Alfama, donde algunos restaurantes ofrecen actuaciones de fado.",
        tip: "Empezar en lo alto de la colina y bajar caminando ahorra mucha energía.",
      },
      {
        title: "Belém y la orilla del río",
        morning:
          "Ve hacia el oeste, a Belém, para visitar el Monasterio de los Jerónimos, y prueba los pasteles de nata por los que es famoso el barrio.",
        afternoon:
          "Pasea junto al río hasta la Torre de Belém y el Monumento a los Descubrimientos, o visita uno de los museos de la zona.",
        evening:
          "Para en LX Factory a la vuelta para ver tiendas y cenar, o termina en el Bairro Alto, que se anima por la noche.",
      },
      {
        title: "Excursión a Sintra",
        morning:
          "Toma un tren temprano a Sintra y empieza por el palacio que más te interese, antes de las horas de más gente.",
        afternoon:
          "Visita un segundo lugar, como el Castillo de los Moros o una quinta con jardines, y recorre el centro histórico del pueblo.",
        evening:
          "Vuelve a Lisboa en tren y cena tranquilamente cerca de tu alojamiento.",
        tip: "Los lugares de Sintra están repartidos por colinas empinadas; reserva con antelación los palacios que te interesen y planea cómo moverte entre ellos.",
      },
    ],
    adjustments: [
      {
        title: "Añade un día de playa",
        detail:
          "Si tienes un cuarto día, toma el tren por la costa hasta Cascais para ver su casco antiguo, su paseo marítimo y sus playas.",
      },
      {
        title: "Menos caminata",
        detail:
          "Usa tranvías, funiculares y taxis para las subidas, y pasa más tiempo en zonas llanas como la Baixa, la orilla del río y Belém.",
      },
      {
        title: "Si viajas con niños",
        detail:
          "Añade el Oceanário del Parque de las Naciones, y en Sintra limita la visita a uno o dos lugares con muchas pausas.",
      },
    ],
    practicalNotes: [
      {
        title: "Dónde alojarse para este itinerario",
        detail:
          "La Baixa y el Chiado son las bases más prácticas: céntricas, cerca del río y de las estaciones de los trenes a Sintra y Cascais. Alfama tiene mucho encanto, pero es muy empinada, algo importante si llevas equipaje. Príncipe Real ofrece un ambiente más tranquilo y residencial, a poca distancia a pie del Chiado.",
      },
      {
        title: "Qué reservar antes de ir",
        detail:
          "Para Sintra, reserva con antelación la entrada a los palacios que más quieras ver, sobre todo en primavera y verano, y planea cómo moverte entre ellos. En la propia Lisboa casi nada necesita reserva, aunque los restaurantes populares y las casas de fado pueden llenarse los fines de semana.",
      },
      {
        title: "Cómo moverse entre paradas",
        detail:
          "Usa una tarjeta de transporte recargable, como la Viva Viagem, para el metro, los tranvías, los autobuses y el tren a Sintra, y consulta las tarifas vigentes con los operadores. Los taxis y los VTC son una forma sensata de llegar a los miradores y al castillo sin una subida empinada.",
      },
      {
        title: "El ritmo de los días",
        detail:
          "Las cuestas de Lisboa cansan, así que este plan ahorra energía empezando arriba y bajando a pie. Reserva cada tarde una comida larga o una parada en un café, y deja el mirador del atardecer para cuando tengas tiempo de sentarte a disfrutarlo.",
      },
    ],
    faqs: [
      {
        question: "¿Son suficientes tres días para ver Lisboa?",
        answer:
          "Tres días bastan para ver los barrios principales y pasar un día completo en Sintra. Conocerás bien la ciudad a un ritmo cómodo. Con un día más, añade Cascais o más tiempo para recorrer cafés y miradores sin prisas.",
      },
      {
        question: "¿Se puede visitar Sintra en medio día?",
        answer:
          "En medio día puedes ver un palacio y el pueblo, pero Sintra merece un día completo, porque los lugares principales están repartidos por colinas empinadas y pueden estar llenos. Empezar temprano es lo que más se nota.",
      },
      {
        question: "¿Tengo que subir al tranvía 28?",
        answer:
          "Es una experiencia clásica, pero va muy lleno. Súbete a primera hora de la mañana, o simplemente recorre a pie partes de su ruta por Alfama y Graça, que tienen el mismo encanto caminando.",
      },
    ],
    related: {
      itineraries: ["paris-en-3-dias", "tokio-en-5-dias"],
      guides: ["cuantos-dias-de-viaje", "como-planificar-un-viaje"],
    },
    sources: [SOURCES.lisbonEs, SOURCES.cp],
  },
  {
    slug: "roma-en-3-dias",
    locale: "es",
    translationOf: "rome-3-days",
    destination: "/es/destinos/italia/roma",
    name: "Roma en 3 días",
    status: "published",
    lastReviewed: "2026-11-09",
    title: "Roma en 3 días: la Roma antigua, el Vaticano y más",
    description:
      "Tres días en Roma para una primera visita: la Roma antigua, el Vaticano y el centro histórico, agrupados por zonas, con consejos sobre reservas y ritmo.",
    headline: "Roma en 3 días: un itinerario para tu primera visita",
    intro:
      "Roma tiene más cosas que ver de las que caben en tres días, así que este plan da a cada día un objetivo claro: la Roma antigua, el Vaticano y, por último, las plazas y fuentes del centro histórico. Cada día tiene una gran visita que hay que reservar y deja el resto libre, porque gran parte del placer de Roma está en caminar de un lugar a otro. Consulta los días de apertura en las webs oficiales antes de fijar el orden.",
    days: 3,
    bestFor: ["Primeras visitas", "Historia y arte", "Viajes a pie"],
    plan: [
      {
        title: "La Roma antigua y Monti",
        morning:
          "Empieza por el Coliseo con una entrada con hora, y sigue por el Foro Romano y el monte Palatino, que están al lado y normalmente entran en la misma entrada. Calcula casi toda la mañana; el Foro es más grande de lo que parece.",
        afternoon:
          "Sube a la colina del Capitolio para ver el Foro desde arriba, y visita los Museos Capitolinos si quieres más escultura antigua. Si no, ve al barrio de Monti para comer tarde y ver sus pequeñas tiendas.",
        evening:
          "Quédate a cenar en Monti y vuelve paseando junto al Coliseo cuando ya esté iluminado y haya menos gente.",
        tip: "En el Foro casi no hay sombra. En los meses de calor, elige la primera entrada posible y lleva agua y sombrero.",
      },
      {
        title: "El Vaticano y el Trastévere",
        morning:
          "Visita los Museos Vaticanos con la hora de entrada reservada. El recorrido termina en la Capilla Sixtina, así que dosifica tus fuerzas en las primeras salas para no llegar agotado.",
        afternoon:
          "Sigue hasta la basílica de San Pedro y su plaza. Para entrar hay que pasar un control de seguridad y hay normas de vestimenta, así que cubre hombros y rodillas. Después, pasea junto al río hasta el Castel Sant'Angelo.",
        evening:
          "Cruza al Trastévere, a un corto paseo o trayecto en autobús hacia el sur, para pasar la noche entre sus callejuelas y trattorias. Es cuando más ambiente tiene.",
        tip: "Reserva los Museos Vaticanos con mucha antelación en temporada alta, y comprueba qué días abren antes de organizar el resto del viaje en torno a este día.",
      },
      {
        title: "El centro histórico y Villa Borghese",
        morning:
          "Ve a la Fontana di Trevi temprano, antes de que se llene, y camina hasta el Panteón y después hasta la Piazza Navona. Están muy cerca, y las calles entre ellos forman parte de la visita.",
        afternoon:
          "Sigue hasta la Plaza de España y sube al parque de Villa Borghese. Si has reservado, visita la Galería Borghese; si no, disfruta de los jardines y de las vistas de la ciudad desde la terraza del Pincio.",
        evening:
          "Baja para un último paseo nocturno por el centro, y cena por el Campo de' Fiori o el antiguo barrio judío.",
        tip: "La Galería Borghese solo admite visitantes con reserva para una franja horaria fija, así que resérvala primero y organiza el día a su alrededor.",
      },
    ],
    adjustments: [
      {
        title: "Con un cuarto día",
        detail:
          "Haz una excursión. Ostia Antica, los restos del antiguo puerto de Roma, se alcanza en tren de cercanías y es mucho más tranquila que el Foro. Tívoli, con sus villas y jardines, es otra opción clásica.",
      },
      {
        title: "Un ritmo más lento",
        detail:
          "Quita los Museos Capitolinos y la Galería Borghese y quédate con una gran visita al día. Dedica el tiempo a comidas largas, a las iglesias que encuentres por el camino y a un paseo sin prisas por la noche.",
      },
      {
        title: "Si viajas con niños",
        detail:
          "Acorta la visita a los Museos Vaticanos eligiendo unas pocas salas, pasa más tiempo en el parque de Villa Borghese, donde se alquilan bicicletas y barcas, y planea un helado diario como premio por tanto caminar.",
      },
      {
        title: "Con el calor del verano",
        detail:
          "Visita los lugares al aire libre a primera hora, refúgiate en un museo o en tu alojamiento a primera hora de la tarde y vuelve a salir por la noche, como hacen los romanos.",
      },
    ],
    practicalNotes: [
      {
        title: "Dónde alojarse para este itinerario",
        detail:
          "El centro histórico, alrededor del Panteón y la Piazza Navona, te deja el tercer día a la puerta y los demás a un paseo o un trayecto corto. Monti está cerca de los lugares antiguos y tiene ambiente de barrio. El Trastévere tiene mucho encanto por la noche, pero queda algo más lejos del metro. Prati, junto al Vaticano, es más tranquilo y está bien comunicado.",
      },
      {
        title: "Qué reservar antes de ir",
        detail:
          "Tres visitas de este plan funcionan con entrada con hora o reserva: el Coliseo, los Museos Vaticanos y la Galería Borghese. Resérvalas en las webs oficiales en cuanto tengas las fechas, y organiza cada día en torno a su franja horaria. Comprueba si el Panteón necesita entrada para tu visita, porque las condiciones han cambiado en los últimos años.",
      },
      {
        title: "Cómo moverse entre paradas",
        detail:
          "Gran parte del centro de Roma se recorre mejor a pie, y cada día de este plan se queda en una sola zona. Usa el metro, los autobuses o los tranvías para los trayectos más largos, como del centro al Vaticano, y consulta los billetes y pases vigentes con el operador de transporte de la ciudad. Los taxis son una opción sensata a última hora de la noche.",
      },
      {
        title: "El ritmo de los días",
        detail:
          "En Roma se pasa mucho tiempo de pie y sobre adoquines, así que lleva calzado cómodo y planea una comida sentado cada día. Lleva una botella reutilizable, porque la ciudad tiene muchas fuentes públicas de agua potable. Si te quedas sin energía, quita el museo de la tarde y no la visita de la mañana que reservaste.",
      },
    ],
    faqs: [
      {
        question: "¿Son suficientes tres días para ver Roma?",
        answer:
          "Tres días bastan para ver la Roma antigua, el Vaticano y las principales plazas y fuentes a un ritmo constante. No lo verás todo, así que elige los museos que más te interesen y deja el resto para otra visita.",
      },
      {
        question: "¿Puedo ver el Coliseo y el Vaticano el mismo día?",
        answer:
          "Se puede, pero resulta un día largo y agotador, porque los dos suponen horas de pie y están en lados opuestos del centro. Dedicar a cada uno su propia mañana, como hace este itinerario, se disfruta mucho más.",
      },
      {
        question: "¿Qué tengo que reservar con antelación en Roma?",
        answer:
          "Reserva con antelación el Coliseo, los Museos Vaticanos y la Galería Borghese, porque los tres funcionan con entrada con hora o reserva y las franjas más populares se agotan. La mayoría de las iglesias, plazas y fuentes no necesitan reserva.",
      },
      {
        question: "¿Cuál es la mejor zona para alojarse en Roma tres días?",
        answer:
          "Para una primera visita corta, el centro histórico o Monti mantienen las distancias a pie cortas. Prati conviene a quien quiere noches más tranquilas cerca del Vaticano, y el Trastévere a quien quiere restaurantes y vida nocturna a la puerta.",
      },
    ],
    related: {
      itineraries: ["paris-en-3-dias", "lisboa-en-3-dias"],
      guides: [
        "cuantos-dias-de-viaje",
        "ejemplo-de-itinerario-de-viaje",
        "del-aeropuerto-al-centro-paris-roma-tokio-lisboa",
      ],
    },
    sources: [SOURCES.romeEs, SOURCES.italyEs, SOURCES.trenitaliaEs],
  },
];
