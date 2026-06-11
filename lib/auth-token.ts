const COOKIE_NAME = "operative_admin"
const MAX_AGE = 60 * 60 * 24 * 7

function getSecret(): string {
  return process.env.ADMIN_SECRET || "change-me-in-production"
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

async function hmacSign(message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  )
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message))
  return toHex(sig)
}

export async function signTokenAsync(): Promise<string> {
  const exp = Date.now() + MAX_AGE * 1000
  const payload = `admin:${exp}`
  const sig = await hmacSign(payload)
  return `${payload}.${sig}`
}

export async function verifyTokenAsync(token: string): Promise<boolean> {
  try {
    const dot = token.lastIndexOf(".")
    if (dot === -1) return false
    const payload = token.slice(0, dot)
    const sig = token.slice(dot + 1)
    const expected = await hmacSign(payload)
    if (sig.length !== expected.length) return false
    let ok = true
    for (let i = 0; i < sig.length; i++) {
      if (sig[i] !== expected[i]) ok = false
    }
    if (!ok) return false
    const exp = parseInt(payload.split(":")[1], 10)
    return Date.now() < exp
  } catch {
    return false
  }
}

// Sync versions for Node.js API routes (uses dynamic import of crypto)
export function signToken(): string {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { createHmac } = require("crypto") as typeof import("crypto")
  const exp = Date.now() + MAX_AGE * 1000
  const payload = `admin:${exp}`
  const sig = createHmac("sha256", getSecret()).update(payload).digest("hex")
  return `${payload}.${sig}`
}

export function verifyToken(token: string): boolean {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { createHmac, timingSafeEqual } = require("crypto") as typeof import("crypto")
    const dot = token.lastIndexOf(".")
    if (dot === -1) return false
    const payload = token.slice(0, dot)
    const sig = token.slice(dot + 1)
    const expected = createHmac("sha256", getSecret()).update(payload).digest("hex")
    const sigBuf = Buffer.from(sig, "hex")
    const expBuf = Buffer.from(expected, "hex")
    if (sigBuf.length !== expBuf.length) return false
    if (!timingSafeEqual(sigBuf, expBuf)) return false
    const exp = parseInt(payload.split(":")[1], 10)
    return Date.now() < exp
  } catch {
    return false
  }
}

export function checkPassword(password: string): boolean {
  return password === (process.env.ADMIN_PASSWORD || "operative2024")
}

export { COOKIE_NAME, MAX_AGE }
