"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Target, Sparkles, Users, Zap, Shield } from "lucide-react"

const benefits = [
  {
    icon: Brain,
    title: "AI-POWERED",
    subtitle: "INTELLIGENCE",
    description: "Advanced neural networks that understand context and creativity",
    color: "from-purple-500 to-purple-600",
    delay: 0,
  },
  {
    icon: Target,
    title: "PRECISION",
    subtitle: "TARGETING",
    description: "Laser-focused results that match your exact requirements",
    color: "from-blue-500 to-blue-600",
    delay: 0.1,
  },
  {
    icon: Sparkles,
    title: "CREATIVE",
    subtitle: "EXCELLENCE",
    description: "Unleash unlimited creative potential with AI assistance",
    color: "from-green-500 to-green-600",
    delay: 0.2,
  },
  {
    icon: Users,
    title: "COLLABORATIVE",
    subtitle: "WORKFLOW",
    description: "Seamless team collaboration with intuitive tools",
    color: "from-orange-500 to-orange-600",
    delay: 0.3,
  },
  {
    icon: Zap,
    title: "LIGHTNING",
    subtitle: "FAST",
    description: "Get results in seconds, not hours or days",
    color: "from-yellow-500 to-yellow-600",
    delay: 0.4,
  },
  {
    icon: Shield,
    title: "ENTERPRISE",
    subtitle: "SECURITY",
    description: "Bank-level security with complete data privacy",
    color: "from-red-500 to-red-600",
    delay: 0.5,
  },
]

export default function BenefitsSection() {
  const [isVisible, setIsVisible] = useState(false)
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

  return (
    <section ref={sectionRef} className="px-4 sm:px-6 lg:px-8 py-16 lg:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-50 to-transparent opacity-50" />
        <div className="absolute top-1/4 right-1/4 w-64 lg:w-96 h-64 lg:h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 lg:mb-16">
          <h2
            className={`text-responsive-2xl font-black mb-4 lg:mb-6 tracking-tighter transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <span className="text-black">WHY CHOOSE</span>
            <br />
            <span className="text-orange-500">OUR PLATFORM</span>
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
            Experience the future of AI creativity with cutting-edge technology and intuitive design
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="group cursor-pointer"
              style={{
                animation: isVisible ? `fadeInUp 0.8s ease-out ${item.delay}s both` : "none",
              }}
            >
              <Card className="bg-white border-2 border-gray-100 rounded-2xl p-6 lg:p-8 h-full transition-all duration-500 hover:border-orange-200 hover:shadow-2xl hover:-translate-y-2 group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-orange-50">
                <CardContent className="p-0">
                  <div
                    className={`w-12 lg:w-16 h-12 lg:h-16 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-4 lg:mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
                  >
                    <item.icon className="w-6 lg:w-8 h-6 lg:h-8 text-white" />
                  </div>

                  <h3 className="text-lg lg:text-xl font-black tracking-tight mb-1 group-hover:text-orange-600 transition-colors">
                    {item.title}
                  </h3>
                  <h4 className="text-lg lg:text-xl font-black tracking-tight mb-3 lg:mb-4 group-hover:text-orange-600 transition-colors">
                    {item.subtitle}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
