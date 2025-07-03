"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, X, ExternalLink, Building, Award, BookOpen, Code, Briefcase } from "lucide-react"
import { dataManager } from "@/lib/data-manager"

interface SearchResult {
  type: "skill" | "project" | "certificate" | "experience" | "blog"
  id: string
  title: string
  description: string
  tags?: string[]
  url?: string
  icon: React.ReactNode
}

interface SearchComponentProps {
  onClose: () => void
}

export function SearchComponent({ onClose }: SearchComponentProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscape)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [onClose])

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([])
      return
    }

    setIsLoading(true)
    const searchResults = dataManager.search(query)

    const formattedResults: SearchResult[] = [
      ...searchResults.skills.map((skill) => ({
        type: "skill" as const,
        id: skill.id,
        title: skill.name,
        description: `${skill.category} • ${skill.level}`,
        tags: [skill.category, skill.level],
        icon: <Code className="text-red-400" size={20} />,
      })),
      ...searchResults.projects.map((project) => ({
        type: "project" as const,
        id: project.id,
        title: project.title,
        description: project.description,
        tags: project.tech,
        url: project.demo,
        icon: <Briefcase className="text-blue-400" size={20} />,
      })),
      ...searchResults.certificates.map((cert) => ({
        type: "certificate" as const,
        id: cert.id,
        title: cert.title,
        description: `${cert.issuer} • ${cert.date}`,
        tags: [cert.issuer],
        icon: <Award className="text-yellow-400" size={20} />,
      })),
      ...searchResults.experiences.map((exp) => ({
        type: "experience" as const,
        id: exp.id,
        title: exp.title,
        description: `${exp.company} • ${exp.period}`,
        tags: [exp.company],
        icon: <Building className="text-green-400" size={20} />,
      })),
      ...searchResults.blogPosts.map((post) => ({
        type: "blog" as const,
        id: post.id,
        title: post.title,
        description: post.excerpt,
        tags: post.tags,
        icon: <BookOpen className="text-purple-400" size={20} />,
      })),
    ]

    setResults(formattedResults)
    setIsLoading(false)
  }, [query])

  const handleResultClick = (result: SearchResult) => {
    if (result.url) {
      window.open(result.url, "_blank", "noopener,noreferrer")
    } else {
      // Navigate to the section
      const sectionMap = {
        skill: "skills",
        project: "projects",
        certificate: "certificates",
        experience: "experience",
        blog: "blog",
      }

      const sectionId = sectionMap[result.type]
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
        onClose()
      }
    }
  }

  return (
    <div
      ref={containerRef}
      className="glass-card rounded-2xl p-6 max-h-[80vh] overflow-hidden flex flex-col animate-scaleIn"
    >
      {/* Search Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search skills, projects, certificates, experience, blog posts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-4 py-3 bg-black/50 border-red-500/30 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500/20 text-lg"
          />
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-gray-400 hover:text-red-400 hover:bg-red-500/20 p-2"
        >
          <X size={20} />
        </Button>
      </div>

      {/* Search Results */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="loading-spinner" />
            <span className="ml-3 text-gray-400">Searching...</span>
          </div>
        ) : query.trim().length < 2 ? (
          <div className="text-center py-12">
            <Search className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-gray-400 text-lg">Start typing to search...</p>
            <p className="text-gray-500 text-sm mt-2">
              Search across skills, projects, certificates, experience, and blog posts
            </p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-12">
            <Search className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-gray-400 text-lg">No results found for "{query}"</p>
            <p className="text-gray-500 text-sm mt-2">Try different keywords or check your spelling</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="text-sm text-gray-400 mb-4">
              Found {results.length} result{results.length !== 1 ? "s" : ""} for "{query}"
            </div>

            {results.map((result) => (
              <Card
                key={`${result.type}-${result.id}`}
                className="glass-card border-gradient hover:scale-105 transition-all duration-300 cursor-pointer group"
                onClick={() => handleResultClick(result)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">{result.icon}</div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-white group-hover:text-red-400 transition-colors truncate">
                          {result.title}
                        </h3>
                        <Badge
                          variant="outline"
                          className="text-xs border-red-500/50 text-red-400 bg-red-500/10 capitalize"
                        >
                          {result.type}
                        </Badge>
                      </div>

                      <p className="text-gray-300 text-sm mb-2 line-clamp-2">{result.description}</p>

                      {result.tags && result.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {result.tags.slice(0, 3).map((tag, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs border-blue-500/50 text-blue-400 bg-blue-500/10"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {result.tags.length > 3 && (
                            <Badge
                              variant="outline"
                              className="text-xs border-gray-500/50 text-gray-400 bg-gray-500/10"
                            >
                              +{result.tags.length - 3} more
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>

                    {result.url && (
                      <div className="flex-shrink-0">
                        <ExternalLink className="text-gray-400 group-hover:text-blue-400 transition-colors" size={16} />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Search Tips */}
      {query.trim().length === 0 && (
        <div className="mt-6 pt-6 border-t border-red-500/30">
          <h4 className="text-sm font-semibold text-white mb-3">Search Tips:</h4>
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
            <div>• Try "React" for skills</div>
            <div>• Try "mobile" for projects</div>
            <div>• Try "Google" for certificates</div>
            <div>• Try "developer" for experience</div>
          </div>
        </div>
      )}
    </div>
  )
}
