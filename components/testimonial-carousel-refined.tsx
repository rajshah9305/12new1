"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star, Quote, Users, TrendingUp, Award, ArrowRight } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Content Marketing Director",
    company: "TechFlow Inc.",
    avatar: "SC",
    rating: 5,
    quote:
      "AI Creative Studio has revolutionized our content creation process. What used to take hours now takes minutes, and the quality is consistently exceptional. The neural network visualizations are absolutely mesmerizing!",
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
      "The code generation capabilities are mind-blowing. It's like having a senior developer pair programming with you 24/7. The real-time collaboration features have transformed how our team works together.",
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
      "Document analysis has never been this efficient. The AI understands context and nuance in ways that constantly surprise me. It's become an indispensable tool for our research team.",
    metrics: { productivity: "+420%", quality: "94%", satisfaction: "5/5" },
    color: "from-purple-500 to-purple-600",
  },
  {
    id: 4,
    name: "James Thompson",
    role: "Creative Director",
    company: "Pixel Perfect Agency",
    avatar: "JT",
    rating: 5,
    quote:
      "The creative writing studio has unlocked new levels of storytelling for our campaigns. The AI understands brand voice and maintains consistency across all content. Absolutely game-changing!",
    metrics: { productivity: "+310%", quality: "97%", satisfaction: "5/5" },
    color: "from-orange-500 to-orange-600",
  },
  {
    id: 5,
    name: "Lisa Park",
    role: "Product Manager",
    company: "StartupHub",
    avatar: "LP",
    rating: 5,
    quote:
      "The voice interface and accessibility features make this platform inclusive for our entire team. The machine learning personalization adapts to each user's workflow perfectly.",
    metrics: { productivity: "+290%", quality: "95%", satisfaction: "5/5" },
    color: "from-pink-500 to-pink-600",
  },
]

const stats = [
  { icon: Users, value: "50K+", label: "Active Users", color: "text-blue-600" },
  { icon: TrendingUp, value: "2.4M+", label: "Content Created", color: "text-green-600" },
  { icon: Star, value: "4.9/5", label: "Average Rating", color: "text-yellow-600" },
  { icon: Award, value: "98%", label: "Satisfaction Rate", color: "text-purple-600" },
]

export default function TestimonialCarouselRefined() {
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
    <section ref={sectionRef} className="px-6 py-32 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2
            className={`text-7xl lg:text-8xl font-black mb-6 tracking-tighter transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <span className="text-black">TRUSTED BY</span>
            <br />
            <span className="text-orange-500">CREATORS</span>
          </h2>
          <div
            className={`w-32 h-2 bg-black mx-auto mb-8 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
          ></div>
          <p
            className={`text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Join thousands of creators, developers, and innovators who trust AI Creative Studio
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className={`bg-white/80 backdrop-blur border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${600 + index * 100}ms` }}
            >
              <CardContent className="p-8 text-center">
                <stat.icon className={`w-12 h-12 mx-auto mb-4 ${stat.color}`} />
                <div className={`text-4xl font-black mb-2 ${stat.color}`}>{stat.value}</div>
                <div className="text-sm text-gray-600 uppercase tracking-wider font-bold">{stat.label}</div>
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
                <div className="p-12 lg:p-16">
                  <div className="mb-8">
                    <Quote className="w-12 h-12 text-orange-500 mb-6" />
                    <blockquote className="text-2xl lg:text-3xl leading-relaxed text-gray-800 font-light mb-8">
                      "{currentTestimonial.quote}"
                    </blockquote>

                    {/* Rating */}
                    <div className="flex items-center mb-6">
                      {[...Array(currentTestimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 text-yellow-500 fill-current" />
                      ))}
                    </div>

                    {/* Author */}
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-16 h-16 rounded-full bg-gradient-to-br ${currentTestimonial.color} flex items-center justify-center text-white font-black text-xl`}
                      >
                        {currentTestimonial.avatar}
                      </div>
                      <div>
                        <div className="text-xl font-black text-gray-900">{currentTestimonial.name}</div>
                        <div className="text-gray-600 font-medium">{currentTestimonial.role}</div>
                        <div className="text-gray-500 text-sm">{currentTestimonial.company}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Metrics Panel */}
                <div className={`bg-gradient-to-br ${currentTestimonial.color} p-12 lg:p-16 text-white`}>
                  <h3 className="text-3xl font-black mb-8 tracking-tight">IMPACT METRICS</h3>

                  <div className="space-y-8">
                    <div>
                      <div className="text-5xl font-black mb-2">{currentTestimonial.metrics.productivity}</div>
                      <div className="text-white/80 uppercase tracking-wider text-sm font-bold">
                        Productivity Increase
                      </div>
                    </div>

                    <div>
                      <div className="text-5xl font-black mb-2">{currentTestimonial.metrics.quality}</div>
                      <div className="text-white/80 uppercase tracking-wider text-sm font-bold">Quality Score</div>
                    </div>

                    <div>
                      <div className="text-5xl font-black mb-2">{currentTestimonial.metrics.satisfaction}</div>
                      <div className="text-white/80 uppercase tracking-wider text-sm font-bold">User Satisfaction</div>
                    </div>
                  </div>

                  {/* Progress Bars */}
                  <div className="mt-12 space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Efficiency</span>
                        <span>98%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div className="bg-white h-2 rounded-full w-[98%] transition-all duration-1000"></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Innovation</span>
                        <span>95%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div className="bg-white h-2 rounded-full w-[95%] transition-all duration-1000"></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Collaboration</span>
                        <span>97%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div className="bg-white h-2 rounded-full w-[97%] transition-all duration-1000"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            <Button
              onClick={goToPrevious}
              variant="outline"
              size="lg"
              className="border-2 border-gray-300 hover:border-orange-500 hover:text-orange-500 bg-transparent"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </Button>

            {/* Dots Indicator */}
            <div className="flex space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
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
              Next
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Auto-play Indicator */}
          <div className="flex items-center justify-center mt-6">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div
                className={`w-2 h-2 rounded-full ${isAutoPlaying ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}
              ></div>
              <span>{isAutoPlaying ? "Auto-playing" : "Paused"}</span>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div
            className={`transition-all duration-1000 delay-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <p className="text-gray-600 mb-6 text-lg">Ready to join thousands of satisfied creators?</p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-12 py-6 text-lg font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              START YOUR FREE TRIAL
              <ArrowRight className="ml-3 w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
