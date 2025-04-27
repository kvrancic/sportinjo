import React from "react";
import {
  Trophy,
  Clock,
  XOctagon,
  CalendarClock,
  Flag,
  Info,
  Star,
} from "lucide-react";

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-3xl px-4">
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
    </div>
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
