"use client"

import { useEffect, useState } from "react"
import { Calendar, Clock, ExternalLink, Tag } from "lucide-react"
import { SectionBackground } from "./section-background"
import { useStore } from "@/lib/store"

export function Blogs() {
  const { blogs } = useStore()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("blogs")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const defaultBlogs = [
    {
      id: 1,
      title: "Building Scalable React Native Apps: Best Practices and Architecture Patterns",
      excerpt:
        "Learn how to structure your React Native applications for scalability, maintainability, and performance. This comprehensive guide covers architecture patterns, state management, and optimization techniques.",
      content: "Full blog content here...",
      publishedAt: "2023-11-15",
      readTime: 8,
      tags: ["React Native", "Architecture", "Performance"],
      image: "/placeholder.svg?height=250&width=400",
      slug: "scalable-react-native-apps",
    },
    {
      id: 2,
      title: "TypeScript in React: Advanced Patterns and Type Safety",
      excerpt:
        "Dive deep into advanced TypeScript patterns for React applications. Explore generic components, utility types, and how to achieve better type safety in your React projects.",
      content: "Full blog content here...",
      publishedAt: "2023-10-28",
      readTime: 12,
      tags: ["TypeScript", "React", "Type Safety"],
      image: "/placeholder.svg?height=250&width=400",
      slug: "typescript-react-advanced-patterns",
    },
    {
      id: 3,
      title: "Next.js 14: New Features and Performance Improvements",
      excerpt:
        "Explore the latest features in Next.js 14, including Server Actions, improved App Router, and performance optimizations that make your web applications faster and more efficient.",
      content: "Full blog content here...",
      publishedAt: "2023-10-10",
      readTime: 6,
      tags: ["Next.js", "Web Development", "Performance"],
      image: "/placeholder.svg?height=250&width=400",
      slug: "nextjs-14-new-features",
    },
    {
      id: 4,
      title: "State Management in Modern React: Redux vs Zustand vs Context",
      excerpt:
        "A comprehensive comparison of different state management solutions in React. Learn when to use Redux, Zustand, or React Context, with practical examples and performance considerations.",
      content: "Full blog content here...",
      publishedAt: "2023-09-22",
      readTime: 10,
      tags: ["React", "State Management", "Redux", "Zustand"],
      image: "/placeholder.svg?height=250&width=400",
      slug: "react-state-management-comparison",
    },
  ]

  const currentBlogs = blogs.length > 0 ? blogs : defaultBlogs

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <section id="blogs" className="py-20 relative overflow-hidden bg-black">
      <SectionBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
                Latest Blog Posts
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Sharing knowledge, insights, and experiences from my journey in software development
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto rounded-full mt-4"></div>
          </div>

          {/* Featured Blog */}
          {currentBlogs.length > 0 && (
            <div className={`mb-16 ${isVisible ? "animate-fadeInUp" : ""}`}>
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800/50 hover:border-gray-700/50 transition-all duration-500 group">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Featured Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={currentBlogs[0].image || "/placeholder.svg"}
                      alt={currentBlogs[0].title}
                      className="w-full h-64 lg:h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-red-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Featured
                      </span>
                    </div>
                  </div>

                  {/* Featured Content */}
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(currentBlogs[0].publishedAt)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{currentBlogs[0].readTime} min read</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-red-500 transition-colors duration-300">
                      {currentBlogs[0].title}
                    </h3>

                    <p className="text-gray-400 mb-6 leading-relaxed">{currentBlogs[0].excerpt}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {currentBlogs[0].tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gray-800/50 text-gray-300 rounded-full text-sm border border-gray-700/50 hover:border-red-500/50 hover:text-red-400 transition-all duration-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href={`/blogs/${currentBlogs[0].slug}`}
                      className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors duration-200 font-semibold"
                    >
                      Read Full Article
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentBlogs.slice(1).map((blog, index) => (
              <article
                key={blog.id}
                className={`group bg-gray-900/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800/50 hover:border-gray-700/50 transition-all duration-500 hover:transform hover:scale-105 ${
                  isVisible ? "animate-fadeInUp" : ""
                }`}
                style={{ animationDelay: `${(index + 1) * 200}ms` }}
              >
                {/* Blog Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={blog.image || "/placeholder.svg"}
                    alt={blog.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
                </div>

                {/* Blog Content */}
                <div className="p-6">
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(blog.publishedAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{blog.readTime} min</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-red-500 transition-colors duration-300 line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-gray-400 mb-4 text-sm leading-relaxed line-clamp-3">{blog.excerpt}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-800/50 text-gray-300 rounded-full text-xs border border-gray-700/50"
                      >
                        {tag}
                      </span>
                    ))}
                    {blog.tags.length > 2 && (
                      <span className="px-2 py-1 bg-gray-800/50 text-gray-400 rounded-full text-xs border border-gray-700/50">
                        +{blog.tags.length - 2}
                      </span>
                    )}
                  </div>

                  {/* Read More Link */}
                  <a
                    href={`/blogs/${blog.slug}`}
                    className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors duration-200 font-semibold text-sm"
                  >
                    Read More
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* View All Blogs */}
          <div className="text-center mt-12">
            <a
              href="/blogs"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-blue-500 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25"
            >
              <Tag className="w-5 h-5" />
              View All Blog Posts
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
