"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FolderOpen, Code, Award, BookOpen, Briefcase, FileText, TrendingUp, Eye, RefreshCw } from "lucide-react"
import { useStore } from "@/lib/store"
import { useState } from "react"

interface DashboardOverviewProps {
  setActiveTab: (tab: string) => void
}

export function DashboardOverview({ setActiveTab }: DashboardOverviewProps) {
  const { projects, skills, certificates, blogs, experiences, resume, isLoading, error, refreshData, clearError } =
    useStore()

  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      await refreshData()
    } catch (error) {
      console.error("Failed to refresh data:", error)
    } finally {
      setIsRefreshing(false)
    }
  }

  const stats = [
    {
      title: "Projects",
      count: projects.length,
      icon: FolderOpen,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      featured: projects.filter((p) => p.featured).length,
      action: () => setActiveTab("projects"),
    },
    {
      title: "Skills",
      count: skills.length,
      icon: Code,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
      categories: [...new Set(skills.map((s) => s.category))].length,
      action: () => setActiveTab("skills"),
    },
    {
      title: "Certificates",
      count: certificates.length,
      icon: Award,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/20",
      verified: certificates.filter((c) => c.verifyUrl).length,
      action: () => setActiveTab("certificates"),
    },
    {
      title: "Blog Posts",
      count: blogs.length,
      icon: BookOpen,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
      published: blogs.filter((b) => b.published).length,
      action: () => setActiveTab("blogs"),
    },
    {
      title: "Experience",
      count: experiences.length,
      icon: Briefcase,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20",
      years: experiences.length > 0 ? "3+" : "0",
      action: () => setActiveTab("experience"),
    },
    {
      title: "Resume",
      count: resume ? 1 : 0,
      icon: FileText,
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
      borderColor: "border-indigo-500/20",
      status: resume ? "Complete" : "Pending",
      action: () => setActiveTab("resume"),
    },
  ]

  const quickActions = [
    { label: "Add New Project", action: () => setActiveTab("projects"), color: "bg-blue-500" },
    { label: "Add Skill", action: () => setActiveTab("skills"), color: "bg-green-500" },
    { label: "Write Blog Post", action: () => setActiveTab("blogs"), color: "bg-purple-500" },
    { label: "Add Experience", action: () => setActiveTab("experience"), color: "bg-red-500" },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center fade-in-up">
        <div>
          <h1 className="text-3xl font-bold text-white gradient-text">Dashboard Overview</h1>
          <p className="text-gray-400">Manage your portfolio content and track your progress</p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={handleRefresh}
            disabled={isRefreshing || isLoading}
            className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 transition-all duration-300"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </Button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <Card className="bg-red-500/10 border-red-500/20 fade-in-up">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-400 text-sm">{error}</span>
              </div>
              <Button size="sm" variant="ghost" onClick={clearError} className="text-red-400 hover:text-red-300">
                Dismiss
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card
            key={stat.title}
            className={`bg-gray-800/50 border-gray-700 card-hover backdrop-blur-sm cursor-pointer fade-in-up stagger-${index + 1} ${stat.borderColor}`}
            onClick={stat.action}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white mb-2">{stat.count}</div>
              <div className="flex items-center gap-2">
                {stat.title === "Projects" && stat.featured !== undefined && (
                  <Badge className="bg-blue-600/20 text-blue-400 border-blue-600/30">{stat.featured} Featured</Badge>
                )}
                {stat.title === "Skills" && stat.categories !== undefined && (
                  <Badge className="bg-green-600/20 text-green-400 border-green-600/30">
                    {stat.categories} Categories
                  </Badge>
                )}
                {stat.title === "Certificates" && stat.verified !== undefined && (
                  <Badge className="bg-yellow-600/20 text-yellow-400 border-yellow-600/30">
                    {stat.verified} Verified
                  </Badge>
                )}
                {stat.title === "Blog Posts" && stat.published !== undefined && (
                  <Badge className="bg-purple-600/20 text-purple-400 border-purple-600/30">
                    {stat.published} Published
                  </Badge>
                )}
                {stat.title === "Experience" && stat.years && (
                  <Badge className="bg-red-600/20 text-red-400 border-red-600/30">{stat.years} Years</Badge>
                )}
                {stat.title === "Resume" && stat.status && (
                  <Badge
                    className={`${
                      stat.status === "Complete"
                        ? "bg-green-600/20 text-green-400 border-green-600/30"
                        : "bg-yellow-600/20 text-yellow-400 border-yellow-600/30"
                    }`}
                  >
                    {stat.status}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="bg-gray-800/50 border-gray-700 fade-in-up stagger-7">
        <CardHeader>
          <CardTitle className="text-white">Quick Actions</CardTitle>
          <CardDescription className="text-gray-400">Quickly add new content to your portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={action.label}
                onClick={action.action}
                className={`${action.color} hover:scale-105 transition-all duration-300 text-white border-0`}
              >
                {action.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Metrics */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-gray-800/50 border-gray-700 fade-in-up stagger-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Content Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Content Items</span>
                <span className="text-white font-bold">
                  {projects.length + skills.length + certificates.length + blogs.length + experiences.length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Published Blogs</span>
                <span className="text-white font-bold">{blogs.filter((b) => b.published).length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Featured Projects</span>
                <span className="text-white font-bold">{projects.filter((p) => p.featured).length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700 fade-in-up stagger-9">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Eye className="h-5 w-5 text-blue-500" />
              Portfolio Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Profile Completion</span>
                <Badge className="bg-green-600/20 text-green-400 border-green-600/30">{resume ? "100%" : "85%"}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Content Sections</span>
                <span className="text-white font-bold">6/6 Active</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Last Updated</span>
                <span className="text-gray-400 text-sm">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
