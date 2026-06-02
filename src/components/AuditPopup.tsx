import { useState, useEffect, useCallback } from "react";

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
const CALENDLY_URL = "https://calendly.com/app/scheduling/meeting_types/user/me";

// ── Main Component ────────────────────────────────────────────────────────────
export default function AuditPopup() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1=hook, 2=details, 3=confirmation
  const [form, setForm] = useState<FormData>({ url: "", name: "", email: "", industry: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ── Trigger logic ────────────────────────────────────────────────────────
  const showPopup = useCallback(() => {
    // Only show once per session
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    setVisible(true);
    sessionStorage.setItem(STORAGE_KEY, "1");
  }, []);

  useEffect(() => {
    // Time delay: 10 seconds
    const timer = setTimeout(showPopup, 10000);

    // Exit intent: cursor moves toward top of viewport
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10) showPopup();
    };
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
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
      const res = await fetch("/api/audit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Submission failed");
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
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) dismiss(); }}
    >
      <div
        className="relative w-full max-w-md rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0a0f0a 0%, #0d1a10 50%, #0a0f0a 100%)",
          border: "1px solid rgba(74,222,128,0.2)",
          boxShadow: "0 0 60px rgba(74,222,128,0.08), 0 25px 50px rgba(0,0,0,0.6)",
        }}
      >
        {/* Green accent bar */}
        <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #4ade80, #22d3ee, #4ade80)" }} />

        {/* Close button */}
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 text-white/30 hover:text-white/70 transition-colors text-xl leading-none z-10"
          aria-label="Close"
        >
          ×
        </button>

        <div className="p-8">
          {/* ── Step 1: Hook + URL ── */}
          {step === 1 && (
            <form onSubmit={handleUrlSubmit} className="space-y-5">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold"
                style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Free Digital Health Score
              </div>

              {/* Headline */}
              <div>
                <h2 className="text-2xl font-black text-white leading-tight">
                  Your website is losing you{" "}
                  <span style={{ color: "#4ade80" }}>$8,000+ a month</span>{" "}
                  in leads.
                </h2>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
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
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(74,222,128,0.2)",
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = "rgba(74,222,128,0.5)")}
                  onBlur={e => (e.currentTarget.style.borderColor = "rgba(74,222,128,0.2)")}
                  autoFocus
                />
                {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl text-sm font-bold text-black transition-all hover:brightness-110 active:scale-[0.98]"
                style={{ background: "linear-gradient(135deg, #4ade80, #22d3ee)" }}
              >
                Get My Free Score →
              </button>

              <p className="text-center text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                No spam. No obligation. Results within 24 hours.
              </p>
            </form>
          )}

          {/* ── Step 2: Details ── */}
          {step === 2 && (
            <form onSubmit={handleDetailsSubmit} className="space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-green-400 text-sm">✓</span>
                  <span className="text-xs text-white/40 truncate">{form.url}</span>
                </div>
                <h2 className="text-xl font-black text-white leading-tight">
                  Where should we send your{" "}
                  <span style={{ color: "#4ade80" }}>Digital Health Score?</span>
                </h2>
                <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                  We'll audit your site across 3 dimensions and email you the findings within 24 hours.
                </p>
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none transition-all"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(74,222,128,0.2)" }}
                  onFocus={e => (e.currentTarget.style.borderColor = "rgba(74,222,128,0.5)")}
                  onBlur={e => (e.currentTarget.style.borderColor = "rgba(74,222,128,0.2)")}
                  autoFocus
                />
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="Email address"
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none transition-all"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(74,222,128,0.2)" }}
                  onFocus={e => (e.currentTarget.style.borderColor = "rgba(74,222,128,0.5)")}
                  onBlur={e => (e.currentTarget.style.borderColor = "rgba(74,222,128,0.2)")}
                />
                <select
                  value={form.industry}
                  onChange={e => setForm(f => ({ ...f, industry: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all appearance-none"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(74,222,128,0.2)",
                    color: form.industry ? "white" : "rgba(255,255,255,0.25)",
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = "rgba(74,222,128,0.5)")}
                  onBlur={e => (e.currentTarget.style.borderColor = "rgba(74,222,128,0.2)")}
                >
                  <option value="" disabled style={{ background: "#0a0f0a" }}>Your industry</option>
                  {INDUSTRIES.map(i => (
                    <option key={i} value={i} style={{ background: "#0a0f0a", color: "white" }}>{i}</option>
                  ))}
                </select>
              </div>

              {error && <p className="text-xs text-red-400">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl text-sm font-bold text-black transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: "linear-gradient(135deg, #4ade80, #22d3ee)" }}
              >
                {loading ? "Sending…" : "Send Me the Audit →"}
              </button>

              <button type="button" onClick={() => setStep(1)}
                className="w-full text-xs text-center transition-colors"
                style={{ color: "rgba(255,255,255,0.3)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}>
                ← Change URL
              </button>
            </form>
          )}

          {/* ── Step 3: Confirmation ── */}
          {step === 3 && (
            <div className="space-y-5 text-center">
              {/* Tick */}
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)" }}>
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="#4ade80" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black text-white">Audit request received.</h2>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                  We're running your Digital Health Score now. Expect your results at{" "}
                  <span className="text-green-400 font-medium">{form.email}</span>{" "}
                  within 24 hours.
                </p>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>or</span>
                <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
              </div>

              <div>
                <p className="text-sm font-semibold text-white mb-1">Skip the wait.</p>
                <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.45)" }}>
                  Book a free 20-minute discovery call and we'll walk through your audit live.
                </p>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full py-3 rounded-xl text-sm font-bold text-black transition-all hover:brightness-110"
                  style={{ background: "linear-gradient(135deg, #4ade80, #22d3ee)" }}
                >
                  Book a Discovery Call →
                </a>
              </div>

              <button onClick={dismiss}
                className="text-xs transition-colors"
                style={{ color: "rgba(255,255,255,0.3)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}>
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
