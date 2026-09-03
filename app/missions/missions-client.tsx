"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink, ChevronRight, Star, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import PageHeader from "@/components/page-header"
import { cn } from "@/lib/utils"
import {
  FILTER_LABELS,
  getProjectCategories,
  matchesProjectFilter,
  PROJECT_FILTERS,
  type ProjectCategory,
  type ProjectFilter,
} from "@/lib/project-categories"
import { normalizeGithubUrl, type GithubRepoProject } from "@/lib/github-projects"
import { getProjectImage } from "@/lib/project-images"
import { toLiveUrl } from "@/lib/live-url"

type CmsProject = {
  id: number
  title: string
  subtitle?: string
  description: string
  technologies?: string[]
  github?: string
  demo?: string
  image?: string
  featured?: boolean
  priority?: number
  category?: ProjectCategory
  source?: "cms"
  categories?: ReturnType<typeof getProjectCategories>
}

type DisplayProject = (CmsProject | GithubRepoProject) & {
  categories: ReturnType<typeof getProjectCategories>
}

function normalizeCms(project: CmsProject): DisplayProject {
  const inferred = getProjectCategories(project)
  const categories = project.category
    ? Array.from(new Set([project.category, ...inferred]))
    : inferred
  return {
    ...project,
    source: "cms",
    categories,
  }
}

function mergeProjects(cms: CmsProject[], github: GithubRepoProject[]): DisplayProject[] {
  const cmsUrls = new Set(
    cms.map((p) => p.github && normalizeGithubUrl(p.github)).filter(Boolean) as string[]
  )
  const githubOnly = github.filter((g) => !cmsUrls.has(normalizeGithubUrl(g.github)))
  return [...cms.map(normalizeCms), ...githubOnly]
}

function ProjectCardSkeleton() {
  return (
    <Card className="glass-card h-full overflow-hidden animate-pulse">
      <div className="h-36 bg-primary/5" />
      <CardContent className="p-5 space-y-3">
        <div className="h-5 bg-primary/10 rounded w-2/3" />
        <div className="h-3 bg-muted rounded w-1/2" />
        <div className="h-12 bg-muted/50 rounded" />
        <div className="flex gap-2">
          <div className="h-5 w-14 bg-muted rounded-full" />
          <div className="h-5 w-14 bg-muted rounded-full" />
        </div>
      </CardContent>
    </Card>
  )
}

