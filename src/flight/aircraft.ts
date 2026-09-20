import * as THREE from "three";
import { headingDegFromForward, wrapDeg } from "../data/gauteng";
import { sampleHeightBilinear } from "../terrain/heightfield";
import type { Input } from "../controls/input";

const MIN_CLEARANCE = 18;
const MASS_DRAG = 0.985;
const BASE_THRUST = 42;
const BOOST_THRUST = 78;
const YAW_RATE = 1.15;
const CLIMB_ACCEL = 28;
const GRAVITY = 9.2;

export class Aircraft {
  readonly object = new THREE.Object3D();
  readonly velocity = new THREE.Vector3();
  pitch = 0.08;
  yaw = 0;
  private readonly forward = new THREE.Vector3();
  private readonly _euler = new THREE.Euler(0, 0, 0, "YXZ");

  constructor() {
    this.object.position.set(0, 1900, 8000);
    this.yaw = 0;
  }

  update(dt: number, input: Input): void {
    const look = input.consumeLook();
    this.yaw -= look.yaw;
    this.pitch -= look.pitch;
    this.pitch = Math.max(-0.9, Math.min(0.9, this.pitch));

    const state = input.poll();
    this.yaw -= state.yaw * YAW_RATE * dt;

    this._euler.set(this.pitch, this.yaw, 0, "YXZ");
    this.object.quaternion.setFromEuler(this._euler);
    this.object.getWorldDirection(this.forward);

    const thrust = (state.boost ? BOOST_THRUST : BASE_THRUST) * state.thrust;
    this.velocity.addScaledVector(this.forward, thrust * dt);
    this.velocity.y += state.climb * CLIMB_ACCEL * dt;
    this.velocity.y -= GRAVITY * dt;
    this.velocity.multiplyScalar(Math.pow(MASS_DRAG, dt * 60));

    this.object.position.addScaledVector(this.velocity, dt);

    const ground = sampleHeightBilinear(this.object.position.x, this.object.position.z);
    const floor = ground + MIN_CLEARANCE;
    if (this.object.position.y < floor) {
      this.object.position.y = floor;
      if (this.velocity.y < 0) this.velocity.y = 0;
      this.velocity.x *= 0.82;
      this.velocity.z *= 0.82;
    }
  }

  altitudeM(): number {
    return this.object.position.y;
  }

  aglM(): number {
    return this.object.position.y - sampleHeightBilinear(this.object.position.x, this.object.position.z);
  }

  speedMps(): number {
    return this.velocity.length();
  }

  headingDeg(): number {
    this.object.getWorldDirection(this.forward);
    return wrapDeg(headingDegFromForward(this.forward.x, this.forward.z));
  }
}
