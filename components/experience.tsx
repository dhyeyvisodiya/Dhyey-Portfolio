"use client"

import { useEffect, useState } from "react"
import { Calendar, MapPin, ExternalLink } from "lucide-react"
import { SectionBackground } from "./section-background"
import { useStore } from "@/lib/store"

export function Experience() {
  const { experiences } = useStore()
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

    const element = document.getElementById("experience")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const defaultExperiences = [
    {
      id: 1,
      title: "Senior React Native Developer",
      company: "TechCorp Solutions",
      location: "San Francisco, CA",
      startDate: "2022-01-01",
      endDate: null,
      description:
        "Leading mobile app development using React Native, implementing complex features and mentoring junior developers. Built 5+ production apps with 100k+ downloads.",
      technologies: ["React Native", "TypeScript", "Redux", "Firebase", "AWS"],
      companyUrl: "https://techcorp.com",
    },
    {
      id: 2,
      title: "Full Stack Developer",
      company: "Digital Innovations Inc",
      location: "Remote",
      startDate: "2021-03-01",
      endDate: "2021-12-31",
      description:
        "Developed and maintained web applications using React, Node.js, and MongoDB. Collaborated with cross-functional teams to deliver high-quality software solutions.",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Docker"],
      companyUrl: "https://digitalinnovations.com",
    },
    {
      id: 3,
      title: "Frontend Developer",
      company: "StartupXYZ",
      location: "New York, NY",
      startDate: "2020-06-01",
      endDate: "2021-02-28",
      description:
        "Built responsive web applications and improved user experience. Worked closely with designers to implement pixel-perfect UI components.",
      technologies: ["React", "JavaScript", "CSS3", "Sass", "Webpack"],
      companyUrl: "https://startupxyz.com",
    },
  ]

  const currentExperiences = experiences.length > 0 ? experiences : defaultExperiences

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    })
  }

  return (
    <section id="experience" className="py-20 relative overflow-hidden bg-black">
      <SectionBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
                Experience
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              My professional journey and the amazing companies I've worked with
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto rounded-full mt-4"></div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-red-500 to-blue-500"></div>

            {/* Experience Items */}
            <div className="space-y-12">
              {currentExperiences.map((exp, index) => (
                <div
                  key={exp.id}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } ${isVisible ? "animate-fadeInUp" : ""}`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-gradient-to-r from-red-500 to-blue-500 rounded-full border-4 border-black z-10"></div>

                  {/* Content */}
                  <div className={`w-full md:w-5/12 ml-12 md:ml-0 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                    <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300 group hover:transform hover:scale-105">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white group-hover:text-red-500 transition-colors duration-300">
                            {exp.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <a
                              href={exp.companyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-red-500 font-semibold hover:text-red-400 transition-colors duration-200 flex items-center gap-1"
                            >
                              {exp.company}
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                        <div className="text-right text-sm text-gray-400">
                          <div className="flex items-center gap-1 mb-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Present"}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-300 mb-4 leading-relaxed">{exp.description}</p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-gray-800/50 text-gray-300 rounded-full text-sm border border-gray-700/50 hover:border-red-500/50 hover:text-red-400 transition-all duration-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
