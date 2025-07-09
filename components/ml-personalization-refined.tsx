"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, Target, Sparkles, Clock, Activity, ArrowRight } from "lucide-react"

interface UserBehavior {
  scrollSpeed: number
  hoverDuration: number
  clickFrequency: number
  timeOnPage: number
  preferredContent: string[]
  interactionPattern: "explorer" | "focused" | "scanner"
  engagementScore: number
}

interface PersonalizationInsight {
  type: "content" | "layout" | "timing" | "feature"
  title: string
  description: string
  confidence: number
  impact: "high" | "medium" | "low"
}

export default function MLPersonalizationRefined() {
  const [userBehavior, setUserBehavior] = useState<UserBehavior>({
    scrollSpeed: 0,
    hoverDuration: 0,
    clickFrequency: 0,
    timeOnPage: 0,
    preferredContent: [],
    interactionPattern: "explorer",
    engagementScore: 0,
  })

  const [insights, setInsights] = useState<PersonalizationInsight[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const startTimeRef = useRef<number>(Date.now())

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

  // Advanced ML behavior analysis
  useEffect(() => {
    const updateBehavior = () => {
      const timeOnPage = Date.now() - startTimeRef.current
      const engagementScore = Math.min(timeOnPage / 60000, 1) // Max 1 minute

      setUserBehavior((prev) => {
        const newBehavior = {
          ...prev,
          timeOnPage,
          engagementScore,
        }

        // Classify user pattern
        if (prev.scrollSpeed > 15 && prev.hoverDuration < 2000) {
          newBehavior.interactionPattern = "scanner"
        } else if (prev.scrollSpeed < 5 && prev.hoverDuration > 5000) {
          newBehavior.interactionPattern = "focused"
        } else {
          newBehavior.interactionPattern = "explorer"
        }

        return newBehavior
      })
    }

    const interval = setInterval(updateBehavior, 1000)
    return () => clearInterval(interval)
  }, [])

  // Generate AI insights
  useEffect(() => {
    const generateInsights = () => {
      const newInsights: PersonalizationInsight[] = []

      // Content preference insights
      if (userBehavior.interactionPattern === "focused") {
        newInsights.push({
          type: "content",
          title: "Deep Dive Content Recommended",
          description: "Your focused reading pattern suggests you prefer detailed, comprehensive content.",
          confidence: 0.85,
          impact: "high",
        })
      }

      // Layout optimization
      if (userBehavior.scrollSpeed > 10) {
        newInsights.push({
          type: "layout",
          title: "Compact Layout Suggested",
          description: "Fast scrolling detected. A more compact layout might improve your experience.",
          confidence: 0.78,
          impact: "medium",
        })
      }

      // Feature recommendations
      if (userBehavior.engagementScore > 0.7) {
        newInsights.push({
          type: "feature",
          title: "Advanced Features Unlocked",
          description: "High engagement detected. You might benefit from our advanced collaboration tools.",
          confidence: 0.92,
          impact: "high",
        })
      }

      // Timing insights
      if (userBehavior.timeOnPage > 30000) {
        newInsights.push({
          type: "timing",
          title: "Extended Session Detected",
          description: "Consider saving your progress or enabling auto-save for longer sessions.",
          confidence: 0.88,
          impact: "medium",
        })
      }

      setInsights(newInsights)
    }

    if (userBehavior.timeOnPage > 5000) {
      generateInsights()
    }
  }, [userBehavior])

  const getPatternColor = (pattern: string) => {
    switch (pattern) {
      case "focused":
        return "from-blue-500 to-blue-600"
      case "scanner":
        return "from-red-500 to-red-600"
      default:
        return "from-green-500 to-green-600"
    }
  }

  const getPatternDescription = (pattern: string) => {
    switch (pattern) {
      case "focused":
        return "You prefer detailed content and spend time analyzing information"
      case "scanner":
        return "You quickly scan content looking for specific information"
      default:
        return "You explore content at a balanced pace, engaging with various elements"
    }
  }

  return (
    <section ref={sectionRef} className="px-6 py-32 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2
            className={`text-7xl lg:text-8xl font-black mb-6 tracking-tighter transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <span className="text-black">PERSONALIZED</span>
            <br />
            <span className="text-purple-600">FOR YOU</span>
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
            Our AI learns from your behavior to create a uniquely tailored experience
          </p>
        </div>

        {/* Real-time Analytics Dashboard */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <Card
            className={`bg-white/80 backdrop-blur border-0 shadow-lg hover:shadow-xl transition-all duration-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <CardContent className="p-6 text-center">
              <Brain className="w-10 h-10 text-purple-600 mx-auto mb-3" />
              <div className="text-3xl font-black text-purple-600 mb-1 capitalize">
                {userBehavior.interactionPattern}
              </div>
              <div className="text-sm text-gray-600 uppercase tracking-wide font-bold">User Pattern</div>
            </CardContent>
          </Card>

          <Card
            className={`bg-white/80 backdrop-blur border-0 shadow-lg hover:shadow-xl transition-all duration-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "700ms" }}
          >
            <CardContent className="p-6 text-center">
              <Target className="w-10 h-10 text-blue-600 mx-auto mb-3" />
              <div className="text-3xl font-black text-blue-600 mb-1">
                {Math.round(userBehavior.engagementScore * 100)}%
              </div>
              <div className="text-sm text-gray-600 uppercase tracking-wide font-bold">Engagement</div>
            </CardContent>
          </Card>

          <Card
            className={`bg-white/80 backdrop-blur border-0 shadow-lg hover:shadow-xl transition-all duration-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "800ms" }}
          >
            <CardContent className="p-6 text-center">
              <Activity className="w-10 h-10 text-green-600 mx-auto mb-3" />
              <div className="text-3xl font-black text-green-600 mb-1">
                {Math.round(userBehavior.scrollSpeed * 10) / 10}
              </div>
              <div className="text-sm text-gray-600 uppercase tracking-wide font-bold">Scroll Speed</div>
            </CardContent>
          </Card>

          <Card
            className={`bg-white/80 backdrop-blur border-0 shadow-lg hover:shadow-xl transition-all duration-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "900ms" }}
          >
            <CardContent className="p-6 text-center">
              <Clock className="w-10 h-10 text-orange-600 mx-auto mb-3" />
              <div className="text-3xl font-black text-orange-600 mb-1">
                {Math.round(userBehavior.timeOnPage / 1000)}s
              </div>
              <div className="text-sm text-gray-600 uppercase tracking-wide font-bold">Time on Page</div>
            </CardContent>
          </Card>
        </div>

        {/* User Pattern Analysis */}
        <Card
          className={`bg-gradient-to-br ${getPatternColor(userBehavior.interactionPattern)} text-white border-0 shadow-2xl mb-16 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "1000ms" }}
        >
          <CardContent className="p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-4xl font-black mb-6 tracking-tight">YOUR INTERACTION PATTERN</h3>
                <p className="text-xl text-white/90 leading-relaxed mb-8">
                  {getPatternDescription(userBehavior.interactionPattern)}
                </p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">Reading Depth</span>
                    <div className="w-32 bg-white/20 rounded-full h-2">
                      <div
                        className="bg-white h-2 rounded-full transition-all duration-1000"
                        style={{
                          width: `${userBehavior.interactionPattern === "focused" ? 90 : userBehavior.interactionPattern === "scanner" ? 30 : 60}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">Exploration Rate</span>
                    <div className="w-32 bg-white/20 rounded-full h-2">
                      <div
                        className="bg-white h-2 rounded-full transition-all duration-1000"
                        style={{
                          width: `${userBehavior.interactionPattern === "explorer" ? 85 : userBehavior.interactionPattern === "scanner" ? 95 : 45}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">Focus Level</span>
                    <div className="w-32 bg-white/20 rounded-full h-2">
                      <div
                        className="bg-white h-2 rounded-full transition-all duration-1000"
                        style={{
                          width: `${userBehavior.interactionPattern === "focused" ? 95 : userBehavior.interactionPattern === "explorer" ? 70 : 40}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="w-48 h-48 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
                  <Brain className="w-24 h-24 text-white" />
                </div>
                <p className="text-white/80 text-lg">
                  AI is continuously learning from your interactions to optimize your experience
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        {insights.length > 0 && (
          <div className="mb-16">
            <h3
              className={`text-4xl font-black mb-8 text-center transition-all duration-1000 delay-1200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              AI INSIGHTS & RECOMMENDATIONS
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {insights.map((insight, index) => (
                <Card
                  key={index}
                  className={`bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${1300 + index * 100}ms` }}
                >
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          insight.impact === "high"
                            ? "bg-green-100"
                            : insight.impact === "medium"
                              ? "bg-yellow-100"
                              : "bg-blue-100"
                        }`}
                      >
                        <Sparkles
                          className={`w-6 h-6 ${
                            insight.impact === "high"
                              ? "text-green-600"
                              : insight.impact === "medium"
                                ? "text-yellow-600"
                                : "text-blue-600"
                          }`}
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-black text-gray-900">{insight.title}</h4>
                          <div
                            className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${
                              insight.impact === "high"
                                ? "bg-green-100 text-green-800"
                                : insight.impact === "medium"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {insight.impact} impact
                          </div>
                        </div>

                        <p className="text-gray-600 mb-4 leading-relaxed">{insight.description}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">Confidence:</span>
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-purple-500 h-2 rounded-full transition-all duration-1000"
                                style={{ width: `${insight.confidence * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-bold text-purple-600">
                              {Math.round(insight.confidence * 100)}%
                            </span>
                          </div>

                          <Button size="sm" variant="outline" className="text-xs bg-transparent">
                            Apply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Personalization CTA */}
        <Card
          className={`bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 shadow-2xl ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "1500ms" }}
        >
          <CardContent className="p-12 text-center">
            <h3 className="text-4xl font-black mb-6 tracking-tight">EXPERIENCE PERSONALIZED AI</h3>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              This is just the beginning. Our AI will continue learning and adapting to provide you with an increasingly
              personalized experience.
            </p>
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 px-12 py-6 text-lg font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105"
            >
              UNLOCK FULL PERSONALIZATION
              <ArrowRight className="ml-3 w-6 h-6" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
