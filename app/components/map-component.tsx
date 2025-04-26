"use client"

import { useEffect, useRef } from "react"
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Circle,
} from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet.markercluster/dist/leaflet.markercluster.js"
import "leaflet.markercluster/dist/MarkerCluster.css"
import "leaflet.markercluster/dist/MarkerCluster.Default.css"

import ReactDOMServer from "react-dom/server"
import * as GiIcons from "react-icons/gi"

/* -------------------------------------------------------------
 * 1. Sport‑to‑icon mapping                                     
 * -----------------------------------------------------------*/
const sportIconName: Record<string, string> = {
  Football: "GiSoccerBall",
  Basketball: "GiBasketballBall",
  "Water Polo": "GiWaterPolo",
  Tennis: "GiTennisBall",
  "Ice Hockey": "GiHockey",
  Running: "GiRunningShoe",
  Fencing: "GiFencer",
  "Ultimate Frisbee": "GiFrisbee",
  Pétanque: "GiBocceBall", // if missing → fallback
}

const createSportIcon = (sport: string) => {
  const iconKey = sportIconName[sport] ?? "GiCircle"
  // @ts-ignore – react‑icons exports are dynamic
  const IconCmp = (GiIcons as any)[iconKey] ?? (GiIcons as any).GiCircle

  const svgMarkup = ReactDOMServer.renderToStaticMarkup(
    <IconCmp size={28} />
  )

  return L.divIcon({
    html: svgMarkup,
    className: "sport-marker",
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28],
  })
}

/* -------------------------------------------------------------
 * 2.  Static user‑location icon (PNG)                          
 * -----------------------------------------------------------*/
const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconSize: [38, 38],
})

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

    if (!clusterGroupRef.current) {
      clusterGroupRef.current = L.markerClusterGroup({
        iconCreateFunction(cluster) {
          return L.divIcon({
            html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
            className: "custom-marker-cluster",
            iconSize: L.point(40, 40, true),
          })
        },
        maxClusterRadius(zoom) {
          return zoom > 14 ? 10 : zoom > 12 ? 40 : 80
        },
        spiderfyOnMaxZoom: true,
        disableClusteringAtZoom: 16,
      })
      map.addLayer(clusterGroupRef.current)
    }

    const group = clusterGroupRef.current
    group.clearLayers()

    events.forEach((ev) => {
      if (!ev.coordinates || ev.coordinates.length !== 2) return

      const marker = L.marker(ev.coordinates, {
        icon: createSportIcon(ev.sport),
        title: ev.title,
      }).bindPopup(
        `<div class="text-center">
           <h3 class="font-bold">${ev.title}</h3>
           <p>${ev.sport}</p>
           <p>${ev.location}</p>
           <p>${ev.time}</p>
         </div>`
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
 * 5.  Top‑level map component – now with a **minimal** base‑map
 * -----------------------------------------------------------*/
export default function MapComponent({
  userLocation,
  events,
  onMarkerClick,
}: {
  userLocation: [number, number]
  events: EventItem[]
  onMarkerClick: (e: EventItem) => void
}) {
  useEffect(() => {
    // fix Leaflet default‑icon paths in Next.js
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    })
  }, [])

  /* ---------------------------------------------------------
   *  👉  Minimal tile‑set from CARTO                           
   *  Light background, *no* labels (adds calm aesthetic).     
   *  If you still want labels, stack a second TileLayer with  
   *  `light_only_labels`.                                     
   * -------------------------------------------------------*/
  const baseTileUrl =
    "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
  const labelTileUrl =
    "https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png"

  return (
    <MapContainer
      center={userLocation}
      zoom={13}
      minZoom={10}
      maxZoom={18}
      zoomControl={false}
      style={{ height: "100%", width: "100%" }}
      className="z-0"
    >
      {/* Minimalistic base map */}
      <TileLayer
        attribution="&copy; <a href='https://carto.com/attributions'>CARTO</a> &copy; OpenStreetMap"
        url={baseTileUrl}
      />
      {/* Optional, uncomment to add subtle labels */}
      {/* <TileLayer url={labelTileUrl} /> */}

      {/* Logged‑in user position */}
      <Marker position={userLocation} icon={userIcon}>
        <Popup>You are here</Popup>
      </Marker>

      {/* Accuracy radius */}
      <Circle
        center={userLocation}
        radius={500}
        pathOptions={{
          fillColor: "#0284c7",
          fillOpacity: 0.08,
          color: "#0284c7",
          weight: 1,
        }}
      />

      <MarkerClusterComponent events={events} onMarkerClick={onMarkerClick} />
      <SetViewOnUser coords={userLocation} />
    </MapContainer>
  )
}

/* -------------------------------------------------------------
 * 6.  Tailwind helper classes (optional)                       
 * -----------------------------------------------------------*/
/*
.sport-marker svg {
  @apply text-emerald-600 drop-shadow;
}
.custom-marker-cluster {
  @apply flex items-center justify-center bg-emerald-600 text-white rounded-full font-bold;
}
*/
