import React, { useCallback, useEffect, useRef, useState } from "react";
import { Sparkles, MoveHorizontal } from "lucide-react";
import { cdnImg, cdnSrcSet } from "../lib/img";

interface Pair {
  id: string;
  title: string;
  treatment: string;
  before: string;
  after: string;
}

// Replace these URLs with real clinical before/after photos when available.
const pairs: Pair[] = [
  {
    id: "smile-1",
    title: "Hollywood Smile Makeover",
    treatment: "Premium Veneers",
    before:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB7ehCi0aOf2BlKSZu8gXzZLmZlO-Pf0TN3BDTeW6NyOlIhpeZXswoFlVVH6s0c1iP0jQhsC3XwVcXJ3G02HllC7kiCQUPEGGaNcWSxB2q9tGWDaSA0XuW7dxLQfjeb6JZggDoUz2ap_4ubcRw3WzGmjGSYnfssAyckMbyBPwfj_4xEH6NTzLYWKbgXKiZClonsboty5QJLuOpetw_HLR9wwkCvWDYafXJHrUWwdEAAdrX2DnuO7c3NOtiKZOMApWAN845zF0b4U4s",
    after:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAFpDH94uAYJMV6lY136ydRJebLX_6raH3kL2kYNrVIcPkds6vZ5duf5vsDpDq1Dvai2aAExkoo4Vb81tEGua59AAADkFAw1SKjU4pNEM66mMYJRM3LRNtLTREdCJ15KIWMm-TtSbCGHd3fpia0CwPZj8XEaEQ-y79I4yGcOCoQHqL6C1fBdzW7TMSRfEU_yrC8rXiKy8Cc4LWH0sYYHNwgEkg7FZ5tgpjHRK-8SUR2M0ol4tTz7kigri1GpluxJE1zTUuayijg6ms",
  },
];

function CompareSlider({ pair }: { pair: Pair }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [width, setWidth] = useState(0);
  const draggingRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, pct)));
  }, []);

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      if (draggingRef.current) updateFromClientX(e.clientX);
    };
    const stop = () => {
      draggingRef.current = false;
    };
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", stop);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", stop);
    };
  }, [updateFromClientX]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 4));
    if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 4));
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={(e) => {
        draggingRef.current = true;
        updateFromClientX(e.clientX);
      }}
      className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-3xl overflow-hidden border border-white/10 shadow-2xl select-none touch-none cursor-ew-resize bg-zinc-900"
    >
      {/* AFTER (base layer) */}
      <img
        src={cdnImg(pair.after, 800)}
        srcSet={cdnSrcSet(pair.after, [600, 800, 1024])}
        sizes="(min-width: 1024px) 960px, 100vw"
        alt={`${pair.title} – after treatment`}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      <div className="absolute top-4 right-4 z-10 bg-primary text-on-primary px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
        After
      </div>

      {/* BEFORE (clipped layer) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ width: `${position}%` }}
      >
        <img
          src={cdnImg(pair.before, 800)}
          srcSet={cdnSrcSet(pair.before, [600, 800, 1024])}
          sizes="(min-width: 1024px) 960px, 100vw"
          alt={`${pair.title} – before treatment`}
          loading="lazy"
          decoding="async"
          draggable={false}
          style={{ width: width || "100%" }}
          className="absolute inset-0 h-full max-w-none object-cover grayscale-[0.15] brightness-90"
        />
        <div className="absolute top-4 left-4 bg-zinc-950/85 text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/15">
          Before
        </div>
      </div>

      {/* Divider + handle */}
      <div
        className="absolute top-0 bottom-0 z-20 w-[2px] bg-primary shadow-[0_0_12px_rgba(242,202,80,0.6)] pointer-events-none"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <button
          type="button"
          aria-label="Drag to compare before and after"
          aria-valuenow={Math.round(position)}
          aria-valuemin={0}
          aria-valuemax={100}
          role="slider"
          onKeyDown={handleKey}
          onPointerDown={(e) => {
            e.stopPropagation();
            draggingRef.current = true;
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-xl shadow-primary/30 pointer-events-auto cursor-ew-resize focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 active:scale-95 transition-transform"
        >
          <MoveHorizontal className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  return (
    <section id="results" className="py-20 md:py-24 bg-zinc-950 border-t border-white/5 relative z-20">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[280px] bg-primary/5 rounded-full blur-[110px] pointer-events-none hidden sm:block" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative">
        <div className="text-center mb-12">
          <span className="text-[10px] uppercase tracking-widest text-primary font-semibold flex items-center justify-center gap-1.5 mb-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Real Transformations
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white tracking-tight">Before &amp; After</h2>
          <p className="text-sm text-on-surface-variant max-w-xl mx-auto mt-3">
            Drag the slider to reveal the artistry behind every Lema smile transformation.
          </p>
        </div>

        <div className="space-y-6">
          {pairs.map((pair) => (
            <div key={pair.id}>
              <CompareSlider pair={pair} />
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mt-5 px-1">
                <h3 className="font-serif text-xl text-white">{pair.title}</h3>
                <span className="text-[11px] uppercase tracking-widest text-primary font-semibold">
                  {pair.treatment}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
