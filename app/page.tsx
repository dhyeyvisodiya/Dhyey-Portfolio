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
  const { fetchData } = useStore()

  useEffect(() => {
    fetchData()
  }, [fetchData])

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
    </main>
  )
}
