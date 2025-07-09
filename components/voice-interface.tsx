"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mic, MicOff, Volume2, VolumeX, MessageSquare, Zap } from "lucide-react"
import type SpeechRecognition from "speech-recognition"

interface VoiceCommand {
  command: string
  action: string
  confidence: number
}

interface VoiceState {
  isListening: boolean
  isProcessing: boolean
  isSpeaking: boolean
  transcript: string
  lastCommand: VoiceCommand | null
  supportedCommands: string[]
}

export default function VoiceInterface() {
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
    ],
  })

  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const synthesisRef = useRef<SpeechSynthesis | null>(null)

  // Initialize speech recognition and synthesis
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check for speech recognition support
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true
        recognitionRef.current.lang = "en-US"

        recognitionRef.current.onresult = (event) => {
          let transcript = ""
          for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript
          }

          setVoiceState((prev) => ({ ...prev, transcript }))

          // Process final results
          if (event.results[event.results.length - 1].isFinal) {
            processVoiceCommand(transcript)
          }
        }

        recognitionRef.current.onerror = (event) => {
          console.error("Speech recognition error:", event.error)
          setVoiceState((prev) => ({ ...prev, isListening: false, isProcessing: false }))
        }

        recognitionRef.current.onend = () => {
          setVoiceState((prev) => ({ ...prev, isListening: false }))
        }
      }

      // Initialize speech synthesis
      if (window.speechSynthesis) {
        synthesisRef.current = window.speechSynthesis
      }

      setVoiceEnabled(!!SpeechRecognition && !!window.speechSynthesis)
    }
  }, [])

  // Process voice commands
  const processVoiceCommand = (transcript: string) => {
    setVoiceState((prev) => ({ ...prev, isProcessing: true }))

    const command = transcript.toLowerCase().trim()
    let matchedCommand: VoiceCommand | null = null

    // Simple command matching
    voiceState.supportedCommands.forEach((supportedCommand) => {
      if (command.includes(supportedCommand.toLowerCase())) {
        matchedCommand = {
          command: supportedCommand,
          action: getActionForCommand(supportedCommand),
          confidence: calculateConfidence(command, supportedCommand),
        }
      }
    })

    if (matchedCommand) {
      setVoiceState((prev) => ({ ...prev, lastCommand: matchedCommand, isProcessing: false }))
      executeCommand(matchedCommand)
      speak(`Executing: ${matchedCommand.command}`)
    } else {
      setVoiceState((prev) => ({ ...prev, isProcessing: false }))
      speak("Sorry, I didn't understand that command. Try saying 'help' for available commands.")
    }
  }

  // Calculate confidence score
  const calculateConfidence = (spoken: string, target: string): number => {
    const spokenWords = spoken.toLowerCase().split(" ")
    const targetWords = target.toLowerCase().split(" ")
    let matches = 0

    targetWords.forEach((word) => {
      if (spokenWords.some((spokenWord) => spokenWord.includes(word) || word.includes(spokenWord))) {
        matches++
      }
    })

    return matches / targetWords.length
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
    }
    return actions[command] || "unknown"
  }

  // Execute command
  const executeCommand = (command: VoiceCommand) => {
    switch (command.action) {
      case "scroll_to_studios":
        document.getElementById("studios")?.scrollIntoView({ behavior: "smooth" })
        break
      case "highlight_code_studio":
        document.getElementById("studios")?.scrollIntoView({ behavior: "smooth" })
        // Add highlight effect to code studio
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
      default:
        console.log("Command not implemented:", command.action)
    }
  }

  // Text-to-speech
  const speak = (text: string) => {
    if (synthesisRef.current && voiceEnabled) {
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
    if (!recognitionRef.current || !voiceEnabled) return

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

  if (!voiceEnabled) {
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
      {/* Voice Control Panel */}
      <div className="fixed bottom-6 right-6 z-50 space-y-4">
        {/* Main Voice Button */}
        <Button
          onClick={toggleListening}
          className={`w-16 h-16 rounded-full shadow-lg transition-all duration-300 ${
            voiceState.isListening
              ? "bg-red-500 hover:bg-red-600 animate-pulse"
              : voiceState.isProcessing
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={voiceState.isProcessing}
        >
          {voiceState.isListening ? <MicOff className="w-6 h-6 text-white" /> : <Mic className="w-6 h-6 text-white" />}
        </Button>

        {/* Speaker Control */}
        <Button
          onClick={voiceState.isSpeaking ? stopSpeaking : () => speak("Voice interface is ready")}
          className={`w-12 h-12 rounded-full shadow-lg transition-all duration-300 ${
            voiceState.isSpeaking ? "bg-orange-500 hover:bg-orange-600" : "bg-gray-600 hover:bg-gray-700"
          }`}
        >
          {voiceState.isSpeaking ? (
            <VolumeX className="w-4 h-4 text-white" />
          ) : (
            <Volume2 className="w-4 h-4 text-white" />
          )}
        </Button>
      </div>

      {/* Voice Feedback Panel */}
      {(voiceState.isListening || voiceState.transcript || voiceState.lastCommand) && (
        <div className="fixed bottom-24 right-6 z-50 w-80">
          <Card className="bg-white/95 backdrop-blur border-0 shadow-xl">
            <CardContent className="p-6">
              {/* Status Indicator */}
              <div className="flex items-center space-x-3 mb-4">
                <div
                  className={`w-3 h-3 rounded-full ${
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
              </div>

              {/* Live Transcript */}
              {voiceState.transcript && (
                <div className="mb-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">TRANSCRIPT</div>
                  <div className="bg-gray-100 p-3 rounded-lg text-sm">{voiceState.transcript}</div>
                </div>
              )}

              {/* Last Command */}
              {voiceState.lastCommand && (
                <div className="mb-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">LAST COMMAND</div>
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium">{voiceState.lastCommand.command}</span>
                    <span className="text-xs text-gray-500">
                      ({Math.round(voiceState.lastCommand.confidence * 100)}%)
                    </span>
                  </div>
                </div>
              )}

              {/* Quick Commands */}
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">QUICK COMMANDS</div>
                <div className="grid grid-cols-2 gap-2">
                  {voiceState.supportedCommands.slice(0, 4).map((command, index) => (
                    <button
                      key={index}
                      onClick={() => processVoiceCommand(command)}
                      className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 px-2 py-1 rounded transition-colors"
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

      {/* Voice Tutorial */}
      <div className="fixed top-6 right-6 z-40">
        <Card className="bg-blue-50 border-blue-200 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <div>
                <div className="text-sm font-bold text-blue-800">Voice Control Active</div>
                <div className="text-xs text-blue-600">Try saying "navigate to studios" or "start creating"</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
