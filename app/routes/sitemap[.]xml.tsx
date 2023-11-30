import { type LoaderFunction } from '@remix-run/cloudflare';
import { i18nConfig } from '~/i18n';
import { ContentType } from '~/server/services/content';

export const loader: LoaderFunction = async ({ context, request }) => {
  const url = new URL(request.url);
  const locales = i18nConfig.supportedLanguages;
  const meta = await context.services.content.getMeta();
  const list = [];
  const baseURL = `${url.protocol}//${url.hostname}${['80', '443', ''].includes(url.port) ? '' : `:${url.port}`}`;

  for (const locale of locales) {
    list.push(
      `<url>\n<loc>${baseURL}${
        locale === i18nConfig.fallbackLng ? '' : `/${locale}`
      }</loc>\n<lastmod>${new Date().toISOString()}</lastmod></url>`
    );
    const { contents } = meta[locale];
    for (const content of contents) {
      const location = `${baseURL}${locale === i18nConfig.fallbackLng ? '' : `/${locale}`}${
        content.type === ContentType.PAGE ? '' : `/${content.type}`
      }/${content.slug}`;
      const date = new Date(content.date).toISOString();
      list.push(`<url>\n<loc>${location}</loc>\n<lastmod>${date}</lastmod>\n</url>`);
    }
  }

  return new Response(
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${list.join('\n')}\n
</urlset>`,
    {
      headers: {
        'content-type': 'application/xml'
      }
    }
  );
};
