"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Home, BarChart3, FolderOpen, Award, BookOpen, FileText, Settings } from "lucide-react"

interface AdminNavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function AdminNavigation({ activeTab, setActiveTab }: AdminNavigationProps) {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "skills", label: "Skills", icon: Settings },
    { id: "certificates", label: "Certificates", icon: Award },
    { id: "blogs", label: "Blogs", icon: BookOpen },
    { id: "experience", label: "Experience", icon: FileText },
    { id: "resume", label: "Resume", icon: FileText },
  ]

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-gray-800 slide-in-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <span className="text-2xl font-bold text-red-500 gradient-text">{"<DV/>"}</span>
            <span className="text-gray-400">Admin Panel</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                      activeTab === item.id
                        ? "text-red-400 bg-red-500/10 border border-red-500/20"
                        : "text-gray-300 hover:text-white hover:bg-gray-800"
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 bg-transparent hover:bg-gray-800 transition-all duration-300"
              asChild
            >
              <a href="/">
                <Home className="h-4 w-4 mr-2" />
                View Site
              </a>
            </Button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden fade-in-up">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black border-b border-gray-800">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id)
                    setIsOpen(false)
                  }}
                  className={`flex items-center w-full px-3 py-2 text-base font-medium transition-colors rounded-lg ${
                    activeTab === item.id
                      ? "text-red-400 bg-red-500/10"
                      : "text-gray-300 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.label}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}
