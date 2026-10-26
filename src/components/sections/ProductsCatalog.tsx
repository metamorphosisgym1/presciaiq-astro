import React from "react";
import { ArrowUpRight, ArrowRight, Check, Sparkles, Building2, TrendingUp, Bot, LayoutDashboard } from "lucide-react";

interface ProductPillar {
  slug: string;
  num: string;
  name: string;
  tagline: string;
  badge: string;
  icon: React.ElementType;
  industry: string;
  industryHref: string;
  description: string;
  features: string[];
  price: string;
  priceDetail: string;
  href: string;
  isExternal: boolean;
  actionLabel: string;
  secondaryLabel: string;
}

const pillars: ProductPillar[] = [
  {
    slug: "buildpredictiq",
    num: "01",
    name: "BuildPredictIQ",
    tagline: "Construction & Property Intelligence",
    badge: "Live Product",
    icon: Building2,
    industry: "Construction & Infrastructure",
    industryHref: "/industries/construction/",
    description:
      "Quantified cost and schedule forecasting with early-warning telemetry to surface emerging delivery risks before they compound into project blowouts. Integrates directly with Procore and Aconex, benchmarked against Australian construction projects.",
    features: [
      "Cost & Schedule Overrun Prediction",
      "Subcontractor Default Risk Scoring",
      "Timeline Confidence Intervals",
      "Procore & Aconex Bi-directional Sync",
    ],
    price: "From $2,500/report",
    priceDetail: "Per-project risk audit or annual portfolio subscription with live warning alerts.",
    href: "https://buildpredictiq.com.au/",
    isExternal: true,
    actionLabel: "Launch BuildPredictIQ ↗",
    secondaryLabel: "Construction Industry →",
  },
  {
    slug: "adsiq",
    num: "02",
    name: "AdsIQ",
    tagline: "Marketing & Acquisition Intelligence",
    badge: "Live Product",
    icon: TrendingUp,
    industry: "Marketing & Agencies",
    industryHref: "/industries/marketing-agencies/",
    description:
      "ROAS calibration models and predictive acquisition algorithms estimating campaign performance before capital is deployed. Evaluates audience, creative format, channel, and historical conversion signals across 2.4M+ Australian data points.",
    features: [
      "Pre-Launch ROAS Calibration",
      "Creative Fatigue Forecaster",
      "Cross-Channel Budget Allocation",
      "Google, Meta, TikTok Native Ingestion",
    ],
    price: "From $890/month",
    priceDetail: "Direct ad account ingestion, multi-brand agency workspaces & live webhook sync.",
    href: "https://adsiq.com.au/",
    isExternal: true,
    actionLabel: "Launch AdsIQ ↗",
    secondaryLabel: "Marketing Industry →",
  },
  {
    slug: "ai-automations",
    num: "03",
    name: "AI Automations & Agents",
    tagline: "Autonomous Multi-Agent Pipelines",
    badge: "Core Pillar",
    icon: Bot,
    industry: "Enterprise Operations",
    industryHref: "/products/ai-automations/",
    description:
      "Autonomous multi-agent orchestration pipelines that coordinate specialized AI capabilities around mission-critical enterprise work. Custom neural architectures extract and validate high-volume documentation, route complex decisions, and integrate securely with existing ERPs.",
    features: [
      "Autonomous Multi-Agent Pipelines",
      "Intelligent Document Processing (IDP)",
      "Custom On-Premise & Local Fine-Tuning",
      "Automated Xero & CRM Reconciliation",
    ],
    price: "Project Scoped / Retainer",
    priceDetail: "Bespoke agent workflows with continuous holdout calibration and dedicated engineering support.",
    href: "/products/ai-automations/",
    isExternal: false,
    actionLabel: "Explore AI Automations →",
    secondaryLabel: "View Architecture →",
  },
  {
    slug: "helm-os",
    num: "04",
    name: "HELM OS",
    tagline: "Enterprise Operating Intelligence Cockpit",
    badge: "Enterprise Platform",
    icon: LayoutDashboard,
    industry: "Enterprise Operations",
    industryHref: "/services/ai-software-development/",
    description:
      "Centralized enterprise operating intelligence cockpit uniting autonomous agent workflows, predictive risk telemetry, and unified operational orchestration. Eliminates operational latency across distributed organizations under a single glass pane.",
    features: [
      "Autonomous Enterprise Cockpit",
      "Predictive Risk Heatmaps & Telemetry",
      "Real-Time Telemetry & SLA Engine",
      "100% Australian Sovereign Cloud (AWS)",
    ],
    price: "Enterprise Scoped",
    priceDetail: "Single-tenant sovereign cluster deployment with custom integrations and 99.99% uptime SLA.",
    href: "/services/ai-software-development/",
    isExternal: false,
    actionLabel: "Explore HELM OS →",
    secondaryLabel: "Enterprise Software →",
  },
];

