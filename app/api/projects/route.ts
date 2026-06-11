import { NextResponse } from "next/server"
import { readJson, writeJson, nextId } from "@/lib/data-store"
import { requireAdmin } from "@/lib/api-auth"

export async function GET() {
  try {
    const projects = readJson("projects.json")
    return NextResponse.json(projects)
  } catch {
    return NextResponse.json({ error: "Failed to read projects" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const authError = requireAdmin()
  if (authError) return authError
  try {
    const body = await request.json()
    const projects = readJson<any[]>("projects.json")
    const newProject = { id: nextId(projects), ...body }
    projects.push(newProject)
    writeJson("projects.json", projects)
    return NextResponse.json(newProject, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
