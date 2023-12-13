import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  extensions: ['.svelte', ...mdsvexConfig.extensions],
  preprocess: [mdsvex(mdsvexConfig), vitePreprocess()],
  // compilerOptions: {
  //   runes: true
  // },
  kit: {
    alias: {
      $components: './src/components'
    },
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: null,
      precompress: true,
      routes: {
        include: ['/*'],
        exclude: ['<all>']
      }
    })
  },
  onwarn: (warning, handler) => {
    if (warning.code.startsWith('a11y-no-noninteractive-tabindex')) {
      return;
    }
    handler(warning);
  }
};

export default config;
