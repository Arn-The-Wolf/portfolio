"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import PersonAvatar from "@/components/person-avatar"
import { siteConfig } from "@/lib/site-config"

export default function ReportsClient({ testimonials }: { testimonials: any[] }) {
  return (
    <div className="relative min-h-[calc(100vh-5rem)]">
      <div className="relative z-10 flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center px-4 py-24">
        <div className="w-full max-w-6xl mx-auto">
          <motion.header
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 md:mb-16"
          >
            <Badge variant="outline" className="border-primary/40 text-primary mb-4">
              {siteConfig.brand}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-primary mb-3">
              Testimonials
            </h1>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              Feedback from collaborators and project partners
            </p>
          </motion.header>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.4) }}
                className="w-full max-w-md"
              >
                <Card className="bg-card/80 border-border h-full backdrop-blur-md hover:border-primary/40 transition-colors">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-primary/30 shrink-0">
                        <PersonAvatar
                          name={testimonial.name}
                          src={testimonial.image}
                          className="w-full h-full rounded-full"
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-medium text-primary truncate">{testimonial.name}</h3>
                        <p className="text-sm text-muted-foreground truncate">{testimonial.role}</p>
                        <p className="text-xs text-muted-foreground truncate">{testimonial.company}</p>
                      </div>
                    </div>

                    <div className="flex gap-0.5 mb-3">
                      {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
                      ))}
                    </div>

                    <p className="text-foreground/80 text-sm leading-relaxed italic flex-1">
                      &ldquo;{testimonial.content}&rdquo;
                    </p>

                    {testimonial.project && (
                      <p className="text-xs text-primary/60 mt-4 pt-4 border-t border-border">
                        Project: {testimonial.project}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
