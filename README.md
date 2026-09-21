# Dératisation Île-de-France — site de marque

Site statique spécialisé dans la **dératisation des rats et des souris en
Île-de-France**. Construit avec Astro, sans JavaScript côté client, sans
dépendance de design, avec une chaîne d'audit SEO et anti-duplication
exécutable en une commande.

---

## Démarrage

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # vérifie la config, génère l'OG, construit, écrit le sitemap
npm run build:map  # régénère les tracés SVG de la carte depuis le GeoJSON
npm run preview
npm run audit      # build + audit SEO + audit anti-duplication
```

### Variables d'environnement

Copier `.env.example` en `.env` :

| Variable | Rôle | Obligatoire |
| --- | --- | --- |
| `SITE_URL` | Domaine de production (canonicals, OG, sitemap, JSON-LD) | Avant mise en ligne |
| `FORM_ENDPOINT` | Endpoint de réception du formulaire de contact | Avant mise en ligne |

Sans `FORM_ENDPOINT`, le formulaire est rendu et validé côté navigateur mais
**ne transmet rien** : il renvoie vers `/contact/merci`. Le script
`check-config` le signale à chaque build.

---

## Identité légale et éléments à compléter

Tout est centralisé dans **`src/data/site.ts`**. Le principe du projet est
qu'aucune information commerciale n'est inventée : les champs à `null` ne sont
ni affichés, ni envoyés dans les données structurées.

### Renseigné

| Champ | Valeur |
| --- | --- |
| `legalName` / `legalForm` | Bilal ASSOUL — Entrepreneur individuel (EI) |
| `brand` | Dératisation Île-de-France (nom commercial) |
| `phone` | 07 56 82 27 85 |
| `legalAddress` | 1 rue Albert Simonin, 92400 Courbevoie |
| `siren` / `siret` | 901 133 041 / 901 133 041 00011 |
| `rcs` | 901 133 041 R.C.S. Nanterre, inscrit le 07/07/2021 |
| `naf` | 81.29A — Désinfection, désinsectisation, dératisation |
| `directeurPublication` | Bilal ASSOUL |
| `host` | Hostinger International Ltd, Larnaca (Chypre) |

### Reste à compléter

| Champ | Conséquence tant qu'il est vide | Bloquant |
| --- | --- | --- |
| `email` | Aucune adresse de contact publiée pour l'exercice des droits RGPD ; la politique de confidentialité renvoie au téléphone et au courrier | Non |
| `mediator` | Les mentions légales signalent l'absence de médiateur. **L'adhésion à un dispositif de médiation est obligatoire** pour un professionnel intervenant chez des particuliers (art. L.616-1 du code de la consommation) | Non, mais à régulariser |
| `vatNumber` | Aucune ligne TVA publiée. À renseigner uniquement si l'entreprise devient assujettie ; en franchise en base, laisser `null` | Non |
| `certifications` | Aucune certification affichée. Y placer le numéro Certibiocide s'il est détenu | Non |
| `FORM_ENDPOINT` | Le formulaire est rendu et validé mais ne transmet rien | Oui, avant mise en ligne |
| `SITE_URL` | Le domaine par défaut d'`astro.config.mjs` sert aux canonicals | Oui, avant mise en ligne |

`scripts/check-config.mjs` **interrompt le build** si une mention obligatoire de
l'article 6 III de la LCEN manque (éditeur, SIRET, siège, directeur de la
publication, hébergeur) et signale les points ci-dessus en avertissement.

### Deux adresses, deux usages

- `legalAddress` — le siège social. Publié **uniquement** dans les mentions
  légales, où la loi l'impose.
- `publicAddress` — un établissement recevant du public. C'est le seul cas où
  une adresse postale est émise en JSON-LD. Il est à `null` ici : l'activité se
  rend chez le client, et déclarer le siège comme un point d'accueil induirait
  les moteurs en erreur. Le service est décrit par `areaServed`.

### Avis clients

Aucun avis n'est publié. L'emplacement est prêt : dès que des avis réels
existent, ils peuvent être ajoutés — et à ce moment-là seulement, le schéma
correspondant pourra être émis. **Ne jamais créer d'avis fictifs** : le script
d'audit échoue si une propriété de notation apparaît dans le JSON-LD.

---

## Architecture

```
/                                   Accueil
/deratisation                       Page pilier du service
/deratisation-rats                  Identification et traitement du rat brun
/deratisation-souris                Identification et traitement de la souris
/traitement-rats                    Méthodes : piégeage, appâtage, obturation
/traitement-souris                  Méthodes : couverture, densité, obturation
/infestation-rats                   Présence installée, périmètre, phasage
/infestation-souris                 Foyers multiples, cartographie
/inspection-rongeurs                Diagnostic et recherche des points d'entrée
/prevention-rongeurs                Accès, ressources, surveillance

