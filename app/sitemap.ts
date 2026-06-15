import type { MetadataRoute } from "next"
import { siteUrl } from "@/lib/site-config"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const pages = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/missions", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/arsenal", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/history", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/resumes", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/reports", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  ]

  return pages.map(({ path, priority, changeFrequency }) => ({
    url: siteUrl(path),
    lastModified: now,
    changeFrequency,
    priority,
  }))
}
