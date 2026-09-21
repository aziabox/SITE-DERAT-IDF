#!/usr/bin/env node
/**
 * Convertit le GeoJSON des départements d'Île-de-France en tracés SVG.
 *
 * Étapes :
 *  1. projection équirectangulaire corrigée en longitude par cos(latitude moyenne)
 *     — suffisante et sans distorsion visible sur une emprise de ~150 km ;
 *  2. mise à l'échelle dans un viewBox de 1000 unités de large ;
 *  3. simplification de Douglas-Peucker pour réduire le poids du SVG ;
 *  4. calcul d'un point d'ancrage d'étiquette réellement intérieur au polygone
 *     (pôle d'inaccessibilité approché sur une grille), le centroïde tombant
 *     en dehors pour les départements concaves.
 *
 * Sortie : src/data/idf-map.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';

const SRC = new URL('../data/departements-ile-de-france.geojson', import.meta.url);
const OUT = new URL('../src/data/idf-map.ts', import.meta.url);

const WIDTH = 1000;
const PADDING = 8;
const TOLERANCE = 2.2; // en unités de viewBox (~1,2 px au rendu réel)

const META = {
  '75': { slug: 'paris', href: '/deratisation-paris', couronne: 'Paris' },
  '92': { slug: 'hauts-de-seine', href: '/zones-intervention/hauts-de-seine', couronne: 'Petite couronne' },
  '93': { slug: 'seine-saint-denis', href: '/zones-intervention/seine-saint-denis', couronne: 'Petite couronne' },
  '94': { slug: 'val-de-marne', href: '/zones-intervention/val-de-marne', couronne: 'Petite couronne' },
  '95': { slug: 'val-doise', href: '/zones-intervention/val-doise', couronne: 'Grande couronne' },
  '78': { slug: 'yvelines', href: '/zones-intervention/yvelines', couronne: 'Grande couronne' },
  '91': { slug: 'essonne', href: '/zones-intervention/essonne', couronne: 'Grande couronne' },
  '77': { slug: 'seine-et-marne', href: '/zones-intervention/seine-et-marne', couronne: 'Grande couronne' },
};

const geo = JSON.parse(readFileSync(SRC, 'utf8'));

// --- 1. Projection ---------------------------------------------------------
const allCoords = geo.features.flatMap((f) =>
  (f.geometry.type === 'Polygon' ? f.geometry.coordinates : f.geometry.coordinates.flat())
    .flat()
);
const lat0 = allCoords.reduce((a, c) => a + c[1], 0) / allCoords.length;
const kx = Math.cos((lat0 * Math.PI) / 180);
const project = ([lon, lat]) => [lon * kx, -lat];

const projected = allCoords.map(project);
const minX = Math.min(...projected.map((p) => p[0]));
const maxX = Math.max(...projected.map((p) => p[0]));
const minY = Math.min(...projected.map((p) => p[1]));
const maxY = Math.max(...projected.map((p) => p[1]));

const inner = WIDTH - PADDING * 2;
const scale = inner / (maxX - minX);
const HEIGHT = Math.round((maxY - minY) * scale + PADDING * 2);
const toView = ([lon, lat]) => {
  const [x, y] = project([lon, lat]);
  return [(x - minX) * scale + PADDING, (y - minY) * scale + PADDING];
};

// --- 2. Simplification (Douglas-Peucker) -----------------------------------
function perpDistance(p, a, b) {
  const [px, py] = p, [ax, ay] = a, [bx, by] = b;
  const dx = bx - ax, dy = by - ay;
  if (dx === 0 && dy === 0) return Math.hypot(px - ax, py - ay);
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)));
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}

function simplify(points, tol) {
  if (points.length < 3) return points;
  let maxD = 0, idx = 0;
  const a = points[0], b = points[points.length - 1];
  for (let i = 1; i < points.length - 1; i++) {
    const d = perpDistance(points[i], a, b);
    if (d > maxD) { maxD = d; idx = i; }
  }
  if (maxD <= tol) return [a, b];
  return [
    ...simplify(points.slice(0, idx + 1), tol).slice(0, -1),
    ...simplify(points.slice(idx), tol),
  ];
}

// --- 3. Point d'ancrage d'étiquette ---------------------------------------
function pointInRing(x, y, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i], [xj, yj] = ring[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

function labelAnchor(ring) {
  const xs = ring.map((p) => p[0]), ys = ring.map((p) => p[1]);
  const x0 = Math.min(...xs), x1 = Math.max(...xs);
  const y0 = Math.min(...ys), y1 = Math.max(...ys);
  const STEPS = 48;
  let best = null, bestD = -1;
  for (let i = 1; i < STEPS; i++) {
    for (let j = 1; j < STEPS; j++) {
      const x = x0 + ((x1 - x0) * i) / STEPS;
      const y = y0 + ((y1 - y0) * j) / STEPS;
      if (!pointInRing(x, y, ring)) continue;
      let d = Infinity;
      for (let k = 0, l = ring.length - 1; k < ring.length; l = k++) {
        d = Math.min(d, perpDistance([x, y], ring[l], ring[k]));
        if (d < bestD) break;
      }
      if (d > bestD) { bestD = d; best = [x, y]; }
    }
  }
  return best ?? [(x0 + x1) / 2, (y0 + y1) / 2];
}

/**
 * Encodage compact : coordonnées entières et commandes relatives.
 * Sur un viewBox de 1000 de large, 1 unité vaut ~0,6 px au rendu :
 * l'arrondi est invisible et divise le poids du tracé par deux.
 */
