export type InputState = {
  thrust: number;
  yaw: number;
  climb: number;
  boost: boolean;
  pointerLocked: boolean;
};

export class Input {
  readonly state: InputState = {
    thrust: 0,
    yaw: 0,
    climb: 0,
    boost: false,
    pointerLocked: false,
  };

  lookX = 0;
  lookY = 0;

  private keys = new Set<string>();

  attach(canvas: HTMLCanvasElement): void {
    canvas.addEventListener("click", () => {
      if (document.pointerLockElement !== canvas) {
        void canvas.requestPointerLock();
      }
    });

    document.addEventListener("pointerlockchange", () => {
      this.state.pointerLocked = document.pointerLockElement === canvas;
    });

    document.addEventListener("mousemove", (event) => {
      if (!this.state.pointerLocked) return;
      this.lookX += event.movementX * 0.0022;
      this.lookY += event.movementY * 0.0022;
      this.lookY = Math.max(-1.2, Math.min(1.2, this.lookY));
    });

    window.addEventListener("keydown", (event) => {
      this.keys.add(event.code);
      if (["Space", "KeyW", "KeyA", "KeyS", "KeyD"].includes(event.code)) {
        event.preventDefault();
      }
    });

    window.addEventListener("keyup", (event) => {
      this.keys.delete(event.code);
    });
  }

  consumeLook(): { yaw: number; pitch: number } {
    const yaw = this.lookX;
    const pitch = this.lookY;
    this.lookX = 0;
    return { yaw, pitch };
  }

  poll(): InputState {
    this.state.thrust = 0;
    this.state.yaw = 0;
    this.state.climb = 0;
    if (this.keys.has("KeyW")) this.state.thrust += 1;
    if (this.keys.has("KeyS")) this.state.thrust -= 1;
    if (this.keys.has("KeyA")) this.state.yaw -= 1;
    if (this.keys.has("KeyD")) this.state.yaw += 1;
    if (this.keys.has("Space")) this.state.climb += 1;
    if (this.keys.has("ControlLeft") || this.keys.has("ControlRight")) this.state.climb -= 1;
    this.state.boost = this.keys.has("ShiftLeft") || this.keys.has("ShiftRight");
    return this.state;
  }

  wasPressed(code: string): boolean {
    return this.keys.has(code);
  }
}
