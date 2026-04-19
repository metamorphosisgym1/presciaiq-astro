import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "../SectionWrapper";

const steps = [
  { num: "01", title: "IDENTIFY", desc: "We analyse your business and identify which intelligence gaps are costing you money." },
  { num: "02", title: "PREDICT", desc: "Our AI models forecast outcomes, risks, and opportunities before they materialise." },
  { num: "03", title: "ACT", desc: "You receive actionable recommendations - not just data. Clear next steps, every time." },
  { num: "04", title: "OPTIMISE", desc: "As your data grows, our predictions get sharper. The ecosystem learns and compounds." },
];

const FlywheelSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <SectionWrapper className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-16 leading-tight">
          From Insight to Action in <span className="text-gradient-primary">Four Steps.</span>
        </h2>

        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="relative"
            >
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px z-0" style={{ background: 'linear-gradient(to right, rgba(0,255,136,0.2), transparent)' }} />
              )}
              <div
                className="glass-card-hover p-6 md:p-8 relative z-10 h-full"
                style={{ border: '1px solid rgba(0,255,136,0.15)' }}
              >
                <span className="font-mono text-3xl font-bold mb-4 block text-primary/30">{step.num}</span>
                <h3 className="font-sans text-sm uppercase tracking-widest text-primary font-semibold mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-sans">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default FlywheelSection;
