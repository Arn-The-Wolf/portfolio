import imageMap from "./project-image-map.json"

const CATEGORY_FALLBACK: Record<string, string> = {
  ai: "/images/projects/project-7.svg",
  fullstack: "/images/projects/project-8.svg",
  backend: "/images/projects/project-10.svg",
  frontend: "/images/projects/project-31.svg",
  mobile: "/images/projects/project-17.svg",
  devops: "/images/projects/project-4.svg",
}

type ImageMap = Record<string, string>

const map = imageMap as ImageMap

export function getProjectImage(project: {
  id?: number | string
  image?: string
  category?: string
  categories?: string[]
}): string {
  if (project.image) return project.image

  if (project.id != null) {
    const key = String(project.id).replace(/^cms-/, "").replace(/^gh-/, "")
    if (map[key]) return map[key]
  }

  const category = project.category || project.categories?.[0] || "fullstack"
  return CATEGORY_FALLBACK[category] || CATEGORY_FALLBACK.fullstack
}
