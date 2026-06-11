"use server"

import { Resend } from "resend"
import { readJson, writeJson, nextId } from "@/lib/data-store"

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function sendContactEmail(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    if (!name || !email || !subject || !message) {
      return { success: false, message: "All fields are required" }
    }

    const messages = readJson<any[]>("messages.json")
    messages.push({
      id: nextId(messages),
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString(),
      read: false,
    })
    writeJson("messages.json", messages)

    if (resend) {
      const { error } = await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: "ruyangearnold@gmail.com",
        subject: `Portfolio Contact: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
        replyTo: email,
      })
      if (error) {
        console.error("Email error:", error)
        return { success: true, message: "Message saved. Email delivery pending configuration." }
      }
    }

    return { success: true, message: "Message transmitted successfully" }
  } catch (error) {
    console.error("Contact form error:", error)
    return { success: false, message: "An unexpected error occurred" }
  }
}
