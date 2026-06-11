import { NextResponse } from "next/server"
import { readJson, writeJson, nextId } from "@/lib/data-store"
import { requireAdmin } from "@/lib/api-auth"

interface Resume {
  id: number
  title: string
  subtitle?: string
  description?: string
  format: string
  fileUrl: string
  version?: string
  language?: string
  updatedAt?: string
  tags?: string[]
}

export async function GET() {
  try {
    const resumes = readJson<Resume[]>("resumes.json")
    return NextResponse.json(resumes)
  } catch {
    return NextResponse.json({ error: "Failed to read resumes" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const authError = requireAdmin()
  if (authError) return authError
  try {
    const body = await request.json()
    const resumes = readJson<Resume[]>("resumes.json")
    const newResume = { id: nextId(resumes), ...body }
    resumes.push(newResume)
    writeJson("resumes.json", resumes)
    return NextResponse.json(newResume, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to create resume" }, { status: 500 })
  }
}
