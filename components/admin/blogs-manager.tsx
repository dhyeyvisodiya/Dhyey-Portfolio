"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Trash2, Save, X, Calendar, Clock } from "lucide-react"
import { useStore, type BlogPost } from "@/lib/store"

export function BlogsManager() {
  const { blogs, addBlog, updateBlog, deleteBlog, fetchData } = useStore()
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: "",
    excerpt: "",
    content: "",
    date: "",
    readTime: "",
    tags: [],
    slug: "",
    published: false,
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isEditing) {
        await updateBlog(isEditing, formData)
        setIsEditing(null)
      } else {
        await addBlog(formData as Omit<BlogPost, "id" | "createdAt">)
        setIsAdding(false)
      }
      resetForm()
      // Force refresh to ensure UI sync
      await fetchData()
    } catch (error) {
      alert("Error saving blog post. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      date: "",
      readTime: "",
      tags: [],
      slug: "",
      published: false,
    })
  }

  const handleEdit = (blog: BlogPost) => {
    setFormData(blog)
    setIsEditing(blog.id)
    setIsAdding(false)
  }

  const handleCancel = () => {
    setIsEditing(null)
    setIsAdding(false)
    resetForm()
  }

  const handleTagsChange = (value: string) => {
    const tags = value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
    setFormData({ ...formData, tags })
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    })
  }

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        await deleteBlog(id)
        // Force refresh to ensure UI sync
        await fetchData()
      } catch (error) {
        alert("Error deleting blog post. Please try again.")
      }
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center fade-in-up">
        <div>
          <h1 className="text-3xl font-bold text-white gradient-text">Blogs Manager</h1>
          <p className="text-gray-400">Manage your blog posts and articles</p>
        </div>
        <Button
          onClick={() => setIsAdding(true)}
          className="gradient-bg text-white hover:scale-105 transition-transform duration-300"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Blog Post
        </Button>
      </div>

      {/* Add/Edit Form */}
      {(isAdding || isEditing) && (
        <Card className="bg-gray-800/50 border-gray-700 fade-in-up">
          <CardHeader>
            <CardTitle className="text-white">{isEditing ? "Edit Blog Post" : "Add New Blog Post"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-gray-300">
                  Title
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>

              <div>
                <Label htmlFor="slug" className="text-gray-300">
                  Slug
                </Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>

              <div>
                <Label htmlFor="excerpt" className="text-gray-300">
                  Excerpt
                </Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="content" className="text-gray-300">
                  Content
                </Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                  rows={10}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date" className="text-gray-300">
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="readTime" className="text-gray-300">
                    Read Time
                  </Label>
                  <Input
                    id="readTime"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="5 min read"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="tags" className="text-gray-300">
                  Tags (comma-separated)
                </Label>
                <Input
                  id="tags"
                  value={formData.tags?.join(", ")}
                  onChange={(e) => handleTagsChange(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="React, TypeScript, Web Development"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                />
                <Label htmlFor="published" className="text-gray-300">
                  Published
                </Label>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="gradient-bg text-white">
                  <Save className="h-4 w-4 mr-2" />
                  {isEditing ? "Update" : "Add"} Blog Post
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

      {/* Blogs List */}
      <div className="grid gap-6">
        {blogs.map((blog, index) => (
          <Card key={blog.id} className={`bg-gray-800/50 border-gray-700 card-hover fade-in-up stagger-${index + 1}`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(blog.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {blog.readTime}
                    </div>
                    <Badge
                      className={
                        blog.published
                          ? "bg-green-600/20 text-green-400 border-green-600/30"
                          : "bg-yellow-600/20 text-yellow-400 border-yellow-600/30"
                      }
                    >
                      {blog.published ? "Published" : "Draft"}
                    </Badge>
                  </div>
                  <CardTitle className="text-white text-xl hover:text-red-400 transition-colors">
                    {blog.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400 mt-2">{blog.excerpt}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(blog)}
                    className="border-gray-600 text-gray-300 bg-transparent hover:bg-blue-500/10 hover:border-blue-500"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(blog.id)}
                    className="border-gray-600 text-gray-300 bg-transparent hover:bg-red-500/10 hover:border-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {blog.tags.map((tag, tagIndex) => (
                  <Badge key={tagIndex} className="bg-purple-600/20 text-purple-400 border-purple-600/30">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="text-sm text-gray-400">
                <span>Slug: /{blog.slug}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
