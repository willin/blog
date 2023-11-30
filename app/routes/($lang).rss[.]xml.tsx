import { Buffer } from 'node:buffer';
import { type LoaderFunction } from '@remix-run/cloudflare';
import { i18nConfig } from '~/i18n';
import { ContentType } from '~/server/services/content';

function cdata(s: string) {
  return `<![CDATA[${s}]]>`;
}

export const loader: LoaderFunction = async ({ context, request, params }) => {
  const url = new URL(request.url);
  const lang = params.lang;
  const locales = i18nConfig.supportedLanguages;
  const meta = await context.services.content.getMeta();
  const list = [];
  const baseURL = `${url.protocol}//${url.hostname}${['80', '443', ''].includes(url.port) ? '' : `:${url.port}`}`;

  for (const locale of locales) {
    if (lang && lang !== locale) continue;
    const { contents } = meta[locale];
    for (const content of contents.filter((x) => x.type === ContentType.BLOG)) {
      const location = `${baseURL}${locale === i18nConfig.fallbackLng ? '' : `/${locale}`}${
        content.type === ContentType.PAGE ? '' : `/${content.type}`
      }/${content.slug}`;
      const date = new Date(content.date).toISOString();
      list.push(
        `<item>
        <title>${cdata(content.title)}</title>
        <description>${cdata(content.description || '')}</description>
        <pubDate>${date}</pubDate>
        <link>${location}</link>
        <guid>${location}</guid>
      </item>
    `.trim()
      );
    }
  }

  const rss = `
  <rss xmlns:blogChannel="${baseURL}" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
    <channel>
      <title>Willin Wang (v0) 老王</title>
      <link>${baseURL}</link>
      <description>To be Willin is to be willing.</description>
      <language>${lang || i18nConfig.fallbackLng}</language>
      <generator>Willin Remix</generator>
      <ttl>40</ttl>
      ${list.join('\n')}
    </channel>
  </rss>
`.trim();

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Content-Length': String(Buffer.byteLength(rss))
    }
  });
};
