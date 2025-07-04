"use client"

import { useEffect, useState } from "react"
import { Award, ExternalLink, Calendar } from "lucide-react"
import { SectionBackground } from "./section-background"
import { useStore } from "@/lib/store"

export function Certificates() {
  const { certificates } = useStore()
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

    const element = document.getElementById("certificates")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const defaultCertificates = [
    {
      id: 1,
      title: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023-08-15",
      credentialId: "AWS-SAA-2023-001",
      image: "/placeholder.svg?height=200&width=300",
      verificationUrl: "https://aws.amazon.com/verification/AWS-SAA-2023-001",
    },
    {
      id: 2,
      title: "Google Cloud Professional Developer",
      issuer: "Google Cloud",
      date: "2023-06-20",
      credentialId: "GCP-PD-2023-002",
      image: "/placeholder.svg?height=200&width=300",
      verificationUrl: "https://cloud.google.com/certification/verify/GCP-PD-2023-002",
    },
    {
      id: 3,
      title: "Meta React Native Specialist",
      issuer: "Meta",
      date: "2023-04-10",
      credentialId: "META-RN-2023-003",
      image: "/placeholder.svg?height=200&width=300",
      verificationUrl: "https://developers.facebook.com/certification/verify/META-RN-2023-003",
    },
    {
      id: 4,
      title: "MongoDB Certified Developer",
      issuer: "MongoDB University",
      date: "2023-02-28",
      credentialId: "MONGO-DEV-2023-004",
      image: "/placeholder.svg?height=200&width=300",
      verificationUrl: "https://university.mongodb.com/verify/MONGO-DEV-2023-004",
    },
    {
      id: 5,
      title: "Docker Certified Associate",
      issuer: "Docker Inc.",
      date: "2022-12-15",
      credentialId: "DOCKER-DCA-2022-005",
      image: "/placeholder.svg?height=200&width=300",
      verificationUrl: "https://docker.com/certification/verify/DOCKER-DCA-2022-005",
    },
    {
      id: 6,
      title: "Kubernetes Application Developer",
      issuer: "Cloud Native Computing Foundation",
      date: "2022-10-30",
      credentialId: "CKAD-2022-006",
      image: "/placeholder.svg?height=200&width=300",
      verificationUrl: "https://cncf.io/certification/verify/CKAD-2022-006",
    },
  ]

  const currentCertificates = certificates.length > 0 ? certificates : defaultCertificates

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    })
  }

  return (
    <section id="certificates" className="py-20 relative overflow-hidden bg-gray-900">
      <SectionBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
                Certifications & Achievements
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Professional certifications that validate my expertise and commitment to continuous learning
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto rounded-full mt-4"></div>
          </div>

          {/* Certificates Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentCertificates.map((cert, index) => (
              <div
                key={cert.id}
                className={`group bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-gray-600/50 transition-all duration-500 hover:transform hover:scale-105 ${
                  isVisible ? "animate-fadeInUp" : ""
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Certificate Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={cert.image || "/placeholder.svg"}
                    alt={cert.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>

                  {/* Award Icon */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-gradient-to-r from-red-500 to-blue-500 p-2 rounded-full">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

                {/* Certificate Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-500 transition-colors duration-300">
                    {cert.title}
                  </h3>

                  <p className="text-red-500 font-semibold mb-3">{cert.issuer}</p>

                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(cert.date)}</span>
                  </div>

                  <div className="text-xs text-gray-500 mb-4">ID: {cert.credentialId}</div>

                  {/* Verification Link */}
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors duration-200 font-semibold text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Verify Certificate
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
              <div className="text-3xl font-bold text-red-500 mb-2">{currentCertificates.length}+</div>
              <div className="text-gray-400">Certifications</div>
            </div>
            <div className="text-center bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
              <div className="text-3xl font-bold text-blue-500 mb-2">5+</div>
              <div className="text-gray-400">Cloud Platforms</div>
            </div>
            <div className="text-center bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
              <div className="text-3xl font-bold text-green-500 mb-2">10+</div>
              <div className="text-gray-400">Technologies</div>
            </div>
            <div className="text-center bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
              <div className="text-3xl font-bold text-purple-500 mb-2">3+</div>
              <div className="text-gray-400">Years Learning</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
