"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Mail, Rocket, Download, Twitter, Instagram } from "lucide-react"
import Link from "next/link"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import GitHubStats from "@/components/github-stats"
import { ThreeScene } from "./components/ThreeScene"
import CountUp from "@/components/count-up"
import { getAge } from "@/lib/age"
import { getYearsExperience } from "@/lib/experience"
import { PROFILE_IMAGE } from "@/lib/site-images"

export default function Portfolio() {
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const age = getAge()
  const yearsExp = getYearsExperience()

  const statsData = [
    { label: "Years Building", value: yearsExp, suffix: "+" },
    { label: "Projects", value: 60, suffix: "+" },
    { label: "GitHub Repos", value: 62, suffix: "+" },
    { label: "Open Source", value: 100, suffix: "%" },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ThreeScene />
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 pt-20 pb-12">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative shrink-0"
            >
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary/50 via-primary/20 to-primary/50 blur-sm" />
              <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-primary/40 shadow-[0_0_40px_hsl(var(--primary)/0.2)]">
                <Image src={PROFILE_IMAGE} alt="RUYANGE Arnold" fill priority className="object-cover object-top" sizes="(max-width: 768px) 192px, 224px" />
              </div>
              <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 btn-primary text-xs whitespace-nowrap">
                {age} years old
              </Badge>
            </motion.div>

            <div className="text-center lg:text-left flex-1">
              <Badge variant="outline" className="border-primary text-primary mb-4">
                Available for opportunities
              </Badge>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-4 tracking-wider">
                <span className="text-primary">RUYANGE</span>
                <br />
                <span className="text-foreground">ARNOLD</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                Full-stack developer with {yearsExp}+ years of hands-on experience in Java, Python, AI, and cybersecurity. I build practical software and ship it on GitHub.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-8">
                <Button asChild className="btn-primary">
                  <Link href="/contact">Contact Me</Link>
                </Button>
                <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <Link href="/missions"><Rocket className="mr-2 h-4 w-4" />View Projects</Link>
                </Button>
                <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <Link href="/resumes"><Download className="mr-2 h-4 w-4" />Resumes</Link>
                </Button>
              </div>
              <div className="flex justify-center lg:justify-start gap-6">
                {[
                  { href: "https://github.com/Arn-The-Wolf", icon: Github },
                  { href: "https://linkedin.com", icon: Linkedin },
                  { href: "mailto:ruyangearnold@gmail.com", icon: Mail },
                  { href: "https://x.com/arnwolfie", icon: Twitter },
                  { href: "https://www.instagram.com/arnwolfie/", icon: Instagram },
                ].map(({ href, icon: Icon }) => (
                  <Link key={href} href={href} target={href.startsWith("http") ? "_blank" : undefined} className="text-primary/70 hover:text-primary transition-colors">
                    <Icon className="h-6 w-6" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-center">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg mb-4 leading-relaxed text-muted-foreground">
                I&apos;m <strong className="text-primary">RUYANGE Arnold</strong> (@Arn-The-Wolf) — a developer who learns by building. My work includes e-commerce apps, ML models, IoT data pipelines, and this portfolio.
              </p>
              <p className="text-lg mb-6 leading-relaxed text-muted-foreground">
                Coding seriously since {2023}. Open to internships, collaborations, and junior roles. Reach me at ruyangearnold@gmail.com.
              </p>
              <div ref={statsRef} className="grid grid-cols-2 gap-4">
                {statsInView &&
                  statsData.map((stat, index) => (
                    <div key={index} className="border border-border p-4 rounded-lg bg-card/60 backdrop-blur-sm">
                      <div className="text-2xl font-display font-bold text-primary">
                        <CountUp end={stat.value} duration={2} suffix={stat.suffix} />
                      </div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="relative h-96 border border-border rounded-lg overflow-hidden">
              <Image src={PROFILE_IMAGE} alt="RUYANGE Arnold" fill className="object-cover object-top" sizes="(max-width: 768px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-primary text-sm">Full-Stack · AI · Cybersecurity</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="github" className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-center">GitHub</h2>
          <p className="text-center text-muted-foreground text-sm mb-10">
            Live stats from{" "}
            <Link href="https://github.com/Arn-The-Wolf" className="text-primary hover:underline" target="_blank">
              github.com/Arn-The-Wolf
            </Link>
          </p>
          <GitHubStats />
        </div>
      </section>

      <Analytics />
      <SpeedInsights />
    </div>
  )
}
