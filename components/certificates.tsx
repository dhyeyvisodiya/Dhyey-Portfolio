"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useStore } from "@/lib/store"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import Link from "next/link"
import { useEffect } from "react"

export function Certificates() {
  const { certificates, fetchData } = useStore()
  const { ref, isVisible } = useScrollAnimation()
  const featuredCertificates = certificates.slice(0, 4)

  // Ensure we have fresh data
  useEffect(() => {
    if (certificates.length === 0) {
      fetchData()
    }
  }, [certificates.length, fetchData])

  return (
    <section id="certificates" className="py-20 bg-gray-900/20 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 ${isVisible ? "fade-in-up" : "scroll-animate"}`}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 gradient-text">Certificates</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Professional certifications and achievements that validate my expertise. ({certificates.length} total)
          </p>
        </div>

        {featuredCertificates.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {featuredCertificates.map((cert, index) => (
                <Card
                  key={cert.id}
                  className={`bg-gray-800/50 border-gray-700 card-hover ${
                    isVisible ? `fade-in-up stagger-${index + 1}` : "scroll-animate"
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

                      {cert.verifyUrl && (
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
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className={`text-center ${isVisible ? "fade-in-up stagger-5" : "scroll-animate"}`}>
              <Link href="/certificates">
                <Button className="gradient-bg text-white px-8 py-3 hover:scale-105 transition-transform duration-300">
                  View All Certificates ({certificates.length})
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-gray-400 mb-4">No certificates yet</h3>
            <p className="text-gray-500">Certificates will appear here once added through the admin panel.</p>
          </div>
        )}
      </div>
    </section>
  )
}
