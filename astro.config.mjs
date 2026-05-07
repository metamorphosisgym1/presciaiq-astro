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
        return item;
      },
    }),
  ],
});
