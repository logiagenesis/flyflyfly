export type HudSnapshot = {
  altitudeM: number;
  aglM: number;
  speedMps: number;
  headingDeg: number;
  mode: string;
  lighting: "day" | "night";
  wireframe: boolean;
  fps: number;
};

export function bindHud() {
  const stats = document.querySelector("#hud-stats");
  const help = document.querySelector("#help");
  const hint = document.querySelector("#hint");
  const mode = document.querySelector("#mode-label");

  return {
    setHelpVisible(visible: boolean) {
      help?.classList.toggle("hidden", !visible);
    },
    hideHint() {
      hint?.classList.add("hidden");
    },
    render(snapshot: HudSnapshot) {
      if (mode) mode.textContent = snapshot.mode;
      if (!stats) return;
      const kmh = snapshot.speedMps * 3.6;
      stats.innerHTML = [
        `ALT ${snapshot.altitudeM.toFixed(0)} m AMSL`,
        `AGL ${snapshot.aglM.toFixed(0)} m`,
        `SPD ${kmh.toFixed(0)} km/h`,
        `HDG ${snapshot.headingDeg.toFixed(0).padStart(3, "0")}°`,
        `MODE ${snapshot.lighting}${snapshot.wireframe ? " / wire" : ""}`,
        `FPS ${snapshot.fps.toFixed(0)}`,
      ].join("<br>");
    },
  };
}
