import { useState, useEffect } from "react";
import { MapPin, Navigation, Compass, Star, ExternalLink, Map, ZoomIn, ZoomOut, RefreshCw } from "lucide-react";
import { Branch } from "../types";

interface InteractiveMapProps {
  activeBranch: Branch;
}

export default function InteractiveMap({ activeBranch }: InteractiveMapProps) {
  const [mapStyle, setMapStyle] = useState<"dark" | "satellite" | "minimal">("dark");
  const [zoom, setZoom] = useState(14);
  const [isRotating, setIsRotating] = useState(false);

  // Trigger brief rotation effect on change
  useEffect(() => {
    setIsRotating(true);
    const timer = setTimeout(() => setIsRotating(false), 800);
    return () => clearTimeout(timer);
  }, [activeBranch]);

  const handleRecenter = () => {
    setZoom(14);
  };

  return (
    <section id="map-section" className="py-16 bg-zinc-950 relative overflow-hidden z-10">
      {/* Absolute glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none hidden sm:block" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-12">
          <span className="text-[10px] uppercase tracking-widest text-primary font-semibold flex items-center gap-1.5 mb-1">
            <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "10s" }} /> Interactive Locations Map
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-white">Our Global Presence</h2>
          <p className="text-sm text-on-surface-variant max-w-xl mt-1">
            Seamless global integration. Fly into our main hub in Istanbul, or consult from our luxury centers in Europe and North America.
          </p>
        </div>

        {/* Map Stage Container */}
        <div className="relative w-full h-[550px] rounded-3xl overflow-hidden shadow-2xl border border-white/5 bg-zinc-900">
          {/* Map Image / Background Render */}
          <div className="absolute inset-0 transition-all duration-700 ease-in-out">
            {mapStyle === "satellite" ? (
              <div 
                className="w-full h-full bg-cover bg-center filter grayscale contrast-[1.1] brightness-[0.4]"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAXvZIIZraUsXekwny6g3klavCzn4o9gO4nBfZqyVp5BRyOq7nXnlJuJuJxq-Bo8Csxo2wW5eFrGhspTEqXtNGNeXLG7i1H2yEMh6MC4ccv-KF21cdN24bX3i0s_oU5XGM1kTdCS3POwjY41sP_c8Q61SzXEbqM20B41ej8PNJyjQQ9DTYFPLA5137orG89h1f0ilBs4KpVtyrmIt8AIj4qGqyYtvseSVypWcdDb9Z5DAkGMuhEYi1lzE_Ma1nrWnxnmzCQ_iMD5gI=w1280-rw')`
                }}
              />
            ) : mapStyle === "minimal" ? (
              /* Minimalistic Blueprint look */
              <div className="w-full h-full bg-[#0d0d0d] flex items-center justify-center relative">
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute w-[450px] h-[450px] border border-primary/10 rounded-full flex items-center justify-center opacity-40 animate-pulse">
                  <div className="w-[300px] h-[300px] border border-primary/10 rounded-full" />
                </div>
              </div>
            ) : (
              /* Dark Custom map design as shown in mockup */
              <div 
                className="w-full h-full bg-[#111111] bg-cover bg-center relative"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAXvZIIZraUsXekwny6g3klavCzn4o9gO4nBfZqyVp5BRyOq7nXnlJuJuJxq-Bo8Csxo2wW5eFrGhspTEqXtNGNeXLG7i1H2yEMh6MC4ccv-KF21cdN24bX3i0s_oU5XGM1kTdCS3POwjY41sP_c8Q61SzXEbqM20B41ej8PNJyjQQ9DTYFPLA5137orG89h1f0ilBs4KpVtyrmIt8AIj4qGqyYtvseSVypWcdDb9Z5DAkGMuhEYi1lzE_Ma1nrWnxnmzCQ_iMD5gI=w1280-rw')`
                }}
              >
                <div className="absolute inset-0 bg-[#111111]/70 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/60" />
              </div>
            )}
          </div>

          {/* Interactive Radar Scanning Overlay (for dark sci-fi lux feel) */}
          <div className="absolute inset-0 pointer-events-none opacity-20 hidden sm:block">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary/20 animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-primary/10" />
          </div>

          {/* Map Location Overlay Pins */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className={`relative flex flex-col items-center justify-center transition-all duration-500 transform ${
              isRotating ? "scale-75 opacity-0" : "scale-100 opacity-100"
            }`}>
              {/* Core active coordinate highlight */}
              <div className="absolute -inset-8 rounded-full bg-primary/10 animate-ping" style={{ animationDuration: "3s" }} />
              <div className="absolute -inset-4 rounded-full bg-primary/20 animate-pulse" />
              
              {/* Outer floating coordinate name tag */}
              <div className="mb-2 bg-zinc-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-primary/30 text-xs font-semibold text-white shadow-lg pointer-events-auto flex items-center gap-1.5 whitespace-nowrap">
                <MapPin className="w-3.5 h-3.5 text-primary fill-primary" />
                {activeBranch.city}, {activeBranch.country}
              </div>

              {/* Glowing radar dot */}
              <div className="w-5 h-5 rounded-full bg-primary border-4 border-zinc-950 shadow-xl shadow-primary/40 relative z-10 pointer-events-auto" />
            </div>
          </div>

          {/* Floating Glass Branch Info Card */}
          <div className="absolute top-8 left-8 right-8 md:right-auto w-auto md:w-[350px] z-20 pointer-events-auto animate-in slide-in-from-left-6 duration-500">
            <div className="glass-card p-6 rounded-3xl border-l-4 border-l-primary relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-xl" />
              
              <div className="flex items-center justify-between mb-3">
                <div className="bg-primary/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-primary border border-primary/20">
                  {activeBranch.type}
                </div>
                <div className="flex items-center gap-1 text-primary">
                  <Star className="w-3.5 h-3.5 fill-primary" />
                  <span className="font-sans text-xs font-bold">{activeBranch.rating.toFixed(1)}</span>
                </div>
              </div>

              <h3 className="font-serif text-xl text-white mb-2 group-hover:text-primary transition-colors">
                {activeBranch.name}
              </h3>
              
              <p className="text-xs text-on-surface-variant mb-6 leading-relaxed">
                {activeBranch.address}
              </p>

              <div className="flex flex-col gap-2.5">
                <a 
                  href={activeBranch.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border border-white/5 hover:border-primary/20 transition-all text-center"
                >
                  <Navigation className="w-3.5 h-3.5 text-primary" /> Open in Google Maps <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
                
                <a 
                  href={activeBranch.yandexMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border border-white/5 hover:border-primary/20 transition-all text-center"
                >
                  <Map className="w-3.5 h-3.5 text-primary" /> Open in Yandex Maps <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>
          </div>

          {/* Map Widgets (Zoom / Recenter / Styles) */}
          <div className="absolute bottom-8 right-8 flex flex-col sm:flex-row items-center gap-3 z-20 pointer-events-auto">
            {/* Map Styles Selector */}
            <div className="flex bg-zinc-950/90 backdrop-blur-md rounded-xl p-1 border border-white/10">
              {(["dark", "satellite", "minimal"] as const).map((style) => (
                <button
                  key={style}
                  onClick={() => setMapStyle(style)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                    mapStyle === style
                      ? "bg-primary text-on-primary"
                      : "text-on-surface-variant hover:text-white"
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>

            {/* Zoom / Recenter tools */}
            <div className="flex sm:flex-col bg-zinc-950/90 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden divide-x sm:divide-x-0 sm:divide-y divide-white/5">
              <button 
                onClick={() => setZoom(prev => Math.min(prev + 1, 18))}
                className="p-2.5 text-on-surface-variant hover:text-white hover:bg-white/5 transition-all"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setZoom(prev => Math.max(prev - 1, 10))}
                className="p-2.5 text-on-surface-variant hover:text-white hover:bg-white/5 transition-all"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button 
                onClick={handleRecenter}
                className="p-2.5 text-on-surface-variant hover:text-white hover:bg-white/5 transition-all"
                title="Recenter Map"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
