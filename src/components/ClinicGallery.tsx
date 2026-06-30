import { useState } from "react";
import { Maximize2, Sparkles, Star } from "lucide-react";
import { LightboxModal } from "./Modals";
import { cdnImg } from "../lib/img";

export default function ClinicGallery() {
  const [lightboxData, setLightboxData] = useState<{
    isOpen: boolean;
    image: string;
    title: string;
    description: string;
  }>({
    isOpen: false,
    image: "",
    title: "",
    description: "",
  });

  const locations = [
    {
      id: "basaksehir-gallery",
      title: "Başakşehir Hub",
      city: "Istanbul, Main Hub",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFpDH94uAYJMV6lY136ydRJebLX_6raH3kL2kYNrVIcPkds6vZ5duf5vsDpDq1Dvai2aAExkoo4Vb81tEGua59AAADkFAw1SKjU4pNEM66mMYJRM3LRNtLTREdCJ15KIWMm-TtSbCGHd3fpia0CwPZj8XEaEQ-y79I4yGcOCoQHqL6C1fBdzW7TMSRfEU_yrC8rXiKy8Cc4LWH0sYYHNwgEkg7FZ5tgpjHRK-8SUR2M0ol4tTz7kigri1GpluxJE1zTUuayijg6ms",
      description: "Our massive flagship 4000m² dental complex. Housing 32 luxury clinical theatres, fully-equipped general anesthesia surgical rooms, an in-house digital laboratory, and state-of-the-art CAD/CAM production centers. The interior matches five-star hotel lounges with luxury massage chairs, private waiting suites, and concierge hospitality desks.",
      size: "4000m² Suite",
      rating: "5.0 rating"
    },
    {
      id: "toronto-gallery",
      title: "Toronto Center",
      city: "Canada, Consultation Center",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcuAedxIVmHoWM9-CagbC-qcappjgwttfJ_hJVZi-yJ_DnapS7R5C7fNhbhbBQXBv-tPxmJRleX6MTdkOvJ85OP1KWmuCBDlEdHC2jBK06F740BZaUFBaxbdXHXI6MuyI64KQOkjFXtv8XYQ8bsU20FCC2tD3w596CsVcGZ9B1T5ko_frf8-xWPVNONy1gEaeGx2hnvwNhvT2X8l62Rw20wyPNVWKXA1UBaVMAUOqRZsAEno4OuekP_mKnynHi1m3VOqJK6mc-spY",
      description: "Conveniently located in the financial heart of Toronto, Canada. Provides state-of-the-art diagnostic imaging, virtual consultation booths, pre-surgical mapping, and direct VIP concierge travel planning. Allows North American guests to finalize custom smile design parameters with our dentists prior to boarding.",
      size: "Exclusive Consultation Suite",
      rating: "4.9 rating"
    },
    {
      id: "halkali-gallery",
      title: "Halkalı Boutique",
      city: "Istanbul, Aesthetic Boutique",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7ehCi0aOf2BlKSZu8gXzZLmZlO-Pf0TN3BDTeW6NyOlIhpeZXswoFlVVH6s0c1iP0jQhsC3XwVcXJ3G02HllC7kiCQUPEGGaNcWSxB2q9tGWDaSA0XuW7dxLQfjeb6JZggDoUz2ap_4ubcRw3WzGmjGSYnfssAyckMbyBPwfj_4xEH6NTzLYWKbgXKiZClonsboty5QJLuOpetw_HLR9wwkCvWDYafXJHrUWwdEAAdrX2DnuO7c3NOtiKZOMApWAN845zF0b4U4s",
      description: "Our bespoke smile boutique. Focused entirely on premium cosmetic dentistry, Halkalı houses senior dental designers specializing in ultra-thin veneers, micro-aesthetic gum contouring, and advanced biological dental restorations. Styled with sleek dark marble, soft warm gold accents, and custom wellness zones.",
      size: "Specialist Boutique",
      rating: "4.9 rating"
    }
  ];

  return (
    <section id="gallery" className="py-24 bg-zinc-950 border-t border-white/5 relative z-20">
      {/* Background ambient lighting */}
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-primary/5 rounded-full blur-[110px] pointer-events-none hidden sm:block" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-widest text-primary font-semibold flex items-center justify-center gap-1.5 mb-1.5">
            <Sparkles className="w-3.5 h-3.5" /> LUXURY RETREATS & ACCREDITATION
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white tracking-tight">The Largest Clinic in Europe</h2>
          <p className="font-serif text-base md:text-lg text-primary mt-2">
            Spanning 4000m² of Precision & Luxury
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {locations.map((loc) => (
            <div 
              key={loc.id} 
              className="group cursor-pointer flex flex-col justify-between"
              onClick={() => setLightboxData({
                isOpen: true,
                image: loc.image,
                title: loc.title,
                description: loc.description
              })}
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-6 bg-zinc-900 border border-white/5 shadow-lg group-hover:border-primary/20 transition-all duration-500">
                <img
                  src={cdnImg(loc.image, 760)}
                  alt={loc.title}
                  loading="lazy"
                  decoding="async"
                  width={760}
                  height={950}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[800ms]"
                />
                
                {/* Gradient shader */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-85 transition-opacity group-hover:opacity-90" />
                
                {/* Floating details overlay */}
                <div className="absolute top-4 left-4 bg-zinc-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[10px] font-bold text-primary flex items-center gap-1 uppercase tracking-wider">
                  <Star className="w-3 h-3 fill-primary text-primary" /> {loc.rating}
                </div>

                <div className="absolute top-4 right-4 bg-zinc-950/85 backdrop-blur-md p-2 rounded-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4 text-white" />
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] uppercase tracking-widest text-primary font-bold block mb-1">
                    {loc.size}
                  </span>
                  <h4 className="font-serif text-2xl text-white mb-1">{loc.title}</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {loc.city}
                  </p>
                </div>
              </div>

              {/* View Location Trigger */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxData({
                    isOpen: true,
                    image: loc.image,
                    title: loc.title,
                    description: loc.description
                  });
                }}
                className="w-full py-4 border border-white/5 rounded-2xl text-xs font-semibold uppercase tracking-wider text-on-surface-variant hover:text-primary hover:border-primary/40 transition-all"
              >
                Explore Venue Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Trigger Modal */}
      <LightboxModal
        isOpen={lightboxData.isOpen}
        image={lightboxData.image}
        title={lightboxData.title}
        description={lightboxData.description}
        onClose={() => setLightboxData({ ...lightboxData, isOpen: false })}
      />
    </section>
  );
}
