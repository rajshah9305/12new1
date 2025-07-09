"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Code, FileText, Edit3, Tag } from "lucide-react"

const studios = [
  {
    icon: Tag,
    title: "TEXT",
    subtitle: "GENERATION",
    description: "Create compelling content, articles, and marketing copy with advanced AI text generation.",
    features: ["MARKETING COPY", "BLOG ARTICLES", "SOCIAL MEDIA"],
    color: "orange",
  },
  {
    icon: Code,
    title: "CODE",
    subtitle: "GENERATION",
    description: "Generate, debug, and optimize code across multiple programming languages.",
    features: ["PYTHON & JS", "REACT & VUE", "API DESIGN"],
    color: "orange",
    featured: true,
  },
  {
    icon: FileText,
    title: "DOCUMENT",
    subtitle: "AI",
    description: "Analyze, summarize, and extract insights from documents and complex data sources.",
    features: ["PDF ANALYSIS", "DATA EXTRACT", "SMART SUMMARY"],
    color: "orange",
  },
  {
    icon: Edit3,
    title: "CREATIVE",
    subtitle: "WRITING",
    description: "Craft engaging stories, poetry, screenplays, and creative content.",
    features: ["STORY CRAFTING", "POETRY & PROSE", "SCRIPT WRITING"],
    color: "orange",
  },
]

export default function MorphingCards() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <section className="px-6 py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-6xl font-black mb-4 tracking-tighter">
            <span className="text-black">CHOOSE YOUR</span>
            <br />
            <span className="text-orange-500">STUDIO</span>
          </h2>
          <div className="w-32 h-1 bg-black"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {studios.map((studio, index) => (
            <div
              key={index}
              className={`relative transform transition-all duration-500 ${
                hoveredCard === index ? "scale-105 z-10" : "scale-100"
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Card
                className={`h-full border-0 shadow-lg overflow-hidden ${
                  studio.featured
                    ? "bg-orange-500 text-white"
                    : hoveredCard === index
                      ? "bg-white shadow-2xl"
                      : "bg-white"
                }`}
              >
                <CardContent className="p-8 h-full flex flex-col">
                  {/* Morphing background effect */}
                  <div
                    className={`absolute inset-0 transition-all duration-500 ${
                      hoveredCard === index && !studio.featured
                        ? "bg-gradient-to-br from-orange-50 to-orange-100 opacity-100"
                        : "opacity-0"
                    }`}
                  />

                  <div className="relative z-10 space-y-6 flex-1">
                    <div
                      className={`w-16 h-16 flex items-center justify-center transition-all duration-300 ${
                        studio.featured ? "bg-black" : hoveredCard === index ? "bg-orange-500 scale-110" : "bg-black"
                      }`}
                    >
                      <studio.icon className="w-8 h-8 text-white" />
                    </div>

                    <div>
                      <h3
                        className={`text-2xl font-black mb-2 tracking-tight ${
                          studio.featured ? "text-white" : "text-black"
                        }`}
                      >
                        {studio.title}
                      </h3>
                      <h3
                        className={`text-2xl font-black mb-4 tracking-tight ${
                          studio.featured ? "text-white" : "text-black"
                        }`}
                      >
                        {studio.subtitle}
                      </h3>
                      <p
                        className={`text-sm leading-relaxed font-sans ${
                          studio.featured ? "text-white/90" : hoveredCard === index ? "text-gray-700" : "text-gray-600"
                        }`}
                      >
                        {studio.description}
                      </p>
                    </div>

                    <div className="space-y-2 mt-auto">
                      {studio.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className={`text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                            studio.featured
                              ? "text-white/80"
                              : hoveredCard === index
                                ? "text-orange-600"
                                : "text-gray-500"
                          }`}
                        >
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
