"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Shield, Terminal, MapPin } from "lucide-react"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/arsenal", label: "Skills" },
  { href: "/history", label: "Experience" },
  { href: "/missions", label: "Projects" },
  { href: "/resumes", label: "Resumes" },
  { href: "/reports", label: "Testimonials" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
]

export default function Footer() {
  return (
    <footer className="relative mt-auto border-t border-border bg-background/90 backdrop-blur-xl overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_hsl(var(--primary)/0.06)_0%,_transparent_60%)]" />
      <div className="relative max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-1"
          >
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-7 w-7 text-primary" />
              <span className="font-display text-xl font-bold text-primary tracking-wide">ARNOLD.DEV</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Full-stack engineer & cybersecurity enthusiast. Building secure, mission-ready digital systems.
            </p>
            <div className="flex items-center gap-2 text-muted-foreground text-xs font-mono">
              <MapPin className="h-3 w-3" />
              <span>Remote · Open to collaborate</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-display text-primary text-sm tracking-widest mb-4 flex items-center gap-2">
              <Terminal className="h-4 w-4" /> NAVIGATION
            </h3>
            <ul className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors font-mono"
                  >
                    {link.label.toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-display text-primary text-sm tracking-widest mb-4">PROTOCOLS</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary text-sm transition-colors font-mono">
                  PRIVACY POLICY
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary text-sm transition-colors font-mono">
                  TERMS OF SERVICE
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="font-display text-primary text-sm tracking-widest mb-4">COMMS</h3>
            <div className="flex gap-4 mb-4">
              <Link href="https://github.com/Arn-The-Wolf" target="_blank" rel="noopener noreferrer" className="text-primary/70 hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="https://linkedin.com" className="text-primary/70 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="mailto:ruyangearnold@gmail.com" className="text-primary/70 hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
            <p className="text-muted-foreground text-xs font-mono">ruyangearnold@gmail.com</p>
          </motion.div>
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground font-mono text-xs">
            © {new Date().getFullYear()} RUYANGE Arnold · All systems operational
          </p>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-primary/60 font-mono text-xs">STATUS: ONLINE</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
