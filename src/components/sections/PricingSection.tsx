import { ArrowRight } from "lucide-react";
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
  },
  {
    product: "Development",
    desc: "Web Apps & High-Performance Websites",
    tiers: [
      { name: "Starter Website", price: "From $5K", unit: "one-off" },
      { name: "App Store Build", price: "From $15K", unit: "scoped project" },
      { name: "Enterprise / Ongoing", price: "Custom", unit: "retainer" },
    ],
    cta: "Scope Your Project",
    href: "/contact",
    isInternal: true,
  },
];

const PricingSection = () => (
  <SectionWrapper id="pricing" className="py-24 md:py-32">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <p className="text-xs uppercase tracking-[0.3em] font-mono text-primary mb-4">
          Investment
        </p>
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
          Ecosystem <span className="text-primary neon-glow">Pricing</span>
        </h2>
        <p className="text-lg text-muted-foreground font-sans">
          Transparent pricing across the PresciaIQ ecosystem. Start small, scale as you grow.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {cards.map((card) => (
          <div
            key={card.product}
            className="glass-card rounded-2xl p-8 flex flex-col"
            style={{
              border: "1px solid rgba(0,255,136,0.1)",
            }}
          >
            <h3 className="font-display text-2xl font-bold text-foreground mb-1 whitespace-nowrap">
              {card.product.includes("IQ") ? (
                <>{card.product.replace("IQ", "")}<span className="text-primary neon-glow">IQ</span></>
              ) : (
                <span>{card.product}</span>
              )}
            </h3>
            <p className="text-sm text-muted-foreground font-sans mb-2">
              {card.desc}
            </p>

            <div className="space-y-4 flex-1">
              {card.tiers.map((tier) => (
                <div
                  key={tier.name}
                  className="rounded-xl p-4"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-mono mb-1">
                    {tier.name}
                  </p>
                  <p className="text-foreground font-display text-xl font-bold">
                    {tier.price}{" "}
                    <span className="text-sm font-normal text-muted-foreground font-sans">
                      {tier.unit}
                    </span>
                  </p>
                </div>
              ))}
            </div>

            <a
              href={card.href}
              target={(card as any).isInternal ? undefined : "_blank"}
              rel={(card as any).isInternal ? undefined : "noopener noreferrer"}
              className="mt-8 inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 text-sm font-semibold bg-primary text-primary-foreground rounded-xl hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] transition-all duration-500 font-sans"
            >
              {card.cta}
              <ArrowRight className="w-4 h-4 shrink-0" />
            </a>
          </div>
        ))}
      </div>
    </div>
  </SectionWrapper>
);

export default PricingSection;
