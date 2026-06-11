"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, Lock, Wifi, Cpu } from "lucide-react"

const BOOT_LINES = [
  "INITIALIZING SECURE KERNEL...",
  "LOADING ENCRYPTION MODULES [AES-256]...",
  "SCANNING NETWORK PERIMETER...",
  "AUTHENTICATING DEVELOPER CREDENTIALS...",
  "ESTABLISHING SECURE CHANNEL...",
  "DEPLOYING PORTFOLIO INTERFACE...",
  "SYSTEM READY — WELCOME TO ARNOLD.DEV",
]

function playCyberSounds() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    const playBeep = (freq: number, start: number, duration: number, type: OscillatorType = "square") => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = type
      osc.frequency.value = freq
      gain.gain.setValueAtTime(0.03, start)
      gain.gain.exponentialRampToValueAtTime(0.001, start + duration)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(start)
      osc.stop(start + duration)
    }
    BOOT_LINES.forEach((_, i) => {
      playBeep(200 + i * 40, i * 0.35, 0.08, "square")
      if (i % 2 === 0) playBeep(80, i * 0.35 + 0.1, 0.15, "sawtooth")
    })
    playBeep(440, BOOT_LINES.length * 0.35, 0.3, "sine")
  } catch {
    // Audio blocked by browser — silent fallback
  }
}

export default function CyberBootLoader({ children }: { children: React.ReactNode }) {
  const [booting, setBooting] = useState(true)
  const [lineIndex, setLineIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  const finishBoot = useCallback(() => {
    setBooting(false)
    if (typeof window !== "undefined") {
      sessionStorage.setItem("arnold_booted", "1")
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined" && (sessionStorage.getItem("arnold_booted") || sessionStorage.getItem("operative_booted"))) {
      setBooting(false)
      return
    }
    playCyberSounds()
    const lineTimer = setInterval(() => {
      setLineIndex((prev) => {
        if (prev >= BOOT_LINES.length - 1) {
          clearInterval(lineTimer)
          setTimeout(finishBoot, 600)
          return prev
        }
        return prev + 1
      })
    }, 180)
    const progTimer = setInterval(() => {
      setProgress((p) => Math.min(p + 4, 100))
    }, 35)
    return () => {
      clearInterval(lineTimer)
      clearInterval(progTimer)
    }
  }, [finishBoot])

  return (
    <>
      <AnimatePresence>
        {booting && (
          <motion.div
            key="boot"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(34,197,94,0.08)_0%,_transparent_70%)]" />
            <div className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34,197,94,0.03) 2px, rgba(34,197,94,0.03) 4px)",
              }}
            />
            <div className="relative max-w-lg w-full mx-4 font-display">
              <div className="flex items-center gap-3 mb-8">
                <Shield className="h-10 w-10 text-green-400 animate-pulse" />
                <div>
                  <h1 className="text-2xl font-bold text-green-400 tracking-widest">ARNOLD.DEV</h1>
                  <p className="text-xs text-green-400/60 font-mono">SECURE BOOT SEQUENCE v2.4.1</p>
                </div>
              </div>
              <div className="border border-green-400/30 rounded-lg p-6 bg-black/80 backdrop-blur-sm">
                <div className="flex gap-4 mb-6 text-green-400/70">
                  <Lock className="h-4 w-4" />
                  <Wifi className="h-4 w-4" />
                  <Cpu className="h-4 w-4" />
                </div>
                <div className="space-y-1 mb-6 h-32 overflow-hidden font-mono text-sm">
                  {BOOT_LINES.slice(0, lineIndex + 1).map((line, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={i === lineIndex ? "text-green-400" : "text-green-400/50"}
                    >
                      <span className="text-green-500 mr-2">{">"}</span>
                      {line}
                      {i === lineIndex && <span className="animate-blink ml-1">_</span>}
                    </motion.p>
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono text-green-400/60">
                    <span>SYSTEM LOAD</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-1.5 bg-green-400/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full"
                      style={{ width: `${progress}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  )
}
