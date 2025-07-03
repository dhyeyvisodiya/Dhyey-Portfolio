"use client"

import { ProjectsManager } from "./projects-manager"
import { SkillsManager } from "./skills-manager"
import { CertificatesManager } from "./certificates-manager"
import { BlogsManager } from "./blogs-manager"
import { ExperienceManager } from "./experience-manager"
import { DashboardOverview } from "./dashboard-overview"
import { ResumeManager } from "./resume-manager"

interface AdminDashboardProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function AdminDashboard({ activeTab, setActiveTab }: AdminDashboardProps) {
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview setActiveTab={setActiveTab} />
      case "projects":
        return <ProjectsManager />
      case "skills":
        return <SkillsManager />
      case "certificates":
        return <CertificatesManager />
      case "blogs":
        return <BlogsManager />
      case "experience":
        return <ExperienceManager />
      case "resume":
        return <ResumeManager />
      default:
        return <DashboardOverview setActiveTab={setActiveTab} />
    }
  }

  return (
    <div className="p-8 fade-in-up">
      <div className="max-w-7xl mx-auto">{renderContent()}</div>
    </div>
  )
}
