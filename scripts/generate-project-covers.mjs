import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, "..")
const projects = JSON.parse(fs.readFileSync(path.join(root, "data/projects.json"), "utf8"))
const outDir = path.join(root, "public/images/projects")
fs.mkdirSync(outDir, { recursive: true })

const colors = {
  ai: ["#22c55e", "#14532d"],
  fullstack: ["#34d399", "#064e3b"],
  backend: ["#4ade80", "#166534"],
  frontend: ["#86efac", "#052e16"],
  mobile: ["#a3e635", "#3f6212"],
  devops: ["#2dd4bf", "#134e4a"],
}

function hash(s) {
  let h = 0
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return h
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function stars(seed, n = 28) {
  let out = ""
  for (let i = 0; i < n; i++) {
    const x = (seed * 17 + i * 47) % 100
    const y = (seed * 29 + i * 73) % 100
    const r = ((seed + i) % 3) + 0.6
    const o = 0.25 + ((seed + i) % 5) / 10
    out += `<circle cx="${x}%" cy="${y}%" r="${r}" fill="#86efac" opacity="${o}"/>`
  }
  return out
}

const map = {}

for (const p of projects) {
  const cat = p.category || "fullstack"
  const [accent, deep] = colors[cat] || colors.fullstack
  const seed = hash(String(p.id) + p.title)
  const initial = escapeXml((p.title || "?").charAt(0).toUpperCase())
  const label = escapeXml((p.title || "").slice(0, 28))
  const sub = escapeXml((p.subtitle || cat).slice(0, 36))
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#020617"/>
      <stop offset="55%" stop-color="${deep}"/>
      <stop offset="100%" stop-color="#000"/>
    </linearGradient>
    <radialGradient id="glow" cx="70%" cy="20%" r="50%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="transparent"/>
    </radialGradient>
  </defs>
  <rect width="800" height="450" fill="url(#g)"/>
  <rect width="800" height="450" fill="url(#glow)"/>
  ${stars(seed)}
  <text x="48" y="210" font-family="Georgia, serif" font-size="120" fill="${accent}" fill-opacity="0.18">${initial}</text>
  <text x="48" y="300" font-family="ui-monospace, Consolas, monospace" font-size="34" fill="${accent}" font-weight="700">${label}</text>
  <text x="48" y="340" font-family="ui-monospace, Consolas, monospace" font-size="18" fill="#a7f3d0" fill-opacity="0.8">${sub}</text>
  <rect x="48" y="360" width="120" height="3" fill="${accent}"/>
</svg>`

  const file = `project-${p.id}.svg`
  fs.writeFileSync(path.join(outDir, file), svg)
  map[p.id] = `/images/projects/${file}`
  p.image = map[p.id]
}

fs.writeFileSync(path.join(root, "data/projects.json"), JSON.stringify(projects, null, 2) + "\n")
fs.writeFileSync(path.join(root, "lib/project-image-map.json"), JSON.stringify(map, null, 2) + "\n")
console.log(`Generated ${projects.length} project covers`)
