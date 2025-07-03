"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Save, X, Award } from "lucide-react"
import { useStore, type Certificate } from "@/lib/store"

export function CertificatesManager() {
  const { certificates, addCertificate, updateCertificate, deleteCertificate, fetchData } = useStore()
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState<Partial<Certificate>>({
    title: "",
    issuer: "",
    date: "",
    credentialId: "",
    skills: [],
    verifyUrl: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isEditing) {
        await updateCertificate(isEditing, formData)
        setIsEditing(null)
      } else {
        await addCertificate(formData as Omit<Certificate, "id" | "createdAt">)
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
      issuer: "",
      date: "",
      credentialId: "",
      skills: [],
      verifyUrl: "",
    })
  }

  const handleEdit = (certificate: Certificate) => {
    setFormData(certificate)
    setIsEditing(certificate.id)
    setIsAdding(false)
  }

  const handleCancel = () => {
    setIsEditing(null)
    setIsAdding(false)
    resetForm()
  }

  const handleSkillsChange = (value: string) => {
    const skills = value
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean)
    setFormData({ ...formData, skills })
  }

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this certificate?")) {
      try {
        await deleteCertificate(id)
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
          <h1 className="text-3xl font-bold text-white gradient-text">Certificates Manager</h1>
          <p className="text-gray-400">Manage your professional certifications</p>
        </div>
        <Button
          onClick={() => setIsAdding(true)}
          className="gradient-bg text-white hover:scale-105 transition-transform duration-300"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Certificate
        </Button>
      </div>

      {/* Add/Edit Form */}
      {(isAdding || isEditing) && (
        <Card className="bg-gray-800/50 border-gray-700 fade-in-up">
          <CardHeader>
            <CardTitle className="text-white">{isEditing ? "Edit Certificate" : "Add New Certificate"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title" className="text-gray-300">
                    Certificate Title
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
                  <Label htmlFor="issuer" className="text-gray-300">
                    Issuer
                  </Label>
                  <Input
                    id="issuer"
                    value={formData.issuer}
                    onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date" className="text-gray-300">
                    Date
                  </Label>
                  <Input
                    id="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="2023"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="credentialId" className="text-gray-300">
                    Credential ID
                  </Label>
                  <Input
                    id="credentialId"
                    value={formData.credentialId}
                    onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="skills" className="text-gray-300">
                  Skills (comma-separated)
                </Label>
                <Input
                  id="skills"
                  value={formData.skills?.join(", ")}
                  onChange={(e) => handleSkillsChange(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="AWS, Cloud Architecture, DevOps"
                />
              </div>

              <div>
                <Label htmlFor="verifyUrl" className="text-gray-300">
                  Verification URL
                </Label>
                <Input
                  id="verifyUrl"
                  value={formData.verifyUrl}
                  onChange={(e) => setFormData({ ...formData, verifyUrl: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="https://..."
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="gradient-bg text-white">
                  <Save className="h-4 w-4 mr-2" />
                  {isEditing ? "Update" : "Add"} Certificate
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

      {/* Certificates List */}
      <div className="grid gap-6">
        {certificates.map((certificate, index) => (
          <Card
            key={certificate.id}
            className={`bg-gray-800/50 border-gray-700 card-hover fade-in-up stagger-${index + 1}`}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <Award className="h-6 w-6 text-yellow-500" />
                  <div>
                    <CardTitle className="text-white text-lg">{certificate.title}</CardTitle>
                    <p className="text-purple-400 font-medium">{certificate.issuer}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-green-500 text-green-400">
                    {certificate.date}
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(certificate)}
                    className="border-gray-600 text-gray-300 bg-transparent hover:bg-blue-500/10 hover:border-blue-500"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(certificate.id)}
                    className="border-gray-600 text-gray-300 bg-transparent hover:bg-red-500/10 hover:border-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Credential ID</p>
                  <p className="text-gray-300 font-mono text-sm">{certificate.credentialId}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {certificate.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} className="bg-blue-600/20 text-blue-400 border-blue-600/30">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="text-sm text-gray-400">
                  <span>Verify: {certificate.verifyUrl}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
