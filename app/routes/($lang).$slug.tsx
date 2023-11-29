import { allPages } from 'contentlayer/generated';
import { json, type LoaderFunction } from '@remix-run/cloudflare';
import { PostDetail } from '~/components/atom/detail';
import { NotTranslated } from '~/components/atom/not-translated';
import { i18nConfig } from '~/i18n';
import { useLoaderData } from '@remix-run/react';
import E404 from '~/components/atom/404';

export const loader: LoaderFunction = async ({ context, params }) => {
  const views = await context.services.view.view(params.slug);
  const posts = allPages.filter((post) => post.slug === params.slug);
  const post = posts.find((post) => post.lang === (params.lang || i18nConfig.fallbackLng));
  return json({ views, post, posts });
};

export default function PagePage() {
  const { post, posts } = useLoaderData<typeof loader>();

  if (!post) {
    if (posts.length > 0) {
      return <NotTranslated post={posts[0]} type='page' />;
    }
    return <E404 />;
  }
  return <PostDetail post={post} type='page' />;
}
