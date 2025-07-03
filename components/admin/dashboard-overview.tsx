"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Eye, TrendingUp, RefreshCw } from "lucide-react"
import { useStore } from "@/lib/store"
import { useState } from "react"

interface DashboardOverviewProps {
  setActiveTab: (tab: string) => void
}

export function DashboardOverview({ setActiveTab }: DashboardOverviewProps) {
  const { projects, skills, certificates, blogs, experiences, refreshData, lastUpdated } = useStore()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await refreshData()
    setIsRefreshing(false)
  }

  const stats = [
    {
      title: "Total Projects",
      value: projects.length.toString(),
      change: `${projects.filter((p) => p.featured).length} featured`,
      trend: "up",
      color: "text-red-400",
    },
    {
      title: "Blog Posts",
      value: blogs.length.toString(),
      change: `${blogs.filter((b) => b.published).length} published`,
      trend: "up",
      color: "text-blue-400",
    },
    {
      title: "Certificates",
      value: certificates.length.toString(),
      change: "Professional certs",
      trend: "stable",
      color: "text-purple-400",
    },
    {
      title: "Skills",
      value: skills.length.toString(),
      change: "Technologies",
      trend: "up",
      color: "text-green-400",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="fade-in-up flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 gradient-text">Admin Dashboard</h1>
          <p className="text-gray-400">Manage your portfolio content and settings</p>
          {lastUpdated > 0 && (
            <p className="text-xs text-gray-500 mt-1">Last updated: {new Date(lastUpdated).toLocaleString()}</p>
          )}
        </div>
        <Button
          onClick={handleRefresh}
          variant="outline"
          size="sm"
          className="border-gray-600 text-gray-300 bg-transparent hover:bg-gray-700"
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
          Refresh Data
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className={`bg-gray-800/50 border-gray-700 card-hover fade-in-up stagger-${index + 1}`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400 flex items-center justify-between">
                {stat.title}
                {stat.trend === "up" && <TrendingUp className="h-4 w-4 text-green-400" />}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
              <p className="text-xs text-gray-500">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid lg:grid-cols-1 gap-8">
        <Card className="bg-gray-800/50 border-gray-700 fade-in-up">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
            <CardDescription className="text-gray-400">Common management tasks</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              onClick={() => setActiveTab("projects")}
              className="justify-start gradient-bg text-white hover:scale-105 transition-transform duration-300"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Project
            </Button>
            <Button
              variant="outline"
              onClick={() => setActiveTab("blogs")}
              className="justify-start border-gray-600 text-gray-300 bg-transparent hover:bg-gray-700 hover:border-purple-500 transition-all duration-300"
            >
              <Edit className="h-4 w-4 mr-2" />
              Write Blog Post
            </Button>
            <Button
              variant="outline"
              onClick={() => setActiveTab("certificates")}
              className="justify-start border-gray-600 text-gray-300 bg-transparent hover:bg-gray-700 hover:border-blue-500 transition-all duration-300"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Certificate
            </Button>
            <Button
              variant="outline"
              onClick={() => setActiveTab("resume")}
              className="justify-start border-gray-600 text-gray-300 bg-transparent hover:bg-gray-700 hover:border-green-500 transition-all duration-300"
            >
              <Eye className="h-4 w-4 mr-2" />
              Update Resume
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Data Summary */}
      <Card className="bg-gray-800/50 border-gray-700 fade-in-up">
        <CardHeader>
          <CardTitle className="text-white">Content Summary</CardTitle>
          <CardDescription className="text-gray-400">Overview of your portfolio content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-400">Projects</h4>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Total</span>
                  <span className="text-white">{projects.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Featured</span>
                  <span className="text-red-400">{projects.filter((p) => p.featured).length}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-400">Content</h4>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Blog Posts</span>
                  <span className="text-white">{blogs.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Published</span>
                  <span className="text-blue-400">{blogs.filter((b) => b.published).length}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-400">Experience</h4>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Work Experience</span>
                  <span className="text-white">{experiences.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Certificates</span>
                  <span className="text-purple-400">{certificates.length}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
