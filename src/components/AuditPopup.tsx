import { useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Types ────────────────────────────────────────────────────────────────────
interface FormData {
  url: string;
  name: string;
  email: string;
  industry: string;
}

const INDUSTRIES = [
  "Construction & Trades",
  "Equipment Hire",
  "Professional Services",
  "Healthcare & Allied Health",
  "Real Estate & Property",
  "Hospitality & Retail",
  "Logistics & Transport",
  "Technology & SaaS",
  "Finance & Accounting",
  "Other",
];

const STORAGE_KEY = "presciaiq_audit_popup_shown";
const STORAGE_EXPIRY_HOURS = 48; // Show again after 48 hours
const CALENDLY_URL = "https://calendly.com/presciaiq-sales/discoverycall?month=2026-06";

// Pages where popup should NOT show (thank-you, contact, pricing, start)
const EXCLUDED_PATHS = ["/thank-you", "/contact", "/start", "/privacy", "/terms"];

// ── Main Component ────────────────────────────────────────────────────────────
export default function AuditPopup() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1=hook, 2=details, 3=confirmation
  const [form, setForm] = useState<FormData>({ url: "", name: "", email: "", industry: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ── Trigger logic ────────────────────────────────────────────────────────
  const showPopup = useCallback(() => {
    if (typeof window === "undefined") return;
    // Don't show on excluded pages
    const path = window.location.pathname;
    // Homepage only: the popup used to cover articles and service pages (WEB-35, 10 Oct 2026 clean up).
    if (path !== "/") return;
    if (EXCLUDED_PATHS.some(p => path.startsWith(p))) return;
    // Show again after STORAGE_EXPIRY_HOURS hours
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const shownAt = parseInt(stored, 10);
      const hoursSince = (Date.now() - shownAt) / (1000 * 60 * 60);
      if (hoursSince < STORAGE_EXPIRY_HOURS) return;
    }
    setVisible(true);
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  }, []);

  useEffect(() => {
    // Custom event triggers (e.g. from CTA banner or navbar "Book a Strategy Call")
    const handleOpenModal = () => {
      setVisible(true);
      setStep(1);
    };
    window.addEventListener("open-strategy-modal", handleOpenModal);
    window.addEventListener("open-audit-popup", handleOpenModal);

    // Time delay: 8 seconds (longer on non-homepage to let them read)
    // No timed popup: it only opens on exit intent (desktop) or after 60% scroll on the homepage.
    // Exit intent: cursor moves toward top of viewport
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10) showPopup();
    };
    // Scroll depth: fires once at 60% page scroll.
    let scrollDepthTriggered = false;
    const handleScrollDepth = () => {
      if (scrollDepthTriggered) return;
      scrollDepthTriggered = true;
      showPopup();
    };
    const scrollDepthTrigger = ScrollTrigger.create({
      start: () => Math.max(0, document.documentElement.scrollHeight * 0.6 - window.innerHeight),
      onEnter: handleScrollDepth,
      onEnterBack: handleScrollDepth,
    });
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("open-strategy-modal", handleOpenModal);
      window.removeEventListener("open-audit-popup", handleOpenModal);
      document.removeEventListener("mouseleave", handleMouseLeave);
      scrollDepthTrigger.kill();
    };
  }, [showPopup]);

  // ── Dismiss ──────────────────────────────────────────────────────────────
  function dismiss() {
    setVisible(false);
  }

  // ── Step 1 → 2 ──────────────────────────────────────────────────────────
  function handleUrlSubmit(e: React.FormEvent) {
    e.preventDefault();
    const url = form.url.trim();
    if (!url) { setError("Please enter your website URL."); return; }
    setError("");
    setStep(2);
  }

  // ── Step 2 → 3 (submit) ──────────────────────────────────────────────────
  async function handleDetailsSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) { setError("Please enter your name."); return; }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address."); return;
    }
    if (!form.industry) { setError("Please select your industry."); return; }
    setError("");
    setLoading(true);

    try {
      // Submit to Web3Forms — delivers to sales@presciaiq.com.au
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          access_key: "fd818bb1-e5a7-4519-873e-68ba8725be59",
          subject: `New Audit Lead: ${form.name} — ${form.url}`,
          from_name: "PresciaIQ Website Audit",
          name: form.name,
          email: form.email,
          website: form.url,
          industry: form.industry,
          source_page: typeof window !== "undefined" ? window.location.pathname : "unknown",
          message: `New Website Audit Request\n\nName: ${form.name}\nEmail: ${form.email}\nWebsite: ${form.url}\nIndustry: ${form.industry}\nSource Page: ${typeof window !== "undefined" ? window.location.href : "unknown"}\n\nOpen Dashboard: https://backlinkdash-9wienkvu.manus.space/`,
          botcheck: "",
        }),
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.message || "Submission failed");
      setStep(3);
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) dismiss(); }}
    >
      <div
        className="relative w-full max-w-md rounded-3xl overflow-hidden bg-[#111613] border border-[#232A25] shadow-[0_25px_60px_rgba(0,0,0,0.85)] text-left"
      >
        {/* Accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#8FAF8F] to-transparent" />

        {/* Close button */}
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 text-zinc-400 hover:text-[#F0EDE6] transition-colors text-2xl leading-none z-10 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#1A231C]"
          aria-label="Close"
        >
          ×
        </button>

        <div className="p-8">
          {/* ── Step 1: Hook + URL ── */}
          {step === 1 && (
            <form onSubmit={handleUrlSubmit} className="space-y-5">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#131A15] text-[#8FAF8F] border border-[#233026]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8FAF8F] animate-pulse" />
                Free Digital Health Score
              </div>

              {/* Headline */}
              <div>
                <h2 className="text-2xl font-serif font-bold text-[#F0EDE6] leading-tight">
                  Your website is losing you{" "}
                  <span className="text-[#8FAF8F] italic">$8,000+ a month</span>{" "}
                  in leads.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  Most trade and service businesses miss 4–6 enquiries a week from people who searched, landed on their site, and left. Enter your URL and we'll show you exactly where revenue is leaking.
                </p>
              </div>

              {/* URL input */}
              <div>
                <input
                  type="text"
                  value={form.url}
                  onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
                  placeholder="yourwebsite.com.au"
                  className="w-full px-4 py-3 rounded-xl text-sm text-[#F0EDE6] bg-[#0C0F0D] border border-[#232A25] placeholder:text-zinc-500 focus:outline-none focus:border-[#8FAF8F] focus:bg-[#141A15] transition-all"
                  autoFocus
                />
                {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl text-sm font-semibold text-[#F0EDE6] bg-[#3D6346] hover:bg-[#4A7854] border border-[#52855D]/40 transition-all active:scale-[0.98] shadow-sm cursor-pointer"
              >
                Get My Free Score →
              </button>

              <p className="text-center text-xs text-zinc-500">
                No spam. No obligation. Results within 24 hours.
              </p>
            </form>
          )}

          {/* ── Step 2: Details ── */}
          {step === 2 && (
            <form onSubmit={handleDetailsSubmit} className="space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[#8FAF8F] text-sm">✓</span>
                  <span className="text-xs text-zinc-400 truncate">{form.url}</span>
                </div>
                <h2 className="text-xl font-serif font-bold text-[#F0EDE6] leading-tight">
                  Where should we send your{" "}
                  <span className="text-[#8FAF8F] italic font-serif">Digital Health Score?</span>
                </h2>
                <p className="mt-2 text-sm text-zinc-400">
                  We'll audit your site across 3 dimensions and email you the findings within 24 hours.
                </p>
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl text-sm text-[#F0EDE6] bg-[#0C0F0D] border border-[#232A25] placeholder:text-zinc-500 focus:outline-none focus:border-[#8FAF8F] focus:bg-[#141A15] transition-all"
                  autoFocus
                />
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="Email address"
                  className="w-full px-4 py-3 rounded-xl text-sm text-[#F0EDE6] bg-[#0C0F0D] border border-[#232A25] placeholder:text-zinc-500 focus:outline-none focus:border-[#8FAF8F] focus:bg-[#141A15] transition-all"
                />
                <select
                  value={form.industry}
                  onChange={e => setForm(f => ({ ...f, industry: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl text-sm bg-[#0C0F0D] border border-[#232A25] text-[#F0EDE6] focus:outline-none focus:border-[#8FAF8F] focus:bg-[#141A15] transition-all appearance-none cursor-pointer"
                >
                  <option value="" disabled className="text-zinc-500">Your industry</option>
                  {INDUSTRIES.map(i => (
                    <option key={i} value={i} className="bg-[#111613] text-[#F0EDE6]">{i}</option>
                  ))}
                </select>
              </div>

              {error && <p className="text-xs text-red-400">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl text-sm font-semibold text-[#F0EDE6] bg-[#3D6346] hover:bg-[#4A7854] border border-[#52855D]/40 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed shadow-sm cursor-pointer"
              >
                {loading ? "Sending…" : "Send Me the Audit →"}
              </button>

              <button type="button" onClick={() => setStep(1)}
                className="w-full text-xs text-center text-zinc-500 hover:text-[#8FAF8F] transition-colors cursor-pointer">
                ← Change URL
              </button>
            </form>
          )}

          {/* ── Step 3: Confirmation ── */}
          {step === 3 && (
            <div className="space-y-5 text-center">
              {/* Tick */}
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[#131A15] border border-[#233026]">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="#8FAF8F" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-serif font-bold text-[#F0EDE6]">Audit request received.</h2>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  We're running your Digital Health Score now. Expect your results at{" "}
                  <span className="text-[#8FAF8F] font-medium">{form.email}</span>{" "}
                  within 24 hours.
                </p>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-[#232A25]" />
                <span className="text-xs text-zinc-500">or</span>
                <div className="flex-1 h-px bg-[#232A25]" />
              </div>

              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 rounded-xl text-sm font-semibold text-center border border-[#232A25] bg-[#161D18] text-[#F0EDE6] hover:bg-[#1E2620] hover:border-[#3E5A45] transition-all"
              >
                Book a Strategy Call Now →
              </a>

              <button onClick={dismiss}
                className="w-full text-xs text-center text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer">
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
