import * as THREE from "three";
import { createPlaceMarkers, createTerrainMesh } from "../terrain/mesh";

export type World = {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  sun: THREE.DirectionalLight;
  hemi: THREE.HemisphereLight;
  amb: THREE.AmbientLight;
  terrain: THREE.Mesh;
  night: boolean;
  wireframe: boolean;
};

export function createWorld(canvas: HTMLCanvasElement): World {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x8fb7d2);
  scene.fog = new THREE.Fog(0x8fb7d2, 18000, 92000);

  const camera = new THREE.PerspectiveCamera(68, window.innerWidth / window.innerHeight, 1, 180000);

  const hemi = new THREE.HemisphereLight(0xcfe6ff, 0x3d4a32, 0.72);
  scene.add(hemi);

  const amb = new THREE.AmbientLight(0xd7e4c8, 0.22);
  scene.add(amb);

  const sun = new THREE.DirectionalLight(0xfff1d0, 1.15);
  sun.position.set(-40000, 52000, -18000);
  scene.add(sun);

  const terrain = createTerrainMesh();
  scene.add(terrain);
  scene.add(createPlaceMarkers());

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  return {
    scene,
    camera,
    renderer,
    sun,
    hemi,
    amb,
    terrain,
    night: false,
    wireframe: false,
  };
}

export function setNight(world: World, night: boolean): void {
  world.night = night;
  if (night) {
    world.scene.background = new THREE.Color(0x071018);
    if (world.scene.fog) world.scene.fog.color.set(0x071018);
    world.sun.color.set(0x9bb7ff);
    world.sun.intensity = 0.28;
    world.hemi.intensity = 0.18;
    world.amb.intensity = 0.08;
    world.renderer.toneMappingExposure = 0.78;
  } else {
    world.scene.background = new THREE.Color(0x8fb7d2);
    if (world.scene.fog) world.scene.fog.color.set(0x8fb7d2);
    world.sun.color.set(0xfff1d0);
    world.sun.intensity = 1.15;
    world.hemi.intensity = 0.72;
    world.amb.intensity = 0.22;
    world.renderer.toneMappingExposure = 1.05;
  }
}

export function setWireframe(world: World, enabled: boolean): void {
  world.wireframe = enabled;
  const material = world.terrain.material;
  const list = Array.isArray(material) ? material : [material];
  for (const entry of list) {
    if (entry instanceof THREE.MeshLambertMaterial) {
      entry.wireframe = enabled;
    }
  }
}
