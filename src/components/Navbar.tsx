import React, { useState, useEffect } from "react";
import { Menu, X, Shield, Calendar } from "lucide-react";

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Treatments", href: "#treatments" },
    { label: "Interactive Map", href: "#map-section" },
    { label: "Clinic Gallery", href: "#gallery" },
    { label: "Certifications", href: "#certifications" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
          isScrolled 
            ? "bg-zinc-950/95 max-md:backdrop-blur-none backdrop-blur-xl border-white/5 py-4 shadow-xl"
            : "bg-transparent border-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group flex items-center gap-2"
          >
            <div className="font-serif text-xl md:text-2xl text-primary font-bold tracking-tight transition-all duration-300 group-hover:text-glow">
              Lema Dental
            </div>
            <span className="hidden sm:inline-block font-sans text-[10px] tracking-widest text-on-surface-variant uppercase border border-white/10 px-2 py-0.5 rounded-full">
              Luxe
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {menuItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="font-sans text-xs uppercase tracking-widest font-semibold text-on-surface-variant hover:text-white hover:text-glow transition-all"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop Call to Action */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onOpenBooking}
              className="bg-primary text-on-primary hover:brightness-110 active:scale-98 font-semibold px-6 py-2.5 rounded-full text-xs uppercase tracking-wider transition-all shadow-md shadow-primary/15"
            >
              Book Free Consultation
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-white/5 rounded-xl transition-all"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md cursor-pointer md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer Menu */}
      <div 
        className={`fixed top-0 right-0 h-full w-[280px] z-50 bg-zinc-950 border-l border-white/5 p-8 flex flex-col justify-between md:hidden transform transition-transform duration-300 shadow-2xl ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="space-y-12">
          {/* Drawer Header */}
          <div className="flex items-center justify-between">
            <span className="font-serif text-lg text-primary font-bold">Lema Luxe</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-on-surface-variant hover:text-white p-2 rounded-full hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Nav Links */}
          <div className="flex flex-col gap-6">
            {menuItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="font-sans text-sm uppercase tracking-widest font-semibold text-on-surface-variant hover:text-white transition-all py-2 border-b border-white/5"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* Drawer Footer Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="w-full bg-primary text-on-primary font-semibold py-4 rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" /> Book Consultation
          </button>
          <div className="flex items-center justify-center gap-1.5 text-[10px] text-on-surface-variant">
            <Shield className="w-3.5 h-3.5 text-primary/70" /> Certified Luxury Clinic
          </div>
        </div>
      </div>
    </>
  );
}
