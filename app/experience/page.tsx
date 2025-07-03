"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Calendar, MapPin, Building, Trophy, Target } from "lucide-react"
import { dataManager, type Experience } from "@/lib/data-manager"
import { analytics } from "@/lib/analytics"

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([])

  useEffect(() => {
    const data = dataManager.getData()
    setExperiences(data.experiences)
    analytics.trackPageView("/experience")
  }, [])

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
            My <span className="text-red-500">Experience</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            A comprehensive overview of my professional journey, key achievements, and the impact I've made in various
            roles.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {experiences.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">💼</div>
            <h3 className="text-2xl font-semibold text-black mb-2">No experience data available</h3>
            <p className="text-gray-600">Experience information will be displayed here once added.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <Card
                key={exp.id}
                className="glass-card border border-red-500/20 hover:border-red-500/40 transition-all duration-500 hover:scale-105 group animate-fadeInUp"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="md:col-span-1">
                      <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        {exp.logo}
                      </div>
                      <div className="text-red-500 font-semibold text-lg flex items-center mb-2">
                        <Calendar size={16} className="mr-2" />
                        {exp.period}
                      </div>
                      <div className="text-gray-600 flex items-center">
                        <MapPin size={16} className="mr-2" />
                        {exp.location}
                      </div>
                    </div>

                    <div className="md:col-span-3">
                      <h3 className="text-2xl font-bold text-black mb-2 group-hover:text-red-500 transition-colors">
                        {exp.title}
                      </h3>
                      <h4 className="text-xl text-red-400 mb-4 flex items-center">
                        <Building size={20} className="mr-2" />
                        {exp.company}
                      </h4>
                      <p className="text-gray-600 mb-6 leading-relaxed">{exp.description}</p>

                      <div className="space-y-2">
                        <h5 className="text-lg font-semibold text-black mb-3 flex items-center">
                          <Trophy size={20} className="mr-2 text-yellow-500" />
                          Key Achievements
                        </h5>
                        <div className="grid md:grid-cols-2 gap-3">
                          {exp.achievements.map((achievement, achIndex) => (
                            <div
                              key={achIndex}
                              className="flex items-start space-x-3 p-3 bg-red-500/10 rounded-lg hover:bg-red-500/20 transition-all duration-300"
                            >
                              <Target size={16} className="text-red-500 mt-1 flex-shrink-0" />
                              <span className="text-gray-600 text-sm">{achievement}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
