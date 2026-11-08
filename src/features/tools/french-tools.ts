import {
  type LocalizedTool,
  type LocalizedToolKey,
} from "@/features/tools/localized-tools";
import { route } from "@/i18n/routes";

/**
 * French pages of the packing and baggage tools. Inline links use
 * [label](/path) and are checked by tests. There is no French blog, so
 * links stay within the French tools.
 */
export const FRENCH_TOOLS: Record<LocalizedToolKey, LocalizedTool> = {
  packing: {
    path: route("packing", "fr"),
    placement: "packing_list_generator",
    card: {
      title: "Générateur de liste de valise",
      body: "Une liste adaptée à la durée, à la météo, aux bagages et aux activités de votre voyage, avec les vêtements calculés pour vous. Cochez-la, imprimez-la ou partagez-la.",
    },
    copy: {
      meta: {
        title: "Liste de valise : générateur gratuit pour tout voyage",
        description:
          "Créez gratuitement votre liste de valise selon la durée, la météo, les bagages et les activités du voyage, avec un exemple de 7 jours à imprimer.",
      },
      crumb: "Liste de valise",
      h1: "Générateur de liste de valise",
      intro:
        "Dites-nous combien de temps vous partez, quel temps il fera et ce que vous comptez faire, et obtenez une liste de valise à cocher, imprimer ou partager. Les vêtements sont calculés pour vous : deux semaines de voyage ne veulent pas dire deux semaines de tenues.",
      sections: [
        {
          id: "comment-la-liste-est-faite",
          title: "Comment la liste est établie",
          cards: [
            {
              title: "Des vêtements pour les jours nécessaires",
              body: "Vous avez des vêtements pour chaque jour, jusqu'à une limite raisonnable. En bagage cabine seul, cette limite est d'une semaine, ou de quatre jours si vous pouvez faire une lessive ; avec un bagage en soute, elle est de deux semaines. Pour les voyages plus longs, la liste vous rappelle de prévoir une lessive.",
            },
            {
              title: "La météo",
              body: "Par temps chaud, le jean laisse place au short et la liste ajoute chapeau et crème solaire. Par temps froid, elle ajoute des couches, un manteau chaud, un bonnet, des gants et une écharpe. Par temps doux, un pull et une veste légère pour les journées changeantes.",
            },
            {
              title: "Bagage cabine ou en soute",
              body: "Les listes en bagage cabine seul gardent les produits de toilette en format voyage et rappellent de vérifier les règles sur les liquides de votre aéroport. Associez-la au [vérificateur de taille de bagage cabine](/fr/outils/taille-bagage-cabine) pour vous assurer que votre sac passe.",
            },
            {
              title: "Activités et compagnons de voyage",
              body: "La plage, la randonnée, le travail et les soirées habillées ajoutent chacun leur propre rubrique, et voyager avec un jeune enfant ajoute ce qui facilite le trajet.",
            },
            {
              title: "Les documents d'abord",
              body: "Chaque liste commence par les documents et l'argent, car ce sont les choses que vous ne pourrez pas remplacer sur place. Vérifiez bien à l'avance la validité de votre passeport et les éventuels visas exigés par votre destination.",
            },
            {
              title: "L'essentiel en cabine",
              body: "Les médicaments, les batteries externes et les objets de valeur sont signalés pour aller dans le bagage à main. Les batteries externes et les batteries de rechange ne sont généralement pas acceptées en soute.",
            },
          ],
        },
        {
          id: "voyager-plus-leger",
          title: "Comment voyager plus léger",
          paragraphs: [
            "Choisissez des vêtements dans deux ou trois couleurs qui vont toutes ensemble, pour que chaque haut aille avec chaque pantalon. Emportez de quoi tenir une semaine et faites une lessive plutôt que de prévoir une tenue par jour, et portez dans l'avion vos chaussures et votre veste les plus encombrantes.",
            "Pesez votre valise avant de partir. Notre [calculateur de poids de valise](/fr/outils/poids-valise) estime le poids de ce que vous comptez emporter et vous montre quoi déplacer dans le bagage à main ou laisser à la maison.",
          ],
        },
      ],
      cta: {
        heading: "Vous préparez tout le voyage ?",
        body: "Notre planificateur de voyage IA gratuit rédige un itinéraire jour par jour avec une liste de valise, un vol suggéré et un budget estimé pour vos dates.",
      },
      faqs: [
        {
          question: "Que mettre dans sa valise pour 7 jours ?",
          answer:
            "Pour une semaine, prévoyez environ sept hauts, huit sous-vêtements et paires de chaussettes, deux ou trois pantalons ou jupes, un pull, une veste légère, un pyjama et des chaussures confortables, plus les documents, la trousse de toilette, les médicaments et les chargeurs. La liste d'exemple de cette page montre une liste complète pour 7 jours.",
        },
        {
          question: "Peut-on partir une semaine avec un seul bagage cabine ?",
          answer:
            "Oui, si vous choisissez des vêtements faciles à associer, gardez les produits de toilette en format voyage et portez dans l'avion vos chaussures et votre veste les plus lourdes. Vérifiez avant de faire votre sac les dimensions et le poids autorisés en cabine pour votre billet.",
        },
        {
          question: "Combien de tenues pour un voyage de deux semaines ?",
          answer:
            "En général, de quoi tenir une semaine. Prévoyez une lessive à mi-parcours, à votre hébergement, dans une laverie ou avec de la lessive de voyage dans un lavabo, et vous voyagerez avec moitié moins de vêtements et une valise bien plus légère.",
        },
        {
          question: "Peut-on mettre une batterie externe en soute ?",
          answer:
            "En général, non. La plupart des compagnies exigent que les batteries externes et les batteries au lithium de rechange voyagent en cabine, et certaines limitent leur capacité ou demandent de ne pas les utiliser à bord. Vérifiez les règles de votre compagnie avant de partir.",
        },
      ],
      related:
        "Vérifiez que votre sac passe avec le [vérificateur de taille de bagage cabine](/fr/outils/taille-bagage-cabine), pesez-le avec le [calculateur de poids de valise](/fr/outils/poids-valise) et additionnez le coût des bagages avec le [calculateur de frais de bagages](/fr/outils/frais-de-bagages).",
      ld: {
        name: "Générateur de liste de valise AIFlyTrip",
        description:
          "Générateur gratuit qui crée une liste de valise selon la durée, la météo, les bagages et les activités du voyage.",
      },
    },
  },
  bagSize: {
    path: route("bagSize", "fr"),
    placement: "bag_size_checker",
    card: {
      title: "Vérificateur de taille de bagage cabine",
      body: "Vérifiez si votre sac passe sous le siège comme article personnel, ou si votre valise passe en cabine, avec les dimensions de votre réservation.",
    },
    copy: {
      meta: {
        title: "Taille bagage cabine : votre sac passe-t-il sous le siège ?",
        description:
          "Vérifiez gratuitement si votre sac, sac à dos ou valise passe sous le siège ou en cabine, de combien il dépasse et si le tourner peut aider.",
      },
      crumb: "Taille de bagage cabine",
      h1: "Vérificateur de taille de bagage cabine",
      intro:
        "Votre sac passe-t-il sous le siège, ou votre valise dans le compartiment à bagages ? Saisissez les dimensions de votre bagage et la limite de votre réservation pour savoir s'il passe, quel côté dépasse et de combien. L'outil fonctionne en centimètres ou en pouces, vérifie aussi le poids et calcule si tourner le bagage aiderait.",
      sections: [
        {
          id: "comment-mesurer",
          title: "Comment mesurer votre bagage",
          cards: [
            {
              title: "Mesurez-le une fois rempli",
              body: "Un sac souple grossit quand il est plein. Faites-le comme pour le voyage, puis mesurez le point le plus large de chaque côté.",
            },
            {
              title: "Comptez tout ce qui dépasse",
              body: "Roulettes, poignées, pieds et poches extérieures comptent. Mesurez du sol jusqu'au haut de la poignée rentrée.",
            },
            {
              title: "Utilisez un mètre, pas l'étiquette",
              body: "La taille indiquée en magasin ne concerne souvent que le corps de la valise. Une mesure faite chez vous est plus fiable.",
            },
          ],
        },
        {
          id: "article-personnel-ou-bagage-cabine",
          title: "Article personnel ou bagage cabine ?",
          paragraphs: [
            "L'article personnel est un petit sac, comme un sac à main, un sac à dos ou une sacoche d'ordinateur, qui se glisse sous le siège devant vous. Le bagage cabine est un sac plus grand qui va dans le compartiment à bagages. Beaucoup de billets incluent un article personnel, alors que le bagage cabine n'est souvent inclus que dans certains tarifs ou payant, donc vérifiez ce que comprend votre billet.",
            "Certaines compagnies donnent la limite en longueur, largeur et profondeur ; d'autres en somme des trois côtés, ce qui est courant pour les bagages en soute. Choisissez le type qui correspond à votre réservation.",
          ],
        },
        {
          id: "pourquoi-votre-limite",
          title: "Pourquoi saisir la limite de votre compagnie",
          paragraphs: [
            "Les franchises bagages varient entre compagnies, entre tarifs d'une même compagnie et parfois selon la ligne, et elles changent. Plutôt que d'afficher des dimensions peut-être dépassées, l'outil utilise la limite de votre propre réservation, pour que la réponse concerne votre billet. Les boutons de remplissage rapide sont des tailles courantes, pas la règle d'une compagnie.",
          ],
        },
      ],
      cta: {
        heading: "Vous préparez un voyage ?",
        body: "Notre planificateur de voyage IA gratuit rédige un itinéraire jour par jour avec une liste de valise, un vol suggéré et un budget estimé.",
      },
      faqs: [
        {
          question: "Comment savoir si mon sac passe sous le siège ?",
          answer:
            "Trouvez la taille de l'article personnel dans votre réservation, mesurez votre sac rempli, roulettes et poches comprises, et saisissez les deux dans l'outil. Si chaque côté du sac ne dépasse pas la limite, une fois le sac tourné dans sa meilleure position, il devrait passer.",
        },
        {
          question: "Les roulettes et les poignées comptent-elles ?",
          answer:
            "Oui. Les compagnies mesurent le bagage entier, donc les roulettes, les poignées et les poches extérieures sont incluses. Le gabarit à la porte d'embarquement mesure le bagage tel qu'il est, d'où l'intérêt de le mesurer une fois rempli.",
        },
        {
          question: "Que se passe-t-il si mon bagage cabine est trop grand ?",
          answer:
            "La compagnie peut vous demander de payer pour le mettre en soute, souvent plus cher que si vous aviez ajouté un bagage à la réservation. Certaines refusent aussi les bagages bien trop grands, donc vérifiez la taille avant de partir.",
        },
        {
          question: "Un sac souple peut-il entrer de force dans le gabarit ?",
          answer:
            "Un sac souple qui n'est pas trop rempli peut céder un peu, c'est pourquoi beaucoup de voyageurs le préfèrent comme article personnel. Ne comptez pas trop dessus : s'il n'entre pas dans le gabarit, la compagnie peut quand même vous faire payer.",
        },
      ],
      related:
        "Pesez votre valise avec le [calculateur de poids de valise](/fr/outils/poids-valise), comparez le coût réel de chaque billet avec le [calculateur de frais de bagages](/fr/outils/frais-de-bagages) et calculez le temps qu'il vous faut pour une escale avec le [vérificateur de temps de correspondance](/fr/outils/temps-de-correspondance).",
      ld: {
        name: "Vérificateur de taille de bagage cabine AIFlyTrip",
        description:
          "Outil gratuit qui vérifie si un bagage respecte la limite de l'article personnel ou du bagage cabine, en le tournant si besoin et avec le poids.",
      },
    },
  },
  luggageWeight: {
    path: route("luggageWeight", "fr"),
    placement: "luggage_weight_calculator",
    card: {
      title: "Calculateur de poids de valise",
      body: "Estimez le poids de votre valise d'après ce que vous emportez, ou comparez une valise déjà pesée à votre limite, et voyez quoi retirer.",
    },
    copy: {
      meta: {
        title: "Poids de la valise : votre bagage est-il trop lourd ?",
        description:
          "Estimez gratuitement le poids de votre bagage cabine ou en soute d'après ce que vous emportez, comparez-le à votre limite et voyez quoi retirer.",
      },
      crumb: "Poids de la valise",
      h1: "Calculateur de poids de valise",
      intro:
        "Le poids autorisé en cabine n'est souvent que de quelques kilos, et il est facile de le dépasser sans s'en rendre compte. Additionnez ce que vous comptez emporter pour estimer le poids avant de faire votre valise, ou saisissez le poids de votre valise déjà faite, et voyez comment il se situe par rapport à votre limite et quoi déplacer si elle est trop lourde.",
      sections: [
        {
          id: "comment-fonctionne-l-estimation",
          title: "Comment fonctionne l'estimation",
          cards: [
            {
              title: "Des poids habituels par article",
              body: "Chaque article utilise un poids habituel pour des vêtements d'adulte et du matériel de voyage, comme environ 150 g pour un t-shirt ou 650 g pour un jean. Vos affaires peuvent être plus légères ou plus lourdes, donc prenez le résultat comme une indication.",
            },
            {
              title: "La valise compte aussi",
              body: "Une valise cabine à roulettes peut utiliser une bonne partie d'une petite franchise avant même d'y mettre quoi que ce soit. Pesez-la vide sur un pèse-personne et saisissez son poids pour affiner l'estimation.",
            },
            {
              title: "Portez ce qui pèse le plus",
              body: "Les manteaux, les pulls et les chaussures font partie des affaires les plus lourdes. Quand votre valise dépasse la limite ou s'en approche, le calculateur indique combien vous gagneriez en les portant dans l'avion.",
            },
          ],
        },
        {
          id: "peser-sa-valise-a-la-maison",
          title: "Comment peser sa valise à la maison",
          paragraphs: [
            "Le plus simple est un pèse-bagage : accrochez-le à la poignée et soulevez. Sans pèse-bagage, montez sur un pèse-personne avec la valise, puis sans elle, et faites la différence. Pesez la valise complètement faite et gardez un peu de marge pour vos achats en voyage.",
            "Les limites de poids dépendent du tarif et peuvent être plus basses en cabine que beaucoup de voyageurs ne le pensent, et certaines compagnies limitent aussi le poids total de tout ce que vous emportez à bord. Vérifiez votre réservation, et si votre sac est juste en taille, le [vérificateur de taille de bagage cabine](/fr/outils/taille-bagage-cabine) vous dit s'il passe.",
          ],
        },
      ],
      cta: {
        heading: "Vous hésitez sur quoi emporter ?",
        body: "Notre planificateur de voyage IA gratuit rédige un itinéraire jour par jour avec une liste de valise et un budget estimé pour votre voyage.",
      },
      faqs: [
        {
          question: "Combien pèse un bagage cabine rempli ?",
          answer:
            "Cela dépend du bagage et de ce que vous emportez. Une valise cabine à roulettes vide peut peser quelques kilos à elle seule, et une semaine de vêtements, des chaussures, une trousse de toilette et un ordinateur en ajoutent facilement plusieurs. Estimez le vôtre avec le calculateur, puis pesez-le avant de partir.",
        },
        {
          question: "Les compagnies pèsent-elles les bagages cabine ?",
          answer:
            "Certaines le font, surtout quand le vol est plein ou qu'un bagage paraît lourd, et d'autres rarement. Si votre billet prévoit un poids maximum en cabine, mieux vaut le respecter, car un bagage trop lourd peut devoir passer en soute contre paiement.",
        },
        {
          question: "Comment alléger sa valise ?",
          answer:
            "Portez dans l'avion vos chaussures, votre veste et votre pull les plus lourds, emportez de quoi tenir une semaine et prévoyez une lessive, choisissez des produits de toilette en format voyage et laissez le sèche-cheveux si votre hébergement en a un. Un sac plus léger, comme un sac souple, aide aussi.",
        },
      ],
      related:
        "Vérifiez les dimensions avec le [vérificateur de taille de bagage cabine](/fr/outils/taille-bagage-cabine), comparez le coût réel des billets avec le [calculateur de frais de bagages](/fr/outils/frais-de-bagages) et calculez le coût total du voyage avec le [calculateur de budget de voyage](/fr/outils/calculateur-budget-voyage).",
      ld: {
        name: "Calculateur de poids de valise AIFlyTrip",
        description:
          "Calculateur gratuit qui estime le poids d'une valise d'après ce que vous emportez et le compare à votre limite.",
      },
    },
  },
  baggageFees: {
    path: route("baggageFees", "fr"),
    placement: "baggage_fee_calculator",
    card: {
      title: "Calculateur de frais de bagages",
      body: "Ajoutez les bagages, le siège et les autres frais à chaque billet que vous comparez pour voir le prix réel par personne et pour le voyage.",
    },
    copy: {
      meta: {
        title: "Frais de bagages : le vrai prix d'un vol pas cher",
        description:
          "Ajoutez gratuitement bagages, siège et autres frais aux billets que vous comparez et voyez quel vol est vraiment le moins cher, par personne et au total.",
      },
      crumb: "Frais de bagages",
      h1: "Calculateur de frais de bagages",
      intro:
        "Un billet bon marché peut devenir un voyage cher une fois ajoutés un bagage cabine, un bagage en soute et un siège. Saisissez jusqu'à trois billets avec les suppléments de chacun et voyez ce que coûte vraiment chaque voyage, au total et par personne, et lequel est réellement le moins cher.",
      sections: [
        {
          id: "comment-utiliser-le-calculateur",
          title: "Comment utiliser le calculateur",
          cards: [
            {
              title: "Composez le voyage que vous ferez vraiment",
              body: "Pour chaque billet, ajoutez seulement les suppléments nécessaires : les bagages que vous emporterez vraiment et un siège si vous devez être assis ensemble. Vous trouverez les prix sur la page de réservation de chaque compagnie.",
            },
            {
              title: "Par personne et par vol",
              body: "Les bagages et les sièges sont généralement facturés par passager et par vol, donc un aller-retour à deux les paie quatre fois. Le calculateur fait ces calculs pour vous.",
            },
            {
              title: "N'oubliez pas l'aéroport",
              body: "Un vol moins cher depuis un aéroport plus éloigné peut coûter plus cher une fois ajoutés le train, le bus ou le parking. Saisissez le transport de tout le groupe pour comparer équitablement.",
            },
          ],
        },
        {
          id: "pourquoi-les-frais-comptent",
          title:
            "Pourquoi le billet le moins cher n'est pas toujours le voyage le moins cher",
          paragraphs: [
            "Les billets à bas prix n'incluent souvent qu'un petit article personnel, et vendent le bagage cabine, le bagage en soute et les sièges en supplément. Un billet d'une compagnie traditionnelle peut coûter plus cher au départ mais inclure une partie de ces services. Comparer le total est la seule façon équitable de choisir.",
            "Les frais sont généralement plus bas lorsqu'ils sont ajoutés à la réservation que plus tard, et bien plus bas qu'à la porte d'embarquement, donc décidez de ce dont vous avez besoin avant de payer. Le [vérificateur de taille de bagage cabine](/fr/outils/taille-bagage-cabine) vous aide à éviter des frais pour un sac trop grand.",
          ],
        },
      ],
      cta: {
        heading: "Vous comparez des vols pour un voyage ?",
        body: "Notre planificateur de voyage IA gratuit rédige un itinéraire jour par jour avec des options de vol et un budget estimé pour vos dates.",
      },
      faqs: [
        {
          question: "Combien coûtent les frais de bagages ?",
          answer:
            "Cela varie beaucoup selon les compagnies, les tarifs, les lignes et les dates, et le prix dépend souvent du moment où vous ajoutez le bagage. Consultez le prix sur la page de réservation de chaque compagnie pour votre vol précis, puis saisissez-le dans le calculateur pour comparer équitablement.",
        },
        {
          question: "Les bagages se paient-ils par vol ou par voyage ?",
          answer:
            "Généralement par passager et par vol, donc pour un aller-retour chaque voyageur paie son bagage deux fois. Certains tarifs et forfaits incluent des bagages, donc vérifiez ce que comprend le vôtre avant d'ajouter des suppléments.",
        },
        {
          question:
            "Est-il moins cher de payer les bagages à la réservation ou à l'aéroport ?",
          answer:
            "Ajouter les bagages à la réservation, ou bien avant le départ, coûte généralement moins cher que de le faire peu avant le vol, et bien moins cher que de payer au comptoir ou à la porte d'embarquement. Vérifiez les prix de votre compagnie à chaque étape.",
        },
      ],
      related:
        "Vérifiez votre bagage avec le [vérificateur de taille de bagage cabine](/fr/outils/taille-bagage-cabine) et le [calculateur de poids de valise](/fr/outils/poids-valise), et calculez le coût total du voyage avec le [calculateur de budget de voyage](/fr/outils/calculateur-budget-voyage).",
      ld: {
        name: "Calculateur de frais de bagages AIFlyTrip",
        description:
          "Calculateur gratuit qui compare le coût réel de plusieurs billets une fois ajoutés bagages, sièges et autres frais.",
      },
    },
  },
};
