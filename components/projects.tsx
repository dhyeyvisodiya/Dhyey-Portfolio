"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import { useStore } from "@/lib/store"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import Link from "next/link"

export function Projects() {
  const { projects } = useStore()
  const { ref, isVisible } = useScrollAnimation()
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 4)

  return (
    <section id="projects" className="py-20 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 ${isVisible ? "fade-in-up" : "scroll-animate"}`}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 gradient-text">Featured Projects</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">A showcase of my recent work and personal projects.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {featuredProjects.map((project, index) => (
            <Card
              key={project.id}
              className={`bg-gray-800/50 border-gray-700 overflow-hidden card-hover ${
                project.featured ? "ring-2 ring-red-500/20" : ""
              } ${isVisible ? `fade-in-up stagger-${index + 1}` : "scroll-animate"}`}
            >
              <div className="aspect-video bg-gray-700 overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-white hover:text-red-400 transition-colors">{project.title}</CardTitle>
                    {project.featured && (
                      <Badge className="bg-red-600/20 text-red-400 border-red-600/30 mt-2 animate-pulse">
                        Featured
                      </Badge>
                    )}
                  </div>
                </div>
                <CardDescription className="text-gray-400">{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge
                      key={techIndex}
                      className="bg-blue-600/20 text-blue-400 border-blue-600/30 hover:bg-blue-600/30 transition-colors"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent hover:border-red-500 transition-all duration-300"
                    asChild
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  <Button size="sm" className="gradient-bg text-white" asChild>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Demo
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className={`text-center ${isVisible ? "fade-in-up stagger-5" : "scroll-animate"}`}>
          <Link href="/projects">
            <Button className="gradient-bg text-white px-8 py-3 hover:scale-105 transition-transform duration-300">
              View All Projects
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
