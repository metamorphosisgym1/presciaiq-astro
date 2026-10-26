import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import SectionWrapper from "../SectionWrapper";

const cards = [
  {
    product: "BuildPredictIQ",
    desc: "Construction Intelligence",
    tiers: [
      { name: "Pay-As-You-Go", price: "$2,500", unit: "per report" },
      { name: "Professional", price: "$4,999", unit: "/year" },
    ],
    cta: "View Construction Pricing",
    href: "https://buildpredictiq.com.au/",
    isInternal: false,
  },
  {
    product: "AdsIQ",
    desc: "Marketing Intelligence",
    tiers: [
      { name: "Starter", price: "Free", unit: "initial score" },
      { name: "Agency", price: "Custom", unit: "pricing" },
    ],
    cta: "View Marketing Pricing",
    href: "https://adsiq.com.au/",
    isInternal: false,
  },
  {
    product: "Development",
    desc: "Web Apps & High-Performance Platforms",
    tiers: [
      { name: "Starter Website", price: "From $5K", unit: "one-off" },
      { name: "App Store Build", price: "From $15K", unit: "scoped project" },
      { name: "Enterprise / Daynori", price: "Custom", unit: "scoped architecture" },
    ],
    cta: "Scope Your Project",
    href: "/contact",
    isInternal: true,
  },
  {
    product: "AEO/SEO",
    desc: "Predictive Search Architecture",
    tiers: [
      { name: "Starter", price: "From $4,999", unit: "one-off" },
      { name: "Enterprise", price: "Custom", unit: "scoped project" },
    ],
    cta: "Scope Your Search Architecture",
    href: "/services/aeo-seo-predictive-search-architecture/",
    isInternal: true,
  },
];

const PricingSection = () => (
  <SectionWrapper id="pricing" className="py-16 lg:py-24 bg-background border-b border-white/5 relative">
    {/* Ambient radial glow */}
    <div
      className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,rgba(0,255,136,0.08),transparent_60%)]"
      aria-hidden="true"
    />

    <div className="w-full max-w-[1650px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">

      {/* Section header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/10 bg-white/[0.04] text-[#00FF88] font-mono text-[11px] tracking-[0.2em] uppercase mb-4 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] shadow-[0_0_8px_#00FF88] animate-pulse" />
          INVESTMENT // TRANSPARENT PRICING
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#F0EDE6] mb-4 leading-tight">
          Ecosystem <span className="text-[#00FF88] italic font-serif">Pricing</span>
        </h2>
        <p className="text-base text-[#C9CCC8] font-sans max-w-xl mx-auto leading-relaxed">
          Transparent pricing across the PresciaIQ ecosystem. Predictable investments engineered for seamless scale and measurable ROI.
        </p>
      </div>

      {/* Unified Bordered Table Grid */}
      <div className="rounded-2xl border border-white/10 bg-[#111411]/80 backdrop-blur-xl overflow-hidden shadow-2xl mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10 items-stretch">
          {cards.map((card, idx) => (
            <motion.div
              key={card.product}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="p-7 sm:p-8 flex flex-col justify-between bg-transparent hover:bg-white/[0.02] transition-colors duration-200 text-left group relative"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="mb-6">
                  <h3 className="font-serif text-2xl font-bold text-[#F0EDE6] mb-1.5 group-hover:text-white transition-colors">
                    {card.product.includes("IQ") ? (
                      <>{card.product.replace("IQ", "")}<span className="text-[#00FF88] italic font-serif">IQ</span></>
                    ) : card.product === "AEO/SEO" ? (
                      <><span className="text-[#00FF88]">AEO</span><span className="text-[#F0EDE6]">/SEO</span></>
                    ) : (
                      <span>{card.product}</span>
                    )}
                  </h3>
                  <p className="text-[10px] text-[#8FAF8F] font-mono uppercase tracking-[0.18em]">
                    {card.desc}
                  </p>
                </div>

                {/* Tier rows */}
                <div className="space-y-3 flex-1 mb-6">
                  {card.tiers.map((tier) => (
                    <div
                      key={tier.name}
                      className="rounded-xl p-4 border border-white/10 bg-white/[0.02] group-hover:border-[#00FF88]/20 transition-colors"
                    >
                      <p className="text-[10px] uppercase tracking-[0.18em] text-[#00FF88] font-mono font-semibold mb-1">
                        {tier.name}
                      </p>
                      <p className="text-[#F0EDE6] font-serif text-xl font-semibold leading-tight">
                        {tier.price}{" "}
                        <span className="text-xs font-sans font-normal text-[#8FAF8F]">
                          {tier.unit}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={card.href}
                  target={card.isInternal ? undefined : "_blank"}
                  rel={card.isInternal ? undefined : "noopener noreferrer"}
                  className="inline-flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl bg-white/[0.04] hover:bg-[#00FF88] text-[#F0EDE6] hover:text-[#050508] border border-white/10 hover:border-[#00FF88] text-xs uppercase tracking-wider font-mono font-semibold transition-all shrink-0 active:scale-95 group/btn cursor-pointer shadow-sm hover:shadow-[0_0_20px_rgba(0,255,136,0.3)]"
                >
                  <span>{card.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0 text-[#00FF88] group-hover/btn:text-[#050508] transition-all duration-200 group-hover/btn:translate-x-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </SectionWrapper>
);

export default PricingSection;
