"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, RefreshCw } from "lucide-react"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo)
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error} resetError={this.resetError} />
      }

      return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
          <Card className="glass-card border border-red-500/20 max-w-md w-full">
            <CardContent className="p-8 text-center">
              <AlertTriangle className="text-red-500 mx-auto mb-4" size={48} />
              <h2 className="text-2xl font-bold text-foreground mb-4">Something went wrong</h2>
              <p className="text-muted-foreground mb-6">
                We encountered an unexpected error. Please try refreshing the page or contact support if the problem
                persists.
              </p>
              {this.state.error && (
                <details className="text-left mb-6 p-4 bg-red-500/10 rounded-lg">
                  <summary className="cursor-pointer text-sm font-medium text-red-400 mb-2">Error Details</summary>
                  <code className="text-xs text-muted-foreground break-all">{this.state.error.message}</code>
                </details>
              )}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={this.resetError} className="bg-red-600 hover:bg-red-700 text-white">
                  <RefreshCw size={16} className="mr-2" />
                  Try Again
                </Button>
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="border-red-500/30 text-red-500 hover:bg-red-500/20 bg-transparent"
                >
                  Refresh Page
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}
