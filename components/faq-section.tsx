"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, Search, MessageCircle, Book, Shield, Zap } from "lucide-react"

const faqCategories = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: Book,
    color: "from-blue-500 to-blue-600",
    questions: [
      {
        q: "How do I get started with AI Creative Studio?",
        a: "Getting started is simple! Choose your preferred studio environment, enter your creative prompt, and watch as our AI generates high-quality results. No technical setup required - just sign up and start creating immediately.",
      },
      {
        q: "Do I need any technical knowledge to use the platform?",
        a: "Not at all! AI Creative Studio is designed for creators of all technical levels. Our intuitive interface and natural language processing make it easy for anyone to create professional-quality content.",
      },
      {
        q: "What types of content can I create?",
        a: "You can create text content, code, analyze documents, and craft creative writing across multiple formats. Each studio is specialized for different creative needs.",
      },
    ],
  },
  {
    id: "security",
    title: "Security & Privacy",
    icon: Shield,
    color: "from-green-500 to-green-600",
    questions: [
      {
        q: "Is my data secure and private?",
        a: "Absolutely. We use enterprise-grade 256-bit encryption, never store your content permanently, and are fully GDPR compliant. Your creative work remains yours, always.",
      },
      {
        q: "Can I use the generated content commercially?",
        a: "Yes! All content generated through AI Creative Studio can be used commercially. You retain full ownership and rights to everything you create.",
      },
      {
        q: "How do you handle sensitive information?",
        a: "All data is processed securely with end-to-end encryption. We never access, store, or share your content. Privacy is built into our core architecture.",
      },
    ],
  },
  {
    id: "features",
    title: "Features & Capabilities",
    icon: Zap,
    color: "from-orange-500 to-orange-600",
    questions: [
      {
        q: "What makes AI Creative Studio different?",
        a: "Our platform combines four specialized AI environments with advanced features like intelligent content generation, multi-format support, and seamless workflow integration.",
      },
      {
        q: "Can I integrate with my existing tools?",
        a: "Yes! We offer API access and integrations with popular tools like Slack, Google Workspace, and various content management systems.",
      },
      {
        q: "What file formats are supported?",
        a: "We support a wide range of formats including PDF, DOC, TXT for documents, and various image formats. Export options include multiple text and code formats.",
      },
    ],
  },
  {
    id: "support",
    title: "Support & Help",
    icon: MessageCircle,
    color: "from-purple-500 to-purple-600",
    questions: [
      {
        q: "What support options are available?",
        a: "We offer 24/7 chat support, comprehensive documentation, video tutorials, and a community forum. Enterprise customers get dedicated support channels.",
      },
      {
        q: "How can I provide feedback or request features?",
        a: "We love feedback! Use the in-app feedback system, join our community forum, or contact our support team directly. Your input shapes our roadmap.",
      },
      {
        q: "Are there any usage limits?",
        a: "Usage limits depend on your plan. Free users get generous limits to explore the platform, while paid plans offer increased capacity and priority processing.",
      },
    ],
  },
]

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState("getting-started")
  const [openQuestion, setOpenQuestion] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const toggleQuestion = (categoryId: string, questionIndex: number) => {
    const questionId = `${categoryId}-${questionIndex}`
    setOpenQuestion(openQuestion === questionId ? null : questionId)
  }

  const filteredCategories = faqCategories
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.a.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0)

  const currentCategory = faqCategories.find((cat) => cat.id === activeCategory) || faqCategories[0]

  return (
    <section ref={sectionRef} className="px-4 sm:px-6 lg:px-8 py-16 lg:py-32 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 lg:w-96 h-64 lg:h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 lg:w-96 h-64 lg:h-96 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-20">
          <h2
            className={`text-responsive-2xl font-black mb-4 lg:mb-6 tracking-tighter transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <span className="text-black">FREQUENTLY</span>
            <br />
            <span className="text-orange-500">ASKED QUESTIONS</span>
          </h2>
          <div
            className={`w-24 lg:w-32 h-1 lg:h-2 bg-black mx-auto mb-6 lg:mb-8 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
          />
          <p
            className={`text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Find answers to common questions about AI Creative Studio
          </p>
        </div>

        {/* Search Bar */}
        <div
          className={`mb-8 lg:mb-12 transition-all duration-1000 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 lg:py-4 border-2 border-gray-200 rounded-xl text-base lg:text-lg focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div
          className={`flex flex-wrap justify-center gap-3 lg:gap-4 mb-8 lg:mb-12 transition-all duration-1000 delay-800 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {faqCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 lg:space-x-3 px-4 lg:px-6 py-2 lg:py-3 rounded-xl font-bold uppercase tracking-wider text-xs lg:text-sm transition-all duration-300 ${
                activeCategory === category.id
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg scale-105`
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105"
              }`}
            >
              <category.icon className="w-4 lg:w-5 h-4 lg:h-5" />
              <span>{category.title}</span>
            </button>
          ))}
        </div>

        {/* FAQ Content */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Category Info */}
          <div className="lg:col-span-4">
            <Card className={`bg-gradient-to-br ${currentCategory.color} text-white border-0 shadow-xl sticky top-8`}>
              <CardContent className="p-6 lg:p-8">
                <div className="flex items-center space-x-4 mb-4 lg:mb-6">
                  <div className="w-12 lg:w-16 h-12 lg:h-16 bg-white/20 rounded-xl flex items-center justify-center">
                    <currentCategory.icon className="w-6 lg:w-8 h-6 lg:h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl lg:text-2xl font-black tracking-tight">{currentCategory.title}</h3>
                    <p className="text-white/80 text-sm lg:text-base">{currentCategory.questions.length} questions</p>
                  </div>
                </div>

                <p className="text-white/90 leading-relaxed mb-4 lg:mb-6 text-sm lg:text-base">
                  {currentCategory.id === "getting-started" &&
                    "Everything you need to know to start your AI creative journey."}
                  {currentCategory.id === "security" && "Learn about our security measures and privacy protection."}
                  {currentCategory.id === "features" && "Discover the powerful features that make us unique."}
                  {currentCategory.id === "support" && "Get help and connect with our support community."}
                </p>

                <Button
                  variant="outline"
                  className="w-full border-white/30 text-white hover:bg-white/10 bg-transparent"
                >
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Questions */}
          <div className="lg:col-span-8">
            <div className="space-y-4">
              {(searchQuery ? filteredCategories : [currentCategory]).map((category) =>
                category.questions.map((faq, index) => {
                  const questionId = `${category.id}-${index}`
                  const isOpen = openQuestion === questionId

                  return (
                    <Card
                      key={questionId}
                      className={`border-2 transition-all duration-300 hover:shadow-lg ${
                        isOpen
                          ? `${category.color.replace("from-", "border-").replace(" to-" + category.color.split(" to-")[1], "")} shadow-xl`
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <CardContent className="p-0">
                        <button
                          onClick={() => toggleQuestion(category.id, index)}
                          className="w-full p-4 lg:p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <h3
                            className={`text-base lg:text-lg font-bold pr-4 ${
                              isOpen
                                ? category.color
                                    .replace("from-", "text-")
                                    .replace(" to-" + category.color.split(" to-")[1], "")
                                : "text-gray-900"
                            }`}
                          >
                            {faq.q}
                          </h3>
                          <div className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                            <ChevronDown
                              className={`w-5 lg:w-6 h-5 lg:h-6 ${
                                isOpen
                                  ? category.color
                                      .replace("from-", "text-")
                                      .replace(" to-" + category.color.split(" to-")[1], "")
                                  : "text-gray-400"
                              }`}
                            />
                          </div>
                        </button>

                        <div
                          className={`overflow-hidden transition-all duration-500 ${
                            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="px-4 lg:px-6 pb-4 lg:pb-6 border-t border-gray-200">
                            <p className="text-gray-600 leading-relaxed pt-4 text-sm lg:text-base">{faq.a}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                }),
              )}
            </div>

            {searchQuery && filteredCategories.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-12 lg:w-16 h-12 lg:h-16 mx-auto mb-4" />
                  <p className="text-lg lg:text-xl">No results found for "{searchQuery}"</p>
                  <p className="text-gray-500">Try different keywords or browse categories above</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 lg:mt-20">
          <div
            className={`transition-all duration-1000 delay-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <p className="text-gray-600 mb-6 text-base lg:text-lg">Still have questions? We're here to help!</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 lg:px-8 py-3 lg:py-4 font-bold uppercase tracking-wider"
              >
                Contact Support
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-gray-300 text-gray-700 hover:border-orange-500 hover:text-orange-500 px-6 lg:px-8 py-3 lg:py-4 font-bold uppercase tracking-wider bg-transparent"
              >
                Join Community
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
