export type ProjectCategory = "frontend" | "backend" | "fullstack" | "mobile" | "devops" | "ai"

export const PROJECT_FILTERS = ["all", "frontend", "backend", "fullstack", "mobile", "devops", "ai"] as const

export type ProjectFilter = (typeof PROJECT_FILTERS)[number]

export interface CategorizableProject {
  title?: string
  description?: string
  subtitle?: string
  technologies?: string[]
  language?: string
  topics?: string[]
}

export function getProjectCategories(item: CategorizableProject): ProjectCategory[] {
  const text = [
    item.title,
    item.subtitle,
    item.description,
    item.language,
    ...(item.technologies || []),
    ...(item.topics || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()

  const cats = new Set<ProjectCategory>()

  if (/react|vue|next|astro|tailwind|javascript|typescript|frontend|html|css|swing|gui|portfolio/.test(text)) {
    cats.add("frontend")
  }
  if (/python|java|node|flask|express|spring|backend|api|mysql|postgresql|scraping|beautifulsoup|algorithm/.test(text)) {
    cats.add("backend")
  }
  if (/ai|ml|cnn|tensorflow|pytorch|machine learning|neural|handwriting|recognition/.test(text)) {
    cats.add("ai")
  }
  if (/docker|kubernetes|mqtt|iot|devops|ci\/cd|terraform|aws|azure|weather/.test(text)) {
    cats.add("devops")
  }
  if (/react native|flutter|mobile|android|ios|kotlin|swift/.test(text)) {
    cats.add("mobile")
  }
  if (
    (cats.has("frontend") && cats.has("backend")) ||
    /fullstack|e-commerce|ecommerce|library management/.test(text)
  ) {
    cats.add("fullstack")
  }

  if (cats.size === 0) cats.add("backend")

  return Array.from(cats)
}

export function matchesProjectFilter(categories: ProjectCategory[], filter: ProjectFilter): boolean {
  if (filter === "all") return true
  return categories.includes(filter)
}
