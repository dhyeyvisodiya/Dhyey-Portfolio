"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2, Save, X } from "lucide-react"
import { useStore, type Project } from "@/lib/store"

export function ProjectsManager() {
  const { projects, addProject, updateProject, deleteProject, fetchData } = useStore()
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<Partial<Project>>({
    title: "",
    description: "",
    technologies: [],
    image: "",
    github: "",
    demo: "",
    featured: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isEditing) {
        await updateProject(isEditing, formData)
        setIsEditing(null)
      } else {
        await addProject(formData as Omit<Project, "id" | "createdAt">)
        setIsAdding(false)
      }
      resetForm()
      // Refresh data
      await fetchData()
    } catch (error) {
      // Error handled silently
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject(id)
        await fetchData()
      } catch (error) {
        // Error handled silently
      }
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      technologies: [],
      image: "",
      github: "",
      demo: "",
      featured: false,
    })
  }

  const handleEdit = (project: Project) => {
    setFormData(project)
    setIsEditing(project.id)
    setIsAdding(false)
  }

  const handleCancel = () => {
    setIsEditing(null)
    setIsAdding(false)
    resetForm()
  }

  const handleTechnologiesChange = (value: string) => {
    const technologies = value
      .split(",")
      .map((tech) => tech.trim())
      .filter(Boolean)
    setFormData({ ...formData, technologies })
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center fade-in-up">
        <div>
          <h1 className="text-3xl font-bold text-white gradient-text">Projects Manager</h1>
          <p className="text-gray-400">Manage your portfolio projects</p>
        </div>
        <Button
          onClick={() => setIsAdding(true)}
          className="gradient-bg text-white hover:scale-105 transition-transform duration-300"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      {/* Add/Edit Form */}
      {(isAdding || isEditing) && (
        <Card className="bg-gray-800/50 border-gray-700 fade-in-up">
          <CardHeader>
            <CardTitle className="text-white">{isEditing ? "Edit Project" : "Add New Project"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title" className="text-gray-300">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="image" className="text-gray-300">
                    Image URL
                  </Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-gray-300">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="technologies" className="text-gray-300">
                  Technologies (comma-separated)
                </Label>
                <Input
                  id="technologies"
                  value={formData.technologies?.join(", ")}
                  onChange={(e) => handleTechnologiesChange(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="React, Next.js, TypeScript"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="github" className="text-gray-300">
                    GitHub URL
                  </Label>
                  <Input
                    id="github"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="demo" className="text-gray-300">
                    Demo URL
                  </Label>
                  <Input
                    id="demo"
                    value={formData.demo}
                    onChange={(e) => setFormData({ ...formData, demo: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                />
                <Label htmlFor="featured" className="text-gray-300">
                  Featured Project
                </Label>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="gradient-bg text-white">
                  <Save className="h-4 w-4 mr-2" />
                  {isEditing ? "Update" : "Add"} Project
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="border-gray-600 text-gray-300 bg-transparent"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Projects List */}
      <div className="grid gap-6">
        {projects.map((project, index) => (
          <Card
            key={project.id}
            className={`bg-gray-800/50 border-gray-700 card-hover fade-in-up stagger-${index + 1}`}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-white flex items-center gap-2">
                    {project.title}
                    {project.featured && (
                      <Badge className="bg-red-600/20 text-red-400 border-red-600/30">Featured</Badge>
                    )}
                  </CardTitle>
                  <CardDescription className="text-gray-400 mt-2">{project.description}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(project)}
                    className="border-gray-600 text-gray-300 bg-transparent hover:bg-blue-500/10 hover:border-blue-500"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(project.id)}
                    className="border-gray-600 text-gray-300 bg-transparent hover:bg-red-500/10 hover:border-red-500"
                    disabled={isLoading}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, techIndex) => (
                  <Badge key={techIndex} className="bg-blue-600/20 text-blue-400 border-blue-600/30">
                    {tech}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2 text-sm text-gray-400">
                <span>GitHub: {project.github}</span>
                <span>•</span>
                <span>Demo: {project.demo}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
