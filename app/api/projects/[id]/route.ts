import { NextResponse } from "next/server"
import { readJson, writeJson } from "@/lib/data-store"
import { requireAdmin } from "@/lib/api-auth"

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id)
    const projects = readJson<any[]>("projects.json")
    const project = projects.find((p) => p.id === id)
    if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 })
    return NextResponse.json(project)
  } catch {
    return NextResponse.json({ error: "Failed to read project" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const authError = requireAdmin()
  if (authError) return authError
  try {
    const id = parseInt(params.id)
    const body = await request.json()
    const projects = readJson<any[]>("projects.json")
    const idx = projects.findIndex((p) => p.id === id)
    if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 })
    projects[idx] = { ...projects[idx], ...body, id }
    writeJson("projects.json", projects)
    return NextResponse.json(projects[idx])
  } catch {
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const authError = requireAdmin()
  if (authError) return authError
  try {
    const id = parseInt(params.id)
    const projects = readJson<any[]>("projects.json")
    const filtered = projects.filter((p) => p.id !== id)
    if (filtered.length === projects.length) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }
    writeJson("projects.json", filtered)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}