function toPath(points) {
  const pts = points.map(([x, y]) => [Math.round(x), Math.round(y)]);
  let out = `M${pts[0][0]} ${pts[0][1]}`;
  let [px, py] = pts[0];
  let buffer = '';
  for (let i = 1; i < pts.length; i++) {
    const [x, y] = pts[i];
    const dx = x - px, dy = y - py;
    if (dx === 0 && dy === 0) continue;
    buffer += dx === 0 ? `v${dy}` : dy === 0 ? `h${dx}` : `l${dx} ${dy}`;
    px = x; py = y;
  }
  return out + buffer + 'Z';
}

// --- 4. Génération ---------------------------------------------------------
const shapes = [];
let rawPoints = 0, keptPoints = 0;

for (const feature of geo.features) {
  const code = feature.properties.code;
  const meta = META[code];
  if (!meta) throw new Error(`Département inattendu dans la source : ${code}`);

  const polygons =
    feature.geometry.type === 'Polygon' ? [feature.geometry.coordinates] : feature.geometry.coordinates;

  const parts = [];
  let biggest = null, biggestLen = 0;

  for (const rings of polygons) {
    for (const ring of rings) {
      rawPoints += ring.length;
      const view = ring.map(toView);
      const simplified = simplify(view, TOLERANCE);
      keptPoints += simplified.length;
      parts.push(toPath(simplified));
      if (simplified.length > biggestLen) { biggestLen = simplified.length; biggest = simplified; }
    }
  }

  const [lx, ly] = labelAnchor(biggest);
  shapes.push({
    code,
    name: feature.properties.nom,
    slug: meta.slug,
    href: meta.href,
    couronne: meta.couronne,
    d: parts.join(''),
    label: { x: Number(lx.toFixed(1)), y: Number(ly.toFixed(1)) },
  });
}

// Ordre d'affichage : Paris en dernier pour rester au-dessus de ses voisins.
const order = ['77', '78', '91', '95', '93', '94', '92', '75'];
shapes.sort((a, b) => order.indexOf(a.code) - order.indexOf(b.code));

const ts = `// Fichier généré par scripts/build-map.mjs — ne pas modifier à la main.
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

export const MAP_WIDTH = ${WIDTH};
export const MAP_HEIGHT = ${HEIGHT};
export const MAP_VIEWBOX = '0 0 ${WIDTH} ${HEIGHT}';

export const DEPT_SHAPES: DeptShape[] = ${JSON.stringify(shapes, null, 2)};
`;

writeFileSync(OUT, ts, 'utf8');
console.log(
  `  [carte] ${shapes.length} départements — ${rawPoints} points source → ${keptPoints} conservés ` +
    `(${(ts.length / 1024).toFixed(1)} Ko), viewBox ${WIDTH}×${HEIGHT}.`
);
