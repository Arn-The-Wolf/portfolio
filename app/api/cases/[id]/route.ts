import { NextResponse } from "next/server"
import { readJson, writeJson } from "@/lib/data-store"
import { requireAdmin } from "@/lib/api-auth"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const authError = requireAdmin()
  if (authError) return authError
  try {
    const id = parseInt(params.id, 10)
    const body = await request.json()
    const cases = readJson<any[]>("cases.json")
    const index = cases.findIndex((c) => c.id === id)
    if (index === -1) {
      return NextResponse.json({ error: "Case not found" }, { status: 404 })
    }
    cases[index] = { ...cases[index], ...body, id }
    writeJson("cases.json", cases)
    return NextResponse.json(cases[index])
  } catch {
    return NextResponse.json({ error: "Failed to update case" }, { status: 500 })
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const authError = requireAdmin()
  if (authError) return authError
  try {
    const id = parseInt(params.id, 10)
    const cases = readJson<any[]>("cases.json")
    const filtered = cases.filter((c) => c.id !== id)
    if (filtered.length === cases.length) {
      return NextResponse.json({ error: "Case not found" }, { status: 404 })
    }
    writeJson("cases.json", filtered)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete case" }, { status: 500 })
  }
}
