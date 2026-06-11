"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink, ChevronRight, FolderGit2, Star } from "lucide-react"
import Link from "next/link"
import StarsBackground from "@/components/stars-background"
import {
  getProjectCategories,
  matchesProjectFilter,
  PROJECT_FILTERS,
  type ProjectFilter,
} from "@/lib/project-categories"
import { normalizeGithubUrl, type GithubRepoProject } from "@/lib/github-projects"

type CmsProject = {
  id: number
  title: string
  subtitle?: string
  description: string
  technologies?: string[]
  github?: string
  demo?: string
  featured?: boolean
  source?: "cms"
  categories?: ReturnType<typeof getProjectCategories>
}

type DisplayProject = (CmsProject | GithubRepoProject) & {
  categories: ReturnType<typeof getProjectCategories>
}

function normalizeCms(project: CmsProject): DisplayProject {
  return {
    ...project,
    source: "cms",
    categories: getProjectCategories(project),
  }
}

function mergeProjects(cms: CmsProject[], github: GithubRepoProject[]): DisplayProject[] {
  const cmsUrls = new Set(
    cms.map((p) => p.github && normalizeGithubUrl(p.github)).filter(Boolean) as string[]
  )
  const githubOnly = github.filter((g) => !cmsUrls.has(normalizeGithubUrl(g.github)))
  return [...cms.map(normalizeCms), ...githubOnly]
}

export default function MissionsClient({
  initialProjects,
  githubRepos,
}: {
  initialProjects: CmsProject[]
  githubRepos: GithubRepoProject[]
}) {
  const [selectedFilter, setSelectedFilter] = useState<ProjectFilter>("all")
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const allProjects = useMemo(
    () => mergeProjects(initialProjects, githubRepos),
    [initialProjects, githubRepos]
  )

  const filtered = useMemo(
    () => allProjects.filter((p) => matchesProjectFilter(p.categories, selectedFilter)),
    [allProjects, selectedFilter]
  )

  return (
    <div className="relative min-h-screen">
      <StarsBackground />
      <section className="relative z-10 pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <p className="text-sm text-muted-foreground mb-2">Portfolio & GitHub repositories</p>
            <h1 className="page-heading">Projects</h1>
            <p className="text-muted-foreground text-sm mt-3 max-w-xl mx-auto">
              {allProjects.length} repositories — filter by stack. Projects can appear in multiple categories.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {PROJECT_FILTERS.map((f) => (
              <Button
                key={f}
                variant={selectedFilter === f ? "default" : "outline"}
                onClick={() => setSelectedFilter(f)}
                className={
                  selectedFilter === f
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground text-xs capitalize"
                    : "border-border text-card-foreground hover:bg-accent text-xs capitalize bg-card/90"
                }
              >
                {f === "all" ? "All" : f}
              </Button>
            ))}
          </div>

          <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, index) => {
              const isGithub = project.source === "github"
              const href = isGithub ? project.github : `/missions/${project.id}`
              const stars = isGithub ? (project as GithubRepoProject).stars : 0

              return (
                <motion.div
                  key={isGithub ? project.id : `cms-${project.id}`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                >
                  <Card className="surface-card h-full flex flex-col group hover:border-primary/40 transition-all overflow-hidden">
                    <div className="relative h-36 overflow-hidden bg-gradient-to-br from-primary/10 to-accent flex items-center justify-center">
                      {isGithub ? (
                        <FolderGit2 className="h-12 w-12 text-primary/30 group-hover:text-primary/50 transition-colors" />
                      ) : (
                        <span className="font-display text-4xl text-primary/25 group-hover:text-primary/40 transition-colors">
                          {project.title?.charAt(0)}
                        </span>
                      )}
                      <div className="absolute top-3 right-3 flex gap-1">
                        {project.featured && (
                          <Badge className="bg-primary text-primary-foreground text-[10px]">Featured</Badge>
                        )}
                        {isGithub && (
                          <Badge variant="outline" className="border-primary/40 text-primary text-[10px]">
                            GitHub
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CardContent className="p-5 flex-grow flex flex-col text-card-foreground">
                      <h3 className="font-display text-lg text-foreground mb-1">{project.title}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{project.subtitle}</p>
                      <p className="text-muted-foreground text-sm mb-3 flex-grow line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.categories.slice(0, 3).map((cat) => (
                          <Badge key={cat} variant="secondary" className="text-[10px] capitalize">
                            {cat}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {(project.technologies || []).slice(0, 4).map((tech) => (
                          <Badge key={tech} variant="outline" className="border-border text-[10px] text-muted-foreground">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t border-border">
                        <div className="flex items-center gap-3 text-muted-foreground">
                          {stars > 0 && (
                            <span className="flex items-center gap-1 text-xs">
                              <Star className="h-3 w-3" /> {stars}
                            </span>
                          )}
                          {project.github && (
                            <Link href={project.github} target="_blank" className="hover:text-primary transition-colors">
                              <Github className="h-4 w-4" />
                            </Link>
                          )}
                          {project.demo && (
                            <Link href={project.demo} target="_blank" className="hover:text-primary transition-colors">
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          )}
                        </div>
                        <Button asChild variant="ghost" size="sm" className="text-primary text-xs p-0 h-auto">
                          <Link href={href} target={isGithub ? "_blank" : undefined}>
                            {isGithub ? "View repo" : "Details"} <ChevronRight className="ml-1 h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-16">No projects match this filter.</p>
          )}
        </div>
      </section>
    </div>
  )
}
