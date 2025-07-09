"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Pause } from "lucide-react"

export default function WebGLHeroRefined() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePos, setMousePos] = useState<[number, number]>([0, 0])
  const [isPlaying, setIsPlaying] = useState(true)
  const animationRef = useRef<number>()
  const startTimeRef = useRef<number>(Date.now())
  const glRef = useRef<WebGLRenderingContext | null>(null)
  const programRef = useRef<WebGLProgram | null>(null)

  // Enhanced fragment shader with more sophisticated effects
  const fragmentShaderSource = `
    precision highp float;
    uniform float time;
    uniform vec2 mouse;
    uniform vec2 resolution;

    // Noise functions
    vec3 mod289(vec3 x) {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }

    vec4 mod289(vec4 x) {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }

    vec4 permute(vec4 x) {
      return mod289(((x*34.0)+1.0)*x);
    }

    vec4 taylorInvSqrt(vec4 r) {
      return 1.79284291400159 - 0.85373472095314 * r;
    }

    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

      vec3 i = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);

      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);

      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;

      i = mod289(i);
      vec4 p = permute(permute(permute(
                 i.z + vec4(0.0, i1.z, i2.z, 1.0))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0))
               + i.x + vec4(0.0, i1.x, i2.x, 1.0));

      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;

      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);

      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);

      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);

      vec4 s0 = floor(b0) * 2.0 + 1.0;
      vec4 s1 = floor(b1) * 2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));

      vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);

      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;

      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }

    // Neural network visualization
    float neuralNetwork(vec2 uv, float t) {
      float pattern = 0.0;
      
      // Multiple layers with different frequencies
      for(int i = 0; i < 5; i++) {
        float layer = float(i);
        vec3 pos = vec3(uv * (1.0 + layer * 0.5), t * 0.1 + layer);
        
        // 3D noise for more complex patterns
        float noise = snoise(pos);
        
        // Create neural firing effect
        float firing = smoothstep(0.3, 0.7, sin(t * 2.0 + layer + noise * 5.0));
        
        // Add to pattern with decreasing influence
        pattern += noise * firing / (layer + 1.0);
      }
      
      return pattern;
    }

    // Data flow streams
    float dataStreams(vec2 uv, float t) {
      vec2 flow = uv;
      
      // Create flowing effect
      flow.x += sin(uv.y * 8.0 + t * 3.0) * 0.1;
      flow.y += cos(uv.x * 6.0 + t * 2.0) * 0.1;
      
      // Multiple stream layers
      float streams = 0.0;
      for(int i = 0; i < 3; i++) {
        float layer = float(i) + 1.0;
        vec2 streamUV = flow * layer + t * 0.5;
        
        float stream = abs(sin(streamUV.x * 10.0)) * abs(sin(streamUV.y * 8.0));
        streams += smoothstep(0.7, 1.0, stream) / layer;
      }
      
      return streams;
    }

    // Mouse interaction field
    float mouseField(vec2 uv, vec2 mouseUV, float t) {
      float dist = length(uv - mouseUV);
      float influence = 1.0 - smoothstep(0.0, 0.8, dist);
      
      // Ripple effect
      float ripple = sin(dist * 20.0 - t * 8.0) * 0.5 + 0.5;
      
      return influence * ripple;
    }

    void main() {
      vec2 uv = (gl_FragCoord.xy - 0.5 * resolution.xy) / resolution.y;
      vec2 mouseUV = (mouse - 0.5 * resolution.xy) / resolution.y;
      
      float t = time * 0.001;
      
      // Neural network pattern
      float neural = neuralNetwork(uv, t);
      
      // Data streams
      float streams = dataStreams(uv, t);
      
      // Mouse interaction
      float mouseInfluence = mouseField(uv, mouseUV, t * 1000.0);
      
      // Combine effects
      float intensity = neural * 0.6 + streams * 0.4 + mouseInfluence * 0.3;
      
      // Enhanced color palette
      vec3 color1 = vec3(1.0, 0.34, 0.13); // Orange
      vec3 color2 = vec3(0.0, 0.0, 0.0);   // Black
      vec3 color3 = vec3(1.0, 1.0, 1.0);   // White
      vec3 accent = vec3(1.0, 0.6, 0.0);   // Light orange
      
      // Create gradient based on intensity
      vec3 finalColor = mix(color2, color1, intensity);
      finalColor = mix(finalColor, accent, intensity * intensity * 0.5);
      finalColor = mix(finalColor, color3, pow(intensity, 3.0) * 0.2);
      
      // Add subtle vignette
      float vignette = 1.0 - length(uv) * 0.3;
      finalColor *= vignette;
      
      gl_FragColor = vec4(finalColor, 0.9);
    }
  `

  const vertexShaderSource = `
    attribute vec4 position;
    void main() {
      gl_Position = position;
    }
  `

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl", {
      antialias: true,
      alpha: true,
      premultipliedAlpha: false,
    })
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

    // Set up geometry
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

    // Animation loop
    const animate = () => {
      if (!isPlaying) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      const currentTime = Date.now() - startTimeRef.current

      // Resize canvas
      const displayWidth = canvas.clientWidth
      const displayHeight = canvas.clientHeight

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth
        canvas.height = displayHeight
        gl.viewport(0, 0, canvas.width, canvas.height)
      }

      // Set uniforms
      gl.uniform1f(timeLocation, currentTime)
      gl.uniform2f(mouseLocation, mousePos[0], mousePos[1])
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height)

      // Clear and draw
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mousePos, isPlaying])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      setMousePos([e.clientX - rect.left, e.clientY - rect.top])
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* WebGL Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" onMouseMove={handleMouseMove} />

      {/* Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div className="space-y-8">
          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-8xl lg:text-9xl xl:text-[12rem] font-black leading-none tracking-tighter text-white">
              <div
                className="transform transition-transform duration-300"
                style={{ transform: `translateX(${mousePos[0] * 0.01}px)` }}
              >
                AI
              </div>
              <div
                className="transform transition-transform duration-300"
                style={{ transform: `translateX(${mousePos[0] * -0.01}px)` }}
              >
                CREATIVE
              </div>
              <div className="text-orange-500 relative">
                STUDIO
                <div className="absolute -bottom-4 left-0 w-full h-3 bg-orange-500"></div>
              </div>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="max-w-4xl mx-auto">
            <p className="text-2xl lg:text-3xl text-gray-300 leading-relaxed font-light">
              Experience the future of AI creativity with neural network visualizations, machine learning
              personalization, and real-time collaboration.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <Button
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-6 text-lg font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              START CREATING
              <ArrowRight className="ml-3 w-6 h-6" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-black px-12 py-6 text-lg font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 bg-transparent"
            >
              WATCH DEMO
              <Play className="ml-3 w-6 h-6" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t border-gray-700">
            {[
              { value: "2.4M+", label: "TOKENS GENERATED" },
              { value: "150MS", label: "AVG RESPONSE TIME" },
              { value: "99.9%", label: "UPTIME" },
              { value: "50K+", label: "ACTIVE USERS" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-black text-orange-500 mb-2">{stat.value}</div>
                <div className="text-gray-400 uppercase tracking-wide text-sm font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WebGL Controls */}
      <div className="absolute bottom-8 right-8 z-20">
        <Button
          onClick={() => setIsPlaying(!isPlaying)}
          size="sm"
          variant="outline"
          className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center space-y-2 text-white/60">
          <span className="text-xs uppercase tracking-wider font-bold">Scroll to explore</span>
          <div className="w-px h-12 bg-white/30 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
