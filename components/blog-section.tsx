"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, BookOpen, ArrowRight } from "lucide-react"
import { dataManager, type BlogPost } from "@/lib/data-manager"

export default function BlogSection() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    const data = dataManager.getData()
    setBlogPosts(data.blogPosts)
  }, [])

  if (blogPosts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-2xl font-semibold text-black mb-2">No blog posts yet</h3>
        <p className="text-gray-600">Check back later for technical articles and tutorials.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Featured Posts */}
      <div className="grid md:grid-cols-2 gap-8">
        {blogPosts
          .filter((post) => post.featured)
          .slice(0, 2)
          .map((post) => (
            <Card
              key={post.id}
              className="glass-card border border-red-500/20 hover:border-red-500/40 transition-all duration-500 hover:scale-105 group cursor-pointer"
              onClick={() => (window.location.href = `/blog/${post.id}`)}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-black group-hover:text-red-500 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{post.excerpt}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-gray-600 text-sm">
                      <Calendar size={14} className="mr-2" />
                      {new Date(post.publishDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <BookOpen size={14} className="mr-2" />
                      {post.readTime} min read
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="border-blue-500/50 text-blue-400 text-xs hover:bg-blue-500/20 transition-all duration-300"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* All Posts Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <Card
            key={post.id}
            className="glass-card border border-red-500/20 hover:border-red-500/40 transition-all duration-500 hover:scale-105 group cursor-pointer"
            onClick={() => (window.location.href = `/blog/${post.id}`)}
          >
            <CardContent className="p-0">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                {post.featured && (
                  <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold">
                    Featured
                  </div>
                )}
              </div>
              <div className="p-4">
                <h4 className="font-semibold mb-2 text-black group-hover:text-red-500 transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                  <span>{post.readTime} min</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center">
        <Button
          onClick={() => (window.location.href = "/blog")}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 group"
        >
          <span className="flex items-center">
            <BookOpen className="mr-2 group-hover:animate-bounce" size={20} />
            View All Posts
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </span>
        </Button>
      </div>
    </div>
  )
}
