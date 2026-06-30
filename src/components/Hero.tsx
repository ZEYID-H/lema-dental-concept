import { MessageSquare, Calendar, Award, Globe, Shield, Star } from "lucide-react";

interface HeroProps {
  onOpenBooking: () => void;
  onOpenWhatsApp: () => void;
}

export default function Hero({ onOpenBooking, onOpenWhatsApp }: HeroProps) {
  const trustBadges = [
    {
      value: "4.9",
      label: "Google Rating",
      icon: <Star className="w-4 h-4 text-primary fill-primary" />
    },
    {
      value: "4000m²",
      label: "Largest In Europe",
      icon: <Award className="w-4 h-4 text-primary" />
    },
    {
      value: "Global",
      label: "International Patients",
      icon: <Globe className="w-4 h-4 text-primary" />
    },
    {
      value: "ADA / ISO",
      label: "Certified Quality",
      icon: <Shield className="w-4 h-4 text-primary" />
    }
  ];

  return (
    <section className="relative pt-32 pb-16 md:pt-48 md:pb-24 overflow-hidden min-h-[90vh] flex flex-col justify-between">
      {/* Cinematic Gold Backdrop Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] opacity-[0.12] pointer-events-none rounded-full blur-[120px] bg-gradient-to-tr from-primary to-transparent" />
      <div className="absolute top-[45%] left-[10%] w-[300px] h-[300px] opacity-[0.06] pointer-events-none rounded-full blur-[100px] bg-primary-container hidden sm:block" />
      <div className="absolute bottom-0 right-[15%] w-[400px] h-[400px] opacity-[0.05] pointer-events-none rounded-full blur-[130px] bg-primary hidden sm:block" />

      {/* Decorative vertical background lines for ultra-luxe architectural look */}
      <div className="absolute inset-0 flex justify-between px-12 md:px-24 pointer-events-none opacity-[0.02]">
        <div className="w-[1px] h-full bg-white" />
        <div className="w-[1px] h-full bg-white hidden md:block" />
        <div className="w-[1px] h-full bg-white hidden md:block" />
        <div className="w-[1px] h-full bg-white" />
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 text-center flex-grow flex flex-col justify-center">
        {/* Subtle badge on top of title */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest font-semibold text-primary mb-6 animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          VIP Smile Consultation Active
        </div>

        <h1 className="font-serif text-[42px] sm:text-5xl md:text-7xl leading-tight mb-6 text-white text-glow">
          Contact Lema Dental Clinic
        </h1>
        
        <p className="font-sans text-sm sm:text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Experience premium dental care in Istanbul and beyond. Our concierge-led approach ensures your journey to a perfect smile is as refined as the result.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto w-full mb-16">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto bg-primary text-on-primary hover:brightness-110 active:scale-98 font-bold px-10 py-4 rounded-full text-xs uppercase tracking-widest transition-all duration-300 shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" /> Book Free Consultation
          </button>
          
          <button
            onClick={onOpenWhatsApp}
            className="w-full sm:w-auto border border-primary/30 text-primary hover:bg-primary/5 active:scale-98 font-bold px-10 py-4 rounded-full text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" /> Contact via WhatsApp
          </button>
        </div>
      </div>

      {/* Trust Badges - elegant grid section */}
      <div className="w-full max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 border-t border-white/5 pt-12 text-center pb-6">
          {trustBadges.map((badge, index) => (
            <div key={index} className="flex flex-col items-center group">
              <div className="flex items-center gap-1.5 mb-1 text-primary">
                {badge.icon}
                <span className="font-serif text-xl sm:text-2xl md:text-3xl text-white font-medium group-hover:text-primary transition-colors">
                  {badge.value}
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold">
                {badge.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
