"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Cookie, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setShowConsent(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setShowConsent(false)
  }

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined")
    setShowConsent(false)
  }

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-md"
        >
          <Card className="bg-black/90 border-green-400/20 backdrop-blur-md">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Cookie className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-gray-300 mb-3">
                    This site uses cookies to enhance your experience and analyze site usage. By continuing, you agree
                    to our cookie policy.
                  </p>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={acceptCookies}
                      className="bg-green-600 hover:bg-green-700 text-black font-mono text-xs"
                    >
                      ACCEPT
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={declineCookies}
                      className="border-green-400/50 text-green-400 hover:bg-green-400 hover:text-black font-mono text-xs"
                    >
                      DECLINE
                    </Button>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowConsent(false)}
                  className="text-gray-400 hover:text-green-400 p-1"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
