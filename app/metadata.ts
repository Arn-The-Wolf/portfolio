import type { Metadata } from "next";

export const siteConfig = {
  name: "RUYANGE Arnold - Elite Fullstack Engineer",
  description:
    "Professional portfolio of RUYANGE Arnold, elite fullstack engineer specializing in mission-critical applications, secure systems, and high-performance web development.",
  url: "https://operative.dev",
  ogImage: "https://operative.dev/og-image.png",
  links: {
    github: "https://github.com/Arn-The-Wolf",
    linkedin: "https://linkedin.com",
    email: "arnwolfie5@gmail.com",
    twitter: "https://x.com/arnwolfie",
    instagram: "https://www.instagram.com/arnwolfie/",
  },
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "fullstack engineer",
    "web developer",
    "react developer",
    "node.js developer",
    "typescript",
    "next.js",
    "portfolio",
    "software engineer",
    "frontend developer",
    "backend developer",
    "devops engineer",
  ],
  authors: [
    {
      name: "RUYANGE Arnold",
      url: "https://operative.dev",
    },
  ],
  creator: "RUYANGE Arnold",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
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
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
};
