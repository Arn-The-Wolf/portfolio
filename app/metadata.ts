import type { Metadata } from "next"
import { siteConfig as brand } from "@/lib/site-config"

export const siteConfig = {
  name: `${brand.name} | ${brand.brand}`,
  description: brand.description,
  url: brand.url,
  ogImage: brand.ogImage,
  links: {
    github: brand.github,
    linkedin: brand.linkedin,
    email: brand.email,
    twitter: "https://x.com/arnwolfie",
    instagram: "https://www.instagram.com/arnwolfie/",
  },
}

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${brand.brand}`,
  },
  description: siteConfig.description,
  keywords: [
    "RUYANGE Arnold",
    "full-stack developer",
    "Java developer",
    "Python developer",
    "cybersecurity",
    "machine learning",
    "portfolio",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: brand.name, url: brand.url }],
  creator: brand.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: brand.brand,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: brand.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@arnwolfie",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}
