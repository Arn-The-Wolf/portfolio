"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"
import { useTheme } from "@/hooks/use-theme"
import { cn } from "@/lib/utils"

const DynamicCanvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  { ssr: false }
)

const DynamicStarsScene = dynamic(() => import("./stars-scene"), { ssr: false })

const LIGHT_CANVAS_BG = "#f4f9f6"
const DARK_CANVAS_BG = "#0a0f0c"

interface StarsBackgroundProps {
  /** fixed = full viewport (secondary pages), absolute = hero section only */
  variant?: "fixed" | "absolute"
}

export default function StarsBackground({ variant = "fixed" }: StarsBackgroundProps) {
  const { isDark } = useTheme()

  return (
    <div
      className={cn(
        "inset-0 z-0 pointer-events-none",
        variant === "fixed" ? "fixed" : "absolute"
      )}
      aria-hidden
    >
      <div
        className={cn(
          "absolute inset-0",
          isDark ? "bg-[#0a0f0c]" : "bg-[#f4f9f6]"
        )}
      />
      <div className="absolute inset-0">
        <DynamicCanvas
          key={isDark ? "dark-stars" : "light-stars"}
          camera={{ position: [0, 0, 1] }}
          gl={{ alpha: false, antialias: true, powerPreference: "low-power" }}
          dpr={[1, 1.5]}
          style={{ background: isDark ? DARK_CANVAS_BG : LIGHT_CANVAS_BG }}
        >
          <Suspense fallback={null}>
            <DynamicStarsScene />
          </Suspense>
        </DynamicCanvas>
      </div>
      {isDark ? (
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/55 to-background/95" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f4f9f6]/60" />
      )}
    </div>
  )
}
