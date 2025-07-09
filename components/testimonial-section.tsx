"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star, Quote, Users, TrendingUp, Award } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Content Marketing Director",
    company: "TechFlow Inc.",
    avatar: "SC",
    rating: 5,
    quote:
      "AI Creative Studio has revolutionized our content creation process. What used to take hours now takes minutes, and the quality is consistently exceptional.",
    metrics: { productivity: "+340%", quality: "98%", satisfaction: "5/5" },
    color: "from-blue-500 to-blue-600",
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "Senior Full-Stack Developer",
    company: "InnovateLabs",
    avatar: "MR",
    rating: 5,
    quote:
      "The code generation capabilities are mind-blowing. It's like having a senior developer pair programming with you 24/7.",
    metrics: { productivity: "+280%", quality: "96%", satisfaction: "5/5" },
    color: "from-green-500 to-green-600",
  },
  {
    id: 3,
    name: "Dr. Emily Watson",
    role: "Research Scientist",
    company: "DataVision Research",
    avatar: "EW",
    rating: 5,
    quote:
      "Document analysis has never been this efficient. The AI understands context and nuance in ways that constantly surprise me.",
    metrics: { productivity: "+420%", quality: "94%", satisfaction: "5/5" },
    color: "from-purple-500 to-purple-600",
  },
]

const stats = [
  { icon: Users, value: "50K+", label: "Active Users", color: "text-blue-600" },
  { icon: TrendingUp, value: "2.4M+", label: "Content Created", color: "text-green-600" },
  { icon: Star, value: "4.9/5", label: "Average Rating", color: "text-yellow-600" },
  { icon: Award, value: "98%", label: "Satisfaction Rate", color: "text-purple-600" },
]

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      }, 5000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAutoPlaying])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section
      ref={sectionRef}
      className="px-4 sm:px-6 lg:px-8 py-16 lg:py-32 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-64 lg:w-96 h-64 lg:h-96 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 lg:w-96 h-64 lg:h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-20">
          <h2
            className={`text-responsive-2xl font-black mb-4 lg:mb-6 tracking-tighter transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <span className="text-black">TRUSTED BY</span>
            <br />
            <span className="text-orange-500">CREATORS</span>
          </h2>
          <div
            className={`w-24 lg:w-32 h-1 lg:h-2 bg-black mx-auto mb-6 lg:mb-8 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
          />
          <p
            className={`text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Join thousands of creators, developers, and innovators who trust AI Creative Studio
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 mb-12 lg:mb-20">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className={`bg-white/80 backdrop-blur border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${600 + index * 100}ms` }}
            >
              <CardContent className="p-4 lg:p-8 text-center">
                <stat.icon className={`w-8 lg:w-12 h-8 lg:h-12 mx-auto mb-3 lg:mb-4 ${stat.color}`} />
                <div className={`text-2xl lg:text-4xl font-black mb-2 ${stat.color}`}>{stat.value}</div>
                <div className="text-xs lg:text-sm text-gray-600 uppercase tracking-wider font-bold">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Testimonial */}
        <div className="relative">
          <Card className="bg-white border-0 shadow-2xl overflow-hidden">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2">
                {/* Testimonial Content */}
                <div className="p-8 lg:p-16">
                  <div className="mb-6 lg:mb-8">
                    <Quote className="w-8 lg:w-12 h-8 lg:h-12 text-orange-500 mb-4 lg:mb-6" />
                    <blockquote className="text-xl lg:text-2xl xl:text-3xl leading-relaxed text-gray-800 font-light mb-6 lg:mb-8">
                      "{currentTestimonial.quote}"
                    </blockquote>

                    {/* Rating */}
                    <div className="flex items-center mb-4 lg:mb-6">
                      {[...Array(currentTestimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 lg:w-6 h-5 lg:h-6 text-yellow-500 fill-current" />
                      ))}
                    </div>

                    {/* Author */}
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-12 lg:w-16 h-12 lg:h-16 rounded-full bg-gradient-to-br ${currentTestimonial.color} flex items-center justify-center text-white font-black text-lg lg:text-xl`}
                      >
                        {currentTestimonial.avatar}
                      </div>
                      <div>
                        <div className="text-lg lg:text-xl font-black text-gray-900">{currentTestimonial.name}</div>
                        <div className="text-gray-600 font-medium text-sm lg:text-base">{currentTestimonial.role}</div>
                        <div className="text-gray-500 text-sm">{currentTestimonial.company}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Metrics Panel */}
                <div className={`bg-gradient-to-br ${currentTestimonial.color} p-8 lg:p-16 text-white`}>
                  <h3 className="text-2xl lg:text-3xl font-black mb-6 lg:mb-8 tracking-tight">IMPACT METRICS</h3>

                  <div className="space-y-6 lg:space-y-8">
                    <div>
                      <div className="text-3xl lg:text-5xl font-black mb-2">
                        {currentTestimonial.metrics.productivity}
                      </div>
                      <div className="text-white/80 uppercase tracking-wider text-sm font-bold">
                        Productivity Increase
                      </div>
                    </div>

                    <div>
                      <div className="text-3xl lg:text-5xl font-black mb-2">{currentTestimonial.metrics.quality}</div>
                      <div className="text-white/80 uppercase tracking-wider text-sm font-bold">Quality Score</div>
                    </div>

                    <div>
                      <div className="text-3xl lg:text-5xl font-black mb-2">
                        {currentTestimonial.metrics.satisfaction}
                      </div>
                      <div className="text-white/80 uppercase tracking-wider text-sm font-bold">User Satisfaction</div>
                    </div>
                  </div>

                  {/* Progress Bars */}
                  <div className="mt-8 lg:mt-12 space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Efficiency</span>
                        <span>98%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div className="bg-white h-2 rounded-full w-[98%] transition-all duration-1000" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Innovation</span>
                        <span>95%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div className="bg-white h-2 rounded-full w-[95%] transition-all duration-1000" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Collaboration</span>
                        <span>97%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div className="bg-white h-2 rounded-full w-[97%] transition-all duration-1000" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-6 lg:mt-8">
            <Button
              onClick={goToPrevious}
              variant="outline"
              size="lg"
              className="border-2 border-gray-300 hover:border-orange-500 hover:text-orange-500 bg-transparent"
            >
              <ChevronLeft className="w-4 lg:w-5 h-4 lg:h-5 mr-1 lg:mr-2" />
              <span className="hidden sm:inline">Previous</span>
            </Button>

            {/* Dots Indicator */}
            <div className="flex space-x-2 lg:space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 lg:w-4 h-3 lg:h-4 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-orange-500 scale-125" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={goToNext}
              variant="outline"
              size="lg"
              className="border-2 border-gray-300 hover:border-orange-500 hover:text-orange-500 bg-transparent"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 lg:w-5 h-4 lg:h-5 ml-1 lg:ml-2" />
            </Button>
          </div>

          {/* Auto-play Indicator */}
          <div className="flex items-center justify-center mt-4 lg:mt-6">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? "bg-green-500 animate-pulse" : "bg-gray-400"}`} />
              <span>{isAutoPlaying ? "Auto-playing" : "Paused"}</span>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 lg:mt-20">
          <div
            className={`transition-all duration-1000 delay-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <p className="text-gray-600 mb-6 text-base lg:text-lg">Ready to join thousands of satisfied creators?</p>
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 lg:px-12 py-4 lg:py-6 text-base lg:text-lg font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              START YOUR FREE TRIAL
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
