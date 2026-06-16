import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/api-auth"
import { deleteResumeFile, getMimeType, saveResumeFile } from "@/lib/resume-storage"
import { getResumes, saveResumes } from "@/lib/resumes-store"

const ALLOWED_EXTENSIONS = new Set(["pdf", "doc", "docx", "md"])

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const authError = requireAdmin()
  if (authError) return authError

  try {
    const id = parseInt(params.id, 10)
    const resumes = await getResumes()
    const idx = resumes.findIndex((r) => r.id === id)
    if (idx === -1) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 })
    }

    const formData = await request.formData()
    const file = formData.get("file")

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const ext = file.name.split(".").pop()?.toLowerCase() || ""
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return NextResponse.json(
        { error: "Unsupported file type. Use PDF, DOC, DOCX, or MD." },
        { status: 400 },
      )
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const mimeType = file.type || getMimeType(file.name)

    if (resumes[idx].storageKey) {
      deleteResumeFile(resumes[idx].storageKey!)
    }

    const stored = await saveResumeFile(id, buffer, file.name, mimeType)
    const format = ext.toUpperCase() === "MD" ? "MD" : ext.toUpperCase()

    resumes[idx] = {
      ...resumes[idx],
      fileUrl: stored.fileUrl,
      storageKey: stored.storageKey,
      fileName: stored.fileName,
      mimeType: stored.mimeType,
      format,
      updatedAt: new Date().toISOString().slice(0, 10),
    }

    await saveResumes(resumes)
    return NextResponse.json(resumes[idx])
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
