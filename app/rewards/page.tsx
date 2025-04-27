"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Trophy, Star, ChevronRight, Filter, Search, AlertCircle, X, Check } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import confetti from "canvas-confetti"

const REWARDS = [
  {
    id: 1,
    title: "Trening s Ivicom Kostelićem",
    description: "Pridružite se umirovljenom hrvatskom skijaškom prvaku na fitness treningu i Q&A.",
    points: 3000,
    image: "/ski-athlete-fans.png",
    category: "Iskustva",
    featured: true,
    available: 2,
    expiresAt: "2023-12-31",
  },
  {
    id: 2,
    title: "VIP loža: Dinamo vs Hajduk",
    description: "Premium loža za najveći derbi hrvatskog nogometa. Uključuje hranu i piće.",
    points: 2500,
    image: "/stadium-vip-view.png",
    category: "Karte",
    featured: true,
    available: 4,
    expiresAt: "2023-10-15",
  },
  {
    id: 3,
    title: "Potpisana Dinamo Zagreb majica",
    description: "Službena majica potpisana od cijele momčadi Dinamo Zagreba iz aktualne sezone.",
    points: 1500,
    image: "/autographed-soccer-jersey-display.png",
    category: "Roba",
    featured: false,
    available: 10,
    expiresAt: "2023-11-30",
  },
  {
    id: 4,
    title: "Sjedala uz teren: Cibona košarka",
    description: "Iskusite uzbuđenje košarke iz prvih redova na sljedećoj domaćoj utakmici Cibone.",
    points: 1200,
    image: "/vibrant-courtside-view.png",
    category: "Karte",
    featured: false,
    available: 6,
    expiresAt: "2023-10-20",
  },
  {
    id: 5,
    title: "Susret s Ivicom Kostelićem",
    description: "Susretnite legendarnog hrvatskog skijaša za fotografije i potpise na posebnom događaju.",
    points: 2000,
    image: "/ski-athlete-fans.png",
    category: "Iskustva",
    featured: true,
    available: 2,
    expiresAt: "2023-12-15",
  },
  {
    id: 6,
    title: "Limitirana edicija košarkaške lopte Cibone",
    description: "Predmet za kolekcionare: specijalna izdanja košarkaške lopte povodom šampionske sezone Cibone.",
    points: 1000,
    image: "/basketball-collection.png",
    category: "Roba",
    featured: false,
    available: 5,
    expiresAt: "2023-11-15",
  },
  {
    id: 7,
    title: "Privatna tura stadionom Maksimir",
    description: "Tura iza scene najpoznatijeg hrvatskog nogometnog stadiona s bivšim igračem.",
    points: 800,
    image: "/maksimir.jpg?key=ddcvx",
    category: "Iskustva",
    featured: false,
    available: 15,
    expiresAt: "2023-12-31",
  },
  {
    id: 8,
    title: "Sezonske ulaznice: RK Zagreb rukomet",
    description: "Sezonske ulaznice za gledanje najbolje hrvatske rukometne momčadi u akciji.",
    points: 2000,
    image: "/vibrant-handball-action.png",
    category: "Karte",
    featured: false,
    available: 8,
    expiresAt: "2023-09-30",
  },
]

const CATEGORIES = ["Sve", "Iskustva", "Karte", "Roba"]

