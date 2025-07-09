"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
}

export default function NeuralHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [particles, setParticles] = useState<Particle[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Initialize particles
    const initParticles: Particle[] = []
    for (let i = 0; i < 50; i++) {
      initParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        life: Math.random() * 100,
        maxLife: 100,
      })
    }
    setParticles(initParticles)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      setParticles((prev) =>
        prev.map((particle) => {
          // Update position
          particle.x += particle.vx
          particle.y += particle.vy
          particle.life += 0.5

          // Wrap around edges
          if (particle.x < 0) particle.x = canvas.width
          if (particle.x > canvas.width) particle.x = 0
          if (particle.y < 0) particle.y = canvas.height
          if (particle.y > canvas.height) particle.y = 0

          // Reset if life exceeded
          if (particle.life > particle.maxLife) {
            particle.life = 0
            particle.x = Math.random() * canvas.width
            particle.y = Math.random() * canvas.height
          }

          // Draw particle
          const alpha = 1 - particle.life / particle.maxLife
          ctx.fillStyle = `rgba(255, 87, 34, ${alpha * 0.3})`
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, 1, 0, Math.PI * 2)
          ctx.fill()

          return particle
        }),
      )

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            const alpha = (1 - distance / 100) * 0.1
            ctx.strokeStyle = `rgba(255, 87, 34, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [particles])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  return (
    <section className="relative px-6 py-20 lg:py-32 overflow-hidden bg-black text-white">
      {/* Neural Network Canvas */}
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="absolute inset-0 w-full h-full opacity-20"
        onMouseMove={handleMouseMove}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <div className="text-8xl lg:text-9xl font-black leading-none tracking-tighter">
                <div
                  className="text-white transform transition-transform duration-300"
                  style={{ transform: `translateX(${mousePos.x * 0.01}px)` }}
                >
                  AI
                </div>
                <div
                  className="text-white transform transition-transform duration-300"
                  style={{ transform: `translateX(${mousePos.x * -0.01}px)` }}
                >
                  CREATIVE
                </div>
                <div className="text-orange-500 relative">
                  STUDIO
                  <div className="absolute -bottom-2 left-0 w-full h-2 bg-orange-500"></div>
                </div>
              </div>
            </div>

            <div className="max-w-2xl">
              <p className="text-xl text-gray-300 leading-relaxed font-sans">
                Four specialized AI environments. Generate content, optimize code, analyze documents, craft stories.
              </p>
            </div>

            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-6 text-lg font-bold uppercase tracking-wider transition-all duration-200 hover:scale-105">
              START CREATING
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Enhanced 3D Geometric Element */}
          <div className="lg:col-span-4 flex justify-center">
            <div
              className="w-80 h-80 relative transform transition-transform duration-300"
              style={{
                transform: `perspective(1000px) rotateX(${mousePos.y * 0.05}deg) rotateY(${mousePos.x * 0.05}deg)`,
              }}
            >
              <div className="absolute inset-0 border-4 border-white"></div>
              <div className="absolute inset-4 border-2 border-orange-500"></div>
              <div className="absolute inset-8 border border-gray-300"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-orange-500 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
