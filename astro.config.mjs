import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import englishUI from './scripts/localize-en.mjs';
import imageCaptions from './scripts/image-captions.mjs';

export default defineConfig({
  site: 'https://poketopa.github.io',
  integrations: [
    englishUI(),
    sitemap({
      namespaces: {
        news: false,
        xhtml: false,
        image: false,
        video: false,
      },
    }),
  ],
  markdown: {
    processor: satteri({ hastPlugins: [imageCaptions()] }),
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
});