export default function RewardsPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState("Sve")
  const [searchQuery, setSearchQuery] = useState("")
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [sortBy, setSortBy] = useState("featured")
  const [redeemModal, setRedeemModal] = useState({ open: false, reward: null })
  const [redeemSuccess, setRedeemSuccess] = useState(false)
  const [userPoints, setUserPoints] = useState(1250)

  const filteredRewards = REWARDS.filter((reward) => {
    const matchesCategory = selectedCategory === "Sve" || reward.category === selectedCategory
    const matchesSearch =
      reward.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reward.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const sortedRewards = [...filteredRewards].sort((a, b) => {
    if (sortBy === "featured") {
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
    if (!redeemSuccess) return
    confetti({
      particleCount: 200,
      startVelocity: 35,
      spread: 360,
      origin: { x: 0.5, y: 0.5 },
      zIndex: 10000,
    })
  }, [redeemSuccess])

  const featuredRewards = REWARDS.filter((reward) => reward.featured).slice(0, 3)

  const handleRedeem = (reward) => {
    setRedeemModal({ open: true, reward })
  }

  const confirmRedemption = () => {
    if (redeemModal.reward) {
      setUserPoints(userPoints - redeemModal.reward.points)
      const myRewards = JSON.parse(localStorage.getItem("myRewards") || "[]")
      const newReward = {
        ...redeemModal.reward,
        redeemedAt: new Date().toISOString(),
        redeemCode: Math.random().toString(36).substring(2, 10).toUpperCase(),
      }
      myRewards.push(newReward)
      localStorage.setItem("myRewards", JSON.stringify(myRewards))
      setRedeemSuccess(true)
      setTimeout(() => {
        setRedeemSuccess(false)
        setRedeemModal({ open: false, reward: null })
      }, 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="mr-4">
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </Link>
            <div>
              <h1 className="text-lg font-bold text-gray-800">Nagrade</h1>
              <div className="text-sm text-gray-500">Iskoristite svoje bodove za ekskluzivne nagrade</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/rewards/my-rewards"
              className="bg-blue-500 text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center"
            >
              Moje Nagrade
            </Link>
            <div className="flex items-center bg-yellow-100 rounded-full px-3 py-1.5">
              <Trophy className="w-4 h-4 text-yellow-600 mr-1.5" />
              <span className="text-sm font-medium text-yellow-800">{userPoints}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 bg-white rounded-full flex items-center px-4 py-2 border border-gray-200">
            <Search className="text-gray-400 w-5 h-5 flex-shrink-0" />
            <input
              type="text"
              placeholder="Pretraži nagrade..."
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

        {filtersOpen && (
          <div className="bg-white rounded-lg p-4 mb-4 shadow-sm animate-in">
            <h3 className="font-medium mb-3">Filtri</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Kategorija</label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      className={`px-3 py-1.5 rounded-full text-sm ${
                        selectedCategory === category ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Sortiraj po</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    className={`px-3 py-1.5 rounded-full text-sm ${
                      sortBy === "featured" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"
                    }`}
                    onClick={() => setSortBy("featured")}
                  >
                    Istaknuto
                  </button>
                  <button
                    className={`px-3 py-1.5 rounded-full text-sm ${
                      sortBy === "points-low" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"
                    }`}
                    onClick={() => setSortBy("points-low")}
                  >
                    Bodovi: od najmanjih do najvećih
                  </button>
                  <button
                    className={`px-3 py-1.5 rounded-full text-sm ${
                      sortBy === "points-high" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"
                    }`}
                    onClick={() => setSortBy("points-high")}
                  >
                    Bodovi: od najvećih do najmanjih
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Istaknute nagrade</h2>
          <Link href="#all-rewards" className="text-blue-600 text-sm font-medium flex items-center">
            Vidi sve <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredRewards.map((reward) => (
            <div key={reward.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="relative h-40">
                <Image src={reward.image || "/placeholder.svg"} alt={reward.title} fill className="object-cover" />
                {reward.available <= 3 && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    Preostalo {reward.available}
                  </div>
                )}
                <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                  <Star className="w-3 h-3 mr-1 fill-white" />
                  Istaknuto
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
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={userPoints < reward.points}
                    onClick={() => userPoints >= reward.points && handleRedeem(reward)}
                  >
                    {userPoints >= reward.points ? "Iskoristi" : "Nedovoljno bodova"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div id="all-rewards" className="max-w-7xl mx-auto px-4 pb-12">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Sve nagrade</h2>
        {sortedRewards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedRewards.map((reward) => (
              <div key={reward.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
                <div className="relative h-40">
                  <Image src={reward.image || "/placeholder.svg"} alt={reward.title} fill className="object-cover" />
                  {reward.available <= 3 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      Preostalo {reward.available}
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
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                      disabled={userPoints < reward.points}
                      onClick={() => userPoints >= reward.points && handleRedeem(reward)}
                    >
                      {userPoints >= reward.points ? "Iskoristi" : "Zaključano"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg p-8 text-center">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">Nema pronađenih nagrada</h3>
            <p className="text-gray-600">Pokušajte prilagoditi svoje filtre ili upit za pretraživanje da biste pronašli nagrade.</p>
          </div>
        )}
      </div>

      <div className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Kako zaraditi bodove</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <Trophy className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-medium text-gray-800 mb-1">Predviđanje rezultata utakmica</h3>
              <p className="text-sm text-gray-600">
                Osvojite 15 bodova za svako točno predviđanje utakmice u odjeljku "Tko će pobijediti?"
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-3">  
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 000-2-2H5a2 2 000-2 2v12a2 2 0002 2z" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-800 mb-1">Posjete događajima</h3>
              <p className="text-sm text-gray-600">Prijavite se na događajima i osvojite 50 bodova za svaki događaj koji posjetite.</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0110 5.292M15 21H3v-1a6 6 00112 0v1zm0 0h6v-1a6 6 000-9-5.197M13 7a4 4 011-8 0 4 4 0018 0z" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-800 mb-1">Pozovite prijatelje</h3>
              <p className="text-sm text-gray-600">
                Osvojite 100 bodova za svakog prijatelja koji se pridruži koristeći vaš referalni kod.
              </p>
            </div>
          </div>
        </div>
      </div>

      {redeemModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full overflow-hidden">
            {!redeemSuccess ? (
              <>
                <div className="relative">
                  <div className="h-40">
                    <Image
                      src={redeemModal.reward?.image || "/placeholder.svg"}
                      alt={redeemModal.reward?.title || "Nagrada"}
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
                    <h4 className="font-medium text-gray-800 mb-2">Detalji iskorištavanja</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Iskorištavate ovu nagradu za <span className="font-bold">{redeemModal.reward?.points}</span> bodova.
                    </p>
                    <p className="text-sm text-gray-600">
                      Vaš saldo nakon iskorištavanja bit će <span className="font-bold">{userPoints - (redeemModal.reward?.points || 0)}</span> bodova.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setRedeemModal({ open: false, reward: null })}
                      className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium"
                    >
                      Odustani
                    </button>
                    <button
                      onClick={confirmRedemption}
                      className="flex-1 py-2 bg-blue-500 text-white rounded-lg font-medium"
                    >
                      Potvrdi iskorištavanje
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Iskorištavanje uspješno!</h3>
                <p className="text-gray-600 mb-6">
                  Uspješno ste iskoristili {redeemModal.reward?.title}. Svoju nagradu možete vidjeti u odjeljku "Moje nagrade"
                </p>
                <button
                  onClick={() => router.push("/rewards/my-rewards")}
                  className="py-2 px-4 bg-blue-500 text-white rounded-lg font-medium"
                >
                  Pogledaj svoje nagrade
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
