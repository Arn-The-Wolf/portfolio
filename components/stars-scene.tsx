"use client"

import { useRef } from "react"
import { Stars } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { useTheme } from "@/hooks/use-theme"
import { STARFIELD, STAR_LAYERS } from "@/lib/theme-colors"

export default function StarsScene() {
  const groupRef = useRef<THREE.Group>(null)
  const { isDark } = useTheme()
  const palette = isDark ? STARFIELD.dark : STARFIELD.light
  const [layerA, layerB] = STAR_LAYERS

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <color attach="background" args={[palette.background]} />
      <Stars
        radius={layerA.radius}
        depth={layerA.depth}
        count={layerA.count}
        factor={layerA.factor}
        saturation={0}
        fade
        speed={layerA.speed}
        color={palette.starPrimary}
      />
      <Stars
        radius={layerB.radius}
        depth={layerB.depth}
        count={layerB.count}
        factor={layerB.factor}
        saturation={0}
        fade
        speed={layerB.speed}
        color={palette.starSecondary}
      />
    </group>
  )
}
