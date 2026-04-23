import { Star } from "lucide-react";

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
  <div className="flex gap-0.5 mb-4">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
    ))}
  </div>
);

const InitialsAvatar = ({ initials }: { initials: string }) => (
  <div
    className="w-10 h-10 rounded-full flex items-center justify-center font-sans font-bold text-sm text-white"
    style={{ background: 'linear-gradient(135deg, hsl(160, 84%, 25%), hsl(160, 84%, 35%))' }}
  >
    {initials}
  </div>
);

const TestimonialCard = ({ t }: { t: typeof testimonials[0] }) => (
  <div className="glass-card p-6 md:p-8 flex flex-col h-full">
    <StarRating />
    <p className="leading-relaxed mb-6 text-sm md:text-base italic font-display text-foreground/90 flex-1">
      "{t.quote}"
    </p>
    <div className="flex items-center gap-3">
      <InitialsAvatar initials={t.initials} />
      <div>
        <p className="text-sm font-semibold text-foreground font-sans">{t.author}</p>
        <p className="font-sans text-xs text-muted-foreground">
          <strong>{t.role}</strong>, {t.location}
        </p>
      </div>
    </div>
  </div>
);


const SocialProofSection = () => {
  return (
    <section className="py-24 md:py-32 aurora-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-16 max-w-full leading-tight text-foreground">
          Trusted by Founders Building With PresciaIQ.
        </h2>

        {/* Static 3-column grid on desktop, stack on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((t) => (
            <TestimonialCard key={t.initials} t={t} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default SocialProofSection;
