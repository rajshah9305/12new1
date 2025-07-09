"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, MessageCircle, Edit3, Share2, Video, Mic, TextCursorIcon as Cursor, Settings } from "lucide-react"

interface CollaboratorCursor {
  id: string
  name: string
  x: number
  y: number
  color: string
  lastSeen: number
  isActive: boolean
}

interface CollaborationMessage {
  id: string
  userId: string
  userName: string
  message: string
  timestamp: number
  type: "chat" | "system" | "edit" | "voice"
}

interface CollaborationState {
  isConnected: boolean
  collaborators: CollaboratorCursor[]
  messages: CollaborationMessage[]
  currentUser: {
    id: string
    name: string
    role: "owner" | "editor" | "viewer"
    color: string
  }
  activeDocument: string
  liveEditing: boolean
  voiceChat: boolean
  screenShare: boolean
}

export default function CollaborationHubRefined() {
  const [collaboration, setCollaboration] = useState<CollaborationState>({
    isConnected: false,
    collaborators: [],
    messages: [],
    currentUser: {
      id: "user-1",
      name: "You",
      role: "owner",
      color: "#ff5722",
    },
    activeDocument: "AI Creative Studio Design",
    liveEditing: false,
    voiceChat: false,
    screenShare: false,
  })

  const [showChat, setShowChat] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [newMessage, setNewMessage] = useState("")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const chatRef = useRef<HTMLDivElement>(null)

  // Simulate WebSocket connection and real-time collaboration
  useEffect(() => {
    // Simulate connection
    setTimeout(() => {
      setCollaboration((prev) => ({ ...prev, isConnected: true }))
      addSystemMessage("Connected to collaboration session")

      // Add mock collaborators
      const mockCollaborators: CollaboratorCursor[] = [
        { id: "user-2", name: "Sarah Chen", x: 300, y: 200, color: "#2196f3", lastSeen: Date.now(), isActive: true },
        {
          id: "user-3",
          name: "Marcus Rodriguez",
          x: 500,
          y: 400,
          color: "#4caf50",
          lastSeen: Date.now(),
          isActive: true,
        },
        {
          id: "user-4",
          name: "Dr. Emily Watson",
          x: 700,
          y: 300,
          color: "#9c27b0",
          lastSeen: Date.now(),
          isActive: false,
        },
      ]

      setCollaboration((prev) => ({ ...prev, collaborators: mockCollaborators }))
    }, 1000)

    // Simulate real-time cursor movements
    const cursorInterval = setInterval(() => {
      setCollaboration((prev) => ({
        ...prev,
        collaborators: prev.collaborators.map((collaborator) => ({
          ...collaborator,
          x: Math.max(50, Math.min(window.innerWidth - 50, collaborator.x + (Math.random() - 0.5) * 30)),
          y: Math.max(50, Math.min(window.innerHeight - 50, collaborator.y + (Math.random() - 0.5) * 30)),
          lastSeen: Date.now(),
          isActive: Math.random() > 0.1, // 90% chance of being active
        })),
      }))
    }, 2000)

    // Simulate incoming messages
    const messageInterval = setInterval(() => {
      const messages = [
        "This neural network visualization is incredible!",
        "Can we adjust the color scheme for better accessibility?",
        "The voice interface integration is seamless",
        "Should we add more interactive elements to the hero section?",
        "Great work on the ML personalization features!",
        "The WebGL effects are running smoothly",
        "Love the real-time analytics dashboard",
      ]

      const collaborators = ["Sarah Chen", "Marcus Rodriguez", "Dr. Emily Watson"]
      const randomMessage = messages[Math.floor(Math.random() * messages.length)]
      const randomUser = collaborators[Math.floor(Math.random() * collaborators.length)]

      if (Math.random() > 0.7) {
        // 30% chance of new message
        addChatMessage(randomUser, randomMessage)
      }
    }, 8000)

    return () => {
      clearInterval(cursorInterval)
      clearInterval(messageInterval)
    }
  }, [])

  // Track mouse position for cursor sharing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Auto-scroll chat
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [collaboration.messages])

  const addSystemMessage = (message: string) => {
    const systemMessage: CollaborationMessage = {
      id: `msg-${Date.now()}`,
      userId: "system",
      userName: "System",
      message,
      timestamp: Date.now(),
      type: "system",
    }

    setCollaboration((prev) => ({
      ...prev,
      messages: [...prev.messages.slice(-50), systemMessage], // Keep last 50 messages
    }))
  }

  const addChatMessage = (userName: string, message: string) => {
    const chatMessage: CollaborationMessage = {
      id: `msg-${Date.now()}`,
      userId: `user-${userName.replace(" ", "-").toLowerCase()}`,
      userName,
      message,
      timestamp: Date.now(),
      type: "chat",
    }

    setCollaboration((prev) => ({
      ...prev,
      messages: [...prev.messages.slice(-50), chatMessage],
    }))
  }

  const sendMessage = () => {
    if (newMessage.trim()) {
      addChatMessage(collaboration.currentUser.name, newMessage)
      setNewMessage("")
    }
  }

  const toggleLiveEditing = () => {
    setCollaboration((prev) => ({ ...prev, liveEditing: !prev.liveEditing }))
    addSystemMessage(collaboration.liveEditing ? "Live editing disabled" : "Live editing enabled")
  }

  const toggleVoiceChat = () => {
    setCollaboration((prev) => ({ ...prev, voiceChat: !prev.voiceChat }))
    addSystemMessage(collaboration.voiceChat ? "Voice chat disabled" : "Voice chat enabled")
  }

  const toggleScreenShare = () => {
    setCollaboration((prev) => ({ ...prev, screenShare: !prev.screenShare }))
    addSystemMessage(collaboration.screenShare ? "Screen sharing stopped" : "Screen sharing started")
  }

  if (!collaboration.isConnected) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <Card className="bg-yellow-50 border-yellow-200 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse"></div>
              <span className="text-sm font-medium text-yellow-800">Connecting to collaboration...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <>
      {/* Enhanced Collaboration Status Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${collaboration.isConnected ? "bg-green-500" : "bg-red-500"} animate-pulse`}
                />
                <span className="text-sm font-bold">{collaboration.isConnected ? "Connected" : "Disconnected"}</span>
              </div>

              <div className="text-sm text-gray-600 font-medium">{collaboration.activeDocument}</div>

              <Badge variant="outline" className="text-xs font-bold">
                {collaboration.currentUser.role.toUpperCase()}
              </Badge>

              {/* Live Status Indicators */}
              <div className="flex items-center space-x-2">
                {collaboration.liveEditing && (
                  <Badge className="bg-green-100 text-green-800 text-xs">
                    <Edit3 className="w-3 h-3 mr-1" />
                    LIVE
                  </Badge>
                )}
                {collaboration.voiceChat && (
                  <Badge className="bg-blue-100 text-blue-800 text-xs">
                    <Mic className="w-3 h-3 mr-1" />
                    VOICE
                  </Badge>
                )}
                {collaboration.screenShare && (
                  <Badge className="bg-purple-100 text-purple-800 text-xs">
                    <Share2 className="w-3 h-3 mr-1" />
                    SHARING
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Active Collaborators */}
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gray-500" />
                <div className="flex -space-x-2">
                  {collaboration.collaborators
                    .filter((c) => c.isActive)
                    .slice(0, 4)
                    .map((collaborator) => (
                      <div
                        key={collaborator.id}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-sm"
                        style={{ backgroundColor: collaborator.color }}
                        title={`${collaborator.name} - ${collaborator.isActive ? "Active" : "Away"}`}
                      >
                        {collaborator.name.charAt(0)}
                      </div>
                    ))}
                  {collaboration.collaborators.filter((c) => c.isActive).length > 4 && (
                    <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white text-xs font-bold border-2 border-white">
                      +{collaboration.collaborators.filter((c) => c.isActive).length - 4}
                    </div>
                  )}
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={toggleLiveEditing}
                  className={`${collaboration.liveEditing ? "bg-green-50 border-green-200 text-green-700" : ""} transition-colors`}
                >
                  <Edit3 className="w-4 h-4 mr-1" />
                  {collaboration.liveEditing ? "Live" : "Edit"}
                </Button>

                <Button size="sm" variant="outline" onClick={() => setShowChat(!showChat)} className="relative">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Chat
                  {collaboration.messages.filter((m) => m.type === "chat").length > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[1.25rem] h-5 flex items-center justify-center">
                      {collaboration.messages.filter((m) => m.type === "chat").length}
                    </Badge>
                  )}
                </Button>

                <Button size="sm" variant="outline" onClick={() => setShowSettings(!showSettings)}>
                  <Settings className="w-4 h-4 mr-1" />
                  Settings
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Cursors with Enhanced Animations */}
      {collaboration.collaborators
        .filter((c) => c.isActive)
        .map((collaborator) => (
          <div
            key={collaborator.id}
            className="fixed pointer-events-none z-40 transition-all duration-200 ease-out"
            style={{
              left: collaborator.x,
              top: collaborator.y,
              transform: "translate(-2px, -2px)",
            }}
          >
            <div className="relative">
              <Cursor className="w-5 h-5 drop-shadow-lg" style={{ color: collaborator.color }} />
              <div
                className="absolute top-5 left-2 px-3 py-1 rounded-lg text-white text-xs font-medium whitespace-nowrap shadow-lg"
                style={{ backgroundColor: collaborator.color }}
              >
                {collaborator.name}
                <div
                  className="absolute -top-1 left-2 w-2 h-2 rotate-45"
                  style={{ backgroundColor: collaborator.color }}
                ></div>
              </div>
            </div>
          </div>
        ))}

      {/* Enhanced Chat Panel */}
      {showChat && (
        <div className="fixed right-6 top-20 bottom-6 w-96 z-40">
          <Card className="h-full bg-white/95 backdrop-blur-xl border-0 shadow-2xl flex flex-col">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-black text-xl text-gray-900">Team Chat</h3>
                  <p className="text-sm text-gray-600">
                    {collaboration.collaborators.filter((c) => c.isActive).length + 1} active members
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowChat(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </Button>
              </div>
            </div>

            <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {collaboration.messages.map((message) => (
                <div key={message.id} className={`${message.type === "system" ? "text-center" : ""}`}>
                  {message.type === "system" ? (
                    <div className="text-xs text-gray-500 bg-gray-100 px-3 py-2 rounded-full inline-block">
                      <span className="font-medium">{message.message}</span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm"
                          style={{
                            backgroundColor:
                              collaboration.collaborators.find((c) => c.name === message.userName)?.color || "#666",
                          }}
                        >
                          {message.userName.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-bold text-gray-900">{message.userName}</span>
                            <span className="text-xs text-gray-500">
                              {new Date(message.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="ml-11 text-sm text-gray-700 bg-gray-50 rounded-lg p-3 leading-relaxed">
                        {message.message}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Button onClick={sendMessage} disabled={!newMessage.trim()} className="px-6">
                  Send
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <div className="fixed left-6 top-20 w-80 z-40">
          <Card className="bg-white/95 backdrop-blur-xl border-0 shadow-2xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-xl text-gray-900">Collaboration Settings</h3>
                <Button size="sm" variant="ghost" onClick={() => setShowSettings(false)}>
                  ×
                </Button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-gray-900">Live Editing</div>
                    <div className="text-sm text-gray-600">Real-time collaborative editing</div>
                  </div>
                  <Button
                    size="sm"
                    onClick={toggleLiveEditing}
                    className={
                      collaboration.liveEditing ? "bg-green-500 hover:bg-green-600" : "bg-gray-300 hover:bg-gray-400"
                    }
                  >
                    {collaboration.liveEditing ? "ON" : "OFF"}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-gray-900">Voice Chat</div>
                    <div className="text-sm text-gray-600">Audio communication</div>
                  </div>
                  <Button
                    size="sm"
                    onClick={toggleVoiceChat}
                    className={
                      collaboration.voiceChat ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-300 hover:bg-gray-400"
                    }
                  >
                    {collaboration.voiceChat ? "ON" : "OFF"}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-gray-900">Screen Share</div>
                    <div className="text-sm text-gray-600">Share your screen</div>
                  </div>
                  <Button
                    size="sm"
                    onClick={toggleScreenShare}
                    className={
                      collaboration.screenShare ? "bg-purple-500 hover:bg-purple-600" : "bg-gray-300 hover:bg-gray-400"
                    }
                  >
                    {collaboration.screenShare ? "ON" : "OFF"}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Live Editing Indicator */}
      {collaboration.liveEditing && (
        <div className="fixed bottom-6 left-6 z-50">
          <Card className="bg-green-50 border-green-200 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <div>
                  <div className="text-sm font-bold text-green-800">Live Editing Active</div>
                  <div className="text-xs text-green-600">Changes sync in real-time</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Voice/Video Call Controls */}
      {(collaboration.voiceChat || collaboration.screenShare) && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="flex items-center space-x-3 bg-gray-900 rounded-full px-6 py-3 shadow-2xl">
            <Button
              size="sm"
              variant="ghost"
              className={`text-white hover:bg-gray-700 rounded-full ${collaboration.voiceChat ? "bg-green-600" : ""}`}
              onClick={toggleVoiceChat}
            >
              <Mic className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" className="text-white hover:bg-gray-700 rounded-full">
              <Video className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className={`text-white hover:bg-gray-700 rounded-full ${collaboration.screenShare ? "bg-purple-600" : ""}`}
              onClick={toggleScreenShare}
            >
              <Share2 className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-red-400 hover:bg-red-900 rounded-full"
              onClick={() => {
                setCollaboration((prev) => ({ ...prev, voiceChat: false, screenShare: false }))
                addSystemMessage("Call ended")
              }}
            >
              End Call
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
