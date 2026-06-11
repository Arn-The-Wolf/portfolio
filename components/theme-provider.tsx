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

/** Every page load starts dark. Theme toggle works for the session only. */
function forceDarkOnLoad() {
  try {
    localStorage.removeItem("theme")
  } catch {
    // ignore
  }
  applyTheme("dark")
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark")

  useEffect(() => {
    forceDarkOnLoad()
    setThemeState("dark")
  }, [])

  const setTheme = (next: Theme) => {
    setThemeState(next)
    applyTheme(next)
  }

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark")

  return (
    <ThemeContext.Provider
      value={{ theme, isDark: theme === "dark", toggleTheme, setTheme }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return ctx
}
