/**
 * Données géographiques Île-de-France.
 *
 * Ne contiennent QUE des faits vérifiables : noms officiels de départements,
 * numéros, préfectures, communes réelles. Aucune statistique d'infestation,
 * aucun classement, aucune donnée inventée.
 */

export interface Departement {
  slug: string;
  code: string;
  name: string;
  /** Article contracté pour les tournures : "en", "dans le", "dans la"… */
  prep: string;
  prefecture: string;
  couronne: 'Paris' | 'Petite couronne' | 'Grande couronne';
  communes: string[];
  /** Pages villes publiées pour ce département. */
  villes: string[];
}

export const departements: Departement[] = [
  {
    slug: 'paris',
    code: '75',
    name: 'Paris',
    prep: 'à',
    prefecture: 'Paris',
    couronne: 'Paris',
    communes: [],
    villes: [],
  },
  {
    slug: 'hauts-de-seine',
    code: '92',
    name: 'Hauts-de-Seine',
    prep: 'dans les',
    prefecture: 'Nanterre',
    couronne: 'Petite couronne',
    communes: [
      'Boulogne-Billancourt', 'Nanterre', 'Courbevoie', 'Asnières-sur-Seine',
      'Colombes', 'Rueil-Malmaison', 'Issy-les-Moulineaux', 'Levallois-Perret',
      'Clichy', 'Antony', 'Neuilly-sur-Seine', 'Clamart', 'Puteaux',
      'Montrouge', 'Gennevilliers', 'Suresnes', 'Malakoff', 'Bagneux',
    ],
    villes: ['boulogne-billancourt', 'nanterre', 'courbevoie'],
  },
  {
    slug: 'seine-saint-denis',
    code: '93',
    name: 'Seine-Saint-Denis',
    prep: 'en',
    prefecture: 'Bobigny',
    couronne: 'Petite couronne',
    communes: [
      'Saint-Denis', 'Montreuil', 'Aubervilliers', 'Aulnay-sous-Bois', 'Drancy',
      'Noisy-le-Grand', 'Pantin', 'Le Blanc-Mesnil', 'Épinay-sur-Seine', 'Bondy',
      'Bagnolet', 'Saint-Ouen-sur-Seine', 'Rosny-sous-Bois', 'Sevran',
      'Villepinte', 'Stains', 'La Courneuve', 'Livry-Gargan', 'Bobigny',
    ],
    villes: ['saint-denis', 'montreuil', 'aubervilliers'],
  },
  {
    slug: 'val-de-marne',
    code: '94',
    name: 'Val-de-Marne',
    prep: 'dans le',
    prefecture: 'Créteil',
    couronne: 'Petite couronne',
    communes: [
      'Créteil', 'Vitry-sur-Seine', 'Champigny-sur-Marne', 'Saint-Maur-des-Fossés',
      'Ivry-sur-Seine', 'Maisons-Alfort', 'Villejuif', 'Fontenay-sous-Bois',
      'Vincennes', 'Alfortville', 'Choisy-le-Roi', 'Cachan', 'Nogent-sur-Marne',
      'L’Haÿ-les-Roses', 'Le Kremlin-Bicêtre', 'Charenton-le-Pont', 'Rungis',
      'Thiais', 'Orly',
    ],
    villes: ['creteil', 'vitry-sur-seine'],
  },
  {
    slug: 'val-doise',
    code: '95',
    name: 'Val-d’Oise',
    prep: 'dans le',
    prefecture: 'Cergy',
    couronne: 'Grande couronne',
    communes: [
      'Argenteuil', 'Cergy', 'Sarcelles', 'Franconville', 'Garges-lès-Gonesse',
      'Goussainville', 'Ermont', 'Bezons', 'Villiers-le-Bel', 'Pontoise',
      'Taverny', 'Saint-Ouen-l’Aumône', 'Gonesse', 'Herblay-sur-Seine',
      'Eaubonne', 'Roissy-en-France', 'Domont', 'Montmorency',
    ],
    villes: ['argenteuil'],
  },
  {
    slug: 'yvelines',
    code: '78',
    name: 'Yvelines',
    prep: 'dans les',
    prefecture: 'Versailles',
    couronne: 'Grande couronne',
    communes: [
      'Versailles', 'Sartrouville', 'Mantes-la-Jolie', 'Saint-Germain-en-Laye',
      'Poissy', 'Conflans-Sainte-Honorine', 'Les Mureaux', 'Trappes', 'Plaisir',
      'Rambouillet', 'Houilles', 'Montigny-le-Bretonneux', 'Élancourt',
      'Chatou', 'Le Chesnay-Rocquencourt', 'Guyancourt', 'Maisons-Laffitte',
    ],
    villes: ['versailles'],
  },
  {
    slug: 'essonne',
    code: '91',
    name: 'Essonne',
    prep: 'en',
    prefecture: 'Évry-Courcouronnes',
    couronne: 'Grande couronne',
    communes: [
      'Évry-Courcouronnes', 'Massy', 'Corbeil-Essonnes', 'Savigny-sur-Orge',
      'Sainte-Geneviève-des-Bois', 'Palaiseau', 'Athis-Mons', 'Viry-Châtillon',
      'Draveil', 'Yerres', 'Étampes', 'Les Ulis', 'Brétigny-sur-Orge',
      'Grigny', 'Longjumeau', 'Montgeron', 'Saint-Michel-sur-Orge',
    ],
    villes: ['massy'],
  },
  {
    slug: 'seine-et-marne',
    code: '77',
    name: 'Seine-et-Marne',
    prep: 'en',
    prefecture: 'Melun',
    couronne: 'Grande couronne',
    communes: [
      'Meaux', 'Chelles', 'Melun', 'Pontault-Combault', 'Savigny-le-Temple',
      'Torcy', 'Bussy-Saint-Georges', 'Fontainebleau', 'Provins',
      'Lagny-sur-Marne', 'Coulommiers', 'Nemours', 'Dammarie-les-Lys',
      'Champs-sur-Marne', 'Combs-la-Ville', 'Villeparisis', 'Ozoir-la-Ferrière',
    ],
    villes: ['meaux'],
  },
];

