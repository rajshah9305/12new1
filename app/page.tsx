"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

// Import refined components
import HeroSection from "@/components/hero-section"
import StudioSelector from "@/components/studio-selector"
import BenefitsSection from "@/components/benefits-section"
import ProcessFlow from "@/components/process-flow"
import TestimonialSection from "@/components/testimonial-section"
import FAQSection from "@/components/faq-section"
import CTASection from "@/components/cta-section"
import Footer from "@/components/footer"

export default function AICreativeStudio() {
  const [scrollY, setScrollY] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentSection, setCurrentSection] = useState("hero")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)

    // Loading animation
    setTimeout(() => setIsLoaded(true), 500)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Section tracking for navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "studios", "benefits", "process", "testimonials", "faq", "cta"]
      const scrollPosition = window.scrollY + window.innerHeight / 2

      sections.forEach((section) => {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(section)
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigationItems = [
    { id: "studios", label: "Studios" },
    { id: "benefits", label: "Benefits" },
    { id: "process", label: "Process" },
    { id: "testimonials", label: "Reviews" },
    { id: "faq", label: "FAQ" },
  ]

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    setMobileMenuOpen(false)
  }

  return (
    <div
      className={`min-h-screen bg-white font-mono transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
    >
      {/* Enhanced Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="text-xl lg:text-2xl font-black tracking-tighter">
              AI<span className="text-orange-500">STUDIO</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-bold uppercase tracking-wider transition-colors hover:text-orange-500 ${
                    currentSection === item.id ? "text-orange-500" : "text-gray-600"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <Button className="bg-black hover:bg-gray-900 text-white px-6 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105">
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-6 space-y-4">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left text-lg font-bold uppercase tracking-wider text-gray-600 hover:text-orange-500 transition-colors py-2"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4">
                <Button className="w-full bg-black hover:bg-gray-900 text-white py-3 text-sm font-bold uppercase tracking-wider">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main>
        <section id="hero">
          <HeroSection />
        </section>

        <section id="studios">
          <StudioSelector />
        </section>

        <section id="benefits">
          <BenefitsSection />
        </section>

        <section id="process">
          <ProcessFlow />
        </section>

        <section id="testimonials">
          <TestimonialSection />
        </section>

        <section id="faq">
          <FAQSection />
        </section>

        <section id="cta">
          <CTASection />
        </section>
      </main>

      <Footer />

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

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        ::-webkit-scrollbar-thumb {
          background: #ff5722;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #e64a19;
        }

        /* Responsive text scaling */
        @media (max-width: 640px) {
          .text-responsive-xl {
            font-size: 2.5rem;
            line-height: 1.1;
          }
          .text-responsive-2xl {
            font-size: 3rem;
            line-height: 1.1;
          }
          .text-responsive-3xl {
            font-size: 3.5rem;
            line-height: 1.1;
          }
        }

        @media (min-width: 641px) and (max-width: 1024px) {
          .text-responsive-xl {
            font-size: 3.5rem;
            line-height: 1.1;
          }
          .text-responsive-2xl {
            font-size: 4.5rem;
            line-height: 1.1;
          }
          .text-responsive-3xl {
            font-size: 5.5rem;
            line-height: 1.1;
          }
        }

        @media (min-width: 1025px) {
          .text-responsive-xl {
            font-size: 4rem;
            line-height: 1.1;
          }
          .text-responsive-2xl {
            font-size: 6rem;
            line-height: 1.1;
          }
          .text-responsive-3xl {
            font-size: 8rem;
            line-height: 1.1;
          }
        }
      `}</style>
    </div>
  )
}
