"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Home, Search } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <Card className="surface-card max-w-lg w-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-amber-100 dark:bg-yellow-500/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-amber-500" />
            </div>
            <CardTitle className="font-display text-amber-600 dark:text-amber-400 text-4xl">404</CardTitle>
            <CardDescription className="text-muted-foreground text-lg">Page not found</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-card-foreground">
            <div className="bg-amber-50 dark:bg-yellow-500/10 border border-amber-200 dark:border-yellow-500/20 rounded p-4">
              <p className="text-sm text-center text-card-foreground">
                The page you&apos;re looking for doesn&apos;t exist or may have been moved.
              </p>
            </div>
            <div className="space-y-3">
              <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Back to home
                </Link>
              </Button>
              <Button
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
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
