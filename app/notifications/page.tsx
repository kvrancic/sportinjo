import React from "react";
import Link from "next/link";
import {
  Trophy,
  Clock,
  XOctagon,
  CalendarClock,
  Flag,
  Info,
  Star,
  Home,
  Map,
  Bell,
  MessageSquare,
} from "lucide-react";

export default function NotificationsPage() {
  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      {/* Glavni sadržaj */}
      <div className="flex-grow mx-auto max-w-3xl px-4 pt-8 pb-24">
        <h1 className="text-3xl font-bold mb-6">Obavijesti</h1>

        {/* Lista obavijesti */}
        <div className="space-y-4">
          {/* 1 */}
          <NotificationCard
            iconBg="bg-yellow-100"
            Icon={Trophy}
            title="Pogodak prognoze!"
            text="NK Brezovica je pobijedila NK Kašina! Osvojili ste +15 bodova za točnu prognozu."
            time="prije 5 minuta"
          />

          {/* 2 */}
          <NotificationCard
            iconBg="bg-blue-100"
            Icon={Flag}
            title="Novi termin zakazan"
            text="Prijateljska utakmica NK Hrvatski Leskovac bit će odigrana u subotu u 17:00 h."
            time="prije 20 minuta"
          />

          {/* 3 */}
          <NotificationCard
            iconBg="bg-red-100"
            Icon={XOctagon}
            title="Utakmica odgođena"
            text="Susret HK Zrinjevac – HK Zelina odgođen je zbog loših uvjeta leda."
            time="prije 30 minuta"
          />

          {/* 4 */}
          <NotificationCard
            iconBg="bg-green-100"
            Icon={CalendarClock}
            title="Trening potvrđen"
            text="Trening momčadi HK Mladost 2 zakazan je za sutra u 19:30 h."
            time="prije 1 sat"
          />

          {/* 5 */}
          <NotificationCard
            iconBg="bg-yellow-100"
            Icon={Clock}
            title="Promjena termina"
            text="Derbi RK Sinj – RK Nada pomaknut je na 20:00 h večeras."
            time="prije 2 sata"
          />

          {/* 6 */}
          <NotificationCard
            iconBg="bg-yellow-100"
            Icon={Trophy}
            title="Pobjeda u meču"
            text="ŠK Sesvete-Agroproteinka svladao je ŠK Novi Zagreb rezultatom 4½ – 1½."
            time="prije 3 sata"
          />
        </div>
      </div>

      {/* Donja navigacija */}
      <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center py-4">
          <Link href="/" className="flex flex-col items-center">
            <Home className="w-6 h-6 text-gray-400" />
            <span className="text-sm text-gray-400">Početna</span>
          </Link>
          <Link href="/map" className="flex flex-col items-center">
            <Map className="w-6 h-6 text-gray-400" />
            <span className="text-sm text-gray-400">Karta</span>
          </Link>
          <Link
            href="/notifications"
            className="flex flex-col items-center relative"
          >
            <Bell className="w-6 h-6 text-blue-500" />
            <span className="text-sm text-blue-500">Notifikacije</span>
            {/* Badge */}
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
    </main>
  );
}

// Pomoćna komponenta za pojedinu obavijest
function NotificationCard({
  iconBg,
  Icon,
  title,
  text,
  time,
}: {
  iconBg: string;
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  text: string;
  time: string;
}) {
  return (
    <div className="flex items-start rounded-lg bg-white shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow">
      <div className={`flex-shrink-0 rounded-full p-2 ${iconBg}`}>
        <Icon className="h-5 w-5 text-current" />
      </div>
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-xs text-gray-500 mt-1">{text}</p>
        <p className="text-xs text-gray-400 mt-1">{time}</p>
      </div>
    </div>
  );
}
