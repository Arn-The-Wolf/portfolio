"use server"

import { Resend } from "resend"
import { readJsonAsync, writeJsonAsync, nextId } from "@/lib/data-store"
import {
  buildContactEmailHtml,
  buildContactEmailText,
} from "@/lib/contact-email-template"
import { siteConfig, siteUrl } from "@/lib/site-config"
import { getContactRecipient, getResendFromAddress } from "@/lib/resend-config"

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function sendContactEmail(formData: FormData) {
  try {
    const name = (formData.get("name") as string)?.trim()
    const email = (formData.get("email") as string)?.trim()
    const subject = (formData.get("subject") as string)?.trim()
    const message = (formData.get("message") as string)?.trim()

    if (!name || !email || !subject || !message) {
      return { success: false, message: "All fields are required." }
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email)) {
      return { success: false, message: "Please enter a valid email address." }
    }

    const messages = await readJsonAsync<any[]>("messages.json")
    messages.push({
      id: nextId(messages),
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString(),
      read: false,
    })
    await writeJsonAsync("messages.json", messages)

    if (!resend) {
      return {
        success: false,
        message: `Email service is not configured. Please contact me directly at ${siteConfig.email}.`,
      }
    }

    const from = getResendFromAddress()
    const to = getContactRecipient()
    const emailPayload = {
      name,
      email,
      subject,
      message,
      siteUrl: siteUrl(),
    }

    const { error } = await resend.emails.send({
      from,
      to,
      subject: `Portfolio Contact: ${subject}`,
      replyTo: email,
      text: buildContactEmailText(emailPayload),
      html: buildContactEmailHtml(emailPayload),
    })

    if (error) {
      console.error("Resend error:", error)
      const sandboxHint =
        error.message?.includes("only send testing emails") ||
        error.message?.includes("verify a domain")
      return {
        success: false,
        message: sandboxHint
          ? "Your message was saved. Email delivery needs a verified domain on Resend to reach ruyangearnold@gmail.com — check admin messages in the meantime."
          : error.message ||
            `Failed to send email. Please try again or email me directly at ${siteConfig.email}.`,
      }
    }

    return {
      success: true,
      message: "Thank you! Your message was sent successfully. I'll get back to you soon.",
    }
  } catch (error) {
    console.error("Contact form error:", error)
    const detail = error instanceof Error ? error.message : "Unknown error"
    return {
      success: false,
      message: `Something went wrong: ${detail}. Please email ${siteConfig.email} directly.`,
    }
  }
}
