"use client"

import { motion } from "framer-motion"
import { Shield, Terminal } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-black text-green-400 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="mx-auto mb-6 w-16 h-16 border-2 border-green-400/20 border-t-green-400 rounded-full"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-center space-x-2">
            <Shield className="h-6 w-6 text-green-400" />
            <span className="text-xl font-mono">OPERATIVE.DEV</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Terminal className="h-4 w-4" />
            <span className="font-mono text-sm">INITIALIZING SYSTEMS...</span>
          </div>
          <div className="flex justify-center space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                }}
                className="w-2 h-2 bg-green-400 rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
