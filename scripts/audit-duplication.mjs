#!/usr/bin/env node
/**
 * MATRICE DE CONTRÔLE ANTI-DUPLICATION
 *
 * Objectif : garantir qu'aucune page locale ou de service n'est une variante
 * d'une autre avec seulement le nom de ville changé.
 *
 * Methode : sur le contenu de <main> uniquement (les composants partages du
 * header et du footer sont exclus), on construit les 5-grammes de mots
 * normalises de chaque page, puis on calcule la similarite de Jaccard entre
 * toutes les paires.
 *
 *   |A ∩ B| / |A ∪ B|
 *
 * Deux pages redigees independamment sur des sujets proches tournent autour de
 * 0,02 a 0,10. Au-dela de 0,30, la parente redactionnelle est visible. Au-dela
 * de 0,50, il s'agit d'un contenu recycle.
 */
import { writeFile, mkdir } from 'node:fs/promises';
import { loadPages, textOfMain, normalizeWords } from './lib-html.mjs';

const N = 5;
const WARN = 0.3;
const FAIL = 0.5;

const pages = (await loadPages()).filter((p) => !p.noindex);

const docs = pages.map((p) => {
  const words = normalizeWords(textOfMain(p.html));
  const grams = new Set();
  for (let i = 0; i + N <= words.length; i++) grams.add(words.slice(i, i + N).join(' '));
  return { route: p.route, words: words.length, grams };
});

function jaccard(a, b) {
  if (!a.size || !b.size) return 0;
  const [small, large] = a.size < b.size ? [a, b] : [b, a];
  let inter = 0;
  for (const g of small) if (large.has(g)) inter++;
  return inter / (a.size + b.size - inter);
}

const pairs = [];
for (let i = 0; i < docs.length; i++) {
  for (let j = i + 1; j < docs.length; j++) {
    const score = jaccard(docs[i].grams, docs[j].grams);
    if (score > 0.02) pairs.push({ a: docs[i].route, b: docs[j].route, score });
  }
}
pairs.sort((x, y) => y.score - x.score);

const failing = pairs.filter((p) => p.score >= FAIL);
const warning = pairs.filter((p) => p.score >= WARN && p.score < FAIL);

// --- Groupes sensibles : pages locales, ou le risque de duplication est maximal ---
const isLocal = (r) =>
  r.startsWith('/zones-intervention/') ||
  r.startsWith('/deratisation-paris/') ||
  /^\/deratisation-(boulogne|nanterre|courbevoie|saint-denis|montreuil|aubervilliers|creteil|vitry|argenteuil|versailles|massy|meaux)/.test(r);

const localDocs = docs.filter((d) => isLocal(d.route));
let localMax = 0;
let localMaxPair = null;
for (let i = 0; i < localDocs.length; i++) {
  for (let j = i + 1; j < localDocs.length; j++) {
    const s = jaccard(localDocs[i].grams, localDocs[j].grams);
    if (s > localMax) {
      localMax = s;
      localMaxPair = `${localDocs[i].route} ↔ ${localDocs[j].route}`;
    }
  }
}

// --- Rapport ---
await mkdir(new URL('../docs/', import.meta.url).pathname, { recursive: true });
const lines = [
  '# Matrice de contrôle anti-duplication',
  '',
  `Généré automatiquement par \`npm run audit:dup\` — ${new Date().toISOString().slice(0, 10)}.`,
  '',
  `- Pages indexables analysées : **${docs.length}**`,
  `- Méthode : similarité de Jaccard sur les ${N}-grammes de mots du contenu principal`,
  `- Seuil d'alerte : **${WARN}** · Seuil bloquant : **${FAIL}**`,
  `- Similarité maximale observée entre deux pages locales : **${localMax.toFixed(3)}**${localMaxPair ? ` (${localMaxPair})` : ''}`,
  '',
  '## Volume de contenu par page',
  '',
  '| Page | Mots | 5-grammes uniques |',
  '| --- | ---: | ---: |',
  ...docs
    .slice()
    .sort((a, b) => a.route.localeCompare(b.route))
    .map((d) => `| \`${d.route}\` | ${d.words} | ${d.grams.size} |`),
  '',
  '## Paires les plus proches',
  '',
  '| Page A | Page B | Jaccard |',
  '| --- | --- | ---: |',
  ...pairs.slice(0, 25).map((p) => `| \`${p.a}\` | \`${p.b}\` | ${p.score.toFixed(3)} |`),
  '',
];
await writeFile(new URL('../docs/anti-duplication.md', import.meta.url).pathname, lines.join('\n'), 'utf8');

console.log('\n  AUDIT ANTI-DUPLICATION');
console.log(`  ${docs.length} pages indexables, ${N}-grammes, seuils ${WARN} / ${FAIL}.`);
console.log(`  Similarité maximale entre pages locales : ${localMax.toFixed(3)}`);
if (localMaxPair) console.log(`    ${localMaxPair}`);
console.log(`  Similarité maximale toutes pages : ${pairs[0] ? pairs[0].score.toFixed(3) : '0'}`);
if (pairs[0]) console.log(`    ${pairs[0].a} ↔ ${pairs[0].b}`);
console.log('  Rapport écrit dans docs/anti-duplication.md\n');

if (warning.length) {
  console.log(`  Paires au-dessus du seuil d'alerte (${warning.length}) :`);
  for (const p of warning) console.log(`   ! ${p.score.toFixed(3)}  ${p.a} ↔ ${p.b}`);
  console.log('');
}
if (failing.length) {
  console.error(`  Paires au-dessus du seuil bloquant (${failing.length}) :`);
  for (const p of failing) console.error(`   ✗ ${p.score.toFixed(3)}  ${p.a} ↔ ${p.b}`);
  console.error('\n  Ces pages doivent être réécrites ou fusionnées.\n');
  process.exit(1);
}
console.log('  Aucune duplication au-delà du seuil.\n');
