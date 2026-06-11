import fs from "fs"
import path from "path"

const dataDir = path.join(process.cwd(), "data")

export function readJson<T>(filename: string): T {
  const filePath = path.join(dataDir, filename)
  const contents = fs.readFileSync(filePath, "utf8")
  return JSON.parse(contents) as T
}

export function writeJson<T>(filename: string, data: T): void {
  const filePath = path.join(dataDir, filename)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

export function nextId<T extends { id: number }>(items: T[]): number {
  return items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1
}