export default function ProductsCatalog() {
  return (
    <section
      id="catalog"
      className="relative z-10 w-full bg-white text-neutral-900 py-20 sm:py-28 lg:py-32"
      style={{
        willChange: "transform",
        transform: "translate3d(0, 0, 0)",
        backfaceVisibility: "hidden",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Editorial Header */}
        <div className="max-w-3xl mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-mono font-medium text-emerald-700 mb-4 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
            <span>The 4 Core Pillars // Platform Directory</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.12] mb-4">
            Four Purpose-Built Enterprise Engines
          </h2>
          <p className="text-neutral-600 font-sans text-base sm:text-lg leading-relaxed">
            Each PresciaIQ platform is purpose-engineered to eliminate operational latency, reduce financial variance, and automate mission-critical enterprise workflows. Deploy individually or harmonize across HELM OS.
          </p>
        </div>

        {/* The 4 Rebuilt High-End Product Cards */}
        <div className="grid gap-8 sm:gap-10">
          {pillars.map((product) => {
            const Icon = product.icon;
            return (
              <article
                key={product.slug}
                className="group relative overflow-hidden rounded-2xl border border-neutral-200/90 bg-white/95 p-8 sm:p-10 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-emerald-300/80 hover:shadow-[0_12px_32px_rgba(16,185,129,0.08)] hover:-translate-y-0.5"
                style={{
                  willChange: "transform",
                  transform: "translate3d(0, 0, 0)",
                  backfaceVisibility: "hidden",
                }}
              >
                {/* Subtle emerald corner aura on hover */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)",
                  }}
                />

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-start justify-between gap-8 lg:gap-12">
                  {/* Left Column: Information, Badges & Feature Chips */}
                  <div className="flex-1 min-w-0">
                    {/* Header Row: Number + Badge + Industry */}
                    <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-4">
                      <span className="inline-flex items-center justify-center font-mono text-xs font-bold text-neutral-400 bg-neutral-100/90 border border-neutral-200 px-2.5 py-0.5 rounded-full">
                        {product.num}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-mono font-medium text-emerald-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {product.badge}
                      </span>
                      <a
                        href={product.industryHref}
                        className="inline-flex items-center rounded-full border border-neutral-200/80 bg-neutral-50 px-3 py-1 text-xs font-mono text-neutral-600 hover:text-emerald-700 hover:border-emerald-200 transition-colors"
                      >
                        {product.industry}
                      </a>
                    </div>

                    {/* Product Name & Tagline */}
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 group-hover:bg-emerald-100/70 transition-colors">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 group-hover:text-emerald-900 transition-colors leading-tight">
                          {product.name}
                        </h3>
                        <p className="font-mono text-xs sm:text-sm text-emerald-700 font-medium">
                          {product.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Editorial Description */}
                    <p className="mt-4 text-neutral-600 font-sans text-sm sm:text-base leading-relaxed max-w-3xl">
                      {product.description}
                    </p>

                    {/* Features Badges */}
                    <div className="mt-6 flex flex-wrap gap-2 sm:gap-2.5">
                      {product.features.map((feature) => (
                        <span
                          key={feature}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200/80 bg-neutral-50/80 px-3 py-1.5 text-xs font-mono text-neutral-700 transition-colors group-hover:border-emerald-200/90"
                        >
                          <Check className="h-3.5 w-3.5 text-emerald-600 stroke-[2.5]" />
                          <span>{feature}</span>
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 flex flex-wrap items-center gap-3.5">
                      <a
                        href={product.href}
                        {...(product.isExternal
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="group/btn inline-flex items-center justify-center gap-2 rounded-full bg-[#00FF88] px-7 py-3.5 text-xs font-mono font-semibold uppercase tracking-wider text-[#050806] shadow-sm transition-all duration-300 hover:scale-[1.02] hover:bg-[#00F5A0] hover:shadow-[0_0_24px_rgba(0,255,136,0.35)] active:scale-[0.98]"
                        style={{ willChange: "transform", transform: "translate3d(0, 0, 0)" }}
                      >
                        <span>{product.actionLabel}</span>
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                      </a>

                      <a
                        href={product.industryHref}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-200 bg-neutral-50/80 px-6 py-3.5 text-xs font-mono font-semibold uppercase tracking-wider text-neutral-700 transition-all duration-300 hover:border-neutral-300 hover:bg-neutral-100 hover:text-neutral-900 hover:scale-[1.02] active:scale-[0.98]"
                        style={{ willChange: "transform", transform: "translate3d(0, 0, 0)" }}
                      >
                        <span>{product.secondaryLabel}</span>
                      </a>
                    </div>
                  </div>

                  {/* Right Column: Pricing & Infrastructure Pane */}
                  <div className="lg:w-72 shrink-0 border-t lg:border-t-0 lg:border-l border-neutral-200/80 pt-6 lg:pt-0 lg:pl-8 flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-1">
                        Pricing Model
                      </p>
                      <p className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">
                        {product.price}
                      </p>
                      <p className="text-xs text-neutral-500 font-sans leading-relaxed mb-6">
                        {product.priceDetail}
                      </p>
                    </div>

                    <div className="space-y-2.5 pt-5 border-t border-neutral-200/70">
                      <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
                        <span>INFRASTRUCTURE</span>
                        <span className="font-semibold text-neutral-800">AWS Sydney</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
                        <span>CALIBRATION</span>
                        <span className="font-semibold text-emerald-700">Holdout-Validated</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
                        <span>SOVEREIGN CLOUD</span>
                        <span className="font-semibold text-neutral-800">100% Australian</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
                        <span>DATA PRIVACY</span>
                        <span className="font-semibold text-neutral-800">Privacy Act (APP)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bespoke Custom Architecture Banner inside White Section */}
        <div
          className="mt-16 sm:mt-24 rounded-2xl border border-neutral-200/90 bg-neutral-50/90 p-8 sm:p-12 text-center shadow-sm"
          style={{
            willChange: "transform",
            transform: "translate3d(0, 0, 0)",
          }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-mono font-medium text-emerald-700 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>CUSTOM DATA SCIENTIFIC &amp; AI BUILDS</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-neutral-900 mb-4 max-w-3xl mx-auto leading-tight">
            Need a Dedicated Prediction Engine or Enterprise Pipeline?
          </h3>

          <p className="text-neutral-600 font-sans text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            PresciaIQ builds bespoke neural engines for specialized proprietary workflows. If your organization possesses operational datasets and clear KPIs, we can design, train, and deploy dedicated prediction infrastructure.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/start/"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#00FF88] text-[#050806] font-semibold text-xs font-mono uppercase tracking-wider shadow-sm transition-all duration-300 hover:scale-[1.02] hover:bg-[#00F5A0] hover:shadow-[0_0_24px_rgba(0,255,136,0.35)] active:scale-[0.98]"
              style={{ willChange: "transform", transform: "translate3d(0, 0, 0)" }}
            >
              <span>Discuss Custom Architecture →</span>
            </a>

            <a
              href="/contact/"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-neutral-200 bg-white hover:bg-neutral-100 text-neutral-800 font-semibold text-xs font-mono uppercase tracking-wider transition-all duration-300 hover:border-neutral-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{ willChange: "transform", transform: "translate3d(0, 0, 0)" }}
            >
              <span>Contact Engineering Leadership</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
