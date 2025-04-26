"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Trophy, Star, ChevronRight, Filter, Search, AlertCircle, X, Check } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import confetti from "canvas-confetti"

// Mock data for rewards
const REWARDS = [
  {
    id: 1,
    title: "Training Session with Ivica Kostelić",
    description: "Join the retired Croatian skiing champion for a fitness training session and Q&A.",
    points: 3000,
    image: "/ski-athlete-fans.png",
    category: "Experiences",
    featured: true,
    available: 2,
    expiresAt: "2023-12-31",
  },
  {
    id: 2,
    title: "VIP Box Seats: Dinamo vs Hajduk",
    description: "Premium box seats for the biggest derby in Croatian football. Includes food and drinks.",
    points: 2500,
    image: "/stadium-vip-view.png",
    category: "Tickets",
    featured: true,
    available: 4,
    expiresAt: "2023-10-15",
  },
  {
    id: 3,
    title: "Signed Dinamo Zagreb Jersey",
    description: "Official jersey signed by the entire Dinamo Zagreb team from the current season.",
    points: 1500,
    image: "/autographed-soccer-jersey-display.png",
    category: "Merchandise",
    featured: false,
    available: 10,
    expiresAt: "2023-11-30",
  },
  {
    id: 4,
    title: "Courtside Seats: Cibona Basketball",
    description: "Experience the thrill of basketball from courtside seats at the next Cibona home game.",
    points: 1200,
    image: "/vibrant-courtside-view.png",
    category: "Tickets",
    featured: false,
    available: 6,
    expiresAt: "2023-10-20",
  },
  {
    id: 5,
    title: "Meet & Greet with Ivica Kostelić",
    description: "Meet the legendary Croatian skier for photos and autographs at a special event.",
    points: 2000,
    image: "/ski-athlete-fans.png",
    category: "Experiences",
    featured: true,
    available: 2,
    expiresAt: "2023-12-15",
  },
  {
    id: 6,
    title: "Limited Edition Basketball from Cibona",
    description: "Collector's item: special edition basketball commemorating Cibona's championship season.",
    points: 1000,
    image: "/basketball-collection.png",
    category: "Merchandise",
    featured: false,
    available: 5,
    expiresAt: "2023-11-15",
  },
  {
    id: 7,
    title: "Private Tour of Maksimir Stadium",
    description: "Behind-the-scenes tour of Croatia's most famous football stadium with a former player.",
    points: 800,
    image: "/maksimir.jpg?key=ddcvx",
    category: "Experiences",
    featured: false,
    available: 15,
    expiresAt: "2023-12-31",
  },
  {
    id: 8,
    title: "Season Tickets: RK Zagreb Handball",
    description: "Full season tickets to watch Croatia's best handball team in action.",
    points: 2000,
    image: "/vibrant-handball-action.png",
    category: "Tickets",
    featured: false,
    available: 8,
    expiresAt: "2023-09-30",
  },
]

// Categories for filtering
const CATEGORIES = ["All", "Experiences", "Tickets", "Merchandise"]

