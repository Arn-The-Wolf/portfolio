import { STARFIELD } from "@/lib/theme-colors"

/** Deterministic star positions (no hydration mismatch). */
export const STAR_DOTS = Array.from({ length: 120 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  top: (i * 53 + 7) % 100,
  size: (i % 3) + 1,
  opacity: 0.25 + (i % 6) * 0.1,
  duration: 2 + (i % 5) * 0.8,
  delay: (i % 9) * 0.35,
}))

export function canUseWebGL(): boolean {
  if (typeof window === "undefined") return false
  try {
    const canvas = document.createElement("canvas")
    return Boolean(
      canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: false }) ||
        canvas.getContext("webgl", { failIfMajorPerformanceCaveat: false }),
    )
  } catch {
    return false
  }
}

export const STARFIELD_BG = STARFIELD.dark.background
