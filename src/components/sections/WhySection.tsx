import { useState, useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { Globe, LineChart, ShieldCheck, Smartphone } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

interface CapabilityCard {
  id: string;
  title: string;
  // Two lines at card width; keep it under ~110 characters.
  description: string;
  href: string;
  // Side the card travels in from in the 3-column layout, matching its column.
  enter: "left" | "bottom" | "right";
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

// Custom marks for the two capabilities Lucide has no fitting icon for. They
// share Lucide's 24px grid so they sit alongside the library icons.
const customIconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// n8n-style workflow: three chained nodes branching to a fourth
const N8nIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...customIconProps} {...props}>
    <rect x="2" y="5" width="4" height="4" rx="1" />
    <rect x="10" y="5" width="4" height="4" rx="1" />
    <rect x="18" y="5" width="4" height="4" rx="1" />
    <rect x="10" y="15" width="4" height="4" rx="1" />
    <path d="M6 7h4" />
    <path d="M14 7h4" />
    <path d="M12 9v6" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

// Ship's helm: rim, hub and eight spoke handles
const HelmIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...customIconProps} {...props}>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="3" />
    <line x1="12" y1="1" x2="12" y2="4" />
    <line x1="12" y1="20" x2="12" y2="23" />
    <line x1="1" y1="12" x2="4" y2="12" />
    <line x1="20" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
    <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
    <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
    <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
  </svg>
);

const capabilities: CapabilityCard[] = [
  {
    id: "web-aeo",
    title: "Websites + SEO / AEO",
    description:
      "Sub-second platforms built to win search and answer engines, without ad spend.",
    href: "/services/aeo-seo-predictive-search-architecture/",
    enter: "left",
    icon: Globe,
  },
  {
    id: "mobile-software",
    title: "Mobile Apps + Custom Software",
    description:
      "Native iOS, Android and web apps, offline-first and synced across your workforce.",
    href: "/services/ai-app-development/",
    enter: "bottom",
    icon: Smartphone,
  },
  {
    id: "workflow-automation",
    title: "Workflow Automation + Integration",
    description:
      "ERP, CRM and pipelines connected end to end. Manual data entry disappears.",
    href: "/products/ai-automations/",
    enter: "right",
    icon: N8nIcon,
  },
  {
    id: "helm-os",
    title: "HELM OS Operational Backbone",
    description:
      "One live command layer for leadership, project managers and frontline teams.",
    href: "/services/ai-software-development/",
    enter: "left",
    icon: HelmIcon,
  },
  {
    id: "predictive-analytics",
    title: "Predictive Analytics + Forecasting",
    description:
      "Validated forecasts that flag schedule and cost variances before spend occurs.",
    href: "https://buildpredictiq.com.au/",
    enter: "bottom",
    icon: LineChart,
  },
  {
    id: "cloud-security",
    title: "Cloud Infrastructure + Security",
    description:
      "Australian-hosted, zero-trust architecture built to data sovereignty and compliance standards.",
    href: "/services/ai-software-development/",
    enter: "right",
    icon: ShieldCheck,
  },
];

