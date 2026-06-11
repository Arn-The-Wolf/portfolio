import { NextResponse } from "next/server"
import { readJson, writeJson, nextId } from "@/lib/data-store"
import { requireAdmin } from "@/lib/api-auth"

export async function GET() {
  try {
    const testimonials = readJson("testimonials.json")
    return NextResponse.json(testimonials)
  } catch {
    return NextResponse.json({ error: "Failed to read testimonials" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const authError = requireAdmin()
  if (authError) return authError
  try {
    const body = await request.json()
    const testimonials = readJson<any[]>("testimonials.json")
    const item = { id: nextId(testimonials), rating: 5, ...body }
    testimonials.push(item)
    writeJson("testimonials.json", testimonials)
    return NextResponse.json(item, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 })
  }
}
