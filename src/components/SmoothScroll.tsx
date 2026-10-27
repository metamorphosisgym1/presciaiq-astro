import { useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: false,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });
    const updateScroll = (time: number) => lenis.raf(time * 1000);
    const handleRefresh = () => lenis.resize();
    let disposed = false;
    let refreshTimer: number | undefined;
    let idleHandle = 0;
    // ScrollTrigger.refresh() recomputes every trigger on the page, the pinned
    // Engines track included - tens of milliseconds. Lazy images finish loading
    // *while you scroll*, so firing it on a 100ms timer dropped a long frame
    // into the middle of each scroll. Coalesce harder, then hand it to an idle
    // callback so it lands between scrolls rather than during one.
    const runRefresh = () => {
      idleHandle = 0;
      refreshTimer = undefined;
      if (!disposed) ScrollTrigger.refresh();
    };
    const scheduleRefresh = () => {
      if (refreshTimer) window.clearTimeout(refreshTimer);
      if (idleHandle && "cancelIdleCallback" in window) window.cancelIdleCallback(idleHandle);
      idleHandle = 0;
      refreshTimer = window.setTimeout(() => {
        if ("requestIdleCallback" in window) {
          idleHandle = window.requestIdleCallback(runRefresh, { timeout: 600 });
        } else {
          runRefresh();
        }
      }, 300);
    };
    const handleAssetLoad = (event: Event) => {
      if (event.target instanceof HTMLImageElement) scheduleRefresh();
    };
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest<HTMLAnchorElement>('a[href^="#"]');
      const hash = anchor?.getAttribute("href");
      if (!hash || hash === "#") return;
      const destination = document.querySelector<HTMLElement>(hash);
      if (!destination) return;
      event.preventDefault();
      lenis.scrollTo(destination, { offset: -80 });
    };

    // A mobile URL bar showing or hiding counts as a resize, and every one of
    // those used to trigger a full ScrollTrigger.refresh() mid-scroll - the
    // single biggest source of the scroll locking up on phones.
    ScrollTrigger.config({ ignoreMobileResize: true });
    // Lenis is driven strictly by the GSAP ticker: one clock for the page, so
    // the scroll position and every scrubbed animation are read in the same
    // frame. lagSmoothing(0) stops GSAP from inventing time after a long frame.
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(updateScroll);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.addEventListener("refresh", handleRefresh);
    document.addEventListener("click", handleAnchorClick);
    document.addEventListener("load", handleAssetLoad, true);
    window.addEventListener("load", scheduleRefresh, { once: true });
    document.fonts?.ready.then(() => {
      if (!disposed) scheduleRefresh();
    });
    (window as unknown as { lenis?: Lenis }).lenis = lenis;
    ScrollTrigger.refresh();

    return () => {
      disposed = true;
      if (refreshTimer) window.clearTimeout(refreshTimer);
      if (idleHandle && "cancelIdleCallback" in window) window.cancelIdleCallback(idleHandle);
      document.removeEventListener("load", handleAssetLoad, true);
      window.removeEventListener("load", scheduleRefresh);
      document.removeEventListener("click", handleAnchorClick);
      ScrollTrigger.removeEventListener("refresh", handleRefresh);
      gsap.ticker.remove(updateScroll);
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
      // Only tear down what this island owns. The reveal context below reverts
      // its own triggers, and a blanket kill would also destroy the triggers
      // belonging to other islands (e.g. the Engines horizontal track).
    };
  }, []);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let context: gsap.Context | undefined;
    let secondFrame = 0;
    // Hero content is above the fold by definition: reveal it on load rather
    // than waiting for a scroll trigger it may sit just below on short screens.
    const inHero = (element: HTMLElement) => element.closest("[data-hero]") !== null;
    const initializeReveals = () => {
      context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.fromTo(
            element,
            { y: 44, filter: "blur(8px)", opacity: 0 },
            {
              y: 0,
              filter: "blur(0px)",
              opacity: 1,
              duration: 1,
              ease: "expo.out",
              clearProps: "filter",
              scrollTrigger: inHero(element) ? undefined : { trigger: element, start: "top 88%", once: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((container) => {
          // The hero's stagger runs as CSS from first paint (global.css heroStaggerIn).
          if (inHero(container)) return;
          gsap.fromTo(
            Array.from(container.children),
            { y: 30, filter: "blur(6px)", opacity: 0 },
            {
              y: 0,
              filter: "blur(0px)",
              opacity: 1,
              duration: 0.8,
              stagger: 0.12,
              ease: "expo.out",
              // blur(0px) is a no-op; clearing it frees hover filters (e.g. brightness).
              clearProps: "filter",
              scrollTrigger: inHero(container) ? undefined : { trigger: container, start: "top 88%", once: true },
            },
          );
        });
      });
    };
    const waitForAppHydration = () => {
      if (document.documentElement.dataset.appHydrated === "true") {
        initializeReveals();
      } else if (document.querySelector('astro-island[component-url$="/App.tsx"]')) {
        window.addEventListener("prescia:app-hydrated", initializeReveals, { once: true });
      } else {
        initializeReveals();
      }
    };
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => {
        waitForAppHydration();
      });
    });

    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
      window.removeEventListener("prescia:app-hydrated", initializeReveals);
      context?.revert();
    };
  });

  return null;
}