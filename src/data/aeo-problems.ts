export interface AeoProblem {
  slug: string;
  industry: string;
  industrySlug: string;
  problemTitle: string;
  problemShort: string;
  symptom: string;
  rootCause: string;
  cost: string;
  solution: string;
  outcome: string;
  faqs: { q: string; a: string }[];
}

export const aeoProblems: AeoProblem[] = [
  {
    slug: "not-ranking-on-google",
    industry: "General",
    industrySlug: "general",
    problemTitle: "How to Rank on Google Without Paying for Ads",
    problemShort: "Not ranking on Google",
    symptom: "Your website is invisible on Google for every search term that matters to your business. Competitors are capturing all the organic traffic while you rely entirely on paid ads to generate leads.",
    rootCause: "Most websites have fewer than 20 pages, each targeting broad, highly competitive keywords. Google rewards structural depth and topical authority — neither of which a small site can achieve without a programmatic architecture.",
    cost: "Businesses that rely entirely on paid search spend an average of $3,000–$15,000 per month on Google Ads. Without organic authority, every lead costs money — and the moment you pause the budget, the leads stop.",
    solution: "PresciaIQ's Predictive Search Architecture maps every service, location, industry, and persona your business serves, then deploys hundreds to thousands of targeted, schema-rich pages in a single build. Each page captures a specific, high-intent search query that your competitors haven't targeted.",
    outcome: "Clients who deploy Predictive Search Architecture typically see a 6x–15x increase in indexed pages, with organic traffic compounding month-over-month at zero ongoing cost.",
    faqs: [
      { q: "How long does it take to rank on Google?", a: "With a programmatic architecture, hyper-specific long-tail queries typically begin ranking within 2–4 weeks of indexing. Broader, more competitive terms build authority over 3–6 months as the structural depth of the site compounds." },
      { q: "Is it possible to rank on Google without paying for ads?", a: "Yes. Programmatic SEO architecture generates structural authority that Google rewards with organic rankings — entirely independent of ad spend. Once built, the architecture compounds in value over time." },
      { q: "What is the difference between SEO and paid search?", a: "Paid search generates traffic only while you're paying for it. SEO generates structural authority that compounds over time. Predictive Search Architecture combines programmatic SEO with AEO schema to dominate both traditional search and AI Answer Engines." }
    ]
  },
  {
    slug: "google-ads-costs-too-high",
    industry: "General",
    industrySlug: "general",
    problemTitle: "How to Reduce Google Ads Spend Without Losing Leads",
    problemShort: "Google Ads costs too high",
    symptom: "Your Google Ads cost-per-click has increased by 40–80% over the past two years, but lead quality hasn't improved. You're spending more to get the same number of leads.",
    rootCause: "As more businesses compete for the same keywords, auction prices rise. Without organic authority as a fallback, you're trapped in an increasingly expensive paid channel with no exit strategy.",
    cost: "The average cost-per-click in competitive Australian B2B categories has risen to $8–$45 per click. At a 3% conversion rate, that's $267–$1,500 per lead — costs that are unsustainable at scale.",
    solution: "Predictive Search Architecture builds a parallel organic channel that captures the same high-intent search demand at zero ongoing cost. As organic authority grows, you can systematically reduce ad spend without losing pipeline.",
    outcome: "Clients who deploy Predictive Search Architecture alongside their paid channels typically reduce ad spend by 40–70% within 12 months while maintaining or increasing total lead volume.",
    faqs: [
      { q: "How do I reduce my Google Ads spend without losing leads?", a: "Build a programmatic organic search architecture that captures the same high-intent queries your ads are targeting. As organic rankings compound, you can reduce ad spend on those terms without losing pipeline." },
      { q: "Why is Google Ads getting more expensive?", a: "More businesses are competing for the same keywords, driving up auction prices. The only sustainable exit from this cycle is building structural organic authority that captures the same demand at zero ongoing cost." },
      { q: "What is a good alternative to Google Ads for B2B lead generation?", a: "Programmatic SEO/AEO architecture is the highest-ROI alternative to paid search for B2B businesses. It generates compounding organic leads at zero ongoing cost, with improving unit economics over time." }
    ]
  },
  {
    slug: "competitors-outranking-us",
    industry: "General",
    industrySlug: "general",
    problemTitle: "How to Outrank Competitors on Google",
    problemShort: "Competitors outranking us on Google",
    symptom: "Your competitors appear above you for every search term that matters to your business. Prospects searching for your services are finding your competitors first, every time.",
    rootCause: "Competitors with more pages, more structured data, and deeper topical authority will always outrank a small site. The only way to close the gap is to build structural depth at scale — which requires a programmatic architecture.",
    cost: "Every search query your competitor captures instead of you represents a lost lead opportunity. In competitive B2B categories, a single lost lead can represent $5,000–$50,000 in lost revenue.",
    solution: "Predictive Search Architecture maps the entire search demand landscape for your category — including thousands of hyper-specific queries your competitors haven't targeted — and deploys a page for every single one. You don't compete for the same terms; you dominate the entire landscape.",
    outcome: "Clients who deploy Predictive Search Architecture typically achieve first-page rankings for hundreds of hyper-specific queries within 60–90 days of deployment, capturing demand their competitors have never even identified.",
    faqs: [
      { q: "How do I outrank my competitors on Google?", a: "The fastest way to outrank competitors is to target the queries they haven't identified. Predictive Search Architecture maps the entire long-tail search landscape and deploys a targeted page for every query — capturing demand your competitors have left on the table." },
      { q: "Why do my competitors rank higher than me on Google?", a: "Competitors with more pages and deeper topical authority will always outrank a small site. Predictive Search Architecture builds structural depth at scale — deploying hundreds to thousands of targeted pages in a single build." },
      { q: "How long does it take to outrank a competitor?", a: "For hyper-specific long-tail queries with low competition, rankings typically appear within 2–4 weeks. For broader, more competitive terms, structural authority builds over 3–6 months as the architecture compounds." }
    ]
  },
  {
    slug: "website-not-generating-leads",
    industry: "General",
    industrySlug: "general",
    problemTitle: "Why Your Website Is Not Generating Leads (And How to Fix It)",
    problemShort: "Website not generating leads",
    symptom: "Your website looks professional and loads quickly, but it generates almost no organic leads. Traffic is low, and the traffic that does arrive doesn't convert.",
    rootCause: "A website with fewer than 50 pages targeting broad keywords will never generate significant organic traffic. Google rewards topical authority — the depth and breadth of coverage across a specific subject — which requires hundreds to thousands of targeted pages.",
    cost: "A website that doesn't generate organic leads forces you to rely entirely on paid channels, referrals, or outbound sales — all of which have higher costs and lower scalability than organic search.",
    solution: "Predictive Search Architecture transforms your website from a digital brochure into a lead-generating machine. By deploying hundreds to thousands of targeted, schema-rich pages, we create a structural search presence that captures high-intent organic traffic across every service, location, and industry you serve.",
    outcome: "Clients who deploy Predictive Search Architecture typically see a 3x–10x increase in organic traffic within 90 days of deployment, with lead volume increasing proportionally.",
    faqs: [
      { q: "Why is my website not generating leads?", a: "Most websites have too few pages targeting too broad a set of keywords. Google rewards topical authority — the depth and breadth of coverage across a specific subject. Predictive Search Architecture builds that authority by deploying hundreds to thousands of targeted pages." },
      { q: "How do I make my website generate more leads?", a: "The fastest way to increase organic lead generation is to build a programmatic search architecture that captures every high-intent query in your category. Each page targets a specific search query, creating hundreds of entry points for potential customers." },
      { q: "What is topical authority in SEO?", a: "Topical authority is Google's measure of how comprehensively your website covers a specific subject. Websites with deep, structured coverage of a topic rank higher than websites with a few broad pages. Predictive Search Architecture builds topical authority at scale." }
    ]
  },
  {
    slug: "invisible-to-ai-search",
    industry: "General",
    industrySlug: "general",
    problemTitle: "How to Get Your Business Cited by ChatGPT and AI Search Engines",
    problemShort: "Invisible to AI search engines",
    symptom: "When your prospects ask ChatGPT, Perplexity, or Google's AI Overviews about your category, your business is never mentioned. Your competitors are being cited as the authoritative source.",
    rootCause: "AI Answer Engines extract answers from websites with structured schema markup, high topical authority, and clear, direct answers to specific questions. Most websites lack all three.",
    cost: "AI search is growing at 40%+ annually. Businesses that are invisible to AI Answer Engines today will be structurally disadvantaged as AI-mediated search becomes the dominant discovery channel.",
    solution: "PresciaIQ's Predictive Search Architecture implements comprehensive FAQPage, HowTo, and Service schema markup across every page, combined with AEO-optimised content blocks that directly answer the questions AI models are trained to surface.",
    outcome: "Clients who deploy Predictive Search Architecture with full AEO schema implementation begin appearing in AI-generated answers within 30–60 days, establishing structural authority in AI search before their competitors.",
    faqs: [
      { q: "How do I get my business cited by ChatGPT?", a: "AI models like ChatGPT extract answers from websites with high topical authority and structured schema markup. Predictive Search Architecture implements comprehensive AEO schema and builds the topical depth that AI models require to cite your business as an authoritative source." },
      { q: "What is AEO (Answer Engine Optimisation)?", a: "AEO is the practice of structuring your website's content and schema markup so that AI Answer Engines (ChatGPT, Perplexity, Google AI Overviews) can extract and cite your business as the definitive answer to specific questions. It works alongside traditional SEO to dominate both search channels." },
      { q: "Is AI search replacing Google?", a: "AI search is growing rapidly and is increasingly used for research and discovery. Businesses that build AEO authority now will be structurally advantaged as AI-mediated search grows. Predictive Search Architecture covers both traditional SEO and AEO simultaneously." }
    ]
  },
  {
    slug: "no-local-seo-presence",
    industry: "General",
    industrySlug: "general",
    problemTitle: "How to Dominate Local Search Results in Every City You Serve",
    problemShort: "No local SEO presence",
    symptom: "Your business serves customers across multiple cities and regions, but you only rank in your home city. Competitors with local offices are capturing all the search traffic in every other market.",
    rootCause: "A single homepage or services page cannot rank for location-specific queries. Google requires a dedicated, content-rich page for each location to establish local relevance.",
    cost: "Businesses that serve multiple locations but only rank in their home city are leaving the majority of their addressable market to competitors. In a 10-city market, that's potentially 90% of organic search demand going to competitors.",
    solution: "Predictive Search Architecture deploys a dedicated, highly optimised location page for every city, suburb, and region you serve — each with unique, locally relevant content, LocalBusiness schema, and geo-targeted FAQs.",
    outcome: "Clients who deploy location-based Predictive Search Architecture typically begin ranking in new markets within 30–60 days, capturing organic search demand across their entire service area.",
    faqs: [
      { q: "How do I rank in multiple cities on Google?", a: "You need a dedicated, content-rich page for each city you want to rank in. Predictive Search Architecture deploys a unique, highly optimised location page for every city, suburb, and region you serve — each with LocalBusiness schema and geo-targeted content." },
      { q: "What is local SEO?", a: "Local SEO is the practice of optimising your website to rank for location-specific search queries. Predictive Search Architecture automates local SEO at scale, deploying dedicated location pages for every market you serve." },
      { q: "Do I need a physical office to rank in a city?", a: "No. Google ranks websites for location-specific queries based on the relevance and authority of their location pages — not the presence of a physical office. A well-structured location page with LocalBusiness schema and geo-targeted content can rank in any market." }
    ]
  },
  {
    slug: "low-organic-traffic",
    industry: "General",
    industrySlug: "general",
    problemTitle: "How to Increase Organic Website Traffic Without Paying for Ads",
    problemShort: "Low organic website traffic",
    symptom: "Your website receives fewer than 500 organic visitors per month despite being live for several years. You've published blog posts and updated your homepage, but traffic remains stubbornly low.",
    rootCause: "Blog posts and homepage updates don't build topical authority. Google rewards websites that comprehensively cover a specific subject across hundreds of structured, interlinked pages — not websites with a handful of broad articles.",
    cost: "Low organic traffic means high dependence on paid channels. At an average CPC of $5–$20, generating 500 qualified visitors per month through paid search costs $2,500–$10,000 — every single month.",
    solution: "Predictive Search Architecture replaces the slow, manual approach to content marketing with a programmatic architecture that deploys hundreds to thousands of targeted, interlinked pages in a single build — building topical authority at a scale that manual content creation can never achieve.",
    outcome: "Clients who deploy Predictive Search Architecture typically see a 5x–15x increase in organic traffic within 90 days, with traffic compounding month-over-month as the architecture matures.",
    faqs: [
      { q: "How do I increase organic traffic to my website?", a: "The fastest way to increase organic traffic is to build topical authority through a programmatic search architecture. By deploying hundreds to thousands of targeted, interlinked pages, you signal to Google that your website is the authoritative source on your subject." },
      { q: "Why is my organic traffic so low?", a: "Most websites have too few pages and too little topical depth to rank for significant organic traffic. Google rewards structural depth and comprehensive coverage — both of which require a programmatic architecture." },
      { q: "How long does it take to see results from SEO?", a: "With a programmatic architecture, hyper-specific long-tail queries typically begin ranking within 2–4 weeks. Broader terms build authority over 3–6 months. The key advantage of Predictive Search Architecture is that results compound over time — improving without additional investment." }
    ]
  },
  {
    slug: "seo-agency-not-delivering",
    industry: "General",
    industrySlug: "general",
    problemTitle: "Why Your SEO Agency Isn't Delivering Results",
    problemShort: "SEO agency not delivering results",
    symptom: "You've been paying an SEO retainer for 6–18 months and have seen minimal improvement in rankings or organic traffic. Your agency produces monthly reports full of activity metrics but no meaningful business outcomes.",
    rootCause: "Traditional SEO agencies produce 2–4 pages per month through manual content creation. At that rate, it takes years to build the structural depth that Google rewards. The model is fundamentally misaligned with how search authority is actually built.",
    cost: "A typical Australian SEO retainer costs $1,500–$5,000 per month. Over 12 months, that's $18,000–$60,000 spent on an approach that produces a fraction of the structural authority that a programmatic build delivers in a single deployment.",
    solution: "Predictive Search Architecture replaces the slow, expensive retainer model with a one-off programmatic build that deploys hundreds to thousands of targeted pages simultaneously — building in weeks what a traditional agency would take years to produce.",
    outcome: "Clients who switch from a traditional SEO retainer to Predictive Search Architecture typically achieve more structural authority in the first 30 days than their previous agency delivered in 12 months.",
    faqs: [
      { q: "Why isn't my SEO agency getting results?", a: "Traditional SEO agencies produce 2–4 pages per month through manual content creation. At that rate, it takes years to build the structural depth that Google rewards. Predictive Search Architecture deploys hundreds to thousands of targeted pages in a single build — achieving in weeks what a retainer takes years to produce." },
      { q: "How do I know if my SEO agency is doing a good job?", a: "The primary metric is structural depth — the number of indexed, targeted pages on your website. If your agency has been working for 12 months and your site has fewer than 100 pages, they are not building the structural authority that drives organic traffic." },
      { q: "Should I cancel my SEO retainer?", a: "If your retainer is producing fewer than 10 targeted pages per month and your organic traffic isn't growing, a programmatic architecture build is likely a better investment. A one-off build at From $4,999 can produce more structural authority than 12 months of retainer payments." }
    ]
  },
  {
    slug: "no-industry-specific-pages",
    industry: "General",
    industrySlug: "general",
    problemTitle: "How to Build Industry-Specific Landing Pages That Actually Rank",
    problemShort: "No industry-specific landing pages",
    symptom: "You serve clients across multiple industries, but your website has a single generic services page. Prospects searching for your services in their specific industry are finding competitors with industry-specific pages.",
    rootCause: "Google rewards relevance. A generic services page cannot rank for industry-specific queries. Each industry you serve requires a dedicated, content-rich page that demonstrates deep understanding of that industry's specific challenges and outcomes.",
    cost: "Businesses that serve 5–10 industries but only have generic pages are leaving the majority of their addressable market to competitors with industry-specific content. Each industry page you're missing represents a segment of your market that competitors are capturing.",
    solution: "Predictive Search Architecture deploys a dedicated, highly optimised industry page for every sector you serve — each with unique, industry-specific content, FAQPage schema, and targeted calls to action that resonate with that industry's specific pain points.",
    outcome: "Clients who deploy industry-specific Predictive Search Architecture typically begin ranking for industry-specific queries within 30–60 days, capturing demand from prospects who would never have found their generic services page.",
    faqs: [
      { q: "Do I need separate pages for each industry I serve?", a: "Yes. Google cannot rank a generic services page for industry-specific queries. Each industry you serve requires a dedicated page with unique, industry-specific content, schema markup, and targeted keywords." },
      { q: "How many industry pages should my website have?", a: "At minimum, one page per industry you serve. Predictive Search Architecture takes this further by deploying industry × location combinations — a unique page for every industry in every location you serve." },
      { q: "What should an industry landing page include?", a: "An effective industry landing page includes: industry-specific pain points and outcomes, relevant case studies or results, FAQPage schema with industry-specific questions, and a clear call to action. Predictive Search Architecture generates all of these programmatically." }
    ]
  },
  {
    slug: "no-schema-markup",
    industry: "General",
    industrySlug: "general",
    problemTitle: "How Schema Markup Helps You Dominate Google and AI Search",
    problemShort: "Missing schema markup",
    symptom: "Your website has no structured data markup. You're invisible to AI Answer Engines and missing out on rich results in Google Search — both of which are increasingly important for capturing high-intent traffic.",
    rootCause: "Most websites are built without schema markup because it requires technical implementation and ongoing maintenance. Without it, Google and AI models cannot extract structured information from your pages — limiting your visibility in both traditional and AI-mediated search.",
    cost: "Websites with comprehensive schema markup receive 20–30% more click-through rates from Google Search results. In AI search, schema markup is the primary mechanism by which businesses are cited as authoritative sources — making it essential for AI visibility.",
    solution: "Predictive Search Architecture implements comprehensive schema markup across every page — Service, FAQPage, LocalBusiness, BreadcrumbList, and HowTo schemas — ensuring your website is fully structured for both Google and AI Answer Engines.",
    outcome: "Clients who deploy Predictive Search Architecture with full schema implementation typically see a 20–35% increase in click-through rates from Google Search and begin appearing in AI-generated answers within 30–60 days.",
    faqs: [
      { q: "What is schema markup and why does it matter?", a: "Schema markup is structured data that tells Google and AI models exactly what your page is about — your services, location, FAQs, and more. Websites with comprehensive schema markup receive higher click-through rates and are more likely to be cited by AI Answer Engines." },
      { q: "How do I add schema markup to my website?", a: "Schema markup is added as JSON-LD code in the head of each page. Predictive Search Architecture implements comprehensive schema markup programmatically across every page — ensuring consistent, accurate structured data at scale." },
      { q: "What schema types are most important for SEO?", a: "The most impactful schema types for SEO are: FAQPage (for AI Answer Engines), Service (for service businesses), LocalBusiness (for location-specific rankings), and BreadcrumbList (for site structure). Predictive Search Architecture implements all of these across every relevant page." }
    ]
  },
  {
    slug: "poor-content-marketing-roi",
    industry: "General",
    industrySlug: "general",
    problemTitle: "Why Your Content Marketing Isn't Generating ROI",
    problemShort: "Poor content marketing ROI",
    symptom: "You've been publishing blog posts for 12–24 months and have seen minimal improvement in organic traffic or leads. Your content team is producing articles that get little to no organic search traffic.",
    rootCause: "Traditional content marketing produces broad, competitive articles that struggle to rank against established publishers. The approach is fundamentally misaligned with how Google actually distributes organic traffic — which rewards structural depth and topical authority, not individual articles.",
    cost: "A dedicated content marketing team or agency costs $3,000–$10,000 per month. Over 12 months, that's $36,000–$120,000 spent on content that generates a fraction of the organic traffic that a programmatic architecture delivers.",
    solution: "Predictive Search Architecture replaces the manual content marketing model with a programmatic architecture that deploys hundreds to thousands of highly targeted, interlinked pages simultaneously — capturing the long-tail search demand that individual articles can never reach.",
    outcome: "Clients who deploy Predictive Search Architecture alongside or instead of traditional content marketing typically achieve more organic traffic in the first 90 days than their content team produced in 12 months.",
    faqs: [
      { q: "Why isn't my content marketing working?", a: "Traditional content marketing produces broad articles that compete with established publishers. Predictive Search Architecture targets the hyper-specific, long-tail queries that have high purchase intent and low competition — capturing demand that broad articles can never reach." },
      { q: "What is a better alternative to content marketing for SEO?", a: "Programmatic SEO architecture is more effective than traditional content marketing for building organic search authority. It deploys hundreds to thousands of targeted pages simultaneously, building topical authority at a scale that manual content creation can never achieve." },
      { q: "How do I measure content marketing ROI?", a: "The primary metrics for content marketing ROI are: organic traffic growth, keyword rankings, and lead volume from organic search. Predictive Search Architecture produces measurable improvements in all three metrics within 30–90 days of deployment." }
    ]
  },
  {
    slug: "not-appearing-in-google-maps",
    industry: "General",
    industrySlug: "general",
    problemTitle: "How to Appear in Google Maps and Local Pack Results",
    problemShort: "Not appearing in Google Maps local pack",
    symptom: "When prospects search for your services in your city, you don't appear in the Google Maps local pack. Competitors with fewer reviews and lower ratings are appearing above you.",
    rootCause: "Google Maps rankings are influenced by three factors: proximity, relevance, and prominence. Prominence — the strength of your website's local search authority — is the factor most businesses neglect. A website without location-specific pages and LocalBusiness schema has low prominence.",
    cost: "The Google Maps local pack captures 44% of all clicks for local search queries. Businesses that don't appear in the local pack are missing nearly half of all potential organic traffic from local searches.",
    solution: "Predictive Search Architecture builds local search prominence by deploying dedicated location pages with LocalBusiness schema, geo-targeted content, and structured local FAQs — signalling to Google that your business is the authoritative local provider.",
    outcome: "Clients who deploy location-based Predictive Search Architecture typically see improvements in Google Maps rankings within 30–60 days, as the structural local authority of their website increases.",
    faqs: [
      { q: "How do I rank in Google Maps?", a: "Google Maps rankings are influenced by proximity, relevance, and prominence. Prominence — the strength of your website's local search authority — is built through dedicated location pages, LocalBusiness schema, and geo-targeted content. Predictive Search Architecture builds all three programmatically." },
      { q: "What is the Google Maps local pack?", a: "The Google Maps local pack is the block of three business listings that appears at the top of Google Search results for local queries. It captures 44% of all clicks for local searches — making it the most valuable real estate in local search." },
      { q: "Does my website affect my Google Maps ranking?", a: "Yes. Google uses your website's local search authority — including location pages, LocalBusiness schema, and geo-targeted content — as a key signal for Google Maps rankings. Predictive Search Architecture builds this authority programmatically." }
    ]
  },
  {
    slug: "high-bounce-rate",
    industry: "General",
    industrySlug: "general",
    problemTitle: "How to Reduce Bounce Rate and Keep Visitors on Your Website",
    problemShort: "High website bounce rate",
    symptom: "Your website has a bounce rate above 70%. Visitors arrive, see a generic page that doesn't match their specific search query, and immediately leave to find a more relevant result.",
    rootCause: "High bounce rates are caused by a mismatch between search intent and page content. When a visitor searches for a specific service in a specific location and lands on a generic homepage, the mismatch causes them to bounce. Dedicated, query-specific pages eliminate this mismatch.",
    cost: "A 70% bounce rate means 70% of your organic traffic generates no value. If you're spending $3,000/month on SEO or ads to drive 1,000 visitors, 700 of them are leaving immediately — wasting $2,100 of your monthly investment.",
    solution: "Predictive Search Architecture deploys query-specific pages for every service, location, and industry combination — ensuring that every visitor lands on a page that precisely matches their search intent, dramatically reducing bounce rates and increasing conversion.",
    outcome: "Clients who deploy Predictive Search Architecture typically see bounce rates drop by 20–40 percentage points as visitors land on pages that precisely match their search intent.",
    faqs: [
      { q: "What causes a high bounce rate?", a: "High bounce rates are caused by a mismatch between search intent and page content. When visitors search for a specific query and land on a generic page, they bounce. Predictive Search Architecture deploys query-specific pages that precisely match search intent, eliminating this mismatch." },
      { q: "How do I reduce my website's bounce rate?", a: "The most effective way to reduce bounce rate is to ensure every visitor lands on a page that precisely matches their search intent. Predictive Search Architecture deploys dedicated pages for every service, location, and industry combination — ensuring precise intent matching." },
      { q: "What is a good bounce rate for a B2B website?", a: "A good bounce rate for a B2B website is 40–55%. Rates above 65% indicate significant intent mismatch. Predictive Search Architecture reduces bounce rates by deploying query-specific pages that precisely match the intent of every visitor." }
    ]
  },
  {
    slug: "no-backlinks",
    industry: "General",
    industrySlug: "general",
    problemTitle: "How to Build Domain Authority Without a Link Building Campaign",
    problemShort: "No backlinks or domain authority",
    symptom: "Your website has a Domain Authority (DA) below 20 and almost no backlinks. You know you need links to rank, but link building campaigns are expensive and time-consuming.",
    rootCause: "Most link building campaigns are expensive, slow, and produce low-quality links. The most sustainable way to build domain authority is through topical authority — comprehensive, structured coverage of your subject that naturally attracts links and signals authority to Google.",
    cost: "A professional link building campaign costs $2,000–$8,000 per month for quality links. Over 12 months, that's $24,000–$96,000 — with results that are difficult to measure and can be reversed by Google algorithm updates.",
    solution: "Predictive Search Architecture builds topical authority — the most sustainable form of domain authority — by deploying comprehensive, structured coverage of your subject across hundreds to thousands of interlinked pages. Topical authority reduces your dependence on backlinks and is algorithm-proof.",
    outcome: "Clients who deploy Predictive Search Architecture typically see significant improvements in topical authority metrics within 60–90 days, with organic rankings improving as Google recognises the structural depth of their website.",
    faqs: [
      { q: "Do I need backlinks to rank on Google?", a: "Backlinks are one of many ranking signals. Topical authority — comprehensive, structured coverage of your subject — is increasingly important and can compensate for lower backlink counts. Predictive Search Architecture builds topical authority at scale." },
      { q: "What is domain authority?", a: "Domain Authority (DA) is a metric that predicts how well a website will rank on Google. It's influenced by backlinks, topical authority, and structural depth. Predictive Search Architecture builds topical authority and structural depth — two of the most sustainable drivers of domain authority." },
      { q: "How do I build domain authority without link building?", a: "The most sustainable way to build domain authority without link building is through topical authority — comprehensive, structured coverage of your subject. Predictive Search Architecture deploys hundreds to thousands of interlinked, targeted pages that build topical authority at scale." }
    ]
  },
  {
    slug: "slow-website-indexing",
    industry: "General",
    industrySlug: "general",
    problemTitle: "How to Get Your Website Pages Indexed by Google Faster",
    problemShort: "Slow Google indexing",
    symptom: "You've published new pages on your website, but they haven't appeared in Google Search after weeks or months. Your competitors' pages are indexed within days.",
    rootCause: "Google prioritises indexing websites with strong structural authority, clear internal linking, and comprehensive sitemaps. Websites with few pages, poor internal linking, and no sitemap are crawled infrequently and indexed slowly.",
    cost: "Every day a page isn't indexed is a day it isn't generating organic traffic. For a programmatic architecture with hundreds of pages, slow indexing can delay the ROI of the entire build by weeks or months.",
    solution: "Predictive Search Architecture is built with indexing velocity in mind. Every deployment includes a comprehensive XML sitemap, structured internal linking, and canonical URLs — ensuring Google can discover, crawl, and index every page as quickly as possible.",
    outcome: "Clients who deploy Predictive Search Architecture with a properly structured sitemap typically see new pages indexed within 3–7 days of deployment, with the full architecture indexed within 2–4 weeks.",
    faqs: [
      { q: "How do I get my website indexed by Google faster?", a: "The fastest way to get pages indexed is to submit a comprehensive XML sitemap to Google Search Console, build strong internal linking, and ensure your website has structural authority. Predictive Search Architecture includes all three by default." },
      { q: "Why isn't Google indexing my website?", a: "Google prioritises indexing websites with strong structural authority and clear internal linking. Websites with few pages and poor site structure are crawled infrequently. Predictive Search Architecture builds the structural depth that signals to Google that your website deserves frequent crawling." },
      { q: "What is an XML sitemap and why does it matter?", a: "An XML sitemap is a file that lists every page on your website, helping Google discover and index them. Predictive Search Architecture generates a comprehensive XML sitemap automatically, ensuring every page is submitted to Google Search Console for rapid indexing." }
    ]
  },
  {
    slug: "no-search-presence-for-new-service",
    industry: "General",
    industrySlug: "general",
    problemTitle: "How to Build Search Presence for a New Service or Product Launch",
    problemShort: "No search presence for new service",
    symptom: "You've launched a new service or product, but it has zero organic search visibility. You're relying entirely on paid ads and direct outreach to generate awareness and leads.",
    rootCause: "A single service page cannot rank for the full range of queries that a new service generates. Prospects search for your service in the context of their specific industry, location, and problem — requiring a dedicated page for each combination.",
    cost: "Launching a new service without organic search presence means paying for every lead through paid channels. At an average B2B cost-per-lead of $200–$800, generating 50 leads per month costs $10,000–$40,000 — every month.",
    solution: "Predictive Search Architecture maps every dimension of your new service — every industry it serves, every location you target, every problem it solves — and deploys a dedicated, highly optimised page for each combination. Your new service launches with structural search authority from day one.",
    outcome: "Clients who deploy Predictive Search Architecture for a new service launch typically achieve organic search visibility across hundreds of targeted queries within 30–60 days — dramatically reducing reliance on paid channels.",
    faqs: [
      { q: "How do I build SEO for a new service?", a: "Build a programmatic architecture that maps every dimension of your new service — every industry, location, and problem it addresses — and deploys a dedicated page for each combination. This gives your new service structural search authority from day one." },
      { q: "How long does it take to rank for a new service?", a: "With a programmatic architecture, hyper-specific long-tail queries typically begin ranking within 2–4 weeks of indexing. Broader terms build authority over 3–6 months. The key is to target the specific, long-tail queries first — where competition is low and purchase intent is high." },
      { q: "Should I use paid ads or SEO for a new service launch?", a: "Both, but with a clear exit strategy from paid. Predictive Search Architecture builds the organic foundation that allows you to systematically reduce paid spend as organic authority grows — typically within 3–6 months of deployment." }
    ]
  },
  {
    slug: "no-mobile-seo",
    industry: "General",
    industrySlug: "general",
    problemTitle: "How to Optimise Your Website for Mobile Search",
    problemShort: "Poor mobile SEO performance",
    symptom: "More than 60% of your website traffic comes from mobile devices, but your mobile conversion rate is a fraction of your desktop rate. Your mobile pages load slowly and rank poorly for mobile-specific queries.",
    rootCause: "Google uses mobile-first indexing — meaning it primarily uses the mobile version of your website for ranking. Websites that aren't optimised for mobile performance, Core Web Vitals, and mobile-specific search intent rank significantly lower on mobile devices.",
    cost: "With 60%+ of searches happening on mobile, poor mobile SEO performance means you're underperforming on the majority of your search traffic. A 2% mobile conversion rate vs 5% desktop rate represents a 60% revenue gap from mobile visitors.",
    solution: "Predictive Search Architecture is built on Astro SSG — a static site generator that produces near-perfect Core Web Vitals scores and mobile performance by default. Every page is optimised for mobile-first indexing, ensuring maximum visibility on mobile search.",
    outcome: "Clients who deploy Predictive Search Architecture on Astro SSG typically achieve Core Web Vitals scores in the top 10% of their category, with mobile rankings improving proportionally.",
    faqs: [
      { q: "What is mobile-first indexing?", a: "Mobile-first indexing means Google primarily uses the mobile version of your website for ranking. Websites that aren't optimised for mobile performance rank lower across all devices. Predictive Search Architecture is built on Astro SSG, which produces near-perfect mobile performance by default." },
      { q: "How do I improve my website's mobile SEO?", a: "The most impactful improvements are: Core Web Vitals optimisation, mobile-responsive design, and mobile-specific content structure. Predictive Search Architecture is built on Astro SSG, which achieves all three by default." },
      { q: "What are Core Web Vitals?", a: "Core Web Vitals are Google's metrics for measuring page experience — including loading speed (LCP), interactivity (INP), and visual stability (CLS). Websites that score well on Core Web Vitals rank higher. Astro SSG, the framework used by Predictive Search Architecture, produces near-perfect Core Web Vitals scores by default." }
    ]
  },
  {
    slug: "no-voice-search-optimisation",
    industry: "General",
    industrySlug: "general",
    problemTitle: "How to Optimise Your Website for Voice Search and AI Assistants",
    problemShort: "Not optimised for voice search",
    symptom: "Your website doesn't appear when prospects use voice search or AI assistants to find services like yours. Voice and AI-mediated search is growing rapidly, but your website isn't structured to capture it.",
    rootCause: "Voice search and AI assistants extract answers from websites with clear, direct, question-and-answer structured content and comprehensive FAQPage schema. Most websites lack both.",
    cost: "Voice search accounts for 20%+ of all searches and is growing at 35% annually. Businesses that aren't optimised for voice search are missing a rapidly growing segment of their addressable market.",
    solution: "Predictive Search Architecture implements comprehensive FAQPage schema and AEO-optimised content blocks across every page — structuring your website to directly answer the questions that voice search users and AI assistants are asking.",
    outcome: "Clients who deploy Predictive Search Architecture with full AEO schema implementation typically begin appearing in voice search results and AI-generated answers within 30–60 days of deployment.",
    faqs: [
      { q: "How do I optimise my website for voice search?", a: "Voice search optimisation requires clear, direct, question-and-answer structured content and comprehensive FAQPage schema. Predictive Search Architecture implements both across every page, structuring your website to directly answer the questions voice search users are asking." },
      { q: "What is the difference between voice search and text search?", a: "Voice search queries are typically longer, more conversational, and phrased as questions. Websites optimised for voice search have clear, direct answers to specific questions — which is exactly the structure that Predictive Search Architecture deploys." },
      { q: "How important is voice search for B2B businesses?", a: "Voice search is increasingly used for B2B research and discovery, particularly on mobile devices. Businesses that are optimised for voice search capture a growing segment of high-intent research queries that competitors with traditional websites are missing." }
    ]
  },
  {
    slug: "competitor-using-programmatic-seo",
    industry: "General",
    industrySlug: "general",
    problemTitle: "My Competitor Has Thousands of Pages — How Do I Compete?",
    problemShort: "Competitor using programmatic SEO",
    symptom: "A competitor has suddenly appeared with thousands of pages targeting every location, industry, and service combination in your market. They're capturing organic traffic across your entire addressable market.",
    rootCause: "Your competitor has deployed a programmatic SEO architecture. Without a similar architecture, you cannot compete for the long-tail search queries that are driving their traffic — regardless of how good your core service pages are.",
    cost: "A competitor with a programmatic SEO architecture has a structural advantage that compounds over time. Every month you don't deploy a similar architecture, they accumulate more authority, more backlinks, and more organic traffic — making the gap increasingly difficult to close.",
    solution: "The only effective response to a competitor with a programmatic SEO architecture is to deploy your own — and deploy it faster and more comprehensively. PresciaIQ's Predictive Search Architecture can be deployed in days, not months, giving you the structural authority to compete immediately.",
    outcome: "Clients who deploy Predictive Search Architecture in response to a competitor typically achieve competitive parity within 60–90 days, and structural advantage within 6 months as their architecture matures.",
    faqs: [
      { q: "How do I compete with a competitor that has thousands of pages?", a: "Deploy your own programmatic SEO architecture. PresciaIQ's Predictive Search Architecture can be deployed in days, giving you the structural authority to compete across the same long-tail search landscape your competitor is targeting." },
      { q: "What is programmatic SEO?", a: "Programmatic SEO is the practice of deploying hundreds to thousands of targeted, schema-rich pages using a templated architecture — rather than manually writing individual pages. It's the most efficient way to build structural search authority at scale." },
      { q: "How long does it take to catch up to a competitor with programmatic SEO?", a: "With PresciaIQ's Predictive Search Architecture, you can deploy a comparable architecture within days. Competitive parity in rankings typically follows within 60–90 days as the new pages are indexed and begin accumulating authority." }
    ]
  },
  {
    slug: "international-seo-expansion",
    industry: "General",
    industrySlug: "general",
    problemTitle: "How to Expand Your Search Presence Into New International Markets",
    problemShort: "No international SEO presence",
    symptom: "You're expanding into new international markets — New Zealand, the UK, the US, or Southeast Asia — but have zero organic search presence in those markets. Competitors with local search authority are capturing all the organic traffic.",
    rootCause: "Organic search authority is market-specific. A website that ranks well in Australia has no inherent authority in New Zealand or the UK. Building search authority in a new market requires dedicated, market-specific pages with localised content and hreflang implementation.",
    cost: "Entering a new international market without organic search presence means paying for every lead through paid channels. In competitive B2B categories, international paid search costs can be 2–3x higher than domestic markets.",
    solution: "Predictive Search Architecture deploys market-specific page clusters for every international market you're entering — each with localised content, market-specific schema, and hreflang implementation — building organic authority in new markets from day one.",
    outcome: "Clients who deploy international Predictive Search Architecture typically achieve organic visibility in new markets within 30–60 days of deployment, dramatically reducing reliance on paid channels in new markets.",
    faqs: [
      { q: "How do I expand my SEO to international markets?", a: "International SEO requires dedicated, market-specific pages with localised content, market-specific schema, and hreflang implementation. Predictive Search Architecture deploys all of these programmatically for every international market you're targeting." },
      { q: "What is hreflang and why does it matter for international SEO?", a: "Hreflang is an HTML attribute that tells Google which language and region each page is intended for. It's essential for international SEO to ensure the right pages rank in the right markets. Predictive Search Architecture implements hreflang automatically." },
      { q: "How long does it take to rank in a new international market?", a: "With a programmatic architecture, hyper-specific long-tail queries in new markets typically begin ranking within 2–4 weeks of indexing. Broader terms build authority over 3–6 months as the architecture matures." }
    ]
  }
];
