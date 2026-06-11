import { notFound } from "next/navigation"
import { readJson } from "@/lib/data-store"
import ProjectDetailClient from "./project-detail-client"

export default function MissionDetailPage({ params }: { params: { id: string } }) {
  const projects = readJson<any[]>("projects.json")
  const project = projects.find((p) => String(p.id) === params.id)
  if (!project) notFound()
  return <ProjectDetailClient project={project} />
}
