import { json, type LoaderFunction } from '@remix-run/cloudflare';
import { PostDetail } from '~/components/atom/detail';
import { i18nConfig } from '~/i18n';
import { useLoaderData } from '@remix-run/react';
import { ContentType } from '~/server/services/content';
import { pageMeta } from '~/utils/meta';
import { NotTranslated } from '~/components/atom/not-translated';

export const loader: LoaderFunction = async ({ context, params }) => {
  const views = await context.services.view.view(params.slug);
  const lang = params.lang || i18nConfig.fallbackLng;
  try {
    const post = await context.services.content
      .getContent({
        locale: lang,
        type: ContentType.BLOG,
        slug: params.slug
      })
      .catch(() => null);
    const translated =
      lang === i18nConfig.fallbackLng
        ? null
        : await context.services.content.getContent({
            locale: i18nConfig.fallbackLng,
            type: ContentType.BLOG,
            slug: params.slug
          });
    if (!post && !translated) {
      throw new Response('Not found', { status: 404 });
    }
    return json({ views, post, translated });
  } catch (e) {
    throw new Response('Not found', { status: 404 });
  }
};

export const meta = pageMeta;

export default function BlogPage() {
  const { post, translated } = useLoaderData<typeof loader>();

  if (!post) {
    return <NotTranslated post={translated} type={ContentType.BLOG} />;
  }
  return <PostDetail post={post} type={ContentType.BLOG} />;
}
