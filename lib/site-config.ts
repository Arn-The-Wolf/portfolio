export const siteConfig = {
  brand: "ARNOLD.DEV",
  name: "RUYANGE Arnold",
  title: "Full-Stack Developer",
  url: process.env.NEXT_PUBLIC_BASE_URL ?? "https://arnold-rho.vercel.app",
  email: "ruyangearnold@gmail.com",
  github: "https://github.com/Arn-The-Wolf",
  linkedin: "https://linkedin.com",
  description:
    "Portfolio of RUYANGE Arnold — full-stack developer building Java, Python, AI, and cybersecurity projects.",
  get ogImage() {
    return `${this.url.replace(/\/$/, "")}/images/profile.png`
  },
} as const

export function siteUrl(path = ""): string {
  const base = siteConfig.url.replace(/\/$/, "")
  if (!path) return base
  return `${base}${path.startsWith("/") ? path : `/${path}`}`
}
