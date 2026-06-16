import fs from "fs"
import path from "path"
import { get, put } from "@vercel/blob"

const dataDir = path.join(process.cwd(), "data")

export function useBlobStore(): boolean {
  return Boolean(
    process.env.BLOB_READ_WRITE_TOKEN ||
      (process.env.VERCEL === "1" && process.env.BLOB_STORE_ID),
  )
}

function blobPath(filename: string): string {
  return `data/${filename}`
}

function readLocal<T>(filename: string): T {
  const filePath = path.join(dataDir, filename)
  const contents = fs.readFileSync(filePath, "utf8")
  return JSON.parse(contents) as T
}

function writeLocal<T>(filename: string, data: T): void {
  const filePath = path.join(dataDir, filename)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

async function readFromBlob<T>(filename: string): Promise<T> {
  try {
    const result = await get(blobPath(filename), { access: "public" })
    if (!result || result.statusCode !== 200 || !result.stream) {
      return readLocal<T>(filename)
    }
    const text = await new Response(result.stream).text()
    return JSON.parse(text) as T
  } catch {
    return readLocal<T>(filename)
  }
}

async function writeToBlob<T>(filename: string, data: T): Promise<void> {
  await put(blobPath(filename), JSON.stringify(data, null, 2), {
    access: "public",
    contentType: "application/json",
    allowOverwrite: true,
    addRandomSuffix: false,
  })
}

/** Sync read from bundled data/ — safe for build-time static generation */
export function readJson<T>(filename: string): T {
  return readLocal<T>(filename)
}

/** Sync write — local filesystem only (dev) */
export function writeJson<T>(filename: string, data: T): void {
  writeLocal(filename, data)
}

/** Async read — Blob on Vercel, filesystem locally */
export async function readJsonAsync<T>(filename: string): Promise<T> {
  if (useBlobStore()) return readFromBlob<T>(filename)
  return readLocal<T>(filename)
}

/** Async write — Blob on Vercel, filesystem locally */
export async function writeJsonAsync<T>(filename: string, data: T): Promise<void> {
  if (useBlobStore()) return writeToBlob(filename, data)
  writeLocal(filename, data)
}

export function nextId<T extends { id: number }>(items: T[]): number {
  return items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1
}
