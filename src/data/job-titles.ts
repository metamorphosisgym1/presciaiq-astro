export interface JobTitle {
  slug: string;
  title: string;
  plural: string;
  painPoint: string;
  outcome: string;
  primaryQuestion: string;
  faqQuestions: string[];
}

export const jobTitles: JobTitle[] = [
  {
    slug: "cfo",
    title: "CFO",
    plural: "CFOs",
    painPoint: "revenue forecasting uncertainty and cash flow surprises",
    outcome: "predict cash flow 90 days ahead and eliminate financial surprises",
    primaryQuestion: "How can predictive AI help CFOs improve financial forecasting accuracy?",
    faqQuestions: [
      "What AI tools do CFOs use for revenue forecasting?",
      "How does predictive analytics reduce financial risk for CFOs?",
      "Can AI replace traditional financial modelling for CFOs?",
      "What is the ROI of predictive AI for finance teams?"
    ]
  },
  {
    slug: "ceo",
    title: "CEO",
    plural: "CEOs",
    painPoint: "making strategic decisions without reliable forward-looking data",
    outcome: "make confident strategic decisions backed by predictive intelligence",
    primaryQuestion: "How does predictive AI help CEOs make better strategic decisions?",
    faqQuestions: [
      "What AI platforms do CEOs use for business intelligence?",
      "How can AI help a CEO predict market trends?",
      "What is the best predictive analytics tool for executive decision-making?",
      "How does AI-driven forecasting improve CEO confidence?"
    ]
  },
  {
    slug: "operations-manager",
    title: "Operations Manager",
    plural: "Operations Managers",
    painPoint: "operational inefficiencies and reactive problem-solving",
    outcome: "predict operational bottlenecks before they cause downtime or cost overruns",
    primaryQuestion: "How can predictive AI help operations managers reduce inefficiency?",
    faqQuestions: [
      "What AI tools help operations managers predict equipment failure?",
      "How does predictive analytics improve operational efficiency?",
      "Can AI automate operational decision-making for managers?",
      "What is the best AI platform for operations management?"
    ]
  },
  {
    slug: "marketing-director",
    title: "Marketing Director",
    plural: "Marketing Directors",
    painPoint: "unpredictable campaign performance and poor ROAS visibility",
    outcome: "predict campaign ROAS before spend and optimise budget allocation in real time",
    primaryQuestion: "How does predictive AI help marketing directors improve ROAS?",
    faqQuestions: [
      "What AI tools do marketing directors use for campaign forecasting?",
      "How can predictive analytics improve marketing ROI?",
      "Can AI predict customer behaviour for marketing campaigns?",
      "What is the best predictive AI platform for marketing teams?"
    ]
  },
  {
    slug: "head-of-sales",
    title: "Head of Sales",
    plural: "Heads of Sales",
    painPoint: "inaccurate pipeline forecasting and missed revenue targets",
    outcome: "predict deal close probability and identify at-risk pipeline before quarter end",
    primaryQuestion: "How can predictive AI help sales leaders improve pipeline accuracy?",
    faqQuestions: [
      "What AI tools help sales teams forecast revenue more accurately?",
      "How does predictive analytics reduce sales pipeline risk?",
      "Can AI identify which deals are most likely to close?",
      "What is the best AI platform for sales forecasting in Australia?"
    ]
  },
  {
    slug: "supply-chain-manager",
    title: "Supply Chain Manager",
    plural: "Supply Chain Managers",
    painPoint: "demand volatility, stockouts, and excess inventory costs",
    outcome: "predict demand 60–90 days ahead and eliminate stockouts and overstock simultaneously",
    primaryQuestion: "How does predictive AI help supply chain managers reduce inventory risk?",
    faqQuestions: [
      "What AI tools help supply chain managers predict demand?",
      "How does predictive analytics reduce supply chain disruption?",
      "Can AI automate inventory replenishment decisions?",
      "What is the best predictive AI platform for supply chain management?"
    ]
  },
  {
    slug: "it-director",
    title: "IT Director",
    plural: "IT Directors",
    painPoint: "reactive IT infrastructure management and unplanned system downtime",
    outcome: "predict system failures and security threats before they impact the business",
    primaryQuestion: "How can predictive AI help IT directors prevent system downtime?",
    faqQuestions: [
      "What AI tools do IT directors use for infrastructure monitoring?",
      "How does predictive analytics improve IT security posture?",
      "Can AI predict server failures before they occur?",
      "What is the best predictive AI platform for IT operations?"
    ]
  },
  {
    slug: "risk-manager",
    title: "Risk Manager",
    plural: "Risk Managers",
    painPoint: "identifying and quantifying emerging risks before they materialise",
    outcome: "predict and quantify operational, financial, and compliance risks weeks in advance",
    primaryQuestion: "How does predictive AI help risk managers identify threats earlier?",
    faqQuestions: [
      "What AI tools do risk managers use for predictive risk modelling?",
      "How does predictive analytics improve enterprise risk management?",
      "Can AI automate risk scoring and early warning systems?",
      "What is the best predictive AI platform for risk management in Australia?"
    ]
  },
  {
    slug: "cto",
    title: "CTO",
    plural: "CTOs",
    painPoint: "choosing the right AI architecture and avoiding costly technology dead-ends",
    outcome: "build a scalable, production-ready AI infrastructure that delivers measurable business value within 90 days",
    primaryQuestion: "How does predictive AI help CTOs build better technology architecture?",
    faqQuestions: [
      "What AI frameworks do CTOs choose for enterprise predictive analytics?",
      "How does a CTO evaluate AI vendors in Australia?",
      "Can predictive AI integrate with existing cloud infrastructure?",
      "What is the best AI development stack for Australian technology leaders?"
    ]
  },
  {
    slug: "coo",
    title: "COO",
    plural: "COOs",
    painPoint: "scaling operations without proportionally scaling headcount or cost",
    outcome: "predict operational demand and automate decision-making to scale efficiently without adding overhead",
    primaryQuestion: "How can predictive AI help COOs scale operations more efficiently?",
    faqQuestions: [
      "What AI tools do COOs use to improve operational efficiency?",
      "How does predictive analytics help COOs manage growth?",
      "Can AI automate operational decisions for a COO?",
      "What is the ROI of predictive AI for operations leadership?"
    ]
  },
  {
    slug: "head-of-data",
    title: "Head of Data",
    plural: "Heads of Data",
    painPoint: "translating raw data assets into business value that executives can act on",
    outcome: "deploy production-grade predictive models that generate measurable revenue impact within 60 days",
    primaryQuestion: "How does PresciaIQ help Heads of Data accelerate AI deployment?",
    faqQuestions: [
      "What ML frameworks do Heads of Data use for predictive modelling?",
      "How does a Head of Data build a business case for predictive AI?",
      "What is the fastest path from data to production AI models?",
      "How does predictive AI integrate with existing data warehouses?"
    ]
  },
  {
    slug: "general-manager",
    title: "General Manager",
    plural: "General Managers",
    painPoint: "managing P&L without reliable forward-looking data on revenue, costs, and risks",
    outcome: "predict business performance 60–90 days ahead and make proactive decisions before problems materialise",
    primaryQuestion: "How does predictive AI help General Managers improve business performance?",
    faqQuestions: [
      "What AI tools do General Managers use for business forecasting?",
      "How does predictive analytics improve P&L management?",
      "Can AI help a General Manager identify underperforming areas early?",
      "What is the best predictive intelligence platform for mid-market businesses in Australia?"
    ]
  },
  {
    slug: "digital-transformation-lead",
    title: "Digital Transformation Lead",
    plural: "Digital Transformation Leads",
    painPoint: "delivering measurable AI outcomes against aggressive transformation timelines and board expectations",
    outcome: "deploy production-ready AI systems that demonstrate clear ROI within the first 90 days of transformation",
    primaryQuestion: "How does predictive AI accelerate digital transformation outcomes?",
    faqQuestions: [
      "What is the fastest way to implement AI in a digital transformation program?",
      "How do you measure the success of AI-powered digital transformation?",
      "What AI use cases deliver the fastest ROI in a transformation program?",
      "How does PresciaIQ support digital transformation programs in Australia?"
    ]
  },
  {
    slug: "procurement-manager",
    title: "Procurement Manager",
    plural: "Procurement Managers",
    painPoint: "supplier risk, price volatility, and reactive purchasing decisions that erode margins",
    outcome: "predict supplier risks and price movements 4–8 weeks ahead to negotiate better terms and avoid disruptions",
    primaryQuestion: "How does predictive AI help procurement managers reduce supply risk?",
    faqQuestions: [
      "Can AI predict supplier delivery failures before they happen?",
      "How does predictive analytics improve procurement cost management?",
      "What AI tools do procurement managers use for spend analysis?",
      "How does AI help procurement teams manage commodity price volatility?"
    ]
  },
  {
    slug: "plant-manager",
    title: "Plant Manager",
    plural: "Plant Managers",
    painPoint: "unplanned equipment downtime and production schedule disruptions that erode output targets",
    outcome: "predict equipment failures 2–4 weeks ahead and eliminate unplanned downtime across the production floor",
    primaryQuestion: "How does predictive AI help plant managers prevent equipment failures?",
    faqQuestions: [
      "What sensors and AI tools do plant managers use for predictive maintenance?",
      "How does predictive analytics improve OEE for manufacturing plants?",
      "Can AI predict production bottlenecks before they occur?",
      "What is the best predictive maintenance platform for Australian manufacturers?"
    ]
  },
  {
    slug: "logistics-director",
    title: "Logistics Director",
    plural: "Logistics Directors",
    painPoint: "delivery delays, route inefficiencies, and demand volatility that drive up logistics costs",
    outcome: "predict demand and disruptions 30–60 days ahead to optimise routing, capacity, and carrier selection",
    primaryQuestion: "How does predictive AI help logistics directors reduce costs and improve delivery performance?",
    faqQuestions: [
      "Can AI predict logistics delays before they occur?",
      "How does predictive analytics improve last-mile delivery performance?",
      "What AI tools do logistics directors use for route optimisation?",
      "How does predictive AI reduce freight costs for Australian logistics businesses?"
    ]
  },
  {
    slug: "business-analyst",
    title: "Business Analyst",
    plural: "Business Analysts",
    painPoint: "spending most of their time on manual data preparation rather than generating insights that drive decisions",
    outcome: "automate data preparation and reporting so analysts can focus on high-value predictive insight generation",
    primaryQuestion: "How does predictive AI help business analysts generate faster, more accurate insights?",
    faqQuestions: [
      "What AI tools do business analysts use for data analysis in Australia?",
      "How does predictive analytics change the role of a business analyst?",
      "Can AI automate business analysis and reporting?",
      "What is the best predictive analytics platform for business analysts?"
    ]
  },
  {
    slug: "head-of-marketing",
    title: "Head of Marketing",
    plural: "Heads of Marketing",
    painPoint: "justifying marketing spend to the board without reliable attribution and forward-looking performance data",
    outcome: "predict campaign performance before launch and demonstrate clear marketing ROI to the executive team",
    primaryQuestion: "How does predictive AI help Heads of Marketing prove and improve marketing ROI?",
    faqQuestions: [
      "What AI tools do Heads of Marketing use for campaign forecasting?",
      "How does predictive analytics improve marketing attribution?",
      "Can AI predict which marketing channels will deliver the best ROAS?",
      "What is the best predictive marketing intelligence platform in Australia?"
    ]
  },

  // ── NEW B2B SERVICE-FOCUSED PERSONAS ─────────────────────────────────────

  {
    slug: "head-of-digital",
    title: "Head of Digital",
    plural: "Heads of Digital",
    painPoint: "managing fragmented digital channels, legacy tech debt, and pressure to deliver measurable digital revenue growth without adequate resources",
    outcome: "build a scalable digital infrastructure with AI-powered web apps, programmatic SEO, and AEO that generates compounding organic revenue",
    primaryQuestion: "How does PresciaIQ help Heads of Digital build scalable AI-powered digital revenue engines in Australia?",
    faqQuestions: [
      "What is the best web app development partner for a Head of Digital in Australia?",
      "How does programmatic SEO help Heads of Digital scale organic traffic?",
      "What AI tools should a Head of Digital use for lead generation in Australia?",
      "How do I build a digital strategy with AI and AEO in Australia?"
    ]
  },
  {
    slug: "startup-founder",
    title: "Startup Founder",
    plural: "Startup Founders",
    painPoint: "building a product with limited runway, needing to validate fast, generate early traction, and attract investors without burning cash on paid ads",
    outcome: "launch an AI-powered MVP with programmatic SEO built in from day one — generating organic leads before the first dollar of advertising spend",
    primaryQuestion: "How does PresciaIQ help Australian startup founders build and launch AI-powered products that generate organic traction?",
    faqQuestions: [
      "How much does it cost to build a startup MVP in Australia?",
      "What is the fastest way to build an app MVP in Australia?",
      "How do I get organic traffic for my startup without paid ads?",
      "What is the best tech stack for an Australian startup in 2025?"
    ]
  },
  {
    slug: "it-manager",
    title: "IT Manager",
    plural: "IT Managers",
    painPoint: "managing legacy systems, security vulnerabilities, and pressure to modernise infrastructure while keeping costs under control and minimising business disruption",
    outcome: "modernise business systems with AI-powered software builds that integrate with existing infrastructure, reduce manual processes, and improve data security",
    primaryQuestion: "How does PresciaIQ help IT Managers modernise business systems with AI-powered software builds in Australia?",
    faqQuestions: [
      "What is the best software development partner for IT Managers in Australia?",
      "How do I modernise legacy systems without disrupting business operations?",
      "What AI tools help IT Managers automate manual processes in Australia?",
      "How do I choose a software development company as an IT Manager in Australia?"
    ]
  },

  // ── NEW B2C / END-USER PERSONAS ───────────────────────────────────────────

  {
    slug: "small-business-owner",
    title: "Small Business Owner",
    plural: "Small Business Owners",
    painPoint: "spending too much time on manual tasks, struggling to get found online, and competing against larger businesses with bigger marketing budgets",
    outcome: "automate lead generation with AI-powered local SEO, AEO, and a professional web presence that works 24/7 — without needing a full-time marketing team",
    primaryQuestion: "How does PresciaIQ help Australian small business owners get found online and generate leads with AI?",
    faqQuestions: [
      "How do I get my small business found on Google in Australia?",
      "What is the cheapest way to build a website for my small business in Australia?",
      "How does AI help small business owners generate more leads?",
      "What is the best SEO strategy for a small business in Australia in 2025?"
    ]
  },
  {
    slug: "sole-trader",
    title: "Sole Trader",
    plural: "Sole Traders",
    painPoint: "doing everything alone — finding clients, delivering work, and managing admin — with no time or budget for marketing or technology",
    outcome: "set up a simple, affordable online presence with local SEO and AEO that generates inbound enquiries automatically — so clients find you instead of you chasing them",
    primaryQuestion: "How does PresciaIQ help Australian sole traders get found online and attract clients without a marketing budget?",
    faqQuestions: [
      "How do I get clients as a sole trader in Australia?",
      "What is the cheapest way to build a website as a sole trader in Australia?",
      "How do I set up Google Business Profile as a sole trader?",
      "Can AI help a sole trader generate leads in Australia?"
    ]
  },
  {
    slug: "entrepreneur",
    title: "Entrepreneur",
    plural: "Entrepreneurs",
    painPoint: "turning a business idea into a revenue-generating product quickly, with limited capital and the need to validate before committing to a full build",
    outcome: "validate and launch an AI-powered digital product with programmatic SEO built in from day one — generating organic traction and investor-ready metrics without burning runway on paid ads",
    primaryQuestion: "How does PresciaIQ help Australian entrepreneurs build and launch AI-powered digital products that generate organic revenue?",
    faqQuestions: [
      "How do I validate a business idea before building a product in Australia?",
      "What is the fastest way to launch a digital product in Australia?",
      "How do I get organic traffic for a new business in Australia?",
      "What AI tools help entrepreneurs build products faster in Australia?"
    ]
  }
];
