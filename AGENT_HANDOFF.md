# Agent handoff

## Latest pushed commit

`64664c96fcbc959ce4cf2e86bb6098b8f59c8341` on `origin/main` before this docs commit. Read HEAD after pull.

## What changed

Empty repo initialized with the playable core:

- Vite + TypeScript + Three.js
- Synthetic Gauteng preview terrain
- Verified place markers
- Mouse look, thrust, climb/descend, boost
- Ground collision
- HUD (altitude, AGL, speed km/h, heading, mode, FPS)
- Wireframe toggle
- Day/night toggle
- GitHub Actions build + test
- Source notes in `data/SOURCES.md`

## What works

- `npm test` — 5 projection tests passed
- `npm run build` — `tsc --noEmit && vite build` passed

## What is incomplete

- No real DEM / official boundary polygon
- Germiston and Randburg points are coarser than GeoNames IDs used for OR Tambo / Soweto / Pretoria
- No GitHub Pages deploy job yet
- No aircraft mesh

## Commands run

```bash
npm install
npm test
npm run build
```

## Recommended next task

Add a `scripts/` pipeline that downloads a license-checked DEM and Gauteng polygon, converts them to a compact heightfield, and keeps raw rasters out of git.
