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
        <Link href="/missions" className="inline-flex items-center text-primary/70 hover:text-primary text-sm mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="surface-card rounded-2xl p-8"
        >
          <div className="flex flex-wrap gap-2 mb-4">
            {project.featured && <Badge className="bg-primary text-primary-foreground">Featured</Badge>}
            <Badge variant="outline" className="border-primary/40 text-primary">{project.status}</Badge>
          </div>

          <h1 className="font-display text-3xl md:text-4xl text-foreground mb-2">{project.title}</h1>
          <p className="text-muted-foreground mb-8">{project.subtitle}</p>

          {project.problem && (
            <section className="mb-8">
              <h2 className="text-sm font-semibold text-primary mb-2 uppercase tracking-wide">Problem</h2>
              <p className="text-card-foreground leading-relaxed">{project.problem}</p>
            </section>
          )}

          {(project.built || project.longDescription) && (
            <section className="mb-8">
              <h2 className="text-sm font-semibold text-primary mb-2 uppercase tracking-wide">What I Built</h2>
              <p className="text-card-foreground leading-relaxed">{project.built || project.longDescription}</p>
            </section>
          )}

          {project.technologies && (
            <section className="mb-8">
              <h2 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wide">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t: string) => (
                  <Badge key={t} variant="secondary">{t}</Badge>
                ))}
              </div>
            </section>
          )}

          {project.outcome && (
            <section className="mb-8">
              <h2 className="text-sm font-semibold text-primary mb-2 uppercase tracking-wide">Outcome</h2>
              <p className="text-card-foreground leading-relaxed">{project.outcome}</p>
            </section>
          )}

          {project.results && (
            <section className="mb-8">
              <h2 className="text-sm font-semibold text-primary mb-2 uppercase tracking-wide">Results</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                {project.results.map((r: string) => <li key={r}>{r}</li>)}
              </ul>
            </section>
          )}

          <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
            {project.github && (
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href={project.github} target="_blank"><Github className="mr-2 h-4 w-4" /> View on GitHub</Link>
              </Button>
            )}
            {project.demo && (
              <Button asChild variant="outline" className="border-primary text-primary">
                <Link href={project.demo} target="_blank"><ExternalLink className="mr-2 h-4 w-4" /> Live Demo</Link>
              </Button>
            )}
          </div>
        </motion.article>
      </div>
    </div>
  )
}
