import { NextResponse } from "next/server"
import { readJson, writeJson, nextId } from "@/lib/data-store"
import { requireAdmin } from "@/lib/api-auth"

export async function GET() {
  try {
    const posts = readJson("blog.json")
    return NextResponse.json(posts)
  } catch {
    return NextResponse.json({ error: "Failed to read blog posts" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const authError = requireAdmin()
  if (authError) return authError
  try {
    const body = await request.json()
    const posts = readJson<any[]>("blog.json")
    const newPost = { id: nextId(posts), featured: false, ...body }
    posts.push(newPost)
    writeJson("blog.json", posts)
    return NextResponse.json(newPost, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 })
  }
}
