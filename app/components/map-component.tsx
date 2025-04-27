"use client"

import { useEffect, useRef, useState, useId } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet.markercluster/dist/leaflet.markercluster.js"
import "leaflet.markercluster/dist/MarkerCluster.css"
import "leaflet.markercluster/dist/MarkerCluster.Default.css"

/* -------------------------------------------------------------
 * 1. Sport-to-emoji mapping
 * -----------------------------------------------------------*/
const sportEmoji: Record<string, string> = {
  Football: "⚽",
  Basketball: "🏀",
  "Water Polo": "🤽",
  Tennis: "🎾",
  "Ice Hockey": "🏒",
  Running: "🏃",
  Fencing: "🤺",
  "Ultimate Frisbee": "🥏",
  Pétanque: "🎯",
  Volleyball: "🏐",
  Swimming: "🏊",
  Cycling: "🚴",
  Handball: "🤾",
  Boxing: "🥊",
  "Table Tennis": "🏓",
  Badminton: "🏸",
  Golf: "⛳",
  Skiing: "⛷️",
  Rowing: "🚣",
  Gymnastics: "🤸",
  Yoga: "🧘",
  Climbing: "🧗",
  Bowling: "🎳",
  Surfing: "🏄",
  Karate: "🥋",
  Judo: "🥋",
  Archery: "🏹",
  Sailing: "⛵",
  Rugby: "🏉",
  Baseball: "⚾",
}

const createEventMarker = (sport: string) => {
  const emoji = sportEmoji[sport] || "🏆" // Default to trophy if sport not found

  return L.divIcon({
    html: `<div class="emoji-marker">${emoji}</div>`,
    className: "emoji-marker-container",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
  })
}

const userIcon = L.divIcon({
  html: `<div class="user-location-marker flex flex-col items-center">
      <span class="emoji text-6xl leading-none">🧍‍♂️</span>
      <span class="label text-xs mt-1 font-bold">Vi ste ovdje</span>
    </div>`,
  className: "",                // we’ll style in CSS
  iconSize: [128, 128],           // tweak to fit your font-size
  iconAnchor: [16, 32],         // bottom-center of the emoji
  popupAnchor: [0, -32],        // place popup just above
})

/* -------------------------------------------------------------
 * 2.  Static user-location icon (PNG)
 * -----------------------------------------------------------*/

/* -------------------------------------------------------------
 * 3.  Keep map centred on user
 * -----------------------------------------------------------*/
function SetViewOnUser({ coords }: { coords: L.LatLngExpression }) {
  const map = useMap()
  useEffect(() => {
    map.setView(coords, 13)
  }, [coords, map])
  return null
}

/* -------------------------------------------------------------
 * 4.  Marker clustering
 * -----------------------------------------------------------*/
export interface EventItem {
  id: string | number
  coordinates: [number, number]
  title: string
  sport: string
  location: string
  time: string
}

function MarkerClusterComponent({
  events,
  onMarkerClick,
}: {
  events: EventItem[]
  onMarkerClick: (e: EventItem) => void
}) {
  const map = useMap()
  const clusterGroupRef = useRef<L.MarkerClusterGroup | null>(null)

  useEffect(() => {
    if (!map) return

    // initialise cluster-layer once
    if (!clusterGroupRef.current) {
      clusterGroupRef.current = L.markerClusterGroup({
        iconCreateFunction(cluster) {
          return L.divIcon({
            html: `<div class="cluster-icon text-white"> ${cluster.getChildCount()}</div>`,
            className: "custom-marker-cluster",
            iconSize: L.point(50, 50, true),
          })
        },
        maxClusterRadius(zoom) {
          if (zoom > 14)  return 5  // at close zoom, only markers within 5px cluster
          if (zoom > 12)  return 20 // mid zoom: 20px radius
          return 40                  // far out: 40px radius
        },
        disableClusteringAtZoom: 14,

        spiderfyOnMaxZoom: true,
      })
      map.addLayer(clusterGroupRef.current)
    }

    const group = clusterGroupRef.current
    group.clearLayers()

    events.forEach((ev) => {
      if (!ev.coordinates || ev.coordinates.length !== 2) return

      const marker = L.marker(ev.coordinates, {
        icon: createEventMarker(ev.sport),
        title: ev.title,
      }).bindPopup(
        `<div class="text-center">
           <h3 class="font-bold">${ev.title}</h3>
           <p>${ev.sport}</p>
           <p>${ev.location}</p>
           <p>${ev.time}</p>
         </div>`,
      )

      marker.on("click", () => onMarkerClick(ev))
      group.addLayer(marker)
    })

    return () => {
      group.clearLayers()
    }
  }, [map, events, onMarkerClick])

  return null
}

/* -------------------------------------------------------------
 * 5.  Inner Leaflet map
 * -----------------------------------------------------------*/
function MapLeaflet({
  userLocation,
  events,
  onMarkerClick,
}: {
  userLocation: [number, number]
  events: EventItem[]
  onMarkerClick: (e: EventItem) => void
}) {
  const mapId = useId() // unique DOM id per mount

  /* ---- clear any old Leaflet instance left by hot-reload ---- */
  useEffect(() => {
    const stale = L.DomUtil.get(mapId as string) as any
    if (stale && stale._leaflet_id) {
      stale._leaflet_id = null
    }
  }, [mapId])

  /* ---- fix default icon paths once ---- */
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    })
  }, [])

  return (
    <MapContainer
      id={mapId}
      center={userLocation}
      zoom={13}
      minZoom={10}
      maxZoom={18}
      zoomControl={false}
      style={{ height: "100%", width: "100%" }}
      className="z-0"
    >
      <TileLayer
        attribution="&copy; <a href='https://carto.com/attributions'>CARTO</a> &copy; OpenStreetMap"
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
      />

      <Marker position={userLocation} icon={userIcon}>
        <Popup>You are here</Popup>
      </Marker>

      <MarkerClusterComponent events={events} onMarkerClick={onMarkerClick} />
      <SetViewOnUser coords={userLocation} />
    </MapContainer>
  )
}

/* -------------------------------------------------------------
 * 6.  Wrapper – render only on the client
 * -----------------------------------------------------------*/
export default function MapComponent(props: {
  userLocation: [number, number]
  events: EventItem[]
  onMarkerClick: (e: EventItem) => void
}) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return <MapLeaflet {...props} />
}

/* -------------------------------------------------------------
 * 7.  Tailwind helpers (optional)
 * -----------------------------------------------------------*/
/*
.sport-marker svg {
  @apply text-emerald-600 drop-shadow;
}
.custom-marker-cluster {
  @apply flex items-center justify-center bg-emerald-600 text-white rounded-full font-bold;
}
*/

/* -------------------------------------------------------------
 * 7.  Tailwind helpers (optional)
 * -----------------------------------------------------------*/
/*
.sport-marker svg {
  @apply text-emerald-600 drop-shadow;
}
.custom-marker-cluster {
  @apply flex items-center justify-center bg-emerald-600 text-white rounded-full font-bold;
}

.event-marker-container {
  @apply relative;
}
.event-marker {
  @apply w-6 h-6 bg-emerald-500 rounded-full border-2 border-white shadow-md;
}
*/
