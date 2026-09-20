import * as THREE from "three";
import { Input } from "./controls/input";
import { Aircraft } from "./flight/aircraft";
import { createWorld, setNight, setWireframe } from "./rendering/scene";
import { bindHud } from "./ui/hud";

const MODE = "SYNTHETIC GAUTENG PREVIEW";

const canvas = document.querySelector("#scene");
if (!(canvas instanceof HTMLCanvasElement)) {
  throw new Error("Missing #scene canvas");
}

const world = createWorld(canvas);
const input = new Input();
input.attach(canvas);

const aircraft = new Aircraft();
world.scene.add(aircraft.object);

const hud = bindHud();
let helpVisible = false;
hud.setHelpVisible(false);

const clock = new THREE.Clock();
let fps = 60;
let fpsAccum = 0;
let fpsFrames = 0;
let prevF = false;
let prevL = false;
let prevH = false;

function tick(): void {
  const dt = Math.min(0.05, clock.getDelta());
  aircraft.update(dt, input);

  world.camera.position.copy(aircraft.object.position);
  world.camera.quaternion.copy(aircraft.object.quaternion);

  if (input.state.pointerLocked) hud.hideHint();

  const fDown = input.wasPressed("KeyF");
  if (fDown && !prevF) setWireframe(world, !world.wireframe);
  prevF = fDown;

  const lDown = input.wasPressed("KeyL");
  if (lDown && !prevL) setNight(world, !world.night);
  prevL = lDown;

  const hDown = input.wasPressed("KeyH");
  if (hDown && !prevH) {
    helpVisible = !helpVisible;
    hud.setHelpVisible(helpVisible);
  }
  prevH = hDown;

  fpsAccum += dt;
  fpsFrames += 1;
  if (fpsAccum >= 0.25) {
    fps = fpsFrames / fpsAccum;
    fpsAccum = 0;
    fpsFrames = 0;
  }

  hud.render({
    altitudeM: aircraft.altitudeM(),
    aglM: aircraft.aglM(),
    speedMps: aircraft.speedMps(),
    headingDeg: aircraft.headingDeg(),
    mode: MODE,
    lighting: world.night ? "night" : "day",
    wireframe: world.wireframe,
    fps,
  });

  world.renderer.render(world.scene, world.camera);
  requestAnimationFrame(tick);
}

requestAnimationFrame(tick);
