import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";

// three.js and the globe load after the page has painted, so they never hold
// up the headline. The globe still plays its own assemble intro when it mounts.
const Globe = lazy(() => import('../three/Globe'));
import HeroDotGrid from '../HeroDotGrid';
import { Skiper58 } from '../ui/skiper-ui/skiper58';

const HEADLINE = "Decisions before the risk appears.";

const HeroSection = () => {
  // The globe fits this slot: whatever height is left above the copy.
  const globeSlotRef = useRef<HTMLDivElement>(null);
  const [globeReady, setGlobeReady] = useState(false);

  useEffect(() => {
    const start = () => {
      if ("requestIdleCallback" in window) window.requestIdleCallback(() => setGlobeReady(true), { timeout: 1500 });
      else setTimeout(() => setGlobeReady(true), 200);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, []);

  return (
    <section
      id="hero"
      data-hero="true"
      className="relative isolate flex h-[calc(100svh-80px)] min-h-[620px] w-full flex-col items-center overflow-x-clip bg-ink-900 px-5 text-center sm:px-8"
    >
      {/* 24px background dot grid; a press sends a water ripple through it. */}
      <HeroDotGrid />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 35%, rgba(109,137,110,0.22) 0%, rgba(109,137,110,0.05) 55%, transparent 75%), radial-gradient(ellipse 38% 32% at 50% 70%, rgba(115,150,115,0.06), transparent 74%)",
        }}
      />
      {/* Full-bleed canvas so the halo and long-haul arcs never clip. It reaches
          80px up behind the transparent navbar; the sphere itself starts just below
          it, and its bottom curve sits just above the copy. Copy sits above (z-10). */}
      {globeReady && (
        <Suspense fallback={null}>
          <Globe className="absolute inset-x-0 -top-20 bottom-0 z-[1]" slotRef={globeSlotRef} />
        </Suspense>
      )}

      <div ref={globeSlotRef} aria-hidden="true" className="pointer-events-none min-h-0 w-full flex-1" />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl shrink-0 flex-col items-center overflow-visible px-4 pb-6 pt-8 text-center sm:pb-8">
        <div className="flex w-full flex-col items-center">
          <h1 className="sr-only">Predictive AI and AI Development Company, Australia</h1>
          <Skiper58
            as="p"
            text={HEADLINE}
            className="font-serif text-3xl font-semibold leading-[1.02] tracking-tight text-white text-center select-none sm:text-4xl md:whitespace-nowrap md:text-5xl lg:text-[3.25rem]"
          />
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3" data-stagger>
            {/* Border beam: a conic sweep spins behind the olive fill, and only
                the 1px rim between fill and edge shows it. */}
            <a
              href="/start/"
              id="hero-cta-primary"
              // The lift uses the standalone `translate` property: GSAP's entrance
              // stagger leaves an inline `transform` that would override it.
              className="group relative isolate inline-flex h-12 items-center gap-3 overflow-hidden rounded-lg bg-[#6D896E] px-6 py-3 text-sm font-semibold tracking-tight text-[#050806] shadow-[0_8px_20px_rgba(109,137,110,0.22)] transition-[translate,box-shadow] duration-200 ease-out hover:[translate:0_-2px] hover:shadow-[0_12px_28px_rgba(109,137,110,0.3)]"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 -z-20 aspect-square w-[260%] -translate-x-1/2 -translate-y-1/2 animate-[spin_3.6s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_250deg,#8FB890_320deg,#D7E8D7_345deg,transparent_360deg)] motion-reduce:animate-none"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-px -z-10 rounded-[7px] bg-[#6D896E] transition-colors duration-200 group-hover:bg-[#5f7a60]"
              />
              Calculate AI ROI
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#products"
              id="hero-cta-secondary"
              className="group inline-flex h-12 items-center gap-3 rounded-lg border border-[#6D896E] bg-[#6D896E] px-6 py-3 text-sm font-semibold tracking-tight text-[#050806] shadow-[0_8px_20px_rgba(109,137,110,0.22)] transition-all duration-300 hover:bg-[#5f7a60] hover:shadow-[0_8px_24px_rgba(109,137,110,0.35)]"
            >
              Explore systems
              <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;