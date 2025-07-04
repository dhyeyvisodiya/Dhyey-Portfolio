"use client"

import { useState, useEffect } from "react"
import { ChevronDown, Github, Linkedin, Mail, ExternalLink } from "lucide-react"

export function Hero() {
  const [currentText, setCurrentText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const texts = [
    "App Developer",
    "Software Engineer",
    "Full Stack Developer",
    "React Native Expert",
    "UI/UX Enthusiast",
  ]

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const current = texts[currentIndex]

        if (isDeleting) {
          setCurrentText(current.substring(0, currentText.length - 1))
          if (currentText === "") {
            setIsDeleting(false)
            setCurrentIndex((prev) => (prev + 1) % texts.length)
          }
        } else {
          setCurrentText(current.substring(0, currentText.length + 1))
          if (currentText === current) {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        }
      },
      isDeleting ? 50 : 100,
    )

    return () => clearTimeout(timeout)
  }, [currentText, currentIndex, isDeleting, texts])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="home" className="min-h-screen pt-30 flex items-center justify-center relative overflow-hidden bg-black">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 h-full w-full overflow-hidden z-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Main Content */}
        <div className="space-y-8 animate-fadeInUp">
          {/* Greeting */}
          <div className="space-y-2">
            <p className="text-lg sm:text-xl text-gray-400 animate-fadeInUp delay-200">Hello, I'm</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white animate-fadeInUp delay-400">
              <span className="bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                Dhyey Visodiya
              </span>
            </h1>
          </div>

          {/* Typing Animation */}
          <div className="h-16 flex items-center justify-center animate-fadeInUp delay-600">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-300">
              I'm a <span className="text-red-500 border-r-2 border-red-500 animate-blink">{currentText}</span>
            </h2>
          </div>

          {/* Description */}
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed animate-fadeInUp delay-800">
            Passionate about crafting exceptional digital experiences with modern technologies. Specializing in React
            Native, Next.js, and full-stack development.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeInUp delay-1000">
            <button
              onClick={() => scrollToSection("#projects")}
              className="group bg-gradient-to-r from-red-500 to-blue-500 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25 flex items-center gap-2"
            >
              View My Work
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <button
              onClick={() => scrollToSection("#contact")}
              className="group border-2 border-gray-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:border-white hover:bg-white hover:text-black hover:scale-105 flex items-center gap-2"
            >
              Get In Touch
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            </button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 animate-fadeInUp delay-1200">
            <a
              href="https://github.com/dhyeyvisodiya"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-125 hover:-translate-y-1"
            >
              <Github className="w-8 h-8" />
            </a>
            <a
              href="https://linkedin.com/in/dhyeyvisodiya"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-all duration-300 hover:scale-125 hover:-translate-y-1"
            >
              <Linkedin className="w-8 h-8" />
            </a>
            <a
              href="mailto:dhyeyvisodiya@gmail.com"
              className="text-gray-400 hover:text-red-500 transition-all duration-300 hover:scale-125 hover:-translate-y-1"
            >
              <Mail className="w-8 h-8" />
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={() => scrollToSection("#about")}
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <ChevronDown className="w-8 h-8" />
          </button>
        </div>
      </div>
    </section>
  )
}
