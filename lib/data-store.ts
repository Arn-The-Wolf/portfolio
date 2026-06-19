import fs from "fs"
import path from "path"
import { head, put } from "@vercel/blob"
import { hasBlobStorage } from "@/lib/blob-env"
import blogData from "@/data/blog.json"
import casesData from "@/data/cases.json"
import historyData from "@/data/history.json"
import messagesData from "@/data/messages.json"
import projectsData from "@/data/projects.json"
import resumesData from "@/data/resumes.json"
import skillsData from "@/data/skills.json"
import testimonialsData from "@/data/testimonials.json"

const DATA_DIR = path.join(process.cwd(), "data")

/** Repo JSON bundled into serverless — used when Blob/local file is missing on Vercel. */
const BUNDLED_DATA: Record<string, unknown> = {
  "blog.json": blogData,
  "cases.json": casesData,
  "history.json": historyData,
  "messages.json": messagesData,
  "projects.json": projectsData,
  "resumes.json": resumesData,
  "skills.json": skillsData,
  "testimonials.json": testimonialsData,
}

function useBlobStore(): boolean {
  return hasBlobStorage()
}

function isVercelRuntime(): boolean {
  return Boolean(process.env.VERCEL)
}

function blobPathname(filename: string): string {
  return `data/${filename}`
}

function getLocalPath(filename: string): string {
  return path.join(DATA_DIR, filename)
}

function getBundledDefault<T>(filename: string): T | undefined {
  const data = BUNDLED_DATA[filename]
  if (data === undefined) return undefined
  return structuredClone(data) as T
}

function readLocal<T>(filename: string): T {
  const filePath = getLocalPath(filename)
  const raw = fs.readFileSync(filePath, "utf-8")
  return JSON.parse(raw) as T
}

function readLocalSafe<T>(filename: string): T {
  const bundled = getBundledDefault<T>(filename)
  if (bundled !== undefined) return bundled

  if (isVercelRuntime()) {
    throw new Error(`Data file unavailable on Vercel (missing Blob): ${filename}`)
  }

  const filePath = getLocalPath(filename)
  if (!fs.existsSync(filePath)) {
    throw new Error(`Data file not found: ${filename}`)
  }
  return readLocal<T>(filename)
}

function writeLocal<T>(filename: string, data: T): void {
  const filePath = getLocalPath(filename)
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8")
}

async function readFromBlob<T>(filename: string): Promise<T> {
  if (!useBlobStore()) {
    return readLocalSafe<T>(filename)
  }

  const pathname = blobPathname(filename)

  try {
    const result = await head(pathname)
    if (!result) {
      return readLocalSafe<T>(filename)
    }

    const res = await fetch(result.url, { cache: "no-store" })
    if (!res.ok) {
      return readLocalSafe<T>(filename)
    }
    return (await res.json()) as T
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    const missing =
      message.includes("not found") ||
      message.includes("404") ||
      message.includes("does not exist") ||
      message.includes("BlobNotFound")

    if (missing) {
      return readLocalSafe<T>(filename)
    }
    throw error
  }
}

async function writeToBlob<T>(filename: string, data: T): Promise<void> {
  await put(blobPathname(filename), JSON.stringify(data, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  })
}

/** Read JSON — Blob on Vercel, local filesystem in dev. Falls back to bundled repo data. */
export async function readJsonAsync<T>(filename: string): Promise<T> {
  return readFromBlob<T>(filename)
}

/** Write JSON — Blob on Vercel, local filesystem in dev. */
export async function writeJsonAsync<T>(filename: string, data: T): Promise<void> {
  if (useBlobStore()) {
    await writeToBlob(filename, data)
    return
  }

  if (isVercelRuntime()) {
    throw new Error(
      "BLOB_READ_WRITE_TOKEN is required to save data on Vercel. Connect a Blob store in your Vercel project settings.",
    )
  }

  writeLocal(filename, data)
}

/** Sync read for legacy callers (dev only). */
export function readJson<T>(filename: string): T {
  return readLocalSafe<T>(filename)
}

export function writeJson<T>(filename: string, data: T): void {
  if (isVercelRuntime()) {
    throw new Error("Use writeJsonAsync on Vercel")
  }
  writeLocal(filename, data)
}

export function nextId(items: { id: number }[]): number {
  if (items.length === 0) return 1
  return Math.max(...items.map((i) => i.id)) + 1
}

/** All JSON filenames managed by the admin CMS. */
export const DATA_FILES = [
  "blog.json",
  "cases.json",
  "history.json",
  "messages.json",
  "projects.json",
  "resumes.json",
  "skills.json",
  "testimonials.json",
] as const
