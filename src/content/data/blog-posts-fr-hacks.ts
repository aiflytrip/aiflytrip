import { type GuideSchema } from "@/content/schema";
import { SOURCES } from "@/content/data/sources";
import { type z } from "zod";

type PostInput = z.input<typeof GuideSchema>;

/**
 * French editions of the travel hacks batch, the first posts of the French
 * blog. Written for French-speaking readers rather than translated line by
 * line, and each shares its English post's publish date. Passenger rights
 * are described in general terms only; amounts, deadlines and eligibility
 * come from the official sources. Links to English-only pages say so.
 */
export const frenchHackPosts: PostInput[] = [
  {
    slug: "astuces-de-voyage-qui-marchent",
    locale: "fr",
    translationOf: "travel-hacks-that-work",
    photo: "flight-tips",
    category: "planning",
    status: "published",
    publishAt: "2026-11-09",
    lastReviewed: "2026-11-09",
    title: "Astuces de voyage qui marchent vraiment (et les autres)",
    description:
      "Des astuces de voyage concrètes pour payer moins cher l'avion, voyager léger, passer l'aéroport sans stress et mieux s'organiser, et les fausses bonnes idées.",
    headline: "Astuces de voyage qui marchent vraiment",
    intro:
      "Internet regorge d'astuces de voyage, et beaucoup ne sont que des idées reçues recyclées. Celles que nous avons retenues ici tiennent la route : des habitudes simples qui font gagner de l'argent, du temps ou de la sérénité sur presque n'importe quel voyage. Aucune ne demande de stratégie de miles ni de carte bancaire particulière, et nous terminons par quelques astuces populaires qui, en général, n'en valent pas la peine.",
    sections: [
      {
        heading: "Pour réserver les vols",
        paragraphs: [
          "Les plus grosses économies viennent de la flexibilité, pas de sites secrets. Si vous pouvez décaler votre voyage d'un jour ou deux, ou atterrir dans un autre aéroport de la même région, vous verrez beaucoup plus d'options qu'en cherchant une seule date et un seul aéroport. Notre guide pour [trouver des vols pas chers](/blog/how-to-find-cheap-flights) (en anglais) détaille la méthode.",
          "Comparez toujours le prix total, pas le tarif affiché. Un billet bon marché qui fait payer le bagage cabine et le choix du siège peut coûter plus cher qu'un tarif plus complet sur une autre compagnie. Notre [calculateur de frais de bagages](/fr/outils/frais-de-bagages) vous aide à comparer à armes égales avant de payer.",
        ],
        bullets: [
          "Cherchez sur une plage de dates plutôt qu'un seul jour",
          "Regardez les aéroports proches, au départ comme à l'arrivée",
          "Ajoutez les bagages et les sièges dont vous avez vraiment besoin avant de comparer",
          "À prix égal, réservez auprès de la compagnie : les modifications sont plus simples",
          "Gardez une capture des conditions du tarif et du prix payé",
        ],
      },
      {
        heading: "Pour faire sa valise",
        paragraphs: [
          "Voyager avec un simple bagage cabine fait gagner du temps dans les deux aéroports et supprime le risque de bagage perdu. Le secret consiste à prévoir des tenues plutôt que d'emporter des affaires « au cas où » : choisissez une palette de couleurs pour que tout aille ensemble, portez vos chaussures et votre veste les plus encombrantes dans l'avion et, pour les longs séjours, prévoyez une petite lessive.",
          "Vérifiez les dimensions et le poids autorisés par votre compagnie avant de faire votre valise, pas à la porte d'embarquement. Notre [vérificateur de taille de bagage cabine](/fr/outils/taille-bagage-cabine) le fait en quelques secondes, et notre [liste de valise](/fr/outils/liste-valise) prépare une liste adaptée à votre destination et à la durée du séjour.",
        ],
        bullets: [
          "Gardez en cabine médicaments, chargeurs, papiers et une tenue de rechange",
          "Glissez un traceur ou une carte avec vos coordonnées dans le bagage en soute",
          "Photographiez votre valise et son contenu avant de l'enregistrer",
        ],
      },
      {
        heading: "À l'aéroport",
        paragraphs: [
          "L'essentiel du stress à l'aéroport vient de files d'attente imprévues. Enregistrez-vous en ligne, téléchargez votre carte d'embarquement sur votre téléphone et gardez-en une capture d'écran au cas où l'application ne se chargerait pas. Rangez liquides et appareils électroniques de façon à pouvoir les sortir facilement, car les règles varient d'un aéroport à l'autre.",
          "Prévoyez assez de temps pour les correspondances. Une escale qui semble efficace sur un site de réservation peut être irréaliste dans un grand aéroport ou s'il faut changer de terminal. Notre [vérificateur de temps de correspondance](/fr/outils/temps-de-correspondance) vous donne un minimum raisonnable pour votre trajet.",
        ],
        bullets: [
          "Installez l'application de la compagnie et activez les alertes de vol",
          "Emportez une gourde vide à remplir après le contrôle",
          "Notez la porte et l'heure d'embarquement, pas seulement l'heure de départ",
        ],
      },
      {
        heading: "L'argent à l'étranger",
        paragraphs: [
          "Quand un terminal de paiement ou un distributeur à l'étranger vous propose de payer dans votre propre devise, il vaut généralement mieux choisir la devise locale. Cette option, appelée conversion dynamique de devises, applique souvent un taux de change moins avantageux. Le guide de l'UE sur l'argent et les frais en voyage explique le fonctionnement des frais de carte.",
          "Emportez deux cartes de paiement et rangez-les à des endroits différents, et prévenez votre banque de votre voyage si elle le demande. Un peu d'argent liquide en monnaie locale reste utile dans de nombreux pays pour les taxis, les marchés et les pourboires.",
        ],
        bullets: [],
      },
      {
        heading: "Pour organiser le voyage",
        paragraphs: [
          "L'astuce la plus sous-estimée est de prévoir moins de choses par jour. Regroupez les visites par quartier, ne réservez à l'avance que les sites qui affichent vraiment complet et laissez du temps libre pour vous reposer et pour l'imprévu. Notre [planificateur de voyage IA](/fr/planifier) prépare un programme jour par jour que vous pouvez modifier.",
          "Décidez de la durée du séjour avant de réserver. Un voyage trop court se passe surtout dans les transports ; notre outil [combien de jours faut-il ?](/fr/outils/combien-de-jours) propose une durée réaliste pour chaque destination, et notre [calculateur de budget de voyage](/fr/outils/calculateur-budget-voyage) estime ce que coûtera le séjour.",
        ],
        bullets: [],
      },
      {
        heading: "Les astuces qui ne marchent pas",
        paragraphs: [
          "Certains conseils très partagés sont dépassés ou relèvent du mythe. Chercher en navigation privée pour voir des prix plus bas en est un exemple : les tarifs changent sans cesse parce que des sièges se vendent, pas parce qu'un site se souvient de vous. Réserver un jour précis de la semaine en est un autre ; il n'existe pas de jour le moins cher fiable pour acheter.",
          "Ne pas prendre le dernier vol d'un billet (le « skiplagging ») peut enfreindre les conditions de la compagnie, entraîner l'annulation de votre retour et se révèle impossible avec un bagage en soute. Les fausses réservations de vol pour une demande de visa sont aussi un vrai risque ; notre guide sur la [réservation de vol pour un visa](/blog/dummy-ticket-for-visa) (en anglais) présente les solutions légales.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question:
          "Quelle est la meilleure astuce pour payer un vol moins cher ?",
        answer:
          "La flexibilité. Chercher sur une plage de dates et dans les aéroports proches, puis comparer le prix total avec bagages et sièges, fait économiser davantage que n'importe quelle astuce ou n'importe quel site.",
      },
      {
        question:
          "La navigation privée fait-elle baisser le prix des billets ?",
        answer:
          "Rien ne le prouve sérieusement. Les prix changent parce que des sièges se vendent et que les tarifs sont ajustés : voir un autre prix un peu plus tard est en général une évolution normale du tarif, pas du pistage.",
      },
      {
        question: "Faut-il payer en devise locale ou en euros à l'étranger ?",
        answer:
          "En général en devise locale. Quand le terminal propose de convertir le montant dans votre devise, le taux appliqué est souvent moins favorable que celui qu'utiliserait votre propre banque.",
      },
      {
        question: "Voyager avec un seul bagage cabine, est-ce intéressant ?",
        answer:
          "Pour un séjour court, souvent oui : vous évitez les frais de bagage en soute, l'attente au tapis et le risque de valise perdue. Vérifiez d'abord les dimensions et le poids autorisés par votre compagnie.",
      },
    ],
    related: { guides: [] },
    sources: [
      SOURCES.euCardChargesFr,
      SOURCES.euAirRightsFr,
      SOURCES.dgacDelays,
    ],
  },
  {
    slug: "indemnisation-retard-de-vol",
    locale: "fr",
    translationOf: "flight-delay-compensation",
    photo: "layover",
    category: "flights",
    status: "published",
    publishAt: "2026-11-09",
    lastReviewed: "2026-11-09",
    title: "Vol retardé ou annulé : vos droits et comment réclamer",
    description:
      "Que faire si votre vol est retardé ou annulé : prise en charge à l'aéroport, remboursement ou réacheminement, indemnisation dans l'UE et démarches à suivre.",
    headline: "Vol retardé ou annulé : vos droits et comment réclamer",
    intro:
      "Un long retard ou une annulation peuvent sembler être une fatalité, mais vous avez souvent des droits précis : être pris en charge à l'aéroport, choisir entre un remboursement et un autre vol et, parfois, recevoir une indemnisation forfaitaire. Ce à quoi vous avez droit dépend surtout de l'aéroport de départ, de la compagnie et de la cause de la perturbation.",
    sections: [
      {
        heading: "Les premiers réflexes à l'aéroport",
        paragraphs: [
          "À l'aéroport, vos priorités sont d'arriver à destination et de garder des preuves. Demandez à la compagnie ce qui se passe et ce qu'elle propose, et utilisez son application ou sa ligne téléphonique pendant que vous faites la queue, car les places sur les autres vols partent vite.",
        ],
        bullets: [
          "Gardez votre carte d'embarquement et la confirmation de réservation",
          "Photographiez le tableau des départs indiquant le retard ou l'annulation",
          "Notez le motif donné par la compagnie et à quel moment il l'a été",
          "Conservez les justificatifs de repas, de transport et d'hôtel",
          "Notez l'heure réelle d'arrivée à votre destination finale",
        ],
      },
      {
        heading: "Quelles règles s'appliquent à votre vol",
        paragraphs: [
          "Dans l'Union européenne, le règlement (CE) n° 261/2004 couvre les vols au départ d'un aéroport de l'UE, quelle que soit la compagnie, et les vols à destination de l'UE opérés par une compagnie européenne. C'est à ces règles que l'on pense quand on parle d'indemnisation pour retard de vol. Le Royaume-Uni applique des règles équivalentes depuis sa sortie de l'UE.",
          "Aux États-Unis, il n'existe pas d'indemnisation forfaitaire pour les retards, mais le ministère américain des Transports impose le remboursement quand la compagnie annule ou modifie fortement un vol et que vous renoncez à voyager. D'autres pays ont leurs propres règles : consultez toujours les informations officielles du pays de départ.",
        ],
        bullets: [],
      },
      {
        heading: "Prise en charge, remboursement et réacheminement",
        paragraphs: [
          "Selon les règles européennes, quand le retard est suffisamment long, la compagnie doit vous prendre en charge pendant l'attente : repas et rafraîchissements, moyen de communiquer et, si vous devez passer la nuit sur place, hôtel et transfert. Si elle ne le fait pas, gardez les justificatifs de dépenses raisonnables et demandez-en le remboursement ensuite.",
          "Si votre vol est annulé, vous pouvez en principe choisir entre le remboursement du billet et un réacheminement vers votre destination. N'acceptez un avoir que si vous le souhaitez vraiment : vous pouvez demander un remboursement.",
        ],
        bullets: [],
      },
      {
        heading: "Quand demander une indemnisation",
        paragraphs: [
          "Selon les règles européennes, vous pouvez avoir droit à une indemnisation forfaitaire si vous arrivez à votre destination finale avec plusieurs heures de retard ou si votre vol est annulé peu de temps avant le départ. Le montant dépend de la distance du vol et de votre retard à l'arrivée ; les pages officielles de l'UE et de la DGAC indiquent les seuils en vigueur.",
          "Aucune indemnisation n'est due quand la perturbation résulte de circonstances extraordinaires échappant au contrôle de la compagnie, comme des conditions météo extrêmes, des restrictions du contrôle aérien ou des risques pour la sûreté. En revanche, les problèmes techniques de l'avion relèvent en général de la responsabilité de la compagnie : ne vous contentez pas d'une explication vague.",
        ],
        bullets: [],
      },
      {
        heading: "Comment réclamer",
        paragraphs: [
          "Adressez d'abord votre réclamation directement à la compagnie. La plupart proposent un formulaire en ligne ; indiquez la référence de réservation, le numéro de vol, la date, ce qui s'est passé et joignez les justificatifs de vos dépenses. Restez bref et factuel.",
          "Si la compagnie refuse ou ne répond pas, vous pouvez saisir un médiateur, comme le Médiateur Tourisme et Voyage pour les compagnies qui y adhèrent, ou signaler le litige à l'organisme officiel. En France, c'est la Direction générale de l'aviation civile (DGAC), qui explique la démarche sur le site du ministère chargé des Transports. Les sociétés de réclamation peuvent s'en occuper pour vous, mais elles prélèvent une partie de l'indemnisation, et vous obtiendrez souvent le même résultat seul.",
        ],
        bullets: [
          "Réclamez auprès de la compagnie qui a opéré le vol",
          "Joignez les preuves du retard et de votre heure d'arrivée",
          "Demandez le motif de la perturbation par écrit",
          "Saisissez le médiateur ou l'organisme officiel en cas de refus",
        ],
      },
      {
        heading: "Voyages à forfait et autres transports",
        paragraphs: [
          "Si votre vol faisait partie d'un voyage à forfait, vous pouvez bénéficier d'une protection supplémentaire auprès de l'organisateur du voyage, en plus de la compagnie. Les retards et annulations en train, en car et en bateau relèvent d'autres droits des passagers dans l'UE : consultez les règles propres à ce mode de transport si votre voyage continue par la route ou par la mer.",
        ],
        bullets: [],
      },
      {
        heading: "Correspondances manquées et billets séparés",
        paragraphs: [
          "Si un retard vous fait manquer une correspondance prévue sur la même réservation, vos droits sont en général calculés d'après votre heure d'arrivée à la destination finale. Si vous avez acheté des billets séparés, la seconde compagnie n'a aucune obligation de vous aider. Notre guide sur les [correspondances manquées](/blog/missed-connecting-flight) (en anglais) explique la différence, et notre [vérificateur de temps de correspondance](/fr/outils/temps-de-correspondance) vous aide à prévoir une marge suffisante.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "À partir de combien de retard peut-on être indemnisé ?",
        answer:
          "Selon les règles européennes, l'indemnisation dépend de votre retard à l'arrivée à la destination finale et de la distance du vol. Les pages officielles de l'UE et de la DGAC indiquent les seuils et les montants en vigueur.",
      },
      {
        question: "Suis-je indemnisé si le retard est dû à la météo ?",
        answer:
          "En général non. Des conditions météo extrêmes constituent une circonstance extraordinaire selon les règles européennes. La compagnie doit tout de même vous prendre en charge pendant l'attente et proposer remboursement ou réacheminement si elle annule.",
      },
      {
        question: "Les compagnies américaines indemnisent-elles les retards ?",
        answer:
          "Il n'existe pas d'indemnisation légale générale pour les retards aux États-Unis. Le ministère américain des Transports impose en revanche le remboursement quand la compagnie annule ou modifie fortement le vol et que vous renoncez à voyager.",
      },
      {
        question: "Faut-il passer par une société de réclamation ?",
        answer:
          "C'est possible, mais elle garde une partie de l'argent. Réclamer directement à la compagnie, puis saisir le médiateur ou la DGAC en cas de refus, est gratuit et fonctionne souvent aussi bien pour les cas simples.",
      },
    ],
    related: { guides: ["astuces-de-voyage-qui-marchent"] },
    sources: [
      SOURCES.euAirRightsFr,
      SOURCES.eu261Fr,
      SOURCES.dgacDelays,
      SOURCES.usDotAirConsumer,
    ],
  },
  {
    slug: "bagage-perdu-que-faire",
    locale: "fr",
    translationOf: "lost-luggage-what-to-do",
    photo: "airline-fees",
    category: "practical",
    status: "published",
    publishAt: "2026-11-14",
    lastReviewed: "2026-11-09",
    title: "Bagage perdu ou retardé : que faire ?",
    description:
      "Votre valise n'est pas arrivée ? Que faire avant de quitter l'aéroport, comment vous faire rembourser l'essentiel, et que faire si le bagage est abîmé ou perdu.",
    headline: "Bagage perdu ou retardé : que faire ?",
    intro:
      "Voir le tapis s'arrêter sans votre valise est l'un des pires moments d'un voyage. Bonne nouvelle : la plupart des bagages retardés réapparaissent en quelques jours, et les compagnies ont une procédure pour les retrouver et couvrir vos besoins en attendant. Ce que vous faites dans la première heure facilite beaucoup la suite.",
    sections: [
      {
        heading: "Avant de quitter la salle de livraison des bagages",
        paragraphs: [
          "Ne quittez pas l'aéroport sans déclarer le bagage manquant. Rendez-vous au comptoir bagages de la compagnie dans la zone d'arrivée, parfois tenu par une société d'assistance, et remplissez le constat d'irrégularité bagage (PIR). Vous recevrez un numéro de dossier, indispensable pour suivre votre valise et pour toute réclamation.",
        ],
        bullets: [
          "Ayez sous la main le talon de l'étiquette bagage (souvent collé sur la carte d'embarquement)",
          "Décrivez la valise : couleur, marque, taille et tout signe distinctif",
          "Donnez une adresse et un numéro de téléphone pour la livraison",
          "Demandez ce que la compagnie prend en charge en attendant, et faites-le noter par écrit",
          "Gardez une copie ou une photo du constat",
        ],
      },
      {
        heading: "Retardé, endommagé ou perdu",
        paragraphs: [
          "Les compagnies distinguent trois situations. Un bagage retardé arrive plus tard ; la plupart sont retrouvés et livrés chez vous ou à votre hôtel. Un bagage endommagé est bien arrivé, mais cassé ou avec un contenu abîmé. Un bagage perdu est celui que la compagnie n'a pas retrouvé au bout d'un certain délai ; il est alors considéré comme perdu et vous pouvez réclamer pour son contenu.",
          "Sur les vols internationaux, la responsabilité de la compagnie est surtout régie par la convention de Montréal, qui fixe des plafonds d'indemnisation et des délais stricts pour réclamer par écrit. Les délais pour un bagage endommagé ou retardé sont courts : signalez le problème à l'aéroport et vérifiez les délais exacts sur les pages officielles.",
        ],
        bullets: [],
      },
      {
        heading: "Acheter l'essentiel en attendant",
        paragraphs: [
          "Si votre bagage est retardé, vous pouvez en général vous faire rembourser les achats de première nécessité, comme des articles de toilette, des vêtements de rechange et un chargeur de téléphone. Tout est dans le mot « raisonnable » : achetez ce dont vous avez besoin pour un ou deux jours, pas une nouvelle garde-robe, et gardez tous les tickets.",
          "Vérifiez aussi votre assurance voyage et la carte bancaire avec laquelle vous avez payé. Beaucoup de contrats couvrent le retard de bagage, parfois au-delà d'un nombre d'heures minimum. Lisez les conditions avant de partir pour savoir ce qui est prévu.",
        ],
        bullets: [],
      },
      {
        heading: "Si la valise arrive abîmée",
        paragraphs: [
          "Examinez votre valise avant de quitter la salle de livraison. Si une roulette, une poignée ou une fermeture est cassée, ou si elle arrive mouillée ou écrasée, signalez-le tout de suite au comptoir bagages et demandez un constat de dommages. Photographiez la valise et le contenu abîmé avant de déplacer quoi que ce soit.",
          "Les compagnies excluent souvent l'usure normale, comme les rayures et petites marques, et peuvent refuser de payer les objets fragiles ou de valeur placés en soute. Elles proposent en général une réparation, un remplacement ou un dédommagement selon l'âge et la valeur de la valise : gardez si possible la preuve de son prix.",
        ],
        bullets: [
          "Signalez le dommage avant de quitter l'aéroport si possible",
          "Photographiez la valise, l'étiquette et le dommage",
          "Gardez la valise abîmée jusqu'au règlement du dossier",
        ],
      },
      {
        heading: "Billets séparés et vols avec correspondance",
        paragraphs: [
          "Quand tous vos vols sont sur la même réservation, c'est en général la dernière compagnie empruntée qui gère le constat, même si une autre a égaré la valise. Avec des billets séparés, déclarez le problème à la compagnie auprès de laquelle vous avez enregistré la valise pour ce trajet, et gardez les références de chaque vol.",
        ],
        bullets: [],
      },
      {
        heading: "Comment faire la réclamation",
        paragraphs: [
          "Envoyez votre réclamation par écrit à la compagnie, via son formulaire en ligne si elle en a un, avec la référence du constat, les détails de réservation, les tickets et la liste de ce qui manque ou est abîmé. Pour les objets de valeur, la preuve d'achat aide beaucoup.",
          "Si la compagnie refuse ou ne répond pas, suivez sa procédure de réclamation, puis saisissez un médiateur ou l'organisme officiel. En France, la DGAC explique sur le site du ministère chargé des Transports ce que vous pouvez faire en cas de dommages aux bagages lors d'un vol international.",
        ],
        bullets: [],
      },
      {
        heading: "Comment éviter de perdre sa valise",
        paragraphs: [
          "La plupart des bagages s'égarent lors des correspondances, surtout les plus courtes. Prévoyez assez de temps de transfert, et rappelez-vous qu'avec des billets séparés vous devrez souvent récupérer et réenregistrer la valise vous-même. Notre [vérificateur de temps de correspondance](/fr/outils/temps-de-correspondance) vous aide à évaluer une correspondance sûre.",
          "Retirez les anciennes étiquettes, inscrivez votre nom et vos coordonnées à l'intérieur et à l'extérieur de la valise, et pensez à un traceur pour pouvoir indiquer à la compagnie où elle se trouve. Gardez en cabine tout ce dont vous ne pouvez pas vous passer ; notre [liste de valise](/fr/outils/liste-valise) vous aide à ne rien oublier.",
        ],
        bullets: [
          "Photographiez la valise et son contenu avant l'enregistrement",
          "Gardez en cabine médicaments, objets de valeur et papiers",
          "Vérifiez que l'étiquette porte le bon code de l'aéroport d'arrivée",
        ],
      },
    ],
    faqs: [
      {
        question: "Combien de temps faut-il pour retrouver un bagage perdu ?",
        answer:
          "La plupart des bagages retardés sont retrouvés et livrés en quelques jours. Si la compagnie ne retrouve pas la valise au bout d'un certain délai, elle est considérée comme perdue et vous pouvez réclamer pour son contenu. Demandez ses délais à la compagnie.",
      },
      {
        question: "Les vêtements achetés en attendant sont-ils remboursés ?",
        answer:
          "En général oui, s'il s'agit d'achats de première nécessité et d'un montant raisonnable. Gardez les tickets et n'achetez que ce qu'il vous faut jusqu'à l'arrivée de la valise. Votre assurance voyage peut aussi couvrir le retard de bagage.",
      },
      {
        question:
          "Y a-t-il un délai pour réclamer pour un bagage abîmé ou retardé ?",
        answer:
          "Oui, et il peut être court. Sur les vols internationaux, la convention de Montréal fixe des délais pour réclamer par écrit. Signalez le problème à l'aéroport et vérifiez les délais sur les pages officielles sans attendre.",
      },
    ],
    related: {
      guides: ["indemnisation-retard-de-vol", "astuces-de-voyage-qui-marchent"],
    },
    sources: [SOURCES.dgacBaggage, SOURCES.euAirRightsFr, SOURCES.ukCaaBaggage],
  },
  {
    slug: "quand-reserver-un-vol",
    locale: "fr",
    translationOf: "best-time-to-book-flights",
    photo: "cheap-flights",
    category: "flights",
    status: "published",
    publishAt: "2026-11-21",
    lastReviewed: "2026-11-09",
    title: "Quand réserver un vol pour payer moins cher ?",
    description:
      "Combien de temps à l'avance réserver un vol, pourquoi le jour le moins cher pour acheter est un mythe, et comment s'organiser pour les vacances.",
    headline: "Quand réserver un vol pour payer moins cher ?",
    intro:
      "Il n'existe ni jour ni heure magique où les vols deviennent bon marché. Les prix des compagnies évoluent avec la demande : à mesure que les sièges se vendent, les tarifs les moins chers se ferment et le prix monte, et de temps en temps une compagnie lance une promotion. Ce que vous maîtrisez, c'est le moment où vous commencez à chercher, votre flexibilité et le moment où vous arrêtez d'attendre pour réserver.",
    sections: [
      {
        heading: "Pourquoi les tarifs changent",
        paragraphs: [
          "Les compagnies vendent le même siège à des prix différents, par niveaux de tarif aux conditions différentes. Quand le niveau le moins cher est épuisé, le suivant devient le prix le plus bas disponible. C'est pourquoi les prix montent souvent à l'approche du départ, et plus vite encore aux dates les plus demandées. Notre guide sur [la façon dont les compagnies fixent leurs prix](/blog/how-airline-pricing-works) (en anglais) l'explique en détail.",
          "Les tarifs peuvent aussi baisser quand la demande est plus faible que prévu ou lors d'une promotion. Il vaut donc la peine de suivre les prix pendant un moment avant de réserver, plutôt que d'acheter le premier tarif venu.",
        ],
        bullets: [],
      },
      {
        heading: "Combien de temps à l'avance réserver",
        paragraphs: [
          "En règle générale, commencez à chercher quelques mois avant pour un moyen-courrier, et plus tôt encore pour un long-courrier ou en haute saison. Réserver au dernier moment est un pari : les bonnes affaires de dernière minute existent, mais sur les lignes très demandées les sièges bon marché sont souvent déjà partis.",
          "Plus vos dates sont demandées, plus il faut réserver tôt. Les vacances scolaires, les ponts de mai, Noël et le Nouvel An ainsi que les grands événements locaux se remplissent vite. Si vos dates sont fixes, notre [calculateur de budget de voyage](/fr/outils/calculateur-budget-voyage) vous aide à voir où économiser ailleurs.",
        ],
        bullets: [
          "Moyen-courrier hors saison : surveillez les prix deux mois avant environ",
          "Long-courrier : commencez à chercher plusieurs mois avant",
          "Vacances et ponts : réservez dès que vos projets le permettent",
          "Escapades flexibles de dernière minute : comparez plusieurs dates et destinations",
        ],
      },
      {
        heading: "Le jour le moins cher pour réserver est un mythe",
        paragraphs: [
          "On lit souvent qu'un jour précis de la semaine est le moins cher pour acheter un billet. Les compagnies modifient leurs prix en permanence avec des systèmes automatisés, donc ce genre de régularité est faible et peu fiable. Le jour où vous volez compte bien plus que le jour où vous achetez : sur les lignes de loisirs, les vols en milieu de semaine sont souvent moins chers que ceux du vendredi et du dimanche.",
          "Effacer ses cookies ou chercher en navigation privée ne fait pas baisser les prix de façon fiable non plus. Si le prix augmente entre deux recherches, c'est très probablement que des sièges ont été vendus.",
        ],
        bullets: [],
      },
      {
        heading: "La flexibilité compte plus que le moment d'achat",
        paragraphs: [
          "Être flexible sur la date et l'aéroport fait généralement économiser davantage que de bien choisir le moment d'achat. Un vol la veille ou le lendemain, un autre horaire ou un aéroport proche peuvent coûter bien moins cher que votre premier choix. Utilisez la vue calendrier ou « dates flexibles » des comparateurs pour voir une semaine ou un mois entier d'un coup.",
          "Soyez flexible aussi sur la durée du séjour. Passer de sept nuits à six ou huit peut vous placer sur des jours d'aller et de retour moins chers. Notre outil [combien de jours faut-il ?](/fr/outils/combien-de-jours) vous aide à décider du temps qu'une destination mérite vraiment.",
        ],
        bullets: [
          "Comparez départs en semaine et le week-end",
          "Essayez les vols tôt le matin et tard le soir",
          "Regardez les aéroports proches au départ et à l'arrivée",
          "Comparez un aller-retour avec deux allers simples",
        ],
      },
      {
        heading: "Quand arrêter d'attendre",
        paragraphs: [
          "Attendre le prix parfait peut coûter cher. Si vous suivez une ligne depuis un moment et que le tarif est proche du plus bas que vous ayez vu, réservez, surtout pour des dates très demandées. La chance d'économiser encore un peu compense rarement le risque de voir partir les sièges les moins chers.",
        ],
        bullets: [],
      },
      {
        heading: "Bien utiliser les alertes de prix",
        paragraphs: [
          "Les alertes de prix des comparateurs de vols sont le moyen le plus simple de suivre une ligne sans la consulter tous les jours. Créez des alertes pour vos dates préférées et quelques alternatives, et fixez à l'avance le prix que vous êtes prêt à payer. Quand le tarif l'atteint, réservez au lieu d'attendre une nouvelle baisse.",
          "Quand l'alerte se déclenche, comparez le coût total : bagages, choix du siège et trajets vers l'aéroport peuvent transformer un tarif bon marché en tarif cher. Notre [calculateur de frais de bagages](/fr/outils/frais-de-bagages) vous aide à y voir clair.",
        ],
        bullets: [],
      },
      {
        heading: "Réserver avec un filet de sécurité",
        paragraphs: [
          "Si vos dates ne sont pas sûres, privilégiez les tarifs modifiables ou une option de mise en attente gratuite si votre compagnie en propose. Pour les vols au départ ou à destination des États-Unis, la réglementation américaine oblige les compagnies à vous laisser soit bloquer une réservation sans payer, soit l'annuler sans frais dans les 24 heures suivant l'achat, à condition de réserver au moins une semaine avant le départ.",
          "Lisez les conditions du tarif avant de payer et vérifiez que le prix inclut toutes les taxes et redevances obligatoires. Dans l'UE, les compagnies doivent afficher le prix final, taxes comprises, dès le début de la réservation.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question: "Combien de mois à l'avance faut-il réserver un vol ?",
        answer:
          "Commencez à chercher quelques mois avant pour un moyen-courrier, et plusieurs mois avant pour un long-courrier ou en haute saison. Créez des alertes de prix et réservez quand le tarif atteint un prix qui vous convient.",
      },
      {
        question:
          "Le mardi est-il le jour le moins cher pour acheter un billet ?",
        answer:
          "Pas de façon fiable. Les compagnies changent leurs prix en permanence, il n'y a donc pas de jour fixe le moins cher pour acheter. Le jour du vol compte davantage, et les vols en milieu de semaine sont souvent moins chers sur les lignes de loisirs.",
      },
      {
        question: "Les vols baissent-ils à l'approche de la date de départ ?",
        answer:
          "Parfois, mais rarement sur les lignes très demandées. À mesure que les sièges bon marché se vendent, le prix le plus bas disponible a tendance à monter. Les bonnes affaires de dernière minute sont plus probables sur les lignes et dates calmes.",
      },
    ],
    related: {
      guides: ["astuces-de-voyage-qui-marchent", "indemnisation-retard-de-vol"],
    },
    sources: [SOURCES.usDot24Hour, SOURCES.eu1008Fr, SOURCES.euAirRightsFr],
  },
  {
    slug: "conseils-controle-de-securite-aeroport",
    locale: "fr",
    translationOf: "airport-security-tips",
    photo: "carry-on",
    category: "practical",
    status: "published",
    publishAt: "2026-11-28",
    lastReviewed: "2026-11-09",
    title: "Contrôle de sécurité à l'aéroport : nos conseils",
    description:
      "Comment passer plus vite le contrôle de sécurité à l'aéroport : liquides et électronique, tenue, erreurs fréquentes et règles qui varient selon l'aéroport.",
    headline: "Contrôle de sécurité à l'aéroport : comment passer plus vite",
    intro:
      "Le contrôle de sécurité est la partie de l'aéroport que vous maîtrisez le moins, mais la plupart des retards qui s'y produisent sont évitables. Les sacs sont mis de côté encore et toujours pour les mêmes quelques raisons. Si vous préparez vos bagages en pensant au contrôle et que vous consultez les règles de votre aéroport de départ avant de partir, vous passerez beaucoup moins de temps dans la file.",
    sections: [
      {
        heading: "Consultez les règles de votre aéroport",
        paragraphs: [
          "Les règles de sûreté ne sont pas les mêmes partout. Certains aéroports disposent de nouveaux scanners qui permettent de laisser liquides et ordinateur dans le sac, d'autres demandent toujours de les sortir. Les limites pour les liquides peuvent varier entre aéroports d'un même pays et évoluent au fil du renouvellement des équipements.",
          "Avant de faire votre sac, consultez le site de votre aéroport de départ et les informations officielles, comme l'outil « What can I bring? » de la TSA pour les aéroports américains ou la page du gouvernement britannique sur les bagages à main. Pour le vol retour, vérifiez aussi les règles de cet aéroport, qui peuvent être plus strictes.",
        ],
        bullets: [],
      },
      {
        heading: "Préparez votre bagage cabine pour le contrôle",
        paragraphs: [
          "Placez sur le dessus tout ce que l'on pourrait vous demander de sortir. Mettez les liquides dans un sachet transparent refermable et rangez-le dans une poche extérieure. Gardez l'ordinateur et les gros appareils électroniques là où vous pourrez les sortir sans tout déballer.",
        ],
        bullets: [
          "Liquides, gels et aérosols dans un sachet transparent, en contenants de taille autorisée",
          "Ordinateur et tablette faciles à sortir",
          "Câbles et chargeurs regroupés dans une trousse, pas en vrac",
          "Ni objets tranchants ni outils dans le bagage cabine",
          "Batteries de rechange et batteries externes en cabine, jamais en soute",
        ],
      },
      {
        heading: "Habillez-vous pour le portique",
        paragraphs: [
          "Portez des chaussures faciles à enlever et évitez les ceintures à grosse boucle, les bijoux lourds et les vêtements chargés de métal. Rangez téléphone, clés, portefeuille et monnaie dans votre veste ou votre sac avant d'arriver au bac, plutôt que de vider vos poches devant le tapis.",
          "Gardez votre carte d'embarquement et votre pièce d'identité à la main ou dans une poche accessible : on vous les demande souvent juste avant le contrôle, puis à la porte d'embarquement. Quand votre bac sort du scanner, emportez-le jusqu'au banc après le tapis avant de remettre chaussures et ceinture et de ranger l'ordinateur : vous ne bloquerez pas les personnes derrière vous et vous n'oublierez rien. Jetez un dernier coup d'œil aux bacs avant de partir.",
        ],
        bullets: [],
      },
      {
        heading: "Pourquoi les sacs sont fouillés",
        paragraphs: [
          "Une fouille n'est pas une accusation, mais elle prend du temps. Les causes les plus fréquentes sont un liquide oublié dans une poche, des contenants trop grands, de la nourriture qui apparaît dense au scanner et des sacs si pleins qu'on ne distingue pas leur contenu.",
          "Les médicaments, l'alimentation pour bébé et les aliments pour régimes spécifiques sont en général autorisés en plus grande quantité, mais il faut parfois les déclarer. Gardez les médicaments sur ordonnance dans leur emballage d'origine, avec l'ordonnance si possible.",
        ],
        bullets: [],
      },
      {
        heading: "Nourriture, cadeaux et achats en duty free",
        paragraphs: [
          "Les aliments solides sont généralement acceptés en cabine, mais les produits mous ou à tartiner, comme la confiture, le yaourt, le fromage à tartiner ou les sauces, comptent souvent comme des liquides. Évitez d'emballer les cadeaux, car les agents peuvent avoir besoin de regarder à l'intérieur.",
          "Les liquides achetés en duty free après le contrôle sont normalement placés dans un sac scellé avec le ticket. En cas de correspondance, gardez le sac fermé jusqu'à votre destination finale, car vous repasserez peut-être un contrôle et les règles de l'aéroport suivant peuvent être différentes.",
        ],
        bullets: [
          "Mettez fromages à pâte molle, miel et sauces en soute",
          "N'emballez les cadeaux qu'une fois arrivé",
          "Gardez le sac duty free scellé avec le ticket visible",
        ],
      },
      {
        heading: "Voyager avec des enfants ou des besoins particuliers",
        paragraphs: [
          "Les familles peuvent souvent emprunter une file dédiée, et l'alimentation, le lait et les médicaments des enfants sont en général autorisés en plus grande quantité. Si vous ou une personne qui vous accompagne avez un handicap ou un problème de santé, contactez la compagnie ou l'aéroport avant le vol : beaucoup d'aéroports proposent une assistance qui facilite le passage du contrôle.",
        ],
        bullets: [],
      },
      {
        heading: "Horaires et files coupe-file",
        paragraphs: [
          "Arrivez assez tôt pour l'enregistrement, le dépôt des bagages et le contrôle, surtout tôt le matin et pendant les vacances et les ponts, quand les files sont les plus longues. Beaucoup d'aéroports publient des temps d'attente indicatifs ou conseillent une heure d'arrivée.",
          "Certains aéroports vendent un accès coupe-file, et certains pays proposent des programmes de voyageurs de confiance qui accélèrent le contrôle des passagers inscrits. Cela peut valoir le coup si vous voyagez souvent ou si votre emploi du temps est serré, mais c'est rarement nécessaire si vous arrivez avec de la marge.",
        ],
        bullets: [],
      },
      {
        heading: "Après le contrôle",
        paragraphs: [
          "Remplissez votre gourde, vérifiez votre porte d'embarquement et le temps nécessaire pour y aller, car dans les grands aéroports elle peut être loin. Si vous avez une correspondance, notre [vérificateur de temps de correspondance](/fr/outils/temps-de-correspondance) vous indique s'il faudra probablement repasser un contrôle. Pour savoir quoi emporter, notre [liste de valise](/fr/outils/liste-valise) et notre [vérificateur de taille de bagage cabine](/fr/outils/taille-bagage-cabine) vous aident à préparer un sac conforme.",
        ],
        bullets: [],
      },
    ],
    faqs: [
      {
        question:
          "Faut-il encore sortir les liquides au contrôle de sécurité ?",
        answer:
          "Cela dépend de l'aéroport. Certains aéroports équipés de nouveaux scanners permettent de laisser les liquides dans le sac, d'autres exigent toujours un sachet transparent à part. Consultez le site de votre aéroport de départ avant le voyage.",
      },
      {
        question:
          "Peut-on passer une batterie externe au contrôle de sécurité ?",
        answer:
          "En général oui, dans le bagage cabine mais pas en soute. Les compagnies limitent la capacité et le nombre de batteries : vérifiez les règles de votre compagnie et les informations officielles avant de prendre l'avion.",
      },
      {
        question: "Combien de temps à l'avance arriver à l'aéroport ?",
        answer:
          "Suivez les conseils de votre compagnie et de l'aéroport, et prévoyez plus de marge aux heures de pointe, comme tôt le matin et pendant les vacances. Les vols internationaux demandent généralement plus de temps que les vols intérieurs.",
      },
    ],
    related: {
      guides: [
        "bagage-perdu-que-faire",
        "astuces-de-voyage-qui-marchent",
        "quand-reserver-un-vol",
      ],
    },
    sources: [
      SOURCES.tsaWhatCanIBring,
      SOURCES.ukHandLuggage,
      SOURCES.euAirRightsFr,
    ],
  },
];
