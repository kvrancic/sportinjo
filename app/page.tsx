"use client"

import { Search, MapPin, Clock, ChevronRight, Home, Map, MessageSquare, Heart, Bell, Trophy } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock data for events
const LOCATIONS = ["All", "Stadion Maksimir", "Dražen Petrović Hall", "Dom sportova", "Jarun", "Bundek"]

const SPORTS = [
  "All",
  "Football",
  "Basketball",
  "Water Polo",
  "Tennis",
  "Ice Hockey",
  "Running",
  "Fencing",
  "Ultimate Frisbee",
  "Pétanque",
]

const DATES = ["All", "Today", "Tomorrow", "This Week", "This Weekend", "Next Week"]

const EVENTS = [
  {
    id: 1,
    title: "Dinamo vs Hajduk",
    sport: "Football",
    time: "Today, 18:00",
    location: "Stadion Maksimir",
    image: "/nogomet.png?height=120&width=200",
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
    image: "/basket.png?height=120&width=200",
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
    image: "/waterpolo.png?height=120&width=200",
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
    image: "/tenis.png?height=120&width=200",
    favourite: true,
    popular: true,
    coordinates: [45.7793, 15.925], // Tennis courts at Jarun,
  },
  {
    id: 5,
    title: "Medveščak vs KHL Sisak",
    sport: "Ice Hockey",
    time: "Tue, Apr 25",
    location: "Dom sportova",
    image: "/hokej.png?height=120&width=200",
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
    image: "/trcanje.png?height=120&width=200",
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
    image: "/fencing.png?height=120&width=200",
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
    image: "/frizbi.png?height=120&width=200",
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
    image: "/bocanje.png?height=120&width=200",
    favourite: false,
    popular: false,
    coordinates: [45.7813, 15.923], // Jarun Lake (slightly different coordinates)
  },
]

