"use client"

import { useEffect, useState } from "react"

export function AnimatedBackground() {
  const [particles, setParticles] = useState<Array<{ id: number; left: number; delay: number; size: number }>>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const particleArray = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 15,
      size: Math.random() * 3 + 1,
    }))
    setParticles(particleArray)
  }, [])

  if (!mounted) return null

  return (
    <div className="animated-background">
      {/* Advanced Grid Background */}
      <div className="grid-background" />

      {/* Floating Geometric Shapes */}
      <div className="floating-shapes">
        <div className="shape shape-1 morphing-shape" />
        <div className="shape shape-2" />
        <div className="shape shape-3 morphing-shape" />
        <div className="shape shape-4" />
        <div className="shape shape-5 morphing-shape" />
      </div>

      {/* Advanced Particle System */}
      <div className="particles">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.left}%`,
              animationDelay: `${particle.delay}s`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
          />
        ))}
      </div>

      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse morphing-shape"></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse morphing-shape"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-purple-500/5 to-cyan-500/5 rounded-full blur-3xl animate-pulse morphing-shape"
        style={{ animationDelay: "4s" }}
      ></div>
    </div>
  )
}
