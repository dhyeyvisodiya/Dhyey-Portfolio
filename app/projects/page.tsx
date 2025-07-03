"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, Github, ExternalLink, Filter, Star } from "lucide-react"
import { dataManager, type Project } from "@/lib/data-manager"
import { analytics } from "@/lib/analytics"

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTech, setSelectedTech] = useState<string | null>(null)
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)
  const [allTechs, setAllTechs] = useState<string[]>([])

  useEffect(() => {
    const data = dataManager.getData()
    setProjects(data.projects)
    setFilteredProjects(data.projects)

    // Extract all unique technologies
    const techs = Array.from(new Set(data.projects.flatMap((project) => project.tech)))
    setAllTechs(techs)

    analytics.trackPageView("/projects")
  }, [])

  useEffect(() => {
    let filtered = projects

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.tech.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Filter by selected technology
    if (selectedTech) {
      filtered = filtered.filter((project) => project.tech.includes(selectedTech))
    }

    // Filter by featured
    if (showFeaturedOnly) {
      filtered = filtered.filter((project) => project.featured)
    }

    setFilteredProjects(filtered)
  }, [searchQuery, selectedTech, showFeaturedOnly, projects])

  const handleTechClick = (tech: string) => {
    setSelectedTech(selectedTech === tech ? null : tech)
  }

  const handleProjectClick = (project: Project) => {
    analytics.trackProjectView(project.title)
  }

  const handleSocialClick = (url: string, platform: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
    analytics.trackContact(platform)
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-900/10 via-white to-purple-900/10 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <Button
            onClick={() => window.history.back()}
            variant="ghost"
            className="mb-8 text-red-500 hover:bg-red-500/20"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Portfolio
          </Button>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-black via-red-500 to-black bg-clip-text text-transparent">
            My <span className="text-red-500">Projects</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            A showcase of my work including mobile apps, web applications, and innovative solutions I've built using
            cutting-edge technologies.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/50 border-red-500/30 focus:border-red-500"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={showFeaturedOnly ? "default" : "outline"}
                onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                className={
                  showFeaturedOnly
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "border-red-500/30 text-red-500 hover:bg-red-500/20 bg-transparent"
                }
              >
                <Star size={16} className="mr-2" />
                Featured
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedTech(null)
                  setShowFeaturedOnly(false)
                }}
                className="border-red-500/30 text-red-500 hover:bg-red-500/20 bg-transparent"
              >
                <Filter size={16} className="mr-2" />
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Technology Tags */}
          <div className="flex flex-wrap gap-2">
            {allTechs.map((tech) => (
              <Badge
                key={tech}
                variant={selectedTech === tech ? "default" : "outline"}
                className={`cursor-pointer transition-all duration-300 ${
                  selectedTech === tech
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "border-red-500/50 text-red-400 hover:bg-red-500/20"
                }`}
                onClick={() => handleTechClick(tech)}
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🚀</div>
            <h3 className="text-2xl font-semibold text-black mb-2">No projects found</h3>
            <p className="text-gray-600">
              {searchQuery || selectedTech || showFeaturedOnly
                ? "Try adjusting your search or filter criteria."
                : "Projects will be displayed here once added."}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Card
                key={project.id}
                className="glass-card border border-red-500/20 hover:border-red-500/40 transition-all duration-500 hover:scale-105 group cursor-pointer animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleProjectClick(project)}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {project.featured && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse flex items-center">
                        <Star size={14} className="mr-1" />
                        Featured
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-black group-hover:text-red-500 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="outline"
                          className="border-red-500/50 text-red-400 text-xs hover:bg-red-500/20 transition-all duration-300"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSocialClick(project.github, "github")
                        }}
                        className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white flex items-center gap-2 bg-transparent transition-all duration-300 hover:scale-105"
                      >
                        <Github size={16} />
                        Code
                      </Button>
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSocialClick(project.demo, "demo")
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 transition-all duration-300 hover:scale-105"
                      >
                        <ExternalLink size={16} />
                        Demo
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Project Stats */}
        {projects.length > 0 && (
          <div className="mt-16 grid md:grid-cols-4 gap-6">
            <Card className="glass-card border border-red-500/20 text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-red-500 mb-2">{projects.length}</div>
                <div className="text-sm text-gray-600">Total Projects</div>
              </CardContent>
            </Card>
            <Card className="glass-card border border-blue-500/20 text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-blue-500 mb-2">{projects.filter((p) => p.featured).length}</div>
                <div className="text-sm text-gray-600">Featured Projects</div>
              </CardContent>
            </Card>
            <Card className="glass-card border border-green-500/20 text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-green-500 mb-2">{allTechs.length}</div>
                <div className="text-sm text-gray-600">Technologies Used</div>
              </CardContent>
            </Card>
            <Card className="glass-card border border-purple-500/20 text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-purple-500 mb-2">
                  {projects.filter((p) => p.demo && p.github).length}
                </div>
                <div className="text-sm text-gray-600">Live Projects</div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
