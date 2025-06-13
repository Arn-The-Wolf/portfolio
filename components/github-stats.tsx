"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, Star, GitFork, Eye, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string
  html_url: string
  stargazers_count: number
  forks_count: number
  watchers_count: number
  language: string
  topics: string[]
  updated_at: string
}

interface GitHubStats {
  public_repos: number
  followers: number
  following: number
  total_stars: number
  total_commits: number
}

export default function GitHubStats() {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchGitHubData()
  }, [])

  const fetchGitHubData = async () => {
    try {
      setLoading(true)

      // Replace 'yourusername' with actual GitHub username
      const username = "yourusername"

      // Fetch user stats
      const userResponse = await fetch(`https://api.github.com/users/${username}`)
      const userData = await userResponse.json()

      // Fetch repositories
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
      const reposData = await reposResponse.json()

      // Calculate total stars
      const totalStars = reposData.reduce((sum: number, repo: GitHubRepo) => sum + repo.stargazers_count, 0)

      setStats({
        public_repos: userData.public_repos,
        followers: userData.followers,
        following: userData.following,
        total_stars: totalStars,
        total_commits: 1250, // This would need GitHub GraphQL API for accurate count
      })

      setRepos(reposData.slice(0, 6))
    } catch (err) {
      setError("Failed to fetch GitHub data")
      console.error("GitHub API Error:", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="bg-black/40 border-green-400/20 animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-green-400/20 rounded mb-2"></div>
              <div className="h-3 bg-green-400/10 rounded mb-4"></div>
              <div className="flex space-x-4">
                <div className="h-3 bg-green-400/10 rounded w-16"></div>
                <div className="h-3 bg-green-400/10 rounded w-16"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Card className="bg-black/40 border-red-400/20">
        <CardContent className="p-6 text-center">
          <p className="text-red-400 font-mono">ERROR: {error}</p>
          <Button onClick={fetchGitHubData} className="mt-4 bg-green-600 hover:bg-green-700 text-black font-mono">
            RETRY CONNECTION
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-8">
      {/* GitHub Stats Overview */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="bg-black/40 border-green-400/20 text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-400 font-mono">{stats.public_repos}</div>
              <div className="text-xs text-gray-400">REPOSITORIES</div>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-green-400/20 text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-400 font-mono">{stats.total_stars}</div>
              <div className="text-xs text-gray-400">TOTAL STARS</div>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-green-400/20 text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-400 font-mono">{stats.followers}</div>
              <div className="text-xs text-gray-400">FOLLOWERS</div>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-green-400/20 text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-400 font-mono">{stats.total_commits}</div>
              <div className="text-xs text-gray-400">COMMITS</div>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-green-400/20 text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-400 font-mono">{stats.following}</div>
              <div className="text-xs text-gray-400">FOLLOWING</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Recent Repositories */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map((repo, index) => (
          <motion.div
            key={repo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="bg-black/40 border-green-400/20 h-full flex flex-col hover:border-green-400/40 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="font-mono text-green-400 text-lg">{repo.name}</span>
                  <Github className="h-5 w-5 text-green-400" />
                </CardTitle>
                <p className="text-gray-300 text-sm">{repo.description || "No description available"}</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    {repo.stargazers_count}
                  </div>
                  <div className="flex items-center">
                    <GitFork className="h-4 w-4 mr-1" />
                    {repo.forks_count}
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    {repo.watchers_count}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {repo.language && (
                    <Badge variant="secondary" className="text-xs">
                      {repo.language}
                    </Badge>
                  )}
                  {repo.topics.slice(0, 3).map((topic) => (
                    <Badge key={topic} variant="outline" className="text-xs border-green-400/30 text-green-400">
                      {topic}
                    </Badge>
                  ))}
                </div>

                <div className="text-xs text-gray-500 mb-4">
                  Updated: {new Date(repo.updated_at).toLocaleDateString()}
                </div>
              </CardContent>
              <div className="p-6 pt-0">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full border-green-400 text-green-400 hover:bg-green-400 hover:text-black font-mono"
                >
                  <Link href={repo.html_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    VIEW CODE
                  </Link>
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
