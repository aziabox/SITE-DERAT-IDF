import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const CATEGORIES = {
  rats: {
    slug: 'rats',
    label: 'Rats',
    title: 'Rats',
    intro:
      'Identifier une présence de rats, comprendre d’où ils viennent et savoir quoi faire avant, pendant et après une intervention.',
    body: [
      'Le rat brun est l’espèce que l’on rencontre en milieu urbain francilien. Il occupe les niveaux bas — caves, sous-sols, vides sanitaires, réseaux, abords — et se déplace sur plusieurs dizaines de mètres en longeant systématiquement les parois. Cette dernière caractéristique explique presque tout : les indices se trouvent le long des murs, et un dispositif posé en espace ouvert n’est jamais visité.',
      'Les articles de cette catégorie couvrent l’identification (crottes, coulées grasses, grignotages, terriers), la lecture des trajets pour remonter jusqu’aux points d’entrée, et les erreurs qui retardent la résolution. Ils partent tous du même principe : savoir où chercher vaut mieux que savoir quoi poser.',
    ],
  },
  souris: {
    slug: 'souris',
    label: 'Souris',
    title: 'Souris',
    intro:
      'Reconnaître une infestation de souris, distinguer les indices des autres rongeurs et limiter leur installation dans un logement ou un local.',
    body: [
      'La souris domestique est le rongeur le plus sous-estimé. Elle consomme très peu, réparti sur de nombreux points, se glisse dans une ouverture de six millimètres et grimpe sans difficulté dans les doublages et les gaines. Au moment où on la découvre, la présence date souvent de plusieurs semaines.',
      'Sa particularité opérationnelle tient à son territoire : quelques mètres seulement. Des indices dans deux pièces éloignées correspondent donc à deux foyers distincts, qui persistent indépendamment l’un de l’autre. C’est ce qui explique la majorité des traitements qui « ne marchent pas ».',
      'Trois repères permettent de trancher rapidement : des crottes de trois à six millimètres, pointues aux deux extrémités et dispersées plutôt que regroupées ; des grattements légers en début de nuit dans une cloison, un caisson de volet ou un faux plafond ; et des emballages percés d’un petit trou net dans un placard bas. La nourriture pour animaux stockée en sac ouvert est, à elle seule, l’une des causes d’installation durable les plus fréquentes.',
    ],
  },
  prevention: {
    slug: 'prevention',
    label: 'Prévention',
    title: 'Prévention',
    intro:
      'Sécuriser les points d’entrée, supprimer les ressources disponibles et éviter la réinstallation des rongeurs après traitement.',
    body: [
      'Un traitement réduit une population présente. La prévention décide si elle revient. Trois leviers seulement comptent — l’accès, la nourriture, l’eau — mais ils doivent être actionnés ensemble : agir sur un seul ne suffit jamais.',
      'Les articles de cette catégorie détaillent les matériaux qui résistent réellement au rongement, le mode opératoire pour chaque type d’ouverture, et la routine de vérification à mettre en place après une intervention. Une règle revient partout : si le matériau se raye à l’ongle, il ne tiendra pas.',
    ],
  },
  deratisation: {
    slug: 'deratisation',
    label: 'Dératisation',
    title: 'Dératisation',
    intro:
      'Comment se déroule une intervention professionnelle, ce qu’elle peut traiter, ses limites et les délais réellement observables.',
    body: [
      'Une dératisation se déroule en cinq temps : diagnostic, recherche des points d’entrée, traitement, obturation, contrôle. Contrairement à l’image courante, la pose des dispositifs n’est pas l’étape déterminante — c’est la recherche des accès qui décide si le résultat tient dans la durée.',
      'Cette catégorie rassemble le déroulé réel d’une intervention, les délais que l’on peut raisonnablement annoncer selon la situation, ce qu’il faut faire une fois le traitement terminé, et un guide complet adapté au bâti francilien.',
    ],
  },
  habitation: {
    slug: 'habitation',
    label: 'Habitation',
    title: 'Habitation',
    intro:
      'Maisons, appartements, caves et combles : les situations propres au logement et les réflexes à adopter.',
    body: [
      'Cave, combles, cloisons, cuisine : chaque volume d’un logement pose une question différente. La cave relève presque toujours du rat brun et de la question du périmètre ; les combles et les cloisons, de la souris et de la recherche des cheminements internes.',
      'Les articles réunis ici traitent des situations les plus fréquemment rencontrées en logement, avec à chaque fois la même structure : comment vérifier ce dont il s’agit, quoi faire dans l’immédiat, et à quel moment la question dépasse le logement pour concerner l’immeuble.',
    ],
  },
  entreprise: {
    slug: 'entreprise',
    label: 'Entreprise',
    title: 'Entreprise',
    intro:
      'Commerces, restaurants, bureaux et entrepôts : obligations d’hygiène, continuité d’activité et gestion d’une alerte.',
    body: [
      'Pour un commerce, un restaurant, un bureau ou un entrepôt, une présence de rongeurs engage trois sujets à la fois : la conformité sanitaire, la continuité d’activité et l’image. Les trois se gèrent simultanément, et l’ordre des actions compte.',
      'La logique d’intervention y est toujours la même : traiter les volumes techniques — réserve, plonge, local déchets, vides techniques — hors des heures d’activité, protéger l’enveloppe, et documenter chaque passage pour alimenter le plan de maîtrise sanitaire.',
      'Les points d’entrée d’un local professionnel sont assez constants : traversée d’évacuation sous plonge, siphon de sol asséché, bas de rideau métallique, porte de livraison maintenue ouverte pendant les opérations, gaines de ventilation et d’extraction, et communication avec la cave de l’immeuble pour un local en rez-de-chaussée. Ce dernier cas est le plus fréquent en Île-de-France, et c’est aussi celui qui échappe au gérant : son établissement peut être irréprochable et rester exposé par le sous-sol.',
      'Un dossier nuisibles tenu change la lecture d’un constat lors d’un contrôle : il montre une situation gérée plutôt que subie. Il contient le plan repéré des points de contrôle, un compte rendu daté de chaque passage, le relevé des indices constatés, les actions correctives engagées et les fiches des produits employés.',
    ],
  },
  copropriete: {
    slug: 'copropriete',
    label: 'Copropriété',
    title: 'Copropriété',
    intro:
      'Parties communes, caves, local poubelles et colonnes techniques : qui agit, comment et dans quel ordre.',
    body: [
      'En immeuble collectif, la difficulté est rarement technique : elle est organisationnelle. Accéder aux caves privatives, coordonner les créneaux, informer les résidents et traiter le sous-sol et les lots concernés dans la même fenêtre de temps décide du résultat autant que le traitement lui-même.',
      'Les articles de cette catégorie clarifient qui engage l’intervention selon la zone concernée, comment faire avancer un dossier auprès d’un syndic, et pourquoi il faut distinguer explicitement ce qui relève du traitement de ce qui relève de travaux sur le bâti.',
      'Cinq zones décident du résultat dans un immeuble : le sous-sol et les caves, souvent communicants entre escaliers ; le local poubelles, qui constitue la ressource la plus constante ; les gaines techniques verticales, qui relient le sous-sol aux étages ; la cour et les abords ; et le vide sanitaire lorsqu’il existe. Tant que le local déchets n’est pas fermé correctement — bas de porte métallique, bacs à couvercle, sol dégagé — la pression reste permanente, quel que soit le traitement réalisé.',
    ],
  },
} as const;

export type Category = (typeof CATEGORIES)[keyof typeof CATEGORIES];

export type CategoryKey = keyof typeof CATEGORIES;

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string().max(70),
    metaTitle: z.string().max(75).optional(),
    description: z.string().min(80).max(175),
    category: z.enum(['rats', 'souris', 'prevention', 'deratisation', 'habitation', 'entreprise', 'copropriete']),
    /** Réponse courte affichée en tête d'article et réutilisée pour les moteurs génératifs. */
    answer: z.string().min(80),
    datePublished: z.coerce.date(),
    dateModified: z.coerce.date().optional(),
    author: z.string().default('Équipe DÉRAT·IDF'),
    readingTime: z.number().int().positive(),
    faq: z
      .array(z.object({ q: z.string(), a: z.string() }))
      .min(2)
      .optional(),
    related: z.array(z.string()).default([]),
    relatedPages: z.array(z.object({ href: z.string(), label: z.string() })).default([]),
  }),
});

export const collections = { blog };
