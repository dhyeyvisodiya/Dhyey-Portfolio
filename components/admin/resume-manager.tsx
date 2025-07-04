"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Save, Upload, Download, User, Mail, Phone, MapPin, Globe, Github, Linkedin } from "lucide-react"
import { useStore, type Resume } from "@/lib/store"

export function ResumeManager() {
  const { resume, updateResume, isLoading, error } = useStore()
  const [formData, setFormData] = useState<Partial<Resume>>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      linkedin: "",
      github: "",
    },
    summary: "",
    resumeUrl: "",
  })
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (resume) {
      setFormData(resume)
    }
  }, [resume])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      await updateResume(formData)
    } catch (error) {
      console.error("Failed to update resume:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handlePersonalInfoChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo!,
        [field]: value,
      },
    }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload to a file storage service
      const fileUrl = URL.createObjectURL(file)
      setFormData((prev) => ({
        ...prev,
        resumeUrl: fileUrl,
      }))
    }
  }

  const handleDownloadResume = () => {
    if (formData.resumeUrl) {
      const link = document.createElement("a")
      link.href = formData.resumeUrl
      link.download = `${formData.personalInfo?.fullName || "Resume"}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center fade-in-up">
        <div>
          <h1 className="text-3xl font-bold text-white gradient-text">Resume Manager</h1>
          <p className="text-gray-400">Manage your personal information and resume</p>
        </div>
        {formData.resumeUrl && (
          <Button
            onClick={handleDownloadResume}
            className="bg-green-600 hover:bg-green-700 text-white transition-all duration-300"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Resume
          </Button>
        )}
      </div>

      {error && (
        <Card className="bg-red-500/10 border-red-500/20 fade-in-up">
          <CardContent className="p-4">
            <p className="text-red-400 text-sm">{error}</p>
          </CardContent>
        </Card>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <Card className="bg-gray-800/50 border-gray-700 fade-in-up">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
            <CardDescription className="text-gray-400">
              Your basic contact information and professional links
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName" className="text-gray-300">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  value={formData.personalInfo?.fullName || ""}
                  onChange={(e) => handlePersonalInfoChange("fullName", e.target.value)}
                  className="bg-gray-700/50 border-gray-600 text-white"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-gray-300">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.personalInfo?.email || ""}
                    onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
                    className="bg-gray-700/50 border-gray-600 text-white pl-10"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone" className="text-gray-300">
                  Phone
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    value={formData.personalInfo?.phone || ""}
                    onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
                    className="bg-gray-700/50 border-gray-600 text-white pl-10"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="location" className="text-gray-300">
                  Location
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="location"
                    value={formData.personalInfo?.location || ""}
                    onChange={(e) => handlePersonalInfoChange("location", e.target.value)}
                    className="bg-gray-700/50 border-gray-600 text-white pl-10"
                    placeholder="New York, NY"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="website" className="text-gray-300">
                  Website
                </Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="website"
                    value={formData.personalInfo?.website || ""}
                    onChange={(e) => handlePersonalInfoChange("website", e.target.value)}
                    className="bg-gray-700/50 border-gray-600 text-white pl-10"
                    placeholder="https://johndoe.com"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="linkedin" className="text-gray-300">
                  LinkedIn
                </Label>
                <div className="relative">
                  <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="linkedin"
                    value={formData.personalInfo?.linkedin || ""}
                    onChange={(e) => handlePersonalInfoChange("linkedin", e.target.value)}
                    className="bg-gray-700/50 border-gray-600 text-white pl-10"
                    placeholder="linkedin.com/in/johndoe"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="github" className="text-gray-300">
                  GitHub
                </Label>
                <div className="relative">
                  <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="github"
                    value={formData.personalInfo?.github || ""}
                    onChange={(e) => handlePersonalInfoChange("github", e.target.value)}
                    className="bg-gray-700/50 border-gray-600 text-white pl-10"
                    placeholder="github.com/johndoe"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professional Summary */}
        <Card className="bg-gray-800/50 border-gray-700 fade-in-up">
          <CardHeader>
            <CardTitle className="text-white">Professional Summary</CardTitle>
            <CardDescription className="text-gray-400">
              A brief overview of your professional background and key strengths
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.summary || ""}
              onChange={(e) => setFormData((prev) => ({ ...prev, summary: e.target.value }))}
              className="bg-gray-700/50 border-gray-600 text-white min-h-[120px]"
              placeholder="Write a compelling professional summary that highlights your key skills, experience, and career objectives..."
            />
          </CardContent>
        </Card>

        {/* Resume File Upload */}
        <Card className="bg-gray-800/50 border-gray-700 fade-in-up">
          <CardHeader>
            <CardTitle className="text-white">Resume File</CardTitle>
            <CardDescription className="text-gray-400">Upload your resume PDF file for download</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="bg-gray-700/50 border-gray-600 text-white file:bg-gray-600 file:text-white file:border-0 file:rounded file:px-4 file:py-2"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </div>
              {formData.resumeUrl && (
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Resume file uploaded successfully
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSaving || isLoading}
            className="gradient-bg text-white px-8 py-3 hover:scale-105 transition-transform duration-300"
          >
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : "Save Resume"}
          </Button>
        </div>
      </form>
    </div>
  )
}
