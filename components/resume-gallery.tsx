"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Eye, FileText, Calendar, Globe } from "lucide-react"
import PageHeader from "@/components/page-header"
import DocumentViewer from "@/components/document-viewer"

interface Resume {
  id: number
  title: string
  subtitle?: string
  description?: string
  documentType?: string
  format: string
  fileUrl: string
  fileName?: string
  version?: string
  language?: string
  updatedAt?: string
  tags?: string[]
}

function resolveViewUrl(resume: Resume): string {
  const url = resume.fileUrl
  if (!url) return `/api/resumes/${resume.id}/download`
  if (url.startsWith("http")) return url
  if (url.startsWith("/") && !url.startsWith("/api/")) return url
  if (url.startsWith("/api/resumes/")) return url
  if (resume.fileName) return `/api/resumes/${resume.id}/download`
  return url
}

function resolveDownloadUrl(resume: Resume): string {
  const view = resolveViewUrl(resume)
  if (view.startsWith("http")) return view
  if (view.startsWith("/api/resumes/")) {
    return `${view}${view.includes("?") ? "&" : "?"}download=1`
  }
  return view
}

export default function ResumeGallery({ initialResumes }: { initialResumes: Resume[] }) {
  const resumes = initialResumes
  const [viewer, setViewer] = useState<{ resume: Resume; viewUrl: string; downloadUrl: string } | null>(
    null,
  )

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <PageHeader
          title="Resumes & CVs"
          subtitle="Downloadable resumes and documents"
        />

        <div className="grid md:grid-cols-2 gap-8">
          {resumes.map((resume, index) => (
            <motion.div
              key={resume.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
            >
              <Card className="glass-card-hover group overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-primary/80 via-primary to-primary/80 opacity-70 group-hover:opacity-100 transition-opacity" />
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg border border-border bg-primary/10">
                      <FileText className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-xl text-primary mb-1">{resume.title}</h3>
                      {resume.subtitle && (
                        <p className="text-sm text-muted-foreground mb-3">{resume.subtitle}</p>
                      )}
                      {resume.description && (
                        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{resume.description}</p>
                      )}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {resume.documentType && (
                          <Badge className="btn-primary text-xs">{resume.documentType}</Badge>
                        )}
                        <Badge variant="outline" className="border-primary/40 text-primary text-xs">
                          {resume.format}
                        </Badge>
                        {resume.version && (
                          <Badge variant="secondary" className="text-xs">v{resume.version}</Badge>
                        )}
                        {resume.language && (
                          <Badge variant="secondary" className="text-xs flex items-center gap-1">
                            <Globe className="h-3 w-3" /> {resume.language}
                          </Badge>
                        )}
                        {resume.updatedAt && (
                          <Badge variant="secondary" className="text-xs flex items-center gap-1">
                            <Calendar className="h-3 w-3" /> {resume.updatedAt}
                          </Badge>
                        )}
                      </div>
                      {resume.tags && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {resume.tags.map((tag) => (
                            <span key={tag} className="text-xs text-primary/70">#{tag}</span>
                          ))}
                        </div>
                      )}
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          className="flex-1 border-primary/40 text-primary"
                          onClick={() =>
                            setViewer({
                              resume,
                              viewUrl: resolveViewUrl(resume),
                              downloadUrl: resolveDownloadUrl(resume),
                            })
                          }
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                        <Button asChild className="flex-1 btn-primary">
                          <a href={resolveDownloadUrl(resume)} download={resume.fileName || undefined}>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {viewer && (
        <DocumentViewer
          open={Boolean(viewer)}
          onOpenChange={(open) => !open && setViewer(null)}
          title={viewer.resume.title}
          viewUrl={viewer.viewUrl}
          downloadUrl={viewer.downloadUrl}
          fileName={viewer.resume.fileName}
        />
      )}
    </section>
  )
}
