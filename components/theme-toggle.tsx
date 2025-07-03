"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"
import { dataManager } from "@/lib/data-manager"
import { analytics } from "@/lib/analytics"

type Theme = "light" | "dark" | "system"

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const data = dataManager.getData()
    setTheme(data.settings.theme === "light" ? "light" : "dark")
  }, [])

  useEffect(() => {
    if (!mounted) return

    const root = document.documentElement

    if (theme === "light") {
      root.setAttribute("data-theme", "light")
    } else {
      root.setAttribute("data-theme", "dark")
    }

    // Update data manager
    dataManager.updateSettings({ theme: theme as "light" | "dark" })

    // Track theme change
    analytics.trackThemeChange(theme)
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }

  if (!mounted) {
    return (
      <Button variant="outline" size="sm" className="border-red-500/30 text-red-500 hover:bg-red-500/20 bg-transparent">
        <div className="w-4 h-4" />
      </Button>
    )
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="border-red-500/30 text-red-500 hover:bg-red-500/20 bg-transparent transition-all duration-300 hover:scale-105"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <Moon size={16} className="transition-transform duration-300" />
      ) : (
        <Sun size={16} className="transition-transform duration-300" />
      )}
    </Button>
  )
}
