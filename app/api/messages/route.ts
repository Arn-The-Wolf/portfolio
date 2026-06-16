import { NextResponse } from "next/server"
import { readJsonAsync, writeJsonAsync, nextId } from "@/lib/data-store"
import { requireAdmin } from "@/lib/api-auth"

interface Message {
  id: number
  name: string
  email: string
  subject: string
  message: string
  createdAt: string
  read: boolean
}

export async function GET() {
  const authError = requireAdmin()
  if (authError) return authError
  try {
    const messages = await readJsonAsync<Message[]>("messages.json")
    return NextResponse.json(messages.sort((a, b) => b.createdAt.localeCompare(a.createdAt)))
  } catch {
    return NextResponse.json({ error: "Failed to read messages" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const messages = await readJsonAsync<Message[]>("messages.json")
    const newMessage: Message = {
      id: nextId(messages),
      name: body.name,
      email: body.email,
      subject: body.subject,
      message: body.message,
      createdAt: new Date().toISOString(),
      read: false,
    }
    messages.push(newMessage)
    await writeJsonAsync("messages.json", messages)
    return NextResponse.json(newMessage, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to save message" }, { status: 500 })
  }
}
