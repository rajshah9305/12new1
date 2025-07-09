"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, Target, Zap, Sparkles } from "lucide-react"

interface UserBehavior {
  scrollSpeed: number
  hoverDuration: number
  clickFrequency: number
  timeOnPage: number
  preferredContent: string[]
  interactionPattern: "explorer" | "focused" | "scanner"
}

interface PersonalizationModel {
  contentPreferences: Record<string, number>
  layoutPreferences: Record<string, number>
  engagementScore: number
}

export default function MLPersonalization() {
  const [userBehavior, setUserBehavior] = useState<UserBehavior>({
    scrollSpeed: 0,
    hoverDuration: 0,
    clickFrequency: 0,
    timeOnPage: 0,
    preferredContent: [],
    interactionPattern: "explorer",
  })

  const [personalization, setPersonalization] = useState<PersonalizationModel>({
    contentPreferences: {},
    layoutPreferences: {},
    engagementScore: 0,
  })

  const [recommendations, setRecommendations] = useState<string[]>([])
  const startTimeRef = useRef<number>(Date.now())
  const hoverStartRef = useRef<number>(0)
  const clickCountRef = useRef<number>(0)

  // Simple ML model for user classification
  const classifyUser = (behavior: UserBehavior): "explorer" | "focused" | "scanner" => {
    const { scrollSpeed, hoverDuration, clickFrequency } = behavior

    if (scrollSpeed > 15 && hoverDuration < 2000) return "scanner"
    if (scrollSpeed < 5 && hoverDuration > 5000) return "focused"
    return "explorer"
  }

  // Content recommendation engine
  const generateRecommendations = (model: PersonalizationModel): string[] => {
    const { contentPreferences, engagementScore } = model

    const allContent = [
      "Advanced Code Generation Techniques",
      "Creative Writing with AI Assistance",
      "Document Analysis Best Practices",
      "Text Generation for Marketing",
      "AI-Powered Content Strategy",
      "Neural Network Visualization",
      "Machine Learning Integration",
      "Voice-Controlled Interfaces",
      "Real-time Collaboration Tools",
      "Advanced Analytics Dashboard",
    ]

    // Score content based on preferences and engagement
    const scoredContent = allContent.map((content) => ({
      content,
      score: (contentPreferences[content] || 0) * engagementScore + Math.random() * 0.1,
    }))

    return scoredContent
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map((item) => item.content)
  }

  // Update user behavior tracking
  useEffect(() => {
    const updateTimeOnPage = () => {
      setUserBehavior((prev) => ({
        ...prev,
        timeOnPage: Date.now() - startTimeRef.current,
      }))
    }

    const handleScroll = () => {
      const scrollSpeed = Math.abs(window.scrollY - (window.lastScrollY || 0))
      window.lastScrollY = window.scrollY

      setUserBehavior((prev) => ({
        ...prev,
        scrollSpeed: scrollSpeed * 0.1 + prev.scrollSpeed * 0.9, // Smoothed
      }))
    }

    const handleClick = () => {
      clickCountRef.current++
      setUserBehavior((prev) => ({
        ...prev,
        clickFrequency: clickCountRef.current / (prev.timeOnPage / 1000 || 1),
      }))
    }

    const interval = setInterval(updateTimeOnPage, 1000)
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("click", handleClick)

    return () => {
      clearInterval(interval)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("click", handleClick)
    }
  }, [])

  // Update personalization model
  useEffect(() => {
    const pattern = classifyUser(userBehavior)
    const engagementScore = Math.min(userBehavior.timeOnPage / 60000, 1) // Max 1 minute

    setUserBehavior((prev) => ({ ...prev, interactionPattern: pattern }))

    setPersonalization((prev) => ({
      ...prev,
      engagementScore,
      layoutPreferences: {
        compact: pattern === "scanner" ? 0.8 : 0.2,
        detailed: pattern === "focused" ? 0.9 : 0.3,
        visual: pattern === "explorer" ? 0.7 : 0.4,
      },
    }))
  }, [userBehavior])

  // Generate recommendations
  useEffect(() => {
    const newRecommendations = generateRecommendations(personalization)
    setRecommendations(newRecommendations)
  }, [personalization])

  const handleContentInteraction = (content: string) => {
    setPersonalization((prev) => ({
      ...prev,
      contentPreferences: {
        ...prev.contentPreferences,
        [content]: (prev.contentPreferences[content] || 0) + 0.1,
      },
    }))
  }

  const getLayoutStyle = () => {
    const { layoutPreferences } = personalization
    if (layoutPreferences.compact > 0.6) return "compact"
    if (layoutPreferences.detailed > 0.6) return "detailed"
    return "balanced"
  }

  return (
    <section className="px-6 py-20 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* ML Insights Dashboard */}
        <div className="mb-12">
          <h2 className="text-4xl font-black mb-6 tracking-tighter">
            <span className="text-black">PERSONALIZED FOR</span>
            <br />
            <span className="text-purple-600">YOU</span>
          </h2>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Brain className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-black text-purple-600">{userBehavior.interactionPattern}</div>
                <div className="text-sm text-gray-600 uppercase tracking-wide">USER TYPE</div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-black text-blue-600">
                  {Math.round(personalization.engagementScore * 100)}%
                </div>
                <div className="text-sm text-gray-600 uppercase tracking-wide">ENGAGEMENT</div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Zap className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <div className="text-2xl font-black text-yellow-600">
                  {Math.round(userBehavior.scrollSpeed * 10) / 10}
                </div>
                <div className="text-sm text-gray-600 uppercase tracking-wide">SCROLL SPEED</div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Sparkles className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-black text-green-600">{getLayoutStyle()}</div>
                <div className="text-sm text-gray-600 uppercase tracking-wide">LAYOUT PREF</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Personalized Recommendations */}
        <div className="mb-12">
          <h3 className="text-3xl font-black mb-6 text-black">RECOMMENDED FOR YOU</h3>
          <div
            className={`grid gap-6 ${
              getLayoutStyle() === "compact"
                ? "md:grid-cols-4"
                : getLayoutStyle() === "detailed"
                  ? "md:grid-cols-2"
                  : "md:grid-cols-3"
            }`}
          >
            {recommendations.map((recommendation, index) => (
              <Card
                key={index}
                className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                onClick={() => handleContentInteraction(recommendation)}
              >
                <CardContent
                  className={`${getLayoutStyle() === "detailed" ? "p-8" : "p-6"} group-hover:bg-purple-50 transition-colors`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center group-hover:bg-purple-700 transition-colors">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-black text-lg mb-2 group-hover:text-purple-600 transition-colors">
                        {recommendation}
                      </h4>
                      {getLayoutStyle() === "detailed" && (
                        <p className="text-gray-600 text-sm">
                          Personalized content based on your interaction patterns and preferences.
                        </p>
                      )}
                      <div className="mt-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
                          {Math.round((personalization.contentPreferences[recommendation] || 0) * 100 + 50)}% MATCH
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Adaptive Interface Demo */}
        <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="text-center">
              <h3 className="text-3xl font-black mb-4">ADAPTIVE AI INTERFACE</h3>
              <p className="text-lg mb-6 opacity-90">
                This interface learns from your behavior and adapts in real-time to provide the best experience.
              </p>
              <Button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 font-bold uppercase tracking-wider">
                EXPLORE PERSONALIZATION
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
