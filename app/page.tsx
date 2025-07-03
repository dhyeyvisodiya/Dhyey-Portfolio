"use client"

import { useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Experience } from "@/components/experience"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Certificates } from "@/components/certificates"
import { Blogs } from "@/components/blogs"
import { Contact } from "@/components/contact"
import { useStore } from "@/lib/store"

export default function Home() {
  const { fetchData, error, clearError } = useStore()

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    if (error) {
      console.error("Store error:", error)
      // Auto-clear error after 5 seconds
      const timer = setTimeout(() => {
        clearError()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [error, clearError])

  return (
    <main className="min-h-screen bg-black relative">
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Certificates />
      <Blogs />
      <Contact />

      {/* Error Toast */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50 animate-fadeInUp">
          <p className="text-sm">{error}</p>
          <button onClick={clearError} className="absolute top-1 right-2 text-white hover:text-gray-200">
            ×
          </button>
        </div>
      )}
    </main>
  )
}
