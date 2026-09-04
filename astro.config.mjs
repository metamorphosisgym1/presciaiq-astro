import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

const canonicalStaticPaths = new Set([
  '/',
  '/about/',
  '/contact/',
  '/development/',
  '/partners/',
  '/pricing/',
  '/reaction-tax-calculator/',
  '/start/',
  '/testimonials/',
]);

const curatedContentPrefixes = [
  '/answers/',
  '/case-studies/',
  '/industries/',
  '/insights/',
  '/locations/',
  '/problems/',
  '/products/',
  '/results/',
  '/services/',
];

function isCuratedSitemapPage(page) {
  const pathname = new URL(page).pathname;
  return canonicalStaticPaths.has(pathname)
    || curatedContentPrefixes.some((prefix) => pathname.startsWith(prefix));
}

export default defineConfig({
  site: 'https://www.presciaiq.com.au',
  trailingSlash: 'always',
  integrations: [
    react(),
    tailwind(),
    sitemap({
      // Only advertise crawl-worthy commercial, evidence, and answer content.
      // This excludes high-volume /compare/, /solutions/, /use-case/, /aeo-seo/, and /for/ matrices.
      filter: isCuratedSitemapPage,
      // Apply the same rule at serialisation as a safeguard for all route sources.
      serialize: (item) => isCuratedSitemapPage(item.url) ? item : undefined,
    }),
  ],
});
