# Sources

This file records what is verified and what is not.

## What is verified

### Gauteng extent

Wikidata item Q133083 lists extreme points:

- Northernmost: 25°6′34.60″S, 28°44′40.49″E → -25.109611, 28.744581
- Southernmost: 26°55′25.75″S, 28°13′35.40″E → -26.923819, 28.226500
- Westernmost: 26°31′27.48″S, 27°9′22.82″E → -26.524300, 27.156339
- Easternmost: 25°32′15.83″S, 29°5′54.31″E → -25.537731, 29.098419

Source: https://www.wikidata.org/wiki/Q133083

The app uses the axis-aligned bounding box of those extremes. That box is larger than the official cadastral polygon and is not a substitute for municipal boundary shapefiles.

Wikipedia also gives a coarse provincial coordinate of 26°S 28°E. That pair is the local projection origin used to convert lon/lat into metres.

- https://en.wikipedia.org/wiki/Gauteng
- https://www.wikidata.org/wiki/Q133083

### Place markers

Place markers are 2D points only. They are not building footprints.

| Place | Lat | Lon | Source note |
| --- | --- | --- | --- |
| Johannesburg | -26.20227 | 28.04363 | GeoNames-derived published city point |
| Pretoria / Tshwane | -25.74486 | 28.18783 | GeoNames Pretoria |
| Soweto | -26.26781 | 27.85849 | GeoNames Soweto |
| Sandton | -26.10389 | 28.05389 | GeoNames Sandton 26°6′14″S 28°3′14″E |
| Midrand | -25.98953 | 28.12843 | GeoNames-derived published city point |
| Centurion | -25.85891 | 28.18577 | GeoNames-derived published city point |
| OR Tambo / Kempton Park | -26.13348 | 28.23606 | GeoNames 993986, O.R. Tambo International Airport |
| Benoni | -26.18848 | 28.32078 | GeoNames-derived published city point |
| Boksburg | -26.21197 | 28.25958 | GeoNames-derived published city point |
| Germiston | -26.21667 | 28.16667 | Coarse published city point |
| Randburg | -26.0936 | 28.0064 | Rounded published city point |
| Roodepoort | -26.1625 | 27.8725 | GeoNames-derived published city point |
| Krugersdorp | -26.08577 | 27.77515 | GeoNames-derived published city point |
| Vereeniging | -26.67313 | 27.92615 | GeoNames-derived published city point |
| Vanderbijlpark | -26.71171 | 27.83795 | GeoNames-derived published city point |

GeoNames data is generally CC-BY. Attribution: GeoNames (https://www.geonames.org/).

## What is not verified terrain

There is no DEM in this repository.

The mesh height function is a labeled **Synthetic Gauteng Preview**:

- Highveld baseline around 1 500 m
- A ridge band near the Witwatersrand latitude
- A second ridge band north of Pretoria
- A southern dip toward the Vaal
- Lightweight rolling noise

Those heights are not SRTM, not NGI, not Stats SA, and not survey data. The HUD altitude is the synthetic surface plus clearance, not real AMSL.

## Preferred next data sources

Do not invent a new coordinate set. Use one of these if a real-data pass is added:

1. Municipal / provincial boundary: Municipal Demarcation Board or SADB / Stats SA GIS, or OSM relation for Gauteng with license attribution.
2. Elevation: NASA SRTM / Copernicus DEM with license check, processed by `scripts/` and kept out of git unless Git LFS is configured.
3. Place points: GeoNames dump or OSM Nominatim / Overpass, stored as generated JSON with source timestamps.

## Projection

Equirectangular metres around origin (-26, 28):

- 1° latitude = 111 320 m
- 1° longitude = 111 320 m * cos(origin latitude)

This is accurate enough for a low-poly preview over one province. It is not a Transverse Mercator / Hartebeesthoek94 survey grid.
