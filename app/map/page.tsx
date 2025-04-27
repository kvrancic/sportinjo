"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  Home,
  MapIcon,
  MessageSquare,
  Calendar,
  X,
  Heart,
  Info,
  Bell,
  Map,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/*   MOCK PODACI – NASLOVI I LOKACIJE NA HRVATSKOM                    */
/* ------------------------------------------------------------------ */
const EVENTS = [
  {
    id: 1,
    title: "Dinamo vs Hajduk",
    sport: "Football",
    time: "Danas, 18:00",
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
    time: "Sub, 22. 4.",
    location: "Košarkaški centar Dražen Petrović",
    image: "/placeholder.svg?height=120&width=200",
    favourite: true,
    popular: true,
    coordinates: [45.8033, 15.9704],
  },
  {
    id: 3,
    title: "Mladost vs HAVK Mladost",
    sport: "Water Polo",
    time: "Ned, 23. 4.",
    location: "Jarun",
    image: "/placeholder.svg?height=120&width=200",
    favourite: false,
    popular: true,
    coordinates: [45.7928145, 15.9759383],
  },
  {
    id: 4,
    title: "Zagrebački Open",
    sport: "Tennis",
    time: "Pon, 24. 4.",
    location: "Teniski centar Jarun",
    image: "/placeholder.svg?height=120&width=200",
    favourite: true,
    popular: true,
    coordinates: [45.7793, 15.925],
  },
  {
    id: 5,
    title: "Medveščak vs KHL Sisak",
    sport: "Ice Hockey",
    time: "Uto, 25. 4.",
    location: "Dom sportova",
    image: "/placeholder.svg?height=120&width=200",
    favourite: false,
    popular: false,
    coordinates: [45.8072, 15.9533],
  },
  {
    id: 6,
    title: "Zagrebački maraton",
    sport: "Running",
    time: "Sri, 26. 4.",
    location: "Bundek",
    image: "/placeholder.svg?height=120&width=200",
    favourite: false,
    popular: true,
    coordinates: [45.785, 15.995],
  },
  {
    id: 7,
    title: "Mačevalački turnir",
    sport: "Fencing",
    time: "Čet, 27. 4.",
    location: "Dom sportova",
    image: "/placeholder.svg?height=120&width=200",
    favourite: false,
    popular: false,
    coordinates: [45.8075, 15.953],
  },
  {
    id: 8,
    title: "Kup Ultimate Frisbee",
    sport: "Ultimate Frisbee",
    time: "Pet, 28. 4.",
    location: "Bundek",
    image: "/placeholder.svg?height=120&width=200",
    favourite: false,
    popular: false,
    coordinates: [45.786, 15.994],
  },
  {
    id: 9,
    title: "Prvenstvo u petanki",
    sport: "Pétanque",
    time: "Sub, 29. 4.",
    location: "Jarun",
    image: "/placeholder.svg?height=120&width=200",
    favourite: false,
    popular: false,
    coordinates: [45.7813, 15.923],
  },
  {
    id: 10,
    title: "Masters u odbojci na pijesku",
    sport: "Volleyball",
    time: "Ned, 30. 4.",
    location: "Plaža Jarun",
    image: "/placeholder.svg?height=120&width=200",
    favourite: true,
    popular: true,
    coordinates: [45.7805, 15.9217],
  },
  {
    id: 11,
    title: "Nacionalni plivački kup",
    sport: "Swimming",
    time: "Pon, 1. 5.",
    location: "Bazen Mladost",
    image: "/placeholder.svg?height=120&width=200",
    favourite: true,
    popular: true,
    coordinates: [45.8038, 15.9645],
  },
  {
    id: 12,
    title: "Zagrebačka biciklistička utrka",
    sport: "Cycling",
    time: "Uto, 2. 5.",
    location: "Centar grada",
    image: "/placeholder.svg?height=120&width=200",
    favourite: false,
    popular: true,
    coordinates: [45.815, 15.9819],
  },
  {
    id: 13,
    title: "Rukometni derbi: PPD Zagreb vs Nexe",
    sport: "Handball",
    time: "Sri, 3. 5.",
    location: "Arena Zagreb",
    image: "/placeholder.svg?height=120&width=200",
    favourite: true,
    popular: true,
    coordinates: [45.7815, 15.967],
  },
  {
    id: 14,
    title: "Prvenstvo Hrvatske u boksu",
    sport: "Boxing",
    time: "Čet, 4. 5.",
    location: "Dom sportova",
    image: "/placeholder.svg?height=120&width=200",
    favourite: false,
    popular: false,
    coordinates: [45.8075, 15.953],
  },
  {
    id: 15,
    title: "Otvoreno prvenstvo u stolnom tenisu",
    sport: "Table Tennis",
    time: "Pet, 5. 5.",
    location: "Dom sportova",
    image: "/placeholder.svg?height=120&width=200",
    favourite: false,
    popular: false,
    coordinates: [45.7782226, 15.962731],
  },
  {
    id: 16,
    title: "Prvenstvo u badmintonu",
    sport: "Badminton",
    time: "Sub, 6. 5.",
    location: "Dom sportova",
    image: "/placeholder.svg?height=120&width=200",
    favourite: false,
    popular: true,
    coordinates: [45.7782226, 15.962731],
  },
  {
    id: 17,
    title: "Hrvatski Golf Open",
    sport: "Golf",
    time: "Ned, 7. 5.",
    location: "Golf klub Zagreb",
    image: "/placeholder.svg?height=120&width=200",
    favourite: true,
    popular: false,
    coordinates: [45.8475, 16.0201],
  },
  {
    id: 18,
    title: "Ski kup Sljeme",
    sport: "Skiing",
    time: "Pon, 8. 5.",
    location: "Sljeme",
    image: "/placeholder.svg?height=120&width=200",
    favourite: true,
    popular: true,
    coordinates: [45.8992, 15.9639],
  },
  {
    id: 19,
    title: "Veslačka regata",
    sport: "Rowing",
    time: "Uto, 9. 5.",
    location: "Jezero Jarun",
    image: "/placeholder.svg?height=120&width=200",
    favourite: true,
    popular: false,
    coordinates: [45.7833, 15.9208],
  },
  {
    id: 20,
    title: "Gimnastička gala",
    sport: "Gymnastics",
    time: "Sri, 10. 5.",
    location: "Arena Zagreb",
    image: "/placeholder.svg?height=120&width=200",
    favourite: false,
    popular: false,
    coordinates: [45.7815, 15.967],
  },
  {
    id: 21,
    title: "Festival joge na otvorenom",
    sport: "Yoga",
    time: "Čet, 11. 5.",
    location: "Park Bundek",
    image: "/placeholder.svg?height=120&width=200",
    favourite: false,
    popular: true,
    coordinates: [45.785, 15.995],
  },
  {
    id: 22,
    title: "Natjecanje u penjanju",
    sport: "Climbing",
    time: "Pet, 12. 5.",
    location: "Penjački centar Fothia",
    image: "/placeholder.svg?height=120&width=200",
    favourite: true,
    popular: false,
    coordinates: [45.8003, 15.9714],
  },
  {
    id: 23,
    title: "Gradski turnir u kuglanju",
    sport: "Bowling",
    time: "Sub, 13. 5.",
    location: "Bowling centar Zagreb",
    image: "/placeholder.svg?height=120&width=200",
    favourite: false,
    popular: true,
    coordinates: [45.7982, 15.978],
  },
  {
    id: 24,
    title: "Surf izazov",
    sport: "Surfing",
    time: "Ned, 14. 5.",
    location: "Surf centar Zagreb",
    image: "/placeholder.svg?height=120&width=200",
    favourite: false,
    popular: false,
    coordinates: [45.7835, 15.929],
  },
  {
    id: 25,
    title: "Prvenstvo u karateu",
    sport: "Karate",
    time: "Pon, 15. 5.",
    location: "Dom sportova",
    image: "/placeholder.svg?height=120&width=200",
    favourite: true,
    popular: false,
    coordinates: [45.782005, 15.9823866],
  },
  {
    id: 26,
    title: "Judo masters",
    sport: "Judo",
    time: "Uto, 16. 5.",
    location: "Dom sportova",
    image: "/placeholder.svg?height=120&width=200",
    favourite: false,
    popular: true,
    coordinates: [45.7782226, 15.962731],
  },
  {
    id: 27,
    title: "Streličarski kup",
    sport: "Archery",
    time: "Sri, 17. 5.",
    location: "Streličarski teren Zagreb",
    image: "/placeholder.svg?height=120&width=200",
    favourite: false,
    popular: true,
    coordinates: [45.796, 15.948],
  },
  {
    id: 28,
    title: "Jedriličarska regata",
    sport: "Sailing",
    time: "Čet, 18. 5.",
    location: "Jezero Jarun",
    image: "/placeholder.svg?height=120&width=200",
    favourite: true,
    popular: true,
    coordinates: [45.7833, 15.9208],
  },
  {
    id: 29,
    title: "Ragbi obračun",
    sport: "Rugby",
    time: "Pet, 19. 5.",
    location: "Ragbi klub Zagreb",
    image: "/placeholder.svg?height=120&width=200",
    favourite: true,
    popular: false,
    coordinates: [45.809, 15.975],
  },
  {
    id: 30,
    title: "Egzibicijska bejzbol utakmica",
    sport: "Baseball",
    time: "Sub, 20. 5.",
    location: "Bejzbol teren Jarun",
    image: "/placeholder.svg?height=120&width=200",
    favourite: false,
    popular: false,
    coordinates: [45.782, 15.926],
  },
  {
    id: 31,
    title: "Dinamo II vs Sesvete",
    sport: "Football",
    time: "Ned, 21. 5.",
    location: "Stadion Hitrec-Kacian",
    image: "/placeholder.svg?height=120&width=200",
    favourite: true,
    popular: false,
    coordinates: [45.8177, 16.0181],
  },
  {
    id: 32,
    title: "Zrinjevac vs Bosco",
    sport: "Basketball",
    time: "Pon, 22. 5.",
    location: "Boćarski dom",
    image: "/placeholder.svg?height=120&width=200",
    favourite: false,
    popular: true,
    coordinates: [45.7897, 15.9644],
  },
  {
    id: 33,
    title: "Vaterpolo turnir Mladost",
    sport: "Water Polo",
    time: "Uto, 23. 5.",
    location: "Bazen Mladost",
    image: "/placeholder.svg?height=120&width=200",
    favourite: true,
    popular: true,
    coordinates: [45.7879221, 15.9755716],
  },
  {
    id: 34,
    title: "ATP Challenger Zagreb",
    sport: "Tennis",
    time: "Sri, 24. 5.",
    location: "Teniski centar Maksimir",
    image: "/placeholder.svg?height=120&width=200",
    favourite: false,
    popular: true,
    coordinates: [45.8275, 16.0183],
  },
  {
    id: 35,
    title: "Medveščak juniori",
    sport: "Ice Hockey",
    time: "Čet, 25. 5.",
    location: "Ledena dvorana Velesajam",
    image: "/placeholder.svg?height=120&width=200",
    favourite: false,
    popular: false,
    coordinates: [45.7875, 15.9708],
  },
  {
    id: 36,
    title: "Humanitarna utrka Bundek",
    sport: "Running",
    time: "Pet, 26. 5.",
    location: "Park Bundek",
    image: "/placeholder.svg?height=120&width=200",
    favourite: true,
    popular: true,
    coordinates: [45.785, 15.995],
  },
  {
    id: 37,
    title: "Mačevalački masters kup",
    sport: "Fencing",
    time: "Sub, 27. 5.",
    location: "ŠRC Šalata",
    image: "/placeholder.svg?height=120&width=200",
    favourite: false,
    popular: true,
    coordinates: [45.8153, 15.9817],
  },
  {
    id: 38,
    title: "Ultimate Frisbee spektakl Zagreb",
    sport: "Ultimate Frisbee",
    time: "Ned, 28. 5.",
    location: "Park Maksimir",
    image: "/placeholder.svg?height=120&width=200",
    favourite: false,
    popular: false,
    coordinates: [45.8333, 16.0167],
  },
  {
    id: 39,
    title: "Ljetni kup u petanki",
    sport: "Pétanque",
    time: "Pon, 29. 5.",
    location: "Park Savica",
    image: "/placeholder.svg?height=120&width=200",
    favourite: false,
    popular: false,
    coordinates: [45.7917, 16.0089],
  },
  {
    id: 40,
    title: "Jarun odbojka na pijesku",
    sport: "Volleyball",
    time: "Uto, 30. 5.",
    location: "Plaža Jarun",
    image: "/placeholder.svg?height=120&width=200",
    favourite: true,
    popular: true,
    coordinates: [45.7805, 15.9217],
  },
  {
    id: 41,
    title: "Otvoreni plivački izazov",
    sport: "Swimming",
    time: "Sri, 31. 5.",
    location: "Jezero Jarun",
    image: "/placeholder.svg?height=120&width=200",
    favourite: true,
    popular: true,
    coordinates: [45.7833, 15.9208],
  },
  {
    id: 42,
    title: "Biciklistička vožnja centrom",
    sport: "Cycling",
    time: "Čet, 1. 6.",
    location: "Trg kralja Tomislava",
    image: "/placeholder.svg?height=120&width=200",
    favourite: false,
    popular: true,
    coordinates: [45.8069, 15.9785],
  },
  {
    id: 43,
    title: "Rukometne nade",
    sport: "Handball",
    time: "Pet, 2. 6.",
    location: "Kutija šibica",
    image: "/placeholder.svg?height=120&width=200",
    favourite: true,
    popular: true,
    coordinates: [45.789, 15.959],
  },
  {
    id: 44,
    title: "Boksačka noć u Domu sportova",
    sport: "Boxing",
    time: "Sub, 3. 6.",
    location: "Dom sportova",
    image: "/placeholder.svg?height=120&width=200",
    favourite: false,
    popular: false,
    coordinates: [45.7782226, 15.962731],
  },
  {
    id: 45,
    title: "Masters u stolnom tenisu",
    sport: "Table Tennis",
    time: "Ned, 4. 6.",
    location: "Sportski centar Svetice",
    image: "/placeholder.svg?height=120&width=200",
    favourite: true,
    popular: true,
    coordinates: [45.8155, 16.0169],
  },
  {
    id: 46,
    title: "Regionalni kup u badmintonu",
    sport: "Badminton",
    time: "Pon, 5. 6.",
    location: "Dom sportova",
    image: "/placeholder.svg?height=120&width=200",
    favourite: false,
    popular: true,
    coordinates: [45.8075, 15.953],
  },
  {
    id: 47,
    title: "Dan golf izazova",
    sport: "Golf",
    time: "Uto, 6. 6.",
    location: "Golf klub Riverside",
    image: "/placeholder.svg?height=120&width=200",
    favourite: true,
    popular: false,
    coordinates: [45.8447, 16.0653],
  },
  {
    id: 48,
    title: "Skijaški festival Sljeme",
    sport: "Skiing",
    time: "Sri, 7. 6.",
    location: "Sljeme",
    image: "/placeholder.svg?height=120&width=200",
    favourite: false,
    popular: true,
    coordinates: [45.8992, 15.9639],
  },
  {
    id: 49,
    title: "Sveučilišni veslački kup",
    sport: "Rowing",
    time: "Čet, 8. 6.",
    location: "Jezero Jarun",
    image: "/placeholder.svg?height=120&width=200",
    favourite: true,
    popular: false,
    coordinates: [45.7833, 15.9208],
  },
  {
    id: 50,
    title: "Zagrebački gimnastički open",
    sport: "Gymnastics",
    time: "Pet, 9. 6.",
    location: "Arena Zagreb",
    image: "/placeholder.svg?height=120&width=200",
    favourite: false,
    popular: false,
    coordinates: [45.7815, 15.967],
  },
];

