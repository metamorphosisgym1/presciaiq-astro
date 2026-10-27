import React from "react";
import { Linkedin, Twitter } from "lucide-react";
import { motion } from "framer-motion";

interface NavLink {
  label: string;
  href: string;
  badge?: string;
  external?: boolean;
}

const features: NavLink[] = [
  { label: "BuildPredictIQ", href: "https://buildpredictiq.com.au/", badge: "Live", external: true },
  { label: "AdsIQ", href: "https://adsiq.com.au/", badge: "Live", external: true },
  { label: "Daynori", href: "/services/ai-software-development/", badge: "Enterprise" },
  { label: "AI Automations & Agents", href: "/products/ai-automations/" },
  { label: "High-Performance Platforms", href: "/development/" },
];

const solutions: NavLink[] = [
  { label: "Construction & Infrastructure", href: "/industries/construction/" },
  { label: "Marketing & Ad Agencies", href: "/industries/marketing-agencies/" },
  { label: "Enterprise Operations", href: "/services/ai-software-development/" },
  { label: "Logistics & Supply Chain", href: "/industries/logistics/" },
  { label: "Financial Services", href: "/industries/financial-services/" },
  { label: "Mid-Market SMB", href: "/industries/smb/" },
];

const resources: NavLink[] = [
  { label: "Predictive ROI Calculator", href: "/pricing/", badge: "Free" },
  { label: "Insights & Case Studies", href: "/insights/" },
  { label: "Technical Q&A Answers", href: "/answers/" },
  { label: "Topical Authority (AEO)", href: "/services/aeo-seo-predictive-search-architecture/" },
  { label: "Ecosystem Pricing", href: "/pricing/" },
];

const company: NavLink[] = [
  { label: "About PresciaIQ", href: "/about/" },
  { label: "The Operators", href: "/#intelligence" },
  { label: "Operating Principles", href: "/#intelligence" },
  { label: "Channel Partners", href: "/partners/" },
  { label: "Contact Leadership", href: "/contact/" },
];

const Footer = () => {
  return (
    <footer className="w-full bg-[#020503] pt-20 pb-12 text-left relative z-10 overflow-hidden">
      {/* ── Left Flank Olive Ambient Glow ── */}
      <div
        className="pointer-events-none absolute bottom-0 -left-16 w-72 h-72 bg-[#6D896E]/10 blur-[130px] rounded-full"
        aria-hidden="true"
      />
      {/* ── Right Flank Olive Ambient Glow ── */}
      <div
        className="pointer-events-none absolute top-0 -right-16 w-72 h-72 bg-[#6D896E]/[0.08] blur-[130px] rounded-full"
        aria-hidden="true"
      />
      {/* ── Top seamless fade from CTA section ── */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#6D896E]/15 to-transparent"
        aria-hidden="true"
      />

      <div className="w-full max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Main Grid: Clean Brand Flank + 4 Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left Flank: Clean Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 pr-0 lg:pr-8"
          >
            <a href="/" className="inline-block mb-5">
              <img
                src="/assets/presciaiq-logo-transparent.png"
                alt="PresciaIQ"
                className="h-7 sm:h-8 w-auto object-contain opacity-95 hover:opacity-100 transition-opacity"
              />
            </a>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm mb-6 font-sans">
              Enterprise-grade predictive AI infrastructure engineered for high-growth Australian operators.
            </p>
            {/* Operational Status Pill */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#6D896E]/[0.08] border border-[#6D896E]/25 text-xs font-mono text-[#6D896E] shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#6D896E] animate-pulse shadow-[0_0_8px_rgba(109,137,110,0.6)]" />
              <span>Systems Operational // Holdout-Validated Engine</span>
            </motion.div>
          </motion.div>

          {/* Right Columns: 4 Navigation Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {/* Column 1: Features */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <h4 className="text-sm font-semibold text-white tracking-wide mb-4">
                Features
              </h4>
              <ul className="space-y-2">
                {features.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group inline-flex items-center text-sm text-neutral-400 hover:text-[#6D896E] transition-colors py-0.5"
                    >
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#6D896E]/20 text-[#6D896E] border border-[#6D896E]/30 ml-2 font-mono leading-none font-medium">
                          {item.badge}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Column 2: Solutions */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            >
              <h4 className="text-sm font-semibold text-white tracking-wide mb-4">
                Solutions
              </h4>
              <ul className="space-y-2">
                {solutions.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="group inline-flex items-center text-sm text-neutral-400 hover:text-[#6D896E] transition-colors py-0.5"
                    >
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Column 3: Resources */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              <h4 className="text-sm font-semibold text-white tracking-wide mb-4">
                Resources
              </h4>
              <ul className="space-y-2">
                {resources.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="group inline-flex items-center text-sm text-neutral-400 hover:text-[#6D896E] transition-colors py-0.5"
                    >
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#6D896E]/20 text-[#6D896E] border border-[#6D896E]/30 ml-2 font-mono leading-none font-medium">
                          {item.badge}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Column 4: Company */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <h4 className="text-sm font-semibold text-white tracking-wide mb-4">
                Company
              </h4>
              <ul className="space-y-2">
                {company.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="group inline-flex items-center text-sm text-neutral-400 hover:text-[#6D896E] transition-colors py-0.5"
                    >
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Sub-Footer Bar — seamless, no hard border */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
          style={{
            borderTop: "1px solid transparent",
            backgroundImage:
              "linear-gradient(to right, transparent, rgba(109,137,110,0.15) 20%, rgba(109,137,110,0.15) 80%, transparent)",
            backgroundOrigin: "border-box",
            backgroundClip: "border-box",
            borderImageSource:
              "linear-gradient(to right, transparent, rgba(109,137,110,0.3) 30%, rgba(109,137,110,0.3) 70%, transparent)",
            borderImageSlice: 1,
          }}
        >
          <p className="text-xs font-mono text-neutral-500/80">
            © 2026 PresciaIQ Pty Ltd. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-4 text-neutral-500">
              <a
                href="/privacy/"
                className="text-xs font-mono hover:text-[#6D896E] transition-colors"
              >
                Privacy Policy
              </a>
              <span className="text-neutral-700">•</span>
              <a
                href="/terms/"
                className="text-xs font-mono hover:text-[#6D896E] transition-colors"
              >
                Terms of Service
              </a>
              <span className="text-neutral-700">•</span>
              <a
                href="/insights/ai-automation-security-privacy/"
                className="text-xs font-mono hover:text-[#6D896E] transition-colors"
              >
                Security
              </a>
            </div>

            <div className="flex items-center gap-3 pl-2 sm:border-l sm:border-white/[0.06] text-neutral-500">
              <a
                href="https://www.linkedin.com/company/presciaiq-holdings"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg hover:bg-[#6D896E]/10 hover:text-[#6D896E] transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/presciaiq"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg hover:bg-[#6D896E]/10 hover:text-[#6D896E] transition-all"
                aria-label="X / Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
