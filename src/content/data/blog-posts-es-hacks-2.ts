import { type GuideSchema } from "@/content/schema";
import { SOURCES } from "@/content/data/sources";
import { type z } from "zod";

type PostInput = z.input<typeof GuideSchema>;

/**
 * Spanish editions of the second travel hacks batch, written for
 * Spanish-speaking readers rather than translated line by line. Each shares
 * its English post's publish date. Entry, medicine and health rules are
 * described in general terms only, with Spanish official sources where
 * they exist; health posts send readers to a doctor or pharmacist.
 */
export const spanishHackPostsTwo: PostInput[] = [
  {
    slug: "usar-el-movil-en-el-extranjero",
    locale: "es",
    translationOf: "using-your-phone-abroad",
    photo: "airport-to-city",
    category: "practical",
    status: "published",
    publishAt: "2026-11-09",
    lastReviewed: "2026-11-09",
    title: "Usar el móvil en el extranjero: eSIM, roaming o SIM local",
    description:
      "Cómo usar el móvil en el extranjero sin sustos en la factura: roaming, eSIM de viaje y SIM local comparados, y los ajustes que te ahorran datos.",
    headline: "Usar el móvil en el extranjero: ¿eSIM, roaming o SIM local?",
    intro:
      "En un viaje, el móvil es tu mapa, tu traductor, tu tarjeta de embarque y tu forma de pedir ayuda, así que llegar sin datos no tiene ninguna gracia. Volver a casa con una factura enorme es todavía peor. Hay tres formas principales de tener conexión fuera de casa, y la mejor depende de adónde vas, cuánto tiempo te quedas y cuántos datos gastas. Te contamos cómo elegir y cómo evitar los errores clásicos del roaming.",
    sections: [
      {
        heading: "Opción 1: tu tarifa de siempre con roaming",
        paragraphs: [
          "Lo más sencillo es seguir usando tu propia SIM. Dentro de la Unión Europea, las normas de «roaming como en casa» permiten a muchos clientes usar su tarifa nacional en otros países de la UE, con los límites de uso razonable que explica la página oficial de la UE sobre itinerancia.",
          "Fuera de la UE, el roaming puede salir muy caro. Ojo con países cercanos que no forman parte de la UE, como el Reino Unido o Suiza: comprueba si tu tarifa los incluye. Antes de salir, mira exactamente cuánto cobra tu operador en tu destino, si ofrece un bono diario y si tienes el roaming activado en tu línea.",
        ],
        bullets: [],
      },
      {
        heading: "Opción 2: una eSIM de viaje",
        paragraphs: [
          "Una eSIM es una SIM digital que se instala escaneando un código QR o desde una aplicación, sin cambiar ninguna tarjeta física. Las eSIM de viaje venden paquetes de datos para un país o para toda una región, y puedes comprarla e instalarla antes de salir para tener datos nada más aterrizar.",
          "Tu móvil tiene que ser compatible con eSIM y estar libre, es decir, no bloqueado a un operador. La mayoría de las eSIM de viaje son solo de datos, así que mantienes tu número en la SIM física para recibir SMS, como los códigos del banco, y usas la eSIM para mapas, mensajería y navegación.",
        ],
        bullets: [
          "Comprueba que tu móvil admite eSIM y está libre",
          "Instala la eSIM en casa con wifi, pero actívala al llegar si el plan lo indica",
          "Elige un paquete con algo más de datos de los que crees que necesitas",
          "Deja tu SIM principal para SMS, con los datos en itinerancia desactivados",
        ],
      },
      {
        heading: "Opción 3: una SIM local",
        paragraphs: [
          "Comprar una tarjeta SIM de un operador local al llegar suele dar más datos por menos dinero, sobre todo en viajes largos. Las encontrarás en quioscos del aeropuerto, tiendas de telefonía y algunas tiendas de conveniencia. En muchos países tendrás que enseñar el pasaporte para registrarla.",
          "Los inconvenientes son el tiempo que lleva comprarla, el número nuevo y el riesgo de perder tu SIM española. Guárdala en un sitio seguro, por ejemplo pegada dentro de la funda del pasaporte.",
        ],
        bullets: [],
      },
      {
        heading: "Qué opción te conviene",
        paragraphs: [
          "Para un viaje corto por la UE, normalmente lo más fácil es seguir con tu tarifa. Para una o dos semanas en un país sin roaming incluido, una eSIM de viaje suele ser el mejor equilibrio entre precio y comodidad. Para estancias largas, mucho consumo de datos o si necesitas un número local, la SIM local suele ganar.",
          "Elijas lo que elijas, descarga antes de salir los mapas sin conexión, los paquetes de idioma del traductor y las tarjetas de embarque, para no quedarte bloqueado si la conexión tarda en funcionar.",
        ],
        bullets: [],
      },
      {
        heading: "Ajustes para evitar sustos en la factura",
        paragraphs: [
          "Casi todas las historias de facturas de roaming desorbitadas vienen de aplicaciones que gastan datos en segundo plano sin que te des cuenta. Antes de embarcar, revisa los ajustes de datos móviles para que solo se usen los de la SIM o eSIM que tú elijas.",
        ],
        bullets: [
          "Desactiva los datos en itinerancia en la SIM que no quieras usar para datos",
          "Desactiva las actualizaciones automáticas y la copia de fotos con datos móviles",
          "Haz las videollamadas y las descargas grandes con wifi",
          "Configura un aviso de consumo de datos en el móvil",
          "Comprueba si el buzón de voz te cobra por las llamadas que no contestas",
        ],
      },
      {
        heading: "Cuidado con las redes wifi públicas",
        paragraphs: [
          "El wifi gratis de aeropuertos, hoteles y cafeterías es útil, pero trátalo como lo que es: una red pública. El Instituto Nacional de Ciberseguridad (INCIBE) recomienda evitar las redes abiertas para operaciones delicadas, desactivar la conexión automática a redes desconocidas y tener el móvil actualizado antes de viajar. No entres en la banca en línea ni introduzcas datos de la tarjeta en una red abierta, y comprueba que el nombre de la red es el del establecimiento y no una imitación.",
          "Para hacer el viaje más fácil, echa un vistazo a nuestros [trucos de viaje que funcionan de verdad](/es/blog/trucos-de-viaje-que-funcionan) y organiza los días con nuestro [planificador de viajes con IA](/es/planificar) para saber dónde vas a necesitar más datos.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "¿Una eSIM sale más barata que el roaming?",
        answer:
          "A menudo sí, pero no siempre. Si tu tarifa ya incluye roaming en tu destino, puede no costarte nada extra. Donde no está incluido, un paquete de datos de una eSIM de viaje suele salir mucho más barato que pagar por día o por megabyte.",
      },
      {
        question: "¿Mantengo mi número con una eSIM de viaje?",
        answer:
          "Sí, si dejas activa tu SIM de siempre. La mayoría de las eSIM de viaje son solo de datos, así que tu SIM sigue recibiendo llamadas y SMS, como los códigos del banco. Desactiva en ella los datos en itinerancia para que no gaste datos.",
      },
      {
        question: "¿Puedo usar el móvil gratis en otros países de la UE?",
        answer:
          "Muchos clientes de la UE pueden usar su tarifa nacional en otros países de la UE gracias al «roaming como en casa», con límites de uso razonable. Consulta la página oficial de la UE y las condiciones de tu operador antes de viajar.",
      },
    ],
    related: {
      guides: [
        "trucos-de-viaje-que-funcionan",
        "que-llevar-en-el-equipaje-de-mano",
      ],
    },
    sources: [SOURCES.euRoamingEs, SOURCES.incibeTravel, SOURCES.fccRoaming],
  },
  {
    slug: "validez-del-pasaporte-para-viajar",
    locale: "es",
    translationOf: "passport-validity-rules",
    photo: "documents",
    category: "practical",
    status: "published",
    publishAt: "2026-11-16",
    lastReviewed: "2026-11-09",
    title: "¿Cuánta validez debe tener el pasaporte para viajar?",
    description:
      "Por qué una aerolínea puede no dejarte embarcar con un pasaporte sin caducar: validez mínima, páginas en blanco y daños, y cómo comprobarlo antes de reservar.",
    headline: "¿Cuánta validez debe tener el pasaporte para viajar?",
    intro:
      "Cada año hay viajeros a los que no dejan embarcar con un pasaporte que todavía no ha caducado. El motivo es que muchos países exigen que el pasaporte siga siendo válido durante un tiempo después de llegar o de salir, y algunos se fijan también en la fecha de expedición. Las normas cambian según el destino y la nacionalidad, así que lo único seguro es consultar los requisitos de entrada oficiales antes de reservar.",
    sections: [
      {
        heading: "Por qué no basta con que no esté caducado",
        paragraphs: [
          "Muchos países fijan una validez mínima: el pasaporte debe seguir en vigor durante cierto número de meses después de la fecha de llegada o de la fecha prevista de salida. Por eso, un pasaporte que caduca pocas semanas después del viaje puede ser rechazado aunque sea válido el día del vuelo.",
          "Las aerolíneas lo comprueban al facturar, porque pueden recibir multas y tener que traerte de vuelta si te niegan la entrada. Así que la decisión suele tomarse en tu aeropuerto de salida, no en la frontera.",
        ],
        bullets: [],
      },
      {
        heading: "¿DNI o pasaporte?",
        paragraphs: [
          "Si tienes nacionalidad española, para muchos viajes por la Unión Europea y el espacio Schengen suele bastar el DNI en vigor, pero fuera de esa zona necesitarás normalmente el pasaporte. Comprueba siempre en las Recomendaciones de viaje del Ministerio de Asuntos Exteriores qué documento pide cada país, porque hay excepciones y las normas cambian.",
          "Recuerda que la reserva del vuelo debe coincidir con el documento con el que viajas, y que algunos países exigen el pasaporte aunque tengan acuerdos especiales con la UE.",
        ],
        bullets: [],
      },
      {
        heading: "Los requisitos que te pueden pedir",
        paragraphs: [
          "Las normas de entrada varían, pero suelen combinar uno o varios de los requisitos siguientes. Algunos destinos tienen condiciones separadas sobre cuánto tiempo sigue siendo válido el pasaporte después de salir y sobre cuándo se expidió.",
        ],
        bullets: [
          "Un mínimo de meses de validez después de la llegada o de la salida",
          "Una antigüedad máxima del pasaporte, contada desde su fecha de expedición",
          "Una o varias páginas en blanco para los sellos de entrada y salida",
          "Un pasaporte en buen estado, sin daños en la página de la foto",
          "Un visado, un visado electrónico o una autorización de viaje, según tu nacionalidad",
        ],
      },
      {
        heading: "Cómo comprobar tu pasaporte",
        paragraphs: [
          "Consulta los requisitos de entrada de tu destino en las Recomendaciones de viaje de Exteriores o en la web oficial de inmigración del país. Hazlo con todos los países por los que vas a pasar, incluidos los de tránsito si tienes que pasar el control de inmigración en una escala.",
          "Después compara las fechas del pasaporte con las de tu viaje. Fíjate en la fecha de expedición y en la de caducidad, cuenta las páginas en blanco y revisa si hay algún daño, como manchas de agua, roturas o la página de la foto despegada. Nuestra guía de [documentos para viajar](/es/blog/documentos-para-viajar) repasa todo lo demás que debes llevar.",
        ],
        bullets: [
          "Comprueba las normas de todos los países por los que pasas, incluidas las escalas",
          "Compara las fechas de expedición y caducidad con las del viaje",
          "Cuenta las páginas en blanco",
          "Revisa si la página de la foto o la cubierta tienen daños",
        ],
      },
      {
        heading: "Cuándo renovarlo",
        paragraphs: [
          "Si tu pasaporte está cerca del límite para algún viaje que estés planeando, renuévalo antes de comprar los vuelos. En España se tramita con cita previa en las oficinas de expedición de la Policía Nacional, y el portal oficial del DNIe explica la validez del pasaporte. En temporadas de mucha demanda, como antes del verano, las citas pueden tardar, así que no lo dejes para el final.",
          "Si tienes que demostrar que vas a salir del país, nuestra guía sobre el [billete de salida del país](/es/blog/billete-de-salida-del-pais) explica cómo hacerlo.",
        ],
        bullets: [],
      },
      {
        heading: "Pasaportes de los niños",
        paragraphs: [
          "Los pasaportes de los menores suelen tener una validez más corta que los de los adultos, así que llegan antes al límite. Revisa el de cada miembro de la familia, no solo el tuyo, antes de reservar. Nuestra guía para [viajar en avión con niños](/es/blog/viajar-en-avion-con-ninos) explica otros documentos que pueden hacer falta, como las autorizaciones cuando un menor viaja con uno solo de sus progenitores.",
        ],
        bullets: [],
      },
      {
        heading: "Pasaporte perdido, robado o dañado",
        paragraphs: [
          "Si pierdes el pasaporte o te lo roban antes del viaje, denúncialo cuanto antes: un pasaporte denunciado queda anulado y no sirve para viajar aunque lo encuentres después. Pide uno nuevo lo antes posible.",
          "Si lo pierdes en el extranjero, acude a la embajada o el consulado de España, que normalmente puede expedir un documento provisional para volver. Antes de salir, inscríbete en el Registro de Viajeros de Exteriores y guarda una foto de la página principal del pasaporte en un sitio distinto del propio pasaporte.",
        ],
        bullets: [
          "Guarda una copia de la página de la foto en el correo o en la nube",
          "Denuncia enseguida un pasaporte perdido o robado",
          "Deja tiempo de sobra si necesitas uno nuevo antes de viajar",
        ],
      },
      {
        heading: "Visados y autorizaciones de viaje",
        paragraphs: [
          "Un pasaporte válido es solo una parte. Muchos destinos piden además un visado o una autorización electrónica de viaje que hay que solicitar antes de salir, y algunos aplican las normas de validez del pasaporte también a esas solicitudes. Si necesitas un visado, nuestra guía sobre la [reserva de vuelo para el visado](/es/blog/reserva-de-vuelo-para-visado) explica cómo presentar una reserva de vuelo de forma segura.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "¿Puedo viajar si mi pasaporte caduca dentro de tres meses?",
        answer:
          "Depende del destino y de tu nacionalidad. Muchos países exigen varios meses de validez después de la llegada o de la salida. Consulta los requisitos de entrada oficiales de todos los países de tu ruta antes de reservar.",
      },
      {
        question: "¿Puedo viajar con el DNI en lugar del pasaporte?",
        answer:
          "Para muchos viajes por la UE y el espacio Schengen, los ciudadanos españoles pueden viajar con el DNI en vigor, pero fuera de esa zona suele hacer falta el pasaporte. Compruébalo en las Recomendaciones de viaje de Exteriores para cada país.",
      },
      {
        question: "¿Me pueden negar el embarque con un pasaporte en vigor?",
        answer:
          "Sí. Las aerolíneas comprueban los requisitos de entrada al facturar y pueden negarte el embarque si el pasaporte no cumple las normas del destino sobre validez, páginas en blanco o estado, aunque no haya caducado.",
      },
    ],
    related: {
      guides: [
        "documentos-para-viajar",
        "billete-de-salida-del-pais",
        "reserva-de-vuelo-para-visado",
      ],
    },
    sources: [
      SOURCES.esTravelAdvice,
      SOURCES.esPassportValidity,
      SOURCES.esTravellerRegistry,
      SOURCES.euEntry,
    ],
  },
  {
    slug: "estafas-de-viaje-comunes",
    locale: "es",
    translationOf: "travel-scams-to-avoid",
    photo: "solo-travel",
    category: "practical",
    status: "published",
    publishAt: "2026-11-23",
    lastReviewed: "2026-11-09",
    title: "Estafas de viaje más comunes y cómo evitarlas",
    description:
      "Las estafas de viaje que debes conocer, desde webs de reserva falsas y anuncios de alquiler copiados hasta trucos con taxis y tarjetas, y cómo protegerte.",
    headline: "Estafas de viaje más comunes y cómo evitarlas",
    intro:
      "La mayoría de los viajes transcurren sin problemas, pero los viajeros somos un blanco fácil: estamos en un sitio que no conocemos, a menudo cansados y con pocas ganas de discutir. Además, muchas estafas empiezan mucho antes de salir, con webs falsas y ofertas demasiado buenas para ser verdad. La buena noticia es que casi todas siguen unos pocos patrones conocidos, y un puñado de hábitos te protege de la gran mayoría.",
    sections: [
      {
        heading: "Estafas antes de viajar",
        paragraphs: [
          "Las estafas más caras ocurren al reservar. Agencias de viajes falsas y webs que imitan a las de las aerolíneas cobran billetes que no existen. Anuncios de alquiler vacacional copiados piden una señal por un piso que el supuesto propietario no tiene. Llamadas y mensajes de premios ofrecen unas vacaciones gratis que acaban exigiendo pagar gastos por adelantado.",
          "Las webs no oficiales de visados y autorizaciones de viaje son otra trampa: parecen oficiales, cobran comisiones altas y a veces ni siquiera presentan tu solicitud. Tramítalo siempre en la web oficial del gobierno, que encontrarás en nuestra guía de [documentos para viajar](/es/blog/documentos-para-viajar).",
        ],
        bullets: [
          "Reserva los vuelos con la aerolínea o con una agencia conocida",
          "Escribe tú la dirección de la web en lugar de seguir anuncios o mensajes",
          "Nunca pagues un alquiler por transferencia, tarjeta regalo o criptomonedas",
          "Busca el nombre de la empresa junto a palabras como «estafa» u «opiniones»",
          "Paga con tarjeta de crédito siempre que puedas",
        ],
      },
      {
        heading: "Estafas con alquileres vacacionales",
        paragraphs: [
          "Los anuncios falsos suelen usar fotos reales copiadas de anuncios auténticos. Reserva en una plataforma conocida y mantén en ella todos los mensajes y pagos; un anfitrión que te pide pagar fuera de la plataforma, o que te ofrece descuento por transferencia, es una señal de alarma. INCIBE advierte también de las estafas en aplicaciones vacacionales. Comprueba la dirección en un mapa y desconfía de los anuncios con muy pocas opiniones y un precio inusualmente bajo.",
        ],
        bullets: [],
      },
      {
        heading: "En el aeropuerto y al llegar",
        paragraphs: [
          "Los taxistas sin licencia que esperan en la zona de llegadas suelen cobrar mucho más que la tarifa oficial. Usa la parada oficial de taxis, una aplicación de transporte o el transporte público, y acuerda el precio o comprueba el taxímetro antes de salir. Nuestra guía para ir [del aeropuerto al centro](/es/blog/del-aeropuerto-al-centro-paris-roma-tokio-lisboa) repasa las opciones oficiales en varias ciudades.",
          "Desconfía de los desconocidos que se ofrecen a ayudarte con las máquinas de billetes o con el equipaje y luego te piden dinero, y de quien te dice que tu hotel está cerrado o lleno y se ofrece a llevarte a otro.",
        ],
        bullets: [],
      },
      {
        heading: "Trucos con el dinero y las tarjetas",
        paragraphs: [
          "Usa cajeros situados dentro de las sucursales bancarias cuando puedas, tapa el PIN y fíjate en si hay algo añadido en la ranura de la tarjeta. Si un datáfono o un cajero te ofrece cobrarte en euros en un país con otra moneda, elige la moneda local: la conversión suele salir cara.",
          "Cuenta el cambio, sobre todo con billetes que no conoces, y ten cuidado con quien quiera «revisar» tu dinero o cambiarte billetes. Lleva una tarjeta de reserva separada de la principal para que perder la cartera no arruine el viaje.",
        ],
        bullets: [],
      },
      {
        heading: "Estafas en la calle y distracciones",
        paragraphs: [
          "Muchas estafas callejeras consisten en distraerte: alguien te mancha la ropa, te pide que firmes una recogida de firmas o te ata una pulsera «de regalo» en la muñeca mientras un cómplice va a por tu bolso. Otros venden entradas falsas para monumentos o te llevan a un bar o una tienda con precios abusivos.",
          "Un «no, gracias» firme y seguir andando basta en casi todos los casos. Lleva el móvil y la cartera en bolsillos delanteros o en una bolsa con cremallera, sobre todo en el transporte público abarrotado y en las zonas más turísticas.",
        ],
        bullets: [
          "Compra las entradas en la web oficial o en la taquilla",
          "Desconfía de la ayuda, los regalos o las firmas que nadie ha pedido",
          "Lleva los objetos de valor bien cerrados entre la multitud",
          "Mira los precios de un restaurante antes de sentarte",
        ],
      },
      {
        heading: "Seguridad en internet durante el viaje",
        paragraphs: [
          "Las redes wifi públicas pueden imitarse con puntos de acceso falsos de nombre parecido. Evita la banca en línea en redes abiertas y usa tus datos móviles o una conexión de confianza para lo importante. INCIBE publica consejos sencillos de ciberseguridad para viajar.",
          "Ten cuidado con los mensajes que dicen venir de tu aerolínea o tu hotel, sobre todo si te piden volver a pagar o confirmar los datos de la tarjeta. Contacta con la empresa a través de su web o su aplicación oficial. Nuestra guía para [usar el móvil en el extranjero](/es/blog/usar-el-movil-en-el-extranjero) explica cómo conectarte de forma segura.",
        ],
        bullets: [],
      },
      {
        heading: "Si te estafan",
        paragraphs: [
          "Llama enseguida a tu banco para bloquear las tarjetas y reclamar los cargos; los pagos con tarjeta a veces se pueden recuperar. Denuncia el robo o la estafa ante la policía local y guarda la denuncia, que el seguro suele pedir. Nuestra guía del [seguro de viaje](/es/blog/seguro-de-viaje-que-cubre) explica qué puede cubrir una póliza.",
          "Si te roban el pasaporte, acude a la embajada o el consulado de España. Las Recomendaciones de viaje de Exteriores incluyen también avisos sobre las estafas habituales en cada país.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "¿Cómo sé si una web de viajes es una estafa?",
        answer:
          "Revisa bien la dirección de la web, busca opiniones y quejas independientes y desconfía de precios muy por debajo de otras webs. Evita las que solo aceptan transferencias, tarjetas regalo o criptomonedas y, si dudas, reserva directamente con la aerolínea.",
      },
      {
        question: "¿Cuáles son las estafas más habituales a turistas?",
        answer:
          "Los taxis sin licencia, las entradas falsas, los robos por distracción entre la multitud, la «ayuda» no pedida seguida de una petición de dinero y los trucos con datáfonos están entre las más comunes. Exteriores avisa de las estafas habituales en cada país.",
      },
      {
        question: "¿Qué hago si me estafan en el extranjero?",
        answer:
          "Llama al banco para bloquear las tarjetas y reclamar los pagos, denuncia ante la policía local y guarda la denuncia para el seguro. Si te han quitado el pasaporte, acude a la embajada o el consulado de España.",
      },
    ],
    related: {
      guides: [
        "documentos-para-viajar",
        "seguro-de-viaje-que-cubre",
        "usar-el-movil-en-el-extranjero",
      ],
    },
    sources: [
      SOURCES.esTravelAdvice,
      SOURCES.incibeHolidayScams,
      SOURCES.incibeTravel,
    ],
  },
  {
    slug: "viajar-con-medicamentos",
    locale: "es",
    translationOf: "travelling-with-medication",
    photo: "insurance",
    category: "practical",
    status: "published",
    publishAt: "2026-11-30",
    lastReviewed: "2026-11-09",
    title: "Viajar con medicamentos: lo que debes saber antes de volar",
    description:
      "Cómo viajar con medicamentos: llevarlos en el equipaje de mano, qué documentos llevar, el control de seguridad, los medicamentos controlados y las normas fuera.",
    headline: "Viajar con medicamentos: lo que debes saber antes de volar",
    intro:
      "Si tomas medicación de forma habitual, un poco de planificación te asegura tener lo necesario durante todo el viaje y evitar problemas en el control de seguridad o en la frontera. Lo esencial es sencillo: lleva suficiente, guárdalo en el equipaje de mano, lleva los papeles adecuados y comprueba si tu destino restringe alguno de tus medicamentos. Esta guía es solo información general: consulta a tu médico o farmacéutico sobre tu caso.",
    sections: [
      {
        heading: "Planifícalo con tu médico o farmacéutico",
        paragraphs: [
          "Habla con tu médico o farmacéutico con tiempo, sobre todo si el viaje es largo, si vas a cruzar muchos husos horarios o si necesitas inyecciones o medicamentos que se conservan en frío. Te ayudarán a calcular cuánto llevar y a ajustar las tomas cuando cambie la hora. Los centros de vacunación internacional del Ministerio de Sanidad también orientan sobre la salud en los viajes.",
          "Lleva medicación suficiente para todo el viaje y unos días más por si hay retrasos. Si necesitas mucha cantidad, pregunta cuánta se puede dispensar de una vez, porque puede haber límites.",
        ],
        bullets: [],
      },
      {
        heading: "Llévalos en el equipaje de mano",
        paragraphs: [
          "Guarda los medicamentos en el equipaje de mano para tenerlos contigo si la maleta facturada se retrasa o se pierde. Muchos viajeros llevan además una pequeña reserva en la maleta facturada por si se pierde la de mano. Nuestra guía sobre [qué hacer si pierden tu maleta](/es/blog/que-hacer-si-pierden-tu-maleta) explica por qué importa.",
          "Deja las pastillas en su envase original de farmacia, para que el personal de seguridad y de fronteras vea qué son y a quién pertenecen.",
        ],
        bullets: [
          "Medicamentos en su envase original",
          "Una copia de la receta o del informe médico",
          "Un informe de tu médico para inyecciones, dispositivos o cantidades grandes",
          "Una lista de tus medicamentos con su principio activo",
          "Una bolsa isotérmica para los que deben conservarse en frío, si hace falta",
        ],
      },
      {
        heading: "El control de seguridad",
        paragraphs: [
          "Los medicamentos líquidos suelen estar permitidos en el control en cantidades mayores que el límite habitual de líquidos, pero a menudo tendrás que enseñarlos aparte y pueden pedirte que demuestres que los necesitas. Avísalo al personal al empezar el control.",
          "Las normas cambian según el país y el aeropuerto, así que consulta la información de tu aeropuerto de salida. Nuestros [consejos para el control de seguridad](/es/blog/consejos-control-de-seguridad-aeropuerto) explican qué más esperar.",
        ],
        bullets: [],
      },
      {
        heading: "Medicamentos restringidos en otros países",
        paragraphs: [
          "Algunos medicamentos que en España son normales, incluso algunos sin receta, están controlados o prohibidos en otros países. Puede que necesites un permiso para entrar con ellos o que solo se permita una cantidad limitada. Consulta con la embajada de cada país que vayas a visitar y en las Recomendaciones de viaje de Exteriores antes de salir.",
          "La Agencia Española de Medicamentos y Productos Sanitarios (AEMPS) explica qué documentación puede pedirse al viajar con medicación personal. Para algunos medicamentos estupefacientes o psicótropos, la AEMPS expide un certificado que autoriza a llevarlos al salir de España; solicítalo con antelación, porque el trámite tarda.",
        ],
        bullets: [],
      },
      {
        heading: "Dispositivos y material médico",
        paragraphs: [
          "Si usas dispositivos como bombas de insulina, medidores de glucosa, inhaladores, aparatos de CPAP o autoinyectores de adrenalina, llévalos en el equipaje de mano con un informe médico que explique qué son. Pregunta a la aerolínea con antelación si puedes usar a bordo un dispositivo con batería y si necesitas un tipo concreto de batería o una de repuesto.",
          "Avisa al personal de seguridad de los dispositivos que no deben pasar por el escáner; muchos aeropuertos ofrecen una revisión alternativa y un servicio de asistencia para quien necesita ayuda.",
        ],
        bullets: [
          "Lleva un informe médico para los dispositivos y las agujas",
          "Contacta con la aerolínea antes de volar con un equipo médico con batería",
          "Lleva en cabina baterías y material de repuesto",
        ],
      },
      {
        heading: "Husos horarios, calor y conservación",
        paragraphs: [
          "Cruzar husos horarios puede hacer que te líes con las tomas. Pregunta a tu médico o farmacéutico cómo ajustarlas, sobre todo si la hora es importante. Nuestra guía para [combatir el jet lag](/es/blog/como-combatir-el-jet-lag) explica cómo adaptarte al nuevo horario.",
          "Algunos medicamentos deben conservarse por debajo de cierta temperatura. No los dejes en un coche al sol y comprueba si tu alojamiento tiene nevera si la necesitas.",
        ],
        bullets: [],
      },
      {
        heading: "Si te quedas sin medicación o la pierdes",
        paragraphs: [
          "Los medicamentos pueden tener otro nombre comercial en el extranjero, así que llevar una lista con el principio activo facilita que un farmacéutico o un médico local te ayude. Tu seguro de viaje puede cubrir los gastos médicos urgentes; nuestra guía del [seguro de viaje](/es/blog/seguro-de-viaje-que-cubre) explica qué comprobar.",
          "No compres medicamentos a vendedores no oficiales, porque pueden ser falsos o peligrosos. Una farmacia, un médico local o la línea de asistencia de tu seguro son la opción más segura.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "¿Puedo llevar mis medicamentos con receta en el avión?",
        answer:
          "Normalmente sí. Llévalos en el equipaje de mano, en su envase original y con una copia de la receta o del informe médico. Los medicamentos líquidos suelen permitirse por encima del límite habitual, pero puede que tengas que declararlos en el control.",
      },
      {
        question: "¿Necesito un informe médico para viajar con medicación?",
        answer:
          "No siempre es obligatorio, pero ayuda, sobre todo con inyecciones, dispositivos, cantidades grandes o medicamentos controlados. Algunos países exigen un permiso para ciertos medicamentos, así que compruébalo antes de viajar.",
      },
      {
        question: "¿Hay medicamentos prohibidos en otros países?",
        answer:
          "Sí. Algunos medicamentos legales en España, incluso algunos sin receta, están restringidos o prohibidos en otros países. Consulta con la embajada de cada país que vayas a visitar y en las Recomendaciones de viaje de Exteriores.",
      },
    ],
    related: {
      guides: [
        "consejos-control-de-seguridad-aeropuerto",
        "seguro-de-viaje-que-cubre",
        "como-combatir-el-jet-lag",
      ],
    },
    sources: [
      SOURCES.aempsTravellers,
      SOURCES.esTravelHealth,
      SOURCES.esTravelAdvice,
    ],
  },
  {
    slug: "consejos-vuelos-largos",
    locale: "es",
    translationOf: "long-haul-flight-tips",
    photo: "jet-lag",
    category: "practical",
    status: "published",
    publishAt: "2026-12-05",
    lastReviewed: "2026-11-09",
    title: "Consejos para vuelos largos: llega descansado",
    description:
      "Cómo sobrevivir a un vuelo de largo radio: elegir asiento, qué llevar, dormir en el avión, estar cómodo y sano a bordo y llegar con energía.",
    headline: "Consejos para vuelos largos: llega descansado, no destrozado",
    intro:
      "Diez horas o más en un asiento de avión son todo un reto, pero casi todo lo que hace insoportable un vuelo largo se puede prever. El asiento adecuado, un pequeño kit de comodidad, un plan de sueño adaptado al destino y moverte durante el vuelo marcan una gran diferencia. Así llegarás sintiéndote lo más normal posible.",
    sections: [
      {
        heading: "Antes de reservar",
        paragraphs: [
          "En las rutas largas, el horario importa. Un vuelo nocturno que aterriza por la mañana puede ayudarte a adaptarte al nuevo huso horario, mientras que uno de día puede ser mejor si te cuesta dormir en el avión. Un vuelo directo cansa menos, pero una escala bien elegida puede partir un viaje muy largo; nuestra guía sobre [cuánto tiempo de escala necesitas](/es/blog/cuanto-tiempo-de-escala-necesito) te ayuda a calcular una conexión segura.",
          "Comprueba qué incluye tu tarifa. La elección de asiento, las comidas y la maleta facturada no siempre están incluidas, ni siquiera en vuelos largos. Nuestra guía de [cargos de las aerolíneas de bajo coste](/es/blog/cargos-de-las-aerolineas-de-bajo-coste) explica en qué fijarte.",
        ],
        bullets: [],
      },
      {
        heading: "Cómo elegir asiento",
        paragraphs: [
          "La ventanilla es la mejor opción para dormir, porque puedes apoyarte en la pared y nadie te pide paso. El pasillo es mejor si te gusta levantarte a menudo. Los asientos cerca de los aseos y las cocinas son más ruidosos, y algunos asientos de salida de emergencia o de primera fila tienen más espacio para las piernas, pero reposabrazos fijos o sin sitio en el suelo para guardar cosas.",
          "Elige asiento en cuanto tu tarifa lo permita y revisa el plano de asientos en la aplicación de la aerolínea; muchas abren más asientos al hacer el check-in en línea.",
        ],
        bullets: [],
      },
      {
        heading: "Qué llevar en el equipaje de mano",
        paragraphs: [
          "Un pequeño kit bien pensado, en el bolsillo del asiento o debajo, hace los vuelos largos mucho más cómodos. Nuestra guía sobre [qué llevar en el equipaje de mano](/es/blog/que-llevar-en-el-equipaje-de-mano) repasa lo esencial.",
        ],
        bullets: [
          "Capas de ropa, con una prenda de abrigo y calcetines, porque la cabina puede estar fría",
          "Antifaz, tapones o auriculares con cancelación de ruido",
          "Una botella reutilizable (llénala después del control)",
          "Bálsamo labial, crema hidratante y tus medicamentos",
          "Cargador o batería externa, y películas y libros descargados",
          "Un bolígrafo para los formularios de llegada",
        ],
      },
      {
        heading: "Dormir en el avión",
        paragraphs: [
          "Planifica el sueño según la hora de tu destino, no la de casa. Si allí será de noche mientras vuelas hacia la mañana, intenta dormir; si aterrizas por la tarde, mantente despierto más tiempo para llegar con sueño a la hora de acostarte. Pon el reloj en la hora del destino al embarcar.",
          "Modera el alcohol y la cafeína, que empeoran el sueño. Nuestra guía para [combatir el jet lag](/es/blog/como-combatir-el-jet-lag) explica cómo adaptarte los días antes y después del vuelo.",
        ],
        bullets: [],
      },
      {
        heading: "Comodidad y salud a bordo",
        paragraphs: [
          "Pasar mucho tiempo sentado aumenta el riesgo de que se formen coágulos en las piernas, lo que se conoce como trombosis venosa profunda. Las fuentes de salud recomiendan mover las piernas con frecuencia, caminar cuando se pueda y beber agua suficiente. Si tienes factores de riesgo, como un coágulo previo, una operación reciente o un embarazo, consulta a tu médico antes de volar.",
          "El aire de la cabina es seco, así que bebe agua con regularidad y usa crema hidratante y colirio si lo necesitas. Estira el cuello, los hombros y los tobillos cada hora más o menos, y levántate a caminar por el pasillo cuando la señal del cinturón esté apagada.",
        ],
        bullets: [
          "Mueve los tobillos y las pantorrillas sentado",
          "Camina por el pasillo cada par de horas cuando sea seguro",
          "Bebe agua con regularidad y limita el alcohol",
          "Lleva ropa holgada y cómoda",
        ],
      },
      {
        heading: "Comer y beber a bordo",
        paragraphs: [
          "Las comidas del avión se sirven al ritmo de la aerolínea, no al tuyo, así que lleva algún tentempié que te guste, como frutos secos, barritas o galletas saladas. Consulta las normas de tu destino sobre la entrada de alimentos, porque la fruta fresca, la carne y los lácteos suelen estar prohibidos y hay que consumirlos o tirarlos antes de llegar.",
          "Si necesitas un menú especial, como vegetariano, sin gluten o infantil, pídelo al reservar o al menos un par de días antes de la salida en la web o la aplicación de la aerolínea. Las comidas ligeras y mucha agua sientan mejor en un vuelo largo que la comida pesada y el alcohol.",
        ],
        bullets: [
          "Pide los menús especiales con antelación",
          "Lleva tentempiés secos en lugar de comida fresca",
          "Consulta las normas sobre alimentos en tu destino",
        ],
      },
      {
        heading: "Después de aterrizar",
        paragraphs: [
          "Sal a la luz del día el primer día e intenta mantenerte despierto hasta una hora normal de acostarte allí. Planea un primer día tranquilo en lugar de una agenda apretada; nuestro [planificador de viajes con IA](/es/planificar) puede incluir un primer día más ligero en tu itinerario.",
          "Ten resuelto el traslado antes de aterrizar para no tener que decidir cansado. Nuestra guía para ir [del aeropuerto al centro](/es/blog/del-aeropuerto-al-centro-paris-roma-tokio-lisboa) cubre varios destinos importantes.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "¿Cuál es el mejor asiento en un vuelo de largo radio?",
        answer:
          "Para dormir, normalmente una ventanilla lejos de los aseos y las cocinas. Si te gusta estirar las piernas a menudo, el pasillo es más cómodo. Las filas de emergencia pueden tener más espacio, pero a veces con reposabrazos fijos.",
      },
      {
        question: "¿Cómo puedo dormir mejor en un vuelo largo?",
        answer:
          "Ajusta el sueño a la noche de tu destino, lleva antifaz y tapones o auriculares, abrígate con capas y evita el alcohol y el exceso de cafeína. Una ventanilla te ayuda a descansar sin que te molesten.",
      },
      {
        question: "¿Cómo evito los coágulos en un vuelo largo?",
        answer:
          "Mueve las piernas a menudo, camina cuando puedas y bebe agua suficiente. Si tienes factores de riesgo, como un coágulo previo, una operación reciente o un embarazo, pide consejo a tu médico antes de volar.",
      },
    ],
    related: {
      guides: [
        "como-combatir-el-jet-lag",
        "que-llevar-en-el-equipaje-de-mano",
        "viajar-con-medicamentos",
      ],
    },
    sources: [
      SOURCES.medlineDvtEs,
      SOURCES.esTravelHealth,
      SOURCES.cdcTravelClots,
    ],
  },
];
