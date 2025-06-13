"use client"

import { useState, useEffect } from "react"

export function useTheme() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    // Load theme from localStorage on mount
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      const isDarkTheme = savedTheme === "dark"
      setIsDark(isDarkTheme)
      if (isDarkTheme) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)

    // Save to localStorage
    localStorage.setItem("theme", newTheme ? "dark" : "light")

    // Apply theme
    if (newTheme) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  return { isDark, toggleTheme }
}
