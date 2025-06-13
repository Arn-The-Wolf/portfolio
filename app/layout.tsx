import type React from "react"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import ErrorBoundary from "@/components/error-boundary"
import CookieConsent from "@/components/cookie-consent"
import { Analytics } from "@/components/analytics"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ErrorBoundary>
          <Suspense>{children}</Suspense>
          <CookieConsent />
          <Analytics />
        </ErrorBoundary>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
