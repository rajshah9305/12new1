"use client"

import { useState, useEffect } from "react"
import NeuralHero from "@/components/neural-hero"
import MorphingCards from "@/components/morphing-cards"
import LiquidTransition from "@/components/liquid-transitions"
import AdaptiveLayout from "@/components/adaptive-layout"
import { Card, CardContent } from "@/components/ui/card"
import {
  Zap,
  Brain,
  Rocket,
  Sparkles,
  Target,
  PenTool,
  Lock,
  Shield,
  CheckCircle,
  Users,
  FileText,
  Star,
  Clock,
  ChevronDown,
} from "lucide-react"

export default function EnhancedAIStudio() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [sectionInView, setSectionInView] = useState<string>("hero")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "studios", "benefits", "process", "security", "testimonials", "faq"]
      const scrollPosition = window.scrollY + window.innerHeight / 2

      sections.forEach((section) => {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setSectionInView(section)
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-white font-mono relative">
      {/* Enhanced Neural Hero */}
      <div id="hero">
        <NeuralHero />
      </div>

      {/* Liquid Transition */}
      <LiquidTransition isVisible={sectionInView === "studios"} />

      {/* Enhanced Studio Selection */}
      <div id="studios">
        <MorphingCards />
      </div>

      {/* Enhanced Benefits with Breathing Animation */}
      <section id="benefits" className="px-6 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-50 to-transparent opacity-50 animate-pulse"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-16">
            <h2 className="text-6xl font-black mb-4 tracking-tighter">
              <span className="text-black">WHY CHOOSE</span>
              <br />
              <span className="text-orange-500">OUR PLATFORM</span>
            </h2>
            <div className="w-32 h-1 bg-black"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Zap, title: "SAVE HOURS", subtitle: "DAILY", desc: "Automate repetitive tasks", color: "yellow" },
              {
                icon: Brain,
                title: "ELIMINATE",
                subtitle: "WRITER'S BLOCK",
                desc: "AI-powered creative assistance",
                color: "purple",
              },
              {
                icon: Rocket,
                title: "BOOST",
                subtitle: "PRODUCTIVITY",
                desc: "Complete projects faster",
                color: "blue",
              },
              {
                icon: Sparkles,
                title: "UNLOCK NEW",
                subtitle: "POSSIBILITIES",
                desc: "Explore creative directions",
                color: "green",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer transform hover:scale-105 hover:-rotate-1"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: sectionInView === "benefits" ? "fadeInUp 0.6s ease-out forwards" : "none",
                }}
              >
                <CardContent className="p-8 relative overflow-hidden">
                  {/* Organic background blob */}
                  <div
                    className={`absolute -top-4 -right-4 w-24 h-24 bg-${item.color}-100 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-150`}
                  ></div>

                  <div className="space-y-6 relative z-10">
                    <div
                      className={`w-16 h-16 bg-black flex items-center justify-center group-hover:bg-orange-500 transition-all duration-300 transform group-hover:rotate-12`}
                    >
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black tracking-tight">{item.title}</h3>
                      <h3 className="text-xl font-black tracking-tight mb-3">{item.subtitle}</h3>
                      <p className="text-gray-600 text-sm font-sans">{item.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Process with Flowing Connections */}
      <section id="process" className="px-6 py-20 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-6xl font-black mb-4 tracking-tighter">
              <span className="text-black">HOW IT</span>
              <br />
              <span className="text-orange-500">WORKS</span>
            </h2>
            <div className="w-32 h-1 bg-black"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Flowing connection lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              <defs>
                <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ff5722" stopOpacity="0" />
                  <stop offset="50%" stopColor="#ff5722" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#ff5722" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M 200,150 Q 400,100 600,150"
                stroke="url(#flowGradient)"
                strokeWidth="2"
                fill="none"
                className="animate-pulse"
              />
            </svg>

            {[
              {
                icon: Target,
                step: "01",
                title: "CHOOSE STUDIO",
                desc: "Select from four specialized AI environments",
              },
              { icon: PenTool, step: "02", title: "INPUT PROMPT", desc: "Describe what you want to create or analyze" },
              { icon: Sparkles, step: "03", title: "GENERATE & REFINE", desc: "Get AI-powered results instantly" },
            ].map((item, index) => (
              <Card
                key={index}
                className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-500 group cursor-pointer relative z-10"
                style={{
                  animationDelay: `${index * 0.2}s`,
                  animation: sectionInView === "process" ? "slideInFromBottom 0.8s ease-out forwards" : "none",
                }}
              >
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-black flex items-center justify-center group-hover:bg-orange-500 transition-all duration-300 transform group-hover:scale-110">
                        <item.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-4xl font-black text-orange-500 group-hover:scale-110 transition-transform duration-300">
                        {item.step}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-black tracking-tight mb-3 group-hover:text-orange-500 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm font-sans leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Security Section */}
      <section id="security" className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-6xl font-black mb-4 tracking-tighter">
              <span className="text-black">ENTERPRISE</span>
              <br />
              <span className="text-orange-500">SECURITY</span>
            </h2>
            <div className="w-32 h-1 bg-black"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Lock,
                title: "256-BIT",
                subtitle: "ENCRYPTION",
                desc: "Military-grade security",
                bgColor: "bg-green-50",
              },
              {
                icon: Shield,
                title: "PRIVACY",
                subtitle: "FIRST",
                desc: "Your content remains yours",
                bgColor: "bg-red-50",
              },
              {
                icon: CheckCircle,
                title: "GDPR",
                subtitle: "COMPLIANT",
                desc: "International standards",
                bgColor: "bg-blue-50",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className={`${item.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-500 group cursor-pointer transform hover:scale-105`}
              >
                <CardContent className="p-8 text-center">
                  <div className="space-y-6">
                    <div className="w-16 h-16 bg-black flex items-center justify-center mx-auto group-hover:bg-orange-500 transition-all duration-300 transform group-hover:rotate-12">
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black tracking-tight">{item.title}</h3>
                      <h3 className="text-2xl font-black tracking-tight mb-3">{item.subtitle}</h3>
                      <p className="text-gray-600 text-sm font-sans">{item.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section id="testimonials" className="px-6 py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-6xl font-black mb-4 tracking-tighter">
              <span className="text-black">TRUSTED BY</span>
              <br />
              <span className="text-orange-500">CREATORS</span>
            </h2>
            <div className="w-32 h-1 bg-black"></div>
          </div>

          {/* Animated Stats */}
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {[
              { icon: Users, stat: "50K+", label: "ACTIVE USERS" },
              { icon: FileText, stat: "2.4M+", label: "CONTENT CREATED" },
              { icon: Star, stat: "98%", label: "SATISFACTION" },
              { icon: Clock, stat: "5HRS", label: "TIME SAVED" },
            ].map((item, index) => (
              <Card
                key={index}
                className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-500 group"
              >
                <CardContent className="p-8 text-center">
                  <item.icon className="w-12 h-12 text-gray-400 mx-auto mb-4 group-hover:text-orange-500 transition-colors duration-300" />
                  <div className="text-4xl font-black text-orange-500 mb-2 group-hover:scale-110 transition-transform duration-300">
                    {item.stat}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-500">{item.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Floating Testimonials */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                initial: "SC",
                name: "SARAH CHEN",
                role: "CONTENT MANAGER",
                quote: "Revolutionized my workflow. Incredibly accurate suggestions.",
              },
              {
                initial: "MR",
                name: "MARCUS RODRIGUEZ",
                role: "SENIOR DEVELOPER",
                quote: "Game-changer for prototyping. Catches bugs I would miss.",
              },
              {
                initial: "EW",
                name: "DR. EMILY WATSON",
                role: "RESEARCH SCIENTIST",
                quote: "Document analysis made easy. Minutes instead of hours.",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-rotate-1"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: sectionInView === "testimonials" ? "floatIn 0.8s ease-out forwards" : "none",
                }}
              >
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-orange-500 flex items-center justify-center text-white font-black rounded-full">
                        {item.initial}
                      </div>
                      <div>
                        <div className="font-black text-sm tracking-wide">{item.name}</div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider">{item.role}</div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm font-sans leading-relaxed italic">"{item.quote}"</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced FAQ */}
      <section id="faq" className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <h2 className="text-6xl font-black mb-4 tracking-tighter">
              <span className="text-black">FREQUENTLY</span>
              <br />
              <span className="text-orange-500">ASKED QUESTIONS</span>
            </h2>
            <div className="w-32 h-1 bg-black"></div>
          </div>

          <div className="space-y-4">
            {[
              { q: "HOW DO I GET STARTED?", a: "Choose a studio, enter your prompt, get results. No setup required." },
              { q: "IS MY DATA SECURE?", a: "Enterprise-grade encryption. Never stored. Processed securely." },
              { q: "COMMERCIAL USE?", a: "All content can be used commercially. You own the rights." },
              { q: "FILE FORMATS?", a: "PDF, DOC, TXT for documents. Various image formats supported." },
            ].map((faq, index) => (
              <Card
                key={index}
                className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-8 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  >
                    <h3 className="text-xl font-black tracking-tight">{faq.q}</h3>
                    <div
                      className={`transform transition-transform duration-300 ${openFaq === index ? "rotate-180" : ""}`}
                    >
                      <ChevronDown className="w-6 h-6" />
                    </div>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      openFaq === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-8 pb-8 border-t border-gray-200">
                      <p className="text-gray-600 font-sans leading-relaxed pt-4">{faq.a}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Adaptive Final CTA */}
      <AdaptiveLayout />

      {/* Custom CSS for animations */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes floatIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  )
}
