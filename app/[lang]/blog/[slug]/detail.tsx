import { Blog, Page } from 'contentlayer/generated';
import { translation } from '@/lib/i18n';
import { Locale } from '@/i18n-config';
import ViewCounter from '../view-counter';
import { Mdx } from '../mdx';
import Link from 'next/link';

function PostCategory({ post, lang }: { post: Blog; lang: string }) {
  if (!post.category) return null;
  return (
    <>
      <Link className='btn btn-sm btn-ghost ml-2' href={`/${lang}/category/${post.category}`}>
        {post.category}
      </Link>
    </>
  );
}

export function PostDetail({ post, lang, type }: { post: Blog | Page; lang: Locale; type: string }) {
  const t = translation(lang);

  return (
    <article>
      <h1 className='text-5xl text-secondary text-center my-4'>{post.title}</h1>
      <aside className='text-center'>
        <ViewCounter slug={post.slug} trackView label={t('common.views')} />
        {type === 'post' && <PostCategory post={post as Blog} lang={lang} />}
      </aside>
      <Mdx code={post.body.code} />
      <script type='application/ld+json'>{JSON.stringify(post.structuredData)}</script>
    </article>
  );
}
