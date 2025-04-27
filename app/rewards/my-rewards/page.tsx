"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Trophy, Calendar, QrCode, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function MyRewardsPage() {
  const [myRewards, setMyRewards] = useState([])
  const [selectedReward, setSelectedReward] = useState(null)
  const [qrModalOpen, setQrModalOpen] = useState(false)

  useEffect(() => {
    const storedRewards = JSON.parse(localStorage.getItem("myRewards") || "[]")
    setMyRewards(storedRewards)
  }, [])

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const handleViewQR = (reward) => {
    setSelectedReward(reward)
    setQrModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/rewards" className="mr-4">
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </Link>
            <div>
              <h1 className="text-lg font-bold text-gray-800">Moje nagrade</h1>
              <div className="text-sm text-gray-500">Pregledajte i upravljajte svojim nagradama</div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {myRewards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myRewards.map((reward) => (
              <div key={reward.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
                <div className="relative h-40">
                  <Image src={reward.image || "/placeholder.svg"} alt={reward.title} fill className="object-cover" />
                  <div className="absolute top-2 left-2 bg-gray-800 bg-opacity-70 text-white text-xs px-2 py-1 rounded-full">
                    {reward.category}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 mb-1">{reward.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{reward.description}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Iskorišteno {formatDate(reward.redeemedAt)}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <div className="w-4 h-4 mr-1 flex items-center justify-center">
                      <span className="text-xs font-bold">#</span>
                    </div>
                    <span>Kod: {reward.redeemCode}</span>
                  </div>
                  <button
                    onClick={() => handleViewQR(reward)}
                    className="w-full py-2 bg-blue-500 text-white rounded-lg font-medium flex items-center justify-center"
                  >
                    <QrCode className="w-4 h-4 mr-2" />
                    Pogledaj QR kod
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Još nema nagrada</h3>
            <p className="text-gray-600 mb-6">
              Još niste iskoristili nijednu nagradu. Vratite se na stranicu nagrada kako biste zamijenili bodove za uzbudljive nagrade!
            </p>
            <Link href="/rewards" className="py-2 px-4 bg-blue-500 text-white rounded-lg font-medium">
              Pregledaj nagrade
            </Link>
          </div>
        )}
      </div>

      {qrModalOpen && selectedReward && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-gray-800">QR kod nagrade</h3>
              <button onClick={() => setQrModalOpen(false)} className="rounded-full p-1 hover:bg-gray-100">
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>
            <div className="p-6 text-center">
              <div className="mb-4">
                <h4 className="font-medium text-lg text-gray-800 mb-1">{selectedReward.title}</h4>
                <p className="text-sm text-gray-500">Kod: {selectedReward.redeemCode}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm inline-block mb-4">
                <Image
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${selectedReward.redeemCode}`}
                  alt="QR kod"
                  width={200}
                  height={200}
                  className="mx-auto"
                />
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Pokažite ovaj QR kod osoblju na mjestu održavanja kako biste preuzeli svoju nagradu.
              </p>
              <div className="bg-yellow-50 p-3 rounded-lg text-left">
                <p className="text-sm text-yellow-800">
                  <span className="font-medium">Važno:</span> Ovaj QR kod jedinstven je za vašu nagradu. Nemojte ga dijeliti s drugima.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
