"use client"

import { motion } from "framer-motion"
import { Shield } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="mx-auto mb-6 w-14 h-14 border-2 border-green-400/20 border-t-green-400 rounded-full"
        />
        <div className="flex items-center justify-center gap-2 mb-2">
          <Shield className="h-5 w-5 text-green-400 animate-pulse" />
          <span className="font-display text-green-400 tracking-widest">ARNOLD.DEV</span>
        </div>
        <p className="font-mono text-xs text-green-400/50 animate-pulse">LOADING SECURE MODULES...</p>
      </motion.div>
    </div>
  )
}
