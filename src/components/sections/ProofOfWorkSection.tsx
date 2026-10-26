import { useState } from "react";
import { motion } from "framer-motion";

/* ─────────────────────────────────────────────
   BuildPredictIQ Data
───────────────────────────────────────────── */
const riskData: Record<
  string,
  {
    composite: number;
    items: { label: string; probability: number; impact: "HIGH" | "MEDIUM" | "LOW"; detail: string }[];
  }
> = {
  residential: {
    composite: 50,
    items: [
      { label: "Geotechnical Risk", probability: 68, impact: "HIGH", detail: "Rock shelf at 2.4m · Contamination flag" },
      { label: "Financial Risk", probability: 55, impact: "MEDIUM", detail: "Trade inflation 8.2% · Subcontractor shortage" },
      { label: "Schedule Risk", probability: 52, impact: "MEDIUM", detail: "Weather window 14 days · Council DA 12 weeks" },
    ],
  },
  commercial: {
    composite: 64,
    items: [
      { label: "Geotechnical Risk", probability: 74, impact: "HIGH", detail: "Groundwater at 3.1m · Asbestos register" },
      { label: "Financial Risk", probability: 62, impact: "HIGH", detail: "Trade inflation 11.4% · Steel lead time 18wk" },
      { label: "Schedule Risk", probability: 58, impact: "MEDIUM", detail: "Wet season overlap · Crane permit 8 weeks" },
    ],
  },
};

