import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ProjectPlatform {
  id: string;
  name: string;
  tagline: string;
  video: string;
  // Portrait footage sits in a device frame instead of a browser window.
  portrait?: boolean;
  href: string;
  ctaText: string;
  isExternal: boolean;
}

const platforms: ProjectPlatform[] = [
  {
    id: "vale-tudo",
    name: "Vale Tudo Training",
    tagline:
      "Martial arts training platform built for search from day one, with a structured web architecture that captures local and national training queries.",
    video: "/videos/vt.mp4",
    href: "https://valetraining.com.au",
    ctaText: "View Live Platform",
    isExternal: true,
  },
  {
    id: "hypertint",
    name: "Hypertint",
    tagline:
      "Local search architecture for an Australian window tinting specialist: multi-location pages and LocalBusiness schema built to win high-intent queries.",
    video: "/videos/hypertint.mp4",
    href: "https://hypertint.com.au",
    ctaText: "View Live Platform",
    isExternal: true,
  },
  {
    id: "adsiq",
    name: "AdsIQ",
    tagline:
      "Predictive ROAS and campaign intelligence for Australian advertisers, forecasting campaign performance before a single dollar is spent.",
    video: "/videos/adsiq.mp4",
    href: "https://adsiq.com.au/",
    ctaText: "View Live Platform",
    isExternal: true,
  },
  {
    id: "presciaiq",
    name: "PresciaIQ",
    tagline:
      "Our own platform: a high-speed web architecture engineered for answer engines and programmatic search across Australian markets.",
    video: "/videos/presciaiq.mp4",
    href: "/",
    ctaText: "Explore the Platform",
    isExternal: false,
  },
  {
    id: "helm-os",
    name: "HELM OS",
    tagline:
      "Centralized enterprise operational cockpit uniting team task routing, live resource telemetry, and delivery orchestration under a single pane of glass.",
    video: "/videos/helm.mp4",
    portrait: true,
    href: "/services/ai-software-development/",
    ctaText: "Explore HELM OS",
    isExternal: false,
  },
];

// The coordinate dot grid from the Core Pillars HELM OS slide, with its
// radial falloff into the dark.
const DOT_MATRIX = {
  backgroundImage: "radial-gradient(circle, rgba(255, 255, 255, 0.32) 1.25px, transparent 1.5px)",
  backgroundSize: "24px 24px",
  backgroundPosition: "center",
  maskImage: "radial-gradient(ellipse 70% 65% at center, black 45%, transparent 100%)",
  WebkitMaskImage: "radial-gradient(ellipse 70% 65% at center, black 45%, transparent 100%)",
  transform: "translate3d(0, 0, 0)",
} as const;

// GSAP "power2.out" expressed as a cubic-bezier for framer-motion.
const POWER2_OUT = [0.5, 1, 0.89, 1] as const;

interface AppBuildingSectionProps {
  hideHeader?: boolean;
  // The Groundbreakers case study after the track; the homepage leaves it out.
  showCaseStudy?: boolean;
}

/**
 * Horizontal pinned showcase, built like the Core Pillars track: a tall block
 * holds a sticky full-screen frame and vertical scroll slides the project
 * panels sideways. The frame unsticks after the last panel, and the
 * Groundbreakers case study follows in normal flow on the same black ground.
 */
