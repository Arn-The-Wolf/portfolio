import { readJsonAsync } from "@/lib/data-store"
import { fetchGithubRepos } from "@/lib/github-projects"
import MissionsClient from "./missions-client"

export const dynamic = "force-dynamic"

export default async function MissionsPage() {
  const projects = await readJsonAsync("projects.json")
  const githubRepos = await fetchGithubRepos()
  return <MissionsClient initialProjects={projects as any[]} githubRepos={githubRepos} />
}
