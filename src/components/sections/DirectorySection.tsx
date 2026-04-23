import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Shield, Target, Settings, Wrench, Code2 } from "lucide-react";
import SectionWrapper from "../SectionWrapper";

const IQName = ({ name }: { name: string }) => {
  const idx = name.indexOf("IQ");
  if (idx === -1) return <>{name}</>;
  return (
    <>
      {name.slice(0, idx)}<span className="text-primary neon-glow">IQ</span>{name.slice(idx + 2)}
    </>
  );
};

type Product = {
  name: string;
  icon: typeof Shield;
  category: string;
  status: string;
  statusType: "live" | "coming";
  tagline: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  isExternal: boolean;
};

const products: Product[] = [
  {
    name: "BuildPredictIQ",
    icon: Shield,
    category: "CONSTRUCTION INTELLIGENCE",
    status: "LIVE",
    statusType: "live",
    tagline: "Quantified risk analysis before a single sod is turned.",
    features: ["Geotechnical Risk Mapping", "Financial Exposure Analysis", "Schedule Optimisation"],
    ctaLabel: "Explore BuildPredictIQ",
    ctaHref: "https://buildpredictiq.com.au",
    isExternal: true,
  },
  {
    name: "AdsIQ",
    icon: Target,
    category: "MARKETING INTELLIGENCE",
    status: "LIVE",
    statusType: "live",
    tagline: "Predict your ROAS before you spend a dollar.",
    features: ["Campaign Readiness Score", "Creative Analysis", "Multi-Platform (Meta, Google, TikTok, LinkedIn)"],
    ctaLabel: "Explore AdsIQ",
    ctaHref: "https://adsiq.com.au",
    isExternal: true,
  },
  {
    name: "OpsIQ",
    icon: Settings,
    category: "OPERATIONS INTELLIGENCE",
    status: "COMING Q3 2026",
    statusType: "coming",
    tagline: "Your entire business playbook, built in 4 weeks.",
    features: ["Done-For-You SOPs", "Face-to-Face Discovery", "Ongoing Optimisation"],
    ctaLabel: "Join Waitlist",
    ctaHref: "/contact",
    isExternal: false,
  },
  {
    name: "TradesmanIQ",
    icon: Wrench,
    category: "TRADES INTELLIGENCE",
    status: "IN DEVELOPMENT",
    statusType: "coming",
    tagline: "The digital backbone for modern Australian trades.",
    features: ["Job Management", "Compliance Tracking", "Client Portal"],
    ctaLabel: "Register Interest",
    ctaHref: "/contact",
    isExternal: false,
  },
];