// GSAP start offsets for each entrance direction.
const enterFrom = {
  left: { x: -70, y: 0 },
  bottom: { x: 0, y: 70 },
  right: { x: 70, y: 0 },
};

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
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const founderGridRef = useRef<HTMLDivElement>(null);
  const founderCardRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  // Capability cards enter from their column's side as the grid scrolls into
  // view: outer columns slide in, the centre column rises. Below xl the grid
  // isn't three columns, so every card rises. The CSS transition is suspended
  // during the tween (it would smear GSAP's per-frame transforms), then inline
  // styles are cleared so the CSS hover lift takes over.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || prefersReducedMotion) return;

    const cards = cardRefs.current.filter((card): card is HTMLAnchorElement => card !== null);
    const mm = gsap.matchMedia(grid);
    mm.add(
      { threeColumn: "(min-width: 1280px)", stacked: "(max-width: 1279.98px)" },
      (context) => {
        const { threeColumn } = context.conditions as { threeColumn: boolean };
        gsap.fromTo(
          cards,
          {
            x: (i: number) => (threeColumn ? enterFrom[capabilities[i].enter].x : 0),
            y: (i: number) => (threeColumn ? enterFrom[capabilities[i].enter].y : 70),
            autoAlpha: 0,
            transition: "none",
          },
          {
            x: 0,
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            force3D: true,
            clearProps: "transform,opacity,visibility,transition",
            scrollTrigger: {
              trigger: grid,
              start: "top 82%",
              once: true,
            },
          },
        );
      },
    );

    return () => mm.revert();
  }, [prefersReducedMotion]);

  // Founders cards reveal animation
  useEffect(() => {
    const grid = founderGridRef.current;
    if (!grid || prefersReducedMotion) return;

    const cards = founderCardRefs.current.filter((card): card is HTMLDivElement => card !== null);
    const context = gsap.context(() => {
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 40, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            delay: index * 0.15,
            duration: 0.8,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility",
            scrollTrigger: {
              trigger: grid,
              start: "top 78%",
              once: true,
            },
          },
        );
      });
    }, grid);

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
              className="group/btn inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-2 text-xs font-mono text-neutral-700 shadow-sm transition-all duration-300 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-800"
            >
              <span>Read Strategy Thesis</span>
              <span className="font-semibold text-emerald-600 transition-transform duration-200 group-hover/btn:translate-x-1">
                &rarr;
              </span>
            </button>
          </div>

          {/* 3-Column x 2-Row Responsive Cards Grid */}
          <div
            ref={gridRef}
            className="grid w-full grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            {capabilities.map((card, idx) => (
              <a
                key={card.id}
                href={card.href}
                {...(card.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                className="group relative flex transform-gpu flex-col gap-6 rounded-2xl border border-neutral-200 bg-white/70 p-7 shadow-[0_1px_2px_rgba(10,15,13,0.04),0_8px_24px_-16px_rgba(10,15,13,0.12)] backdrop-blur-md transition-all duration-300 will-change-transform hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-[0_1px_2px_rgba(10,15,13,0.04),0_22px_44px_-20px_rgba(16,185,129,0.28)] sm:p-8 dark:border-white/10 dark:bg-white/[0.04]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-800 transition-colors duration-200 group-hover:text-emerald-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-200">
                  <card.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-xl font-semibold leading-[1.2] tracking-[-0.015em] text-neutral-900">
                    {card.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-neutral-600 sm:text-[15px]">
                    {card.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          Part 3: "The Operators Behind PresciaIQ" (Founders Section)
         ───────────────────────────────────────────────────────────── */}
      <div className="relative w-full bg-white pt-16 sm:pt-20">
        <div className="mx-auto w-full max-w-[1520px] px-4 pb-20 text-left sm:px-8 sm:pb-24 lg:px-12">
          <div className="max-w-3xl mb-10 sm:mb-14">
            <h3 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900 mb-4 leading-[1.08]">
              The Operators Behind PresciaIQ
            </h3>
          </div>

          <div
            ref={founderGridRef}
            className="grid w-full grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2"
          >
            {team.map((founder, index) => (
              <div
                key={founder.name}
                ref={(element) => {
                  founderCardRefs.current[index] = element;
                }}
                className="flex h-full min-h-[320px] flex-col gap-6 overflow-hidden rounded-3xl border border-neutral-200/90 bg-white p-7 text-neutral-900 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-neutral-300 hover:shadow-2xl hover:shadow-neutral-900/5 md:flex-row md:p-8"
              >
                <div className="group/portrait relative h-[220px] w-[170px] shrink-0 overflow-hidden rounded-2xl bg-neutral-100 border border-neutral-200 ring-1 ring-emerald-600/20 shadow-sm">
                  <div className="absolute inset-0">
                    <img
                      src={founder.photo}
                      alt={founder.name}
                      className="h-full w-full object-cover object-top transition-transform duration-[400ms] group-hover/portrait:scale-[1.025]"
                    />
                  </div>
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-between text-left">
                  <div>
                    <h4 className="text-2xl font-sans font-bold tracking-tight text-neutral-900 md:text-3xl">
                      {founder.name}
                    </h4>
                    <span className="mt-1.5 w-fit rounded-full border border-neutral-200/80 bg-neutral-100 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-widest text-neutral-600">
                      {founder.role}
                    </span>
                    <p className="mt-4 text-sm leading-relaxed text-neutral-600 md:text-base">
                      {founder.focus}
                    </p>
                  </div>
                  <div className="mt-auto pt-4">
                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Connect with ${founder.name} on LinkedIn`}
                      className="group/link -ml-3 mt-6 inline-flex w-fit items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-neutral-700 transition-all hover:bg-neutral-100 hover:text-emerald-600"
                    >
                      Connect on LinkedIn
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M19 3A2 2 0 0 1 21 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14ZM8.34 18V9.67H5.57V18h2.77ZM6.96 8.53a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2ZM18 18v-4.56c0-2.44-1.3-3.58-3.04-3.58a2.63 2.63 0 0 0-2.37 1.3V9.67H9.82V18h2.77v-4.12c0-1.09.21-2.15 1.56-2.15 1.33 0 1.35 1.25 1.35 2.22V18H18Z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md transition-all duration-300 animate-in fade-in"
          onClick={() => setIsThesisOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#0D1210]/95 p-8 text-left text-white shadow-2xl backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient Background Glow inside Modal */}
            <div
              className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-emerald-500/10 blur-[80px]"
              aria-hidden="true"
            />

            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 mb-6 relative z-10">
              <h3
                id="thesis-modal-title"
                className="text-2xl font-sans font-bold leading-tight tracking-tight text-white sm:text-3xl"
              >
                Intelligent Systems Thesis
              </h3>

              <button
                type="button"
                onClick={() => setIsThesisOpen(false)}
                aria-label="Close modal"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Content - Full Detailed Thesis */}
            <div className="relative z-10 max-h-[60vh] space-y-5 overflow-y-auto pr-2 text-[15px] leading-7 text-neutral-300">
              <p className="text-base font-medium leading-7 text-white">
                Every business in Australia pays an unnecessary tax in operational friction, disconnected software, and latency.
              </p>
              <p className="text-neutral-400">
                It is the marketing budget misallocated without predictive conversion modeling. The project that slips weeks because field data was trapped in silos. The engineering team rebuilding boilerplate instead of deploying high-performance digital platforms.
              </p>
              <p className="text-neutral-400">
                We engineer <span className="text-white font-semibold">Intelligent Systems</span> designed for seamless execution and built for scale. From high-speed web and native app architectures to robust operational automation and HELM OS, our infrastructure gives Australian enterprises the velocity required to scale with certainty.
              </p>
              <p className="text-neutral-400">
                Australian SMB and mid-market operators deserve enterprise-grade software built specifically for Australian conditions, engineered with zero compromise.
              </p>
            </div>

            {/* Modal Footer */}
            <div className="mt-6 pt-4 border-t border-white/5 flex justify-end relative z-10">
              <button
                type="button"
                onClick={() => setIsThesisOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-neutral-300 hover:text-white transition-colors cursor-pointer"
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
