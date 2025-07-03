"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, Calendar, BookOpen, Filter } from "lucide-react"
import { dataManager, type BlogPost } from "@/lib/data-manager"
import { analytics } from "@/lib/analytics"

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [allTags, setAllTags] = useState<string[]>([])

  useEffect(() => {
    const data = dataManager.getData()
    setBlogPosts(data.blogPosts)
    setFilteredPosts(data.blogPosts)

    // Extract all unique tags
    const tags = Array.from(new Set(data.blogPosts.flatMap((post) => post.tags)))
    setAllTags(tags)

    analytics.trackPageView("/blog")
  }, [])

  useEffect(() => {
    let filtered = blogPosts

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Filter by selected tag
    if (selectedTag) {
      filtered = filtered.filter((post) => post.tags.includes(selectedTag))
    }

    setFilteredPosts(filtered)
  }, [searchQuery, selectedTag, blogPosts])

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag)
  }

  const handlePostClick = (post: BlogPost) => {
    analytics.trackProjectView(post.title)
    window.location.href = `/blog/${post.id}`
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-900/10 via-white to-purple-900/10 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <Button
            onClick={() => window.history.back()}
            variant="ghost"
            className="mb-8 text-red-500 hover:bg-red-500/20"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Portfolio
          </Button>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-black via-red-500 to-black bg-clip-text text-transparent">
            My <span className="text-red-500">Blog</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Sharing insights, tutorials, and thoughts on software development, mobile apps, and emerging technologies.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search blog posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/50 border-red-500/30 focus:border-red-500"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setSelectedTag(null)
              }}
              className="border-red-500/30 text-red-500 hover:bg-red-500/20 bg-transparent"
            >
              <Filter size={16} className="mr-2" />
              Clear Filters
            </Button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                className={`cursor-pointer transition-all duration-300 ${
                  selectedTag === tag
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "border-red-500/50 text-red-400 hover:bg-red-500/20"
                }`}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Blog Posts */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-semibold text-black mb-2">No posts found</h3>
            <p className="text-gray-600">
              {searchQuery || selectedTag
                ? "Try adjusting your search or filter criteria."
                : "Check back later for technical articles and tutorials."}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <Card
                key={post.id}
                className="glass-card border border-red-500/20 hover:border-red-500/40 transition-all duration-500 hover:scale-105 group cursor-pointer animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handlePostClick(post)}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {post.featured && (
                      <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                        Featured
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-black group-hover:text-red-500 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>

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
                      {post.tags.slice(0, 3).map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          variant="outline"
                          className="border-blue-500/50 text-blue-400 text-xs hover:bg-blue-500/20 transition-all duration-300"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {post.tags.length > 3 && (
                        <Badge variant="outline" className="border-gray-500/50 text-gray-400 text-xs">
                          +{post.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
