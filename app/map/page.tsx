"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { Home, MapIcon, MessageSquare, Calendar, X, Heart, Info } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock data for events with real Zagreb coordinates
const EVENTS = [
  {
    id: 1,
    title: "Dinamo vs Hajduk",
    sport: "Football",
    time: "Today, 18:00",
    location: "Stadion Maksimir",
    image: "/placeholder.svg?height=120&width=200",
    favourite: true,
    popular: true,
    coordinates: [45.8196, 16.0185],
  },
  {
    id: 2,
    title: "Cibona vs Cedevita",
    sport: "Basketball",
    time: "Sat, Apr 22",
    location: "Dražen Petrović Hall",
    image: "/placeholder.svg?height=120&width=200",
    favourite: true,
    popular: true,
    coordinates: [45.8033, 15.9704],
  },
  {
    id: 3,
    title: "Mladost vs HAVK Mladost",
    sport: "Water Polo",
    time: "Sun, Apr 23",
    location: "Jarun",
    image: "/placeholder.svg?height=120&width=200",
    favourite: false,
    popular: true,
    coordinates: [45.7833, 15.9208],
  },
  {
    id: 4,
    title: "Zagreb Open",
    sport: "Tennis",
    time: "Mon, Apr 24",
    location: "Jarun",
    image: "/placeholder.svg?height=120&width=200",
    favourite: true,
    popular: true,
    coordinates: [45.7793, 15.925],
  },
  {
    id: 5,
    title: "Medveščak vs KHL Sisak",
    sport: "Ice Hockey",
    time: "Tue, Apr 25",
    location: "Dom sportova",
    image: "/placeholder.svg?height=120&width=200",
    favourite: false,
    popular: false,
    coordinates: [45.8072, 15.9533],
  },
  {
    id: 6,
    title: "Zagreb Marathon",
    sport: "Running",
    time: "Wed, Apr 26",
    location: "Bundek",
    image: "/placeholder.svg?height=120&width=200",
    favourite: false,
    popular: true,
    coordinates: [45.785, 15.995],
  },
  {
    id: 7,
    title: "Fencing Tournament",
    sport: "Fencing",
    time: "Thu, Apr 27",
    location: "Dom sportova",
    image: "/placeholder.svg?height=120&width=200",
    favourite: false,
    popular: false,
    coordinates: [45.8075, 15.953],
  },
  {
    id: 8,
    title: "Ultimate Frisbee Cup",
    sport: "Ultimate Frisbee",
    time: "Fri, Apr 28",
    location: "Bundek",
    image: "/placeholder.svg?height=120&width=200",
    favourite: false,
    popular: false,
    coordinates: [45.786, 15.994],
  },
  {
    id: 9,
    title: "Pétanque Championship",
    sport: "Pétanque",
    time: "Sat, Apr 29",
    location: "Jarun",
    image: "/placeholder.svg?height=120&width=200",
    favourite: false,
    popular: false,
    coordinates: [45.7813, 15.923],
  },
  {
    id: 10,
    title: "Beach Volleyball Masters",
    sport: "Volleyball",
    time: "Sun, Apr 30",
    location: "Jarun Beach",
    image: "/placeholder.svg?height=120&width=200",
    favourite: true,
    popular: true,
    coordinates: [45.7805, 15.9217],
  },
  {
    id: 11,
    title: "National Swimming Cup",
    sport: "Swimming",
    time: "Mon, May 1",
    location: "Mladost Swimming Pool",
    image: "/placeholder.svg?height=120&width=200",
    favourite: true,
    popular: true,
    coordinates: [45.8038, 15.9645],
  },
  {
    id: 12,
    title: "Zagreb Cycling Race",
    sport: "Cycling",
    time: "Tue, May 2",
    location: "City Center",
    image: "/placeholder.svg?height=120&width=200",
    favourite: false,
    popular: true,
    coordinates: [45.815, 15.9819],
  },
  {
    id: 13,
    title: "Handball Derby: PPD Zagreb vs Nexe",
    sport: "Handball",
    time: "Wed, May 3",
    location: "Arena Zagreb",
    image: "/placeholder.svg?height=120&width=200",
    favourite: true,
    popular: true,
    coordinates: [45.7815, 15.967],
  },
  {
    id: 14,
    title: "Croatia Boxing Championship",
    sport: "Boxing",
    time: "Thu, May 4",
    location: "Dom sportova",
    image: "/placeholder.svg?height=120&width=200",
    favourite: false,
    popular: false,
    coordinates: [45.8075, 15.953],
  },
  {
    id: 15,
    title: "Table Tennis Open",
    sport: "Table Tennis",
    time: "Fri, May 5",
    location: "Dom sportova",
    image: "/placeholder.svg?height=120&width=200",
    favourite: false,
    popular: false,
    coordinates: [45.8075, 15.953],
  },
  {
    id: 16,
    title: "Badminton Championship",
    sport: "Badminton",
    time: "Sat, May 6",
    location: "Dom sportova",
    image: "/placeholder.svg?height=120&width=200",
    favourite: false,
    popular: true,
    coordinates: [45.8075, 15.953],
  },
  {
    id: 17,
    title: "Croatia Golf Open",
    sport: "Golf",
    time: "Sun, May 7",
    location: "Golf Club Zagreb",
    image: "/placeholder.svg?height=120&width=200",
    favourite: true,
    popular: false,
    coordinates: [45.8475, 16.0201],
  },
  {
    id: 18,
    title: "Ski Cup Sljeme",
    sport: "Skiing",
    time: "Mon, May 8",
    location: "Sljeme",
    image: "/placeholder.svg?height=120&width=200",
    favourite: true,
    popular: true,
    coordinates: [45.8992, 15.9639],
  },
  {
    id: 19,
    title: "Rowing Regatta",
    sport: "Rowing",
    time: "Tue, May 9",
    location: "Jarun Lake",
    image: "/placeholder.svg?height=120&width=200",
    favourite: true,
    popular: false,
    coordinates: [45.7833, 15.9208],
  },
  {
    id: 20,
    title: "Gymnastics Gala",
    sport: "Gymnastics",
    time: "Wed, May 10",
    location: "Arena Zagreb",
    image: "/placeholder.svg?height=120&width=200",
    favourite: false,
    popular: false,
    coordinates: [45.7815, 15.967],
  },
  {
    id: 21,
    title: "Outdoor Yoga Festival",
    sport: "Yoga",
    time: "Thu, May 11",
    location: "Bundek Park",
    image: "/placeholder.svg?height=120&width=200",
    favourite: false,
    popular: true,
    coordinates: [45.785, 15.995],
  },
  {
    id: 22,
    title: "Climbing Competition",
    sport: "Climbing",
    time: "Fri, May 12",
    location: "Fothia Climbing Center",
    image: "/placeholder.svg?height=120&width=200",
    favourite: true,
    popular: false,
    coordinates: [45.8003, 15.9714],
  },
  {
    id: 23,
    title: "City Bowling Tournament",
    sport: "Bowling",
    time: "Sat, May 13",
    location: "Bowling Center Zagreb",
    image: "/placeholder.svg?height=120&width=200",
    favourite: false,
    popular: true,
    coordinates: [45.7982, 15.978],
  },
  {
    id: 24,
    title: "Surfing Challenge",
    sport: "Surfing",
    time: "Sun, May 14",
    location: "Zagreb Surf Center",
    image: "/placeholder.svg?height=120&width=200",
    favourite: false,
    popular: false,
    coordinates: [45.7835, 15.929],
  },
  {
    id: 25,
    title: "Karate Championship",
    sport: "Karate",
    time: "Mon, May 15",
    location: "Dom sportova",
    image: "/placeholder.svg?height=120&width=200",
    favourite: true,
    popular: false,
    coordinates: [45.8075, 15.953],
  },
  {
    id: 26,
    title: "Judo Masters",
    sport: "Judo",
    time: "Tue, May 16",
    location: "Dom sportova",
    image: "/placeholder.svg?height=120&width=200",
    favourite: false,
    popular: true,
    coordinates: [45.8075, 15.953],
  },
  {
    id: 27,
    title: "Archery Cup",
    sport: "Archery",
    time: "Wed, May 17",
    location: "Zagreb Archery Range",
    image: "/placeholder.svg?height=120&width=200",
    favourite: false,
    popular: true,
    coordinates: [45.796, 15.948],
  },
  {
    id: 28,
    title: "Sailing Regatta",
    sport: "Sailing",
    time: "Thu, May 18",
    location: "Jarun Lake",
    image: "/placeholder.svg?height=120&width=200",
    favourite: true,
    popular: true,
    coordinates: [45.7833, 15.9208],
  },
  {
    id: 29,
    title: "Rugby Clash",
    sport: "Rugby",
    time: "Fri, May 19",
    location: "Rugby Club Zagreb",
    image: "/placeholder.svg?height=120&width=200",
    favourite: true,
    popular: false,
    coordinates: [45.809, 15.975],
  },
  {
    id: 30,
    title: "Baseball Exhibition Game",
    sport: "Baseball",
    time: "Sat, May 20",
    location: "Jarun Baseball Field",
    image: "/placeholder.svg?height=120&width=200",
    favourite: false,
    popular: false,
    coordinates: [45.782, 15.926],
  },
];