/* ─────────────────────────────────────────────
   Container 1: Risk Probability Matrix (Mooni Card)
───────────────────────────────────────────── */
const RiskMatrixDemo = () => {
  const [type, setType] = useState<"residential" | "commercial">("residential");
  const currentRisk = riskData[type];

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="h-full flex flex-col"
    >
      <div className="group relative bg-[#060c08]/90 border border-emerald-500/20 hover:border-emerald-400/60 rounded-3xl p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(0,245,160,0.18)] hover:-translate-y-1.5 overflow-hidden h-full">
        {/* Active Border Luminescence with Corner-Focused Gradient Highlight */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-br from-emerald-400/35 via-white/5 to-emerald-500/10 -z-0"
          style={{
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
          }}
          aria-hidden="true"
        />

        {/* Top-Right Corner Hairline Sheen */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/10 to-emerald-400/40"
          aria-hidden="true"
        />

        {/* Glowing Emerald Corner Accent (Top-Right) */}
        <div
          className="pointer-events-none absolute -top-12 -right-12 w-44 h-44 bg-emerald-400/20 rounded-full blur-2xl opacity-75 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500"
          aria-hidden="true"
        />

        {/* Smooth Ambient Emerald Hover Glow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(circle at 60% 30%, rgba(0, 245, 160, 0.10) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
            {/* Headline & Subtitle */}
            <h3 className="text-2xl font-bold text-white tracking-tight mb-2">
              Risk Probability Matrix
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed mb-6 font-sans">
              Quantified construction risk vectors evaluated through holdout-validated models before capital deployment.
            </p>

            {/* Dwelling Type Toggle Controls */}
            <div className="flex gap-2 mb-6 p-1 bg-black/40 border border-white/5 rounded-xl w-fit">
              {(["residential", "commercial"] as const).map((t) => {
                const isActive = type === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t)}
                    className={`text-xs font-mono rounded-lg px-3.5 py-1.5 transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#00F5A0]/15 text-[#00F5A0] border border-[#00F5A0]/30 font-medium shadow-[0_0_12px_rgba(0,245,160,0.2)]"
                        : "text-neutral-400 hover:text-white border border-transparent"
                    }`}
                  >
                    {t === "residential" ? "Residential Dwelling" : "Commercial High-Rise"}
                  </button>
                );
              })}
            </div>

            {/* Streamlined Composite Risk Score */}
            <div className="bg-[#030604] border border-white/5 rounded-2xl p-5 mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider font-medium">
                  Composite Risk Score
                </span>
                <span className="text-2xl font-mono font-bold text-[#00F5A0] drop-shadow-[0_0_8px_rgba(0,245,160,0.4)]">
                  {currentRisk.composite}%
                </span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${currentRisk.composite}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full bg-gradient-to-r from-emerald-500 to-[#00F5A0] rounded-full shadow-[0_0_10px_rgba(0,245,160,0.5)]"
                />
              </div>
            </div>

            {/* Clean Metric Bars with Glowing Coral/Emerald Indicators */}
            <div className="space-y-3 mb-6">
              {currentRisk.items.map((risk, idx) => {
                const isHigh = risk.impact === "HIGH";
                return (
                  <div
                    key={risk.label}
                    className="p-4 rounded-2xl border border-white/5 bg-[#030604] hover:border-white/10 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isHigh
                              ? "bg-[#FF6B6B] shadow-[0_0_8px_#FF6B6B]"
                              : "bg-[#00F5A0] shadow-[0_0_8px_#00F5A0]"
                          }`}
                        />
                        <span className="text-sm font-medium text-white">{risk.label}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs font-semibold text-neutral-200">
                          {risk.probability}%
                        </span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded font-medium border ${
                            isHigh
                              ? "text-[#FF6B6B] bg-[#FF6B6B]/10 border-[#FF6B6B]/30"
                              : "text-[#00F5A0] bg-[#00F5A0]/10 border-[#00F5A0]/30"
                          }`}
                        >
                          {risk.impact}
                        </span>
                      </div>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mb-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${risk.probability}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.85, delay: 0.35 + idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                        className={`h-full rounded-full ${
                          isHigh
                            ? "bg-[#FF6B6B] shadow-[0_0_8px_rgba(255,107,107,0.5)]"
                            : "bg-[#00F5A0] shadow-[0_0_8px_rgba(0,245,160,0.5)]"
                        }`}
                      />
                    </div>
                    <p className="text-[11px] text-neutral-400 font-sans truncate">
                      {risk.detail}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Minimal Action Button */}
          <div className="pt-4 border-t border-white/5">
            <a
              href="https://buildpredictiq.com.au/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 rounded-full bg-white/[0.04] hover:bg-[#00F5A0]/10 border border-white/10 hover:border-[#00F5A0]/40 text-white font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300 group/btn"
            >
              <span>Get Your Project Report</span>
              <span className="text-neutral-400 group-hover/btn:text-[#00F5A0] group-hover/btn:translate-x-1 transition-all">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   Container 2: Campaign Yield Engine (Mooni Card)
───────────────────────────────────────────── */
const AdsIQDemo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="h-full flex flex-col"
    >
      <div className="group relative bg-[#060c08]/90 border border-emerald-500/20 hover:border-emerald-400/60 rounded-3xl p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(0,245,160,0.18)] hover:-translate-y-1.5 overflow-hidden h-full">
        {/* Active Border Luminescence with Alternating Corner-Focused Gradient Highlight */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-tl from-emerald-400/35 via-white/5 to-emerald-500/10 -z-0"
          style={{
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
          }}
          aria-hidden="true"
        />

        {/* Bottom-Left Corner Hairline Sheen */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-emerald-400/40 via-emerald-400/10 to-transparent"
          aria-hidden="true"
        />

        {/* Glowing Emerald Corner Accent (Bottom-Left - Alternating Rhythm) */}
        <div
          className="pointer-events-none absolute -bottom-12 -left-12 w-44 h-44 bg-emerald-400/20 rounded-full blur-2xl opacity-75 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500"
          aria-hidden="true"
        />

        {/* Smooth Ambient Emerald Hover Glow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(circle at 40% 70%, rgba(0, 245, 160, 0.10) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
            {/* Headline & Subtitle */}
            <h3 className="text-2xl font-bold text-white tracking-tight mb-2">
              Campaign Yield Engine
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed mb-6 font-sans">
              Pre-spend predictive AI simulating ROAS, acquisition cost, and downside revenue protection.
            </p>

            {/* Central Circular Prediction Gauge with Emerald Neon Ring */}
            <div className="bg-[#030604] border border-white/5 rounded-2xl p-6 mb-6 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="relative w-36 h-36 flex items-center justify-center my-1">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="6"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#00F5A0"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="251.3"
                    initial={{ strokeDashoffset: 251.3 }}
                    whileInView={{ strokeDashoffset: 57.8 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="drop-shadow-[0_0_12px_rgba(0,245,160,0.65)]"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-mono font-bold text-white tracking-tight">
                    77<span className="text-lg text-[#00F5A0]">%</span>
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 font-mono mt-0.5">
                    READINESS
                  </span>
                </div>
              </div>
              <div className="text-center mt-2">
                <span className="text-xs font-mono text-neutral-400">
                  Predictive calibration active on <span className="text-white font-medium">Meta &amp; Google Ads</span>
                </span>
              </div>
            </div>

            {/* Clean 2x2 Grid of Key Metrics in Minimalist Glass Tiles */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-[#030604] border border-white/5 rounded-2xl p-4 text-center hover:border-white/10 transition-colors">
                <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                  PREDICTED ROAS
                </p>
                <p className="text-2xl font-mono font-bold text-[#00F5A0] drop-shadow-[0_0_8px_rgba(0,245,160,0.3)]">
                  3.4x
                </p>
              </div>
              <div className="bg-[#030604] border border-white/5 rounded-2xl p-4 text-center hover:border-white/10 transition-colors">
                <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                  PREDICTED CTR
                </p>
                <p className="text-2xl font-mono font-bold text-white">
                  1.45%
                </p>
              </div>
              <div className="bg-[#030604] border border-white/5 rounded-2xl p-4 text-center hover:border-white/10 transition-colors">
                <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                  PREDICTED CPA
                </p>
                <p className="text-2xl font-mono font-bold text-white">
                  $32.50
                </p>
              </div>
              <div className="bg-[#030604] border border-white/5 rounded-2xl p-4 text-center hover:border-white/10 transition-colors">
                <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                  LOSS AVERTED
                </p>
                <p className="text-2xl font-mono font-bold text-[#00F5A0] drop-shadow-[0_0_8px_rgba(0,245,160,0.3)]">
                  $18,200
                </p>
              </div>
            </div>
          </div>

          {/* Sleek Primary Pill Button */}
          <div className="pt-4 border-t border-white/5">
            <a
              href="https://adsiq.com.au/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 rounded-full bg-[#00F5A0] hover:bg-[#00F5A0]/90 text-black font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_25px_rgba(0,245,160,0.35)] hover:shadow-[0_0_35px_rgba(0,245,160,0.5)] group/btn"
            >
              <span>Run Prediction Engine</span>
              <span className="group-hover/btn:translate-x-1 transition-transform">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   Main Proof of Work Section Wrapper
───────────────────────────────────────────── */
const ProofOfWorkSection = () => {
  return (
    <section id="proof" className="relative w-full bg-[#030705] overflow-hidden">
      {/* ── Section Background Center Diffusion Glow ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div
          className="w-[900px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px] absolute left-1/2 -top-24 -translate-x-1/2"
          style={{ background: "radial-gradient(circle, rgba(16, 185, 129, 0.09) 0%, transparent 70%)" }}
        />
      </div>

      {/* ── Far-Left Screen Bleed Glowing Aura Pillar (Mooni Motion Continuity) ── */}
      <div
        className="pointer-events-none absolute -left-20 top-1/2 -translate-y-1/2 w-48 h-[650px] bg-[#00F5A0] opacity-35 blur-[120px] pointer-events-none rounded-full z-0 overflow-visible"
        style={{
          animation: "leftAuraPulseProof 4.5s ease-in-out infinite",
        }}
        aria-hidden="true"
      />

      {/* ── Mooni Subtle Side Margin Marker (Far Left) ── */}
      <div
        className="pointer-events-none absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-3 opacity-25 z-0"
        aria-hidden="true"
      >
        <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-white/40 to-white/10" />
        <div className="text-[10px] text-[#00F5A0]">✦</div>
        <div className="w-[1px] h-32 bg-gradient-to-b from-white/10 via-white/40 to-transparent" />
      </div>

      {/* ── Left-Originating Flowing Curved Arcs (Anchored to Viewport) ── */}
      <svg
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[320px] lg:w-[420px] h-[750px] pointer-events-none z-0 overflow-visible"
        viewBox="0 0 420 750"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="proofFadeMaskGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="12%" stopColor="white" stopOpacity="1" />
            <stop offset="88%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="proofCurveFadeMask" maskContentUnits="userSpaceOnUse">
            <rect x="-100" y="0" width="600" height="750" fill="url(#proofFadeMaskGrad)" />
          </mask>

          <linearGradient id="proofArcGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00F5A0" stopOpacity="0.45" />
            <stop offset="35%" stopColor="#00F5A0" stopOpacity="0.22" />
            <stop offset="75%" stopColor="#10B981" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#00F5A0" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="proofArcGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
            <stop offset="40%" stopColor="#00F5A0" stopOpacity="0.18" />
            <stop offset="80%" stopColor="#00F5A0" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#00F5A0" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="proofBeamPulse" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00F5A0" stopOpacity="0" />
            <stop offset="50%" stopColor="#a3ffd6" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#00F5A0" stopOpacity="0" />
          </linearGradient>
        </defs>

        <g mask="url(#proofCurveFadeMask)">
          {/* Arc 1: Apex sweeping into open left corridor */}
          <path
            d="M -10 40 C 180 120, 290 240, 270 375 C 250 510, 160 630, -10 710"
            stroke="url(#proofArcGrad1)"
            strokeWidth="1.2"
            fill="none"
            opacity="0.65"
          />
          <path
            d="M -10 40 C 180 120, 290 240, 270 375 C 250 510, 160 630, -10 710"
            stroke="url(#proofBeamPulse)"
            strokeWidth="1.8"
            strokeDasharray="140 1000"
            className="flow-proof-beam-1"
            fill="none"
          />

          {/* Arc 2: Concentric inner arc running alongside */}
          <path
            d="M -10 20 C 130 130, 210 250, 195 375 C 180 500, 110 620, -10 730"
            stroke="url(#proofArcGrad2)"
            strokeWidth="1"
            fill="none"
            opacity="0.45"
          />
          <path
            d="M -10 20 C 130 130, 210 250, 195 375 C 180 500, 110 620, -10 730"
            stroke="url(#proofBeamPulse)"
            strokeWidth="1.6"
            strokeDasharray="120 900"
            className="flow-proof-beam-2"
            fill="none"
          />
        </g>
      </svg>

      {/* Scoped CSS Keyframes */}
      <style>{`
        @keyframes leftAuraPulseProof {
          0%, 100% {
            opacity: 0.30;
            transform: translateY(-50%) scaleY(0.96);
          }
          50% {
            opacity: 0.40;
            transform: translateY(-50%) scaleY(1.04);
          }
        }
        @keyframes flowProofBeam1 {
          0% {
            stroke-dashoffset: 1140;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        @keyframes flowProofBeam2 {
          0% {
            stroke-dashoffset: 1020;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        .flow-proof-beam-1 {
          animation: flowProofBeam1 7s linear infinite;
          filter: drop-shadow(0 0 6px rgba(0, 245, 160, 0.8));
        }
        .flow-proof-beam-2 {
          animation: flowProofBeam2 9s linear infinite;
          filter: drop-shadow(0 0 5px rgba(0, 245, 160, 0.7));
        }
      `}</style>

      <div className="w-full max-w-[1140px] mx-auto px-4 sm:px-8 pl-6 sm:pl-12 lg:pl-28 pr-6 sm:pr-8 lg:pr-8 py-16 md:py-24 relative z-10">
        {/* Section Headline – Axiom clip-path reveal */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ opacity: 0, y: 24, clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4 leading-[1.1]"
            >
              See the Intelligence Engine in Action.
            </motion.h2>
          </div>
        </div>

        {/* ── Mooni Dual Showcase Containers ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          {/* Container 1: Risk Probability Matrix */}
          <RiskMatrixDemo />

          {/* Container 2: Campaign Yield Engine */}
          <AdsIQDemo />
        </div>
      </div>
    </section>
  );
};

export default ProofOfWorkSection;
