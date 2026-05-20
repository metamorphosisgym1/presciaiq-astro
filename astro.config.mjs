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
