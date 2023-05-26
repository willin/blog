import { translation } from '@/lib/i18n';
import { allBlogs } from 'contentlayer/generated';
import { ContextParams } from '../helper';
import { allCategories, allReadingTime, allTags, allWordCount } from '@/lib/content';
import { getBlogViews } from '@/lib/metrics';
import { TagList } from './tag-list';
import { PostCard } from './post-card';

export default async function BlogPage({ params: { lang } }: ContextParams) {
  const totalViews = await getBlogViews();
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
        <h3
          className='text-xl my-4 text-center'
          dangerouslySetInnerHTML={{
            __html: t('site.total_wordcount', {
              wordcount: allWordCount(lang).toLocaleString(),
              readtime: allReadingTime(lang),
              posts: allBlogs.filter((p) => p.lang === lang).length.toLocaleString(),
              views: totalViews.toLocaleString()
            })
          }}
        />
      </section>
      {cats.length > 0 && (
        <section>
          <h2 className='text-lg text-center'>{t('site.view_by_category')}</h2>
          <TagList lang={lang} type='category' items={cats} />
        </section>
      )}
      {tags.length > 0 && (
        <section>
          <h2 className='text-lg text-center'>{t('site.view_by_tag')}</h2>
          <TagList lang={lang} type='tag' items={tags} />
        </section>
      )}
      <section className='my-10 grid grid-flow-row-dense auto-rows-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {posts.length > 0 &&
          posts.map(
            (post, i) =>
              i < 50 && (
                <PostCard post={post} key={post.slug} lang={lang} />
                // <Link key={post.slug} className='flex flex-col space-y-1 mb-4' href={`/${lang}/blog/${post.slug}`}>
                //   <div className='w-full flex flex-col'>
                //     <p>{post.title}</p>
                //     <ViewCounter slug={post.slug} trackView={false} label={t('common.views')} />
                //   </div>
                // </Link>
              )
          )}
      </section>
    </article>
  );
}

export function generateMetadata({ params: { lang } }: ContextParams) {
  const t = translation(lang);
  return {
    title: t('site.blog'),
    description: t('site.desc')
  };
}
