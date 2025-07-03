"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Award, ArrowLeft } from "lucide-react"
import { useStore } from "@/lib/store"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import Link from "next/link"

export default function CertificatesPage() {
  const { certificates } = useStore()
  const { ref, isVisible } = useScrollAnimation()

  return (
    <main className="min-h-screen bg-black relative">
      <Navigation />

      <section className="py-20 pt-32" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`mb-16 ${isVisible ? "fade-in-up" : "scroll-animate"}`}>
            <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">All Certificates</h1>
            <p className="text-lg text-gray-400 max-w-2xl">
              Professional certifications and achievements that validate my expertise across various technologies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {certificates.map((cert, index) => (
              <Card
                key={cert.id}
                className={`bg-gray-800/50 border-gray-700 card-hover ${
                  isVisible ? `fade-in-up stagger-${(index % 4) + 1}` : "scroll-animate"
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Award className="h-6 w-6 text-yellow-500" />
                      <div>
                        <CardTitle className="text-white text-lg">{cert.title}</CardTitle>
                        <p className="text-purple-400 font-medium">{cert.issuer}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-green-500 text-green-400">
                      {cert.date}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Credential ID</p>
                      <p className="text-gray-300 font-mono text-sm">{cert.credentialId}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} className="bg-blue-600/20 text-blue-400 border-blue-600/30">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent hover:border-green-500 transition-all duration-300"
                      asChild
                    >
                      <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Verify Certificate
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {certificates.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-gray-400 mb-4">No certificates yet</h3>
              <p className="text-gray-500">Check back soon for new certifications!</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
