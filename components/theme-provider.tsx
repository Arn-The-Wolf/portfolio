"use client"

import { createContext, useContext, type ReactNode } from "react"

interface ThemeContextValue {
  theme: "dark"
  isDark: true
}

const ThemeContext = createContext<ThemeContextValue>({ theme: "dark", isDark: true })

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeContext.Provider value={{ theme: "dark", isDark: true }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
