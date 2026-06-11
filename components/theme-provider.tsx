"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type Theme = "dark" | "light"

interface ThemeContextValue {
  theme: Theme
  isDark: boolean
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function applyTheme(theme: Theme) {
  const root = document.documentElement
  const isDark = theme !== "light"
  root.classList.toggle("dark", isDark)
  root.setAttribute("data-theme", isDark ? "dark" : "light")
  root.style.colorScheme = isDark ? "dark" : "light"
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("theme")
    // Default is always dark unless the user explicitly chose light.
    const initial: Theme = saved === "light" ? "light" : "dark"
    if (saved !== "light" && saved !== "dark") {
      localStorage.setItem("theme", "dark")
    }
    setThemeState(initial)
    applyTheme(initial)
    setMounted(true)
  }, [])

  const setTheme = (next: Theme) => {
    setThemeState(next)
    localStorage.setItem("theme", next)
    applyTheme(next)
  }

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark")

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeContext.Provider value={{ theme, isDark: theme === "dark", toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    return {
      theme: "dark" as Theme,
      isDark: true,
      toggleTheme: () => {},
      setTheme: () => {},
    }
  }
  return ctx
}
