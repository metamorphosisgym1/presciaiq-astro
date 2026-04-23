import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import SectionWrapper from "../SectionWrapper";

const features = [
  { title: "Australian-first, not Australia-adapted", desc: "Built in Sydney for the operating conditions of Australian SMB and mid-market businesses. Not retrofitted from tooling built for companies ten times our customers' size." },
  { title: "Vertical, not horizontal", desc: "Generic predictive analytics is a race to the bottom. Each Prescia IQ product is purpose-built for the decision an operator in that vertical is actually making." },
  { title: "Evidence before claim", desc: "We do not publish statistics we cannot substantiate or partnerships we cannot name. Every number on this page is defensible. Where a number is modelled, we say so." },
];

const products = [
  { name: "AdsIQ", desc: "Campaign timing and spend forecasting for marketing teams and media buyers.", status: "Live" },
  { name: "BuildPredictIQ", desc: "Risk and budget intelligence for construction.", status: "Live" },
  { name: "OpsIQ", desc: "Operational bottleneck prediction for logistics and ops-heavy businesses.", status: "On our 2026 roadmap" },
  { name: "TradesmanIQ", desc: "Job profitability and scheduling intelligence for field services and trades.", status: "On our 2026 roadmap" },
];

const team = [
  {
    name: "Alex Cutajar",
    role: "Co-Founder",
    bio: "Ten years of running SMB and FMCG businesses taught Alex the lesson Prescia IQ is built around: operators make the most important decisions of the week without the data to back them. After launching his first software product in 2022 and spending two years inside applied AI through Flourish, he stopped consulting and started building. He leads product, architecture, and the AI systems under every Prescia IQ vertical."
  },
  {
    name: "Macauley Burke",
    role: "Co-Founder",
    bio: "Seven years of direct B2B sales inside Australian SMBs through Modern Body Method put Macca in front of the people who buy decisions, not tools. Every engagement ran on the same question Prescia IQ now answers at a deeper layer: where is this business leaking money, time, or attention, and how do you show that to a decision-maker with ten minutes to care. He leads commercial, partnerships, and customer."
  }
];

const WhySection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <SectionWrapper id="intelligence" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* The Reaction Tax */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mb-24"
        >
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            The Reaction Tax
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-sans mb-6">
            Every business in Australia pays a tax that never appears on a P&L.
          </p>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-sans mb-6">
            It is the ad spend burned for two weeks before the campaign is pulled. The build that slips six weeks because nobody saw the supplier delay forming. The trades crew on a site that was never going to be ready. The warehouse that ran dry the day demand spiked, and the one next door that sat full while the market moved on.
          </p>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-sans mb-6">
            We call it the Reaction Tax. The price a business pays every time it learns something after it has already happened.
          </p>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-sans mb-6">
            Australian SMB and mid-market operators pay the highest Reaction Tax in the market. Not because the data does not exist, but because the tools that would surface it in time are either priced for enterprise, built for US operating conditions, or too generic to answer the specific decision an Australian operator is making this week.
          </p>
          <p className="text-xl md:text-2xl text-foreground font-semibold leading-relaxed font-sans">
            Prescia IQ was built to close that gap.
          </p>
        </motion.div>

        {/* What we build & How we think */}
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 mb-24">
          
          {/* What we build */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6 leading-snug">
              What we build
            </h3>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-sans mb-8">
              Prescia IQ is Australia's predictive intelligence company. We build AI forecasting tools across four verticals where the Reaction Tax hits hardest.
            </p>
            <div className="space-y-6">
              {products.map((p, i) => (
                <div key={p.name} className="glass-card-hover p-5" style={{ borderLeft: "2px solid rgba(0,255,136,0.3)" }}>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-sans text-base font-bold text-foreground">{p.name}</h4>
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {p.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground font-sans">{p.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-sans mt-8 italic">
              Each product is a vertical answer to the same underlying question. What is going to happen, and what should I do about it before it does.
            </p>
          </motion.div>

          {/* How we think */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6 leading-snug">
              How we think
            </h3>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-sans mb-8">
              Three things shape everything we build.
            </p>
            <div className="space-y-6">
              {features.map((f, i) => (
                <div key={f.title} className="glass-card p-6">
                  <h4 className="font-sans text-base font-bold text-foreground mb-2">{f.title}</h4>
                  <p className="text-sm text-muted-foreground font-sans leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* The operators behind Prescia IQ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-24"
        >
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              The operators behind Prescia IQ
            </h3>
            <p className="text-lg text-muted-foreground font-sans">
              Prescia IQ is built by people who have run the businesses we serve.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {team.map((t) => (
              <div key={t.name} className="glass-card p-8 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <h4 className="font-display text-2xl font-bold text-foreground mb-1">{t.name}</h4>
                  <p className="text-primary font-semibold text-sm mb-6 uppercase tracking-wider">{t.role}</p>
                  <p className="text-sm md:text-base text-muted-foreground font-sans leading-relaxed">
                    {t.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Intelligence That Moves First */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center max-w-4xl mx-auto glass-card p-12 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-primary/5" />
          <div className="relative z-10">
            <h3 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              Intelligence That Moves First
            </h3>
            <p className="text-lg md:text-xl text-muted-foreground font-sans mb-4">
              The businesses that win the next decade will not be the ones with the most data.
            </p>
            <p className="text-lg md:text-xl text-foreground font-semibold font-sans mb-8">
              They will be the ones that act on it first.
            </p>
            <p className="text-sm text-primary font-bold uppercase tracking-widest">
              That is what we are building.
            </p>
          </div>
        </motion.div>

      </div>
    </SectionWrapper>
  );
};

export default WhySection;
