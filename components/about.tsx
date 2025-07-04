"use client"

import { useEffect, useState } from "react"
import { Code, Coffee, Users, Award } from "lucide-react"
import { SectionBackground } from "./section-background"
import { useStore } from "@/lib/store"

export function About() {
  const { about } = useStore()
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

    const element = document.getElementById("about")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const stats = [
    { icon: Code, label: "Projects Completed", value: "50+" },
    { icon: Coffee, label: "Cups of Coffee", value: "1000+" },
    { icon: Users, label: "Happy Clients", value: "25+" },
    { icon: Award, label: "Years Experience", value: "3+" },
  ]

  const defaultAbout = {
    title: "About Me",
    description: `I'm a passionate App Developer and Software Engineer with over 3 years of experience in creating exceptional digital experiences. My journey began with a curiosity for technology and has evolved into a deep expertise in modern web and mobile development.

I specialize in React Native, Next.js, and full-stack development, with a strong focus on creating user-centric applications that solve real-world problems. I believe in writing clean, maintainable code and staying up-to-date with the latest industry trends and best practices.

When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through blog posts and community engagement.`,
    image: "/placeholder.svg?height=400&width=400",
  }

  const currentAbout = about || defaultAbout

  return (
    <section id="about" className="py-20 relative overflow-hidden bg-gray-900">
      <SectionBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
                {currentAbout.title}
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <div className="prose prose-lg text-gray-300 max-w-none">
                {currentAbout.description.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="mb-6 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Quick Facts */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <h3 className="text-xl font-semibold text-white mb-4">Quick Facts</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-300">🎓 Computer Science Graduate</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-300">📱 React Native Specialist</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-300">🌐 Full Stack Developer</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-300">☁️ Cloud Architecture Enthusiast</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Image & Stats */}
            <div className="space-y-8">
              {/* Profile Image */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-blue-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-gray-900 rounded-2xl p-4">
                  <img
                    src={currentAbout.image || "/placeholder.svg"}
                    alt="Dhyey Visodiya"
                    className="w-full h-80 object-cover rounded-xl"
                  />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={`bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 text-center group hover:bg-gray-700/50 transition-all duration-300 ${
                      isVisible ? "animate-fadeInUp" : ""
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <stat.icon className="w-8 h-8 text-red-500 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
