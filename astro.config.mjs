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
        // Week 2 staged rollout:
        // - All /aeo-seo/[industry]/[location]/ pages now indexed (180 high-intent service pages)
        // - Top 150 /for/ persona pages indexed (5 job titles × 5 industries × 6 locations)
        // - /solutions/ and /use-case/ deferred to weeks 3-4
        const priorityJobTitles = ['ceo','marketing-director','cfo','operations-manager','cto'];
        const priorityIndustries = ['construction','financial-services','logistics','professional-services','manufacturing'];
        const priorityLocations = ['sydney','melbourne','brisbane','perth','adelaide','australia'];
        // Always include: hand-crafted AEO pages, comparison pages, case studies, results, partners
        if (page.includes('/answers/')) return true;
        if (page.includes('/problems/')) return true;
        if (page.includes('/compare/')) return true;
        if (page.includes('/partners')) return true;
        if (page.includes('/results/')) return true;
        if (page.includes('/insights/case-studies/')) return true;
        // Week 2: Include all /aeo-seo/[industry]/[location]/ pages
        if (page.match(/\/aeo-seo\/[^\/]+\/[^\/]+\//)) return true;
        // Week 2: Include top 150 /for/ persona pages
        const forMatch = page.match(/\/for\/([^\/]+)\/([^\/]+)\/([^\/]+)\//);
        if (forMatch) {
          const [, jt, ind, loc] = forMatch;
          return priorityJobTitles.includes(jt) && priorityIndustries.includes(ind) && priorityLocations.includes(loc);
        }
        // Exclude remaining large programmatic clusters (/solutions/, /use-case/) — weeks 3-4
        if (page.includes('/solutions/') || page.includes('/use-case/')) return false;
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
