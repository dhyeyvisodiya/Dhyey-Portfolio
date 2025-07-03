"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Eye, TrendingUp } from "lucide-react"
import { useStore } from "@/lib/store"

interface DashboardOverviewProps {
  setActiveTab: (tab: string) => void
}

export function DashboardOverview({ setActiveTab }: DashboardOverviewProps) {
  const { projects, skills, certificates, blogs, experiences } = useStore()

  const stats = [
    {
      title: "Total Projects",
      value: projects.length.toString(),
      change: "+2 this month",
      trend: "up",
      color: "text-red-400",
    },
    {
      title: "Blog Posts",
      value: blogs.length.toString(),
      change: "+1 this week",
      trend: "up",
      color: "text-blue-400",
    },
    {
      title: "Certificates",
      value: certificates.length.toString(),
      change: "Updated recently",
      trend: "stable",
      color: "text-purple-400",
    },
    {
      title: "Skills",
      value: skills.length.toString(),
      change: "+3 new skills",
      trend: "up",
      color: "text-green-400",
    },
  ]

  const recentActivity = [
    { action: "Added new project", item: "E-Commerce Platform", time: "2 hours ago", type: "create" },
    { action: "Updated blog post", item: "React Best Practices", time: "1 day ago", type: "update" },
    { action: "Added certificate", item: "AWS Solutions Architect", time: "3 days ago", type: "create" },
    { action: "Updated skills", item: "Added TypeScript", time: "1 week ago", type: "update" },
  ]

  return (
    <div className="space-y-8">
      <div className="fade-in-up">
        <h1 className="text-3xl font-bold text-white mb-2 gradient-text">Admin Dashboard</h1>
        <p className="text-gray-400">Manage your portfolio content and settings</p>
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

      {/* Quick Actions and Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="bg-gray-800/50 border-gray-700 fade-in-left">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
            <CardDescription className="text-gray-400">Common management tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => setActiveTab("projects")}
              className="w-full justify-start gradient-bg text-white hover:scale-105 transition-transform duration-300"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Project
            </Button>
            <Button
              variant="outline"
              onClick={() => setActiveTab("blogs")}
              className="w-full justify-start border-gray-600 text-gray-300 bg-transparent hover:bg-gray-700 hover:border-purple-500 transition-all duration-300"
            >
              <Edit className="h-4 w-4 mr-2" />
              Write Blog Post
            </Button>
            <Button
              variant="outline"
              onClick={() => setActiveTab("certificates")}
              className="w-full justify-start border-gray-600 text-gray-300 bg-transparent hover:bg-gray-700 hover:border-blue-500 transition-all duration-300"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Certificate
            </Button>
            <Button
              variant="outline"
              onClick={() => setActiveTab("resume")}
              className="w-full justify-start border-gray-600 text-gray-300 bg-transparent hover:bg-gray-700 hover:border-green-500 transition-all duration-300"
            >
              <Eye className="h-4 w-4 mr-2" />
              Update Resume
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700 fade-in-right">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
            <CardDescription className="text-gray-400">Latest changes to your portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between py-2 border-l-2 pl-4 transition-all duration-300 hover:bg-gray-700/30 rounded-r-lg ${
                    activity.type === "create" ? "border-green-500" : "border-blue-500"
                  } fade-in-up stagger-${index + 1}`}
                >
                  <div>
                    <p className="text-sm text-white">{activity.action}</p>
                    <p className="text-xs text-gray-400">{activity.item}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
