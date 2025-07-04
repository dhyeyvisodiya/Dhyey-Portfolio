"use client"

import { useEffect, useState } from "react"
import { Code, Database, Smartphone, Cloud, Wrench, Palette } from "lucide-react"
import { SectionBackground } from "./section-background"
import { useStore } from "@/lib/store"

export function Skills() {
  const { skills } = useStore()
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

    const element = document.getElementById("skills")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const defaultSkills = [
    // Frontend
    { id: 1, name: "React", level: 95, category: "Frontend" },
    { id: 2, name: "Next.js", level: 90, category: "Frontend" },
    { id: 3, name: "TypeScript", level: 88, category: "Frontend" },
    { id: 4, name: "JavaScript", level: 95, category: "Frontend" },
    { id: 5, name: "HTML5", level: 98, category: "Frontend" },
    { id: 6, name: "CSS3", level: 92, category: "Frontend" },
    { id: 7, name: "Tailwind CSS", level: 90, category: "Frontend" },

    // Mobile
    { id: 8, name: "React Native", level: 93, category: "Mobile" },
    { id: 9, name: "Expo", level: 85, category: "Mobile" },
    { id: 10, name: "Flutter", level: 75, category: "Mobile" },

    // Backend
    { id: 11, name: "Node.js", level: 87, category: "Backend" },
    { id: 12, name: "Express.js", level: 85, category: "Backend" },
    { id: 13, name: "Python", level: 80, category: "Backend" },
    { id: 14, name: "MongoDB", level: 82, category: "Backend" },
    { id: 15, name: "PostgreSQL", level: 78, category: "Backend" },
    { id: 16, name: "Firebase", level: 88, category: "Backend" },

    // Cloud & Tools
    { id: 17, name: "AWS", level: 75, category: "Cloud" },
    { id: 18, name: "Docker", level: 70, category: "Tools" },
    { id: 19, name: "Git", level: 92, category: "Tools" },
    { id: 20, name: "Figma", level: 85, category: "Design" },
  ]

  const currentSkills = skills.length > 0 ? skills : defaultSkills

  const skillCategories = [
    { name: "Frontend", icon: Code, color: "from-red-500 to-pink-500" },
    { name: "Mobile", icon: Smartphone, color: "from-blue-500 to-cyan-500" },
    { name: "Backend", icon: Database, color: "from-green-500 to-emerald-500" },
    { name: "Cloud", icon: Cloud, color: "from-purple-500 to-violet-500" },
    { name: "Tools", icon: Wrench, color: "from-orange-500 to-yellow-500" },
    { name: "Design", icon: Palette, color: "from-pink-500 to-rose-500" },
  ]

  const groupedSkills = skillCategories
    .map((category) => ({
      ...category,
      skills: currentSkills.filter((skill) => skill.category === category.name),
    }))
    .filter((category) => category.skills.length > 0)

  return (
    <section id="skills" className="py-20 relative overflow-hidden bg-gray-900">
      <SectionBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
                Skills & Technologies
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The tools and technologies I use to bring ideas to life
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto rounded-full mt-4"></div>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {groupedSkills.map((category, categoryIndex) => (
              <div
                key={category.name}
                className={`bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group ${
                  isVisible ? "animate-fadeInUp" : ""
                }`}
                style={{ animationDelay: `${categoryIndex * 100}ms` }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-r ${category.color} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{category.name}</h3>
                </div>

                {/* Skills List */}
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.id} className="group/skill">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300 font-medium group-hover/skill:text-white transition-colors duration-200">
                          {skill.name}
                        </span>
                        <span className="text-sm text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${category.color} rounded-full transition-all duration-1000 ease-out`}
                          style={{
                            width: isVisible ? `${skill.level}%` : "0%",
                            transitionDelay: `${categoryIndex * 100 + skillIndex * 50}ms`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Skills Summary */}
          <div className="mt-16 text-center">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30">
              <h3 className="text-2xl font-bold text-white mb-4">Always Learning, Always Growing</h3>
              <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Technology evolves rapidly, and so do I. I'm constantly exploring new frameworks, tools, and
                methodologies to stay at the forefront of development. My passion for learning drives me to experiment
                with cutting-edge technologies and share knowledge with the developer community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
