/**
 * Seed all CMS JSON files into Vercel Blob (production admin data).
 *
 * Usage:
 *   BLOB_READ_WRITE_TOKEN=vercel_blob_... node scripts/seed-blob.mjs
 *
 * Run once after connecting Blob to your Vercel project, or to reset prod data from repo.
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

if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.BLOB_READ_WRITE_TOKEN_READ_WRITE_TOKEN) {
  console.error("Missing BLOB_READ_WRITE_TOKEN (or BLOB_READ_WRITE_TOKEN_READ_WRITE_TOKEN).")
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
