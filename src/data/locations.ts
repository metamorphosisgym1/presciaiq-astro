export interface Location {
  slug: string;
  name: string;
  preposition: string; // "in" or "across"
  region: string;
  country: string;
  countryCode: string;
  marketContext: string;
}

export const locations: Location[] = [
  // National / country level
  {
    slug: "australia",
    name: "Australia",
    preposition: "across",
    region: "Australia",
    country: "Australia",
    countryCode: "AU",
    marketContext: "Australian businesses face unique challenges including geographic isolation, small domestic market size, and high labour costs — making predictive AI a critical competitive advantage."
  },
  // Major capital cities
  {
    slug: "sydney",
    name: "Sydney",
    preposition: "in",
    region: "New South Wales",
    country: "Australia",
    countryCode: "AU",
    marketContext: "Sydney is Australia's largest business hub, home to the ASX and a concentration of financial services, tech, and professional services firms competing for talent and margin."
  },
  {
    slug: "melbourne",
    name: "Melbourne",
    preposition: "in",
    region: "Victoria",
    country: "Australia",
    countryCode: "AU",
    marketContext: "Melbourne's diverse economy spans manufacturing, logistics, retail, and professional services — sectors where predictive intelligence delivers the fastest and most measurable ROI."
  },
  {
    slug: "brisbane",
    name: "Brisbane",
    preposition: "in",
    region: "Queensland",
    country: "Australia",
    countryCode: "AU",
    marketContext: "Brisbane's rapidly growing economy, driven by infrastructure investment and the 2032 Olympics pipeline, is creating unprecedented demand for operational intelligence tools."
  },
  {
    slug: "perth",
    name: "Perth",
    preposition: "in",
    region: "Western Australia",
    country: "Australia",
    countryCode: "AU",
    marketContext: "Perth's resource-heavy economy — dominated by mining, energy, and construction — generates vast operational data that predictive AI can turn into competitive advantage."
  },
  {
    slug: "adelaide",
    name: "Adelaide",
    preposition: "in",
    region: "South Australia",
    country: "Australia",
    countryCode: "AU",
    marketContext: "Adelaide's growing defence, manufacturing, and food & beverage sectors are increasingly adopting AI-driven operational intelligence to compete with larger eastern seaboard rivals."
  },
  {
    slug: "canberra",
    name: "Canberra",
    preposition: "in",
    region: "Australian Capital Territory",
    country: "Australia",
    countryCode: "AU",
    marketContext: "Canberra's government and professional services concentration creates strong demand for data-driven decision intelligence tools that can navigate complex compliance and budget environments."
  },
  {
    slug: "gold-coast",
    name: "Gold Coast",
    preposition: "on the",
    region: "Queensland",
    country: "Australia",
    countryCode: "AU",
    marketContext: "The Gold Coast's tourism, construction, and retail economy is highly seasonal — making predictive demand forecasting a critical tool for managing cash flow and staffing costs."
  },
  {
    slug: "darwin",
    name: "Darwin",
    preposition: "in",
    region: "Northern Territory",
    country: "Australia",
    countryCode: "AU",
    marketContext: "Darwin's resource extraction, defence, and tourism economy operates under extreme seasonal conditions — making predictive demand forecasting and operational intelligence critical tools."
  },
  {
    slug: "hobart",
    name: "Hobart",
    preposition: "in",
    region: "Tasmania",
    country: "Australia",
    countryCode: "AU",
    marketContext: "Hobart's growing tourism, food & beverage, and technology sectors are adopting predictive intelligence tools to compete with mainland rivals and manage seasonal demand volatility."
  },
  // NSW regional cities
  {
    slug: "newcastle",
    name: "Newcastle",
    preposition: "in",
    region: "New South Wales",
    country: "Australia",
    countryCode: "AU",
    marketContext: "Newcastle's industrial economy — anchored by port operations, manufacturing, and healthcare — is transitioning toward knowledge-intensive sectors where predictive AI accelerates competitive positioning."
  },
  {
    slug: "wollongong",
    name: "Wollongong",
    preposition: "in",
    region: "New South Wales",
    country: "Australia",
    countryCode: "AU",
    marketContext: "Wollongong's manufacturing and steel heritage is evolving into a diversified economy where AI-driven operational intelligence helps businesses compete with larger metropolitan rivals."
  },
  {
    slug: "central-coast",
    name: "the Central Coast",
    preposition: "on",
    region: "New South Wales",
    country: "Australia",
    countryCode: "AU",
    marketContext: "The Central Coast's growing business community — spanning retail, construction, and healthcare — benefits from predictive intelligence tools that level the playing field against Sydney-based competitors."
  },
  {
    slug: "parramatta",
    name: "Parramatta",
    preposition: "in",
    region: "New South Wales",
    country: "Australia",
    countryCode: "AU",
    marketContext: "Parramatta is Western Sydney's commercial hub, with a rapidly growing professional services and technology sector that is increasingly adopting AI-driven intelligence tools."
  },
  {
    slug: "port-macquarie",
    name: "Port Macquarie",
    preposition: "in",
    region: "New South Wales",
    country: "Australia",
    countryCode: "AU",
    marketContext: "Port Macquarie's growing healthcare, tourism, and retail economy benefits from predictive demand forecasting tools that manage the region's rapid population growth."
  },
  {
    slug: "tamworth",
    name: "Tamworth",
    preposition: "in",
    region: "New South Wales",
    country: "Australia",
    countryCode: "AU",
    marketContext: "Tamworth's agricultural services, healthcare, and retail economy benefits from predictive intelligence tools that manage the seasonal demand patterns of regional New South Wales."
  },
  {
    slug: "albury-wodonga",
    name: "Albury-Wodonga",
    preposition: "in",
    region: "New South Wales",
    country: "Australia",
    countryCode: "AU",
    marketContext: "Albury-Wodonga's cross-border logistics, manufacturing, and healthcare economy benefits from predictive intelligence tools that manage the complexity of operating across two state jurisdictions."
  },
  {
    slug: "orange",
    name: "Orange",
    preposition: "in",
    region: "New South Wales",
    country: "Australia",
    countryCode: "AU",
    marketContext: "Orange's agriculture, mining services, and healthcare economy benefits from predictive demand forecasting tools that manage the seasonal patterns of regional New South Wales."
  },
  {
    slug: "dubbo",
    name: "Dubbo",
    preposition: "in",
    region: "New South Wales",
    country: "Australia",
    countryCode: "AU",
    marketContext: "Dubbo's agricultural services, logistics, and healthcare hub status makes it a natural adopter of predictive demand forecasting and supply chain intelligence tools."
  },
  {
    slug: "wagga-wagga",
    name: "Wagga Wagga",
    preposition: "in",
    region: "New South Wales",
    country: "Australia",
    countryCode: "AU",
    marketContext: "Wagga Wagga's agricultural, defence, and healthcare economy benefits from predictive intelligence tools that manage the complex demand patterns of inland New South Wales."
  },
  // Victoria regional cities
  {
    slug: "geelong",
    name: "Geelong",
    preposition: "in",
    region: "Victoria",
    country: "Australia",
    countryCode: "AU",
    marketContext: "Geelong's post-industrial economy is diversifying into health, education, and advanced manufacturing — sectors where predictive AI delivers measurable operational improvements."
  },
  {
    slug: "ballarat",
    name: "Ballarat",
    preposition: "in",
    region: "Victoria",
    country: "Australia",
    countryCode: "AU",
    marketContext: "Ballarat's regional economy spans agriculture, manufacturing, and healthcare — sectors where predictive demand forecasting and operational intelligence deliver significant cost savings."
  },
  {
    slug: "bendigo",
    name: "Bendigo",
    preposition: "in",
    region: "Victoria",
    country: "Australia",
    countryCode: "AU",
    marketContext: "Bendigo's growing financial services and healthcare sectors are adopting AI-driven intelligence tools to improve operational efficiency and customer retention."
  },
  {
    slug: "shepparton",
    name: "Shepparton",
    preposition: "in",
    region: "Victoria",
    country: "Australia",
    countryCode: "AU",
    marketContext: "Shepparton's food processing, agriculture, and logistics economy benefits from predictive demand forecasting tools that manage the seasonal patterns of Victoria's food bowl region."
  },
  {
    slug: "mildura",
    name: "Mildura",
    preposition: "in",
    region: "Victoria",
    country: "Australia",
    countryCode: "AU",
    marketContext: "Mildura's horticulture, logistics, and retail economy benefits from predictive demand forecasting tools that manage the seasonal patterns of Australia's largest inland river system."
  },
  {
    slug: "warrnambool",
    name: "Warrnambool",
    preposition: "in",
    region: "Victoria",
    country: "Australia",
    countryCode: "AU",
    marketContext: "Warrnambool's dairy, agriculture, and tourism economy benefits from predictive intelligence tools that manage the seasonal demand patterns of south-west Victoria."
  },
  // Queensland regional cities
  {
    slug: "sunshine-coast",
    name: "the Sunshine Coast",
    preposition: "on",
    region: "Queensland",
    country: "Australia",
    countryCode: "AU",
    marketContext: "The Sunshine Coast's rapidly growing economy — driven by tourism, construction, and healthcare — creates strong demand for predictive intelligence tools that manage seasonal volatility."
  },
  {
    slug: "cairns",
    name: "Cairns",
    preposition: "in",
    region: "Queensland",
    country: "Australia",
    countryCode: "AU",
    marketContext: "Cairns' tourism-dependent economy requires sophisticated demand forecasting to manage the extreme seasonality that drives revenue and staffing decisions."
  },
  {
    slug: "townsville",
    name: "Townsville",
    preposition: "in",
    region: "Queensland",
    country: "Australia",
    countryCode: "AU",
    marketContext: "Townsville's mining services, defence, and logistics economy generates complex operational data that predictive AI can transform into competitive advantage."
  },
  {
    slug: "toowoomba",
    name: "Toowoomba",
    preposition: "in",
    region: "Queensland",
    country: "Australia",
    countryCode: "AU",
    marketContext: "Toowoomba's agricultural and logistics hub status makes it a natural adopter of predictive demand forecasting and supply chain intelligence tools."
  },
  {
    slug: "mackay",
    name: "Mackay",
    preposition: "in",
    region: "Queensland",
    country: "Australia",
    countryCode: "AU",
    marketContext: "Mackay's mining and sugar industry economy generates vast operational data that predictive AI can convert into maintenance cost savings and production optimisation."
  },
  {
    slug: "rockhampton",
    name: "Rockhampton",
    preposition: "in",
    region: "Queensland",
    country: "Australia",
    countryCode: "AU",
    marketContext: "Rockhampton's beef, mining, and logistics economy benefits from predictive intelligence tools that manage commodity price volatility and supply chain complexity."
  },
  {
    slug: "hervey-bay",
    name: "Hervey Bay",
    preposition: "in",
    region: "Queensland",
    country: "Australia",
    countryCode: "AU",
    marketContext: "Hervey Bay's tourism, healthcare, and retail economy benefits from predictive demand forecasting tools that manage the seasonal patterns of Queensland's whale-watching capital."
  },
  {
    slug: "bundaberg",
    name: "Bundaberg",
    preposition: "in",
    region: "Queensland",
    country: "Australia",
    countryCode: "AU",
    marketContext: "Bundaberg's agriculture, manufacturing, and healthcare economy benefits from predictive intelligence tools that manage the seasonal demand patterns of central Queensland."
  },
  {
    slug: "gladstone",
    name: "Gladstone",
    preposition: "in",
    region: "Queensland",
    country: "Australia",
    countryCode: "AU",
    marketContext: "Gladstone's industrial port, LNG, and aluminium economy generates vast operational data that predictive AI can convert into maintenance cost savings and production optimisation."
  },
  // WA regional cities
  {
    slug: "bunbury",
    name: "Bunbury",
    preposition: "in",
    region: "Western Australia",
    country: "Australia",
    countryCode: "AU",
    marketContext: "Bunbury's port, mining services, and agriculture economy is increasingly adopting AI-driven operational intelligence to compete with Perth-based rivals."
  },
  {
    slug: "mandurah",
    name: "Mandurah",
    preposition: "in",
    region: "Western Australia",
    country: "Australia",
    countryCode: "AU",
    marketContext: "Mandurah's growing construction, retail, and healthcare sectors benefit from predictive demand forecasting tools that manage rapid population growth."
  },
  {
    slug: "geraldton",
    name: "Geraldton",
    preposition: "in",
    region: "Western Australia",
    country: "Australia",
    countryCode: "AU",
    marketContext: "Geraldton's mining, fishing, and agriculture economy generates operational data that predictive AI can transform into supply chain and maintenance cost savings."
  },
  {
    slug: "port-hedland",
    name: "Port Hedland",
    preposition: "in",
    region: "Western Australia",
    country: "Australia",
    countryCode: "AU",
    marketContext: "Port Hedland's iron ore port economy generates enormous operational data volumes that predictive AI can transform into logistics efficiency and maintenance cost savings."
  },
  {
    slug: "karratha",
    name: "Karratha",
    preposition: "in",
    region: "Western Australia",
    country: "Australia",
    countryCode: "AU",
    marketContext: "Karratha's LNG and mining services economy generates complex operational data that predictive AI can convert into equipment reliability improvements and cost savings."
  },
  {
    slug: "kalgoorlie",
    name: "Kalgoorlie",
    preposition: "in",
    region: "Western Australia",
    country: "Australia",
    countryCode: "AU",
    marketContext: "Kalgoorlie's gold mining economy generates vast equipment and production data that predictive AI can transform into maintenance cost savings and production optimisation."
  },
  {
    slug: "albany",
    name: "Albany",
    preposition: "in",
    region: "Western Australia",
    country: "Australia",
    countryCode: "AU",
    marketContext: "Albany's agriculture, tourism, and port economy benefits from predictive demand forecasting tools that manage the seasonal patterns of Western Australia's Great Southern region."
  },
  // SA regional cities
  {
    slug: "mount-gambier",
    name: "Mount Gambier",
    preposition: "in",
    region: "South Australia",
    country: "Australia",
    countryCode: "AU",
    marketContext: "Mount Gambier's timber, agriculture, and tourism economy generates operational data that predictive AI can convert into supply chain efficiency and demand forecasting accuracy."
  },
  {
    slug: "whyalla",
    name: "Whyalla",
    preposition: "in",
    region: "South Australia",
    country: "Australia",
    countryCode: "AU",
    marketContext: "Whyalla's steel and manufacturing economy is undergoing transformation — making predictive operational intelligence a critical tool for managing production efficiency and cost control."
  },
  // NT regional
  {
    slug: "alice-springs",
    name: "Alice Springs",
    preposition: "in",
    region: "Northern Territory",
    country: "Australia",
    countryCode: "AU",
    marketContext: "Alice Springs' remote economy — spanning tourism, government services, and mining — requires AI-driven operational intelligence to manage the unique challenges of geographic isolation."
  },
  // Tasmania regional
  {
    slug: "launceston",
    name: "Launceston",
    preposition: "in",
    region: "Tasmania",
    country: "Australia",
    countryCode: "AU",
    marketContext: "Launceston's manufacturing, agriculture, and tourism economy benefits from predictive demand forecasting tools that manage the seasonal patterns unique to Tasmania's market."
  },
  // State-level pages
  {
    slug: "new-south-wales",
    name: "New South Wales",
    preposition: "across",
    region: "New South Wales",
    country: "Australia",
    countryCode: "AU",
    marketContext: "New South Wales is Australia's largest state economy, with a diverse mix of financial services, manufacturing, agriculture, and technology businesses that benefit from predictive intelligence."
  },
  {
    slug: "victoria",
    name: "Victoria",
    preposition: "across",
    region: "Victoria",
    country: "Australia",
    countryCode: "AU",
    marketContext: "Victoria's diverse economy spans manufacturing, logistics, retail, and professional services — sectors where predictive intelligence delivers measurable operational improvements."
  },
  {
    slug: "queensland",
    name: "Queensland",
    preposition: "across",
    region: "Queensland",
    country: "Australia",
    countryCode: "AU",
    marketContext: "Queensland's resource, tourism, and agriculture economy generates complex operational data that predictive AI can transform into competitive advantage across the state."
  },
  {
    slug: "western-australia",
    name: "Western Australia",
    preposition: "across",
    region: "Western Australia",
    country: "Australia",
    countryCode: "AU",
    marketContext: "Western Australia's resource-heavy economy generates vast operational data from mining, energy, and logistics operations that predictive AI can convert into measurable cost savings."
  },
  {
    slug: "south-australia",
    name: "South Australia",
    preposition: "across",
    region: "South Australia",
    country: "Australia",
    countryCode: "AU",
    marketContext: "South Australia's defence, manufacturing, and food & beverage sectors are increasingly adopting AI-driven operational intelligence to compete with larger eastern seaboard rivals."
  },
  // International
  {
    slug: "new-zealand",
    name: "New Zealand",
    preposition: "across",
    region: "New Zealand",
    country: "New Zealand",
    countryCode: "NZ",
    marketContext: "New Zealand businesses share many of Australia's market challenges — geographic isolation, small domestic market, and high labour costs — and are increasingly adopting AI-driven intelligence tools."
  },
  {
    slug: "united-kingdom",
    name: "the United Kingdom",
    preposition: "across",
    region: "United Kingdom",
    country: "United Kingdom",
    countryCode: "GB",
    marketContext: "UK businesses face post-Brexit supply chain complexity, rising energy costs, and intense competition — creating strong demand for predictive intelligence tools that surface risk before it materialises."
  },
  {
    slug: "united-states",
    name: "the United States",
    preposition: "across",
    region: "United States",
    country: "United States",
    countryCode: "US",
    marketContext: "US businesses operate in the world's most competitive market, where predictive AI has become a baseline requirement for mid-market operators competing against enterprise-grade rivals."
  },
  {
    slug: "canada",
    name: "Canada",
    preposition: "across",
    region: "Canada",
    country: "Canada",
    countryCode: "CA",
    marketContext: "Canadian businesses — particularly in resource extraction, manufacturing, and financial services — are adopting predictive AI to manage commodity volatility and operational complexity."
  },
  {
    slug: "singapore",
    name: "Singapore",
    preposition: "in",
    region: "Singapore",
    country: "Singapore",
    countryCode: "SG",
    marketContext: "Singapore's position as Asia-Pacific's financial and logistics hub creates intense demand for operational intelligence tools that can process complex, multi-currency, multi-jurisdiction data."
  },
  {
    slug: "south-africa",
    name: "South Africa",
    preposition: "across",
    region: "South Africa",
    country: "South Africa",
    countryCode: "ZA",
    marketContext: "South African businesses in mining, retail, and financial services are increasingly adopting AI-driven intelligence tools to manage operational complexity and infrastructure risk."
  },
  {
    slug: "global",
    name: "Global Markets",
    preposition: "across",
    region: "Global",
    country: "Global",
    countryCode: "GLOBAL",
    marketContext: "Global businesses operating across multiple markets need predictive intelligence that can synthesise data from diverse regulatory environments, currencies, and supply chains into unified operational foresight."
  }
];
