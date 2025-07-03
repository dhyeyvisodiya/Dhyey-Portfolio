"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminNavigation } from "@/components/admin/admin-navigation"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { useAuth } from "@/lib/auth"
import { useState } from "react"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-black relative">
      <AdminNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="pt-16">
        <AdminDashboard activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  )
}
