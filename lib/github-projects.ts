import { getProjectCategories } from "./project-categories"

const USERNAME = process.env.GITHUB_USERNAME || "Arn-The-Wolf"

export interface GithubRepoProject {
  id: string
  source: "github"
  title: string
  subtitle: string
  description: string
  longDescription?: string
  technologies: string[]
  github: string
  demo: string
  status: string
  featured: boolean
  categories: ReturnType<typeof getProjectCategories>
  stars: number
  updatedAt: string
}

export async function fetchGithubRepos(): Promise<GithubRepoProject[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated&type=owner`,
      {
        headers: { Accept: "application/vnd.github.v3+json" },
        next: { revalidate: 3600 },
      }
    )
    if (!res.ok) return []

    const repos: Array<{
      id: number
      name: string
      description: string | null
      html_url: string
      homepage: string | null
      language: string | null
      topics?: string[]
      stargazers_count: number
      updated_at: string
      fork: boolean
    }> = await res.json()

    return repos
      .filter((repo) => !repo.fork)
      .map((repo) => {
        const technologies = [repo.language, ...(repo.topics || [])].filter(Boolean) as string[]
        const item = {
          title: repo.name,
          subtitle: repo.language || "Open Source",
          description: repo.description || "GitHub repository by RUYANGE Arnold",
          technologies,
          language: repo.language || undefined,
          topics: repo.topics,
        }
        return {
          id: `gh-${repo.id}`,
          source: "github" as const,
          title: repo.name,
          subtitle: repo.language || "Open Source",
          description: item.description,
          technologies,
          github: repo.html_url,
          demo: repo.homepage || "",
          status: "ACTIVE",
          featured: repo.stargazers_count > 0,
          categories: getProjectCategories(item),
          stars: repo.stargazers_count,
          updatedAt: repo.updated_at,
        }
      })
  } catch {
    return []
  }
}

export function normalizeGithubUrl(url: string): string {
  return url.replace(/\/$/, "").toLowerCase()
}
