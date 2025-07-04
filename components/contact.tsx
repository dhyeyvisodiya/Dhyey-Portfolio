"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone, Github, Linkedin, Instagram } from "lucide-react"
import { useState } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { SectionBackground } from "./section-background"

export function Contact() {
  const { ref, isVisible } = useScrollAnimation()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("https://formspree.io/f/xjkrldvd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus("idle"), 5000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const socialLinks = [
    { icon: Github, href: "https://github.com/dhyeyvisodiya", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/dhyey-visodiya", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com/dhyey_visodiya", label: "Instagram" },
    { icon: Mail, href: "mailto:visodiyadhyey@gmail.com?subject=Portfolio Inquiry&body=Hi Dhyey,", label: "Mail" },
  ]

  return (
    <SectionBackground variant="dark">
      <section id="contact" className="py-20 bg-gray-900/20 relative" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${isVisible ? "fade-in-up" : "scroll-animate"}`}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 gradient-text">Get In Touch</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Let's discuss your next project or just say hello. I'm always open to new opportunities.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className={`space-y-8 ${isVisible ? "fade-in-left" : "scroll-animate"}`}>
              <div>
                <h3 className="text-2xl font-semibold text-white mb-4 text-glow">Let's work together</h3>
                <p className="text-gray-400 mb-6">
                  I'm currently available for freelance work and full-time opportunities. Feel free to reach out if
                  you'd like to collaborate!
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-red-500/10 to-blue-500/10 rounded-lg card-hover">
                  <Mail className="h-5 w-5 text-red-500" />
                  <span className="text-gray-300">visodiyadhyey@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg card-hover">
                  <Phone className="h-5 w-5 text-blue-500" />
                  <span className="text-gray-300">+91 9913191735</span>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-500/10 to-red-500/10 rounded-lg card-hover">
                  <MapPin className="h-5 w-5 text-purple-500" />
                  <span className="text-gray-300">Rajkot, Gujarat</span>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Follow me</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="icon"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent hover:border-red-500 transition-all duration-300 hover:scale-110 btn-advanced"
                      asChild
                    >
                      <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                        <social.icon className="h-5 w-5" />
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <Card
              className={`bg-gray-800/50 border-gray-700 card-hover backdrop-blur-sm ${isVisible ? "fade-in-right" : "scroll-animate"}`}
            >
              <CardHeader>
                <CardTitle className="text-white text-glow">Send me a message</CardTitle>
                <CardDescription className="text-gray-400">
                  Fill out the form below and I'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Input
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 transition-all duration-300 backdrop-blur-sm"
                        required
                      />
                    </div>
                    <div>
                      <Input
                        name="email"
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 transition-all duration-300 backdrop-blur-sm"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Input
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 transition-all duration-300 backdrop-blur-sm"
                      required
                    />
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 transition-all duration-300 backdrop-blur-sm"
                      required
                    />
                  </div>

                  {submitStatus === "success" && (
                    <div className="text-green-400 text-sm bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                      Message sent successfully! I'll get back to you soon.
                    </div>
                  )}
                  {submitStatus === "error" && (
                    <div className="text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                      Failed to send message. Please try again.
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full gradient-bg text-white hover:scale-105 transition-transform duration-300 btn-advanced"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="loading-spinner mr-2"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </SectionBackground>
  )
}
