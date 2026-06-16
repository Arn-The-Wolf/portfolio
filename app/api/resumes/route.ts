import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/api-auth"
import { getMimeType, saveResumeFile } from "@/lib/resume-storage"
import { readJsonAsync, writeJsonAsync, nextId } from "@/lib/data-store"

interface Resume {
  id: number
  title: string
  subtitle?: string
  description?: string
  documentType?: string
  format: string
  fileUrl: string
  storageKey?: string
  fileName?: string
  mimeType?: string
  version?: string
  language?: string
  updatedAt?: string
  tags?: string[]
}

const ALLOWED_EXTENSIONS = new Set(["pdf", "doc", "docx", "md"])

export async function GET() {
  try {
    const resumes = await readJsonAsync<Resume[]>("resumes.json")
    return NextResponse.json(resumes)
  } catch {
    return NextResponse.json({ error: "Failed to read resumes" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const authError = requireAdmin()
  if (authError) return authError
  try {
    const contentType = request.headers.get("content-type") || ""

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData()
      const file = formData.get("file")
      const resumes = await readJsonAsync<Resume[]>("resumes.json")
      const id = nextId(resumes)

      const tagsRaw = (formData.get("tags") as string) || ""
      const body: Resume = {
        id,
        title: (formData.get("title") as string) || "Untitled",
        subtitle: (formData.get("subtitle") as string) || undefined,
        description: (formData.get("description") as string) || undefined,
        documentType: (formData.get("documentType") as string) || "Resume",
        format: (formData.get("format") as string) || "PDF",
        fileUrl: "/api/resume",
        version: (formData.get("version") as string) || undefined,
        language: (formData.get("language") as string) || "English",
        updatedAt: new Date().toISOString().slice(0, 10),
        tags: tagsRaw.split(",").map((t) => t.trim()).filter(Boolean),
      }

      if (file && file instanceof File && file.size > 0) {
        const ext = file.name.split(".").pop()?.toLowerCase() || ""
        if (!ALLOWED_EXTENSIONS.has(ext)) {
          return NextResponse.json(
            { error: "Unsupported file type. Use PDF, DOC, DOCX, or MD." },
            { status: 400 },
          )
        }
        const buffer = Buffer.from(await file.arrayBuffer())
        const mimeType = file.type || getMimeType(file.name)
        const stored = await saveResumeFile(id, buffer, file.name, mimeType)
        body.fileUrl = stored.fileUrl
        body.storageKey = stored.storageKey
        body.fileName = stored.fileName
        body.mimeType = stored.mimeType
        body.format = ext.toUpperCase() === "MD" ? "MD" : ext.toUpperCase()
      } else {
        const fileUrl = (formData.get("fileUrl") as string) || "/api/resume"
        body.fileUrl = fileUrl
      }

      resumes.push(body)
      await writeJsonAsync("resumes.json", resumes)
      return NextResponse.json(body, { status: 201 })
    }

    const body = await request.json()
    const resumes = await readJsonAsync<Resume[]>("resumes.json")
    const newResume: Resume = {
      id: nextId(resumes),
      fileUrl: body.fileUrl || "/api/resume",
      ...body,
    }
    resumes.push(newResume)
    await writeJsonAsync("resumes.json", resumes)
    return NextResponse.json(newResume, { status: 201 })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create resume"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
