"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, Search } from "lucide-react"
import StarsBackground from "@/components/stars-background"

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
  const [selected, setSelected] = useState<BlogPost | null>(null)

  const filtered = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="relative min-h-screen">
      <StarsBackground />
      <section className="relative z-10 pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-display font-bold text-green-400 mb-3">Blog</h1>
            <p className="text-gray-400 text-sm">Technical notes from my projects</p>
          </header>

          <div className="relative mb-10">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black/60 border-green-400/30 text-green-400"
            />
          </div>

          {selected ? (
            <article className="border border-green-400/20 rounded-xl bg-black/60 p-8 backdrop-blur-md">
              <button onClick={() => setSelected(null)} className="text-sm text-green-400 mb-6 hover:underline">
                ← Back to all posts
              </button>
              <h2 className="text-2xl font-display text-green-400 mb-4">{selected.title}</h2>
              <div className="flex gap-4 text-xs text-gray-500 mb-6">
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{selected.date}</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{selected.readTime}</span>
              </div>
              <div className="text-gray-300 leading-relaxed whitespace-pre-line">{selected.content}</div>
            </article>
          ) : (
            <div className="space-y-6">
              {filtered.map((post, index) => (
                <motion.div key={post.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}>
                  <Card
                    className="bg-black/60 border-green-400/20 backdrop-blur-md cursor-pointer hover:border-green-400/40 transition-colors"
                    onClick={() => setSelected(post)}
                  >
                    <CardHeader>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge variant="outline" className="border-green-400/40 text-green-400">{post.category}</Badge>
                        {post.featured && <Badge className="bg-green-600 text-black">Featured</Badge>}
                      </div>
                      <CardTitle className="text-green-400">{post.title}</CardTitle>
                      <CardDescription className="text-gray-400">{post.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag) => (
                          <span key={tag} className="text-xs text-green-400/60">#{tag}</span>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500">{post.date} · {post.readTime}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
