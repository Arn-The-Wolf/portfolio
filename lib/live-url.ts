/**
 * Known public demos keyed by GitHub repo name.
 * Used when GitHub homepage is empty or the API falls back offline.
 */
export const KNOWN_LIVE_URLS: Record<string, string> = {
  "ingoboka-platform": "https://ingoboka-platform.vercel.app",
  portfolio: "https://arnold-rho.vercel.app",
  aviaserve: "https://aviaserve.vercel.app",
  Credora: "https://credora.vercel.app",
}

/** Turn a homepage/demo string into an absolute http(s) URL, or empty if it is not a live site. */
export function toLiveUrl(raw?: string | null): string {
  const value = (raw || "").trim()
  if (!value) return ""

  if (value.startsWith("/") && !value.startsWith("//")) return ""

  const withProtocol = /^https?:\/\//i.test(value)
    ? value
    : value.startsWith("//")
      ? `https:${value}`
      : `https://${value}`

  try {
    const url = new URL(withProtocol)
    if (url.protocol !== "http:" && url.protocol !== "https:") return ""
    const host = url.hostname.toLowerCase()
    if (host === "github.com" || host.endsWith(".github.com")) return ""
    return url.toString()
  } catch {
    return ""
  }
}

/** Prefer GitHub homepage, then known demo map for the repo name. */
export function resolveRepoLiveUrl(repoName: string, homepage?: string | null): string {
  return toLiveUrl(homepage) || toLiveUrl(KNOWN_LIVE_URLS[repoName]) || ""
}
