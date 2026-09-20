# Data scripts

No processor is checked in yet.

When real terrain is added:

1. Download a license-checked DEM and Gauteng boundary outside git.
2. Convert to a compact heightfield or quantized mesh.
3. Write provenance into `data/SOURCES.md`.
4. Do not commit raw GeoTIFF/HGT unless Git LFS is configured on purpose.
