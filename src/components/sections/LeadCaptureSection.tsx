import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import ParticleVortex from "../three/ParticleVortex";

const LeadCaptureSection = () => {
  const handleOpenStrategyModal = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== "undefined") {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent("open-strategy-modal"));
    }
  };

  return (
    <section className="relative isolate flex min-h-[85vh] w-full flex-col items-center justify-center overflow-hidden bg-black py-32 md:py-44">
      <ParticleVortex className="absolute inset-0 z-0 h-full w-full" mint="#00FF88" white="#FFFFFF" />

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto w-full max-w-6xl px-5 text-center sm:px-8"
      >
        <motion.h2
          initial={{ opacity: 0, y: 24, clipPath: "inset(0 100% 0 0)" }}
          whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-5xl text-4xl font-extrabold leading-[1.08] tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] sm:text-5xl md:text-6xl"
        >
          Ready to Scale Your Digital Infrastructure?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-4 max-w-xl text-base font-normal leading-relaxed text-neutral-200/90 md:text-lg"
        >
          Book a predictive intelligence briefing with our Sydney engineering and leadership team.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex justify-center"
        >
          <a
            href="/contact/"
            onClick={handleOpenStrategyModal}
            className="group/btn relative inline-flex items-center gap-2.5 rounded-full bg-[#00FF88] px-8 py-4 text-sm font-semibold tracking-wide text-neutral-950 shadow-[0_0_20px_rgba(0,255,136,0.18)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_32px_rgba(0,255,136,0.4)] active:scale-[0.98] sm:px-10"
          >
            <span>Book Your Predictive ROI Briefing</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-12 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-xs font-medium uppercase tracking-widest text-neutral-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] sm:mt-14 sm:gap-x-7 md:text-sm"
        >
          <span>Direct Founder Access</span>
          <span aria-hidden="true">•</span>
          <span>Full Telemetry Blueprint</span>
          <span aria-hidden="true">•</span>
          <span>Holdout-Validated ROI Model</span>
        </motion.p>
      </motion.div>
    </section>
  );
};

export default LeadCaptureSection;
