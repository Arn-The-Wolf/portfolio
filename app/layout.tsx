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
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark');document.documentElement.setAttribute('data-theme','light');}else{document.documentElement.classList.add('dark');document.documentElement.setAttribute('data-theme','dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${orbitron.variable} ${rajdhani.variable} font-body antialiased bg-background text-foreground min-h-screen flex flex-col transition-colors duration-300`}>
        <ThemeProvider>
          <ErrorBoundary>
            <CyberBootLoader>
              <Navbar />
              <main className="flex-1">
                <Suspense
                  fallback={
                    <div className="min-h-screen flex items-center justify-center">
                      <div className="h-10 w-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                    </div>
                  }
                >
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
