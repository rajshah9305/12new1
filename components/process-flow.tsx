"use client"

import { Button } from "@/components/ui/button"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Target, PenTool, Sparkles, ArrowRight, CheckCircle } from "lucide-react"

const processSteps = [
  {
    id: "choose",
    icon: Target,
    step: "01",
    title: "CHOOSE STUDIO",
    subtitle: "Select Your Environment",
    description: "Pick from four specialized AI environments tailored to your creative needs",
    details: ["Browse studio capabilities", "View real-time demos", "Check compatibility", "Access documentation"],
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
  },
  {
    id: "input",
    icon: PenTool,
    step: "02",
    title: "INPUT PROMPT",
    subtitle: "Describe Your Vision",
    description: "Provide detailed instructions using natural language or structured prompts",
    details: ["Natural language input", "Template suggestions", "Context awareness", "Multi-modal support"],
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    textColor: "text-green-600",
  },
  {
    id: "generate",
    icon: Sparkles,
    step: "03",
    title: "GENERATE & REFINE",
    subtitle: "AI Magic Happens",
    description: "Watch as AI processes your request and generates high-quality results instantly",
    details: ["Real-time processing", "Quality optimization", "Iterative refinement", "Export options"],
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    textColor: "text-orange-600",
  },
]

export default function ProcessFlow() {
  const [activeStep, setActiveStep] = useState<string | null>(null)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Simulate step completion animation
          processSteps.forEach((step, index) => {
            setTimeout(
              () => {
                setCompletedSteps((prev) => [...prev, step.id])
              },
              (index + 1) * 800,
            )
          })
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
    <section ref={sectionRef} className="px-4 sm:px-6 lg:px-8 py-16 lg:py-32 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-64 lg:w-96 h-64 lg:h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-64 lg:w-96 h-64 lg:h-96 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-20">
          <h2
            className={`text-responsive-2xl font-black mb-4 lg:mb-6 tracking-tighter transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <span className="text-black">HOW IT</span>
            <br />
            <span className="text-orange-500">WORKS</span>
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
            Three simple steps to transform your ideas into reality with AI-powered creativity
          </p>
        </div>

        {/* Process Flow */}
        <div className="relative">
          {/* Connection Lines - Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent transform -translate-y-1/2 z-0" />

          {/* Animated Flow Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px transform -translate-y-1/2 z-10">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-green-500 to-orange-500 transition-all duration-3000 ease-out"
              style={{
                width: isVisible ? "100%" : "0%",
                transitionDelay: "1s",
              }}
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 relative z-20">
            {processSteps.map((step, index) => (
              <div
                key={step.id}
                className={`transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${600 + index * 200}ms` }}
              >
                <Card
                  className={`h-full cursor-pointer transition-all duration-500 border-2 hover:shadow-2xl hover:-translate-y-2 ${
                    activeStep === step.id
                      ? `${step.bgColor} border-2 ${step.textColor.replace("text-", "border-")} shadow-xl scale-105`
                      : completedSteps.includes(step.id)
                        ? "bg-white border-green-200 shadow-lg"
                        : "bg-white border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                >
                  <CardContent className="p-6 lg:p-8 text-center relative">
                    {/* Step Number */}
                    <div
                      className={`absolute -top-4 lg:-top-6 left-1/2 transform -translate-x-1/2 w-10 lg:w-12 h-10 lg:h-12 rounded-full flex items-center justify-center text-white font-black text-base lg:text-lg transition-all duration-500 ${
                        completedSteps.includes(step.id) ? "bg-green-500" : `bg-gradient-to-br ${step.color}`
                      }`}
                    >
                      {completedSteps.includes(step.id) ? <CheckCircle className="w-5 lg:w-6 h-5 lg:h-6" /> : step.step}
                    </div>

                    {/* Icon */}
                    <div
                      className={`w-16 lg:w-20 h-16 lg:h-20 mx-auto rounded-2xl flex items-center justify-center mb-4 lg:mb-6 transition-all duration-300 ${
                        activeStep === step.id
                          ? `bg-gradient-to-br ${step.color} scale-110 rotate-3`
                          : completedSteps.includes(step.id)
                            ? "bg-green-500"
                            : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      <step.icon
                        className={`w-8 lg:w-10 h-8 lg:h-10 ${
                          activeStep === step.id || completedSteps.includes(step.id) ? "text-white" : "text-gray-600"
                        }`}
                      />
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <div>
                        <h3
                          className={`text-xl lg:text-2xl font-black tracking-tight mb-2 ${
                            activeStep === step.id ? step.textColor : "text-black"
                          }`}
                        >
                          {step.title}
                        </h3>
                        <h4 className="text-base lg:text-lg font-bold text-gray-600 mb-3 lg:mb-4">{step.subtitle}</h4>
                        <p className="text-gray-600 leading-relaxed text-sm lg:text-base">{step.description}</p>
                      </div>

                      {/* Expanded Details */}
                      {activeStep === step.id && (
                        <div className="space-y-4 pt-4 lg:pt-6 border-t border-gray-200">
                          <h5 className={`font-bold uppercase tracking-wider text-sm ${step.textColor}`}>
                            KEY FEATURES
                          </h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-3">
                            {step.details.map((detail, detailIndex) => (
                              <div key={detailIndex} className="flex items-center space-x-2 text-sm">
                                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${step.color}`} />
                                <span className="text-gray-700">{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Progress Indicator */}
                    {completedSteps.includes(step.id) && (
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="w-full bg-green-100 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                            style={{ width: "100%" }}
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Arrow Connector (Desktop) */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:flex justify-center mt-8">
                    <ArrowRight
                      className={`w-6 lg:w-8 h-6 lg:h-8 transition-all duration-500 ${
                        completedSteps.includes(step.id) ? "text-green-500" : "text-gray-400"
                      }`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 lg:mt-20">
          <div
            className={`transition-all duration-1000 delay-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <p className="text-gray-600 mb-6 text-base lg:text-lg">Ready to experience the future of AI creativity?</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-orange-500 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-lg font-bold uppercase tracking-wider hover:shadow-lg transition-all duration-300 hover:scale-105">
                START YOUR JOURNEY
              </Button>
              <Button
                variant="outline"
                className="w-full sm:w-auto border-2 border-gray-300 text-gray-700 hover:border-orange-500 hover:text-orange-500 px-6 lg:px-8 py-3 lg:py-4 rounded-lg font-bold uppercase tracking-wider transition-all duration-300 bg-transparent"
              >
                WATCH DEMO
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
