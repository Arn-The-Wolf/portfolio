"use client"

import { Suspense, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"
import { ErrorBoundary } from "react-error-boundary"
import CssStarsBackground from "@/components/css-stars-background"
import { canUseWebGL, STARFIELD_BG } from "@/lib/starfield-css"

const DynamicCanvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  { ssr: false },
)

const DynamicStarsScene = dynamic(() => import("@/components/stars-scene"), { ssr: false })

function WebGLFallback() {
  return <CssStarsBackground variant="fixed" />
}

/** Home hero renders its own WebGL starfield inside SpaceScene. */
function shouldShowGlobalStars(pathname: string): boolean {
  return pathname !== "/"
}

export default function GlobalStarsBackground() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [webglOk, setWebglOk] = useState(false)

  useEffect(() => {
    setMounted(true)
    setWebglOk(canUseWebGL())
  }, [])

  if (!shouldShowGlobalStars(pathname ?? "/")) {
    return null
  }

  if (!mounted) {
    return (
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ backgroundColor: STARFIELD_BG }}
        aria-hidden
      />
    )
  }

  if (!webglOk) {
    return <WebGLFallback />
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden>
      <ErrorBoundary FallbackComponent={WebGLFallback}>
        <DynamicCanvas
          camera={{ position: [0, 0, 1], fov: 75 }}
          gl={{
            antialias: false,
            alpha: false,
            powerPreference: "default",
            failIfMajorPerformanceCaveat: false,
          }}
          dpr={1}
          frameloop="always"
          style={{ background: STARFIELD_BG }}
          className="!fixed inset-0"
        >
          <Suspense fallback={null}>
            <DynamicStarsScene />
          </Suspense>
        </DynamicCanvas>
      </ErrorBoundary>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-black/10 to-black/70" />
    </div>
  )
}
