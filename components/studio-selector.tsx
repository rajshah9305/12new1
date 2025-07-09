"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code, FileText, Edit3, Tag, ArrowRight, Sparkles } from "lucide-react"

const studios = [
  {
    id: "text",
    icon: Tag,
    title: "TEXT",
    subtitle: "GENERATION",
    description: "Create compelling content, articles, and marketing copy with advanced AI text generation.",
    features: ["Marketing Copy", "Blog Articles", "Social Media", "Email Campaigns"],
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-600",
    demo: "Generate engaging blog post about AI creativity...",
    stats: { accuracy: "98%", speed: "2.3s", satisfaction: "4.9/5" },
  },
  {
    id: "code",
    icon: Code,
    title: "CODE",
    subtitle: "GENERATION",
    description: "Generate, debug, and optimize code across multiple programming languages.",
    features: ["Python & JavaScript", "React & Vue", "API Design", "Code Review"],
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    textColor: "text-orange-600",
    demo: "function createAIStudio() { return 'Amazing!'; }",
    stats: { accuracy: "96%", speed: "1.8s", satisfaction: "4.8/5" },
    featured: true,
  },
  {
    id: "document",
    icon: FileText,
    title: "DOCUMENT",
    subtitle: "AI",
    description: "Analyze, summarize, and extract insights from documents and complex data sources.",
    features: ["PDF Analysis", "Data Extraction", "Smart Summary", "Insights"],
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-600",
    demo: "Analyzing document structure and extracting key insights...",
    stats: { accuracy: "94%", speed: "3.1s", satisfaction: "4.7/5" },
  },
  {
    id: "creative",
    icon: Edit3,
    title: "CREATIVE",
    subtitle: "WRITING",
    description: "Craft engaging stories, poetry, screenplays, and creative content.",
    features: ["Story Crafting", "Poetry & Prose", "Script Writing", "Character Dev"],
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-600",
    demo: "Once upon a time, in a world where AI and creativity merged...",
    stats: { accuracy: "92%", speed: "2.7s", satisfaction: "4.9/5" },
  },
]

