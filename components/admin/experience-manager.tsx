"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Save, X, Briefcase } from "lucide-react"
import { useStore, type Experience } from "@/lib/store"

export function ExperienceManager() {
  const { experiences, addExperience, updateExperience, deleteExperience, fetchData } = useStore()
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState<Partial<Experience>>({
    title: "",
    company: "",
    period: "",
    description: "",
    technologies: [],
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isEditing) {
        await updateExperience(isEditing, formData)
        setIsEditing(null)
      } else {
        await addExperience(formData as Omit<Experience, "id" | "createdAt">)
        setIsAdding(false)
      }
      resetForm()
      await fetchData()
    } catch (error) {
      // Error handled silently
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      company: "",
      period: "",
      description: "",
      technologies: [],
    })
  }

  const handleEdit = (experience: Experience) => {
    setFormData(experience)
    setIsEditing(experience.id)
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

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this experience?")) {
      try {
        await deleteExperience(id)
        await fetchData()
      } catch (error) {
        // Error handled silently
      }
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center fade-in-up">
        <div>
          <h1 className="text-3xl font-bold text-white gradient-text">Experience Manager</h1>
          <p className="text-gray-400">Manage your work experience and career history</p>
        </div>
        <Button
          onClick={() => setIsAdding(true)}
          className="gradient-bg text-white hover:scale-105 transition-transform duration-300"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </Button>
      </div>

      {/* Add/Edit Form */}
      {(isAdding || isEditing) && (
        <Card className="bg-gray-800/50 border-gray-700 fade-in-up">
          <CardHeader>
            <CardTitle className="text-white">{isEditing ? "Edit Experience" : "Add New Experience"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title" className="text-gray-300">
                    Job Title
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
                  <Label htmlFor="company" className="text-gray-300">
                    Company
                  </Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="period" className="text-gray-300">
                  Period
                </Label>
                <Input
                  id="period"
                  value={formData.period}
                  onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="2022 - Present"
                  required
                />
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
                  rows={4}
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
                  placeholder="React, Node.js, AWS, TypeScript"
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="gradient-bg text-white">
                  <Save className="h-4 w-4 mr-2" />
                  {isEditing ? "Update" : "Add"} Experience
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

      {/* Experience List */}
      <div className="space-y-8">
        {experiences.map((experience, index) => (
          <Card
            key={experience.id}
            className={`bg-gray-800/50 border-gray-700 card-hover fade-in-up stagger-${index + 1}`}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <Briefcase className="h-6 w-6 text-blue-500" />
                  <div>
                    <CardTitle className="text-white text-xl">{experience.title}</CardTitle>
                    <p className="text-red-500 font-medium">{experience.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-purple-500 text-purple-400">
                    {experience.period}
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(experience)}
                    className="border-gray-600 text-gray-300 bg-transparent hover:bg-blue-500/10 hover:border-blue-500"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(experience.id)}
                    className="border-gray-600 text-gray-300 bg-transparent hover:bg-red-500/10 hover:border-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-4">{experience.description}</p>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech, techIndex) => (
                  <Badge key={techIndex} className="bg-blue-600/20 text-blue-400 border-blue-600/30">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
