"use client"

import { cn } from "@/lib/utils"
import { STAR_DOTS, STARFIELD_BG } from "@/lib/starfield-css"

interface CssStarsBackgroundProps {
  variant?: "fixed" | "absolute"
}

/** Lightweight CSS starfield — no WebGL, works on all devices. */
export default function CssStarsBackground({ variant = "fixed" }: CssStarsBackgroundProps) {
  return (
    <div
      className={cn(
        "inset-0 z-0 pointer-events-none overflow-hidden",
        variant === "fixed" ? "fixed" : "absolute",
      )}
      aria-hidden
    >
      <div className="absolute inset-0" style={{ backgroundColor: STARFIELD_BG }} />
      {STAR_DOTS.map((star, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white star-drift"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            animationDuration: `${star.duration + 3}s`,
            animationDelay: `${star.delay}s`,
            ["--drift-x" as string]: `${((i % 5) - 2) * 6}px`,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/70" />
    </div>
  )
}
