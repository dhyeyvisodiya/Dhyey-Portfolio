"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Plus, Edit, Trash2, Save, X } from "lucide-react"
import { useStore, type Skill } from "@/lib/store"

export function SkillsManager() {
  const { skills, addSkill, updateSkill, deleteSkill, fetchData } = useStore()
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState<Partial<Skill>>({
    name: "",
    category: "",
    level: 50,
  })
  const [isLoading, setIsLoading] = useState(false)

  const categories = ["Frontend", "Backend", "Mobile", "Tools", "Database", "Cloud"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isEditing) {
        await updateSkill(isEditing, formData)
        setIsEditing(null)
      } else {
        await addSkill(formData as Omit<Skill, "id" | "createdAt">)
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
      name: "",
      category: "",
      level: 50,
    })
  }

  const handleEdit = (skill: Skill) => {
    setFormData(skill)
    setIsEditing(skill.id)
    setIsAdding(false)
  }

  const handleCancel = () => {
    setIsEditing(null)
    setIsAdding(false)
    resetForm()
  }

  const groupedSkills = categories.reduce(
    (acc, category) => {
      acc[category] = skills.filter((skill) => skill.category === category)
      return acc
    },
    {} as Record<string, Skill[]>,
  )

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      try {
        await deleteSkill(id)
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
          <h1 className="text-3xl font-bold text-white gradient-text">Skills Manager</h1>
          <p className="text-gray-400">Manage your technical skills and expertise levels</p>
        </div>
        <Button
          onClick={() => setIsAdding(true)}
          className="gradient-bg text-white hover:scale-105 transition-transform duration-300"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Skill
        </Button>
      </div>

      {/* Add/Edit Form */}
      {(isAdding || isEditing) && (
        <Card className="bg-gray-800/50 border-gray-700 fade-in-up">
          <CardHeader>
            <CardTitle className="text-white">{isEditing ? "Edit Skill" : "Add New Skill"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-gray-300">
                    Skill Name
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category" className="text-gray-300">
                    Category
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      {categories.map((category) => (
                        <SelectItem key={category} value={category} className="text-white">
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="level" className="text-gray-300">
                  Skill Level: {formData.level}%
                </Label>
                <Slider
                  id="level"
                  min={0}
                  max={100}
                  step={5}
                  value={[formData.level || 50]}
                  onValueChange={(value) => setFormData({ ...formData, level: value[0] })}
                  className="mt-2"
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="gradient-bg text-white" disabled={isLoading}>
                  <Save className="h-4 w-4 mr-2" />
                  {isEditing ? "Update" : "Add"} Skill
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

      {/* Skills by Category */}
      <div className="grid gap-6">
        {categories.map(
          (category, categoryIndex) =>
            groupedSkills[category]?.length > 0 && (
              <Card key={category} className={`bg-gray-800/50 border-gray-700 fade-in-up stagger-${categoryIndex + 1}`}>
                <CardHeader>
                  <CardTitle className="text-white">{category}</CardTitle>
                  <CardDescription className="text-gray-400">{groupedSkills[category].length} skills</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {groupedSkills[category].map((skill) => (
                      <div
                        key={skill.id}
                        className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg card-hover"
                      >
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white font-medium">{skill.name}</span>
                            <span className="text-gray-400 text-sm">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-gray-600 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-red-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(skill)}
                            className="border-gray-600 text-gray-300 bg-transparent hover:bg-blue-500/10 hover:border-blue-500"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(skill.id)}
                            className="border-gray-600 text-gray-300 bg-transparent hover:bg-red-500/10 hover:border-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ),
        )}
      </div>
    </div>
  )
}
