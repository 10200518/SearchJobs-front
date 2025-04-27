import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

export default {
  site: 'https://searchjobs.com',
  integrations: [react()],
};


