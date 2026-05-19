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
  }
];
