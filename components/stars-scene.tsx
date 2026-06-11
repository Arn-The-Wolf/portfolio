"use client"

import { Stars } from "@react-three/drei"
import { useTheme } from "@/hooks/use-theme"

export default function StarsScene() {
  const { isDark } = useTheme()

  return (
    <>
      <color attach="background" args={[isDark ? "#000000" : "#e8f0fe"]} />
      <Stars
        radius={90}
        depth={50}
        count={isDark ? 2800 : 2400}
        factor={isDark ? 3.2 : 5}
        saturation={isDark ? 0 : 0.85}
        fade
        speed={0.4}
        color={isDark ? "#4ade80" : "#fbbf24"}
      />
      <Stars
        radius={50}
        depth={30}
        count={isDark ? 800 : 700}
        factor={isDark ? 2 : 3}
        saturation={isDark ? 0 : 0.7}
        fade
        speed={0.2}
        color={isDark ? "#86efac" : "#f59e0b"}
      />
    </>
  )
}
