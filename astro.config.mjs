import { defineConfig } from 'astro/config';

// Domaine de production. A remplacer par le domaine reel avant mise en ligne.
// Utilise pour : canonical, Open Graph, sitemap.xml, robots.txt, JSON-LD.
const SITE = process.env.SITE_URL || 'https://www.deratisation-iledefrance.fr';

export default defineConfig({
  site: SITE,
  trailingSlash: 'ignore',
  build: {
    inlineStylesheets: 'always', // 1 seule feuille, inlinee : pas de requete CSS bloquante
    format: 'directory',
  },
  compressHTML: true,

  /**
   * Redirections 301.
   * /zones-intervention/paris existe dans l'arborescence attendue mais ferait
   * doublon avec /deratisation-paris, page reellement editorialisee sur Paris.
   * On redirige plutot que de publier deux pages sur le meme sujet.
   */
  redirects: {
    '/zones-intervention/paris': { status: 301, destination: '/deratisation-paris' },
    '/deratisation-ile-de-france': { status: 301, destination: '/deratisation' },
    '/deratiseur': { status: 301, destination: '/deratisation' },
    '/blog/index': { status: 301, destination: '/blog' },
  },
  prefetch: false,
  devToolbar: { enabled: false },
  markdown: {
    shikiConfig: { theme: 'github-light' },
  },
});
