import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import node from '@astrojs/node';

export default defineConfig({
  output: 'server',
  site: 'https://searchjobs.com',
  integrations: [react()],
  adapter: node({ mode: 'standalone' }),
  experimental: {
    session: true, 
  },
});


