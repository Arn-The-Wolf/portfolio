"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Github, ExternalLink } from "lucide-react"
import Link from "next/link"
import StarsBackground from "@/components/stars-background"

export default function ProjectDetailClient({ project }: { project: any }) {
  return (
    <div className="relative min-h-screen">
      <StarsBackground />
      <div className="relative z-10 pt-24 pb-16 px-4 max-w-4xl mx-auto">
        <Link href="/missions" className="inline-flex items-center text-green-400/70 hover:text-green-400 text-sm mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-green-400/20 rounded-2xl bg-black/70 backdrop-blur-md p-8"
        >
          <div className="flex flex-wrap gap-2 mb-4">
            {project.featured && <Badge className="bg-green-600 text-black">Featured</Badge>}
            <Badge variant="outline" className="border-green-400/40 text-green-400">{project.status}</Badge>
          </div>

          <h1 className="font-display text-3xl md:text-4xl text-green-400 mb-2">{project.title}</h1>
          <p className="text-gray-400 mb-8">{project.subtitle}</p>

          {project.problem && (
            <section className="mb-8">
              <h2 className="text-sm font-semibold text-green-400 mb-2 uppercase tracking-wide">Problem</h2>
              <p className="text-gray-300 leading-relaxed">{project.problem}</p>
            </section>
          )}

          {(project.built || project.longDescription) && (
            <section className="mb-8">
              <h2 className="text-sm font-semibold text-green-400 mb-2 uppercase tracking-wide">What I Built</h2>
              <p className="text-gray-300 leading-relaxed">{project.built || project.longDescription}</p>
            </section>
          )}

          {project.technologies && (
            <section className="mb-8">
              <h2 className="text-sm font-semibold text-green-400 mb-3 uppercase tracking-wide">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t: string) => (
                  <Badge key={t} variant="secondary" className="bg-white/5">{t}</Badge>
                ))}
              </div>
            </section>
          )}

          {project.outcome && (
            <section className="mb-8">
              <h2 className="text-sm font-semibold text-green-400 mb-2 uppercase tracking-wide">Outcome</h2>
              <p className="text-gray-300 leading-relaxed">{project.outcome}</p>
            </section>
          )}

          {project.results && (
            <section className="mb-8">
              <h2 className="text-sm font-semibold text-green-400 mb-2 uppercase tracking-wide">Results</h2>
              <ul className="list-disc list-inside text-gray-400 space-y-1">
                {project.results.map((r: string) => <li key={r}>{r}</li>)}
              </ul>
            </section>
          )}

          <div className="flex flex-wrap gap-4 pt-4 border-t border-green-400/10">
            {project.github && (
              <Button asChild className="bg-green-600 hover:bg-green-500 text-black">
                <Link href={project.github} target="_blank"><Github className="mr-2 h-4 w-4" /> View on GitHub</Link>
              </Button>
            )}
            {project.demo && (
              <Button asChild variant="outline" className="border-green-400 text-green-400">
                <Link href={project.demo} target="_blank"><ExternalLink className="mr-2 h-4 w-4" /> Live Demo</Link>
              </Button>
            )}
          </div>
        </motion.article>
      </div>
    </div>
  )
}
