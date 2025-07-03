"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown, Download, Mail, Github, Linkedin, Code, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

export function Hero() {
  const [mounted, setMounted] = useState(false)
  const [typedText, setTypedText] = useState("")
  const [currentRole, setCurrentRole] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [charIndex, setCharIndex] = useState(0)

  const roles = ["Full Stack Developer", "Mobile App Developer", "UI/UX Enthusiast", "Problem Solver", "Tech Innovator"]

  useEffect(() => {
    setMounted(true)
  }, [])

  // Enhanced typing animation
  useEffect(() => {
    if (!mounted) return

    const currentText = roles[currentRole]
    const typingSpeed = isDeleting ? 50 : 100
    const pauseTime = isDeleting ? 1000 : 2000

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < currentText.length) {
        setTypedText(currentText.slice(0, charIndex + 1))
        setCharIndex(charIndex + 1)
      } else if (isDeleting && charIndex > 0) {
        setTypedText(currentText.slice(0, charIndex - 1))
        setCharIndex(charIndex - 1)
      } else if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => setIsDeleting(true), pauseTime)
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false)
        setCurrentRole((prev) => (prev + 1) % roles.length)
      }
    }, typingSpeed)

    return () => clearTimeout(timer)
  }, [mounted, charIndex, isDeleting, currentRole, roles])

  if (!mounted) return null

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:100px_100px] animate-pulse"></div>

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-red-400 to-blue-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}

        {/* Large Gradient Orbs */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-500/5 to-cyan-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Code Symbols Animation */}
        <div
          className="absolute top-20 left-20 text-red-400/20 text-6xl font-mono animate-bounce"
          style={{ animationDelay: "0.5s" }}
        >
          {"{"}
        </div>
        <div
          className="absolute top-32 right-32 text-blue-400/20 text-4xl font-mono animate-bounce"
          style={{ animationDelay: "1s" }}
        >
          {"</>"}
        </div>
        <div
          className="absolute bottom-40 left-40 text-purple-400/20 text-5xl font-mono animate-bounce"
          style={{ animationDelay: "1.5s" }}
        >
          {"()"}
        </div>
        <div
          className="absolute bottom-20 right-20 text-green-400/20 text-3xl font-mono animate-bounce"
          style={{ animationDelay: "2s" }}
        >
          {"[]"}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="hero-card rounded-3xl p-8 md:p-16 backdrop-blur-xl bg-black/20 border border-white/10 shadow-2xl">
          {/* Enhanced Avatar with Multiple Rings */}
          <div className="mb-12 relative">
            <div className="relative mx-auto w-40 h-40 md:w-48 md:h-48">
              {/* Outer rotating ring */}
              <div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 animate-spin"
                style={{ animationDuration: "8s" }}
              >
                <div className="absolute inset-1 rounded-full bg-black"></div>
              </div>

              {/* Middle pulsing ring */}
              <div className="absolute inset-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse">
                <div className="absolute inset-1 rounded-full bg-black"></div>
              </div>

              {/* Inner content */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center shadow-inner">
                <div className="text-center">
                  <Code className="w-12 h-12 md:w-16 md:h-16 text-red-400 mx-auto mb-2 animate-pulse" />
                  <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-red-400 to-blue-400 bg-clip-text text-transparent">
                    DV
                  </span>
                </div>
              </div>

              {/* Floating icons around avatar */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center animate-bounce">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div
                className="absolute -bottom-2 -left-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center animate-bounce"
                style={{ animationDelay: "0.5s" }}
              >
                <Github className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Enhanced Name Animation */}
          <div className="mb-8">
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-4 relative">
              <span className="inline-block animate-fadeInUp text-white hover:scale-105 transition-transform duration-300">
                Dhyey
              </span>
              <span
                className="inline-block ml-4 bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-fadeInUp hover:scale-105 transition-transform duration-300"
                style={{ animationDelay: "0.2s" }}
              >
                Visodiya
              </span>
            </h1>

            {/* Dynamic Role with Enhanced Animation */}
            <div className="h-16 flex items-center justify-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
                <span className="text-gray-300">I'm a </span>
                <span className="bg-gradient-to-r from-red-400 to-blue-400 bg-clip-text text-transparent min-w-[300px] inline-block text-left">
                  {typedText}
                  <span className="animate-pulse text-red-400">|</span>
                </span>
              </h2>
            </div>
          </div>

          {/* Enhanced Description */}
          <div className="mb-12 max-w-4xl mx-auto">
            <p
              className="text-xl sm:text-2xl text-gray-300 leading-relaxed mb-6 animate-fadeInUp"
              style={{ animationDelay: "0.4s" }}
            >
              🚀 Crafting <span className="text-red-400 font-semibold">innovative digital experiences</span> with
              <span className="text-blue-400 font-semibold"> cutting-edge technologies</span>
            </p>
            <p className="text-lg text-gray-400 leading-relaxed animate-fadeInUp" style={{ animationDelay: "0.6s" }}>
              Passionate about transforming ideas into scalable, user-centric solutions that make a real impact. Let's
              build something amazing together! ✨
            </p>
          </div>

          {/* Enhanced Action Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-fadeInUp"
            style={{ animationDelay: "0.8s" }}
          >
            <Button
              className="group relative overflow-hidden bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-red-500/25 transform hover:scale-105 transition-all duration-300"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              <span className="relative z-10 flex items-center">
                <Code className="w-5 h-5 mr-2" />
                View My Work
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </Button>

            <Button
              variant="outline"
              className="group relative overflow-hidden border-2 border-blue-500 text-blue-400 hover:text-white px-8 py-4 text-lg font-semibold rounded-full bg-transparent hover:bg-blue-500 transform hover:scale-105 transition-all duration-300"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              <span className="relative z-10 flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                Let's Connect
              </span>
            </Button>

            <Button
              variant="outline"
              className="group relative overflow-hidden border-2 border-purple-500 text-purple-400 hover:text-white px-8 py-4 text-lg font-semibold rounded-full bg-transparent hover:bg-purple-500 transform hover:scale-105 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center">
                <Download className="w-5 h-5 mr-2" />
                Download CV
              </span>
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-12 animate-fadeInUp" style={{ animationDelay: "1s" }}>
            {[
              { icon: Github, href: "https://github.com/dhyeyvisodiya", color: "hover:text-gray-300" },
              { icon: Linkedin, href: "https://linkedin.com/in/dhyey-visodiya", color: "hover:text-blue-400" },
              { icon: Mail, href: "mailto:visodiyadhyey@gmail.com", color: "hover:text-red-400" },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-500 ${social.color} transform hover:scale-125 transition-all duration-300 p-3 rounded-full hover:bg-white/5`}
              >
                <social.icon className="w-6 h-6" />
              </a>
            ))}
          </div>

          {/* Enhanced Scroll Indicator */}
          <div className="flex flex-col items-center text-gray-500 animate-fadeInUp" style={{ animationDelay: "1.2s" }}>
            <span className="text-sm mb-3 animate-pulse">Discover More</span>
            <div className="flex flex-col items-center animate-bounce">
              <ChevronDown className="h-5 w-5 text-red-400 mb-1" />
              <ChevronDown className="h-4 w-4 text-blue-400 opacity-60" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) rotate(90deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
          75% {
            transform: translateY(-10px) rotate(270deg);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  )
}
