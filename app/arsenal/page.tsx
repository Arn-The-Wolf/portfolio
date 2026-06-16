import { readJsonAsync } from "@/lib/data-store"
import ArsenalClient from "./arsenal-client"

export const dynamic = "force-dynamic"

export default async function ArsenalPage() {
  const skills = await readJsonAsync<Record<string, { id: number; name: string; level: number; years: number; projects: number }[]>>("skills.json")
  return <ArsenalClient initialSkills={skills} />
}
