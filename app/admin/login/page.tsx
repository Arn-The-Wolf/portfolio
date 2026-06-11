"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Shield, Lock } from "lucide-react"

function LoginForm() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams.get("from") || "/admin"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        router.push(from)
        router.refresh()
      } else {
        setError("ACCESS DENIED — Invalid credentials")
      }
    } catch {
      setError("Connection failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative w-full max-w-md border border-green-400/30 rounded-xl bg-black/80 backdrop-blur-md p-8"
    >
      <div className="flex items-center gap-3 mb-8">
        <Shield className="h-8 w-8 text-green-400" />
        <div>
          <h1 className="font-display text-xl text-green-400">COMMAND CENTER</h1>
          <p className="font-mono text-xs text-gray-500">AUTHENTICATION REQUIRED</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-mono text-xs text-green-400/70 flex items-center gap-1 mb-2">
            <Lock className="h-3 w-3" /> ACCESS KEY
          </label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-black/60 border-green-400/30 text-green-400 font-mono"
            placeholder="Enter admin password..."
            required
          />
        </div>
        {error && <p className="text-red-400 font-mono text-sm">{error}</p>}
        <Button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-500 text-black font-mono">
          {loading ? "AUTHENTICATING..." : "INITIATE ACCESS"}
        </Button>
      </form>
    </motion.div>
  )
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(34,197,94,0.05)_0%,_transparent_70%)]" />
      <Suspense fallback={<div className="h-8 w-8 border-2 border-green-400/20 border-t-green-400 rounded-full animate-spin" />}>
        <LoginForm />
      </Suspense>
    </div>
  )
}
