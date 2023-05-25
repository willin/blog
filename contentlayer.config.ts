/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { ComputedFields, defineDocumentType, makeSource } from 'contentlayer/source-files';
import { i18n } from './i18n-config';

const computedFields = (type: string): ComputedFields => ({
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.sourceFileName.replace(/^\d{4}-\d{1,2}-\d{1,2}-/, '').replace(/\.mdx$/, '')
  },
  lang: {
    type: 'string',
    resolve: (doc) => i18n.locales.find((lang) => doc._raw.sourceFileDir.includes(`/${lang}`)) || i18n.defaultLocale
  },
  structuredData: {
    type: 'json',
    resolve: (doc) => ({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: doc.title,
      datePublished: doc.date,
      dateModified: doc.date,
      description: doc.excerpt,
      image: doc.image ? `https://willin.wang${doc.image}` : `https://willin.wang/api/og?title=${doc.title}`,
      url: `https://willin.wang/${doc.lang}/${type === 'page' ? '' : `${type}/`}${doc.slug}`,
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
    }
  },
  computedFields: computedFields('page')
}));

const contentLayerConfig = makeSource({
  contentDirPath: 'content',
  documentTypes: [Blog, Page],
  mdx: {}
});

export default contentLayerConfig;
