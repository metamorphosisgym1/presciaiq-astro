import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "../SectionWrapper";
import { Lock, ArrowRight, Zap, Shield } from "lucide-react";

/* ── BuildPredictIQ ── */

const riskData: Record<string, { label: string; probability: number; impact: string; detail: string }[]> = {
  residential: [
    { label: "Geotechnical Risk", probability: 68, impact: "HIGH", detail: "Rock shelf at 2.4m · Contamination flag" },
    { label: "Financial Risk", probability: 55, impact: "MEDIUM", detail: "Trade inflation 8.2% · Subcontractor shortage" },
    { label: "Schedule Risk", probability: 52, impact: "MEDIUM", detail: "Weather window 14 days · Council DA 12 weeks" },
    { label: "Compliance Risk", probability: 40, impact: "LOW", detail: "BCA compliant · No heritage overlay" },
    { label: "Commercial Risk", probability: 35, impact: "LOW", detail: "Fixed-price contract · Standard insurance" },
  ],
  commercial: [
    { label: "Geotechnical Risk", probability: 74, impact: "HIGH", detail: "Groundwater at 3.1m · Asbestos register" },
    { label: "Financial Risk", probability: 62, impact: "HIGH", detail: "Trade inflation 11.4% · Steel lead time 18wk" },
    { label: "Schedule Risk", probability: 58, impact: "MEDIUM", detail: "Wet season overlap · Crane permit 8 weeks" },
    { label: "Compliance Risk", probability: 49, impact: "MEDIUM", detail: "Heritage overlay · DA modification required" },
    { label: "Commercial Risk", probability: 44, impact: "MEDIUM", detail: "JV structure · Professional indemnity gap" },
  ],
};

const impactColor = (impact: string) => {
  if (impact === "HIGH") return "text-red-400";
  if (impact === "MEDIUM") return "text-yellow-400";
  return "text-muted-foreground";
};

const impactBg = (impact: string) => {
  if (impact === "HIGH") return "rgba(239,68,68,0.08)";
  if (impact === "MEDIUM") return "rgba(234,179,8,0.08)";
  return "rgba(255,255,255,0.02)";
};

