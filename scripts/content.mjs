import path from 'path';
import fsp from 'fs/promises';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { bundleMDX } from 'mdx-bundler';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { getMDXComponent as getComponent } from 'mdx-bundler/client/index.js';
// Plugins
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import remarkGithub from 'remark-github';
import rehypePrismPlus from 'rehype-prism-plus';
import remarkMermaid from './mermaid.mjs';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(__filename);

const CONTENT = path.resolve(__dirname, '../content');
const OUTPUT = path.resolve(__dirname, '../public/_content');

const mdxComponents = {
  // Custom Components
  a: (props) =>
    createElement('a', {
      target: '_blank',
      ...props
    }),
  img: (props) =>
    createElement('img', {
      className: 'rounded-lg shadow max-h-[80vh] max-w-[90%]',
      ...props
    })
};

function getMdxComponent(code) {
  const Component = getComponent(code);
  function WMdxComponent({ components, ...rest }) {
    return Component({
      components: { ...mdxComponents, ...components },
      ...rest
    });
  }
  return WMdxComponent;
}

const listFolders = (dir) =>
  fsp.readdir(dir, { withFileTypes: true }).then((files) => files.filter((f) => f.isDirectory()).map((f) => f.name));

const listFiles = (dir) =>
  fsp.readdir(dir, { withFileTypes: true }).then((files) =>
    files.map((file) => ({
      type: file.isDirectory() ? 'folder' : 'file',
      name: file.name
    }))
  );

const getAllFiles = async () => {
  const fileList = [];
  // `content/` 下面第一层目录代表类型，如 posts、pages
  // `content/` folders here are the types, like posts and pages
  const types = await listFolders(CONTENT);
  for (let t = 0; t < types.length; t += 1) {
    const type = types[t];
    // 下面第二层目录代表文章或页面的语言
    // then sub folders are languages of posts or pages
    const langs = await listFolders(path.join(CONTENT, type));
    for (let l = 0; l < langs.length; l += 1) {
      const lang = langs[l];
      // 下面第三层目录为文章或页面的内容，可能是文件夹或单一文件
      // then third folders are contents of posts or pages
      const list = await listFiles(path.join(CONTENT, type, lang));
      for (let f = 0; f < list.length; f += 1) {
        const item = list[f];
        const slug = item.name.replace(/^\d{4}-\d{1,2}-\d{1,2}-/, '').replace(/\.mdx$/, '');
        if (item.type === 'file') {
          fileList.push({
            type,
            slug,
            locale: lang,
            entry: item.name
          });
        } else {
          const files = await fsp.readdir(path.join(CONTENT, type, lang, item.name));
          const source = files.filter((x) => !x.endsWith('.mdx'));
          files
            .filter((x) => x.endsWith('.mdx'))
            .forEach((file) => {
              // .mdx 文件名为语言代码， 如 en、 zh
              // content .mdx named with locale like en, zh
              fileList.push({
                type,
                slug,
                locale: file.replace(/\.mdx$/, ''),
                entry: item.name,
                files: source
              });
            });
        }
      }
    }
  }
  return fileList;
};

const checkDir = (dir) =>
  fsp
    .stat(path.resolve(OUTPUT, dir))
    .catch(() => false)
    .then((result) => {
      if (!result) {
        return fsp.mkdir(path.resolve(OUTPUT, dir), { recursive: true });
      }
    });

const readFile = (p) => fsp.readFile(p, 'utf-8');
const writeFile = (p, d) => fsp.writeFile(p, d, 'utf-8');

