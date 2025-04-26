"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, Send, User, Calendar, MapPin, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock data for chat messages
const initialMessages = [
  {
    id: 1,
    sender: "user",
    text: "Hi! I'm looking for some weekend activities to do with my family in Zagreb. Any suggestions?",
    timestamp: "10:30 AM",
  },
  {
    id: 2,
    sender: "ai",
    text: "Hello! I'd be happy to suggest some family-friendly sports events in Zagreb this weekend. Here are a few options:",
    timestamp: "10:30 AM",
    events: [
      {
        id: 1,
        title: "Dinamo vs Hajduk",
        description: "The biggest football derby in Croatia! Great atmosphere for the whole family.",
        time: "Saturday, 18:00",
        location: "Stadion Maksimir",
        image: "/vibrant-football-action.png",
        type: "popular",
      },
      {
        id: 8,
        title: "Ultimate Frisbee Cup",
        description: "A fun and exciting sport that's easy for everyone to enjoy. Perfect for families!",
        time: "Sunday, 11:00",
        location: "Bundek Park",
        image: "/placeholder.svg?key=ye827",
        type: "hidden-gem",
      },
    ],
  },
  {
    id: 3,
    sender: "user",
    text: "The Frisbee Cup sounds interesting! Is it suitable for kids?",
    timestamp: "10:32 AM",
  },
  {
    id: 4,
    sender: "ai",
    text: "Yes, the Ultimate Frisbee Cup is very family-friendly! There will be areas where beginners and children can try the sport with instructors. They'll provide all the equipment needed, and there's also food stands and other activities in the park. It's a relaxed atmosphere where kids can run around and have fun!",
    timestamp: "10:32 AM",
  },
  {
    id: 5,
    sender: "user",
    text: "Great! Are there any other outdoor activities that might be good if the weather is nice?",
    timestamp: "10:34 AM",
  },
]

export default function ChatPage() {
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, userMessage])
    setNewMessage("")

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        sender: "ai",
        text: "Based on the nice weather forecast, I'd recommend the Zagreb Marathon event at Bundek Park. It's not just for runners - there are family activities, food stalls, and a great atmosphere. There's also a children's mini-marathon that starts at 10:00 AM on Sunday!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        events: [
          {
            id: 6,
            title: "Zagreb Marathon",
            description: "A fun event with activities for the whole family, including a children's mini-marathon.",
            time: "Sunday, 09:00",
            location: "Bundek Park",
            image: "/city-marathon-runners.png",
            type: "popular",
          },
        ],
      }

      setMessages((prevMessages) => [...prevMessages, aiResponse])
    }, 1000)
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
          <Link href="/" className="mr-4">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </Link>
          <div>
            <h1 className="text-lg font-bold text-gray-800">Chat with Sports AI</h1>
            <div className="text-sm text-gray-500">Ask about events, recommendations, and more</div>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === "user"
                    ? "bg-emerald-500 text-white rounded-br-none"
                    : "bg-white shadow-sm rounded-bl-none"
                }`}
              >
                <div className="flex items-center mb-1">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                      message.sender === "user" ? "bg-emerald-600" : "bg-emerald-100"
                    }`}
                  >
                    {message.sender === "user" ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <div className="text-emerald-600 font-bold text-xs">AI</div>
                    )}
                  </div>
                  <span className={`text-xs ${message.sender === "user" ? "text-emerald-100" : "text-gray-500"}`}>
                    {message.timestamp}
                  </span>
                </div>
                <p className={`text-sm ${message.sender === "user" ? "text-white" : "text-gray-800"}`}>
                  {message.text}
                </p>

                {/* Event recommendations */}
                {message.events && (
                  <div className="mt-3 space-y-3">
                    {message.events.map((event) => (
                      <div key={event.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm">
                        <div className="relative h-32">
                          <Image
                            src={event.image || "/placeholder.svg"}
                            alt={event.title}
                            fill
                            className="object-cover"
                          />
                          {event.type === "hidden-gem" && (
                            <div className="absolute top-2 right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                              Hidden Gem
                            </div>
                          )}
                          {event.type === "popular" && (
                            <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                              Popular
                            </div>
                          )}
                        </div>
                        <div className="p-3">
                          <h3 className="font-bold text-gray-800">{event.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                          <div className="mt-2 space-y-1">
                            <div className="flex items-center text-xs text-gray-500">
                              <Calendar className="w-3 h-3 mr-1" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center text-xs text-gray-500">
                              <MapPin className="w-3 h-3 mr-1" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                          <Link
                            href={`/event/${event.id}`}
                            className="mt-2 flex items-center text-xs font-medium text-emerald-600"
                          >
                            <span>View details</span>
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white border-t p-4">
        <div className="max-w-3xl mx-auto flex items-center">
          <input
            type="text"
            placeholder="Ask about sports events, recommendations, or activities..."
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            className="ml-2 w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center"
            onClick={handleSendMessage}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t py-4 px-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link href="/" className="flex flex-col items-center">
            <div className="w-6 h-6 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
            <span className="text-sm text-gray-400">Home</span>
          </Link>
          <Link href="/map" className="flex flex-col items-center">
            <div className="w-6 h-6 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
            </div>
            <span className="text-sm text-gray-400">Map</span>
          </Link>
          <Link href="/chat" className="flex flex-col items-center">
            <div className="w-6 h-6 text-emerald-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <span className="text-sm text-emerald-500">Chat AI</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
