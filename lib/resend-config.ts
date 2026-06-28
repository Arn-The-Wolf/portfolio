import { siteConfig } from "@/lib/site-config"

/** Resend sandbox sender — only delivers to the Resend account signup email. */
export const RESEND_SANDBOX_FROM = "onboarding@resend.dev"

/** Resend account owner inbox (allowed recipient while on onboarding@resend.dev). */
export const DEFAULT_RESEND_ACCOUNT_EMAIL = "arnwolfie5@gmail.com"

export function getResendFromAddress(): string {
  return (
    process.env.RESEND_FROM_EMAIL ||
    `ARNOLD.DEV Portfolio <${RESEND_SANDBOX_FROM}>`
  )
}

export function isResendSandboxMode(from = getResendFromAddress()): boolean {
  return from.includes(RESEND_SANDBOX_FROM)
}

export function getResendAccountEmail(): string {
  return (
    process.env.RESEND_ACCOUNT_EMAIL?.trim() ||
    DEFAULT_RESEND_ACCOUNT_EMAIL
  ).toLowerCase()
}

/** Preferred inbox for contact form submissions (your public email). */
export function getContactRecipient(): string {
  return (process.env.CONTACT_TO_EMAIL?.trim() || siteConfig.email).toLowerCase()
}

export function isResendSandboxRestrictionError(message?: string): boolean {
  if (!message) return false
  const lower = message.toLowerCase()
  return (
    lower.includes("only send testing emails") ||
    lower.includes("verify a domain") ||
    lower.includes("testing emails to your own")
  )
}

/**
 * Resend sandbox blocks delivery to any inbox except the account signup email.
 * Route delivery there automatically until a custom domain is verified.
 */
export function getContactDeliveryTarget(): {
  to: string
  intendedRecipient?: string
} {
  const intended = getContactRecipient()
  const account = getResendAccountEmail()

  if (isResendSandboxMode() && intended !== account) {
    return { to: account, intendedRecipient: intended }
  }

  return { to: intended }
}
