import { notFound } from "next/navigation"
import { readJsonAsync } from "@/lib/data-store"
import ProjectDetailClient from "./project-detail-client"

export const dynamic = "force-dynamic"

export default async function MissionDetailPage({ params }: { params: { id: string } }) {
  const projects = await readJsonAsync<any[]>("projects.json")
  const project = projects.find((p) => String(p.id) === params.id)
  if (!project) notFound()
  return <ProjectDetailClient project={project} />
}
