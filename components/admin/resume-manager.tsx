"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Save, Download, Upload, FileText } from "lucide-react"
import { useStore } from "@/lib/store"

export function ResumeManager() {
  const { resume, updateResume } = useStore()
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: resume?.personalInfo?.fullName || "Dhyey Visodiya",
      email: resume?.personalInfo?.email || "visodiyadhyey@gmail.com",
      phone: resume?.personalInfo?.phone || "+91 9913191735",
      location: resume?.personalInfo?.location || "Rajkot, Gujarat",
      website: resume?.personalInfo?.website || "https://dhyeyvisodiya.dev",
      linkedin: resume?.personalInfo?.linkedin || "https://linkedin.com/in/dhyey-visodiya",
      github: resume?.personalInfo?.github || "https://github.com/dhyeyvisodiya",
    },
    summary:
      resume?.summary ||
      "Passionate software engineer with expertise in full-stack development, mobile applications, and modern web technologies.",
    resumeUrl: resume?.resumeUrl || "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await updateResume(formData)
    } catch (error) {
      // Error handling without console.log
    } finally {
      setIsLoading(false)
    }
  }

  const handlePersonalInfoChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      personalInfo: {
        ...formData.personalInfo,
        [field]: value,
      },
    })
  }

  const handleDownloadResume = () => {
    if (formData.resumeUrl) {
      window.open(formData.resumeUrl, "_blank")
    }
  }

  return (
    <div className="space-y-8">
      <div className="fade-in-up">
        <h1 className="text-3xl font-bold text-white gradient-text">Resume Manager</h1>
        <p className="text-gray-400">Manage your resume and personal information</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Personal Information */}
        <Card className="bg-gray-800/50 border-gray-700 fade-in-left">
          <CardHeader>
            <CardTitle className="text-white">Personal Information</CardTitle>
            <CardDescription className="text-gray-400">Update your contact details and links</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName" className="text-gray-300">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    value={formData.personalInfo.fullName}
                    onChange={(e) => handlePersonalInfoChange("fullName", e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-300">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.personalInfo.email}
                    onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone" className="text-gray-300">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    value={formData.personalInfo.phone}
                    onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="location" className="text-gray-300">
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={formData.personalInfo.location}
                    onChange={(e) => handlePersonalInfoChange("location", e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="website" className="text-gray-300">
                  Website
                </Label>
                <Input
                  id="website"
                  value={formData.personalInfo.website}
                  onChange={(e) => handlePersonalInfoChange("website", e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="linkedin" className="text-gray-300">
                    LinkedIn
                  </Label>
                  <Input
                    id="linkedin"
                    value={formData.personalInfo.linkedin}
                    onChange={(e) => handlePersonalInfoChange("linkedin", e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="github" className="text-gray-300">
                    GitHub
                  </Label>
                  <Input
                    id="github"
                    value={formData.personalInfo.github}
                    onChange={(e) => handlePersonalInfoChange("github", e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="summary" className="text-gray-300">
                  Professional Summary
                </Label>
                <Textarea
                  id="summary"
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white"
                  rows={4}
                  required
                />
              </div>

              <Button type="submit" className="w-full gradient-bg text-white" disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Resume File Management */}
        <Card className="bg-gray-800/50 border-gray-700 fade-in-right">
          <CardHeader>
            <CardTitle className="text-white">Resume File</CardTitle>
            <CardDescription className="text-gray-400">Upload and manage your resume PDF</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="resumeUrl" className="text-gray-300">
                Resume URL
              </Label>
              <Input
                id="resumeUrl"
                value={formData.resumeUrl}
                onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="https://example.com/resume.pdf"
              />
            </div>

            <div className="flex flex-col gap-4">
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 bg-transparent hover:bg-gray-700"
                onClick={() => document.getElementById("resume-upload")?.click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Resume
              </Button>
              <input
                id="resume-upload"
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => {
                  // Handle file upload logic here
                  const file = e.target.files?.[0]
                  if (file) {
                    // In a real implementation, you would upload to a storage service
                    // For now, we'll just show the filename
                    setFormData({ ...formData, resumeUrl: file.name })
                  }
                }}
              />

              {formData.resumeUrl && (
                <Button
                  variant="outline"
                  className="border-green-600 text-green-400 bg-transparent hover:bg-green-500/10"
                  onClick={handleDownloadResume}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Resume
                </Button>
              )}
            </div>

            <div className="p-4 bg-gray-700/30 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="h-5 w-5 text-blue-400" />
                <span className="text-white font-medium">Resume Preview</span>
              </div>
              <p className="text-gray-400 text-sm">
                {formData.resumeUrl ? "Resume file available" : "No resume uploaded"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resume Statistics */}
      <Card className="bg-gray-800/50 border-gray-700 fade-in-up">
        <CardHeader>
          <CardTitle className="text-white">Resume Statistics</CardTitle>
          <CardDescription className="text-gray-400">Track your resume performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gradient-to-r from-red-500/10 to-blue-500/10 rounded-lg">
              <div className="text-2xl font-bold text-red-400 mb-1">0</div>
              <div className="text-sm text-gray-400">Downloads</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg">
              <div className="text-2xl font-bold text-blue-400 mb-1">0</div>
              <div className="text-sm text-gray-400">Views</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-purple-500/10 to-green-500/10 rounded-lg">
              <div className="text-2xl font-bold text-purple-400 mb-1">0</div>
              <div className="text-sm text-gray-400">Shares</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-r from-green-500/10 to-red-500/10 rounded-lg">
              <div className="text-2xl font-bold text-green-400 mb-1">100%</div>
              <div className="text-sm text-gray-400">Completion</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
