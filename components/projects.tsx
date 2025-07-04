"use client"

import { useEffect, useState } from "react"
import { ExternalLink, Github, Play } from "lucide-react"
import { SectionBackground } from "./section-background"
import { useStore } from "@/lib/store"

export function Projects() {
  const { projects } = useStore()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("projects")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const defaultProjects = [
    {
      id: 1,
      title: "E-Commerce Mobile App",
      description:
        "A full-featured e-commerce mobile application built with React Native, featuring user authentication, product catalog, shopping cart, and payment integration.",
      image: "/placeholder.svg?height=300&width=400",
      technologies: ["React Native", "TypeScript", "Redux", "Firebase", "Stripe"],
      githubUrl: "https://github.com/dhyeyvisodiya/ecommerce-app",
      liveUrl: "https://ecommerce-app-demo.com",
      featured: true,
    },
    {
      id: 2,
      title: "Task Management Dashboard",
      description:
        "A comprehensive task management dashboard with real-time collaboration, built using Next.js and Supabase. Features include drag-and-drop, team management, and analytics.",
      image: "/placeholder.svg?height=300&width=400",
      technologies: ["Next.js", "React", "Supabase", "Tailwind CSS", "Framer Motion"],
      githubUrl: "https://github.com/dhyeyvisodiya/task-dashboard",
      liveUrl: "https://task-dashboard-demo.com",
      featured: true,
    },
    {
      id: 3,
      title: "Weather Forecast App",
      description:
        "A beautiful weather application with location-based forecasts, interactive maps, and detailed weather analytics. Built with React Native and OpenWeather API.",
      image: "/placeholder.svg?height=300&width=400",
      technologies: ["React Native", "Expo", "OpenWeather API", "AsyncStorage"],
      githubUrl: "https://github.com/dhyeyvisodiya/weather-app",
      liveUrl: "https://weather-app-demo.com",
      featured: false,
    },
    {
      id: 4,
      title: "Social Media Analytics",
      description:
        "A powerful analytics dashboard for social media management with real-time data visualization, engagement tracking, and automated reporting features.",
      image: "/placeholder.svg?height=300&width=400",
      technologies: ["React", "D3.js", "Node.js", "MongoDB", "Chart.js"],
      githubUrl: "https://github.com/dhyeyvisodiya/social-analytics",
      liveUrl: "https://social-analytics-demo.com",
      featured: false,
    },
  ]

  const currentProjects = projects.length > 0 ? projects : defaultProjects

  return (
    <section id="projects" className="py-20 relative overflow-hidden bg-black">
      <SectionBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A showcase of my recent work and the technologies I'm passionate about
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto rounded-full mt-4"></div>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {currentProjects.map((project, index) => (
              <div
                key={project.id}
                className={`group relative bg-gray-900/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800/50 hover:border-gray-700/50 transition-all duration-500 hover:transform hover:scale-105 ${
                  isVisible ? "animate-fadeInUp" : ""
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-red-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </span>
                  </div>
                )}

                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>

                  {/* Overlay Actions */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50">
                    <div className="flex gap-4">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full transition-colors duration-200 hover:scale-110 transform"
                      >
                        <Play className="w-5 h-5" />
                      </a>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full transition-colors duration-200 hover:scale-110 transform"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-500 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">{project.description}</p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-800/50 text-gray-300 rounded-full text-sm border border-gray-700/50 hover:border-red-500/50 hover:text-red-400 transition-all duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Links */}
                  <div className="flex gap-4">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors duration-200 font-semibold"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 font-semibold"
                    >
                      <Github className="w-4 h-4" />
                      Source Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View More Projects */}
          <div className="text-center mt-12">
            <a
              href="https://github.com/dhyeyvisodiya"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-blue-500 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25"
            >
              <Github className="w-5 h-5" />
              View All Projects on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
