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

export default function StarsBackground() {
  const { isDark } = useTheme()

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden>
      <div className={cn("absolute inset-0 bg-background")} />
      <div className="absolute inset-0">
        <DynamicCanvas
          key={isDark ? "dark-stars" : "light-stars"}
          camera={{ position: [0, 0, 1] }}
          gl={{ alpha: false, antialias: true, powerPreference: "low-power" }}
          dpr={[1, 1.5]}
          style={{ background: isDark ? "#0a0f0c" : "#eef2ef" }}
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
            : "bg-gradient-to-b from-background/5 via-background/25 to-background/75"
        )}
      />
    </div>
  )
}
