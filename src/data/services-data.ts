export interface ServiceData {
  slug: string;
  name: string;
  shortName: string;
  href: string;
  tagline: string;
  description: string;
  deliverables: string[];
  differentiator: string;
}

export const servicesData: ServiceData[] = [
  {
    slug: "ai-software-development",
    name: "AI Software Development",
    shortName: "AI software",
    href: "/services/ai-software-development",
    tagline: "Custom enterprise software with predictive intelligence embedded at the core",
    description: "We build custom AI-native software applications where machine learning and predictive models are embedded into the core architecture — not bolted on as an afterthought.",
    deliverables: [
      "Custom predictive intelligence platforms",
      "Machine learning model development and deployment",
      "Data pipeline architecture and integration",
      "Real-time decision automation systems",
      "API-first AI infrastructure"
    ],
    differentiator: "Unlike traditional software agencies, every system we build is designed to predict, not just record. Your software acts on data before problems materialise."
  },
  {
    slug: "ai-app-development",
    name: "AI App Development",
    shortName: "AI apps",
    href: "/services/ai-app-development",
    tagline: "Mobile and web applications powered by predictive AI",
    description: "We build AI-powered mobile and web applications that put predictive intelligence directly in the hands of your team — surfacing insights and automating decisions in real time.",
    deliverables: [
      "AI-powered mobile applications (iOS & Android)",
      "Progressive web apps with embedded intelligence",
      "Real-time data visualisation dashboards",
      "Predictive alert and notification systems",
      "User-facing AI recommendation engines"
    ],
    differentiator: "Our apps don't just display data — they predict what your team needs to know next and surface it automatically, reducing decision lag across your entire operation."
  },
  {
    slug: "ai-web-development",
    name: "AI Web Development",
    shortName: "AI web platforms",
    href: "/services/ai-web-development",
    tagline: "High-performance web platforms with AI-driven personalisation and intelligence",
    description: "We build AI-powered web platforms that learn from user behaviour, predict demand, and automate complex workflows — turning your website from a brochure into an intelligent business asset.",
    deliverables: [
      "AI-driven web applications and portals",
      "Intelligent lead scoring and conversion optimisation",
      "Predictive content personalisation engines",
      "Automated workflow and process intelligence",
      "Performance-optimised, SEO-ready architecture"
    ],
    differentiator: "Our web platforms are built to generate revenue, not just traffic. Every interaction is analysed to predict user intent and automate the next best action."
  }
];
