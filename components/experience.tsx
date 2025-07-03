"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useStore } from "@/lib/store"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function Experience() {
  const { experiences } = useStore()
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="experience" className="py-20 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 ${isVisible ? "fade-in-up" : "scroll-animate"}`}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 gradient-text">Experience</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            My professional journey and the roles that shaped my expertise.
          </p>
        </div>

        {experiences.length > 0 ? (
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <Card
                key={exp.id}
                className={`bg-gray-800/50 border-gray-700 card-hover ${isVisible ? `fade-in-up stagger-${index + 1}` : "scroll-animate"}`}
              >
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <CardTitle className="text-white text-xl">{exp.title}</CardTitle>
                      <p className="text-red-500 font-medium">{exp.company}</p>
                    </div>
                    <Badge variant="outline" className="border-purple-500 text-purple-400 w-fit">
                      {exp.period}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} className="bg-blue-600/20 text-blue-400 border-blue-600/30">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-gray-400 mb-4">No experience added yet</h3>
            <p className="text-gray-500">Experience will appear here once added through the admin panel.</p>
          </div>
        )}
      </div>
    </section>
  )
}
