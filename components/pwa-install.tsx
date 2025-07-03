"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, X } from "lucide-react"

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowInstallPrompt(true)
    }

    const handleAppInstalled = () => {
      setShowInstallPrompt(false)
      setDeferredPrompt(null)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    window.addEventListener("appinstalled", handleAppInstalled)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("appinstalled", handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      setShowInstallPrompt(false)
    }

    setDeferredPrompt(null)
  }

  const handleDismiss = () => {
    setShowInstallPrompt(false)
    // Remember user dismissed for this session
    sessionStorage.setItem("pwa-install-dismissed", "true")
  }

  // Don't show if user already dismissed this session
  if (sessionStorage.getItem("pwa-install-dismissed")) {
    return null
  }

  if (!showInstallPrompt || !deferredPrompt) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm no-print">
      <Card className="glass-card border border-red-500/30 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Download className="text-red-500" size={20} />
              <h4 className="font-semibold text-white">Install App</h4>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleDismiss}
              className="text-gray-400 hover:text-white p-1 h-auto"
            >
              <X size={16} />
            </Button>
          </div>
          <p className="text-sm text-gray-300 mb-4">Install Dhyey's Portfolio for quick access and offline viewing.</p>
          <div className="flex space-x-2">
            <Button onClick={handleInstallClick} size="sm" className="bg-red-600 hover:bg-red-700 text-white flex-1">
              Install
            </Button>
            <Button
              onClick={handleDismiss}
              size="sm"
              variant="outline"
              className="border-gray-500/30 text-gray-300 hover:bg-gray-500/20 bg-transparent"
            >
              Later
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
