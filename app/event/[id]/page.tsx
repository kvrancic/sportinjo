"use client"

import { useState } from "react"
import { ArrowLeft, Clock, MapPin, MessageCircle, Users, Heart, Send, X, Trophy } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock data for the event details
const eventData = {
  id: 1,
  title: "Dinamo vs Hajduk",
  date: "Today",
  time: "18:00",
  location: "Stadion Maksimir, Zagreb",
  status: "Upcoming",
  competition: "HNL - 1. HNL",
  round: "Round 28",
  homeTeam: {
    name: "Dinamo Zagreb",
    logo: "/dinamo.png?height=60&width=60",
    score: null,
    color: "#0b2b80",
    players: [
      { number: 1, name: "Dominik Livaković", position: "GK" },
      { number: 2, name: "Sadegh Moharrami", position: "DF" },
      { number: 6, name: "Rasmus Lauritsen", position: "DF" },
      { number: 13, name: "Stefan Ristovski", position: "DF" },
      { number: 37, name: "Bartol Franjić", position: "DF" },
      { number: 5, name: "Arijan Ademi", position: "MF" },
      { number: 10, name: "Lovro Majer", position: "MF" },
      { number: 17, name: "Luka Ivanušec", position: "MF" },
      { number: 99, name: "Mislav Oršić", position: "FW" },
      { number: 21, name: "Bruno Petković", position: "FW" },
      { number: 9, name: "Mario Gavranović", position: "FW" },
    ],
    stats: {
      possession: 55,
      shots: 14,
      shotsOnTarget: 6,
      corners: 7,
      fouls: 10,
      yellowCards: 2,
      redCards: 0,
    },
  },
  awayTeam: {
    name: "Hajduk Split",
    logo: "/hajduk.png?height=60&width=60",
    score: null,
    color: "#ff0000",
    players: [
      { number: 1, name: "Lovre Kalinić", position: "GK" },
      { number: 2, name: "Dino Mikanović", position: "DF" },
      { number: 6, name: "Josip Elez", position: "DF" },
      { number: 13, name: "Stefan Simić", position: "DF" },
      { number: 3, name: "David Čolina", position: "DF" },
      { number: 5, name: "Josip Vuković", position: "MF" },
      { number: 10, name: "Filip Krovinović", position: "MF" },
      { number: 17, name: "Marko Livaja", position: "MF" },
      { number: 7, name: "Ivan Perišić", position: "FW" },
      { number: 9, name: "Nikola Kalinić", position: "FW" },
      { number: 77, name: "Jan Mlakar", position: "FW" },
    ],
    stats: {
      possession: 45,
      shots: 9,
      shotsOnTarget: 3,
      corners: 4,
      fouls: 12,
      yellowCards: 3,
      redCards: 0,
    },
  },
  leagueTable: [
    { position: 1, team: "Dinamo Zagreb", played: 27, won: 21, drawn: 4, lost: 2, points: 67 },
    { position: 2, team: "Osijek", played: 27, won: 17, drawn: 6, lost: 4, points: 57 },
    { position: 3, team: "Rijeka", played: 27, won: 15, drawn: 7, lost: 5, points: 52 },
    { position: 4, team: "Hajduk Split", played: 27, won: 14, drawn: 6, lost: 7, points: 48 },
    { position: 5, team: "Gorica", played: 27, won: 11, drawn: 8, lost: 8, points: 41 },
  ],
  news: [
    {
      id: 1,
      title: "Dinamo spreman za veliki derbi protiv Hajduka",
      source: "Sportske Novosti",
      time: "2 hours ago",
      summary:
        "Trener Dinama najavio je kako je momčad spremna za veliki derbi protiv Hajduka koji se igra danas na Maksimiru.",
    },
    {
      id: 2,
      title: "Perišić: 'Vjerujem u pobjedu Hajduka'",
      source: "24sata",
      time: "4 hours ago",
      summary:
        "Ivan Perišić, povratnik u Hajduk, vjeruje kako njegova momčad može do pobjede na gostovanju kod Dinama.",
    },
    {
      id: 3,
      title: "Veliki interes za derbi, ulaznice rasprodane",
      source: "Večernji list",
      time: "Yesterday",
      summary:
        "Sve ulaznice za derbi između Dinama i Hajduka su rasprodane, očekuje se odlična atmosfera na Maksimiru.",
    },
  ],
  chats: {
    match: [
      {
        id: 1,
        user: "Navijač1",
        message: "Jedva čekam derbi!",
        time: "10:15",
        avatar: "/placeholder.svg?height=30&width=30",
      },
      {
        id: 2,
        user: "Plavi123",
        message: "Dinamo će pobijediti 2-0!",
        time: "10:17",
        avatar: "/placeholder.svg?height=30&width=30",
      },
      {
        id: 3,
        user: "HajdukFan",
        message: "Hajduk uzima 3 boda danas!",
        time: "10:20",
        avatar: "/placeholder.svg?height=30&width=30",
      },
      {
        id: 4,
        user: "Sudac007",
        message: "Nadam se fer i korektnoj utakmici.",
        time: "10:22",
        avatar: "/placeholder.svg?height=30&width=30",
      },
      {
        id: 5,
        user: "FootballExpert",
        message: "Bit će neizvjesno do samog kraja.",
        time: "10:25",
        avatar: "/placeholder.svg?height=30&width=30",
      },
    ],
    homeTeam: [
      {
        id: 1,
        user: "DZG_Fan",
        message: "Idemo Dinamo!",
        time: "09:30",
        avatar: "/placeholder.svg?height=30&width=30",
      },
      {
        id: 2,
        user: "ModriNavijač",
        message: "Majer će zabiti danas!",
        time: "09:45",
        avatar: "/placeholder.svg?height=30&width=30",
      },
      {
        id: 3,
        user: "ZagrebBoy",
        message: "Maksimir će gorjeti!",
        time: "10:00",
        avatar: "/placeholder.svg?height=30&width=30",
      },
    ],
    awayTeam: [
      {
        id: 1,
        user: "HajdukZauvijek",
        message: "Hajduk živi vječno!",
        time: "09:15",
        avatar: "/placeholder.svg?height=30&width=30",
      },
      {
        id: 2,
        user: "SplitCity",
        message: "Livaja hat-trick danas!",
        time: "09:30",
        avatar: "/placeholder.svg?height=30&width=30",
      },
      {
        id: 3,
        user: "Torcida1950",
        message: "Idemo bijeli!",
        time: "09:50",
        avatar: "/placeholder.svg?height=30&width=30",
      },
    ],
  },
}

