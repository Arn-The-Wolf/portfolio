"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, FileText, Calendar, Globe } from "lucide-react"

interface Resume {
  id: number
  title: string
  subtitle?: string
  description?: string
  documentType?: string
  format: string
  fileUrl: string
  version?: string
  language?: string
  updatedAt?: string
  tags?: string[]
}

export default function ResumeGallery({ initialResumes }: { initialResumes: Resume[] }) {
  const resumes = initialResumes

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="page-heading mb-4 text-center"
        >
          Resumes & CVs
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-muted-foreground mb-12 text-sm"
        >
          Downloadable resumes and documents
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8">
          {resumes.map((resume, index) => (
            <motion.div
              key={resume.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
            >
              <Card className="surface-card hover:border-primary/40 transition-all duration-300 group overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-primary via-primary/70 to-primary opacity-80 group-hover:opacity-100 transition-opacity" />
                <CardContent className="p-6 text-card-foreground">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                      <FileText className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-xl text-foreground mb-1">{resume.title}</h3>
                      {resume.subtitle && (
                        <p className="text-sm text-muted-foreground font-mono mb-3">{resume.subtitle}</p>
                      )}
                      {resume.description && (
                        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{resume.description}</p>
                      )}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {resume.documentType && (
                          <Badge className="bg-primary text-primary-foreground text-xs">{resume.documentType}</Badge>
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
                            <span key={tag} className="text-xs text-primary/70 font-mono">#{tag}</span>
                          ))}
                        </div>
                      )}
                      <Button
                        asChild
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-mono"
                      >
                        <a href={resume.fileUrl} download target="_blank" rel="noopener noreferrer">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
