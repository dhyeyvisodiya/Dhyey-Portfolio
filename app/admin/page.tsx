"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminNavigation } from "@/components/admin/admin-navigation"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { useAuth } from "@/lib/auth"
import { useStore } from "@/lib/store"
import { useState } from "react"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const { isAuthenticated } = useAuth()
  const { fetchData, error, clearError, isLoading } = useStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login")
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    if (isAuthenticated) {
      fetchData()
    }
  }, [isAuthenticated, fetchData])

  useEffect(() => {
    if (error) {
      console.error("Admin error:", error)
      // Auto-clear error after 5 seconds
      const timer = setTimeout(() => {
        clearError()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [error, clearError])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-black relative">
      <AdminNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="pt-16">
        <AdminDashboard activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="loading-spinner"></div>
        </div>
      )}

      {/* Error Toast */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50 animate-fadeInUp">
          <p className="text-sm">{error}</p>
          <button onClick={clearError} className="absolute top-1 right-2 text-white hover:text-gray-200">
            ×
          </button>
        </div>
      )}
    </div>
  )
}
