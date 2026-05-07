import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, BarChart3, Cpu, ExternalLink } from "lucide-react";
import SectionWrapper from "../SectionWrapper";
const portfolioLongevity = "/portfolio-longevity.png";
const portfolioBuildhire = "/portfolio-buildhire.png";
const portfolioLoop = "/portfolio-loop.png";

const projects = [
  {
    name: "Longevity Australia",
    url: "longevityaus.org",
    image: portfolioLongevity,
    description:
      "A secure, high-performance e-commerce platform for research-grade peptides, featuring complex bundle logic and a clinical, trustworthy aesthetic.",
    tags: ["React", "Next.js", "Tailwind", "Stripe"],
  },
  {
    name: "BuildHire",
    url: "buildhire.com.au",
    image: portfolioBuildhire,
    description:
      "A dynamic, conversion-optimised equipment hire platform with instant quoting, date-picker booking logic, and seamless fleet management.",
    tags: ["React", "Custom API", "Tailwind"],
  },
  {
    name: "Loop Consulting Group",
    url: "loopbc.com.au",
    image: portfolioLoop,
    description:
      "A premium, executive-level corporate website designed to establish authority and capture high-ticket B2B leads.",
    tags: ["Next.js", "Framer Motion", "Tailwind"],
  },
];

const valueProps = [
  {
    icon: Zap,
    title: "Speed to Market",
    description:
      "Rapid deployment without compromising on enterprise-grade architecture.",
  },
  {
    icon: BarChart3,
    title: "Conversion-Obsessed",
    description:
      "Every pixel and user flow is engineered to turn visitors into revenue.",
  },
  {
    icon: Cpu,
    title: "AI-Ready Infrastructure",
    description:
      "Built on modern stacks that integrate with predictive AI tools when you're ready to scale.",
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.a
      ref={ref}
      href={`https://${project.url}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className="glass-card-hover p-5 md:p-6 group relative overflow-hidden cursor-pointer block transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(0,255,136,0.04) 0%, transparent 70%)' }} />

      <div className="relative z-10 mb-4 rounded-lg overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-1.5 px-3 py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="w-2 h-2 rounded-full bg-red-500/60" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
          <div className="w-2 h-2 rounded-full bg-green-500/60" />
          <span className="ml-2 text-[10px] text-muted-foreground font-mono">{project.url}</span>
        </div>
        <img
          src={project.image}
          alt={`${project.name} website screenshot`}
          className="w-full h-56 md:h-60 object-cover object-top"
          loading="lazy"
        />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-display text-xl font-bold text-foreground">{project.name}</h3>
          <ExternalLink className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        <p className="text-sm text-muted-foreground font-sans mb-3 leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] uppercase tracking-wider font-mono font-semibold px-2.5 py-1 rounded-md text-primary"
              style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
};

const ValuePropCard = ({ vp, index }: { vp: typeof valueProps[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="glass-card p-6 text-center relative overflow-hidden"
    >
      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, rgba(0,255,136,0.6) 0%, rgba(0,255,136,0.1) 50%, transparent 100%)' }} />

      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
        style={{ background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.2)', boxShadow: '0 0 25px rgba(0,255,136,0.1)' }}
      >
        <vp.icon className="w-8 h-8 text-primary" />
      </div>
      <h3 className="font-display text-lg font-bold text-foreground mb-2">{vp.title}</h3>
      <p className="text-sm text-muted-foreground font-sans">{vp.description}</p>
    </motion.div>
  );
};

const AppBuildingSection = () => {
  return (
    <SectionWrapper id="development-services" className="py-24 md:py-20 aurora-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-full mb-16">
          <span className="text-[11px] uppercase tracking-[0.25em] text-primary font-sans font-semibold mb-4 block">
            The Foundation of Intelligence
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6 leading-tight whitespace-nowrap">
            Web Apps & <span className="text-primary">High-Performance Websites</span>
          </h2>
          <p className="text-lg text-muted-foreground font-sans leading-relaxed max-w-4xl">
            Before we build predictive AI, we build the digital infrastructure that powers it. For years, our bread and butter has been engineering enterprise-grade app store builds and high-converting websites for Australian businesses. We don't just build software; we build scalable digital assets designed for growth.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>

        {/* Value Propositions Strip */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {valueProps.map((vp, i) => (
            <ValuePropCard key={vp.title} vp={vp} index={i} />
          ))}
        </div>

        {/* Services Internal Links */}
        <div className="border-t border-white/10 pt-10">
          <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-sans font-semibold mb-5">Our Development Services</p>
          <div className="flex flex-wrap gap-4">
            <a href="/services/ai-software-development" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 text-sm font-sans font-medium text-foreground hover:border-primary hover:text-primary transition-colors">AI Software Development &rarr;</a>
            <a href="/services/ai-app-development" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 text-sm font-sans font-medium text-foreground hover:border-primary hover:text-primary transition-colors">AI App Development &rarr;</a>
            <a href="/services/ai-web-development" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 text-sm font-sans font-medium text-foreground hover:border-primary hover:text-primary transition-colors">AI Web Development &rarr;</a>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default AppBuildingSection;
