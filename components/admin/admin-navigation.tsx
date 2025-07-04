"use client"

import { Button } from "@/components/ui/button"
import { LayoutDashboard, FolderOpen, Code, Award, BookOpen, Briefcase, FileText, LogOut, User } from "lucide-react"
import { useRouter } from "next/navigation"

interface AdminNavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function AdminNavigation({ activeTab, setActiveTab }: AdminNavigationProps) {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("admin_token")
    router.push("/admin/login")
  }

  const handleHomeRedirect = () => {
    router.push("/")
  }

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "skills", label: "Skills", icon: Code },
    { id: "certificates", label: "Certificates", icon: Award },
    { id: "blogs", label: "Blogs", icon: BookOpen },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "resume", label: "Resume", icon: FileText },
  ]

  return (
    <nav className="fixed left-0 top-0 h-full w-64 bg-gray-900/50 backdrop-blur-md border-r border-gray-800 z-50">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleHomeRedirect}
            className="text-2xl font-bold text-red-500 hover:scale-110 transition-transform duration-300"
          >
            {"<DV/>"} Admin
          </button>
          <p className="text-gray-400 text-sm mt-2">Portfolio Management</p>
        </div>

        {/* Navigation Items */}
        <div className="space-y-2 mb-8">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              className={`w-full justify-start text-left transition-all duration-300 ${
                activeTab === item.id
                  ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg"
                  : "text-gray-300 hover:text-white hover:bg-gray-800"
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </Button>
          ))}
        </div>

        {/* User Section */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex items-center gap-3 mb-4 p-3 bg-gray-800/50 rounded-lg">
            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-blue-500 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-white text-sm font-medium">Admin User</p>
              <p className="text-gray-400 text-xs">Administrator</p>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full border-gray-600 text-gray-300 hover:bg-red-500/10 hover:border-red-500 hover:text-red-400 transition-all duration-300 bg-transparent"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  )
}
