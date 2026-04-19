import AnimatedCounter from "../AnimatedCounter";
import SectionWrapper from "../SectionWrapper";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  { title: "Predictive, Not Reactive", desc: "Our AI forecasts outcomes before they happen." },
  { title: "Australian-Built", desc: "Designed for Australian regulations, markets, and conditions." },
  { title: "Ecosystem Thinking", desc: "Every product shares intelligence. Your data works harder." },
  { title: "Enterprise-Grade, SMB-Priced", desc: "Palantir-level intelligence at a fraction of the cost." },
];

const WhySection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <SectionWrapper id="intelligence" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-16 max-w-4xl leading-tight">
          Why the Smartest Businesses Choose Prescia<span className="text-primary neon-glow">IQ</span>.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 mb-20">
          <AnimatedCounter end={150} prefix="$" suffix="M+" label="Risk Identified & Prevented" />
          <AnimatedCounter end={29} suffix="%" label="Gross Margin Improvement" />
          <AnimatedCounter end={6000} suffix="+" label="Businesses in Our Intelligence Network" />
        </div>

        <div ref={ref} className="grid lg:grid-cols-5 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3"
          >
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-sans">
              Most businesses operate on intuition. They guess which ad will perform. They hope the construction budget holds.
              They pray their operations scale.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mt-4 font-sans">
              PresciaIQ was built for founders who refuse to guess. Our AI doesn't just analyse - it predicts.
              It doesn't just report - it recommends. And it doesn't just serve one part of your business -
              it connects every intelligence layer into a single, unified ecosystem.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                className="glass-card-hover p-5"
                style={{ borderLeft: '2px solid rgba(0,255,136,0.3)' }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                  style={{ background: 'rgba(0,255,136,0.08)' }}
                >
                  <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {i === 0 && <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />}
                    {i === 1 && <><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></>}
                    {i === 2 && <><circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></>}
                    {i === 3 && <><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></>}
                  </svg>
                </div>
                <h4 className="font-sans text-sm font-semibold text-foreground mb-1">{f.title}</h4>
                <p className="text-xs text-muted-foreground font-sans">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default WhySection;
