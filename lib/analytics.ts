interface AnalyticsEvent {
  action: string
  category: string
  label?: string
  value?: number
}

class Analytics {
  private isEnabled = true
  private events: AnalyticsEvent[] = []

  init(): void {
    // Initialize analytics (Google Analytics, etc.)
    if (typeof window !== "undefined" && this.isEnabled) {
      // In a real app, you would initialize Google Analytics here
      console.log("Analytics initialized")
    }
  }

  enable(): void {
    this.isEnabled = true
  }

  disable(): void {
    this.isEnabled = false
  }

  track(event: AnalyticsEvent): void {
    if (!this.isEnabled) return

    this.events.push({
      ...event,
      timestamp: Date.now(),
    } as any)

    // In a real app, you would send this to your analytics service
    console.log("Analytics event:", event)
  }

  // Specific tracking methods
  trackPageView(page: string): void {
    this.track({
      action: "page_view",
      category: "navigation",
      label: page,
    })
  }

  trackContact(method: string): void {
    this.track({
      action: "contact",
      category: "engagement",
      label: method,
    })
  }

  trackDownload(filename: string): void {
    this.track({
      action: "download",
      category: "engagement",
      label: filename,
    })
  }

  trackProjectView(projectName: string): void {
    this.track({
      action: "project_view",
      category: "engagement",
      label: projectName,
    })
  }

  trackSearch(query: string): void {
    this.track({
      action: "search",
      category: "engagement",
      label: query,
    })
  }

  trackLanguageChange(language: string): void {
    this.track({
      action: "language_change",
      category: "settings",
      label: language,
    })
  }

  // Get analytics data
  getEvents(): AnalyticsEvent[] {
    return [...this.events]
  }

  clearEvents(): void {
    this.events = []
  }

  // Export analytics data
  exportData(): string {
    return JSON.stringify(this.events, null, 2)
  }
}

export const analytics = new Analytics()
