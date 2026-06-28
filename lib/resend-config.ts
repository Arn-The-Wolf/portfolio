import { siteConfig } from "@/lib/site-config"

/** Resend sandbox sender — domain verification unlocks any recipient. */
export const RESEND_SANDBOX_FROM = "onboarding@resend.dev"

export function getResendFromAddress(): string {
  return (
    process.env.RESEND_FROM_EMAIL ||
    `ARNOLD.DEV Portfolio <${RESEND_SANDBOX_FROM}>`
  )
}

export function isResendSandboxMode(from = getResendFromAddress()): boolean {
  return from.includes(RESEND_SANDBOX_FROM)
}

/** Primary inbox for contact form submissions. */
export function getContactRecipient(): string {
  return process.env.CONTACT_TO_EMAIL?.trim() || siteConfig.email
}
