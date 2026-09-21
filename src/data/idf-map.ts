// Fichier généré par scripts/build-map.mjs — ne pas modifier à la main.
// Source : france-geojson (données IGN, Licence Ouverte Etalab). Voir data/SOURCE.md.
// Régénérer avec : npm run build:map

export interface DeptShape {
  code: string;
  name: string;
  slug: string;
  href: string;
  couronne: string;
  /** Tracé SVG dans le viewBox ci-dessous. */
  d: string;
  /** Point intérieur au polygone, pour poser l'étiquette. */
  label: { x: number; y: number };
}

export const MAP_WIDTH = 1000;
export const MAP_HEIGHT = 808;
export const MAP_VIEWBOX = '0 0 1000 808';

export const DEPT_SHAPES: DeptShape[] = [
  {
    "code": "77",
    "name": "Seine-et-Marne",
    "slug": "seine-et-marne",
    "href": "/zones-intervention/seine-et-marne",
    "couronne": "Grande couronne",
    "d": "M532 396l5 -4l-6 -8l12 -16l-4 -7l8 -8l-3 -5l9 -2l-4 -8l-10 1l6 -16l-3 -3l1 -15l-10 -23l5 -1l2 -6l-10 -2l2 -9l-5 -5l12 -6l1 -19l7 -6v-5l-3 -1l-3 -11l-13 -18h8l1 -5l-3 -10l-5 -3l2 -4l-7 1l-2 -4l-4 2l-3 -5v-3l15 -4l5 -12l8 -1l-4 -7l-6 2l-1 -4l9 -14l9 -11h6l5 -9l4 6l4 -1l12 9l9 10l-3 5l4 2l12 -11l5 14h9l11 -7l5 -4l-9 -5h9l-2 -4l12 -6l9 9h8l4 10h7l8 -7l4 2l3 -6l18 6l3 -8l5 2l5 -4l3 12l6 2l2 -9l4 -4l3 2l1 -3l11 4v-2l15 2l-4 -10l7 -13l5 4l26 4l3 3l10 2l-6 12l11 9l3 13l3 -1l1 4l-5 2l-2 10l-7 4l3 9l14 3l5 10l10 4l1 8l8 2l7 25l9 -1l10 -6l4 19l8 9l14 -7l3 -6l4 12l-3 12l7 3l-2 12l12 -3l-1 9l9 -3l3 5h7l3 3l-3 9l7 3l5 -8l7 -1l3 12l-2 14l-3 2l-5 -6l-10 7l-15 -5l-6 6l9 6l9 -2l1 9l-1 6l-2 -2l-4 4l-3 -3h-7l-6 18l6 5l9 -5l8 16l12 -1l-3 21l6 7h-2v9l-12 6l-3 9l9 8l-4 13l12 -2l7 -7l12 3l7 -3l-6 10l8 1l10 10l-26 9l6 10h-10l-13 14l9 16l-3 2l1 3l-11 8l-20 -3l-4 4l8 9l6 14l-1 4l-13 1l-11 6l8 9l-2 3l5 7l-1 10l-4 1l-2 10l10 1l-5 5l9 -1l-3 18l-6 1l-11 -7l-5 4l-1 15l-4 1v-5h-3l-7 6l-11 -5l-3 3l-10 -6l-1 2h-6l-7 9l-14 -4l-11 5l-13 -10l-3 5h-6l-3 4l-3 -5l-11 4l-6 12l-2 -6l-23 -1l-6 12l3 9l-13 17l6 2l-4 6l5 6l-3 7l10 4l1 15h-8l-12 30l-15 1l-1 8l-16 8v14l-32 5l-8 10l-14 9l-9 -2l-1 -14l6 -9l-8 -3l-1 3l-6 -2l-4 4l-2 -2l-5 3l-9 -4l9 14l-16 6l-7 10l-13 -2l-6 4l-12 -13l-30 5l-2 -6l-6 -1l-10 1l-7 11l-21 -3l-10 5l-6 -2l1 -5l14 -12l4 -11l11 6l5 -7l-5 -10l5 -7l-2 -2l5 -2l-5 -13l2 -10l-5 1v-8l-11 -1l-7 -11l-8 3l-2 -3l-3 1l-8 -5l-2 -13l2 -11l-14 -23v-6l19 1l-2 -10l7 -6l-7 -4l6 -5l4 2v-6l16 -6l-5 -5l4 -5l9 4l9 -9l12 2l-14 -18l-6 -2l1 -5l-3 -2l3 -7l-4 -5l4 -9l-2 -10l4 -3l2 -13l-3 -7h-5v-6l6 -13l-5 -1l9 -12v-6l6 -2h-5l-2 -8l11 -7l1 -7l-1 -5l-7 -1v-6l-5 -5l13 -3l2 -13l-6 -4l5 -10l2 1l4 -4l5 6l1 -6l7 -3l-2 -7l-5 -2Z",
    "label": {
      "x": 731.8,
      "y": 433
    }
  },
  {
    "code": "78",
    "name": "Yvelines",
    "slug": "yvelines",
    "href": "/zones-intervention/yvelines",
    "couronne": "Grande couronne",
    "d": "M84 123l2 5l14 -7l13 2l12 9l-1 7l13 8l4 -4l9 1l4 -10l7 4l9 -1l1 -10l15 -2l8 10l9 3l-6 17l3 1l3 7l-1 5l9 -3v-10l12 -10l14 18l5 -3l4 3l3 -3l5 5l8 -1l15 16l19 -7l5 4l4 -9l12 4l5 -6l3 6l-3 11l21 8l6 12l-2 9l15 2l-3 10l2 15l-17 14l-9 17l4 1l-3 8l4 7h-4l-2 8l3 14l5 3l5 -2l6 10l-2 3l9 -1l3 8l7 1l3 11h-11l-2 -4h-5l-1 15l-4 -3l-6 1l-3 5l-5 -3l-6 6l-1 6l-7 -3l-8 3l-2 3l6 7l-7 15v6l-4 -3l-3 9l-6 -4l-2 3l-9 -1l-1 6h-4l-3 16l-8 -2l2 13h11l-2 7l12 11l-3 6l-9 1l1 12l-10 14l1 8h-15l-3 3l-5 -5l-14 -2l-2 11l17 11l2 -4l2 9l-7 -2l-8 7l-7 27l-3 -1l-5 5l3 19l-6 1l-2 5l-27 -5l-4 -15l-17 1l1 -5l-5 -6l2 -2l-5 -4l2 -7l-6 -7l-1 -13l6 -18l-4 1l-5 -5l-5 -11l-14 2l-9 -4l-3 -5l8 -15l-2 -6l-13 2l-2 -3l4 -1l-3 -2l-9 4l-13 -22l3 -4l-11 1l-8 -9l4 -19l-10 -2l-6 -7l7 -4l-2 -2l15 -18l3 -8l-9 -9l-12 -4l3 -5l-5 -7v-16l6 -7l-5 -10l9 -7l-10 -3l3 -12l-11 -5l-2 2l-5 -5l9 -13l-12 -10l3 -6l-3 -7l-9 -2l-2 3l-4 -4l3 -5l-5 -5l4 -9l-5 1l-4 -8l13 -10l-5 -4l-5 3l-9 -1l-4 4l-4 -8l5 -2l4 -13l-3 -7l-8 -6l-5 -14l7 -13l9 9l10 -5l6 -15l-3 -4l6 12l9 -4l8 4l7 -7l15 -5l2 5Z",
    "label": {
      "x": 205.5,
      "y": 299.1
    }
  },
  {
    "code": "91",
    "name": "Essonne",
    "slug": "essonne",
    "href": "/zones-intervention/essonne",
    "couronne": "Grande couronne",
    "d": "M371 337l3 7l7 4l10 -1l4 3l4 7l-5 5l2 5l11 -5v8l5 -1v-9l6 -6l5 7l9 3l6 -6l1 18h12l2 -4h4l2 6l12 -5l4 7v-5l2 1l6 -6l6 1l13 -6l11 26l5 -1l4 9l15 -1l2 7l-7 3l-1 6l-6 -6l-10 9v4l6 5l-3 12l-12 3l5 5v6l7 1l1 5l-1 7l-11 7l2 8l4 2h-5v6l-9 12l5 1l-6 19h5l3 7l-2 13l-4 3l2 10l-4 9l4 5l-3 7l3 2l-1 5l6 2l14 18l-12 -2l-9 9l-9 -4l-4 5l5 5l-16 6v6l-4 -2l-6 5l7 4l-7 6l2 10l-19 -1v6l4 5l-7 6l-13 2l-11 -13l-3 1v-5l-7 1l-8 16l-14 -4l-10 11l2 -12h-5l4 -11l-9 1l-10 -11l-9 9l-3 15l-13 -3l5 12l-25 1l2 -7h-4l-9 9l-16 -1l-5 8l-7 -3l-7 3l-17 -2v-4l4 -2l-8 1l-3 -9l7 -6l2 2l1 -4l-3 -3l4 -4l-7 -9l3 -2l-1 -8l8 -6l-5 -3l1 -7l-7 -2l6 -15l-23 -3l-1 -7l6 -2l-2 -11l3 -5h-4l-2 -11l-5 -2l-2 -7l5 -8l3 1l7 -27l8 -7l7 2v-5l-4 -4v4l-17 -11l1 -9h15l5 5l3 -3h15l-1 -8l10 -14l-1 -12l9 -1l3 -6l-12 -11l2 -7h-11l-2 -13l8 2l3 -16h4l1 -6l9 1l2 -3l6 4l3 -9l4 3v-6l7 -15l-6 -7l2 -3l8 -3l7 3l1 -6l6 -6l5 3l6 -5l8 2l1 -7l-3 -6l2 -2h5l4 5l9 -1l-2 -4Z",
    "label": {
      "x": 382.4,
      "y": 525
    }
  },
  {
    "code": "95",
    "name": "Val-d'Oise",
    "slug": "val-doise",
    "href": "/zones-intervention/val-doise",
    "couronne": "Grande couronne",
    "d": "M541 122l-9 14l1 4l6 -2l4 7l-8 1l-5 12l-15 4l2 8h7l-2 6l-8 -1l-8 16l-11 6l-2 5l-3 -2l-6 4l-4 6l-20 -3l-4 3l-11 -11l-9 -2l-5 6l-5 -2l-5 9l-16 -8l-5 6l2 5l-15 5l-28 25v-7l3 -2l-3 -10l3 -10l-15 -2l2 -9l-6 -12l-21 -8l3 -11l-3 -6l-5 6l-12 -4l-4 9l-5 -4l-19 7l-15 -16l-8 1l-5 -5l-3 3l-4 -3l-5 3l-14 -18l-12 10v10l-9 3l1 -5l-3 -7l-3 -1l6 -17l-9 -3l-8 -10l-15 2l-1 10l-9 1l-7 -4l-4 10l-9 -1l-4 4l-13 -8l1 -7l-12 -9l-13 -2l-14 7l-2 -5l6 -5l-2 -6l5 -11l13 -16l-2 -9l6 -6l-2 -3l4 -8l2 -30l11 -9l6 -12l1 6l13 7l-3 1v7l-9 3v3l5 2l1 4h5l1 10l7 4l14 -8l3 4l5 -3v3l5 2l-1 3l7 -4l4 2l1 8l3 -4l15 -3l3 9l20 -8l12 2l11 -9l13 5l9 -9l6 1l6 -8l16 -8v3l4 -2v11l3 3l6 -1l2 3l7 -5l3 1l1 9l4 -6l9 6l-4 5l6 6l6 -5l-3 -4l9 2l11 -5l8 9l-9 9l6 3l26 -6l1 -8l11 -11l5 1l17 26l8 -8l7 7l10 -2l13 4l-2 9l10 -5l2 3l5 1l1 5l13 7l-6 8l19 5l1 -14l4 -2l-1 4h4l4 -5l-2 8l3 10l10 5v5l5 3Z",
    "label": {
      "x": 399.4,
      "y": 135.3
    }
  },
  {
    "code": "93",
    "name": "Seine-Saint-Denis",
    "slug": "seine-saint-denis",
    "href": "/zones-intervention/seine-saint-denis",
    "couronne": "Petite couronne",
    "d": "M524 172l7 -1l-2 4l5 3l3 10l-1 5h-8l13 18l3 11l3 1v5l-7 6l-1 19l-12 6l5 5l-2 9l10 2l-2 6l-5 1l10 23l-1 10l-11 -6l1 -6l-15 -9l-2 -6l-3 1l-11 -10l-4 1v-3h-13l-10 7l-14 1l-2 -19l-10 -18l-33 1l-3 -10l9 -8l1 -11l-21 -7l-1 -5l5 -6l16 8l5 -9l5 2l5 -6l9 2l11 11l4 -3l20 3l4 -6l6 -4l3 2l2 -5l11 -6l8 -16l8 1l2 -4Z",
    "label": {
      "x": 498,
      "y": 239.6
    }
  },
  {
    "code": "94",
    "name": "Val-de-Marne",
    "slug": "val-de-marne",
    "href": "/zones-intervention/val-de-marne",
    "couronne": "Petite couronne",
    "d": "M421 308h14l18 -9l17 8l10 1l5 -14l-4 -4l-19 -2l1 7h-5l2 -10l14 -1l10 -7h13v3l4 -1l11 10l3 -1l2 6l15 9l-1 6l13 7l-2 4l3 3l-6 16l10 -1l4 8l-9 2l3 5l-8 8l4 7l-12 16l6 8l-15 7l-4 -9l-5 1l-11 -26l-13 6l-6 -1l-6 6l-2 -1v5l-4 -7l-12 5l-2 -6h-4l-2 4h-12l-1 -18l-6 6l-22 -13l8 -16l-4 -7l4 -13l-4 -1l7 -6Z",
    "label": {
      "x": 505,
      "y": 330.2
    }
  },
  {
    "code": "92",
    "name": "Hauts-de-Seine",
    "slug": "hauts-de-seine",
    "href": "/zones-intervention/hauts-de-seine",
    "couronne": "Petite couronne",
    "d": "M401 213l21 7l-1 11l-9 8l3 10l-16 10l-3 5l-10 -1l-1 4l-5 -1l-6 5l-4 11l14 6l1 7l7 2l-1 3l5 -3l25 10l-7 7l4 1l-4 13l4 7l-8 16l5 5l-3 13l-3 1l-2 -8l-11 5l-2 -5l5 -5l-8 -10l-10 1l-7 -4l-4 -14l-7 -1l-3 -8l-9 1l2 -3l-6 -10l-5 2l-5 -3l-3 -14l2 -8h4l-4 -7l3 -8h-4l9 -18l43 -35l14 -5Z",
    "label": {
      "x": 392.8,
      "y": 324.1
    }
  },
  {
    "code": "75",
    "name": "Paris",
    "slug": "paris",
    "href": "/deratisation-paris",
    "couronne": "Paris",
    "d": "M421 308l-25 -11l-5 3l1 -3l-7 -2l-1 -7l-14 -6l4 -11l6 -5l5 1l1 -4l10 1l3 -5l16 -10l30 -1l5 2l2 11l6 5v29h5l-1 -7l8 3l1 -4l10 3l4 4l-6 14l-9 -1l-17 -8l-18 9h-14Z",
    "label": {
      "x": 427.5,
      "y": 278.1
    }
  }
];
