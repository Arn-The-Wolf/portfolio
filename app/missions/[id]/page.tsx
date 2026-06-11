"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Github, ExternalLink } from "lucide-react"
import Link from "next/link"
import { SpaceHud3D } from "@/components/space-hud-3d"

export default function MissionDetailPage() {
  const params = useParams()
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/projects/${params.id}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        setProject(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-12 w-12 border-2 border-green-400/20 border-t-green-400 rounded-full animate-spin" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="font-mono text-red-400">MISSION NOT FOUND</p>
        <Button asChild variant="outline" className="border-green-400 text-green-400">
          <Link href="/missions"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Missions</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">
      <SpaceHud3D variant="missions" />
      <div className="relative z-10 pt-24 pb-16 px-4 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Link href="/missions" className="inline-flex items-center text-green-400/70 hover:text-green-400 font-mono text-sm mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" /> BACK TO MISSIONS
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="border border-green-400/20 rounded-2xl bg-black/70 backdrop-blur-md p-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.featured && <Badge className="bg-green-600 text-black">FEATURED</Badge>}
            <Badge variant="outline" className="border-green-400/40 text-green-400">{project.status}</Badge>
          </div>
          <h1 className="font-display text-3xl md:text-4xl text-green-400 mb-2">{project.title}</h1>
          <p className="text-gray-400 font-mono mb-6">{project.subtitle}</p>
          <p className="text-gray-300 leading-relaxed mb-8">{project.longDescription || project.description}</p>

          {project.technologies && (
            <div className="mb-8">
              <h3 className="font-mono text-green-400 text-sm mb-3">TECH STACK</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t: string) => (
                  <Badge key={t} variant="secondary" className="bg-white/5">{t}</Badge>
                ))}
              </div>
            </div>
          )}

          {project.challenges && (
            <div className="mb-6">
              <h3 className="font-mono text-green-400 text-sm mb-2">CHALLENGES</h3>
              <ul className="list-disc list-inside text-gray-400 space-y-1">
                {project.challenges.map((c: string) => <li key={c}>{c}</li>)}
              </ul>
            </div>
          )}

          {project.results && (
            <div className="mb-8">
              <h3 className="font-mono text-green-400 text-sm mb-2">RESULTS</h3>
              <ul className="list-disc list-inside text-gray-400 space-y-1">
                {project.results.map((r: string) => <li key={r}>{r}</li>)}
              </ul>
            </div>
          )}

          <div className="flex gap-4">
            {project.github && (
              <Button asChild className="bg-green-600 hover:bg-green-500 text-black font-mono">
                <Link href={project.github} target="_blank"><Github className="mr-2 h-4 w-4" /> VIEW CODE</Link>
              </Button>
            )}
            {project.demo && (
              <Button asChild variant="outline" className="border-green-400 text-green-400 font-mono">
                <Link href={project.demo} target="_blank"><ExternalLink className="mr-2 h-4 w-4" /> LIVE DEMO</Link>
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
