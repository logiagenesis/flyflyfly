import { GAUTENG_EXTENT, TERRAIN_BOUNDS, localToLonLat } from "../data/gauteng";

export const GRID = 160;

/**
 * Synthetic Highveld-inspired height in metres AMSL.
 * Not a DEM. Do not treat values as surveyed elevation.
 */
export function syntheticHeight(lat: number, lon: number): number {
  const nx = (lon - GAUTENG_EXTENT.lonMin) / (GAUTENG_EXTENT.lonMax - GAUTENG_EXTENT.lonMin);
  const ny = (lat - GAUTENG_EXTENT.latMin) / (GAUTENG_EXTENT.latMax - GAUTENG_EXTENT.latMin);

  const highveld = 1500;
  const witwatersrand = 210 * Math.exp(-Math.pow((lat + 26.18) / 0.12, 2));
  const magalies = 160 * Math.exp(-Math.pow((lat + 25.82) / 0.1, 2)) * (1 - Math.abs(lon - 27.85) / 1.4);
  const suikerbos = 90 * Math.exp(-Math.pow((lat + 26.5) / 0.16, 2) - Math.pow((lon - 28.23) / 0.22, 2));
  const vaalDip = -80 * Math.exp(-Math.pow((lat + 26.75) / 0.18, 2));
  const rolling =
    28 * Math.sin(nx * 18.7) * Math.cos(ny * 14.2) +
    16 * Math.sin(nx * 41.0 + ny * 9.0) +
    10 * Math.cos(ny * 33.0);

  return highveld + witwatersrand + magalies + suikerbos + vaalDip + rolling;
}

export function heightAtLocal(x: number, z: number): number {
  const { lat, lon } = localToLonLat(x, z);
  return syntheticHeight(lat, lon);
}

export function sampleHeightBilinear(x: number, z: number): number {
  const { minX, minZ, width, depth } = TERRAIN_BOUNDS;
  const u = (x - minX) / width;
  const v = (z - minZ) / depth;
  const clampedU = Math.min(1, Math.max(0, u));
  const clampedV = Math.min(1, Math.max(0, v));
  const fx = clampedU * (GRID - 1);
  const fz = clampedV * (GRID - 1);
  const x0 = Math.floor(fx);
  const z0 = Math.floor(fz);
  const x1 = Math.min(GRID - 1, x0 + 1);
  const z1 = Math.min(GRID - 1, z0 + 1);
  const tx = fx - x0;
  const tz = fz - z0;
  const h00 = heightAtIndex(x0, z0);
  const h10 = heightAtIndex(x1, z0);
  const h01 = heightAtIndex(x0, z1);
  const h11 = heightAtIndex(x1, z1);
  const hx0 = h00 * (1 - tx) + h10 * tx;
  const hx1 = h01 * (1 - tx) + h11 * tx;
  return hx0 * (1 - tz) + hx1 * tz;
}

const cache: number[][] = [];

export function heightAtIndex(ix: number, iz: number): number {
  if (!cache[iz]) cache[iz] = [];
  if (cache[iz][ix] !== undefined) return cache[iz][ix];
  const x = TERRAIN_BOUNDS.minX + (ix / (GRID - 1)) * TERRAIN_BOUNDS.width;
  const z = TERRAIN_BOUNDS.minZ + (iz / (GRID - 1)) * TERRAIN_BOUNDS.depth;
  const h = heightAtLocal(x, z);
  cache[iz][ix] = h;
  return h;
}

export function heightColor(heightM: number): [number, number, number] {
  const t = Math.min(1, Math.max(0, (heightM - 1400) / 450));
  if (t < 0.28) {
    return lerpColor([0.28, 0.42, 0.27], [0.45, 0.48, 0.3], t / 0.28);
  }
  if (t < 0.62) {
    return lerpColor([0.45, 0.48, 0.3], [0.62, 0.52, 0.34], (t - 0.28) / 0.34);
  }
  return lerpColor([0.62, 0.52, 0.34], [0.78, 0.7, 0.56], (t - 0.62) / 0.38);
}

function lerpColor(a: [number, number, number], b: [number, number, number], t: number): [number, number, number] {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}
