import node from '@astrojs/node';
import react from '@astrojs/react';
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'server', 
  site: 'https://searchjobs.com/',
  integrations: [react()],
  adapter: node({ mode: 'standalone' }), 
  experimental: {
    session: true,
  },
});

