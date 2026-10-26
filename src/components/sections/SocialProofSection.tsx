import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";
import SectionWrapper from "../SectionWrapper";

const testimonials = [
  {
    quote: "BuildHire went from concept to a fully functional equipment hire platform with instant quoting and booking logic. The speed and quality blew us away.",
    author: "Founder",
    initials: "BH",
    role: "BuildHire",
    location: "Australia",
  },
  {
    quote: "Loop's new website completely transformed how enterprise clients perceive us. We've seen a measurable lift in inbound leads since launch.",
    author: "Founder",
    initials: "LC",
    role: "Loop Consulting Group",
    location: "Australia",
  },
  {
    quote: "Longevity needed a platform that balanced clinical credibility with seamless e-commerce. PresciaIQ delivered exactly that, on time and on budget.",
    author: "Founder",
    initials: "LA",
    role: "Longevity Australia",
    location: "Australia",
  },
];

const StarRating = () => (
  <div className="flex gap-1 text-[#8FAF8F] text-sm mb-4 tracking-widest">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-[#8FAF8F] text-[#8FAF8F]" />
    ))}
  </div>
);

const SocialProofSection = () => {
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(testimonialsRef, { once: true, margin: "0px 0px -50px 0px" });

  return (
    <SectionWrapper className="py-16 md:py-20 bg-[#080808] border-b border-[#1A221C] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#233026] bg-[#131A15] text-[#8FAF8F] font-mono text-[11px] tracking-[0.2em] uppercase mb-4 font-semibold">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8FAF8F] opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#8FAF8F]" />
            </span>
            VERIFIED OPERATOR FEEDBACK
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-semibold text-[#F0EDE6] tracking-tight mb-4">
            Trusted by Founders Building With <span className="text-[#8FAF8F] italic font-serif">PresciaIQ.</span>
          </h2>
          <p className="text-zinc-400 text-base max-w-xl mx-auto font-sans leading-relaxed">
            Real outcomes from operators deploying high-performance software and predictive AI.
          </p>
        </div>

        {/* 3 Founder Testimonials Grid */}
        <div ref={testimonialsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-10">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.initials}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.08, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-[#232A25] bg-[#111613] p-7 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:border-[#3E5A45] hover:shadow-[0_0_20px_rgba(143,175,143,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between text-left"
            >
              <div>
                <StarRating />
                <p className="text-sm font-sans text-zinc-300 leading-relaxed italic mb-6 font-normal">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-5 border-t border-[#1E2420]">
                <div className="w-9 h-9 rounded-full bg-[#17201A] border border-[#27352B] text-xs font-mono text-[#8FAF8F] flex items-center justify-center font-bold flex-shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="text-xs font-sans font-semibold text-[#F0EDE6]">{t.author}</p>
                  <p className="text-xs font-sans text-zinc-400">{t.role} · {t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default SocialProofSection;