export default function StudioSelector() {
  const [activeStudio, setActiveStudio] = useState<string | null>("code")
  const [hoveredStudio, setHoveredStudio] = useState<string | null>(null)
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

  const handleStudioClick = (studioId: string) => {
    setActiveStudio(activeStudio === studioId ? null : studioId)
  }

  return (
    <section ref={sectionRef} className="px-4 sm:px-6 lg:px-8 py-16 lg:py-32 bg-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 lg:w-96 h-64 lg:h-96 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 lg:w-96 h-64 lg:h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-20">
          <h2
            className={`text-responsive-2xl font-black mb-4 lg:mb-6 tracking-tighter transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <span className="text-black">CHOOSE YOUR</span>
            <br />
            <span className="text-orange-500">STUDIO</span>
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
            Four specialized AI environments designed to amplify your creativity and productivity
          </p>
        </div>

        {/* Studio Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {studios.map((studio, index) => (
            <div
              key={studio.id}
              className={`transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${600 + index * 100}ms` }}
            >
              <Card
                className={`h-full cursor-pointer transition-all duration-500 border-2 hover:shadow-2xl hover:-translate-y-2 ${
                  studio.featured
                    ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white border-orange-600"
                    : activeStudio === studio.id
                      ? `${studio.bgColor} ${studio.borderColor} shadow-xl scale-105`
                      : hoveredStudio === studio.id
                        ? `${studio.bgColor} ${studio.borderColor} shadow-lg`
                        : "bg-white border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => handleStudioClick(studio.id)}
                onMouseEnter={() => setHoveredStudio(studio.id)}
                onMouseLeave={() => setHoveredStudio(null)}
              >
                <CardContent className="p-6 lg:p-8 h-full flex flex-col relative">
                  {/* Icon */}
                  <div
                    className={`w-12 lg:w-16 h-12 lg:h-16 rounded-xl flex items-center justify-center mb-4 lg:mb-6 transition-all duration-300 ${
                      studio.featured
                        ? "bg-black/20"
                        : activeStudio === studio.id || hoveredStudio === studio.id
                          ? `bg-gradient-to-br ${studio.color} scale-110 rotate-3`
                          : "bg-black"
                    }`}
                  >
                    <studio.icon className={`w-6 lg:w-8 h-6 lg:h-8 text-white`} />
                  </div>

                  {/* Title */}
                  <div className="mb-4 lg:mb-6">
                    <h3
                      className={`text-xl lg:text-2xl font-black tracking-tight mb-1 ${
                        studio.featured ? "text-white" : studio.textColor
                      }`}
                    >
                      {studio.title}
                    </h3>
                    <h4
                      className={`text-xl lg:text-2xl font-black tracking-tight mb-3 lg:mb-4 ${
                        studio.featured ? "text-white" : studio.textColor
                      }`}
                    >
                      {studio.subtitle}
                    </h4>
                    <p className={`text-sm leading-relaxed ${studio.featured ? "text-white/90" : "text-gray-600"}`}>
                      {studio.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-4 lg:mb-6 flex-1">
                    {studio.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className={`text-xs font-bold uppercase tracking-wider ${
                          studio.featured ? "text-white/80" : studio.textColor
                        }`}
                      >
                        • {feature}
                      </div>
                    ))}
                  </div>

                  {/* Demo Preview */}
                  {(activeStudio === studio.id || studio.featured) && (
                    <div
                      className={`p-3 lg:p-4 rounded-lg mb-4 lg:mb-6 ${studio.featured ? "bg-black/20" : "bg-gray-100"}`}
                    >
                      <div className="text-xs font-bold uppercase tracking-wider mb-2 opacity-60">DEMO OUTPUT</div>
                      <div className={`text-sm font-mono ${studio.featured ? "text-white/90" : "text-gray-700"}`}>
                        {studio.demo}
                      </div>
                    </div>
                  )}

                  {/* Stats */}
                  {activeStudio === studio.id && !studio.featured && (
                    <div className="grid grid-cols-3 gap-2 lg:gap-4 mb-4 lg:mb-6">
                      <div className="text-center">
                        <div className={`text-base lg:text-lg font-black ${studio.textColor}`}>
                          {studio.stats.accuracy}
                        </div>
                        <div className="text-xs text-gray-500 uppercase">Accuracy</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-base lg:text-lg font-black ${studio.textColor}`}>
                          {studio.stats.speed}
                        </div>
                        <div className="text-xs text-gray-500 uppercase">Speed</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-base lg:text-lg font-black ${studio.textColor}`}>
                          {studio.stats.satisfaction}
                        </div>
                        <div className="text-xs text-gray-500 uppercase">Rating</div>
                      </div>
                    </div>
                  )}

                  {/* CTA Button */}
                  <Button
                    className={`w-full transition-all duration-300 ${
                      studio.featured
                        ? "bg-black/20 hover:bg-black/30 text-white border-white/20"
                        : activeStudio === studio.id
                          ? `bg-gradient-to-r ${studio.color} text-white hover:shadow-lg`
                          : "bg-black hover:bg-gray-900 text-white"
                    }`}
                    variant={studio.featured ? "outline" : "default"}
                  >
                    {activeStudio === studio.id ? "LAUNCH STUDIO" : "EXPLORE"}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>

                  {/* Featured Badge */}
                  {studio.featured && (
                    <div className="absolute -top-3 -right-3">
                      <div className="bg-black text-white px-2 lg:px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Featured
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 lg:mt-20">
          <p className="text-gray-600 mb-6">Can't decide? Try our AI-powered studio recommendation</p>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-6 lg:px-8 py-3 lg:py-4 font-bold uppercase tracking-wider bg-transparent"
          >
            GET PERSONALIZED RECOMMENDATION
          </Button>
        </div>
      </div>
    </section>
  )
}