export default function EventPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("match")
  const [activeSection, setActiveSection] = useState("lineups")
  const [message, setMessage] = useState("")
  const [isChatVisible, setIsChatVisible] = useState(false)
  const [showCommunities, setShowCommunities] = useState(false)
  const [followedClubs, setFollowedClubs] = useState<string[]>([])
  const [hasVoted, setHasVoted] = useState(false)
  const [votePercentages, setVotePercentages] = useState({ home: 40, draw: 25, away: 35 }) // Initial mock percentages

  // Function to toggle following a club
  const toggleFollowClub = (clubName: string) => {
    setFollowedClubs((prev) =>
      prev.includes(clubName) ? prev.filter((club) => club !== clubName) : [...prev, clubName],
    )
    // In a real app, this would also update a database and notification settings
    console.log(`${followedClubs.includes(clubName) ? "Unfollowed" : "Followed"} ${clubName}`)
  }

  const handleVote = (type: "home" | "draw" | "away") => {
    if (hasVoted) return

    // In a real app, this would send the vote to a backend
    // For now, we'll just update the mock percentages with a slight change to simulate a new vote
    const newPercentages = { ...votePercentages }

    // Simulate the effect of adding a new vote
    if (type === "home") {
      newPercentages.home += 2
      newPercentages.draw -= 1
      newPercentages.away -= 1
    } else if (type === "draw") {
      newPercentages.home -= 1
      newPercentages.draw += 2
      newPercentages.away -= 1
    } else {
      newPercentages.home -= 1
      newPercentages.draw -= 1
      newPercentages.away += 2
    }

    // Ensure percentages are valid
    const total = newPercentages.home + newPercentages.draw + newPercentages.away
    newPercentages.home = Math.round((newPercentages.home / total) * 100)
    newPercentages.draw = Math.round((newPercentages.draw / total) * 100)
    newPercentages.away = 100 - newPercentages.home - newPercentages.draw

    setVotePercentages(newPercentages)
    setHasVoted(true)
  }

  // Get event data based on ID (using mock data for now)
  const event = eventData

  const sendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send the message to a backend
      console.log("Sending message:", message)
      setMessage("")
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
          <Link href="/" className="mr-4">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </Link>
          <div>
            <h1 className="text-lg font-bold text-gray-800">{event.title}</h1>
            <div className="text-sm text-gray-500">
              {event.competition} • {event.round}
            </div>
          </div>
          <button className="ml-auto p-2 rounded-full hover:bg-gray-100">
            <Heart className={`w-5 h-5 text-gray-700`} />
          </button>
        </div>
      </header>

      {/* Match Info */}
      <div className="bg-white shadow-sm mb-4">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <Clock className="w-4 h-4 mr-1" />
            <span>
              {event.date}, {event.time}
            </span>
            <span className="mx-2">•</span>
            <MapPin className="w-4 h-4 mr-1" />
            <span>{event.location}</span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex flex-col items-center w-2/5">
              <div className="relative">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-2 overflow-hidden">
                  <Image
                    src={event.homeTeam.logo || "/placeholder.svg"}
                    alt={event.homeTeam.name}
                    width={60}
                    height={60}
                  />
                </div>
                <button
                  className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md"
                  onClick={(e) => {
                    e.preventDefault()
                    toggleFollowClub(event.homeTeam.name)
                  }}
                  aria-label={followedClubs.includes(event.homeTeam.name) ? "Unfollow team" : "Follow team"}
                >
                  <Heart
                    className={`w-4 h-4 ${followedClubs.includes(event.homeTeam.name) ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                  />
                </button>
              </div>
              <h2 className="text-lg font-bold text-center">{event.homeTeam.name}</h2>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold mb-1">
                {event.status === "Upcoming" ? "VS" : `${event.homeTeam.score} - ${event.awayTeam.score}`}
              </div>
              <span className="text-sm px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                {event.status === "Upcoming" ? "Upcoming" : event.status}
              </span>
                    <Link
        href={`/event/${event.id}/community`}
        className="mt-2 text-sm text-blue-600 hover:underline"
      >
        Community
      </Link>
            </div>

            <div className="flex flex-col items-center w-2/5">
              <div className="relative">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-2 overflow-hidden">
                  <Image
                    src={event.awayTeam.logo || "/placeholder.svg"}
                    alt={event.awayTeam.name}
                    width={60}
                    height={60}
                  />
                </div>
                <button
                  className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md"
                  onClick={(e) => {
                    e.preventDefault()
                    toggleFollowClub(event.awayTeam.name)
                  }}
                  aria-label={followedClubs.includes(event.awayTeam.name) ? "Unfollow team" : "Follow team"}
                >
                  <Heart
                    className={`w-4 h-4 ${followedClubs.includes(event.awayTeam.name) ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                  />
                </button>
              </div>
              <h2 className="text-lg font-bold text-center">{event.awayTeam.name}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Who will win? Section */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <h3 className="text-lg font-semibold text-center mb-3">Who will win?</h3>
        <div className="flex items-center justify-center mb-3">
          <Trophy className="w-4 h-4 text-yellow-500 mr-1" />
          <span className="text-sm text-gray-600">
            Earn <span className="font-bold text-yellow-600">+15</span> points for correct prediction
          </span>
        </div>
        <div className="flex w-full gap-1">
          <button
            onClick={() => handleVote("home")}
            className={`py-3 rounded-l-lg transition-all duration-500 ${
              hasVoted ? "bg-blue-500 text-white" : "bg-blue-100 hover:bg-blue-200 text-blue-800"
            }`}
            style={{
              width: hasVoted ? `${votePercentages.home}%` : "33.33%",
              minWidth: hasVoted ? "50px" : "auto",
            }}
            disabled={hasVoted}
          >
            {hasVoted ? `${votePercentages.home}%` : "1"}
          </button>
          <button
            onClick={() => handleVote("draw")}
            className={`py-3 transition-all duration-500 ${
              hasVoted ? "bg-gray-500 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            }`}
            style={{
              width: hasVoted ? `${votePercentages.draw}%` : "33.33%",
              minWidth: hasVoted ? "50px" : "auto",
            }}
            disabled={hasVoted}
          >
            {hasVoted ? `${votePercentages.draw}%` : "X"}
          </button>
          <button
            onClick={() => handleVote("away")}
            className={`py-3 rounded-r-lg transition-all duration-500 ${
              hasVoted ? "bg-red-500 text-white" : "bg-red-100 hover:bg-red-200 text-red-800"
            }`}
            style={{
              width: hasVoted ? `${votePercentages.away}%` : "33.33%",
              minWidth: hasVoted ? "50px" : "auto",
            }}
            disabled={hasVoted}
          >
            {hasVoted ? `${votePercentages.away}%` : "2"}
          </button>
        </div>
        {hasVoted && (
          <p className="text-xs text-gray-500 text-center mt-2">
            Based on {Math.floor(Math.random() * 500) + 500} votes
          </p>
        )}
      </div>
      

      {/* Content Sections */}
      <div className={`flex-1 w-full px-4 sm:px-6 ${isChatVisible ? "pb-80" : "pb-20"} d:px-8 lg:px-16`}>      
        <div className="flex overflow-x-auto mb-4 bg-white rounded-lg shadow-sm">
          <button
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeSection === "lineups" ? "text-emerald-600 border-b-2 border-emerald-600" : "text-gray-600"}`}
            onClick={() => setActiveSection("lineups")}
          >
            Lineups
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeSection === "stats" ? "text-emerald-600 border-b-2 border-emerald-600" : "text-gray-600"}`}
            onClick={() => setActiveSection("stats")}
          >
            Statistics
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeSection === "table" ? "text-emerald-600 border-b-2 border-emerald-600" : "text-gray-600"}`}
            onClick={() => setActiveSection("table")}
          >
            Table
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeSection === "news" ? "text-emerald-600 border-b-2 border-emerald-600" : "text-gray-600"}`}
            onClick={() => setActiveSection("news")}
          >
            Najnovije vijesti
          </button>
        </div>

        {/* Lineups Section */}
        {activeSection === "lineups" && (
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <h3 className="text-lg font-bold mb-4">Starting Lineups</h3>

            <div className="flex flex-col md:flex-row gap-4">
              {/* Home Team */}
              <div className="flex-1 mb-6 md:mb-0 md:mr-4">
                <div className="flex items-center mb-3">
                  <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                    <Image
                      src={event.homeTeam.logo || "/placeholder.svg"}
                      alt={event.homeTeam.name}
                      width={24}
                      height={24}
                    />
                  </div>
                  <h4 className="font-bold">{event.homeTeam.name}</h4>
                </div>

                <div className="space-y-2">
                  {event.homeTeam.players.map((player) => (
                    <div key={player.number} className="flex items-center p-2 bg-gray-50 rounded">
                      <span className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xs font-bold mr-3">
                        {player.number}
                      </span>
                      <span className="flex-1">{player.name}</span>
                      <span className="text-xs text-gray-500">{player.position}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Away Team */}
              <div className="flex-1">
                <div className="flex items-center mb-3">
                  <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                    <Image
                      src={event.awayTeam.logo || "/placeholder.svg"}
                      alt={event.awayTeam.name}
                      width={24}
                      height={24}
                    />
                  </div>
                  <h4 className="font-bold">{event.awayTeam.name}</h4>
                </div>

                <div className="space-y-2">
                  {event.awayTeam.players.map((player) => (
                    <div key={player.number} className="flex items-center p-2 bg-gray-50 rounded">
                      <span className="w-6 h-6 bg-red-100 text-red-800 rounded-full flex items-center justify-center text-xs font-bold mr-3">
                        {player.number}
                      </span>
                      <span className="flex-1">{player.name}</span>
                      <span className="text-xs text-gray-500">{player.position}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Statistics Section */}
        {activeSection === "stats" && (
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <h3 className="text-lg font-bold mb-4">Match Statistics</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-center">
                <div className="w-16 text-right font-bold">{event.homeTeam.stats.possession}%</div>
                <div className="flex-1 mx-4">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${event.homeTeam.stats.possession}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-16 font-bold">{event.awayTeam.stats.possession}%</div>
                <div className="w-20 text-center text-gray-500 text-sm">Possession</div>
              </div>

              <div className="flex items-center">
                <div className="w-16 text-right font-bold">{event.homeTeam.stats.shots}</div>
                <div className="flex-1 mx-4">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{
                        width: `${(event.homeTeam.stats.shots / (event.homeTeam.stats.shots + event.awayTeam.stats.shots)) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="w-16 font-bold">{event.awayTeam.stats.shots}</div>
                <div className="w-20 text-center text-gray-500 text-sm">Shots</div>
              </div>

              <div className="flex items-center">
                <div className="w-16 text-right font-bold">{event.homeTeam.stats.shotsOnTarget}</div>
                <div className="flex-1 mx-4">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{
                        width: `${(event.homeTeam.stats.shotsOnTarget / (event.homeTeam.stats.shotsOnTarget + event.awayTeam.stats.shotsOnTarget)) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="w-16 font-bold">{event.awayTeam.stats.shotsOnTarget}</div>
                <div className="w-20 text-center text-gray-500 text-sm">On Target</div>
              </div>

              <div className="flex items-center">
                <div className="w-16 text-right font-bold">{event.homeTeam.stats.corners}</div>
                <div className="flex-1 mx-4">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{
                        width: `${(event.homeTeam.stats.corners / (event.homeTeam.stats.corners + event.awayTeam.stats.corners)) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="w-16 font-bold">{event.awayTeam.stats.corners}</div>
                <div className="w-20 text-center text-gray-500 text-sm">Corners</div>
              </div>

              <div className="flex items-center">
                <div className="w-16 text-right font-bold">{event.homeTeam.stats.fouls}</div>
                <div className="flex-1 mx-4">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{
                        width: `${(event.homeTeam.stats.fouls / (event.homeTeam.stats.fouls + event.awayTeam.stats.fouls)) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="w-16 font-bold">{event.awayTeam.stats.fouls}</div>
                <div className="w-20 text-center text-gray-500 text-sm">Fouls</div>
              </div>

              <div className="flex items-center">
                <div className="w-16 text-right font-bold">{event.homeTeam.stats.yellowCards}</div>
                <div className="flex-1 mx-4">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{
                        width: `${(event.homeTeam.stats.yellowCards / (event.homeTeam.stats.yellowCards + event.awayTeam.stats.yellowCards)) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="w-16 font-bold">{event.awayTeam.stats.yellowCards}</div>
                <div className="w-20 text-center text-gray-500 text-sm">Yellow Cards</div>
              </div>
            </div>
          </div>
        )}

        {/* Table Section */}
        {activeSection === "table" && (
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <h3 className="text-lg font-bold mb-4">League Table</h3>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="py-2 px-3 font-medium">#</th>
                    <th className="py-2 px-3 font-medium">Team</th>
                    <th className="py-2 px-3 font-medium text-center">P</th>
                    <th className="py-2 px-3 font-medium text-center">W</th>
                    <th className="py-2 px-3 font-medium text-center">D</th>
                    <th className="py-2 px-3 font-medium text-center">L</th>
                    <th className="py-2 px-3 font-medium text-center">Pts</th>
                  </tr>
                </thead>
                <tbody>
                  {event.leagueTable.map((row) => (
                    <tr
                      key={row.position}
                      className={`border-b ${row.team === event.homeTeam.name || row.team === event.awayTeam.name ? "bg-emerald-50" : ""}`}
                    >
                      <td className="py-3 px-3">{row.position}</td>
                      <td className="py-3 px-3 font-medium">{row.team}</td>
                      <td className="py-3 px-3 text-center">{row.played}</td>
                      <td className="py-3 px-3 text-center">{row.won}</td>
                      <td className="py-3 px-3 text-center">{row.drawn}</td>
                      <td className="py-3 px-3 text-center">{row.lost}</td>
                      <td className="py-3 px-3 text-center font-bold">{row.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* News Section */}
        {activeSection === "news" && (
  <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
    <h3 className="text-lg font-bold mb-4">Najnovije vijesti</h3>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {event.news.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow"
        >
          {/* Photo */}
          <div className="relative w-full h-40">
            <Image
              src="/placeholder.jpg"
              alt={item.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-4">
            <h4 className="font-bold text-lg mb-1">{item.title}</h4>
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <span>{item.source}</span>
              <span className="mx-2">•</span>
              <span>{item.time}</span>
            </div>
            <p className="text-gray-700">{item.summary}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
)}
      </div>

      {/* Chat Toggle Button */}
      <div className="fixed bottom-4 right-4 z-30">
        <button
          className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors ${
            isChatVisible ? "bg-red-500" : "bg-emerald-500"
          }`}
          onClick={() => setIsChatVisible(!isChatVisible)}
        >
          {isChatVisible ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
        </button>
      </div>

      {/* Bottom Chat Panel - Collapsible */}
      {isChatVisible && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-20 transition-all duration-300 ease-in-out">
          <div className="max-w-7xl mx-auto">
            <div className="flex border-b">
              <button
                className={`flex-1 py-3 text-sm font-medium ${activeTab === "match" ? "text-emerald-600 border-b-2 border-emerald-600" : "text-gray-600"}`}
                onClick={() => setActiveTab("match")}
              >
                <div className="flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 mr-1" />
                  <span>Match Chat</span>
                </div>
              </button>
              <button
                className={`flex-1 py-3 text-sm font-medium ${activeTab === "homeTeam" ? "text-emerald-600 border-b-2 border-emerald-600" : "text-gray-600"}`}
                onClick={() => setActiveTab("homeTeam")}
              >
                <div className="flex items-center justify-center">
                  <Users className="w-5 h-5 mr-1" />
                  <span>Dinamo Fans</span>
                </div>
              </button>
              <button
                className={`flex-1 py-3 text-sm font-medium ${activeTab === "awayTeam" ? "text-emerald-600 border-b-2 border-emerald-600" : "text-gray-600"}`}
                onClick={() => setActiveTab("awayTeam")}
              >
                <div className="flex items-center justify-center">
                  <Users className="w-5 h-5 mr-1" />
                  <span>Hajduk Fans</span>
                </div>
              </button>
            </div>

            {/* Chat Messages */}
            <div className="p-4 h-60 overflow-y-auto bg-gray-50">
              {event.chats[activeTab].map((chat) => (
                <div key={chat.id} className="flex mb-3 last:mb-0">
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
                    <Image src={chat.avatar || "/placeholder.svg"} alt={chat.user} width={32} height={32} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline">
                      <span className="font-bold text-sm">{chat.user}</span>
                      <span className="ml-2 text-xs text-gray-500">{chat.time}</span>
                    </div>
                    <p className="text-gray-800">{chat.message}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-2 flex items-center border-t">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                className="ml-2 w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center"
                onClick={sendMessage}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
