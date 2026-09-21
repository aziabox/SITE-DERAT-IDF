/**
 * SOURCE UNIQUE DE VERITE — identite, coordonnees, mentions legales, zone.
 *
 * REGLE DU PROJET : aucune information commerciale n'est inventee ici.
 * Les champs a `null` sont volontairement vides tant qu'une donnee REELLE
 * n'a pas ete fournie. Un champ `null` n'est jamais affiche et n'est jamais
 * envoye dans les donnees structurees.
 *
 * Interdits explicites : avis, notes, certifications, prix, nombre de clients,
 * nombre d'interventions, annees d'experience, garanties, adresse fictive.
 * Voir scripts/check-config.mjs (execute avant chaque build).
 */

export interface PostalAddress {
  street: string;
  postalCode: string;
  city: string;
  country: string;
}

export interface SiteConfig {
  /** Nom commercial sous lequel l'activite est exploitee. */
  brand: string;
  brandMark: string;
  /** Denomination legale de l'editeur. */
  legalName: string | null;
  legalForm: string | null;
  tagline: string;

  phone: string;
  phoneDisplay: string;
  email: string | null;

  /**
   * Siege social. Publie uniquement dans les mentions legales, ou la loi
   * l'impose (art. 6 III LCEN).
   */
  legalAddress: PostalAddress | null;
  /**
   * Etablissement recevant du public. C'est le SEUL cas ou une adresse postale
   * est emise en JSON-LD : declarer une adresse pour une activite qui se rend
   * chez le client induit les moteurs en erreur.
   */
  publicAddress: PostalAddress | null;

  siren: string | null;
  siret: string | null;
  rcs: string | null;
  greffe: string | null;
  /** Date d'immatriculation au RCS (ISO). */
  rcsDate: string | null;
  /** Date de creation de l'entreprise (ISO). */
  creationDate: string | null;
  naf: string | null;
  nafLabel: string | null;
  /**
   * Numero de TVA intracommunautaire, a renseigner UNIQUEMENT si l'entreprise
   * est effectivement assujettie. En franchise en base (art. 293 B du CGI),
   * laisser `null` : aucune ligne TVA n'est alors publiee.
   */
  vatNumber: string | null;
  /** Directeur de la publication. Par defaut l'exploitant pour une EI. */
  directeurPublication: string | null;
  /** Numero Certibiocide ou autre certification : uniquement si detenu et verifiable. */
  certifications: string[];

  /**
   * Diffusion de l'identite legale AILLEURS que sur les pages legales.
   *
   * `false` (defaut) : le nom de l'exploitant, le SIRET et l'adresse
   * n'apparaissent que sur /mentions-legales et /politique-de-confidentialite,
   * ou la loi l'impose. Ils ne sont repris ni en pied de page, ni dans les
   * donnees structurees, ni dans aucun contenu editorial.
   *
   * `true` : l'identite legale est egalement publiee a l'echelle du site
   * (pied de page et JSON-LD). A n'activer que si c'est un choix assume.
   */
  showLegalIdentitySitewide: boolean;

  /** Hebergeur du site (art. 6 III LCEN). */
  host: {
    name: string;
    legalName: string;
    address: PostalAddress;
    url: string;
    /** Hostinger n'affiche pas de ligne telephonique publique : on renvoie au support. */
    contactUrl: string;
  } | null;

  /**
   * Mediateur de la consommation. Obligatoire pour tout professionnel vendant
   * a des particuliers (art. L.616-1 du code de la consommation). Renseigner
   * des l'adhesion a un dispositif de mediation.
   */
  mediator: { name: string; url: string; address: string } | null;

  openingHours: string;
  openingHoursSchema: string[];
  areaServed: string;
  locale: string;
  lang: string;
  formEndpoint: string | null;
}

export const site: SiteConfig = {
  brand: 'Dératisation Île-de-France',
  brandMark: 'DÉRAT·IDF',
  legalName: 'Bilal ASSOUL',
  legalForm: 'Entrepreneur individuel (EI)',
  tagline: 'Spécialistes rats et souris en Île-de-France',

  // Numero fourni par le client. Format E.164 pour les liens tel: et le JSON-LD.
  phone: '+33756822785',
  phoneDisplay: '07 56 82 27 85',

  // A renseigner : adresse de contact pour l'exercice des droits RGPD.
  email: null,

  legalAddress: {
    street: '1 rue Albert Simonin',
    postalCode: '92400',
    city: 'Courbevoie',
    country: 'France',
  },
  // L'activite se exerce chez le client : aucun etablissement ne recoit de public.
  publicAddress: null,

  siren: '901133041',
  siret: '90113304100011',
  rcs: '901 133 041 R.C.S. Nanterre',
  greffe: 'Nanterre',
  rcsDate: '2021-07-07',
  creationDate: '2021-07-06',
  naf: '81.29A',
  nafLabel: 'Désinfection, désinsectisation, dératisation',

  // La fiche d'immatriculation signale un numero de TVA non valide en VIES,
  // ce qui correspond a une activite non assujettie (franchise en base).
  // A renseigner si l'entreprise devient assujettie.
  vatNumber: null,

  directeurPublication: 'Bilal ASSOUL',
  certifications: [],

  // L'identite legale reste cantonnee aux pages legales.
  showLegalIdentitySitewide: false,

  host: {
    name: 'Hostinger',
    legalName: 'Hostinger International Ltd',
    address: {
      street: '61 Lordou Vironos Street',
      postalCode: '6023',
      city: 'Larnaca',
      country: 'Chypre',
    },
    url: 'https://www.hostinger.fr',
    contactUrl: 'https://www.hostinger.fr/contact',
  },

  // A renseigner : l'adhesion a un mediateur de la consommation est obligatoire
  // pour un professionnel qui intervient chez des particuliers.
  mediator: null,

  openingHours: 'Du lundi au samedi',
  openingHoursSchema: ['Mo-Sa 08:00-20:00'],

  areaServed: 'Île-de-France',
  locale: 'fr_FR',
  lang: 'fr',

  formEndpoint: process.env.FORM_ENDPOINT || null,
};

export const telHref = `tel:${site.phone}`;

/** 901133041 -> « 901 133 041 » */
export function formatSiren(siren: string): string {
  return siren.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
}

/** 90113304100011 -> « 901 133 041 00011 » */
export function formatSiret(siret: string): string {
  return siret.replace(/(\d{3})(\d{3})(\d{3})(\d{5})/, '$1 $2 $3 $4');
}

/** Formate une adresse postale sur une ligne. */
export function formatAddress(a: PostalAddress): string {
  return `${a.street}, ${a.postalCode} ${a.city}, ${a.country}`;
}

/** Libelles de CTA (varies volontairement : pas de repetition mecanique). */
export const cta = {
  primary: 'Demander une intervention',
  call: 'Appeler maintenant',
  specialist: 'Parler à un spécialiste',
  describe: 'Décrire mon problème',
  quote: 'Demander un devis',
} as const;
