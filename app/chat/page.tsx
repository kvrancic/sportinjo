"use client";

import { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  Send,
  User,
  Calendar,
  MapPin,
  ExternalLink,
  Bell,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Predodređeni odgovori na pitanja
const predefinedResponses: Record<string, any> = {
  "Bok! Tražim ideje za provesti ovaj vikend s obitelji u Zagrebu ili bližoj okolici. Imaš li kakav prijedlog?":
    {
      text: "Pozdrav! Evo nekoliko obiteljskih sportskih događaja u Zagrebu ovog vikenda:",
      events: [
        {
          id: 1,
          title: "NK Kašina – NK Brezovica",
          description:
            "Uzbudljiva amaterska utakmica koja spaja lokalnu strast i sportski duh. Dođite podržati svoje favorite!",
          time: "Subota, 18:00",
          location: "Igralište NK Kašina",
          image: "/focused-football-drill.png",
          type: "popular",
        },
        {
          id: 8,
          title: "Ultimate Frisbee Kup",
          description: "Zabavan sport za sve uzraste – idealno za obitelji!",
          time: "Nedjelja, 11:00",
          location: "Park Bundek",
          image: "/frisbee-fun.jpeg",
          type: "hidden-gem",
        },
      ],
    },
  "Kup u frizbiju zvuči zanimljivo! Je li prikladan za djecu?": {
    text: "Da! Bit će zone za početnike i djecu uz instruktore i svu potrebnu opremu, a u parku vas čekaju i štandovi s hranom te druge aktivnosti. Odlična, opuštena atmosfera za klince!",
  },
};

// Početna poruka dobrodošlice
const welcomeMessage = {
  id: 0,
  sender: "ai" as const,
  text: "Dobrodošli u Sportinjo AI Chat! Pitajte me o sportskim događajima u Zagrebu.",
  timestamp: new Date().toLocaleTimeString("hr-HR", {
    hour: "2-digit",
    minute: "2-digit",
  }),
};

export default function ChatPage() {
  const [messages, setMessages] = useState<any[]>([welcomeMessage]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isTyping]);

  const simulateTyping = (text: string) => {
    return new Promise<void>((resolve) => {
      // Simuliramo vrijeme tipkanja bazirano na duljini teksta
      setTimeout(() => {
        resolve();
      }, 4000);
    });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    // Korisnikova poruka
    const userMessage = {
      id: messages.length + 1,
      sender: "user" as const,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString("hr-HR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    // Pronađi odgovor ili koristi generički
    const response = predefinedResponses[userMessage.text] || {
      text: "Nažalost, nemam informacije o tome. Mogu li vam pomoći s nečim drugim vezano uz sportske događaje u Zagrebu?",
    };

    // Simuliraj vrijeme tipkanja
    await simulateTyping(response.text);

    // AI odgovor
    const aiResponse = {
      id: userMessage.id + 1,
      sender: "ai" as const,
      text: response.text,
      timestamp: new Date().toLocaleTimeString("hr-HR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      ...(response.events && { events: response.events }),
    };

    setMessages((prev) => [...prev, aiResponse]);
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Zaglavlje */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
          <Link href="/" className="mr-4">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </Link>
          <div>
            <h1 className="text-lg font-bold text-gray-800">Sportinjo AI</h1>
            <div className="text-sm text-gray-500">
              Pitajte o događajima, preporukama i još mnogo toga
            </div>
          </div>
        </div>
      </header>

      {/* Poruke */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-white shadow-sm rounded-bl-none"
                }`}
              >
                <div className="flex items-center mb-1">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                      message.sender === "user"
                        ? "bg-blue-600"
                        : "bg-blue-100"
                    }`}
                  >
                    {message.sender === "user" ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <div className="text-blue-600 font-bold text-xs">
                        AI
                      </div>
                    )}
                  </div>
                  <span
                    className={`text-xs ${
                      message.sender === "user"
                        ? "text-blue-100"
                        : "text-gray-500"
                    }`}
                  >
                    {message.timestamp}
                  </span>
                </div>

                <p
                  className={`text-sm ${
                    message.sender === "user" ? "text-white" : "text-gray-800"
                  }`}
                >
                  {message.text}
                </p>

                {/* Preporuke događaja */}
                {"events" in message && message.events && (
                  <div className="mt-3 space-y-3">
                    {message.events.map((event: any) => (
                      <div
                        key={event.id}
                        className="bg-gray-50 rounded-lg overflow-hidden shadow-sm"
                      >
                        <div className="relative h-32">
                          <Image
                            src={event.image || "/placeholder.svg"}
                            alt={event.title}
                            fill
                            className="object-cover"
                          />
                          {event.type === "hidden-gem" && (
                            <div className="absolute top-2 right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                              Skriveni dragulj
                            </div>
                          )}
                          {event.type === "popular" && (
                            <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                              Popularno
                            </div>
                          )}
                        </div>
                        <div className="p-3">
                          <h3 className="font-bold text-gray-800">
                            {event.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {event.description}
                          </p>
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
                            className="mt-2 flex items-center text-xs font-medium text-blue-600"
                          >
                            <span>Pogledaj detalje</span>
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

          {/* Indikator tipkanja AI‑ja */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-white shadow-sm rounded-bl-none">
                <div className="flex items-center mb-1">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center mr-2 bg-blue-100">
                    <div className="text-blue-600 font-bold text-xs">AI</div>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date().toLocaleTimeString("hr-HR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                {/* tri skakućeće točkice */}
                <div className="flex space-x-1 mt-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Unos poruke */}
      <div className="bg-white border-t p-4">
        <div className="max-w-3xl mx-auto flex items-center">
          <input
            type="text"
            placeholder="Postavi pitanje o sportskim događajima, preporukama ili aktivnostima…"
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            className="ml-2 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center"
            onClick={handleSendMessage}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Donja navigacija */}
      <div className="bg-white border-t py-4 px-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link href="/" className="flex flex-col items-center">
            <div className="w-6 h-6 text-gray-400">
              {/* Home ikona */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
            <span className="text-sm text-gray-400">Početna</span>
          </Link>

          <Link href="/map" className="flex flex-col items-center">
            <div className="w-6 h-6 text-gray-400">
              {/* Map ikona */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
            </div>
            <span className="text-sm text-gray-400">Karta</span>
          </Link>
          <Link
            href="/notifications"
            className="flex flex-col items-center relative"
          >
            <Bell className="w-6 h-6 text-gray-400" />
            <span className="text-sm text-gray-400">Notifikacije</span>
            {/* Badge */}
            <span className="absolute -top-1 -right-2 w-4 h-4 bg-red-500 text-[10px] leading-none rounded-full flex items-center justify-center text-white">
              4
            </span>
          </Link>
          <Link href="/chat" className="flex flex-col items-center">
            <div className="w-6 h-6 text-blue-500">
              {/* Chat ikona */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <span className="text-sm text-blue -500">Chat AI</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
