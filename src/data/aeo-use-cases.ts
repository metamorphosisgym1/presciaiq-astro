export interface AeoUseCase {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  description: string;
  howItWorks: string;
  outcome: string;
  pagesGenerated: string;
  exampleClient: string;
  exampleResult: string;
  faqs: { q: string; a: string }[];
}

export const aeoUseCases: AeoUseCase[] = [
  {
    slug: "service-location-pages",
    title: "Service × Location Page Clusters",
    shortTitle: "Service × Location Clusters",
    category: "Location SEO",
    description: "Deploy a dedicated, highly optimised page for every service you offer in every location you serve — capturing hyper-local search demand across your entire service area.",
    howItWorks: "We map every service you offer and every location you serve, then deploy a unique, schema-rich page for each combination. Each page includes LocalBusiness schema, geo-targeted content, and location-specific FAQs — signalling to Google that your business is the authoritative local provider.",
    outcome: "Businesses that deploy Service × Location clusters typically begin ranking for location-specific queries within 30–60 days, capturing organic demand from every market they serve.",
    pagesGenerated: "Services × Locations (e.g., 10 services × 20 locations = 200 pages)",
    exampleClient: "LoopBC (Business Consulting)",
    exampleResult: "380 → 5,763 pages — a 15x increase in indexed pages across 20 service lines and 15 locations.",
    faqs: [
      { q: "Why do I need separate pages for each location?", a: "Google cannot rank a single page for location-specific queries across multiple cities. A dedicated location page for each market you serve is required to capture local search demand." },
      { q: "How many location pages do I need?", a: "One per location you serve, at minimum. For maximum coverage, deploy a page for every service × location combination — ensuring you capture every hyper-local search query in your market." },
      { q: "What content should a location page include?", a: "A location page should include: location-specific service description, LocalBusiness schema, geo-targeted FAQs, and a clear call to action. Predictive Search Architecture generates all of these programmatically." }
    ]
  },
  {
    slug: "industry-vertical-pages",
    title: "Industry Vertical Page Clusters",
    shortTitle: "Industry Vertical Clusters",
    category: "Industry SEO",
    description: "Deploy a dedicated, highly optimised page for every industry you serve — demonstrating deep sector expertise and capturing industry-specific search demand.",
    howItWorks: "We map every industry your business serves, then deploy a unique, schema-rich page for each one. Each page includes industry-specific pain points, outcomes, and FAQs — signalling to Google that your business has deep expertise in each sector.",
    outcome: "Businesses that deploy Industry Vertical clusters typically begin ranking for industry-specific queries within 30–60 days, capturing demand from prospects who would never find a generic services page.",
    pagesGenerated: "Services × Industries (e.g., 5 services × 20 industries = 100 pages)",
    exampleClient: "BuildHire (Equipment Hire)",
    exampleResult: "216 → 7,398 pages — an 8x increase in indexed pages across 6 industry verticals and 83 locations.",
    faqs: [
      { q: "Why do I need industry-specific pages?", a: "Google rewards relevance. A generic services page cannot rank for industry-specific queries. Each industry you serve requires a dedicated page that demonstrates deep understanding of that sector's specific challenges and outcomes." },
      { q: "How many industry pages do I need?", a: "One per industry you serve, at minimum. For maximum coverage, deploy a page for every service × industry combination — ensuring you capture every industry-specific search query in your market." },
      { q: "What makes a good industry landing page?", a: "An effective industry landing page includes: industry-specific pain points, relevant outcomes and case studies, FAQPage schema with industry-specific questions, and a clear call to action. Predictive Search Architecture generates all of these programmatically." }
    ]
  },
  {
    slug: "faq-aeo-pages",
    title: "FAQ / AEO Answer Pages",
    shortTitle: "FAQ & AEO Answer Pages",
    category: "Answer Engine Optimisation",
    description: "Deploy hundreds of dedicated FAQ pages, each targeting a specific question your prospects are asking — capturing both traditional search traffic and AI Answer Engine citations.",
    howItWorks: "We map every question your prospects are asking about your services, industry, and problems, then deploy a dedicated, schema-rich FAQ page for each one. Each page includes FAQPage schema, structured answer content, and related service links — optimised for both Google and AI Answer Engines.",
    outcome: "Businesses that deploy FAQ/AEO page clusters typically begin appearing in AI-generated answers within 30–60 days, establishing structural authority in AI search before their competitors.",
    pagesGenerated: "50–200+ dedicated FAQ pages per service category",
    exampleClient: "PresciaIQ",
    exampleResult: "954 → 6,129 pages — a 6x increase including 200+ FAQ/AEO pages across every service and industry.",
    faqs: [
      { q: "What is an AEO page?", a: "An AEO (Answer Engine Optimisation) page is a dedicated page that directly answers a specific question your prospects are asking. It includes FAQPage schema and structured answer content — optimised for AI Answer Engines like ChatGPT, Perplexity, and Google AI Overviews." },
      { q: "How many FAQ pages should my website have?", a: "As many as there are questions your prospects are asking. Predictive Search Architecture maps every question in your category and deploys a dedicated page for each one — typically 50–200+ pages per service category." },
      { q: "Do FAQ pages help with SEO?", a: "Yes. FAQ pages with FAQPage schema help with both traditional SEO (by capturing question-based search queries) and AEO (by providing structured answers that AI models can extract and cite). They are one of the highest-ROI page types in a programmatic architecture." }
    ]
  },
  {
    slug: "competitor-comparison-pages",
    title: "Competitor Comparison Pages",
    shortTitle: "Competitor Comparison Pages",
    category: "Competitive SEO",
    description: "Deploy dedicated comparison pages that capture high-intent 'vs' and 'alternative' search queries — intercepting prospects who are actively evaluating their options.",
    howItWorks: "We identify every competitor and alternative your prospects are comparing you against, then deploy a dedicated, schema-rich comparison page for each one. Each page includes a structured comparison table, clear differentiation, and a compelling call to action.",
    outcome: "Competitor comparison pages capture some of the highest-intent search queries in any category — prospects who are actively comparing options are typically ready to make a decision.",
    pagesGenerated: "1 page per competitor/alternative (typically 8–20 pages)",
    exampleClient: "PresciaIQ",
    exampleResult: "Competitor comparison pages capture 'vs traditional SEO agency', 'vs Google Ads', and 'vs content marketing' queries — intercepting prospects at the decision stage.",
    faqs: [
      { q: "Should I create pages comparing myself to competitors?", a: "Yes. 'vs' and 'alternative' search queries have extremely high purchase intent — prospects searching for these terms are actively evaluating their options and ready to make a decision. Comparison pages capture this demand directly." },
      { q: "What should a competitor comparison page include?", a: "A competitor comparison page should include: a structured comparison table, clear differentiation of your advantages, specific objection handling, and a compelling call to action. Predictive Search Architecture generates all of these programmatically." },
      { q: "Is it ethical to create competitor comparison pages?", a: "Yes, as long as the comparisons are accurate and fair. Comparison pages are a standard, white-hat SEO technique used by the world's leading B2B companies — including Salesforce, HubSpot, and Atlassian." }
    ]
  },
  {
    slug: "persona-targeted-pages",
    title: "Persona-Targeted Landing Pages",
    shortTitle: "Persona-Targeted Pages",
    category: "Persona SEO",
    description: "Deploy dedicated landing pages for every buyer persona you serve — capturing role-specific search queries and speaking directly to the specific motivations and objections of each decision-maker.",
    howItWorks: "We map every buyer persona involved in your sales process, then deploy a unique, schema-rich page for each one. Each page includes persona-specific pain points, motivations, objections, and outcomes — ensuring every decision-maker finds a page that speaks directly to their specific situation.",
    outcome: "Persona-targeted pages capture role-specific search queries that generic service pages miss — 'SEO for marketing managers', 'programmatic SEO for founders', 'search architecture for heads of growth'.",
    pagesGenerated: "Services × Personas (e.g., 1 service × 8 personas = 8 pages; with locations: 8 × 15 = 120 pages)",
    exampleClient: "PresciaIQ",
    exampleResult: "Persona pages capture role-specific queries across 8 buyer personas — marketing managers, CEOs, founders, heads of growth, digital managers, sales directors, e-commerce managers, and business owners.",
    faqs: [
      { q: "Why do I need persona-specific landing pages?", a: "Different buyer personas have different motivations, objections, and language. A generic services page cannot speak to all of them effectively. Persona-targeted pages capture role-specific search queries and convert at significantly higher rates." },
      { q: "How many personas should I target?", a: "Target every persona involved in your buying process. For most B2B businesses, this is 4–8 personas. Predictive Search Architecture deploys a dedicated page for each one." },
      { q: "What should a persona landing page include?", a: "A persona landing page should include: persona-specific pain points and motivations, relevant objection handling, specific outcomes and case studies, and a call to action tailored to that persona's decision-making context." }
    ]
  },
  {
    slug: "problem-solution-pages",
    title: "Problem → Solution Pages",
    shortTitle: "Problem → Solution Pages",
    category: "Problem-Aware SEO",
    description: "Deploy dedicated pages for every specific problem your service solves — capturing high-intent search queries from prospects who have identified their problem and are actively searching for a solution.",
    howItWorks: "We map every problem your service solves, then deploy a dedicated, schema-rich page for each one. Each page follows a Problem → Root Cause → Cost → Solution → Outcome structure — directly addressing the prospect's specific situation and positioning your service as the definitive solution.",
    outcome: "Problem → Solution pages capture some of the highest-intent search queries in any category — prospects who have identified a specific problem are actively searching for a solution and ready to engage.",
    pagesGenerated: "20–50+ problem pages per service category",
    exampleClient: "PresciaIQ",
    exampleResult: "Problem pages capture queries like 'why is my website not generating leads', 'how to outrank competitors on Google', and 'SEO agency not delivering results' — intercepting prospects at the highest point of purchase intent.",
    faqs: [
      { q: "What is a problem-solution page?", a: "A problem-solution page is a dedicated page that directly addresses a specific problem your prospects are experiencing. It follows a structured format: Problem → Root Cause → Cost → Solution → Outcome — positioning your service as the definitive solution." },
      { q: "How do I identify the problems my prospects are searching for?", a: "We use keyword research tools to identify the specific questions and problems your prospects are searching for. Predictive Search Architecture maps every problem in your category and deploys a dedicated page for each one." },
      { q: "Why are problem pages more effective than service pages?", a: "Prospects searching for a specific problem are further along the buying journey than those searching for a generic service. Problem pages capture higher-intent traffic that converts at significantly higher rates." }
    ]
  },
  {
    slug: "service-industry-location-clusters",
    title: "Service × Industry × Location Clusters",
    shortTitle: "3D Cluster Architecture",
    category: "Advanced Programmatic SEO",
    description: "The most powerful cluster type: deploy a unique, highly optimised page for every combination of service, industry, and location — capturing the full three-dimensional search demand landscape.",
    howItWorks: "We map every combination of your services, the industries you serve, and the locations you target, then deploy a unique, schema-rich page for each combination. Each page includes service-specific content, industry-specific pain points, and location-specific context — creating a page that precisely matches the search intent of a specific prospect in a specific market.",
    outcome: "3D cluster architectures are the most comprehensive form of programmatic SEO. They capture every possible combination of search intent in your market — leaving no demand uncaptured.",
    pagesGenerated: "Services × Industries × Locations (e.g., 4 services × 20 industries × 15 locations = 1,200 pages)",
    exampleClient: "PresciaIQ",
    exampleResult: "The existing PresciaIQ solutions cluster (3 services × 20 industries × 15 locations) generates 900 pages — each targeting a unique, hyper-specific search query.",
    faqs: [
      { q: "What is a 3D cluster architecture?", a: "A 3D cluster architecture deploys a unique page for every combination of service, industry, and location — capturing the full three-dimensional search demand landscape. It's the most comprehensive form of programmatic SEO." },
      { q: "How many pages does a 3D cluster generate?", a: "Services × Industries × Locations. For a business with 4 services, 20 industries, and 15 locations, a 3D cluster generates 1,200 pages. Adding a fourth dimension (e.g., persona) multiplies this further." },
      { q: "Is a 3D cluster architecture too many pages?", a: "No. Google rewards structural depth and topical authority. A 3D cluster architecture signals to Google that your website comprehensively covers every dimension of your subject — which is exactly what drives organic authority." }
    ]
  },
  {
    slug: "programmatic-seo-for-saas",
    title: "Programmatic SEO for SaaS Companies",
    shortTitle: "SaaS Programmatic SEO",
    category: "SaaS SEO",
    description: "Deploy a programmatic search architecture specifically designed for SaaS companies — capturing use-case, integration, comparison, and feature-specific search demand at scale.",
    howItWorks: "SaaS companies have a unique search demand landscape: use cases, integrations, features, comparisons, and alternatives. We map every dimension of your SaaS product and deploy a dedicated, schema-rich page for each combination — capturing the full search demand landscape for your product category.",
    outcome: "SaaS companies that deploy programmatic search architecture typically see a 5x–15x increase in organic trial signups within 90 days, with improving unit economics as the architecture matures.",
    pagesGenerated: "Use cases × Industries × Integrations × Comparisons (typically 500–2,000+ pages)",
    exampleClient: "Generic SaaS example",
    exampleResult: "A SaaS company with 8 use cases, 20 industries, and 15 integrations deploys 2,400 targeted pages — capturing the full search demand landscape for their product category.",
    faqs: [
      { q: "What is programmatic SEO for SaaS?", a: "Programmatic SEO for SaaS deploys dedicated pages for every use case, integration, comparison, and feature combination — capturing the full search demand landscape for your product category at scale." },
      { q: "How does programmatic SEO help SaaS growth?", a: "Programmatic SEO builds a compounding organic acquisition channel that reduces dependence on paid ads. SaaS companies that deploy programmatic architectures typically see a 5x–15x increase in organic trial signups within 90 days." },
      { q: "What pages should a SaaS company have for SEO?", a: "Use case pages, integration pages, comparison pages, feature pages, industry pages, and location pages. Predictive Search Architecture maps every dimension of your SaaS product and deploys a dedicated page for each combination." }
    ]
  },
  {
    slug: "programmatic-seo-for-ecommerce",
    title: "Programmatic SEO for E-Commerce",
    shortTitle: "E-Commerce Programmatic SEO",
    category: "E-Commerce SEO",
    description: "Deploy a programmatic search architecture specifically designed for e-commerce — capturing product, category, brand, and attribute-specific search demand at scale.",
    howItWorks: "E-commerce has the most complex search demand landscape of any category. We map every product, category, brand, and attribute combination, then deploy a unique, schema-rich page for each one — capturing every purchase-intent query in your product catalogue.",
    outcome: "E-commerce businesses that deploy programmatic search architecture typically see a 5x–10x increase in organic revenue within 90 days, with improving unit economics as the architecture matures.",
    pagesGenerated: "Products × Categories × Attributes × Brands (typically 1,000–10,000+ pages)",
    exampleClient: "Generic e-commerce example",
    exampleResult: "An e-commerce business with 400 SKUs across 12 categories and 6 key attributes deploys 28,800 targeted pages — capturing every purchase-intent query in their catalogue.",
    faqs: [
      { q: "What is programmatic SEO for e-commerce?", a: "Programmatic SEO for e-commerce deploys dedicated pages for every product, category, brand, and attribute combination — capturing every purchase-intent query in your product catalogue at scale." },
      { q: "How does programmatic SEO help e-commerce revenue?", a: "Programmatic SEO builds a compounding organic revenue channel that reduces dependence on Google Shopping and Meta Ads. E-commerce businesses that deploy programmatic architectures typically see a 5x–10x increase in organic revenue within 90 days." },
      { q: "What pages should an e-commerce website have for SEO?", a: "Product pages, category pages, brand pages, attribute pages, comparison pages, and buying guide pages. Predictive Search Architecture maps every dimension of your product catalogue and deploys a dedicated page for each combination." }
    ]
  },
  {
    slug: "programmatic-seo-for-professional-services",
    title: "Programmatic SEO for Professional Services",
    shortTitle: "Professional Services SEO",
    category: "Professional Services SEO",
    description: "Deploy a programmatic search architecture specifically designed for professional services firms — capturing service, industry, location, and expertise-specific search demand at scale.",
    howItWorks: "Professional services firms have a unique search demand landscape: services, industries, locations, and specific expertise areas. We map every dimension of your practice and deploy a dedicated, schema-rich page for each combination — capturing the full search demand landscape for your firm.",
    outcome: "Professional services firms that deploy programmatic search architecture typically see a 5x–15x increase in organic enquiries within 90 days, with improving lead quality as the architecture matures.",
    pagesGenerated: "Services × Industries × Locations × Expertise (typically 500–3,000+ pages)",
    exampleClient: "LoopBC (Business Consulting)",
    exampleResult: "380 → 5,763 pages — a 15x increase across 20 service lines, 15 industries, and 15 locations.",
    faqs: [
      { q: "What is programmatic SEO for professional services?", a: "Programmatic SEO for professional services deploys dedicated pages for every service, industry, location, and expertise combination — capturing the full search demand landscape for your firm at scale." },
      { q: "How does programmatic SEO help professional services firms?", a: "Programmatic SEO builds a compounding organic enquiry channel that reduces dependence on referrals and paid channels. Professional services firms that deploy programmatic architectures typically see a 5x–15x increase in organic enquiries within 90 days." },
      { q: "What pages should a consulting firm have for SEO?", a: "Service pages, industry pages, location pages, expertise pages, case study pages, and FAQ pages. Predictive Search Architecture maps every dimension of your practice and deploys a dedicated page for each combination." }
    ]
  }
];
