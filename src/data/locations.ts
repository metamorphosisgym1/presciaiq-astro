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
  {
    slug: "australia",
    name: "Australia",
    preposition: "across",
    region: "Australia",
    country: "Australia",
    countryCode: "AU",
    marketContext: "Australian businesses face unique challenges including geographic isolation, small domestic market size, and high labour costs — making predictive AI a critical competitive advantage."
  },
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
