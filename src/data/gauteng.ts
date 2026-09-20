export type LonLat = {
  lat: number;
  lon: number;
};

/**
 * Axis-aligned extent from Wikidata Q133083 extreme points.
 * This is a bounding box around the extremes, not the official cadastral polygon.
 */
export const GAUTENG_EXTENT = {
  latMin: -26.923819,
  latMax: -25.109611,
  lonMin: 27.156339,
  lonMax: 29.098419,
} as const;

export const PROJECTION_ORIGIN: LonLat = {
  lat: -26.0,
  lon: 28.0,
};

export const METERS_PER_DEG_LAT = 111_320;
export const EARTH_RADIUS_M = 6_371_000;

export function metersPerDegLon(latDeg: number): number {
  return METERS_PER_DEG_LAT * Math.cos((latDeg * Math.PI) / 180);
}

export function lonLatToLocal(lat: number, lon: number): { x: number; z: number } {
  const x = (lon - PROJECTION_ORIGIN.lon) * metersPerDegLon(PROJECTION_ORIGIN.lat);
  const z = (PROJECTION_ORIGIN.lat - lat) * METERS_PER_DEG_LAT;
  return { x, z };
}

export function localToLonLat(x: number, z: number): LonLat {
  const lon = PROJECTION_ORIGIN.lon + x / metersPerDegLon(PROJECTION_ORIGIN.lat);
  const lat = PROJECTION_ORIGIN.lat - z / METERS_PER_DEG_LAT;
  return { lat, lon };
}

export function headingDegFromForward(fx: number, fz: number): number {
  const rad = Math.atan2(fx, -fz);
  return (rad * 180) / Math.PI;
}

export function wrapDeg(value: number): number {
  const wrapped = ((value % 360) + 360) % 360;
  return wrapped;
}

export const TERRAIN_BOUNDS = (() => {
  const sw = lonLatToLocal(GAUTENG_EXTENT.latMin, GAUTENG_EXTENT.lonMin);
  const ne = lonLatToLocal(GAUTENG_EXTENT.latMax, GAUTENG_EXTENT.lonMax);
  const minX = Math.min(sw.x, ne.x);
  const maxX = Math.max(sw.x, ne.x);
  const minZ = Math.min(sw.z, ne.z);
  const maxZ = Math.max(sw.z, ne.z);
  return { minX, maxX, minZ, maxZ, width: maxX - minX, depth: maxZ - minZ };
})();
