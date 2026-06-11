import type React from "react"
import { Orbitron, Rajdhani } from "next/font/google"
import "./globals.css"
import ErrorBoundary from "@/components/error-boundary"
import CookieConsent from "@/components/cookie-consent"
import { Analytics } from "@/components/analytics"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CyberBootLoader from "@/components/cyber-boot-loader"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800", "900"],
})

const rajdhani = Rajdhani({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata = {
  title: "RUYANGE Arnold | Operative.dev",
  description: "Full-stack developer & cybersecurity enthusiast — portfolio of RUYANGE Arnold",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body className={`${orbitron.variable} ${rajdhani.variable} font-body antialiased text-green-400 bg-black min-h-screen flex flex-col`}>
        <ErrorBoundary>
          <CyberBootLoader>
            <Navbar />
            <main className="flex-1">
              <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="h-10 w-10 border-2 border-green-400/20 border-t-green-400 rounded-full animate-spin" />
                </div>
              }>
                {children}
              </Suspense>
            </main>
            <Footer />
            <CookieConsent />
            <Toaster />
            <Suspense fallback={null}>
              <Analytics />
            </Suspense>
          </CyberBootLoader>
        </ErrorBoundary>
      </body>
    </html>
  )
}
