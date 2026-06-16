import { NextResponse } from "next/server"
import { readJsonAsync, writeJsonAsync } from "@/lib/data-store"
import { requireAdmin } from "@/lib/api-auth"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const authError = requireAdmin()
  if (authError) return authError
  try {
    const id = parseInt(params.id, 10)
    const body = await request.json()
    const posts = await readJsonAsync<any[]>("blog.json")
    const idx = posts.findIndex((p) => p.id === id)
    if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 })
    posts[idx] = { ...posts[idx], ...body, id }
    await writeJsonAsync("blog.json", posts)
    return NextResponse.json(posts[idx])
  } catch {
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 })
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const authError = requireAdmin()
  if (authError) return authError
  try {
    const id = parseInt(params.id, 10)
    const posts = await readJsonAsync<any[]>("blog.json")
    const filtered = posts.filter((p) => p.id !== id)
    if (filtered.length === posts.length) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }
    await writeJsonAsync("blog.json", filtered)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 })
  }
}
