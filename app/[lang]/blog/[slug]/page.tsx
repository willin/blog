import { notFound } from 'next/navigation';
import { allBlogs } from 'contentlayer/generated';
import { ContextParams } from '../../helper';
import { NotTranslated } from '../not-translated';
import { PostDetail } from './detail';

export default function Post({ params }: ContextParams) {
  const posts = allBlogs.filter((post) => post.slug === params.slug);
  const post = posts.find((post) => post.lang === params.lang);
  if (!post) {
    if (posts.length > 0) {
      return <NotTranslated post={posts[0]} type='post' />;
    }
    notFound();
  }
  return <PostDetail post={post} type='post' lang={params.lang} />;
}

export function generateStaticParams() {
  return allBlogs.map((p) => ({ params: { slug: p.slug, lang: p.lang } }));
}
