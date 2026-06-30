import { CalendarRange, MessageSquare, FileUp, ClipboardList, Home, MapPin, CalendarDays } from "lucide-react";

interface FloatingCTAProps {
  onOpenBooking: () => void;
  onOpenXRay: () => void;
  onOpenCallBack: () => void;
}

export default function FloatingCTA({
  onOpenBooking,
  onOpenXRay,
  onOpenCallBack,
}: FloatingCTAProps) {
  
  const handleWhatsAppRedirect = () => {
    window.open("https://wa.me/905331234567", "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* 1. Floating Action Bar for Desktop / Tablet (Hidden on Mobile) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[800px] hidden md:block animate-in slide-in-from-bottom-8 duration-500">
        <div className="glass-card rounded-2xl flex items-center justify-around p-3 border-t border-white/10 shadow-2xl relative group">
          {/* Subtle background glow that follows hovering */}
          <div className="absolute inset-0 bg-primary/[0.01] rounded-2xl pointer-events-none" />

          {/* Action 1: Free Consultation */}
          <button 
            onClick={onOpenBooking}
            className="flex flex-col items-center gap-1.5 px-5 py-2.5 text-primary hover:bg-primary/10 rounded-xl transition-all font-semibold uppercase tracking-wider relative group"
          >
            <CalendarRange className="w-5 h-5 text-primary" />
            <span className="text-[9px] font-bold tracking-widest font-sans">Free Consultation</span>
          </button>
          
          <div className="w-[1px] h-8 bg-white/10" />

          {/* Action 2: WhatsApp */}
          <button 
            onClick={handleWhatsAppRedirect}
            className="flex flex-col items-center gap-1.5 px-5 py-2.5 text-on-surface-variant hover:text-white hover:bg-white/5 rounded-xl transition-all uppercase tracking-wider group"
          >
            <MessageSquare className="w-5 h-5 group-hover:text-primary transition-colors" />
            <span className="text-[9px] font-bold tracking-widest font-sans">WhatsApp</span>
          </button>

          <div className="w-[1px] h-8 bg-white/10" />

          {/* Action 3: Send X-Ray */}
          <button 
            onClick={onOpenXRay}
            className="flex flex-col items-center gap-1.5 px-5 py-2.5 text-on-surface-variant hover:text-white hover:bg-white/5 rounded-xl transition-all uppercase tracking-wider group"
          >
            <FileUp className="w-5 h-5 group-hover:text-primary transition-colors" />
            <span className="text-[9px] font-bold tracking-widest font-sans">Send X-Ray</span>
          </button>

          <div className="w-[1px] h-8 bg-white/10" />

          {/* Action 4: Treatment Plan */}
          <button 
            onClick={onOpenBooking}
            className="flex flex-col items-center gap-1.5 px-5 py-2.5 text-on-surface-variant hover:text-white hover:bg-white/5 rounded-xl transition-all uppercase tracking-wider group"
          >
            <ClipboardList className="w-5 h-5 group-hover:text-primary transition-colors" />
            <span className="text-[9px] font-bold tracking-widest font-sans">Treatment Plan</span>
          </button>
        </div>
      </div>

      {/* 2. Mobile Bottom Navigation Bar (Hidden on Desktop, sticks flatly to the viewport bottom) */}
      <div className="fixed bottom-0 left-0 w-full z-50 md:hidden bg-zinc-950 border-t border-white/10 flex justify-around items-center h-[68px] px-4 shadow-xl pb-[env(safe-area-inset-bottom)]">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-white p-2 transition-all"
        >
          <Home className="w-5 h-5" />
          <span className="text-[9px] font-semibold tracking-wider font-sans mt-1">Home</span>
        </button>

        <button 
          onClick={() => {
            const el = document.getElementById("map-section");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex flex-col items-center justify-center text-primary bg-primary/10 border border-primary/20 rounded-2xl px-3 py-1.5 transition-all"
        >
          <MapPin className="w-5 h-5" />
          <span className="text-[9px] font-bold tracking-wider font-sans mt-0.5">Branches</span>
        </button>

        <button 
          onClick={handleWhatsAppRedirect}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-white p-2 transition-all"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-[9px] font-semibold tracking-wider font-sans mt-1">WhatsApp</span>
        </button>

        <button 
          onClick={onOpenBooking}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-white p-2 transition-all"
        >
          <CalendarDays className="w-5 h-5" />
          <span className="text-[9px] font-semibold tracking-wider font-sans mt-1">Book</span>
        </button>
      </div>
    </>
  );
}
