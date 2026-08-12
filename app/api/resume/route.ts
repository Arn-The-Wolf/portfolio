import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const PDF_HEADERS = {
  "Content-Type": "application/pdf",
  "Content-Disposition": 'inline; filename="RUYANGE_Arnold_Full_Stack_Resume.pdf"',
  "X-Frame-Options": "SAMEORIGIN",
  "Content-Security-Policy": "frame-ancestors 'self'",
  "Cache-Control": "public, max-age=60, must-revalidate",
}

function resolvePdfPath(): string | null {
  const candidates = [
    path.join(process.cwd(), "public", "resumes", "RUYANGE_Arnold_Full_Stack_Resume.pdf"),
    path.join(process.cwd(), "public", "resume.pdf"),
  ]
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate
  }
  return null
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const asDownload = searchParams.get("download") === "1"

  const pdfPath = resolvePdfPath()
  if (!pdfPath) {
    return NextResponse.json(
      {
        message: "Resume PDF not yet uploaded. Place your CV at public/resumes/RUYANGE_Arnold_Full_Stack_Resume.pdf",
        download: false,
      },
      { status: 404 },
    )
  }

  const file = fs.readFileSync(pdfPath)
  return new NextResponse(file, {
    headers: {
      ...PDF_HEADERS,
      "Content-Disposition": asDownload
        ? 'attachment; filename="RUYANGE_Arnold_Full_Stack_Resume.pdf"'
        : PDF_HEADERS["Content-Disposition"],
    },
  })
}
