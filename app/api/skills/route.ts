import { NextResponse } from "next/server"
import { readJson, writeJson } from "@/lib/data-store"
import { requireAdmin } from "@/lib/api-auth"

export async function GET() {
  try {
    const skills = readJson<Record<string, unknown[]>>("skills.json")
    return NextResponse.json(skills)
  } catch {
    return NextResponse.json({ error: "Failed to read skills" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const authError = requireAdmin()
  if (authError) return authError
  try {
    const body = await request.json()
    writeJson("skills.json", body)
    return NextResponse.json(body)
  } catch {
    return NextResponse.json({ error: "Failed to update skills" }, { status: 500 })
  }
}
