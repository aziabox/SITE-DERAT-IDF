import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const origin = site?.origin ?? 'https://www.deratisation-iledefrance.fr';
  const body = `# robots.txt — ${origin}
User-agent: *
Allow: /

# Pages sans valeur pour l'indexation
Disallow: /contact/merci

# Assistants et moteurs generatifs : acces autorise au contenu editorial
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: ${origin}/sitemap.xml
`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