export const departementsHorsParis = departements.filter((d) => d.slug !== 'paris');

export function getDepartement(slug: string): Departement | undefined {
  return departements.find((d) => d.slug === slug);
}

/** Pages villes publiées. Une page n'existe que si elle apporte un contenu réellement spécifique. */
export interface Ville {
  slug: string;
  name: string;
  /** Préposition d'usage : "à Montreuil", "au Kremlin-Bicêtre". */
  prep: string;
  dept: string;
  /** Résumé factuel du contexte bâti, utilisé en meta description. */
  metaAngle: string;
}

export const villes: Ville[] = [
  { slug: 'boulogne-billancourt', name: 'Boulogne-Billancourt', prep: 'à', dept: 'hauts-de-seine', metaAngle: 'immeubles denses, parkings en sous-sol et anciens terrains industriels reconvertis' },
  { slug: 'nanterre', name: 'Nanterre', prep: 'à', dept: 'hauts-de-seine', metaAngle: 'quartiers d’affaires, chantiers et habitat mixte le long de la Seine' },
  { slug: 'courbevoie', name: 'Courbevoie', prep: 'à', dept: 'hauts-de-seine', metaAngle: 'tours tertiaires de La Défense, restauration d’entreprise et immeubles résidentiels' },
  { slug: 'saint-denis', name: 'Saint-Denis', prep: 'à', dept: 'seine-saint-denis', metaAngle: 'centre ancien, canal, entrepôts et grands ensembles' },
  { slug: 'montreuil', name: 'Montreuil', prep: 'à', dept: 'seine-saint-denis', metaAngle: 'habitat ancien, ateliers, jardins et caves communicantes' },
  { slug: 'aubervilliers', name: 'Aubervilliers', prep: 'à', dept: 'seine-saint-denis', metaAngle: 'entrepôts, commerce de gros, canal Saint-Denis et logements anciens' },
  { slug: 'creteil', name: 'Créteil', prep: 'à', dept: 'val-de-marne', metaAngle: 'grands ensembles, dalles, vide-ordures et équipements publics' },
  { slug: 'vitry-sur-seine', name: 'Vitry-sur-Seine', prep: 'à', dept: 'val-de-marne', metaAngle: 'bords de Seine, anciens sites industriels et résidences collectives' },
  { slug: 'argenteuil', name: 'Argenteuil', prep: 'à', dept: 'val-doise', metaAngle: 'pavillons, collectifs et berges de Seine' },
  { slug: 'versailles', name: 'Versailles', prep: 'à', dept: 'yvelines', metaAngle: 'bâti ancien, caves voûtées, restauration et commerces de centre-ville' },
  { slug: 'massy', name: 'Massy', prep: 'à', dept: 'essonne', metaAngle: 'pôle de gares, bureaux, résidences récentes et zones d’activité' },
  { slug: 'meaux', name: 'Meaux', prep: 'à', dept: 'seine-et-marne', metaAngle: 'centre historique, bords de Marne, canal et commerces de bouche' },
];

export function getVille(slug: string): Ville | undefined {
  return villes.find((v) => v.slug === slug);
}

export function villesOf(deptSlug: string): Ville[] {
  return villes.filter((v) => v.dept === deptSlug);
}

/** Arrondissements parisiens disposant d'une page dédiée (contexte urbain réellement distinct). */
export interface Arrondissement {
  slug: string;
  num: number;
  label: string;
  quartiers: string;
}

export const arrondissements: Arrondissement[] = [
  { slug: '1er-arrondissement', num: 1, label: '1er arrondissement', quartiers: 'Les Halles, Châtelet, Palais-Royal' },
  { slug: '10e-arrondissement', num: 10, label: '10e arrondissement', quartiers: 'Gare du Nord, Gare de l’Est, canal Saint-Martin' },
  { slug: '11e-arrondissement', num: 11, label: '11e arrondissement', quartiers: 'Oberkampf, Bastille, Père-Lachaise' },
  { slug: '13e-arrondissement', num: 13, label: '13e arrondissement', quartiers: 'Les Olympiades, Tolbiac, quais de Seine' },
  { slug: '18e-arrondissement', num: 18, label: '18e arrondissement', quartiers: 'Montmartre, Barbès, La Chapelle' },
  { slug: '19e-arrondissement', num: 19, label: '19e arrondissement', quartiers: 'Bassin de la Villette, canal de l’Ourcq, Belleville' },
];
