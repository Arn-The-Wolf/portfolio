import { NextResponse } from "next/server"
import { readJson, writeJson } from "@/lib/data-store"
import { requireAdmin } from "@/lib/api-auth"
import { deleteResumeFile } from "@/lib/resume-storage"

interface Resume {
  id: number
  storageKey?: string
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const authError = requireAdmin()
  if (authError) return authError
  try {
    const id = parseInt(params.id)
    const body = await request.json()
    const resumes = readJson<any[]>("resumes.json")
    const idx = resumes.findIndex((r) => r.id === id)
    if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 })
    resumes[idx] = { ...resumes[idx], ...body, id }
    writeJson("resumes.json", resumes)
    return NextResponse.json(resumes[idx])
  } catch {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 })
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const authError = requireAdmin()
  if (authError) return authError
  try {
    const id = parseInt(params.id)
    const resumes = readJson<Resume[]>("resumes.json")
    const resume = resumes.find((r) => r.id === id)
    if (!resume) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }
    if (resume.storageKey) {
      deleteResumeFile(resume.storageKey)
    }
    const filtered = resumes.filter((r) => r.id !== id)
    writeJson("resumes.json", filtered)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 404 })
  }
}
