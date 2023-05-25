import { notFound } from 'next/navigation';
import { allPages } from 'contentlayer/generated';
import { translation } from '@/lib/i18n';
import { ContextParams } from '../helper';
import { Mdx } from '../blog/mdx';
import ViewCounter from '../blog/view-counter';

export default async function CustomPage({ params }: ContextParams) {
  const post = allPages.find((post) => post.slug === params.slug && post.lang === params.lang);
  if (!post) {
    notFound();
  }
  const t = await translation(params.lang);

  return (
    <div>
      <h1>{post.title}</h1>
      <ViewCounter slug={post.slug} trackView label={t('common.views')} />
      <Mdx code={post.body.code} />
      <script type='application/ld+json'>{JSON.stringify(post.structuredData)}</script>
    </div>
  );
}

export async function generateStaticParams() {
  return allPages.map((p) => ({ params: { slug: p.slug, lang: p.lang } }));
}
