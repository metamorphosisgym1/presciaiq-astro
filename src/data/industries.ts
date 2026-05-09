export interface Industry {
  slug: string;
  name: string;
  plural: string;
  painPoint: string;
  outcome: string;
  exampleUseCase: string;
  relatedInsight: string;
  relatedInsightTitle: string;
}

export const industries: Industry[] = [
  {
    slug: "construction",
    name: "Construction",
    plural: "construction companies",
    painPoint: "budget blowouts, geotechnical risk, and reactive project management",
    outcome: "predict cost overruns, de-risk projects, and protect margins before breaking ground",
    exampleUseCase: "BuildPredictIQ analyses historical site data, weather patterns, and contractor performance to forecast project risk before a single dollar is committed.",
    relatedInsight: "/insights/ai-construction-risk-assessment-australia",
    relatedInsightTitle: "AI Construction Risk Assessment in Australia"
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    plural: "manufacturers",
    painPoint: "demand forecasting errors, supply chain disruptions, and unplanned downtime",
    outcome: "predict demand, prevent equipment failure, and optimise production scheduling",
    exampleUseCase: "PresciaIQ's predictive models integrate with your ERP to forecast demand 90 days out, reducing overstock by up to 40% and eliminating emergency procurement costs.",
    relatedInsight: "/insights/what-is-predictive-analytics-business",
    relatedInsightTitle: "What Is Predictive Analytics for Business?"
  },
  {
    slug: "retail",
    name: "Retail",
    plural: "retailers",
    painPoint: "inventory overstock, stockouts, and unpredictable consumer demand",
    outcome: "forecast demand by SKU, optimise replenishment, and reduce markdown losses",
    exampleUseCase: "PresciaIQ analyses your POS data, seasonality, and local market signals to predict which products will sell out and when, before your competitors react.",
    relatedInsight: "/insights/what-is-predictive-analytics-business",
    relatedInsightTitle: "What Is Predictive Analytics for Business?"
  },
  {
    slug: "logistics",
    name: "Logistics & Supply Chain",
    plural: "logistics and supply chain businesses",
    painPoint: "route inefficiency, carrier delays, and reactive freight management",
    outcome: "predict delivery bottlenecks, optimise carrier selection, and reduce freight costs",
    exampleUseCase: "PresciaIQ's logistics intelligence layer forecasts carrier delay probability, route congestion, and customs clearance risk — before your freight leaves the dock.",
    relatedInsight: "/insights/what-is-operational-intelligence-platform",
    relatedInsightTitle: "What Is an Operational Intelligence Platform?"
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    plural: "healthcare providers",
    painPoint: "patient no-shows, resource underutilisation, and reactive staffing decisions",
    outcome: "predict patient demand, optimise scheduling, and reduce operational waste",
    exampleUseCase: "PresciaIQ predicts appointment no-show probability and seasonal demand spikes, allowing healthcare operators to staff proactively and reduce revenue leakage.",
    relatedInsight: "/insights/business-intelligence-evolution-australia",
    relatedInsightTitle: "The Evolution of Business Intelligence in Australia"
  },
  {
    slug: "mining",
    name: "Mining",
    plural: "mining operations",
    painPoint: "equipment failure, safety incidents, and commodity price volatility",
    outcome: "predict equipment maintenance windows, reduce unplanned downtime, and protect worker safety",
    exampleUseCase: "PresciaIQ's predictive maintenance models analyse sensor data from heavy equipment to forecast failure probability weeks before breakdown, reducing downtime costs by up to 60%.",
    relatedInsight: "/insights/what-is-operational-intelligence-platform",
    relatedInsightTitle: "What Is an Operational Intelligence Platform?"
  },
  {
    slug: "agriculture",
    name: "Agriculture",
    plural: "agricultural businesses",
    painPoint: "weather risk, yield uncertainty, and reactive supply chain decisions",
    outcome: "forecast yield, predict weather impact, and optimise input costs before planting",
    exampleUseCase: "PresciaIQ integrates weather data, soil sensors, and commodity markets to give Australian farmers a 90-day yield forecast with risk-adjusted pricing scenarios.",
    relatedInsight: "/insights/what-is-predictive-analytics-business",
    relatedInsightTitle: "What Is Predictive Analytics for Business?"
  },
  {
    slug: "financial-services",
    name: "Financial Services",
    plural: "financial services firms",
    painPoint: "credit risk, client churn, and reactive portfolio management",
    outcome: "predict credit default probability, identify at-risk clients, and automate risk scoring",
    exampleUseCase: "PresciaIQ's financial intelligence models score credit risk in real time, flag churn signals 90 days before a client leaves, and surface cross-sell opportunities automatically.",
    relatedInsight: "/insights/business-intelligence-evolution-australia",
    relatedInsightTitle: "The Evolution of Business Intelligence in Australia"
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    plural: "real estate businesses",
    painPoint: "market timing uncertainty, vacancy risk, and reactive pricing decisions",
    outcome: "predict property price movements, forecast vacancy rates, and time market entry",
    exampleUseCase: "PresciaIQ analyses suburb-level transaction data, interest rate forecasts, and migration patterns to give developers and investors a predictive edge on market timing.",
    relatedInsight: "/insights/what-is-predictive-analytics-business",
    relatedInsightTitle: "What Is Predictive Analytics for Business?"
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    plural: "hospitality businesses",
    painPoint: "demand volatility, staffing waste, and reactive revenue management",
    outcome: "forecast occupancy, optimise staffing rosters, and predict peak demand windows",
    exampleUseCase: "PresciaIQ predicts occupancy rates 60 days out by analysing booking patterns, local events, and competitor pricing — allowing hotels and venues to staff and price proactively.",
    relatedInsight: "/insights/what-is-operational-intelligence-platform",
    relatedInsightTitle: "What Is an Operational Intelligence Platform?"
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    plural: "professional services firms",
    painPoint: "pipeline uncertainty, resource underutilisation, and reactive client management",
    outcome: "forecast revenue pipeline, predict client churn, and optimise billable utilisation",
    exampleUseCase: "PresciaIQ's professional services intelligence layer forecasts pipeline conversion probability, flags at-risk client relationships, and predicts resource demand 90 days out.",
    relatedInsight: "/insights/business-intelligence-evolution-australia",
    relatedInsightTitle: "The Evolution of Business Intelligence in Australia"
  },
  {
    slug: "transport",
    name: "Transport",
    plural: "transport businesses",
    painPoint: "fleet downtime, fuel cost volatility, and reactive scheduling",
    outcome: "predict vehicle maintenance needs, optimise route scheduling, and reduce fuel costs",
    exampleUseCase: "PresciaIQ analyses telematics data, fuel prices, and route history to predict maintenance windows and optimise fleet scheduling — reducing operational costs by up to 25%.",
    relatedInsight: "/insights/what-is-operational-intelligence-platform",
    relatedInsightTitle: "What Is an Operational Intelligence Platform?"
  },
  {
    slug: "energy",
    name: "Energy & Utilities",
    plural: "energy and utilities businesses",
    painPoint: "demand forecasting errors, grid instability, and reactive asset management",
    outcome: "predict energy demand, forecast asset failure, and optimise grid operations",
    exampleUseCase: "PresciaIQ's energy intelligence models forecast demand by zone, predict transformer failure probability, and surface renewable integration opportunities before grid stress events.",
    relatedInsight: "/insights/what-is-operational-intelligence-platform",
    relatedInsightTitle: "What Is an Operational Intelligence Platform?"
  },
  {
    slug: "education",
    name: "Education",
    plural: "education providers",
    painPoint: "enrolment volatility, student attrition, and reactive resource planning",
    outcome: "predict enrolment demand, identify at-risk students, and optimise campus resources",
    exampleUseCase: "PresciaIQ predicts enrolment numbers by course and campus 12 months out, flags students at risk of dropping out before it happens, and optimises timetabling resource allocation.",
    relatedInsight: "/insights/what-is-predictive-analytics-business",
    relatedInsightTitle: "What Is Predictive Analytics for Business?"
  },
  {
    slug: "insurance",
    name: "Insurance",
    plural: "insurance businesses",
    painPoint: "claims prediction errors, fraud detection gaps, and reactive underwriting",
    outcome: "predict claims probability, detect fraud signals, and automate underwriting decisions",
    exampleUseCase: "PresciaIQ's insurance intelligence models score claims risk at intake, surface fraud probability signals in real time, and predict policy lapse risk 90 days before renewal.",
    relatedInsight: "/insights/business-intelligence-evolution-australia",
    relatedInsightTitle: "The Evolution of Business Intelligence in Australia"
  },
  {
    slug: "wholesale-distribution",
    name: "Wholesale Distribution",
    plural: "wholesale distributors",
    painPoint: "demand forecasting errors, warehouse inefficiency, and reactive replenishment",
    outcome: "predict order volumes, optimise warehouse slotting, and automate replenishment",
    exampleUseCase: "PresciaIQ integrates with your WMS and ERP to forecast order volumes by SKU and customer, reducing pick errors and emergency freight costs across your distribution network.",
    relatedInsight: "/insights/what-is-operational-intelligence-platform",
    relatedInsightTitle: "What Is an Operational Intelligence Platform?"
  },
  {
    slug: "food-beverage",
    name: "Food & Beverage",
    plural: "food and beverage businesses",
    painPoint: "waste from overproduction, demand volatility, and reactive supply chain management",
    outcome: "predict demand by product and channel, reduce waste, and optimise production runs",
    exampleUseCase: "PresciaIQ analyses sales history, weather, and local events to forecast demand by SKU — reducing food waste by up to 35% and eliminating costly emergency production runs.",
    relatedInsight: "/insights/what-is-predictive-analytics-business",
    relatedInsightTitle: "What Is Predictive Analytics for Business?"
  },
  {
    slug: "automotive",
    name: "Automotive",
    plural: "automotive businesses",
    painPoint: "parts inventory errors, service demand volatility, and reactive fleet management",
    outcome: "predict parts demand, forecast service bookings, and optimise workshop scheduling",
    exampleUseCase: "PresciaIQ's automotive intelligence models predict parts demand by model and region, forecast workshop capacity requirements, and flag at-risk fleet vehicles before breakdown.",
    relatedInsight: "/insights/what-is-operational-intelligence-platform",
    relatedInsightTitle: "What Is an Operational Intelligence Platform?"
  },
  {
    slug: "media-advertising",
    name: "Media & Advertising",
    plural: "media and advertising businesses",
    painPoint: "campaign timing errors, ROAS uncertainty, and reactive budget allocation",
    outcome: "predict campaign ROAS, optimise spend timing, and forecast audience behaviour",
    exampleUseCase: "AdsIQ by PresciaIQ forecasts campaign ROAS before launch, predicts optimal spend windows by channel, and surfaces competitor spend signals — giving media buyers a predictive edge.",
    relatedInsight: "/insights/roas-prediction-tool-australian-marketing",
    relatedInsightTitle: "ROAS Prediction Tool for Australian Marketing"
  },
  {
    slug: "government",
    name: "Government & Public Sector",
    plural: "government and public sector organisations",
    painPoint: "service demand volatility, budget overruns, and reactive policy decisions",
    outcome: "predict service demand, forecast budget variance, and surface policy risk signals",
    exampleUseCase: "PresciaIQ's public sector intelligence models forecast service demand by region and demographic, predict budget variance 12 months out, and surface emerging community risk signals.",
    relatedInsight: "/insights/business-intelligence-evolution-australia",
    relatedInsightTitle: "The Evolution of Business Intelligence in Australia"
  }
];
