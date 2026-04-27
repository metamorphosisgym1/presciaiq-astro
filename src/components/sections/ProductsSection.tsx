import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Shield, Target, Settings, Wrench } from "lucide-react";
import SectionWrapper from "../SectionWrapper";
const heroBuild = "/hero-buildpredictiq.jpg";
const heroAds = "/hero-adsiq.jpg";
const heroOps = "/hero-opsiq.jpg";
const heroTrades = "/hero-tradesmaniq.jpg";

const products = [
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
    heroImage: heroBuild,
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
    heroImage: heroAds,
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
    heroImage: heroOps,
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
    heroImage: heroTrades,
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
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.6 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <a
        href={product.href}
        target={product.href.startsWith("http") ? "_blank" : undefined}
        rel={product.href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="block h-full glass-card-hover p-6 md:p-8 relative overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]"
      >
        {/* Background hero image at 50% opacity */}
        <div className="absolute inset-0 z-0">
          <img
            src={product.heroImage}
            alt=""
            className="w-full h-full object-cover transition-opacity duration-700"
            style={{ opacity: hovered ? 0.95 : 0.8 }}
            
            width={800}
            height={600}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(5,5,8,0.7) 0%, rgba(5,5,8,0.85) 50%, rgba(5,5,8,0.95) 100%)' }} />
        </div>

        {/* Hover glow overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-700 pointer-events-none z-[1]"
          style={{
            opacity: hovered ? 1 : 0,
            background: 'radial-gradient(circle at 50% 50%, rgba(0,255,136,0.04) 0%, transparent 70%)',
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
              background: product.badgeType === "live" ? 'rgba(0,255,136,0.08)' : 'rgba(255,255,255,0.03)',
              border: product.badgeType === "live" ? '1px solid rgba(0,255,136,0.2)' : '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {product.badge}
          </span>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500"
              style={{
                background: hovered ? 'rgba(0,255,136,0.15)' : 'rgba(0,255,136,0.05)',
                border: '1px solid rgba(0,255,136,0.15)',
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
            style={{ background: 'rgba(0,255,136,0.05)', border: '1px solid rgba(0,255,136,0.1)' }}
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
    <SectionWrapper id="products" className="py-12 md:py-16 aurora-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-full mb-8">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-4 leading-tight">
            One Intelligence Ecosystem.{" "}
            <span className="text-gradient-primary">Four Competitive Advantages.</span>
          </h2>
          <p className="text-lg text-muted-foreground font-sans">
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