const AppBuildingSection = ({ hideHeader = false, showCaseStudy = true }: AppBuildingSectionProps) => {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const panels = platforms.length + (hideHeader ? 0 : 1);

  useEffect(() => {
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track) return;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        xPercent: (-100 * (panels - 1)) / panels,
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) progressRef.current.style.transform = `scaleX(${self.progress})`;
            // Keep the next panel's clip one step ahead of the track.
            attachUpTo(self.progress * (panels - 1) + 1);
          },
        },
      });
    }, pin);

    // Footage (~80MB in all) is attached panel by panel as the track nears it,
    // so nothing competes with the hero, and each clip plays only while on
    // screen. Off-screen panels are clipped by the frame, so they never count
    // as visible.
    const firstProjectPanel = hideHeader ? 0 : 1;
    const visible = new Set<HTMLVideoElement>();
    function attachUpTo(panel: number) {
      videoRefs.current.forEach((video, i) => {
        if (!video || video.src || !video.dataset.src || i + firstProjectPanel > panel) return;
        video.src = video.dataset.src;
        // autoPlay would also start clips that load while still off screen.
        video.addEventListener("playing", () => {
          if (!visible.has(video)) video.pause();
        });
      });
    }
    const loader = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        attachUpTo(firstProjectPanel);
        loader.disconnect();
      },
      { rootMargin: "100% 0px" },
    );
    loader.observe(pin);
    const player = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            visible.add(video);
            video.play().catch(() => {});
          } else {
            visible.delete(video);
            video.pause();
          }
        }),
      { threshold: 0.15 },
    );
    videoRefs.current.forEach((video) => video && player.observe(video));

    const refresh = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(refresh);
      loader.disconnect();
      player.disconnect();
      ctx.revert();
    };
  }, [panels, hideHeader]);

  return (
    <section id="development-services" className="relative w-full bg-[#050807]">
      {/* Scoped CSS keyframes for the starfield */}
      <style>{`
        @keyframes starTwinkle1 {
          0%, 100% { opacity: 0.3; transform: scale(0.85); }
          50% { opacity: 0.9; transform: scale(1.2); }
        }
        @keyframes starTwinkle2 {
          0%, 100% { opacity: 0.2; transform: scale(0.9); }
          50% { opacity: 0.85; transform: scale(1.25); }
        }
        @keyframes starTwinkle3 {
          0%, 100% { opacity: 0.4; transform: scale(0.95); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        .star-twinkle-1 { animation: starTwinkle1 3.8s ease-in-out infinite; }
        .star-twinkle-2 { animation: starTwinkle2 4.5s ease-in-out infinite 0.8s; }
        .star-twinkle-3 { animation: starTwinkle3 5.2s ease-in-out infinite 1.5s; }
      `}</style>

      <div ref={pinRef} className="relative w-full" style={{ height: `${panels * 100}vh` }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Backdrop stays put with the frame, so only the cards travel. */}
          <div
            className="pointer-events-none absolute inset-0 z-0"
            aria-hidden="true"
            style={{
              background: "radial-gradient(ellipse 75% 65% at 50% 45%, rgba(109, 137, 110, 0.07), transparent 75%)",
            }}
          />
          <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true" style={DOT_MATRIX} />
          {/* ── Ultra-fine Stardust Grid Dots (Mooni Continuity) ── */}
          <div
            className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
            aria-hidden="true"
            style={{ willChange: "transform", transform: "translate3d(0, 0, 0)", backfaceVisibility: "hidden" }}
          >
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10%" cy="18%" r="1" fill="#ffffff" opacity="0.35" />
              <circle cx="18%" cy="38%" r="1.5" fill="#00F5A0" opacity="0.65" className="star-twinkle-1" />
              <circle cx="26%" cy="14%" r="1.2" fill="#ffffff" opacity="0.45" />
              <circle cx="34%" cy="62%" r="1" fill="#00F5A0" opacity="0.35" />
              <circle cx="44%" cy="26%" r="1.8" fill="#ffffff" opacity="0.6" className="star-twinkle-2" />
              <circle cx="52%" cy="12%" r="1" fill="#00F5A0" opacity="0.35" />
              <circle cx="60%" cy="44%" r="1.2" fill="#ffffff" opacity="0.5" />
              <circle cx="70%" cy="20%" r="1.5" fill="#00F5A0" opacity="0.6" className="star-twinkle-1" />
              <circle cx="80%" cy="52%" r="1" fill="#ffffff" opacity="0.4" />
              <circle cx="88%" cy="24%" r="2" fill="#00F5A0" opacity="0.7" className="star-twinkle-3" />
              <circle cx="94%" cy="40%" r="1.2" fill="#ffffff" opacity="0.45" />
              <circle cx="8%" cy="72%" r="1.4" fill="#ffffff" opacity="0.4" />
              <circle cx="20%" cy="86%" r="1" fill="#00F5A0" opacity="0.35" />
              <circle cx="30%" cy="80%" r="1.8" fill="#00F5A0" opacity="0.5" className="star-twinkle-2" />
              <circle cx="78%" cy="76%" r="1.2" fill="#ffffff" opacity="0.4" />
              <circle cx="88%" cy="82%" r="1.5" fill="#00F5A0" opacity="0.6" className="star-twinkle-3" />
            </svg>
          </div>

          <div
            ref={trackRef}
            className="relative z-10 flex h-full will-change-transform [transform:translate3d(0,0,0)] [backface-visibility:hidden]"
            style={{ width: `${panels * 100}vw` }}
          >
            {!hideHeader && (
              <div className="flex h-full shrink-0 items-center justify-center px-6" style={{ flex: "0 0 100vw" }}>
                {/* Set in the display serif, like the hero, with a lighter italic
                    ampersand given its own room. */}
                <h2 className="max-w-5xl text-center font-display text-4xl font-semibold leading-[1.04] tracking-[-0.035em] text-cream sm:text-6xl lg:text-7xl">
                  Web Apps
                  <span className="mx-[0.22em] inline-block align-[0.02em] font-normal italic text-[0.92em] text-white/55">&amp;</span>
                  <br className="hidden sm:block" />
                  <span
                    style={{
                      backgroundImage: "linear-gradient(135deg, #ffffff 0%, #a3ffd6 45%, #00F5A0 80%, #10B981 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    High-Performance Platforms
                  </span>
                </h2>
              </div>
            )}

            {platforms.map((p, index) => (
              <article
                key={p.id}
                id={`project-${p.id}`}
                className="flex h-full shrink-0 items-center justify-center px-5 pt-20 pb-12 sm:px-10"
                style={{ flex: "0 0 100vw" }}
              >
                <div
                  className={
                    p.portrait
                      ? "flex w-full max-w-5xl flex-col items-center justify-center gap-6 sm:gap-8 lg:flex-row lg:gap-20"
                      : "grid w-full max-w-7xl items-center gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.1fr)] lg:gap-14"
                  }
                >
                  <div className={`flex flex-col gap-4 lg:gap-5 ${p.portrait ? "items-center text-center lg:max-w-sm lg:items-start lg:text-left" : ""}`}>
                    <h3 className="font-sans text-3xl font-semibold leading-[1.05] tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
                      {p.name}
                    </h3>
                    <p className="max-w-md font-sans text-sm leading-relaxed text-neutral-300/90 sm:text-base">{p.tagline}</p>
                    <a
                      href={p.href}
                      {...(p.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group/btn relative isolate mt-1 inline-flex w-fit items-center gap-2 overflow-hidden rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 ease-out will-change-transform hover:-translate-y-0.5 hover:scale-[1.02] hover:border-emerald-400/50 hover:bg-white/[0.08]"
                    >
                      {/* Light streak that crosses the glass on hover. */}
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-2/3 -translate-x-[160%] skew-x-[-20deg] transition-transform duration-[600ms] ease-out will-change-transform group-hover/btn:translate-x-[260%]"
                        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)" }}
                      />
                      {p.ctaText}
                      <ArrowUpRight className="h-4 w-4 text-emerald-400 transition-transform duration-200 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                    </a>
                  </div>

                  {/* Frames are sized by aspect ratio before the video loads, so
                      nothing shifts when it does. */}
                  {p.portrait ? (
                    <div className="relative aspect-[9/16] h-[calc(100svh-400px)] shrink-0 rounded-[2.75rem] border border-white/10 bg-[#0b100d] p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_70px_-25px_rgba(0,245,160,0.18)] lg:h-[min(calc(100vh-170px),820px)]">
                      {/* Edge highlight along the bezel */}
                      <div className="pointer-events-none absolute inset-0 rounded-[2.75rem] ring-1 ring-inset ring-white/[0.06]" aria-hidden="true" />
                      <div className="relative h-full w-full overflow-hidden rounded-[2.2rem] bg-black">
                        <video
                          ref={(el) => {
                            videoRefs.current[index] = el;
                          }}
                          data-src={p.video}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="none"
                          aria-label={`${p.name} platform walkthrough`}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  ) : (
                    <div
                      className="relative mx-auto w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-black/80"
                      style={{ maxWidth: "calc((100vh - 220px) * 1.778)" }}
                    >
                      <div className="relative aspect-video w-full">
                        <video
                          ref={(el) => {
                            videoRefs.current[index] = el;
                          }}
                          data-src={p.video}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="none"
                          aria-label={`${p.name} platform walkthrough`}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* Scroll-linked progress hairline */}
          <div className="pointer-events-none absolute inset-x-0 bottom-6 z-20 flex justify-center" aria-hidden="true">
            <span className="relative block h-px w-40 overflow-hidden bg-white/15 sm:w-56">
              <span
                ref={progressRef}
                className="absolute inset-0 origin-left scale-x-0 bg-emerald-400 will-change-transform"
              />
            </span>
          </div>
        </div>
      </div>

      {showCaseStudy && (
        <>
        {/* ══════════════════════════════════════════════════════════════
            DEDICATED CASE STUDY BLOCK: GROUNDBREAKERS
           ══════════════════════════════════════════════════════════════ */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0"
          aria-hidden="true"
          style={{
            ...DOT_MATRIX,
            top: `${panels * 100}vh`,
            maskImage: "linear-gradient(to bottom, transparent, black 15%, black 70%, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent, black 15%, black 70%, transparent)",
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
          <div id="groundbreakers-case-study" className="pt-16 lg:pt-20 border-t border-white/[0.08] relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: POWER2_OUT }}
              className="flex flex-col gap-10"
            >
              {/* Header: Client Brand & Headline */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[#00F5A0] text-xs font-mono uppercase tracking-widest mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00F5A0]" />
                    <span>Client Case Study // Civil &amp; Plant Fleet</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1]">
                    Groundbreakers: Transforming Fleet Dispatch &amp; Safety Compliance
                  </h3>
                  <p className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed font-sans">
                    Groundbreakers is a premier civil contractor and plant hire operator across NSW. PresciaIQ replaced disconnected spreadsheets, paper pre-starts, and manual phone dispatch with an integrated digital fleet operating system delivering instant compliance and real-time operational visibility.
                  </p>
                </div>
  
                <div className="shrink-0">
                  <a
                    href="/insights/case-studies/groundbreakers/"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/15 bg-white/[0.04] text-white hover:bg-emerald-500 hover:text-black hover:border-emerald-500 transition-all text-xs font-mono font-semibold uppercase tracking-wider group/link"
                  >
                    <span>Read Full Case Study</span>
                    <span className="transition-transform group-hover/link:translate-x-1">→</span>
                  </a>
                </div>
              </div>
  
              {/* 4 Measurable Impact Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {[
                  {
                    stat: "42%",
                    label: "Faster Hire Turnaround",
                    detail: "Quoting to contract execution reduced from 4 hours to under 25 minutes",
                  },
                  {
                    stat: "100%",
                    label: "Digital Compliance",
                    detail: "Zero paper SWMS; daily pre-starts verified on active tier-1 civil sites",
                  },
                  {
                    stat: "$210K",
                    label: "Annual Cost Savings",
                    detail: "Eliminated double-handling, dispatch errors, and unbilled machine idle time",
                  },
                  {
                    stat: "68+",
                    label: "Connected Assets",
                    detail: "Heavy plant fleet streaming live GPS telematics and service alerts",
                  },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 backdrop-blur-md hover:border-emerald-500/30 transition-colors"
                  >
                    <p className="text-3xl sm:text-4xl font-bold font-mono text-[#00F5A0] tracking-tight mb-1">
                      {m.stat}
                    </p>
                    <p className="text-sm font-semibold text-white mb-2">
                      {m.label}
                    </p>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {m.detail}
                    </p>
                  </div>
                ))}
              </div>
  
              {/* Live Deliverables Grid */}
              <div className="rounded-3xl border border-white/10 bg-[#060c08]/90 p-6 sm:p-8 backdrop-blur-xl">
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#00F5A0] font-semibold">
                    Live Production Deliverables
                  </span>
                  <span className="font-mono text-xs text-neutral-400">
                    Deployed in 8 weeks · Active on 45+ NSW civil projects
                  </span>
                </div>
  
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      title: "Live Fleet Telematics Hub",
                      desc: "Centralized GPS location tracking, live engine hour logging, and automated maintenance thresholds for excavators, loaders, and tippers.",
                    },
                    {
                      title: "SafeWork Digital SWMS Engine",
                      desc: "Automated site-specific safety plans and mandatory daily pre-start sign-offs with instant tamper-proof audit trails for tier-1 builders.",
                    },
                    {
                      title: "Client Dry-Hire Self-Service",
                      desc: "Subcontractors generate verified machine hire agreements, insurance certificates, and rate schedules instantly without dispatch delays.",
                    },
                    {
                      title: "Offline Operator Mobile Web App",
                      desc: "Progressive web application allowing civil field operators to log daily pre-starts and photo defect tickets even in zero-reception pits.",
                    },
                  ].map((d) => (
                    <div
                      key={d.title}
                      className="flex flex-col justify-between rounded-xl border border-white/5 bg-black/40 p-5 hover:border-white/15 transition-colors"
                    >
                      <div>
                        <h4 className="text-base font-bold text-white mb-2 tracking-tight">
                          {d.title}
                        </h4>
                        <p className="text-xs leading-relaxed text-neutral-400 font-sans">
                          {d.desc}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00F5A0]" />
                        <span>In Production</span>
                      </div>
                    </div>
                  ))}
                </div>
  
                {/* Client Endorsement */}
                <div className="mt-6 pt-5 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <blockquote className="text-sm text-neutral-300 italic font-sans max-w-2xl">
                    &ldquo;PresciaIQ took our civil plant operations from manual paperwork and phone tag to a real-time digital system in eight weeks. Our tier-1 clients get instant compliance packs, and our dispatch runs without friction.&rdquo;
                  </blockquote>
                  <div className="text-left sm:text-right shrink-0">
                    <p className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      General Manager
                    </p>
                    <p className="text-[11px] font-mono text-neutral-400">
                      Groundbreakers Civil &amp; Plant Hire
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        </>
      )}
    </section>
  );
};

export default AppBuildingSection;
