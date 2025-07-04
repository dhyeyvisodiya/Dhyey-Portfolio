"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface SectionBackgroundProps {
  variant?: "default" | "alternate" | "dark"
  children: React.ReactNode
}

export function SectionBackground({ variant = "default", children }: SectionBackgroundProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <>{children}</>

  const getBackgroundElements = () => {
    switch (variant) {
      case "alternate":
        return (
          <>
            {/* Floating geometric shapes */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-xl animate-pulse" />
            <div
              className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-full blur-xl animate-pulse"
              style={{ animationDelay: "1s" }}
            />
            <div
              className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-green-500/10 to-cyan-500/10 rounded-full blur-xl animate-pulse"
              style={{ animationDelay: "2s" }}
            />

            {/* Animated lines */}
            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent animate-pulse" />
            <div
              className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent animate-pulse"
              style={{ animationDelay: "1s" }}
            />
          </>
        )
      case "dark":
        return (
          <>
            {/* Dark theme with subtle animations */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/50" />
            <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-gradient-to-r from-red-500/5 to-blue-500/5 rounded-full blur-3xl animate-pulse" />
            <div
              className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-to-r from-purple-500/5 to-green-500/5 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "1.5s" }}
            />

            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
          </>
        )
      default:
        return (
          <>
            {/* Default background animations */}
            <div className="absolute top-20 right-20 w-24 h-24 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-full blur-xl animate-pulse" />
            <div
              className="absolute bottom-32 left-16 w-36 h-36 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-xl animate-pulse"
              style={{ animationDelay: "0.5s" }}
            />
            <div
              className="absolute top-1/3 left-1/2 w-28 h-28 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl animate-pulse"
              style={{ animationDelay: "1s" }}
            />

            {/* Floating particles */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-gradient-to-r from-red-400/50 to-blue-400/50 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </>
        )
    }
  }

  return (
    <div className="relative overflow-hidden">
      {/* Background animations */}
      <div className="absolute inset-0 pointer-events-none">{getBackgroundElements()}</div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
