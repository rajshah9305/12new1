"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mic, MicOff, Volume2, VolumeX, MessageSquare, Zap, HelpCircle } from "lucide-react"
import type SpeechRecognition from "speech-recognition"

interface VoiceCommand {
  command: string
  action: string
  confidence: number
  timestamp: number
}

interface VoiceState {
  isListening: boolean
  isProcessing: boolean
  isSpeaking: boolean
  transcript: string
  lastCommand: VoiceCommand | null
  supportedCommands: string[]
  isEnabled: boolean
  confidence: number
}

export default function VoiceInterfaceRefined() {
  const [voiceState, setVoiceState] = useState<VoiceState>({
    isListening: false,
    isProcessing: false,
    isSpeaking: false,
    transcript: "",
    lastCommand: null,
    supportedCommands: [
      "navigate to studios",
      "show me code generation",
      "tell me about security",
      "start creating",
      "read testimonials",
      "explain how it works",
      "show pricing",
      "contact support",
      "enable dark mode",
      "scroll to top",
      "open collaboration",
      "show analytics",
      "help",
      "tutorial",
    ],
    isEnabled: false,
    confidence: 0,
  })

  const [showTutorial, setShowTutorial] = useState(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const synthesisRef = useRef<SpeechSynthesis | null>(null)

  // Initialize speech recognition and synthesis
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true
        recognitionRef.current.lang = "en-US"

        recognitionRef.current.onresult = (event) => {
          let transcript = ""
          let confidence = 0

          for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript
            confidence = event.results[i][0].confidence || 0.8
          }

          setVoiceState((prev) => ({ ...prev, transcript, confidence }))

          if (event.results[event.results.length - 1].isFinal) {
            processVoiceCommand(transcript, confidence)
          }
        }

        recognitionRef.current.onerror = (event) => {
          console.error("Speech recognition error:", event.error)
          setVoiceState((prev) => ({
            ...prev,
            isListening: false,
            isProcessing: false,
            transcript: `Error: ${event.error}`,
          }))
        }

        recognitionRef.current.onend = () => {
          setVoiceState((prev) => ({ ...prev, isListening: false }))
        }
      }

      if (window.speechSynthesis) {
        synthesisRef.current = window.speechSynthesis
      }

      setVoiceState((prev) => ({
        ...prev,
        isEnabled: !!(SpeechRecognition && window.speechSynthesis),
      }))
    }
  }, [])

  // Process voice commands with enhanced AI
  const processVoiceCommand = (transcript: string, confidence: number) => {
    setVoiceState((prev) => ({ ...prev, isProcessing: true }))

    const command = transcript.toLowerCase().trim()
    let bestMatch: VoiceCommand | null = null
    let highestScore = 0

    // Advanced command matching with fuzzy logic
    voiceState.supportedCommands.forEach((supportedCommand) => {
      const score = calculateCommandScore(command, supportedCommand)
      if (score > highestScore && score > 0.3) {
        highestScore = score
        bestMatch = {
          command: supportedCommand,
          action: getActionForCommand(supportedCommand),
          confidence: score * confidence,
          timestamp: Date.now(),
        }
      }
    })

    if (bestMatch) {
      setVoiceState((prev) => ({ ...prev, lastCommand: bestMatch, isProcessing: false }))
      executeCommand(bestMatch)
      speak(`Executing: ${bestMatch.command}`)
    } else {
      setVoiceState((prev) => ({ ...prev, isProcessing: false }))
      speak(
        "I didn't understand that command. Try saying 'help' for available commands, or 'show tutorial' for guidance.",
      )
    }
  }

  // Enhanced command scoring algorithm
  const calculateCommandScore = (spoken: string, target: string): number => {
    const spokenWords = spoken.toLowerCase().split(" ")
    const targetWords = target.toLowerCase().split(" ")

    let exactMatches = 0
    let partialMatches = 0
    let orderBonus = 0

    targetWords.forEach((targetWord, index) => {
      spokenWords.forEach((spokenWord, spokenIndex) => {
        if (spokenWord === targetWord) {
          exactMatches++
          if (Math.abs(index - spokenIndex) <= 1) orderBonus += 0.1
        } else if (spokenWord.includes(targetWord) || targetWord.includes(spokenWord)) {
          partialMatches += 0.5
        }
      })
    })

    const baseScore = (exactMatches + partialMatches) / targetWords.length
    return Math.min(baseScore + orderBonus, 1)
  }

  // Get action for command
  const getActionForCommand = (command: string): string => {
    const actions: Record<string, string> = {
      "navigate to studios": "scroll_to_studios",
      "show me code generation": "highlight_code_studio",
      "tell me about security": "scroll_to_security",
      "start creating": "open_studio_selector",
      "read testimonials": "scroll_to_testimonials",
      "explain how it works": "scroll_to_process",
      "show pricing": "open_pricing_modal",
      "contact support": "open_contact_form",
      "enable dark mode": "toggle_dark_mode",
      "scroll to top": "scroll_to_top",
      "open collaboration": "open_collaboration",
      "show analytics": "show_analytics",
      help: "show_help",
      tutorial: "show_tutorial",
    }
    return actions[command] || "unknown"
  }

  // Execute command with enhanced feedback
  const executeCommand = (command: VoiceCommand) => {
    switch (command.action) {
      case "scroll_to_studios":
        document.getElementById("studios")?.scrollIntoView({ behavior: "smooth" })
        break
      case "highlight_code_studio":
        document.getElementById("studios")?.scrollIntoView({ behavior: "smooth" })
        break
      case "scroll_to_security":
        document.getElementById("security")?.scrollIntoView({ behavior: "smooth" })
        break
      case "scroll_to_testimonials":
        document.getElementById("testimonials")?.scrollIntoView({ behavior: "smooth" })
        break
      case "scroll_to_process":
        document.getElementById("process")?.scrollIntoView({ behavior: "smooth" })
        break
      case "scroll_to_top":
        window.scrollTo({ top: 0, behavior: "smooth" })
        break
      case "show_help":
      case "show_tutorial":
        setShowTutorial(true)
        break
      default:
        console.log("Command not implemented:", command.action)
    }
  }

  // Text-to-speech with enhanced voice
  const speak = (text: string) => {
    if (synthesisRef.current && voiceState.isEnabled) {
      setVoiceState((prev) => ({ ...prev, isSpeaking: true }))

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.volume = 0.8

      utterance.onend = () => {
        setVoiceState((prev) => ({ ...prev, isSpeaking: false }))
      }

      synthesisRef.current.speak(utterance)
    }
  }

  // Toggle listening
  const toggleListening = () => {
    if (!recognitionRef.current || !voiceState.isEnabled) return

    if (voiceState.isListening) {
      recognitionRef.current.stop()
      setVoiceState((prev) => ({ ...prev, isListening: false }))
    } else {
      recognitionRef.current.start()
      setVoiceState((prev) => ({ ...prev, isListening: true, transcript: "" }))
    }
  }

  // Stop speaking
  const stopSpeaking = () => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel()
      setVoiceState((prev) => ({ ...prev, isSpeaking: false }))
    }
  }

  if (!voiceState.isEnabled) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Card className="bg-gray-100 border-0 shadow-lg">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Voice features not supported in this browser</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <>
      {/* Enhanced Voice Control Panel */}
      <div className="fixed bottom-6 right-6 z-50 space-y-4">
        {/* Main Voice Button */}
        <Button
          onClick={toggleListening}
          className={`w-16 h-16 rounded-full shadow-2xl transition-all duration-300 ${
            voiceState.isListening
              ? "bg-red-500 hover:bg-red-600 animate-pulse scale-110"
              : voiceState.isProcessing
                ? "bg-yellow-500 hover:bg-yellow-600 animate-bounce"
                : "bg-blue-600 hover:bg-blue-700 hover:scale-110"
          }`}
          disabled={voiceState.isProcessing}
        >
          {voiceState.isListening ? <MicOff className="w-6 h-6 text-white" /> : <Mic className="w-6 h-6 text-white" />}
        </Button>

        {/* Secondary Controls */}
        <div className="flex flex-col space-y-2">
          <Button
            onClick={voiceState.isSpeaking ? stopSpeaking : () => speak("Voice interface is ready")}
            className={`w-12 h-12 rounded-full shadow-lg transition-all duration-300 ${
              voiceState.isSpeaking ? "bg-orange-500 hover:bg-orange-600" : "bg-gray-600 hover:bg-gray-700"
            }`}
            size="sm"
          >
            {voiceState.isSpeaking ? (
              <VolumeX className="w-4 h-4 text-white" />
            ) : (
              <Volume2 className="w-4 h-4 text-white" />
            )}
          </Button>

          <Button
            onClick={() => setShowTutorial(true)}
            className="w-12 h-12 rounded-full shadow-lg bg-purple-600 hover:bg-purple-700 transition-all duration-300"
            size="sm"
          >
            <HelpCircle className="w-4 h-4 text-white" />
          </Button>
        </div>
      </div>

      {/* Enhanced Voice Feedback Panel */}
      {(voiceState.isListening || voiceState.transcript || voiceState.lastCommand) && (
        <div className="fixed bottom-24 right-6 z-50 w-96">
          <Card className="bg-white/95 backdrop-blur-xl border-0 shadow-2xl">
            <CardContent className="p-6">
              {/* Status Indicator */}
              <div className="flex items-center space-x-3 mb-4">
                <div
                  className={`w-4 h-4 rounded-full ${
                    voiceState.isListening
                      ? "bg-red-500 animate-pulse"
                      : voiceState.isProcessing
                        ? "bg-yellow-500 animate-spin"
                        : "bg-green-500"
                  }`}
                />
                <span className="text-sm font-bold uppercase tracking-wider">
                  {voiceState.isListening ? "LISTENING..." : voiceState.isProcessing ? "PROCESSING..." : "READY"}
                </span>
                {voiceState.confidence > 0 && (
                  <div className="ml-auto">
                    <span className="text-xs text-gray-500">
                      Confidence: {Math.round(voiceState.confidence * 100)}%
                    </span>
                  </div>
                )}
              </div>

              {/* Live Transcript */}
              {voiceState.transcript && (
                <div className="mb-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">TRANSCRIPT</div>
                  <div className="bg-gray-100 p-4 rounded-lg text-sm border-l-4 border-blue-500">
                    {voiceState.transcript}
                  </div>
                </div>
              )}

              {/* Last Command */}
              {voiceState.lastCommand && (
                <div className="mb-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">EXECUTED COMMAND</div>
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <Zap className="w-5 h-5 text-green-600" />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-green-800">{voiceState.lastCommand.command}</span>
                      <div className="text-xs text-green-600">
                        Confidence: {Math.round(voiceState.lastCommand.confidence * 100)}% •
                        {new Date(voiceState.lastCommand.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Commands */}
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">QUICK COMMANDS</div>
                <div className="grid grid-cols-2 gap-2">
                  {voiceState.supportedCommands.slice(0, 6).map((command, index) => (
                    <button
                      key={index}
                      onClick={() => processVoiceCommand(command, 1.0)}
                      className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-2 rounded-lg transition-colors font-medium"
                    >
                      {command}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Enhanced Voice Tutorial */}
      {showTutorial && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <Card className="w-full max-w-2xl mx-4 bg-white shadow-2xl">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black text-gray-900">Voice Control Tutorial</h3>
                <Button variant="ghost" onClick={() => setShowTutorial(false)}>
                  ×
                </Button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Getting Started</h4>
                  <p className="text-gray-600 mb-4">
                    Click the microphone button and speak clearly. The system will process your command and provide
                    feedback.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Available Commands</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {voiceState.supportedCommands.map((command, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <MessageSquare className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium">"{command}"</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Tips for Best Results</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Speak clearly and at a normal pace</li>
                    <li>• Use the exact command phrases shown above</li>
                    <li>• Ensure your microphone is working properly</li>
                    <li>• Try again if the system doesn't understand</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <Button
                  onClick={() => setShowTutorial(false)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                >
                  Got it!
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Voice Status Indicator */}
      <div className="fixed top-6 right-6 z-40">
        <Card className="bg-blue-50 border-blue-200 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <div>
                <div className="text-sm font-bold text-blue-800">Voice Control Active</div>
                <div className="text-xs text-blue-600">
                  {voiceState.isListening ? "Listening for commands..." : "Click mic to start"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
