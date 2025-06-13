"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, Search, ArrowRight } from "lucide-react"
import Link from "next/link"

const blogPosts = [
  {
    id: 1,
    title: "Building Scalable Microservices Architecture",
    excerpt:
      "A comprehensive guide to designing and implementing microservices that can handle millions of requests per day.",
    content: "Full article content here...",
    author: "RUYANGE Arnold",
    date: "2024-01-15",
    readTime: "8 min read",
    tags: ["Architecture", "Microservices", "Scalability"],
    category: "Backend",
    image: "/placeholder.svg?height=400&width=800",
    featured: true,
  },
  {
    id: 2,
    title: "Advanced React Performance Optimization",
    excerpt: "Deep dive into React performance optimization techniques that can improve your app's speed by 300%.",
    content: "Full article content here...",
    author: "RUYANGE Arnold",
    date: "2024-01-10",
    readTime: "12 min read",
    tags: ["React", "Performance", "Frontend"],
    category: "Frontend",
    image: "/placeholder.svg?height=400&width=800",
    featured: false,
  },
  {
    id: 3,
    title: "Kubernetes Security Best Practices",
    excerpt: "Essential security practices for production Kubernetes deployments in enterprise environments.",
    content: "Full article content here...",
    author: "RUYANGE Arnold",
    date: "2024-01-05",
    readTime: "15 min read",
    tags: ["Kubernetes", "Security", "DevOps"],
    category: "DevOps",
    image: "/placeholder.svg?height=400&width=800",
    featured: true,
  },
  {
    id: 4,
    title: "Real-time Data Processing with WebSockets",
    excerpt: "Building high-performance real-time applications using WebSockets and event-driven architecture.",
    content: "Full article content here...",
    author: "RUYANGE Arnold",
    date: "2023-12-28",
    readTime: "10 min read",
    tags: ["WebSockets", "Real-time", "Node.js"],
    category: "Backend",
    image: "/placeholder.svg?height=400&width=800",
    featured: false,
  },
]

const categories = ["All", "Frontend", "Backend", "DevOps", "Security", "Architecture"]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const featuredPosts = blogPosts.filter((post) => post.featured)

  return (
    <div className="min-h-screen bg-black text-green-400 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-6 font-mono">
            <span className="text-green-400">{">"}</span> INTELLIGENCE REPORTS
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Technical insights, battle-tested strategies, and classified knowledge from the digital battlefield.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-400" />
              <Input
                placeholder="Search intelligence reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-black/60 border-green-400/30 text-green-400 placeholder-green-400/50"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`font-mono ${
                  selectedCategory === category
                    ? "bg-green-600 text-black"
                    : "border-green-400/30 text-green-400 hover:bg-green-400 hover:text-black"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Featured Posts */}
        {selectedCategory === "All" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-8 font-mono text-green-400">PRIORITY INTEL</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <Card
                  key={post.id}
                  className="bg-black/40 border-green-400/20 overflow-hidden group hover:border-green-400/40 transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-red-600 text-white font-mono">FEATURED</Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mb-2">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    <CardTitle className="font-mono text-green-400 group-hover:text-green-300 transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-gray-300">{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button asChild className="bg-green-600 hover:bg-green-700 text-black font-mono">
                      <Link href={`/blog/${post.id}`}>
                        READ INTEL
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* All Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-8 font-mono text-green-400">
            {selectedCategory === "All" ? "ALL REPORTS" : `${selectedCategory.toUpperCase()} REPORTS`}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-black/40 border-green-400/20 h-full flex flex-col group hover:border-green-400/40 transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className="border-green-400 text-green-400 font-mono text-xs">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="flex-grow">
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mb-2">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    <CardTitle className="font-mono text-green-400 group-hover:text-green-300 transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-gray-300">{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-green-400 text-green-400 hover:bg-green-400 hover:text-black font-mono"
                    >
                      <Link href={`/blog/${post.id}`}>
                        READ REPORT
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16"
        >
          <Card className="bg-black/40 border-green-400/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 font-mono text-green-400">CLASSIFIED BRIEFINGS</h3>
              <p className="text-gray-300 mb-6">
                Subscribe to receive exclusive intelligence reports and tactical insights directly to your secure
                channel.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  placeholder="Enter secure email..."
                  className="bg-black/60 border-green-400/30 text-green-400 placeholder-green-400/50"
                />
                <Button className="bg-green-600 hover:bg-green-700 text-black font-mono">SUBSCRIBE</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
