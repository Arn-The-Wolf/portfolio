"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { TrendingUp, Users, Clock, Shield, Zap, Target, CheckCircle, ArrowRight, BarChart3, Globe } from "lucide-react"

const caseStudies = [
  {
    id: 1,
    title: "E-Commerce Platform Transformation",
    client: "TechCorp Solutions",
    industry: "E-Commerce",
    duration: "6 months",
    team: "5 engineers",
    challenge:
      "Legacy monolithic architecture causing performance bottlenecks and limiting scalability for a growing e-commerce platform serving 100K+ daily users.",
    solution:
      "Migrated to microservices architecture using Next.js, Node.js, and Kubernetes, implementing advanced caching strategies and real-time inventory management.",
    results: [
      { metric: "Page Load Time", before: "4.2s", after: "0.8s", improvement: "81%" },
      { metric: "Server Response", before: "2.1s", after: "0.3s", improvement: "86%" },
      { metric: "Uptime", before: "97.2%", after: "99.9%", improvement: "2.7%" },
      { metric: "Conversion Rate", before: "2.1%", after: "4.8%", improvement: "128%" },
    ],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Kubernetes", "Docker"],
    image: "/placeholder.svg?height=400&width=800",
    testimonial: "Arnold transformed our entire platform. The performance improvements exceeded all expectations.",
    testimonialAuthor: "Sarah Johnson, CTO",
  },
  {
    id: 2,
    title: "Real-Time Analytics Dashboard",
    client: "DataSecure Inc.",
    industry: "FinTech",
    duration: "4 months",
    team: "3 engineers",
    challenge:
      "Financial services company needed real-time fraud detection and analytics dashboard to process millions of transactions daily with sub-second response times.",
    solution:
      "Built high-performance real-time analytics system using React, WebSockets, and event-driven architecture with machine learning integration for fraud detection.",
    results: [
      { metric: "Processing Speed", before: "5.2s", after: "0.4s", improvement: "92%" },
      { metric: "Fraud Detection", before: "78%", after: "96%", improvement: "23%" },
      { metric: "False Positives", before: "12%", after: "2%", improvement: "83%" },
      { metric: "System Reliability", before: "94%", after: "99.8%", improvement: "6%" },
    ],
    technologies: ["React", "Python", "TensorFlow", "WebSockets", "Apache Kafka", "MongoDB"],
    image: "/placeholder.svg?height=400&width=800",
    testimonial: "The fraud detection system Arnold built saved us millions in potential losses.",
    testimonialAuthor: "David Chen, Lead Engineer",
  },
  {
    id: 3,
    title: "Mobile-First Healthcare Platform",
    client: "MedTech Innovations",
    industry: "Healthcare",
    duration: "8 months",
    team: "7 engineers",
    challenge:
      "Healthcare provider needed HIPAA-compliant mobile platform for patient management, telemedicine, and secure data sharing across multiple devices and platforms.",
    solution:
      "Developed cross-platform mobile application using React Native with end-to-end encryption, offline capabilities, and seamless integration with existing healthcare systems.",
    results: [
      { metric: "Patient Engagement", before: "34%", after: "87%", improvement: "156%" },
      { metric: "Appointment Efficiency", before: "68%", after: "94%", improvement: "38%" },
      { metric: "Data Security Score", before: "82%", after: "98%", improvement: "20%" },
      { metric: "User Satisfaction", before: "3.2/5", after: "4.8/5", improvement: "50%" },
    ],
    technologies: ["React Native", "Node.js", "PostgreSQL", "AWS", "Socket.io", "Firebase"],
    image: "/placeholder.svg?height=400&width=800",
    testimonial: "Arnold delivered a platform that revolutionized how we serve our patients.",
    testimonialAuthor: "Dr. Emily Rodriguez, Chief Medical Officer",
  },
]

