"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import CountUp from "@/components/count-up"
import { useInView } from "react-intersection-observer"
import { SpaceHud3D } from "@/components/space-hud-3d"
import { Shield, Globe, Server, Lock, Cloud } from "lucide-react"

interface Skill {
  id: number
  name: string
  level: number
  years: number
  projects: number
}

const categoryMeta: Record<string, { icon: typeof Globe; label: string; color: string }> = {
  frontend: { icon: Globe, label: "FRONTEND SYSTEMS", color: "#4ade80" },
  backend: { icon: Server, label: "BACKEND ARSENAL", color: "#3b82f6" },
  security: { icon: Lock, label: "CYBER DEFENSE", color: "#ef4444" },
  devops: { icon: Cloud, label: "INFRASTRUCTURE", color: "#a855f7" },
}

export default function ArsenalPage() {
  const [skills, setSkills] = useState<Record<string, Skill[]>>({})
  const [activeCategory, setActiveCategory] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    fetch("/api/skills")
      .then((r) => r.json())
      .then((data) => {
        setSkills(data)
        setActiveCategory(Object.keys(data)[0] || "frontend")
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const categories = Object.keys(skills)
  const activeSkills = skills[activeCategory] || []
  const meta = categoryMeta[activeCategory] || categoryMeta.frontend

  return (
    <div className="relative min-h-screen">
      <SpaceHud3D variant="arsenal" />

      <div className="relative z-10 pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1 border border-green-400/30 rounded-full mb-4">
              <Shield className="h-4 w-4 text-green-400" />
              <span className="font-mono text-xs text-green-400/70">WEAPONS CACHE ONLINE</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-green-400">
              <span className="text-green-500">{">"}</span> TACTICAL ARSENAL
            </h1>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="h-12 w-12 border-2 border-green-400/20 border-t-green-400 rounded-full animate-spin" />
            </div>
          ) : (
            <>
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                {categories.map((cat) => {
                  const m = categoryMeta[cat] || categoryMeta.frontend
                  const Icon = m.icon
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-sm border transition-all duration-300 ${
                        activeCategory === cat
                          ? "bg-green-400/15 border-green-400 text-green-400 shadow-[0_0_20px_rgba(74,222,128,0.2)]"
                          : "border-green-400/20 text-gray-400 hover:border-green-400/40"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {m.label}
                    </button>
                  )
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  ref={ref}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="grid md:grid-cols-2 gap-4"
                >
                  {activeSkills.map((skill, index) => (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08 }}
                      className="group relative p-5 rounded-xl border border-green-400/20 bg-black/60 backdrop-blur-md hover:border-green-400/50 transition-all overflow-hidden"
                    >
                      <div
                        className="absolute top-0 left-0 w-1 h-full rounded-l-xl transition-all group-hover:w-1.5"
                        style={{ backgroundColor: meta.color }}
                      />
                      <div className="flex justify-between items-center mb-3 pl-3">
                        <span className="font-display text-lg text-white">{skill.name}</span>
                        <span className="font-mono text-green-400 text-sm">
                          {inView ? <CountUp end={skill.level} duration={1.5} suffix="%" /> : "0%"}
                        </span>
                      </div>
                      <div className="pl-3 mb-3">
                        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${skill.level}%` } : {}}
                            transition={{ duration: 1.2, delay: index * 0.08 }}
                            className="h-full rounded-full"
                            style={{ background: `linear-gradient(90deg, ${meta.color}88, ${meta.color})` }}
                          />
                        </div>
                      </div>
                      <div className="pl-3 flex gap-4 text-xs font-mono text-gray-500">
                        <span>{skill.years}y exp</span>
                        <span>{skill.projects} projects</span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
