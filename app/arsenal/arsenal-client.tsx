"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import CountUp from "@/components/count-up"
import { useInView } from "react-intersection-observer"
import StarsBackground from "@/components/stars-background"
import PageHeader from "@/components/page-header"
import { Shield, Globe, Server, Lock, Cloud } from "lucide-react"
import { cn } from "@/lib/utils"

interface Skill {
  id: number
  name: string
  level: number
  years: number
  projects: number
}

const categoryMeta: Record<string, { icon: typeof Globe; label: string; color: string }> = {
  frontend: { icon: Globe, label: "Frontend", color: "#4ade80" },
  backend: { icon: Server, label: "Backend", color: "#3b82f6" },
  security: { icon: Lock, label: "Security", color: "#ef4444" },
  devops: { icon: Cloud, label: "DevOps", color: "#a855f7" },
}

export default function ArsenalClient({ initialSkills }: { initialSkills: Record<string, Skill[]> }) {
  const [activeCategory, setActiveCategory] = useState<string>(Object.keys(initialSkills)[0] || "frontend")
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const skills = initialSkills
  const categories = Object.keys(skills)
  const activeSkills = skills[activeCategory] || []
  const meta = categoryMeta[activeCategory] || categoryMeta.frontend

  return (
    <div className="relative min-h-screen">
      <StarsBackground />

      <div className="relative z-10 pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <PageHeader
            icon={Shield}
            eyebrow="Technical skills"
            title="Skills"
            subtitle="Languages, frameworks, and tools I use across projects."
          />

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((cat) => {
              const m = categoryMeta[cat] || categoryMeta.frontend
              const Icon = m.icon
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm border transition-all duration-300",
                    activeCategory === cat
                      ? "bg-primary/15 border-primary text-primary shadow-[0_0_20px_hsl(var(--primary)/0.15)]"
                      : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground bg-card/50"
                  )}
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
                  className="group relative glass-card-hover p-5 overflow-hidden"
                >
                  <div
                    className="absolute top-0 left-0 w-1 h-full rounded-l-xl transition-all group-hover:w-1.5"
                    style={{ backgroundColor: meta.color }}
                  />
                  <div className="flex justify-between items-center mb-3 pl-3">
                    <span className="font-display text-lg text-foreground">{skill.name}</span>
                    <span className="font-mono text-primary text-sm">
                      {inView ? <CountUp end={skill.level} duration={1.5} suffix="%" /> : "0%"}
                    </span>
                  </div>
                  <div className="pl-3 mb-3">
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1.2, delay: index * 0.08 }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${meta.color}88, ${meta.color})` }}
                      />
                    </div>
                  </div>
                  <div className="pl-3 flex gap-4 text-xs font-mono text-muted-foreground">
                    <span>{skill.years}y exp</span>
                    <span>{skill.projects} projects</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
