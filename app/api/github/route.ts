import { NextResponse } from "next/server"
import { fetchGithubProfile } from "@/lib/github-api"

export async function GET() {
  const payload = await fetchGithubProfile()
  return NextResponse.json(payload)
}
