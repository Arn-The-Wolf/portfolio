"use client"

import { useState, useEffect } from "react"

interface CountUpProps {
  end: number
  start?: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
}

export default function CountUp({
  end,
  start = 0,
  duration = 2,
  decimals = 0,
  prefix = "",
  suffix = "",
}: CountUpProps) {
  const [count, setCount] = useState(start)

  useEffect(() => {
    let startTime: number
    let animationFrame: number
    const totalFrames = Math.round(duration * 60)
    let currentFrame = 0

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      currentFrame++

      const progress = Math.min(currentFrame / totalFrames, 1)
      const easedProgress = easeOutQuart(progress)
      const currentCount = start + (end - start) * easedProgress

      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [start, end, duration])

  // Easing function for smoother animation
  function easeOutQuart(x: number): number {
    return 1 - Math.pow(1 - x, 4)
  }

  return (
    <>
      {prefix}
      {count.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      {suffix}
    </>
  )
}
