#!/usr/bin/env node
/**
 * Garde-fou exécuté avant chaque build.
 * Objectif : empêcher la mise en ligne d'informations manquantes ou inventées.
 */
import { readFileSync } from 'node:fs';

const src = readFileSync(new URL('../src/data/site.ts', import.meta.url), 'utf8');
const errors = [];
const warnings = [];

const PLACEHOLDERS = [/\bXX\b/, /À REMPLACER/i, /lorem/i, /0{6,}/, /01 23 45 67 89/];

const phone = src.match(/phone:\s*'([^']+)'/)?.[1];
if (!phone) errors.push('site.phone est absent.');
else if (!/^\+33\d{9}$/.test(phone)) errors.push(`site.phone doit être au format E.164 (+33XXXXXXXXX). Reçu : ${phone}`);

const phoneDisplay = src.match(/phoneDisplay:\s*'([^']+)'/)?.[1];
if (!phoneDisplay) errors.push('site.phoneDisplay est absent.');

for (const re of PLACEHOLDERS) {
  if (re.test(src)) errors.push(`Valeur factice détectée dans site.ts (motif ${re}).`);
}

// Interdits absolus : preuves d'autorité non vérifiables.
const FORBIDDEN = [
  ['aggregateRating', 'note/avis agrégés'],
  ['reviewCount', 'nombre d’avis'],
  ['ratingValue', 'note'],
  ['priceRange', 'fourchette de prix'],
  ['foundingDate', 'ancienneté'],
];
const seoSrc = readFileSync(new URL('../src/lib/seo.ts', import.meta.url), 'utf8');
for (const [needle, label] of FORBIDDEN) {
  if (seoSrc.includes(`${needle}:`)) errors.push(`Donnée structurée interdite sans source réelle : ${label} (${needle}).`);
}

if (!/formEndpoint:\s*process\.env\.FORM_ENDPOINT/.test(src)) {
  warnings.push('site.formEndpoint devrait être piloté par la variable FORM_ENDPOINT.');
}
if (!process.env.FORM_ENDPOINT) {
  warnings.push('FORM_ENDPOINT non défini : le formulaire n’enverra rien. À brancher avant mise en ligne.');
}
if (/email:\s*null/.test(src)) {
  warnings.push('site.email est vide : le bloc contact n’affichera pas d’e-mail.');
}
if (/address:\s*null/.test(src)) {
  warnings.push('site.address est null : aucun schéma LocalBusiness avec adresse ne sera émis (comportement voulu tant qu’aucun établissement réel n’est déclaré).');
}
if (!process.env.SITE_URL) {
  warnings.push('SITE_URL non défini : le domaine par défaut d’astro.config.mjs est utilisé pour les canonicals.');
}

for (const w of warnings) console.warn(`  [config] ${w}`);
if (errors.length) {
  console.error('\n  Build interrompu — configuration invalide :');
  for (const e of errors) console.error(`   ✗ ${e}`);
  console.error('');
  process.exit(1);
}
console.log('  [config] Vérifications OK.');
