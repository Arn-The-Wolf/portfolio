"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Shield, Menu } from "lucide-react"
import { motion } from "framer-motion"

const links = [
  { href: "/", label: "Home" },
  { href: "/arsenal", label: "Skills" },
  { href: "/history", label: "Experience" },
  { href: "/missions", label: "Projects" },
  { href: "/resumes", label: "Resumes" },
  { href: "/reports", label: "Testimonials" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <Link href="/" className="flex items-center space-x-2 text-primary hover:text-primary/80">
            <Shield className="h-7 w-7" />
            <span className="font-display text-lg font-bold tracking-wide">ARNOLD.DEV</span>
          </Link>

          <div className="hidden lg:flex items-center space-x-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch={true}
                className={`px-3 py-2 text-sm transition-colors rounded-md ${
                  pathname === link.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background/95 border-border w-72">
                <div className="flex flex-col gap-1 mt-8">
                  {links.map((link, i) => (
                    <motion.div key={link.href} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                      <Link
                        href={link.href}
                        prefetch={true}
                        onClick={() => setOpen(false)}
                        className={`block px-4 py-3 text-sm rounded-lg transition-colors ${
                          pathname === link.href ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary"
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
