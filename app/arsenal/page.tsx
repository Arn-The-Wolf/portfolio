import { readJson } from "@/lib/data-store"
import ArsenalClient from "./arsenal-client"

export default function ArsenalPage() {
  const skills = readJson<Record<string, { id: number; name: string; level: number; years: number; projects: number }[]>>("skills.json")
  return <ArsenalClient initialSkills={skills} />
}
