import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { COOKIE_NAME, verifyToken } from "./auth-token"

export function requireAdmin(): NextResponse | null {
  const token = cookies().get(COOKIE_NAME)?.value
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  return null
}
