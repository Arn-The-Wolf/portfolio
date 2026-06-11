"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Home, Search } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import StarsBackground from "@/components/stars-background"

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <StarsBackground />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10">
        <Card className="glass-card max-w-lg w-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-amber-500/15 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-amber-500" />
            </div>
            <CardTitle className="font-display text-amber-500 text-4xl">404</CardTitle>
            <CardDescription className="text-lg">Page not found</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
              <p className="text-sm text-foreground/80 text-center">
                The page you&apos;re looking for doesn&apos;t exist or may have been moved.
              </p>
            </div>
            <div className="space-y-3">
              <Button asChild className="w-full btn-primary">
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Back to home
                </Link>
              </Button>
              <Button
                variant="outline"
                className="w-full btn-outline-primary"
                onClick={() => window.history.back()}
              >
                <Search className="mr-2 h-4 w-4" />
                Go back
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
