import { notFound } from 'next/navigation';
import { allPages } from 'contentlayer/generated';
import { ContextParams } from '../helper';
import { NotTranslated } from '../blog/not-translated';
import { PostDetail } from '../blog/[slug]/detail';

export default function CustomPage({ params }: ContextParams) {
  const posts = allPages.filter((post) => post.slug === params.slug);
  const post = posts.find((post) => post.lang === params.lang);
  if (!post) {
    if (posts.length > 0) {
      return <NotTranslated post={posts[0]} type='page' />;
    }
    notFound();
  }
  return <PostDetail post={post} type='page' lang={params.lang} />;
}

export function generateStaticParams() {
  return allPages.map((p) => ({ params: { slug: p.slug, lang: p.lang } }));
}
