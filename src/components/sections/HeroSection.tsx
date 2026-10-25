import { useEffect, useRef, useState, type ComponentType, type RefObject } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import HeroDotGrid from "../HeroDotGrid";

type GlobeProps = {
  className?: string;
  slotRef?: RefObject<HTMLElement | null>;
};

const HeroSection = () => {
  const globeSlotRef = useRef<HTMLDivElement>(null);
  const [Globe, setGlobe] = useState<ComponentType<GlobeProps> | null>(null);

  useEffect(() => {
    let active = true;
    const loadGlobe = () => {
      import("../three/Globe").then(({ default: GlobeComponent }) => {
        if (active) setGlobe(() => GlobeComponent);
      });
    };
    const timer = window.setTimeout(loadGlobe, 250);
    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <section
      id="hero"
      data-hero="true"
      className="relative isolate flex min-h-[680px] h-[calc(100svh-80px)] w-full flex-col items-center overflow-x-clip bg-ink-900 px-5 text-center sm:px-8"
    >
      <HeroDotGrid />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 48% 42% at 50% 34%, rgba(91,227,232,0.13), transparent 72%), radial-gradient(ellipse 38% 32% at 50% 70%, rgba(155,236,239,0.055), transparent 74%)",
        }}
      />
      {Globe ? (
        <Globe className="absolute inset-x-0 -top-20 bottom-0 z-[1]" slotRef={globeSlotRef} />
      ) : (
        <div aria-hidden="true" className="absolute inset-x-0 -top-20 bottom-0 z-[1]" />
      )}

      <div ref={globeSlotRef} aria-hidden="true" className="pointer-events-none min-h-0 w-full flex-1" />

      <div className="relative z-10 mx-auto flex w-full max-w-[970px] shrink-0 flex-col items-center pb-8 pt-8 sm:pb-10 sm:pt-12">
        <div className="flex w-full flex-col items-center">
          <h1
            data-reveal
            className="max-w-[850px] text-xs font-semibold uppercase tracking-[0.25em] text-primary sm:text-sm"
          >
            Predictive AI and AI Development Company, Australia
          </h1>
          <p
            data-reveal
            className="mt-5 max-w-[860px] font-display text-5xl font-bold leading-[0.98] tracking-[-0.045em] text-paper sm:text-6xl lg:text-7xl"
          >
            Intelligence that <em className="text-primary not-italic neon-glow">moves first</em>.
          </p>
          <p
            data-reveal
            className="mt-5 max-w-[700px] text-base leading-7 text-white/70 sm:text-lg sm:leading-8"
          >
            Predict first, then build, automate and advertise with the numbers behind you.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3" data-stagger>
            <a
              href="/start/"
              id="hero-cta-primary"
              className="group inline-flex min-h-12 items-center gap-3 rounded-pill bg-primary px-5 text-sm font-semibold tracking-tight text-ink-950 shadow-[0_0_24px_rgba(91,227,232,0.3)] ring-1 ring-inset ring-white/20 transition-[translate,box-shadow,filter] duration-200 ease-out hover:[translate:0_-2px] hover:shadow-[0_0_36px_rgba(91,227,232,0.48)] hover:brightness-105"
            >
              Calculate Your AI ROI
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#products"
              id="hero-cta-secondary"
              className="group inline-flex min-h-12 items-center gap-3 rounded-pill border border-white/20 px-5 text-sm font-medium text-paper transition-colors hover:border-primary/70 hover:bg-white/[0.04]"
            >
              Explore Our Products
              <ChevronRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
