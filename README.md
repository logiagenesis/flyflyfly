# flyflyfly

Browser low-poly flight over a **Synthetic Gauteng Preview**.

The map area is Gauteng, South Africa. Place markers use published coordinates. Terrain height is not real DEM data.

Repo: https://github.com/logiagenesis/flyflyfly

## Run

```bash
npm install
npm test
npm run build
npm run dev
```

Open the local Vite URL, click the canvas, fly.

## Controls

- Click: mouse look
- W / S: thrust / brake
- A / D: yaw
- Space / Ctrl: climb / descend
- Shift: boost
- F: wireframe
- L: day / night
- H: help

Units are metric.

## What is real vs preview

Verified:

- Gauteng axis-aligned extent from Wikidata Q133083 extremes
- Place marker lon/lat listed in `data/SOURCES.md`

Not verified:

- Mesh elevation
- Ridge placement as cartography
- City marker elevations

The in-app mode label is `SYNTHETIC GAUTENG PREVIEW` until a DEM pipeline exists.

## Attribution

- GeoNames place points: https://www.geonames.org/
- Wikidata Gauteng extremes: https://www.wikidata.org/wiki/Q133083

## Deploy

`npm run build` writes static files to `dist/`. Host that folder on any static host. `base` is `./` so relative paths work on project pages or a subdomain.
