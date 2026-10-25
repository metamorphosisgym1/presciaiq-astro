import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Shield, Target, Settings, Wrench, Bot } from "lucide-react";
import SectionWrapper from "../SectionWrapper";

const products = [
  {
    name: "AI Automations",
    icon: Bot,
    category: "CUSTOM SOLUTIONS",
    oneLiner: "Custom workflows & agents for Australian businesses.",
    metric: "Stop doing work software can do for you.",
    features: ["CRM & Sales Automation", "Document Processing", "AI Customer Support Agents"],
    href: "/products/ai-automations/",
    badge: "Available Now",
    badgeType: "live" as const,
  },
  {
    name: "BuildPredictIQ",
    icon: Shield,
    category: "CONSTRUCTION INTELLIGENCE",
    oneLiner: "Quantified risk analysis before a single sod is turned.",
    metric: "Reports cost <$3K. Prevent $150K+ in risks.",
    features: ["Geotechnical Risk Mapping", "Financial Exposure Analysis", "Schedule Optimisation"],
    href: "https://buildpredictiq.com.au/",
    badge: "Live on Google AI Marketplace",
    badgeType: "live" as const,
  },
  {
    name: "AdsIQ",
    icon: Target,
    category: "MARKETING INTELLIGENCE",
    oneLiner: "Predict your ROAS before you spend a dollar.",
    metric: "Campaign predictions in under 60 seconds.",
    features: ["ROAS & CPA Prediction", "Creative Analysis", "Multi-Platform (Meta, Google, TikTok, LinkedIn)"],
    href: "https://adsiq.com.au/",
    badge: "Live on Google AI Marketplace",
    badgeType: "live" as const,
  },
  {
    name: "OpsIQ",
    icon: Settings,
    category: "OPERATIONS INTELLIGENCE",
    oneLiner: "Your entire business playbook, built in 4 weeks.",
    metric: "Custom SOPs delivered. Not templates - tailored systems.",
    features: ["Done-For-You SOPs", "Face-to-Face Discovery", "Ongoing Optimisation"],
    href: "https://opsiq.com.au/",
    badge: "Coming Q3 2026",
    badgeType: "coming" as const,
  },
  {
    name: "TradesmanIQ",
    icon: Wrench,
    category: "TRADES INTELLIGENCE",
    oneLiner: "The digital backbone for modern Australian trades businesses.",
    metric: "From quoting to compliance - one intelligent platform.",
    features: ["Job Management", "Compliance Tracking", "Client Portal"],
    href: "https://tradesmaniq.com.au/",
    badge: "In Development",
    badgeType: "coming" as const,
  },
];

const IQName = ({ name }: { name: string }) => {
  const idx = name.indexOf("IQ");
  return (
    <>
      {name.slice(0, idx)}<span className="text-primary neon-glow">IQ</span>{name.slice(idx + 2)}
    </>
  );
};

const ProductCard = ({ product, index }: { product: typeof products[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.6 }}
    >
      <a
        href={product.href}
        target={product.href.startsWith("http") ? "_blank" : undefined}
        rel={product.href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="block h-full glass-card-hover p-6 md:p-8 relative overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(91,227,232,0.15)]"
      >
        {/* Code-only visual treatment: no generated product imagery is used. */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_90%_10%,rgba(91,227,232,0.14),transparent_33%),linear-gradient(145deg,rgba(17,24,32,0.98),rgba(8,11,14,0.98))]" />

        {/* Hover glow overlay */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(91,227,232,0.04) 0%, transparent 70%)',
          }}
        />

        {/* Badge */}
        <div className="absolute top-4 right-4 z-10">
          <span
            className={`text-[10px] uppercase tracking-wider font-sans font-semibold px-3 py-1 rounded-full ${
              product.badgeType === "live"
                ? "text-primary"
                : "text-muted-foreground"
            }`}
            style={{
              background: product.badgeType === "live" ? 'rgba(91,227,232,0.08)' : 'rgba(255,255,255,0.03)',
              border: product.badgeType === "live" ? '1px solid rgba(91,227,232,0.2)' : '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {product.badge}
          </span>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary/5 transition-all duration-500 group-hover:bg-primary/15"
              style={{
                border: '1px solid rgba(91,227,232,0.15)',
              }}
            >
              <product.icon className="w-5 h-5 text-primary" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-sans font-semibold">{product.category}</span>
          </div>

          <h3 className="font-display text-2xl font-bold text-foreground mb-2 whitespace-nowrap">
            <IQName name={product.name} />
          </h3>
          <p className="text-muted-foreground mb-4 font-sans">{product.oneLiner}</p>

          <div
            className="text-xs mb-5 py-2 px-3 rounded-lg inline-block font-sans font-semibold uppercase tracking-wide text-primary"
            style={{ background: 'rgba(91,227,232,0.05)', border: '1px solid rgba(91,227,232,0.1)' }}
          >
            {product.metric}
          </div>

          <ul className="space-y-2 mb-6">
            {product.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground font-sans">
                <div className="w-1 h-1 rounded-full bg-primary" />
                {f}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all duration-300 font-sans">
            Explore <IQName name={product.name} />
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </a>
    </motion.div>
  );
};

const ProductsSection = () => {
  return (
    <SectionWrapper id="products" className="bg-paper py-16 text-ink-950 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-full mb-8">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-ink-950 mb-4 leading-tight">
            One Intelligence Ecosystem.{" "}
            <span className="text-gradient-primary">Four Competitive Advantages.</span>
          </h2>
          <p className="text-lg text-slate-600 font-sans">
            Every PresciaIQ product is built on the same AI backbone - sharing data, insights, and intelligence across your entire operation.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {products.map((p, i) => (
            <ProductCard key={p.name} product={p} index={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ProductsSection;
