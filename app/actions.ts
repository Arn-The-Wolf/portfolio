"use server"

import { Resend } from "resend"
import { readJsonAsync, writeJsonAsync, nextId } from "@/lib/data-store"
import {
  buildContactEmailHtml,
  buildContactEmailText,
} from "@/lib/contact-email-template"
import { siteConfig, siteUrl } from "@/lib/site-config"
import {
  getContactDeliveryTarget,
  getContactRecipient,
  getResendAccountEmail,
  getResendFromAddress,
  isResendSandboxRestrictionError,
} from "@/lib/resend-config"

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
    const delivery = getContactDeliveryTarget()
    const emailPayload = {
      name,
      email,
      subject,
      message,
      siteUrl: siteUrl(),
      intendedRecipient: delivery.intendedRecipient,
    }

    const mailSubject = delivery.intendedRecipient
      ? `[For ${getContactRecipient()}] Portfolio Contact: ${subject}`
      : `Portfolio Contact: ${subject}`

    let { error } = await resend.emails.send({
      from,
      to: delivery.to,
      subject: mailSubject,
      replyTo: email,
      text: buildContactEmailText(emailPayload),
      html: buildContactEmailHtml(emailPayload),
    })

    // Safety net: if primary still fails sandbox rules, retry account inbox.
    if (error && isResendSandboxRestrictionError(error.message)) {
      const account = getResendAccountEmail()
      if (delivery.to !== account) {
        const fallbackPayload = {
          ...emailPayload,
          intendedRecipient: getContactRecipient(),
        }
        const retry = await resend.emails.send({
          from,
          to: account,
          subject: `[For ${getContactRecipient()}] Portfolio Contact: ${subject}`,
          replyTo: email,
          text: buildContactEmailText(fallbackPayload),
          html: buildContactEmailHtml(fallbackPayload),
        })
        error = retry.error
      }
    }

    if (error) {
      console.error("Resend error:", error)
      return {
        success: false,
        message:
          error.message ||
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
