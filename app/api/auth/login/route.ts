import { NextResponse } from "next/server"
import { checkPassword, signToken, setAdminCookie } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { password } = await request.json()
    if (!checkPassword(password)) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }
    const token = signToken()
    setAdminCookie(token)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
