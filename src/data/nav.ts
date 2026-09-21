export interface NavItem {
  href: string;
  label: string;
  short?: string;
}

/** Navigation principale (desktop) — volontairement courte. */
export const primaryNav: NavItem[] = [
  { href: '/deratisation', label: 'Dératisation' },
  { href: '/deratisation-rats', label: 'Rats' },
  { href: '/deratisation-souris', label: 'Souris' },
  { href: '/prevention-rongeurs', label: 'Prévention' },
  { href: '/zones-intervention', label: 'Zones' },
  { href: '/blog', label: 'Blog' },
];

export const navServices: NavItem[] = [
  { href: '/deratisation', label: 'Dératisation en Île-de-France' },
  { href: '/deratisation-rats', label: 'Dératisation rats' },
  { href: '/deratisation-souris', label: 'Dératisation souris' },
  { href: '/traitement-rats', label: 'Traitement contre les rats' },
  { href: '/traitement-souris', label: 'Traitement contre les souris' },
  { href: '/infestation-rats', label: 'Infestation de rats' },
  { href: '/infestation-souris', label: 'Infestation de souris' },
  { href: '/inspection-rongeurs', label: 'Inspection et recherche des points d’entrée' },
  { href: '/prevention-rongeurs', label: 'Prévention et sécurisation' },
];

export const navClients: NavItem[] = [
  { href: '/deratisation-particuliers', label: 'Particuliers' },
  { href: '/deratisation-coproprietes', label: 'Copropriétés' },
  { href: '/deratisation-entreprises', label: 'Entreprises et locaux professionnels' },
  { href: '/deratisation-commerces', label: 'Commerces' },
  { href: '/deratisation-restaurants', label: 'Restaurants et métiers de bouche' },
];

export const navZones: NavItem[] = [
  { href: '/deratisation-paris', label: 'Paris' },
  { href: '/zones-intervention/hauts-de-seine', label: 'Hauts-de-Seine (92)' },
  { href: '/zones-intervention/seine-saint-denis', label: 'Seine-Saint-Denis (93)' },
  { href: '/zones-intervention/val-de-marne', label: 'Val-de-Marne (94)' },
  { href: '/zones-intervention/val-doise', label: 'Val-d’Oise (95)' },
  { href: '/zones-intervention/yvelines', label: 'Yvelines (78)' },
  { href: '/zones-intervention/essonne', label: 'Essonne (91)' },
  { href: '/zones-intervention/seine-et-marne', label: 'Seine-et-Marne (77)' },
];
