import { Fragment, useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface EngineCard {
  id: string;
  title: string;
  description: string;
  href: string;
  ctaText: string;
  isExternal?: boolean;
}

const engines: EngineCard[] = [
  {
    id: "web-aeo",
    title: "Websites + SEO / AEO",
    description:
      "High-speed digital platforms engineered for LLM answer engines (ChatGPT, Perplexity, Gemini) and programmatic search.",
    href: "/services/aeo-seo-predictive-search-architecture/",
    ctaText: "Explore Web Architecture",
    isExternal: false,
  },
  {
    id: "apps-software",
    title: "iOS, Android App + Custom Software Builds",
    description:
      "Full-stack native iOS, Android, and cross-platform web applications built on resilient cloud architectures designed for zero downtime.",
    href: "/services/ai-app-development/",
    ctaText: "Explore Software Builds",
    isExternal: false,
  },
  {
    id: "ai-automations",
    title: "AI & Automation Implementation",
    description:
      "Custom multi-agent workflows, intelligent document parsers, and neural pipelines integrated directly into existing enterprise stacks.",
    href: "/products/ai-automations/",
    ctaText: "Explore AI Automations",
    isExternal: false,
  },
  {
    id: "helm-os",
    title: "Daynori",
    description:
      "Centralized enterprise operating intelligence platform uniting autonomous agents, real-time telemetry, and operational execution.",
    href: "/services/ai-software-development/",
    ctaText: "Explore Daynori",
    isExternal: false,
  },
];

const engineMarkers = [
  { initial: "01", label: "WEB / AEO" },
  { initial: "02", label: "APPS / DEV" },
  { initial: "03", label: "AI AGENTS" },
  { initial: "04", label: "Daynori" },
];
const SLIDES = engines.length;
// The intro, then one panel per engine, laid side by side on the track.
const PANELS = SLIDES + 1;
// Panels from here on are dark, with light type.
const DARK_FROM = 3;
// Viewport heights the frame holds on the intro, while its words light up,
// before the track starts sliding.
const INTRO_HOLD = 0.8;

// Brand green, sampled from the PresciaIQ logo mark. The lighter step keeps
// the same hue legible on the obsidian panels.
const BRAND = "#6D896E";
const BRAND_LIGHT = "#8FAF8F";

// One title style for every pillar, so no slide reads differently.
const PILLAR_TITLE =
  "font-sans font-semibold text-[clamp(2rem,4.6vw,4.25rem)] leading-[1.04] tracking-[-0.035em]";

// Shared hover curve for the section's buttons and pills.
const EASE = "ease-[cubic-bezier(0.16,1,0.3,1)]";

const MODULE_BASE = `group/module relative isolate inline-flex items-center gap-2.5 overflow-hidden rounded-full border px-4 py-1.5 font-sans text-[12px] font-medium capitalize tracking-normal backdrop-blur-md transition-all duration-300 ${EASE} will-change-transform hover:-translate-y-0.5 hover:scale-[1.03]`;
const MODULE_THEME = {
  light:
    "border-neutral-900/10 bg-neutral-900/[0.04] text-neutral-800 hover:border-emerald-500/40 hover:bg-neutral-900/[0.08] hover:shadow-[0_4px_16px_rgba(16,185,129,0.12)]",
  dark: "border-white/10 bg-white/[0.06] text-neutral-200 hover:border-emerald-400/50 hover:bg-white/[0.12] hover:shadow-[0_0_20px_rgba(0,255,136,0.22)]",
};

// Frosted capsule linking to a sister product. A specular band sweeps across
// the glass on hover.
const ModulePill = ({ name, href, dark = false }: { name: string; href: string; dark?: boolean }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={`${MODULE_BASE} ${MODULE_THEME[dark ? "dark" : "light"]}`}>
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-0 -left-1/2 -z-10 w-1/2 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent ${
        dark ? "via-white/25" : "via-white/80"
      } to-transparent opacity-0 transition-[transform,opacity] duration-700 ${EASE} will-change-transform group-hover/module:translate-x-[400%] group-hover/module:opacity-100`}
    />
    <span>{name}</span>
    <ArrowUpRight
      className={`h-3 w-3 transition-transform duration-200 ${EASE} group-hover/module:-translate-y-0.5 group-hover/module:translate-x-0.5 ${
        dark ? "text-emerald-400" : "text-emerald-600"
      }`}
    />
  </a>
);

// Words as separate inline-blocks the intro reveal can fade one by one. The
// spaces stay real text so wrapping is unchanged.
const RevealWords = ({ text }: { text: string }) => (
  <>
    {text.split(" ").map((word, i) => (
      <Fragment key={i}>
        {i > 0 && " "}
        <span data-reveal-word className="inline-block will-change-[opacity,transform]">
          {word}
        </span>
      </Fragment>
    ))}
  </>
);

const pad = (n: number) => String(n).padStart(2, "0");

// Custom properties for the tracker at a given panel. Returned as plain
// strings so sync() can write them straight onto the element; themeFor() is the
// same values typed for React's first paint.
const trackerVars = (panel: number): Record<string, string> => {
  const dark = panel >= DARK_FROM;
  return {
    "--fg": dark ? "#F0EDE6" : "#0A0F0D",
    "--muted": dark ? "rgba(240, 237, 230, 0.62)" : "#525252",
    "--line": dark ? "rgba(255, 255, 255, 0.16)" : "rgba(10, 15, 13, 0.14)",
    "--accent": dark ? BRAND_LIGHT : BRAND,
  };
};

const themeFor = (panel: number) => trackerVars(panel) as CSSProperties;

/**
 * Horizontal pinned track. A tall section holds a sticky full-screen frame;
 * inside it the intro and the five engine panels sit side by side, and
 * vertical scroll slides the track sideways. Slide content transitions as
 * unified blocks beside foreground engine numerals. The last panel is obsidian, matching the
 * section below, so the page simply carries on once the frame unsticks.
 */
const ProductsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const tintRef = useRef<HTMLDivElement>(null);
  const fillRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const trackerRef = useRef<HTMLElement>(null);
  const markerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const frame = frameRef.current;
    if (!section || !track || !frame) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let activePanel = 0;

    // Tracker follows the track directly (refs, no re-render per frame).
    const sync = (progress: number) => {
      const position = progress * (PANELS - 1);
      const engine = position - 1;
      fillRefs.current.forEach((fill, i) => {
        if (fill) fill.style.transform = `scaleX(${Math.min(1, Math.max(0, engine - i))})`;
      });
      if (trackerRef.current) trackerRef.current.style.opacity = String(Math.min(1, Math.max(0, (position - 0.4) * 2.5)));
      const backgroundProgress = Math.min(1, Math.max(0, position - (DARK_FROM - 1)));
      if (backgroundRef.current) backgroundRef.current.style.opacity = String(backgroundProgress);
      if (tintRef.current) tintRef.current.style.opacity = String(backgroundProgress * 0.22);
      // The nearest panel used to live in React state, so every boundary
      // crossing re-rendered this whole pinned track - five panels of
      // per-character spans - mid-scroll. It is a handful of attribute writes
      // now, and the rest is CSS.
      const nextPanel = Math.round(position);
      if (nextPanel !== activePanel) {
        const wasDark = activePanel >= DARK_FROM;
        activePanel = nextPanel;
        for (let i = 0; i < SLIDES; i++) {
          const marker = markerRefs.current[i];
          if (!marker) continue;
          const state = activePanel === i + 1 ? "active" : activePanel > i + 1 ? "visited" : "pending";
          if (marker.dataset.state !== state) marker.dataset.state = state;
          if (state === "active") marker.setAttribute("aria-current", "step");
          else marker.removeAttribute("aria-current");
        }
        const isDark = activePanel >= DARK_FROM;
        if (isDark !== wasDark && trackerRef.current) {
          const style = trackerRef.current.style;
          for (const [key, value] of Object.entries(trackerVars(activePanel))) {
            style.setProperty(key, value);
          }
        }
      }
    };

    const ctx = gsap.context(() => {
      const travel = gsap.to(track, {
        xPercent: (-100 * (PANELS - 1)) / PANELS,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: () => `top+=${window.innerHeight * INTRO_HOLD} top`,
          end: "bottom bottom",
          anticipatePin: 1,
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => sync(self.progress),
        },
      });

      if (reduced) return;

      // Intro words light up in reading order - headline, copy, then the
      // engine badges - as the section rises into view and through the hold,
      // finishing exactly as the track starts to slide.
      const revealWords = gsap.utils.toArray<HTMLElement>("[data-reveal-word]", section);
      if (revealWords.length) {
        // Set up front: a staggered fromTo leaves the words whose stagger has
        // not begun unstyled, so they would show at full strength.
        gsap.set(revealWords, { opacity: 0.18, y: 12 });
        gsap.to(revealWords, {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.3,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            end: () => `top+=${window.innerHeight * INTRO_HOLD} top`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }

      const introTitle = section.querySelector<HTMLElement>("[data-intro-title]");
      const introCopy = section.querySelector<HTMLElement>("[data-intro-copy]");
      const introModules = section.querySelector<HTMLElement>("[data-intro-modules]");
      const introPanel = section.querySelector<HTMLElement>("[data-intro-panel]");
      if (introTitle && introCopy && introPanel) {
        gsap.fromTo(
          [introTitle, introCopy, introModules].filter(Boolean),
          { opacity: 1, y: 0 },
          {
            opacity: 0,
            y: -24,
            ease: "none",
            scrollTrigger: {
              trigger: introPanel,
              containerAnimation: travel,
              start: "center center",
              end: "right center",
              scrub: true,
            },
          },
        );
      }

      gsap.utils.toArray<HTMLElement>("[data-panel]").forEach((el) => {
        const content = el.querySelector<HTMLElement>("[data-engine-content]");
        const title = content?.querySelector<HTMLElement>("[data-engine-title]");
        const titleCharacters = title ? Array.from(title.querySelectorAll<HTMLElement>("[data-title-char]")) : [];
        const description = content?.querySelector<HTMLElement>("[data-engine-description]");
        const action = content?.querySelector<HTMLElement>("[data-engine-cta]");
        if (content && titleCharacters.length && description && action) {
          gsap.set(titleCharacters, { yPercent: 110, opacity: 0 });
          gsap.set([description, action], { y: 20, opacity: 0 });

          // Heading, copy and button land together so the slide reads at once.
          const entrance = gsap.timeline({ paused: true, defaults: { duration: 0.35, ease: "power2.out" } })
            .to(titleCharacters, { yPercent: 0, opacity: 1, stagger: 0.012 }, 0)
            .to(description, { y: 0, opacity: 1 }, 0.05)
            .to(action, { y: 0, opacity: 1 }, 0.1);
          const exit = gsap.timeline({ paused: true })
            .to(
              titleCharacters,
              { yPercent: -40, opacity: 0, duration: 0.28, stagger: 0.008, ease: "power2.in" },
              0,
            )
            .to([description, action], { yPercent: -40, opacity: 0, duration: 0.28, ease: "power2.in" }, 0);
          const enter = () => {
            exit.pause(0);
            gsap.set(titleCharacters, { yPercent: 110, opacity: 0 });
            gsap.set([description, action], { y: 20, yPercent: 0, opacity: 0 });
            entrance.restart();
          };
          const leave = () => {
            entrance.pause();
            exit.restart();
          };

          ScrollTrigger.create({
            trigger: el,
            containerAnimation: travel,
            // Type the heading in while the panel is still sliding in from the
            // right, and only clear it once it has almost left on the far side.
            start: "left 75%",
            end: "right 25%",
            onEnter: enter,
            onEnterBack: enter,
            onLeave: leave,
            onLeaveBack: leave,
          });
        }
      });
    }, section);
    sync(0);
    const refresh = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(refresh);
      ctx.revert();
    };
  }, []);

  const goTo = (engine: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const hold = window.innerHeight * INTRO_HOLD;
    const span = section.offsetHeight - window.innerHeight - hold;
    const y = top + hold + (span * (engine + 1)) / (PANELS - 1);
    const lenis = (window as unknown as { lenis?: { scrollTo: (y: number) => void } }).lenis;
    if (lenis) lenis.scrollTo(y);
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  // Tracker takes the nearest panel's type colours, but never its ground. The
  // light theme is the first-paint value; sync() swaps the custom properties on
  // this element directly when the track crosses into the dark panels.
  const trackerTheme = themeFor(0);

  return (
    <section
      id="products"
      ref={sectionRef}
      aria-labelledby="engines-heading"
      className="relative w-full"
      style={{ height: `${(PANELS + INTRO_HOLD) * 100}vh` }}
    >
      <div ref={frameRef} className="sticky top-0 h-screen w-full overflow-hidden bg-white">
        <div
          ref={backgroundRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{ backgroundColor: "#050807", opacity: 0, willChange: "opacity", transform: "translate3d(0, 0, 0)", backfaceVisibility: "hidden" }}
        />
        <div
          ref={tintRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] opacity-0"
          style={{ background: "radial-gradient(ellipse 75% 65% at 50% 45%, rgba(109, 137, 110, 0.32), transparent 75%)", willChange: "opacity", transform: "translate3d(0, 0, 0)", backfaceVisibility: "hidden" }}
        />
        <div
          ref={trackRef}
          className="relative z-10 flex h-full will-change-transform [transform:translate3d(0,0,0)] [backface-visibility:hidden]"
          style={{ width: `${PANELS * 100}vw` }}
        >
          {/* Intro: the headline alone on white. */}
          <div
            data-panel
            data-intro-panel
            className="relative flex h-full shrink-0 flex-col items-center justify-center px-6 text-center"
            style={{ flex: "0 0 100vw", width: "100vw", ...themeFor(0) }}
          >
            <h2
              data-intro-title
              id="engines-heading"
              className={`max-w-4xl ${PILLAR_TITLE} text-[color:var(--fg)]`}
            >
              <RevealWords text="Four Core Pillars." />{" "}
              <span className="text-[color:var(--accent)]">
                <RevealWords text="Infinite Scale." />
              </span>
            </h2>
            <p data-intro-copy className="mt-6 max-w-2xl text-base leading-relaxed text-[color:var(--muted)] sm:text-lg">
              <RevealWords text="Purpose-built engineering across intelligent web architecture, high-concurrency applications, autonomous workflows, and centralized operations." />
            </p>
            <div data-intro-modules className="mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
              <span data-reveal-word className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted)] will-change-[opacity,transform]">
                Specialized Engines
              </span>
              {/* Wrapped so the reveal's inline transform leaves the pills' hover lift alone. */}
              <span data-reveal-word className="inline-flex will-change-[opacity,transform]">
                <ModulePill name="BuildPredictIQ" href="https://buildpredictiq.com.au/" />
              </span>
              <span data-reveal-word className="inline-flex will-change-[opacity,transform]">
                <ModulePill name="AdsIQ" href="https://adsiq.com.au/" />
              </span>
            </div>
          </div>

          {engines.map((engine, i) => (
            <article
              key={engine.id}
              data-panel
              className="relative flex h-full shrink-0 items-center justify-center overflow-hidden px-6"
              style={{ flex: "0 0 100vw", width: "100vw", ...themeFor(i + 1) }}
            >
              {(engine.id === "ai-automations" || engine.id === "helm-os") && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-0"
                  style={{
                    backgroundImage: "radial-gradient(circle, rgba(255, 255, 255, 0.32) 1.25px, transparent 1.5px)",
                    backgroundSize: "24px 24px",
                    backgroundPosition: "center",
                    maskImage: "radial-gradient(ellipse 70% 65% at center, black 45%, transparent 100%)",
                    WebkitMaskImage: "radial-gradient(ellipse 70% 65% at center, black 45%, transparent 100%)",
                  }}
                />
              )}
              <div
                data-engine-content
                className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 text-left md:grid-cols-[minmax(0,1fr)_auto] md:gap-12 lg:gap-20"
              >
                <div className="min-w-0">
                  <h3
                    data-engine-title
                    aria-label={engine.title}
                    className={`max-w-4xl ${PILLAR_TITLE} text-[color:var(--fg)] ${
                      engine.id === "ai-automations" || engine.id === "helm-os" ? "md:pr-4" : ""
                    }`}
                  >
                    <span aria-hidden="true">
                      {engine.title.split(/(\s+)/).map((word, wordIndex) =>
                        /^\s+$/.test(word) ? (
                          <span key={wordIndex} className="whitespace-pre">
                            {word}
                          </span>
                        ) : (
                          <span
                            key={wordIndex}
                            className="-mb-[0.14em] inline-block overflow-hidden whitespace-nowrap pb-[0.14em] align-top"
                          >
                            {Array.from(word).map((character, characterIndex) => (
                              <span
                                key={characterIndex}
                                data-title-char
                                className="inline-block"
                                style={{ willChange: "transform, opacity" }}
                              >
                                {character}
                              </span>
                            ))}
                          </span>
                        ),
                      )}
                    </span>
                  </h3>
                  <p data-engine-description className="mt-6 max-w-3xl text-base leading-relaxed text-[color:var(--muted)] sm:text-lg">
                    {engine.description}
                  </p>
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    {/* GSAP owns the wrapper's transform for the entrance, leaving the
                        anchor's own transform free for the hover lift. */}
                    <div data-engine-cta>
                      <a
                        href={engine.href}
                        {...(engine.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className={`group relative isolate inline-flex min-h-12 items-center gap-2 overflow-hidden rounded-sm bg-[#6D896E] px-6 py-3 text-sm font-semibold text-[#050806] shadow-[0_0_0_1px_rgba(143,175,143,0.35),0_8px_24px_-12px_rgba(109,137,110,0.7)] transition-all duration-300 ${EASE} will-change-transform hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-[#7E9C7F] hover:shadow-[0_0_0_1px_rgba(143,175,143,0.6),0_14px_32px_-10px_rgba(109,137,110,0.9)]`}
                      >
                        {/* Luminous overlay: a top-lit gloss plus a soft light that rises from below. */}
                        <span
                          aria-hidden="true"
                          className={`pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 ${EASE} group-hover:opacity-100`}
                          style={{
                            background:
                              "linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.06) 48%, transparent 52%), radial-gradient(120% 90% at 50% 120%, rgba(200,230,200,0.55), transparent 60%)",
                          }}
                        />
                        {engine.ctaText}
                        <ArrowUpRight className={`h-4 w-4 transition-transform duration-200 ${EASE} group-hover:-translate-y-0.5 group-hover:translate-x-0.5`} />
                      </a>
                    </div>
                    {engine.id === "helm-os" && (
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted)]">
                          Specialized Modules
                        </span>
                        {[
                          { name: "BuildPredictIQ", href: "https://buildpredictiq.com.au/" },
                          { name: "AdsIQ", href: "https://adsiq.com.au/" },
                        ].map((module) => (
                          <ModulePill key={module.name} name={module.name} href={module.href} dark />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <span
                  aria-hidden="true"
                  className={`justify-self-end font-display text-6xl font-bold leading-none tracking-[-0.04em] sm:text-7xl lg:text-8xl ${
                    i < 2 ? "text-[#0A0F0D]" : "text-white"
                  }`}
                >
                  {pad(i + 1)}
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Scroll-linked engine navigation and progress line. */}
        <nav
          ref={trackerRef}
          aria-label="Engines"
          className="absolute inset-x-0 bottom-8 z-20 flex justify-center px-4 opacity-0"
          style={trackerTheme}
        >
          {/* Every state is in the markup; scrolling only flips data-state, so
              no part of this subtree re-renders while the track is pinned. */}
          <style>{`
            .engine-marker-initial { display: none; color: var(--fg); }
            .engine-marker[data-state="visited"] .engine-marker-initial,
            .engine-marker[data-state="active"] .engine-marker-initial { display: block; }
            .engine-marker[data-state="active"] .engine-marker-initial { color: var(--accent); }
            .engine-marker[data-state="visited"] .engine-marker-dot,
            .engine-marker[data-state="active"] .engine-marker-dot { display: none; }
            .engine-marker:hover .engine-marker-dot { background-color: var(--accent); }
            .engine-marker-label { opacity: 0; color: var(--accent); }
            .engine-marker[data-state="active"] .engine-marker-label { opacity: 1; }
          `}</style>
          <ol className="flex items-center font-mono">
            {engines.map((engine, i) => (
              <li key={engine.id} className="flex items-center">
                <button
                  type="button"
                  ref={(el) => {
                    markerRefs.current[i] = el;
                  }}
                  data-state="pending"
                  onClick={() => goTo(i)}
                  aria-label={`${engineMarkers[i].label}: ${engine.title}`}
                  className="engine-marker group flex min-w-[52px] flex-col items-center justify-center gap-1 px-2 py-2 sm:min-w-[68px]"
                >
                  <span className="flex h-6 min-w-6 items-center justify-center">
                    <span className="engine-marker-initial text-sm font-bold transition-colors duration-200 sm:text-base">
                      {engineMarkers[i].initial}
                    </span>
                    <span className="engine-marker-dot h-1.5 w-1.5 rounded-full bg-neutral-400/60 transition-colors duration-200" />
                  </span>
                  {/* The nbsp holds the row's height; the label is taken out of
                      flow so showing it never changes the tracker's width. */}
                  <span className="engine-marker-label relative block min-h-3 text-[9px] font-semibold uppercase tracking-[0.2em] transition-opacity duration-200 sm:text-[10px]">
                    <span aria-hidden="true">{"\u00a0"}</span>
                    <span className="absolute left-1/2 top-0 -translate-x-1/2 whitespace-nowrap">
                      {engineMarkers[i].label}
                    </span>
                  </span>
                </button>
                {i < SLIDES - 1 && (
                  <span className="relative mb-4 block h-px w-6 shrink-0 overflow-hidden bg-neutral-300 sm:w-12">
                    <span
                      ref={(el) => {
                        fillRefs.current[i] = el;
                      }}
                      className="absolute inset-0 origin-left scale-x-0 bg-[color:var(--accent)]"
                    />
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
};

export default ProductsSection;
