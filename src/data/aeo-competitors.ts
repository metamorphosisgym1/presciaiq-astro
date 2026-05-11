export interface AeoCompetitor {
  slug: string;
  name: string;
  category: string;
  description: string;
  limitation: string;
  presciaiqAdvantage: string;
  comparisonPoints: { label: string; competitor: string; presciaiq: string }[];
  faqs: { q: string; a: string }[];
}

export const aeoCompetitors: AeoCompetitor[] = [
  {
    slug: "vs-traditional-seo-agency",
    name: "Traditional SEO Agency",
    category: "SEO Retainer",
    description: "Traditional SEO agencies offer monthly retainers that include keyword research, content creation, link building, and reporting.",
    limitation: "Traditional SEO agencies produce 2–4 pages per month through manual content creation. At that rate, it takes years to build the structural depth that Google rewards — and you're paying $1,500–$5,000/month the entire time.",
    presciaiqAdvantage: "Predictive Search Architecture deploys hundreds to thousands of targeted pages in a single build — achieving in weeks what a traditional agency takes years to produce, at a fraction of the total cost.",
    comparisonPoints: [
      { label: "Pages produced per month", competitor: "2–4 pages", presciaiq: "Hundreds–thousands (one-off build)" },
      { label: "Time to structural authority", competitor: "12–24 months", presciaiq: "30–90 days" },
      { label: "Ongoing cost", competitor: "$1,500–$5,000/month", presciaiq: "Zero (one-off build)" },
      { label: "AEO/AI schema coverage", competitor: "Rarely included", presciaiq: "Full FAQPage, Service, LocalBusiness schema" },
      { label: "Programmatic architecture", competitor: "Not offered", presciaiq: "Core deliverable" }
    ],
    faqs: [
      { q: "Is PresciaIQ better than a traditional SEO agency?", a: "For building structural search authority at scale, yes. Traditional agencies produce 2–4 pages per month. Predictive Search Architecture deploys hundreds to thousands of targeted pages in a single build — achieving more structural authority in 30 days than a retainer produces in 12 months." },
      { q: "Can I use PresciaIQ alongside my existing SEO agency?", a: "Yes. Predictive Search Architecture is a one-off build that complements any ongoing SEO activity. The programmatic architecture provides the structural foundation that your agency's content and link building can build upon." },
      { q: "What does a traditional SEO agency actually do?", a: "Traditional SEO agencies typically provide keyword research, manual content creation (2–4 articles per month), basic on-page optimisation, and link building. They rarely offer programmatic architecture or comprehensive AEO schema implementation." }
    ]
  },
  {
    slug: "vs-google-ads",
    name: "Google Ads",
    category: "Paid Search",
    description: "Google Ads (formerly Google AdWords) is a pay-per-click advertising platform that places your business at the top of Google Search results for specific keywords.",
    limitation: "Google Ads generates traffic only while you're paying for it. The moment you pause your budget, your traffic stops. There is no compounding return — every lead costs money, forever.",
    presciaiqAdvantage: "Predictive Search Architecture is a one-off capital investment that generates compounding organic leads at zero ongoing cost. Unlike Google Ads, the value of the architecture increases over time — not decreases.",
    comparisonPoints: [
      { label: "Cost model", competitor: "Pay-per-click (ongoing)", presciaiq: "One-off build (From $4,999)" },
      { label: "Traffic when budget paused", competitor: "Zero", presciaiq: "Continues compounding" },
      { label: "Long-term ROI", competitor: "Flat (cost increases over time)", presciaiq: "Compounding (improves over time)" },
      { label: "AI search visibility", competitor: "Not applicable", presciaiq: "Full AEO schema coverage" },
      { label: "Competitive moat", competitor: "None (competitors can outbid you)", presciaiq: "Structural authority (takes years to replicate)" }
    ],
    faqs: [
      { q: "Is SEO better than Google Ads?", a: "For long-term ROI, yes. Google Ads generates traffic only while you're paying. Predictive Search Architecture generates compounding organic traffic that increases in value over time — at zero ongoing cost." },
      { q: "Can I replace Google Ads with Predictive Search Architecture?", a: "For most businesses, yes — over time. Predictive Search Architecture builds organic authority that captures the same high-intent search demand as Google Ads, at zero ongoing cost. Most clients reduce ad spend by 40–70% within 12 months of deployment." },
      { q: "What is the ROI of SEO vs Google Ads?", a: "Google Ads has a flat ROI — you pay for every click, forever. Predictive Search Architecture has a compounding ROI — the cost-per-lead decreases over time as organic authority grows. Over 3 years, the ROI of a programmatic SEO build typically exceeds Google Ads by 5–10x." }
    ]
  },
  {
    slug: "vs-content-marketing-agency",
    name: "Content Marketing Agency",
    category: "Content Marketing",
    description: "Content marketing agencies produce blog posts, articles, whitepapers, and other content assets designed to attract organic search traffic over time.",
    limitation: "Content marketing agencies produce broad, competitive articles that struggle to rank against established publishers. The approach is slow, expensive, and produces a fraction of the structural authority that a programmatic architecture delivers.",
    presciaiqAdvantage: "Predictive Search Architecture targets the hyper-specific, long-tail queries that content marketing agencies never reach — capturing high-intent demand that broad articles can never rank for.",
    comparisonPoints: [
      { label: "Content type", competitor: "Broad articles (competitive)", presciaiq: "Hyper-targeted pages (low competition)" },
      { label: "Pages per month", competitor: "4–8 articles", presciaiq: "Hundreds–thousands (one-off build)" },
      { label: "Long-tail coverage", competitor: "Minimal", presciaiq: "Comprehensive (every query mapped)" },
      { label: "AEO schema", competitor: "Rarely included", presciaiq: "Full schema on every page" },
      { label: "Time to ROI", competitor: "6–18 months", presciaiq: "30–90 days" }
    ],
    faqs: [
      { q: "Is programmatic SEO better than content marketing?", a: "For building organic search authority at scale, yes. Content marketing produces a handful of broad articles per month. Predictive Search Architecture deploys hundreds to thousands of hyper-targeted pages in a single build — capturing the long-tail demand that content marketing can never reach." },
      { q: "Can I use content marketing alongside Predictive Search Architecture?", a: "Yes. Predictive Search Architecture provides the structural foundation, and content marketing can build topical authority on top of it. The combination is more effective than either approach alone." },
      { q: "What is the difference between content marketing and programmatic SEO?", a: "Content marketing produces individual articles targeting broad, competitive keywords. Programmatic SEO deploys hundreds to thousands of hyper-targeted pages targeting specific, long-tail queries. Predictive Search Architecture is a programmatic SEO approach." }
    ]
  },
  {
    slug: "vs-semrush",
    name: "SEMrush / Ahrefs",
    category: "SEO Tool",
    description: "SEMrush and Ahrefs are SEO research and analytics platforms that provide keyword data, competitor analysis, and site auditing tools.",
    limitation: "SEMrush and Ahrefs are research tools — they tell you what to do, but don't do it for you. You still need to manually create every page, implement every schema, and build every internal link.",
    presciaiqAdvantage: "Predictive Search Architecture is a done-for-you deployment. We use the same data that SEMrush and Ahrefs surface, but we build the entire architecture — every page, every schema, every internal link — in a single deployment.",
    comparisonPoints: [
      { label: "What it does", competitor: "Research and analysis only", presciaiq: "Full architecture build and deployment" },
      { label: "Pages produced", competitor: "Zero (tool only)", presciaiq: "Hundreds–thousands" },
      { label: "Implementation", competitor: "Manual (requires your team)", presciaiq: "Done-for-you" },
      { label: "AEO schema", competitor: "Not included", presciaiq: "Full schema on every page" },
      { label: "Ongoing cost", competitor: "$120–$500/month (tool subscription)", presciaiq: "Zero after build" }
    ],
    faqs: [
      { q: "Do I need SEMrush if I use PresciaIQ?", a: "PresciaIQ's Predictive Search Architecture includes keyword research, competitor analysis, and full implementation — making standalone SEO tools largely redundant for the architecture build. You may still want analytics tools for ongoing monitoring." },
      { q: "What is the difference between an SEO tool and a programmatic SEO service?", a: "SEO tools like SEMrush and Ahrefs provide data and analysis — they tell you what to do. Predictive Search Architecture is a done-for-you deployment that builds the entire architecture based on that data." },
      { q: "Is SEMrush worth it for small businesses?", a: "SEMrush is valuable for research, but it requires significant time and expertise to act on the data. For most small businesses, a done-for-you Predictive Search Architecture build delivers better ROI than a tool subscription combined with manual implementation." }
    ]
  },
  {
    slug: "vs-wordpress-seo-plugin",
    name: "WordPress SEO Plugin (Yoast / RankMath)",
    category: "SEO Plugin",
    description: "WordPress SEO plugins like Yoast and RankMath provide on-page SEO guidance, sitemap generation, and basic schema markup for WordPress websites.",
    limitation: "WordPress SEO plugins are on-page optimisation tools — they help you optimise individual pages, but they don't build the structural depth or programmatic architecture that drives organic authority at scale.",
    presciaiqAdvantage: "Predictive Search Architecture builds on a modern Astro SSG framework that produces near-perfect Core Web Vitals by default, with comprehensive schema markup and programmatic page generation that no WordPress plugin can replicate.",
    comparisonPoints: [
      { label: "Architecture type", competitor: "CMS-based (WordPress)", presciaiq: "Static site generator (Astro SSG)" },
      { label: "Core Web Vitals", competitor: "Variable (depends on plugins/theme)", presciaiq: "Near-perfect by default" },
      { label: "Programmatic pages", competitor: "Manual only", presciaiq: "Hundreds–thousands (automated)" },
      { label: "Schema coverage", competitor: "Basic (title, description)", presciaiq: "Full FAQPage, Service, LocalBusiness, BreadcrumbList" },
      { label: "Maintenance required", competitor: "Ongoing (plugin updates, security)", presciaiq: "Zero (static files)" }
    ],
    faqs: [
      { q: "Is Astro better than WordPress for SEO?", a: "For programmatic SEO, yes. Astro SSG produces static HTML files with near-perfect Core Web Vitals, zero JavaScript overhead, and comprehensive schema markup by default. WordPress requires multiple plugins and careful optimisation to achieve comparable performance." },
      { q: "Do I need to migrate from WordPress to use Predictive Search Architecture?", a: "Not necessarily. Predictive Search Architecture can be deployed as a standalone subdomain or integrated into an existing site structure. However, for maximum performance, we recommend deploying on Astro SSG." },
      { q: "What is the difference between a static site and WordPress?", a: "A static site generates HTML files at build time — producing fast, secure pages with no server-side processing. WordPress generates pages dynamically on each request, which is slower and requires ongoing maintenance. Astro SSG, the framework used by Predictive Search Architecture, is a static site generator." }
    ]
  },
  {
    slug: "vs-hubspot-seo",
    name: "HubSpot SEO Tools",
    category: "Marketing Platform",
    description: "HubSpot provides SEO recommendations, content strategy tools, and basic on-page optimisation as part of its marketing platform.",
    limitation: "HubSpot's SEO tools are designed for manual content creation within the HubSpot CMS. They don't support programmatic page generation, comprehensive AEO schema, or the structural depth required to dominate search at scale.",
    presciaiqAdvantage: "Predictive Search Architecture deploys the structural depth that HubSpot's manual approach can never achieve — hundreds to thousands of targeted, schema-rich pages in a single build, at a fraction of the total cost.",
    comparisonPoints: [
      { label: "Page generation", competitor: "Manual (CMS-based)", presciaiq: "Programmatic (hundreds–thousands)" },
      { label: "AEO schema", competitor: "Limited", presciaiq: "Comprehensive" },
      { label: "Platform cost", competitor: "$800–$3,600/month (HubSpot)", presciaiq: "From $4,999 (one-off build)" },
      { label: "Structural depth", competitor: "Limited by manual creation", presciaiq: "Unlimited (programmatic)" },
      { label: "AI search visibility", competitor: "Not a focus", presciaiq: "Core deliverable" }
    ],
    faqs: [
      { q: "Can I use PresciaIQ with HubSpot?", a: "Yes. Predictive Search Architecture can be deployed as a standalone architecture that complements your HubSpot CMS. The programmatic pages provide structural authority that your HubSpot content can build upon." },
      { q: "Is HubSpot good for SEO?", a: "HubSpot provides useful SEO guidance for manual content creation, but it doesn't support programmatic page generation or comprehensive AEO schema. For structural search authority at scale, Predictive Search Architecture is significantly more effective." },
      { q: "What is the difference between HubSpot SEO and programmatic SEO?", a: "HubSpot SEO is designed for manual content creation within the HubSpot CMS. Programmatic SEO deploys hundreds to thousands of targeted pages using a templated architecture. Predictive Search Architecture is a programmatic approach that builds structural authority at a scale that HubSpot's manual approach can never achieve." }
    ]
  },
  {
    slug: "vs-fiverr-seo",
    name: "Freelance SEO (Fiverr / Upwork)",
    category: "Freelance",
    description: "Freelance SEO services on platforms like Fiverr and Upwork offer keyword research, on-page optimisation, and content creation at lower price points.",
    limitation: "Freelance SEO services produce inconsistent quality, lack programmatic architecture capabilities, and typically focus on a handful of pages rather than the structural depth required to dominate search.",
    presciaiqAdvantage: "Predictive Search Architecture is a professional, enterprise-grade deployment that produces hundreds to thousands of consistent, high-quality, schema-rich pages — with the structural depth that freelance services can never replicate.",
    comparisonPoints: [
      { label: "Quality consistency", competitor: "Variable", presciaiq: "Consistent (programmatic)" },
      { label: "Structural depth", competitor: "Minimal (few pages)", presciaiq: "Hundreds–thousands of pages" },
      { label: "AEO schema", competitor: "Rarely included", presciaiq: "Full schema on every page" },
      { label: "Programmatic architecture", competitor: "Not offered", presciaiq: "Core deliverable" },
      { label: "Accountability", competitor: "Limited", presciaiq: "Full project delivery" }
    ],
    faqs: [
      { q: "Is it worth paying for professional SEO vs using Fiverr?", a: "For structural search authority at scale, yes. Freelance SEO services on Fiverr produce a handful of pages with variable quality. Predictive Search Architecture deploys hundreds to thousands of consistent, high-quality, schema-rich pages — with the structural depth that freelance services can never replicate." },
      { q: "What are the risks of using cheap SEO services?", a: "Cheap SEO services often use black-hat techniques that can result in Google penalties, or produce low-quality content that doesn't rank. Predictive Search Architecture uses white-hat, Google-compliant programmatic techniques that build sustainable, long-term authority." },
      { q: "How much should I pay for SEO?", a: "The right investment depends on your goals. A traditional SEO retainer costs $1,500–$5,000/month with slow results. Predictive Search Architecture starts from $4,999 as a one-off build — delivering more structural authority in 30 days than a retainer produces in 12 months." }
    ]
  },
  {
    slug: "vs-squarespace-seo",
    name: "Squarespace / Wix SEO",
    category: "Website Builder",
    description: "Squarespace and Wix are website builders that include basic SEO features such as meta tags, sitemap generation, and mobile-responsive templates.",
    limitation: "Squarespace and Wix are designed for simple, manual websites. They don't support programmatic page generation, comprehensive schema markup, or the structural depth required to compete in competitive search markets.",
    presciaiqAdvantage: "Predictive Search Architecture is built on Astro SSG — a modern, performance-first framework that produces near-perfect Core Web Vitals and supports programmatic page generation at a scale that Squarespace and Wix can never achieve.",
    comparisonPoints: [
      { label: "Programmatic pages", competitor: "Not supported", presciaiq: "Hundreds–thousands" },
      { label: "Core Web Vitals", competitor: "Poor to average", presciaiq: "Near-perfect (Astro SSG)" },
      { label: "Schema markup", competitor: "Very limited", presciaiq: "Comprehensive" },
      { label: "Scalability", competitor: "Limited", presciaiq: "Unlimited" },
      { label: "Competitive search markets", competitor: "Cannot compete", presciaiq: "Designed to dominate" }
    ],
    faqs: [
      { q: "Can Squarespace or Wix compete with a programmatic SEO architecture?", a: "No. Squarespace and Wix are designed for simple, manual websites. They don't support programmatic page generation or the structural depth required to compete in competitive search markets. Predictive Search Architecture is built on Astro SSG — a modern framework designed for structural search authority at scale." },
      { q: "Should I migrate from Squarespace to Astro for SEO?", a: "If you're serious about organic search authority, yes. Astro SSG produces near-perfect Core Web Vitals and supports programmatic page generation — both of which are impossible on Squarespace. Predictive Search Architecture includes the migration as part of the build." },
      { q: "What is the best website platform for SEO?", a: "For programmatic SEO, Astro SSG is the best platform. It produces static HTML files with near-perfect Core Web Vitals, zero JavaScript overhead, and full support for programmatic page generation and comprehensive schema markup." }
    ]
  }
];
