import { useState, useEffect } from "react";

const STORAGE_KEY = "presciaiq_sticky_cta_dismissed";
const CALENDLY_URL = "https://calendly.com/presciaiq-sales/discoverycall";

export default function StickyCtaBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Don't show if dismissed this session
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    // Show after scrolling 200px
    const handleScroll = () => {
      if (window.scrollY > 200 && !dismissed) setVisible(true);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  function dismiss() {
    setDismissed(true);
    setVisible(false);
    sessionStorage.setItem(STORAGE_KEY, "1");
  }

  if (!visible || dismissed) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[9998]"
      style={{
        background: "linear-gradient(90deg, #0a0f0a 0%, #0d1a10 50%, #0a0f0a 100%)",
        borderTop: "1px solid rgba(74,222,128,0.25)",
        boxShadow: "0 -8px 32px rgba(0,0,0,0.5)",
      }}
    >
      {/* Green top accent line */}
      <div className="h-[2px] w-full" style={{ background: "linear-gradient(90deg, transparent, #4ade80, #22d3ee, #4ade80, transparent)" }} />

      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Left: message */}
        <div className="flex items-center gap-3 min-w-0">
          <span
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold shrink-0"
            style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Free
          </span>
          <p className="text-sm text-white/80 truncate">
            <span className="font-semibold text-white">Calculate your Reaction Tax</span>
            <span className="hidden md:inline"> — see exactly how much margin you are losing to reactive decisions.</span>
          </p>
        </div>

        {/* Right: CTAs */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="/start"
            className="px-4 py-2 rounded-lg text-xs font-bold text-black transition-all hover:brightness-110 active:scale-[0.97] whitespace-nowrap"
            style={{ background: "linear-gradient(135deg, #4ade80, #22d3ee)" }}
          >
            Get Free Audit →
          </a>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all hover:border-green-400/50"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.75)",
            }}
          >
            Book a Call
          </a>
          <button
            onClick={dismiss}
            className="ml-1 text-white/25 hover:text-white/60 transition-colors text-lg leading-none"
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
