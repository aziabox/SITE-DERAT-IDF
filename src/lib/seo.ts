import { site } from '../data/site';

export const ORG_ID = '#organization';
export const WEBSITE_ID = '#website';

export function abs(path: string, origin: string | URL): string {
  const base = typeof origin === 'string' ? origin : origin.origin;
  return new URL(path, base).href.replace(/\/$/, path === '/' ? '/' : '');
}

/** Zone desservie : uniquement les entités administratives réellement couvertes. */
const AREA_SERVED = [
  { '@type': 'AdministrativeArea', name: 'Île-de-France' },
  { '@type': 'City', name: 'Paris' },
  { '@type': 'AdministrativeArea', name: 'Hauts-de-Seine' },
  { '@type': 'AdministrativeArea', name: 'Seine-Saint-Denis' },
  { '@type': 'AdministrativeArea', name: 'Val-de-Marne' },
  { '@type': 'AdministrativeArea', name: 'Val-d’Oise' },
  { '@type': 'AdministrativeArea', name: 'Yvelines' },
  { '@type': 'AdministrativeArea', name: 'Essonne' },
  { '@type': 'AdministrativeArea', name: 'Seine-et-Marne' },
];

/**
 * Organisation / prestataire de services.
 * Aucun `aggregateRating`, `review`, `priceRange`, `foundingDate` ni `award` :
 * ces propriétés ne sont émises que si une donnée réelle existe.
 * `address` n'est émis que si un établissement réel est renseigné dans site.ts.
 */
export function organizationSchema(origin: string) {
  const node: Record<string, unknown> = {
    '@type': 'ProfessionalService',
    '@id': abs('/', origin) + ORG_ID,
    name: site.brand,
    url: abs('/', origin),
    telephone: site.phone,
    description:
      'Entreprise de dératisation en Île-de-France : traitement des rats et des souris, recherche des points d’entrée, sécurisation et prévention, pour les particuliers et les professionnels.',
    areaServed: AREA_SERVED,
    knowsAbout: [
      'Dératisation',
      'Rat brun (Rattus norvegicus)',
      'Souris domestique (Mus musculus)',
      'Prévention des rongeurs',
      'Sécurisation des points d’entrée',
    ],
    availableLanguage: 'fr',
  };
  if (site.legalName) node.legalName = site.legalName;
  if (site.email) node.email = site.email;
  // Adresse emise uniquement s'il existe un etablissement recevant du public.
  // Le siege social d'une activite qui se rend chez le client n'en est pas un :
  // le declarer comme tel induirait les moteurs en erreur.
  if (site.publicAddress) {
    node.address = {
      '@type': 'PostalAddress',
      streetAddress: site.publicAddress.street,
      postalCode: site.publicAddress.postalCode,
      addressLocality: site.publicAddress.city,
      addressCountry: 'FR',
    };
  }
  if (site.siret) node.identifier = { '@type': 'PropertyValue', propertyID: 'SIRET', value: site.siret };
  if (site.vatNumber) node.vatID = site.vatNumber;
  if (site.openingHoursSchema.length) {
    node.openingHoursSpecification = site.openingHoursSchema.map((h) => {
      const [days, range] = h.split(' ');
      const [opens, closes] = range.split('-');
      return {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: expandDays(days),
        opens,
        closes,
      };
    });
  }
  return node;
}

const DAY_MAP: Record<string, string> = {
  Mo: 'Monday', Tu: 'Tuesday', We: 'Wednesday', Th: 'Thursday',
  Fr: 'Friday', Sa: 'Saturday', Su: 'Sunday',
};
const DAY_ORDER = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

function expandDays(spec: string): string[] {
  if (!spec.includes('-')) return [DAY_MAP[spec]].filter(Boolean);
  const [from, to] = spec.split('-');
  const a = DAY_ORDER.indexOf(from);
  const b = DAY_ORDER.indexOf(to);
  if (a < 0 || b < 0) return [];
  return DAY_ORDER.slice(a, b + 1).map((d) => DAY_MAP[d]);
}

export function websiteSchema(origin: string) {
  return {
    '@type': 'WebSite',
    '@id': abs('/', origin) + WEBSITE_ID,
    url: abs('/', origin),
    name: site.brand,
    inLanguage: 'fr-FR',
    publisher: { '@id': abs('/', origin) + ORG_ID },
  };
}

export function webPageSchema(opts: {
  origin: string;
  url: string;
  title: string;
  description: string;
  breadcrumbId?: string;
  datePublished?: string;
  dateModified?: string;
}) {
  const node: Record<string, unknown> = {
    '@type': 'WebPage',
    '@id': opts.url + '#webpage',
    url: opts.url,
    name: opts.title,
    description: opts.description,
    inLanguage: 'fr-FR',
    isPartOf: { '@id': abs('/', opts.origin) + WEBSITE_ID },
    about: { '@id': abs('/', opts.origin) + ORG_ID },
  };
  if (opts.breadcrumbId) node.breadcrumb = { '@id': opts.breadcrumbId };
  if (opts.datePublished) node.datePublished = opts.datePublished;
  if (opts.dateModified) node.dateModified = opts.dateModified;
  return node;
}

export interface Crumb { label: string; href: string }

export function breadcrumbSchema(crumbs: Crumb[], origin: string, url: string) {
  return {
    '@type': 'BreadcrumbList',
    '@id': url + '#breadcrumb',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: abs(c.href, origin),
    })),
  };
}

export interface FaqItem { q: string; a: string }

export function faqSchema(items: FaqItem[], url: string) {
  return {
    '@type': 'FAQPage',
    '@id': url + '#faq',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}

export function serviceSchema(opts: {
  origin: string;
  url: string;
  name: string;
  description: string;
  serviceType: string;
}) {
  return {
    '@type': 'Service',
    '@id': opts.url + '#service',
    name: opts.name,
    serviceType: opts.serviceType,
    description: opts.description,
    provider: { '@id': abs('/', opts.origin) + ORG_ID },
    areaServed: AREA_SERVED,
    url: opts.url,
  };
}

export function articleSchema(opts: {
  origin: string;
  url: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  section?: string;
}) {
  return {
    '@type': 'Article',
    '@id': opts.url + '#article',
    headline: opts.headline,
    description: opts.description,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified || opts.datePublished,
    inLanguage: 'fr-FR',
    author: { '@type': 'Organization', name: opts.author, '@id': abs('/', opts.origin) + ORG_ID },
    publisher: { '@id': abs('/', opts.origin) + ORG_ID },
    mainEntityOfPage: { '@id': opts.url + '#webpage' },
    ...(opts.section ? { articleSection: opts.section } : {}),
  };
}

/** Assemble un graphe JSON-LD unique par page (évite les blocs multiples concurrents). */
export function graph(origin: string, nodes: unknown[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [organizationSchema(origin), websiteSchema(origin), ...nodes],
  };
}
