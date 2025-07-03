import { Card, CardContent } from "@/components/ui/card"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function About() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="about" className="py-20 bg-gray-900/20 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 ${isVisible ? "fade-in-up" : "scroll-animate"}`}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 gradient-text">About Me</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Passionate developer with expertise in creating scalable applications and innovative solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`${isVisible ? "fade-in-left" : "scroll-animate"}`}>
            {/* Profile Photo */}
            <div className="mb-8 flex justify-center md:justify-start">
              <div className="w-64 h-64 rounded-2xl overflow-hidden shadow-2xl border-4 border-gradient-to-r from-red-500 to-blue-500 p-1">
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center">
                  <img
                    src="/placeholder.svg?height=240&width=240"
                    alt="Dhyey Visodiya"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-6 text-glow">My Journey</h3>
            <p className="text-gray-400 mb-4">
              I'm a dedicated software engineer with a passion for creating innovative digital solutions. My journey in
              technology began with curiosity and has evolved into expertise across multiple domains.
            </p>
            <p className="text-gray-400 mb-4">
              I specialize in full-stack development, mobile applications, and modern web technologies. My goal is to
              bridge the gap between complex technical requirements and user-friendly experiences.
            </p>
            <p className="text-gray-400">
              When I'm not coding, I enjoy exploring new technologies, contributing to open-source projects, and sharing
              knowledge with the developer community.
            </p>
          </div>

          <Card
            className={`bg-gray-800/50 border-gray-700 card-hover ${isVisible ? "fade-in-right" : "scroll-animate"}`}
          >
            <CardContent className="p-6">
              <h4 className="text-xl font-semibold text-white mb-4 text-glow">Quick Facts</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-red-500/10 to-blue-500/10 rounded-lg">
                  <span className="text-gray-400">Experience</span>
                  <span className="text-white font-bold">3+ Years</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg">
                  <span className="text-gray-400">Projects Completed</span>
                  <span className="text-white font-bold">50+</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-500/10 to-red-500/10 rounded-lg">
                  <span className="text-gray-400">Technologies</span>
                  <span className="text-white font-bold">15+</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-red-500/10 to-blue-500/10 rounded-lg">
                  <span className="text-gray-400">Certifications</span>
                  <span className="text-white font-bold">8</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
