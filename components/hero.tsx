"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"

export function Hero() {
  const [mounted, setMounted] = useState(false)
  const [typedText, setTypedText] = useState("")
  const fullText = "Crafting Digital Experiences"

  useEffect(() => {
    setMounted(true)

    // Typing animation
    let i = 0
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [])

  if (!mounted) return null

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Enhanced animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-60"></div>
        <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-blue-500 rounded-full animate-pulse opacity-40"></div>
        <div className="absolute top-1/2 left-3/4 w-2.5 h-2.5 bg-purple-500 rounded-full animate-bounce opacity-50"></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-red-400 rounded-full animate-ping opacity-30"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-50"></div>

        {/* Floating orbs */}
        <div className="absolute top-20 left-20 w-20 h-20 bg-gradient-to-r from-red-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-r from-purple-500/20 to-red-500/20 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="hero-card rounded-2xl p-8 md:p-12">
          {/* Avatar */}
          <div className="mb-8 fade-in-up">
            <div className="w-32 h-32 mx-auto rounded-full avatar-gradient p-1 float-animation pulse-glow">
              <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                <span className="text-4xl font-bold text-red-500 scale-in text-glow">{"<DV/>"}</span>
              </div>
            </div>
          </div>

          {/* Name with enhanced animation */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-4 hero-text-reveal stagger-1">
            <span className="text-white">Dhyey </span>
            <span className="gradient-text text-glow">Visodiya</span>
          </h1>

          {/* Title */}
          <h2 className="text-xl sm:text-2xl mb-6 fade-in-up stagger-2">
            <span className="text-red-500 text-glow">App Developer</span>
            <span className="text-white"> & </span>
            <span className="text-blue-500 text-glow">Software Engineer</span>
          </h2>

          {/* Animated Tagline */}
          <p className="text-yellow-400 text-lg mb-6 fade-in-up stagger-3">
            ✨ {typedText}
            <span className="typing-cursor">|</span> ✨
          </p>

          {/* Description */}
          <p className="text-gray-400 text-lg max-w-3xl mx-auto mb-8 leading-relaxed fade-in-up stagger-4">
            Passionate about creating innovative mobile and web applications with cutting-edge technologies.
            Transforming ideas into scalable, user-centric solutions that make a difference.
          </p>

          {/* Enhanced Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 fade-in-up stagger-5">
            <Button
              className="gradient-bg text-white px-8 py-3 text-lg font-medium rounded-full hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              🚀 Explore My Work
            </Button>
            <div className="gradient-border rounded-full hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-blue-500/25">
              <div className="gradient-border-inner">
                <button
                  className="text-white font-medium"
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                >
                  💖 Let's Connect
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Scroll indicator */}
          <div className="flex flex-col items-center text-gray-500 fade-in-up stagger-6">
            <span className="text-sm mb-2">Scroll to explore</span>
            <ChevronDown className="h-5 w-5 animate-bounce text-red-400" />
          </div>
        </div>
      </div>
    </section>
  )
}
