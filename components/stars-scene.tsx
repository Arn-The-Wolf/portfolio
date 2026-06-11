"use client"

import { Stars } from "@react-three/drei"
import { useTheme } from "@/hooks/use-theme"

export default function StarsScene() {
  const { isDark } = useTheme()

  return (
    <>
      <color attach="background" args={[isDark ? "#000000" : "#e8f5e9"]} />
      <Stars
        radius={90}
        depth={50}
        count={isDark ? 2800 : 2200}
        factor={isDark ? 3.2 : 4.5}
        saturation={isDark ? 0 : 0.35}
        fade
        speed={0.4}
        color={isDark ? "#4ade80" : "#15803d"}
      />
      <Stars
        radius={50}
        depth={30}
        count={isDark ? 800 : 600}
        factor={2}
        saturation={0}
        fade
        speed={0.2}
        color={isDark ? "#86efac" : "#22c55e"}
      />
    </>
  )
}
