import * as THREE from "three";
import { TERRAIN_BOUNDS } from "../data/gauteng";
import { placesInLocal } from "../data/places";
import { GRID, heightAtIndex, heightColor, sampleHeightBilinear } from "./heightfield";

export function createTerrainMesh(): THREE.Mesh {
  const geometry = new THREE.PlaneGeometry(
    TERRAIN_BOUNDS.width,
    TERRAIN_BOUNDS.depth,
    GRID - 1,
    GRID - 1,
  );
  geometry.rotateX(-Math.PI / 2);

  const positions = geometry.attributes.position;
  const colors = new Float32Array(positions.count * 3);

  for (let iz = 0; iz < GRID; iz += 1) {
    for (let ix = 0; ix < GRID; ix += 1) {
      const i = iz * GRID + ix;
      const x = TERRAIN_BOUNDS.minX + (ix / (GRID - 1)) * TERRAIN_BOUNDS.width;
      const z = TERRAIN_BOUNDS.minZ + (iz / (GRID - 1)) * TERRAIN_BOUNDS.depth;
      const y = heightAtIndex(ix, iz);
      positions.setXYZ(i, x, y, z);
      const [r, g, b] = heightColor(y);
      colors[i * 3] = r;
      colors[i * 3 + 1] = g;
      colors[i * 3 + 2] = b;
    }
  }

  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.computeVertexNormals();

  const material = new THREE.MeshLambertMaterial({
    vertexColors: true,
    flatShading: true,
    fog: true,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = "terrain";
  mesh.receiveShadow = true;
  return mesh;
}

export function createPlaceMarkers(): THREE.Group {
  const group = new THREE.Group();
  group.name = "places";
  const markerGeom = new THREE.CylinderGeometry(90, 140, 40, 5);
  const markerMat = new THREE.MeshLambertMaterial({ color: 0x8b93a0, flatShading: true });

  for (const place of placesInLocal()) {
    const ground = sampleHeightBilinear(place.x, place.z);
    const mesh = new THREE.Mesh(markerGeom, markerMat);
    mesh.position.set(place.x, ground + 24, place.z);
    mesh.userData.placeId = place.id;
    group.add(mesh);

    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, 512, 128);
      ctx.font = "36px sans-serif";
      ctx.fillStyle = "rgba(232,240,230,0.92)";
      ctx.textAlign = "center";
      ctx.fillText(place.name, 256, 72);
    }
    const texture = new THREE.CanvasTexture(canvas);
    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false }),
    );
    sprite.position.set(place.x, ground + 280, place.z);
    sprite.scale.set(1800, 450, 1);
    group.add(sprite);
  }
  return group;
}
