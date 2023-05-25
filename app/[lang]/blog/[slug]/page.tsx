import { notFound } from 'next/navigation';
import { allBlogs } from 'contentlayer/generated';
import { translation } from '@/lib/i18n';
import ViewCounter from '../view-counter';
import { Mdx } from '../mdx';
import { ContextParams } from '../../helper';

// import type { Blog } from 'contentlayer/generated';

export default function Post({ params }: ContextParams) {
  const post = allBlogs.find((post) => post.slug === params.slug && post.lang === params.lang);
  if (!post) {
    notFound();
  }
  const t = translation(params.lang);

  return (
    <div>
      <h1>{post.title}</h1>
      <ViewCounter slug={post.slug} trackView label={t('common.views')} />
      <Mdx code={post.body.code} />
      <script type='application/ld+json'>{JSON.stringify(post.structuredData)}</script>
    </div>
  );
}

export function generateStaticParams() {
  return allBlogs.map((p) => ({ params: { slug: p.slug, lang: p.lang } }));
}
