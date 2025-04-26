"use client"

import {
  Search,
  Filter,
  MapPin,
  Clock,
  ChevronRight,
  Home,
  Map,
  MessageSquare,
  ChevronDown,
  Heart,
  Bell,
  X,
  Trophy,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

// Mock data for events
const LOCATIONS = ["All", "Stadion Maksimir", "Dražen Petrović Hall", "Dom sportova", "Jarun", "Bundek"]

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
    coordinates: [45.8196, 16.0185], // Maksimir Stadium
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
    coordinates: [45.8033, 15.9704], // Dražen Petrović Basketball Center
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
    coordinates: [45.7833, 15.9208], // Jarun Lake
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
    coordinates: [45.7793, 15.925], // Tennis courts at Jarun
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
    coordinates: [45.8072, 15.9533], // Dom Sportova
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
    coordinates: [45.785, 15.995], // Bundek Park
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
    coordinates: [45.8075, 15.953], // Dom Sportova (slightly different coordinates)
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
    coordinates: [45.786, 15.994], // Bundek Park (slightly different coordinates)
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
    coordinates: [45.7813, 15.923], // Jarun Lake (slightly different coordinates)
  },
]

export default function SportsAroundMe() {
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [events, setEvents] = useState(EVENTS)
  const [notifications, setNotifications] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifications && !event.target.closest(".notifications-container")) {
        setNotifications(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [notifications])

  // Function to toggle favorite status
  const toggleFavorite = (id) => {
    setEvents(events.map((event) => (event.id === id ? { ...event, favourite: !event.favourite } : event)))
  }

  // Filter events for each section based on current state
  const nearYouEvents = events.slice(0, 4) // For now, just take the first 4 events
  const favouriteEvents = events.filter((event) => event.favourite)
  const hiddenGemsEvents = events.filter((event) => !event.popular)

  // Event card component to reuse across sections
  const EventCard = ({ event }) => (
    <div className="relative min-w-[200px] h-[180px] sm:h-[150px] rounded-lg overflow-hidden">
      <Link href={`/event/${event.id}`} className="absolute inset-0 z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60">
          <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-full object-cover" />
        </div>
        <div className="absolute bottom-0 left-0 p-3 text-white">
          <h3 className="font-bold text-lg">{event.title}</h3>
          <div className="flex items-center text-sm mb-1">
            <Clock className="w-4 h-4 mr-1" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{event.location}</span>
          </div>
        </div>
      </Link>
      <button
        className="absolute top-3 right-3 bg-white/80 rounded-full p-1.5 hover:bg-white transition-colors z-20"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          toggleFavorite(event.id)
        }}
        aria-label={event.favourite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart className={`w-4 h-4 ${event.favourite ? "fill-red-500 text-red-500" : "text-gray-700"}`} />
      </button>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto bg-white min-h-screen flex flex-col px-4 sm:px-6">
      {/* Header */}
      <header className="flex justify-between items-center py-6">
        <h1 className="text-2xl font-bold text-gray-800">Sports-Around-Me</h1>
        <div className="flex items-center gap-3">
          <div className="relative notifications-container">
            <button
              className="relative w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center"
              onClick={() => setNotifications(!notifications)}
              aria-label="Toggle notifications"
            >
              <Bell className="w-5 h-5 text-emerald-600" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">4</span>
              </span>
            </button>

            {notifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-50">
                <div className="p-3 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-700">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="p-3 border-b border-gray-100 hover:bg-gray-50">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-yellow-100 rounded-full p-2">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Prediction Correct!</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Dinamo won against Hajduk! You earned{" "}
                          <span className="font-semibold text-yellow-600">+15 points</span> for your correct prediction.
                        </p>
                        <p className="text-xs text-gray-400 mt-1">5 minutes ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border-b border-gray-100 hover:bg-gray-50">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-red-100 rounded-full p-2">
                        <X className="h-4 w-4 text-red-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Event Cancelled</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Zagreb Marathon has been cancelled due to heavy rain forecast.
                        </p>
                        <p className="text-xs text-gray-400 mt-1">10 minutes ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border-b border-gray-100 hover:bg-gray-50">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-yellow-100 rounded-full p-2">
                        <Clock className="h-4 w-4 text-yellow-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Time Change</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Dinamo vs Hajduk match has been rescheduled to 20:00 today.
                        </p>
                        <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 hover:bg-gray-50">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-emerald-100 rounded-full p-2">
                        <Heart className="h-4 w-4 text-emerald-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Team Update</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Dinamo Zagreb announced a new player signing today!
                        </p>
                        <p className="text-xs text-gray-400 mt-1">Yesterday</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-2 bg-gray-50 text-center border-t border-gray-100">
                  <button className="text-xs text-emerald-600 font-medium">Mark all as read</button>
                </div>
              </div>
            )}
          </div>

          {/* Points indicator */}
          <Link href="/rewards" className="flex items-center bg-yellow-100 rounded-full px-3 py-1.5">
            <Trophy className="w-4 h-4 text-yellow-600 mr-1.5" />
            <span className="text-sm font-medium text-yellow-800">125</span>
          </Link>

          <div className="w-10 h-10 rounded-full bg-emerald-200 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-gray-800"></div>
          </div>
        </div>
      </header>

      {/* Search bar */}
      <div className="my-4 flex items-center gap-2">
        <div className="flex-1 bg-emerald-100 rounded-full flex items-center px-4 py-2">
          <Search className="text-emerald-500 w-5 h-5 flex-shrink-0" />
          <input
            type="text"
            placeholder="Što tražite?"
            className="ml-2 bg-transparent border-none outline-none w-full text-gray-700 placeholder-gray-500"
          />
        </div>
        <button
          className="w-10 h-10 bg-emerald-200 rounded-full flex items-center justify-center"
          onClick={() => setFiltersOpen(!filtersOpen)}
        >
          <Filter className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Filters section - only visible when filters are open */}
      {filtersOpen && (
        <div className="bg-emerald-50 rounded-lg p-4 mb-4 animate-in fade-in duration-200">
          <h3 className="font-medium mb-3">Filteri</h3>

          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Sport</label>
              <div className="relative">
                <select className="w-full bg-white rounded-md border border-gray-200 py-2 pl-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500">
                  <option value="">Svi sportovi</option>
                  <option value="football">Nogomet</option>
                  <option value="basketball">Košarka</option>
                  <option value="volleyball">Odbojka</option>
                  <option value="tennis">Tenis</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Vrijeme</label>
              <div className="relative">
                <select className="w-full bg-white rounded-md border border-gray-200 py-2 pl-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500">
                  <option value="">Bilo kada</option>
                  <option value="today">Danas</option>
                  <option value="tomorrow">Sutra</option>
                  <option value="weekend">Ovaj vikend</option>
                  <option value="week">Ovaj tjedan</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Lokacija</label>
              <div className="relative">
                <select className="w-full bg-white rounded-md border border-gray-200 py-2 pl-3 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500">
                  {LOCATIONS.map((location, index) => (
                    <option key={index} value={location === "All" ? "" : location}>
                      {location}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition-colors">
                Primijeni
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Near You Section */}
      <section className="mt-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Near You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {nearYouEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* Favourites Section */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Favourites</h2>
        {favouriteEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {favouriteEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">
            No favorite events yet. Click the heart icon to add events to your favorites.
          </p>
        )}
      </section>

      {/* Hidden Gems Section */}
      <section className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Hidden Gems</h2>
          <ChevronRight className="w-6 h-6 text-emerald-500" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {hiddenGemsEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* Bottom Navigation */}
      <div className="mt-auto pt-8 pb-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex flex-col items-center">
            <Home className="w-6 h-6 text-emerald-500" />
            <span className="text-sm text-emerald-500">Home</span>
          </Link>
          <Link href="/map" className="flex flex-col items-center">
            <Map className="w-6 h-6 text-gray-400" />
            <span className="text-sm text-gray-400">Map</span>
          </Link>
          <Link href="/chat" className="flex flex-col items-center">
            <MessageSquare className="w-6 h-6 text-gray-400" />
            <span className="text-sm text-gray-400">Chat AI</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
