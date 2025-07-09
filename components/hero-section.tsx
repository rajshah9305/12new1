"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div
          className="absolute w-96 h-96 bg-orange-500/20 rounded-full blur-3xl transition-all duration-1000"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl transition-all duration-1500"
          style={{
            left: `${100 - mousePosition.x}%`,
            top: `${100 - mousePosition.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 h-full">
            {[...Array(144)].map((_, i) => (
              <div key={i} className="border border-white/10 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-6 lg:space-y-8">
          {/* Main Title */}
          <div
            className={`space-y-2 lg:space-y-4 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-responsive-3xl font-black leading-none tracking-tighter text-white">
              <div className="transform transition-transform duration-300">AI</div>
              <div className="transform transition-transform duration-300">CREATIVE</div>
              <div className="text-orange-500 relative">
                STUDIO
                <div className="absolute -bottom-2 lg:-bottom-4 left-0 w-full h-2 lg:h-3 bg-orange-500" />
              </div>
            </h1>
          </div>

          {/* Subtitle */}
          <div
            className={`max-w-4xl mx-auto transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-gray-300 leading-relaxed font-light">
              Transform your creative process with AI-powered tools for content generation, code development, and
              intelligent analysis
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-6 pt-6 lg:pt-8 transition-all duration-1000 delay-600 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Button
              size="lg"
              className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-8 lg:px-12 py-4 lg:py-6 text-base lg:text-lg font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              START CREATING
              <ArrowRight className="ml-2 lg:ml-3 w-5 h-5 lg:w-6 lg:h-6" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-black px-8 lg:px-12 py-4 lg:py-6 text-base lg:text-lg font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 bg-transparent"
            >
              WATCH DEMO
              <Play className="ml-2 lg:ml-3 w-5 h-5 lg:w-6 lg:h-6" />
            </Button>
          </div>

          {/* Stats */}
          <div
            className={`grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 pt-12 lg:pt-16 border-t border-gray-700 transition-all duration-1000 delay-900 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {[
              { value: "2.4M+", label: "CONTENT GENERATED" },
              { value: "150MS", label: "AVG RESPONSE TIME" },
              { value: "99.9%", label: "UPTIME" },
              { value: "50K+", label: "ACTIVE USERS" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-orange-500 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 uppercase tracking-wide text-xs sm:text-sm font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center space-y-2 text-white/60 animate-bounce">
          <span className="text-xs uppercase tracking-wider font-bold">Scroll to explore</span>
          <div className="w-px h-8 lg:h-12 bg-white/30" />
        </div>
      </div>
    </section>
  )
}
