"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, Award, Calendar, GraduationCap, Filter, ExternalLink } from "lucide-react"
import { dataManager, type Certificate } from "@/lib/data-manager"
import { analytics } from "@/lib/analytics"

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [filteredCertificates, setFilteredCertificates] = useState<Certificate[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIssuer, setSelectedIssuer] = useState<string | null>(null)
  const [allIssuers, setAllIssuers] = useState<string[]>([])

  useEffect(() => {
    const data = dataManager.getData()
    setCertificates(data.certificates)
    setFilteredCertificates(data.certificates)

    // Extract all unique issuers
    const issuers = Array.from(new Set(data.certificates.map((cert) => cert.issuer)))
    setAllIssuers(issuers)

    analytics.trackPageView("/certificates")
  }, [])

  useEffect(() => {
    let filtered = certificates

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (cert) =>
          cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cert.credentialId.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by selected issuer
    if (selectedIssuer) {
      filtered = filtered.filter((cert) => cert.issuer === selectedIssuer)
    }

    setFilteredCertificates(filtered)
  }, [searchQuery, selectedIssuer, certificates])

  const handleIssuerClick = (issuer: string) => {
    setSelectedIssuer(selectedIssuer === issuer ? null : issuer)
  }

  const handleCertificateClick = (cert: Certificate) => {
    analytics.trackProjectView(cert.title)
    if (cert.url) {
      window.open(cert.url, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-900/10 via-white to-purple-900/10 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <Button
            onClick={() => window.history.back()}
            variant="ghost"
            className="mb-8 text-red-500 hover:bg-red-500/20"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Portfolio
          </Button>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-black via-red-500 to-black bg-clip-text text-transparent">
            My <span className="text-red-500">Certificates</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Professional certifications and achievements that demonstrate my expertise and commitment to continuous
            learning in technology.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search certificates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/50 border-red-500/30 focus:border-red-500"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setSelectedIssuer(null)
              }}
              className="border-red-500/30 text-red-500 hover:bg-red-500/20 bg-transparent"
            >
              <Filter size={16} className="mr-2" />
              Clear Filters
            </Button>
          </div>

          {/* Issuer Tags */}
          <div className="flex flex-wrap gap-2">
            {allIssuers.map((issuer) => (
              <Badge
                key={issuer}
                variant={selectedIssuer === issuer ? "default" : "outline"}
                className={`cursor-pointer transition-all duration-300 ${
                  selectedIssuer === issuer
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "border-red-500/50 text-red-400 hover:bg-red-500/20"
                }`}
                onClick={() => handleIssuerClick(issuer)}
              >
                {issuer}
              </Badge>
            ))}
          </div>
        </div>

        {/* Certificates Grid */}
        {filteredCertificates.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-2xl font-semibold text-black mb-2">No certificates found</h3>
            <p className="text-gray-600">
              {searchQuery || selectedIssuer
                ? "Try adjusting your search or filter criteria."
                : "Certificates will be displayed here once added."}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCertificates.map((cert, index) => (
              <Card
                key={cert.id}
                className="glass-card border border-red-500/20 hover:border-red-500/40 transition-all duration-500 hover:scale-105 group cursor-pointer animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleCertificateClick(cert)}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={cert.image || "/placeholder.svg"}
                      alt={cert.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 left-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                      <Award size={16} className="mr-1" />
                      Certified
                    </div>
                    {cert.url && (
                      <div className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ExternalLink size={16} />
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-black group-hover:text-red-500 transition-colors line-clamp-2">
                      {cert.title}
                    </h3>
                    <div className="flex items-center text-red-400 mb-3">
                      <GraduationCap size={16} className="mr-2" />
                      {cert.issuer}
                    </div>
                    <div className="flex items-center text-gray-600 mb-4">
                      <Calendar size={16} className="mr-2" />
                      {cert.date}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">{cert.description}</p>
                    <div className="text-xs text-gray-500 bg-gray-100 p-2 rounded">
                      <span className="font-medium">Credential ID:</span> {cert.credentialId}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Certificate Stats */}
        {certificates.length > 0 && (
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <Card className="glass-card border border-red-500/20 text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-red-500 mb-2">{certificates.length}</div>
                <div className="text-sm text-gray-600">Total Certificates</div>
              </CardContent>
            </Card>
            <Card className="glass-card border border-blue-500/20 text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-blue-500 mb-2">{allIssuers.length}</div>
                <div className="text-sm text-gray-600">Certification Bodies</div>
              </CardContent>
            </Card>
            <Card className="glass-card border border-green-500/20 text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-green-500 mb-2">
                  {new Date().getFullYear() - Math.min(...certificates.map((c) => Number.parseInt(c.date)))}+
                </div>
                <div className="text-sm text-gray-600">Years of Learning</div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
