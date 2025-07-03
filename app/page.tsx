"use client"

import type React from "react"
import { useState, useEffect, lazy } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Download,
  ExternalLink,
  Code,
  Smartphone,
  Database,
  Globe,
  Menu,
  X,
  Send,
  Zap,
  Rocket,
  Heart,
  ArrowRight,
  ChevronDown,
  Award,
  Calendar,
  Building,
  GraduationCap,
  Trophy,
  Target,
  Sparkles,
  Palette,
  Server,
  Shield,
  BookOpen,
  SearchIcon,
  User,
  Briefcase,
  FileText,
  Star,
  Clock,
  Eye,
  MessageCircle,
  Share2,
  TrendingUp,
  Users,
  Coffee,
  Lightbulb,
  Cpu,
  Layers,
} from "lucide-react"
import { dataManager, type PortfolioData } from "@/lib/data-manager"
import { fileManager } from "@/lib/file-manager"
import { analytics } from "@/lib/analytics"
import { ErrorBoundary } from "@/components/error-boundary"
import { SearchComponent } from "@/components/search"
import { PWAInstall } from "@/components/pwa-install"

// Lazy load heavy components
const BlogSection = lazy(() => import("@/components/blog-section"))

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [isLoading, setIsLoading] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [data, setData] = useState<PortfolioData>({
    skills: [],
    projects: [],
    certificates: [],
    experiences: [],
    blogPosts: [],
    resume: null,
    profileImage: "/placeholder.svg?height=400&width=400&text=Profile+Photo",
    settings: {
      language: "en",
      analytics: true,
    },
  })
  const [showSearch, setShowSearch] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  // Load data on mount
  useEffect(() => {
    try {
      const portfolioData = dataManager.getData()
      if (portfolioData) {
        setData(portfolioData)
      }

      // Subscribe to data changes
      const unsubscribe = dataManager.subscribe(() => {
        const updatedData = dataManager.getData()
        if (updatedData) {
          setData(updatedData)
        }
      })

      // Initialize analytics
      analytics.init()

      return unsubscribe
    } catch (error) {
      console.error("Error loading data:", error)
    }
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      try {
        setMousePosition({ x: e.clientX, y: e.clientY })
      } catch (error) {
        console.error("Error handling mouse move:", error)
      }
    }

    const handleScroll = () => {
      try {
        const sections = [
          "hero",
          "about",
          "experience",
          "skills",
          "projects",
          "certificates",
          "blog",
          "contact",
          "resume",
        ]
        const scrollPosition = window.scrollY + 100

        sections.forEach((section) => {
          const element = document.getElementById(section)
          if (element) {
            const offsetTop = element.offsetTop
            const offsetHeight = element.offsetHeight
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(section)
            }
          }
        })
      } catch (error) {
        console.error("Error handling scroll:", error)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    try {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      })
    } catch (error) {
      console.error("Error handling input change:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsLoading(true)

      // Basic form validation
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        alert("Please fill in all fields.")
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        alert("Please enter a valid email address.")
        return
      }

      // Submit to Formspree
      const response = await fetch("https://formspree.io/f/xpznvqko", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      })

      if (response.ok) {
        alert("Thank you for your message! I'll get back to you soon.")
        setFormData({ name: "", email: "", message: "" })
        analytics.trackContact("form")
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("There was an error sending your message. Please try again or contact me directly.")
    } finally {
      setIsLoading(false)
    }
  }

  const scrollToSection = (sectionId: string) => {
    try {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
        setIsMenuOpen(false)
        analytics.trackPageView(`#${sectionId}`)
      }
    } catch (error) {
      console.error("Error scrolling to section:", error)
    }
  }

  const handleSocialClick = (url: string, platform: string) => {
    try {
      window.open(url, "_blank", "noopener,noreferrer")
      analytics.trackContact(platform)
    } catch (error) {
      console.error("Error opening social link:", error)
    }
  }

  const handleViewMore = (section: string) => {
    try {
      window.location.href = `/${section}`
    } catch (error) {
      console.error("Error navigating to section:", error)
    }
  }

  const handleDownloadResume = () => {
    try {
      if (data?.resume) {
        fileManager.downloadFile(data.resume.url, data.resume.filename)
        analytics.trackDownload(data.resume.filename)
      }
    } catch (error) {
      console.error("Error downloading resume:", error)
    }
  }

  // Social media links
  const socialLinks = {
    github: "https://github.com/dhyeyvisodiya",
    linkedin: "https://linkedin.com/in/dhyeyvisodiya",
    email: "mailto:dhyeyvisodiya@gmail.com",
    twitter: "https://twitter.com/dhyeyvisodiya",
    instagram: "https://instagram.com/dhyeyvisodiya",
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
        {/* Skip to content link for accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        {/* PWA Install Prompt */}
        <PWAInstall />

        {/* Animated Cursor */}
        <div
          className="fixed w-8 h-8 pointer-events-none z-50 transition-all duration-200 ease-out no-print"
          style={{
            left: mousePosition.x - 16,
            top: mousePosition.y - 16,
          }}
        >
          <div className="w-full h-full rounded-full bg-gradient-to-r from-red-500/30 to-blue-500/30 animate-pulse" />
        </div>

        {/* Dynamic Background */}
        <div className="fixed inset-0 z-0 bg-mesh">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
          {/* Animated particles */}
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: i % 2 === 0 ? "#ef4444" : "#3b82f6",
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 nav-glass transition-all duration-300 no-print">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div
                className="text-2xl font-bold gradient-text-primary cursor-pointer animate-pulse"
                onClick={() => scrollToSection("hero")}
              >
                {"<DV/>"}
              </div>

              <div className="hidden md:flex items-center space-x-8">
                <div className="flex space-x-6">
                  {[
                    { name: "Home", id: "hero" },
                    { name: "About", id: "about" },
                    { name: "Experience", id: "experience" },
                    { name: "Skills", id: "skills" },
                    { name: "Projects", id: "projects" },
                    { name: "Certificates", id: "certificates" },
                    { name: "Blog", id: "blog" },
                    { name: "Contact", id: "contact" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`relative text-foreground hover:text-red-400 transition-all duration-300 group font-medium ${
                        activeSection === item.id ? "text-red-400" : ""
                      }`}
                    >
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
                    </button>
                  ))}
                </div>

                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSearch(true)}
                    className="text-red-400 hover:bg-red-500/20"
                    aria-label="Search"
                  >
                    <SearchIcon size={16} />
                  </Button>
                </div>
              </div>

              <button
                className="md:hidden text-foreground hover:text-red-400 transition-colors duration-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {isMenuOpen && (
              <div className="md:hidden pb-4 animate-fadeInDown">
                {[
                  { name: "Home", id: "hero" },
                  { name: "About", id: "about" },
                  { name: "Experience", id: "experience" },
                  { name: "Skills", id: "skills" },
                  { name: "Projects", id: "projects" },
                  { name: "Certificates", id: "certificates" },
                  { name: "Blog", id: "blog" },
                  { name: "Contact", id: "contact" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left py-3 text-foreground hover:text-red-400 transition-colors duration-300 hover:bg-red-500/10 rounded-lg px-2 font-medium"
                  >
                    {item.name}
                  </button>
                ))}
                <div className="flex items-center justify-center mt-4 px-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowSearch(true)
                      setIsMenuOpen(false)
                    }}
                    className="text-red-400 hover:bg-red-500/20"
                  >
                    <SearchIcon size={16} className="mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Search Modal */}
        {showSearch && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-20 no-print">
            <div className="w-full max-w-2xl mx-4">
              <SearchComponent onClose={() => setShowSearch(false)} />
            </div>
          </div>
        )}

        <main id="main-content">
          {/* Enhanced Hero Section */}
          <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
            <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
              {/* Main Hero Content */}
              <div className="glass-card rounded-3xl p-12 hover:scale-105 transition-all duration-500 mb-8 mt-20 animate-glow">
                {/* Profile Icon */}
                <div className="mb-8 relative">
                  <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-500/30 via-black to-blue-500/30 border-4 border-red-500/50 flex items-center justify-center backdrop-blur-sm relative overflow-hidden group animate-pulse-border">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-blue-500/20 animate-gradient-shift"></div>
                    <Code
                      size={100}
                      className="text-white z-10 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg"
                    />

                    {/* Floating Icons Around Avatar */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-red-500/30 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-red-500/50 animate-floatUp">
                      <Smartphone size={24} className="text-red-400" />
                    </div>
                    <div
                      className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-500/30 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-blue-500/50 animate-floatUp"
                      style={{ animationDelay: "1s" }}
                    >
                      <Globe size={24} className="text-blue-400" />
                    </div>
                    <div
                      className="absolute top-1/2 -left-8 w-12 h-12 bg-purple-500/30 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-purple-500/50 animate-floatUp"
                      style={{ animationDelay: "2s" }}
                    >
                      <Database size={20} className="text-purple-400" />
                    </div>
                    <div
                      className="absolute top-1/2 -right-8 w-12 h-12 bg-green-500/30 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-green-500/50 animate-floatUp"
                      style={{ animationDelay: "0.5s" }}
                    >
                      <Zap size={20} className="text-green-400" />
                    </div>
                  </div>
                </div>

                {/* Name and Title */}
                <h1 className="text-6xl md:text-8xl font-bold mb-6 gradient-text-secondary animate-slideInLeft text-shadow">
                  Dhyey Visodiya
                </h1>

                <div className="text-2xl md:text-4xl mb-6 animate-slideInRight">
                  <span className="text-red-400 font-bold">App Developer</span>
                  <span className="text-white mx-4">&</span>
                  <span className="text-blue-400 font-bold">Software Engineer</span>
                </div>

                {/* Animated Tagline */}
                <div className="text-lg md:text-xl text-gray-300 mb-8 animate-fadeIn">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Sparkles className="text-yellow-400 animate-pulse" size={24} />
                    <span className="gradient-text-primary">Crafting Digital Experiences</span>
                    <Sparkles className="text-yellow-400 animate-pulse" size={24} />
                  </div>
                  <p className="max-w-3xl mx-auto leading-relaxed">
                    Passionate about creating innovative mobile and web applications with cutting-edge technologies.
                    Transforming ideas into scalable, user-centric solutions that make a difference.
                  </p>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-400 mb-2">{data.projects?.length || 0}+</div>
                    <div className="text-sm text-gray-400">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">{data.skills?.length || 0}+</div>
                    <div className="text-sm text-gray-400">Skills</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">{data.experiences?.length || 0}+</div>
                    <div className="text-sm text-gray-400">Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">{data.certificates?.length || 0}+</div>
                    <div className="text-sm text-gray-400">Certificates</div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <Button
                    onClick={() => scrollToSection("projects")}
                    className="btn-primary px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 group relative overflow-hidden text-white"
                  >
                    <span className="relative z-10 flex items-center">
                      <Rocket className="mr-3 group-hover:animate-bounce" size={24} />
                      Explore My Work
                      <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={24} />
                    </span>
                  </Button>

                  <Button
                    onClick={() => scrollToSection("contact")}
                    className="btn-outline px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      <Heart className="mr-3 group-hover:animate-pulse" size={24} />
                      Let&apos;s Connect
                    </span>
                  </Button>
                </div>
              </div>

              {/* Scroll Indicator */}
              <div className="animate-bounce cursor-pointer" onClick={() => scrollToSection("about")}>
                <ChevronDown size={40} className="mx-auto text-red-400 hover:text-red-300 transition-colors" />
                <div className="text-sm text-gray-400 mt-2">Scroll to explore</div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-20 px-4 relative section-bg-1">
            <div className="max-w-6xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-16">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
                  <User className="mr-2 text-red-400" size={20} />
                  <span className="text-red-400 font-semibold">About Me</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-bold animate-fadeInUp gradient-text-primary text-shadow">
                  Get to Know <span className="text-red-400">Me</span>
                </h2>
                <p className="text-xl text-gray-400 mt-4 max-w-2xl mx-auto">
                  Passionate developer with a love for creating amazing digital experiences
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="animate-slideInLeft">
                  <div className="glass-card rounded-3xl p-8 hover:scale-105 transition-all duration-500">
                    <h3 className="text-3xl font-semibold mb-6 text-red-400 flex items-center">
                      <Zap className="mr-3 animate-pulse" size={32} />
                      Hello, I&apos;m Dhyey!
                    </h3>

                    <div className="space-y-4 text-gray-300 leading-relaxed">
                      <p className="text-lg">
                        I&apos;m a passionate <span className="text-red-400 font-semibold">app developer</span> and{" "}
                        <span className="text-blue-400 font-semibold">software engineer</span> with expertise in
                        creating innovative mobile and web applications. With a strong foundation in modern technologies
                        and frameworks, I bring ideas to life through clean, efficient code.
                      </p>

                      <p className="text-lg">
                        My journey in software development has led me to work on diverse projects, from
                        <span className="text-red-400 font-semibold"> mobile apps</span> to{" "}
                        <span className="text-blue-400 font-semibold">full-stack web applications</span>. I&apos;m
                        constantly learning and adapting to new technologies to deliver the best solutions.
                      </p>

                      <p className="text-lg">
                        When I&apos;m not coding, I enjoy exploring new technologies, writing technical blogs, and
                        sharing knowledge with the developer community.
                      </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-4 mt-8">
                      <div className="text-center p-4 bg-gradient-to-r from-red-500/10 to-blue-500/10 rounded-lg border border-red-500/20">
                        <Coffee className="mx-auto mb-2 text-red-400" size={24} />
                        <div className="text-2xl font-bold text-white">500+</div>
                        <div className="text-sm text-gray-400">Cups of Coffee</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-r from-blue-500/10 to-red-500/10 rounded-lg border border-blue-500/20">
                        <Lightbulb className="mx-auto mb-2 text-blue-400" size={24} />
                        <div className="text-2xl font-bold text-white">100+</div>
                        <div className="text-sm text-gray-400">Ideas Realized</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center animate-slideInRight">
                  <div className="relative">
                    <div className="w-80 h-80 bg-gradient-to-br from-red-500/40 via-black to-blue-500/40 rounded-full flex items-center justify-center backdrop-blur-sm border-4 border-red-500/50 overflow-hidden animate-pulse-border">
                      <User size={200} className="text-gray-400" />
                    </div>

                    {/* Enhanced Floating Icons */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-red-500/30 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-red-500/50 animate-floatUp">
                      <Smartphone size={24} className="text-red-400" />
                    </div>
                    <div
                      className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-500/30 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-blue-500/50 animate-floatUp"
                      style={{ animationDelay: "0.5s" }}
                    >
                      <Globe size={24} className="text-blue-400" />
                    </div>
                    <div
                      className="absolute top-1/2 -left-8 w-12 h-12 bg-purple-500/30 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-purple-500/50 animate-floatUp"
                      style={{ animationDelay: "1s" }}
                    >
                      <Database size={20} className="text-purple-400" />
                    </div>
                    <div
                      className="absolute top-1/4 -right-8 w-12 h-12 bg-green-500/30 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-green-500/50 animate-floatUp"
                      style={{ animationDelay: "1.5s" }}
                    >
                      <Server size={20} className="text-green-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section id="experience" className="py-20 px-4 section-bg-2">
            <div className="max-w-6xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-16">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                  <Briefcase className="mr-2 text-blue-400" size={20} />
                  <span className="text-blue-400 font-semibold">Professional Journey</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-bold animate-fadeInUp gradient-text-primary text-shadow">
                  My <span className="text-blue-400">Experience</span>
                </h2>
                <p className="text-xl text-gray-400 mt-4 max-w-2xl mx-auto">
                  A timeline of my professional growth and achievements
                </p>
              </div>

              {!data.experiences || data.experiences.length === 0 ? (
                <div className="empty-state animate-scaleIn">
                  <div className="relative z-10">
                    <Briefcase size={80} className="mx-auto mb-6 text-gray-400" />
                    <h3 className="text-2xl font-semibold text-white mb-4">No Experience Added Yet</h3>
                    <p className="text-gray-400 mb-8 max-w-md mx-auto">
                      Your professional experience will be showcased here once you add your work history.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {data.experiences.map((exp, index) => (
                    <div
                      key={exp.id}
                      className="glass-card rounded-3xl p-8 hover:scale-105 transition-all duration-500 animate-fadeInUp group"
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      <div className="grid md:grid-cols-4 gap-6">
                        <div className="md:col-span-1">
                          <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                            {exp.logo}
                          </div>
                          <div className="text-red-400 font-semibold text-lg flex items-center mb-2">
                            <Calendar size={16} className="mr-2" />
                            {exp.period}
                          </div>
                          <div className="text-gray-400 flex items-center">
                            <MapPin size={16} className="mr-2" />
                            {exp.location}
                          </div>
                        </div>

                        <div className="md:col-span-3">
                          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                            {exp.title}
                          </h3>
                          <h4 className="text-xl text-blue-400 mb-4 flex items-center">
                            <Building size={20} className="mr-2" />
                            {exp.company}
                          </h4>
                          <p className="text-gray-300 mb-6 leading-relaxed">{exp.description}</p>

                          <div className="space-y-2">
                            <h5 className="text-lg font-semibold text-white mb-3 flex items-center">
                              <Trophy size={20} className="mr-2 text-yellow-400" />
                              Key Achievements
                            </h5>
                            <div className="grid md:grid-cols-2 gap-3">
                              {exp.achievements &&
                                exp.achievements.map((achievement, achIndex) => (
                                  <div
                                    key={achIndex}
                                    className="flex items-start space-x-3 p-3 bg-gradient-to-r from-red-500/10 to-blue-500/10 rounded-lg hover:from-red-500/20 hover:to-blue-500/20 transition-all duration-300 border border-red-500/20"
                                  >
                                    <Target size={16} className="text-red-400 mt-1 flex-shrink-0" />
                                    <span className="text-gray-300 text-sm">{achievement}</span>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="text-center mt-12">
                <Button
                  onClick={() => handleViewMore("experience")}
                  className="btn-primary px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-110 group relative overflow-hidden text-white"
                >
                  <span className="relative z-10 flex items-center">
                    <Trophy className="mr-3 group-hover:animate-bounce" size={24} />
                    View All Experience
                    <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" size={24} />
                  </span>
                </Button>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="py-20 px-4 section-bg-3">
            <div className="max-w-6xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-16">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
                  <Code className="mr-2 text-red-400" size={20} />
                  <span className="text-red-400 font-semibold">Technical Expertise</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-bold animate-fadeInUp gradient-text-primary text-shadow">
                  My <span className="text-red-400">Skills</span>
                </h2>
                <p className="text-xl text-gray-400 mt-4 max-w-2xl mx-auto">
                  Technologies and tools I use to bring ideas to life
                </p>
              </div>

              {!data.skills || data.skills.length === 0 ? (
                <div className="empty-state animate-scaleIn">
                  <div className="relative z-10">
                    <Code size={80} className="mx-auto mb-6 text-gray-400" />
                    <h3 className="text-2xl font-semibold text-white mb-4">No Skills Added Yet</h3>
                    <p className="text-gray-400 mb-8 max-w-md mx-auto">
                      Your technical expertise and skills will be showcased here once you add them.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Skills Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                    {data.skills.map((skill, index) => (
                      <div key={skill.id} className="group relative" style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className="glass-card rounded-2xl p-6 hover:scale-110 hover:-translate-y-2 cursor-pointer relative overflow-hidden transition-all duration-500">
                          <div className="text-4xl mb-4 text-center group-hover:scale-125 transition-transform duration-300">
                            {skill.icon}
                          </div>
                          <h3 className="text-lg font-semibold text-white text-center mb-2 group-hover:text-red-400 transition-colors">
                            {skill.name}
                          </h3>
                          <div className="text-center">
                            <Badge
                              variant="outline"
                              className={`border-red-500/50 text-red-400 hover:bg-red-500/20 transition-all duration-300 bg-gradient-to-r ${skill.color} text-white border-0`}
                            >
                              {skill.level}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Skill Categories */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      {
                        category: "Frontend",
                        icon: <Palette size={32} />,
                        count: data.skills.filter((s) => s.category === "Frontend").length,
                        color: "text-blue-400",
                        bgColor: "from-blue-500/10 to-blue-500/20",
                        borderColor: "border-blue-500/30",
                      },
                      {
                        category: "Mobile",
                        icon: <Smartphone size={32} />,
                        count: data.skills.filter((s) => s.category === "Mobile").length,
                        color: "text-green-400",
                        bgColor: "from-green-500/10 to-green-500/20",
                        borderColor: "border-green-500/30",
                      },
                      {
                        category: "Backend",
                        icon: <Server size={32} />,
                        count: data.skills.filter((s) => s.category === "Backend").length,
                        color: "text-purple-400",
                        bgColor: "from-purple-500/10 to-purple-500/20",
                        borderColor: "border-purple-500/30",
                      },
                      {
                        category: "DevOps",
                        icon: <Shield size={32} />,
                        count: data.skills.filter(
                          (s) => s.category === "DevOps" || s.category === "Cloud" || s.category === "Tools",
                        ).length,
                        color: "text-orange-400",
                        bgColor: "from-orange-500/10 to-orange-500/20",
                        borderColor: "border-orange-500/30",
                      },
                    ].map((category, index) => (
                      <Card
                        key={index}
                        className={`glass-card hover:scale-105 transition-all duration-500 group bg-gradient-to-br ${category.bgColor} border ${category.borderColor}`}
                      >
                        <CardContent className="p-6 text-center">
                          <div
                            className={`${category.color} mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300`}
                          >
                            {category.icon}
                          </div>
                          <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-red-400 transition-colors">
                            {category.category}
                          </h3>
                          <div className={`text-3xl font-bold ${category.color} mb-2`}>{category.count}</div>
                          <div className="text-sm text-gray-400">Technologies</div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="py-20 px-4 section-bg-1">
            <div className="max-w-7xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-16">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                  <Rocket className="mr-2 text-blue-400" size={20} />
                  <span className="text-blue-400 font-semibold">Portfolio Showcase</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-bold animate-fadeInUp gradient-text-primary text-shadow">
                  My <span className="text-blue-400">Projects</span>
                </h2>
                <p className="text-xl text-gray-400 mt-4 max-w-2xl mx-auto">
                  A collection of my best work and creative solutions
                </p>
              </div>

              {!data.projects || data.projects.length === 0 ? (
                <div className="empty-state animate-scaleIn">
                  <div className="relative z-10">
                    <Rocket size={80} className="mx-auto mb-6 text-gray-400" />
                    <h3 className="text-2xl font-semibold text-white mb-4">No Projects Added Yet</h3>
                    <p className="text-gray-400 mb-8 max-w-md mx-auto">
                      Your amazing projects will be showcased here once you add them.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                  {data.projects.slice(0, 4).map((project, index) => (
                    <Card
                      key={project.id}
                      className={`glass-card hover:scale-105 transition-all duration-500 group ${
                        project.featured ? "md:col-span-2 lg:col-span-1" : ""
                      } animate-fadeInUp cursor-pointer border-red-500/20 hover:border-red-500/40`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardContent className="p-0">
                        <div className="relative overflow-hidden rounded-t-lg">
                          <img
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/80 transition-all duration-300"></div>
                          {project.featured && (
                            <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse flex items-center">
                              <Star size={14} className="mr-1" />
                              Featured
                            </div>
                          )}
                          <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                            <div className="flex items-center text-white/80 text-sm">
                              <Eye size={14} className="mr-1" />
                              {Math.floor(Math.random() * 1000) + 100}
                            </div>
                            <div className="flex items-center text-white/80 text-sm">
                              <Heart size={14} className="mr-1" />
                              {Math.floor(Math.random() * 50) + 10}
                            </div>
                          </div>
                        </div>

                        <div className="p-6">
                          <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-red-400 transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-gray-300 mb-4 text-sm leading-relaxed">{project.description}</p>

                          <div className="flex flex-wrap gap-2 mb-6">
                            {project.tech &&
                              project.tech.map((tech, techIndex) => (
                                <Badge
                                  key={techIndex}
                                  variant="outline"
                                  className="border-red-500/50 text-red-400 text-xs hover:bg-red-500/20 transition-all duration-300 bg-red-500/10"
                                >
                                  {tech}
                                </Badge>
                              ))}
                          </div>

                          <div className="flex gap-3">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleSocialClick(project.github, "github")
                              }}
                              className="btn-outline flex items-center gap-2 transition-all duration-300 hover:scale-105"
                            >
                              <Github size={16} />
                              Code
                            </Button>
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleSocialClick(project.demo, "demo")
                              }}
                              className="btn-primary flex items-center gap-2 transition-all duration-300 hover:scale-105 text-white"
                            >
                              <ExternalLink size={16} />
                              Demo
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              <div className="text-center mt-12">
                <Button
                  onClick={() => handleViewMore("projects")}
                  className="btn-primary px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-110 group relative overflow-hidden text-white"
                >
                  <span className="relative z-10 flex items-center">
                    <Code className="mr-3 group-hover:animate-bounce" size={24} />
                    View All Projects
                    <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" size={24} />
                  </span>
                </Button>
              </div>
            </div>
          </section>

          {/* Certificates Section */}
          <section id="certificates" className="py-20 px-4 section-bg-2">
            <div className="max-w-6xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-16">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
                  <Award className="mr-2 text-yellow-400" size={20} />
                  <span className="text-yellow-400 font-semibold">Achievements</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-bold animate-fadeInUp gradient-text-primary text-shadow">
                  My <span className="text-red-400">Certificates</span>
                </h2>
                <p className="text-xl text-gray-400 mt-4 max-w-2xl mx-auto">
                  Professional certifications and continuous learning journey
                </p>
              </div>

              {!data.certificates || data.certificates.length === 0 ? (
                <div className="empty-state animate-scaleIn">
                  <div className="relative z-10">
                    <Award size={80} className="mx-auto mb-6 text-gray-400" />
                    <h3 className="text-2xl font-semibold text-white mb-4">No Certificates Added Yet</h3>
                    <p className="text-gray-400 mb-8 max-w-md mx-auto">
                      Your professional certifications and achievements will be displayed here once you add them.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                  {data.certificates.slice(0, 4).map((cert, index) => (
                    <Card
                      key={cert.id}
                      className="glass-card hover:scale-105 transition-all duration-500 group animate-fadeInUp border-yellow-500/20 hover:border-yellow-500/40"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardContent className="p-0">
                        <div className="relative overflow-hidden rounded-t-lg">
                          <img
                            src={cert.image || "/placeholder.svg"}
                            alt={cert.title}
                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/80 transition-all duration-300"></div>
                          <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                            <Award size={16} className="mr-1" />
                            Certified
                          </div>
                          <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                            <span className="text-white text-sm">{cert.date}</span>
                          </div>
                        </div>

                        <div className="p-6">
                          <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-red-400 transition-colors">
                            {cert.title}
                          </h3>
                          <div className="flex items-center text-blue-400 mb-3">
                            <GraduationCap size={16} className="mr-2" />
                            {cert.issuer}
                          </div>
                          <div className="flex items-center text-gray-400 mb-4">
                            <Calendar size={16} className="mr-2" />
                            {cert.date}
                          </div>
                          <p className="text-gray-300 text-sm mb-4 leading-relaxed">{cert.description}</p>
                          <div className="text-xs text-gray-500 bg-gray-800/50 rounded px-2 py-1 inline-block">
                            <span className="font-mono">ID: {cert.credentialId}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              <div className="text-center mt-12">
                <Button
                  onClick={() => handleViewMore("certificates")}
                  className="btn-primary px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-110 group relative overflow-hidden text-white"
                >
                  <span className="relative z-10 flex items-center">
                    <Award className="mr-3 group-hover:animate-bounce" size={24} />
                    View All Certificates
                    <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" size={24} />
                  </span>
                </Button>
              </div>
            </div>
          </section>

          {/* Blog Section */}
          <section id="blog" className="py-20 px-4 section-bg-3">
            <div className="max-w-6xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-16">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
                  <BookOpen className="mr-2 text-purple-400" size={20} />
                  <span className="text-purple-400 font-semibold">Thoughts & Insights</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-bold animate-fadeInUp gradient-text-primary text-shadow">
                  My <span className="text-blue-400">Blog</span>
                </h2>
                <p className="text-xl text-gray-400 mt-4 max-w-2xl mx-auto">
                  Sharing knowledge, tutorials, and insights from my development journey
                </p>
              </div>

              {!data.blogPosts || data.blogPosts.length === 0 ? (
                <div className="empty-state animate-scaleIn">
                  <div className="relative z-10">
                    <BookOpen size={80} className="mx-auto mb-6 text-gray-400" />
                    <h3 className="text-2xl font-semibold text-white mb-4">No Blog Posts Yet</h3>
                    <p className="text-gray-400 mb-8 max-w-md mx-auto">
                      Your thoughts, tutorials, and insights will be shared here once you start writing.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {data.blogPosts.slice(0, 3).map((post, index) => (
                    <Card
                      key={post.id}
                      className="glass-card hover:scale-105 transition-all duration-500 group animate-fadeInUp cursor-pointer border-purple-500/20 hover:border-purple-500/40"
                      style={{ animationDelay: `${index * 0.1}s` }}
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
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/80 transition-all duration-300"></div>
                          {post.featured && (
                            <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse flex items-center">
                              <Star size={14} className="mr-1" />
                              Featured
                            </div>
                          )}
                          <div className="absolute bottom-4 left-4 flex items-center space-x-3">
                            <div className="flex items-center text-white/80 text-sm bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                              <Clock size={14} className="mr-1" />
                              {post.readTime} min
                            </div>
                            <div className="flex items-center text-white/80 text-sm bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                              <Eye size={14} className="mr-1" />
                              {Math.floor(Math.random() * 500) + 50}
                            </div>
                          </div>
                        </div>

                        <div className="p-6">
                          <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-purple-400 transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-gray-300 mb-4 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags &&
                              post.tags.slice(0, 3).map((tag, tagIndex) => (
                                <Badge
                                  key={tagIndex}
                                  variant="outline"
                                  className="border-purple-500/50 text-purple-400 text-xs hover:bg-purple-500/20 transition-all duration-300 bg-purple-500/10"
                                >
                                  #{tag}
                                </Badge>
                              ))}
                          </div>

                          <div className="flex items-center justify-between text-sm text-gray-400">
                            <div className="flex items-center">
                              <Calendar size={14} className="mr-1" />
                              {new Date(post.publishDate).toLocaleDateString()}
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center">
                                <MessageCircle size={14} className="mr-1" />
                                {Math.floor(Math.random() * 20) + 1}
                              </div>
                              <div className="flex items-center">
                                <Share2 size={14} className="mr-1" />
                                {Math.floor(Math.random() * 10) + 1}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              <div className="text-center mt-12">
                <Button
                  onClick={() => handleViewMore("blog")}
                  className="btn-primary px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-110 group relative overflow-hidden text-white"
                >
                  <span className="relative z-10 flex items-center">
                    <BookOpen className="mr-3 group-hover:animate-bounce" size={24} />
                    Read All Posts
                    <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" size={24} />
                  </span>
                </Button>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-20 px-4 section-bg-1">
            <div className="max-w-4xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-16">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
                  <Mail className="mr-2 text-green-400" size={20} />
                  <span className="text-green-400 font-semibold">Let's Connect</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-bold animate-fadeInUp gradient-text-primary text-shadow">
                  Get In <span className="text-red-400">Touch</span>
                </h2>
                <p className="text-xl text-gray-400 mt-4 max-w-2xl mx-auto">
                  Ready to start your next project? Let's discuss how we can work together
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div className="animate-slideInLeft">
                  <div className="glass-card rounded-3xl p-8 hover:scale-105 transition-all duration-500">
                    <h3 className="text-3xl font-semibold mb-8 text-white flex items-center">
                      <Heart className="mr-3 text-red-400 animate-pulse" size={32} />
                      Let&apos;s Connect!
                    </h3>

                    <div className="space-y-6">
                      <p className="text-gray-300 text-lg leading-relaxed">
                        I&apos;m always excited to discuss new opportunities, collaborate on interesting projects, or
                        just have a chat about technology and development.
                      </p>

                      <div className="space-y-4">
                        <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-red-500/10 to-blue-500/10 rounded-lg hover:from-red-500/20 hover:to-blue-500/20 transition-all duration-300 border border-red-500/20">
                          <Mail className="text-red-400" size={24} />
                          <div>
                            <div className="text-white font-semibold">Email</div>
                            <div className="text-gray-400">dhyeyvisodiya@gmail.com</div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-500/10 to-red-500/10 rounded-lg hover:from-blue-500/20 hover:to-red-500/20 transition-all duration-300 border border-blue-500/20">
                          <MapPin className="text-blue-400" size={24} />
                          <div>
                            <div className="text-white font-semibold">Location</div>
                            <div className="text-gray-400">Available for Remote Work</div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-500/10 to-purple-500/10 rounded-lg hover:from-green-500/20 hover:to-purple-500/20 transition-all duration-300 border border-green-500/20">
                          <Users className="text-green-400" size={24} />
                          <div>
                            <div className="text-white font-semibold">Response Time</div>
                            <div className="text-gray-400">Usually within 24 hours</div>
                          </div>
                        </div>
                      </div>

                      {/* Social Links */}
                      <div className="pt-6">
                        <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                          <Sparkles className="mr-2 text-yellow-400" size={20} />
                          Follow Me
                        </h4>
                        <div className="flex space-x-4">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleSocialClick(socialLinks.github, "github")}
                            className="rounded-full hover:bg-red-500/20 hover:text-red-400 transition-all duration-300 hover:scale-110"
                          >
                            <Github size={20} />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleSocialClick(socialLinks.linkedin, "linkedin")}
                            className="rounded-full hover:bg-blue-500/20 hover:text-blue-400 transition-all duration-300 hover:scale-110"
                          >
                            <Linkedin size={20} />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleSocialClick(socialLinks.twitter, "twitter")}
                            className="rounded-full hover:bg-cyan-500/20 hover:text-cyan-400 transition-all duration-300 hover:scale-110"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                            </svg>
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleSocialClick(socialLinks.instagram, "instagram")}
                            className="rounded-full hover:bg-pink-500/20 hover:text-pink-400 transition-all duration-300 hover:scale-110"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                            </svg>
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleSocialClick(socialLinks.email, "email")}
                            className="rounded-full hover:bg-green-500/20 hover:text-green-400 transition-all duration-300 hover:scale-110"
                          >
                            <Mail size={20} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="animate-slideInRight">
                  <div className="glass-card rounded-3xl p-8 hover:scale-105 transition-all duration-500">
                    <h3 className="text-3xl font-semibold mb-8 text-white flex items-center">
                      <Send className="mr-3 text-blue-400" size={32} />
                      Send a Message
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-white font-medium mb-2">
                          Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your name"
                          className="bg-background/50 border-red-500/30 focus:border-red-500/50 text-white placeholder:text-gray-500"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-white font-medium mb-2">
                          Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Your email address"
                          className="bg-background/50 border-red-500/30 focus:border-red-500/50 text-white placeholder:text-gray-500"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-white font-medium mb-2">
                          Message
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Your message"
                          className="bg-background/50 border-red-500/30 focus:border-red-500/50 text-white placeholder:text-gray-500 min-h-[150px]"
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="btn-primary w-full py-6 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 group relative overflow-hidden text-white"
                      >
                        <span className="relative z-10 flex items-center justify-center">
                          {isLoading ? (
                            <>
                              <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="mr-3 group-hover:translate-x-1 transition-transform" size={24} />
                              Send Message
                            </>
                          )}
                        </span>
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Resume Section */}
          <section id="resume" className="py-20 px-4 section-bg-2">
            <div className="max-w-4xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-16">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                  <FileText className="mr-2 text-blue-400" size={20} />
                  <span className="text-blue-400 font-semibold">Professional Summary</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-bold animate-fadeInUp gradient-text-primary text-shadow">
                  My <span className="text-blue-400">Resume</span>
                </h2>
                <p className="text-xl text-gray-400 mt-4 max-w-2xl mx-auto">
                  Download my resume to learn more about my skills and experience
                </p>
              </div>

              <div className="glass-card rounded-3xl p-8 hover:scale-105 transition-all duration-500 animate-fadeInUp">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-3xl font-semibold mb-6 text-white flex items-center">
                      <FileText className="mr-3 text-blue-400" size={32} />
                      Professional Resume
                    </h3>
                    <p className="text-gray-300 mb-8 leading-relaxed">
                      My resume provides a comprehensive overview of my professional experience, skills, education, and
                      achievements. Download it to learn more about my qualifications and how I can contribute to your
                      projects.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      {data.resume ? (
                        <Button
                          onClick={handleDownloadResume}
                          className="btn-primary px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 group relative overflow-hidden text-white"
                        >
                          <span className="relative z-10 flex items-center">
                            <Download className="mr-3 group-hover:animate-bounce" size={24} />
                            Download Resume
                          </span>
                        </Button>
                      ) : (
                        <div className="text-gray-400 flex items-center">
                          <FileText className="mr-2" size={20} />
                          No resume available yet
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="relative w-64 h-80 bg-gradient-to-br from-blue-500/20 to-red-500/20 rounded-xl border border-blue-500/30 flex items-center justify-center">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <FileText size={100} className="text-blue-400/50" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center p-6">
                        <div className="text-center">
                          <h4 className="text-xl font-semibold text-white mb-2">Resume</h4>
                          <p className="text-sm text-gray-400">
                            {data.resume ? data.resume.filename : "Not available"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-20 px-4 section-bg-3">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  {
                    icon: <Cpu size={32} />,
                    value: data.projects?.length || 0,
                    label: "Projects",
                    color: "text-red-400",
                    bgColor: "from-red-500/10 to-red-500/20",
                    borderColor: "border-red-500/30",
                  },
                  {
                    icon: <Layers size={32} />,
                    value: data.skills?.length || 0,
                    label: "Skills",
                    color: "text-blue-400",
                    bgColor: "from-blue-500/10 to-blue-500/20",
                    borderColor: "border-blue-500/30",
                  },
                  {
                    icon: <TrendingUp size={32} />,
                    value: data.experiences?.length || 0,
                    label: "Years Experience",
                    color: "text-green-400",
                    bgColor: "from-green-500/10 to-green-500/20",
                    borderColor: "border-green-500/30",
                  },
                  {
                    icon: <Award size={32} />,
                    value: data.certificates?.length || 0,
                    label: "Certificates",
                    color: "text-yellow-400",
                    bgColor: "from-yellow-500/10 to-yellow-500/20",
                    borderColor: "border-yellow-500/30",
                  },
                ].map((stat, index) => (
                  <Card
                    key={index}
                    className={`glass-card hover:scale-110 transition-all duration-500 group bg-gradient-to-br ${stat.bgColor} border ${stat.borderColor} animate-fadeInUp`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6 text-center">
                      <div
                        className={`${stat.color} mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300`}
                      >
                        {stat.icon}
                      </div>
                      <div className={`text-4xl font-bold ${stat.color} mb-2`}>{stat.value}+</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="py-12 px-4 relative overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12">
              <div>
                <div
                  className="text-3xl font-bold gradient-text-primary cursor-pointer mb-6 animate-pulse"
                  onClick={() => scrollToSection("hero")}
                >
                  {"<DV/>"}
                </div>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Passionate app developer and software engineer creating innovative digital solutions.
                </p>
                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleSocialClick(socialLinks.github, "github")}
                    className="rounded-full hover:bg-red-500/20 hover:text-red-400 transition-all duration-300"
                  >
                    <Github size={18} />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleSocialClick(socialLinks.linkedin, "linkedin")}
                    className="rounded-full hover:bg-blue-500/20 hover:text-blue-400 transition-all duration-300"
                  >
                    <Linkedin size={18} />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleSocialClick(socialLinks.twitter, "twitter")}
                    className="rounded-full hover:bg-cyan-500/20 hover:text-cyan-400 transition-all duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-6">Quick Links</h3>
                <ul className="space-y-3">
                  {[
                    { name: "Home", id: "hero" },
                    { name: "About", id: "about" },
                    { name: "Experience", id: "experience" },
                    { name: "Skills", id: "skills" },
                    { name: "Projects", id: "projects" },
                    { name: "Blog", id: "blog" },
                    { name: "Contact", id: "contact" },
                  ].map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className="text-gray-400 hover:text-red-400 transition-colors duration-300 flex items-center"
                      >
                        <ArrowRight size={14} className="mr-2" />
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-6">Contact Info</h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <Mail className="text-red-400 mt-1 flex-shrink-0" size={18} />
                    <span className="text-gray-400">dhyeyvisodiya@gmail.com</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <MapPin className="text-blue-400 mt-1 flex-shrink-0" size={18} />
                    <span className="text-gray-400">Available for Remote Work</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-500 text-sm mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} Dhyey Visodiya. All rights reserved.
              </div>
              <div className="text-gray-500 text-sm">
                Designed & Developed with <Heart size={14} className="inline text-red-500 animate-pulse" /> by Dhyey
                Visodiya
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  )
}
