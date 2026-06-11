"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { professionalData } from "@/lib/professional-data"
import { SpaceHud3D } from "@/components/space-hud-3d"
import Autoplay from "embla-carousel-autoplay"

export default function ReportsPage() {
  const testimonialsData = professionalData.testimonials

  return (
    <div className="relative min-h-screen pt-24 pb-12">
      <SpaceHud3D />
      
      <section id="testimonials" className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold mb-12 text-center font-mono text-green-400"
          >
            <span className="text-green-500">{">"}</span> FIELD REPORTS
          </motion.h2>

          <Carousel 
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent>
              {testimonialsData.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="h-full"
                  >
                    <Card className="bg-black/60 border-green-400/20 h-full backdrop-blur-md">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border border-green-400/30">
                            <img
                              src={testimonial.image || "/placeholder.svg"}
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-mono text-green-400">{testimonial.name}</h3>
                            <p className="text-sm text-gray-400">{testimonial.role}</p>
                          </div>
                        </div>
                        <p className="text-gray-300 italic">"{testimonial.content}"</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:flex">
              <CarouselPrevious className="text-green-400 border-green-400/30 hover:bg-green-400 hover:text-black" />
              <CarouselNext className="text-green-400 border-green-400/30 hover:bg-green-400 hover:text-black" />
            </div>
            <div className="flex justify-center mt-6 md:hidden">
              <Button
                variant="outline"
                size="icon"
                className="text-green-400 border-green-400/30 hover:bg-green-400 hover:text-black mr-4 backdrop-blur-sm"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="text-green-400 border-green-400/30 hover:bg-green-400 hover:text-black backdrop-blur-sm"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </Carousel>
        </div>
      </section>
    </div>
  )
}
