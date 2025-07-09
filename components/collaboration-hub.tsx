"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, MessageCircle, Edit3, Share2, Video, Mic, TextCursorIcon as Cursor } from "lucide-react"

interface CollaboratorCursor {
  id: string
  name: string
  x: number
  y: number
  color: string
  lastSeen: number
}

interface CollaborationMessage {
  id: string
  userId: string
  userName: string
  message: string
  timestamp: number
  type: "chat" | "system" | "edit"
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
}

export default function CollaborationHub() {
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
  })

  const [showChat, setShowChat] = useState(false)
  const [newMessage, setNewMessage] = useState("")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const wsRef = useRef<WebSocket | null>(null)
  const chatRef = useRef<HTMLDivElement>(null)

  // Simulate WebSocket connection
  useEffect(() => {
    // Simulate connection
    setTimeout(() => {
      setCollaboration((prev) => ({ ...prev, isConnected: true }))
      addSystemMessage("Connected to collaboration session")

      // Add mock collaborators
      const mockCollaborators: CollaboratorCursor[] = [
        { id: "user-2", name: "Sarah Chen", x: 300, y: 200, color: "#2196f3", lastSeen: Date.now() },
        { id: "user-3", name: "Marcus Rodriguez", x: 500, y: 400, color: "#4caf50", lastSeen: Date.now() },
        { id: "user-4", name: "Dr. Emily Watson", x: 700, y: 300, color: "#9c27b0", lastSeen: Date.now() },
      ]

      setCollaboration((prev) => ({ ...prev, collaborators: mockCollaborators }))
    }, 1000)

    // Simulate real-time cursor movements
    const cursorInterval = setInterval(() => {
      setCollaboration((prev) => ({
        ...prev,
        collaborators: prev.collaborators.map((collaborator) => ({
          ...collaborator,
          x: collaborator.x + (Math.random() - 0.5) * 20,
          y: collaborator.y + (Math.random() - 0.5) * 20,
          lastSeen: Date.now(),
        })),
      }))
    }, 2000)

    // Simulate incoming messages
    const messageInterval = setInterval(() => {
      const messages = [
        "This design looks amazing!",
        "Can we adjust the color scheme?",
        "The neural network visualization is perfect",
        "Should we add more interactive elements?",
        "Great work on the voice interface!",
      ]

      const collaborators = ["Sarah Chen", "Marcus Rodriguez", "Dr. Emily Watson"]
      const randomMessage = messages[Math.floor(Math.random() * messages.length)]
      const randomUser = collaborators[Math.floor(Math.random() * collaborators.length)]

      addChatMessage(randomUser, randomMessage)
    }, 8000)

    return () => {
      clearInterval(cursorInterval)
      clearInterval(messageInterval)
    }
  }, [])

  // Track mouse position
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
      messages: [...prev.messages, systemMessage],
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
      messages: [...prev.messages, chatMessage],
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

  return (
    <>
      {/* Collaboration Status Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${collaboration.isConnected ? "bg-green-500" : "bg-red-500"}`} />
                <span className="text-sm font-bold">{collaboration.isConnected ? "Connected" : "Disconnected"}</span>
              </div>

              <div className="text-sm text-gray-600">{collaboration.activeDocument}</div>

              <Badge variant="outline" className="text-xs">
                {collaboration.currentUser.role}
              </Badge>
            </div>

            <div className="flex items-center space-x-4">
              {/* Collaborator Avatars */}
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gray-500" />
                <div className="flex -space-x-2">
                  {collaboration.collaborators.slice(0, 3).map((collaborator) => (
                    <div
                      key={collaborator.id}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white"
                      style={{ backgroundColor: collaborator.color }}
                      title={collaborator.name}
                    >
                      {collaborator.name.charAt(0)}
                    </div>
                  ))}
                  {collaboration.collaborators.length > 3 && (
                    <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white text-xs font-bold border-2 border-white">
                      +{collaboration.collaborators.length - 3}
                    </div>
                  )}
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={toggleLiveEditing}
                  className={collaboration.liveEditing ? "bg-green-50 border-green-200" : ""}
                >
                  <Edit3 className="w-4 h-4 mr-1" />
                  {collaboration.liveEditing ? "Live" : "Edit"}
                </Button>

                <Button size="sm" variant="outline" onClick={() => setShowChat(!showChat)}>
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Chat
                  {collaboration.messages.filter((m) => m.type === "chat").length > 0 && (
                    <Badge className="ml-2 bg-red-500 text-white text-xs">
                      {collaboration.messages.filter((m) => m.type === "chat").length}
                    </Badge>
                  )}
                </Button>

                <Button size="sm" variant="outline">
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Cursors */}
      {collaboration.collaborators.map((collaborator) => (
        <div
          key={collaborator.id}
          className="fixed pointer-events-none z-40 transition-all duration-100"
          style={{
            left: collaborator.x,
            top: collaborator.y,
            transform: "translate(-2px, -2px)",
          }}
        >
          <div className="relative">
            <Cursor className="w-5 h-5" style={{ color: collaborator.color }} />
            <div
              className="absolute top-5 left-2 px-2 py-1 rounded text-white text-xs font-medium whitespace-nowrap"
              style={{ backgroundColor: collaborator.color }}
            >
              {collaborator.name}
            </div>
          </div>
        </div>
      ))}

      {/* Chat Panel */}
      {showChat && (
        <div className="fixed right-6 top-20 bottom-6 w-80 z-40">
          <Card className="h-full bg-white/95 backdrop-blur border-0 shadow-xl flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">Team Chat</h3>
                <Button size="sm" variant="ghost" onClick={() => setShowChat(false)}>
                  ×
                </Button>
              </div>
            </div>

            <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {collaboration.messages.map((message) => (
                <div key={message.id} className={`${message.type === "system" ? "text-center" : ""}`}>
                  {message.type === "system" ? (
                    <div className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full inline-block">
                      {message.message}
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                          style={{
                            backgroundColor:
                              collaboration.collaborators.find((c) => c.name === message.userName)?.color || "#666",
                          }}
                        >
                          {message.userName.charAt(0)}
                        </div>
                        <span className="text-sm font-medium">{message.userName}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="ml-8 text-sm text-gray-700">{message.message}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button size="sm" onClick={sendMessage} disabled={!newMessage.trim()}>
                  Send
                </Button>
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
                  <div className="text-xs text-green-600">Changes are synced in real-time</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Video Call Controls (Mock) */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex items-center space-x-2 bg-gray-900 rounded-full px-4 py-2">
          <Button size="sm" variant="ghost" className="text-white hover:bg-gray-700 rounded-full">
            <Mic className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" className="text-white hover:bg-gray-700 rounded-full">
            <Video className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" className="text-red-400 hover:bg-red-900 rounded-full">
            End Call
          </Button>
        </div>
      </div>
    </>
  )
}
