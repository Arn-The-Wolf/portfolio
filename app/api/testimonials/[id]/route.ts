import { NextResponse } from "next/server"
import { readJsonAsync, writeJsonAsync } from "@/lib/data-store"
import { requireAdmin } from "@/lib/api-auth"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const authError = requireAdmin()
  if (authError) return authError
  try {
    const id = parseInt(params.id, 10)
    const body = await request.json()
    const testimonials = await readJsonAsync<any[]>("testimonials.json")
    const idx = testimonials.findIndex((t) => t.id === id)
    if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 })
    testimonials[idx] = { ...testimonials[idx], ...body, id }
    await writeJsonAsync("testimonials.json", testimonials)
    return NextResponse.json(testimonials[idx])
  } catch {
    return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 })
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const authError = requireAdmin()
  if (authError) return authError
  try {
    const id = parseInt(params.id, 10)
    const testimonials = await readJsonAsync<any[]>("testimonials.json")
    const filtered = testimonials.filter((t) => t.id !== id)
    if (filtered.length === testimonials.length) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }
    await writeJsonAsync("testimonials.json", filtered)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 })
  }
}
