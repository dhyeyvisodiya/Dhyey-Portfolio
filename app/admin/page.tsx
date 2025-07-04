"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminNavigation } from "@/components/admin/admin-navigation"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { useStore } from "@/lib/store"
import { useAuth } from "@/lib/auth"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const { isAuthenticated } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { fetchData } = useStore()

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        if (!isAuthenticated) {
          router.push("/admin/login")
          return
        }
        // Fetch fresh data when admin loads
        await fetchData()
      } catch (error) {
        console.error("Auth verification failed:", error)
        router.push("/admin/login")
      } finally {
        setIsLoading(false)
      }
    }

    verifyAuth()
  }, [isAuthenticated, router, fetchData])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner w-8 h-8 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-red-500/5 to-pink-500/5 rounded-full blur-xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-500/3 to-cyan-500/3 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="flex relative z-10">
        <AdminNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 ml-64">
          <AdminDashboard activeTab={activeTab} setActiveTab={setActiveTab} />
        </main>
      </div>
    </div>
  )
}
