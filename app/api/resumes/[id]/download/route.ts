import { NextResponse } from "next/server"
import { getMimeType, readResumeFile } from "@/lib/resume-storage"
import { readJsonAsync } from "@/lib/data-store"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id, 10)
    const { searchParams } = new URL(request.url)
    const asDownload = searchParams.get("download") === "1"
    const resumes = await readJsonAsync<any[]>("resumes.json")
    const resume = resumes.find((r) => r.id === id)

    if (!resume) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    if (resume.storageKey) {
      const buffer = await readResumeFile(
        resume.storageKey,
        resume.fileName || `resume-${id}`,
      )
      if (!buffer) {
        return NextResponse.json({ error: "File not found" }, { status: 404 })
      }

      const fileName = resume.fileName || `resume-${id}.${resume.format?.toLowerCase() || "pdf"}`
      const mimeType = resume.mimeType || getMimeType(fileName)

      return new NextResponse(buffer, {
        headers: {
          "Content-Type": mimeType,
          "Content-Disposition": `${asDownload ? "attachment" : "inline"}; filename="${fileName}"`,
          "Cache-Control": "public, max-age=3600",
        },
      })
    }

    if (resume.fileUrl?.startsWith("http")) {
      return NextResponse.redirect(resume.fileUrl)
    }

    if (resume.fileUrl) {
      return NextResponse.redirect(new URL(resume.fileUrl, process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"))
    }

    return NextResponse.json({ error: "No file attached" }, { status: 404 })
  } catch {
    return NextResponse.json({ error: "Failed to download" }, { status: 500 })
  }
}
