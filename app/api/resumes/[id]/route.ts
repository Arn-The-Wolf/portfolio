import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/api-auth"
import { deleteResumeFile } from "@/lib/resume-storage"
import { getResumes, saveResumes } from "@/lib/resumes-store"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const authError = requireAdmin()
  if (authError) return authError
  try {
    const id = parseInt(params.id)
    const body = await request.json()
    const resumes = await getResumes()
    const idx = resumes.findIndex((r) => r.id === id)
    if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 })
    resumes[idx] = { ...resumes[idx], ...body, id }
    await saveResumes(resumes)
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
    const resumes = await getResumes()
    const resume = resumes.find((r) => r.id === id)
    if (!resume) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }
    if (resume.storageKey) {
      deleteResumeFile(resume.storageKey)
    }
    const filtered = resumes.filter((r) => r.id !== id)
    await saveResumes(filtered)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 })
  }
}
