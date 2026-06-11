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
  const layers = isDark ? STAR_LAYERS.dark : STAR_LAYERS.light
  const [layerA, layerB] = layers

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <color attach="background" args={[palette.background]} />
      <Stars
        key={`page-a-${isDark ? 'dark' : 'light'}`}
        radius={layerA.radius}
        depth={layerA.depth}
        count={layerA.count}
        factor={layerA.factor}
        saturation={0}
        fade={palette.starFade}
        speed={layerA.speed}
        color={palette.starPrimary}
      />
      <Stars
        key={`page-b-${isDark ? 'dark' : 'light'}`}
        radius={layerB.radius}
        depth={layerB.depth}
        count={layerB.count}
        factor={layerB.factor}
        saturation={0}
        fade={palette.starFade}
        speed={layerB.speed}
        color={palette.starSecondary}
      />
    </group>
  )
}
