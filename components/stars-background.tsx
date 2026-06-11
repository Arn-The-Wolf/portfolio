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
  const { isDark } = useTheme()
  const palette = isDark ? STARFIELD.dark : STARFIELD.light

  return (
    <div
      className={cn(
        "inset-0 z-0 pointer-events-none",
        variant === "fixed" ? "fixed" : "absolute"
      )}
      aria-hidden
    >
      <div className="absolute inset-0" style={{ background: palette.background }} />
      <div className="absolute inset-0">
        <DynamicCanvas
          key={isDark ? "page-stars-dark" : "page-stars-light"}
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
      <div
        className={cn(
          "absolute inset-0",
          isDark
            ? "bg-gradient-to-b from-background/10 via-background/55 to-background/95"
            : "bg-gradient-to-b from-transparent via-transparent to-background/40"
        )}
      />
    </div>
  )
}
