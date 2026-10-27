import { useState, useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import type { Swiper as SwiperInstance } from "swiper";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Carousel_002 } from "../ui/skiper-ui/skiper48";
gsap.registerPlugin(ScrollTrigger);

interface CapabilityCard {
  id: string;
  title: string;
  // Two lines at card width; keep it under ~110 characters.
  description: string;
  href: string;
  // Transparent 3D mark for the top of the card (336px WebP made from the
  // PNGs in /public/cards, 3x its largest display size).
  badge: string;
}

const capabilities: CapabilityCard[] = [
  {
    id: "web-aeo",
    badge: "/cards/badges/card1.webp",
    title: "Websites + SEO / AEO",
    description:
      "Sub-second platforms built to win search and answer engines, without ad spend.",
    href: "/services/aeo-seo-predictive-search-architecture/",
  },
  {
    id: "mobile-software",
    badge: "/cards/badges/card2.webp",
    title: "Mobile Apps + Custom Software",
    description:
      "Native iOS, Android and web apps, offline-first and synced across your workforce.",
    href: "/services/ai-app-development/",
  },
  {
    id: "workflow-automation",
    badge: "/cards/badges/card3.webp",
    title: "Workflow Automation + Integration",
    description:
      "ERP, CRM and pipelines connected end to end. Manual data entry disappears.",
    href: "/products/ai-automations/",
  },
  {
    id: "helm-os",
    badge: "/cards/badges/monogram.webp",
    title: "Daynori Operational Backbone",
    description:
      "One live command layer for leadership, project managers and frontline teams.",
    href: "/services/ai-software-development/",
  },
  {
    id: "predictive-analytics",
    badge: "/cards/badges/card5.webp",
    title: "Predictive Analytics + Forecasting",
    description:
      "Validated forecasts that flag schedule and cost variances before spend occurs.",
    href: "https://buildpredictiq.com.au/",
  },
  {
    id: "cloud-security",
    badge: "/cards/badges/card6.webp",
    title: "Cloud Infrastructure + Security",
    description:
      "Australian-hosted, zero-trust architecture built to data sovereignty and compliance standards.",
    href: "/services/ai-software-development/",
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

// One card of the capabilities deck. The whole face links through; Swiper
// swallows the click when the card was dragged rather than tapped. Native link
// dragging is off, or a mouse drag would pick up the URL instead of the card.
const CapabilityFace = ({ card }: { card: CapabilityCard }) => (
  <a
    href={card.href}
    draggable={false}
    {...(card.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    className="group relative isolate flex h-full w-full flex-col justify-between overflow-hidden rounded-[2rem] border-[1.5px] border-[#6D896E]/25 bg-gradient-to-br from-[#F4F7F4] via-[#EEF3EE] to-[#E5EDE5] p-8 text-left shadow-[0_20px_50px_-12px_rgba(109,137,110,0.22),0_4px_12px_rgba(0,0,0,0.04)] sm:p-10"
  >
    {/* The mark floats on the card surface, no box: it heads the card and
        the copy keeps its place at the bottom. */}
    <img
      src={card.badge}
      alt=""
      width={112}
      height={112}
      loading="lazy"
      decoding="async"
      draggable={false}
      className="mb-6 mt-2 h-20 w-20 object-contain drop-shadow-[0_10px_20px_rgba(109,137,110,0.18)] sm:mb-8 sm:h-24 sm:w-24 md:h-28 md:w-28"
    />
    <div>
      <h3 className="font-serif text-3xl font-bold leading-[1.1] tracking-tight text-[#0F1713] sm:text-4xl">
        {card.title}
      </h3>
      <p className="mt-4 font-sans text-base leading-relaxed text-[#33443B]">
        {card.description}
      </p>
      <span className="mt-8 inline-flex items-center gap-2 border-t border-[#6D896E]/25 pt-5 text-sm font-semibold text-[#0F1713] transition-colors duration-200 group-hover:text-[#6D896E]">
        Explore capability
        <ArrowUpRight
          className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </div>
  </a>
);

const capabilitySlides = capabilities.map((card) => <CapabilityFace key={card.id} card={card} />);

const marqueeRibbon =
  "INTELLIGENT SYSTEMS • SEAMLESS EXECUTION • BUILT FOR SCALE • ";
const marqueeText = marqueeRibbon.repeat(6);

interface Operator {
  name: string;
  role: string;
  photo: string;
  linkedin: string;
  focus: string;
}

const team: Operator[] = [
  {
    name: "Alex Cutajar",
    role: "CO-FOUNDER",
    photo:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310519663078146555/IihzdnaSZSRuFkSo.webp",
    linkedin: "https://www.linkedin.com/in/alex-cutajar/",
    focus:
      "A decade running SMB and FMCG businesses proved that operators make weekly million-dollar decisions without live data. He leads product, architecture, and the predictive AI systems powering every PresciaIQ vertical.",
  },
  {
    name: "Macauley Burke",
    role: "CO-FOUNDER",
    photo:
      "https://files.manuscdn.com/user_upload_by_module/session_file/310519663078146555/yxiDEixgZXyqOgLt.JPG",
    linkedin: "https://www.linkedin.com/in/macauley-burke/",
    focus:
      "Seven years scaling direct B2B revenue across Australian enterprises demonstrated where operators leak time and capital. He leads commercial partnerships, distribution, and customer telemetry.",
  },
];

const WhySection = () => {
  const [isThesisOpen, setIsThesisOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const marqueeRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [activeCapability, setActiveCapability] = useState(0);
  // Explicit loop targets: Swiper's slideNext() skips a card on its first call
  // in loop mode with the cards effect.
  const stepCapability = (step: number) => {
    const swiper = swiperRef.current;
    if (!swiper) return;
    swiper.slideToLoop((swiper.realIndex + step + capabilities.length) % capabilities.length);
  };

  const foundersRef = useRef<HTMLDivElement>(null);
  const founderCardRefs = useRef<(HTMLElement | null)[]>([]);

  // Ribbon drift synchronization
  useEffect(() => {
    const container = marqueeRef.current;
    if (!container) return;

    let visible = false;
    const sync = () => {
      container.dataset.drifting = visible && !document.hidden ? "true" : "false";
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(container);
    document.addEventListener("visibilitychange", sync);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  // The capabilities block rises into place as it scrolls into view.
  useEffect(() => {
    const deck = deckRef.current;
    if (!deck || prefersReducedMotion) return;

    const tween = gsap.fromTo(
      deck,
      { y: 56, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.9,
        ease: "power3.out",
        clearProps: "transform,opacity,visibility",
        scrollTrigger: { trigger: deck, start: "top 82%", once: true },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [prefersReducedMotion]);

  // Founder cards slide in from their own side together as the section
  // arrives; the section clips them horizontally so nothing adds a scrollbar.
  // Inline styles are cleared afterwards, leaving the hover drawer and photo
  // zoom to their CSS.
  useEffect(() => {
    const section = foundersRef.current;
    if (!section || prefersReducedMotion) return;

    const cards = founderCardRefs.current.filter((card): card is HTMLElement => card !== null);
    const context = gsap.context(() => {
      gsap.fromTo(
        cards,
        { x: (i: number) => (i === 0 ? -80 : 80), autoAlpha: 0, willChange: "transform, opacity" },
        {
          x: 0,
          autoAlpha: 1,
          duration: 1,
          ease: "power3.out",
          force3D: true,
          clearProps: "transform,opacity,visibility,willChange",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
          },
        },
      );
    }, section);

    return () => context.revert();
  }, [prefersReducedMotion]);

  // Thesis modal escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsThesisOpen(false);
      }
    };
    if (isThesisOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isThesisOpen]);

  return (
    <section id="intelligence" className="relative w-full overflow-x-clip bg-white">
      {/* Scoped Keyframes and Animations */}
      <style>{`
        @keyframes whyMarqueeDrift {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-3200px, 0, 0); }
        }
        .why-marquee,
        .why-marquee-drift {
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
        }
        .why-marquee-drift {
          animation: whyMarqueeDrift 18s linear infinite;
        }
        .why-marquee[data-drifting="false"] .why-marquee-drift {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .why-marquee-drift { animation: none; }
        }
      `}</style>

      {/* ─────────────────────────────────────────────────────────────
          Part 1: Marquee Ribbon
         ───────────────────────────────────────────────────────────── */}
      <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-visible pt-20 pb-8 md:pt-28">
        <div
          ref={marqueeRef}
          data-drifting="false"
          className="why-marquee relative h-[140px] w-full overflow-visible pointer-events-none md:h-[180px]"
        >
          <svg
            className="block h-full w-full"
            viewBox="-400 -40 2400 500"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <path
                id="curvePath"
                d="M -800,215 Q 0,5 800,215 Q 1600,425 2400,215 Q 3200,5 4000,215 Q 4800,425 5600,215 Q 6400,5 7200,215 Q 8000,425 8800,215"
                fill="none"
              />
            </defs>
            <g className="why-marquee-drift">
              <text className="fill-black text-6xl font-sans font-extrabold tracking-wider md:text-8xl">
                <textPath href="#curvePath" startOffset="0">
                  {marqueeText}
                </textPath>
              </text>
            </g>
          </svg>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          Part 2: Full-Stack Capabilities grid
         ───────────────────────────────────────────────────────────── */}
      <div
        className="relative w-full bg-white px-4 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24 flex flex-col justify-center overflow-visible"
      >
        {/* Subtle Ambient Mint Glow in Background */}
        <div
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute left-1/2 top-1/2 h-[650px] w-[850px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/[0.04] blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl flex flex-col justify-center overflow-visible">
          {/* Clean Minimalist Header: Heading and Right-Aligned Thesis Trigger */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 sm:mb-12 w-full">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.1]">
              Full-Stack Capabilities
            </h2>

            {/* Read Strategy Thesis Button */}
            <button
              type="button"
              onClick={() => setIsThesisOpen(true)}
              className="group/btn inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full border border-neutral-300 bg-white/80 px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-neutral-800 backdrop-blur-sm transition-all duration-300 hover:border-[#6D896E] hover:text-[#6D896E] hover:shadow-[0_4px_16px_rgba(109,137,110,0.15)] dark:border-neutral-700 dark:bg-neutral-900/80 dark:text-neutral-200"
            >
              <span>Read Strategy Thesis</span>
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1"
                aria-hidden="true"
              />
            </button>
          </div>

          {/* Card-swap deck: an index on the left drives it on desktop;
              drag, the arrows or the keyboard swap cards everywhere. */}
          <div
            ref={deckRef}
            className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16"
          >
            <ol className="hidden lg:block">
              {capabilities.map((card, i) => {
                const active = i === activeCapability;
                return (
                  <li key={card.id} className="border-b border-neutral-200 first:border-t">
                    <button
                      type="button"
                      onClick={() => swiperRef.current?.slideToLoop(i)}
                      aria-current={active ? "true" : undefined}
                      className={`group my-2 flex w-full cursor-pointer items-center gap-3 rounded-r-xl border-l-4 py-2.5 pl-4 pr-4 text-left transition-colors duration-300 ${
                        active ? "border-[#6D896E] bg-[#EEF3EE]" : "border-transparent hover:bg-neutral-100"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full transition-[transform,background-color] duration-300 ${
                          active ? "scale-125 bg-[#6D896E]" : "bg-neutral-300 dark:bg-neutral-700"
                        }`}
                      />
                      <span
                        className={`font-serif text-2xl tracking-[-0.015em] transition-colors duration-300 xl:text-[1.7rem] ${
                          active ? "font-bold text-[#0F1713]" : "font-semibold text-neutral-400 group-hover:text-neutral-700"
                        }`}
                      >
                        {card.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <div className="flex flex-col items-center">
              <Carousel_002
                slides={capabilitySlides}
                className="max-w-none"
                deckClassName="h-[440px] w-[300px] sm:h-[480px] sm:w-[380px] xl:h-[520px] xl:w-[420px]"
                slideClassName="rounded-3xl"
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                onSlideChange={setActiveCapability}
              />
              <div className="mt-2 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => stepCapability(-1)}
                  aria-label="Previous capability"
                  className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 transition-colors hover:border-neutral-400 hover:text-neutral-900"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                </button>
                <span
                  className="min-w-[4.5rem] text-center font-sans text-xs font-semibold tabular-nums tracking-wider text-neutral-600 sm:text-sm dark:text-neutral-400"
                  aria-live="polite"
                >
                  <span className="text-[#0F1713] dark:text-neutral-200">{pad(activeCapability + 1)}</span>
                  <span className="mx-1.5 text-neutral-400">/</span>
                  {pad(capabilities.length)}
                </span>
                <button
                  type="button"
                  onClick={() => stepCapability(1)}
                  aria-label="Next capability"
                  className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 transition-colors hover:border-neutral-400 hover:text-neutral-900"
                >
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          Part 3: "The Operators Behind PresciaIQ" (Founders Section)
         ───────────────────────────────────────────────────────────── */}
      <div ref={foundersRef} className="relative w-full overflow-x-clip bg-white pt-16 sm:pt-20">
        <div className="mx-auto w-full max-w-5xl px-4 pb-20 text-left sm:px-8 sm:pb-24 lg:px-0">
          <div className="max-w-3xl mb-10 sm:mb-14">
            <h3 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900 mb-4 leading-[1.08]">
              The Operators Behind PresciaIQ
            </h3>
          </div>

          {/* Full-bleed portraits; the bio drawer opens on hover or keyboard
              focus, and stays open on touch screens, which have no hover. */}
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
            {team.map((founder, index) => (
              <article
                key={founder.name}
                ref={(element) => {
                  founderCardRefs.current[index] = element;
                }}
                className="group relative isolate h-[520px] overflow-hidden rounded-3xl bg-neutral-900"
              >
                <img
                  src={founder.photo}
                  alt={founder.name}
                  className="absolute inset-0 -z-10 h-full w-full object-cover object-top transition-transform duration-700 ease-out will-change-transform group-hover:scale-105 group-focus-within:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
                />

                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                  <h4 className="font-serif text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    {founder.name}
                  </h4>
                  <p className="mt-1 font-mono text-xs font-semibold uppercase tracking-widest text-[#6D896E]">
                    {founder.role}
                  </p>

                  {/* Grid rows 0fr -> 1fr animate the drawer to its exact height
                      (a max-height cap overshoots and lags on the way out);
                      height, fade and lift share one 250ms transition, no delay. */}
                  <div className="pointer-events-none grid translate-y-3 grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity,transform] delay-0 duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] will-change-[transform,opacity] group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:grid-rows-[1fr] group-focus-within:opacity-100 [@media(hover:none)]:pointer-events-auto [@media(hover:none)]:translate-y-0 [@media(hover:none)]:grid-rows-[1fr] [@media(hover:none)]:opacity-100">
                    <div className="min-h-0 overflow-hidden">
                      <div className="mt-3 rounded-2xl border border-white/10 bg-black/60 p-6 backdrop-blur-md">
                        <p className="text-sm leading-relaxed text-neutral-200">{founder.focus}</p>
                        <a
                          href={founder.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Connect with ${founder.name} on LinkedIn`}
                          className="mt-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#6D896E] transition-colors hover:text-white"
                        >
                          Connect on LinkedIn
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                    </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* ── Obsidian Thesis Modal ── */}
      {isThesisOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="thesis-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setIsThesisOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[#0D1114] p-8 text-left text-white shadow-[0_32px_80px_rgba(0,0,0,0.6)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* A whisper of brand olive from the top-right corner. */}
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(109,137,110,0.15),transparent_70%)]"
              aria-hidden="true"
            />

            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 mb-6 relative z-10">
              <h3
                id="thesis-modal-title"
                className="font-serif text-2xl leading-tight tracking-tight text-white sm:text-3xl"
              >
                Intelligent Systems Thesis
              </h3>

              <button
                type="button"
                onClick={() => setIsThesisOpen(false)}
                aria-label="Close modal"
                className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-400 transition-all hover:border-[#6D896E]/50 hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {/* Modal Content - Full Detailed Thesis */}
            <div className="relative z-10 max-h-[60vh] space-y-4 overflow-y-auto pr-2 font-sans text-sm leading-relaxed text-neutral-300 sm:text-base">
              <p className="font-medium text-white">
                Every business in Australia pays an unnecessary tax in operational friction, disconnected software, and latency.
              </p>
              <p>
                It is the marketing budget misallocated without predictive conversion modeling. The project that slips weeks because field data was trapped in silos. The engineering team rebuilding boilerplate instead of deploying high-performance digital platforms.
              </p>
              <p>
                We engineer <span className="font-semibold text-white">Intelligent Systems</span> designed for seamless execution and built for scale. From high-speed web and native app architectures to robust operational automation and Daynori, our infrastructure gives Australian enterprises the velocity required to scale with certainty.
              </p>
              <p>
                Australian SMB and mid-market operators deserve enterprise-grade software built specifically for Australian conditions, engineered with zero compromise.
              </p>
            </div>

            {/* Modal Footer */}
            <div className="mt-6 pt-4 border-t border-white/5 flex justify-end relative z-10">
              <button
                type="button"
                onClick={() => setIsThesisOpen(false)}
                className="cursor-pointer rounded-full bg-[#6D896E] px-6 py-2.5 text-sm font-medium text-[#050806] shadow-sm transition-colors hover:bg-[#5f7a60]"
              >
                Close Thesis
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default WhySection;
