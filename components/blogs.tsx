"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { useStore } from "@/lib/store"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import Link from "next/link"
import { useEffect } from "react"

export function Blogs() {
  const { blogs, fetchData } = useStore()
  const { ref, isVisible } = useScrollAnimation()
  const publishedBlogs = blogs.filter((blog) => blog.published).slice(0, 4)

  // Ensure we have fresh data
  useEffect(() => {
    if (blogs.length === 0) {
      fetchData()
    }
  }, [blogs.length, fetchData])

  return (
    <section id="blogs" className="py-20 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 ${isVisible ? "fade-in-up" : "scroll-animate"}`}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 gradient-text">Latest Blogs</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Thoughts, tutorials, and insights about web development and technology. ({publishedBlogs.length} published)
          </p>
        </div>

        {publishedBlogs.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {publishedBlogs.map((blog, index) => (
                <Card
                  key={blog.id}
                  className={`bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-colors card-hover ${
                    isVisible ? `fade-in-up stagger-${index + 1}` : "scroll-animate"
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

            <div className={`text-center ${isVisible ? "fade-in-up stagger-5" : "scroll-animate"}`}>
              <Link href="/blogs">
                <Button className="gradient-bg text-white px-8 py-3 hover:scale-105 transition-transform duration-300">
                  View All Posts ({blogs.length})
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-gray-400 mb-4">No blog posts yet</h3>
            <p className="text-gray-500">Blog posts will appear here once added through the admin panel.</p>
          </div>
        )}
      </div>
    </section>
  )
}
