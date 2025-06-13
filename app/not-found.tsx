"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Home, Search } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-green-400 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <Card className="bg-black/40 border-green-400/20 max-w-lg w-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-yellow-400" />
            </div>
            <CardTitle className="font-mono text-yellow-400 text-4xl">404</CardTitle>
            <CardDescription className="text-gray-300 text-lg">MISSION LOCATION NOT FOUND</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-4">
              <p className="text-sm font-mono text-yellow-300 text-center">
                The requested coordinates do not exist in our database.
                <br />
                The target may have been moved or destroyed.
              </p>
            </div>
            <div className="space-y-3">
              <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-black font-mono">
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  RETURN TO BASE
                </Link>
              </Button>
              <Button
                variant="outline"
                className="w-full border-green-400 text-green-400 hover:bg-green-400 hover:text-black font-mono"
                onClick={() => window.history.back()}
              >
                <Search className="mr-2 h-4 w-4" />
                PREVIOUS LOCATION
              </Button>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 font-mono">ERROR CODE: 404_LOCATION_NOT_FOUND</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