const ProductCard = ({ product, index }: { product: Product; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const content = (
    <div className="relative h-full glass-card p-6 md:p-8 group transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,255,136,0.12)] hover:border-primary/20">
      {/* Status badge */}
      <div className="absolute top-4 right-4">
        <span
          className={`text-[10px] uppercase tracking-wider font-sans font-semibold px-3 py-1 rounded-full ${
            product.statusType === "live" ? "text-primary" : "text-muted-foreground"
          }`}
          style={{
            background: product.statusType === "live" ? "rgba(0,255,136,0.08)" : "rgba(255,255,255,0.03)",
            border: product.statusType === "live" ? "1px solid rgba(0,255,136,0.2)" : "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {product.status}
        </span>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: "rgba(0,255,136,0.05)", border: "1px solid rgba(0,255,136,0.15)" }}
        >
          <product.icon className="w-5 h-5 text-primary" />
        </div>
        <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-sans font-semibold">
          {product.category}
        </span>
      </div>

      <h3 className="font-display text-2xl font-bold text-foreground mb-2">
        <IQName name={product.name} />
      </h3>
      <p className="text-muted-foreground mb-4 font-sans text-sm">{product.tagline}</p>

      <ul className="space-y-2 mb-6">
        {product.features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground font-sans">
            <div className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        {product.statusType === "live" ? (
          <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-xl font-sans group-hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] transition-all duration-300">
            {product.ctaLabel} <ArrowRight className="w-4 h-4" />
          </span>
        ) : (
          <span
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl font-sans text-foreground transition-all duration-300"
            style={{ border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.03)" }}
          >
            {product.ctaLabel} <ArrowRight className="w-4 h-4" />
          </span>
        )}
      </div>
    </div>
  );

  const wrapper = (children: React.ReactNode) =>
    product.isExternal ? (
      <a href={product.ctaHref} target="_blank" rel="noopener noreferrer" className="block h-full no-underline" aria-label={`${product.ctaLabel} - ${product.name}`}>
        {children}
      </a>
    ) : (
      <a href={product.ctaHref} className="block h-full no-underline" aria-label={`${product.ctaLabel} - ${product.name}`}>
        {children}
      </a>
    );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="flex"
    >
      {wrapper(content)}
    </motion.div>
  );
};

const companyLinks = [
  { label: "About PresciaIQ", href: "/about" },
  { label: "Insights & Articles", href: "/blog" },
  { label: "Ecosystem Pricing", href: "/pricing" },
  { label: "Book a Strategy Call", href: "/contact" },
];

const DirectorySection = () => {
  const devRef = useRef<HTMLDivElement>(null);
  const devInView = useInView(devRef, { once: true, margin: "-50px" });

  return (
    <SectionWrapper id="directory" className="py-12 md:py-16 aurora-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <div className="mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-4 leading-tight">
            One Ecosystem.{" "}
            <span className="text-gradient-primary">Find Your Intelligence.</span>
          </h2>
          <p className="text-lg text-muted-foreground font-sans max-w-2xl">
            Tell us what you need and we'll take you straight there.
          </p>
        </div>

        {/* 2x2 Product Grid */}
        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          {products.map((p, i) => (
            <ProductCard key={p.name} product={p} index={i} />
          ))}
        </div>

        {/* Development Card */}
        <motion.div
          ref={devRef}
          initial={{ opacity: 0, y: 30 }}
          animate={devInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-6"
        >
          <a href="/development" className="block no-underline" aria-label="Scope Your Project - Web & App Development">
            <div className="glass-card p-6 md:p-8 group transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,255,136,0.12)] hover:border-primary/20">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: "rgba(0,255,136,0.05)", border: "1px solid rgba(0,255,136,0.15)" }}
                    >
                      <Code2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <span
                        className="text-[10px] uppercase tracking-wider font-sans font-semibold px-3 py-1 rounded-full text-primary"
                        style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.2)" }}
                      >
                        THE FOUNDATION OF INTELLIGENCE
                      </span>
                    </div>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                    Web & App Development
                  </h3>
                  <p className="text-muted-foreground font-sans text-sm mb-4">
                    Enterprise-grade websites and applications engineered for scale.
                  </p>
                  <div className="flex flex-wrap gap-4 mb-4">
                    {["Speed to Market", "Conversion-Obsessed Design", "AI-Ready Infrastructure"].map((f) => (
                      <span key={f} className="flex items-center gap-2 text-sm text-muted-foreground font-sans">
                        <div className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                        {f}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground font-sans">
                    From <span className="text-primary font-semibold">$5K</span> one-off&nbsp;&nbsp;|&nbsp;&nbsp;From <span className="text-primary font-semibold">$15K</span> app store build
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-semibold rounded-xl font-sans group-hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] transition-all duration-300">
                    Scope Your Project <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </a>
        </motion.div>

        {/* Company Links Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={devInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-wrap gap-3"
        >
          {companyLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="px-5 py-2.5 text-sm font-sans font-medium text-foreground rounded-full transition-all duration-200 hover:text-primary hover:border-primary/30 no-underline"
              style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.02)" }}
              aria-label={link.label}
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default DirectorySection;
