"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Sparkles, Zap, Users, Shield, CheckCircle } from "lucide-react"

const features = [
  { icon: Zap, text: "Instant AI Generation" },
  { icon: Users, text: "Team Collaboration" },
  { icon: Shield, text: "Enterprise Security" },
  { icon: Sparkles, text: "Advanced Features" },
]

export default function CTASection() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLDivElement>(null)

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

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (rect) {
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      })
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative px-4 sm:px-6 lg:px-8 py-16 lg:py-32 bg-black text-white overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div
          className="absolute w-64 lg:w-96 h-64 lg:h-96 bg-orange-500/20 rounded-full blur-3xl transition-all duration-1000"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          className="absolute w-64 lg:w-96 h-64 lg:h-96 bg-blue-500/10 rounded-full blur-3xl transition-all duration-1500"
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

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Main CTA Content */}
        <div className="text-center mb-12 lg:mb-16">
          <h2
            className={`text-responsive-2xl font-black mb-6 lg:mb-8 tracking-tighter transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            READY TO TRANSFORM
            <br />
            <span className="text-orange-500">YOUR CREATIVE PROCESS?</span>
          </h2>

          <div
            className={`w-24 lg:w-32 h-1 lg:h-2 bg-orange-500 mx-auto mb-8 lg:mb-12 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
          />

          <p
            className={`text-lg lg:text-2xl xl:text-3xl mb-12 lg:mb-16 text-gray-300 font-light max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Join thousands of creators using AI to bring ideas to life with unprecedented speed and quality
          </p>

          {/* Feature Highlights */}
          <div
            className={`grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12 lg:mb-16 transition-all duration-1000 delay-600 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3 p-3 lg:p-4 bg-white/5 backdrop-blur rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${800 + index * 100}ms` }}
              >
                <feature.icon className="w-5 lg:w-6 h-5 lg:h-6 text-orange-500" />
                <span className="text-xs lg:text-sm font-bold uppercase tracking-wider text-center sm:text-left">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-6 mb-12 lg:mb-16 transition-all duration-1000 delay-800 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-12 lg:px-16 py-6 lg:py-8 text-lg lg:text-xl font-black uppercase tracking-wider transition-all duration-300 hover:scale-110 hover:shadow-2xl group"
            >
              START CREATING NOW
              <ArrowRight className="ml-3 lg:ml-4 w-5 lg:w-6 h-5 lg:h-6 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-2 border-white/30 text-white hover:bg-white/10 hover:border-white px-12 lg:px-16 py-6 lg:py-8 text-lg lg:text-xl font-black uppercase tracking-wider transition-all duration-300 hover:scale-110 backdrop-blur bg-transparent"
            >
              WATCH DEMO
            </Button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div
          className={`transition-all duration-1000 delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Card className="bg-white/5 backdrop-blur border border-white/10">
            <CardContent className="p-6 lg:p-8">
              <div className="grid sm:grid-cols-3 gap-6 lg:gap-8 text-center">
                <div>
                  <div className="flex items-center justify-center mb-3 lg:mb-4">
                    <CheckCircle className="w-6 lg:w-8 h-6 lg:h-8 text-green-500 mr-2 lg:mr-3" />
                    <span className="text-xl lg:text-2xl font-black text-green-500">FREE</span>
                  </div>
                  <p className="text-gray-300 text-sm lg:text-base">
                    <strong>14-day free trial</strong>
                    <br />
                    No credit card required
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-center mb-3 lg:mb-4">
                    <Shield className="w-6 lg:w-8 h-6 lg:h-8 text-blue-500 mr-2 lg:mr-3" />
                    <span className="text-xl lg:text-2xl font-black text-blue-500">SECURE</span>
                  </div>
                  <p className="text-gray-300 text-sm lg:text-base">
                    <strong>Enterprise-grade security</strong>
                    <br />
                    GDPR compliant & encrypted
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-center mb-3 lg:mb-4">
                    <Users className="w-6 lg:w-8 h-6 lg:h-8 text-purple-500 mr-2 lg:mr-3" />
                    <span className="text-xl lg:text-2xl font-black text-purple-500">TRUSTED</span>
                  </div>
                  <p className="text-gray-300 text-sm lg:text-base">
                    <strong>50,000+ creators</strong>
                    <br />
                    4.9/5 satisfaction rating
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Final Stats */}
        <div
          className={`grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-12 lg:mt-16 pt-12 lg:pt-16 border-t border-white/10 transition-all duration-1000 delay-1200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {[
            { value: "2.4M+", label: "Content Generated" },
            { value: "150ms", label: "Average Response" },
            { value: "99.9%", label: "Uptime" },
            { value: "24/7", label: "Support" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl lg:text-4xl xl:text-5xl font-black text-orange-500 mb-2 animate-float">
                {stat.value}
              </div>
              <div className="text-gray-400 uppercase tracking-wide text-xs lg:text-sm font-bold">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll to Top Indicator */}
      <div className="absolute bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex flex-col items-center space-y-2 text-white/60 hover:text-white transition-colors group"
        >
          <div className="w-px h-8 lg:h-12 bg-white/30 group-hover:bg-white/60 transition-colors" />
          <span className="text-xs uppercase tracking-wider font-bold">Back to top</span>
        </button>
      </div>
    </section>
  )
}
