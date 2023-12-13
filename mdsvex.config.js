import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import remarkGfm from 'remark-gfm';
import remarkGithub from 'remark-github';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { codeToHtml } from 'shikiji';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @param {string} code
 * @param {string | undefined} lang
 */
async function highlighter(code, lang = '') {
  /**
   * escape curlies, backtick, \t, \r, \n to avoid breaking output of {@html `here`} in .svelte
   * @param {string} str the string to escape
   * @returns the escaped string
   */
  const escape_svelty = (str) =>
    str
      .replace(/[{}`]/g, (c) => ({ '`': '&#96;', '{': '&#123;', '}': '&#125;' })[c])
      .replace(/\\([trn])/g, '&#92;$1');

  const html = await codeToHtml(code, {
    lang,

    theme: 'nord'
  });

  return escape_svelty(html);
}

const config = defineConfig({
  extensions: ['.svelte.md', '.md', '.svx'],
  layout: {
    // blog: './path/to/blog/layout.svelte',
    // article: './path/to/article/layout.svelte',
    // _: './path/to/fallback/layout.svelte'
    _: path.resolve(__dirname, './src/components/mdsvex.svelte')
  },
  highlight: {
    highlighter
  },
  rehypePlugins: [
    rehypeSlug,
    [
      rehypeAutolinkHeadings,
      {
        behavior: 'wrap',
        properties: {
          className: ['anchor']
        }
      }
    ]
  ],
  remarkPlugins: [
    remarkGfm,
    [
      remarkGithub,
      {
        repository: 'willin/svelte-turbo'
      }
    ]
  ],
  smartypants: {
    dashes: 'oldschool'
  }
});

export default config;
