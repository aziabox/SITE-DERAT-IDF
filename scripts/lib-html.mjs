/** Petits utilitaires de lecture du HTML produit, sans dependance externe. */
import { readdir, readFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

export const DIST = new URL('../dist/', import.meta.url).pathname;

export async function walkHtml(dir = DIST) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walkHtml(full)));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

export function routeOf(file) {
  const rel = relative(DIST, file).split(sep).join('/');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return '/' + rel.slice(0, -'/index.html'.length);
  return '/' + rel.replace(/\.html$/, '');
}

export function isRedirect(html) {
  return /http-equiv\s*=\s*["']refresh["']/i.test(html);
}

export function isNoindex(html) {
  return /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html);
}

export function attr(html, re) {
  return html.match(re)?.[1];
}

export function textOfMain(html) {
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? html;
  return main
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;|&#160;/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function normalizeWords(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9 ]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

export async function loadPages() {
  const files = await walkHtml();
  const pages = [];
  for (const file of files) {
    const html = await readFile(file, 'utf8');
    if (isRedirect(html)) continue;
    pages.push({
      file,
      route: routeOf(file),
      html,
      noindex: isNoindex(html),
    });
  }
  return pages.sort((a, b) => a.route.localeCompare(b.route));
}
