import { lonLatToLocal } from "./gauteng";

export type Place = {
  id: string;
  name: string;
  lat: number;
  lon: number;
  source: string;
};

export const PLACES: Place[] = [
  {
    id: "jhb",
    name: "Johannesburg",
    lat: -26.20227,
    lon: 28.04363,
    source: "GeoNames / commonly published city point",
  },
  {
    id: "pta",
    name: "Pretoria / Tshwane",
    lat: -25.74486,
    lon: 28.18783,
    source: "GeoNames Pretoria",
  },
  {
    id: "soweto",
    name: "Soweto",
    lat: -26.26781,
    lon: 27.85849,
    source: "GeoNames Soweto",
  },
  {
    id: "sandton",
    name: "Sandton",
    lat: -26.10389,
    lon: 28.05389,
    source: "GeoNames Sandton 26°6′14″S 28°3′14″E",
  },
  {
    id: "midrand",
    name: "Midrand",
    lat: -25.98953,
    lon: 28.12843,
    source: "Published city point (GeoNames-derived tables)",
  },
  {
    id: "centurion",
    name: "Centurion",
    lat: -25.85891,
    lon: 28.18577,
    source: "Published city point (GeoNames-derived tables)",
  },
  {
    id: "ortambo",
    name: "OR Tambo / Kempton Park",
    lat: -26.13348,
    lon: 28.23606,
    source: "GeoNames 993986 O.R. Tambo International Airport",
  },
  {
    id: "benoni",
    name: "Benoni",
    lat: -26.18848,
    lon: 28.32078,
    source: "Published city point (GeoNames-derived tables)",
  },
  {
    id: "boksburg",
    name: "Boksburg",
    lat: -26.21197,
    lon: 28.25958,
    source: "Published city point (GeoNames-derived tables)",
  },
  {
    id: "germiston",
    name: "Germiston",
    lat: -26.21667,
    lon: 28.16667,
    source: "Coarse published city point; treat as approximate",
  },
  {
    id: "randburg",
    name: "Randburg",
    lat: -26.0936,
    lon: 28.0064,
    source: "Published city point (rounded tables)",
  },
  {
    id: "roodepoort",
    name: "Roodepoort",
    lat: -26.1625,
    lon: 27.8725,
    source: "Published city point (GeoNames-derived tables)",
  },
  {
    id: "krugersdorp",
    name: "Krugersdorp",
    lat: -26.08577,
    lon: 27.77515,
    source: "Published city point (GeoNames-derived tables)",
  },
  {
    id: "vereeniging",
    name: "Vereeniging",
    lat: -26.67313,
    lon: 27.92615,
    source: "Published city point (GeoNames-derived tables)",
  },
  {
    id: "vanderbijlpark",
    name: "Vanderbijlpark",
    lat: -26.71171,
    lon: 27.83795,
    source: "Published city point (GeoNames-derived tables)",
  },
];

export function placesInLocal(): Array<Place & { x: number; z: number }> {
  return PLACES.map((place) => {
    const { x, z } = lonLatToLocal(place.lat, place.lon);
    return { ...place, x, z };
  });
}
