import { NextResponse } from "next/server"
import { readJson, writeJson } from "@/lib/data-store"
import { requireAdmin } from "@/lib/api-auth"

export async function GET() {
  try {
    const history = readJson("history.json")
    return NextResponse.json(history)
  } catch {
    return NextResponse.json({ error: "Failed to read history" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const authError = requireAdmin()
  if (authError) return authError
  try {
    const body = await request.json()
    writeJson("history.json", body)
    return NextResponse.json(body)
  } catch {
    return NextResponse.json({ error: "Failed to update history" }, { status: 500 })
  }
}
