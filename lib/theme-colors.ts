/** Hero + starfield: dark and light are exact inverses. Animation params match; only colors differ. */
export const STARFIELD = {
  dark: {
    background: "#0a0f0c",
    starPrimary: "#ffffff",
    starSecondary: "#e2e8f0",
    meshSphere: "#4ade80",
    meshSphereEmissive: "#22c55e",
    meshBox: "#3b82f6",
    meshBoxEmissive: "#1d4ed8",
    ambient: 0.1,
    point: 1,
    starFade: true,
  },
  light: {
    background: "#ffffff",
    starPrimary: "#000000",
    starSecondary: "#1a1a1a",
    meshSphere: "#86efac",
    meshSphereEmissive: "#4ade80",
    meshBox: "#93c5fd",
    meshBoxEmissive: "#3b82f6",
    ambient: 0.55,
    point: 0.85,
    starFade: false,
  },
} as const

/** Same motion in both themes — speed & rotation are identical. */
export const STAR_LAYERS = {
  dark: [
    { radius: 100, depth: 50, count: 5000, factor: 4, speed: 1 },
    { radius: 70, depth: 40, count: 1500, factor: 2, speed: 0.5 },
  ],
  light: [
    { radius: 100, depth: 50, count: 5000, factor: 7, speed: 1 },
    { radius: 70, depth: 40, count: 1500, factor: 4, speed: 0.5 },
  ],
} as const
