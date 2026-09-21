/**
 * SOURCE UNIQUE DE VERITE — identite, coordonnees, zone.
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

export interface SiteConfig {
  brand: string;
  brandMark: string;
  legalName: string | null;
  tagline: string;
  phone: string;
  phoneDisplay: string;
  email: string | null;
  /** Adresse postale : a renseigner UNIQUEMENT s'il existe un etablissement reel recevant du public. */
  address: {
    streetAddress: string;
    postalCode: string;
    addressLocality: string;
  } | null;
  siret: string | null;
  /** Numero d'agrement Certibiocide / certification : uniquement si detenu et verifiable. */
  certifications: string[];
  openingHours: string;
  openingHoursSchema: string[];
  areaServed: string;
  locale: string;
  lang: string;
  /**
   * Endpoint de reception du formulaire (Formspree, Netlify Forms, API interne...).
   * `null` => le formulaire est rendu mais non branche : check-config.mjs le signale.
   */
  formEndpoint: string | null;
}

export const site: SiteConfig = {
  brand: 'Dératisation Île-de-France',
  brandMark: 'DÉRAT·IDF',
  legalName: null,
  tagline: 'Spécialistes rats et souris en Île-de-France',

  // Numero fourni par le client. Format E.164 pour les liens tel: et le JSON-LD.
  phone: '+33756822785',
  phoneDisplay: '07 56 82 27 85',

  email: null,
  address: null,
  siret: null,
  certifications: [],

  openingHours: 'Du lundi au samedi',
  openingHoursSchema: ['Mo-Sa 08:00-20:00'],

  areaServed: 'Île-de-France',
  locale: 'fr_FR',
  lang: 'fr',

  formEndpoint: process.env.FORM_ENDPOINT || null,
};

export const telHref = `tel:${site.phone}`;

/** Libelles de CTA (varies volontairement : pas de repetition mecanique). */
export const cta = {
  primary: 'Demander une intervention',
  call: 'Appeler maintenant',
  specialist: 'Parler à un spécialiste',
  describe: 'Décrire mon problème',
  quote: 'Demander un devis',
} as const;