const RiskMatrixDemo = () => {
  const [type, setType] = useState<"residential" | "commercial">("residential");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const risks = riskData[type];

  const overallScore = Math.round(risks.reduce((s, r) => s + r.probability, 0) / risks.length);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="glass-card p-6 md:p-8 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-1">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.2)" }}>
          <Shield className="w-4 h-4 text-primary" />
        </div>
        <p className="text-xs uppercase tracking-[0.2em] text-primary font-sans font-semibold">
          BuildPredict<span className="neon-glow">IQ</span> - Live Preview
        </p>
      </div>
      <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2">
        Risk Probability &amp; Impact Matrix
      </h3>
      <p className="text-xs text-muted-foreground font-sans mb-5">
        Five risk vectors. One clear report. See how we quantify project risk before construction begins.
      </p>

      {/* Type toggle */}
      <div className="flex gap-2 mb-5">
        {(["residential", "commercial"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`px-4 py-2 rounded-xl text-xs font-sans font-semibold uppercase tracking-wider transition-all duration-300 ${
              type === t
                ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(0,255,136,0.2)]"
                : "text-muted-foreground hover:text-foreground"
            }`}
            style={type !== t ? { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" } : undefined}
          >
            {t === "residential" ? "Residential Dwelling" : "Commercial High-Rise"}
          </button>
        ))}
      </div>

      {/* Overall score bar */}
      <div className="flex items-center gap-3 mb-5 px-4 py-3 rounded-xl" style={{ background: "rgba(0,255,136,0.04)", border: "1px solid rgba(0,255,136,0.1)" }}>
        <span className="text-xs uppercase tracking-wider text-muted-foreground font-sans font-semibold">Composite Risk Score</span>
        <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: `${overallScore}%` } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full rounded-full bg-primary"
            style={{ boxShadow: "0 0 12px rgba(0,255,136,0.4)" }}
          />
        </div>
        <span className="font-mono text-lg font-bold text-primary neon-glow">{overallScore}%</span>
      </div>

      {/* Risk rows */}
      <div className="space-y-2 flex-1">
        {risks.map((risk, i) => {
          const blurred = i >= 3;
          return (
            <div key={risk.label} className={`relative ${blurred ? "select-none" : ""}`}>
              {blurred && (
                <div className="absolute inset-0 backdrop-blur-[6px] z-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(5,5,8,0.7)" }}>
                  <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
              )}
              <div className="flex items-center justify-between rounded-xl px-4 py-3" style={{ background: impactBg(risk.impact), border: "1px solid rgba(255,255,255,0.04)" }}>
                <div className="flex-1 min-w-0 mr-3">
                  <span className="text-sm font-medium text-foreground font-sans block">{risk.label}</span>
                  <span className="text-[10px] text-muted-foreground font-sans">{risk.detail}</span>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="w-24 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${risk.probability}%` } : {}}
                      transition={{ delay: 0.3 + i * 0.08, duration: 0.7 }}
                      className="h-full rounded-full bg-primary"
                      style={{ boxShadow: "0 0 8px rgba(0,255,136,0.3)" }}
                    />
                  </div>
                  <span className="font-mono text-xs text-primary w-8 text-right">{risk.probability}%</span>
                  <span className={`text-[10px] font-sans font-bold uppercase tracking-wider w-14 text-right ${impactColor(risk.impact)}`}>
                    {risk.impact}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="mt-6 flex justify-center">
        <a
          href="https://buildpredictiq.com.au/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] transition-all duration-500 font-sans"
        >
          Get Your Project Report
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
};

/* ── AdsIQ ── */

const CircularGauge = ({ score, isVisible }: { score: number; isVisible: boolean }) => {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  return (
    <div className="relative w-36 h-36 mx-auto">
      <svg viewBox="0 0 128 128" className="w-full h-full -rotate-90">
        <circle cx="64" cy="64" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
        <motion.circle
          cx="64" cy="64" r={radius} fill="none"
          stroke="hsl(153, 100%, 50%)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={isVisible ? { strokeDashoffset: circumference - progress } : {}}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          style={{ filter: "drop-shadow(0 0 8px rgba(0,255,136,0.4))" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-3xl font-bold text-primary neon-glow">{isVisible ? score : "-"}</span>
        <span className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground font-sans font-semibold">Readiness Score</span>
      </div>
    </div>
  );
};

const AdsIQDemo = () => {
  const [filled, setFilled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const demoData = {
    name: "Summer Lead Gen 2026",
    promotionType: "Service",
    platform: "Instagram",
    objective: "Direct Sales",
    budget: "$12,000",
    score: 77,
    confidence: "HIGH CONFIDENCE",
    roas: "3.4x",
    ctr: "1.45%",
    cpa: "$32.50",
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.15 }}
      className="glass-card p-6 md:p-8 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-1">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.2)" }}>
          <Zap className="w-4 h-4 text-primary" />
        </div>
        <p className="text-xs uppercase tracking-[0.2em] text-primary font-sans font-semibold">
          Ads<span className="neon-glow">IQ</span> - Live Preview
        </p>
      </div>
      <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2">
        Campaign Prediction Engine
      </h3>
      <p className="text-xs text-muted-foreground font-sans mb-5">
        Fill in campaign parameters and get a precision readiness score, predicted metrics, and optimisation roadmap.
      </p>

      <div className="grid md:grid-cols-2 gap-5 flex-1">
        {/* Left: Parameters */}
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] uppercase tracking-wider text-primary font-sans font-semibold">Campaign Parameters</span>
            <button
              onClick={() => setFilled(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] uppercase tracking-wider font-sans font-semibold text-primary transition-all duration-300 hover:bg-primary/10"
              style={{ border: "1px solid rgba(0,255,136,0.2)", background: "rgba(0,255,136,0.04)" }}
            >
              <Zap className="w-3 h-3" /> Auto-Fill Demo
            </button>
          </div>
          {[
            { label: "Campaign Name", value: demoData.name, placeholder: "e.g. Summer Sale" },
            { label: "Promotion Type", value: demoData.promotionType, placeholder: "Select type" },
            { label: "Platform / Channel", value: demoData.platform, placeholder: "Select platform" },
            { label: "Campaign Objective", value: demoData.objective, placeholder: "Select objective" },
            { label: "Daily Budget", value: demoData.budget, placeholder: "$0.00", mono: true },
          ].map((field) => (
            <div key={field.label}>
              <label className="text-[10px] text-muted-foreground uppercase tracking-wider font-sans mb-1 block">{field.label}</label>
              <div
                className={`w-full rounded-lg px-3 py-2.5 text-sm ${filled ? "text-foreground" : "text-muted-foreground/40"} ${field.mono ? "font-mono" : "font-sans"}`}
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                {filled ? field.value : field.placeholder}
              </div>
            </div>
          ))}
        </div>

        {/* Right: Results */}
        <div className="glass-card p-5 flex flex-col">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-sans font-semibold mb-3">Campaign Prediction</p>

          {/* Circular gauge */}
          <CircularGauge score={filled ? demoData.score : 0} isVisible={filled} />

          {/* Confidence badge */}
          {filled && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex justify-center mt-2 mb-4"
            >
              <span
                className="text-[9px] uppercase tracking-wider font-sans font-bold px-3 py-1 rounded-full text-primary"
                style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.2)" }}
              >
                {demoData.confidence}
              </span>
            </motion.div>
          )}

          {/* Metrics grid */}
          <div className="grid grid-cols-2 gap-3 mt-auto">
            {[
              { label: "Channel", value: filled ? demoData.platform : "-" },
              { label: "Objective", value: filled ? demoData.objective : "-" },
              { label: "Projected ROAS", value: filled ? demoData.roas : "-", highlight: true },
              { label: "Predicted CTR", value: filled ? demoData.ctr : "-", highlight: true },
            ].map((m) => (
              <div key={m.label} className="rounded-lg px-3 py-2" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                <p className="text-[9px] uppercase tracking-wider text-muted-foreground font-sans mb-0.5">{m.label}</p>
                <p className={`text-sm font-semibold ${m.highlight ? "font-mono text-primary" : "font-sans text-foreground"}`}>{m.value}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href="https://adsiq.com.au/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] transition-all duration-500 font-sans"
          >
            Run Your Free Prediction
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Section ── */

const ProofOfWorkSection = () => {
  return (
    <SectionWrapper id="proof" className="py-24 md:py-32 aurora-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 max-w-4xl leading-tight">
          See the Intelligence Engine <span className="text-gradient-primary">in Action.</span>
        </h2>
        <p className="text-lg text-muted-foreground mb-16 max-w-2xl font-sans">
          Interactive previews of our live products. Explore real risk analysis and campaign prediction - no login required.
        </p>

        <div className="grid lg:grid-cols-2 gap-6">
          <RiskMatrixDemo />
          <AdsIQDemo />
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ProofOfWorkSection;
