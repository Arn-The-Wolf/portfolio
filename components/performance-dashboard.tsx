"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { Activity, Zap, Globe, Shield, Clock, TrendingUp, Server, Users, Eye, MousePointer } from "lucide-react"

interface PerformanceMetrics {
  pageSpeed: number
  uptime: number
  security: number
  seo: number
  accessibility: number
  visitors: number
  pageViews: number
  bounceRate: number
  avgSessionDuration: string
  loadTime: number
}

export default function PerformanceDashboard() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    pageSpeed: 95,
    uptime: 99.9,
    security: 98,
    seo: 92,
    accessibility: 96,
    visitors: 1247,
    pageViews: 3891,
    bounceRate: 23,
    avgSessionDuration: "3:42",
    loadTime: 0.8,
  })

  const [isLive, setIsLive] = useState(true)

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        visitors: prev.visitors + Math.floor(Math.random() * 3),
        pageViews: prev.pageViews + Math.floor(Math.random() * 5),
        loadTime: Math.round((0.7 + Math.random() * 0.4) * 100) / 100,
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const performanceCards = [
    {
      title: "Page Speed",
      value: metrics.pageSpeed,
      unit: "/100",
      icon: Zap,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      description: "Core Web Vitals Score",
    },
    {
      title: "Uptime",
      value: metrics.uptime,
      unit: "%",
      icon: Activity,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      description: "System Availability",
    },
    {
      title: "Security",
      value: metrics.security,
      unit: "/100",
      icon: Shield,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      description: "Security Headers & SSL",
    },
    {
      title: "SEO Score",
      value: metrics.seo,
      unit: "/100",
      icon: Globe,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      description: "Search Optimization",
    },
  ]

  const analyticsCards = [
    {
      title: "Visitors",
      value: metrics.visitors.toLocaleString(),
      unit: "",
      icon: Users,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      description: "Unique visitors today",
    },
    {
      title: "Page Views",
      value: metrics.pageViews.toLocaleString(),
      unit: "",
      icon: Eye,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
      description: "Total page views",
    },
    {
      title: "Bounce Rate",
      value: metrics.bounceRate,
      unit: "%",
      icon: MousePointer,
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
      description: "Single page sessions",
    },
    {
      title: "Load Time",
      value: metrics.loadTime,
      unit: "s",
      icon: Clock,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      description: "Average load time",
    },
  ]

  return (
    <section className="py-20 px-4 bg-black/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <h2 className="text-4xl font-bold font-mono">
              <span className="text-green-400">{">"}</span> SYSTEM DIAGNOSTICS
            </h2>
            <div className="ml-4 flex items-center">
              <div className={`w-3 h-3 rounded-full ${isLive ? "bg-green-400" : "bg-red-400"} animate-pulse`}></div>
              <span className="ml-2 text-sm font-mono text-green-400">{isLive ? "LIVE" : "OFFLINE"}</span>
            </div>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Real-time performance monitoring and analytics for mission-critical systems.
          </p>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold mb-6 font-mono text-green-400">PERFORMANCE METRICS</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {performanceCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-black/40 border-green-400/20 hover:border-green-400/40 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-2 rounded-lg ${card.bgColor}`}>
                        <card.icon className={`h-6 w-6 ${card.color}`} />
                      </div>
                      <Badge variant="outline" className={`border-green-400/50 ${card.color} font-mono`}>
                        OPTIMAL
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-baseline">
                        <span className={`text-3xl font-bold ${card.color} font-mono`}>{card.value}</span>
                        <span className="text-gray-400 ml-1">{card.unit}</span>
                      </div>
                      <p className="text-sm text-gray-400">{card.description}</p>
                      <Progress value={card.value} className="h-2 bg-gray-700" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Analytics Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold mb-6 font-mono text-green-400">TRAFFIC ANALYTICS</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {analyticsCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-black/40 border-green-400/20 hover:border-green-400/40 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-2 rounded-lg ${card.bgColor}`}>
                        <card.icon className={`h-6 w-6 ${card.color}`} />
                      </div>
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-baseline">
                        <span className={`text-3xl font-bold ${card.color} font-mono`}>{card.value}</span>
                        <span className="text-gray-400 ml-1">{card.unit}</span>
                      </div>
                      <p className="text-sm text-gray-400">{card.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-6 font-mono text-green-400">SYSTEM STATUS</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-black/40 border-green-400/20">
              <CardHeader>
                <CardTitle className="flex items-center font-mono text-green-400">
                  <Server className="h-5 w-5 mr-2" />
                  SERVER STATUS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">API Response</span>
                    <Badge className="bg-green-600 text-black">OPTIMAL</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Database</span>
                    <Badge className="bg-green-600 text-black">ONLINE</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">CDN</span>
                    <Badge className="bg-green-600 text-black">ACTIVE</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-green-400/20">
              <CardHeader>
                <CardTitle className="flex items-center font-mono text-green-400">
                  <Shield className="h-5 w-5 mr-2" />
                  SECURITY STATUS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">SSL Certificate</span>
                    <Badge className="bg-green-600 text-black">VALID</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Firewall</span>
                    <Badge className="bg-green-600 text-black">ACTIVE</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">DDoS Protection</span>
                    <Badge className="bg-green-600 text-black">ENABLED</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-green-400/20">
              <CardHeader>
                <CardTitle className="flex items-center font-mono text-green-400">
                  <Activity className="h-5 w-5 mr-2" />
                  MONITORING
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Error Rate</span>
                    <Badge variant="outline" className="border-green-400 text-green-400">
                      0.01%
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Response Time</span>
                    <Badge variant="outline" className="border-green-400 text-green-400">
                      0.8s
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Availability</span>
                    <Badge variant="outline" className="border-green-400 text-green-400">
                      99.9%
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