export default function RewardsPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [sortBy, setSortBy] = useState("featured") // Options: featured, points-low, points-high
  const [redeemModal, setRedeemModal] = useState<{ open: boolean; reward: any | null }>({
    open: false,
    reward: null,
  })
  const [redeemSuccess, setRedeemSuccess] = useState(false)

  // User's current points (mock data)
  const [userPoints, setUserPoints] = useState(1250)

  // Filter rewards based on category and search query
  const filteredRewards = REWARDS.filter((reward) => {
    const matchesCategory = selectedCategory === "All" || reward.category === selectedCategory
    const matchesSearch =
      reward.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reward.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Sort rewards
  const sortedRewards = [...filteredRewards].sort((a, b) => {
    if (sortBy === "featured") {
      // Featured items first, then by points
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return a.points - b.points
    } else if (sortBy === "points-low") {
      return a.points - b.points
    } else if (sortBy === "points-high") {
      return b.points - a.points
    }
    return 0
  })

  useEffect(() => {
    if (!redeemSuccess) return            // bail out if it’s not success time

    // simple one-shot burst from the centre
    confetti({
      particleCount: 200,
      startVelocity: 35,
      spread: 360,
      origin: { x: 0.5, y: 0.5 },         // dead-centre of the viewport
      zIndex: 10_000,                     // above your modal
    })
  }, [redeemSuccess])

  // Group rewards by category for the featured section
  const featuredRewards = REWARDS.filter((reward) => reward.featured).slice(0, 3)

  // Handle redeem button click
  const handleRedeem = (reward) => {
    setRedeemModal({ open: true, reward })
  }

  // Confirm redemption
  const confirmRedemption = () => {
    if (redeemModal.reward) {
      // In a real app, this would call an API to process the redemption
      // For now, we'll just update the local state
      setUserPoints(userPoints - redeemModal.reward.points)

      // Add to local storage for "My Rewards"
      const myRewards = JSON.parse(localStorage.getItem("myRewards") || "[]")
      const newReward = {
        ...redeemModal.reward,
        redeemedAt: new Date().toISOString(),
        redeemCode: Math.random().toString(36).substring(2, 10).toUpperCase(),
      }
      myRewards.push(newReward)
      localStorage.setItem("myRewards", JSON.stringify(myRewards))

      // Show success message
      setRedeemSuccess(true)

      // Close modal after 2 seconds
      setTimeout(() => {
        setRedeemSuccess(false)
        setRedeemModal({ open: false, reward: null })
      }, 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="mr-4">
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </Link>
            <div>
              <h1 className="text-lg font-bold text-gray-800">Rewards</h1>
              <div className="text-sm text-gray-500">Redeem your points for exclusive rewards</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/rewards/my-rewards"
              className="bg-emerald-500 text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center"
            >
              My Rewards
            </Link>
            <div className="flex items-center bg-yellow-100 rounded-full px-3 py-1.5">
              <Trophy className="w-4 h-4 text-yellow-600 mr-1.5" />
              <span className="text-sm font-medium text-yellow-800">{userPoints}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filter */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 bg-white rounded-full flex items-center px-4 py-2 border border-gray-200">
            <Search className="text-gray-400 w-5 h-5 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search rewards..."
              className="ml-2 bg-transparent border-none outline-none w-full text-gray-700 placeholder-gray-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-200"
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            <Filter className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Filters panel */}
        {filtersOpen && (
          <div className="bg-white rounded-lg p-4 mb-4 shadow-sm animate-in">
            <h3 className="font-medium mb-3">Filters</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Category</label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      className={`px-3 py-1.5 rounded-full text-sm ${
                        selectedCategory === category ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-700"
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Sort by</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    className={`px-3 py-1.5 rounded-full text-sm ${
                      sortBy === "featured" ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-700"
                    }`}
                    onClick={() => setSortBy("featured")}
                  >
                    Featured
                  </button>
                  <button
                    className={`px-3 py-1.5 rounded-full text-sm ${
                      sortBy === "points-low" ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-700"
                    }`}
                    onClick={() => setSortBy("points-low")}
                  >
                    Points: Low to High
                  </button>
                  <button
                    className={`px-3 py-1.5 rounded-full text-sm ${
                      sortBy === "points-high" ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-700"
                    }`}
                    onClick={() => setSortBy("points-high")}
                  >
                    Points: High to Low
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Featured Rewards */}
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Featured Rewards</h2>
          <Link href="#all-rewards" className="text-emerald-600 text-sm font-medium flex items-center">
            View all <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredRewards.map((reward) => (
            <div key={reward.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="relative h-40">
                <Image src={reward.image || "/placeholder.svg"} alt={reward.title} fill className="object-cover" />
                {reward.available <= 3 && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    Only {reward.available} left
                  </div>
                )}
                <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                  <Star className="w-3 h-3 mr-1 fill-white" />
                  Featured
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-1">{reward.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{reward.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center bg-yellow-100 rounded-full px-3 py-1.5">
                    <Trophy className="w-4 h-4 text-yellow-600 mr-1.5" />
                    <span className="text-sm font-medium text-yellow-800">{reward.points}</span>
                  </div>
                  <button
                    className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                      userPoints >= reward.points
                        ? "bg-emerald-500 text-white"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={userPoints < reward.points}
                    onClick={() => userPoints >= reward.points && handleRedeem(reward)}
                  >
                    {userPoints >= reward.points ? "Redeem" : "Not enough points"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Rewards */}
      <div id="all-rewards" className="max-w-7xl mx-auto px-4 pb-12">
        <h2 className="text-xl font-bold text-gray-800 mb-4">All Rewards</h2>

        {sortedRewards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedRewards.map((reward) => (
              <div key={reward.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
                <div className="relative h-40">
                  <Image src={reward.image || "/placeholder.svg"} alt={reward.title} fill className="object-cover" />
                  {reward.available <= 3 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      Only {reward.available} left
                    </div>
                  )}
                  <div className="absolute top-2 left-2 bg-gray-800 bg-opacity-70 text-white text-xs px-2 py-1 rounded-full">
                    {reward.category}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 mb-1">{reward.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{reward.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center bg-yellow-100 rounded-full px-3 py-1.5">
                      <Trophy className="w-4 h-4 text-yellow-600 mr-1.5" />
                      <span className="text-sm font-medium text-yellow-800">{reward.points}</span>
                    </div>
                    <button
                      className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                        userPoints >= reward.points
                          ? "bg-emerald-500 text-white"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                      disabled={userPoints < reward.points}
                      onClick={() => userPoints >= reward.points && handleRedeem(reward)}
                    >
                      {userPoints >= reward.points ? "Redeem" : "Locked"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg p-8 text-center">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">No rewards found</h3>
            <p className="text-gray-600">Try adjusting your filters or search query to find rewards.</p>
          </div>
        )}
      </div>

      {/* Points Explainer */}
      <div className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">How to Earn Points</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-emerald-50 p-4 rounded-lg">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mb-3">
                <Trophy className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="font-medium text-gray-800 mb-1">Predict Match Results</h3>
              <p className="text-sm text-gray-600">
                Earn 15 points for each correct match prediction in the "Who will win?" section.
              </p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-lg">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="font-medium text-gray-800 mb-1">Attend Events</h3>
              <p className="text-sm text-gray-600">Check in at events to earn 50 points for each event you attend.</p>
            </div>
            <div className="bg-emerald-50 p-4 rounded-lg">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="font-medium text-gray-800 mb-1">Invite Friends</h3>
              <p className="text-sm text-gray-600">
                Get 100 points for each friend who joins using your referral code.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Redemption Modal */}
      {redeemModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full overflow-hidden">
            {!redeemSuccess ? (
              <>
                <div className="relative">
                  <div className="h-40">
                    <Image
                      src={redeemModal.reward?.image || "/placeholder.svg"}
                      alt={redeemModal.reward?.title || "Reward"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <button
                    onClick={() => setRedeemModal({ open: false, reward: null })}
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                  >
                    <X className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{redeemModal.reward?.title}</h3>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center bg-yellow-100 rounded-full px-3 py-1.5">
                      <Trophy className="w-4 h-4 text-yellow-600 mr-1.5" />
                      <span className="text-sm font-medium text-yellow-800">{redeemModal.reward?.points}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6">{redeemModal.reward?.description}</p>

                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h4 className="font-medium text-gray-800 mb-2">Redemption Details</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      You are about to redeem this reward for{" "}
                      <span className="font-bold">{redeemModal.reward?.points}</span> points.
                    </p>
                    <p className="text-sm text-gray-600">
                      Your balance after redemption will be{" "}
                      <span className="font-bold">{userPoints - (redeemModal.reward?.points || 0)}</span> points.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setRedeemModal({ open: false, reward: null })}
                      className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmRedemption}
                      className="flex-1 py-2 bg-emerald-500 text-white rounded-lg font-medium"
                    >
                      Confirm Redemption
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Redemption Successful!</h3>
                <p className="text-gray-600 mb-6">
                  You have successfully redeemed {redeemModal.reward?.title}. You can view your reward in the "My
                  Rewards" section.
                </p>
                <button
                  onClick={() => router.push("/rewards/my-rewards")}
                  className="py-2 px-4 bg-emerald-500 text-white rounded-lg font-medium"
                >
                  View My Rewards
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
