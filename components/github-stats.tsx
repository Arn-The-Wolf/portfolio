"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, Star, GitFork, Eye, ExternalLink, Users } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  watchers_count: number
  language: string | null
  topics: string[]
  updated_at: string
}

interface GitHubData {
  user: {
    login: string
    name: string | null
    bio: string | null
    avatar_url: string
    html_url: string
    public_repos: number
    followers: number
    following: number
  }
  stats: {
    public_repos: number
    followers: number
    following: number
    total_stars: number
  }
  featured: GitHubRepo[]
  recent: GitHubRepo[]
}

export default function GitHubStats() {
  const [data, setData] = useState<GitHubData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch("/api/github")
      if (!res.ok) throw new Error("Failed to fetch")
      setData(await res.json())
    } catch {
      setError("Failed to establish GitHub uplink")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 bg-green-400/5 border border-green-400/10 rounded-lg animate-pulse" />
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-48 bg-green-400/5 border border-green-400/10 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <Card className="bg-black/40 border-red-400/20">
        <CardContent className="p-6 text-center">
          <p className="text-red-400 font-mono mb-4">{error}</p>
          <Button onClick={fetchData} className="bg-green-600 hover:bg-green-700 text-black font-mono">
            RETRY UPLINK
          </Button>
        </CardContent>
      </Card>
    )
  }

  const allRepos = [...data.featured, ...data.recent].slice(0, 6)

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-black/40 border border-green-400/20 rounded-xl backdrop-blur-sm"
      >
        <Image
          src={data.user.avatar_url}
          alt={data.user.login}
          width={80}
          height={80}
          className="rounded-full border-2 border-green-400/50"
          unoptimized
        />
        <div className="text-center sm:text-left flex-1">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
            <Github className="h-5 w-5 text-green-400" />
            <Link href={data.user.html_url} target="_blank" className="font-display text-xl text-green-400 hover:underline">
              @{data.user.login}
            </Link>
          </div>
          {data.user.bio && <p className="text-gray-400 text-sm">{data.user.bio}</p>}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "REPOS", value: data.stats.public_repos },
            { label: "STARS", value: data.stats.total_stars },
            { label: "FOLLOWERS", value: data.stats.followers, icon: Users },
            { label: "FOLLOWING", value: data.stats.following },
          ].map((stat) => (
            <div key={stat.label} className="text-center px-3">
              <div className="text-xl font-display font-bold text-green-400">{stat.value}</div>
              <div className="text-[10px] text-gray-500 font-mono">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allRepos.map((repo, index) => (
          <motion.div
            key={repo.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
          >
            <Card className="bg-black/40 border-green-400/20 h-full hover:border-green-400/50 transition-all duration-300 group">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  <span className="font-mono text-green-400 text-base truncate">{repo.name}</span>
                  <Github className="h-4 w-4 text-green-400/50 group-hover:text-green-400 transition-colors" />
                </CardTitle>
                <p className="text-gray-400 text-sm line-clamp-2">{repo.description || "No description"}</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3 font-mono">
                  <span className="flex items-center gap-1"><Star className="h-3 w-3" />{repo.stargazers_count}</span>
                  <span className="flex items-center gap-1"><GitFork className="h-3 w-3" />{repo.forks_count}</span>
                  {repo.language && <Badge variant="secondary" className="text-[10px] bg-white/5">{repo.language}</Badge>}
                </div>
                <Button asChild variant="outline" size="sm" className="w-full border-green-400/30 text-green-400 hover:bg-green-400/10 font-mono text-xs">
                  <Link href={repo.html_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-1 h-3 w-3" /> VIEW REPO
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
