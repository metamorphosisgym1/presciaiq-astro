import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
export default defineConfig({
  site: 'https://www.presciaiq.com.au',
  trailingSlash: 'always',
  integrations: [
    react(),
    tailwind(),
    sitemap({
      filter: (page) => {
        const noindexAeoLocations = [
          'new-zealand','united-kingdom','united-states','canada','singapore','south-africa','global'
        ];
        // PRIORITY 1: Core conversion pages — always include
        const corePaths = ['/', '/about/', '/pricing/', '/contact/', '/start/', '/reaction-tax-calculator/', '/testimonials/', '/partners/'];
        if (corePaths.some(p => page.endsWith(p))) return true;
        // PRIORITY 2: Product pages
        if (page.includes('/products/')) return true;
        // PRIORITY 3: Case studies
        if (page.includes('/case-studies/')) return true;
        // PRIORITY 4: City landing pages
        if (page.includes('/locations/')) return true;
        // PRIORITY 5: AEO answers hub (all 90+ entries)
        if (page.includes('/answers/')) return true;
        // PRIORITY 6: Problems cluster
        if (page.includes('/problems/')) return true;
        // PRIORITY 7: Compare pages (top-level only, no deep /compare/x/y/z)
        if (page.match(/\/compare\/[^\/]+\/?$/) && !page.match(/\/compare\/[^\/]+\/[^\/]+/)) return true;
        // PRIORITY 8: Blog/insights
        if (page.includes('/insights/')) return true;
        // PRIORITY 9: Results pages
        if (page.includes('/results/')) return true;
        // PRIORITY 10: Top aeo-seo industry × location pages (high-intent)
        const aeoMatch = page.match(/\/aeo-seo\/[^\/]+\/([^\/]+)\//);
        if (aeoMatch) return !noindexAeoLocations.includes(aeoMatch[1]);
        // PRIORITY 11: Top /for/ persona pages (24 job titles × 20 industries × 6 locations)
        const priorityJobTitles = [
          'cfo','ceo','operations-manager','marketing-director','head-of-sales',
          'supply-chain-manager','it-director','risk-manager','cto','coo',
          'head-of-data','general-manager','digital-transformation-lead',
          'procurement-manager','plant-manager','logistics-director',
          'business-analyst','head-of-marketing','head-of-digital',
          'startup-founder','it-manager','small-business-owner','sole-trader','entrepreneur'
        ];
        const priorityIndustries = [
          'construction','manufacturing','retail','logistics','healthcare',
          'mining','agriculture','financial-services','real-estate','hospitality',
          'professional-services','transport','energy','education','insurance',
          'wholesale-distribution','food-beverage','automotive','media-advertising','government'
        ];
        const priorityLocations = ['sydney','melbourne','brisbane','perth','adelaide','australia'];
        const forMatch = page.match(/\/for\/([^\/]+)\/([^\/]+)\/([^\/]+)\//);
        if (forMatch) {
          const [, jt, ind, loc] = forMatch;
          return priorityJobTitles.includes(jt) && priorityIndustries.includes(ind) && priorityLocations.includes(loc);
        }
        // Exclude all other large programmatic clusters to focus crawl budget
        return false;
      },
      customPages: [
        'https://www.presciaiq.com.au/',
        'https://www.presciaiq.com.au/about/',
        'https://www.presciaiq.com.au/pricing/',
        'https://www.presciaiq.com.au/contact/',
        'https://www.presciaiq.com.au/start/',
        'https://www.presciaiq.com.au/reaction-tax-calculator/',
        'https://www.presciaiq.com.au/testimonials/',
        'https://www.presciaiq.com.au/partners/',
        'https://www.presciaiq.com.au/products/buildpredictiq/',
        'https://www.presciaiq.com.au/products/adsiq/',
        'https://www.presciaiq.com.au/products/ai-automations/',
        'https://www.presciaiq.com.au/case-studies/',
        'https://www.presciaiq.com.au/locations/sydney/',
        'https://www.presciaiq.com.au/locations/melbourne/',
        'https://www.presciaiq.com.au/locations/brisbane/',
        'https://www.presciaiq.com.au/locations/perth/',
      ],
    }),
  ],
});
