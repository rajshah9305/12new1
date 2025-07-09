"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface ShaderUniforms {
  time: number
  mouse: [number, number]
  resolution: [number, number]
}

export default function WebGLHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePos, setMousePos] = useState<[number, number]>([0, 0])
  const animationRef = useRef<number>()
  const startTimeRef = useRef<number>(Date.now())
  const glRef = useRef<WebGLRenderingContext | null>(null)
  const programRef = useRef<WebGLProgram | null>(null)
  const timeLocationRef = useRef<WebGLUniformLocation | null>(null)
  const mouseLocationRef = useRef<WebGLUniformLocation | null>(null)
  const resolutionLocationRef = useRef<WebGLUniformLocation | null>(null)

  // Vertex shader source
  const vertexShaderSource = `
    attribute vec4 position;
    void main() {
      gl_Position = position;
    }
  `

  // Fragment shader source - Neural network visualization
  const fragmentShaderSource = `
    precision mediump float;
    uniform float time;
    uniform vec2 mouse;
    uniform vec2 resolution;

    // Noise function
    float noise(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    }

    // Smooth noise
    float smoothNoise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      
      float a = noise(i);
      float b = noise(i + vec2(1.0, 0.0));
      float c = noise(i + vec2(0.0, 1.0));
      float d = noise(i + vec2(1.0, 1.0));
      
      return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
    }

    // Neural network pattern
    float neuralPattern(vec2 uv, float t) {
      float pattern = 0.0;
      
      // Multiple layers of neural connections
      for(int i = 0; i < 3; i++) {
        float layer = float(i);
        vec2 p = uv * (2.0 + layer) + t * 0.1;
        
        // Create node positions
        vec2 node1 = vec2(sin(t + layer), cos(t * 0.7 + layer)) * 0.3;
        vec2 node2 = vec2(cos(t * 0.8 + layer), sin(t * 0.6 + layer)) * 0.3;
        
        // Distance to nodes
        float d1 = length(uv - node1);
        float d2 = length(uv - node2);
        
        // Connection strength
        float connection = exp(-d1 * 8.0) + exp(-d2 * 8.0);
        
        // Neural firing effect
        float firing = smoothstep(0.1, 0.0, abs(sin(t * 3.0 + layer * 2.0) - d1 * 10.0));
        
        pattern += connection * (0.3 + firing * 0.7) / (layer + 1.0);
      }
      
      return pattern;
    }

    // Data flow visualization
    float dataFlow(vec2 uv, float t) {
      vec2 flow = uv;
      flow.x += sin(uv.y * 10.0 + t * 2.0) * 0.1;
      flow.y += cos(uv.x * 8.0 + t * 1.5) * 0.1;
      
      float lines = abs(sin(flow.x * 20.0 + t * 3.0)) * 
                   abs(sin(flow.y * 15.0 + t * 2.0));
      
      return smoothstep(0.8, 1.0, lines) * 0.5;
    }

    void main() {
      vec2 uv = (gl_FragCoord.xy - 0.5 * resolution.xy) / resolution.y;
      vec2 mouseUV = (mouse - 0.5 * resolution.xy) / resolution.y;
      
      float t = time * 0.001;
      
      // Mouse interaction
      float mouseInfluence = 1.0 - smoothstep(0.0, 0.5, length(uv - mouseUV));
      
      // Neural network pattern
      float neural = neuralPattern(uv, t + mouseInfluence * 2.0);
      
      // Data flow
      float flow = dataFlow(uv, t);
      
      // Combine effects
      float intensity = neural + flow * 0.5;
      intensity *= (1.0 + mouseInfluence * 0.5);
      
      // Color gradient
      vec3 color1 = vec3(1.0, 0.34, 0.13); // Orange
      vec3 color2 = vec3(0.0, 0.0, 0.0);   // Black
      vec3 color3 = vec3(1.0, 1.0, 1.0);   // White
      
      vec3 finalColor = mix(color2, color1, intensity);
      finalColor = mix(finalColor, color3, intensity * intensity * 0.3);
      
      // Add subtle noise
      finalColor += smoothNoise(uv * 100.0 + t * 10.0) * 0.05;
      
      gl_FragColor = vec4(finalColor, 0.8);
    }
  `

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl")
    if (!gl) return

    glRef.current = gl

    // Compile shader
    const compileShader = (source: string, type: number) => {
      const shader = gl.createShader(type)
      if (!shader) return null

      gl.shaderSource(shader, source)
      gl.compileShader(shader)

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compilation error:", gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }

      return shader
    }

    // Create program
    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER)
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER)

    if (!vertexShader || !fragmentShader) return

    const program = gl.createProgram()
    if (!program) return

    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program linking error:", gl.getProgramInfoLog(program))
      return
    }

    programRef.current = program

    // Set up geometry (full screen quad)
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

    const positionLocation = gl.getAttribLocation(program, "position")
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    // Get uniform locations
    const timeLocation = gl.getUniformLocation(program, "time")
    const mouseLocation = gl.getUniformLocation(program, "mouse")
    const resolutionLocation = gl.getUniformLocation(program, "resolution")

    timeLocationRef.current = timeLocation
    mouseLocationRef.current = mouseLocation
    resolutionLocationRef.current = resolutionLocation

    // Animation loop
    const animate = () => {
      const currentTime = Date.now() - startTimeRef.current
      const gl = glRef.current
      const program = programRef.current
      const timeLocation = timeLocationRef.current
      const mouseLocation = mouseLocationRef.current
      const resolutionLocation = resolutionLocationRef.current

      if (!gl || !program || !timeLocation || !mouseLocation || !resolutionLocation) return

      // Resize canvas
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      gl.viewport(0, 0, canvas.width, canvas.height)

      // Set uniforms
      gl.uniform1f(timeLocation, currentTime)
      gl.uniform2f(mouseLocation, mousePos[0], mousePos[1])
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height)

      // Draw
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      const gl = glRef.current
      const program = programRef.current
      const vertexShader = gl?.getAttachedShaders(program)?.[0]
      const fragmentShader = gl?.getAttachedShaders(program)?.[1]

      if (gl) {
        gl.deleteProgram(program)
        if (vertexShader) gl.deleteShader(vertexShader)
        if (fragmentShader) gl.deleteShader(fragmentShader)
      }
    }
  }, [mousePos])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      setMousePos([e.clientX - rect.left, e.clientY - rect.top])
    }
  }

  return (
    <section className="relative px-6 py-20 lg:py-32 overflow-hidden bg-black text-white">
      {/* WebGL Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        onMouseMove={handleMouseMove}
        style={{ mixBlendMode: "screen" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <div className="text-8xl lg:text-9xl font-black leading-none tracking-tighter">
                <div className="text-white">AI</div>
                <div className="text-white">CREATIVE</div>
                <div className="text-orange-500 relative">
                  STUDIO
                  <div className="absolute -bottom-2 left-0 w-full h-2 bg-orange-500"></div>
                </div>
              </div>
            </div>

            <div className="max-w-2xl">
              <p className="text-xl text-gray-300 leading-relaxed font-sans">
                Experience the future of AI creativity with neural network visualizations and real-time shader effects.
              </p>
            </div>

            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-6 text-lg font-bold uppercase tracking-wider transition-all duration-200 hover:scale-105">
              ENTER THE NEURAL SPACE
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
