"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink, ChevronRight, Rocket } from "lucide-react"
import Link from "next/link"
import { SpaceHud3D } from "@/components/space-hud-3d"

export default function MissionsPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [loading, setLoading] = useState(true)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filters = ["all", "frontend", "backend", "fullstack", "mobile", "devops", "ai"]

  const filtered =
    selectedFilter === "all"
      ? projects
      : projects.filter((p) => {
          const tech = (p.technologies || []).join(" ").toLowerCase()
          const map: Record<string, boolean> = {
            frontend: /react|vue|next|astro|tailwind/.test(tech),
            backend: /node|python|java|express|flask/.test(tech),
            fullstack: /react|next/.test(tech) && /node|python|java/.test(tech),
            mobile: /react native|flutter/.test(tech),
            devops: /docker|kubernetes|aws|mqtt/.test(tech),
            ai: /ai|ml|cnn|machine learning|tensorflow/.test(tech),
          }
          return map[selectedFilter]
        })

  return (
    <div className="relative min-h-screen">
      <SpaceHud3D variant="missions" />

      <section className="relative z-10 pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1 border border-green-400/30 rounded-full mb-4">
              <Rocket className="h-4 w-4 text-green-400" />
              <span className="font-mono text-xs text-green-400/70">MISSION CONTROL ACTIVE</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-green-400">
              <span className="text-green-500">{">"}</span> MISSIONS LOG
            </h1>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {filters.map((f) => (
              <Button
                key={f}
                variant={selectedFilter === f ? "default" : "outline"}
                onClick={() => setSelectedFilter(f)}
                className={
                  selectedFilter === f
                    ? "bg-green-600 hover:bg-green-500 text-black font-mono text-xs"
                    : "border-green-400/30 text-green-400/70 hover:bg-green-400/10 font-mono text-xs bg-black/40"
                }
              >
                {f.toUpperCase()}
              </Button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="h-12 w-12 border-2 border-green-400/20 border-t-green-400 rounded-full animate-spin" />
            </div>
          ) : (
            <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40, rotateX: 10 }}
                  animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  style={{ perspective: 1000 }}
                >
                  <Card className="bg-black/70 border-green-400/20 h-full flex flex-col group hover:border-green-400/60 hover:shadow-[0_0_30px_rgba(74,222,128,0.1)] transition-all duration-500 backdrop-blur-md overflow-hidden">
                    <div className="relative h-44 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-transparent to-blue-500/10 z-10" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-display text-4xl text-green-400/20 group-hover:text-green-400/40 transition-colors">
                          {project.title?.charAt(0)}
                        </span>
                      </div>
                      {project.featured && (
                        <Badge className="absolute top-3 right-3 z-20 bg-green-600 text-black text-[10px] font-mono">
                          FEATURED
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-5 flex-grow flex flex-col">
                      <h3 className="font-display text-lg text-green-400 mb-1">{project.title}</h3>
                      <p className="text-xs text-gray-500 font-mono mb-3">{project.subtitle}</p>
                      <p className="text-gray-400 text-sm mb-4 flex-grow line-clamp-3">{project.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {(project.technologies || []).slice(0, 4).map((tech: string) => (
                          <Badge key={tech} variant="secondary" className="bg-white/5 text-[10px]">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t border-green-400/10">
                        <div className="flex gap-3">
                          {project.github && (
                            <Link href={project.github} target="_blank" className="text-gray-500 hover:text-green-400 transition-colors">
                              <Github className="h-4 w-4" />
                            </Link>
                          )}
                          {project.demo && (
                            <Link href={project.demo} target="_blank" className="text-gray-500 hover:text-green-400 transition-colors">
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          )}
                        </div>
                        <Button asChild variant="ghost" size="sm" className="text-green-400 hover:text-green-300 font-mono text-xs p-0 h-auto">
                          <Link href={`/missions/${project.id}`}>
                            DETAILS <ChevronRight className="ml-1 h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
