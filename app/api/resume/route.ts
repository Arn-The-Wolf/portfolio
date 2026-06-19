import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const PDF_HEADERS = {
  "Content-Type": "application/pdf",
  "Content-Disposition": 'inline; filename="RUYANGE-Arnold-CV.pdf"',
  "X-Frame-Options": "SAMEORIGIN",
  "Content-Security-Policy": "frame-ancestors 'self'",
  "Cache-Control": "public, max-age=3600",
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const asDownload = searchParams.get("download") === "1"

  const pdfPath = path.join(process.cwd(), "public", "resume.pdf")
  if (!fs.existsSync(pdfPath)) {
    return NextResponse.json(
      {
        message: "Resume PDF not yet uploaded. Place your CV at public/resume.pdf",
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
        ? 'attachment; filename="RUYANGE-Arnold-CV.pdf"'
        : PDF_HEADERS["Content-Disposition"],
    },
  })
}
