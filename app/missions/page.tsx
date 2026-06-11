import { readJson } from "@/lib/data-store"
import { fetchGithubRepos } from "@/lib/github-projects"
import MissionsClient from "./missions-client"

export default async function MissionsPage() {
  const projects = readJson("projects.json")
  const githubRepos = await fetchGithubRepos()
  return <MissionsClient initialProjects={projects as any[]} githubRepos={githubRepos} />
}
