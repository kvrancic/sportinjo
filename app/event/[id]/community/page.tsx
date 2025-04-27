"use client";

import { useState } from "react";
import { ArrowLeft, Send, Heart as HeartIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import confetti from "canvas-confetti";

/* ------------------------------------------------------------------ */
/*   MOCK PODACI                                                       */
/* ------------------------------------------------------------------ */
const eventData = {
  chats: {
    match: [
      {
        id: 1,
        user: "Navijač1",
        message: "Jedva čekam derbi!",
        time: "10:15",
        avatar: "/bocanje.png",
      },
      {
        id: 2,
        user: "Plavi123",
        message: "Dinamo će pobijediti 2-0!",
        time: "10:17",
        avatar: "/dinamo.png?height=30&width=30",
      },
      {
        id: 3,
        user: "HajdukFan",
        message: "Hajduk uzima 3 boda danas!",
        time: "10:20",
        avatar: "/torcida-logo.png?height=30&width=30",
      },
      {
        id: 4,
        user: "Sudac007",
        message: "Nadam se fer i korektnoj utakmici.",
        time: "10:22",
        avatar: "/livaja.jpeg?height=30&width=30",
      },
      {
        id: 5,
        user: "FootballExpert",
        message: "Bit će neizvjesno do samog kraja.",
        time: "10:25",
        avatar: "/dinamo_tim.jpeg?height=30&width=30",
      },
      {
        id: 6,
        user: "Navijač1",
        message:
          "Ekipa svi koji su za cugu u Park Cafe nakon tekme nek lajkaju poruku, vidimo se!",
        time: "11:00",
        avatar: "/bbb.jpeg?height=30&width=30",
        likes: 69,
      },
    ],
    homeTeam: [
      {
        id: 1,
        user: "DZG_Fan",
        message: "Idemo Dinamo!",
        time: "09:30",
        avatar: "/badblueboys.jpeg?height=30&width=30",
      },
      {
        id: 2,
        user: "ModriNavijač",
        message: "Majer će zabiti danas!",
        time: "09:45",
        avatar: "/bbb.jpeg?height=30&width=30",
      },
      {
        id: 3,
        user: "ZagrebBoy",
        message: "Maksimir će gorjeti!",
        time: "10:00",
        avatar: "/dinamo_srusio.jpeg?height=30&width=30",
      },
    ],
    awayTeam: [
      {
        id: 1,
        user: "HajdukZauvijek",
        message: "Hajduk živi vječno!",
        time: "09:15",
        avatar: "/hajduk.jpeg?height=30&width=30",
      },
      {
        id: 2,
        user: "SplitCity",
        message: "Livaja hat-trick danas!",
        time: "09:30",
        avatar: "/livaja.jpeg?height=30&width=30",
      },
      {
        id: 3,
        user: "Torcida1950",
        message: "Idemo bijeli!",
        time: "09:50",
        avatar: "/torcida.jpeg?height=30&width=30",
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*   KOMPONENTA                                                        */
/* ------------------------------------------------------------------ */
export default function CommunityPage({ params }: { params: { id: string } }) {
  const initialLikeCounts = Object.values(eventData.chats)
    .flat()
    .reduce<Record<number, number>>((acc, msg) => {
      acc[msg.id] = msg.likes ?? 0;
      return acc;
    }, {});

  const [activeTab, setActiveTab] = useState<"match" | "homeTeam" | "awayTeam">(
    "match"
  );
  const [likeCounts, setLikeCounts] = useState(initialLikeCounts);

  const handleLike = (
    e: React.MouseEvent<HTMLButtonElement>,
    messageId: number
  ) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    confetti({
      particleCount: 100,
      startVelocity: 35,
      spread: 360,
      origin: { x, y },
      zIndex: 10000,
    });

    setLikeCounts((prev) => ({
      ...prev,
      [messageId]: prev[messageId] + 1,
    }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
          <Link href={`/event/${params.id}`} className="mr-4">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </Link>
          <h1 className="text-lg font-bold text-gray-800">Community Chat</h1>
        </div>
      </header>

      {/* CHAT ZONA */}
      <div className="flex-1 bg-[#0052cc] flex justify-center overflow-auto">
        <div className="w-[600px] bg-gray-50 min-h-full flex flex-col p-4">
          {/* TABOVI */}
          <div className="bg-white flex overflow-x-auto px-4 py-2 shadow-sm rounded-lg mb-4">
            <button
              onClick={() => setActiveTab("match")}
              className={`flex-1 text-center py-2 font-medium ${
                activeTab === "match"
                  ? "text-emerald-600 border-b-2 border-emerald-600"
                  : "text-gray-600"
              }`}
            >
              Match Chat
            </button>
            <button
              onClick={() => setActiveTab("homeTeam")}
              className={`flex-1 text-center py-2 font-medium ${
                activeTab === "homeTeam"
                  ? "text-emerald-600 border-b-2 border-emerald-600"
                  : "text-gray-600"
              }`}
            >
              Dinamo Fans
            </button>
            <button
              onClick={() => setActiveTab("awayTeam")}
              className={`flex-1 text-center py-2 font-medium ${
                activeTab === "awayTeam"
                  ? "text-emerald-600 border-b-2 border-emerald-600"
                  : "text-gray-600"
              }`}
            >
              Hajduk Fans
            </button>
          </div>

          {/* PORUKE */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden space-y-4">
            {eventData.chats[activeTab].map((chat) => (
              <div key={chat.id} className="flex items-start space-x-3">
                {/* AVATAR */}
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={chat.avatar}
                    alt={chat.user}
                    width={32}
                    height={32}
                  />
                </div>

                {/* MJEHURIĆ */}
                <div className="relative inline-block">
                  <div className="bg-gray-100 rounded-xl p-3 inline-block max-w-[100%]">
                    {/* USERNAME + TIME */}
                    <div className="mb-1 flex items-center space-x-2">
                      <span className="text-xs font-semibold text-gray-700">
                        {chat.user}
                      </span>
                      <span className="text-[10px] text-gray-500">
                        {chat.time}
                      </span>
                    </div>
                    <p className="text-gray-800">{chat.message}</p>
                  </div>

                  {/* LIKE GUMB   ***  POPRAVLJENI KLASE  *** */}
                  {"likes" in chat && (
                    <button
                      onClick={(e) => handleLike(e, chat.id)}
                      className="
                        absolute -top-2 -right-2
                        bg-white/80 backdrop-blur
                        border border-gray-200
                        rounded-full px-2 py-0.5
                        flex items-center gap-1 text-black shadow
                      "
                      aria-label={`Like (${likeCounts[chat.id]})`}
                    >
                      <HeartIcon className="w-4 h-4 fill-red-500 text-red-500" />
                      <span className="text-xs">{likeCounts[chat.id]}</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* INPUT */}
          <div className="mt-4 bg-white p-2 border-t flex items-center rounded-lg">
            <input
              type="text"
              placeholder="Upiši poruku..."
              className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button className="ml-2 w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
