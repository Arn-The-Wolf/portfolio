import { NextResponse } from "next/server"
import { readJson, writeJson } from "@/lib/data-store"
import { requireAdmin } from "@/lib/api-auth"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const authError = requireAdmin()
  if (authError) return authError
  try {
    const id = parseInt(params.id)
    const body = await request.json()
    const messages = readJson<any[]>("messages.json")
    const idx = messages.findIndex((m) => m.id === id)
    if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 })
    messages[idx] = { ...messages[idx], ...body, id }
    writeJson("messages.json", messages)
    return NextResponse.json(messages[idx])
  } catch {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 })
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const authError = requireAdmin()
  if (authError) return authError
  try {
    const id = parseInt(params.id)
    const messages = readJson<any[]>("messages.json")
    const filtered = messages.filter((m) => m.id !== id)
    if (filtered.length === messages.length) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }
    writeJson("messages.json", filtered)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 })
  }
}
