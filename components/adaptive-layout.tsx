"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function AdaptiveLayout() {
  const [userBehavior, setUserBehavior] = useState({
    scrollSpeed: 0,
    hoverTime: 0,
    clickPattern: "normal" as "normal" | "fast" | "deliberate",
  })

  const [layoutMode, setLayoutMode] = useState<"compact" | "spacious" | "focused">("spacious")

  useEffect(() => {
    let lastScrollY = window.scrollY
    let scrollTimer: NodeJS.Timeout

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollSpeed = Math.abs(currentScrollY - lastScrollY)

      setUserBehavior((prev) => ({ ...prev, scrollSpeed }))
      lastScrollY = currentScrollY

      // Adapt layout based on scroll behavior
      if (scrollSpeed > 20) {
        setLayoutMode("compact") // Fast scrolling = show more content
      } else if (scrollSpeed < 5) {
        setLayoutMode("focused") // Slow scrolling = focus on current section
      } else {
        setLayoutMode("spacious") // Normal scrolling = balanced layout
      }

      clearTimeout(scrollTimer)
      scrollTimer = setTimeout(() => {
        setLayoutMode("spacious")
      }, 2000)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(scrollTimer)
    }
  }, [])

  return (
    <section
      className={`px-6 transition-all duration-1000 ${
        layoutMode === "compact" ? "py-10" : layoutMode === "focused" ? "py-32" : "py-20"
      } bg-black text-white relative overflow-hidden`}
    >
      {/* Breathing background effect */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent transition-all duration-4000"
        style={{
          transform: `scale(${1 + Math.sin(Date.now() * 0.001) * 0.05})`,
          opacity: layoutMode === "focused" ? 0.3 : 0.1,
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2
          className={`font-black mb-6 tracking-tighter transition-all duration-1000 ${
            layoutMode === "compact" ? "text-4xl" : layoutMode === "focused" ? "text-8xl" : "text-6xl"
          }`}
        >
          READY TO TRANSFORM
          <br />
          <span className="text-orange-500">YOUR CREATIVE PROCESS?</span>
        </h2>

        <div className="w-32 h-1 bg-orange-500 mx-auto mb-8"></div>

        <p
          className={`mb-12 text-gray-300 font-sans transition-all duration-1000 ${
            layoutMode === "compact" ? "text-base" : layoutMode === "focused" ? "text-2xl" : "text-xl"
          }`}
        >
          Join thousands of creators using AI to bring ideas to life
        </p>

        <Button
          className={`bg-orange-500 hover:bg-orange-600 text-white font-bold uppercase tracking-wider transition-all duration-500 hover:scale-105 ${
            layoutMode === "compact"
              ? "px-8 py-4 text-base"
              : layoutMode === "focused"
                ? "px-16 py-8 text-xl"
                : "px-12 py-6 text-lg"
          }`}
        >
          START CREATING NOW
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </section>
  )
}
