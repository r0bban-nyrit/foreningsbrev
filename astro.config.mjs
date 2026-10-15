// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages: https://r0bban-nyrit.github.io/foreningsbrev
// Vid egen domän (foreningsbrev.se): sätt site till 'https://foreningsbrev.se' och ta bort base.
export default defineConfig({
  site: 'https://r0bban-nyrit.github.io',
  base: '/foreningsbrev',
  trailingSlash: 'ignore',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
