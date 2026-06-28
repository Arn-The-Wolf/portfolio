/**
 * Seed all CMS JSON files into Vercel Blob (production admin data).
 *
 * Usage:
 *   npm run seed:blob
 *   (reads .env.local — set BLOB_READ_WRITE_TOKEN or BLOB_READ_WRITE_TOKEN_READ_WRITE_TOKEN)
 */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { put, head } from "@vercel/blob"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, "..")
const dataDir = path.join(root, "data")

const FILES = [
  "blog.json",
  "cases.json",
  "history.json",
  "messages.json",
  "projects.json",
  "resumes.json",
  "skills.json",
  "testimonials.json",
]

function loadEnvLocal() {
  const envPath = path.join(root, ".env.local")
  if (!fs.existsSync(envPath)) return
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) continue
    const eq = trimmed.indexOf("=")
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    let value = trimmed.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (!process.env[key]) process.env[key] = value
  }
}

loadEnvLocal()

if (!process.env.BLOB_READ_WRITE_TOKEN && process.env.BLOB_READ_WRITE_TOKEN_READ_WRITE_TOKEN) {
  process.env.BLOB_READ_WRITE_TOKEN = process.env.BLOB_READ_WRITE_TOKEN_READ_WRITE_TOKEN
}

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error(
    "Missing BLOB_READ_WRITE_TOKEN. Add it to .env.local or run: npx vercel env pull .env.local",
  )
  process.exit(1)
}

for (const file of FILES) {
  const localPath = path.join(dataDir, file)
  if (!fs.existsSync(localPath)) {
    console.warn(`Skip ${file} — not found locally`)
    continue
  }

  const pathname = `data/${file}`
  const body = fs.readFileSync(localPath, "utf-8")

  try {
    const existing = await head(pathname)
    if (existing) {
      console.log(`↷ ${file} already in Blob — overwriting`)
    }
  } catch {
    console.log(`+ ${file} — uploading`)
  }

  await put(pathname, body, {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  })
  console.log(`✓ ${file}`)
}

console.log("\nDone. Admin CMS on Vercel will read from Blob.")
