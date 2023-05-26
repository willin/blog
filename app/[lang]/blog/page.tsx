import type { Metadata } from 'next';
import Link from 'next/link';
import { translation } from '@/lib/i18n';
import { allBlogs } from 'contentlayer/generated';
import ViewCounter from './view-counter';
import { ContextParams } from '../helper';
import { allCategories, allReadingTime, allTags, allWordCount } from '@/lib/content';
import { TagList } from './tag-list';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read my thoughts on software development, design, and more.'
};

export default function BlogPage({ params: { lang } }: ContextParams) {
  const t = translation(lang);
  const cats = allCategories(lang);
  const tags = allTags(lang);
  const posts = allBlogs
    .filter((p) => p.lang === lang)
    .sort((a, b) => {
      if (new Date(a.date) > new Date(b.date)) {
        return -1;
      }
      return 1;
    });

  return (
    <article>
      <section>
        <h3 className='text-2xl mb-4'>
          {t('site.total_wordcount', { wordcount: allWordCount().toLocaleString(), readtime: allReadingTime() })}
        </h3>
      </section>
      {cats.length > 0 && (
        <section>
          <h2 className='text-lg'>{t('site.view_by_category')}</h2>
          <TagList lang={lang} type='category' items={cats} />
        </section>
      )}
      {tags.length > 0 && (
        <section>
          <h2 className='text-lg'>{t('site.view_by_tag')}</h2>
          <TagList lang={lang} type='tag' items={tags} />
        </section>
      )}
      {posts.length > 0 &&
        posts.map(
          (post, i) =>
            i < 50 && (
              <Link key={post.slug} className='flex flex-col space-y-1 mb-4' href={`/${lang}/blog/${post.slug}`}>
                <div className='w-full flex flex-col'>
                  <p>{post.title}</p>
                  <ViewCounter slug={post.slug} trackView={false} label={t('common.views')} />
                </div>
              </Link>
            )
        )}
    </article>
  );
}
