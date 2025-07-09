"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, TrendingUp, Users, Clock, MousePointer, Eye, Zap, Target, Activity, Layers } from "lucide-react"

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
}

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    pageViews: 0,
    uniqueVisitors: 0,
    averageTimeOnPage: 0,
    bounceRate: 0,
    conversionRate: 0,
    heatmapData: [],
    scrollDepth: [],
    interactionEvents: [],
    userFlow: [],
    realTimeUsers: 0,
  })

  const [showDashboard, setShowDashboard] = useState(false)
  const [currentMetric, setCurrentMetric] = useState<"overview" | "heatmap" | "flow" | "realtime">("overview")

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

  return (
    <>
      {/* Analytics Toggle Button */}
      <Button
        onClick={() => setShowDashboard(!showDashboard)}
        className="fixed top-20 left-6 z-50 bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
        size="sm"
      >
        <BarChart3 className="w-4 h-4 mr-2" />
        Analytics
      </Button>

      {/* Analytics Dashboard */}
      {showDashboard && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div className="absolute inset-4 bg-white rounded-lg shadow-2xl overflow-hidden">
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="bg-gray-900 text-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-black">ANALYTICS DASHBOARD</h2>
                    <p className="text-gray-300">Real-time user engagement insights</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm">Live</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setShowDashboard(false)}>
                      ×
                    </Button>
                  </div>
                </div>

                {/* Metric Tabs */}
                <div className="flex space-x-4 mt-6">
                  {[
                    { key: "overview", label: "Overview", icon: Activity },
                    { key: "heatmap", label: "Heatmap", icon: Target },
                    { key: "flow", label: "User Flow", icon: Layers },
                    { key: "realtime", label: "Real-time", icon: Zap },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setCurrentMetric(tab.key as any)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        currentMetric === tab.key ? "bg-purple-600" : "bg-gray-700 hover:bg-gray-600"
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-6 overflow-y-auto">
                {currentMetric === "overview" && (
                  <div className="space-y-6">
                    {/* Key Metrics */}
                    <div className="grid md:grid-cols-5 gap-6">
                      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0">
                        <CardContent className="p-6 text-center">
                          <Eye className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                          <div className="text-3xl font-black text-blue-600">{formatNumber(analytics.pageViews)}</div>
                          <div className="text-sm text-blue-700">Page Views</div>
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0">
                        <CardContent className="p-6 text-center">
                          <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                          <div className="text-3xl font-black text-green-600">
                            {formatNumber(analytics.uniqueVisitors)}
                          </div>
                          <div className="text-sm text-green-700">Unique Visitors</div>
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-0">
                        <CardContent className="p-6 text-center">
                          <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                          <div className="text-3xl font-black text-yellow-600">
                            {formatTime(analytics.averageTimeOnPage)}
                          </div>
                          <div className="text-sm text-yellow-700">Avg. Time</div>
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-to-br from-red-50 to-red-100 border-0">
                        <CardContent className="p-6 text-center">
                          <TrendingUp className="w-8 h-8 text-red-600 mx-auto mb-2" />
                          <div className="text-3xl font-black text-red-600">{analytics.bounceRate.toFixed(1)}%</div>
                          <div className="text-sm text-red-700">Bounce Rate</div>
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-0">
                        <CardContent className="p-6 text-center">
                          <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                          <div className="text-3xl font-black text-purple-600">
                            {analytics.conversionRate.toFixed(1)}%
                          </div>
                          <div className="text-sm text-purple-700">Conversion</div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Scroll Depth Chart */}
                    <Card className="border-0 shadow-lg">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-black mb-4">Scroll Depth Analysis</h3>
                        <div className="h-64 flex items-end space-x-2">
                          {analytics.scrollDepth.map((depth, index) => (
                            <div
                              key={index}
                              className="bg-gradient-to-t from-orange-500 to-orange-300 rounded-t flex-1 transition-all duration-300"
                              style={{ height: `${depth * 2}px` }}
                              title={`Section ${index + 1}: ${depth.toFixed(1)}%`}
                            />
                          ))}
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                          <span>Hero</span>
                          <span>Studios</span>
                          <span>Benefits</span>
                          <span>Process</span>
                          <span>Security</span>
                          <span>Testimonials</span>
                          <span>FAQ</span>
                          <span>CTA</span>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Recent Interactions */}
                    <Card className="border-0 shadow-lg">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-black mb-4">Recent Interactions</h3>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {analytics.interactionEvents.slice(-10).map((event, index) => (
                            <div key={index} className="flex items-center justify-between text-sm">
                              <div className="flex items-center space-x-3">
                                <div
                                  className={`w-2 h-2 rounded-full ${
                                    event.type === "click"
                                      ? "bg-blue-500"
                                      : event.type === "scroll"
                                        ? "bg-green-500"
                                        : "bg-gray-400"
                                  }`}
                                />
                                <span className="font-medium">{event.type}</span>
                                <span className="text-gray-600">{event.element}</span>
                              </div>
                              <span className="text-gray-500">{new Date(event.timestamp).toLocaleTimeString()}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {currentMetric === "heatmap" && (
                  <div className="space-y-6">
                    <Card className="border-0 shadow-lg">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-black mb-4">Click Heatmap</h3>
                        <div className="relative bg-gray-100 rounded-lg h-96 overflow-hidden">
                          {analytics.heatmapData.map((point, index) => (
                            <div
                              key={index}
                              className="absolute w-4 h-4 rounded-full pointer-events-none transition-all duration-300"
                              style={{
                                left: `${point.x}%`,
                                top: `${point.y}%`,
                                backgroundColor: `rgba(255, 87, 34, ${point.intensity})`,
                                transform: "translate(-50%, -50%)",
                              }}
                            />
                          ))}
                          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                            <div className="text-center">
                              <MousePointer className="w-12 h-12 mx-auto mb-2" />
                              <p>User interaction heatmap</p>
                              <p className="text-sm">Red areas indicate high activity</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {currentMetric === "flow" && (
                  <div className="space-y-6">
                    <Card className="border-0 shadow-lg">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-black mb-4">User Flow Analysis</h3>
                        <div className="space-y-4">
                          {analytics.userFlow.map((step, index) => (
                            <div key={index} className="flex items-center space-x-4">
                              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                {index + 1}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-bold">{step.step}</span>
                                  <div className="flex items-center space-x-4">
                                    <span className="text-sm text-gray-600">{formatNumber(step.users)} users</span>
                                    {step.dropoff > 0 && (
                                      <span className="text-sm text-red-600">-{step.dropoff}% dropoff</span>
                                    )}
                                  </div>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-gradient-to-r from-orange-500 to-orange-400 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${(step.users / analytics.userFlow[0].users) * 100}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {currentMetric === "realtime" && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0">
                        <CardContent className="p-6 text-center">
                          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Users className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-4xl font-black text-green-600 mb-1">{analytics.realTimeUsers}</div>
                          <div className="text-sm text-green-700">Active Users</div>
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0">
                        <CardContent className="p-6 text-center">
                          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Activity className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-4xl font-black text-blue-600 mb-1">
                            {analytics.interactionEvents.length}
                          </div>
                          <div className="text-sm text-blue-700">Live Events</div>
                        </CardContent>
                      </Card>

                      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-0">
                        <CardContent className="p-6 text-center">
                          <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Zap className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-4xl font-black text-purple-600 mb-1">
                            {(analytics.interactionEvents.length / analytics.realTimeUsers || 0).toFixed(1)}
                          </div>
                          <div className="text-sm text-purple-700">Events/User</div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Live Activity Feed */}
                    <Card className="border-0 shadow-lg">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-black mb-4">Live Activity Feed</h3>
                        <div className="space-y-3 max-h-64 overflow-y-auto">
                          {analytics.interactionEvents
                            .slice(-15)
                            .reverse()
                            .map((event, index) => (
                              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                <div
                                  className={`w-3 h-3 rounded-full ${
                                    event.type === "click"
                                      ? "bg-blue-500"
                                      : event.type === "scroll"
                                        ? "bg-green-500"
                                        : "bg-gray-400"
                                  } animate-pulse`}
                                />
                                <div className="flex-1">
                                  <div className="text-sm font-medium">
                                    User {event.type}ed on {event.element}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {new Date(event.timestamp).toLocaleTimeString()}
                                  </div>
                                </div>
                                {event.value && (
                                  <div className="text-xs text-gray-600 bg-white px-2 py-1 rounded">
                                    {event.value.toFixed(0)}
                                  </div>
                                )}
                              </div>
                            ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