export default function SportsAroundMe() {
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [events, setEvents] = useState(EVENTS)
  const [searchQuery, setSearchQuery] = useState("")
  const [notifications, setNotifications] = useState(false)
  const [selectedSport, setSelectedSport] = useState("All")
  const [selectedDate, setSelectedDate] = useState("All")
  const [selectedLocation, setSelectedLocation] = useState("All")

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

  // Filter events based on search query and selected filters
  useEffect(() => {
    let filteredEvents = EVENTS

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filteredEvents = filteredEvents.filter(
          (event) =>
              event.title.toLowerCase().includes(query) ||
              event.sport.toLowerCase().includes(query) ||
              event.location.toLowerCase().includes(query),
      )
    }

    // Apply sport filter
    if (selectedSport !== "All") {
      filteredEvents = filteredEvents.filter((event) => event.sport === selectedSport)
    }

    // Apply date filter (simplified for demo)
    if (selectedDate !== "All") {
      if (selectedDate === "Today") {
        filteredEvents = filteredEvents.filter((event) => event.time.includes("Today"))
      } else if (selectedDate === "This Week") {
        // This is a simplified filter - in a real app, you'd use proper date comparison
        filteredEvents = filteredEvents.filter((event) => !event.time.includes("Apr 29"))
      }
    }

    // Apply location filter
    if (selectedLocation !== "All") {
      filteredEvents = filteredEvents.filter((event) => event.location === selectedLocation)
    }

    setEvents(filteredEvents)
  }, [searchQuery, selectedSport, selectedDate, selectedLocation])

  // Filter events for each section based on current state
  const nearYouEvents = events.slice(0, 4) // For now, just take the first 4 events
  const favouriteEvents = events.filter((event) => event.favourite)
  const hiddenGemsEvents = events.filter((event) => !event.popular)

  // Event card component to reuse across sections
  const EventCard = ({ event }) => (
      <div className="relative min-w-[200px] h-[180px] sm:h-[150px] rounded-lg overflow-hidden">
        <Link href={`/event/${event.id}`} className="absolute inset-0 z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60">
            <img
                src={event.image || "/placeholder.svg"}
                alt={event.title}
                className="w-full h-full object-cover filter brightness-50"
            />
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
      <>
        <header className="sportinjo-bg w-screen relative overflow-hidden py-24 pb-16 text-center">
          {/* compact utility bar (notifications - points - avatar) */}
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <img
                src="/samo-kip.png" /* path relative to /public      */
                alt="" /* decorative, so empty alt      */
                className="w-[420px] md:w-[800px] w-[800px] opacity-15 select-none translate-x-[100px] translate-y-[80px] md:translate-x-[300px]"
            />
          </div>
          <div className="absolute top-4 right-4 flex items-center gap-3">
            {/* Points indicator */}
            <Link href="/rewards" className="flex items-center bg-yellow-100 rounded-full px-2.5 py-1">
              <Trophy className="w-3.5 h-3.5 text-yellow-600 mr-1" />
              <span className="text-xs font-medium text-yellow-800">125</span>
            </Link>

            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <div className="w-5 h-5 rounded-full bg-white"></div>
            </div>
          </div>

          {/* big centred title */}
          <h1 className="text-6xl md:text-8xl font-extrabold text-white mb-3 font-[Georgia]">Sportinjo</h1>

          {/* tagline & helper */}
          <p className="text-lg md:text-2xl text-white mb-0 font-[Georgia]">
            Tvoje mjesto za zagrebačke sportske aktivnosti
          </p>
        </header>
        {/* Search Container */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-4 mb-12 z-10">
          <div className="search-container">
            <div className="mb-4">
              <div className="relative">
                <input
                    type="text"
                    placeholder="Pretraži sportove, termine..."
                    className="w-full bg-gray-50 rounded-lg border border-gray-200 py-3 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Left side: three equal-width dropdowns */}
              <div className="grid grid-cols-3 gap-3 flex-1">
                <Select value={selectedSport} onValueChange={setSelectedSport}>
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Sport" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Sport</SelectLabel>
                      {SPORTS.map((sport) => (
                          <SelectItem key={sport} value={sport}>
                            {sport}
                          </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <Select value={selectedDate} onValueChange={setSelectedDate}>
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Datum" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Datum</SelectLabel>
                      {DATES.map((date) => (
                          <SelectItem key={date} value={date}>
                            {date}
                          </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Lokacija" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Lokacija</SelectLabel>
                      {LOCATIONS.map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Right side: auto-sized search button */}
              <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6">
          {/* Near You Section */}
          <section className="mt-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Near You</h2>
            <div
                className="
      flex space-x-4
      overflow-x-auto
      pb-2
      scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100
    "
            >
              {nearYouEvents.length > 0 ? (
                  nearYouEvents.map((event) => (
                      <div key={event.id} className="flex-none">
                        <EventCard event={event} />
                      </div>
                  ))
              ) : (
                  <p className="text-gray-500 italic">No events found nearby.</p>
              )}
            </div>
          </section>

          {/* Favourites Section */}
          <section className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Favourites</h2>
            <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {favouriteEvents.length > 0 ? (
                  favouriteEvents.map((event) => (
                      <div key={event.id} className="flex-none">
                        <EventCard event={event} />
                      </div>
                  ))
              ) : (
                  <p className="text-gray-500 italic">No favorite events yet.</p>
              )}
            </div>
          </section>

          {/* Hidden Gems Section */}
          <section className="mt-8">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl font-bold text-gray-800">Hidden Gems</h2>
              <ChevronRight className="w-6 h-6 text-blue-500" />
            </div>
            <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {hiddenGemsEvents.length > 0 ? (
                  hiddenGemsEvents.map((event) => (
                      <div key={event.id} className="flex-none">
                        <EventCard event={event} />
                      </div>
                  ))
              ) : (
                  <p className="text-gray-500 italic">No hidden gems found.</p>
              )}
            </div>
          </section>

          {/* Bottom Navigation */}
          <div className="mt-auto pt-8 pb-8">
            <div className="flex justify-between items-center">
              <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center py-4">
                  <Link href="/" className="flex flex-col items-center">
                    <Home className="w-6 h-6 text-blue-500" />
                    <span className="text-sm text-blue-500">Početna</span>
                  </Link>
                  <Link href="/map" className="flex flex-col items-center">
                    <Map className="w-6 h-6 text-gray-400" />
                    <span className="text-sm text-gray-400">Karta</span>
                  </Link>
                  <Link href="/notifications" className="flex flex-col items-center relative">
                    <Bell className="w-6 h-6 text-gray-400" />
                    <span className="text-sm text-gray-400">Notifikacije</span>
                    {/* badge */}
                    <span className="absolute -top-1 -right-2 w-4 h-4 bg-red-500 text-[10px] leading-none rounded-full flex items-center justify-center text-white">
                    4
                  </span>
                  </Link>
                  <Link href="/chat" className="flex flex-col items-center">
                    <MessageSquare className="w-6 h-6 text-gray-400" />
                    <span className="text-sm text-gray-400">Chat AI</span>
                  </Link>
                </div>
              </footer>
            </div>
          </div>
        </main>
      </>
  )
}