export default function CaseStudies() {
  const [selectedStudy, setSelectedStudy] = useState(caseStudies[0])

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-12 text-center font-mono"
        >
          <span className="text-green-400">{">"}</span> MISSION CASE STUDIES
        </motion.h2>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Case Study Selection */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              {caseStudies.map((study, index) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    className={`cursor-pointer transition-all duration-300 ${
                      selectedStudy.id === study.id
                        ? "bg-green-400/10 border-green-400"
                        : "bg-black/40 border-green-400/20 hover:border-green-400/40"
                    }`}
                    onClick={() => setSelectedStudy(study)}
                  >
                    <CardContent className="p-4">
                      <h3 className="font-mono text-green-400 mb-2">{study.title}</h3>
                      <p className="text-sm text-gray-400 mb-2">{study.client}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{study.industry}</span>
                        <span>{study.duration}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Case Study Details */}
          <div className="lg:col-span-2">
            <motion.div
              key={selectedStudy.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-black/40 border-green-400/20">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={selectedStudy.image || "/placeholder.svg"}
                    alt={selectedStudy.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-2">{selectedStudy.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-300">
                      <span className="flex items-center">
                        <Globe className="h-4 w-4 mr-1" />
                        {selectedStudy.client}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {selectedStudy.duration}
                      </span>
                      <span className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {selectedStudy.team}
                      </span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-black/60">
                      <TabsTrigger value="overview" className="font-mono">
                        OVERVIEW
                      </TabsTrigger>
                      <TabsTrigger value="results" className="font-mono">
                        RESULTS
                      </TabsTrigger>
                      <TabsTrigger value="tech" className="font-mono">
                        TECH STACK
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-6">
                      <div>
                        <h4 className="text-lg font-mono text-green-400 mb-3 flex items-center">
                          <Target className="h-5 w-5 mr-2" />
                          MISSION CHALLENGE
                        </h4>
                        <p className="text-gray-300 leading-relaxed">{selectedStudy.challenge}</p>
                      </div>

                      <div>
                        <h4 className="text-lg font-mono text-green-400 mb-3 flex items-center">
                          <Zap className="h-5 w-5 mr-2" />
                          TACTICAL SOLUTION
                        </h4>
                        <p className="text-gray-300 leading-relaxed">{selectedStudy.solution}</p>
                      </div>

                      <div className="bg-green-400/10 border border-green-400/20 rounded-lg p-4">
                        <blockquote className="text-gray-300 italic mb-2">"{selectedStudy.testimonial}"</blockquote>
                        <cite className="text-green-400 font-mono text-sm">— {selectedStudy.testimonialAuthor}</cite>
                      </div>
                    </TabsContent>

                    <TabsContent value="results" className="space-y-6">
                      <h4 className="text-lg font-mono text-green-400 mb-4 flex items-center">
                        <BarChart3 className="h-5 w-5 mr-2" />
                        MISSION RESULTS
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {selectedStudy.results.map((result, index) => (
                          <Card key={index} className="bg-black/60 border-green-400/20">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-mono text-green-400">{result.metric}</span>
                                <Badge className="bg-green-600 text-black">+{result.improvement}</Badge>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-red-400">Before: {result.before}</span>
                                <ArrowRight className="h-4 w-4 text-gray-400" />
                                <span className="text-green-400">After: {result.after}</span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="tech" className="space-y-6">
                      <h4 className="text-lg font-mono text-green-400 mb-4 flex items-center">
                        <Shield className="h-5 w-5 mr-2" />
                        TECHNOLOGY ARSENAL
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {selectedStudy.technologies.map((tech) => (
                          <Badge key={tech} variant="outline" className="border-green-400/50 text-green-400 px-3 py-1">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mt-6">
                        <Card className="bg-black/60 border-green-400/20 text-center">
                          <CardContent className="p-4">
                            <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-2" />
                            <div className="text-lg font-bold text-green-400">Performance</div>
                            <div className="text-sm text-gray-400">Optimized</div>
                          </CardContent>
                        </Card>
                        <Card className="bg-black/60 border-green-400/20 text-center">
                          <CardContent className="p-4">
                            <Shield className="h-8 w-8 text-green-400 mx-auto mb-2" />
                            <div className="text-lg font-bold text-green-400">Security</div>
                            <div className="text-sm text-gray-400">Hardened</div>
                          </CardContent>
                        </Card>
                        <Card className="bg-black/60 border-green-400/20 text-center">
                          <CardContent className="p-4">
                            <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
                            <div className="text-lg font-bold text-green-400">Delivery</div>
                            <div className="text-sm text-gray-400">On Time</div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
