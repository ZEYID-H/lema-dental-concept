import { Suspense, lazy, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BranchSelector from "./components/BranchSelector";
import { branches } from "./data";

// Below-the-fold sections are code-split so they don't block initial render.
const InteractiveMap = lazy(() => import("./components/InteractiveMap"));
const ContactCards = lazy(() => import("./components/ContactCards"));
const ClinicGallery = lazy(() => import("./components/ClinicGallery"));
const BeforeAfter = lazy(() => import("./components/BeforeAfter"));
const Certifications = lazy(() => import("./components/Certifications"));
const Footer = lazy(() => import("./components/Footer"));
const FloatingCTA = lazy(() => import("./components/FloatingCTA"));

// Modals are only needed on interaction — load them on demand.
const BookingModal = lazy(() =>
  import("./components/Modals").then((m) => ({ default: m.BookingModal }))
);
const XRayModal = lazy(() =>
  import("./components/Modals").then((m) => ({ default: m.XRayModal }))
);
const CallBackModal = lazy(() =>
  import("./components/Modals").then((m) => ({ default: m.CallBackModal }))
);

const SectionFallback = () => <div className="min-h-[40vh]" aria-hidden="true" />;

export default function App() {
  const [activeBranchId, setActiveBranchId] = useState("basaksehir");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isXRayOpen, setIsXRayOpen] = useState(false);
  const [isCallBackOpen, setIsCallBackOpen] = useState(false);

  const activeBranch = branches.find((b) => b.id === activeBranchId) || branches[0];

  useEffect(() => {
    const handleOpenBooking = () => setIsBookingOpen(true);
    window.addEventListener("open-booking", handleOpenBooking);
    return () => window.removeEventListener("open-booking", handleOpenBooking);
  }, []);

  const handleOpenWhatsApp = () => {
    window.open("https://wa.me/905331234567", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-[#131313] min-h-screen text-[#e5e2e1] font-sans selection:bg-[#f2ca50]/20 selection:text-primary">
      {/* Above-the-fold: eager */}
      <Navbar onOpenBooking={() => setIsBookingOpen(true)} />

      <Hero
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenWhatsApp={handleOpenWhatsApp}
      />

      <BranchSelector
        branches={branches}
        activeBranchId={activeBranchId}
        onSelectBranch={setActiveBranchId}
      />

      {/* Below-the-fold: lazy */}
      <Suspense fallback={<SectionFallback />}>
        <InteractiveMap activeBranch={activeBranch} />

        <ContactCards
          activeBranch={activeBranch}
          onOpenBooking={() => setIsBookingOpen(true)}
          onOpenCallBack={() => setIsCallBackOpen(true)}
        />

        <ClinicGallery />

        <BeforeAfter />

        <Certifications />

        <Footer onOpenBooking={() => setIsBookingOpen(true)} />
      </Suspense>

      <Suspense fallback={null}>
        <FloatingCTA
          onOpenBooking={() => setIsBookingOpen(true)}
          onOpenXRay={() => setIsXRayOpen(true)}
          onOpenCallBack={() => setIsCallBackOpen(true)}
        />
      </Suspense>

      {/* Modals: mounted only when opened */}
      <Suspense fallback={null}>
        {isBookingOpen && (
          <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
        )}
        {isXRayOpen && (
          <XRayModal isOpen={isXRayOpen} onClose={() => setIsXRayOpen(false)} />
        )}
        {isCallBackOpen && (
          <CallBackModal isOpen={isCallBackOpen} onClose={() => setIsCallBackOpen(false)} />
        )}
      </Suspense>
    </div>
  );
}
