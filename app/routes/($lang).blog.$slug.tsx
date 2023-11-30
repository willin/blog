import { json, type LoaderFunction } from '@remix-run/cloudflare';
import { PostDetail } from '~/components/atom/detail';
import { i18nConfig } from '~/i18n';
import { useLoaderData } from '@remix-run/react';
import { ContentType } from '~/server/services/content';
// import { NotTranslated } from '~/components/atom/not-translated';

export const loader: LoaderFunction = async ({ context, params }) => {
  const views = await context.services.view.view(params.slug);
  const lang = params.lang || i18nConfig.fallbackLng;
  const post = await context.services.content.getContent({
    locale: lang,
    type: ContentType.BLOG,
    slug: params.slug
  });

  return json({ views, post });
};

export default function BlogPage() {
  const { post } = useLoaderData<typeof loader>();

  // if (!post) {
  //   return <NotTranslated post={posts[0]} type={ContentType.BLOG} />;
  // }
  return <PostDetail post={post} type={ContentType.BLOG} />;
}
