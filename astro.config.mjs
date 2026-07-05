import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
export default defineConfig({
  site: 'https://www.presciaiq.com.au',
  integrations: [
    react(),
    tailwind(),
    sitemap({
      filter: (page) => {
        // Week 3 staged rollout:
        // - All /aeo-seo/[industry]/[location]/ pages indexed (180 high-intent service pages)
        // - ALL /for/ persona pages indexed: 24 job titles × 20 industries × 6 locations = 2,880 pages
        // - /solutions/ and /use-case/ deferred to weeks 4-5
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
        // Always include: hand-crafted AEO pages, comparison pages, case studies, results, partners
        if (page.includes('/answers/')) return true;
        if (page.includes('/problems/')) return true;
        // /compare/ hub pages only (e.g. /compare/accenture-australia or /compare/accenture-australia/)
        // Deep /compare/[comp]/[ind]/[loc]/ pages have noindex=true so must NOT be in sitemap
        // Note: vercel.json has trailingSlash:false so URLs may arrive without trailing slash
        if (page.match(/\/compare\/[^\/]+(\/?$)/) && !page.match(/\/compare\/[^\/]+\/[^\/]+/)) return true;
        if (page.includes('/partners')) return true;
        if (page.includes('/results/')) return true;
        if (page.includes('/insights/case-studies/')) return true;
        // Week 2: Include all /aeo-seo/[industry]/[location]/ pages
        if (page.match(/\/aeo-seo\/[^\/]+\/[^\/]+\//)) return true;
        // Week 3: Include ALL /for/ persona pages (24 job titles × 20 industries × 6 locations = 2,880 pages)
        const forMatch = page.match(/\/for\/([^\/]+)\/([^\/]+)\/([^\/]+)\//);
        if (forMatch) {
          const [, jt, ind, loc] = forMatch;
          return priorityJobTitles.includes(jt) && priorityIndustries.includes(ind) && priorityLocations.includes(loc);
        }
        // Exclude remaining large programmatic clusters (/solutions/, /use-case/) — weeks 4-5
        if (page.includes('/solutions/') || page.includes('/use-case/')) return false;
        // Explicitly exclude deep /compare/[comp]/[ind]/[loc]/ pages (noindex=true, waste crawl budget)
        if (page.match(/\/compare\/[^\/]+\/[^\/]+/)) return false;
        return true;
      },
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      serialize(item) {
        if (item.url === 'https://www.presciaiq.com.au/') {
          return { ...item, priority: 1.0, changefreq: 'daily' };
        }
        if (item.url.includes('/insights/')) {
          return { ...item, priority: 0.8, changefreq: 'monthly' };
        }
        if (item.url.includes('/services/')) {
          return { ...item, priority: 0.9, changefreq: 'monthly' };
        }
        if (item.url.includes('/compare/')) {
          return { ...item, priority: 0.8, changefreq: 'monthly' };
        }
        if (item.url.includes('/problems/')) {
          return { ...item, priority: 0.8, changefreq: 'monthly' };
        }
        if (item.url.includes('/answers/')) {
          return { ...item, priority: 0.8, changefreq: 'weekly' }; // AEO answer pages
        }
        // /for/[jobtitle]/[industry]/[location] — buyer persona pages (high commercial intent)
        if (item.url.match(/\/for\/[^\/]+\/[^\/]+\/[^\/]+\/$/) ) {
          return { ...item, priority: 0.85, changefreq: 'monthly' };
        }
        // /use-case/[usecase]/[industry]/[location] — use case pages
        if (item.url.match(/\/use-case\/[^\/]+\/[^\/]+\/[^\/]+\/$/) ) {
          return { ...item, priority: 0.8, changefreq: 'monthly' };
        }
        // /solutions/[service]/[industry]/[location] — triple pillar pages
        if (item.url.match(/\/solutions\/[^\/]+\/[^\/]+\/[^\/]+\/$/) ) {
          return { ...item, priority: 0.8, changefreq: 'monthly' };
        }
        // /solutions/ deep cluster pages (4-segment paths with problem or tech)
        if (item.url.includes('/solutions/')) {
          return { ...item, priority: 0.65, changefreq: 'monthly' };
        }
        // /aeo-seo/[industry]/[location] — AEO/SEO service landing pages
        if (item.url.match(/\/aeo-seo\/[^\/]+\/[^\/]+\/$/) ) {
          return { ...item, priority: 0.85, changefreq: 'monthly' };
        }
        // /aeo-seo/ single-dimension pages
        if (item.url.includes('/aeo-seo/')) {
          return { ...item, priority: 0.75, changefreq: 'monthly' };
        }
        return item;
      },
    }),
  ],
});
# Build trigger: Sun Jul  5 01:07:22 UTC 2026