// Sport icon mapping for the legend
const SPORT_ICONS = {
  Football: "https://cdn-icons-png.flaticon.com/512/1165/1165187.png",
  Basketball: "https://cdn-icons-png.flaticon.com/512/33/33736.png",
  "Water Polo": "https://cdn-icons-png.flaticon.com/512/2151/2151449.png",
  Tennis: "https://cdn-icons-png.flaticon.com/512/2906/2906730.png",
  "Ice Hockey": "https://cdn-icons-png.flaticon.com/512/2151/2151713.png",
  Running: "https://cdn-icons-png.flaticon.com/512/2151/2151417.png",
  Fencing: "https://cdn-icons-png.flaticon.com/512/2151/2151386.png",
  "Ultimate Frisbee": "https://cdn-icons-png.flaticon.com/512/2151/2151445.png",
  Pétanque: "https://cdn-icons-png.flaticon.com/512/2151/2151457.png",
}

// Get unique sports from events
const getUniqueSports = () => {
  const sportsSet = new Set(EVENTS.map((event) => event.sport))
  return Array.from(sportsSet)
}

// Dynamically import the Map component to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import("../components/map-component"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading map...</p>
      </div>
    </div>
  ),
})

export default function MapPage() {
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [timespan, setTimespan] = useState(7) // Default 7 days
  const [userLocation] = useState([45.7786272, 15.9719775]) // Default Zagreb coordinates
  const [showLegend, setShowLegend] = useState(false)
  const [uniqueSports] = useState(getUniqueSports())
  const [mapKey, setMapKey] = useState(Date.now()) // Key to force re-render

  // Force re-render of map component when navigating to this page
  useEffect(() => {
    setMapKey(Date.now())
  }, [])

  // Filter events based on timespan
  const filteredEvents = EVENTS.filter(() => {
    // For demo purposes, we'll just show all events
    // In a real app, you would filter based on event date and selected timespan
    return true
  })

  const handleMarkerClick = (event) => {
    setSelectedEvent(event)
  }

  const closeEventDetails = () => {
    setSelectedEvent(null)
  }

  // Toggle favorite status
  const toggleFavorite = (id) => {
    // In a real app, this would update state and possibly a database
    console.log("Toggle favorite for event:", id)
  }

  return (
    <div className="h-screen w-screen flex flex-col">
      {/* Time filter */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-gray-700">
            <X className="w-6 h-6" />
          </Link>
          <div className="flex space-x-2">
            <button
              className={`px-4 py-2 rounded-full text-sm ${timespan === 1 ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"}`}
              onClick={() => setTimespan(1)}
            >
              Today
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm ${timespan === 3 ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"}`}
              onClick={() => setTimespan(3)}
            >
              3 Days
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm ${timespan === 7 ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"}`}
              onClick={() => setTimespan(7)}
            >
              Week
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm ${timespan === 30 ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"}`}
              onClick={() => setTimespan(30)}
            >
              Month
            </button>
          </div>
          <button
            className="w-6 h-6 flex items-center justify-center text-gray-700"
            onClick={() => setShowLegend(!showLegend)}
            aria-label="Toggle legend"
          >
            <Info className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 z-0">
        <MapComponent
          key={mapKey}
          userLocation={userLocation}
          events={filteredEvents}
          onMarkerClick={handleMarkerClick}
        />
      </div>

      {/* Legend for sport icons */}
      {showLegend && (
        <div className="absolute bottom-20 left-4 z-10 bg-white p-3 rounded-lg shadow-md max-h-48 overflow-y-auto w-48">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm font-semibold">Sport Types</div>
            <button onClick={() => setShowLegend(false)} className="text-gray-500 hover:text-gray-700">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {uniqueSports.map((sport) => (
              <div key={sport} className="flex items-center">
                <div
                  className="w-6 h-6 mr-2 bg-contain bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${SPORT_ICONS[sport] || SPORT_ICONS.default})` }}
                ></div>
                <span className="text-xs">{sport}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="bg-white border-t py-4 px-4 z-10">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link href="/" className="flex flex-col items-center">
            <Home className="w-6 h-6 text-gray-400" />
            <span className="text-sm text-gray-400">Home</span>
          </Link>
          <Link href="/map" className="flex flex-col items-center">
            <MapIcon className="w-6 h-6 text-blue-500" />
            <span className="text-sm text-blue-500">Map</span>
          </Link>
          <Link href="#" className="flex flex-col items-center">
            <MessageSquare className="w-6 h-6 text-gray-400" />
            <span className="text-sm text-gray-400">Chat AI</span>
          </Link>
        </div>
      </div>

      {/* Event Details Bottom Sheet */}
      {selectedEvent && (
        <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-lg z-20 transition-transform duration-300 ease-in-out">
          <div className="p-4">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">{selectedEvent.title}</h2>
              <button onClick={closeEventDetails} className="p-1">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="flex mb-4">
              <div className="w-1/3 h-24 bg-gray-200 rounded-lg overflow-hidden mr-3">
                <Image
                  src={selectedEvent.image || "/placeholder.svg"}
                  alt={selectedEvent.title}
                  width={120}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{selectedEvent.time}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <MapIcon className="w-4 h-4 mr-1" />
                  <span>{selectedEvent.location}</span>
                </div>
                <div className="flex items-center">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {selectedEvent.sport}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Link
                href={`/event/${selectedEvent.id}`}
                className="flex-1 bg-blue-500 text-white py-2 rounded-lg text-center mr-2"
              >
                View Details
              </Link>
              <button
                className="w-12 h-10 bg-gray-100 rounded-lg flex items-center justify-center"
                onClick={() => toggleFavorite(selectedEvent.id)}
              >
                <Heart
                  className={`w-5 h-5 ${selectedEvent.favourite ? "fill-red-500 text-red-500" : "text-gray-700"}`}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
