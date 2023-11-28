/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { type ComputedFields, type LocalDocument, defineDocumentType, makeSource } from 'contentlayer/source-files';
import readingTime from 'reading-time';
import remarkGfm from 'remark-gfm';
import remarkGithub from 'remark-github';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
// import rehypePrettyCode from 'rehype-pretty-code';
import { i18nConfig } from './app/i18n';

const getSlug = (doc: LocalDocument) =>
  doc._raw.sourceFileName.replace(/^\d{4}-\d{1,2}-\d{1,2}-/, '').replace(/\.mdx$/, '');

const getLang = (doc: LocalDocument) =>
  i18nConfig.supportedLanguages.find((lang) => doc._raw.sourceFileDir.includes(`/${lang}`)) || i18n.defaultLocale;

const computedFields = (type: string): ComputedFields => ({
  slug: {
    type: 'string',
    resolve: (doc) => getSlug(doc)
  },
  lang: {
    type: 'string',
    resolve: (doc) => getLang(doc)
  },
  readingTime: {
    type: 'json',
    resolve: (doc) => readingTime(doc.body.raw as string)
  },
  structuredData: {
    type: 'json',
    resolve: (doc) => ({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: doc.title,
      description: doc?.description,
      datePublished: doc.date,
      dateModified: doc.date,
      image: doc.image ? `https://willin.wang${doc.image}` : `https://willin.wang/api/og?title=${doc.title}`,
      url: `https://willin.wang/${getLang(doc)}/${type === 'page' ? '' : `${type}/`}${getSlug(doc)}`,
      author: {
        '@type': 'Person',
        name: 'Willin Wang'
      }
    })
  }
});

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: `blog/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true
    },
    date: {
      type: 'string',
      required: true
    },
    tags: { type: 'json', default: false },
    category: { type: 'string', default: false },
    description: {
      type: 'string',
      default: false
    },
    image: {
      type: 'string',
      default: false
    },
    follow: {
      type: 'boolean',
      default: false
    }
  },
  computedFields: computedFields('blog')
}));

export const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: `page/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true
    },
    date: {
      type: 'string',
      required: true
    },
    follow: {
      type: 'boolean',
      default: false
    }
  },
  computedFields: computedFields('page')
}));

const contentLayerConfig = makeSource({
  contentDirPath: 'content',
  documentTypes: [Blog, Page],
  mdx: {
    remarkPlugins: [
      //
      remarkGfm,
      [remarkGithub, { repository: 'willin/blog' }]
    ],
    rehypePlugins: [
      //
      rehypeSlug,
      // [
      //   rehypePrettyCode,
      //   {
      //     theme: 'one-dark-pro',
      //     onVisitLine(node: any) {
      //       // Prevent lines from collapsing in `display: grid` mode, and allow empty
      //       // lines to be copy/pasted
      //       if (node.children.length === 0) {
      //         node.children = [{ type: 'text', value: ' ' }];
      //       }
      //     },
      //     onVisitHighlightedLine(node: any) {
      //       // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      //       node.properties.className.push('line--highlighted');
      //     },
      //     onVisitHighlightedWord(node: any) {
      //       node.properties.className = ['word--highlighted'];
      //     }
      //   }
      // ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['anchor']
          }
        }
      ]
    ]
  }
});

export default contentLayerConfig;
