#!/usr/bin/env node
/**
 * Genere dist/sitemap.xml a partir des pages reellement construites.
 *
 * Principe : on lit le <link rel="canonical"> de chaque page produite, ce qui
 * garantit que le sitemap et les canonicals ne peuvent pas diverger.
 * Les pages en noindex et les redirections sont exclues.
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

const files = await walk(DIST);
const entries = [];
let skippedNoindex = 0;
let skippedRedirect = 0;

for (const file of files) {
  const html = await readFile(file, 'utf8');

  if (/http-equiv\s*=\s*["']refresh["']/i.test(html)) {
    skippedRedirect++;
    continue;
  }
  if (/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html)) {
    skippedNoindex++;
    continue;
  }

  const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1];
  if (!canonical) {
    console.warn(`  [sitemap] Canonical absent, page ignoree : ${relative(DIST, file)}`);
    continue;
  }

  // dateModified des articles, lu dans le JSON-LD (jamais invente).
  let lastmod;
  const ld = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (ld) {
    try {
      const graph = JSON.parse(ld[1])['@graph'] ?? [];
      const article = graph.find((n) => n['@type'] === 'Article');
      if (article?.dateModified) lastmod = String(article.dateModified).slice(0, 10);
    } catch {
      /* JSON-LD illisible : on n'emet simplement pas de lastmod */
    }
  }

  entries.push({ loc: canonical, lastmod });
}

entries.sort((a, b) => a.loc.localeCompare(b.loc));

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) =>
      `  <url>\n    <loc>${e.loc}</loc>${e.lastmod ? `\n    <lastmod>${e.lastmod}</lastmod>` : ''}\n  </url>`
  )
  .join('\n')}
</urlset>
`;

await writeFile(join(DIST, 'sitemap.xml'), xml, 'utf8');
console.log(
  `  [sitemap] ${entries.length} URL ecrites (${skippedNoindex} noindex, ${skippedRedirect} redirections exclues).`
);
