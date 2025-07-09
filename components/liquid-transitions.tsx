"use client"

import { useEffect, useRef } from "react"

interface LiquidTransitionProps {
  isVisible: boolean
  color?: string
}

export default function LiquidTransition({ isVisible, color = "#ff5722" }: LiquidTransitionProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const path = svgRef.current.querySelector("path")
    if (!path) return

    // Animate the liquid blob
    const animate = () => {
      const time = Date.now() * 0.002
      const amplitude = 20
      const frequency = 0.02

      let pathData = `M 0,100`

      for (let x = 0; x <= 400; x += 10) {
        const y =
          100 + Math.sin(x * frequency + time) * amplitude + Math.sin(x * frequency * 2 + time * 1.5) * amplitude * 0.5
        pathData += ` L ${x},${y}`
      }

      pathData += ` L 400,200 L 0,200 Z`
      path.setAttribute("d", pathData)

      requestAnimationFrame(animate)
    }

    if (isVisible) {
      animate()
    }
  }, [isVisible])

  return (
    <div className={`absolute inset-x-0 transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
      <svg ref={svgRef} viewBox="0 0 400 200" className="w-full h-32" preserveAspectRatio="none">
        <path d="M 0,100 L 400,100 L 400,200 L 0,200 Z" fill={color} opacity="0.1" />
      </svg>
    </div>
  )
}
