import { siteConfig } from "./site-config"

const USERNAME = process.env.GITHUB_USERNAME || "Arn-The-Wolf"
const GITHUB_FETCH_TIMEOUT_MS = 20_000
const GITHUB_MAX_RETRIES = 2

function githubHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  }
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }
  return headers
}

async function fetchGithub(url: string): Promise<Response | null> {
  for (let attempt = 0; attempt <= GITHUB_MAX_RETRIES; attempt++) {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), GITHUB_FETCH_TIMEOUT_MS)

    try {
      const response = await fetch(url, {
        headers: githubHeaders(),
        signal: controller.signal,
        next: { revalidate: 3600 },
      })
      clearTimeout(timeout)
      return response
    } catch {
      clearTimeout(timeout)
      if (attempt < GITHUB_MAX_RETRIES) {
        await new Promise((resolve) => setTimeout(resolve, 1000 * (attempt + 1)))
      }
    }
  }

  return null
}

export interface GithubRepoSummary {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  stargazers_count: number
  forks_count: number
  watchers_count: number
  language: string | null
  topics: string[]
  updated_at: string
  fork: boolean
}

export interface GithubProfilePayload {
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
  featured: GithubRepoSummary[]
  recent: GithubRepoSummary[]
  source: "github" | "fallback"
}

const PINNED = [
  "clause-lens",
  "ingoboka-platform",
  "face-recognition-5pt-arcface-onnx",
  "wasac-reg-unified-billing-system",
  "bestbuyelectronics_frontend",
  "ANPR-Detection-Alignment-OCR",
  "aviaserve",
  "arnshop_fullstack",
  "face-tracker-live-dashboard",
  "webscraping",
  "Handwriting-Recognition-Ai",
  "mqtt-weather-app",
]

function buildFallbackRepos(): GithubRepoSummary[] {
  return PINNED.map((name, index) => ({
    id: index + 1,
    name,
    description: `Open-source project by ${siteConfig.name}`,
    html_url: `${siteConfig.github}/${name}`,
    homepage: null,
    stargazers_count: 0,
    forks_count: 0,
    watchers_count: 0,
    language: null,
    topics: [],
    updated_at: new Date().toISOString(),
    fork: false,
  }))
}

export function buildFallbackGithubPayload(): GithubProfilePayload {
  const featured = buildFallbackRepos()
  return {
    user: {
      login: USERNAME,
      name: siteConfig.name,
      bio: siteConfig.description,
      avatar_url: siteConfig.ogImage,
      html_url: siteConfig.github,
      public_repos: featured.length,
      followers: 0,
      following: 0,
    },
    stats: {
      public_repos: featured.length,
      followers: 0,
      following: 0,
      total_stars: 0,
    },
    featured,
    recent: [],
    source: "fallback",
  }
}

export async function fetchGithubProfile(): Promise<GithubProfilePayload> {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetchGithub(`https://api.github.com/users/${USERNAME}`),
      fetchGithub(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=100&type=owner`),
    ])

    if (!userRes?.ok) {
      return buildFallbackGithubPayload()
    }

    const user = await userRes.json()
    const repos: GithubRepoSummary[] = reposRes?.ok ? await reposRes.json() : []

    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)
    const featured = repos
      .filter((repo) => PINNED.includes(repo.name))
      .sort((a, b) => PINNED.indexOf(a.name) - PINNED.indexOf(b.name))
    const recent = repos.filter((repo) => !PINNED.includes(repo.name)).slice(0, 6)

    return {
      user: {
        login: user.login,
        name: user.name,
        bio: user.bio,
        avatar_url: user.avatar_url,
        html_url: user.html_url,
        public_repos: user.public_repos,
        followers: user.followers,
        following: user.following,
      },
      stats: {
        public_repos: user.public_repos,
        followers: user.followers,
        following: user.following,
        total_stars: totalStars,
      },
      featured,
      recent,
      source: "github",
    }
  } catch {
    return buildFallbackGithubPayload()
  }
}

export async function fetchGithubReposList(): Promise<GithubRepoSummary[]> {
  const res = await fetchGithub(
    `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated&type=owner`,
  )
  if (!res?.ok) return []
  try {
    return await res.json()
  } catch {
    return []
  }
}
