import { Card, CardContent } from "@/components/ui/card"

export function SkeletonCard() {
  return (
    <Card className="glass-card border border-red-500/20">
      <CardContent className="p-6">
        <div className="animate-pulse">
          <div className="w-12 h-12 bg-red-500/20 rounded-full mb-4"></div>
          <div className="h-4 bg-red-500/20 rounded mb-2"></div>
          <div className="h-3 bg-red-500/10 rounded mb-4"></div>
          <div className="flex gap-2">
            <div className="h-6 w-16 bg-red-500/10 rounded"></div>
            <div className="h-6 w-20 bg-red-500/10 rounded"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function SkeletonProject() {
  return (
    <Card className="glass-card border border-red-500/20">
      <CardContent className="p-0">
        <div className="animate-pulse">
          <div className="w-full h-48 bg-red-500/20 rounded-t-lg"></div>
          <div className="p-6">
            <div className="h-6 bg-red-500/20 rounded mb-3"></div>
            <div className="h-4 bg-red-500/10 rounded mb-2"></div>
            <div className="h-4 bg-red-500/10 rounded mb-4"></div>
            <div className="flex gap-2 mb-4">
              <div className="h-6 w-16 bg-red-500/10 rounded"></div>
              <div className="h-6 w-20 bg-red-500/10 rounded"></div>
              <div className="h-6 w-18 bg-red-500/10 rounded"></div>
            </div>
            <div className="flex gap-3">
              <div className="h-8 w-20 bg-red-500/10 rounded"></div>
              <div className="h-8 w-20 bg-red-500/10 rounded"></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function SkeletonExperience() {
  return (
    <Card className="glass-card border border-red-500/20">
      <CardContent className="p-8">
        <div className="animate-pulse">
          <div className="flex items-start gap-6 mb-6">
            <div className="w-16 h-16 bg-red-500/20 rounded-full"></div>
            <div className="flex-1">
              <div className="h-6 bg-red-500/20 rounded mb-2"></div>
              <div className="h-5 bg-red-500/15 rounded mb-2"></div>
              <div className="h-4 bg-red-500/10 rounded"></div>
            </div>
          </div>
          <div className="h-4 bg-red-500/10 rounded mb-6"></div>
          <div className="grid md:grid-cols-2 gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-12 bg-red-500/10 rounded"></div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function SkeletonBlogPost() {
  return (
    <Card className="glass-card border border-red-500/20">
      <CardContent className="p-0">
        <div className="animate-pulse">
          <div className="w-full h-48 bg-red-500/20 rounded-t-lg"></div>
          <div className="p-6">
            <div className="h-6 bg-red-500/20 rounded mb-3"></div>
            <div className="h-4 bg-red-500/10 rounded mb-2"></div>
            <div className="h-4 bg-red-500/10 rounded mb-4"></div>
            <div className="flex justify-between mb-4">
              <div className="h-4 w-24 bg-red-500/10 rounded"></div>
              <div className="h-4 w-20 bg-red-500/10 rounded"></div>
            </div>
            <div className="flex gap-2">
              <div className="h-6 w-16 bg-red-500/10 rounded"></div>
              <div className="h-6 w-20 bg-red-500/10 rounded"></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
