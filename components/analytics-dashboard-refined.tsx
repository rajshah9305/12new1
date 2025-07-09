"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, TrendingUp, Users, Clock, Eye, Zap, Target, Activity, Layers, X } from "lucide-react"

interface AnalyticsData {
  pageViews: number
  uniqueVisitors: number
  averageTimeOnPage: number
  bounceRate: number
  conversionRate: number
  heatmapData: { x: number; y: number; intensity: number }[]
  scrollDepth: number[]
  interactionEvents: {
    type: string
    element: string
    timestamp: number
    value?: number
  }[]
  userFlow: {
    step: string
    users: number
    dropoff: number
  }[]
  realTimeUsers: number
  performanceMetrics: {
    loadTime: number
    interactivity: number
    visualStability: number
  }
}

export default function AnalyticsDashboardRefined() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    pageViews: 1247,
    uniqueVisitors: 892,
    averageTimeOnPage: 0,
    bounceRate: 0,
    conversionRate: 0,
    heatmapData: [],
    scrollDepth: [],
    interactionEvents: [],
    userFlow: [],
    realTimeUsers: 0,
    performanceMetrics: {
      loadTime: 1.2,
      interactivity: 0.8,
      visualStability: 0.95,
    },
  })

  const [showDashboard, setShowDashboard] = useState(false)
  const [currentMetric, setCurrentMetric] = useState<"overview" | "heatmap" | "flow" | "realtime" | "performance">(
    "overview",
  )

  // Simulate real-time analytics data
  useEffect(() => {
    const updateAnalytics = () => {
      setAnalytics((prev) => ({
        ...prev,
        pageViews: prev.pageViews + Math.floor(Math.random() * 3),
        uniqueVisitors: prev.uniqueVisitors + Math.floor(Math.random() * 2),
        averageTimeOnPage: 45 + Math.random() * 30,
        bounceRate: 25 + Math.random() * 10,
        conversionRate: 3.2 + Math.random() * 2,
        realTimeUsers: 15 + Math.floor(Math.random() * 10),
        scrollDepth: Array.from({ length: 10 }, (_, i) => Math.random() * 100),
        heatmapData: Array.from({ length: 50 }, () => ({
          x: Math.random() * 100,
          y: Math.random() * 100,
          intensity: Math.random(),
        })),
        userFlow: [
          { step: "Landing", users: 1000, dropoff: 0 },
          { step: "Hero Section", users: 850, dropoff: 15 },
          { step: "Studios", users: 720, dropoff: 15.3 },
          { step: "Benefits", users: 650, dropoff: 9.7 },
          { step: "Process", users: 580, dropoff: 10.8 },
          { step: "CTA", users: 420, dropoff: 27.6 },
          { step: "Conversion", users: 134, dropoff: 68.1 },
        ],
        performanceMetrics: {
          loadTime: 1.2 + Math.random() * 0.3,
          interactivity: 0.8 + Math.random() * 0.15,
          visualStability: 0.95 + Math.random() * 0.04,
        },
      }))
    }

    const interval = setInterval(updateAnalytics, 2000)
    updateAnalytics() // Initial load

    return () => clearInterval(interval)
  }, [])

  // Track user interactions
  useEffect(() => {
    const trackInteraction = (type: string, element: string, value?: number) => {
      setAnalytics((prev) => ({
        ...prev,
        interactionEvents: [
          ...prev.interactionEvents.slice(-20), // Keep last 20 events
          {
            type,
            element,
            timestamp: Date.now(),
            value,
          },
        ],
      }))
    }

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      trackInteraction("click", target.tagName.toLowerCase())
    }

    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      trackInteraction("scroll", "page", scrollPercent)
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Sample mouse movements (not all)
      if (Math.random() < 0.01) {
        trackInteraction("mousemove", "page", e.clientX + e.clientY)
      }
    }

    window.addEventListener("click", handleClick)
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("click", handleClick)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const getPerformanceColor = (value: number, type: "loadTime" | "interactivity" | "visualStability") => {
    if (type === "loadTime") {
      return value < 1.5 ? "text-green-600" : value < 2.5 ? "text-yellow-600" : "text-red-600"
    }
    return value > 0.9 ? "text-green-600" : value > 0.7 ? "text-yellow-600" : "text-red-600"
  }

  return (
    <>
      {/* Analytics Toggle Button */}
      <Button
        onClick={() => setShowDashboard(!showDashboard)}
        className="fixed top-20 left-6 z-50 bg-purple-600 hover:bg-purple-700 text-white shadow-lg transition-all duration-300 hover:scale-105"
        size="sm"
      >
        <BarChart3 className="w-4 h-4 mr-2" />
        Analytics
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
      </Button>

      {/* Enhanced Analytics Dashboard */}
      {showDashboard && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div className="absolute inset-4 bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="h-full flex flex-col">
              {/* Enhanced Header */}
              <div className="bg-gradient-to-r from-gray-900 to-purple-900 text-white p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-black tracking-tight">ANALYTICS DASHBOARD</h2>
                    <p className="text-gray-300 text-lg">Real-time user engagement insights & performance metrics</p>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm font-bold">LIVE DATA</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowDashboard(false)}
                      className="text-white hover:bg-white/10"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* Enhanced Metric Tabs */}
                <div className="flex space-x-4 mt-8">
                  {[
                    { key: "overview", label: "Overview", icon: Activity },
                    { key: "heatmap", label: "Heatmap", icon: Target },
                    { key: "flow", label: "User Flow", icon: Layers },
                    { key: "realtime", label: "Real-time", icon: Zap },
                    { key: "performance", label: "Performance", icon: TrendingUp },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setCurrentMetric(tab.key as any)}
                      className={`flex items-center space-x-3 px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-sm transition-all duration-300 ${
                        currentMetric === tab.key
                          ? "bg-white text-purple-900 shadow-lg scale-105"
                          : "bg-white/10 text-white hover:bg-white/20 hover:scale-105"
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-8 overflow-y-auto bg-gray-50">
                {currentMetric === "overview" && (
                  <div className="space-y-8">
                    {/* Enhanced Key Metrics */}
                    <div className="grid md:grid-cols-5 gap-6">
                      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <CardContent className="p-8 text-center">
                          <Eye className="w-10 h-10 text-blue-600 mx-auto mb-4" />
                          <div className="text-4xl font-black text-blue-600 mb-2">
                            {formatNumber(analytics.pageViews)}
                          </div>
                          <div className="text-sm text-blue-700 font-bold uppercase tracking-wide">Page Views</div>
                          <div className="text-xs text-blue-600 mt-2">+12% from yesterday</div>
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <CardContent className="p-8 text-center">
                          <Users className="w-10 h-10 text-green-600 mx-auto mb-4" />
                          <div className="text-4xl font-black text-green-600 mb-2">
                            {formatNumber(analytics.uniqueVisitors)}
                          </div>
                          <div className="text-sm text-green-700 font-bold uppercase tracking-wide">
                            Unique Visitors
                          </div>
                          <div className="text-xs text-green-600 mt-2">+8% from yesterday</div>
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <CardContent className="p-8 text-center">
                          <Clock className="w-10 h-10 text-yellow-600 mx-auto mb-4" />
                          <div className="text-4xl font-black text-yellow-600 mb-2">
                            {formatTime(analytics.averageTimeOnPage)}
                          </div>
                          <div className="text-sm text-yellow-700 font-bold uppercase tracking-wide">Avg. Time</div>
                          <div className="text-xs text-yellow-600 mt-2">+15% from yesterday</div>
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-to-br from-red-50 to-red-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <CardContent className="p-8 text-center">
                          <TrendingUp className="w-10 h-10 text-red-600 mx-auto mb-4" />
                          <div className="text-4xl font-black text-red-600 mb-2">
                            {analytics.bounceRate.toFixed(1)}%
                          </div>
                          <div className="text-sm text-red-700 font-bold uppercase tracking-wide">Bounce Rate</div>
                          <div className="text-xs text-red-600 mt-2">-5% from yesterday</div>
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <CardContent className="p-8 text-center">
                          <Target className="w-10 h-10 text-purple-600 mx-auto mb-4" />
                          <div className="text-4xl font-black text-purple-600 mb-2">
                            {analytics.conversionRate.toFixed(1)}%
                          </div>
                          <div className="text-sm text-purple-700 font-bold uppercase tracking-wide">Conversion</div>
                          <div className="text-xs text-purple-600 mt-2">+22% from yesterday</div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Enhanced Scroll Depth Chart */}
                    <Card className="border-0 shadow-xl">
                      <CardContent className="p-8">
                        <h3 className="text-2xl font-black mb-6 text-gray-900">Scroll Depth Analysis</h3>
                        <div className="h-80 flex items-end space-x-3 bg-gradient-to-t from-gray-50 to-transparent rounded-lg p-6">
                          {analytics.scrollDepth.map((depth, index) => (
                            <div key={index} className="flex-1 flex flex-col items-center">
                              <div
                                className="bg-gradient-to-t from-orange-500 to-orange-300 rounded-t-lg w-full transition-all duration-1000 hover:from-orange-600 hover:to-orange-400 cursor-pointer"
                                style={{ height: `${depth * 3}px` }}
                                title={`Section ${index + 1}: ${depth.toFixed(1)}%`}
                              />
                              <div className="text-xs text-gray-500 mt-2 font-medium">
                                {
                                  ["Hero", "Studios", "Benefits", "Process", "Security", "Testimonials", "FAQ", "CTA"][
                                    index
                                  ]
                                }
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Enhanced Recent Interactions */}
                    <Card className="border-0 shadow-xl">
                      <CardContent className="p-8">
                        <h3 className="text-2xl font-black mb-6 text-gray-900">Live Activity Feed</h3>
                        <div className="space-y-3 max-h-64 overflow-y-auto">
                          {analytics.interactionEvents
                            .slice(-10)
                            .reverse()
                            .map((event, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                              >
                                <div className="flex items-center space-x-4">
                                  <div
                                    className={`w-3 h-3 rounded-full ${
                                      event.type === "click"
                                        ? "bg-blue-500"
                                        : event.type === "scroll"
                                          ? "bg-green-500"
                                          : "bg-gray-400"
                                    } animate-pulse`}
                                  />
                                  <div>
                                    <span className="font-bold text-gray-900 capitalize">{event.type}</span>
                                    <span className="text-gray-600 ml-2">on {event.element}</span>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-sm text-gray-500">
                                    {new Date(event.timestamp).toLocaleTimeString()}
                                  </div>
                                  {event.value && <div className="text-xs text-gray-400">{event.value.toFixed(0)}</div>}
                                </div>
                              </div>
                            ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {currentMetric === "performance" && (
                  <div className="space-y-8">
                    <div className="grid md:grid-cols-3 gap-6">
                      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0 shadow-lg">
                        <CardContent className="p-8 text-center">
                          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Zap className="w-8 h-8 text-white" />
                          </div>
                          <div
                            className={`text-4xl font-black mb-2 ${getPerformanceColor(analytics.performanceMetrics.loadTime, "loadTime")}`}
                          >
                            {analytics.performanceMetrics.loadTime.toFixed(1)}s
                          </div>
                          <div className="text-sm text-green-700 font-bold uppercase">Load Time</div>
                          <div className="text-xs text-green-600 mt-2">Excellent</div>
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg">
                        <CardContent className="p-8 text-center">
                          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Activity className="w-8 h-8 text-white" />
                          </div>
                          <div
                            className={`text-4xl font-black mb-2 ${getPerformanceColor(analytics.performanceMetrics.interactivity, "interactivity")}`}
                          >
                            {(analytics.performanceMetrics.interactivity * 100).toFixed(0)}
                          </div>
                          <div className="text-sm text-blue-700 font-bold uppercase">Interactivity</div>
                          <div className="text-xs text-blue-600 mt-2">Good</div>
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-0 shadow-lg">
                        <CardContent className="p-8 text-center">
                          <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Target className="w-8 h-8 text-white" />
                          </div>
                          <div
                            className={`text-4xl font-black mb-2 ${getPerformanceColor(analytics.performanceMetrics.visualStability, "visualStability")}`}
                          >
                            {(analytics.performanceMetrics.visualStability * 100).toFixed(0)}
                          </div>
                          <div className="text-sm text-purple-700 font-bold uppercase">Visual Stability</div>
                          <div className="text-xs text-purple-600 mt-2">Excellent</div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}

                {/* Other metric views would go here */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
