export interface Problem {
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

export const problems: Problem[] = [
  // Construction
  {
    slug: "construction-budget-blowouts",
    industry: "Construction",
    industrySlug: "construction",
    problemTitle: "How to Stop Construction Budget Blowouts Before They Start",
    problemShort: "Construction budget blowouts",
    symptom: "Projects consistently exceed budget by 10–30%, with cost overruns discovered too late to course-correct.",
    rootCause: "Traditional project management tools track costs after they are incurred. By the time a budget overrun appears in a report, the decision that caused it was made weeks ago.",
    cost: "Australian construction businesses lose an estimated $6.2 billion annually to preventable cost overruns — an average of 18% above initial project budgets.",
    solution: "PresciaIQ's predictive intelligence platform analyses procurement patterns, labour utilisation, subcontractor performance, and material price movements to predict budget variance 4–6 weeks before it materialises — giving project managers time to intervene.",
    outcome: "Construction businesses using PresciaIQ report an average 73% reduction in unplanned cost overruns within the first 12 months of deployment.",
    faqs: [
      { q: "Why do construction budgets blow out?", a: "Construction budget blowouts are caused by reactive cost management — tracking expenditure after it occurs rather than predicting it before. The root causes include inaccurate initial estimates, subcontractor underperformance, material price volatility, and scope creep that isn't flagged until it's already in the budget." },
      { q: "How can AI prevent construction cost overruns?", a: "AI prevents construction cost overruns by analysing historical project data, current procurement patterns, and real-time market signals to predict where costs will deviate from budget — weeks before the overrun materialises. This gives project managers time to intervene: renegotiate subcontracts, adjust scope, or secure alternative materials." },
      { q: "What is the average construction cost overrun in Australia?", a: "Australian construction projects average 18% above initial budget, with residential projects averaging 12–15% and commercial/infrastructure projects averaging 20–35%. The total cost to the industry is estimated at $6.2 billion annually." }
    ]
  },
  {
    slug: "construction-labour-cost-blowouts",
    industry: "Construction",
    industrySlug: "construction",
    problemTitle: "Predicting and Preventing Construction Labour Cost Overruns",
    problemShort: "Construction labour cost overruns",
    symptom: "Labour costs consistently exceed estimates by 15–25%, driven by overtime, subcontractor underperformance, and reactive crew scheduling.",
    rootCause: "Labour cost estimates are based on historical averages rather than site-specific predictive models. Crew productivity, absenteeism, and subcontractor performance are tracked retrospectively rather than predicted.",
    cost: "Labour cost overruns account for 40–60% of total construction budget blowouts in Australia, with the average residential project experiencing $45,000–$120,000 in unplanned labour costs.",
    solution: "PresciaIQ analyses crew productivity patterns, subcontractor performance history, weather impact on site access, and project complexity to forecast labour cost variance 3–5 weeks ahead — enabling proactive scheduling adjustments.",
    outcome: "Construction businesses using PresciaIQ's labour cost prediction models reduce unplanned labour overruns by up to 55% within 6 months.",
    faqs: [
      { q: "How do I reduce labour cost overruns on construction projects?", a: "Reducing labour cost overruns requires shifting from reactive tracking to predictive management. This means using historical productivity data, subcontractor performance records, and project complexity signals to forecast labour demand and cost variance before it occurs — then adjusting crew scheduling, subcontractor selection, and project sequencing proactively." },
      { q: "What causes labour cost overruns in construction?", a: "The primary causes are inaccurate productivity estimates, subcontractor underperformance, weather-related delays, scope changes that aren't reflected in labour budgets, and reactive overtime management. Most construction businesses discover labour overruns in weekly cost reports — by which point the decisions that caused them were made 2–4 weeks earlier." }
    ]
  },
  {
    slug: "construction-schedule-delays",
    industry: "Construction",
    industrySlug: "construction",
    problemTitle: "Predicting and Preventing Construction Schedule Delays",
    problemShort: "Construction schedule delays",
    symptom: "Projects consistently run 2–8 weeks behind schedule, triggering liquidated damages, subcontractor conflicts, and client relationship damage.",
    rootCause: "Schedule management relies on Gantt charts that assume linear progress. Real-world delays — weather, material delivery failures, subcontractor underperformance — are discovered reactively rather than predicted.",
    cost: "Schedule delays cost Australian construction businesses an estimated $3.8 billion annually in liquidated damages, extended preliminaries, and lost opportunity costs from delayed project completion.",
    solution: "PresciaIQ's schedule intelligence platform analyses weather forecasts, material delivery lead times, subcontractor performance patterns, and critical path dependencies to predict schedule risk 3–6 weeks ahead — enabling proactive mitigation.",
    outcome: "Construction businesses using PresciaIQ's schedule prediction models reduce project delays by up to 40% and eliminate 85% of liquidated damages claims.",
    faqs: [
      { q: "How can I predict construction schedule delays before they happen?", a: "Construction schedule delays can be predicted by analysing the leading indicators that precede them: weather forecast impact on site access, material delivery lead time variance, subcontractor productivity trends, and critical path dependency risk. AI models trained on historical project data can identify these signals 3–6 weeks before a delay materialises." },
      { q: "What is the cost of construction schedule delays in Australia?", a: "Construction schedule delays cost Australian businesses an estimated $3.8 billion annually. For individual projects, a 4-week delay on a $5M commercial build typically costs $80,000–$150,000 in extended preliminaries, subcontractor standing time, and liquidated damages." }
    ]
  },
  // Manufacturing
  {
    slug: "manufacturing-demand-forecasting",
    industry: "Manufacturing",
    industrySlug: "manufacturing",
    problemTitle: "Solving Demand Forecasting Failures in Australian Manufacturing",
    problemShort: "Manufacturing demand forecasting errors",
    symptom: "Production runs are consistently misaligned with actual demand — resulting in overstock write-offs, emergency production runs, and stockouts on high-velocity lines.",
    rootCause: "Most manufacturers forecast demand using spreadsheet-based models that rely on historical averages and sales team estimates. These models don't account for market signals, competitor activity, or seasonal complexity.",
    cost: "Demand forecasting errors cost Australian manufacturers an estimated $4.1 billion annually in excess inventory, emergency procurement, and lost sales from stockouts.",
    solution: "PresciaIQ's demand forecasting platform integrates with your ERP to analyse sales history, market signals, seasonality, and customer behaviour patterns — generating SKU-level demand forecasts 90 days out with confidence intervals.",
    outcome: "Manufacturers using PresciaIQ reduce overstock by up to 40%, eliminate emergency production runs, and improve forecast accuracy from 65% to 88%+ within 6 months.",
    faqs: [
      { q: "How do I improve demand forecasting accuracy in manufacturing?", a: "Improving demand forecasting accuracy requires moving beyond spreadsheet averages to machine learning models that incorporate external signals — market trends, competitor activity, weather, and economic indicators — alongside your internal sales history. AI-driven forecasting models consistently achieve 85–92% accuracy versus 60–70% for spreadsheet-based approaches." },
      { q: "What is the ROI of better demand forecasting for manufacturers?", a: "For a manufacturer with $20M in annual revenue, improving forecast accuracy from 65% to 88% typically delivers $800,000–$1.4M in annual savings through reduced overstock write-offs ($400–600K), eliminated emergency production costs ($200–400K), and reduced stockout-related lost sales ($200–400K)." }
    ]
  },
  {
    slug: "manufacturing-equipment-downtime",
    industry: "Manufacturing",
    industrySlug: "manufacturing",
    problemTitle: "Eliminating Unplanned Equipment Downtime in Manufacturing",
    problemShort: "Unplanned manufacturing equipment downtime",
    symptom: "Equipment failures occur without warning, halting production lines for 4–72 hours and triggering emergency maintenance costs 3–5x higher than planned maintenance.",
    rootCause: "Reactive maintenance programs wait for equipment to fail before intervening. Condition monitoring data from sensors is collected but not analysed predictively — it's reviewed after a failure, not before.",
    cost: "Unplanned equipment downtime costs Australian manufacturers an average of $180,000 per year per facility. For high-volume production lines, a single 24-hour stoppage can cost $50,000–$500,000.",
    solution: "PresciaIQ's predictive maintenance platform analyses sensor data, maintenance history, and operational patterns to forecast equipment failure probability 2–4 weeks before breakdown — scheduling interventions at optimal maintenance windows.",
    outcome: "Manufacturers using PresciaIQ's predictive maintenance models reduce unplanned downtime by up to 60% and cut maintenance costs by 25–35% within 12 months.",
    faqs: [
      { q: "How does predictive maintenance AI work for manufacturing?", a: "Predictive maintenance AI analyses sensor data from equipment (vibration, temperature, pressure, current draw) alongside maintenance history and operational patterns to identify the signatures that precede failure. The model learns which combinations of signals predict specific failure modes and generates probability-weighted forecasts of failure timing — typically 2–4 weeks ahead." },
      { q: "What is the difference between predictive and preventive maintenance?", a: "Preventive maintenance schedules interventions at fixed time intervals regardless of equipment condition — resulting in unnecessary maintenance on healthy equipment and missed failures on degrading equipment. Predictive maintenance uses sensor data and AI to schedule interventions only when equipment condition signals an impending failure — reducing maintenance costs while eliminating unplanned downtime." }
    ]
  },
  // Retail
  {
    slug: "retail-inventory-management",
    industry: "Retail",
    industrySlug: "retail",
    problemTitle: "Solving Retail Inventory Overstock and Stockout Problems with AI",
    problemShort: "Retail inventory overstock and stockouts",
    symptom: "Simultaneously carrying excess inventory on slow-moving lines while experiencing stockouts on high-velocity products — resulting in markdown losses and lost sales.",
    rootCause: "Retail replenishment systems use static reorder points based on historical averages. They don't adapt to demand signals, seasonal shifts, or local market events in real time.",
    cost: "Australian retailers write off an estimated $2.8 billion in excess inventory annually while losing $1.6 billion in sales to stockouts. The average retailer carries 23% more inventory than optimal.",
    solution: "PresciaIQ's retail intelligence platform analyses POS data, seasonality, local events, and competitor signals to generate SKU-level demand forecasts — automating replenishment decisions to eliminate both overstock and stockouts simultaneously.",
    outcome: "Retailers using PresciaIQ reduce excess inventory by up to 35%, eliminate 85% of stockouts on high-velocity lines, and improve gross margin by 3–6 percentage points within 90 days.",
    faqs: [
      { q: "How do I reduce retail inventory overstock without creating stockouts?", a: "Reducing overstock without creating stockouts requires demand-matched replenishment — ordering based on predicted demand rather than historical averages. AI forecasting models that incorporate seasonality, local events, and market signals can predict demand at the SKU level with 88–92% accuracy, enabling replenishment decisions that reduce both overstock and stockouts simultaneously." },
      { q: "What is the cost of retail stockouts in Australia?", a: "Retail stockouts cost Australian businesses an estimated $1.6 billion annually in lost sales. For an individual retailer, stockouts typically represent 3–8% of potential revenue — meaning a retailer with $10M in annual sales is losing $300,000–$800,000 to preventable stockouts." }
    ]
  },
  {
    slug: "retail-shrinkage-loss-prevention",
    industry: "Retail",
    industrySlug: "retail",
    problemTitle: "Using Predictive AI to Reduce Retail Shrinkage and Loss",
    problemShort: "Retail shrinkage and loss prevention",
    symptom: "Shrinkage rates of 1.5–3% of revenue, with loss events concentrated in specific stores, times, and product categories that aren't identified until inventory counts.",
    rootCause: "Loss prevention programs react to shrinkage after it occurs. Surveillance and inventory data are reviewed retrospectively rather than analysed predictively to identify high-risk windows before loss events occur.",
    cost: "Australian retailers lose an estimated $4.5 billion annually to shrinkage. For a retailer with $50M in annual revenue, a 2% shrinkage rate represents $1 million in annual losses — most of which is preventable.",
    solution: "PresciaIQ's loss prevention intelligence platform analyses transaction patterns, inventory movements, and operational signals to predict high-risk shrinkage windows by store, time, and product category — enabling targeted prevention interventions.",
    outcome: "Retailers using PresciaIQ's shrinkage prediction models reduce loss rates by up to 45% within 12 months through targeted prevention rather than blanket surveillance.",
    faqs: [
      { q: "How can AI reduce retail shrinkage?", a: "AI reduces retail shrinkage by identifying the patterns that precede loss events — specific combinations of staffing levels, transaction anomalies, inventory movements, and time-of-day signals that correlate with shrinkage. Predictive models can flag high-risk windows 24–48 hours ahead, enabling targeted prevention interventions rather than reactive investigation." }
    ]
  },
  // Logistics
  {
    slug: "logistics-route-optimisation",
    industry: "Logistics & Supply Chain",
    industrySlug: "logistics",
    problemTitle: "AI-Driven Route Optimisation for Australian Logistics Businesses",
    problemShort: "Logistics route inefficiency and fuel waste",
    symptom: "Delivery routes are planned manually or with static optimisation tools, resulting in 15–25% excess kilometres, fuel waste, and driver overtime.",
    rootCause: "Static route planning tools optimise for distance without accounting for real-time traffic, delivery time windows, vehicle capacity, and driver constraints simultaneously. Routes are planned the night before rather than dynamically adjusted.",
    cost: "Australian logistics businesses waste an estimated $1.8 billion annually on suboptimal routing — including excess fuel, driver overtime, and vehicle wear. The average delivery vehicle travels 18% more kilometres than the optimal route.",
    solution: "PresciaIQ's logistics intelligence platform uses predictive traffic modelling, dynamic time-window optimisation, and real-time constraint management to generate routes that reduce kilometres, fuel costs, and delivery windows simultaneously.",
    outcome: "Logistics businesses using PresciaIQ's route optimisation models reduce fuel costs by 12–18%, cut driver overtime by 25%, and improve on-time delivery rates by 15–20 percentage points.",
    faqs: [
      { q: "How does AI route optimisation work for logistics?", a: "AI route optimisation analyses real-time traffic data, historical delivery patterns, vehicle capacity constraints, delivery time windows, and driver availability to generate optimal routes dynamically — not just at the start of the day, but continuously as conditions change. This produces routes that are 15–25% more efficient than static planning tools." },
      { q: "What is the ROI of AI route optimisation for Australian logistics?", a: "For a fleet of 20 delivery vehicles, AI route optimisation typically delivers $180,000–$320,000 in annual savings through reduced fuel costs ($80–120K), reduced driver overtime ($60–100K), and reduced vehicle maintenance from fewer kilometres ($40–100K). Payback period is typically 3–6 months." }
    ]
  },
  {
    slug: "supply-chain-disruption",
    industry: "Logistics & Supply Chain",
    industrySlug: "logistics",
    problemTitle: "Predicting and Managing Supply Chain Disruptions Before They Hit",
    problemShort: "Supply chain disruption prediction",
    symptom: "Supply chain disruptions — supplier failures, port delays, material shortages — are discovered reactively, causing production stoppages, emergency procurement, and customer delivery failures.",
    rootCause: "Supply chain risk management relies on supplier scorecards and historical performance data. It doesn't incorporate external signals — geopolitical events, weather patterns, commodity price movements, shipping congestion — that predict disruptions 2–6 weeks ahead.",
    cost: "Supply chain disruptions cost Australian businesses an estimated $8.3 billion annually. A single tier-1 supplier failure can cost $500,000–$5 million in emergency procurement, production stoppages, and customer penalties.",
    solution: "PresciaIQ's supply chain intelligence platform monitors 200+ external risk signals — shipping congestion, weather events, commodity prices, supplier financial health — to predict disruption probability 2–6 weeks ahead, enabling proactive mitigation.",
    outcome: "Businesses using PresciaIQ's supply chain disruption prediction reduce emergency procurement costs by 60%, eliminate 80% of production stoppages from supply failures, and improve customer delivery performance by 25%.",
    faqs: [
      { q: "How can AI predict supply chain disruptions?", a: "AI predicts supply chain disruptions by monitoring external signals that precede them — shipping congestion at key ports, weather events affecting supplier regions, commodity price spikes, and supplier financial stress indicators. Machine learning models trained on historical disruption data can identify these patterns 2–6 weeks before they impact your supply chain." }
    ]
  },
  // Healthcare
  {
    slug: "healthcare-patient-demand-forecasting",
    industry: "Healthcare",
    industrySlug: "healthcare",
    problemTitle: "Predicting Patient Demand to Optimise Healthcare Staffing and Resources",
    problemShort: "Healthcare patient demand forecasting",
    symptom: "Staffing levels are misaligned with patient demand — resulting in costly agency staff during peak periods and underutilised permanent staff during troughs.",
    rootCause: "Healthcare staffing decisions are based on historical averages and manager intuition rather than predictive demand models. Seasonal patterns, local events, and demographic trends that predict demand spikes are not systematically incorporated.",
    cost: "Australian healthcare providers spend an estimated $2.1 billion annually on agency staff to cover demand mismatches that could be predicted and managed proactively. Agency staff cost 40–80% more than permanent staff for equivalent roles.",
    solution: "PresciaIQ's healthcare demand forecasting platform analyses appointment patterns, seasonal trends, local events, and demographic signals to forecast patient demand by service, location, and time — enabling proactive roster planning 8–12 weeks out.",
    outcome: "Healthcare providers using PresciaIQ reduce agency staffing costs by up to 45%, improve permanent staff utilisation by 15–20%, and eliminate the majority of reactive overtime within 6 months.",
    faqs: [
      { q: "How can healthcare providers predict patient demand?", a: "Healthcare providers can predict patient demand by analysing historical appointment patterns, seasonal illness trends, local event calendars, and demographic signals using machine learning models. These models generate demand forecasts by service type and location 8–12 weeks out — enabling proactive staffing decisions rather than reactive agency bookings." }
    ]
  },
  // Mining
  {
    slug: "mining-equipment-maintenance",
    industry: "Mining",
    industrySlug: "mining",
    problemTitle: "Predictive Maintenance for Mining Equipment: Eliminating Unplanned Downtime",
    problemShort: "Mining equipment unplanned downtime",
    symptom: "Heavy equipment failures occur without warning, halting production for 12–72 hours and triggering emergency maintenance costs 3–5x higher than planned interventions.",
    rootCause: "Mining maintenance programs use time-based schedules that don't reflect actual equipment condition. Sensor data is collected but reviewed reactively — after a failure, not before.",
    cost: "Unplanned equipment downtime costs Australian mining operations an estimated $8.3 billion annually. A single haul truck failure can cost $100,000–$500,000 per day in lost production.",
    solution: "PresciaIQ's predictive maintenance platform analyses sensor data from heavy equipment — vibration, temperature, oil analysis, current draw — to forecast failure probability 2–4 weeks before breakdown, scheduling interventions at optimal production windows.",
    outcome: "Mining operations using PresciaIQ reduce unplanned downtime by up to 60% and cut total maintenance costs by 25–35% within 12 months.",
    faqs: [
      { q: "How does predictive maintenance work for mining equipment?", a: "Predictive maintenance for mining equipment analyses sensor data streams — vibration signatures, temperature profiles, oil analysis results, and current draw patterns — to identify the degradation signatures that precede specific failure modes. AI models trained on historical failure data can predict failure probability 2–4 weeks ahead with 85–92% accuracy." }
    ]
  },
  // Financial Services
  {
    slug: "financial-services-risk-management",
    industry: "Financial Services",
    industrySlug: "financial-services",
    problemTitle: "AI-Driven Credit Risk and Portfolio Management for Financial Services",
    problemShort: "Credit risk prediction and portfolio management",
    symptom: "Credit default rates exceed expectations, with high-risk loans approved and low-risk loans declined due to scorecard limitations. Portfolio risk is managed reactively rather than predictively.",
    rootCause: "Traditional credit scorecards use static rules based on historical averages. They don't incorporate behavioural signals, market conditions, or real-time data that predict default probability more accurately.",
    cost: "Australian financial services firms lose an estimated $3.2 billion annually to preventable credit defaults. For a lender with $500M in loan book, a 1% improvement in default prediction accuracy reduces annual losses by $2–5M.",
    solution: "PresciaIQ's credit intelligence platform builds custom risk models trained on your specific loan portfolio — incorporating behavioural signals, market conditions, and real-time data to predict default probability with 23% greater accuracy than traditional scorecards.",
    outcome: "Financial services firms using PresciaIQ reduce default rates by 20–35%, improve approval rates on low-risk applications, and reduce manual review costs through automated risk scoring.",
    faqs: [
      { q: "How does AI improve credit risk assessment?", a: "AI improves credit risk assessment by incorporating hundreds of behavioural and contextual signals that traditional scorecards ignore — transaction patterns, account behaviour, market conditions, and real-time data — to build a more accurate picture of default probability. AI models consistently outperform traditional scorecards by 15–30% on default prediction accuracy." }
    ]
  },
  // Agriculture
  {
    slug: "agriculture-yield-forecasting",
    industry: "Agriculture",
    industrySlug: "agriculture",
    problemTitle: "AI Yield Forecasting for Australian Agricultural Businesses",
    problemShort: "Agricultural yield uncertainty and forecasting",
    symptom: "Yield estimates are based on historical averages and agronomist intuition, resulting in forward contract decisions made without reliable yield forecasts — and significant financial exposure when yields deviate from expectations.",
    rootCause: "Traditional yield forecasting doesn't integrate real-time weather data, soil sensor readings, satellite imagery, and commodity market signals into a unified predictive model.",
    cost: "Australian agricultural businesses face yield variance of 20–40% annually due to weather and market volatility. Poor forward contract timing costs the sector an estimated $1.4 billion annually in foregone margin.",
    solution: "PresciaIQ integrates weather data, soil sensors, satellite imagery, and commodity markets to generate 90-day yield forecasts with risk-adjusted confidence intervals — enabling confident forward contract and input purchasing decisions.",
    outcome: "Agricultural businesses using PresciaIQ improve gross margin by 8–15% through better forward contract timing and reduce input cost waste by 20–30% through demand-matched purchasing.",
    faqs: [
      { q: "How accurate are AI yield forecasts for Australian farmers?", a: "AI yield forecasts trained on Australian agricultural data typically achieve 80–88% accuracy at 90 days for grain crops and 75–85% for horticultural crops. This compares to 55–65% accuracy for traditional agronomist estimates. The key advantage is not just accuracy but confidence intervals — knowing the range of likely outcomes enables better risk management decisions." }
    ]
  },
  // Real Estate
  {
    slug: "real-estate-market-prediction",
    industry: "Real Estate",
    industrySlug: "real-estate",
    problemTitle: "Predicting Property Market Movements for Developers and Investors",
    problemShort: "Property market timing and price prediction",
    symptom: "Development launches and investment acquisitions are timed based on market sentiment and broker opinions rather than data-driven price forecasts — resulting in launches into declining markets and missed acquisition opportunities.",
    rootCause: "Property market analysis relies on lagging indicators — recent sales data, auction clearance rates, median price movements — that reflect what has already happened rather than what will happen next.",
    cost: "Australian property developers who miss optimal launch windows by 3–6 months sacrifice 8–15% in project returns. For a $20M development, this represents $1.6–3M in foregone margin.",
    solution: "PresciaIQ analyses suburb-level transaction data, interest rate forecasts, migration patterns, infrastructure investment, and rental yield signals to generate 12-month property price forecasts with directional accuracy above 85%.",
    outcome: "Property developers and investors using PresciaIQ improve project returns by 8–15% through better market timing and identify emerging growth corridors 12–18 months before they appear in public data.",
    faqs: [
      { q: "How can AI predict property price movements in Australia?", a: "AI predicts property price movements by analysing the leading indicators that precede price changes — interest rate forecasts, migration patterns, infrastructure investment announcements, rental yield compression, and demographic shifts. Models trained on 10+ years of Australian property data can predict directional price movements at the suburb level with 85%+ accuracy at 12 months." }
    ]
  },
  // Professional Services
  {
    slug: "professional-services-revenue-forecasting",
    industry: "Professional Services",
    industrySlug: "professional-services",
    problemTitle: "Predictive Revenue Forecasting for Professional Services Firms",
    problemShort: "Professional services revenue pipeline uncertainty",
    symptom: "Revenue forecasts are consistently inaccurate — pipeline deals close later than expected, at lower values, or not at all — resulting in resource planning errors and margin pressure.",
    rootCause: "Pipeline forecasting relies on sales team estimates that are systematically optimistic. Deal stage definitions don't reflect actual close probability, and pipeline velocity signals are not incorporated into forecasts.",
    cost: "Professional services firms with inaccurate pipeline forecasts over-hire 3–6 months ahead of actual demand, then under-hire when demand arrives — creating a cycle of contractor dependency that costs 40–80% more than permanent staff.",
    solution: "PresciaIQ's pipeline intelligence platform analyses deal stage progression, engagement patterns, and historical conversion data to generate probability-weighted revenue forecasts by deal, client, and practice area — with 90-day forward visibility.",
    outcome: "Professional services firms using PresciaIQ improve forecast accuracy from 61% to 89%, reduce contractor dependency by 35%, and improve billable utilisation by 8–15 percentage points within 6 months.",
    faqs: [
      { q: "How do I improve revenue forecasting accuracy for a professional services firm?", a: "Improving revenue forecasting accuracy requires replacing sales team estimates with data-driven probability models. By analysing deal stage progression velocity, client engagement patterns, and historical conversion rates by deal type and size, AI models can generate probability-weighted revenue forecasts that are 25–30% more accurate than traditional CRM-based forecasting." }
    ]
  },
  // Marketing / Media
  {
    slug: "marketing-roas-waste",
    industry: "Media & Advertising",
    industrySlug: "media-advertising",
    problemTitle: "Eliminating Ad Spend Waste with Predictive ROAS Forecasting",
    problemShort: "Ad spend waste and ROAS uncertainty",
    symptom: "Marketing budgets are allocated to campaigns and channels based on last-period performance rather than forward-looking ROAS predictions — resulting in 30–50% of spend going to suboptimal windows and channels.",
    rootCause: "Media planning relies on historical ROAS data that reflects past performance, not future conditions. Competitor spend, audience saturation, and seasonal demand shifts that predict ROAS changes are not incorporated into planning.",
    cost: "Australian advertisers waste an estimated $2.3 billion annually on campaigns launched at suboptimal times or with miscalibrated budgets. The average advertiser achieves 60–70% of their potential ROAS due to reactive budget allocation.",
    solution: "AdsIQ by PresciaIQ forecasts campaign ROAS before launch by analysing audience behaviour patterns, competitor spend signals, seasonal demand shifts, and channel saturation — enabling proactive budget allocation to predicted high-ROAS windows.",
    outcome: "Advertisers using AdsIQ improve blended ROAS by 34% on average in the first 90 days through predictive spend timing and channel allocation optimisation.",
    faqs: [
      { q: "How can I predict ROAS before launching a campaign?", a: "ROAS can be predicted before campaign launch by analysing the signals that drive it — audience demand patterns, competitor spend levels, creative fatigue indicators, and seasonal demand shifts. AI models trained on your historical campaign data can forecast ROAS by channel, audience, and time window with sufficient accuracy to guide budget allocation decisions." },
      { q: "What percentage of ad spend is wasted in Australia?", a: "Australian advertisers waste an estimated 30–50% of their media budgets on campaigns launched at suboptimal times, in suboptimal channels, or with suboptimal creative — according to industry research. The primary causes are reactive planning (allocating budget based on last period's performance) and lack of forward-looking ROAS prediction." }
    ]
  },
  {
    slug: "marketing-lead-generation-ai",
    industry: "Media & Advertising",
    industrySlug: "media-advertising",
    problemTitle: "Using AI to Automate and Improve Lead Generation for Australian Businesses",
    problemShort: "Lead generation inefficiency and cost",
    symptom: "Lead generation costs are rising while conversion rates are falling — with marketing teams spending increasing budget to generate the same number of qualified leads.",
    rootCause: "Lead generation programs target broad audiences with generic messaging rather than using predictive models to identify high-intent prospects and personalise outreach at scale.",
    cost: "Australian businesses spend an estimated $4.2 billion annually on lead generation activities. The average cost per qualified lead has increased 35% over the past 3 years as audience saturation and competition have intensified.",
    solution: "PresciaIQ's lead intelligence platform uses predictive scoring to identify high-intent prospects from your existing database and market signals, then automates personalised outreach sequences that convert at 3–5x the rate of generic campaigns.",
    outcome: "Businesses using PresciaIQ's lead generation AI reduce cost per qualified lead by 40–60% and improve lead-to-opportunity conversion rates by 2–4x within 90 days.",
    faqs: [
      { q: "How does AI improve lead generation for Australian businesses?", a: "AI improves lead generation by identifying high-intent prospects from behavioural signals before they raise their hand — website behaviour, content engagement, search patterns, and firmographic signals that indicate purchase intent. Predictive lead scoring models can identify the 10–15% of your database most likely to convert in the next 90 days, enabling focused outreach that converts at 3–5x the rate of broad campaigns." }
    ]
  },
  // Operations / Cross-industry
  {
    slug: "operations-bottleneck-prediction",
    industry: "Professional Services",
    industrySlug: "professional-services",
    problemTitle: "Predicting Operational Bottlenecks Before They Stall Your Business",
    problemShort: "Operational bottleneck prediction and prevention",
    symptom: "Operational bottlenecks — capacity constraints, process failures, resource shortages — are discovered reactively, causing delays, cost overruns, and customer service failures.",
    rootCause: "Operations management relies on lagging KPIs that measure performance after the fact. The leading indicators that predict bottlenecks — demand spikes, resource utilisation trends, process exception rates — are not monitored predictively.",
    cost: "Operational bottlenecks cost Australian businesses an estimated $6.8 billion annually in lost productivity, customer penalties, and emergency resource procurement. The average business experiences 3–5 significant bottleneck events per year.",
    solution: "PresciaIQ's operational intelligence platform monitors leading indicators across your operations — demand signals, resource utilisation, process exception rates, and supplier performance — to predict bottleneck probability 2–4 weeks ahead.",
    outcome: "Businesses using PresciaIQ's bottleneck prediction models reduce operational disruptions by 65%, eliminate emergency resource procurement costs, and improve customer delivery performance by 20–30%.",
    faqs: [
      { q: "How can AI predict operational bottlenecks?", a: "AI predicts operational bottlenecks by monitoring the leading indicators that precede them — demand spikes that will exceed capacity, resource utilisation trends approaching constraints, process exception rates that signal quality failures, and supplier performance signals that predict delivery failures. Models trained on your operational data can identify these patterns 2–4 weeks before they create visible bottlenecks." }
    ]
  },
  {
    slug: "workforce-planning-prediction",
    industry: "Professional Services",
    industrySlug: "professional-services",
    problemTitle: "Predictive Workforce Planning: Hiring Ahead of Demand, Not Behind It",
    problemShort: "Reactive workforce planning and hiring delays",
    symptom: "Hiring decisions lag demand by 3–6 months — resulting in contractor dependency during growth periods and redundancy costs during downturns.",
    rootCause: "Workforce planning relies on current headcount data and manager requests rather than forward-looking demand forecasts. By the time a headcount need is identified, the business is already 3–4 months behind.",
    cost: "Australian businesses spend an estimated $2.8 billion annually on contractor premiums to cover workforce planning failures. The average contractor costs 40–80% more than a permanent employee for equivalent roles.",
    solution: "PresciaIQ's workforce intelligence platform analyses business pipeline, project demand, attrition signals, and market conditions to forecast headcount requirements 6–12 months out — enabling hiring decisions that are ahead of demand rather than behind it.",
    outcome: "Businesses using PresciaIQ's workforce planning models reduce contractor dependency by 35%, cut time-to-hire by 40%, and improve workforce utilisation by 12–18 percentage points.",
    faqs: [
      { q: "How can AI improve workforce planning accuracy?", a: "AI improves workforce planning accuracy by forecasting headcount demand from business pipeline signals, project demand patterns, attrition risk indicators, and market conditions — rather than waiting for managers to raise headcount requests. This shifts hiring decisions 6–12 months ahead of actual need, eliminating the contractor dependency cycle that costs businesses 40–80% more per role." }
    ]
  },
  // Energy
  {
    slug: "energy-demand-forecasting",
    industry: "Energy & Utilities",
    industrySlug: "energy",
    problemTitle: "AI Energy Demand Forecasting for Australian Utilities and Businesses",
    problemShort: "Energy demand forecasting and grid management",
    symptom: "Energy demand forecasts are inaccurate, resulting in over-procurement of expensive spot market energy, under-procurement that triggers demand charges, and grid stress events that damage infrastructure.",
    rootCause: "Energy demand forecasting relies on historical consumption averages that don't account for weather variability, economic activity signals, and renewable generation intermittency.",
    cost: "Energy demand forecasting errors cost Australian businesses and utilities an estimated $2.1 billion annually in over-procurement costs, demand charges, and grid management inefficiency.",
    solution: "PresciaIQ's energy intelligence platform integrates weather forecasts, economic activity signals, and renewable generation predictions to forecast energy demand by zone and time-of-use with 95%+ accuracy — enabling proactive procurement and grid management.",
    outcome: "Energy businesses using PresciaIQ reduce demand forecast error by up to 35%, cut over-procurement costs by 20–30%, and eliminate the majority of reactive grid management interventions.",
    faqs: [
      { q: "How accurate is AI energy demand forecasting?", a: "AI energy demand forecasting models trained on Australian grid data typically achieve 93–97% accuracy at 24-hour horizons and 88–92% accuracy at 7-day horizons — compared to 80–85% for traditional statistical models. The improvement in accuracy translates directly to reduced procurement costs and better grid stability." }
    ]
  },
  // Education
  {
    slug: "education-student-attrition",
    industry: "Education",
    industrySlug: "education",
    problemTitle: "Using AI to Predict and Prevent Student Attrition in Australian Education",
    problemShort: "Student attrition and dropout prediction",
    symptom: "Student dropout rates of 15–30% per cohort, with at-risk students identified only after they have already disengaged — too late for effective intervention.",
    rootCause: "Student support programs are triggered by visible disengagement signals — missed assessments, attendance drops — that appear weeks after the underlying risk factors have developed.",
    cost: "Australian higher education providers lose an estimated $890 million annually to student attrition. For an individual institution with 10,000 students and a 20% attrition rate, each percentage point improvement in retention is worth $1.5–2.5M in annual revenue.",
    solution: "PresciaIQ's student intelligence platform analyses engagement patterns, assessment performance, attendance data, and demographic signals to identify at-risk students 6–8 weeks before typical dropout points — enabling targeted intervention before disengagement occurs.",
    outcome: "Education providers using PresciaIQ reduce attrition rates by 25–40% within the first year through early intervention programs informed by predictive risk scoring.",
    faqs: [
      { q: "How can AI predict student dropout risk?", a: "AI predicts student dropout risk by analysing the early warning signals that precede disengagement — subtle changes in assignment submission patterns, LMS engagement, attendance trends, and social integration indicators that appear 6–8 weeks before a student visibly disengages. Models trained on historical attrition data can identify at-risk students with 78–85% accuracy at 8 weeks." }
    ]
  },
  // Insurance
  {
    slug: "insurance-claims-fraud",
    industry: "Insurance",
    industrySlug: "insurance",
    problemTitle: "AI Fraud Detection for Australian Insurance Businesses",
    problemShort: "Insurance fraud detection and claims prediction",
    symptom: "Fraudulent claims are identified only after payment, with traditional rules-based detection catching less than 30% of fraud before it is paid.",
    rootCause: "Rules-based fraud detection systems use static thresholds that fraudsters learn to circumvent. They don't adapt to new fraud patterns or incorporate the behavioural signals that distinguish fraudulent from legitimate claims.",
    cost: "Australian insurance businesses lose an estimated $2.4 billion annually to insurance fraud. For a mid-tier insurer with $500M in annual claims, a 1% improvement in fraud detection accuracy recovers $5M in annual losses.",
    solution: "PresciaIQ's fraud intelligence platform uses machine learning models trained on your claims history to identify behavioural patterns that distinguish fraudulent from legitimate claims — surfacing 3x more fraud signals than traditional rules-based systems.",
    outcome: "Insurance businesses using PresciaIQ's fraud detection models recover 3x more fraudulent claims in the first 6 months, reduce false positive rates by 40%, and cut fraud investigation costs through better triage.",
    faqs: [
      { q: "How does AI improve insurance fraud detection?", a: "AI improves insurance fraud detection by analysing hundreds of behavioural signals that rules-based systems miss — claim timing patterns, claimant history, network connections between claimants and service providers, and anomalous claim characteristics. Machine learning models trained on historical fraud data can identify fraudulent claims with 85–92% accuracy, compared to 25–35% for traditional rules-based systems." }
    ]
  },
  // Food & Beverage
  {
    slug: "food-beverage-waste-reduction",
    industry: "Food & Beverage",
    industrySlug: "food-beverage",
    problemTitle: "Reducing Food and Beverage Waste with Predictive Demand Forecasting",
    problemShort: "Food waste from overproduction and demand volatility",
    symptom: "Overproduction results in 15–35% of production being written off as waste, while demand spikes cause stockouts and emergency production runs that cost 2–3x standard production rates.",
    rootCause: "Production planning relies on historical averages and sales team estimates that don't account for weather, local events, and channel-specific demand signals that drive actual consumption.",
    cost: "Australian food and beverage businesses waste an estimated $3.1 billion in overproduction annually. Emergency production runs — triggered by demand spikes that weren't predicted — cost 2–3x standard production rates.",
    solution: "PresciaIQ's demand forecasting platform analyses sales history, weather, local events, and channel signals to generate SKU-level demand forecasts — enabling production planning that eliminates both overproduction waste and emergency production runs.",
    outcome: "Food and beverage businesses using PresciaIQ reduce production waste by up to 35%, eliminate emergency production runs, and improve gross margin by 3–6 percentage points within 6 months.",
    faqs: [
      { q: "How can AI reduce food waste in manufacturing?", a: "AI reduces food waste by generating accurate demand forecasts that enable production planning matched to actual demand rather than historical averages. By incorporating weather, local events, and channel signals, AI forecasting models can predict demand at the SKU level with 88–92% accuracy — enabling production runs that match demand within 5–8% rather than the 20–35% variance typical of spreadsheet-based planning." }
    ]
  },
  // Wholesale Distribution
  {
    slug: "wholesale-distribution-inventory",
    industry: "Wholesale Distribution",
    industrySlug: "wholesale-distribution",
    problemTitle: "AI Inventory Optimisation for Australian Wholesale Distributors",
    problemShort: "Wholesale distribution inventory overstock and stockouts",
    symptom: "Carrying 20–30% excess inventory on slow-moving lines while simultaneously experiencing stockouts on high-velocity products — resulting in write-offs, emergency freight, and customer service failures.",
    rootCause: "Wholesale replenishment systems use static reorder points that don't adapt to demand volatility, seasonal patterns, or customer-specific ordering behaviour.",
    cost: "Australian wholesale distributors carry an average of 23% excess inventory relative to optimal levels — representing $4.2 billion in tied-up working capital across the sector. Stockout-related lost sales and emergency freight add a further $1.8 billion annually.",
    solution: "PresciaIQ's distribution intelligence platform analyses order patterns, customer behaviour, and market signals to generate SKU-level demand forecasts — automating replenishment decisions that reduce both overstock and stockouts simultaneously.",
    outcome: "Wholesale distributors using PresciaIQ reduce excess inventory by up to 35%, eliminate 85% of stockouts on high-velocity lines, and improve order fill rates from 94% to 98%+ within 90 days.",
    faqs: [
      { q: "How do I reduce wholesale distribution inventory costs with AI?", a: "Reducing wholesale distribution inventory costs with AI requires replacing static reorder points with dynamic demand forecasting models that incorporate customer ordering patterns, seasonal signals, and market conditions. AI forecasting models can predict order volumes by SKU and customer with 88–92% accuracy at 90 days — enabling replenishment decisions that reduce excess inventory by 30–40% while simultaneously improving fill rates." }
    ]
  }
];
