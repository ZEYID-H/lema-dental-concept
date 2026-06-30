import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BranchSelector from "./components/BranchSelector";
import InteractiveMap from "./components/InteractiveMap";
import ContactCards from "./components/ContactCards";
import ClinicGallery from "./components/ClinicGallery";
import BeforeAfter from "./components/BeforeAfter";
import Certifications from "./components/Certifications";
import FloatingCTA from "./components/FloatingCTA";
import Footer from "./components/Footer";
import { BookingModal, XRayModal, CallBackModal } from "./components/Modals";
import { branches } from "./data";

export default function App() {
  const [activeBranchId, setActiveBranchId] = useState("basaksehir");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isXRayOpen, setIsXRayOpen] = useState(false);
  const [isCallBackOpen, setIsCallBackOpen] = useState(false);

  // Find the selected branch object
  const activeBranch = branches.find((b) => b.id === activeBranchId) || branches[0];

  useEffect(() => {
    // Listen to custom booking events thrown by lightbox/other elements
    const handleOpenBooking = () => {
      setIsBookingOpen(true);
    };
    window.addEventListener("open-booking", handleOpenBooking);
    return () => window.removeEventListener("open-booking", handleOpenBooking);
  }, []);

  const handleOpenWhatsApp = () => {
    window.open("https://wa.me/905331234567", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-[#131313] min-h-screen text-[#e5e2e1] font-sans selection:bg-[#f2ca50]/20 selection:text-primary">
      {/* Navbar Section */}
      <Navbar onOpenBooking={() => setIsBookingOpen(true)} />

      {/* Hero Section */}
      <Hero 
        onOpenBooking={() => setIsBookingOpen(true)} 
        onOpenWhatsApp={handleOpenWhatsApp} 
      />

      {/* Branch Selector */}
      <BranchSelector 
        branches={branches}
        activeBranchId={activeBranchId}
        onSelectBranch={setActiveBranchId}
      />

      {/* Interactive Map (with Floating Glass card built-in) */}
      <InteractiveMap activeBranch={activeBranch} />

      {/* Contact Cards (with dynamic values and quick actions) */}
      <ContactCards 
        activeBranch={activeBranch}
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenCallBack={() => setIsCallBackOpen(true)}
      />

      {/* Clinic Gallery Showcase ("Largest Clinic in Europe") */}
      <ClinicGallery />

      {/* Before & After Smile Transformations (drag-to-compare slider) */}
      <BeforeAfter />

      {/* Accreditations & Certifications */}
      <Certifications />

      {/* Footer */}
      <Footer onOpenBooking={() => setIsBookingOpen(true)} />

      {/* Floating CTA navigation (Desk action-bar, Mobile thumb-navigation) */}
      <FloatingCTA 
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenXRay={() => setIsXRayOpen(true)}
        onOpenCallBack={() => setIsCallBackOpen(true)}
      />

      {/* Core Modals */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />
      <XRayModal 
        isOpen={isXRayOpen} 
        onClose={() => setIsXRayOpen(false)} 
      />
      <CallBackModal 
        isOpen={isCallBackOpen} 
        onClose={() => setIsCallBackOpen(false)} 
      />
    </div>
  );
}
