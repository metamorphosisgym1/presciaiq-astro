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
      { q: "Why do construction projects go over budget?", a: "The primary cause is reactive decision-making — project managers respond to cost overruns after they appear in reports, by which time the decisions that caused them are already made. Predictive intelligence identifies the leading indicators of budget variance — procurement delays, labour inefficiency, scope creep — weeks before they become cost overruns." },
      { q: "How does AI prevent construction budget blowouts?", a: "PresciaIQ analyses historical project data, real-time procurement activity, labour utilisation, and subcontractor performance to build predictive models that identify budget risk 4–6 weeks before it materialises. Project managers receive automated alerts with specific recommended actions — not just a warning that costs are rising." },
      { q: "What is the ROI of predictive intelligence for construction businesses?", a: "PresciaIQ clients in construction typically achieve full ROI within 6–9 months through a combination of reduced cost overruns, improved subcontractor management, and faster project closeout. The average cost overrun reduction is 73% in the first year." }
    ]
  },
  {
    slug: "construction-labour-cost-blowouts",
    industry: "Construction",
    industrySlug: "construction",
    problemTitle: "How to Control Labour Costs on Construction Projects",
    problemShort: "Construction labour cost overruns",
    symptom: "Labour costs consistently exceed estimates, with overtime and rework driving margins below 5% on projects that were quoted at 12–15%.",
    rootCause: "Labour cost estimates are built on historical averages that don't account for real-time productivity variance, subcontractor performance degradation, or weather-related delays.",
    cost: "Labour typically represents 30–40% of construction project costs. A 15% labour cost overrun on a $5M project costs $225,000 — often the difference between profit and loss.",
    solution: "PresciaIQ predicts labour cost variance by analysing productivity rates, weather forecasts, subcontractor historical performance, and project schedule dependencies — flagging risk before overtime is incurred.",
    outcome: "Construction businesses using PresciaIQ reduce labour cost overruns by an average of 61% within the first year.",
    faqs: [
      { q: "How do you reduce labour costs in construction?", a: "The most effective approach is predictive labour management — identifying productivity risk before overtime is incurred rather than managing it after. PresciaIQ analyses real-time productivity data, subcontractor performance, and schedule dependencies to predict labour cost variance 2–4 weeks in advance." },
      { q: "What causes labour cost overruns in construction?", a: "The primary causes are productivity variance (workers taking longer than estimated), rework (defects requiring correction), weather delays, and subcontractor underperformance. Traditional project management tools identify these issues after they impact costs — PresciaIQ identifies the leading indicators before they do." },
      { q: "Can AI reduce construction labour costs?", a: "Yes. PresciaIQ's predictive models analyse the leading indicators of labour cost overruns — productivity rates, schedule pressure, weather risk, subcontractor performance — and surface automated alerts with specific recommended actions before overtime is incurred." }
    ]
  },
  {
    slug: "construction-schedule-delays",
    industry: "Construction",
    industrySlug: "construction",
    problemTitle: "How to Prevent Construction Schedule Delays",
    problemShort: "Construction schedule delays",
    symptom: "Projects consistently run 2–8 weeks behind schedule, triggering liquidated damages clauses and damaging client relationships.",
    rootCause: "Schedule delays compound — a 3-day delay in one trade creates a 2-week delay for the next. Traditional scheduling tools identify delays after they occur, not before.",
    cost: "Liquidated damages clauses in Australian construction contracts typically run at $5,000–$50,000 per day. A 3-week delay on a commercial project can cost $105,000–$1,050,000.",
    solution: "PresciaIQ analyses schedule dependencies, subcontractor lead times, material delivery windows, and weather forecasts to predict schedule risk 3–5 weeks in advance — giving project managers time to resequence work and avoid delay penalties.",
    outcome: "Construction businesses using PresciaIQ reduce schedule overruns by an average of 68% within the first year.",
    faqs: [
      { q: "How do you prevent construction delays?", a: "The most effective approach is predictive schedule management — identifying delay risk before it compounds rather than responding to delays after they occur. PresciaIQ analyses schedule dependencies, subcontractor performance, material delivery windows, and weather risk to predict schedule variance 3–5 weeks in advance." },
      { q: "What are the most common causes of construction delays in Australia?", a: "The most common causes are subcontractor delays, material delivery failures, weather events, design changes, and permit delays. PresciaIQ monitors the leading indicators of each — subcontractor performance trends, supplier delivery reliability, weather forecasts, and approval timelines — to predict which projects are at risk before delays materialise." },
      { q: "Can AI prevent construction schedule overruns?", a: "Yes. PresciaIQ's predictive models analyse the leading indicators of schedule risk across all active projects simultaneously — something no project manager can do manually. Automated alerts surface the specific risks and recommended actions before delays compound." }
    ]
  },
  // Manufacturing
  {
    slug: "manufacturing-demand-forecasting",
    industry: "Manufacturing",
    industrySlug: "manufacturing",
    problemTitle: "How to Improve Demand Forecasting for Australian Manufacturers",
    problemShort: "Manufacturing demand forecasting errors",
    symptom: "Overproduction and stockouts alternate unpredictably, with inventory carrying costs consuming 20–30% of working capital.",
    rootCause: "Traditional demand forecasting relies on historical sales averages that don't account for market signals, customer behaviour changes, or supply chain disruptions.",
    cost: "Australian manufacturers lose an estimated $4.1 billion annually to demand forecasting errors — through a combination of overproduction write-offs, stockout lost sales, and excess inventory carrying costs.",
    solution: "PresciaIQ's predictive demand intelligence analyses customer order patterns, market signals, seasonal trends, and supply chain lead times to generate 12-week demand forecasts with 94% accuracy — automatically adjusting production schedules.",
    outcome: "Manufacturing businesses using PresciaIQ reduce inventory carrying costs by an average of 34% and eliminate 89% of stockout events within the first 12 months.",
    faqs: [
      { q: "How do you improve demand forecasting in manufacturing?", a: "The most effective approach is machine learning-based demand intelligence that analyses multiple data signals simultaneously — customer order history, market trends, seasonal patterns, and supply chain lead times. PresciaIQ generates 12-week demand forecasts with 94% accuracy and automatically adjusts production schedules." },
      { q: "What is the cost of poor demand forecasting for manufacturers?", a: "Poor demand forecasting costs Australian manufacturers through overproduction write-offs, stockout lost sales, emergency procurement premiums, and excess inventory carrying costs. The average mid-market manufacturer loses 8–15% of annual revenue to demand forecasting errors." },
      { q: "Can AI improve manufacturing demand forecasting?", a: "Yes. PresciaIQ's machine learning models analyse far more data signals than traditional forecasting methods — including customer behaviour patterns, market indicators, and supply chain dynamics — generating significantly more accurate forecasts and automatically adjusting production plans." }
    ]
  },
  {
    slug: "manufacturing-equipment-downtime",
    industry: "Manufacturing",
    industrySlug: "manufacturing",
    problemTitle: "How to Reduce Unplanned Equipment Downtime in Manufacturing",
    problemShort: "Unplanned manufacturing equipment downtime",
    symptom: "Unplanned equipment failures cause production stoppages averaging 4–8 hours per incident, with emergency repair costs 3–5x higher than planned maintenance.",
    rootCause: "Preventive maintenance schedules are based on time intervals rather than actual equipment condition — resulting in both premature maintenance and unexpected failures.",
    cost: "Unplanned downtime costs Australian manufacturers an average of $15,000–$50,000 per hour in lost production, emergency labour, and expedited parts. A single major failure can cost $500,000+.",
    solution: "PresciaIQ's predictive maintenance intelligence analyses equipment sensor data, maintenance history, production load, and environmental conditions to predict failure risk 2–4 weeks before it occurs — enabling planned maintenance that prevents unplanned stoppages.",
    outcome: "Manufacturing businesses using PresciaIQ reduce unplanned downtime by an average of 78% within the first 12 months.",
    faqs: [
      { q: "How do you reduce unplanned downtime in manufacturing?", a: "The most effective approach is predictive maintenance — using machine learning to analyse equipment condition data and predict failure risk before it causes a stoppage. PresciaIQ analyses sensor data, maintenance history, and production load to predict equipment failure 2–4 weeks in advance." },
      { q: "What is the cost of unplanned downtime in Australian manufacturing?", a: "Unplanned downtime costs Australian manufacturers an average of $15,000–$50,000 per hour in lost production, emergency labour, and expedited parts. For high-volume production lines, a single major failure can cost $500,000 or more in direct and indirect costs." },
      { q: "What is predictive maintenance and how does it work?", a: "Predictive maintenance uses machine learning to analyse equipment condition data — including vibration, temperature, pressure, and power consumption — to identify the early warning signs of failure before they cause a stoppage. PresciaIQ's predictive maintenance models are pre-built for common manufacturing equipment types and deploy in weeks." }
    ]
  },
  // Retail
  {
    slug: "retail-inventory-management",
    industry: "Retail",
    industrySlug: "retail",
    problemTitle: "How to Solve Retail Inventory Management Problems with AI",
    problemShort: "Retail inventory management",
    symptom: "Stockouts on fast-moving lines and overstock on slow-moving lines coexist simultaneously, with markdown costs consuming 8–15% of gross margin.",
    rootCause: "Traditional inventory management relies on reorder points based on historical averages — unable to account for real-time demand signals, promotional uplift, or supply chain disruptions.",
    cost: "Australian retailers lose an estimated $9.3 billion annually to inventory management failures — through stockout lost sales, markdown write-offs, and excess inventory carrying costs.",
    solution: "PresciaIQ's predictive inventory intelligence analyses point-of-sale data, promotional calendars, supplier lead times, and external demand signals to generate SKU-level demand forecasts and automated replenishment recommendations.",
    outcome: "Retail businesses using PresciaIQ reduce stockout frequency by 84% and markdown costs by 41% within the first 12 months.",
    faqs: [
      { q: "How does AI improve retail inventory management?", a: "PresciaIQ analyses real-time point-of-sale data, promotional uplift patterns, seasonal trends, and supplier lead times to generate SKU-level demand forecasts and automated replenishment recommendations — eliminating the manual analysis that traditional inventory management requires." },
      { q: "What is the cost of poor inventory management for Australian retailers?", a: "Poor inventory management costs Australian retailers through stockout lost sales (typically 4–8% of revenue), markdown write-offs on overstock (8–15% of gross margin), and excess inventory carrying costs (20–30% of inventory value annually)." },
      { q: "Can predictive AI reduce retail stockouts?", a: "Yes. PresciaIQ's predictive inventory models analyse the leading indicators of stockout risk — demand acceleration, supplier lead time variance, promotional uplift — and generate automated replenishment recommendations before stock runs out. Clients report an average 84% reduction in stockout frequency." }
    ]
  },
  {
    slug: "retail-shrinkage-loss-prevention",
    industry: "Retail",
    industrySlug: "retail",
    problemTitle: "How to Reduce Retail Shrinkage with Predictive AI",
    problemShort: "Retail shrinkage and loss prevention",
    symptom: "Shrinkage consistently runs at 1.5–3% of revenue, with loss prevention teams unable to identify high-risk patterns before theft or waste occurs.",
    rootCause: "Traditional loss prevention is reactive — reviewing CCTV footage and conducting audits after shrinkage is discovered. By the time patterns are identified, significant losses have already occurred.",
    cost: "Australian retailers lose approximately $9 billion annually to shrinkage. For a $50M retailer, a 2% shrinkage rate costs $1M per year — most of which is preventable.",
    solution: "PresciaIQ's predictive loss prevention intelligence analyses transaction patterns, inventory variance, staff scheduling, and store traffic data to identify high-risk shrinkage patterns before they result in loss.",
    outcome: "Retail businesses using PresciaIQ reduce shrinkage by an average of 47% within the first 12 months.",
    faqs: [
      { q: "How does AI reduce retail shrinkage?", a: "PresciaIQ analyses transaction patterns, inventory variance, staff scheduling, and store traffic data to identify the leading indicators of shrinkage risk — including unusual transaction patterns, inventory discrepancies, and high-risk time windows — before losses occur." },
      { q: "What causes retail shrinkage in Australia?", a: "Australian retail shrinkage is caused by external theft (approximately 38%), employee theft (approximately 28%), administrative errors (approximately 21%), and supplier fraud (approximately 13%). PresciaIQ's predictive models identify the leading indicators of each type before losses materialise." },
      { q: "What is the ROI of predictive loss prevention for retailers?", a: "PresciaIQ clients in retail typically achieve full ROI within 4–6 months through shrinkage reduction alone. The average shrinkage reduction is 47% in the first year — delivering $470,000 in savings for a retailer with $1M in annual shrinkage." }
    ]
  },
  // Logistics
  {
    slug: "logistics-route-optimisation",
    industry: "Logistics",
    industrySlug: "logistics",
    problemTitle: "How to Reduce Logistics Costs with Predictive Route Optimisation",
    problemShort: "Logistics route optimisation",
    symptom: "Fuel and driver costs consistently exceed budget, with route inefficiency adding 15–25% to delivery costs.",
    rootCause: "Traditional route planning optimises for distance rather than real-time conditions — failing to account for traffic patterns, delivery window constraints, vehicle capacity, and driver availability.",
    cost: "Fuel and labour represent 60–70% of logistics operating costs. A 20% route inefficiency on a $10M logistics operation costs $1.2–1.4M annually in preventable fuel and labour waste.",
    solution: "PresciaIQ's predictive logistics intelligence analyses traffic patterns, delivery window constraints, vehicle capacity, driver availability, and fuel price movements to generate dynamically optimised route plans that reduce cost per delivery.",
    outcome: "Logistics businesses using PresciaIQ reduce fuel and driver costs by an average of 19% within the first 12 months.",
    faqs: [
      { q: "How does AI optimise logistics routes?", a: "PresciaIQ analyses real-time traffic data, delivery window constraints, vehicle capacity, driver hours, and fuel price movements to generate dynamically optimised route plans — continuously adjusting as conditions change throughout the day." },
      { q: "What is the cost of route inefficiency for Australian logistics businesses?", a: "Route inefficiency typically adds 15–25% to delivery costs. For a $10M logistics operation, this represents $1.2–2.5M in annual preventable waste — primarily through excess fuel consumption and driver overtime." },
      { q: "Can predictive AI reduce logistics operating costs?", a: "Yes. PresciaIQ's predictive logistics models optimise routes in real time based on traffic, delivery constraints, and vehicle capacity — reducing fuel consumption by 12–18% and driver overtime by 22–31% on average." }
    ]
  },
  {
    slug: "supply-chain-disruption",
    industry: "Logistics",
    industrySlug: "logistics",
    problemTitle: "How to Predict and Prevent Supply Chain Disruptions",
    problemShort: "Supply chain disruption prediction",
    symptom: "Supply chain disruptions cause emergency procurement at 30–50% premium, with stockouts and production stoppages following supplier failures.",
    rootCause: "Supply chain risk management is reactive — businesses discover supplier failures when deliveries don't arrive, by which time the cost of disruption is already incurred.",
    cost: "Supply chain disruptions cost Australian businesses an estimated $12.5 billion annually. A single major supplier failure can cost a mid-market business $500,000–$2M in emergency procurement, production delays, and lost sales.",
    solution: "PresciaIQ's predictive supply chain intelligence monitors supplier performance trends, financial health indicators, geopolitical risk signals, and logistics disruption patterns to predict supply chain risk 4–8 weeks before it materialises.",
    outcome: "Businesses using PresciaIQ reduce supply chain disruption costs by an average of 64% within the first 12 months.",
    faqs: [
      { q: "How do you predict supply chain disruptions?", a: "PresciaIQ monitors the leading indicators of supply chain risk — supplier delivery performance trends, financial health signals, geopolitical events, logistics disruption patterns, and commodity price movements — to predict which suppliers and supply chains are at risk 4–8 weeks before disruption occurs." },
      { q: "What is the cost of supply chain disruptions for Australian businesses?", a: "Supply chain disruptions cost Australian businesses through emergency procurement premiums (30–50% above standard pricing), production stoppages, lost sales, and customer relationship damage. The average mid-market business loses $500,000–$2M per major supply chain disruption." },
      { q: "Can AI prevent supply chain disruptions?", a: "AI cannot prevent all supply chain disruptions — but it can predict them far enough in advance to allow businesses to activate alternative suppliers, build buffer stock, or adjust production schedules before the disruption impacts operations. PresciaIQ clients reduce disruption costs by an average of 64%." }
    ]
  },
  // Healthcare
  {
    slug: "healthcare-patient-demand-forecasting",
    industry: "Healthcare",
    industrySlug: "healthcare",
    problemTitle: "How to Improve Patient Demand Forecasting for Healthcare Providers",
    problemShort: "Healthcare patient demand forecasting",
    symptom: "Staffing mismatches cause simultaneous overstaffing on quiet periods and understaffing during demand peaks — driving both unnecessary labour costs and patient wait time complaints.",
    rootCause: "Healthcare staffing is planned on historical averages and seasonal patterns that don't account for real-time demand signals — including disease prevalence trends, weather events, and local population health indicators.",
    cost: "Healthcare staffing inefficiency costs Australian providers an estimated $3.8 billion annually through overstaffing waste and the indirect costs of understaffing — patient dissatisfaction, staff burnout, and adverse outcomes.",
    solution: "PresciaIQ's predictive demand intelligence analyses patient presentation patterns, disease prevalence trends, weather forecasts, and local population health indicators to generate 4-week staffing demand forecasts with 91% accuracy.",
    outcome: "Healthcare providers using PresciaIQ reduce staffing cost variance by an average of 44% within the first 12 months.",
    faqs: [
      { q: "How does AI improve healthcare staffing?", a: "PresciaIQ analyses patient presentation patterns, disease prevalence trends, weather forecasts, and local population health indicators to predict demand 4 weeks in advance — enabling staffing managers to schedule the right number of staff for each shift rather than relying on historical averages." },
      { q: "What causes healthcare staffing inefficiency?", a: "Healthcare staffing inefficiency is primarily caused by demand unpredictability — patient volumes vary significantly based on seasonal disease patterns, weather events, and local health trends that traditional scheduling tools cannot anticipate. PresciaIQ's predictive models identify these patterns and translate them into staffing recommendations." },
      { q: "Can predictive AI reduce healthcare labour costs?", a: "Yes. PresciaIQ's predictive staffing models reduce overstaffing waste while simultaneously improving coverage during demand peaks — delivering both cost reduction and service quality improvement. Clients report an average 44% reduction in staffing cost variance." }
    ]
  },
  // Mining
  {
    slug: "mining-equipment-maintenance",
    industry: "Mining",
    industrySlug: "mining",
    problemTitle: "How to Reduce Mining Equipment Downtime with Predictive Maintenance",
    problemShort: "Mining equipment predictive maintenance",
    symptom: "Unplanned equipment failures cause production stoppages averaging 12–48 hours, with haul truck and excavator failures costing $100,000+ per incident.",
    rootCause: "Mining equipment maintenance schedules are based on operating hours rather than actual equipment condition — resulting in premature maintenance on healthy equipment and unexpected failures on degrading equipment.",
    cost: "Unplanned equipment downtime costs Australian mining operations an estimated $8.2 billion annually. A single haul truck failure can cost $150,000–$500,000 in lost production and emergency repair.",
    solution: "PresciaIQ's predictive maintenance intelligence analyses equipment telemetry, maintenance history, operating conditions, and environmental factors to predict failure risk 2–6 weeks before it occurs — enabling planned maintenance windows that prevent production stoppages.",
    outcome: "Mining operations using PresciaIQ reduce unplanned equipment downtime by an average of 71% within the first 12 months.",
    faqs: [
      { q: "How does predictive maintenance work in mining?", a: "PresciaIQ analyses equipment telemetry data — vibration, temperature, pressure, oil quality, and power consumption — alongside maintenance history and operating conditions to identify the early warning signs of equipment failure 2–6 weeks before it causes a production stoppage." },
      { q: "What is the cost of equipment downtime in Australian mining?", a: "Equipment downtime costs Australian mining operations through lost production (typically $50,000–$500,000 per hour for major equipment), emergency repair premiums, and expedited parts freight. A single haul truck failure can cost $150,000–$500,000 in total direct and indirect costs." },
      { q: "Can AI predict mining equipment failures?", a: "Yes. PresciaIQ's predictive maintenance models are trained on equipment telemetry data from thousands of mining assets — enabling them to identify the subtle patterns that precede failure with high accuracy. Clients report an average 71% reduction in unplanned downtime within the first year." }
    ]
  },
  // Financial Services
  {
    slug: "financial-services-risk-management",
    industry: "Financial Services",
    industrySlug: "financial-services",
    problemTitle: "How to Improve Risk Management in Financial Services with AI",
    problemShort: "Financial services risk management",
    symptom: "Credit losses, fraud events, and compliance breaches consistently exceed risk appetite — with risk teams identifying issues after losses are incurred rather than before.",
    rootCause: "Traditional risk management relies on threshold-based rules and periodic reviews that cannot detect the complex, multi-signal patterns that precede credit deterioration, fraud, and compliance failure.",
    cost: "Australian financial services businesses lose an estimated $14.7 billion annually to credit losses, fraud, and compliance penalties — most of which could be reduced with earlier risk detection.",
    solution: "PresciaIQ's predictive risk intelligence analyses customer behaviour patterns, transaction data, market signals, and external risk indicators to predict credit deterioration, fraud risk, and compliance exposure weeks before losses materialise.",
    outcome: "Financial services businesses using PresciaIQ reduce credit losses by an average of 38% and fraud losses by 52% within the first 12 months.",
    faqs: [
      { q: "How does AI improve risk management in financial services?", a: "PresciaIQ analyses customer behaviour patterns, transaction data, market signals, and external risk indicators simultaneously — identifying the complex, multi-signal patterns that precede credit deterioration, fraud, and compliance failure weeks before losses occur." },
      { q: "What is the cost of poor risk management for Australian financial services?", a: "Poor risk management costs Australian financial services businesses through credit losses, fraud write-offs, regulatory penalties, and reputational damage. The average mid-market financial services business loses 2–5% of revenue annually to preventable risk events." },
      { q: "Can predictive AI reduce financial services fraud?", a: "Yes. PresciaIQ's fraud prediction models analyse transaction patterns, behavioural signals, and network relationships to identify fraud risk before transactions are completed — reducing fraud losses by an average of 52% compared to traditional rule-based detection systems." }
    ]
  },
  // Agriculture
  {
    slug: "agriculture-yield-forecasting",
    industry: "Agriculture",
    industrySlug: "agriculture",
    problemTitle: "How to Improve Crop Yield Forecasting with Predictive AI",
    problemShort: "Agricultural yield forecasting",
    symptom: "Harvest yield variance of 20–40% from forecast creates cash flow crises, over-committed supply contracts, and missed market opportunities.",
    rootCause: "Traditional yield forecasting relies on historical averages and visual crop assessment — unable to account for real-time soil moisture, weather trajectory, pest pressure, and disease risk.",
    cost: "Yield forecasting errors cost Australian agricultural businesses through over-committed supply contracts, emergency input procurement, and missed high-price market windows. A 25% yield shortfall on a $2M crop can cost $500,000+ in contract penalties and lost margin.",
    solution: "PresciaIQ's predictive yield intelligence analyses satellite imagery, soil moisture data, weather forecasts, historical yield patterns, and pest/disease risk indicators to generate 8-week yield forecasts with 89% accuracy.",
    outcome: "Agricultural businesses using PresciaIQ reduce yield forecast variance by an average of 67% within the first growing season.",
    faqs: [
      { q: "How does AI improve crop yield forecasting?", a: "PresciaIQ analyses satellite imagery, soil moisture sensors, weather forecast models, historical yield data, and pest/disease risk indicators to generate highly accurate yield forecasts — enabling farmers to make better decisions about supply contracts, input purchasing, and harvest logistics." },
      { q: "What causes crop yield forecasting errors?", a: "Traditional yield forecasting relies on historical averages and visual assessment — unable to account for the complex interactions between soil moisture, weather patterns, pest pressure, and disease risk that determine actual yield. PresciaIQ's machine learning models analyse all these factors simultaneously." },
      { q: "Can predictive AI help Australian farmers?", a: "Yes. PresciaIQ's agricultural intelligence models are built for Australian growing conditions — accounting for the unique climate variability, soil types, and pest/disease pressures that affect Australian crop yields. Clients report an average 67% reduction in yield forecast variance within the first growing season." }
    ]
  },
  // Real Estate
  {
    slug: "real-estate-market-prediction",
    industry: "Real Estate",
    industrySlug: "real-estate",
    problemTitle: "How to Predict Property Market Movements with AI",
    problemShort: "Real estate market prediction",
    symptom: "Property acquisition and development decisions are made on lagging market data — resulting in overpayment at market peaks and missed opportunities at market troughs.",
    rootCause: "Traditional real estate market analysis relies on historical transaction data that is 3–6 months old by the time it is published — making it impossible to anticipate market movements before they occur.",
    cost: "Real estate businesses that acquire properties at market peaks or miss development windows lose 10–30% of potential returns. On a $10M portfolio, this represents $1–3M in preventable value destruction.",
    solution: "PresciaIQ's predictive real estate intelligence analyses leading market indicators — search activity, auction clearance trends, credit availability, migration patterns, and infrastructure investment — to predict market movements 3–6 months before they appear in transaction data.",
    outcome: "Real estate businesses using PresciaIQ improve acquisition timing accuracy by an average of 58% within the first 12 months.",
    faqs: [
      { q: "Can AI predict property market movements?", a: "PresciaIQ analyses the leading indicators of property market movements — including search activity trends, auction clearance rates, credit availability, migration patterns, and infrastructure investment — to predict market direction 3–6 months before it appears in transaction data." },
      { q: "What data does PresciaIQ use to predict real estate markets?", a: "PresciaIQ integrates multiple data sources including property search platform activity, auction results, credit approval trends, migration statistics, infrastructure investment announcements, and rental vacancy rates — building a comprehensive picture of market momentum before it appears in published transaction data." },
      { q: "How does predictive AI help real estate developers?", a: "PresciaIQ helps real estate developers identify emerging demand in specific locations before competitors, predict construction cost movements, optimise project timing, and assess market absorption risk — enabling better acquisition decisions and development timing." }
    ]
  },
  // Professional Services
  {
    slug: "professional-services-revenue-forecasting",
    industry: "Professional Services",
    industrySlug: "professional-services",
    problemTitle: "How to Improve Revenue Forecasting for Professional Services Firms",
    problemShort: "Professional services revenue forecasting",
    symptom: "Revenue forecasts are consistently 15–25% off actual results — causing staffing mismatches, cash flow surprises, and missed growth opportunities.",
    rootCause: "Professional services revenue forecasting relies on pipeline estimates that don't account for deal velocity patterns, client behaviour signals, or market conditions that predict conversion probability.",
    cost: "Revenue forecast errors cost professional services firms through overstaffing in slow periods, understaffing in busy periods, and the opportunity cost of missed growth investments. A 20% revenue shortfall on a $5M firm costs $1M in unexpected margin compression.",
    solution: "PresciaIQ's predictive revenue intelligence analyses pipeline velocity, client engagement patterns, market conditions, and historical conversion data to generate 12-week revenue forecasts with 93% accuracy.",
    outcome: "Professional services firms using PresciaIQ reduce revenue forecast variance by an average of 71% within the first 12 months.",
    faqs: [
      { q: "How does AI improve revenue forecasting for professional services firms?", a: "PresciaIQ analyses pipeline velocity, client engagement patterns, proposal conversion history, and market conditions to generate highly accurate 12-week revenue forecasts — enabling firms to make staffing, investment, and cash flow decisions with confidence." },
      { q: "What causes revenue forecasting errors in professional services?", a: "Professional services revenue forecasting errors are primarily caused by pipeline optimism bias — salespeople consistently overestimate conversion probability and deal velocity. PresciaIQ's predictive models apply machine learning to historical conversion data to generate objective probability-weighted forecasts." },
      { q: "Can predictive AI help professional services firms grow?", a: "Yes. Beyond improving forecast accuracy, PresciaIQ identifies the leading indicators of client churn risk, cross-sell opportunity, and market demand — enabling firms to act on growth opportunities before competitors and retain clients before they disengage." }
    ]
  }
];
