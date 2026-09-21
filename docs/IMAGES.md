# Photographies : cahier des charges

Le site est **volontairement livré sans photographie**. L'identité visuelle
repose sur la typographie, les filets et les bandes de couleur, ce qui garantit
un rendu cohérent et des pages à ~16 Ko.

Deux raisons à ce choix :

1. **Aucune image générée artificiellement ni banque d'images générique.** Le
   brief l'exclut, et une photo manifestement issue d'une banque dessert la
   crédibilité d'une entreprise d'intervention.
2. **Le site doit rester crédible aujourd'hui.** Mieux vaut pas de photo qu'une
   photo qui ne représente pas l'entreprise.

Quand de vraies photographies seront disponibles, il suffit de les déposer et
d'appeler le composant décrit plus bas.

---

## Règles générales

| Critère | Exigence |
| --- | --- |
| Format | AVIF + WebP, avec repli JPEG |
| Largeurs à générer | 480, 800, 1200, 1600 px |
| Poids cible | < 120 Ko pour le hero, < 60 Ko pour les autres |
| Ratio | 4/3 ou 3/2, recadrage sûr au centre |
| `loading` | `eager` + `fetchpriority="high"` pour le hero, `lazy` partout ailleurs |
| `width` / `height` | Toujours renseignés (évite le décalage de mise en page) |
| Nom de fichier | Descriptif, en minuscules, sans bourrage de mots-clés |

### Nommage

Bon : `deratisation-technicien-inspection-cave.webp`
Mauvais : `deratisation-rat-paris-deratisation-paris-rat-traitement.webp`

### Texte alternatif

Le `alt` décrit **ce que montre l'image**, en une phrase naturelle. Il ne
répète pas le mot-clé de la page.

Bon : « Inspection d'une cave lors d'une intervention de dératisation »
Mauvais : « dératisation rat paris dératisation cave rat »

Une image purement décorative reçoit `alt=""`.

---

## Emplacements prévus

| Page | Fichier attendu | Sujet | Alt proposé |
| --- | --- | --- | --- |
| Accueil (hero) | `deratisation-technicien-intervention-idf.webp` | Technicien en intervention, équipement professionnel, contexte urbain francilien | Technicien en intervention de dératisation dans un immeuble d'Île-de-France |
| `/deratisation` | `deratisation-inspection-sous-sol.webp` | Inspection d'un sous-sol, lampe, relevé | Inspection d'un sous-sol lors d'un diagnostic de dératisation |
| `/deratisation-rats` | `traces-rongeurs-cave-immeuble.webp` | Traces réelles : coulée grasse, grignotage sur bas de porte | Traces de passage de rongeurs le long d'une plinthe de cave |
| `/deratisation-souris` | `points-entree-souris-cuisine.webp` | Traversée de canalisation sous évier non obturée | Traversée de canalisation non obturée sous un évier de cuisine |
| `/traitement-rats` | `poste-appatage-securise-sous-sol.webp` | Poste d'appâtage fermé, verrouillé, repéré | Poste d'appâtage sécurisé et repéré installé en sous-sol |
| `/prevention-rongeurs` | `obturation-grillage-metallique-ventilation.webp` | Ventilation basse fermée au grillage métallique | Ventilation basse sécurisée par un grillage métallique fixé |
| `/inspection-rongeurs` | `recherche-points-entree-pied-facade.webp` | Examen du pied de façade | Recherche de points d'entrée en pied de façade |
| `/deratisation-coproprietes` | `local-poubelles-copropriete.webp` | Local déchets d'immeuble, bacs fermés | Local poubelles d'une copropriété avec bacs fermés |
| `/deratisation-restaurants` | `intervention-cuisine-professionnelle.webp` | Cuisine professionnelle hors service | Intervention en cuisine professionnelle en dehors du service |
| `/deratisation-entreprises` | `controle-entrepot-quai-livraison.webp` | Quai de livraison, points de contrôle | Contrôle des accès sur un quai de livraison d'entrepôt |

## Ce qu'il ne faut pas utiliser

- Rat en gros plan cadré pour choquer, rat de dessin animé, rat surdimensionné.
- Photographie manifestement générée artificiellement.
- Tout autre nuisible : punaise, blatte, guêpe, frelon, chenille. Sur les pages
  rats et souris, c'est disqualifiant.
- Mise en scène anxiogène ou humour sur le sujet.

---

## Intégration

Ajouter un composant `src/components/Figure.astro` sur ce modèle :

```astro
---
interface Props {
  src: string;        // "deratisation-technicien-intervention-idf"
  alt: string;
  caption?: string;
  priority?: boolean;
}
const { src, alt, caption, priority = false } = Astro.props;
---
<figure>
  <picture>
    <source
      type="image/avif"
      srcset={`/img/${src}-480.avif 480w, /img/${src}-800.avif 800w, /img/${src}-1200.avif 1200w, /img/${src}-1600.avif 1600w`}
      sizes="(min-width: 62rem) 640px, 100vw"
    />
    <source
      type="image/webp"
      srcset={`/img/${src}-480.webp 480w, /img/${src}-800.webp 800w, /img/${src}-1200.webp 1200w, /img/${src}-1600.webp 1600w`}
      sizes="(min-width: 62rem) 640px, 100vw"
    />
    <img
      src={`/img/${src}-800.webp`}
      alt={alt}
      width="1200"
      height="900"
      loading={priority ? 'eager' : 'lazy'}
      fetchpriority={priority ? 'high' : 'auto'}
      decoding="async"
    />
  </picture>
  {caption && <figcaption>{caption}</figcaption>}
</figure>
```

L'audit SEO (`npm run audit:seo`) échoue sur toute image sans `alt` et avertit
sur toute image sans attribut `loading`.

---

## Image Open Graph

`public/og/og-deratisation-ile-de-france.png` (1200 × 630) est **généré** par
`scripts/build-og.mjs` à chaque build, à partir d'un SVG. Pour modifier le
visuel de partage, éditer ce script — pas le PNG.
