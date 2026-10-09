import { useRef } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import Globe from '../three/Globe';
import HeroDotGrid from '../HeroDotGrid';

const HeroSection = () => {
  // The globe fits this slot: whatever height is left above the copy.
  const globeSlotRef = useRef<HTMLDivElement>(null);

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
            "radial-gradient(ellipse 48% 42% at 50% 34%, rgba(0,255,136,0.09), transparent 72%), radial-gradient(ellipse 38% 32% at 50% 70%, rgba(115,150,115,0.06), transparent 74%)",
        }}
      />
      {/* Full-bleed canvas so the halo and long-haul arcs never clip. It reaches
          80px up behind the transparent navbar; the sphere itself starts just below
          it, and its bottom curve sits just above the copy. Copy sits above (z-10). */}
      <Globe className="absolute inset-x-0 -top-20 bottom-0 z-[1]" slotRef={globeSlotRef} />

      <div ref={globeSlotRef} aria-hidden="true" className="pointer-events-none min-h-0 w-full flex-1" />

      <div className="relative z-10 mx-auto flex w-full max-w-[900px] shrink-0 flex-col items-center pb-6 pt-8 sm:pb-8 sm:pt-10">
        <div className="flex w-full flex-col items-center">
          <h1
            data-reveal
            className="max-w-[850px] text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-cream sm:text-5xl lg:text-6xl"
          >
            Decisions before the risk appears.
          </h1>
          <p
            data-reveal
            className="mt-4 max-w-[590px] text-base leading-7 text-white/65 sm:text-lg sm:leading-8"
          >
            PresciaIQ turns operational data into live forecasts your teams can act on today.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3" data-stagger>
            <a
              href="/start"
              id="hero-cta-primary"
              // The lift uses the standalone `translate` property: GSAP's entrance
              // stagger leaves an inline `transform` that would override it.
              className="group inline-flex min-h-12 items-center gap-3 rounded-sm bg-gradient-to-r from-[#00E575] to-[#00D068] px-5 text-sm font-semibold tracking-tight text-[#060809] shadow-[0_0_24px_rgba(0,229,117,0.28)] ring-1 ring-inset ring-white/20 transition-[translate,box-shadow,filter] duration-200 ease-out hover:[translate:0_-2px] hover:shadow-[0_0_36px_rgba(0,229,117,0.45)] hover:brightness-105"
            >
              Calculate AI ROI
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#products"
              id="hero-cta-secondary"
              className="group inline-flex min-h-12 items-center gap-3 rounded-sm border border-white/20 px-5 text-sm font-medium text-cream transition-colors hover:border-white/45 hover:bg-white/[0.04]"
            >
              Explore systems
              <ChevronRight className="h-4 w-4 text-sage-300 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;