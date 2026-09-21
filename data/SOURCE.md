# Source des données géographiques

`departements-ile-de-france.geojson` — contours des 8 départements d'Île-de-France.

- **Source** : [france-geojson](https://github.com/gregoiredavid/france-geojson) (Grégoire David)
- **Origine des données** : découpage administratif issu des données ouvertes de l'IGN
- **Licence** : Licence Ouverte / Open Licence (Etalab)

Ce fichier n'est pas servi au navigateur. Il est converti au moment du build
par `scripts/build-map.mjs`, qui produit `src/data/idf-map.ts` :
projection, simplification de Douglas-Peucker et calcul du point d'ancrage
des étiquettes.

Pour régénérer après mise à jour de la source :

```bash
npm run build:map
```