/* ------------------------------------------------------------------ */
/*   IKONE SPORTOVA ZA LEGENDU                                        */
/* ------------------------------------------------------------------ */
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
};

/* ------------------------------------------------------------------ */
/*   POMOĆNE FUNKCIJE                                                 */
/* ------------------------------------------------------------------ */
const getUniqueSports = () => {
  const s = new Set(EVENTS.map((e) => e.sport));
  return Array.from(s);
};

/* ------------------------------------------------------------------ */
/*   DINAMIČNI IMPORT MAPE                                            */
/* ------------------------------------------------------------------ */
const MapComponent = dynamic(() => import("../components/map-component"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Učitavanje karte…</p>
      </div>
    </div>
  ),
});

/* ------------------------------------------------------------------ */
/*   KOMPONENTA STRANICE                                              */
/* ------------------------------------------------------------------ */
export default function MapPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [timespan, setTimespan] = useState(7);
  const [userLocation] = useState([45.7786272, 15.9719775]);
  const [showLegend, setShowLegend] = useState(false);
  const [uniqueSports] = useState(getUniqueSports());
  const [mapKey, setMapKey] = useState(Date.now());

  useEffect(() => setMapKey(Date.now()), []);

  const filteredEvents = EVENTS; // demo

  return (
    <div className="h-screen w-screen flex flex-col">
      {/* FILTER */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-gray-700">
            <X className="w-6 h-6" />
          </Link>

          {/* Gumbe za period */}
          <div className="flex space-x-2">
            {[
              { label: "Danas", val: 1 },
              { label: "3 dana", val: 3 },
              { label: "Tjedan", val: 7 },
              { label: "Mjesec", val: 30 },
            ].map((b) => (
              <button
                key={b.val}
                className={`px-4 py-2 rounded-full text-sm ${
                  timespan === b.val
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setTimespan(b.val)}
              >
                {b.label}
              </button>
            ))}
          </div>

          {/* Legenda */}
          <button
            className="w-6 h-6 flex items-center justify-center text-gray-700"
            onClick={() => setShowLegend(!showLegend)}
            aria-label="Prikaži legendu"
          >
            <Info className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* MAPA */}
      <div className="flex-1 z-0">
        <MapComponent
          key={mapKey}
          userLocation={userLocation}
          events={filteredEvents}
          onMarkerClick={setSelectedEvent}
        />
      </div>

      {/* LEGENDA */}
      {showLegend && (
        <div className="absolute bottom-20 left-4 z-10 bg-white p-3 rounded-lg shadow-md max-h-48 overflow-y-auto w-48">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm font-semibold">Vrste sportova</div>
            <button
              onClick={() => setShowLegend(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {uniqueSports.map((sport) => (
              <div key={sport} className="flex items-center">
                <div
                  className="w-6 h-6 mr-2 bg-contain bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${
                      SPORT_ICONS[sport] || SPORT_ICONS.default
                    })`,
                  }}
                ></div>
                <span className="text-xs">{sport}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DONJA NAVIGACIJA */}
      <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center py-4">
          <Link href="/" className="flex flex-col items-center">
            <Home className="w-6 h-6 text-gray-400" />
            <span className="text-sm text-gray-400">Početna</span>
          </Link>
          <Link href="/map" className="flex flex-col items-center">
            <Map className="w-6 h-6 text-blue-500" />
            <span className="text-sm text-blue-500">Karta</span>
          </Link>
          <Link
            href="/notifications"
            className="flex flex-col items-center relative"
          >
            <Bell className="w-6 h-6 text-gray-400" />
            <span className="text-sm text-gray-400">Obavijesti</span>
            <span className="absolute -top-1 -right-2 w-4 h-4 bg-red-500 text-[10px] rounded-full flex items-center justify-center text-white">
              4
            </span>
          </Link>
          <Link href="/chat" className="flex flex-col items-center">
            <MessageSquare className="w-6 h-6 text-gray-400" />
            <span className="text-sm text-gray-400">Chat AI</span>
          </Link>
        </div>
      </footer>

      {/* DETALJI DOGAĐAJA */}
      {selectedEvent && (
        <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-lg z-20">
          <div className="p-4">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">{selectedEvent.title}</h2>
              <button onClick={() => setSelectedEvent(null)} className="p-1">
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
                Detalji
              </Link>
              <button
                className="w-12 h-10 bg-gray-100 rounded-lg flex items-center justify-center"
                onClick={() => toggleFavorite(selectedEvent.id)}
              >
                <Heart
                  className={`w-5 h-5 ${
                    selectedEvent.favourite
                      ? "fill-red-500 text-red-500"
                      : "text-gray-700"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
