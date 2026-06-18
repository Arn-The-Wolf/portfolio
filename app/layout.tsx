import type React from "react"
import { Orbitron, Rajdhani } from "next/font/google"
import "./globals.css"
import ErrorBoundary from "@/components/error-boundary"
import CookieConsent from "@/components/cookie-consent"
import { Analytics } from "@/components/analytics"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CyberBootLoader from "@/components/cyber-boot-loader"
import GlobalStarsBackground from "@/components/global-stars-background"
import PageLoader from "@/components/page-loader"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
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
  title: "RUYANGE Arnold | ARNOLD.DEV",
  description: "Full-stack developer portfolio — Java, Python, AI & cybersecurity projects by RUYANGE Arnold",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{localStorage.removeItem('theme');}catch(e){}document.documentElement.classList.add('dark');document.documentElement.setAttribute('data-theme','dark');document.documentElement.style.colorScheme='dark';})();`,
          }}
        />
      </head>
      <body className={`${orbitron.variable} ${rajdhani.variable} font-body antialiased text-foreground min-h-screen flex flex-col transition-colors duration-300`}>
        <ThemeProvider>
          <ErrorBoundary>
            <CyberBootLoader>
              <GlobalStarsBackground />
              <Navbar />
              <main className="flex-1 relative z-10">
                <Suspense fallback={<PageLoader fullScreen label="Loading page…" />}>
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
        </ThemeProvider>
      </body>
    </html>
  )
}
