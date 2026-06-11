"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"
import { useTheme } from "@/hooks/use-theme"
import { STARFIELD } from "@/lib/theme-colors"
import { cn } from "@/lib/utils"

const DynamicCanvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  { ssr: false }
)

const DynamicStarsScene = dynamic(() => import("./stars-scene"), { ssr: false })

interface StarsBackgroundProps {
  variant?: "fixed" | "absolute"
}

export default function StarsBackground({ variant = "fixed" }: StarsBackgroundProps) {
  const { isDark, theme } = useTheme()
  const palette = isDark ? STARFIELD.dark : STARFIELD.light

  return (
    <div
      className={cn(
        "inset-0 z-0 pointer-events-none",
        variant === "fixed" ? "fixed" : "absolute"
      )}
      aria-hidden
    >
      <div className="absolute inset-0" style={{ backgroundColor: palette.background }} />
      <div className="absolute inset-0">
        <DynamicCanvas
          key={`page-canvas-${theme}`}
          camera={{ position: [0, 0, 1] }}
          gl={{ alpha: false, antialias: true, powerPreference: "low-power" }}
          dpr={[1, 1.5]}
          style={{ background: palette.background }}
        >
          <Suspense fallback={null}>
            <DynamicStarsScene />
          </Suspense>
        </DynamicCanvas>
      </div>
      {isDark && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/70" />
      )}
    </div>
  )
}
