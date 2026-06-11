import { NextResponse } from "next/server"
import { readJson, writeJson, nextId } from "@/lib/data-store"
import { requireAdmin } from "@/lib/api-auth"

export async function GET() {
  try {
    const cases = readJson("cases.json")
    return NextResponse.json(cases)
  } catch {
    return NextResponse.json({ error: "Failed to read cases" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const authError = requireAdmin()
  if (authError) return authError
  try {
    const body = await request.json()
    const cases = readJson<any[]>("cases.json")
    const newCase = { id: nextId(cases), ...body }
    cases.push(newCase)
    writeJson("cases.json", cases)
    return NextResponse.json(newCase, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to create case" }, { status: 500 })
  }
}
