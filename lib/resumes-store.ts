import fs from "fs"
import path from "path"
import { get, put } from "@vercel/blob"
import { readJson, writeJson, nextId } from "@/lib/data-store"

export interface Resume {
  id: number
  title: string
  subtitle?: string
  description?: string
  documentType?: string
  format: string
  fileUrl: string
  storageKey?: string
  fileName?: string
  mimeType?: string
  version?: string
  language?: string
  updatedAt?: string
  tags?: string[]
}

const META_PATH = "metadata/resumes.json"
const LOCAL_FILE = "resumes.json"

function useBlobStore(): boolean {
  return Boolean(
    process.env.BLOB_READ_WRITE_TOKEN ||
      (process.env.VERCEL === "1" && process.env.BLOB_STORE_ID),
  )
}

function readLocalDefaults(): Resume[] {
  try {
    return readJson<Resume[]>(LOCAL_FILE)
  } catch {
    return []
  }
}

async function readFromBlob(): Promise<Resume[]> {
  try {
    const result = await get(META_PATH, { access: "public" })
    if (!result || result.statusCode !== 200 || !result.stream) {
      return readLocalDefaults()
    }
    const text = await new Response(result.stream).text()
    const parsed = JSON.parse(text) as Resume[]
    return Array.isArray(parsed) ? parsed : readLocalDefaults()
  } catch {
    return readLocalDefaults()
  }
}

async function writeToBlob(resumes: Resume[]): Promise<void> {
  await put(META_PATH, JSON.stringify(resumes, null, 2), {
    access: "public",
    contentType: "application/json",
    allowOverwrite: true,
    addRandomSuffix: false,
  })
}

export async function getResumes(): Promise<Resume[]> {
  if (useBlobStore()) {
    return readFromBlob()
  }
  return readLocalDefaults()
}

export async function saveResumes(resumes: Resume[]): Promise<void> {
  if (useBlobStore()) {
    await writeToBlob(resumes)
    return
  }
  writeJson(LOCAL_FILE, resumes)
}

export { nextId }
