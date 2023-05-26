import { i18n } from '@/i18n-config';
import { BaseURL } from '@/lib/config';
import { allBlogs } from 'contentlayer/generated';

export default function sitemap() {
  // Defined Routes
  const defs = ['', '/about'];
  const lastModified = new Date().toISOString().split('T')[0];

  const routes = ['']
    .concat(
      ...[
        ...i18n.locales.map((lang) => defs.map((path) => `/${lang}${path}`)),
        ...allBlogs.map((blog) => `/${blog.lang}/blog/${blog.slug}`)
      ]
    )
    .map((route) => ({
      url: `${BaseURL}${route}`,
      lastModified
    }));

  return routes;
}
