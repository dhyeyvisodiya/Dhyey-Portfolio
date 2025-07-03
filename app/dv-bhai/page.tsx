"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Check,
  ChevronDown,
  ChevronUp,
  Download,
  Edit,
  FileText,
  Loader2,
  Plus,
  Save,
  Trash2,
  Upload,
  Home,
  Lock,
  BarChart3,
  Code,
  Briefcase,
  Award,
  BookOpen,
  Settings,
  Building,
} from "lucide-react"
import { dataManager, type PortfolioData, type Resume } from "@/lib/data-manager"
import { ErrorBoundary } from "@/components/error-boundary"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [data, setData] = useState<PortfolioData>({
    skills: [],
    projects: [],
    certificates: [],
    experiences: [],
    blogPosts: [],
    resume: null,
    profileImage: "/placeholder.svg?height=400&width=400&text=Profile+Photo",
    settings: {
      language: "en",
      analytics: true,
    },
  })
  const [isEditing, setIsEditing] = useState<Record<string, boolean>>({})
  const [editingItem, setEditingItem] = useState<any>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "ascending" | "descending" } | null>(null)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [isExporting, setIsExporting] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const resumeFileInputRef = useRef<HTMLInputElement>(null)

  // Load data on mount
  useEffect(() => {
    try {
      const portfolioData = dataManager.getData()
      if (portfolioData) {
        setData(portfolioData)
      }

      // Subscribe to data changes
      const unsubscribe = dataManager.subscribe(() => {
        const updatedData = dataManager.getData()
        if (updatedData) {
          setData(updatedData)
        }
      })

      return unsubscribe
    } catch (error) {
      console.error("Error loading data:", error)
      setError("Failed to load portfolio data")
    }
  }, [])

  // Authentication
  const handleLogin = () => {
    setIsLoading(true)
    setError(null)

    // Simple password check - in a real app, use proper authentication
    setTimeout(() => {
      if (password === "admin123") {
        setIsAuthenticated(true)
        setPassword("")
        setError(null)
      } else {
        setError("Invalid password")
      }
      setIsLoading(false)
    }, 1000)
  }

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    setSearchQuery("")
    setSelectedItems([])
    setSortConfig(null)
  }

  // Generic item editing
  const startEditing = (item: any, type: string) => {
    setEditingItem({ ...item })
    setIsEditing({ ...isEditing, [type + item.id]: true })
  }

  const cancelEditing = (type: string) => {
    setEditingItem(null)
    setIsEditing({ ...isEditing, [type]: false })
  }

  // Generic item saving
  const saveItem = async (item: any, type: string) => {
    setIsSaving(true)
    try {
      switch (type) {
        case "skill":
          dataManager.updateSkill(item.id, item)
          break
        case "project":
          dataManager.updateProject(item.id, item)
          break
        case "certificate":
          dataManager.updateCertificate(item.id, item)
          break
        case "experience":
          dataManager.updateExperience(item.id, item)
          break
        case "blogPost":
          dataManager.updateBlogPost(item.id, item)
          break
        case "settings":
          dataManager.updateSettings(item)
          break
        case "resume":
          dataManager.setResume(item)
          break
      }

      setEditingItem(null)
      setIsEditing({})
      setSuccessMessage(`${type.charAt(0).toUpperCase() + type.slice(1)} updated successfully!`)
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (error) {
      console.error(`Error saving ${type}:`, error)
      setError(`Failed to save ${type}`)
      setTimeout(() => setError(null), 3000)
    } finally {
      setIsSaving(false)
    }
  }

  // Generic item deletion
  const deleteItem = async (id: string, type: string) => {
    try {
      switch (type) {
        case "skill":
          dataManager.deleteSkill(id)
          break
        case "project":
          dataManager.deleteProject(id)
          break
        case "certificate":
          dataManager.deleteCertificate(id)
          break
        case "experience":
          dataManager.deleteExperience(id)
          break
        case "blogPost":
          dataManager.deleteBlogPost(id)
          break
      }

      setSuccessMessage(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully!`)
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (error) {
      console.error(`Error deleting ${type}:`, error)
      setError(`Failed to delete ${type}`)
      setTimeout(() => setError(null), 3000)
    }
  }

  // Generic item addition
  const addItem = async (item: any, type: string) => {
    try {
      switch (type) {
        case "skill":
          dataManager.addSkill(item)
          break
        case "project":
          dataManager.addProject(item)
          break
        case "certificate":
          dataManager.addCertificate(item)
          break
        case "experience":
          dataManager.addExperience(item)
          break
        case "blogPost":
          dataManager.addBlogPost(item)
          break
      }

      setShowAddModal(false)
      setEditingItem(null)
      setSuccessMessage(`${type.charAt(0).toUpperCase() + type.slice(1)} added successfully!`)
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (error) {
      console.error(`Error adding ${type}:`, error)
      setError(`Failed to add ${type}`)
      setTimeout(() => setError(null), 3000)
    }
  }

  // File upload handling
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    itemId: string,
    type: string,
    field: string,
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      // Simulate file upload - in a real app, upload to your storage service
      const fileUrl = URL.createObjectURL(file)

      if (type === "resume") {
        const resumeData: Resume = {
          id: Date.now().toString(),
          filename: file.name,
          url: fileUrl,
          uploadDate: new Date().toISOString(),
          size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        }

        dataManager.setResume(resumeData)
        setSuccessMessage("Resume uploaded successfully!")
      } else {
        // Update item with file URL
        const currentData = dataManager.getData()
        let items: any[]

        switch (type) {
          case "project":
            items = [...(currentData.projects || [])]
            const projectIndex = items.findIndex((p) => p.id === itemId)
            if (projectIndex !== -1) {
              items[projectIndex] = { ...items[projectIndex], [field]: fileUrl }
              dataManager.updateProject(itemId, items[projectIndex])
            }
            break
          case "certificate":
            items = [...(currentData.certificates || [])]
            const certIndex = items.findIndex((c) => c.id === itemId)
            if (certIndex !== -1) {
              items[certIndex] = { ...items[certIndex], [field]: fileUrl }
              dataManager.updateCertificate(itemId, items[certIndex])
            }
            break
          case "blogPost":
            items = [...(currentData.blogPosts || [])]
            const blogIndex = items.findIndex((b) => b.id === itemId)
            if (blogIndex !== -1) {
              items[blogIndex] = { ...items[blogIndex], [field]: fileUrl }
              dataManager.updateBlogPost(itemId, items[blogIndex])
            }
            break
          case "profileImage":
            dataManager.setProfileImage(fileUrl)
            break
        }

        setSuccessMessage("File uploaded successfully!")
      }
    } catch (error) {
      console.error("Error uploading file:", error)
      setError("Failed to upload file")
    } finally {
      setIsUploading(false)
      setTimeout(() => setSuccessMessage(null), 3000)
    }
  }

  // Resume upload handling
  const handleResumeUpload = () => {
    if (resumeFileInputRef.current) {
      resumeFileInputRef.current.click()
    }
  }

  // Resume download handling
  const handleResumeDownload = () => {
    if (data.resume) {
      const link = document.createElement("a")
      link.href = data.resume.url
      link.download = data.resume.filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  // Resume deletion handling
  const handleResumeDelete = async () => {
    try {
      dataManager.setResume(null)
      setSuccessMessage("Resume deleted successfully!")
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (error) {
      console.error("Error deleting resume:", error)
      setError("Failed to delete resume")
      setTimeout(() => setError(null), 3000)
    }
  }

  // Export data
  const handleExportData = () => {
    setIsExporting(true)
    try {
      const jsonData = dataManager.exportData()
      const blob = new Blob([jsonData], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `portfolio-data-${new Date().toISOString().split("T")[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      setSuccessMessage("Data exported successfully!")
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (error) {
      console.error("Error exporting data:", error)
      setError("Failed to export data")
      setTimeout(() => setError(null), 3000)
    } finally {
      setIsExporting(false)
    }
  }

  // Import data
  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsImporting(true)
    const reader = new FileReader()
    reader.onload = async (e) => {
      try {
        const importedData = e.target?.result as string
        if (dataManager.importData(importedData)) {
          setSuccessMessage("Data imported successfully!")
        } else {
          setError("Failed to import data. Invalid file format.")
        }
        setTimeout(() => setSuccessMessage(null), 3000)
      } catch (error) {
        console.error("Error importing data:", error)
        setError("Failed to import data. Invalid file format.")
        setTimeout(() => setError(null), 3000)
      } finally {
        setIsImporting(false)
      }
    }
    reader.readAsText(file)
  }

  // Bulk delete selected items
  const handleBulkDelete = async () => {
    if (selectedItems.length === 0) return

    try {
      selectedItems.forEach((id) => {
        switch (activeTab) {
          case "skills":
            dataManager.deleteSkill(id)
            break
          case "projects":
            dataManager.deleteProject(id)
            break
          case "certificates":
            dataManager.deleteCertificate(id)
            break
          case "experience":
            dataManager.deleteExperience(id)
            break
          case "blog":
            dataManager.deleteBlogPost(id)
            break
        }
      })

      setSelectedItems([])
      setSuccessMessage(`${selectedItems.length} items deleted successfully!`)
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (error) {
      console.error("Error deleting items:", error)
      setError("Failed to delete items")
      setTimeout(() => setError(null), 3000)
    }
  }

  // Toggle item selection
  const toggleItemSelection = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  // Toggle all items selection
  const toggleAllSelection = (items: any[]) => {
    if (items.length === selectedItems.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(items.map((item) => item.id))
    }
  }

  // Sort items
  const handleSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending"
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  // Filter items by search query
  const filterItems = (items: any[]) => {
    if (!searchQuery.trim()) return items

    return items.filter((item) => {
      return Object.values(item).some((value) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchQuery.toLowerCase())
        }
        if (Array.isArray(value)) {
          return value.some((v) => typeof v === "string" && v.toLowerCase().includes(searchQuery.toLowerCase()))
        }
        return false
      })
    })
  }

  // Sort items by config
  const sortItems = (items: any[]) => {
    if (!sortConfig) return items

    return [...items].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1
      }
      return 0
    })
  }

  // Get sorted and filtered items
  const getProcessedItems = (items: any[]) => {
    return sortItems(filterItems(items || []))
  }

  // Calculate stats for dashboard
  const stats = {
    totalSkills: data.skills?.length || 0,
    totalProjects: data.projects?.length || 0,
    totalCertificates: data.certificates?.length || 0,
    totalExperience: data.experiences?.length || 0,
    totalBlogPosts: data.blogPosts?.length || 0,
  }

  // If not authenticated, show login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black p-4">
        <Card className="w-full max-w-md glass-card border-red-500/20">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center gradient-text-primary">Admin Dashboard</CardTitle>
            <CardDescription className="text-center text-gray-400">
              Enter your password to access the admin area
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleLogin()
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="bg-background/50 border-red-500/30 focus:border-red-500/50"
                  required
                />
              </div>
              {error && (
                <Alert variant="destructive" className="bg-red-950/50 border-red-500/50 text-red-200">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button type="submit" className="w-full btn-primary" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="container mx-auto py-8 px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold gradient-text-primary">Portfolio Admin</h1>
              <p className="text-gray-400">Manage your portfolio content and settings</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Button
                variant="outline"
                className="border-blue-500/30 hover:bg-blue-500/20 hover:text-blue-400 bg-transparent"
                onClick={() => window.open("/", "_blank")}
              >
                <Home className="mr-2 h-4 w-4" />
                View Site
              </Button>
              <Button
                variant="outline"
                className="border-red-500/30 hover:bg-red-500/20 hover:text-red-400 bg-transparent"
                onClick={() => setIsAuthenticated(false)}
              >
                <Lock className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>

          {/* Success/Error Messages */}
          {successMessage && (
            <Alert className="mb-6 bg-green-950/50 border-green-500/50 text-green-200">
              <Check className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive" className="mb-6 bg-red-950/50 border-red-500/50 text-red-200">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
            <div className="glass-card p-4 rounded-lg border border-red-500/20">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
                <TabsTrigger
                  value="dashboard"
                  className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400"
                >
                  <BarChart3 size={16} className="mr-2" />
                  Dashboard
                </TabsTrigger>
                <TabsTrigger
                  value="skills"
                  className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400"
                >
                  <Code size={16} className="mr-2" />
                  Skills
                </TabsTrigger>
                <TabsTrigger
                  value="projects"
                  className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400"
                >
                  <Briefcase size={16} className="mr-2" />
                  Projects
                </TabsTrigger>
                <TabsTrigger
                  value="experience"
                  className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
                >
                  <Building size={16} className="mr-2" />
                  Experience
                </TabsTrigger>
                <TabsTrigger
                  value="certificates"
                  className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-400"
                >
                  <Award size={16} className="mr-2" />
                  Certificates
                </TabsTrigger>
                <TabsTrigger
                  value="blog"
                  className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-400"
                >
                  <BookOpen size={16} className="mr-2" />
                  Blog
                </TabsTrigger>
                <TabsTrigger
                  value="resume"
                  className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400"
                >
                  <FileText size={16} className="mr-2" />
                  Resume
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400"
                >
                  <Settings size={16} className="mr-2" />
                  Settings
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Dashboard Tab */}
            <TabsContent value="dashboard">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="glass-card border-red-500/20 hover:border-red-500/40 transition-all duration-300">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Total Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-red-400">{stats.totalSkills}</div>
                    <p className="text-sm text-gray-400 mt-1">Technical skills in your portfolio</p>
                    <Progress value={(stats.totalSkills / 30) * 100} className="h-1 mt-4 bg-gray-800" />
                  </CardContent>
                </Card>
                <Card className="glass-card border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Total Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-400">{stats.totalProjects}</div>
                    <p className="text-sm text-gray-400 mt-1">Projects showcased in your portfolio</p>
                    <Progress value={(stats.totalProjects / 20) * 100} className="h-1 mt-4 bg-gray-800" />
                  </CardContent>
                </Card>
                <Card className="glass-card border-green-500/20 hover:border-green-500/40 transition-all duration-300">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Total Experience</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-400">{stats.totalExperience}</div>
                    <p className="text-sm text-gray-400 mt-1">Work experiences in your portfolio</p>
                    <Progress value={(stats.totalExperience / 10) * 100} className="h-1 mt-4 bg-gray-800" />
                  </CardContent>
                </Card>
                <Card className="glass-card border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Total Content</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-purple-400">
                      {stats.totalSkills +
                        stats.totalProjects +
                        stats.totalCertificates +
                        stats.totalExperience +
                        stats.totalBlogPosts}
                    </div>
                    <p className="text-sm text-gray-400 mt-1">Total items in your portfolio</p>
                    <Progress
                      value={
                        ((stats.totalSkills +
                          stats.totalProjects +
                          stats.totalCertificates +
                          stats.totalExperience +
                          stats.totalBlogPosts) /
                          50) *
                        100
                      }
                      className="h-1 mt-4 bg-gray-800"
                    />
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="glass-card border-red-500/20">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest updates to your portfolio</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[300px]">
                      <div className="space-y-4">
                        {[...(data.projects || []), ...(data.blogPosts || []), ...(data.experiences || [])]
                          .slice(0, 5)
                          .map((item, index) => (
                            <div
                              key={index}
                              className="flex items-start space-x-4 p-3 rounded-lg bg-background/20 hover:bg-background/30 transition-colors"
                            >
                              <Avatar className="h-9 w-9">
                                <AvatarImage src={item.image || "/placeholder.svg"} alt={item.title} />
                                <AvatarFallback>{item.title?.charAt(0) || "I"}</AvatarFallback>
                              </Avatar>
                              <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">{item.title}</p>
                                <p className="text-xs text-gray-400">
                                  {item.updatedAt
                                    ? `Updated on ${new Date(item.updatedAt).toLocaleDateString()}`
                                    : item.publishDate
                                      ? `Published on ${new Date(item.publishDate).toLocaleDateString()}`
                                      : "Date not available"}
                                </p>
                              </div>
                            </div>
                          ))}
                        {[...(data.projects || []), ...(data.blogPosts || []), ...(data.experiences || [])].length ===
                          0 && (
                          <div className="text-center py-8 text-gray-400">
                            <p>No recent activity</p>
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>

                <Card className="glass-card border-blue-500/20">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Manage your portfolio data</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        variant="outline"
                        className="border-red-500/30 hover:bg-red-500/20 hover:text-red-400 h-24 flex flex-col items-center justify-center bg-transparent"
                        onClick={() => {
                          setActiveTab("skills")
                          setShowAddModal(true)
                        }}
                      >
                        <Plus size={24} className="mb-2" />
                        <span>Add Skill</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="border-blue-500/30 hover:bg-blue-500/20 hover:text-blue-400 h-24 flex flex-col items-center justify-center bg-transparent"
                        onClick={() => {
                          setActiveTab("projects")
                          setShowAddModal(true)
                        }}
                      >
                        <Plus size={24} className="mb-2" />
                        <span>Add Project</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="border-green-500/30 hover:bg-green-500/20 hover:text-green-400 h-24 flex flex-col items-center justify-center bg-transparent"
                        onClick={() => {
                          setActiveTab("experience")
                          setShowAddModal(true)
                        }}
                      >
                        <Plus size={24} className="mb-2" />
                        <span>Add Experience</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="border-purple-500/30 hover:bg-purple-500/20 hover:text-purple-400 h-24 flex flex-col items-center justify-center bg-transparent"
                        onClick={() => {
                          setActiveTab("blog")
                          setShowAddModal(true)
                        }}
                      >
                        <Plus size={24} className="mb-2" />
                        <span>Add Blog Post</span>
                      </Button>
                    </div>

                    <Separator className="my-4 bg-gray-800" />

                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        variant="outline"
                        className="border-yellow-500/30 hover:bg-yellow-500/20 hover:text-yellow-400 bg-transparent"
                        onClick={handleExportData}
                        disabled={isExporting}
                      >
                        {isExporting ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Download className="mr-2 h-4 w-4" />
                        )}
                        Export Data
                      </Button>
                      <div className="relative">
                        <Button
                          variant="outline"
                          className="border-cyan-500/30 hover:bg-cyan-500/20 hover:text-cyan-400 w-full bg-transparent"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isImporting}
                        >
                          {isImporting ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Upload className="mr-2 h-4 w-4" />
                          )}
                          Import Data
                        </Button>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleImportData}
                          accept=".json"
                          className="hidden"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Skills Tab */}
            <TabsContent value="skills">
              <Card className="glass-card border-blue-500/20">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Skills Management</CardTitle>
                    <CardDescription>Manage your technical skills and expertise</CardDescription>
                  </div>
                  <Button onClick={() => setShowAddModal(true)} className="btn-primary">
                    <Plus className="mr-2 h-4 w-4" /> Add Skill
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <div className="w-full md:w-1/3">
                      <Input
                        placeholder="Search skills..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-background/50 border-blue-500/30 focus:border-blue-500/50"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedItems.length > 0 && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={handleBulkDelete}
                          className="bg-red-900/50 hover:bg-red-900/70"
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete Selected ({selectedItems.length})
                        </Button>
                      )}
                    </div>
                  </div>

                  {data.skills && data.skills.length > 0 ? (
                    <div className="rounded-md border border-blue-500/20 overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow className="hover:bg-blue-950/30 bg-blue-950/20">
                            <TableHead className="w-12">
                              <input
                                type="checkbox"
                                checked={selectedItems.length === data.skills.length}
                                onChange={() => toggleAllSelection(data.skills || [])}
                                className="rounded border-blue-500/30 text-blue-500 focus:ring-blue-500/30"
                              />
                            </TableHead>
                            <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                              Name
                              {sortConfig?.key === "name" && (
                                <span className="ml-2">
                                  {sortConfig.direction === "ascending" ? (
                                    <ChevronUp size={16} />
                                  ) : (
                                    <ChevronDown size={16} />
                                  )}
                                </span>
                              )}
                            </TableHead>
                            <TableHead className="cursor-pointer" onClick={() => handleSort("category")}>
                              Category
                              {sortConfig?.key === "category" && (
                                <span className="ml-2">
                                  {sortConfig.direction === "ascending" ? (
                                    <ChevronUp size={16} />
                                  ) : (
                                    <ChevronDown size={16} />
                                  )}
                                </span>
                              )}
                            </TableHead>
                            <TableHead className="cursor-pointer" onClick={() => handleSort("level")}>
                              Level
                              {sortConfig?.key === "level" && (
                                <span className="ml-2">
                                  {sortConfig.direction === "ascending" ? (
                                    <ChevronUp size={16} />
                                  ) : (
                                    <ChevronDown size={16} />
                                  )}
                                </span>
                              )}
                            </TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {getProcessedItems(data.skills).map((skill) => (
                            <TableRow key={skill.id} className="hover:bg-blue-950/10">
                              <TableCell>
                                <input
                                  type="checkbox"
                                  checked={selectedItems.includes(skill.id)}
                                  onChange={() => toggleItemSelection(skill.id)}
                                  className="rounded border-blue-500/30 text-blue-500 focus:ring-blue-500/30"
                                />
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <div className="text-2xl">{skill.icon}</div>
                                  <span>{skill.name}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                                  {skill.category}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge className={`${skill.color} border-0`}>{skill.level}</Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => startEditing(skill, "skill")}
                                    className="hover:bg-blue-500/20 hover:text-blue-400"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => deleteItem(skill.id, "skill")}
                                    className="hover:bg-red-500/20 hover:text-red-400"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="text-center py-12 border border-dashed border-blue-500/30 rounded-lg">
                      <div className="text-blue-400 mb-4">No skills found</div>
                      <Button onClick={() => setShowAddModal(true)} className="btn-primary">
                        <Plus className="mr-2 h-4 w-4" /> Add Your First Skill
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Add/Edit Skill Modal */}
              <Dialog
                open={showAddModal || isEditing["skill"]}
                onOpenChange={(open) => {
                  if (!open) {
                    setShowAddModal(false)
                    setIsEditing({})
                    setEditingItem(null)
                  }
                }}
              >
                <DialogContent className="glass-card border-blue-500/20">
                  <DialogHeader>
                    <DialogTitle>{editingItem ? "Edit Skill" : "Add New Skill"}</DialogTitle>
                    <DialogDescription>
                      {editingItem ? "Update the details of your skill" : "Add a new skill to your portfolio"}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Skill Name</Label>
                        <Input
                          id="name"
                          value={editingItem?.name || ""}
                          onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                          placeholder="React"
                          className="bg-background/50 border-blue-500/30 focus:border-blue-500/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="icon">Icon (Emoji)</Label>
                        <Input
                          id="icon"
                          value={editingItem?.icon || ""}
                          onChange={(e) => setEditingItem({ ...editingItem, icon: e.target.value })}
                          placeholder="⚛️"
                          className="bg-background/50 border-blue-500/30 focus:border-blue-500/50"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={editingItem?.category || ""}
                          onValueChange={(value) => setEditingItem({ ...editingItem, category: value })}
                        >
                          <SelectTrigger className="bg-background/50 border-blue-500/30 focus:border-blue-500/50">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Frontend">Frontend</SelectItem>
                            <SelectItem value="Backend">Backend</SelectItem>
                            <SelectItem value="Mobile">Mobile</SelectItem>
                            <SelectItem value="Database">Database</SelectItem>
                            <SelectItem value="DevOps">DevOps</SelectItem>
                            <SelectItem value="Tools">Tools</SelectItem>
                            <SelectItem value="Cloud">Cloud</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="level">Proficiency Level</Label>
                        <Select
                          value={editingItem?.level || ""}
                          onValueChange={(value) => setEditingItem({ ...editingItem, level: value })}
                        >
                          <SelectTrigger className="bg-background/50 border-blue-500/30 focus:border-blue-500/50">
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                            <SelectItem value="Expert">Expert</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="color">Color Theme</Label>
                      <Select
                        value={editingItem?.color || ""}
                        onValueChange={(value) => setEditingItem({ ...editingItem, color: value })}
                      >
                        <SelectTrigger className="bg-background/50 border-blue-500/30 focus:border-blue-500/50">
                          <SelectValue placeholder="Select color theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="from-red-500 to-red-600">Red</SelectItem>
                          <SelectItem value="from-blue-500 to-blue-600">Blue</SelectItem>
                          <SelectItem value="from-green-500 to-green-600">Green</SelectItem>
                          <SelectItem value="from-yellow-500 to-yellow-600">Yellow</SelectItem>
                          <SelectItem value="from-purple-500 to-purple-600">Purple</SelectItem>
                          <SelectItem value="from-pink-500 to-pink-600">Pink</SelectItem>
                          <SelectItem value="from-indigo-500 to-indigo-600">Indigo</SelectItem>
                          <SelectItem value="from-cyan-500 to-cyan-600">Cyan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowAddModal(false)
                        setIsEditing({})
                        setEditingItem(null)
                      }}
                      className="border-gray-500/30 hover:bg-gray-500/20"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        if (editingItem) {
                          if (editingItem.id) {
                            saveItem(editingItem, "skill")
                          } else {
                            addItem(editingItem, "skill")
                          }
                        }
                      }}
                      disabled={!editingItem?.name || !editingItem?.category || !editingItem?.level || isSaving}
                      className="btn-primary"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          {editingItem?.id ? "Update" : "Add"} Skill
                        </>
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TabsContent>

            {/* Resume Tab */}
            <TabsContent value="resume">
              <Card className="glass-card border-cyan-500/20">
                <CardHeader>
                  <CardTitle>Resume Management</CardTitle>
                  <CardDescription>Upload and manage your resume file</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {data.resume ? (
                      <div className="border border-cyan-500/20 rounded-lg p-6 bg-cyan-950/10">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="p-3 bg-cyan-500/20 rounded-lg">
                              <FileText className="h-8 w-8 text-cyan-400" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-white">{data.resume.filename}</h3>
                              <p className="text-sm text-gray-400">
                                Uploaded on {new Date(data.resume.uploadDate).toLocaleDateString()}
                              </p>
                              <p className="text-xs text-gray-500">Size: {data.resume.size}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleResumeDownload}
                              className="border-cyan-500/30 hover:bg-cyan-500/20 hover:text-cyan-400 bg-transparent"
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleResumeUpload}
                              className="border-blue-500/30 hover:bg-blue-500/20 hover:text-blue-400 bg-transparent"
                            >
                              <Upload className="mr-2 h-4 w-4" />
                              Replace
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleResumeDelete}
                              className="border-red-500/30 hover:bg-red-500/20 hover:text-red-400 bg-transparent"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12 border border-dashed border-cyan-500/30 rounded-lg">
                        <FileText className="h-16 w-16 text-cyan-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-white mb-2">No Resume Uploaded</h3>
                        <p className="text-gray-400 mb-6">
                          Upload your resume to showcase your professional background
                        </p>
                        <Button onClick={handleResumeUpload} className="btn-primary" disabled={isUploading}>
                          {isUploading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            <>
                              <Upload className="mr-2 h-4 w-4" />
                              Upload Resume
                            </>
                          )}
                        </Button>
                      </div>
                    )}

                    <input
                      type="file"
                      ref={resumeFileInputRef}
                      onChange={(e) => handleFileUpload(e, "", "resume", "")}
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                    />

                    <div className="bg-cyan-950/20 border border-cyan-500/20 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-cyan-400 mb-2">Resume Guidelines</h4>
                      <ul className="text-sm text-gray-400 space-y-1">
                        <li>• Supported formats: PDF, DOC, DOCX</li>
                        <li>• Maximum file size: 10MB</li>
                        <li>• Keep your resume updated with latest experience</li>
                        <li>• Use a professional format and clear structure</li>
                        <li>• Include contact information and key skills</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <Card className="glass-card border-orange-500/20">
                <CardHeader>
                  <CardTitle>Portfolio Settings</CardTitle>
                  <CardDescription>Configure your portfolio preferences and settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Analytics Tracking</Label>
                        <div className="text-sm text-gray-400">Enable analytics to track portfolio performance</div>
                      </div>
                      <Switch
                        checked={data.settings?.analytics || false}
                        onCheckedChange={(checked) => {
                          const updatedSettings = { ...data.settings, analytics: checked }
                          saveItem(updatedSettings, "settings")
                        }}
                      />
                    </div>
                    <Separator className="bg-gray-800" />
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select
                        value={data.settings?.language || "en"}
                        onValueChange={(value) => {
                          const updatedSettings = { ...data.settings, language: value }
                          saveItem(updatedSettings, "settings")
                        }}
                      >
                        <SelectTrigger className="bg-background/50 border-orange-500/30 focus:border-orange-500/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="hi">Hindi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator className="bg-gray-800" />

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Profile Image</h3>
                    <div className="flex items-center space-x-6">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={data.profileImage || "/placeholder.svg"} alt="Profile" />
                        <AvatarFallback>DV</AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const input = document.createElement("input")
                            input.type = "file"
                            input.accept = "image/*"
                            input.onchange = (e) => handleFileUpload(e as any, "", "profileImage", "")
                            input.click()
                          }}
                          disabled={isUploading}
                          className="border-orange-500/30 hover:bg-orange-500/20 hover:text-orange-400"
                        >
                          {isUploading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            <>
                              <Upload className="mr-2 h-4 w-4" />
                              Change Image
                            </>
                          )}
                        </Button>
                        <p className="text-xs text-gray-400">Recommended: Square image, at least 400x400px</p>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-gray-800" />

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Data Management</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button
                        variant="outline"
                        onClick={handleExportData}
                        disabled={isExporting}
                        className="border-green-500/30 hover:bg-green-500/20 hover:text-green-400 bg-transparent"
                      >
                        {isExporting ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Download className="mr-2 h-4 w-4" />
                        )}
                        Export Portfolio Data
                      </Button>
                      <div className="relative">
                        <Button
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isImporting}
                          className="border-blue-500/30 hover:bg-blue-500/20 hover:text-blue-400 w-full"
                        >
                          {isImporting ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Upload className="mr-2 h-4 w-4" />
                          )}
                          Import Portfolio Data
                        </Button>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleImportData}
                          accept=".json"
                          className="hidden"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Other tabs would go here - Projects, Experience, Certificates, Blog */}
            {/* For brevity, I'm including placeholders for the remaining tabs */}

            <TabsContent value="projects">
              <Card className="glass-card border-green-500/20">
                <CardHeader>
                  <CardTitle>Projects Management</CardTitle>
                  <CardDescription>Manage your portfolio projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Briefcase className="h-16 w-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">Projects Management</h3>
                    <p className="text-gray-400 mb-6">Add and manage your portfolio projects</p>
                    <Button onClick={() => setShowAddModal(true)} className="btn-primary">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Project
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience">
              <Card className="glass-card border-purple-500/20">
                <CardHeader>
                  <CardTitle>Experience Management</CardTitle>
                  <CardDescription>Manage your work experience</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Building className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">Experience Management</h3>
                    <p className="text-gray-400 mb-6">Add and manage your work experience</p>
                    <Button onClick={() => setShowAddModal(true)} className="btn-primary">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Experience
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="certificates">
              <Card className="glass-card border-yellow-500/20">
                <CardHeader>
                  <CardTitle>Certificates Management</CardTitle>
                  <CardDescription>Manage your certifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Award className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">Certificates Management</h3>
                    <p className="text-gray-400 mb-6">Add and manage your certifications</p>
                    <Button onClick={() => setShowAddModal(true)} className="btn-primary">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Certificate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="blog">
              <Card className="glass-card border-pink-500/20">
                <CardHeader>
                  <CardTitle>Blog Management</CardTitle>
                  <CardDescription>Manage your blog posts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <BookOpen className="h-16 w-16 text-pink-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">Blog Management</h3>
                    <p className="text-gray-400 mb-6">Create and manage your blog posts</p>
                    <Button onClick={() => setShowAddModal(true)} className="btn-primary">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Blog Post
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ErrorBoundary>
  )
}
