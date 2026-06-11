"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Text, Float } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Mail, Rocket, Terminal, Download, Twitter, Instagram } from "lucide-react"
import Link from "next/link"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import PerformanceDashboard from "@/components/performance-dashboard"
import GitHubStats from "@/components/github-stats"
import { ThreeScene } from "./components/ThreeScene"
import CountUp from "@/components/count-up"

const statsData = [
  { label: "GITHUB REPOS", value: 62, suffix: "+" },
  { label: "PROJECTS", value: 15, suffix: "+" },
  { label: "LANGUAGES", value: 4, suffix: "" },
  { label: "OPEN SOURCE", value: 100, suffix: "%" },
]

export default function Portfolio() {
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div className="min-h-screen bg-black text-green-400">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <ThreeScene />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 pt-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge variant="outline" className="border-green-400 text-green-400 font-mono mb-4">
              STATUS: ACTIVE
            </Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-wider"
          >
            <span className="text-green-400">RUYANGE</span>
            <br />
            <span className="text-white">ARNOLD</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto"
          >
            Full-stack developer fluent in Java, Astro, AI & Cybersecurity. Building secure systems and open-source missions.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-8"
          >
            <Button asChild className="bg-green-600 hover:bg-green-500 text-black font-mono">
              <Link href="/contact">
                <Terminal className="mr-2 h-4 w-4" />
                DEPLOY MISSION
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-green-400 text-green-400 hover:bg-green-400 hover:text-black font-mono">
              <Link href="/missions">
                <Rocket className="mr-2 h-4 w-4" />
                VIEW INTEL
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-green-400 text-green-400 hover:bg-green-400 hover:text-black font-mono">
              <Link href="/api/resume" target="_blank">
                <Download className="mr-2 h-4 w-4" />
                DOWNLOAD DOSSIER
              </Link>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex justify-center gap-6"
          >
            {[
              { href: "https://github.com/Arn-The-Wolf", icon: Github },
              { href: "https://linkedin.com", icon: Linkedin },
              { href: "mailto:arnwolfie5@gmail.com", icon: Mail },
              { href: "https://x.com/arnwolfie", icon: Twitter },
              { href: "https://www.instagram.com/arnwolfie/", icon: Instagram },
            ].map(({ href, icon: Icon }) => (
              <Link key={href} href={href} target={href.startsWith("http") ? "_blank" : undefined} className="text-green-400/70 hover:text-green-400 transition-colors hover:scale-110 transform">
                <Icon className="h-6 w-6" />
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold mb-12 text-center"
          >
            <span className="text-green-500">{">"}</span> OPERATIVE INTEL
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-lg mb-4 leading-relaxed text-gray-300">
                Hi, I&apos;m <strong className="text-green-400">@Arn-The-Wolf</strong> — a full-stack developer passionate about Java, Astro, AI, and cybersecurity. I build e-commerce platforms, IoT weather systems, handwriting recognition AI, and secure web applications.
              </p>
              <p className="text-lg mb-6 leading-relaxed text-gray-400">
                Open to collaborating on any project. Reach me at arnwolfie5@gmail.com.
              </p>
              <div ref={statsRef} className="grid grid-cols-2 gap-4">
                {statsInView &&
                  statsData.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="border border-green-400/20 p-4 rounded-lg bg-black/40 backdrop-blur-sm"
                    >
                      <div className="text-2xl font-display font-bold text-green-400">
                        <CountUp end={stat.value} duration={2} suffix={stat.suffix} />
                      </div>
                      <div className="text-xs font-mono text-gray-500">{stat.label}</div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="h-96 border border-green-400/20 rounded-lg overflow-hidden">
              <Canvas camera={{ position: [0, 0, 3] }}>
                <Suspense fallback={null}>
                  <ambientLight intensity={0.2} />
                  <pointLight position={[10, 10, 10]} />
                  <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                    <Text position={[0, 0, 0]} fontSize={0.4} color="#4ade80" anchorX="center" anchorY="middle">
                      {"<SECURE/>"}
                    </Text>
                  </Float>
                  <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
                </Suspense>
              </Canvas>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="github" className="py-20 px-4 bg-black/50">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold mb-4 text-center"
          >
            <span className="text-green-500">{">"}</span> GITHUB UPLINK
          </motion.h2>
          <p className="text-center text-gray-500 font-mono text-sm mb-10">
            LIVE DATA FROM{" "}
            <Link href="https://github.com/Arn-The-Wolf" className="text-green-400 hover:underline" target="_blank">
              github.com/Arn-The-Wolf
            </Link>
          </p>
          <GitHubStats />
        </div>
      </section>

      <PerformanceDashboard />
      <Analytics />
      <SpeedInsights />
    </div>
  )
}
