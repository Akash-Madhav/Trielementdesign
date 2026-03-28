import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Casting to any to bypass strict type check for Leaflet props in this environment
const MapContainerAny = MapContainer as any;
const TileLayerAny = TileLayer as any;
const MarkerAny = Marker as any;
const PopupAny = Popup as any;

// Custom technical HUD icon
const createHUDIcon = (isActive: boolean) => L.divIcon({
  className: 'custom-hud-marker',
  html: `
    <div class="relative flex items-center justify-center">
      <div class="absolute w-2 h-2 bg-[#2B2B2B] rounded-full z-10"></div>
      <div class="absolute w-6 h-6 border border-[#2B2B2B]/20 rounded-full animate-ping opacity-20"></div>
      <div class="${isActive ? 'w-10 h-10 border-2 border-[#D4AF37]' : 'w-8 h-8 border border-[#2B2B2B]/30'} rounded-full transition-all duration-700"></div>
      ${isActive ? '<div class="absolute -top-6 whitespace-nowrap text-[8px] font-mono tracking-widest uppercase bg-[#2B2B2B] text-white px-2 py-0.5 rounded-full">[ ACTIVE_TARGET ]</div>' : ''}
    </div>
  `,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

// Helper component to handle flying the map
function MapController({ activeLocation }: { activeLocation: { lat: number, lng: number } | null }) {
  const map = useMap();
  
  useEffect(() => {
    if (activeLocation) {
      map.flyTo([activeLocation.lat, activeLocation.lng], 7, {
        duration: 2.5,
        easeLinearity: 0.25
      });
    }
  }, [activeLocation, map]);
  
  return null;
}

interface Location {
  id: number;
  name: string;
  city: string;
  lat: number;
  lng: number;
  type: string;
}

interface ProjectMapProps {
  locations: Location[];
  activeId: number | null;
  setActiveId: (id: number) => void;
}

export default function ProjectMap({ locations, activeId, setActiveId }: ProjectMapProps) {
  const activeLocation = locations.find(l => l.id === activeId) || null;

  return (
    <div className="w-full h-full grayscale-[0.8] contrast-[1.1] brightness-[0.95]">
      {/* @ts-ignore */}
      <MapContainerAny 
        center={[25.1972, 55.2796] as any} 
        zoom={3} 
        scrollWheelZoom={false}
        className="w-full h-full"
        style={{ background: '#FAF9F6' }}
      >
        {/* @ts-ignore */}
        <TileLayerAny
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        
        <MapController activeLocation={activeLocation} />

        {locations.map((loc) => (
          /* @ts-ignore */
          <MarkerAny 
            key={loc.id} 
            position={[loc.lat, loc.lng] as any} 
            icon={createHUDIcon(activeId === loc.id)}
            eventHandlers={{
              click: () => setActiveId(loc.id),
            }}
          >
            {/* @ts-ignore */}
            <PopupAny className="custom-hud-popup">
              <div className="p-2 font-mono">
                <div className="text-[7px] text-[#2B2B2B]/40 mb-1">[ SITE_IDENTIFICATION ]</div>
                <h3 className="text-[11px] font-bold uppercase tracking-wider mb-1">{loc.name}</h3>
                <p className="text-[9px] text-[#2B2B2B]/60 mb-2 italic">{loc.city}</p>
                <div className="h-px w-full bg-[#2B2B2B]/10 mb-2" />
                <div className="text-[8px] tracking-widest uppercase font-medium">{loc.type}</div>
              </div>
            </PopupAny>
          </MarkerAny>
        ))}
      </MapContainerAny>
      
      {/* Global Map HUD */}
      <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-[1000] pointer-events-none">
        <div className="bg-white/95 backdrop-blur-md p-3 md:p-4 rounded-xl border border-[#2B2B2B]/10 shadow-2xl">
          <div className="text-[6px] md:text-[7px] tracking-[0.5em] text-[#2B2B2B]/30 mb-2 uppercase font-medium">Global Data Hub</div>
          <div className="flex items-center gap-3 md:gap-4">
             <div className="flex flex-col">
                <span className="text-[8px] md:text-[10px] font-mono opacity-40">[ LATITUDE ]</span>
                <span className="text-[10px] md:text-[12px] font-bold tracking-tighter">
                   {activeLocation ? activeLocation.lat.toFixed(4) : '--.----'}
                </span>
             </div>
             <div className="w-px h-6 bg-[#2B2B2B]/10" />
             <div className="flex flex-col">
                <span className="text-[8px] md:text-[10px] font-mono opacity-40">[ LONGITUDE ]</span>
                <span className="text-[10px] md:text-[12px] font-bold tracking-tighter">
                   {activeLocation ? activeLocation.lng.toFixed(4) : '--.----'}
                </span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
