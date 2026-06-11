"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "@/hooks/use-theme"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Shield, Sun, Moon, Menu } from "lucide-react"
import { motion } from "framer-motion"

const links = [
  { href: "/", label: "INTEL" },
  { href: "/arsenal", label: "ARSENAL" },
  { href: "/history", label: "HISTORY" },
  { href: "/missions", label: "MISSIONS" },
  { href: "/resumes", label: "RESUMES" },
  { href: "/reports", label: "REPORTS" },
  { href: "/blog", label: "BLOG" },
  { href: "/contact", label: "CONTACT" },
]

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/60 border-b border-green-400/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <Link href="/" className="flex items-center space-x-2 text-green-400 hover:text-green-300">
            <Shield className="h-7 w-7" />
            <span className="font-display text-lg font-bold tracking-wide">OPERATIVE.DEV</span>
          </Link>

          <div className="hidden lg:flex items-center space-x-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-mono transition-colors rounded-md ${
                  pathname === link.href
                    ? "text-green-400 bg-green-400/10"
                    : "text-green-400/70 hover:text-green-400 hover:bg-green-400/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-green-400 ml-2">
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-green-400">
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-green-400">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-black/95 border-green-400/20 w-72">
                <div className="flex flex-col gap-1 mt-8">
                  {links.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={`block px-4 py-3 font-mono text-sm rounded-lg transition-colors ${
                          pathname === link.href
                            ? "text-green-400 bg-green-400/10"
                            : "text-gray-400 hover:text-green-400"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
