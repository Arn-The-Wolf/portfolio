/**
 * Re-upload the canonical resume PDF to public/resume.pdf and Vercel Blob.
 *
 * Usage:
 *   npm run upload:resume
 */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { put } from "@vercel/blob"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, "..")

const SOURCE = path.join(root, "public", "resumes", "RUYANGE_Arnold_Full_Stack_Resume.pdf")
const PUBLIC_COPY = path.join(root, "public", "resume.pdf")
const RESUMES_JSON = path.join(root, "data", "resumes.json")
const FILE_NAME = "RUYANGE_Arnold_Full_Stack_Resume.pdf"
const MIME = "application/pdf"

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

if (!fs.existsSync(SOURCE)) {
  console.error(`Resume not found: ${SOURCE}`)
  process.exit(1)
}

const buffer = fs.readFileSync(SOURCE)
fs.copyFileSync(SOURCE, PUBLIC_COPY)
console.log(`✓ Synced ${FILE_NAME} → public/resume.pdf (${buffer.length} bytes)`)

const today = new Date().toISOString().slice(0, 10)
const resumes = JSON.parse(fs.readFileSync(RESUMES_JSON, "utf8"))

if (process.env.BLOB_READ_WRITE_TOKEN) {
  for (const resume of resumes) {
    const blobKey = `resumes/${resume.id}-${FILE_NAME}`
    const blob = await put(blobKey, buffer, {
      access: "public",
      contentType: MIME,
      addRandomSuffix: false,
      allowOverwrite: true,
    })
    resume.fileUrl = blob.url
    resume.storageKey = blob.url
    resume.fileName = FILE_NAME
    resume.mimeType = MIME
    resume.format = "PDF"
    resume.updatedAt = today
    console.log(`✓ Uploaded resume #${resume.id} → ${blob.url}`)
  }
} else {
  console.warn("No BLOB_READ_WRITE_TOKEN — updated local metadata only")
  for (const resume of resumes) {
    resume.fileUrl = `/resumes/${FILE_NAME}`
    delete resume.storageKey
    resume.fileName = FILE_NAME
    resume.mimeType = MIME
    resume.format = "PDF"
    resume.updatedAt = today
  }
}

fs.writeFileSync(RESUMES_JSON, JSON.stringify(resumes, null, 2) + "\n")
console.log(`✓ Updated data/resumes.json (updatedAt: ${today})`)
console.log("\nDone. Run npm run seed:blob to sync CMS JSON to production.")
