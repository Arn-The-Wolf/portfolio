"use client"

import { Stars } from "@react-three/drei"
import { useTheme } from "@/hooks/use-theme"

export default function StarsScene() {
  const { isDark } = useTheme()

  return (
    <>
      <color attach="background" args={[isDark ? "#0a0f0c" : "#eef2ef"]} />
      <Stars
        radius={90}
        depth={50}
        count={isDark ? 2800 : 3200}
        factor={isDark ? 3.2 : 7}
        saturation={0}
        fade
        speed={0.4}
        color={isDark ? "#4ade80" : "#000000"}
      />
      <Stars
        radius={50}
        depth={30}
        count={isDark ? 800 : 1100}
        factor={isDark ? 2 : 3.5}
        saturation={0}
        fade
        speed={0.2}
        color={isDark ? "#86efac" : "#1a1a1a"}
      />
    </>
  )
}
