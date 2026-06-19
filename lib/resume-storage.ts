import fs from "fs"
import path from "path"
import { put } from "@vercel/blob"
import { hasBlobStorage } from "@/lib/blob-env"

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads", "resumes")
const MAX_FILE_SIZE = 10 * 1024 * 1024

const MIME_BY_EXT: Record<string, string> = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  md: "text/markdown",
}

export function getMimeType(fileName: string, fallback?: string): string {
  const ext = fileName.split(".").pop()?.toLowerCase() || ""
  return MIME_BY_EXT[ext] || fallback || "application/octet-stream"
}

function sanitizeFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_")
}

export function ensureUploadsDir(): void {
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true })
  }
}

export interface StoredResumeFile {
  fileUrl: string
  storageKey: string
  fileName: string
  mimeType: string
}

export async function saveResumeFile(
  resumeId: number,
  buffer: Buffer,
  originalName: string,
  mimeType: string,
): Promise<StoredResumeFile> {
  if (buffer.length > MAX_FILE_SIZE) {
    throw new Error("File exceeds 10MB limit")
  }

  const safeName = sanitizeFileName(originalName)
  const blobKey = `resumes/${resumeId}-${safeName}`

  const useBlob = hasBlobStorage()

  if (useBlob) {
    const blob = await put(blobKey, buffer, {
      access: "public",
      contentType: mimeType,
      addRandomSuffix: false,
      allowOverwrite: true,
    })
    return {
      fileUrl: blob.url,
      storageKey: blob.url,
      fileName: originalName,
      mimeType,
    }
  }

  ensureUploadsDir()
  const localName = `${resumeId}-${safeName}`
  const localPath = path.join(UPLOADS_DIR, localName)
  fs.writeFileSync(localPath, buffer)

  return {
    fileUrl: `/api/resumes/${resumeId}/download`,
    storageKey: localName,
    fileName: originalName,
    mimeType,
  }
}

export async function readResumeFile(
  storageKey: string,
  fileName: string,
): Promise<Buffer | null> {
  if (storageKey.startsWith("http://") || storageKey.startsWith("https://")) {
    const res = await fetch(storageKey)
    if (!res.ok) return null
    return Buffer.from(await res.arrayBuffer())
  }

  const localPath = path.join(UPLOADS_DIR, storageKey)
  if (!fs.existsSync(localPath)) return null
  return fs.readFileSync(localPath)
}

export function deleteResumeFile(storageKey: string): void {
  if (storageKey.startsWith("http://") || storageKey.startsWith("https://")) {
    return
  }
  const localPath = path.join(UPLOADS_DIR, storageKey)
  if (fs.existsSync(localPath)) {
    fs.unlinkSync(localPath)
  }
}
