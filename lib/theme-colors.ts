/** Shared hero / starfield palette — dark and light are exact inverses. */
export const STARFIELD = {
  dark: {
    background: "#0a0f0c",
    starPrimary: "#4ade80",
    starSecondary: "#86efac",
    meshSphere: "#4ade80",
    meshSphereEmissive: "#22c55e",
    meshBox: "#3b82f6",
    meshBoxEmissive: "#1d4ed8",
    ambient: 0.1,
    point: 1,
  },
  light: {
    background: "#f4f9f6",
    starPrimary: "#000000",
    starSecondary: "#1a1a1a",
    meshSphere: "#14532d",
    meshSphereEmissive: "#15803d",
    meshBox: "#1e3a8a",
    meshBoxEmissive: "#1d4ed8",
    ambient: 0.45,
    point: 0.7,
  },
} as const

/** Identical star animation on every page — only colors invert. */
export const STAR_LAYERS = [
  { radius: 100, depth: 50, count: 5000, factor: 4, speed: 1 },
  { radius: 70, depth: 40, count: 1500, factor: 2, speed: 0.5 },
] as const
