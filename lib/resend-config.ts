import { siteConfig } from "@/lib/site-config"

/** Resend sandbox sender — only delivers to the Resend account owner's inbox. */
export const RESEND_SANDBOX_FROM = "onboarding@resend.dev"

/** Default Resend account email (override with RESEND_ACCOUNT_EMAIL). */
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

/**
 * Resend sandbox only allows sending TO the account signup email.
 * After domain verification, CONTACT_TO_EMAIL (e.g. ruyangearnold@gmail.com) is used.
 */
export function getContactRecipient(from = getResendFromAddress()): string {
  if (isResendSandboxMode(from)) {
    return (
      process.env.RESEND_ACCOUNT_EMAIL?.trim() ||
      DEFAULT_RESEND_ACCOUNT_EMAIL
    )
  }
  return process.env.CONTACT_TO_EMAIL?.trim() || siteConfig.email
}
