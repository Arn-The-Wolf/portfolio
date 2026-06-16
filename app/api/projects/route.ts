import { NextResponse } from "next/server"
import { readJsonAsync, writeJsonAsync, nextId } from "@/lib/data-store"
import { requireAdmin } from "@/lib/api-auth"

export async function GET() {
  try {
    const projects = await readJsonAsync("projects.json")
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
    const projects = await readJsonAsync<any[]>("projects.json")
    const newProject = { id: nextId(projects), ...body }
    projects.push(newProject)
    await writeJsonAsync("projects.json", projects)
    return NextResponse.json(newProject, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
