"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, Search } from "lucide-react"
import Link from "next/link"
import PageHeader from "@/components/page-header"

export interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  readTime: string
  tags: string[]
  category: string
  featured: boolean
}

export default function BlogClient({ posts }: { posts: BlogPost[] }) {
  const [searchTerm, setSearchTerm] = useState("")

  const filtered = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="relative min-h-screen">
      <section className="relative z-10 pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <PageHeader
            title="Blog"
            subtitle="Technical notes from my projects"
          />

          <div className="relative mb-10">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background/80 border-input text-foreground"
            />
          </div>

          <div className="space-y-6">
            {filtered.map((post, index) => (
              <motion.div key={post.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}>
                <Link href={`/blog/${post.slug}`}>
                  <Card className="glass-card-hover cursor-pointer h-full">
                    <CardHeader>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge variant="outline" className="border-primary/40 text-primary">{post.category}</Badge>
                        {post.featured && <Badge className="btn-primary">Featured</Badge>}
                      </div>
                      <CardTitle className="text-primary font-display">{post.title}</CardTitle>
                      <CardDescription>{post.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag) => (
                          <span key={tag} className="text-xs text-primary/70">#{tag}</span>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">{post.date} · {post.readTime}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
