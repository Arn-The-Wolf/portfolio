"use client"

import CssStarsBackground from "@/components/css-stars-background"

interface StarsBackgroundProps {
  variant?: "fixed" | "absolute"
}

/** Page starfield background (CSS only — avoids WebGL context limits). */
export default function StarsBackground({ variant = "fixed" }: StarsBackgroundProps) {
  return <CssStarsBackground variant={variant} />
}
