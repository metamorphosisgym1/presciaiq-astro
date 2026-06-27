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
        // Week 1 staged rollout: compare pages now indexed (58 hand-crafted competitor pages)
        // Large-volume clusters (/for/, /solutions/, /use-case/, /aeo-seo/) deferred to weeks 2-4
        const shallow = ['/for/', '/solutions/', '/use-case/', '/aeo-seo/'];
        // Always include: hand-crafted AEO pages, comparison pages, case studies, results, partners
        if (page.includes('/answers/')) return true;
        if (page.includes('/problems/')) return true;
        if (page.includes('/compare/')) return true;
        if (page.includes('/partners')) return true;
        if (page.includes('/results/')) return true;
        if (page.includes('/insights/case-studies/')) return true;
        // Exclude remaining large programmatic clusters (staged rollout weeks 2-4)
        return !shallow.some(path => page.includes(path));
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
