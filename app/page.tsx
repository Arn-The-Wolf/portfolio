"use client"

import { useState, useRef, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars, Text, Float } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GeistMono } from 'geist/font/mono'
import {
  Moon,
  Sun,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Server,
  Smartphone,
  Globe,
  Shield,
  Rocket,
  Terminal,
  Cloud,
  Download,
  ChevronLeft,
  ChevronRight,
  Send,
  Twitter,
  Instagram,
} from "lucide-react"
import Link from "next/link"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { sendContactEmail } from "@/app/actions"
import { useToast } from "@/hooks/use-toast"
import CountUp from "@/components/count-up"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { useTheme } from "@/hooks/use-theme"
import GitHubStats from "@/components/github-stats"
import CaseStudies from "@/components/case-studies"
import PerformanceDashboard from "@/components/performance-dashboard"
import { professionalData } from "@/lib/professional-data"
import { ClientScene } from './components/ClientScene'
import { ThreeScene } from './components/ThreeScene'

export default function Portfolio() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const formRef = useRef<HTMLFormElement>(null)
  const [selectedFilter, setSelectedFilter] = useState("all")

  // Animation refs
  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [skillsRef, skillsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [projectsRef, projectsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { isDark, toggleTheme } = useTheme()

  const skills = professionalData.skills
  const projects = professionalData.projects
  const projectFilters = ["frontend", "backend", "fullstack", "mobile", "devops"]

  // Filter projects based on selected filter
  const filteredProjects =
    selectedFilter === "all"
      ? projects
      : projects.filter((project) => {
        const techStack = project.technologies.join(" ").toLowerCase()
        switch (selectedFilter) {
          case "frontend":
            return techStack.includes("react") || techStack.includes("vue") || techStack.includes("next")
          case "backend":
            return techStack.includes("node") || techStack.includes("python") || techStack.includes("express")
          case "fullstack":
            return (
              (techStack.includes("react") || techStack.includes("vue")) &&
              (techStack.includes("node") || techStack.includes("python"))
            )
          case "mobile":
            return techStack.includes("react native") || techStack.includes("flutter")
          case "devops":
            return techStack.includes("docker") || techStack.includes("kubernetes") || techStack.includes("aws")
          default:
            return true
        }
      })

  const testimonialsData = professionalData.testimonials

  const statsData = [
    { label: "YEARS EXPERIENCE", value: professionalData.stats.yearsExperience, suffix: "+" },
    { label: "PROJECTS COMPLETED", value: professionalData.stats.projectsCompleted, suffix: "+" },
    { label: "CLIENTS SATISFIED", value: professionalData.stats.clientsSatisfied, suffix: "+" },
    { label: "UPTIME ACHIEVED", value: professionalData.stats.uptimeAchieved, suffix: "%" },
  ]

  const experienceData = professionalData.experience
  const certifications = professionalData.certifications

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    try {
      const result = await sendContactEmail(formData)
      if (result.success) {
        toast({
          title: "Message Sent",
          description: "Your transmission has been received. Standby for response.",
          variant: "default",
        })
        formRef.current?.reset()
      } else {
        toast({
          title: "Transmission Failed",
          description: result.message || "Please try again later.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Transmission Error",
        description: "A communication error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "dark bg-black text-green-400" : "bg-gray-50 text-gray-900"} ${GeistMono.className}`}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/20 border-b border-green-400/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-green-400" />
              <span className="text-xl font-bold font-mono">OPERATIVE.DEV</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="#about" className="hover:text-green-300 transition-colors font-mono">
                INTEL
              </Link>
              <Link href="#skills" className="hover:text-green-300 transition-colors font-mono">
                ARSENAL
              </Link>
              <Link href="#experience" className="hover:text-green-300 transition-colors font-mono">
                HISTORY
              </Link>
              <Link href="#projects" className="hover:text-green-300 transition-colors font-mono">
                MISSIONS
              </Link>
              <Link href="#github" className="hover:text-green-300 transition-colors font-mono">
                GITHUB
              </Link>
              <Link href="#cases" className="hover:text-green-300 transition-colors font-mono">
                CASES
              </Link>
              <Link href="#testimonials" className="hover:text-green-300 transition-colors font-mono">
                REPORTS
              </Link>
              <Link href="#contact" className="hover:text-green-300 transition-colors font-mono">
                CONTACT
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-green-400 hover:text-green-300"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
            <div className="md:hidden flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-green-400 hover:text-green-300 mr-2"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <ThreeScene />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <Badge variant="outline" className="border-green-400 text-green-400 font-mono mb-4">
              STATUS: ACTIVE
            </Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold mb-6 font-mono"
          >
            <span className="text-green-400">RUYANGE</span>
            <br />
            <span className="text-white">ARNOLD</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 text-gray-300 font-mono"
          >
            {professionalData.bio.short}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8"
          >
            <Button className="bg-green-600 hover:bg-green-700 text-black font-mono">
              <Terminal className="mr-2 h-4 w-4" />
              DEPLOY MISSION
            </Button>
            <Button
              variant="outline"
              className="border-green-400 text-green-400 hover:bg-green-400 hover:text-black font-mono"
            >
              <Rocket className="mr-2 h-4 w-4" />
              VIEW INTEL
            </Button>
            <Button
              variant="outline"
              className="border-green-400 text-green-400 hover:bg-green-400 hover:text-black font-mono"
              onClick={() => window.open("/resume.pdf", "_blank")}
            >
              <Download className="mr-2 h-4 w-4" />
              DOWNLOAD DOSSIER
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex justify-center space-x-6"
          >
            <Link href="https://github.com/Arn-The-Wolf" className="text-green-400 hover:text-green-300 transition-colors">
              <Github className="h-6 w-6" />
            </Link>
            <Link href="https://linkedin.com" className="text-green-400 hover:text-green-300 transition-colors">
              <Linkedin className="h-6 w-6" />
            </Link>
            <Link href="mailto:arnwolfie5@gmail.com" className="text-green-400 hover:text-green-300 transition-colors">
              <Mail className="h-6 w-6" />
            </Link>
            <Link href="https://x.com/arnwolfie" className="text-green-400 hover:text-green-300 transition-colors">
              <Twitter className="h-6 w-6" />
            </Link>
            <Link href="https://www.instagram.com/arnwolfie/" className="text-green-400 hover:text-green-300 transition-colors">
              <Instagram className="h-6 w-6" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold mb-12 text-center font-mono"
          >
            <span className="text-green-400">{">"}</span> OPERATIVE INTEL
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-lg mb-6 leading-relaxed">
                {professionalData.bio.long.split('\n')[0]}
              </p>
              <p className="text-lg mb-6 leading-relaxed">
                {professionalData.bio.long.split('\n')[2]}
              </p>
              <div ref={statsRef} className="grid grid-cols-2 gap-4">
                {statsInView ? statsData.map((stat, index) => (
                  <div key={index} className="border border-green-400/20 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-400 font-mono">
                      {statsInView ? <CountUp end={stat.value} duration={2} suffix={stat.suffix} /> : `0${stat.suffix}`}
                    </div>
                    <div className="text-sm">{stat.label}</div>
                  </div>
                )) : null}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="w-full h-96 border border-green-400/20 rounded-lg overflow-hidden">
                <Canvas camera={{ position: [0, 0, 3] }}>
                  <Suspense fallback={null}>
                    <ambientLight intensity={0.2} />
                    <pointLight position={[10, 10, 10]} />
                    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                      <Text
                        position={[0, 0, 0]}
                        fontSize={0.5}
                        color="#ffffff"
                        anchorX="center"
                        anchorY="middle"
                        font={GeistMono.style.fontFamily}
                      >
                        {"<CLASSIFIED/>"}
                      </Text>
                    </Float>
                    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
                  </Suspense>
                </Canvas>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold mb-12 text-center font-mono"
          >
            <span className="text-green-400">{">"}</span> TACTICAL ARSENAL
          </motion.h2>
          <div ref={skillsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(skills).map(([category, skillList], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              >
                <Card className="bg-black/40 border-green-400/20">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 font-mono text-green-400">
                      {category === "frontend" && <Globe className="h-5 w-5" />}
                      {category === "backend" && <Server className="h-5 w-5" />}
                      {category === "devops" && <Cloud className="h-5 w-5" />}
                      {category === "mobile" && <Smartphone className="h-5 w-5" />}
                      <span>{category.toUpperCase()}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {skillList.map((skill, index) => (
                        <div key={skill.name}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-mono">{skill.name}</span>
                            <span className="text-sm text-green-400 font-mono">
                              {skillsInView ? (
                                <CountUp end={skill.level} duration={1.5 + index * 0.1} suffix="%" />
                              ) : (
                                "0%"
                              )}
                            </span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={skillsInView ? { width: `${skill.level}%` } : { width: 0 }}
                              transition={{ duration: 1.5, delay: 0.2 + index * 0.1 }}
                              className="bg-green-400 h-2 rounded-full"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline Section */}
      <section id="experience" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold mb-12 text-center font-mono"
          >
            <span className="text-green-400">{">"}</span> MISSION HISTORY
          </motion.h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-green-400/20"></div>
            {experienceData.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative flex items-center mb-12 ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
              >
                <div className={`w-5/12 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}>
                  <Card className="bg-black/40 border-green-400/20">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-2">
                        <Badge variant="outline" className="border-green-400 text-green-400 font-mono text-xs">
                          {exp.period}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-mono text-green-400 mb-2">{exp.role}</h3>
                      <h4 className="text-lg text-gray-300 mb-3">{exp.company}</h4>
                      <p className="text-gray-400 mb-4">{exp.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold mb-12 text-center font-mono"
          >
            <span className="text-green-400">{">"}</span> SECURITY CLEARANCES
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-black/40 border-green-400/20 text-center h-full">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-green-400/10 rounded-full flex items-center justify-center">
                      <Shield className="h-8 w-8 text-green-400" />
                    </div>
                    <h3 className="font-mono text-green-400 mb-2">{cert.name}</h3>
                    <p className="text-sm text-gray-400 mb-2">{cert.issuer}</p>
                    <Badge variant="outline" className="border-green-400/50 text-green-400/70 text-xs">
                      {cert.year}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GitHub Integration Section */}
      <section id="github" className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold mb-12 text-center font-mono"
          >
            <span className="text-green-400">{">"}</span> CODE REPOSITORY
          </motion.h2>
          <GitHubStats />
        </div>
      </section>

      {/* Case Studies Section */}
      <CaseStudies />

      {/* Performance Dashboard */}
      <PerformanceDashboard />

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold mb-12 text-center font-mono"
          >
            <span className="text-green-400">{">"}</span> FIELD REPORTS
          </motion.h2>

          <Carousel className="w-full">
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
                    <Card className="bg-black/40 border-green-400/20 h-full">
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
                className="text-green-400 border-green-400/30 hover:bg-green-400 hover:text-black mr-4"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="text-green-400 border-green-400/30 hover:bg-green-400 hover:text-black"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </Carousel>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold mb-12 text-center font-mono"
          >
            <span className="text-green-400">{">"}</span> ESTABLISH CONTACT
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-mono text-green-400 mb-6">TRANSMISSION DETAILS</h3>
              <p className="text-lg mb-8 text-gray-300">
                Ready to deploy on your next mission? Let's establish secure communications. Fill out the encrypted form
                or use one of the direct channels below.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <Card className="bg-black/40 border-green-400/20">
                  <CardContent className="p-6 text-center">
                    <Mail className="h-8 w-8 text-green-400 mx-auto mb-4" />
                    <h3 className="font-mono text-green-400 mb-2">SECURE EMAIL</h3>
                    <p className="text-gray-300">arnwolfie5@gmail.com</p>
                  </CardContent>
                </Card>
                <Card className="bg-black/40 border-green-400/20">
                  <CardContent className="p-6 text-center">
                    <Github className="h-8 w-8 text-green-400 mx-auto mb-4" />
                    <h3 className="font-mono text-green-400 mb-2">CODE REPOSITORY</h3>
                    <p className="text-gray-300">github.com/Arn-The-Wolf</p>
                  </CardContent>
                </Card>
                <Card className="bg-black/40 border-green-400/20">
                  <CardContent className="p-6 text-center">
                    <Linkedin className="h-8 w-8 text-green-400 mx-auto mb-4" />
                    <h3 className="font-mono text-green-400 mb-2">NETWORK</h3>
                    <p className="text-gray-300">linkedin.com</p>
                  </CardContent>
                </Card>
                <Card className="bg-black/40 border-green-400/20">
                  <CardContent className="p-6 text-center">
                    <Terminal className="h-8 w-8 text-green-400 mx-auto mb-4" />
                    <h3 className="font-mono text-green-400 mb-2">COMMAND LINE</h3>
                    <p className="text-gray-300">contact --secure</p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-black/40 border-green-400/20">
                <CardHeader>
                  <CardTitle className="font-mono text-green-400">SECURE TRANSMISSION</CardTitle>
                  <CardDescription className="text-gray-300">
                    All communications are encrypted and secure.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form ref={formRef} action={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-mono">
                          CODENAME
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          className="w-full bg-black/60 border border-green-400/30 rounded-md p-2 text-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-mono">
                          SECURE CHANNEL (EMAIL)
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          className="w-full bg-black/60 border border-green-400/30 rounded-md p-2 text-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/50"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-mono">
                        MISSION SUBJECT
                      </label>
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        className="w-full bg-black/60 border border-green-400/30 rounded-md p-2 text-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-mono">
                        ENCRYPTED MESSAGE
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        className="w-full bg-black/60 border border-green-400/30 rounded-md p-2 text-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/50"
                      ></textarea>
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-green-600 hover:bg-green-700 text-black font-mono"
                    >
                      {isSubmitting ? (
                        "TRANSMITTING..."
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          TRANSMIT MESSAGE
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-green-400/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6 text-green-400" />
                <span className="text-lg font-bold font-mono">ARNOLD.DEV</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Elite fullstack engineering for mission-critical applications and secure systems.
              </p>
              <div className="flex space-x-4">
                <Link href="https://github.com/Arn-The-Wolf" className="text-green-400 hover:text-green-300 transition-colors">
                  <Github className="h-5 w-5" />
                </Link>
                <Link href="https://linkedin.com" className="text-green-400 hover:text-green-300 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link href="mailto:arnwolfie5@gmail.com" className="text-green-400 hover:text-green-300 transition-colors">
                  <Mail className="h-5 w-5" />
                </Link>
                <Link href="https://x.com/arnwolfie" className="text-green-400 hover:text-green-300 transition-colors">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="https://www.instagram.com/arnwolfie/" className="text-green-400 hover:text-green-300 transition-colors">
                  <Instagram className="h-5 w-5" />
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-mono text-green-400 mb-4">NAVIGATION</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#about" className="text-gray-400 hover:text-green-400 transition-colors">
                    INTEL
                  </Link>
                </li>
                <li>
                  <Link href="#skills" className="text-gray-400 hover:text-green-400 transition-colors">
                    ARSENAL
                  </Link>
                </li>
                <li>
                  <Link href="#experience" className="text-gray-400 hover:text-green-400 transition-colors">
                    HISTORY
                  </Link>
                </li>
                <li>
                  <Link href="#projects" className="text-gray-400 hover:text-green-400 transition-colors">
                    MISSIONS
                  </Link>
                </li>
                <li>
                  <Link href="#testimonials" className="text-gray-400 hover:text-green-400 transition-colors">
                    REPORTS
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-gray-400 hover:text-green-400 transition-colors">
                    CONTACT
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-mono text-green-400 mb-4">LEGAL PROTOCOLS</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                    PRIVACY POLICY
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                    TERMS OF SERVICE
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                    COOKIE POLICY
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-green-400/20 mt-8 pt-8 text-center">
            <p className="text-gray-400 font-mono text-sm">
              © {new Date().getFullYear()} OPERATIVE.DEV | CLASSIFIED OPERATIONS | ALL RIGHTS RESERVED
            </p>
          </div>
        </div>
      </footer>
      <Analytics />
      <SpeedInsights />
    </div>
  )
}
