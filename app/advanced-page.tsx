"use client"

import WebGLHero from "@/components/webgl-hero"
import MLPersonalization from "@/components/ml-personalization"
import VoiceInterface from "@/components/voice-interface"
import CollaborationHub from "@/components/collaboration-hub"
import AnalyticsDashboard from "@/components/analytics-dashboard"

export default function AdvancedAIStudio() {
  return (
    <div className="min-h-screen bg-white font-mono relative">
      {/* Advanced Analytics Overlay */}
      <AnalyticsDashboard />

      {/* Real-time Collaboration */}
      <CollaborationHub />

      {/* Voice Interface */}
      <VoiceInterface />

      {/* WebGL Enhanced Hero */}
      <WebGLHero />

      {/* ML Personalization */}
      <MLPersonalization />

      {/* Rest of the existing content would go here */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-6xl font-black mb-6 tracking-tighter">
            <span className="text-black">ADVANCED</span>
            <br />
            <span className="text-orange-500">AI FEATURES</span>
          </h2>
          <div className="w-32 h-1 bg-black mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of AI creativity with neural network visualizations, machine learning personalization,
            voice interactions, real-time collaboration, and advanced analytics.
          </p>
        </div>
      </section>
    </div>
  )
}
