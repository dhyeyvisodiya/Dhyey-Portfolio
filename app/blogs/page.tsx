"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, ArrowLeft } from "lucide-react"
import { useStore } from "@/lib/store"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import Link from "next/link"

export default function BlogsPage() {
  const { blogs } = useStore()
  const { ref, isVisible } = useScrollAnimation()
  const publishedBlogs = blogs.filter((blog) => blog.published)

  return (
    <main className="min-h-screen bg-black relative">
      <Navigation />

      <section className="py-20 pt-32" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`mb-16 ${isVisible ? "fade-in-up" : "scroll-animate"}`}>
            <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">All Blog Posts</h1>
            <p className="text-lg text-gray-400 max-w-2xl">
              Thoughts, tutorials, and insights about web development, technology, and my journey as a developer.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publishedBlogs.map((blog, index) => (
              <Card
                key={blog.id}
                className={`bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-all duration-300 card-hover ${
                  isVisible ? `fade-in-up stagger-${(index % 6) + 1}` : "scroll-animate"
                }`}
              >
                <CardHeader>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(blog.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {blog.readTime}
                    </div>
                  </div>
                  <CardTitle className="text-white text-xl hover:text-red-400 transition-colors cursor-pointer">
                    {blog.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4 line-clamp-3">{blog.excerpt}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} className="bg-purple-600/20 text-purple-400 border-purple-600/30">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-0">
                    Read More
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {publishedBlogs.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-gray-400 mb-4">No blog posts yet</h3>
              <p className="text-gray-500">Check back soon for new content!</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
