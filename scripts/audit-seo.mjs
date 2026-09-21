#!/usr/bin/env node
/**
 * Audit SEO technique sur le site construit (dist/).
 * Verifie : titles, meta descriptions, H1, canonicals, JSON-LD, alt d'images,
 * hierarchie des titres et validite des liens internes.
 */
import { loadPages, attr, textOfMain } from './lib-html.mjs';

const pages = await loadPages();
const errors = [];
const warnings = [];
const routes = new Set(pages.map((p) => p.route));

const seenTitles = new Map();
const seenDescriptions = new Map();
const seenH1 = new Map();

const TITLE_MIN = 20;
const TITLE_MAX = 65;
const DESC_MIN = 70;
const DESC_MAX = 165;

for (const page of pages) {
  const { html, route, noindex } = page;
  const tag = (msg) => `${route} — ${msg}`;

  // --- Title ---
  const title = attr(html, /<title>([\s\S]*?)<\/title>/i)?.trim();
  if (!title) errors.push(tag('title absent'));
  else {
    if (title.length < TITLE_MIN) warnings.push(tag(`title court (${title.length} car.)`));
    if (title.length > TITLE_MAX) warnings.push(tag(`title long (${title.length} car.)`));
    if (!noindex) {
      if (seenTitles.has(title)) errors.push(tag(`title dupliqué avec ${seenTitles.get(title)}`));
      else seenTitles.set(title, route);
    }
  }

  // --- Meta description ---
  const desc = attr(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i);
  if (!desc) errors.push(tag('meta description absente'));
  else {
    if (desc.length < DESC_MIN) warnings.push(tag(`meta description courte (${desc.length} car.)`));
    if (desc.length > DESC_MAX) warnings.push(tag(`meta description longue (${desc.length} car.)`));
    if (!noindex) {
      if (seenDescriptions.has(desc)) errors.push(tag(`meta description dupliquée avec ${seenDescriptions.get(desc)}`));
      else seenDescriptions.set(desc, route);
    }
  }

  // --- H1 ---
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) =>
    m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
  );
  if (h1s.length === 0) errors.push(tag('aucun H1'));
  else if (h1s.length > 1) errors.push(tag(`${h1s.length} H1 sur la page`));
  else if (!noindex) {
    const h1 = h1s[0];
    if (seenH1.has(h1)) errors.push(tag(`H1 dupliqué avec ${seenH1.get(h1)}`));
    else seenH1.set(h1, route);
  }

  // --- Canonical ---
  const canonical = attr(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
  if (!canonical) errors.push(tag('canonical absent'));
  else {
    const path = new URL(canonical).pathname;
    const expected = route === '/' ? '/' : route;
    if (path !== expected) errors.push(tag(`canonical incohérent : ${path} ≠ ${expected}`));
  }

  // --- Open Graph ---
  for (const prop of ['og:title', 'og:description', 'og:url', 'og:image']) {
    if (!new RegExp(`property=["']${prop}["']`).test(html)) warnings.push(tag(`${prop} absent`));
  }

  // --- JSON-LD ---
  const ld = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!ld) errors.push(tag('JSON-LD absent'));
  else {
    try {
      const data = JSON.parse(ld[1]);
      if (!Array.isArray(data['@graph'])) errors.push(tag('JSON-LD sans @graph'));
      const serialized = JSON.stringify(data);
      for (const forbidden of ['aggregateRating', 'reviewCount', 'ratingValue', 'priceRange']) {
        if (serialized.includes(forbidden)) errors.push(tag(`donnée structurée interdite : ${forbidden}`));
      }
    } catch (e) {
      errors.push(tag(`JSON-LD invalide : ${e.message}`));
    }
  }

  // --- Images ---
  for (const m of html.matchAll(/<img\b[^>]*>/gi)) {
    if (!/\salt=/.test(m[0])) errors.push(tag('image sans attribut alt'));
    if (!/loading=/.test(m[0])) warnings.push(tag('image sans attribut loading'));
  }

  // --- Hierarchie des titres (contenu principal uniquement) ---
  const mainHtml = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? html;
  const levels = [...mainHtml.matchAll(/<h([1-4])\b/gi)].map((m) => Number(m[1]));
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] - levels[i - 1] > 1) {
      warnings.push(tag(`saut de niveau de titre H${levels[i - 1]} → H${levels[i]}`));
      break;
    }
  }

  // --- Volume de contenu ---
  const words = textOfMain(html).split(/\s+/).filter(Boolean).length;
  if (!noindex && words < 300) warnings.push(tag(`contenu faible (${words} mots)`));

  // --- Liens internes ---
  for (const m of html.matchAll(/href=["'](\/[^"'#?]*)["']/g)) {
    let href = m[1];
    if (/\.(xml|txt|png|svg|webp|jpg|ico|woff2|pdf)$/.test(href)) continue;
    const normalized = href !== '/' ? href.replace(/\/+$/, '') : '/';
    if (!routes.has(normalized)) errors.push(tag(`lien interne cassé : ${href}`));
  }
}

// --- Verifications globales ---
if (!routes.has('/404')) warnings.push('global — page 404 personnalisée absente');

const summary = {
  pages: pages.length,
  indexables: pages.filter((p) => !p.noindex).length,
  errors: errors.length,
  warnings: warnings.length,
};

const dedupe = (arr) => [...new Set(arr)];
const errs = dedupe(errors);
const warns = dedupe(warnings);

console.log('\n  AUDIT SEO');
console.log(`  ${summary.pages} pages analysées, ${summary.indexables} indexables.\n`);

if (warns.length) {
  console.log(`  Avertissements (${warns.length}) :`);
  for (const w of warns) console.log(`   ! ${w}`);
  console.log('');
}
if (errs.length) {
  console.error(`  Erreurs (${errs.length}) :`);
  for (const e of errs) console.error(`   ✗ ${e}`);
  console.error('');
  process.exit(1);
}
console.log('  Aucune erreur bloquante.\n');
