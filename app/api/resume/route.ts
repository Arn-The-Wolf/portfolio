import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET() {
  const pdfPath = path.join(process.cwd(), "public", "resume.pdf")
  if (fs.existsSync(pdfPath)) {
    const file = fs.readFileSync(pdfPath)
    return new NextResponse(file, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="RUYANGE-Arnold-CV.pdf"',
      },
    })
  }
  return NextResponse.json(
    {
      message: "Resume PDF not yet uploaded. Place your CV at public/resume.pdf",
      download: false,
    },
    { status: 404 }
  )
}
