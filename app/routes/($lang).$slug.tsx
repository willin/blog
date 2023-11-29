import { allPages } from 'contentlayer/generated';
import { json, type LoaderFunction } from '@remix-run/cloudflare';
import { PostDetail } from '~/components/atom/detail';
import { NotTranslated } from '~/components/atom/not-translated';
import { useI18n } from 'remix-i18n';
import { useParams } from '@remix-run/react';

export const loader: LoaderFunction = async ({ context, params }) => {
  const views = await context.services.view.view(params.slug);
  return json({ views });
};

export default function PagePage() {
  const { locale } = useI18n();
  const params = useParams();

  const posts = allPages.filter((post) => post.slug === params.slug);
  const post = posts.find((post) => post.lang === locale());
  if (!post) {
    if (posts.length > 0) {
      return <NotTranslated post={posts[0]} type='page' />;
    }
    redirect('/');
  }
  return <PostDetail post={post} type='page' />;
}
