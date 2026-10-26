import React from "react";
import { ArrowRight, ChevronDown, ShieldCheck, Cpu, Database, CheckCircle2 } from "lucide-react";
import HeroDotGrid from "../HeroDotGrid";

export default function ProductsHero() {
  return (
    <section
      id="hero"
      data-hero="true"
      className="relative isolate flex min-h-[640px] w-full flex-col items-center justify-between overflow-hidden bg-[#050806] px-5 sm:px-8 pt-10 pb-16 md:pt-14 md:pb-20 text-center"
      style={{
        willChange: "transform",
        transform: "translate3d(0, 0, 0)",
      }}
    >
      {/* Interactive 24px Canvas Dot Grid with Water Ripple Physics */}
      <HeroDotGrid />

      {/* Ambient Mint Radial Glow (matching homepage hero) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 28%, rgba(0, 255, 136, 0.12), transparent 72%), radial-gradient(ellipse 40% 35% at 50% 75%, rgba(115, 150, 115, 0.06), transparent 75%)",
        }}
      />

      {/* Breadcrumb Nav */}
      <div className="relative z-10 w-full max-w-6xl mx-auto mb-8 sm:mb-12">
        <nav
          aria-label="Breadcrumb"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-mono text-[#8FAF8F] backdrop-blur-md"
        >
          <a href="/" className="hover:text-[#00FF88] transition-colors">
            Home
          </a>
          <span className="text-white/25">/</span>
          <span className="text-[#F0EDE6] font-medium">Products</span>
        </nav>
      </div>

      {/* Main Hero Header */}
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-mono uppercase tracking-[0.2em] text-[#00FF88] mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(0,255,136,0.12)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] shadow-[0_0_8px_#00FF88] animate-pulse" />
          <span>The 4 Core Pillars // Enterprise Intelligence</span>
        </div>

        {/* Clean Typography Title (White Serif / Mint Accent) */}
        <h1 className="max-w-4xl text-4xl font-semibold leading-[1.08] tracking-[-0.035em] text-[#F0EDE6] font-serif sm:text-5xl lg:text-6xl">
          Predictive AI Engines Built for{" "}
          <span className="text-[#00FF88] italic font-serif">Australian Enterprise</span>
        </h1>

        {/* Refined Subtext */}
        <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-white/70 font-sans">
          Four purpose-engineered neural platforms designed to eliminate operational latency, reduce financial variance, and automate mission-critical workflows with zero guesswork.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/start/"
            id="products-hero-cta-primary"
            className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-[#00FF88] px-8 text-sm font-semibold text-[#050806] shadow-[0_0_24px_rgba(0,255,136,0.3)] transition-all duration-300 hover:bg-[#00F5A0] hover:shadow-[0_0_36px_rgba(0,255,136,0.45)] hover:scale-[1.02] active:scale-[0.98]"
            style={{ willChange: "transform", transform: "translate3d(0, 0, 0)" }}
          >
            <span>Book Platform Walkthrough</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>

          <a
            href="#catalog"
            id="products-hero-cta-secondary"
            className="group inline-flex min-h-12 items-center gap-3 rounded-full border border-white/20 bg-white/[0.04] px-7 text-sm font-medium text-[#F0EDE6] backdrop-blur-md transition-all duration-300 hover:border-white/45 hover:bg-white/[0.08] hover:scale-[1.02] active:scale-[0.98]"
            style={{ willChange: "transform", transform: "translate3d(0, 0, 0)" }}
          >
            <span>Explore 4 Pillars</span>
            <ChevronDown className="h-4 w-4 text-[#8FAF8F] transition-transform group-hover:translate-y-1" />
          </a>
        </div>
      </div>

      {/* Proof / Telemetry Strip */}
      <div className="relative z-10 mt-14 sm:mt-16 w-full max-w-4xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-left">
          <div className="flex flex-col p-4 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#00FF88] mb-1">
              <Cpu className="w-3.5 h-3.5" />
              <span>4 ENGINES</span>
            </div>
            <span className="text-xs text-neutral-400 font-sans leading-tight">
              Sovereign &amp; Autonomous
            </span>
          </div>

          <div className="flex flex-col p-4 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#00FF88] mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>CALIBRATED</span>
            </div>
            <span className="text-xs text-neutral-400 font-sans leading-tight">
              Holdout-Validated ROI
            </span>
          </div>

          <div className="flex flex-col p-4 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#00FF88] mb-1">
              <Database className="w-3.5 h-3.5" />
              <span>AWS SYDNEY</span>
            </div>
            <span className="text-xs text-neutral-400 font-sans leading-tight">
              100% Sovereign Cloud
            </span>
          </div>

          <div className="flex flex-col p-4 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#00FF88] mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ENTERPRISE SLA</span>
            </div>
            <span className="text-xs text-neutral-400 font-sans leading-tight">
              Zero Operational Friction
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
