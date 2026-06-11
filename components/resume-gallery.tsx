"use client"

import { useState, useEffect } from "react"
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
  format: string
  fileUrl: string
  version?: string
  language?: string
  updatedAt?: string
  tags?: string[]
}

export default function ResumeGallery() {
  const [resumes, setResumes] = useState<Resume[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/resumes")
      .then((res) => res.json())
      .then((data) => {
        setResumes(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-2 border-green-400/20 border-t-green-400 rounded-full animate-spin" />
          <p className="font-mono text-green-400 text-sm animate-pulse">DECRYPTING DOSSIERS...</p>
        </div>
      </div>
    )
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-display font-bold mb-4 text-center text-green-400"
        >
          <span className="text-green-500">{">"}</span> CLASSIFIED DOSSIERS
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-gray-400 mb-12 font-mono text-sm"
        >
          RESUMES & CV DOCUMENTS — AUTHORIZED DOWNLOAD ONLY
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8">
          {resumes.map((resume, index) => (
            <motion.div
              key={resume.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
            >
              <Card className="bg-black/60 border-green-400/20 backdrop-blur-md hover:border-green-400/50 transition-all duration-300 group overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-green-600 via-green-400 to-green-600 opacity-60 group-hover:opacity-100 transition-opacity" />
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-400/10 rounded-lg border border-green-400/20">
                      <FileText className="h-8 w-8 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-xl text-green-400 mb-1">{resume.title}</h3>
                      {resume.subtitle && (
                        <p className="text-sm text-gray-400 font-mono mb-3">{resume.subtitle}</p>
                      )}
                      {resume.description && (
                        <p className="text-gray-300 text-sm mb-4 leading-relaxed">{resume.description}</p>
                      )}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="outline" className="border-green-400/40 text-green-400 text-xs">
                          {resume.format}
                        </Badge>
                        {resume.version && (
                          <Badge variant="secondary" className="bg-white/5 text-xs">v{resume.version}</Badge>
                        )}
                        {resume.language && (
                          <Badge variant="secondary" className="bg-white/5 text-xs flex items-center gap-1">
                            <Globe className="h-3 w-3" /> {resume.language}
                          </Badge>
                        )}
                        {resume.updatedAt && (
                          <Badge variant="secondary" className="bg-white/5 text-xs flex items-center gap-1">
                            <Calendar className="h-3 w-3" /> {resume.updatedAt}
                          </Badge>
                        )}
                      </div>
                      {resume.tags && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {resume.tags.map((tag) => (
                            <span key={tag} className="text-xs text-green-400/60 font-mono">#{tag}</span>
                          ))}
                        </div>
                      )}
                      <Button
                        asChild
                        className="w-full bg-green-600 hover:bg-green-500 text-black font-mono"
                      >
                        <a href={resume.fileUrl} download target="_blank" rel="noopener noreferrer">
                          <Download className="mr-2 h-4 w-4" />
                          DOWNLOAD DOSSIER
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
