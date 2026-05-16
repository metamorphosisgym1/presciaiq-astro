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
  }
];
