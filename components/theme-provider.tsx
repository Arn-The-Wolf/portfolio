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

function readTheme(): Theme {
  if (typeof window === "undefined") return "dark"
  if (localStorage.getItem("theme") === "light") return "light"
  if (document.documentElement.getAttribute("data-theme") === "light") return "light"
  return "dark"
}

function applyTheme(theme: Theme) {
  const root = document.documentElement
  const isDark = theme !== "light"
  root.classList.toggle("dark", isDark)
  root.setAttribute("data-theme", isDark ? "dark" : "light")
  root.style.colorScheme = isDark ? "dark" : "light"
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => readTheme())

  useEffect(() => {
    const initial = readTheme()
    if (localStorage.getItem("theme") !== "light" && localStorage.getItem("theme") !== "dark") {
      localStorage.setItem("theme", "dark")
    }
    setThemeState(initial)
    applyTheme(initial)
  }, [])

  const setTheme = (next: Theme) => {
    setThemeState(next)
    localStorage.setItem("theme", next)
    applyTheme(next)
  }

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark")

  const value: ThemeContextValue = {
    theme,
    isDark: theme === "dark",
    toggleTheme,
    setTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return ctx
}
