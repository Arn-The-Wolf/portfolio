"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield } from "lucide-react"
import StarsBackground from "@/components/stars-background"

export default function HistoryClient({ initialHistory }: { initialHistory: { experience: any[]; certifications: any[] } }) {
  const history = initialHistory

  return (
    <div className="relative min-h-screen">
      <StarsBackground />
      <section className="relative z-10 pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-display font-bold mb-12 text-center text-green-400"
          >
            Experience
          </motion.h2>
          <div className="relative mb-20">
            <div className="absolute left-4 md:left-1/2 md:-translate-x-px w-0.5 h-full bg-green-400/20" />
            {history.experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className={`relative flex mb-10 ${index % 2 === 0 ? "md:justify-start" : "md:justify-end"}`}
              >
                <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-3 h-3 bg-green-400 rounded-full border-2 border-black z-10" />
                <Card className={`ml-10 md:ml-0 md:w-5/12 bg-black/60 border-green-400/20 backdrop-blur-md ${index % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"}`}>
                  <CardContent className="p-6">
                    <Badge variant="outline" className="border-green-400/50 text-green-400 font-mono text-xs mb-2">{exp.period}</Badge>
                    <h3 className="font-display text-lg text-green-400">{exp.role}</h3>
                    <p className="text-gray-400 text-sm mb-3">{exp.company} · {exp.location}</p>
                    <p className="text-gray-500 text-sm mb-4">{exp.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {exp.technologies?.map((t: string) => (
                        <Badge key={t} variant="secondary" className="text-[10px] bg-white/5">{t}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-display font-bold mb-10 text-center text-green-400"
          >
            Certifications & Learning
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {history.certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-black/60 border-green-400/20 text-center h-full backdrop-blur-md hover:border-green-400/40 transition-colors">
                  <CardContent className="p-6">
                    <Shield className="h-8 w-8 text-green-400 mx-auto mb-3" />
                    <h3 className="font-display text-sm text-green-400 mb-1">{cert.name}</h3>
                    <p className="text-xs text-gray-500">{cert.issuer}</p>
                    <Badge variant="outline" className="mt-2 border-green-400/30 text-green-400/70 text-xs">{cert.year}</Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
