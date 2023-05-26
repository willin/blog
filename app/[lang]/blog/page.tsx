import type { Metadata } from 'next';
import Link from 'next/link';
import { translation } from '@/lib/i18n';
import { allBlogs } from 'contentlayer/generated';
import ViewCounter from './view-counter';
import { ContextParams } from '../helper';
import { allCategories, allTags } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read my thoughts on software development, design, and more.'
};

export default function BlogPage({ params: { lang } }: ContextParams) {
  const t = translation(lang);

  return (
    <article>
      <section>
        {allCategories(lang).map((category) => (
          <span key={category.name} className='mr-2'>
            {category.name} {category.count}
          </span>
        ))}
      </section>
      <section>
        {allTags(lang).map((tag) => (
          <span key={tag.name} className='mr-2'>
            {tag.name} {tag.count}
          </span>
        ))}
      </section>
      {allBlogs
        .filter((p) => p.lang === lang)
        .sort((a, b) => {
          if (new Date(a.date) > new Date(b.date)) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <Link key={post.slug} className='flex flex-col space-y-1 mb-4' href={`/${lang}/blog/${post.slug}`}>
            <div className='w-full flex flex-col'>
              <p>{post.title}</p>
              <ViewCounter slug={post.slug} trackView={false} label={t('common.views')} />
            </div>
          </Link>
        ))}
    </article>
  );
}
