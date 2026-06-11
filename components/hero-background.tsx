"use client"

import { useTheme } from "@/hooks/use-theme"
import StarsBackground from "@/components/stars-background"
import { ThreeScene } from "@/app/components/ThreeScene"

export default function HeroBackground() {
  const { isDark } = useTheme()

  if (isDark) {
    return <ThreeScene />
  }

  return <StarsBackground variant="absolute" />
}
