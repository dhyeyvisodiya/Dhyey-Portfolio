"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useStore } from "@/lib/store"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function Skills() {
  const { skills } = useStore()
  const { ref, isVisible } = useScrollAnimation()

  const skillCategories = [
    { title: "Frontend", color: "red", skills: skills.filter((s) => s.category === "Frontend") },
    { title: "Backend", color: "purple", skills: skills.filter((s) => s.category === "Backend") },
    { title: "Mobile", color: "blue", skills: skills.filter((s) => s.category === "Mobile") },
    { title: "Tools & Cloud", color: "green", skills: skills.filter((s) => s.category === "Tools") },
  ]

  const getColorClasses = (color: string) => {
    switch (color) {
      case "red":
        return "bg-red-600/20 text-red-400 border-red-600/30 hover:bg-red-600/30"
      case "purple":
        return "bg-purple-600/20 text-purple-400 border-purple-600/30 hover:bg-purple-600/30"
      case "blue":
        return "bg-blue-600/20 text-blue-400 border-blue-600/30 hover:bg-blue-600/30"
      case "green":
        return "bg-green-600/20 text-green-400 border-green-600/30 hover:bg-green-600/30"
      default:
        return "bg-gray-600/20 text-gray-400 border-gray-600/30 hover:bg-gray-600/30"
    }
  }

  return (
    <section id="skills" className="py-20 bg-gray-900/20" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 ${isVisible ? "fade-in-up" : "scroll-animate"}`}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 gradient-text">Skills & Technologies</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <Card
              key={index}
              className={`bg-gray-800/50 border-gray-700 card-hover ${
                isVisible ? `scale-in stagger-${index + 1}` : "scroll-animate"
              }`}
            >
              <CardHeader>
                <CardTitle className="text-white text-center">{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 justify-center">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge
                      key={skill.id}
                      className={`${getColorClasses(category.color)} transition-all duration-300 hover:scale-105 cursor-pointer`}
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