/deratisation-particuliers          Logements
/deratisation-coproprietes          Parties communes, syndics
/deratisation-entreprises           Bureaux, locaux, entrepôts (#bureaux #locaux #entrepots)
/deratisation-commerces             Alimentaire et non alimentaire
/deratisation-restaurants           Métiers de bouche, PMS

/zones-intervention                 Hub régional
/zones-intervention/hauts-de-seine        (92)
/zones-intervention/seine-saint-denis     (93)
/zones-intervention/val-de-marne          (94)
/zones-intervention/val-doise             (95)
/zones-intervention/yvelines              (78)
/zones-intervention/essonne               (91)
/zones-intervention/seine-et-marne        (77)
/zones-intervention/paris           → 301 vers /deratisation-paris

/deratisation-paris                 Hub Paris
/deratisation-paris/1er-arrondissement
/deratisation-paris/10e-arrondissement
/deratisation-paris/11e-arrondissement
/deratisation-paris/13e-arrondissement
/deratisation-paris/18e-arrondissement
/deratisation-paris/19e-arrondissement

/deratisation-<commune>             12 pages communales
/blog                               Index
/blog/<categorie>                   7 catégories
/blog/<article>                     20 articles

/contact  /contact/merci  /mentions-legales
/politique-de-confidentialite  /plan-du-site  /404
```

### Pourquoi pas 20 arrondissements ni 100 communes

C'est une décision, pas un oubli. Le brief interdit les pages générées en
masse, et une page locale n'existe ici que si elle porte un contexte
réellement différent (typologie de bâti, activité dominante, contrainte
spécifique). Six arrondissements et douze communes ont ce niveau de
différenciation ; les autres seraient des variantes avec un nom changé.

L'audit anti-duplication le vérifie : **la similarité maximale entre deux
pages locales est de 0,075** (seuil d'alerte : 0,30).

Ajouter une commune : renseigner l'entrée dans `src/data/idf.ts`, puis écrire
la page `src/pages/deratisation-<slug>.astro`. Il n'existe volontairement
aucun gabarit générateur de pages locales.

---

## Stack et choix techniques

| Sujet | Choix | Raison |
| --- | --- | --- |
| Framework | Astro (sortie statique) | HTML pur, aucun runtime côté client |
| JavaScript livré | **0 Ko, 0 fichier** | Menu, FAQ et carte interactive sans script |
| CSS | Une feuille, inlinée dans le HTML | Aucune requête bloquante pour le rendu |
| Typographie | Manrope variable auto-hébergée (2 sous-ensembles, ~40 Ko) | Pas de requête tierce, pas de fuite de données |
| Images | Aucune image bitmap dans les pages | L'identité repose sur la typographie, les filets et la carte SVG |
| Poids page d'accueil | ~21 Ko gzip, carte comprise | — |

## Palette

Vert forêt profond, sauge, sable et terre cuite. L'accent terre cuite est
réservé aux appels à l'action, aux éléments d'urgence et aux détails
graphiques ; il n'est jamais employé en aplat large.

| Rôle | Token | Valeur | Contraste |
| --- | --- | --- | --- |
| Surfaces sombres | `--forest-950` / `--forest-900` / `--forest-700` | `#0e2621` `#12302a` `#1d4a3e` | blanc à 15,9 / 14,2 / 10,0:1 |
| Titres | `--forest-900` | `#12302a` | 14,2:1 sur blanc |
| Texte courant | `--ink` | `#1c2b26` | 14,8:1 sur blanc |
| Texte secondaire | `--stone-600` | `#59625c` | 6,3:1 sur blanc |
| Métadonnées | `--stone-400` | `#666f68` | 5,2:1 sur blanc |
| Liens, labels | `--sage-700` / `--sage-600` | `#276055` `#2f6355` | 7,3 / 6,9:1 |
| Boutons d'action | `--clay` / `--clay-600` | `#b0542c` `#9a4520` | blanc à 5,1 / 6,5:1 |
| Accent sur fond clair | `--clay-700` | `#8f4020` | 7,2:1 sur blanc |
| Accent sur fond sombre | `--clay-300` | `#e8a98a` | 7,1:1 sur vert 900 |
| Neutres chauds | `--sand` / `--sand-dim` / `--stone-200` | `#f7f4ed` `#efeade` `#d9d5cb` | fonds et filets |

Chaque valeur destinée à du texte porte son ratio en commentaire dans
`src/styles/global.css`. **Toute nouvelle couleur doit être vérifiée à 4,5:1
minimum sur son fond réel avant d'être ajoutée.**

La variante claire d'une bande s'écrit `band--sand` ; les règles pensées pour
les surfaces sombres sont portées par `.band:not(.band--sand)` afin de ne pas
s'y appliquer.

## Carte interactive de l'Île-de-France

`src/components/IdfMap.astro` affiche les huit départements en SVG. Elle est
présente sur l'accueil et sur `/zones-intervention`.

- **Zéro JavaScript.** Chaque département est un `<a>` SVG natif : cliquable,
  survolable et focalisable au clavier.
- **Carte et légende synchronisées** par `:has()` — survoler un département
  met en évidence sa ligne de légende, et réciproquement. Les règles sont
  générées par le composant à partir des données, et chargées uniquement sur
  les pages qui affichent la carte.
- **Accessible** : `<title>` et `<desc>` sur le SVG, `aria-label` par
  département, et la même liste disponible en texte dans la légende.
- **Données réelles** : contours IGN via france-geojson, Licence Ouverte
  (voir `data/SOURCE.md`). Aucun tracé dessiné à la main.

Le tracé est produit hors ligne par `scripts/build-map.mjs` : projection
équirectangulaire corrigée par `cos(latitude)`, simplification de
Douglas-Peucker, coordonnées entières et commandes relatives. 5 559 points
source deviennent 1 053 points, soit 7,8 Ko de données.

```bash
npm run build:map   # régénère src/data/idf-map.ts depuis le GeoJSON
```

Le fichier généré est versionné : le build normal n'a pas besoin du GeoJSON.

### Accessibilité

- Contrastes vérifiés : tous les couples texte/fond du design system sont au
  minimum à 4,5:1 (voir le tableau de palette ci-dessus).
- Navigation clavier complète, `:focus-visible` visible sur fond clair et
  sombre, lien d'évitement vers le contenu.
- Structure sémantique : un seul `<h1>` par page, hiérarchie de titres sans
  saut de niveau, `<main>`, `<nav aria-label>`, fil d'Ariane avec
  `aria-current`.
- `prefers-reduced-motion` respecté.

---

## Chaîne d'audit

```bash
npm run audit          # build + audit SEO + audit anti-duplication
npm run audit:seo
npm run audit:dup
```

### `scripts/audit-seo.mjs`

Analyse le site **construit** (pas les sources) et échoue sur :

- title, meta description, H1 absents ou dupliqués entre pages indexables ;
- plusieurs H1 sur une page ;
- canonical absent ou incohérent avec l'URL réelle ;
- JSON-LD absent, invalide, ou contenant une propriété d'autorité interdite ;
- image sans `alt` ;
- **lien interne cassé** (vérifié contre les fichiers réellement générés).

Il avertit sur : titles/descriptions hors plage de longueur, saut de niveau de
titre, page de moins de 300 mots, balise Open Graph manquante.

### `scripts/audit-duplication.mjs`

Matrice de contrôle anti-duplication. Similarité de Jaccard sur les
5-grammes de mots du contenu de `<main>` (header et footer exclus), pour
toutes les paires de pages indexables.

- Seuil d'alerte : 0,30 · Seuil bloquant : 0,50
- Rapport détaillé écrit dans `docs/anti-duplication.md`

### `scripts/build-map.mjs`

Convertit `data/departements-ile-de-france.geojson` en `src/data/idf-map.ts`.
À relancer uniquement si la source géographique change.

### `scripts/check-config.mjs`

Exécuté avant chaque build. Interrompt la construction si le numéro de
téléphone est absent ou mal formé, si un placeholder subsiste, ou si une
donnée structurée interdite apparaît dans `src/lib/seo.ts`.

---

## SEO

- **Canonicals** sans slash final (racine exceptée), générés depuis l'URL réelle.
- **`sitemap.xml`** généré après le build en lisant les canonicals des pages
  produites : sitemap et canonicals ne peuvent pas diverger. Les pages
  `noindex` et les redirections sont exclues. `lastmod` uniquement sur les
  articles, lu depuis le JSON-LD — jamais inventé.
- **`robots.txt`** servi par une route Astro, avec l'autorisation explicite des
  agents de moteurs génératifs et le lien vers le sitemap.
- **Données structurées** : un seul graphe JSON-LD par page
  (`ProfessionalService`, `WebSite`, `WebPage`, `BreadcrumbList`, `Service`,
  `FAQPage`, `Article`). Aucune propriété de notation, de prix ou d'ancienneté.
- **GEO** : chaque page de service et chaque article ouvre par un bloc
  « réponse directe » auto-suffisant, repris dans le champ `answer` du
  frontmatter des articles.
- **Redirections 301** : déclarées dans `astro.config.mjs` (pages de repli) et
  dans `public/_redirects` + `vercel.json` (vraies 301 côté serveur).

---

## Déploiement

Sortie statique dans `dist/`. Configurations fournies pour :

- **Netlify / Cloudflare Pages** : `public/_redirects`, `public/_headers`
- **Vercel** : `vercel.json` (`cleanUrls`, `trailingSlash: false`, redirections, en-têtes)

Commande de build : `npm run build` · Dossier publié : `dist`

Penser à définir `SITE_URL` et `FORM_ENDPOINT` dans les variables
d'environnement de la plateforme.

---

## Règles de contribution éditoriale

1. **Aucune information inventée** : ni avis, ni note, ni certification, ni
   prix, ni nombre d'interventions, ni années d'expérience, ni statistique
   locale d'infestation.
2. **Aucune page locale sans contenu spécifique.** Si la seule différence est
   le nom de la commune, la page ne doit pas exister.
3. **Une réponse directe en tête** de chaque page de service et de chaque
   article, avant tout développement.
4. **Pas d'ancres sur-optimisées.** Les liens internes utilisent des libellés
   naturels.
5. **Périmètre thématique strict** : rats, souris, mulots quand c'est
   pertinent. Pas d'insectes, pas de généraliste nuisibles.
6. `npm run audit` doit passer avant toute mise en ligne.
