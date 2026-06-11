import { NextResponse } from "next/server"

const USERNAME = process.env.GITHUB_USERNAME || "Arn-The-Wolf"

export async function GET() {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`, {
        headers: { Accept: "application/vnd.github.v3+json" },
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=12`, {
        headers: { Accept: "application/vnd.github.v3+json" },
        next: { revalidate: 3600 },
      }),
    ])

    if (!userRes.ok) throw new Error("GitHub user fetch failed")

    const user = await userRes.json()
    const repos = reposRes.ok ? await reposRes.json() : []

    const totalStars = repos.reduce(
      (sum: number, repo: { stargazers_count: number }) => sum + repo.stargazers_count,
      0
    )

    const pinned = ["arnshop", "webscraping", "Handwriting-Recognition-Ai", "mqtt-weather-app", "arnlibrary"]
    const featured = repos
      .filter((r: { name: string }) => pinned.includes(r.name))
      .sort((a: { name: string }, b: { name: string }) => pinned.indexOf(a.name) - pinned.indexOf(b.name))

    const recent = repos
      .filter((r: { name: string }) => !pinned.includes(r.name))
      .slice(0, 6)

    return NextResponse.json({
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
    })
  } catch (error) {
    console.error("GitHub API error:", error)
    return NextResponse.json({ error: "Failed to fetch GitHub data" }, { status: 500 })
  }
}
