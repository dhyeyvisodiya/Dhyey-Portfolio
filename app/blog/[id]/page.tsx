"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Calendar, BookOpen, Share2, Heart, MessageCircle } from "lucide-react"
import { dataManager, type BlogPost } from "@/lib/data-manager"
import { analytics } from "@/lib/analytics"

interface BlogPostPageProps {
  params: {
    id: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const data = dataManager.getData()
    const foundPost = data.blogPosts.find((p) => p.id === params.id)

    if (foundPost) {
      setPost(foundPost)

      // Find related posts based on tags
      const related = data.blogPosts
        .filter((p) => p.id !== foundPost.id)
        .filter((p) => p.tags.some((tag) => foundPost.tags.includes(tag)))
        .slice(0, 3)

      setRelatedPosts(related)
      analytics.trackProjectView(foundPost.title)
    }

    setIsLoading(false)
  }, [params.id])

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading blog post...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📝</div>
          <h1 className="text-3xl font-bold text-black mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Button onClick={() => (window.location.href = "/blog")} className="bg-red-600 hover:bg-red-700 text-white">
            <ArrowLeft size={16} className="mr-2" />
            Back to Blog
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-900/10 via-white to-purple-900/10 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Button
            onClick={() => (window.location.href = "/blog")}
            variant="ghost"
            className="mb-8 text-red-500 hover:bg-red-500/20"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Blog
          </Button>

          <div className="mb-6">
            {post.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="border-blue-500/50 text-blue-400 mr-2 mb-2">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-black leading-tight">{post.title}</h1>

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-6 text-gray-600">
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                {new Date(post.publishDate).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <BookOpen size={16} className="mr-2" />
                {post.readTime} min read
              </div>
            </div>

            <Button
              onClick={handleShare}
              variant="outline"
              size="sm"
              className="border-red-500/30 text-red-500 hover:bg-red-500/20 bg-transparent"
            >
              <Share2 size={16} className="mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="max-w-4xl mx-auto px-4 mb-12">
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid lg:grid-cols-4 gap-12">
          <div className="lg:col-span-3">
            <div className="prose prose-lg max-w-none">
              <div className="text-xl text-gray-600 mb-8 leading-relaxed">{post.excerpt}</div>

              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">{post.content}</div>
            </div>

            {/* Engagement Actions */}
            <div className="flex items-center space-x-4 mt-12 pt-8 border-t border-gray-200">
              <Button
                variant="outline"
                size="sm"
                className="border-red-500/30 text-red-500 hover:bg-red-500/20 bg-transparent"
              >
                <Heart size={16} className="mr-2" />
                Like
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-blue-500/30 text-blue-500 hover:bg-blue-500/20 bg-transparent"
              >
                <MessageCircle size={16} className="mr-2" />
                Comment
              </Button>
              <Button
                onClick={handleShare}
                variant="outline"
                size="sm"
                className="border-green-500/30 text-green-500 hover:bg-green-500/20 bg-transparent"
              >
                <Share2 size={16} className="mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              {/* Author Info */}
              <Card className="glass-card border border-red-500/20">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500/30 to-purple-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">👨‍💻</span>
                  </div>
                  <h3 className="font-semibold text-black mb-2">Dhyey Visodiya</h3>
                  <p className="text-sm text-gray-600 mb-4">App Developer & Software Engineer</p>
                  <Button
                    onClick={() => (window.location.href = "/#contact")}
                    size="sm"
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Follow
                  </Button>
                </CardContent>
              </Card>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <Card className="glass-card border border-red-500/20">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-black mb-4">Related Posts</h3>
                    <div className="space-y-4">
                      {relatedPosts.map((relatedPost) => (
                        <div
                          key={relatedPost.id}
                          className="cursor-pointer group"
                          onClick={() => (window.location.href = `/blog/${relatedPost.id}`)}
                        >
                          <h4 className="text-sm font-medium text-black group-hover:text-red-500 transition-colors mb-1 line-clamp-2">
                            {relatedPost.title}
                          </h4>
                          <p className="text-xs text-gray-600">
                            {new Date(relatedPost.publishDate).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">Related Posts</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost) => (
              <Card
                key={relatedPost.id}
                className="glass-card border border-red-500/20 hover:border-red-500/40 transition-all duration-500 hover:scale-105 group cursor-pointer"
                onClick={() => (window.location.href = `/blog/${relatedPost.id}`)}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={relatedPost.image || "/placeholder.svg"}
                      alt={relatedPost.title}
                      className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold mb-2 text-black group-hover:text-red-500 transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{relatedPost.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{new Date(relatedPost.publishDate).toLocaleDateString()}</span>
                      <span>{relatedPost.readTime} min</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
