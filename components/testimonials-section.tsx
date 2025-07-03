"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { dataManager, type Testimonial } from "@/lib/data-manager"

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const data = dataManager.getData()
    setTestimonials(data.testimonials)
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  if (testimonials.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">💬</div>
        <h3 className="text-2xl font-semibold text-foreground mb-2">No testimonials yet</h3>
        <p className="text-muted-foreground">Check back later for client testimonials and reviews.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Featured Testimonial Carousel */}
      <div className="relative">
        <Card className="glass-card border border-red-500/20 hover:border-red-500/40 transition-all duration-500">
          <CardContent className="p-8 text-center">
            <Quote size={48} className="text-red-500 mx-auto mb-6" />

            <blockquote className="text-xl text-muted-foreground leading-relaxed mb-8 italic">
              "{testimonials[currentIndex]?.content}"
            </blockquote>

            <div className="flex items-center justify-center mb-6">
              <img
                src={testimonials[currentIndex]?.image || "/placeholder.svg"}
                alt={testimonials[currentIndex]?.name}
                className="w-16 h-16 rounded-full mr-4 border-2 border-red-500/30"
                loading="lazy"
              />
              <div className="text-left">
                <h4 className="font-semibold text-foreground text-lg">{testimonials[currentIndex]?.name}</h4>
                <p className="text-muted-foreground">
                  {testimonials[currentIndex]?.role} at {testimonials[currentIndex]?.company}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={`${
                    i < (testimonials[currentIndex]?.rating || 0) ? "text-yellow-500 fill-current" : "text-gray-400"
                  } transition-colors duration-300`}
                />
              ))}
            </div>

            <div className="flex items-center justify-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={prevTestimonial}
                className="border-red-500/30 text-red-500 hover:bg-red-500/20 bg-transparent"
                disabled={testimonials.length <= 1}
              >
                <ChevronLeft size={16} />
              </Button>

              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? "bg-red-500 w-8" : "bg-red-500/30"
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={nextTestimonial}
                className="border-red-500/30 text-red-500 hover:bg-red-500/20 bg-transparent"
                disabled={testimonials.length <= 1}
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* All Testimonials Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card
            key={testimonial.id}
            className={`glass-card border transition-all duration-500 hover:scale-105 group animate-fadeInUp ${
              index === currentIndex ? "border-red-500/60 bg-red-500/5" : "border-red-500/20 hover:border-red-500/40"
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4 border-2 border-red-500/30"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-semibold text-foreground group-hover:text-red-500 transition-colors">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <Quote size={20} className="text-red-500 mb-2" />
                <p className="text-muted-foreground leading-relaxed text-sm italic line-clamp-4">
                  "{testimonial.content}"
                </p>
              </div>

              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={`${
                      i < testimonial.rating ? "text-yellow-500 fill-current" : "text-gray-400"
                    } transition-colors duration-300`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
