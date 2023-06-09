import { allCategories, allTags } from '@/lib/content';
import { ContextParams } from '../../helper';
import { i18n } from '@/i18n-config';
import { translation } from '@/lib/i18n';
import { allBlogs } from 'contentlayer/generated';
import { TagList } from '../../blog/tag-list';
import { PostCard } from '../../blog/post-card';

export default function PostList({ params: { lang, slug } }: ContextParams) {
  const t = translation(lang);
  const cats = allCategories(lang);
  const tags = allTags(lang);
  const tag = decodeURIComponent(slug);
  const posts = allBlogs
    .filter((p) => p.lang === lang && ((p.tags as string[]) || []).includes(tag))
    .sort((a, b) => {
      return new Date(a.date) > new Date(b.date) ? -1 : 1;
    });

  return (
    <article>
      {cats.length > 0 && (
        <section>
          <h2 className='text-lg text-center'>{t('site.view_by_category')}</h2>
          <TagList lang={lang} type='category' items={cats} />
        </section>
      )}
      {tags.length > 0 && (
        <section>
          <h2 className='text-lg text-center'>{t('site.view_by_tag')}</h2>
          <TagList lang={lang} type='tag' items={tags} current={tag} />
        </section>
      )}
      <section className='my-10 grid grid-flow-row-dense auto-rows-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {posts.length > 0 && posts.map((post) => <PostCard post={post} key={post.slug} lang={lang} />)}
      </section>
    </article>
  );
}

export function generateStaticParams() {
  // @ts-ignore
  return ([] as { params: { slug: string; lang: string } }[]).concat(
    ...[...i18n.locales.map((lang) => allTags(lang).map((p) => ({ params: { slug: p.name, lang: lang } })))]
  );
}

export function generateMetadata({ params }: ContextParams) {
  const t = translation(params.lang);
  const slug = decodeURIComponent(params.slug);
  return {
    title: slug + ' | ' + t('site.blog'),
    description: t('site.desc')
  };
}