const main = async () => {
  const n = new Date();
  await fsp.rm(OUTPUT, { recursive: true }).catch(() => {});
  await fsp.mkdir(OUTPUT, { recursive: true });
  const all = await getAllFiles();
  // Build
  // locale: number
  const totalWords = {};
  const totalReadtime = {};
  // locale: [Post]
  const totalPosts = {};
  // locale: [[Tag, count]]
  const totalTags = {};
  // locale: [[Category, count]]
  const totalCategories = {};

  for (let i = 0; i < all.length; i += 1) {
    const item = all[i];
    const { type, slug, locale, entry, files } = item;
    await checkDir(path.resolve(OUTPUT, type, locale));
    const source = await readFile(path.resolve(CONTENT, type, locale, files ? `${entry}/index.mdx` : entry));
    const { data, content, excerpt } = matter(source, {
      excerpt: true,
      excerpt_separator: '<!-- more -->'
    });
    const frontmatter = {
      type,
      slug,
      readtime: readingTime(content),
      ...data,
      excerpt
    };
    const sourceFiles = files
      ? await Promise.all(files.map((f) => readFile(path.resolve(CONTENT, type, slug, f)).then((c) => [`./${f}`, c])))
      : undefined;
    // Build Content
    const { code } = await bundleMDX({
      source: content,
      files: sourceFiles ? Object.fromEntries(sourceFiles) : undefined,
      xdmOptions(options) {
        // eslint-disable-next-line no-param-reassign
        options.rehypePlugins = [
          ...(options.rehypePlugins ?? []),
          rehypeSlug,
          rehypeAutolinkHeadings,
          [rehypePrismPlus, { ignoreMissing: true, showLineNumbers: true }]
        ];
        // eslint-disable-next-line no-param-reassign
        options.remarkPlugins = [
          ...(options.remarkPlugins ?? []),
          remarkGfm,
          [remarkGithub, { repository: 'willin/willin.wang' }],
          [
            remarkMermaid,
            {
              theme: 'dark'
            }
          ]
        ];

        return options;
      }
    });
    const Component = getMdxComponent(code);
    const html = renderToString(createElement(Component));

    writeFile(
      path.resolve(OUTPUT, type, locale, `${slug}.json`),
      JSON.stringify({
        frontmatter,
        html,
        code: sourceFiles ? code : undefined
      })
    );
    const { tags = [], category, readtime } = frontmatter;
    if (totalWords[locale]) {
      totalWords[locale] += readtime.words;
    } else {
      totalWords[locale] = readtime.words;
    }
    if (totalReadtime[locale]) {
      totalReadtime[locale] += readtime.minutes;
    } else {
      totalReadtime[locale] = readtime.minutes;
    }
    if (totalTags[type]) {
      if (totalTags[type][locale]) {
        totalTags[type][locale].push(...tags);
      } else {
        totalTags[type][locale] = tags;
      }
    } else {
      totalTags[type] = { [locale]: tags };
    }
    if (category) {
      if (totalCategories[type]) {
        if (totalCategories[type][locale]) {
          totalCategories[type][locale].push(category);
        } else {
          totalCategories[type][locale] = [category];
        }
      } else {
        totalCategories[type] = { [locale]: [category] };
      }
    }
    if (totalPosts[locale]) {
      totalPosts[locale].push(frontmatter);
    } else {
      totalPosts[locale] = [frontmatter];
    }
  }
  // Statistics
  const arr = Object.entries(totalWords);
  const result = {};
  for (let i = 0; i < arr.length; i += 1) {
    const [locale, words] = arr[i];
    const types = [...new Set([...Object.keys(totalTags), ...Object.keys(totalCategories)])];
    const meta = types.map((type) => {
      const tags = totalTags?.[type]?.[locale]
        ? Object.entries(
            totalTags[type][locale].reduce((r, c) => {
              // {[tag]:count}
              if (r[c]) {
                // eslint-disable-next-line no-param-reassign
                r[c] += 1;
              } else {
                // eslint-disable-next-line no-param-reassign
                r[c] = 1;
              }
              return r;
            }, {})
          ).sort((a, b) => (a[1] < b[1] ? 1 : -1))
        : [];

      const categories = totalCategories?.[type]?.[locale]
        ? Object.entries(
            totalCategories[type][locale].reduce((r, c) => {
              // {[tag]:count}
              if (r[c]) {
                // eslint-disable-next-line no-param-reassign
                r[c] += 1;
              } else {
                // eslint-disable-next-line no-param-reassign
                r[c] = 1;
              }
              return r;
            }, {})
          ).sort((a, b) => (a[1] < b[1] ? 1 : -1))
        : [];

      return [type, { tags, categories }];
    });

    result[locale] = {
      words,
      readtime: totalReadtime[locale],
      contents: totalPosts[locale].sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1)),
      ...Object.fromEntries(meta)
    };
  }
  await writeFile(path.resolve(OUTPUT, 'meta.json'), JSON.stringify(result));
  const n2 = new Date();
  console.log(`Done, used ${n2 - n} ms`);
};

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