export default function MissionsClient({
  initialProjects,
  githubRepos,
}: {
  initialProjects: CmsProject[]
  githubRepos: GithubRepoProject[]
}) {
  const [selectedFilter, setSelectedFilter] = useState<ProjectFilter>("all")
  const [displayFilter, setDisplayFilter] = useState<ProjectFilter>("all")
  const [loadingFilter, setLoadingFilter] = useState<ProjectFilter | null>(null)

  const handleFilterClick = (filter: ProjectFilter) => {
    if (filter === selectedFilter || loadingFilter) return
    setLoadingFilter(filter)
    setSelectedFilter(filter)
  }

  useEffect(() => {
    if (selectedFilter === displayFilter) {
      setLoadingFilter(null)
      return
    }
    const timer = window.setTimeout(() => {
      setDisplayFilter(selectedFilter)
      setLoadingFilter(null)
    }, 350)
    return () => window.clearTimeout(timer)
  }, [selectedFilter, displayFilter])

  const isFiltering = loadingFilter !== null || selectedFilter !== displayFilter

  const allProjects = useMemo(
    () => mergeProjects(initialProjects, githubRepos),
    [initialProjects, githubRepos]
  )

  const filtered = useMemo(() => {
    return allProjects
      .filter((p) => matchesProjectFilter(p.categories, displayFilter))
      .sort((a, b) => {
        const priorityA = "priority" in a && typeof a.priority === "number" ? a.priority : 0
        const priorityB = "priority" in b && typeof b.priority === "number" ? b.priority : 0
        if (priorityB !== priorityA) return priorityB - priorityA
        return a.title.localeCompare(b.title)
      })
  }, [allProjects, displayFilter])

  return (
    <div className="relative min-h-screen">
      <section className="relative z-10 pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <PageHeader
            eyebrow="Portfolio & GitHub repositories"
            title="Projects"
            subtitle={`${allProjects.length} repositories — filter by stack. Projects can appear in multiple categories.`}
          />

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {PROJECT_FILTERS.map((f) => {
              const isActive = selectedFilter === f
              const isLoading = loadingFilter === f
              return (
                <Button
                  key={f}
                  variant={isActive ? "default" : "outline"}
                  onClick={() => handleFilterClick(f)}
                  disabled={Boolean(loadingFilter) && !isLoading}
                  className={cn(
                    isActive ? "filter-chip-active" : "filter-chip",
                    loadingFilter && loadingFilter !== f && "opacity-50 pointer-events-none",
                  )}
                >
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  {FILTER_LABELS[f]}
                </Button>
              )
            })}
          </div>

          {isFiltering && loadingFilter && (
            <p className="text-center text-xs font-mono text-primary/60 mb-6 animate-pulse">
              Loading {FILTER_LABELS[loadingFilter]} projects…
            </p>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[200px]">
            {isFiltering
              ? Array.from({ length: 6 }).map((_, i) => <ProjectCardSkeleton key={`skeleton-${i}`} />)
              : filtered.map((project, index) => {
                  const isGithub = project.source === "github"
                  const liveUrl = toLiveUrl(project.demo)
                  const detailHref = isGithub ? undefined : `/missions/${project.id}`
                  const stars = isGithub ? (project as GithubRepoProject).stars : 0
                  const cardKey = isGithub ? String(project.id) : `cms-${project.id}`
                  const cover = getProjectImage(project)

                  return (
                    <motion.div
                      key={`${displayFilter}-${cardKey}`}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: Math.min(index, 12) * 0.03 }}
                    >
                      <Card className="glass-card-hover h-full flex flex-col overflow-hidden group">
                        <div className="relative h-36 overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
                          <Image
                            src={cover}
                            alt={`${project.title} cover`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                          <div className="absolute top-3 right-3 flex gap-1">
                            {project.featured && (
                              <Badge className="btn-primary text-[10px]">Featured</Badge>
                            )}
                            {isGithub && (
                              <Badge variant="outline" className="border-primary/40 text-primary text-[10px] bg-background/60">
                                GitHub
                              </Badge>
                            )}
                          </div>
                        </div>
                        <CardContent className="p-5 flex-grow flex flex-col">
                          <h3 className="font-display text-lg text-primary mb-1">{project.title}</h3>
                          <p className="text-xs text-muted-foreground mb-2">{project.subtitle}</p>
                          <p className="text-muted-foreground text-sm mb-3 flex-grow line-clamp-2">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {project.categories.slice(0, 3).map((cat) => (
                              <Badge key={cat} variant="secondary" className="text-[10px] capitalize">
                                {cat}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {(project.technologies || []).slice(0, 4).map((tech) => (
                              <Badge
                                key={tech}
                                variant="outline"
                                className="border-border text-[10px] text-muted-foreground"
                              >
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
                                <Link
                                  href={project.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:text-primary transition-colors"
                                  aria-label={`${project.title} GitHub repository`}
                                >
                                  <Github className="h-4 w-4" />
                                </Link>
                              )}
                            </div>
                            <div className="flex items-center gap-3">
                              {detailHref && (
                                <Button asChild variant="ghost" size="sm" className="text-muted-foreground text-xs p-0 h-auto">
                                  <Link href={detailHref}>
                                    Details <ChevronRight className="ml-1 h-3 w-3" />
                                  </Link>
                                </Button>
                              )}
                              {liveUrl ? (
                                <Button asChild variant="ghost" size="sm" className="text-primary text-xs p-0 h-auto">
                                  <Link href={liveUrl} target="_blank" rel="noopener noreferrer">
                                    Live URL <ExternalLink className="ml-1 h-3 w-3" />
                                  </Link>
                                </Button>
                              ) : null}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
          </div>

          {!isFiltering && filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-16">No projects match this filter.</p>
          )}
        </div>
      </section>
    </div>
  )
}
