import { describe, expect, it } from "vitest";
import {
  GAUTENG_EXTENT,
  TERRAIN_BOUNDS,
  localToLonLat,
  lonLatToLocal,
  wrapDeg,
} from "./gauteng";

describe("gauteng projection", () => {
  it("round-trips the projection origin", () => {
    const local = lonLatToLocal(-26, 28);
    expect(local.x).toBeCloseTo(0, 6);
    expect(local.z).toBeCloseTo(0, 6);
    const geo = localToLonLat(0, 0);
    expect(geo.lat).toBeCloseTo(-26, 8);
    expect(geo.lon).toBeCloseTo(28, 8);
  });

  it("places Johannesburg east and slightly south of the origin", () => {
    const jhb = lonLatToLocal(-26.20227, 28.04363);
    expect(jhb.x).toBeGreaterThan(0);
    expect(jhb.z).toBeGreaterThan(0);
  });

  it("keeps Pretoria north of Johannesburg in local Z", () => {
    const jhb = lonLatToLocal(-26.20227, 28.04363);
    const pta = lonLatToLocal(-25.74486, 28.18783);
    expect(pta.z).toBeLessThan(jhb.z);
  });

  it("builds a terrain box that contains the Wikidata extremes AABB", () => {
    const sw = lonLatToLocal(GAUTENG_EXTENT.latMin, GAUTENG_EXTENT.lonMin);
    const ne = lonLatToLocal(GAUTENG_EXTENT.latMax, GAUTENG_EXTENT.lonMax);
    expect(sw.x).toBeGreaterThanOrEqual(TERRAIN_BOUNDS.minX - 1);
    expect(ne.x).toBeLessThanOrEqual(TERRAIN_BOUNDS.maxX + 1);
    expect(TERRAIN_BOUNDS.width).toBeGreaterThan(150_000);
    expect(TERRAIN_BOUNDS.depth).toBeGreaterThan(150_000);
  });

  it("wraps headings into 0-360", () => {
    expect(wrapDeg(-10)).toBeCloseTo(350);
    expect(wrapDeg(370)).toBeCloseTo(10);
  });
});
